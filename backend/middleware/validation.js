// middleware/validation.js
import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }
  next();
};

/**
 * Validation rules for creating order
 */
export const validateCreateOrder = [
  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid course ID format");
      }
      return true;
    }),
  handleValidationErrors,
];

/**
 * Validation rules for payment verification
 */
export const validatePaymentVerification = [
  body("razorpay_order_id")
    .notEmpty()
    .withMessage("Razorpay order ID is required")
    .isLength({ min: 1 })
    .withMessage("Invalid order ID"),

  body("razorpay_payment_id")
    .notEmpty()
    .withMessage("Razorpay payment ID is required")
    .isLength({ min: 1 })
    .withMessage("Invalid payment ID"),

  body("razorpay_signature")
    .notEmpty()
    .withMessage("Razorpay signature is required")
    .isLength({ min: 1 })
    .withMessage("Invalid signature"),

  handleValidationErrors,
];

/**
 * Validation rules for order ID parameter
 */
export const validateOrderId = [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isLength({ min: 1 })
    .withMessage("Invalid order ID"),
  handleValidationErrors,
];

/**
 * Validation rules for order history query
 */
export const validateOrderHistoryQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("status")
    .optional()
    .isIn(["created", "paid", "failed", "cancelled", "refunded"])
    .withMessage("Invalid status value"),

  handleValidationErrors,
];

/**
 * Validation rules for admin order queries
 */
export const validateAdminOrderQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("status")
    .optional()
    .isIn(["created", "paid", "failed", "cancelled", "refunded"])
    .withMessage("Invalid status value"),

  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date format"),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date format"),

  query("courseId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid course ID format");
      }
      return true;
    }),

  query("userId")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid user ID format");
      }
      return true;
    }),

  handleValidationErrors,
];
