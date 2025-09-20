// import { razorpayinstance } from "../config/razorpay.js";
import crypto from "crypto";
import mongoose from "mongoose";
import Course from "../models/CourseModel.js";
import User from "../models/User.js";
import Payment from "../models/orderModel.js";

// Utility function for consistent error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(`Error ${statusCode}:`, message, error);
  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" &&
      error && { error: error.message }),
  });
};

// Utility function for validation
const validateRequired = (fields, data) => {
  const missing = [];
  fields.forEach((field) => {
    if (!data[field]) missing.push(field);
  });
  return missing;
};

// Create a new order
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { courseId } = req.body;
    const userId = req.user._id; // Get from authenticated user

    // Validate required fields
    const missingFields = validateRequired(["courseId"], req.body);
    if (missingFields.length > 0) {
      return sendErrorResponse(
        res,
        400,
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return sendErrorResponse(res, 400, "Invalid course ID format");
    }

    // Check if course exists
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      return sendErrorResponse(res, 404, "Course not found");
    }

    // Check if course is available for purchase
    if (!course.isActive || course.price <= 0) {
      return sendErrorResponse(
        res,
        400,
        "Course is not available for purchase"
      );
    }

    // Check if user is already enrolled
    const user = await User.findById(userId).session(session);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const isAlreadyEnrolled = user.coursesEnrolled.some(
      (enrollment) => enrollment.course.toString() === courseId
    );

    if (isAlreadyEnrolled) {
      return sendErrorResponse(
        res,
        400,
        "User is already enrolled in this course"
      );
    }

    // Check for existing pending orders
    const existingOrder = await Payment.findOne({
      user: userId,
      course: courseId,
      status: "created",
    }).session(session);

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already exists",
        orderId: existingOrder.orderId,
        amount: existingOrder.amount,
        courseId,
        userId,
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(course.price * 100), // Convert to paise and ensure integer
      currency: "INR",
      receipt: `rcpt_${userId}_${courseId}_${Date.now()}`,
      notes: {
        courseId: courseId,
        userId: userId.toString(),
        courseName: course.title,
      },
    };

    const razorpayOrder = await razorpayinstance.orders.create(options);

    // Create payment record
    const payment = await Payment.create(
      [
        {
          user: userId,
          course: courseId,
          orderId: razorpayOrder.id,
          amount: course.price,
          currency: "INR",
          status: "created",
          razorpayOrderData: razorpayOrder,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    console.log(
      `Order created successfully: ${razorpayOrder.id} for user: ${userId}`
    );

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: razorpayOrder.id,
      amount: course.price,
      currency: "INR",
      courseId,
      userId,
      courseName: course.title,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    await session.abortTransaction();

    if (error.error && error.error.code === "BAD_REQUEST_ERROR") {
      return sendErrorResponse(res, 400, "Invalid payment details", error);
    }

    return sendErrorResponse(res, 500, "Error creating order", error);
  } finally {
    session.endSession();
  }
};

// Verify payment and enroll user
export const verifyPayment = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Validate required fields
    const missingFields = validateRequired(
      ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"],
      req.body
    );

    if (missingFields.length > 0) {
      return sendErrorResponse(
        res,
        400,
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    // Find payment record
    const payment = await Payment.findOne({ orderId: razorpay_order_id })
      .populate("course", "title price")
      .populate("user", "name email coursesEnrolled")
      .session(session);

    if (!payment) {
      return sendErrorResponse(res, 404, "Payment record not found");
    }

    if (payment.status === "paid") {
      return sendErrorResponse(res, 400, "Payment already verified");
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Update payment status to failed
      await Payment.findByIdAndUpdate(
        payment._id,
        {
          status: "failed",
          failureReason: "Invalid signature",
          updatedAt: new Date(),
        },
        { session }
      );

      await session.commitTransaction();
      return sendErrorResponse(
        res,
        400,
        "Payment verification failed: Invalid signature"
      );
    }

    // Update payment record
    await Payment.findByIdAndUpdate(
      payment._id,
      {
        status: "paid",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        paidAt: new Date(),
        updatedAt: new Date(),
      },
      { session }
    );

    // Enroll user in course
    const user = await User.findById(payment.user._id).session(session);

    // Double-check enrollment (race condition protection)
    const isAlreadyEnrolled = user.coursesEnrolled.some(
      (enrollment) =>
        enrollment.course.toString() === payment.course._id.toString()
    );

    if (!isAlreadyEnrolled) {
      user.coursesEnrolled.push({
        course: payment.course._id,
        status: "active",
        enrolledAt: new Date(),
      });
      user.totalCoursesEnrolled = user.coursesEnrolled.length;
      await user.save({ session });

      // Update course enrollment
      await Course.findByIdAndUpdate(
        payment.course._id,
        {
          $addToSet: { enrolledStudents: user._id },
          $inc: { totalEnrollments: 1 },
        },
        { session }
      );
    }

    await session.commitTransaction();

    console.log(
      `Payment verified successfully: ${razorpay_payment_id} for user: ${user._id}`
    );

    res.status(200).json({
      success: true,
      message: "Payment verified and course enrolled successfully!",
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        courseId: payment.course._id,
        courseName: payment.course.title,
        amount: payment.amount,
        enrollmentStatus: "active",
      },
    });
  } catch (error) {
    await session.abortTransaction();
    return sendErrorResponse(res, 500, "Error verifying payment", error);
  } finally {
    session.endSession();
  }
};

// Get user's order history
export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: userId };
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: "course", select: "title description price thumbnail" },
        { path: "user", select: "name email" },
      ],
    };

    const orders = await Payment.paginate(query, options);

    res.status(200).json({
      success: true,
      message: "Order history retrieved successfully",
      data: orders,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retrieving order history", error);
  }
};

// Get specific order details
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Payment.findOne({
      $or: [
        { orderId: orderId },
        { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null },
      ],
      user: userId,
    })
      .populate("course", "title description price thumbnail")
      .populate("user", "name email");

    if (!order) {
      return sendErrorResponse(res, 404, "Order not found");
    }

    res.status(200).json({
      success: true,
      message: "Order details retrieved successfully",
      data: order,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retrieving order details", error);
  }
};

// Cancel pending order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Payment.findOne({
      orderId: orderId,
      user: userId,
      status: "created",
    });

    if (!order) {
      return sendErrorResponse(res, 404, "Pending order not found");
    }

    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save();

    console.log(`Order cancelled: ${orderId} by user: ${userId}`);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: { orderId },
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error cancelling order", error);
  }
};

// Admin: Get all orders with filters
export const getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      startDate,
      endDate,
      courseId,
      userId,
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (courseId) query.course = courseId;
    if (userId) query.user = userId;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: "course", select: "title price" },
        { path: "user", select: "name email" },
      ],
    };

    const orders = await Payment.paginate(query, options);

    // Calculate statistics
    const stats = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0],
            },
          },
          paidOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, 1, 0],
            },
          },
          pendingOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "created"] }, 1, 0],
            },
          },
          failedOrders: {
            $sum: {
              $cond: [{ $eq: ["$status", "failed"] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
      statistics: stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        paidOrders: 0,
        pendingOrders: 0,
        failedOrders: 0,
      },
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retrieving orders", error);
  }
};
