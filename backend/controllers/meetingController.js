// meetingController.js
import axios from "axios";
import { getZoomAccessToken } from "../config/zoomAuth.js";
import Meeting from "../models/meetingmodel.js";
import Course from "../models/CourseModel.js";
import User from "../models/User.js";
import { sendEmail } from "../config/mailer.js";

/**
 * Schedule a meeting - No authentication required
 */
export const scheduleZoomMeeting = async (req, res) => {
  try {
    const { topic, description, start_time, duration, courseId, courseName, teacherName, teacherEmail, studentEmails } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!topic?.trim()) missingFields.push("topic");
    if (!start_time) missingFields.push("start_time");
    if (!duration) missingFields.push("duration");
    if (!teacherName?.trim()) missingFields.push("teacherName");
    if (!teacherEmail?.trim()) missingFields.push("teacherEmail");
    if (!Array.isArray(studentEmails) || studentEmails.length === 0) missingFields.push("studentEmails (array)");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate and parse start_time
    const meetingStartTime = new Date(start_time);
    if (isNaN(meetingStartTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid start_time format. Use ISO 8601 format",
      });
    }

    // Verify meeting is scheduled for the future
    if (meetingStartTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Meeting must be scheduled for a future date/time",
      });
    }

    // Verify duration
    if (duration < 15 || duration > 1440) {
      return res.status(400).json({
        success: false,
        message: "Duration must be between 15 minutes and 24 hours",
      });
    }

    // Get Zoom access token
    const token = await getZoomAccessToken();

    let zoomResponse;
    try {
      zoomResponse = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        {
          topic: topic.trim(),
          type: 2, // scheduled meeting
          start_time: meetingStartTime.toISOString(),
          duration: duration,
          timezone: "Asia/Kolkata",
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: false,
            mute_upon_entry: true,
            waiting_room: false,
            approval_type: 0,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (zoomError) {
      console.error("Zoom API Error:", zoomError.response?.data || zoomError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to create Zoom meeting. Please try again.",
      });
    }

    // Prepare enrolled students data
    const enrolledStudentsData = studentEmails.map((email) => ({
      email: email.trim().toLowerCase(),
      name: email.split("@")[0], // Use email prefix as name if not provided
      emailSent: false,
    }));

    // Save meeting to database
    const meeting = new Meeting({
      topic: topic.trim(),
      description: description?.trim() || "",
      start_time: meetingStartTime,
      duration,
      join_url: zoomResponse.data.join_url,
      start_url: zoomResponse.data.start_url,
      zoomMeetingId: zoomResponse.data.id,
      teacherName: teacherName.trim(),
      teacherEmail: teacherEmail.trim().toLowerCase(),
      courseId: courseId || "",
      courseName: courseName?.trim() || "General Class",
      enrolledStudents: enrolledStudentsData,
      status: "scheduled",
    });

    await meeting.save();

    // Send emails to all students (async)
    const emailResults = await sendMeetingNotificationEmails(meeting);

    res.status(201).json({
      success: true,
      message: "Meeting scheduled successfully",
      meeting: {
        _id: meeting._id,
        topic: meeting.topic,
        start_time: meeting.start_time,
        duration: meeting.duration,
        join_url: meeting.join_url,
        teacherName: meeting.teacherName,
        enrolledStudentsCount: enrolledStudentsData.length,
        emailsSent: emailResults.success,
        emailsFailed: emailResults.failed,
      },
    });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to schedule meeting",
    });
  }
};

/**
 * Send meeting notification emails to all students
 */
async function sendMeetingNotificationEmails(meeting) {
  const results = { success: 0, failed: 0, failedEmails: [] };

  for (const student of meeting.enrolledStudents) {
    try {
      const meetingDate = new Date(meeting.start_time).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🎓 Class Meeting Scheduled</h1>
          </div>
          
          <div style="padding: 20px; background-color: white; border: 1px solid #e0e0e0;">
            <p style="margin-top: 0; font-size: 16px; color: #333;">Hi <strong>${student.name}</strong>,</p>
            
            <p style="color: #555; line-height: 1.6;">Your teacher <strong>${meeting.teacherName}</strong> has scheduled a class meeting. Please join using the link below:</p>
            
            <div style="background-color: #f0f4ff; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 5px 0;"><strong>📌 Topic:</strong> ${meeting.topic}</p>
              <p style="margin: 5px 0;"><strong>📚 Course:</strong> ${meeting.courseName}</p>
              <p style="margin: 5px 0;"><strong>📅 Date & Time:</strong> ${meetingDate}</p>
              <p style="margin: 5px 0;"><strong>⏱️ Duration:</strong> ${meeting.duration} minutes</p>
              ${meeting.description ? `<p style="margin: 5px 0;"><strong>📝 Description:</strong> ${meeting.description}</p>` : ""}
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${meeting.join_url}" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                ▶ Join Meeting
              </a>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              If you have any issues joining, please contact <strong>${meeting.teacherName}</strong> at ${meeting.teacherEmail}.
            </p>
          </div>
          
          <div style="padding: 15px; background-color: #f5f5f5; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">© STEMelix - Learning Platform</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: student.email,
        subject: `📅 Class Meeting Scheduled: ${meeting.topic}`,
        html: htmlContent,
      });

      // Mark email as sent in database
      await Meeting.updateOne(
        { _id: meeting._id, "enrolledStudents.email": student.email },
        { $set: { "enrolledStudents.$.emailSent": true } }
      );

      results.success++;
    } catch (error) {
      console.error(`Failed to send email to ${student.email}:`, error);
      results.failed++;
      results.failedEmails.push(student.email);
    }
  }

  return results;
}

