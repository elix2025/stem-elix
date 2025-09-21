import React, { useState, useEffect, useCallback } from "react";
import { useAPI } from "../../context/api";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { createUserSlug, createSlug } from "../../utils/slugutils";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaTrophy,
  FaChartLine,
  FaPlay,
  FaGraduationCap,
  FaUserCircle,
  FaArrowRight,
  FaCalendarAlt,
  FaBookmark,
  FaAward,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdSchool } from "react-icons/md";

const StudentDash = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { currentUser, fetchUserProfile, getUserProgress } = useAPI();

  const fetchData = useCallback(async () => {
    // Check if we have a token, even if currentUser is not loaded yet
    const token = localStorage.getItem("token");

    if (currentUser && currentUser.token) {
      // User is fully loaded, verify username match if provided
      if (username) {
        const currentUserSlug = createUserSlug(
          currentUser.name || currentUser.email
        );
        if (username !== currentUserSlug) {
          // Instead of showing error, redirect to correct username
          setShouldRedirect(true);
          navigate(`/student/${currentUserSlug}`, { replace: true });
          return;
        }
      }

      try {
        setLoading(true);

        // Fetch user profile
        const userProfile = await fetchUserProfile(currentUser.token);
        setStudentData(userProfile);

        // Fetch progress data
        const progressResponse = await getUserProgress(currentUser.token);
        if (progressResponse.success) {
          setProgressData(progressResponse.progress);
        }

        setError("");
      } catch (err) {
        console.error("StudentDash: Error fetching data", err);
        setError(err?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    } else if (token) {
      // Token exists but currentUser is still loading, keep showing loading
      setLoading(true);
      setError("");
    } else {
      // No token, user needs to log in
      setLoading(false);
      setError("Please log in to view your dashboard");
    }
  }, [currentUser, username, navigate, fetchUserProfile, getUserProgress]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  // Calculate overall statistics from real backend data
  const getOverallStats = () => {
    if (!progressData.length) return null;

    // Filter for only valid courses with courseId
    const validProgressData = progressData.filter(
      (p) => p.courseId && p.courseId.title
    );
    if (!validProgressData.length) return null;

    const totalCourses = validProgressData.length; // Use actual enrolled course count
    const completedCourses = validProgressData.filter(
      (p) => p.isCompleted
    ).length;
    const totalTime = validProgressData.reduce(
      (sum, p) => sum + (p.totalTimeSpent || 0),
      0
    );
    const avgProgress =
      validProgressData.reduce((sum, p) => sum + (p.overallProgress || 0), 0) /
      totalCourses;

    return {
      totalCourses,
      completedCourses,
      totalTimeHours: Math.round(totalTime / 3600),
      avgProgress: Math.round(avgProgress),
    };
  };

  const overallStats = getOverallStats();

  // Handle redirect if user accessed wrong username
  if (shouldRedirect) {
    return null; // Component will unmount and redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-gradient-to-r from-teal-500 to-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-teal-100 rounded-full mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Loading your dashboard...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch your learning progress
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Check if it's an unauthorized access error, redirect to login
    if (error.includes("Unauthorized access")) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dashboard Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <FaUserCircle className="text-white text-3xl" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      {studentData?.name || currentUser?.name || "Student"}!
                    </span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Ready to continue your learning journey?
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                    <MdEmail className="text-teal-500" />
                    <span className="text-gray-700">
                      {studentData?.email || currentUser?.email}
                    </span>
                  </div>
                  {studentData?.institute && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <MdSchool className="text-blue-500" />
                      <span className="text-gray-700">
                        {studentData.institute}
                      </span>
                    </div>
                  )}
                  {studentData?.phone && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <MdPhone className="text-green-500" />
                      <span className="text-gray-700">{studentData.phone}</span>
                    </div>
                  )}
                  {studentData?.createdAt && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <FaCalendarAlt className="text-purple-500" />
                      <span className="text-gray-700">
                        Joined{" "}
                        {new Date(studentData.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <nav className="flex space-x-1">
                {[
                  { id: "overview", label: "Overview", icon: FaChartLine },
                  { id: "courses", label: "My Courses", icon: FaBookOpen },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md transform scale-105"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="text-sm" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {overallStats ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Total Courses
                          </p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {overallStats.totalCourses}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Enrolled courses
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaBookOpen className="text-blue-600 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Completed
                          </p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {overallStats.completedCourses}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Courses finished
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Study Hours
                          </p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {overallStats.totalTimeHours}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Time invested
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaClock className="text-purple-600 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="group">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Avg Progress
                          </p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            {overallStats.avgProgress}%
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Overall completion
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaChartLine className="text-teal-600 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>{" "}
                {/* Recent Progress */}
                {/* <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <FaBookmark className="text-white text-sm" />
                      </div>
                      Recent Progress
                    </h3>
                    <Link
                      to="#"
                      onClick={() => setActiveTab("courses")}
                      className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
                    >
                      View All
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {progressData.slice(0, 3).map((progress, idx) => (
                      <div
                        key={idx}
                        className="group bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                              <FaBookOpen className="text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors duration-200">
                                {progress.courseId?.title || "Course"}
                              </h4>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FaCalendarAlt className="text-xs" />
                                Last accessed:{" "}
                                {new Date(
                                  progress.lastAccessedDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-700">
                                {progress.overallProgress}%
                              </span>
                              {progress.isCompleted && (
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <FaCheckCircle className="text-green-500 text-sm" />
                                </div>
                              )}
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                  width: ${progress.overallProgress}%,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>{" "} */}
                {/* Profile Information */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Name
                        </label>
                        <p className="text-gray-800">
                          {studentData?.name ||
                            currentUser?.name ||
                            "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Email
                        </label>
                        <p className="text-gray-800">
                          {studentData?.email ||
                            currentUser?.email ||
                            "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Role
                        </label>
                        <p className="text-gray-800 capitalize">
                          {studentData?.role || currentUser?.role || "Student"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Institute
                        </label>
                        <p className="text-gray-800">
                          {studentData?.institute || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Phone
                        </label>
                        <p className="text-gray-800">
                          {studentData?.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Member Since
                        </label>
                        <p className="text-gray-800">
                          {studentData?.createdAt
                            ? new Date(
                                studentData.createdAt
                              ).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <FaBookOpen className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Course Progress Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven't enrolled in any courses yet. Start your learning
                  journey today!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition"
                >
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  My Courses
                </h2>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <FaBookOpen className="text-teal-500 text-sm" />
                  <span className="text-sm font-medium text-gray-700">
                    {
                      progressData.filter((p) => p.courseId && p.courseId.title)
                        .length
                    }{" "}
                    Enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <FaCheckCircle className="text-green-500 text-sm" />
                  <span className="text-sm font-medium text-gray-700">
                    {overallStats?.completedCourses || 0} Completed
                  </span>
                </div>
              </div>
            </div>

            {progressData.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {progressData
                  .filter(
                    (progress) => progress.courseId && progress.courseId.title
                  ) // Only show courses with valid courseId
                  .map((progress, idx) => (
                    <div
                      key={idx}
                      className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Course Header */}
                      <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                {progress.courseId?.title || "Course Title"}
                              </h3>
                              <p className="text-teal-100 text-sm flex items-center gap-1">
                                <MdSchool className="text-sm" />
                                {progress.courseId?.instructor?.name ||
                                  "Instructor"}
                              </p>
                            </div>
                            {progress.isCompleted && (
                              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                                <FaAward className="text-white text-sm" />
                              </div>
                            )}
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-teal-100">
                                Progress
                              </span>
                              <span className="text-sm font-bold">
                                {progress.overallProgress || 0}%
                              </span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                  width: `${progress.overallProgress || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Body */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {/* Course Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-gray-50/80 rounded-xl">
                              <div className="text-lg font-bold text-gray-800">
                                {progress.chaptersCompleted || 0}
                              </div>
                              <div className="text-xs text-gray-600">
                                Chapters Done
                              </div>
                            </div>
                            <div className="text-center p-3 bg-gray-50/80 rounded-xl">
                              <div className="text-lg font-bold text-gray-800">
                                {Math.round(
                                  (progress.totalTimeSpent || 0) / 60
                                )}
                                h
                              </div>
                              <div className="text-xs text-gray-600">
                                Time Spent
                              </div>
                            </div>
                          </div>

                          {/* Last Accessed */}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCalendarAlt className="text-xs" />
                            <span>
                              Last accessed:{" "}
                              {new Date(
                                progress.lastAccessedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Certificate Badge */}
                          {progress.certificateEarned && (
                            <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
                              <FaTrophy className="text-sm" />
                              <span className="font-medium">
                                Certificate Earned
                              </span>
                            </div>
                          )}

                          {/* Action Button */}
                          <Link
                            to={`/courses/content/${createSlug(
                              progress.courseId?.title ||
                                progress.courseId?.slug ||
                                "course"
                            )}`}
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                          >
                            {progress.isCompleted ? (
                              <>
                                <FaCheckCircle className="text-sm" />
                                Review Course
                              </>
                            ) : (
                              <>
                                <FaPlay className="text-sm" />
                                Continue Learning
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                              </>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBookOpen className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  No Enrolled Courses
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You haven't enrolled in any courses yet. Browse our course
                  catalog to get started on your learning journey!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-200 hover:shadow-lg"
                >
                  <FaBookOpen className="text-sm" />
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDash;