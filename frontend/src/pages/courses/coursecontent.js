import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../../context/api";
import {
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useProgressTracking } from "../../hooks/progresstracking";

// Mock course sections data
const SECTIONS = [
  {
    id: 1,
    title: "Section 1: Introduction to course",
    chapters: [
      {
        id: 1,
        title: "Welcome to the course",
        duration: "1 min",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Introduction to Programming",
        duration: "4 min",
        video: "https://www.youtube.com/embed/9bZkp7q19f0",
      },
    ],
  },
  {
    id: 2,
    title: "Section 2: The Basics of Coding",
    chapters: [
      {
        id: 3,
        title: "What is Coding?",
        duration: "5 min",
        video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      },
      {
        id: 4,
        title: "First Hands-on Example",
        duration: "10 min",
        video: "https://www.youtube.com/embed/L_jWHffIx5E",
      },
    ],
  },
  {
    id: 3,
    title: "Section 3: Variables, Data Types and Operators",
    chapters: [
      {
        id: 5,
        title: "Variables Explained",
        duration: "6 min",
        video: "https://www.youtube.com/embed/tVj0ZTS4WF4",
      },
    ],
  },
];

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
    error,
    isTracking,
    totalSessionTime,
    getFormattedTime,
    startTracking,
    stopTracking,
    saveProgress,
    markAsCompleted,
    updateVideoProgress,
    resetSession,
    isCompleted,
    timeSpentTotal,
    overallProgress,
    streakDays,
  } = useProgressTracking(course?._id, activeSection, currentChapter?.id);

  const videoRef = useRef(null);

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

  // Simulate video progress (for YouTube videos we can't get real progress)
  useEffect(() => {
    let progressInterval;

    if (isTracking) {
      progressInterval = setInterval(() => {
        // Simulate video progress - in real implementation, get from video player
        const simulatedProgress = Math.min(100, (totalSessionTime / 300) * 100); // 5 min video
        const simulatedPosition = Math.min(300, totalSessionTime); // 5 min max

        updateVideoProgress(simulatedProgress, simulatedPosition);
      }, 5000); // Update every 5 seconds
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isTracking, totalSessionTime, updateVideoProgress]);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg">{courseError}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-6">
      {/* Video + Tabs */}
      <div className="lg:col-span-3 flex flex-col">
        {/* Course Progress Overview */}
        {courseProgress && (
          <div className="mb-4 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-teal-800">Course Progress</h3>
                {streakDays > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
                    <span className="text-orange-600 text-sm">🔥</span>
                    <span className="text-orange-700 font-medium text-sm">
                      {streakDays} day streak
                    </span>
                  </div>
                )}
              </div>
              <span className="text-teal-700 font-bold text-lg">
                {overallProgress}% Complete
              </span>
            </div>
            <div className="w-full bg-teal-100 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-teal-600">
              <span>
                Total study time: {Math.round(timeSpentTotal / 60)} minutes
              </span>
              <span>Session: {getFormattedTime(totalSessionTime)}</span>
            </div>
          </div>
        )}

        {/* Current Lecture Progress */}
        {currentLectureProgress && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-800 font-medium">
                  Current Lecture:
                </span>
                <span className="text-blue-700">{currentChapter.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    In Progress
                  </span>
                )}
                <span className="text-blue-700 text-sm font-medium">
                  {currentLectureProgress.watchPercentage || 0}% watched
                </span>
              </div>
            </div>
            {currentLectureProgress.timeSpent > 0 && (
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${currentLectureProgress.watchPercentage || 0}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Session Controls */}
        <div className="mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Session Timer:</span>
              <span className="text-2xl font-mono font-bold text-gray-900">
                {getFormattedTime(totalSessionTime)}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  isTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
            </div>
            <button
              onClick={resetSession}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset session timer"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startTracking}
              disabled={isTracking}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                isTracking
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white shadow-md"
              }`}
            >
              <Play className="w-4 h-4" />
              {isTracking ? "Tracking Active" : "Start Tracking"}
            </button>

            <button
              onClick={stopTracking}
              disabled={!isTracking}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                !isTracking
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md"
              }`}
            >
              <Pause className="w-4 h-4" />
              Stop Tracking
            </button>

            <button
              onClick={saveProgress}
              disabled={totalSessionTime === 0}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                totalSessionTime === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
              }`}
            >
              Save Progress
            </button>

            <button
              onClick={markAsCompleted}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-4">
          {currentChapter ? (
            <iframe
              ref={videoRef}
              width="100%"
              height="420"
              src={currentChapter.lectureUrl}
              title={currentChapter.lectureTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl shadow-lg"
            ></iframe>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <p className="text-gray-600">No video available</p>
            </div>
          )}
        </div>

        {/* Tabs (only Overview + Notes) */}
        <div className="border-b border-slate-200 mb-4 flex gap-6">
          <button
            className={`pb-2 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-teal-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === "notes"
                ? "border-b-2 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-teal-600"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-slate-700 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                About This Lecture
              </h3>
              <p className="text-gray-600">
                Learn to code and start your career in programming. Build your
                Dev Career and increase your opportunities in the future!
              </p>

              {currentLectureProgress && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Your Progress
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Watch Progress:</span>
                      <span className="font-medium">
                        {currentLectureProgress.watchPercentage || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time Spent:</span>
                      <span className="font-medium">
                        {Math.round(
                          (currentLectureProgress.timeSpent || 0) / 60
                        )}{" "}
                        minutes
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <span
                        className={`font-medium ${
                          isCompleted ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Notes
                </h3>
                <span className="text-sm text-gray-500">
                  Auto-saved locally
                </span>
              </div>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Write your notes here... These will be saved locally in your browser."
                rows={8}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (courseName && currentChapter?.lectureId) {
                    localStorage.setItem(
                      notes-`${courseName}-${currentChapter.lectureId}`,
                      e.target.value
                    );
                  }
                }}
              />
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{notes.length} characters</span>
                <button
                  onClick={() => {
                    setNotes("");
                    if (courseName && currentChapter?.lectureId) {
                      localStorage.removeItem(
                        notes-`${courseName}-${currentChapter.lectureId}`
                      );
                    }
                  }}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition"
                >
                  Clear Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Course Content */}
      <aside className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-slate-100 h-[80vh] sticky top-20 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Course Content
            </h2>
            {courseProgress && (
              <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                {overallProgress}%
              </span>
            )}
          </div>

          <div className="space-y-4">
            {course.CourseContent?.map((section) => (
              <div key={section.chapterId} className="border-b pb-4">
                {/* Section Header */}
                <button
                  className="flex justify-between items-center w-full text-left font-medium text-slate-700 hover:text-teal-700 py-2 transition-colors"
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.chapterId
                        ? null
                        : section.chapterId
                    )
                  }
                >
                  <span className="text-sm">{section.ChapterTitle}</span>
                  {activeSection === section.chapterId ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {/* Section Chapters */}
                {activeSection === section.chapterId && (
                  <ul className="ml-3 mt-3 space-y-2">
                    {section.chapterContent?.map((chapter) => {
                      // Get chapter progress
                      const chapterProgress = courseProgress?.chapters?.find(
                        (ch) => ch.chapterId === section.chapterId
                      );
                      const lectureProgress = chapterProgress?.lectures?.find(
                        (lec) => lec.lectureId === chapter.lectureId
                      );

                      const isCurrentChapter =
                        currentChapter?.lectureId === chapter.lectureId;
                      const isLectureCompleted = lectureProgress?.isCompleted;
                      const hasProgress = lectureProgress?.watchPercentage > 0;

                      return (
                        <li key={chapter.lectureId}>
                          <button
                            className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all duration-200 border ${
                              isCurrentChapter
                                ? "bg-teal-500 text-white shadow-md border-teal-500"
                                : "hover:bg-slate-50 text-slate-700 border-transparent hover:border-slate-200"
                            }`}
                            onClick={() => handleChapterChange(chapter)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="font-medium">
                                  {chapter.lectureTitle}
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    isCurrentChapter
                                      ? "text-teal-100"
                                      : "text-slate-500"
                                  }`}
                                >
                                  Duration: {chapter.lectureDuration} min
                                </div>
                                {lectureProgress && (
                                  <div
                                    className={`text-xs mt-1 ${
                                      isCurrentChapter
                                        ? "text-teal-100"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    Progress:{" "}
                                    {lectureProgress.watchPercentage || 0}%
                                  </div>
                                )}
                              </div>

                              {/* Progress Indicators */}
                              <div className="flex items-center gap-2">
                                {isLectureCompleted && (
                                  <CheckCircle
                                    className={`w-4 h-4 ${
                                      isCurrentChapter
                                        ? "text-green-200"
                                        : "text-green-500"
                                    }`}
                                  />
                                )}
                                {!isLectureCompleted && hasProgress && (
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      isCurrentChapter
                                        ? "bg-yellow-200"
                                        : "bg-yellow-400"
                                    }`}
                                  />
                                )}
                                {isCurrentChapter && isTracking && (
                                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          {courseProgress && (
            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
              <h3 className="font-medium text-teal-800 mb-2">Course Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-700">Overall Progress:</span>
                  <span className="font-medium text-teal-800">
                    {overallProgress}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-700">Study Time:</span>
                  <span className="font-medium text-teal-800">
                    {Math.round(timeSpentTotal / 60)}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-700">Current Streak:</span>
                  <span className="font-medium text-teal-800">
                    {streakDays} days
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CourseContent;