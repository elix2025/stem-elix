import Progress from "../models/progressmodel.js";
import Course from "../models/CourseModel.js";

// Initialize progress for a user when they start a course
export const initializeCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id; // Get user ID from auth middleware

    console.log("Initializing progress for user:", userId, "course:", courseId);

    const existingProgress = await Progress.findOne({ userId, courseId });
    if (existingProgress) {
      return res.status(200).json({
        success: true,
        message: "Progress already exists",
        progress: existingProgress,
      });
    }

    // Get course details to initialize chapter structure
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Initialize chapter progress structure
    const chaptersProgress = course.CourseContent.map((chapter) => ({
      chapterId: chapter.chapterId,
      totalLectures: chapter.chapterContent.length,
      lectures: chapter.chapterContent.map((lecture) => ({
        lectureId: lecture.lectureId,
      })),
    }));

    const newProgress = new Progress({
      userId,
      courseId,
      chapters: chaptersProgress,
      studySessionCount: 1,
    });

    const savedProgress = await newProgress.save();
    console.log(
      `Progress initialized for user ${userId} in course ${courseId}`
    );

    res.status(201).json({
      success: true,
      message: "Course progress initialized successfully",
      progress: savedProgress,
    });
  } catch (error) {
    console.error("Error initializing course progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update lecture progress
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, chapterId, lectureId } = req.params;
    const { timeSpent, watchPercentage, isCompleted, lastWatchedPosition } =
      req.body;
    const userId = req.user._id;

    console.log("Updating lecture progress:", {
      userId,
      courseId,
      chapterId,
      lectureId,
    });

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        message: "Progress not found. Please initialize course progress first.",
      });
    }

    // Find chapter
    const chapter = progress.chapters.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Find lecture
    const lecture = chapter.lectures.find((lec) => lec.lectureId === lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Update lecture progress
    const wasCompleted = lecture.isCompleted;
    lecture.timeSpent = (lecture.timeSpent || 0) + (timeSpent || 0);
    lecture.watchPercentage = watchPercentage || lecture.watchPercentage;
    lecture.lastWatchedPosition =
      lastWatchedPosition || lecture.lastWatchedPosition;

    if (isCompleted && !wasCompleted) {
      lecture.isCompleted = true;
      lecture.completedAt = new Date();
      chapter.completedLectures += 1;

      // Add milestone
      progress.milestones.push({
        type: "first_lecture",
        lectureId: lectureId,
        chapterId: chapterId,
      });
    }

    // Update chapter progress
    chapter.completionPercentage = Math.round(
      (chapter.completedLectures / chapter.totalLectures) * 100
    );
    chapter.timeSpent = chapter.lectures.reduce(
      (total, lec) => total + (lec.timeSpent || 0),
      0
    );

    if (
      chapter.completedLectures === chapter.totalLectures &&
      !chapter.isCompleted
    ) {
      chapter.isCompleted = true;
      progress.milestones.push({
        type: "chapter_complete",
        chapterId: chapterId,
      });
    }

    // Update overall progress
    const totalLectures = progress.chapters.reduce(
      (total, chap) => total + chap.totalLectures,
      0
    );
    const completedLectures = progress.chapters.reduce(
      (total, chap) => total + chap.completedLectures,
      0
    );
    progress.overallProgress = Math.round(
      (completedLectures / totalLectures) * 100
    );
    progress.totalTimeSpent = progress.chapters.reduce(
      (total, chap) => total + chap.timeSpent,
      0
    );
    progress.lastAccessedDate = new Date();

    // Check if course is completed
    if (progress.overallProgress === 100 && !progress.isCompleted) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
      progress.certificateEarned = true;
      progress.milestones.push({
        type: "course_complete",
      });
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Lecture progress updated successfully",
      progress,
    });
  } catch (error) {
    console.error("Error updating lecture progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's progress for a specific course
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId })
      .populate("courseId", "title CourseThumbnail duration")
      .populate("userId", "name email");

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all progress for a user
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("getUserProgress called for userId:", userId);

    const allProgress = await Progress.find({ userId })
      .populate("courseId", "title CourseThumbnail duration price")
      .sort({ lastAccessedDate: -1 });

    console.log("Found progress records:", allProgress.length);

    res.status(200).json({
      success: true,
      progress: allProgress,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add quiz score
export const addQuizScore = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      quizId,
      score,
      maxScore,
      correctAnswers,
      totalQuestions,
      timeTaken,
    } = req.body;
    const userId = req.user._id;

    if (
      !quizId ||
      score === undefined ||
      !maxScore ||
      !correctAnswers ||
      !totalQuestions
    ) {
      return res.status(400).json({ message: "Missing required quiz fields" });
    }

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    const percentage = Math.round((score / maxScore) * 100);

    const quizScore = {
      quizId,
      score,
      maxScore,
      percentage,
      correctAnswers,
      totalQuestions,
      timeTaken,
    };

    progress.quizScores.push(quizScore);

    // Update average quiz score
    const totalQuizzes = progress.quizScores.length;
    const totalPercentage = progress.quizScores.reduce(
      (sum, quiz) => sum + quiz.percentage,
      0
    );
    progress.averageQuizScore = Math.round(totalPercentage / totalQuizzes);

    // Add milestone if quiz passed (assuming 70% is passing)
    if (percentage >= 70) {
      progress.milestones.push({
        type: "quiz_passed",
      });
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Quiz score added successfully",
      progress,
    });
  } catch (error) {
    console.error("Error adding quiz score:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get all progress for a specific course
export const getCourseProgressAdmin = async (req, res) => {
  try {
    const { courseId } = req.params;

    const allProgress = await Progress.find({ courseId })
      .populate("userId", "name email")
      .populate("courseId", "title")
      .sort({ overallProgress: -1 });

    res.status(200).json({
      success: true,
      progress: allProgress,
    });
  } catch (error) {
    console.error("Error fetching course progress for admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get overall statistics
export const getProgressStatistics = async (req, res) => {
  try {
    const totalUsers = await Progress.distinct("userId").countDocuments();
    const completedCourses = await Progress.countDocuments({
      isCompleted: true,
    });
    const averageProgress = await Progress.aggregate([
      { $group: { _id: null, avgProgress: { $avg: "$overallProgress" } } },
    ]);

    const stats = {
      totalActiveUsers: totalUsers,
      completedCourses,
      averageProgress: Math.round(averageProgress[0]?.avgProgress || 0),
      certificatesEarned: await Progress.countDocuments({
        certificateEarned: true,
      }),
    };

    res.status(200).json({
      success: true,
      statistics: stats,
    });
  } catch (error) {
    console.error("Error fetching progress statistics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get progress for specific user (admin only)
export const getUserProgressAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const userProgress = await Progress.find({ userId })
      .populate("courseId", "title CourseThumbnail duration price")
      .sort({ lastAccessedDate: -1 });

    res.status(200).json({
      success: true,
      progress: userProgress,
    });
  } catch (error) {
    console.error("Error fetching user progress for admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get recent activity (last 10 progress updates)
export const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const recentActivity = await Progress.find({ userId })
      .populate("courseId", "title CourseThumbnail")
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("courseId overallProgress lastAccessedDate updatedAt milestones");

    res.status(200).json({
      success: true,
      activity: recentActivity,
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update study streak
export const updateStreak = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Find all user's progress records
    const userProgressRecords = await Progress.find({ userId });

    for (let progress of userProgressRecords) {
      const lastAccessed = new Date(progress.lastAccessedDate);
      const daysDiff = Math.floor(
        (today - lastAccessed) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        // Same day, don't update streak
        continue;
      } else if (daysDiff === 1) {
        // Consecutive day, increment streak
        progress.streak += 1;
        progress.lastAccessedDate = today;
        await progress.save();
      } else {
        // Streak broken, reset to 1
        progress.streak = 1;
        progress.lastAccessedDate = today;
        await progress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Streak updated successfully",
    });
  } catch (error) {
    console.error("Error updating streak:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get leaderboard (top performers)
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Progress.aggregate([
      {
        $group: {
          _id: "$userId",
          totalProgress: { $avg: "$overallProgress" },
          completedCourses: { $sum: { $cond: ["$isCompleted", 1, 0] } },
          totalTimeSpent: { $sum: "$totalTimeSpent" },
          averageQuizScore: { $avg: "$averageQuizScore" },
          maxStreak: { $max: "$streak" },
        },
      },
      {
        $lookup: {
          from: "users", // adjust this to match your user collection name
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          userId: "$_id",
          name: "$userInfo.name",
          email: "$userInfo.email",
          totalProgress: { $round: ["$totalProgress", 2] },
          completedCourses: 1,
          totalTimeSpent: 1,
          averageQuizScore: { $round: ["$averageQuizScore", 2] },
          maxStreak: 1,
        },
      },
      {
        $sort: { totalProgress: -1, completedCourses: -1 },
      },
      {
        $limit: 20,
      },
    ]);

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};
