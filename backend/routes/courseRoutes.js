import express from "express";
import multer from "multer";
import {
  addChapter,
  addLecture,
  createCourse,
  getAllCourses,
  getCourseById,
  editCourse,
  deleteCourse,
  editChapter,
    deleteChapter,
  
  editLecture,
  deleteLecture,
  getCourseContent,
  createProject,
  submitProject,
  getUserProjects
} from "../controllers/courseController.js";
import AdminAuth from "../middleware/adminauth.js";
import {protect} from "../middleware/auth.js";


const router = express.Router();
 const upload = multer({ dest: "uploads/"});

router.post("/create", AdminAuth,  upload.single("CourseThumbnail"), createCourse);
router.get("/all", getAllCourses);
router.get("/:id", getCourseById);
router.post("/:courseId/add-chapter", AdminAuth, addChapter);
router.post(
  "/:courseId/add-lecture/:chapterId",
  AdminAuth,
  upload.single("lectureUrl"),
  addLecture
);
router.put("/:id", AdminAuth, editCourse);
router.delete("/:id", AdminAuth,deleteCourse);
router.put("/:courseId/chapters/:chapterId", AdminAuth,editChapter);
router.delete("/:courseId/chapters/:chapterId", deleteChapter);
router.put("/:courseId/chapters/:chapterId/lectures/:lectureId", editLecture);
router.delete("/:courseId/chapters/:chapterId/lectures/:lectureId", deleteLecture);
router.get("/:courseId/content", getCourseContent);

// Projects
router.post("/:courseId/projects", AdminAuth, createProject); 
router.post("/:courseId/projects/:projectId/submit", protect, submitProject);
router.get("/:courseId/mysubmissions",AdminAuth,getUserProjects); // get user’s projects



export default router;
