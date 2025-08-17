import React, { useState, useEffect } from "react";
import { useAPI } from "../../context/api";

const StudentDash = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser, fetchUserProfile } = useAPI();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("StudentDash: currentUser", currentUser);
    if (currentUser && currentUser.token) {
      console.log(
        "StudentDash: Fetching user profile with token",
        currentUser.token
      );
      fetchUserProfile(currentUser._id, currentUser.token)
        .then((data) => {
          console.log("StudentDash: fetched user profile", data);
          setStudentData(data);
          setError("");
          setLoading(false);
        })
        .catch((err) => {
          console.error("StudentDash: fetchUserProfile error", err);
          setError(err?.message || JSON.stringify(err));
          setLoading(false);
        });
    } else {
      console.warn("StudentDash: No current user or token found");
      if (currentUser === null) {
        setLoading(true);
      } else {
        setError("No current user found. Please login.");
        setStudentData(null);
        setLoading(false);
      }
    }
  }, [currentUser, fetchUserProfile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
      {studentData && (
        <div className="max-w-3xl mx-auto py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">
              Student Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-700">Name:</div>
                <div className="mb-2">{studentData.name}</div>
                <div className="font-semibold text-gray-700">Email:</div>
                <div className="mb-2">{studentData.email}</div>
                <div className="font-semibold text-gray-700">Phone:</div>
                <div className="mb-2">{studentData.phone || "-"}</div>
                <div className="font-semibold text-gray-700">Role:</div>
                <div className="mb-2">{studentData.role}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">
                  Total Courses Enrolled:
                </div>
                <div className="mb-2">{studentData.totalCoursesEnrolled}</div>
                <div className="font-semibold text-gray-700">
                  Courses Completed:
                </div>
                <div className="mb-2">{studentData.coursesCompleted}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4 text-teal-700">
              Enrolled Courses
            </h2>
            {studentData.coursesEnrolled &&
            studentData.coursesEnrolled.length > 0 ? (
              <ul className="list-disc pl-6">
                {studentData.coursesEnrolled.map((c, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold">Course ID:</span>{" "}
                    {c.course._id || c.course}
                    {c.course.title && (
                      <span className="ml-2">({c.course.title})</span>
                    )}
                    <span className="ml-4">Status: {c.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No courses enrolled yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDash;
