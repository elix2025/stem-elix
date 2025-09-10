import { useState, useEffect, useRef } from "react";
import { useAPI } from "../context/api";

/**
 * Custom hook for comprehensive progress tracking
 * Handles time tracking, progress updates, and lecture completion
 */
export const useProgressTracking = (courseId, chapterId, lectureId) => {
  const {
    currentUser,
    initializeCourseProgress,
    updateLectureProgress,
    getCourseProgress,
  } = useAPI();

  // Progress state
  const [courseProgress, setCourseProgress] = useState(null);
  const [currentLectureProgress, setCurrentLectureProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Time tracking state
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalSessionTime, setTotalSessionTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  // Video progress state
  const [watchPercentage, setWatchPercentage] = useState(0);
  const [lastWatchedPosition, setLastWatchedPosition] = useState(0);

  // Refs for cleanup and intervals
  const timeTrackingInterval = useRef(null);
  const lastProgressUpdate = useRef(0);
  const autoSaveInterval = useRef(null);

  // Initialize progress when hook mounts
  useEffect(() => {
    const initializeProgress = async () => {
      if (currentUser?.token && courseId) {
        try {
          setLoading(true);
          setError(null);

          // Initialize course progress if needed
          await initializeCourseProgress(courseId, currentUser.token);

          // Fetch current progress
          const progressResponse = await getCourseProgress(
            courseId,
            currentUser.token
          );
          if (progressResponse.success) {
            setCourseProgress(progressResponse.progress);
            updateCurrentLectureProgress(
              progressResponse.progress,
              chapterId,
              lectureId
            );
          }
        } catch (err) {
          console.error("Error initializing progress:", err);
          setError("Failed to initialize progress tracking");
        } finally {
          setLoading(false);
        }
      }
    };

    initializeProgress();
  }, [courseId, currentUser, chapterId, lectureId]);

  // Update current lecture progress when data changes
  const updateCurrentLectureProgress = (progressData, chapterId, lectureId) => {
    if (!progressData || !chapterId || !lectureId) return;

    const chapter = progressData.chapters?.find(
      (ch) => ch.chapterId === chapterId.toString()
    );

    if (chapter) {
      const lecture = chapter.lectures?.find(
        (lec) => lec.lectureId === lectureId.toString()
      );
      setCurrentLectureProgress(lecture || null);
    }
  };

  // Start time tracking
  const startTracking = () => {
    if (isTracking) return;

    setIsTracking(true);
    setSessionStartTime(Date.now());
    setTotalSessionTime(0);
    lastProgressUpdate.current = 0;

    // Start time tracking interval
    timeTrackingInterval.current = setInterval(() => {
      const now = Date.now();
      const sessionTime = Math.floor((now - sessionStartTime) / 1000);
      setTotalSessionTime(sessionTime);

      // Auto-save progress every 30 seconds
      if (sessionTime > 0 && sessionTime - lastProgressUpdate.current >= 30) {
        saveProgressUpdate(30);
        lastProgressUpdate.current = sessionTime;
      }
    }, 1000);

    // Start auto-save interval (backup every 2 minutes)
    autoSaveInterval.current = setInterval(() => {
      const timeSinceLastUpdate = totalSessionTime - lastProgressUpdate.current;
      if (timeSinceLastUpdate > 0) {
        saveProgressUpdate(timeSinceLastUpdate);
        lastProgressUpdate.current = totalSessionTime;
      }
    }, 120000); // 2 minutes
  };

  // Stop time tracking
  const stopTracking = () => {
    if (!isTracking) return;

    setIsTracking(false);

    // Clear intervals
    if (timeTrackingInterval.current) {
      clearInterval(timeTrackingInterval.current);
    }
    if (autoSaveInterval.current) {
      clearInterval(autoSaveInterval.current);
    }

    // Save final progress
    const timeSinceLastUpdate = totalSessionTime - lastProgressUpdate.current;
    if (timeSinceLastUpdate > 0) {
      saveProgressUpdate(timeSinceLastUpdate, true);
    }
  };

  // Save progress update to backend
  const saveProgressUpdate = async (timeSpent, isFinal = false) => {
    if (!currentUser?.token || !courseId || !chapterId || !lectureId) {
      return;
    }

    try {
      const progressData = {
        timeSpent: Math.max(1, Math.floor(timeSpent)), // Ensure at least 1 second
        watchPercentage: Math.max(0, Math.min(100, watchPercentage)),
        lastWatchedPosition: Math.max(0, lastWatchedPosition),
        isCompleted: watchPercentage >= 90, // Mark completed at 90%
      };

      const response = await updateLectureProgress(
        courseId,
        chapterId.toString(),
        lectureId.toString(),
        progressData,
        currentUser.token
      );

      if (response.success) {
        // Refresh progress data
        const updatedProgress = await getCourseProgress(
          courseId,
          currentUser.token
        );
        if (updatedProgress.success) {
          setCourseProgress(updatedProgress.progress);
          updateCurrentLectureProgress(
            updatedProgress.progress,
            chapterId,
            lectureId
          );
        }
      }
    } catch (err) {
      console.error("Error saving progress:", err);
      setError("Failed to save progress");
    }
  };

  // Manual progress save
  const saveProgress = () => {
    const timeSinceLastUpdate = totalSessionTime - lastProgressUpdate.current;
    if (timeSinceLastUpdate > 0) {
      saveProgressUpdate(timeSinceLastUpdate, true);
      lastProgressUpdate.current = totalSessionTime;
    }
  };

  // Mark lecture as completed
  const markAsCompleted = async () => {
    try {
      await saveProgressUpdate(1, true); // Save at least 1 second

      const progressData = {
        timeSpent: 1,
        watchPercentage: 100,
        lastWatchedPosition: lastWatchedPosition,
        isCompleted: true,
      };

      const response = await updateLectureProgress(
        courseId,
        chapterId.toString(),
        lectureId.toString(),
        progressData,
        currentUser.token
      );

      if (response.success) {
        const updatedProgress = await getCourseProgress(
          courseId,
          currentUser.token
        );
        if (updatedProgress.success) {
          setCourseProgress(updatedProgress.progress);
          updateCurrentLectureProgress(
            updatedProgress.progress,
            chapterId,
            lectureId
          );
        }
      }

      return response;
    } catch (err) {
      console.error("Error marking as completed:", err);
      setError("Failed to mark lecture as completed");
      return { success: false, message: "Failed to mark as completed" };
    }
  };

  // Update video progress
  const updateVideoProgress = (percentage, position) => {
    setWatchPercentage(Math.max(0, Math.min(100, percentage)));
    setLastWatchedPosition(Math.max(0, position));
  };

  // Reset session
  const resetSession = () => {
    stopTracking();
    setSessionStartTime(null);
    setTotalSessionTime(0);
    lastProgressUpdate.current = 0;
  };

  // Get formatted time
  const getFormattedTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    // Progress data
    courseProgress,
    currentLectureProgress,
    loading,
    error,

    // Time tracking
    isTracking,
    totalSessionTime,
    sessionStartTime,
    getFormattedTime,

    // Video progress
    watchPercentage,
    lastWatchedPosition,

    // Actions
    startTracking,
    stopTracking,
    saveProgress,
    markAsCompleted,
    updateVideoProgress,
    resetSession,

    // Computed values
    isCompleted: currentLectureProgress?.isCompleted || false,
    timeSpentTotal: currentLectureProgress?.timeSpent || 0,
    overallProgress: courseProgress?.overallProgress || 0,
    streakDays: courseProgress?.streak || 0,
  };
};
