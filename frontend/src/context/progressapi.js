 // src/api/progressApi.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

// Helper to attach token
const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});


// 1️⃣ Initialize progress for a course
export const initializeProgress = async (courseId, token) => {
  const res = await axios.post(
    `${BASE_URL}/progress/initialize`,
    { courseId },
    authHeaders(token)
  );
  return res.data;
};

// 2️⃣ Update lecture progress
export const updateLectureProgress = async (courseId, lectureId, progressData, token) => {
  const res = await axios.put(
    `${BASE_URL}/progress/${courseId}/lecture/${lectureId}`,
    progressData, // { watchPercentage, timeSpent, isCompleted }
    authHeaders(token)
  );
  return res.data;
};

// 3️⃣ Mark attendance for a lecture
export const markAttendance = async (courseId, lectureId, token) => {
  const res = await axios.put(
    `${BASE_URL}/progress/${courseId}/attendance/${lectureId}`,
    {},
    authHeaders(token)
  );
  return res.data;
};

// 4️⃣ Submit a project
export const submitProject = async (courseId, projectId, projectData, token) => {
  const res = await axios.put(
    `${BASE_URL}/progress/${courseId}/project/${projectId}`,
    projectData, // e.g. { link, notes }
    authHeaders(token)
  );
  return res.data;
};

// 5️⃣ Get progress for a specific course (for a user)
export const getCourseProgress = async (courseId, token) => {
  const res = await axios.get(
    `${BASE_URL}/progress/course/${courseId}`,
    authHeaders(token)
  );
  return res.data;
};

// 6️⃣ Get all progress for logged-in user (all enrolled courses)
export const getUserProgress = async (token) => {
  const res = await axios.get(`${BASE_URL}/progress/user`, authHeaders(token));
  return res.data;
};
