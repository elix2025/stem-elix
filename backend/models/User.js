import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  images: [{ type: String }],
});

const courseProgressSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "CourseModel", required: true },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  progress: { type: Number, default: 0 },
  enrolledAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: false,
    },
    institute: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    reviews: {
      type: [ReviewSchema],
      default: [],
    },
    // Student-specific fields
    totalCoursesEnrolled: { type: Number, default: 0 },
    coursesEnrolled: { 
      type: [courseProgressSchema],
      default: [],
    },
    coursesCompleted: { type: Number, default: 0 },
    // Add other info as needed
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
