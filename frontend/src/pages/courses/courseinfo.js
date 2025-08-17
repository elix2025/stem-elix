import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAPI } from "../../context/api";

const CourseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, enrollCourse, currentUser } = useAPI();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getCourseById(id)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load course");
        setLoading(false);
      });
  }, [id, getCourseById]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-slate-500 text-lg">
        Loading course details...
      </div>
    );
  }
  if (error || !course) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-red-500 text-lg">
        {error || "Course not found."}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          {course.title}
        </h1>
        <div className="mb-6">
          {/* If you have a video/demo field, use it here. Otherwise, show a placeholder. */}
          <iframe
            width="100%"
            height="320"
            src={
              course.demoVideo || "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow"
          ></iframe>
        </div>
        <p className="text-lg text-slate-700 mb-6">{course.description}</p>
        {/* Highlights if available */}
        {course.highlights && course.highlights.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">
              Course Highlights
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              {course.highlights.map((item, idx) => (
                <li key={idx} className="text-slate-600 text-base">
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {/* Sidebar Info */}
      <aside className="lg:col-span-1 bg-white/80 rounded-2xl shadow p-6 border border-slate-100 flex flex-col gap-6 h-fit sticky top-24">
        {/* Author info if available */}
        {course.author && (
          <div className="flex items-center gap-4 mb-4">
            <img
              src={course.author.avatar}
              alt={course.author.name}
              className="w-16 h-16 rounded-full border border-teal-200 shadow"
            />
            <div>
              <div className="font-bold text-lg text-slate-800">
                {course.author.name}
              </div>
              <div className="text-slate-500 text-sm">{course.author.bio}</div>
            </div>
          </div>
        )}
        <div className="mb-4">
          <span className="block text-slate-500 mb-1">Category</span>
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
            {course.categoryId}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-slate-500 mb-1">Duration</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            {course.duration} hrs
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-slate-500 mb-1">Status</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            {course.status}
          </span>
        </div>
        <button
          className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
          onClick={async () => {
            let userId = currentUser?._id;
            let token = currentUser?.token || localStorage.getItem("token");
            // Try to get userId from localStorage if not present
            if (!userId) {
              try {
                const userObj = JSON.parse(localStorage.getItem("user"));
                userId = userObj?._id;
              } catch {}
            }
            if (!userId || !token) {
              alert("You must be logged in to enroll.");
              return;
            }
            const res = await enrollCourse(userId, course._id, token);
            if (res && res._id) {
              alert("Enrolled successfully!");
              navigate(`/courses/content/${course._id}`);
            } else {
              alert(res.message || "Failed to enroll in course.");
            }
          }}
        >
          Enroll Now
        </button>
      </aside>
    </div>
  );
};

export default CourseInfo;
