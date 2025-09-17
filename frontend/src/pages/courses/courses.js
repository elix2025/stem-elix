import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../context/api";
import { createSlug } from "../../utils/slugutils";
// import junior from "../../assets/images/junior.png";
// import explorer from "../../assets/images/explorer.png";
// import master from "../../assets/images/master.png";
const categories = [
  {
    id: "All",
    label: "All Courses",
    icon: "🎯",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "Junior",
    label: "Junior",
    icon: "🤖",
    color: "from-primary to-secondary",
  },
  {
    id: "Explorer",
    label: "Explorer",
    icon: "🚀",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "Master",
    label: "Master",
    icon: "💻",
    color: "from-orange-500 to-red-500",
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const { getAllCourses, user, isCourseEnrolled } = useAPI();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      if (!isMounted || isInitialized) return;

      setLoading(true);
      setError("");

      try {
        const data = await getAllCourses();
        if (!isMounted) return;

        const coursesArray = Array.isArray(data) ? data : [];
        setCourses(coursesArray);
        setIsInitialized(true);
      } catch (err) {
        if (!isMounted) return;

        console.error("Error loading courses:", err);
        setError(err?.message || "Failed to load courses");
        setCourses([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, [isInitialized]); // Use isInitialized to prevent multiple calls

  const filteredCourses = useMemo(() => {
    if (!Array.isArray(courses) || courses.length === 0) return [];

    return courses.filter((course) => {
      if (!course || !course.categoryId) return false;

      const matchesSearch = course.categoryId
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase().trim());
      const matchesCategory =
        selectedCategory === "All" || course.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, debouncedSearchQuery, selectedCategory]);
  const CourseCard = React.memo(({ course }) => {
    const isEnrolled = user && isCourseEnrolled(user, course._id);

    const handleCourseClick = () => {
      if (isEnrolled) {
        navigate(`/courses/content/${createSlug(course.title)}`);
      } else {
        navigate(`/courses/info/${createSlug(course.title)}`);
      }
    };

    return (
      <div
        className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm 
                   border border-slate-200 hover:border-primary/30
                   hover:shadow-xl hover:-translate-y-2 
                   transition-all duration-500 cursor-pointer
                   backdrop-blur-sm bg-white/90`}
        onClick={() => handleCourseClick(course)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative overflow-hidden bg-slate-100 w-full h-48 sm:h-56 rounded-t-2xl">
          <img
            src={
              course.CourseThumbnail ||
              `https://via.placeholder.com/400x300/6366F1/FFFFFF?text=${encodeURIComponent(
                course.title.substring(0, 20)
              )}`
            }
            alt={course.categoryId}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
            {isEnrolled && (
              <span className="px-2 sm:px-3 py-1 bg-success text-white text-xs font-semibold rounded-full">
                Enrolled
              </span>
            )}
             <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
            Level {course.levelNumber}
          </span>
        
            {course.isBestSeller && (
              <span className="px-2 sm:px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                Bestseller
              </span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col">
          {/* <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full">
              {course.categoryId}
            </span>
          </div> */}

          <h3 className="text-lg sm:text-xl font-bold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {course.categoryId}
          </h3>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{course.rating || "4.6"}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{course.duration} hrs</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </span>
            </div>

            <button
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                isEnrolled
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-primary text-white hover:bg-primary/90 hover:scale-105"
              }`}
            >
              {isEnrolled ? "Continue" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary/5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float delay-300 blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fadeIn">
            Discover Amazing Courses
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto animate-slideUp">
            Unlock your potential with our comprehensive collection of STEM
            courses
          </p>

          <div className="relative max-w-2xl mx-auto animate-scaleIn">
            <input
              type="text"
              placeholder="Search for courses, topics, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-6 rounded-2xl text-text text-base sm:text-lg 
                        border-0 focus:ring-4 focus:ring-white/30 transition-all duration-300
                        shadow-2xl backdrop-blur-sm"
            />
            <svg
              className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Pills */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base
                          transition-all duration-300 hover:scale-105 ${
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                          }`}
              >
                <span className="text-base sm:text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">
                  {category.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Results */}
        <div className="mb-6 sm:mb-8">
          <div className="text-slate-600 text-sm sm:text-base">
            <span className="font-semibold">{filteredCourses.length}</span>{" "}
            courses found
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 sm:h-56 bg-slate-200"></div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 
                       transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No courses found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={`${course._id}-${course.title}`}
                course={course}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
