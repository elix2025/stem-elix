import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aiThumb from "../../assets/artificial-intelligence.png";
import mathThumb from "../../assets/mathematics.png";
import progThumb from "../../assets/programming.png";
import robotThumb from "../../assets/robot.png";
import modelThumb from "../../assets/model.png";
import { useAPI } from "../../context/api";

// ...existing code for assets...

const categories = ["All", "AI", "Math", "Programming"];
const topics = [
  "All",
  "Machine Learning",
  "Calculus",
  "Python",
  "Robotics",
  "3D Modeling",
  "Statistics",
  "Deep Learning",
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [topic, setTopic] = useState("All");
  const [paid, setPaid] = useState("All");
  const [length, setLength] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lengthOptions = [
    { label: "Any", value: "" },
    { label: "Less than 1 hour", value: "<1" },
    { label: "1-3 hours", value: "1-3" },
    { label: "3-6 hours", value: "3-6" },
    { label: "6+ hours", value: ">6" },
  ];
  const navigate = useNavigate();
  const { getAllCourses } = useAPI();

  useEffect(() => {
    setLoading(true);
    getAllCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load courses");
        setLoading(false);
      });
  }, [getAllCourses]);

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || course.categoryId === category;
    // You may need to adjust topic/paid/length mapping based on backend data
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-slate-800">All Courses</h1>
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-lg shadow-sm"
        />
      </div>
      <div className="flex gap-8">
        {/* Minimal Sidebar Filters */}
        <aside className="w-64 min-w-[220px] pt-2 border-r border-slate-100 bg-white/80 h-fit sticky top-24 self-start flex flex-col gap-6">
          <div>
            <label className="block text-slate-500 font-medium mb-1 text-sm">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base bg-slate-50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-500 font-medium mb-1 text-sm">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base bg-slate-50"
            >
              {topics.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-500 font-medium mb-1 text-sm">
              Type
            </label>
            <select
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base bg-slate-50"
            >
              <option value="All">All</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-500 font-medium mb-1 text-sm">
              Max Length
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base bg-slate-50"
            >
              {lengthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </aside>
        {/* Courses Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-slate-500 text-lg py-12">
                Loading courses...
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500 text-lg py-12">
                {error}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 text-lg py-12">
                No courses found.
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col"
                  onClick={() => navigate(`/courses/info/${course._id}`)}
                >
                  <div className="mb-4 w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={course.CourseThumbnail || aiThumb}
                      alt={course.title + " thumbnail"}
                      className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {course.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
                      {course.categoryId}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {course.duration} hrs
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      {course.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">
                    {course.description}
                  </p>
                  <button
                    className="mt-auto px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/info/${course._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
