// ✅ Create a new course (admin only)

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const createCourse = async (courseData, token) => {
  try {
    // Use FormData for file upload
    const formData = new FormData();
    Object.entries(courseData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const res = await axios.post(`${BASE_URL}/courses/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { message: "Failed to create course" };
  }
};

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Try to fetch user profile with token
      // You may need to decode token to get userId, or fetch a /me endpoint
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
      const res = await axios.get(`${BASE_URL}/courses/all`);
      if (res.data?.success) {
        return res.data.courses;
      }
      return [];
    } catch (error) {
      return error.response?.data || { message: "Failed to load courses" };
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

  //  Fetch user profile data by userId
  const fetchUserProfile = async (userId, token) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return (
        error.response?.data || { message: "Failed to fetch user profile" }
      );
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
        createCourse,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
