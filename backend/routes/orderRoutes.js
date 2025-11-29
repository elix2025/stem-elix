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
        getUserPayments,
        testInvoicePDF
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

// Test invoice PDF endpoint - No auth required for testing
orderRouter.get("/test-invoice-pdf", testInvoicePDF);

// Debug endpoint to test admin auth
orderRouter.get("/test-admin", AdminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin authentication successful!",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

// User routes (require user authentication)
orderRouter.post("/create", protect, upload.single("reciept"),createPayment);

// Admin routes (require admin authentication only)
orderRouter.post("/verify/:paymentId", AdminAuth, verifyPayment);
orderRouter.get("/payments", AdminAuth, getAllPayments);
orderRouter.get("/payment/:id", AdminAuth, getPayment);

// User routes (require user authentication)
orderRouter.post("/create", protect, upload.single("reciept"),createPayment);
orderRouter.get("/user/:userId/payments", protect, getUserPayments);

// User routes with validation


// orderRouter.get("/history", validateOrderHistoryQuery, getOrderHistory);
// orderRouter.get("/:orderId", validateOrderId, getOrderDetails);
// orderRouter.patch("/:orderId/cancel", validateOrderId, cancelOrder);

// // Admin routes with validation
// orderRouter.get("/admin/all", AdminAuth, validateAdminOrderQuery, getAllOrders);

export default orderRouter;
