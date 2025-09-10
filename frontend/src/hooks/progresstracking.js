import { useState, useEffect, useRef } from "react";
import { useAPI } from "../context/api";

/**
 * Custom hook for progress tracking
 * Tracks time, video progress, and updates backend
 */
export const useProgressTracking = (courseId, lectureId) => {
  const {
    currentUser,
    initializeProgress,
    updateLectureProgress,
    getCourseProgress,
  } = useAPI();

  const [courseProgress, setCourseProgress] = useState(null);
  const [currentLectureProgress, setCurrentLectureProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Time & video state
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalSessionTime, setTotalSessionTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [watchPercentage, setWatchPercentage] = useState(0);
  const [lastWatchedPosition, setLastWatchedPosition] = useState(0);

  // Internal refs
  const timeTrackingInterval = useRef(null);
  const lastProgressUpdate = useRef(0);
  const autoSaveInterval = useRef(null);

  // Initialize progress
  useEffect(() => {
    const initProgress = async () => {
      if (currentUser?.token && courseId) {
        try {
          setLoading(true);
          await initializeProgress(courseId, currentUser.token);

          const progressResponse = await getCourseProgress(courseId, currentUser.token);
          if (progressResponse.success) {
            setCourseProgress(progressResponse.progress);
            updateCurrentLectureProgress(progressResponse.progress, lectureId);
          }
        } catch (err) {
          console.error("Error initializing progress:", err);
          setError("Failed to initialize progress tracking");
        } finally {
          setLoading(false);
        }
      }
    };

    initProgress();
  }, [courseId, lectureId, currentUser]);

  // Find lecture progress from response
  const updateCurrentLectureProgress = (progressData, lectureId) => {
    if (!progressData || !lectureId) return;
    const lecture = progressData.lectures?.find(
      (lec) => lec.lectureId === lectureId.toString()
    );
    setCurrentLectureProgress(lecture || null);
  };

  // Tracking start/stop
  const startTracking = () => {
    if (isTracking) return;
    setIsTracking(true);
    setSessionStartTime(Date.now());
    setTotalSessionTime(0);
    lastProgressUpdate.current = 0;

    timeTrackingInterval.current = setInterval(() => {
      const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
      setTotalSessionTime(sessionTime);

      if (sessionTime > 0 && sessionTime - lastProgressUpdate.current >= 30) {
        saveProgressUpdate(30);
        lastProgressUpdate.current = sessionTime;
      }
    }, 1000);

    autoSaveInterval.current = setInterval(() => {
      const timeSinceLast = totalSessionTime - lastProgressUpdate.current;
      if (timeSinceLast > 0) {
        saveProgressUpdate(timeSinceLast);
        lastProgressUpdate.current = totalSessionTime;
      }
    }, 120000);
  };

  const stopTracking = () => {
    if (!isTracking) return;
    setIsTracking(false);
    clearInterval(timeTrackingInterval.current);
    clearInterval(autoSaveInterval.current);

    const timeSinceLast = totalSessionTime - lastProgressUpdate.current;
    if (timeSinceLast > 0) saveProgressUpdate(timeSinceLast, true);
  };

  // Save backend update
  const saveProgressUpdate = async (timeSpent, isFinal = false) => {
    if (!currentUser?.token || !courseId || !lectureId) return;

    try {
      const progressData = {
        timeSpent: Math.max(1, Math.floor(timeSpent)),
        watchPercentage: Math.min(100, Math.max(0, watchPercentage)),
        lastWatchedPosition: Math.max(0, lastWatchedPosition),
        isCompleted: watchPercentage >= 90,
      };

      const response = await updateLectureProgress(
        courseId,
        lectureId,
        progressData,
        currentUser.token
      );

      if (response.success) {
        const updatedProgress = await getCourseProgress(courseId, currentUser.token);
        if (updatedProgress.success) {
          setCourseProgress(updatedProgress.progress);
          updateCurrentLectureProgress(updatedProgress.progress, lectureId);
        }
      }
    } catch (err) {
      console.error("Error saving progress:", err);
      setError("Failed to save progress");
    }
  };

  // Helpers
  const saveProgress = () => {
    const timeSinceLast = totalSessionTime - lastProgressUpdate.current;
    if (timeSinceLast > 0) {
      saveProgressUpdate(timeSinceLast, true);
      lastProgressUpdate.current = totalSessionTime;
    }
  };

  const markAsCompleted = async () => {
    return saveProgressUpdate(1, true);
  };

  const updateVideoProgress = (percentage, position) => {
    setWatchPercentage(Math.min(100, Math.max(0, percentage)));
    setLastWatchedPosition(Math.max(0, position));
  };

  const resetSession = () => {
    stopTracking();
    setSessionStartTime(null);
    setTotalSessionTime(0);
    lastProgressUpdate.current = 0;
  };

  const getFormattedTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Cleanup
  useEffect(() => stopTracking, []);

  return {
    courseProgress,
    currentLectureProgress,
    loading,
    error,
    isTracking,
    totalSessionTime,
    watchPercentage,
    lastWatchedPosition,
    startTracking,
    stopTracking,
    saveProgress,
    markAsCompleted,
    updateVideoProgress,
    resetSession,
    getFormattedTime,
    isCompleted: currentLectureProgress?.isCompleted || false,
    timeSpentTotal: currentLectureProgress?.timeSpent || 0,
    overallProgress: courseProgress?.overallProgress || 0,
  };
};
