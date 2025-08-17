// backend/models/CourseModel.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: {
      type: Number,
      required: true,
    },
    lectureUrl: {
      type: String,
      required: true,
    },
    isPreviewFree: {
      type: Boolean,
      required: true,
    },
    lectureOrder: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    ChapterTitle: { type: String, required: true },
    chapterContent: [lectureSchema],
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    // enum: ['Junior', 'Explorer','Master'],
    required: true,
  },
  levelNumber: { type: Number, required: true }, // 1, 2, 3
  description: { type: String, required: true },
  // programHighlights: [{ type: String, required: true }],
  CourseThumbnail: { type: String, required: true },
  CourseContent: [chapterSchema],
  duration: { type: Number, required: true },
  gradeRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  price: {
    type: Number,
    required: true,
  },

  // Admin management fields
  status: {
    type: String,
    enum: ["active", "inactive", "draft"],
    default: "draft",
  },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // quiz: [
  //   {
  //     question: { type: String, required: true },
  //     options: { type: [String], required: true },
  //     answer: { type: String, required: true } // correct answer
  //   }
  // ]
});

// Compound index for efficient queries
CourseSchema.index({ categoryId: 1, levelNumber: 1 });

// Update the updatedAt field before saving
CourseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("CourseModel", CourseSchema);
