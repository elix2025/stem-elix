// backend/models/CourseModel.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: {
      type: String,
      required: true,
    },
    lectureUrl: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Validate YouTube URL format
          return /^(https:\/\/)?(www\.)?(youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}$/.test(v);
        },
        message: 'Invalid YouTube embed URL'
      }
    },

    youtubeData: {
      videoId: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9_-]{11}$/, 'Invalid YouTube video ID']
      },
      isUnlisted: {
        type: Boolean,
        default: true,
        required: true
      }
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

const ProjectSchema = new mongoose.Schema({

  projectId: { type: String, required: true },
  projectName: {
      type: String,
      required: true
      
    },
  
    ProjectDescription: {
      type: String,
      required: true
    },
  
    projectupload: {
      type: String,
      required: true
    },
    updatedAt: {
      type: Date,

    }

}, {_id:false});

const SubmissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  submissionFile: { type: String, required: true }, // file or link
  submittedAt: { type: Date, default: Date.now }
});


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
  duration: { type: String, required: true },
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
    default: "active",
   
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

  project: [ProjectSchema],

  submissions: [SubmissionSchema]



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