/**
 * Get all meetings for a course (Teacher view)
 */
export const getMeetingsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const teacherId = req.user._id;

    const meetings = await Meeting.find({ courseId, teacherId })
      .populate("enrolledStudents.studentId", "name email")
      .sort({ start_time: -1 })
      .lean();

    res.status(200).json({
      success: true,
      meetings,
      total: meetings.length,
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
    });
  }
};

/**
 * Get all meetings for a student
 */
export const getStudentMeetings = async (req, res) => {
  try {
    const studentId = req.user._id;

    const meetings = await Meeting.find({
      "enrolledStudents.studentId": studentId,
    })
      .populate("teacherId", "name email")
      .populate("courseId", "title coursename")
      .sort({ start_time: -1 })
      .lean();

    res.status(200).json({
      success: true,
      meetings,
      total: meetings.length,
    });
  } catch (error) {
    console.error("Error fetching student meetings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
    });
  }
};

/**
 * Get single meeting details
 */
export const getMeetingById = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const meeting = await Meeting.findById(meetingId)
      .populate("teacherId", "name email")
      .populate("courseId", "title")
      .populate("enrolledStudents.studentId", "name email");

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting",
    });
  }
};

/**
 * Cancel a meeting
 */
export const cancelMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const teacherId = req.user._id;

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    // Verify teacher owns this meeting
    if (meeting.teacherId.toString() !== teacherId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update status
    meeting.status = "cancelled";
    await meeting.save();

    // Send cancellation emails
    const course = await Course.findById(meeting.courseId).lean();
    for (const student of meeting.enrolledStudents) {
      try {
        const meetingDate = new Date(meeting.start_time).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });

        await sendEmail({
          to: student.email,
          subject: `❌ Meeting Cancelled: ${meeting.topic}`,
          html: `
            <p>Dear ${student.name},</p>
            <p>The following meeting has been cancelled:</p>
            <p><strong>Course:</strong> ${course.title}</p>
            <p><strong>Topic:</strong> ${meeting.topic}</p>
            <p><strong>Original Date:</strong> ${meetingDate}</p>
            <p>If you have any questions, please contact your teacher.</p>
          `,
        });
      } catch (error) {
        console.error(`Failed to send cancellation email to ${student.email}:`, error);
      }
    }

    res.status(200).json({
      success: true,
      message: "Meeting cancelled successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error cancelling meeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel meeting",
    });
  }
};

/**
 * Resend meeting link to a specific student
 */
export const resendMeetingLink = async (req, res) => {
  try {
    const { meetingId, studentId } = req.params;

    const meeting = await Meeting.findById(meetingId).populate("courseId");
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    const student = meeting.enrolledStudents.find(
      (s) => s.studentId.toString() === studentId
    );
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found in this meeting",
      });
    }

    const course = meeting.courseId;
    const meetingDate = new Date(meeting.start_time).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const htmlContent = `
      <p>Hi ${student.name},</p>
      <p>Here's the meeting link for <strong>${course.title}</strong>:</p>
      <p><strong>Topic:</strong> ${meeting.topic}</p>
      <p><strong>Date & Time:</strong> ${meetingDate}</p>
      <p><a href="${meeting.join_url}" style="display: inline-block; background-color: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Join Meeting</a></p>
    `;

    await sendEmail({
      to: student.email,
      subject: `📅 Meeting Link: ${meeting.topic}`,
      html: htmlContent,
    });

    res.status(200).json({
      success: true,
      message: "Meeting link sent successfully",
    });
  } catch (error) {
    console.error("Error resending meeting link:", error);
    res.status(500).json({
      success: false,
      message: "Failed to resend meeting link",
    });
  }
};
