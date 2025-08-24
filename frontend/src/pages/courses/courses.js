import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aiThumb from "../../assets/artificial-intelligence.png";
import mathThumb from "../../assets/mathematics.png";
import progThumb from "../../assets/programming.png";
import robotThumb from "../../assets/robot.png";
import modelThumb from "../../assets/model.png";
import { useAPI } from "../../context/api";
import { createSlug } from "../../utils/slugutils";

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

const lengthOptions = [
  { label: "0-1 Hour", value: "<1" },
  { label: "1-3 Hours", value: "1-3" },
  { label: "3-6 Hours", value: "3-6" },
  { label: "6-17 Hours", value: "6-17" },
  { label: "17+ Hours", value: ">17" },
];

const ratingOptions = [
  { label: "4.5 & up", value: 4.5 },
  { label: "4.0 & up", value: 4.0 },
  { label: "3.5 & up", value: 3.5 },
  { label: "3.0 & up", value: 3.0 },
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // initially unmarked
  const [topic, setTopic] = useState(""); // initially unmarked
  const [paid, setPaid] = useState(""); // initially unmarked
  const [length, setLength] = useState("");
  const [rating, setRating] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { getAllCourses } = useAPI();

  useEffect(() => {
    console.log("🔄 useEffect triggered - starting to load courses");
    const loadCourses = async () => {
      console.log("📡 Setting loading to true");
      setLoading(true);
      try {
        console.log("🌐 Calling getAllCourses API...");
        const data = await getAllCourses();
        console.log("📦 Raw data received:", data);

        // Ensure data is an array
        const coursesArray = Array.isArray(data) ? data : [];
        console.log("✅ Courses loaded:", coursesArray.length, "courses");
        console.log(
          "📚 Course titles:",
          coursesArray.map((course) => course.title)
        );

        setCourses(coursesArray);
        setError(""); // Clear any previous errors
        console.log("✅ Courses set in state");
      } catch (err) {
        console.error("❌ Error loading courses:", err);
        setError(err?.message || "Failed to load courses");
        setCourses([]); // Set empty array on error
      } finally {
        console.log("🏁 Setting loading to false");
        setLoading(false);
      }
    };

    loadCourses();
  }, []); // Empty dependency array - only run once on mount

  // Filtering logic with safety check
  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) => {
        const matchesSearch = course.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory =
          category === "" ||
          category === "All" ||
          course.categoryId === category;
        const matchesTopic =
          topic === "" || topic === "All" || course.topic === topic;
        const matchesPaid =
          paid === "" ||
          paid === "All" ||
          (paid === "Free" ? course.price === 0 : course.price > 0);
        const matchesLength =
          length === "" ||
          (length === "<1" && course.duration < 1) ||
          (length === "1-3" && course.duration >= 1 && course.duration <= 3) ||
          (length === "3-6" && course.duration > 3 && course.duration <= 6) ||
          (length === "6-17" && course.duration > 6 && course.duration <= 17) ||
          (length === ">17" && course.duration > 17);
        const matchesRating =
          rating === "" || (course.rating && course.rating >= rating);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesTopic &&
          matchesPaid &&
          matchesLength &&
          matchesRating
        );
      })
    : [];

  console.log("🔍 Filtering state:", {
    totalCourses: courses.length,
    filteredCourses: filteredCourses.length,
    loading,
    error,
    search,
    category,
    topic,
    paid,
    length,
    rating,
  });

  // Collapsible filter section
  const FilterSection = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border-b border-slate-200 py-3">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-slate-800 font-semibold mb-2"
        >
          {title}
          <span className="text-slate-500">{open ? "−" : "+"}</span>
        </button>
        {open && <div className="flex flex-col gap-2 pl-1">{children}</div>}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-slate-800">All Courses</h1>

      {/* Search */}
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
        {/* Sidebar Filters */}
        <aside className="w-64 min-w-[220px] border-r border-slate-200 bg-white/80 h-[80vh] sticky top-24 self-start p-4 rounded-lg shadow-sm overflow-y-auto">
          <FilterSection title="Ratings">
            {ratingOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={rating === opt.value}
                  onChange={() =>
                    setRating(rating === opt.value ? "" : opt.value)
                  }
                  className="w-4 h-4 accent-teal-600"
                />
                <span>{"★".repeat(Math.floor(opt.value))} & up</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Video Duration">
            {lengthOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={length === opt.value}
                  onChange={() =>
                    setLength(opt.value === length ? "" : opt.value)
                  }
                  className="w-4 h-4 accent-teal-600"
                />
                {opt.label}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Category">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={category === cat}
                  onChange={() => setCategory(category === cat ? "" : cat)}
                  className="w-4 h-4 accent-teal-600"
                />
                {cat}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Topic">
            {topics.map((top) => (
              <label
                key={top}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={topic === top}
                  onChange={() => setTopic(topic === top ? "" : top)}
                  className="w-4 h-4 accent-teal-600"
                />
                {top}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Type">
            {["All", "Free", "Paid"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={paid === type}
                  onChange={() => setPaid(paid === type ? "" : type)}
                  className="w-4 h-4 accent-teal-600"
                />
                {type}
              </label>
            ))}
          </FilterSection>
        </aside>

        {/* Courses List */}
        <div className="flex-1">
          {/* Debug Info - Remove in production */}
          <div className="mb-4 p-3 bg-blue-50 rounded text-sm">
            Debug:{" "}
            {loading
              ? "Loading..."
              : `${courses.length} courses loaded, ${filteredCourses.length} after filtering`}
            {error && <span className="text-red-600"> | Error: {error}</span>}
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="text-center text-slate-500 text-lg py-12">
                Loading courses...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 text-lg py-12">
                {error}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center text-slate-500 text-lg py-12">
                No courses found.
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 cursor-pointer flex gap-6 p-5 border border-slate-200"
                  onClick={() =>
                    navigate(`/courses/info/${createSlug(course.title)}`)
                  }
                >
                  {/* Thumbnail */}
                  <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                    <img
                      src={course.CourseThumbnail || aiThumb}
                      alt={course.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Course Info */}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
                      {course.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-2">
                      {course.description}
                    </p>

                    {/* Rating + Students */}
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-amber-500 font-semibold">
                        ★ {course.rating || "4.6"}
                      </span>
                      <span className="text-slate-500">
                        ({course.enrolled || "1,200"} students)
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-3 text-xs text-slate-600 mb-2">
                      <span>{course.categoryId}</span>
                      <span>{course.duration} hrs</span>
                    </div>

                    {/* Price + Badges */}
                    <div className="mt-auto flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-800">
                        ₹{course.price || "479"}
                      </span>
                      {course.isBestSeller && (
                        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded font-semibold">
                          Bestseller
                        </span>
                      )}
                      {course.isPremium && (
                        <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded font-semibold">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
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
