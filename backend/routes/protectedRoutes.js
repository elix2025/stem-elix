import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Admin-only route
router.get("/admin-data", protect, (req, res) => {
  res.json({ message: "Only accessible by admin (role check removed)" });
});

// Student-only route
router.get("/student-data", protect, (req, res) => {
  res.json({ message: "Only accessible by students (role check removed)" });
});

export default router;
