// ✅ Create a new course (admin only)
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  initializeProgress,
  updateLectureProgress,
  markAttendance,
  submitProject,
  getCourseProgress,
  getUserProgress,
} from "./progressapi.js";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/auth/me`, {
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
        const profileRes = await axios.get(`${BASE_URL}/auth/me`, {
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

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    return { success: true, message: "Logged out successfully" };
  };

  //  Fetch all courses
  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/courses/all`);
      const courses = res.data.courses || [];

      // Transform backend data to match frontend expectations
      const transformedCourses = courses.map((course) => ({
        ...course,
        // Ensure required fields exist with defaults
        rating: course.rating?.average || 4.6,
        reviews: course.rating?.count || Math.floor(Math.random() * 1000) + 100,
        enrolled:
          course.enrollmentCount || Math.floor(Math.random() * 5000) + 500,
        isBestSeller: course.featured || false,
        originalPrice: course.originalPrice || null,
      }));

      setCourses(transformedCourses);
      return transformedCourses;
    } catch (error) {
      console.error("Error fetching courses from getall courses:", error);
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

  const getCourseByTitle = useCallback(async (titleSlug) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/courses/by-title/${encodeURIComponent(titleSlug)}`
      );

      if (res.data.success && res.data.course) {
        // Transform backend data to match frontend expectations
        const course = res.data.course;
        return {
          ...course,
          // Ensure required fields exist with defaults
          rating: course.rating?.average || 4.8,
          reviews: course.rating?.count || 0,
          enrolled: course.enrollmentCount || 0,
          instructor: course.instructor || {
            name: "Expert Instructor",
            bio: "Experienced professional with years of industry expertise.",
            avatar: null,
          },
          highlights: course.highlights || [],
          originalPrice: course.originalPrice || null,
          difficulty: course.difficulty || "Beginner",
          demoVideo: course.demoVideo || null,
        };
      } else {
        return { message: res.data.message || "Course not found" };
      }
    } catch (error) {
      console.error("Error fetching course by title:", error);
      return error.response?.data || { message: "Failed to fetch course" };
    }
  }, []);

  //  Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
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

  // const buyCourse = async (courseId) => {
  //   // Add this near the start of buyCourse function
  //   console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);
  //   if (!currentUser) {
  //     return { success: false, message: "Please login first" };
  //   }

  //   try {
  //     setLoadingPayment(true);

  //     console.log("Creating order with:", {
  //       courseId,
  //       userId: currentUser._id,
  //       token: currentUser.token?.substring(0, 10) + "...",
  //     });

  //     // Step 1: Create order on backend
  //     const orderResponse = await axios.post(
  //       `${BASE_URL}/orders/create`,
  //       { courseId, userId: currentUser._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${currentUser.token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!orderResponse.data?.order) {
  //       throw new Error("Invalid order response from server");
  //     }

  //     const { order } = orderResponse.data;

  //     if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
  //       throw new Error("Razorpay Key ID is not configured");
  //     }

  //     // Step 2: Setup Razorpay checkout
  //     const options = {
  //       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: "Stem Elix",
  //       description: "Course Purchase",
  //       order_id: order.id,

  //       handler: async function (response) {
  //         console.log("Razorpay Response:", response);
  //         try {
  //           const verifyData = {
  //             courseId,
  //             userId: currentUser._id,
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           };

  //           console.log("Sending verification data:", verifyData);

  //           // Step 3: Verify payment with backend
  //           const verifyRes = await axios.post(
  //             `${BASE_URL}/orders/verify`,
  //             verifyData,
  //             {
  //               courseId,
  //               userId: currentUser._id,
  //               razorpay_order_id: response.razorpay_order_id,
  //               razorpay_payment_id: response.razorpay_payment_id,
  //               razorpay_signature: response.razorpay_signature,
  //             },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${currentUser.token}`,
  //                 "Content-Type": "application/json",
  //               },
  //             }
  //           );

  //           if (verifyRes.data.success) {
  //             // 🟢 Update local user state instantly
  //             setCurrentUser((prev) => ({
  //               ...prev,
  //               coursesEnrolled: [
  //                 ...(prev.coursesEnrolled || []),
  //                 { course: courseId, status: "in-progress" },
  //               ],
  //             }));
  //             alert("✅ Course purchased and enrolled successfully!");
  //           } else {
  //             throw new Error(
  //               verifyRes.data?.message || "Payment verification failed"
  //             );
  //           }
  //         } catch (verifyError) {
  //           console.error("Payment Verification Error:", verifyError);
  //           throw new Error(
  //             "Payment verification failed: " + verifyError.message
  //           );
  //         }
  //       },
  //       prefill: {
  //         name: currentUser.name,
  //         email: currentUser.email,
  //       },
  //       theme: { color: "#3399cc" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     return { success: false, message: "Payment failed. Try again." };
  //   } finally {
  //     setLoadingPayment(false);
  //   }
  // };

  const isCourseEnrolled = (user, courseId) => {
    if (!user || !user.coursesEnrolled) return false;
    return user.coursesEnrolled.some(
      (enrolled) => enrolled.course === courseId
    );
  };

  // Wrapper for getUserProgress to handle the response format expected by StudentDash
  const getUserProgressWrapper = async (token) => {
    try {
      const progressData = await getUserProgress(token);
      return { success: true, progress: progressData };
    } catch (error) {
      console.error("Failed to get user progress:", error);
      return {
        success: false,
        message: error.message || "Failed to get user progress",
        progress: [],
      };
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
  // const initializeCourseProgress = async (courseId, token) => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/progress/initialize`,
  //       { courseId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to initialize progress:", error);
  //     return (
  //       error.response?.data || { message: "Failed to initialize progress" }
  //     );
  //   }
  // };

  // // Update lecture progress
  // const updateLectureProgress = async (
  //   courseId,
  //   chapterId,
  //   lectureId,
  //   progressData,
  //   token
  // ) => {
  //   try {
  //     const res = await axios.put(
  //       `${BASE_URL}/progress/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`,
  //       progressData,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to update lecture progress:", error);
  //     return (
  //       error.response?.data || { message: "Failed to update lecture progress" }
  //     );
  //   }
  // };

  // // Get user's progress for a specific course
  // const getCourseProgress = async (courseId, token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/course/${courseId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get course progress:", error);
  //     return (
  //       error.response?.data || { message: "Failed to get course progress" }
  //     );
  //   }
  // };

  // // Get all progress for the logged-in user
  // const getUserProgress = async (token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/user`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get user progress:", error);
  //     return error.response?.data || { message: "Failed to get user progress" };
  //   }
  // };

  // // Add quiz score
  // const addQuizScore = async (courseId, quizData, token) => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/progress/course/${courseId}/quiz`,
  //       quizData,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to add quiz score:", error);
  //     return error.response?.data || { message: "Failed to add quiz score" };
  //   }
  // };

  // // Update study streak
  // const updateStreak = async (token) => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/progress/update-streak`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to update streak:", error);
  //     return error.response?.data || { message: "Failed to update streak" };
  //   }
  // };

  // // Get recent activity
  // const getRecentActivity = async (token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/recent-activity`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get recent activity:", error);
  //     return (
  //       error.response?.data || { message: "Failed to get recent activity" }
  //     );
  //   }
  // };

  // // Get leaderboard
  // const getLeaderboard = async (token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/leaderboard`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get leaderboard:", error);
  //     return error.response?.data || { message: "Failed to get leaderboard" };
  //   }
  // };

  // // Mark lecture as completed
  // const completeLecture = async (courseId, chapterId, lectureId, token) => {
  //   try {
  //     const res = await axios.put(
  //       `${BASE_URL}/progress/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`,
  //       {
  //         isCompleted: true,
  //         watchPercentage: 100,
  //         timeSpent: 1, // At least 1 second to register completion
  //       },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to complete lecture:", error);
  //     return error.response?.data || { message: "Failed to complete lecture" };
  //   }
  // };

  // // Get progress statistics for admin
  // const getProgressStatistics = async (token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/admin/statistics`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get progress statistics:", error);
  //     return (
  //       error.response?.data || { message: "Failed to get progress statistics" }
  //     );
  //   }
  // };

  // // Get all progress for a course (admin)
  // const getCourseProgressAdmin = async (courseId, token) => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}/progress/admin/course/${courseId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get course progress (admin):", error);
  //     return (
  //       error.response?.data || { message: "Failed to get course progress" }
  //     );
  //   }
  // };

  // // Get user progress for admin
  // const getUserProgressAdmin = async (userId, token) => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/progress/admin/user/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error("Failed to get user progress (admin):", error);
  //     return error.response?.data || { message: "Failed to get user progress" };
  //   }
  // };

  return (
    <APIContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        currentUser,
        setCurrentUser,
        getAllCourses,
        getCourseById,
        getCourseByTitle,
        courses,
        fetchUserProfile,
        enrollCourse,
        // completeCourse,
        // Progress functions
        initializeProgress,
        updateLectureProgress,
        markAttendance,
        submitProject,
        getCourseProgress,
       getUserProgress: getUserProgressWrapper,

       
        isCourseEnrolled,
        loadingPayment,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
