import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { useAPI } from "../context/api";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courseinfo/${course._id || course.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-[calc(33.333%-1rem)]
                 bg-white border border-purple-200 rounded-xl overflow-hidden 
                 shadow-lg hover:shadow-xl transition-all duration-300 
                 hover:scale-105 cursor-pointer snap-start"
    >
      <div className="p-6 flex flex-col items-center justify-center h-40">
        <h3 className="text-gray-800 font-semibold text-lg md:text-xl text-center mb-2">
          {course?.categoryId || "Uncategorized"}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">
          Level:{course?.levelNumber || "Beginner"}
        </p>
        <div>{course.CourseThumbnail && (
              <img
               src={course.CourseThumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-3 cursor-pointer hover:opacity-80"
                    
                      />
          )}</div>
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const { getAllCourses } = useAPI();
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        console.log("Full API Response:", response);

        let courseList = [];
        if (Array.isArray(response)) {
          courseList = response;
        } else if (response?.data) {
          courseList = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data.courses)
            ? response.data.courses
            : [];
        } else if (response?.courses) {
          courseList = response.courses;
        }

        setCourses(Array.isArray(courseList) ? courseList : []);
      } catch (error) {
        console.error("API Error:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth =
        container.querySelector(".snap-start")?.offsetWidth || 300;
      const gap = 16; // gap-4 = 16px
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const displayCourses = courses.length > 0 ? courses : [];

  return (
    <div className="w-full py-8 md:py-16 bg-gradient-to-br from-[efefef] to-gray-100">
      <div className="w-full px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
              Tinkrion
            </span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg px-2">
            Choose your <span className="text-purple-600 font-semibold">path</span> and start
            learning today.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative w-full">
          {/* Navigation Buttons - Only show on desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                       bg-white border-2 border-purple-300 hover:border-purple-500
                       text-purple-600 w-12 h-12 rounded-full items-center justify-center
                       transition-all duration-200 hover:scale-110 shadow-lg text-xl"
          >
            ‹
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                       bg-white border-2 border-purple-300 hover:border-purple-500
                       text-purple-600 w-12 h-12 rounded-full items-center justify-center
                       transition-all duration-200 hover:scale-110 shadow-lg text-xl"
          >
            ›
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto 
                       px-6 md:px-16 py-4 
                       scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {displayCourses.map((course, index) => (
              <CourseCard key={course._id || course.id || index} course={course} />
            ))}
          </div>

          {/* Mobile instruction */}
          <p className="text-center text-purple-500/70 text-sm mt-4 md:hidden">
            Swipe left or right to explore courses →
          </p>

          {/* Desktop instruction */}
          <p className="hidden md:block text-center text-purple-500/70 text-sm mt-4">
            Use arrow buttons or scroll to browse courses
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
