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
    const token = localStorage.getItem("adminToken");
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

  // Debug function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem("adminToken");
    console.log('🔍 Current Auth Status:', {
      isAdminLoggedIn,
      adminToken: adminToken ? adminToken.substring(0, 20) + '...' : null,
      localStorageToken: token ? token.substring(0, 20) + '...' : null,
      tokensMatch: adminToken === token
    });
    return { isAdminLoggedIn, adminToken, localStorageToken: token };
  };

  // Test admin authentication with backend
  const testAdminAuth = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      console.log('🧪 Testing admin authentication...');
      
      if (!adminToken) {
        console.error('❌ No admin token found for testing');
        return { success: false, message: 'No token found' };
      }

      const res = await axios.get(`${Admin_Base_URL}/orders/test-admin`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      console.log('✅ Admin auth test successful:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('❌ Admin auth test failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      return { success: false, error: error.response?.data };
    }
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


    // Get all pending payments
    const getAllPayments = async (status = 'pending') => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        console.log('🔍 getAllPayments called with:', {
          status,
          hasToken: !!adminToken,
          tokenPreview: adminToken ? adminToken.substring(0, 20) + '...' : null,
          isAdminLoggedIn,
          URL: `${Admin_Base_URL}/orders/payments`
        });

        if (!adminToken) {
          console.error('❌ No admin token found in localStorage');
          return {
            success: false,
            message: 'No authentication token found. Please login as admin.'
          };
        }

        console.log('📡 Making API call to:', `${Admin_Base_URL}/orders/payments`);
        console.log('🔐 Using authorization header:', `Bearer ${adminToken.substring(0, 30)}...`);

        const res = await axios.get(`${Admin_Base_URL}/orders/payments`, {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { status }
        });
        
        console.log('✅ Payments fetched successfully:', res.data);
        
        return {
          success: true,
          payments: res.data.payments || []
        };
      } catch (error) {
        console.error('❌ Failed to fetch payments:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            headers: error.config?.headers
          }
        });
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch payments'
        };
      }
    };

    // Get specific payment details
    const getPaymentDetails = async (paymentId) => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const res = await axios.get(`${Admin_Base_URL}/orders/payment/${paymentId}`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        return {
          success: true,
          payment: res.data.payment
        };
      } catch (error) {
        console.error('Failed to fetch payment details:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch payment details'
        };
      }
    };

    // Verify or reject payment
    const verifyPayment = async (paymentId, action, data) => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const res = await axios.post(
          `${Admin_Base_URL}/orders/verify/${paymentId}`,
          {
            action, // 'verify' or 'reject'
            gpayTransactionId: data.gpayTransactionId, // required for verification
            rejectionReason: data.rejectionReason // required for rejection
          },
          {
            headers: { Authorization: `Bearer ${adminToken}` }
          }
        );

        return {
          success: true,
          message: res.data.message,
          payment: res.data.payment
        };
      } catch (error) {
        console.error('Payment verification failed:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to process payment'
        };
      }
    };

    // Student Management Functions
    
    // Get all students with pagination and search
    const getAllStudents = async (page = 1, limit = 10, search = '', status = '') => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          throw new Error('No admin token found');
        }

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(status && { status })
        });

        console.log('🔍 Fetching students with params:', { page, limit, search, status });

        const res = await axios.get(`${Admin_Base_URL}/auth/admin/students?${params}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.data.success) {
          console.log('✅ Students fetched successfully:', res.data.data.pagination);
          return {
            success: true,
            data: res.data.data
          };
        } else {
          throw new Error(res.data.message || 'Failed to fetch students');
        }
      } catch (error) {
        console.error('❌ Error fetching students:', error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || 'Failed to fetch students'
        };
      }
    };

    // Get detailed student profile
    const getStudentDetails = async (studentId) => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          throw new Error('No admin token found');
        }

        console.log('🔍 Fetching student details for ID:', studentId);

        const res = await axios.get(`${Admin_Base_URL}/auth/admin/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.data.success) {
          console.log('✅ Student details fetched successfully');
          return {
            success: true,
            data: res.data.data
          };
        } else {
          throw new Error(res.data.message || 'Failed to fetch student details');
        }
      } catch (error) {
        console.error('❌ Error fetching student details:', error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || 'Failed to fetch student details'
        };
      }
    };

    // Get enrollment statistics for dashboard
    const getEnrollmentStats = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          throw new Error('No admin token found');
        }

        console.log('📊 Fetching enrollment statistics...');

        const res = await axios.get(`${Admin_Base_URL}/auth/admin/enrollment-stats`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.data.success) {
          console.log('✅ Enrollment stats fetched successfully');
          return {
            success: true,
            data: res.data.data
          };
        } else {
          throw new Error(res.data.message || 'Failed to fetch enrollment statistics');
        }
      } catch (error) {
        console.error('❌ Error fetching enrollment stats:', error);
        return {
          success: false,
          message: error.response?.data?.message || error.message || 'Failed to fetch enrollment statistics'
        };
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
        checkAuthStatus,
        testAdminAuth,
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
        getAllPayments,
        getPaymentDetails,
        getAllStudents,
        getStudentDetails,
        getEnrollmentStats
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
