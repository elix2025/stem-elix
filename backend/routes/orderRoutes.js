import express from "express";
// import {
//   createOrder,
//   verifyPayment,
//   getOrderHistory,
//   getOrderDetails,
//   cancelOrder,
//   getAllOrders,
// } from "../controllers/orderController.js";
import { createPayment,
       verifyPayment,
        
       getPayment,
       getAllPayments,
        getUserPayments
 } from "../controllers/paymentcontroller.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import AdminAuth from "../middleware/adminauth.js";
// import {
//   validateCreateOrder,
//   validatePaymentVerification,
//   validateOrderId,
//   validateOrderHistoryQuery,
//   validateAdminOrderQuery,
// } from "../middleware/validation.js";

const orderRouter = express.Router();

// Health check route (for monitoring) - No auth required
orderRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Order service is healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Apply authentication to all other routes
orderRouter.use(protect);

orderRouter.post("/create", protect, upload.single("reciept"),createPayment);

// Admin: Verify or reject payment
orderRouter.post("/verify/:paymentId", AdminAuth, verifyPayment);

// Admin: Get all payments
orderRouter.get("/payments", AdminAuth, getAllPayments);

// Get payment details
orderRouter.get("/payment/:id", protect, getPayment);

// Get user payments with pagination
orderRouter.get("/user/:userId/payments", protect, getUserPayments);

// User routes with validation


// orderRouter.get("/history", validateOrderHistoryQuery, getOrderHistory);
// orderRouter.get("/:orderId", validateOrderId, getOrderDetails);
// orderRouter.patch("/:orderId/cancel", validateOrderId, cancelOrder);

// // Admin routes with validation
// orderRouter.get("/admin/all", AdminAuth, validateAdminOrderQuery, getAllOrders);

export default orderRouter;
