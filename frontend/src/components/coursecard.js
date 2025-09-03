import React, { useEffect, useRef, useState } from "react";
import { useAPI } from "../context/api";

const CourseCard = ({ img, title }) => (
  <div className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-[calc(33.333%-1rem)] bg-white border border-purple-200 rounded-xl 
                  overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 
                  hover:scale-105 cursor-pointer snap-start">
    <img
      src={img}
      alt={title}
      className="w-full h-48 md:h-52 object-cover"
      onError={(e) => {
        console.log("Image failed:", img);
        e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format";
      }}
      onLoad={() => console.log("Image loaded:", img)}
    />
    <div className="p-4 md:p-6 min-h-[4rem]">
      <h3 className="text-gray-800 font-semibold text-base md:text-lg text-center leading-tight break-words overflow-wrap-anywhere">
        {title}
      </h3>
    </div>
  </div>
);

export default function TinkrionShowcase() {
  const { getAllCourses } = useAPI();
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        console.log("Full API Response:", response); // Debug log
        
        // Try multiple response structures
        let courseList = [];
        if (Array.isArray(response)) {
          courseList = response;
        } else if (response?.data) {
          courseList = Array.isArray(response.data) ? response.data : 
                      Array.isArray(response.data.courses) ? response.data.courses : [];
        } else if (response?.courses) {
          courseList = response.courses;
        }
        
        console.log("Extracted courses:", courseList); // Debug log
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
      const cardWidth = container.querySelector('.snap-start')?.offsetWidth || 300;
      const gap = 16; // gap-4 = 16px
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  // Enhanced image resolution with multiple fallbacks
  const getCourseImage = (course) => {
    const possibleImages = [
      course?.courseThumbnail,
      course?.CourseThumbnail,
      course?.thumbnail,
      course?.image,
      course?.imageUrl,
      course?.img
    ];

    for (let img of possibleImages) {
      if (img) {
        // If already a complete URL
        if (String(img).startsWith('http')) {
          console.log("Using direct URL:", img);
          return img;
        }
        
        // Try constructing with different base URLs
        const baseUrls = [
          process.env.REACT_APP_API_URL,
          process.env.NEXT_PUBLIC_API_URL,
          import.meta?.env?.VITE_API_URL,
          window?.location?.origin
        ].filter(Boolean);

        for (let base of baseUrls) {
          const fullUrl = `${base}${img.startsWith('/') ? img : '/' + img}`;
          console.log("Trying constructed URL:", fullUrl);
          return fullUrl;
        }
      }
    }

    return null; // Let fallback handle it
  };

  const getCourseTitle = (course) => {
    return course?.title || course?.name || course?.courseTitle || course?.courseName || "Course";
  };

  // Working fallback images from Unsplash
  const fallbackCourses = [
    { 
      id: 1, 
      title: "Junior Developer", 
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=400&fit=crop&auto=format"
    },
    { 
      id: 2, 
      title: "Master Track", 
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop&auto=format"
    },
    { 
      id: 3, 
      title: "Explorer Path", 
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop&auto=format"
    },
    { 
      id: 4, 
      title: "Innovator Course", 
      imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=400&fit=crop&auto=format"
    },
    { 
      id: 5, 
      title: "Creator Journey", 
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&auto=format"
    },
  ];

  const displayCourses = courses.length > 0 ? courses : fallbackCourses;

  return (
    <div className="w-full py-8 md:py-16 bg-gradient-to-br from-[efefef] to-gray-100">
      <div className="w-full px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              Tinkrion
            </span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg px-2">
            Welcome to <span className="text-purple-600 font-semibold">Tinkrion</span> — 
            explore our STEM learning tracks.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative w-full">
          
          {/* Navigation Buttons - Only show on desktop */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                       bg-white border-2 border-purple-300 hover:border-purple-500
                       text-purple-600 w-12 h-12 rounded-full items-center justify-center
                       transition-all duration-200 hover:scale-110 shadow-lg text-xl"
          >
            ‹
          </button>
          
          <button
            onClick={() => scroll('right')}
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
              <CourseCard
                key={course._id || course.id || index}
                img={getCourseImage(course) || course.imageUrl}
                title={getCourseTitle(course)}
              />
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}