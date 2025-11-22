import express from "express";
import {
  register,
  loginUser,
  adminLogin,
  enrollCourse,
  completeCourse,
  getUserProfile,
  getAllStudents,
  getStudentDetails,
  getEnrollmentStats
} from "../controllers/userController.js";
import { getUserEnrollmentStats } from "../controllers/userb.js";
import { protect } from "../middleware/auth.js";
import AdminAuth from "../middleware/adminauth.js";

const userRouter = express.Router();

// Admin login route
userRouter.post("/admin/login",adminLogin);
// Public user routes
userRouter.post("/register", register);
userRouter.post("/login", loginUser);

// Student (now user) routes
userRouter.get("/me", protect, getUserProfile);
userRouter.get("/enrollment-stats", protect, getUserEnrollmentStats);
userRouter.post("/enroll", protect, enrollCourse);
userRouter.post("/complete", protect, completeCourse);

// Admin routes for student management
userRouter.get("/admin/students", AdminAuth, getAllStudents);
userRouter.get("/admin/students/:studentId", AdminAuth, getStudentDetails);
userRouter.get("/admin/enrollment-stats", AdminAuth, getEnrollmentStats);

export default userRouter;