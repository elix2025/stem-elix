// admin/src/context/AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const Admin_Base_URL = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

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
    
  console.log('🔍 Admin login attempt:', { email, password: password ? 'PROVIDED' : 'MISSING' });
    
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
    const formData = new FormData();

    for (let key in courseData) {
      if (!courseData[key]) continue; // skip empty values

      // Handle nested gradeRange object
      if (key === "gradeRange") {
        formData.append("gradeRangeMin", courseData.gradeRange.min);
        formData.append("gradeRangeMax", courseData.gradeRange.max);
      } 
      // Handle file
      else if (key === "CourseThumbnail") {
        formData.append("CourseThumbnail", courseData.CourseThumbnail);
      } 
      // Normal fields
      else {
        formData.append(key, courseData[key]);
      }
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const res = await axios.post(`${Admin_Base_URL}/courses/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${adminToken}`,
      },
    });

    if (res.data.success) {
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
      `${Admin_Base_URL}/courses/${courseId}/add-chapter`,
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
    const formData = new FormData();

    formData.append("lectureTitle", lectureData.lectureTitle);
    formData.append("lectureOrder", lectureData.lectureOrder);
    formData.append("lectureDuration", lectureData.lectureDuration);
    formData.append("isPreviewFree", lectureData.isPreviewFree);
    // formData.append("lectureFile", lectureData.lectureFile);
    formData.append("sourceType", lectureData.sourceType);

     if (lectureData.sourceType === 'youtube') {
      formData.append("youtubeUrl", lectureData.youtubeUrl);
    } else if (lectureData.sourceType === 'cloud' && lectureData.lectureFile) {
      formData.append("lectureFile", lectureData.lectureFile);
    }

    console.log("📤 Sending lecture data:", [...formData.entries()]);

    const res = await axios.post(
      `${Admin_Base_URL}/courses/${courseId}/add-lecture/${chapterId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Lecture added:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error adding lecture:", err.response?.data?.message);
    throw err;
  }
};

 

  const getAllCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${Admin_Base_URL}/courses/all`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
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
    const res = await axios.get(`${Admin_Base_URL}/courses/${courseId}/content`);
    console.log("Course content fetched:", res.data);
    return res.data;
  } catch(err){
    console.error("Failed to fetch Course Content:", err.response?.data?.message || err.message);
    throw err;
  }
};

const editCourse = async () => {
try{
  const token = localStorage.getItem("token");

}catch(err){

}
};

const editChapter = async () => {}
const editLecture = async () => {}

const createProject = async (courseId,projectId) => {
  try{
 const token = localStorage.getItem(token);
 const formData = new FormData();
 const res = await axios.post(`${Admin_Base_URL}/courses/${courseId}/projects/${projectId}/submit`,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  });
  console.log("project created:", res.data);
  return res.data;
  } catch (err){
    console.error("Error creating project:",err.response?.data?.message)
    throw err;
  }
};
const getUserProjects = async() => {}







  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminToken,loading,loginAdmin, logoutAdmin,
     createCourse, getAllCourses, addChapter,addLecture,getCourseContent,
     editCourse,
     editChapter,editLecture,createProject,getUserProjects }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
