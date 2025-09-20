// admin/src/context/AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const Admin_Base_URL =
    process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token received from backend", token);
    if (token) {
      console.log("Token found in localStorage", token);
      setIsAdminLoggedIn(true);
      setAdminToken(token);
    } else {
      console.log("no token found in local storage");
    }
    setLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    console.log("🔍 Admin login attempt:", {
      email,
      password: password ? "PROVIDED" : "MISSING",
    });

    try {
      const res = await axios.post(`${Admin_Base_URL}/auth/admin/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem("adminToken", token);
        setIsAdminLoggedIn(true);
        setAdminToken(token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Admin login failed:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminToken(null);
    localStorage.removeItem("adminToken");
  };

  const createCourse = async (courseData) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      console.log("Creating course with data:", courseData);

      const res = await axios.post(
        `${Admin_Base_URL}/courses/create`,
        courseData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Course created successfully:", res.data.course);
        return { success: true, course: res.data.course };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Error creating course:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create course",
      };
    }
  };

  // Add Chapter
  const addChapter = async (courseId, chapterData) => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log("Sending chapter data:", chapterData);

      const res = await axios.post(
        `${Admin_Base_URL}/courses/${courseId}/chapters`,
        chapterData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Chapter added:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error adding chapter:", err.response?.data?.message);
      throw err;
    }
  };

  // Add Lecture
  const addLecture = async (courseId, chapterId, lectureData) => {
    try {
      const token = localStorage.getItem("adminToken");

      // Validate required fields
      if (
        !lectureData.lectureTitle ||
        !lectureData.lectureDuration ||
        !lectureData.lectureOrder ||
        !lectureData.lectureUrl
      ) {
        throw new Error("Missing required fields");
      }

      // Validate YouTube URL format
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
      if (!youtubeRegex.test(lectureData.lectureUrl)) {
        throw new Error("Invalid YouTube URL format");
      }

      const requestData = {
        lectureTitle: lectureData.lectureTitle,
        lectureDuration: lectureData.lectureDuration,
        lectureOrder: Number(lectureData.lectureOrder),
        isPreviewFree: Boolean(lectureData.isPreviewFree),
        lectureUrl: lectureData.lectureUrl,
      };

      console.log("📤 Sending lecture data:", requestData);

      const res = await axios.post(
        `${Admin_Base_URL}/courses/${courseId}/chapters/${chapterId}/lectures`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Lecture added:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Error adding lecture:", {
        message: err.response?.data?.message || err.message,
        details: err.response?.data,
      });
      throw new Error(err.response?.data?.message || "Failed to add lecture");
    }
  };

  const getAllCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Admin_Base_URL}/courses/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Full course data from backend:", res.data);
      return res.data.courses || [];
    } catch (err) {
      console.error("❌ Failed to fetch courses:", err.response?.data?.message);
      throw err;
    }
  };

  const getCourseContent = async (courseId) => {
    try {
      const res = await axios.get(
        `${Admin_Base_URL}/courses/${courseId}/content`
      );
      console.log("Course content fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error(
        "Failed to fetch Course Content:",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  const editCourse = async (courseId, courseData) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const res = await axios.put(
        `${Admin_Base_URL}/courses/${courseId}`,
        courseData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (res.data.success) {
        return { success: true, course: res.data.course };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Error editing course:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to edit course",
      };
    }
  };

  const editChapter = async () => {};
  const editLecture = async () => {};

  const createProject = async (courseId, projectId, projectData) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const res = await axios.post(
        `${Admin_Base_URL}/courses/${courseId}/projects/${projectId}/submit`,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (res.data.success) {
        return { success: true, project: res.data.project };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Error creating project:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create project",
      };
    }
  };

  const getUserProjects = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const res = await axios.get(`${Admin_Base_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (res.data.success) {
        return { success: true, projects: res.data.projects };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Error fetching projects:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch projects",
      };
    }
  };


    const getreciept = async() => {
     try{
     const res = await axios.get(
     `${BASE_URL}/orders/getreciept`,
      {},
      {headers: {Authorization: `Beare ${token}`}}
     );
     return res.data;
     }catch(error){
      return error.response?.data || {message: "failed to get the payment"};
     }
    };

     const verifyPayment = async() =>{
      try{
      const res = await axios.post(
        `${BASE_URL}/orders/verify`,
        {},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      return res.data;
      }catch(error){
       return error.response?.data || {message: "Filed to verify"};
      }
  
    };
  

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminToken,
        loading,
        loginAdmin,
        logoutAdmin,
        createCourse,
        getAllCourses,
        addChapter,
        addLecture,
        getCourseContent,
        editCourse,
        editChapter,
        editLecture,
        createProject,
        getUserProjects,
        verifyPayment,
        getreciept
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
