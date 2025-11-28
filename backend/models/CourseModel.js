// backend/models/CourseModel.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: {
      type: String,
      required: true,
      index: true, // Index for faster lookup
    },
    lectureTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Lecture title cannot exceed 200 characters"],
    },
    lectureDuration: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Validate duration format (e.g., "5:30", "10:45")
          return /^\d{1,2}:\d{2}$/.test(v);
        },
        message: "Duration must be in format MM:SS or HH:MM",
      },
    },
    lectureUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Validate YouTube URL format
          return /^(https:\/\/)?(www\.)?(youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}$/.test(
            v
          );
        },
        message: "Invalid YouTube embed URL",
      },
    },
    youtubeData: {
      videoId: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube video ID"],
        index: true, // Index for video ID lookups
      },
      isUnlisted: {
        type: Boolean,
        default: true,
        required: true,
      },
    },
    isPreviewFree: {
      type: Boolean,
      required: true,
      default: false,
    },
    lectureOrder: {
      type: Number,
      required: true,
      min: [1, "Lecture order must be at least 1"],
    },
  },
  {
    _id: false,
    timestamps: false, // Handled at course level
  }
);

// Add index for lecture ordering within chapters
lectureSchema.index({ lectureOrder: 1 });

const chapterSchema = new mongoose.Schema(
  {
    chapterId: {
      type: String,
      required: true,
      index: true, // Index for faster lookup
    },
    chapterOrder: {
      type: Number,
      required: true,
      min: [1, "Chapter order must be at least 1"],
    },
    ChapterTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: [150, "Chapter title cannot exceed 150 characters"],
    },
    chapterContent: {
      type: [lectureSchema],
      validate: {
        validator: function (lectures) {
          // Ensure unique lecture orders within chapter
          const orders = lectures.map((l) => l.lectureOrder);
          return orders.length === new Set(orders).size;
        },
        message: "Lecture orders must be unique within a chapter",
      },
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

// Add compound index for chapter ordering
chapterSchema.index({ chapterOrder: 1 });

const ProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      index: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },
    ProjectDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Project description cannot exceed 1000 characters"],
    },
    
    projectupload: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const SubmissionSchema = new mongoose.Schema({
  projectId: {
    type: String, // Changed from ObjectId to String to match ProjectSchema
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Index for user submissions lookup
  },
  submissionFile: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "reviewed", "approved", "rejected"],
    default: "pending",
  },
  feedback: {
    type: String,
    maxlength: [500, "Feedback cannot exceed 500 characters"],
  },
});

// Compound index for efficient submission queries
SubmissionSchema.index({ userId: 1, projectId: 1 });
SubmissionSchema.index({ submittedAt: -1 }); // For sorting by submission date

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Course title cannot exceed 200 characters"],
      index: "text", // Text index for search
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    coursename: {
      type: String,
      required: true,
      enum: {
        values: ["Junior", "Explorer", "Master"],
        message: "Category must be Junior, Explorer, or Master",
      },
    },
    levelNumber: {
      type: Number,
      required: true,
      min: [1, "Level number must be at least 1"],
      max: [10, "Level number cannot exceed 10"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    CourseThumbnail: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: "Course thumbnail must be a valid image URL",
      },
    },
    CourseContent: {
      type: [chapterSchema],
      validate: {
        validator: function (chapters) {
          // Ensure unique chapter orders
          const orders = chapters.map((c) => c.chapterOrder);
          return orders.length === new Set(orders).size;
        },
        message: "Chapter orders must be unique within a course",
      },
    },
    duration: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Validate duration format (e.g., "2 hours", "30 minutes", "1.5 hours")
          return /^\d+(\.\d+)?\s*(hour|hours|minute|minutes|day|days|week|weeks)$/i.test(
            v
          );
        },
        message: 'Duration must be in format like "2 hours" or "30 minutes"',
      },
    },
    gradeRange: {
      min: {
        type: Number,
        required: true,
        min: [1, "Minimum grade must be at least 1"],
        max: [12, "Minimum grade cannot exceed 12"],
      },
      max: {
        type: Number,
        required: true,
        min: [1, "Maximum grade must be at least 1"],
        max: [12, "Maximum grade cannot exceed 12"],
        validate: {
          validator: function (value) {
            // Handle case where gradeRange.min might not be available during partial updates
            if (!this.gradeRange || !this.gradeRange.min) {
              return true; // Skip validation if min is not available
            }
            return value >= this.gradeRange.min;
          },
          message:
            "Maximum grade must be greater than or equal to minimum grade",
        },
      },
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    enrollmentRequirements: {
    requiresPayment: { type: Boolean, default: true }
   },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },

    // New instructor information
    instructor: {
      name: {
        type: String,
        trim: true,
        maxlength: [100, "Instructor name cannot exceed 100 characters"],
      },
      bio: {
        type: String,
        trim: true,
        maxlength: [500, "Instructor bio cannot exceed 500 characters"],
      },
      avatar: {
        type: String,
        validate: {
          validator: function (v) {
            return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
          },
          message: "Instructor avatar must be a valid image URL",
        },
      },
      qualifications: [String],
      experience: String,
      socialLinks: {
        linkedin: String,
        twitter: String,
        website: String,
      },
    },

    // Course highlights/learning outcomes
    highlights: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Highlight cannot exceed 200 characters"],
      },
    ],

    // Course difficulty level
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    // Demo/preview video
    demoVideo: {
      type: String,
      validate: {
        validator: function (v) {
          return (
            !v ||
            /^(https:\/\/)?(www\.)?(youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}$/.test(
              v
            )
          );
        },
        message: "Demo video must be a valid YouTube embed URL",
      },
    },

    // Course prerequisites
    prerequisites: [String],

    // What students will learn
    learningOutcomes: [String],

    // Course language
    language: {
      type: String,
      default: "English",
    },

    // Certificate availability
    hasCertificate: {
      type: Boolean,
      default: true,
    },

    // Course access type
    accessType: {
      type: String,
      enum: ["lifetime", "6months", "1year"],
      default: "lifetime",
    },

    // Admin management fields
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "draft"],
        message: "Status must be active, inactive, or draft",
      },
      default: "draft",
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    enrollmentCount: {
      type: Number,
      default: 0,
      min: [0, "Enrollment count cannot be negative"],
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],
    project: [ProjectSchema],
    submissions: [SubmissionSchema],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields
