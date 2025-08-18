// import express from 'express';
// import {
//     initializeCourseProgress,
//     updateLectureProgress,
//   getCourseProgress,
//   getUserProgress,
//   addQuizScore,
//   getCourseProgressAdmin,
//   getProgressStatistics,
//   getUserProgressAdmin,
//   getRecentActivity,
//   updateStreak,
//   getLeaderboard,

// } from '../controllers/ProgressController.js';

// const progressRouter = express.Router;

// progressRouter.post('/initialize', initializeCourseProgress);

// // Update lecture progress (real-time updates)
// progressRouter.post('/course/:courseId/chapter/:chapterId/lecture/:lectureId', updateLectureProgress);

// // Get user's progress for a specific course
// progressRouter.get('/course/:courseId', getCourseProgress);

// // Get all progress for logged-in user
// progressRouter.get('/user', getUserProgress);

// // Add quiz score
// progressRouter.post('/course/:courseId/quiz', addQuizScore);

// // Admin Routes (require admin authentication middleware)
// // Get all progress for a specific course (admin view)
// progressRouter.get('/admin/course/:courseId', getCourseProgressAdmin);

// // Get overall platform statistics (admin dashboard)
// progressRouter.get('/admin/statistics', getProgressStatistics);

// // Import additional controller functions


// // Additional useful routes

// // Get progress for specific user (admin only)
// progressRouter.get('/admin/user/:userId', getUserProgressAdmin);

// // Get recent activity (last 10 progress updates)
// progressRouter.get('/recent-activity', getRecentActivity);

// // Update study streak
// progressRouter.post('/update-streak', updateStreak);

// // Get leaderboard (top performers)
// progressRouter.get('/leaderboard', getLeaderboard);

// export default progressRouter;