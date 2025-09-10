import Progress from "../models/progressmodel.js";
import CourseModel from "../models/CourseModel.js";

/**
 * Helper: calculate overall course progress
 * (basic version – you can tweak weights)
 */
const calculateOverallProgress = (progressDoc) => {
  let lectureCompletion = 0;
  let chapterCompletion = 0;
  let attendanceCompletion = 0;
  let projectCompletion = 0;

  // Lectures
  const allLectures = progressDoc.chapters.flatMap(c => c.lectures);
  if (allLectures.length > 0) {
    const completedLectures = allLectures.filter(l => l.isCompleted).length;
    lectureCompletion = (completedLectures / allLectures.length) * 100;
  }

  // Chapters
  if (progressDoc.chapters.length > 0) {
    const completedChapters = progressDoc.chapters.filter(c => c.isCompleted).length;
    chapterCompletion = (completedChapters / progressDoc.chapters.length) * 100;
  }

  // Attendance
  if (progressDoc.attendance.length > 0) {
    const attendedClasses = progressDoc.attendance.filter(a => a.attended).length;
    attendanceCompletion = (attendedClasses / progressDoc.attendance.length) * 100;
  }

  // Projects
  if (progressDoc.project.length > 0) {
    const submittedProjects = progressDoc.project.filter(p => p.submitted).length;
    projectCompletion = (submittedProjects / progressDoc.project.length) * 100;
  }

  // Simple average (you could add weights here)
  const overall = (lectureCompletion + chapterCompletion + attendanceCompletion + projectCompletion) / 4;
  return Math.round(overall);
};

/**
 * Initialize progress for a user & course
 */
export const initializeProgress = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Check if already exists
    let progress = await Progress.findOne({ userId, courseId });
    if (progress) return res.status(200).json(progress);

    // Get course details (chapters + lectures + projects)
    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Build initial structure
    const chapters = course.CourseContent.map(ch => ({
      chapterId: ch.chapterId,
      totalLectures: ch.chapterContent.length,
      lectures: ch.chapterContent.map(l => ({
        lectureId: l.lectureId,
      })),
    }));

    const projects = course.project.map(p => ({
      projectId: p.projectId,
    }));

    progress = new Progress({
      userId,
      courseId,
      chapters,
      project: projects,
    });

    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    console.error("Init Progress Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update lecture progress (recorded video watching)
 */
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { timeSpent, watchPercentage, lastWatchedPosition, isCompleted } = req.body;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    // Find lecture
    for (const chapter of progress.chapters) {
      const lecture = chapter.lectures.find(l => l.lectureId === lectureId);
      if (lecture) {
        lecture.timeSpent += timeSpent || 0;
        lecture.watchPercentage = Math.max(lecture.watchPercentage, watchPercentage || 0);
        lecture.lastWatchedPosition = lastWatchedPosition ?? lecture.lastWatchedPosition;

        if (isCompleted && !lecture.isCompleted) {
          lecture.isCompleted = true;
          lecture.completedAt = new Date();
          chapter.completedLectures += 1;
          chapter.completionPercentage = (chapter.completedLectures / chapter.totalLectures) * 100;
          if (chapter.completedLectures === chapter.totalLectures) {
            chapter.isCompleted = true;
          }
        }
      }
    }

    progress.overallProgress = calculateOverallProgress(progress);
    progress.lastAccessedDate = new Date();
    await progress.save();

    res.status(200).json(progress);
  } catch (err) {
    console.error("Update Lecture Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Mark attendance for a live class
 */
export const markAttendance = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { attended, totalSeconds } = req.body;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    let attendance = progress.attendance.find(a => a.lectureId === lectureId);
    if (!attendance) {
      attendance = { lectureId, attended, totalSeconds };
      progress.attendance.push(attendance);
    } else {
      attendance.attended = attended ?? attendance.attended;
      attendance.totalSeconds += totalSeconds || 0;
    }

    progress.overallProgress = calculateOverallProgress(progress);
    await progress.save();

    res.status(200).json(progress);
  } catch (err) {
    console.error("Mark Attendance Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Submit or update a project
 */
export const submitProject = async (req, res) => {
  try {
    const { courseId, projectId } = req.params;
    const { submissionFile, grade, reviewerNotes } = req.body;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });

    const project = progress.project.find(p => p.projectId === projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.submitted = true;
    project.submissionFile = submissionFile || project.submissionFile;
    project.submittedAt = new Date();
    if (grade !== undefined) project.grade = grade;
    if (reviewerNotes) project.reviewerNotes = reviewerNotes;

    progress.overallProgress = calculateOverallProgress(progress);
    await progress.save();

    res.status(200).json(progress);
  } catch (err) {
    console.error("Submit Project Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId })
      .populate("courseId", "title thumbnail") // optional: course info
      .lean();

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (err) {
    console.error("Get Progress Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progresses = await Progress.find({ userId })
      .populate("courseId", "title thumbnail") // optional
      .lean();

    res.status(200).json(progresses);
  } catch (err) {
    console.error("Get User Progress Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};