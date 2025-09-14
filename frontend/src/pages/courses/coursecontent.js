import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import { useAPI } from "../../context/api";
import {
  ChevronDown,
  ChevronRight,
  Book,
  Target,
  Settings,
} from "lucide-react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaPlay,
  FaGraduationCap,
  FaBookmark,
  FaShare,
  FaDownload,
  FaCog,
  FaChartLine,
  FaArrowLeft,
  FaHeart,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";
import { MdSchool, MdTimer } from "react-icons/md";
import { useProgressTracking } from "../../hooks/progresstracking";

const CourseContent = () => {
  const { courseName } = useParams();
  const { getCourseByTitle } = useAPI();
  const [course, setCourse] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState("");

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      setCourseLoading(true);
      try {
        // Get course directly by title/slug
        const foundCourse = await getCourseByTitle(courseName);

        if (foundCourse && !foundCourse.message) {
          setCourse(foundCourse);
          // Set initial active section and chapter
          if (
            foundCourse.CourseContent &&
            foundCourse.CourseContent.length > 0
          ) {
            const firstChapter = foundCourse.CourseContent[0];
            setActiveSection(firstChapter.chapterId);
            if (
              firstChapter.chapterContent &&
              firstChapter.chapterContent.length > 0
            ) {
              setCurrentChapter(firstChapter.chapterContent[0]);
            }
          }
        } else {
          setCourseError(foundCourse?.message || "Course not found");
        }
      } catch (err) {
        setCourseError(err?.message || "Failed to load course");
      } finally {
        setCourseLoading(false);
      }
    };

    loadCourse();
  }, [courseName, getCourseByTitle]);

  // Use the progress tracking hook
  const {
    courseProgress,
    currentLectureProgress,
    loading,
    isTracking,
    totalSessionTime,
    getFormattedTime,
    startTracking,
    stopTracking,
    saveProgress,
    markAsCompleted,
    updateVideoProgress,
    timeSpentTotal,
    overallProgress,
    streakDays,
  } = useProgressTracking(
    course?._id,
    activeSection,
    currentChapter?.lectureId
  );

  // Load notes from localStorage when chapter changes
  useEffect(() => {
    if (!courseName || !currentChapter?.lectureId) return;

    const savedNotes = localStorage.getItem(
      `notes-${courseName}-${currentChapter.lectureId}`
    );
    setNotes(savedNotes || "");
  }, [courseName, currentChapter?.lectureId]);

  // Handle chapter change
  const handleChapterChange = (chapter) => {
    // Save current progress before switching
    if (isTracking) {
      saveProgress();
      stopTracking();
    }

    setCurrentChapter(chapter);

    // Auto-start tracking for new chapter
    setTimeout(() => {
      startTracking();
    }, 1000);
  };

  // Auto-complete when reaching 90%
  useEffect(() => {
    if (
      currentLectureProgress?.watchPercentage >= 90 &&
      !currentLectureProgress?.isCompleted
    ) {
      markAsCompleted();
    }
  }, [currentLectureProgress, markAsCompleted]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FaBookOpen className="text-white text-2xl" />
          </div>
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Loading Course
          </h3>
          <p className="text-gray-600">
            Please wait while we prepare your learning experience...
          </p>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-white text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Course Not Found
          </h3>
          <p className="text-red-600 mb-4">{courseError}</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-white text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Course Not Available
          </h3>
          <p className="text-gray-600">
            The requested course could not be found.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Preparing Course Content
          </h3>
          <p className="text-gray-600">
            Setting up your learning environment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 pt-6">
      {/* Course Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-16 z-50 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/courses"
                className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
              >
                <FaArrowLeft className="text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-1">
                  {course?.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MdSchool className="text-teal-500" />
                    <span>
                      {course?.instructor?.name || "Expert Instructor"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdTimer className="text-blue-500" />
                    <span>{course?.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaGraduationCap className="text-purple-500" />
                    <span>{course?.categoryId} Level</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
                <FaBookmark className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
                <FaShare className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
                <FaCog className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Course Progress Overview */}
            {courseProgress && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <FaChartLine className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Course Progress
                      </h3>
                      <p className="text-sm text-gray-600">
                        Track your learning journey
                      </p>
                    </div>
                  </div>
                  {streakDays > 0 && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-2 rounded-xl border border-orange-200">
                      <FaRocket className="text-orange-500 text-sm" />
                      <span className="text-orange-700 font-bold text-sm">
                        {streakDays} day streak!
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCheckCircle className="text-teal-500" />
                      <span className="text-sm font-medium text-teal-700">
                        Completion
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-teal-600">
                      {overallProgress}%
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">
                        Study Time
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(timeSpentTotal / 60)}m
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLightbulb className="text-green-500" />
                      <span className="text-sm font-medium text-green-700">
                        Session
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {getFormattedTime(totalSessionTime)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Video Player */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              {currentChapter && currentChapter.lectureUrl ? (
                <div className="relative group">
                  <ReactPlayer
                    key={`${course?._id}-${currentChapter?.lectureId}`}
                    url={currentChapter.lectureUrl}
                    controls
                    width="100%"
                    height="500px"
                    className="rounded-2xl transition-all duration-300"
                    config={{
                      file: {
                        attributes: {
                          preload: "metadata",
                        },
                      },
                    }}
                    onProgress={({ played, playedSeconds }) => {
                      try {
                        const percentage = Math.floor(played * 100);
                        const position = Math.floor(playedSeconds);
                        updateVideoProgress(percentage, position);
                      } catch (error) {
                        console.error("Progress update error:", error);
                      }
                    }}
                    onPlay={() => {
                      try {
                        if (!isTracking) startTracking();
                      } catch (error) {
                        console.error("Play tracking error:", error);
                      }
                    }}
                    onPause={() => {
                      try {
                        if (isTracking) saveProgress();
                      } catch (error) {
                        console.error("Pause tracking error:", error);
                      }
                    }}
                    onEnded={() => {
                      try {
                        markAsCompleted();
                        stopTracking();
                      } catch (error) {
                        console.error("End tracking error:", error);
                      }
                    }}
                    onError={(error) => {
                      console.error("Video playback error:", error);
                    }}
                    onReady={() => {
                      console.log("Video ready to play");
                    }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {isTracking ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Live Tracking
                        </div>
                      ) : (
                        "Paused"
                      )}
                    </div>
                    <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-200 hover:scale-110">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Progress overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-white text-sm font-medium mb-2">
                      {currentChapter.lectureTitle}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-200">
                      <FaClock className="w-3 h-3" />
                      <span>{currentChapter.lectureDuration} min</span>
                      {currentLectureProgress && (
                        <>
                          <span>•</span>
                          <span>
                            {currentLectureProgress.watchPercentage || 0}%
                            completed
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : currentChapter ? (
                <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-500">
                  <div className="text-center text-gray-500 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                      <FaPlay className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 hover:text-teal-600">
                      {currentChapter.lectureTitle}
                    </h3>
                    <p className="text-sm mb-1 transition-opacity duration-300">
                      Video content will be available soon
                    </p>
                    <p className="text-xs text-gray-400 transition-opacity duration-300">
                      Duration: {currentChapter.lectureDuration} min
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-500">
                  <div className="text-center text-gray-500 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaBookOpen className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 hover:text-teal-600">
                      Select a lecture to start learning
                    </h3>
                    <p className="text-sm transition-opacity duration-300">
                      Choose from the course content sidebar
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Information Tabs */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 transition-all duration-500 hover:shadow-xl">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex gap-6 relative">
                  <button
                    className={`pb-2 font-medium transition-all duration-300 flex items-center gap-2 relative ${
                      activeTab === "overview"
                        ? "border-b-2 border-teal-500 text-teal-600 transform scale-105"
                        : "text-gray-600 hover:text-teal-600 hover:transform hover:scale-105"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <Book
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeTab === "overview"
                          ? "rotate-12"
                          : "group-hover:rotate-12"
                      }`}
                    />
                    Overview
                  </button>
                  <button
                    className={`pb-2 font-medium transition-all duration-300 flex items-center gap-2 relative ${
                      activeTab === "notes"
                        ? "border-b-2 border-teal-500 text-teal-600 transform scale-105"
                        : "text-gray-600 hover:text-teal-600 hover:transform hover:scale-105"
                    }`}
                    onClick={() => setActiveTab("notes")}
                  >
                    <FaBookmark
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeTab === "notes"
                          ? "rotate-12"
                          : "group-hover:rotate-12"
                      }`}
                    />
                    Notes
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6 animate-fadeIn transition-all duration-500">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 transition-all duration-300 hover:text-teal-600">
                        <Target className="w-5 h-5 text-teal-500 transition-transform duration-300 hover:rotate-12" />
                        About This Lecture
                      </h3>
                      <div className="space-y-4">
                        {currentChapter && (
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                              <FaPlay className="text-blue-600" />
                              {currentChapter.lectureTitle}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-blue-700">
                                <MdTimer className="text-blue-500" />
                                <span className="text-sm">
                                  Duration: {currentChapter.lectureDuration}{" "}
                                  minutes
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-blue-700">
                                <Book className="text-blue-500 w-4 h-4" />
                                <span className="text-sm">
                                  Interactive Content
                                </span>
                              </div>
                            </div>
                            {currentChapter.lectureDescription && (
                              <p className="text-blue-800 text-sm bg-white/50 rounded-lg p-3">
                                {currentChapter.lectureDescription}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-4 animate-fadeIn transition-all duration-500">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 transition-all duration-300 hover:text-teal-600">
                        <FaBookmark className="text-teal-500 transition-transform duration-300 hover:rotate-12" />
                        Your Notes
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 transition-all duration-300 hover:text-red-500">
                        <FaHeart className="text-red-400 transition-transform duration-300 hover:scale-125 hover:animate-pulse" />
                        <span>Auto-saved locally</span>
                      </div>
                    </div>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:scale-[1.02]"
                      placeholder="Write your notes here... These will be saved locally in your browser for this specific lecture."
                      rows={10}
                      value={notes}
                      onChange={(e) => {
                        setNotes(e.target.value);
                        if (courseName && currentChapter?.lectureId) {
                          localStorage.setItem(
                            `notes-${courseName}-${currentChapter.lectureId}`,
                            e.target.value
                          );
                        }
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {notes.length} characters
                      </span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                          <FaDownload className="inline mr-1" />
                          Export
                        </button>
                        <button
                          onClick={() => {
                            setNotes("");
                            if (courseName && currentChapter?.lectureId) {
                              localStorage.removeItem(
                                `notes-${courseName}-${currentChapter.lectureId}`
                              );
                            }
                          }}
                          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        >
                          Clear Notes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaBookOpen className="text-teal-500" />
                    Course Content
                  </h2>
                  {courseProgress && (
                    <div className="flex items-center gap-2 bg-teal-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-teal-700 text-sm font-bold">
                        {overallProgress}%
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {course?.totalLectures ||
                    course?.CourseContent?.reduce(
                      (total, chapter) =>
                        total + (chapter.chapterContent?.length || 0),
                      0
                    ) ||
                    0}{" "}
                  lectures
                </p>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
                <div className="p-6 space-y-4">
                  {course.CourseContent?.map((section, sectionIndex) => (
                    <div
                      key={section.chapterId}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      {/* Chapter Header */}
                      <button
                        className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-teal-600 py-3 px-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                        onClick={() =>
                          setActiveSection(
                            activeSection === section.chapterId
                              ? null
                              : section.chapterId
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {sectionIndex + 1}
                          </div>
                          <div>
                            <span className="text-sm font-medium">
                              {section.ChapterTitle}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              {section.chapterContent?.length || 0} lectures
                            </div>
                          </div>
                        </div>
                        {activeSection === section.chapterId ? (
                          <ChevronDown className="w-5 h-5 transition-transform duration-200 text-teal-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:text-teal-500" />
                        )}
                      </button>

                      {/* Chapter Lectures */}
                      {activeSection === section.chapterId && (
                        <div className="mt-3 ml-3 space-y-2">
                          {section.chapterContent?.map(
                            (chapter, lectureIndex) => {
                              const isCurrentChapter =
                                currentChapter?.lectureId === chapter.lectureId;

                              return (
                                <div key={chapter.lectureId} className="group">
                                  <button
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border relative overflow-hidden ${
                                      isCurrentChapter
                                        ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg border-teal-500 transform scale-[1.02]"
                                        : "hover:bg-gray-50 text-gray-700 border-transparent hover:border-gray-200 hover:shadow-sm"
                                    }`}
                                    onClick={() => handleChapterChange(chapter)}
                                  >
                                    {/* Background decoration */}
                                    {isCurrentChapter && (
                                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                    )}

                                    <div className="relative z-10 flex justify-between items-center">
                                      <div className="flex items-center gap-3 flex-1">
                                        <div
                                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                            isCurrentChapter
                                              ? "bg-white/20 text-white"
                                              : "bg-gray-100 text-gray-600"
                                          }`}
                                        >
                                          {lectureIndex + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div
                                            className={`font-semibold truncate ${
                                              isCurrentChapter
                                                ? "text-white"
                                                : "text-gray-800"
                                            }`}
                                          >
                                            {chapter.lectureTitle}
                                          </div>
                                          <div
                                            className={`text-xs mt-1 flex items-center gap-2 ${
                                              isCurrentChapter
                                                ? "text-teal-100"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <div className="flex items-center gap-1">
                                              <MdTimer className="w-3 h-3" />
                                              <span>
                                                {chapter.lectureDuration} min
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Progress Indicators */}
                                      <div className="flex items-center gap-2 ml-2">
                                        {isCurrentChapter && isTracking && (
                                          <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                                        )}
                                        {chapter.isPreviewFree && (
                                          <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                                            Free
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
