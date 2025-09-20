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
       rejectPayment,
       getPayment,
       getAllPayments
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

orderRouter.post("/create", protect,createPayment);

orderRouter.post("/verify", AdminAuth, verifyPayment );

orderRouter.post("/reject", AdminAuth, rejectPayment );

orderRouter.get("/payments", AdminAuth, getAllPayments);

orderRouter.get("/getreciept", AdminAuth, getPayment);

// User routes with validation


// orderRouter.get("/history", validateOrderHistoryQuery, getOrderHistory);
// orderRouter.get("/:orderId", validateOrderId, getOrderDetails);
// orderRouter.patch("/:orderId/cancel", validateOrderId, cancelOrder);

// // Admin routes with validation
// orderRouter.get("/admin/all", AdminAuth, validateAdminOrderQuery, getAllOrders);

export default orderRouter;