CourseSchema.virtual("totalLectures").get(function () {
  if (!this.CourseContent || !Array.isArray(this.CourseContent)) {
    return 0;
  }
  return this.CourseContent.reduce((total, chapter) => {
    return total + (chapter.chapterContent ? chapter.chapterContent.length : 0);
  }, 0);
});

CourseSchema.virtual("totalChapters").get(function () {
  if (!this.CourseContent || !Array.isArray(this.CourseContent)) {
    return 0;
  }
  return this.CourseContent.length;
});

CourseSchema.virtual("previewLectures").get(function () {
  if (!this.CourseContent || !Array.isArray(this.CourseContent)) {
    return [];
  }
  const previews = [];
  this.CourseContent.forEach((chapter) => {
    if (chapter.chapterContent) {
      chapter.chapterContent.forEach((lecture) => {
        if (lecture.isPreviewFree) {
          previews.push({
            lectureId: lecture.lectureId,
            lectureTitle: lecture.lectureTitle,
            chapterTitle: chapter.ChapterTitle,
            lectureUrl: lecture.lectureUrl,
          });
        }
      });
    }
  });
  return previews;
});

// Compound indexes for efficient queries
CourseSchema.index({ categoryId: 1, levelNumber: 1 });
CourseSchema.index({ status: 1, featured: -1, order: 1 });
CourseSchema.index({ "gradeRange.min": 1, "gradeRange.max": 1 });
CourseSchema.index({ price: 1 });
CourseSchema.index({ createdAt: -1 });
CourseSchema.index({ "rating.average": -1 });

// Text index for search functionality
CourseSchema.index(
  {
    title: "text",
    description: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10,
      tags: 5,
      description: 1,
    },
  }
);

// Pre-save middleware to generate slug with level number for uniqueness
CourseSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isModified("levelNumber") || this.isNew) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    // Append level number to ensure uniqueness
    this.slug = `${baseSlug}${this.levelNumber || 1}`;
  }
  next();
});

// Static methods for common queries
CourseSchema.statics.findActiveByCategory = function (
  categoryId,
  options = {}
) {
  const query = { status: "active", categoryId };
  return this.find(query)
    .sort({ featured: -1, order: 1, createdAt: -1 })
    .limit(options.limit || 0)
    .select(options.select || "");
};

CourseSchema.statics.findFeatured = function (limit = 10) {
  return this.find({ status: "active", featured: true })
    .sort({ order: 1, "rating.average": -1 })
    .limit(limit)
    .select(
      "title slug CourseThumbnail price duration gradeRange rating categoryId"
    );
};

CourseSchema.statics.searchCourses = function (searchTerm, filters = {}) {
  const query = {
    status: "active",
    $text: { $search: searchTerm },
  };

  if (filters.categoryId) query.categoryId = filters.categoryId;
  if (filters.priceRange) {
    query.price = {
      $gte: filters.priceRange.min || 0,
      $lte: filters.priceRange.max || Number.MAX_SAFE_INTEGER,
    };
  }
  if (filters.gradeRange) {
    query["gradeRange.min"] = { $lte: filters.gradeRange.max || 12 };
    query["gradeRange.max"] = { $gte: filters.gradeRange.min || 1 };
  }

  return this.find(query, { score: { $meta: "textScore" } }).sort({
    score: { $meta: "textScore" },
    "rating.average": -1,
  });
};

// Instance methods
CourseSchema.methods.addEnrollment = function () {
  this.enrollmentCount += 1;
  return this.save();
};

CourseSchema.methods.updateRating = function (newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

CourseSchema.methods.getChapterById = function (chapterId) {
  return this.CourseContent.find((chapter) => chapter.chapterId === chapterId);
};

CourseSchema.methods.getLectureById = function (chapterId, lectureId) {
  const chapter = this.getChapterById(chapterId);
  if (!chapter) return null;
  return chapter.chapterContent.find(
    (lecture) => lecture.lectureId === lectureId
  );
};

export default mongoose.model("CourseModel", CourseSchema);
