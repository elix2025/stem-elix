import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAPI } from "../../context/api";
import { createSlug } from "../../utils/slugutils";

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
     color: "from-blue-500 to-cyan-500",
   },
   {
    id: "Explorer",
     label: "Explorer",
     icon: "🔬",
       color: "from-green-500 to-teal-500",
   },
   {
     id: "Master",
     label: "Master",
     icon: "🎓",
     color: "from-orange-500 to-red-500",
   },
   {
     id: "Aero",
     label: "Aero",
     icon: "🚁",
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
  const location = useLocation();

  // Set initial category from navigation state if available
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location]);

  const navigate = useNavigate();
  const { getAllCourses, currentUser, isCourseEnrolled, canAccessCourse } = useAPI();

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
      if (!course || !course.title) return false;

      const matchesSearch = course.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase().trim());
      const matchesCategory =
        selectedCategory === "All" ||
       course.title.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [courses, debouncedSearchQuery, selectedCategory]);
  const CourseCard = React.memo(({ course }) => {
    const [checkingAccess, setCheckingAccess] = useState(false);
    const isEnrolled = currentUser && isCourseEnrolled(currentUser, course._id);

    const handleCourseClick = async () => {
      const token = currentUser?.token || localStorage.getItem("token");

      if (!currentUser || !token) {
        alert("You must be logged in to access courses.");
        navigate("/login");
        return;
      }

      // If already enrolled, go directly to content
      if (isEnrolled) {
        navigate(`/courses/content/${createSlug(course.title)}`);
        return;
      }

      // Check if user can access the course (handles auto-enrollment for verified payments)
      setCheckingAccess(true);
      try {
        const accessResult = await canAccessCourse(course._id, token);
        
        if (accessResult.canAccess) {
          // User can access - either was enrolled or got auto-enrolled
          navigate(`/courses/content/${createSlug(course.title)}`);
        } else {
          // User needs to see course info/payment page
          navigate(`/courses/info/${createSlug(course.title)}`);
        }
      } catch (error) {
        console.error('Error checking course access:', error);
        // Fallback to info page
        navigate(`/courses/info/${createSlug(course.title)}`);
      } finally {
        setCheckingAccess(false);
      }
    };

    return (
      <div
        className="card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl 
                   border border-slate-200 hover:border-purple-200
                   transition-all duration-500 cursor-pointer overflow-hidden
                   hover-lift hover:scale-105"
        onClick={handleCourseClick}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 w-full h-56 rounded-t-3xl">
          <img
            src={
              course.CourseThumbnail ||
              `https://via.placeholder.com/400x300/AC6CF4/FFFFFF?text=${encodeURIComponent(
                course.title.substring(0, 20)
              )}`
            }
            alt={course.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isEnrolled && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                ✓ Enrolled
              </span>
            )}
            {/* {course.isBestSeller && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                🏆 Bestseller
              </span>
            )} */}
          </div>
        </div>

        <div className="relative z-10 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200">
              {course.coursename}
            </span>
          </div>

          <h3 className="headline-3 text-slate-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="body-text text-slate-600">Level:</span>
            <span className="body-text-bold text-slate-800">{course.levelNumber}</span>
          </div>

          <p className="body-text text-slate-600 mb-6 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
            {/* <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{course.rating || "4.6"}</span>
            </div> */}
            {/* <div className="flex items-center gap-1">
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
            </div> */}
          </div>

          <div className="mt-auto flex items-center justify-between">
            <button
              className={`relative overflow-hidden px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg group/btn ${
                checkingAccess
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : isEnrolled
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-xl"
                  : "bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white hover:from-[#ac6cf4] hover:to-purple-700 hover:scale-105 hover:shadow-xl"
              }`}
              disabled={checkingAccess}
            >
              {/* Button shine effect */}
              {!checkingAccess && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"></div>
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {checkingAccess ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </>
                ) : isEnrolled ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m-7-7l7-7" />
                    </svg>
                    Continue
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Know More
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="relative section-hero bg-gradient-to-br from-[#ac6cf4] via-purple-600 to-cyan-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <span className="text-sm font-semibold text-white/90 tracking-wide">
              🎯 Explore Our Premium STEM Courses
            </span>
          </div>
          
          <h1 className="headline-1 text-white mb-6 text-shadow-lg">
            Discover Amazing 
            <span className="text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-100 to-white">
              Courses
            </span>
          </h1>
          
          <p className="body-text-large text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with our comprehensive collection of interactive STEM courses designed by industry experts
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses, topics, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-5 pl-14 pr-6 rounded-2xl text-slate-800 text-lg 
                          border-0 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-300
                          shadow-2xl backdrop-blur-sm bg-white/95 placeholder:text-slate-500
                          hover:shadow-3xl focus:shadow-3xl"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400"
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
              
              {/* Search suggestions or results count could go here */}
              {searchQuery && (
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm text-slate-400 font-medium">
                    {filteredCourses.length} found
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Pills */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="headline-2 mb-4">
                Browse by 
                <span className="text-gradient-purple">Category</span>
              </h2>
              <p className="body-text text-slate-600 max-w-2xl mx-auto">
                Choose from our carefully curated course categories designed for different learning levels
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold 
                            transition-all duration-500 hover-lift ${
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                              : "bg-white text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg"
                          }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: selectedCategory === category.id ? 'translateY(-4px)' : 'translateY(0)'
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span className="relative z-10">{category.label}</span>
                  
                  {selectedCategory === category.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Course Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-slate-600">
              <span className="body-text-bold text-slate-800 text-lg">{filteredCourses.length}</span>
              <span className="body-text ml-1">courses available</span>
            </div>
            
            {selectedCategory !== "All" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <span className="text-sm text-purple-700 font-medium">
                  Filtered by: {selectedCategory}
                </span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-purple-600 hover:text-purple-800 ml-2"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="card bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-3xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
                  <div className="h-10 bg-slate-200 rounded-2xl w-full mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">😞</div>
            <h3 className="headline-3 text-slate-800 mb-4">
              Oops! Something went wrong
            </h3>
            <p className="body-text text-slate-600 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary inline-flex items-center gap-2 hover-lift"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="headline-3 text-slate-800 mb-4">
              No courses found
            </h3>
            <p className="body-text text-slate-600 mb-8 max-w-md mx-auto">
              {searchQuery ? `No results for "${searchQuery}"` : "No courses available in this category"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSearchQuery("")}
                className="btn-secondary"
              >
                Clear Search
              </button>
              <button
                onClick={() => setSelectedCategory("All")}
                className="btn-outline text-slate-700 border-slate-300 hover:bg-slate-50"
              >
                View All Categories
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={`${course._id}-${course.title}`}
                className="fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
