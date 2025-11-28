// MeetingModel.js
import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    start_time: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    join_url: {
      type: String,
      required: true,
    },
    start_url: {
      type: String,
      default: "",
    },
    zoomMeetingId: {
      type: String,
      required: true,
    },
    // Teacher info - no verification needed
    teacherName: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      default: "", // Optional course reference
    },
    courseName: {
      type: String,
      default: "",
    },
    enrolledStudents: [
      {
        email: String,
        name: String,
        emailSent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Meeting", MeetingSchema);
