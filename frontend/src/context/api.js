// ✅ Create a new course (admin only)
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";


const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCurrentUser({ ...res.data, token });
        })
        .catch(() => {
          setCurrentUser(null);
        });
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data; // { success: true, message, token, user }
    } catch (error) {
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Registration failed",
        };
      }

      // If no backend response (network error, CORS, etc.)
      return {
        success: false,
        message: "Unable to connect to the server. Please try again later.",
      };
    }
  };

  // Login API function (consistent error handling)
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Fetch user profile after login
        const profileRes = await axios.get(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${res.data.token}` },
        });
        const userObj = { ...profileRes.data, token: res.data.token };
        setCurrentUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        return { success: true, ...userObj };
      } else {
        return {
          success: false,
          message: res.data.message || "Login failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        ...(error.response?.data || {}),
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  //  Fetch all courses
  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/courses`);
      setCourses(res.data.courses || []);
      return res.data.courses || []; // Return the array of courses, not the whole response
    } catch (error) {
      console.error("Error fetching courses:", error);
      return []; // Return empty array on error
    }
  };

  //  Fetch single course by ID
  const getCourseById = async (courseId) => {
    try {
      const res = await axios.get(`${BASE_URL}/courses/${courseId}`);
      return res.data;
    } catch (error) {
      return error.response?.data || { message: "Failed to fetch course" };
    }
  };

  //  Fetch user profile
  const fetchUserProfile = async (userId, token) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return error.response?.data || { message: "Failed to fetch profile" };
    }
  };

  //  Enroll in a course
  const enrollCourse = async (userId, courseId, token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/enroll`,
        { userId, courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return error.response?.data || { message: "Failed to enroll course" };
    }
  };

  //  Mark course as completed
  const completeCourse = async (userId, courseId, token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/complete`,
        { userId, courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return error.response?.data || { message: "Failed to complete course" };
    }
  };

  // ===== PROGRESS API FUNCTIONS =====

  // Initialize progress for a course
  const initializeCourseProgress = async (courseId, token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/progress/initialize`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to initialize progress:", error);
      return (
        error.response?.data || { message: "Failed to initialize progress" }
      );
    }
  };

  // Update lecture progress
  const updateLectureProgress = async (
    courseId,
    chapterId,
    lectureId,
    progressData,
    token
  ) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/progress/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`,
        progressData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to update lecture progress:", error);
      return (
        error.response?.data || { message: "Failed to update lecture progress" }
      );
    }
  };

  // Get user's progress for a specific course
  const getCourseProgress = async (courseId, token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get course progress:", error);
      return (
        error.response?.data || { message: "Failed to get course progress" }
      );
    }
  };

  // Get all progress for the logged-in user
  const getUserProgress = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get user progress:", error);
      return error.response?.data || { message: "Failed to get user progress" };
    }
  };

  // Add quiz score
  const addQuizScore = async (courseId, quizData, token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/progress/course/${courseId}/quiz`,
        quizData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to add quiz score:", error);
      return error.response?.data || { message: "Failed to add quiz score" };
    }
  };

  // Update study streak
  const updateStreak = async (token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/progress/update-streak`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to update streak:", error);
      return error.response?.data || { message: "Failed to update streak" };
    }
  };

  // Get recent activity
  const getRecentActivity = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/recent-activity`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get recent activity:", error);
      return (
        error.response?.data || { message: "Failed to get recent activity" }
      );
    }
  };

  // Get leaderboard
  const getLeaderboard = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get leaderboard:", error);
      return error.response?.data || { message: "Failed to get leaderboard" };
    }
  };

  // Mark lecture as completed
  const completeLecture = async (courseId, chapterId, lectureId, token) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/progress/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`,
        {
          isCompleted: true,
          watchPercentage: 100,
          timeSpent: 1, // At least 1 second to register completion
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to complete lecture:", error);
      return error.response?.data || { message: "Failed to complete lecture" };
    }
  };

  // Get progress statistics for admin
  const getProgressStatistics = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/admin/statistics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get progress statistics:", error);
      return (
        error.response?.data || { message: "Failed to get progress statistics" }
      );
    }
  };

  // Get all progress for a course (admin)
  const getCourseProgressAdmin = async (courseId, token) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/progress/admin/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Failed to get course progress (admin):", error);
      return (
        error.response?.data || { message: "Failed to get course progress" }
      );
    }
  };

  // Get user progress for admin
  const getUserProgressAdmin = async (userId, token) => {
    try {
      const res = await axios.get(`${BASE_URL}/progress/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to get user progress (admin):", error);
      return error.response?.data || { message: "Failed to get user progress" };
    }
  };

  return (
    <APIContext.Provider
      value={{
        registerUser,
        loginUser,
        currentUser,
        setCurrentUser,
        getAllCourses,
        getCourseById,
        courses,
        fetchUserProfile,
        enrollCourse,
        completeCourse,
        // Progress functions
        initializeCourseProgress,
        updateLectureProgress,
        getCourseProgress,
        getUserProgress,
        addQuizScore,
        updateStreak,
        getRecentActivity,
        getLeaderboard,
        completeLecture,
        getProgressStatistics,
        getCourseProgressAdmin,
        getUserProgressAdmin,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
