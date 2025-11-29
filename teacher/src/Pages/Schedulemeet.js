import React, { useState } from "react";
import axios from "axios";

const Schedulemeet = () => {
  const [formData, setFormData] = useState({
    teacherName: "",
    teacherEmail: "",
    topic: "",
    description: "",
    courseName: "",
    start_time: "",
    duration: 60,
    studentEmails: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Parse student emails
      const studentEmails = formData.studentEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      if (studentEmails.length === 0) {
        setError("Please enter at least one student email");
        setLoading(false);
        return;
      }

      const payload = {
        topic: formData.topic.trim(),
        description: formData.description.trim(),
        start_time: formData.start_time,
        duration: parseInt(formData.duration),
        courseId: "",
        courseName: formData.courseName.trim(),
        teacherName: formData.teacherName.trim(),
        teacherEmail: formData.teacherEmail.trim(),
        studentEmails,
      };

      const response = await axios.post(
        `${API_BASE}/api/meetings/schedule`,
        payload
      );

      if (response.data.success) {
        setSuccess("✅ Meeting scheduled successfully! Emails sent to students.");
        setScheduledMeetings((prev) => [...prev, response.data.meeting]);
        
        // Reset form
        setFormData({
          teacherName: formData.teacherName,
          teacherEmail: formData.teacherEmail,
          topic: "",
          description: "",
          courseName: "",
          start_time: "",
          duration: 60,
          studentEmails: "",
        });
      }
    } catch (err) {
      console.error("Error scheduling meeting:", err);
      setError(
        err.response?.data?.message ||
        "Failed to schedule meeting. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      {/* Form Section */}
      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start">
            <span className="mr-3 text-lg">❌</span>
            <div>
              <h4 className="font-semibold">Error</h4>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg flex items-start">
            <span className="mr-3 text-lg">✅</span>
            <div>
              <h4 className="font-semibold">Success</h4>
              <p className="text-sm mt-1">{success}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Teacher Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Your Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-50 to-transparent p-6 rounded-xl border border-blue-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  placeholder="Teacher's full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="teacherEmail"
                  value={formData.teacherEmail}
                  onChange={handleInputChange}
                  placeholder="e.g., teacher@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Meeting Details */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Meeting Details</h3>
            </div>
            <div className="space-y-4 bg-gradient-to-br from-purple-50 to-transparent p-6 rounded-xl border border-purple-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced Robotics Session"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Name (optional)
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  placeholder="e.g., Robotics 101"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add any details about the meeting..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Schedule */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-orange-50 to-transparent p-6 rounded-xl border border-orange-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-gray-700"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Student Emails */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900">Student Emails</h3>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-transparent p-6 rounded-xl border border-green-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Add Student Emails (comma-separated) <span className="text-red-500">*</span>
              </label>
              <textarea
                name="studentEmails"
                value={formData.studentEmails}
                onChange={handleInputChange}
                placeholder="student1@example.com, student2@example.com, student3@example.com"
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none font-mono text-sm text-gray-700"
              />
              <p className="text-xs text-gray-600 mt-3 flex items-center">
                <span className="mr-2 text-lg">💡</span>
                Separate emails with commas. Each student will receive the Zoom link via email.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 transition shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2 text-xl">⏳</span>
                  Scheduling...
                </span>
              ) : (
                <span>📅 Schedule Meeting</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Scheduled Meetings List */}
      {scheduledMeetings.length > 0 && (
        <div className="border-t-2 border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span>
            Your Scheduled Meetings ({scheduledMeetings.length})
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {scheduledMeetings.map((meeting) => (
              <div
                key={meeting._id}
                className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {meeting.topic}
                    </h4>
                    {meeting.courseName && (
                      <p className="text-sm text-gray-600 mt-1">
                        📚 {meeting.courseName}
                      </p>
                    )}
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                    ✓ Scheduled
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 font-semibold">📅 Date & Time</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      {formatDate(meeting.start_time)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 font-semibold">⏱️ Duration</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      {meeting.duration} mins
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-xs text-gray-600 font-semibold">👥 Students</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      {meeting.enrolledStudentsCount}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600 font-semibold">📧 Emails</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">
                      {meeting.emailsSent}/{meeting.enrolledStudentsCount}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-xs text-gray-700 font-semibold mb-2">🔗 Zoom Join Link:</p>
                  <a
                    href={meeting.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 text-sm break-all font-mono hover:underline"
                  >
                    {meeting.join_url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedulemeet;