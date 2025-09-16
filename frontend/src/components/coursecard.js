import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.png";
import Master from "../assets/Master.png";
import Junior from "../assets/junior.png";
import {createSlug} from '../utils/slugutils.js'

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
    // Direct routing based on course title
    switch (course.title.toLowerCase()) {
      case 'junior':
        navigate('/coursejunior');
        break;
      case 'explorer':
        navigate('/coursexplorer');
        break;
      case 'master':
        navigate('/coursemaster');
        break;
      default:
        navigate('/courses');
    }
  };

    const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
        border border-primary-blue/10 hover:border-primary-blue/30
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
          className="w-full h-full"
        ></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-blue/10 to-cyan/20 rounded-full 
        group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-pulse"></div>
      <div className="absolute bottom-6 left-4 w-6 h-6 bg-gradient-to-br from-cyan/10 to-primary-blue/20 rounded-full 
        group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 animate-pulse delay-200"></div>

      {/* Card Content */}
      <div className="relative z-10 p-8 flex flex-col items-center justify-center h-56">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-blue/10 via-cyan/5 to-primary-blue/10 
            rounded-3xl flex items-center justify-center
            group-hover:from-primary-blue/20 group-hover:via-cyan/10 group-hover:to-cyan/20 
            transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
            shadow-lg group-hover:shadow-xl group-hover:shadow-primary-blue/20">
              <img src={course.image} alt={course.title} className="w-12 h-12" />
            {/* <svg
              className="w-10 h-10 text-primary-blue group-hover:text-cyan transition-all duration-500 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg> */}
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary-blue/20 to-cyan/20 rounded-3xl 
            blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        </div>

        {/* Course Title */}
        <h3 className="text-charcoal font-bold text-xl md:text-2xl text-center mb-4
          group-hover:text-primary-blue transition-colors duration-300 group-hover:scale-105 transform">
          {course.title}
        </h3>

        {/* Level Badge */}
        <span className="px-4 py-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 
          text-primary-blue text-sm font-semibold rounded-full
          group-hover:from-primary-blue/20 group-hover:to-cyan/20 
          group-hover:text-cyan group-hover:scale-105
          transition-all duration-300 border border-primary-blue/20
          group-hover:border-cyan/30 group-hover:shadow-lg">
          Level: {course.level}
        </span>

        
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const courses = [
    { id: 1, title: "Junior", level: "Beginner"  , image: Junior , path: 'coursejunior' },
    { id: 2, title: "Explorer", level: "Intermediate", image: Explorer , path: 'courseexplorer' },
    { id: 3, title: "Master", level: "Advanced", image: Master , path: 'coursemaster' },
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
          <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
            border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-8 animate-slideDown">
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
            <span className="text-primary-blue font-semibold">learning path</span>{" "}
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