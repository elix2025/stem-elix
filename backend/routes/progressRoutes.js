import express from "express";
import {
  initializeCourseProgress,
  updateLectureProgress,
  getCourseProgress,
  getUserProgress,
  addQuizScore,
  getCourseProgressAdmin,
  getProgressStatistics,
  getUserProgressAdmin,
  getRecentActivity,
  updateStreak,
  getLeaderboard,
} from "../controllers/ProgressController.js";
import { protect } from "../middleware/auth.js";
import AdminAuth from "../middleware/adminauth.js";
// import {
//   testProgressAPIs,
//   testProgressFunction,
// } from "../utils/testProgress.js";

const progressRouter = express.Router();

// User routes (require authentication)
progressRouter.post("/initialize", protect, initializeCourseProgress);

// Update lecture progress (real-time updates)
progressRouter.put(
  "/course/:courseId/chapter/:chapterId/lecture/:lectureId",
  protect,
  updateLectureProgress
);

// Get user's progress for a specific course
progressRouter.get("/course/:courseId", protect, getCourseProgress);

// Get all progress for logged-in user
progressRouter.get("/user", protect, getUserProgress);

// Add quiz score
progressRouter.post("/course/:courseId/quiz", protect, addQuizScore);

// Update study streak
progressRouter.post("/update-streak", protect, updateStreak);

// Get recent activity (last 10 progress updates)
progressRouter.get("/recent-activity", protect, getRecentActivity);

// Get leaderboard (top performers)
progressRouter.get("/leaderboard", protect, getLeaderboard);

// Admin Routes (require admin authentication middleware)
// Get all progress for a specific course (admin view)
progressRouter.get(
  "/admin/course/:courseId",
  protect,
  AdminAuth,
  getCourseProgressAdmin
);

// Get overall platform statistics (admin dashboard)
progressRouter.get(
  "/admin/statistics",
  protect,
  AdminAuth,
  getProgressStatistics
);

// Get progress for specific user (admin only)
progressRouter.get(
  "/admin/user/:userId",
  protect,
  AdminAuth,
  getUserProgressAdmin
);

// Test routes (development only - remove in production)
// if (process.env.NODE_ENV !== "production") {
//   // Run full progress API test suite
//   progressRouter.get("/test/full", async (req, res) => {
//     try {
//       const result = await testProgressAPIs();
//       res.json(result);
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Test failed",
//         error: error.message,
//       });
//     }
//   });

  // Test specific progress function
//   progressRouter.post("/test/function", async (req, res) => {
//     try {
//       const { functionName, params } = req.body;
//       const result = await testProgressFunction(functionName, params);
//       res.json({
//         success: true,
//         functionName,
//         result,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Function test failed",
//         error: error.message,
//       });
//     }
//   });
// }

export default progressRouter;
