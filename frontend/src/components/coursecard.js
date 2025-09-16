import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.png";
import Master from "../assets/Master.png";
import Junior from "../assets/junior.png";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // staggered animation
    return () => clearTimeout(timer);
  }, [index]);

  const handleClick = () => {
    navigate(`/courseinfo/${course.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
        border border-primary/10 hover:border-primary/30
        transition-all duration-500 cursor-pointer overflow-hidden
        transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }
        hover:scale-105 hover:-translate-y-2`}
      style={{
        transitionDelay: `${index * 50}ms`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #6366F1 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
          className="w-full h-full"
        ></div>
      </div>
      {/* Floating Decorative Elements */}
      <div
        className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full 
           animate-float opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <div
        className="absolute bottom-4 sm:bottom-6 left-3 sm:left-4 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br from-secondary/10 to-primary/20 rounded-full 
           animate-float delay-300 opacity-40 group-hover:opacity-80 transition-opacity duration-300"
      ></div>{" "}
      {/* Card Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center h-48 sm:h-56">
        {/* Icon */}
        <div className="relative mb-4 sm:mb-6">
          <div
            className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 
            rounded-2xl sm:rounded-3xl flex items-center justify-center
            group-hover:from-primary/20 group-hover:via-secondary/10 group-hover:to-secondary/20 
            transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
            shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-8 sm:w-12 h-8 sm:h-12"
            />
          </div>
          {/* Glow effect */}
          <div
            className="absolute inset-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl 
            blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          ></div>
        </div>

        {/* Course Title */}
        <h3
          className="text-text font-bold text-lg sm:text-xl md:text-2xl text-center mb-3 sm:mb-4
          group-hover:text-primary transition-colors duration-300 group-hover:scale-105 transform"
        >
          {course.title}
        </h3>

        {/* Level Badge */}
        <span
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary/10 to-secondary/10 
          text-primary text-xs sm:text-sm font-semibold rounded-full
          group-hover:from-primary/20 group-hover:to-secondary/20 
          group-hover:text-secondary group-hover:scale-105
          transition-all duration-300 border border-primary/20
          group-hover:border-cyan/30 group-hover:shadow-lg"
        >
          Level: {course.level}
        </span>
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const courses = [
    { id: 1, title: "Junior", level: "Beginner", image: Junior },
    { id: 2, title: "Explorer", level: "Intermediate", image: Explorer },
    { id: 3, title: "Master", level: "Advanced", image: Master },
  ];

  return (
    <div className="w-full section-padding bg-gradient-to-br from-light-bg to-white relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full animate-float delay-300 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full animate-float delay-500 blur-lg"></div>
      </div>

      <div className="relative z-10 w-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
            border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-8 animate-slideDown"
          >
            <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
            <span>Explore Our Courses</span>
          </div>

          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fadeIn">
            <span className="text-black font-Dan sans bg-black bg-clip-text text-transparent">
              Tinkrion
            </span>
          </h2>

          <p className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Choose your{" "}
            <span className="text-primary-blue font-semibold">
              learning path
            </span>{" "}
            and embark on an exciting journey of discovery and innovation.
          </p>
        </div>

        {/* Static 3-Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Call to Action
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 
            text-primary-blue px-6 py-3 rounded-full text-sm font-medium
            border border-primary-blue/20 hover:border-cyan/30 
            transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Start your STEM journey today</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
