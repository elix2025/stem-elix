import React, { useState, useEffect } from "react";
import { useAPI } from "../../context/api";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaTrophy,
  FaFire,
  FaStar,
  FaChartLine,
  FaPlay,
  FaGraduationCap,
  FaUserCircle,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const StudentDash = () => {
  const [studentData, setStudentData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const {
    currentUser,
    fetchUserProfile,
    getUserProgress,
    getRecentActivity,
    getLeaderboard,
    updateStreak,
  } = useAPI();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      if (currentUser && currentUser.token) {
        try {
          setLoading(true);

          // Fetch user profile
          const userProfile = await fetchUserProfile(
            currentUser._id,
            currentUser.token
          );
          setStudentData(userProfile);

          // Fetch progress data
          const progressResponse = await getUserProgress(currentUser.token);
          if (progressResponse.success) {
            setProgressData(progressResponse.progress);
          }

          // Update streak
          await updateStreak(currentUser.token);

          // Fetch recent activity
          const activityResponse = await getRecentActivity(currentUser.token);
          if (activityResponse.success) {
            setRecentActivity(activityResponse.activity);
          }

          // Fetch leaderboard
          const leaderboardResponse = await getLeaderboard(currentUser.token);
          if (leaderboardResponse.success) {
            setLeaderboardData(leaderboardResponse.leaderboard.slice(0, 10));
          }

          setError("");
        } catch (err) {
          console.error("StudentDash: Error fetching data", err);
          setError(err?.message || "Failed to fetch dashboard data");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Please log in to view your dashboard");
      }
    };

    fetchData();
  }, [currentUser]);

  // Calculate overall statistics
  const getOverallStats = () => {
    if (!progressData.length) return null;

    const totalCourses = progressData.length;
    const completedCourses = progressData.filter((p) => p.isCompleted).length;
    const totalTime = progressData.reduce(
      (sum, p) => sum + (p.totalTimeSpent || 0),
      0
    );
    const avgProgress =
      progressData.reduce((sum, p) => sum + (p.overallProgress || 0), 0) /
      totalCourses;
    const maxStreak = Math.max(...progressData.map((p) => p.streak || 0));

    return {
      totalCourses,
      completedCourses,
      totalTimeHours: Math.round(totalTime / 3600),
      avgProgress: Math.round(avgProgress),
      maxStreak,
    };
  };

  const overallStats = getOverallStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back,{" "}
                {studentData?.name || currentUser?.name || "Student"}!
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <MdEmail className="text-teal-500" />
                {studentData?.email || currentUser?.email}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["overview", "courses", "activity", "leaderboard"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition ${
                    activeTab === tab
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && overallStats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Courses
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {overallStats.totalCourses}
                    </p>
                  </div>
                  <FaBookOpen className="text-blue-500 text-2xl" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {overallStats.completedCourses}
                    </p>
                  </div>
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Study Hours
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {overallStats.totalTimeHours}
                    </p>
                  </div>
                  <FaClock className="text-purple-500 text-2xl" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Progress
                    </p>
                    <p className="text-2xl font-bold text-teal-600">
                      {overallStats.avgProgress}%
                    </p>
                  </div>
                  <FaChartLine className="text-teal-500 text-2xl" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Best Streak
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {overallStats.maxStreak}
                    </p>
                  </div>
                  <FaFire className="text-orange-500 text-2xl" />
                </div>
              </div>
            </div>

            {/* Recent Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Progress
              </h3>
              <div className="space-y-4">
                {progressData.slice(0, 3).map((progress, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FaBookOpen className="text-teal-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {progress.courseId?.title || "Course"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Last accessed:{" "}
                          {new Date(
                            progress.lastAccessedDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {progress.overallProgress}%
                        </span>
                        {progress.isCompleted && (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${progress.overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progressData.map((progress, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {progress.courseId?.title || "Course"}
                    </h3>
                    {progress.isCompleted && (
                      <FaGraduationCap className="text-green-500 text-xl" />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${progress.overallProgress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{progress.overallProgress}% Complete</span>
                      <span>
                        {Math.round(progress.totalTimeSpent / 60)} min
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <FaFire className="text-orange-500" />
                        <span>{progress.streak} day streak</span>
                      </div>
                      {progress.certificateEarned && (
                        <div className="flex items-center gap-1">
                          <FaTrophy className="text-yellow-500" />
                          <span>Certified</span>
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/courses/content/${
                        progress.courseId._id || progress.courseId
                      }`}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition flex items-center justify-center gap-2"
                    >
                      <FaPlay className="text-sm" />
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Activity
            </h2>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 border-l-4 border-teal-500 bg-teal-50 rounded-r-lg"
                    >
                      <FaBookOpen className="text-teal-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {activity.courseId?.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Progress: {activity.overallProgress}% •{" "}
                          {new Date(activity.updatedAt).toLocaleDateString()}
                        </p>
                        {activity.milestones?.length > 0 && (
                          <div className="flex gap-2 mt-1">
                            {activity.milestones
                              .slice(-3)
                              .map((milestone, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                >
                                  {milestone.type.replace("_", " ")}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent activity found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {leaderboardData.length > 0 ? (
                <div className="space-y-4">
                  {leaderboardData.map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {idx + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {user.name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{user.completedCourses} courses</span>
                            <span>{user.totalTimeSpent}h study time</span>
                            <span>{user.maxStreak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <FaStar className="text-yellow-500" />
                          <span className="font-bold text-gray-800">
                            {user.totalProgress}%
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          avg progress
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Leaderboard data not available.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDash;
