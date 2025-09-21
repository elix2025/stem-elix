import Payment from "../models/orderModel.js";
import User from "../models/User.js";
import Course from "../models/CourseModel.js";
import connectCloudinary from "../config/cloudinary.js";
import {v2 as cloudinary} from "cloudinary";

// Helper function to validate payment data
const validatePaymentData = (data) => {
  const errors = [];
  
  if (!data.userId) errors.push("User ID is required");
  if (!data.courseId) errors.push("Course ID is required");
  if (!data.amount || data.amount <= 0) errors.push("Valid amount is required");
  if (!data.receipt) errors.push("Payment screenshot is required");

  return errors;
};

// Helper function to check existing payment
const checkExistingPayment = async (userId, courseId) => {
  return await Payment.findOne({
    user: userId,
    course: courseId,
    status: { $in: ["pending", "verified"] }
  });
};

// Helper function to handle cloudinary upload
const uploadToCloudinary = async (file) => {
  try {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "payment_proofs",
          transformation: [
            { width: 1000, crop: "limit" },
            { quality: "auto" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload payment screenshot");
  }
};


// 1️⃣ Create a new payment (user uploads screenshot)
export const createPayment = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;
    const receipt = req.file;

    // Validate input data
    const validationErrors = validatePaymentData({ userId, courseId, amount, receipt });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    // Check if user & course exist
    const [user, course] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]).catch(error => {
      console.error("Database query error:", error);
      throw new Error("Failed to fetch user or course data");
    });

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        message: "User or course not found."
      });
    }

    // Check for existing payment
    const existingPayment = await checkExistingPayment(userId, courseId);
    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending or verified payment for this course.",
        paymentId: existingPayment._id
      });
    }

    // Upload screenshot to Cloudinary
    const uploadResult = await uploadToCloudinary(receipt);

    // Create payment record
    const newPayment = new Payment({
      user: userId,
      course: courseId,
      amount,
      screenshotUrl: uploadResult.secure_url,
      status: "pending",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      originalAmount: course.price,
      notes: new Map([
        ['screenshot_public_id', uploadResult.public_id],
        ['uploader_ip', req.ip]
      ])
    });

    await newPayment.save();

    // Send notification to admin (you can implement this based on your notification system)
    // notifyAdmin(newPayment._id, "New payment verification required");

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully. Your enrollment will be completed once verified by us.",
      payment: {
        id: newPayment._id,
        amount: newPayment.amount,
        status: newPayment.status,
        screenshotUrl: newPayment.screenshotUrl
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// get the user , course and screenshot of the payment done by user
export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        success: false,
        message: "Payment ID is required." 
      });
    }

    const payment = await Payment.findById(id)
      .populate("user", "name email")
      .populate("course", "title price thumbnail");

    if (!payment) {
      return res.status(404).json({ 
        success: false,
        message: "Payment not found." 
      });
    }

    res.status(200).json({
      success: true,
      payment
    });

  } catch (error) {
    console.error("Get payment error:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error." 
    });
  }
};

// Admin endpoint to verify/reject payments
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { action, gpayTransactionId, rejectionReason } = req.body;

    if (!paymentId || !action) {
      return res.status(400).json({
        success: false,
        message: "Payment ID and action are required."
      });
    }

    if (!["verify", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Must be either 'verify' or 'reject'."
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found."
      });
    }

    if (payment.status !== "pending") {
      return res.status(409).json({
        success: false,
        message: `Payment cannot be ${action}ed. Current status: ${payment.status}`
      });
    }

    if (action === "verify") {
      if (!gpayTransactionId) {
        return res.status(400).json({
          success: false,
          message: "Google Pay transaction ID is required for verification."
        });
      }

      // Update payment status
      payment.status = "verified";
      payment.gpayTransactionId = gpayTransactionId;
      payment.verifiedAt = new Date();
      payment.paidAt = new Date();

      // Find user and check enrollment
      const user = await User.findById(payment.user);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if already enrolled
      if (!user.coursesEnrolled.some(enrollment => enrollment.course.toString() === payment.course.toString())) {
        // Add course to user's enrolled courses with simple status
        user.coursesEnrolled.push({
          course: payment.course,
          status: "in-progress",
          enrolledAt: new Date()
        });

        // Update total courses enrolled
        user.totalCoursesEnrolled = user.coursesEnrolled.length;
        
        await user.save();
      }

      await payment.save();

      // You can add notification to user here about successful enrollment
      // await notifyUser(user.email, "Payment verified and course enrollment completed");

      res.status(200).json({
        success: true,
        message: "Payment verified and user enrolled in course successfully.",
        payment: {
          id: payment._id,
          status: payment.status,
          verifiedAt: payment.verifiedAt
        }
      });
    } else {
      // Handle rejection
      if (!rejectionReason) {
        return res.status(400).json({
          success: false,
          message: "Rejection reason is required."
        });
      }

      payment.status = "rejected";
      payment.failureReason = rejectionReason;
      payment.updatedAt = new Date();
      await payment.save();

      // You can add notification to user here about rejection
      // await notifyUser(user.email, `Payment rejected: ${rejectionReason}`);

      res.status(200).json({
        success: true,
        message: "Payment rejected successfully.",
        payment: {
          id: payment._id,
          status: payment.status,
          failureReason: payment.failureReason
        }
      });
    }

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while processing payment verification."
    });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID is required." 
      });
    }

    // Build query
    const query = { user: userId };
    if (status) {
      query.status = status;
    }

    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        { path: 'course', select: 'title price thumbnail' }
      ],
      sort: { createdAt: -1 }
    };

    const payments = await Payment.paginate(query, options);

    res.status(200).json({
      success: true,
      payments: payments.docs,
      pagination: {
        currentPage: payments.page,
        totalPages: payments.totalPages,
        totalPayments: payments.totalDocs,
        hasNext: payments.hasNextPage,
        hasPrev: payments.hasPrevPage
      }
    });

  } catch (error) {
    console.error("Get user payments error:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error." 
    });
  }
};

// These functions have been consolidated into the main verifyPayment function above
// which handles both verification and rejection in a single endpoint

// 4️⃣ Get all payments (optional: admin view)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
