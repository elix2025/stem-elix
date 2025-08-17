import express from "express";
import multer from "multer";
import {
  addChapter,
  addLecture,
  createCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/courseController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/"});

router.post("/create", protect, upload.single("CourseThumbnail"), createCourse);
router.get("/all", getAllCourses);
router.get("/:id", getCourseById);
router.post("/:courseId/add-chapter", protect, addChapter);
router.post(
  "/:courseId/add-lecture/:chapterId",
  protect,
  upload.single("lectureUrl"),
  addLecture
);

export default router;
