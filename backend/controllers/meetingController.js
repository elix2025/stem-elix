// meetingController.js
import axios from "axios";
import { getZoomAccessToken } from "./zoomAuth.js";
import Meeting from "../models/meetingmodel.js";

export const scheduleZoomMeeting = async (req, res) => {
  try {
    const { topic, start_time, duration } = req.body;

    const token = await getZoomAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // scheduled
        start_time, // "2025-09-20T15:00:00Z" (UTC)
        duration, // minutes
        timezone: "Asia/Kolkata",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const meeting = new Meeting({

    // Save meeting details in DB
    // Example: { topic, start_time, duration, join_url: meeting.join_url }

  topic,
  start_time,
  duration,
  join_url: response.data.join_url,
  start_url: response.data.start_url,
  userId: req.user._id, // assuming auth middleware
});

await meeting.save();

    res.json({
      success: true,
      meetingLink: meeting.join_url,
      meetingId: meeting.id,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to schedule meeting" });
  }
};
