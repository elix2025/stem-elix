import React, { createContext, useState, useCallback, useContext } from "react";
import axios from "axios";

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  // ============= STATE MANAGEMENT =============
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [studentMeetings, setStudentMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  // ============= UTILITY FUNCTIONS =============
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // ============= MEETING MANAGEMENT FUNCTIONS =============

  /**
   * Schedule a new Zoom meeting for a course
   */
  const scheduleMeeting = useCallback(
    async (meetingData) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const { topic, description, start_time, duration, courseId } =
          meetingData;

        // Validate required fields
        if (!topic?.trim() || !start_time || !duration || !courseId) {
          setError("All fields are required");
          return { success: false, error: "Missing required fields" };
        }

        // Validate meeting is in the future
        if (new Date(start_time) < new Date()) {
          setError("Meeting must be scheduled for a future date");
          return { success: false, error: "Invalid date" };
        }

        // Validate duration
        if (duration < 15 || duration > 1440) {
          setError("Duration must be between 15 minutes and 24 hours");
          return { success: false, error: "Invalid duration" };
        }

        const response = await axios.post(
          `${API_BASE}/api/meetings/schedule`,
          meetingData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSuccess("Meeting scheduled successfully!");
          clearMessages();
          // Refresh meetings list
          await getMeetingsByCourse(courseId);
          return { success: true, meeting: response.data.meeting };
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to schedule meeting";
        setError(errorMsg);
        console.error("Schedule meeting error:", err);
        clearMessages();
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE, clearMessages]
  );

  /**
   * Get all meetings for a specific course (Teacher view)
   */
  const getMeetingsByCourse = useCallback(
    async (courseId) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE}/api/meetings/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setMeetings(response.data.meetings);
          return { success: true, meetings: response.data.meetings };
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch meetings";
        setError(errorMsg);
        console.error("Get meetings error:", err);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE]
  );

  /**
   * Get all meetings for the current student
   */
  const getStudentMeetings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${API_BASE}/api/meetings/student/my-meetings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setStudentMeetings(response.data.meetings);
        return { success: true, meetings: response.data.meetings };
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch meetings";
      setError(errorMsg);
      console.error("Get student meetings error:", err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  /**
   * Get meeting details by ID
   */
  const getMeetingById = useCallback(
    async (meetingId) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE}/api/meetings/${meetingId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSelectedMeeting(response.data.meeting);
          return { success: true, meeting: response.data.meeting };
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch meeting details";
        setError(errorMsg);
        console.error("Get meeting error:", err);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE]
  );

  /**
   * Cancel an existing meeting
   */
  const cancelMeeting = useCallback(
    async (meetingId, courseId) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const response = await axios.post(
          `${API_BASE}/api/meetings/${meetingId}/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSuccess("Meeting cancelled successfully!");
          clearMessages();
          // Refresh meetings list by making direct API call
          if (courseId) {
            try {
              const meetingsResponse = await axios.get(
                `${API_BASE}/api/meetings/course/${courseId}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              if (meetingsResponse.data.success) {
                setMeetings(meetingsResponse.data.meetings);
              }
            } catch (refreshError) {
              console.error("Error refreshing meetings:", refreshError);
            }
          }
          return { success: true };
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to cancel meeting";
        setError(errorMsg);
        console.error("Cancel meeting error:", err);
        clearMessages();
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE, clearMessages]
  );

  /**
   * Resend meeting link to a specific student
   */
  const resendMeetingLink = useCallback(
    async (meetingId, studentId) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const response = await axios.post(
          `${API_BASE}/api/meetings/${meetingId}/resend/${studentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSuccess("Meeting link resent successfully!");
          clearMessages();
          return { success: true };
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "Failed to resend meeting link";
        setError(errorMsg);
        console.error("Resend meeting link error:", err);
        clearMessages();
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE, clearMessages]
  );

  // ============= CONTEXT VALUE =============
  const value = {
    // State
    loading,
    error,
    success,
    meetings,
    studentMeetings,
    selectedMeeting,
    setSelectedMeeting,

    // Meeting Management Methods
    scheduleMeeting,
    getMeetingsByCourse,
    getStudentMeetings,
    getMeetingById,
    cancelMeeting,
    resendMeetingLink,

    // Utility Methods
    setError,
    setSuccess,
    clearMessages,
  };

  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
};

/**
 * Custom hook to use Teacher context
 * Usage: const { scheduleMeeting, meetings, loading } = useTeacher();
 */
export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within TeacherProvider");
  }
  return context;
};

export default TeacherContext;
