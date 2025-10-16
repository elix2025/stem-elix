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

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
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
        // Use the user data from login response directly
        const userObj = { ...res.data.user, token: res.data.token };
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

  //  Enroll in a course (now uses verified payment system)
  const enrollCourse = async (userId, courseId, token) => {
    try {
      console.log('🎯 Enrolling user in course:', { userId, courseId });
      
      const res = await axios.post(
        `${BASE_URL}/auth/enroll`,
        { userId, courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ Enrollment response:', res.data);
      
      if (res.data.success) {
        // Update current user state with new enrollment
        setCurrentUser(prevUser => {
          if (!prevUser) return prevUser;
          
          const newEnrollment = {
            course: courseId,
            status: "in-progress",
            enrolledAt: new Date(),
            paymentId: res.data.enrollment?.paymentId
          };
          
          return {
            ...prevUser,
            coursesEnrolled: [...(prevUser.coursesEnrolled || []), newEnrollment],
            totalCoursesEnrolled: (prevUser.totalCoursesEnrolled || 0) + 1
          };
        });
      }
      
      return res.data;
    } catch (error) {
      console.error('❌ Enrollment error:', error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to enroll in course",
        requiresPayment: error.response?.data?.requiresPayment || false
      };
    }
  };

  //  const createPayment = async (userId, courseId, amount, file, token) => {
  //   try {
  //     setLoadingPayment(true);

  //     // Validate inputs
  //     if (!userId || !courseId || !amount || !file) {
  //       throw new Error("Missing required fields");
  //     }

  //     // Validate file type and size
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //     const maxSize = 5 * 1024 * 1024; // 5MB

  //     if (!allowedTypes.includes(file.type)) {
  //       throw new Error("Invalid file type. Please upload a JPG or PNG image");
  //     }

  //     if (file.size > maxSize) {
  //       throw new Error("File size too large. Maximum size is 5MB");
  //     }

  //     // Create form data
  //     const formData = new FormData();
  //     formData.append("userId", userId);
  //     formData.append("courseId", courseId);
  //     formData.append("amount", amount);
  //     formData.append("reciept", file);

  //     // Make API call
  //     const response = await axios.post(
  //       `${BASE_URL}/orders/create`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           console.log('Upload Progress:', percentCompleted);
  //         }
  //       }
  //     );

  //     if (!response.data.success) {
  //       throw new Error(response.data.message || "Payment submission failed");
  //     }

  //     // Return success response
  //     return {
  //       success: true,
  //       message: response.data.message || "Payment submitted successfully",
  //       payment: response.data.payment
  //     };

  //   } catch (error) {
  //     console.error("Payment creation error:", error);
      
  //     // Return formatted error response
  //     return {
  //       success: false,
  //       message: error.response?.data?.message || error.message || "Failed to submit payment",
  //       error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
  //     };
  //   } finally {
  //     setLoadingPayment(false);
  //   }
  // };

  const createPayment = async (userId, courseId, amount, file, token) => {
    console.log('CreatePayment called with:', {
      userId,
      courseId,
      amount,
      fileInfo: file ? {
        name: file.name,
        type: file.type,
        size: file.size
      } : null,
      hasToken: !!token
    });

    try {
      // Validate all required fields
      if (!file || !userId || !courseId || !amount || !token) {
        console.error('Missing required fields:', { 
          file: !!file, 
          userId: !!userId, 
          courseId: !!courseId, 
          amount: !!amount, 
          token: !!token 
        });
        throw new Error('Missing required fields for payment');
      }

      // Create FormData and append all fields exactly as backend expects
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('courseId', courseId);
      formData.append('amount', amount.toString()); // Convert amount to string
      formData.append('reciept', file); // This must match the multer field name in backend

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }

      console.log('Sending payment request to:', `${BASE_URL}/orders/create`);
      
      const response = await axios.post(
        `${BASE_URL}/orders/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Let axios set the correct multipart/form-data Content-Type with boundary
            // Don't set Content-Type manually for FormData
          }
        }
      );

      console.log('Server Response:', response.data);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Payment submitted successfully',
          payment: response.data.payment
        };
      } else {
        throw new Error(response.data.message || 'Failed to create payment');
      }
    } catch (error) {
      console.error('Payment creation error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.response?.data
      });

      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to create payment'
      };
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

  // Check if user is enrolled in a course (compatible with payment-based enrollment)
  const isCourseEnrolled = (user, courseId) => {
    console.log('🔍 Checking enrollment for:', { 
      userId: user?._id, 
      courseId,
      coursesEnrolled: user?.coursesEnrolled
    });
    
    if (!user || !user.coursesEnrolled || !Array.isArray(user.coursesEnrolled)) {
      console.log('❌ User or coursesEnrolled not found');
      return false;
    }

    const isEnrolled = user.coursesEnrolled.some(enrolled => {
      // Handle both string and object formats
      const enrolledCourseId = typeof enrolled === 'object' ? enrolled.course : enrolled;
      const match = enrolledCourseId?.toString() === courseId?.toString();
      
      if (match) {
        console.log('✅ Course enrollment found:', {
          enrolledCourseId,
          courseId,
          enrollmentDetails: enrolled
        });
      }
      
      return match;
    });

    console.log('🎯 Enrollment check result:', { isEnrolled, courseId });
    return isEnrolled;
  };

  // Check if user has a verified payment for a specific course
  const hasVerifiedPayment = async (userId, courseId, token) => {
    try {
      console.log('💳 Checking verified payment for:', { userId, courseId });
      
      const res = await axios.get(
        `${BASE_URL}/orders/check-payment/${userId}/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('💳 Payment check response:', res.data);
      return res.data.hasPayment || false;
    } catch (error) {
      console.error('❌ Error checking payment:', error);
      return false;
    }
  };

  // Check if user can access course content (enrolled + verified payment)
  const canAccessCourse = async (courseId, token) => {
    try {
      if (!currentUser) {
        return { 
          canAccess: false, 
          reason: 'not_logged_in',
          message: 'Please log in to access course content' 
        };
      }

      // First check if user is enrolled
      const isEnrolled = isCourseEnrolled(currentUser, courseId);
      
      if (isEnrolled) {
        return { 
          canAccess: true, 
          reason: 'enrolled',
          message: 'Course access granted' 
        };
      }

      // If not enrolled, check if they have verified payment
      const hasPayment = await hasVerifiedPayment(currentUser._id, courseId, token);
      
      if (hasPayment) {
        // Try to enroll them automatically
        const enrollResult = await enrollCourse(currentUser._id, courseId, token);
        
        if (enrollResult.success) {
          return { 
            canAccess: true, 
            reason: 'auto_enrolled',
            message: 'Enrollment completed successfully' 
          };
        } else {
          return { 
            canAccess: false, 
            reason: 'enrollment_failed',
            message: enrollResult.message || 'Failed to complete enrollment' 
          };
        }
      }

      return { 
        canAccess: false, 
        reason: 'payment_required',
        message: 'Payment verification required to access this course' 
      };

    } catch (error) {
      console.error('❌ Error checking course access:', error);
      return { 
        canAccess: false, 
        reason: 'error',
        message: 'Unable to verify course access' 
      };
    }
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


  
  return (
    <APIContext.Provider
      value={{
        BASE_URL,
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
        createPayment,
        getCourseProgress,
        getUserProgress: getUserProgressWrapper,
        // Enhanced enrollment functions
        isCourseEnrolled,
        hasVerifiedPayment,
        canAccessCourse,
        loadingPayment,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
