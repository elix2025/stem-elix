import express from "express";
import {
  scheduleZoomMeeting,
  getMeetingsByCourse,
  getStudentMeetings,
  getMeetingById,
  cancelMeeting,
  resendMeetingLink,
} from "../controllers/meetingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * Public Routes (No authentication required)
 */

// Schedule a new meeting (PUBLIC - no verification needed)
router.post("/schedule", scheduleZoomMeeting);

// Get single meeting details
router.get("/:meetingId", getMeetingById);

/**
 * Protected Routes (Optional - for future admin panel if needed)
 */

// Get all meetings for a specific course (optional protection)
router.get("/course/:courseId", protect, getMeetingsByCourse);

// Get all meetings for the authenticated student
router.get("/student/my-meetings", protect, getStudentMeetings);

// Cancel a scheduled meeting (optional protection)
router.post("/:meetingId/cancel", protect, cancelMeeting);

// Resend meeting link to a specific student (optional protection)
router.post("/:meetingId/resend/:studentId", protect, resendMeetingLink);

export default router;
