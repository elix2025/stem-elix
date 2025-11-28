import Payment from "../models/orderModel.js";
import User from "../models/User.js";
import Course from "../models/CourseModel.js";
import generateInvoice from "../utils/invoiceGenerator.js";
import { sendEmail } from "../config/mailer.js";

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

// Helper function to store file temporarily
const storePaymentScreenshot = async (file) => {
  try {
    // For now we'll just keep the file buffer in memory
    // In production, you might want to store it in a file system or cloud storage
    return {
      buffer: file.buffer,
      originalName: file.originalname,
      mimetype: file.mimetype
    };
  } catch (error) {
    console.error("File storage error:", error);
    throw new Error("Failed to store payment screenshot");
  }
};


// 1️⃣ Create a new payment (user uploads screenshot)
export const createPayment = async (req, res) => {
  try {
    console.log("🔍 Payment creation request received");
    console.log("📝 Request body:", req.body);
    console.log("📁 Request file:", req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : "No file received");

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

    // Store payment screenshot
    console.log("📤 Storing payment screenshot...");
    const fileInfo = await storePaymentScreenshot(receipt);
    console.log("✅ Screenshot stored successfully");

    // Create payment record
    console.log("💳 Creating payment record...");
    const newPayment = new Payment({
      user: userId,
      course: courseId,
      amount,
      paymentScreenshot: {
        data: fileInfo.buffer,
        contentType: fileInfo.mimetype,
        originalName: fileInfo.originalName
      },
      status: "pending",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      originalAmount: course.price,
      notes: new Map([
        ['uploader_ip', req.ip]
      ])
    });

    console.log("💾 Saving payment to database...");
    const savedPayment = await newPayment.save();
    console.log("✅ Payment saved successfully with ID:", savedPayment._id);
    console.log("📄 Payment details:", {
      id: savedPayment._id,
      orderId: savedPayment.orderId,
      status: savedPayment.status,
      screenshotUrl: savedPayment.screenshotUrl ? "✅ Present" : "❌ Missing"
    });

    // Send notification to admin (you can implement this based on your notification system)
    // notifyAdmin(newPayment._id, "New payment verification required");

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully. Your enrollment will be completed once verified by us.",
      payment: {
        id: savedPayment._id,
        orderId: savedPayment.orderId,
        amount: savedPayment.amount,
        status: savedPayment.status,
        screenshotUrl: savedPayment.screenshotUrl
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
      .populate("course", "title price thumbnail levelNumber");

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
    console.log("\n=== Payment Verification Started ===");
    console.log("� Verification request received at:", new Date().toISOString());
    console.log("📝 Payment ID:", req.params.paymentId);
    console.log("📝 Action:", req.body.action);
    console.log("📝 GPay Transaction ID:", req.body.gpayTransactionId);
    console.log("=================================\n");

    const { paymentId } = req.params;
    const { action, gpayTransactionId, rejectionReason } = req.body;

    if (!paymentId || !action) {
      console.log("❌ Validation failed: Missing paymentId or action");
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

    console.log("🔍 Looking up payment with ID:", paymentId);
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      console.log("❌ Payment not found with ID:", paymentId);
      return res.status(404).json({
        success: false,
        message: "Payment not found."
      });
    }

    console.log("✅ Found payment:", {
      id: payment._id,
      status: payment.status,
      amount: payment.amount,
      userId: payment.user,
      courseId: payment.course
    });

    if (payment.status !== "pending") {
      console.log("❌ Invalid payment status:", payment.status);
      return res.status(409).json({
        success: false,
        message: `Payment cannot be ${action}ed. Current status: ${payment.status}`
      });
    }

    if (action === "verify") {
      console.log('🔄 Starting payment verification process...');
      
      if (!gpayTransactionId) {
        console.log('❌ Missing GPay transaction ID');
        return res.status(400).json({
          success: false,
          message: "Google Pay transaction ID is required for verification."
        });
      }

      console.log('💳 GPay Transaction ID:', gpayTransactionId);

      // Update payment status
      payment.status = "verified";
      payment.gpayTransactionId = gpayTransactionId;
      payment.verifiedAt = new Date();
      payment.paidAt = new Date();

      // Find user and check enrollment
      console.log("🔍 Looking up user with ID:", payment.user);
      const user = await User.findById(payment.user);
      if (!user) {
        console.log("❌ User not found for ID:", payment.user);
        throw new Error("User not found");
      }
      console.log("✅ Found user:", {
        id: user._id,
        name: user.name,
        email: user.email
      });

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

      // Save payment status changes to database
      console.log("💾 Saving payment status to database...");
      await payment.save();
      console.log("✅ Payment saved successfully with status: verified");

      // Generate invoice
      try {
        console.log("📄 Starting invoice generation...");
        const courseDetails = await Course.findById(payment.course);
        console.log("📚 Course details fetched:", courseDetails.title);
        
        const pdfBuffer = await generateInvoice({
          orderId: payment._id,
          user: user,
          course: courseDetails,
          amount: payment.amount,
          gpayTransactionId,
          verifiedAt: payment.verifiedAt,
          paidAt: payment.paidAt
        });
        console.log("✅ Invoice generated successfully");

        // Send email with invoice as attachment
        console.log("📧 Attempting to send email with invoice to:", user.email);
        await sendEmail({
          to: user.email,
          subject: "Payment Verified - Your Course Enrollment is Complete",
          attachments: [{
            filename: `invoice_${payment._id}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }],
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Payment Verified Successfully!</h2>
              <p>Dear ${user.name},</p>
              <p>Your payment has been verified and you have been successfully enrolled in the course "${(await Course.findById(payment.course)).title}".</p>
              <p>Payment Details:</p>
              <ul>
                <li>Amount: ₹${payment.amount}</li>
                <li>Transaction ID: ${gpayTransactionId}</li>
                <li>Date: ${new Date(payment.paidAt).toLocaleDateString()}</li>
              </ul>
              <p>Your invoice is attached to this email.</p>
              <p>You can now access your course content from your dashboard.</p>
              <p>Thank you for choosing Stemelix!</p>
              <br/>
              <p>Best regards,</p>
              <p>The Stemelix Team</p>
            </div>
          `
        });

      } catch (error) {
        console.error("Error in invoice generation or email sending:", error);
        console.error("Full error stack:", error.stack);
        
        // Payment is already saved at this point, so just notify about email/invoice error
        res.status(200).json({
          success: true,
          message: "Payment verified but there was an issue generating the invoice or sending the email. Our team will send it manually.",
          error: error.message,
          payment: {
            id: payment._id,
            status: payment.status,
            verifiedAt: payment.verifiedAt
          }
        });
        return;
      }

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
    console.log("🔍 getAllPayments endpoint hit");
    console.log("👤 Admin user from middleware:", req.user);
    console.log("📋 Query params:", req.query);
    
    console.log("🔍 Fetching all payments from database...");
    
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("course", "title levelNumber")
      .sort({ createdAt: -1 });

    console.log(`📊 Found ${payments.length} payments in database`);
    
    // Debug: Log detailed info about first few payments
    payments.slice(0, 3).forEach((payment, index) => {
      console.log(`Payment ${index + 1}:`, {
        id: payment._id,
        orderId: payment.orderId,
        status: payment.status,
        amount: payment.amount,
        screenshotUrl: payment.screenshotUrl ? "✅ Present" : "❌ Missing",
        user: payment.user?.name || "No user data",
        course: payment.course?.title || "No course data",
        createdAt: payment.createdAt
      });
    });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments: payments
    });
  } catch (err) {
    console.error("❌ Error fetching payments:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error.",
      error: err.message
    });
  }
};
