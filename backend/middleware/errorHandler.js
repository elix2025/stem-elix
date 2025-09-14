// middleware/errorHandler.js

/**
 * Custom Error Class for application-specific errors
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 */
export const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    user: req.user?.id || "Anonymous",
  });

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Invalid resource ID";
    error = new AppError(message, 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const value = Object.values(err.keyValue)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    error = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again";
    error = new AppError(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired. Please log in again";
    error = new AppError(message, 401);
  }

  // Razorpay errors
  if (err.error && err.error.code) {
    const razorpayErrors = {
      BAD_REQUEST_ERROR: "Invalid payment request",
      GATEWAY_ERROR: "Payment gateway error",
      SERVER_ERROR: "Payment service temporarily unavailable",
    };

    const message =
      razorpayErrors[err.error.code] || "Payment processing error";
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && {
      error: err,
      stack: err.stack,
    }),
  });
};

/**
 * Async error wrapper to avoid try-catch blocks
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * 404 handler for unknown routes
 */
export const notFound = (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};
