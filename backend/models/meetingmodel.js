// MeetingModel.js
import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  topic: String,
  start_time: Date,
  duration: Number,
  join_url: String,
  start_url: String, // host link (optional)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who scheduled
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Meeting", MeetingSchema);
