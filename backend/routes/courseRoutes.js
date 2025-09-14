import express from "express";
import {
  addChapter,
  addLecture,
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  editCourse,
  deleteCourse,
  editChapter,
  deleteChapter,
  editLecture,
  deleteLecture,
  getCourseContent,
  createProject,
  submitProject,
  getUserProjects,
  searchCourses,
  getFeaturedCourses,
  getCoursesByCategory,
  updateSubmissionStatus,
} from "../controllers/courseController.js";
import AdminAuth from "../middleware/adminauth.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Static routes first (these must come before parameterized routes)
router.get("/search", searchCourses); // Search courses with filters
router.get("/featured", getFeaturedCourses); // Get featured courses
router.get("/all", getAllCourses); // Get all courses

// Category routes
router.get("/category/:categoryId", getCoursesByCategory); // Get courses by category

// Title/slug routes
router.get("/by-title/:slug", getCourseBySlug); // Get course by slug

// Course management routes (Admin only)
router.post(
  "/create",
  AdminAuth,
  upload.fields([
    { name: "CourseThumbnail", maxCount: 1 },
    { name: "instructorAvatar", maxCount: 1 },
  ]),
  createCourse
);

// Course content routes (these must come before generic /:id route)
router.get("/:courseId/content", getCourseContent);

// Chapter management routes (Admin only)
router.post("/:courseId/chapters", AdminAuth, addChapter);
router.put("/:courseId/chapters/:chapterId", AdminAuth, editChapter);
router.delete("/:courseId/chapters/:chapterId", AdminAuth, deleteChapter);

// Lecture management routes (Admin only)
router.post(
  "/:courseId/chapters/:chapterId/lectures",
  AdminAuth,
  upload.single("lectureFile"),
  addLecture
);
router.put(
  "/:courseId/chapters/:chapterId/lectures/:lectureId",
  AdminAuth,
  editLecture
);
router.delete(
  "/:courseId/chapters/:chapterId/lectures/:lectureId",
  AdminAuth,
  deleteLecture
);

// Project management routes
router.post(
  "/:courseId/projects",
  AdminAuth,
  upload.single("projectFile"),
  createProject
);
router.get("/:courseId/projects", getUserProjects); // Get user's project submissions
router.post(
  "/:courseId/projects/:projectId/submit",
  protect,
  upload.single("submissionFile"),
  submitProject
);

// Admin submission management
router.put(
  "/:courseId/submissions/:submissionId",
  AdminAuth,
  updateSubmissionStatus
);

// Generic course routes (these must come LAST)
router.get("/:id", getCourseById); // Get course by ID
router.put(
  "/:id",
  AdminAuth,
  upload.fields([
    { name: "CourseThumbnail", maxCount: 1 },
    { name: "instructorAvatar", maxCount: 1 },
  ]),
  editCourse
); // Update course
router.delete("/:id", AdminAuth, deleteCourse); // Delete course

export default router;
