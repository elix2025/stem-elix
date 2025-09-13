import express from "express";
import {
  createOrder,
  verifyPayment,
  getOrderHistory,
  getOrderDetails,
  cancelOrder,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import AdminAuth from "../middleware/adminauth.js";
import {
  validateCreateOrder,
  validatePaymentVerification,
  validateOrderId,
  validateOrderHistoryQuery,
  validateAdminOrderQuery,
} from "../middleware/validation.js";

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

// User routes with validation
orderRouter.post("/create", validateCreateOrder, createOrder);
orderRouter.post("/verify", validatePaymentVerification, verifyPayment);
orderRouter.get("/history", validateOrderHistoryQuery, getOrderHistory);
orderRouter.get("/:orderId", validateOrderId, getOrderDetails);
orderRouter.patch("/:orderId/cancel", validateOrderId, cancelOrder);

// Admin routes with validation
orderRouter.get("/admin/all", AdminAuth, validateAdminOrderQuery, getAllOrders);

export default orderRouter;
