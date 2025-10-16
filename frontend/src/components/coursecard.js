import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.jpg";
import Master from "../assets/mastercourse.png";
import Junior from "../assets/juniorcourse.png";
import Aero from "../assets/aerocourse.jpg";

import gsap from "gsap";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // staggered animation
    return () => clearTimeout(timer);
  }, [index]);

  // Commented out card flipping animations
  /*useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Card flip animation when scrolled into view
          gsap.to(cardInner, {
            rotateY: 180,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.2, // Staggered delay
            onComplete: () => {
              // Flip back after 1.5 seconds
              gsap.to(cardInner, {
                rotateY: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 1.5
              });
            }
          });
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the card is visible
    });

    // Start observing the card
    if (card) {
      observer.observe(card);
    }

    const handleMouseEnter = () => {
      gsap.to(cardInner, {
        rotateY: 180,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardInner, {
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    if (card) {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        observer.unobserve(card);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);*/

  

  const handleClick = () => {
    // Get the category from the course title
    let category = "All";
    if (course.title.toLowerCase().includes('junior')) {
      category = "Junior";
    } else if (course.title.toLowerCase().includes('explorer')) {
      category = "Explorer";
    } else if (course.title.toLowerCase().includes('master')) {
      category = "Master";
    }
    // Navigate to courses page with category in state
    navigate('/courses', { state: { selectedCategory: category } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  // Get background color based on course type
  const getCardBackground = () => {
    if (course.title.toLowerCase().includes('junior')) {
      return 'bg-[#E8F2F2] hover:bg-[#DCE9E9]'; // Light teal
    } else if (course.title.toLowerCase().includes('explorer')) {
      return 'bg-[#F2ECE8] hover:bg-[#E9E1DC]'; // Warm sand
    } else if (course.title.toLowerCase().includes('master')) {
      return 'bg-[#E8EDF2] hover:bg-[#DCE3E9]'; // Cool blue
    } else if (course.title.toLowerCase().includes('aero')) {
      return 'bg-[#F2E8EC] hover:bg-[#E9DCE1]'; // Soft rose
    }
    return 'bg-[var(--color-background)]';
  };

  // Get icon based on course type
  const getCourseIcon = () => {
    if (course.title.toLowerCase().includes('junior')) {
      return (
        <svg className="w-12 h-12 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    } else if (course.title.toLowerCase().includes('explorer')) {
      return (
        <svg className="w-12 h-12 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    } else if (course.title.toLowerCase().includes('master')) {
      return (
        <svg className="w-12 h-12 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-12 h-12 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`group relative h-80 w-72 flex-shrink-0
        ${getCardBackground()} rounded-2xl overflow-hidden
        transition-all duration-500 cursor-pointer
        transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }
        hover:scale-105 hover:shadow-lg border border-gray-200`}
      style={{
        transitionDelay: `${index * 50}ms`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="mb-4">
          {getCourseIcon()}
        </div>

        {/* Title */}
        <h3 className="font-headlines text-xl font-semibold text-gray-800 mb-2">
          {course.title.replace('Tinkrion ', '')}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-4">
          {course.grade}
        </p>

      

        {/* Button */}
        <button className="inline-flex items-center px-6 py-2.5 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-white rounded-lg font-medium text-sm
          transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group">
          <span>Learn More</span>
          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const scrollRef = useRef(null);
  
  const courses = [
    { id: 1, title: "Tinkrion Junior", grade: "For Grades 2 to 4", image: Junior, path: 'coursejunior' },
    { id: 2, title: "Tinkrion Explorer", grade: "For Grades 5 to 8", image: Explorer, path: 'courseexplorer' },
    { id: 3, title: "Tinkrion Master", grade: "For Grades 9 to 12", image: Master, path: 'coursemaster' },
    { id: 4, title: "Tinkrion Aero", grade: "For All Grades", image: Aero, path: 'courseaero' }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full section-padding bg-[var(--color-background)] relative overflow-hidden">
      {/* Scroll Container Styles */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
          }
        `}
      </style>

      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full animate-float delay-300 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full animate-float delay-500 blur-lg"></div>
      </div>

      <div className="relative z-10 w-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-left mb-12">
            <h4 className="text-[var(--color-button)] font-medium mb-2">
              Our Courses
            </h4>
            <h3 className="headline-1 mb-6">Tinkrion</h3>
            <p className="body-text text-xl max-w-3xl">
              Tinkrion courses, thoughtfully designed by STEMelix for students from Grades 2 to 12. 
              Introduces to the Exciting world of Robotics, Coding And Electronics with Fun and real time activities.
            </p>
          </div>

          {/* Benefits Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Benefit 1 */}
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-button)] transition-all">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-button)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-headlines font-semibold mb-1">Small Classroom Sizes</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Personalized attention for every student</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-button)] transition-all">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-button)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-headlines font-semibold mb-1">Real Tech Tools</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Hands-on learning with industry tools</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-button)] transition-all">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-button)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-button)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-headlines font-semibold mb-1">Certification</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Earn a certificate upon completion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <a href="/courses" className="text-[var(--color-button)] hover:text-[var(--color-button-hover)] font-semibold hover:underline transition-colors flex items-center gap-2">
            Explore Our Courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
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
