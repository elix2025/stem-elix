import express from "express";
import {
  register,
  loginUser,
  adminLogin,
  enrollCourse,
  completeCourse,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

// Admin login route
userRouter.post("/admin/login", adminLogin);
// Public user routes
userRouter.post("/register", register);
userRouter.post("/login", loginUser);

// Student (now user) routes
userRouter.get("/me", protect, getUserProfile);
userRouter.post("/enroll", protect, enrollCourse);
userRouter.post("/complete", protect, completeCourse);

export default userRouter;
