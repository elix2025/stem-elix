import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    timeSpent: { type: Number, default: 0 },
    completedAt: { type: Date },
    watchPercentage: { type: Number, default: 0 },
    lastWatchedPosition: { type: Number, default: 0 },
  },
  { _id: false }
);

const chapterProgressSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    completedLectures: { type: Number, default: 0 },
    totalLectures: { type: Number, required: true },
    completionPercentage: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    lectures: [lectureProgressSchema],
  },
  { _id: false }
);

const AttendanceSchema = new mongoose.Schema({
  lectureId: { type: String, required: true }, // matches lectureSchema.lectureId
  attended: { type: Boolean, default: false },
  totalSeconds: { type: Number, default: 0 },
}, { _id: false });

const ProjectProgressSchema = new mongoose.Schema({
  projectId: { type: String, required: true }, // matches ProjectSchema.projectId
  submitted: { type: Boolean, default: false },
  submissionFile: String,
  submittedAt: Date,
  grade: { type: Number, min: 0, max: 100 },
  reviewerNotes: String,
}, { _id: false });


const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel",
    required: true,
  },

  // Overall course progress
  overallProgress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  totalTimeSpent: { type: Number, default: 0 },

  // Chapter and lecture progress
  chapters: [chapterProgressSchema],
  attendance: [AttendanceSchema],
  project: [ProjectProgressSchema],

   // Quiz scores
  // quizScores: [quizScoreSchema],
  // averageQuizScore: { type: Number, default: 0 },

  // Additional tracking fields
  // streak: { type: Number, default: 0 },
  lastAccessedDate: { type: Date, default: Date.now },
  certificateEarned: { type: Boolean, default: false },
  studySessionCount: { type: Number, default: 0 },
  skillsAcquired: [{ type: String }],

  // Progress milestones
  milestones: [
    {
      type: {
        type: String,
        enum: [
          "first_lecture",
          "chapter_complete",
          "quiz_passed",
          "course_complete",
        ],
      },
      achievedAt: { type: Date, default: Date.now },
      chapterId: String,
      lectureId: String,
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Compound index for efficient queries
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
ProgressSchema.index({ userId: 1 });
ProgressSchema.index({ courseId: 1 });

// Update the updatedAt field before saving
ProgressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Progress", ProgressSchema);



// const quizScoreSchema = new mongoose.Schema(
//   {
//     quizId: { type: String, required: true },
//     score: { type: Number, required: true },
//     maxScore: { type: Number, required: true },
//     percentage: { type: Number, required: true },
//     attemptedAt: { type: Date, default: Date.now },
//     timeTaken: { type: Number },
//     correctAnswers: { type: Number, required: true },
//     totalQuestions: { type: Number, required: true },
//   },
//   { _id: false }
// );

