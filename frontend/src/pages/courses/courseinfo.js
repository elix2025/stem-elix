import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAPI } from "../../context/api";
import { createSlug } from "../../utils/slugutils";

const CourseInfo = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const { getCourseByTitle, enrollCourse, currentUser, } = useAPI();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const foundCourse = await getCourseByTitle(courseName);
        if (foundCourse && !foundCourse.message) {
          setCourse(foundCourse);
        } else {
          setError(foundCourse?.message || "Course not found");
        }
      } catch (err) {
        setError(err?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseName, getCourseByTitle]);

  const handleEnrollment = async () => {
    let userId = currentUser?._id;
    let token = currentUser?.token || localStorage.getItem("token");

    if (!userId) {
      try {
        const userObj = JSON.parse(localStorage.getItem("user"));
        userId = userObj?._id;
      } catch {}
    }

    if (!userId || !token) {
      alert("You must be logged in to enroll.");
      navigate("/login");
      return;
    }

    setIsEnrolling(true);
    try {
    // ✅ Pass all three arguments
    const response = await enrollCourse(userId, course._id, token);

    if (response.message === "Already enrolled") {
      alert("You are already enrolled in this course.");
      navigate(`/courses/content/${createSlug(course.title)}`);
    } else {
      alert("Enrollment successful! 🎉");
      navigate(`/courses/cart/${createSlug(course.title)}`);
    }
  } catch (error) {
    console.error("Enrollment error:", error);
    alert(error.message || "Failed to enroll. Please try again.");
  } finally {
    setIsEnrolling(false);
  }
 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-slate-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
              <div className="h-96 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Course Not Found
          </h3>
          <p className="text-slate-600 mb-6">
            {error || "The course you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-primary-blue text-white rounded-xl hover:bg-primary-blue/90 transition-colors duration-200"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    // { id: "curriculum", label: "Curriculum", icon: "📚" },
    { id: "instructor", label: "Instructor", icon: "👨‍🏫" },
    // { id: "reviews", label: "Reviews", icon: "⭐" },
  ];

  const mockCurriculum = []; 
  const mockReviews = [];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img
            src={
              course.CourseThumbnail ||
              `${encodeURIComponent(
                course.title
              )}`
            }
            alt={course.title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 text-white">
              <div className="mb-4">
                <span className="px-4 py-2 bg-primary-blue/20 backdrop-blur-sm border border-primary-blue/30 text-primary-blue text-sm font-medium rounded-full">
                  {course.coursename}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* <div className="flex items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{course.rating || "4.8"}</span>
                  <span>({course.reviews || "2,847"} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0A17.552 17.552 0 0024 17.5v-1a6 6 0 00-6-6 6 6 0 00-6 6v1z"
                    />
                  </svg>
                  <span>{course.enrolled || "12,435"} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{course.duration} hours total</span>
                </div>
              </div> */}
            </div>

            {/* Video Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="relative mb-6">
                  <div className="aspect-video bg-black/30 rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={
                        course.demoVideo ||
                       "https://www.youtube.com/embed/tiGw9PQbvrg?si=ZKwnqhExCSeZq9zB"
                      }
                      title="Course Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-white mb-4">
                    {/* <span className="text-3xl font-bold">
                      {course.price === 0 ? "Free" : `₹${course.price}`}
                    </span> */}
                    {/* {course.originalPrice &&
                      course.originalPrice > course.price && (
                        <span className="text-lg text-slate-400 line-through ml-2">
                          ₹{course.originalPrice}
                        </span>
                      )} */}
                  </div>

                  <button
                    onClick={handleEnrollment}
                    disabled={isEnrolling}
                    className="w-full py-4 bg-gradient-to-r from-primary-blue to-cyan text-white font-bold rounded-xl
                             hover:from-primary-blue/90 hover:to-cyan/90 transition-all duration-300
                             transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEnrolling ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8">
              <div className="flex border-b border-slate-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-primary-blue text-white border-b-2 border-primary-blue"
                        : "text-slate-600 hover:text-primary-blue hover:bg-slate-50"
                    } ${tab.id === "overview" ? "rounded-tl-2xl" : ""} ${
                      tab.id === "reviews" ? "rounded-tr-2xl" : ""
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">
                        What you'll learn
                      </h3>
                      {course.highlights && course.highlights.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <svg
                                className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-slate-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-slate-700">
                              Master fundamental concepts and principles
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-slate-700">
                              Build practical, real-world projects
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-slate-700">
                              Develop industry-relevant skills
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-slate-700">
                              Get hands-on experience with latest tools
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">
                        Course Description
                      </h3>
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed">
                          {course.description ||
                            "This comprehensive course is designed to take you from beginner to advanced level. You'll learn through hands-on projects, real-world examples, and expert guidance. Whether you're looking to advance your career or start a new one, this course provides the knowledge and skills you need to succeed."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">
                      Course Curriculum
                    </h3>
                    {mockCurriculum.map((section, idx) => (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-slate-800">
                              {section.title}
                            </h4>
                            <span className="text-sm text-slate-600">
                              {section.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          {section.lessons.map((lesson, lessonIdx) => (
                            <div
                              key={lessonIdx}
                              className="flex items-center gap-3"
                            >
                              <svg
                                className="w-5 h-5 text-primary-blue"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2z"
                                />
                              </svg>
                              <span className="text-slate-700">{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === "instructor" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">
                      Meet Your Instructor
                    </h3>
                    <div className="flex items-start gap-6">
                      <img
                        src={
                          course.author?.avatar ||
                          course.instructor?.avatar ||
                          `https://via.placeholder.com/120x120/64748B/FFFFFF?text=${(
                            course.author?.name ||
                            course.instructor?.name ||
                            "Instructor"
                          ).charAt(0)}`
                        }
                        alt={
                          course.author?.name ||
                          course.instructor?.name ||
                          "Instructor"
                        }
                        className="w-24 h-24 rounded-full border-4 border-primary-blue/20"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800 mb-2">
                          {course.author?.name ||
                            course.instructor?.name ||
                            "Expert Instructor"}
                        </h4>
                        <p className="text-slate-600 mb-4">
                          {course.author?.bio ||
                            course.instructor?.bio ||
                            "Experienced professional with years of industry expertise. Passionate about teaching and helping students achieve their goals through practical, hands-on learning approaches."}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>4.9 Instructor Rating</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0A17.552 17.552 0 0024 17.5v-1a6 6 0 00-6-6 6 6 0 00-6 6v1z"
                              />
                            </svg>
                            <span>25,000+ Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-slate-800">
                        Student Reviews
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-slate-800">
                          {course.rating || "4.8"}
                        </span>
                        <span className="text-slate-600">
                          ({course.reviews || "2,847"} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border border-slate-200 rounded-xl p-6"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={`https://via.placeholder.com/48x48/64748B/FFFFFF?text=${review.name.charAt(
                                0
                              )}`}
                              alt={review.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-slate-800">
                                  {review.name}
                                </h5>
                                <span className="text-sm text-slate-500">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-4 h-4 text-yellow-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <p className="text-slate-600 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Course Details
              </h3>

              <div className="space-y-4">
                {/* <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-medium text-slate-800">
                    {course.duration} hours
                  </span>
                </div> */}

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Level</span>
                  <span className="font-medium text-slate-800">
                    {course.difficulty || "Beginner"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Category</span>
                  <span className="font-medium text-slate-800">
                    {course.coursename}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Language</span>
                  <span className="font-medium text-slate-800">English</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Certificate</span>
                  <span className="font-medium text-slate-800">Yes</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-600">Access</span>
                  <span className="font-medium text-slate-800">Lifetime</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">
                  Share this course
                </h4>
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
