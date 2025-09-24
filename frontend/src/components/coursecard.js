import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.png";
import Master from "../assets/Master.png";
import Junior from "../assets/junior.png";
import Star from "../assets/star.webp";
import gsap from "gsap";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // staggered animation
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
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
  }, []);

  

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
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`group relative h-[280px] perspective-1000 bg-[#f9f8f5] 
        rounded-xl shadow-lg hover:shadow-2xl 
        border border-gray-200 hover:border-[#fc8eac]/50
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
      <div
        ref={cardInnerRef}
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        style ={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden"
        style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#f9f8f5] via-white to-[#f9f8f5] rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
            {/* Original card content */}
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#fc8eac]/20 via-[#ecd0ec]/15 to-[#fc8eac]/20 
                rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <img src={course.image} alt={course.title} className="w-10 h-10" />
              </div>
            </div>

            <h3 className="text-gray-800 font-bold text-lg md:text-xl text-center mb-3">
              {course.title}
            </h3>

            <span className="px-4 py-2 bg-gradient-to-r from-[#fc8eac]/30 to-[#ecd0ec]/30 
              text-gray-700 text-sm font-semibold rounded-full border border-[#fc8eac]/20">
              Level: {course.level}
            </span>
          </div>
        </div>

                {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180"
        style={{ backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
         }}>
          <div className="w-full h-full bg-gradient-to-br from-[#fc8eac] via-[#ecd0ec] to-[#c6c2b6] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-black font-bold text-lg md:text-xl text-center mb-3">
              {course.title} Course
            </h3>
            <p className="text-black text-center mb-4 text-sm leading-relaxed">
              Click to explore the {course.title} curriculum and start your learning journey!
            </p>
            <button className="px-5 py-2 bg-white/90 text-black rounded-full font-semibold text-sm
              hover:bg-white transition-all duration-300 shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Gradient Background Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

      {/* Animated Background Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
          className="w-full h-full"
        ></div>
      </div> */}


      
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
    <div className="w-full section-padding bg-[#f9f8f5] relative overflow-hidden">
      {/* Static decorative boxes - same as NeuroShowcase */}
      <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-xl opacity-60 shadow-lg"></div>
      <div className="absolute bottom-16 left-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-60 shadow-md"></div>
      <div className="absolute bottom-20 right-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-50 shadow-md"></div>
      <div className="absolute top-10 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-[#fc8eac]/40 rounded-xl opacity-50 shadow-lg"></div>
      <div className="absolute top-[120px] left-20 w-14 h-10 sm:w-16 sm:h-12 bg-[#fc8eac]/50 rounded-xl opacity-60 shadow"></div>
      <div className="absolute top-40 right-12 w-12 h-10 sm:w-16 sm:h-12 bg-gray-300 rounded-xl opacity-60 shadow"></div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-10 sm:w-20 sm:h-14 bg-[#c6c2b6]/50 rounded-xl opacity-60 shadow"></div>

      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full animate-float delay-300 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full animate-float delay-500 blur-lg"></div>
      </div>

      <div className="relative z-10 w-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
            border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-8 animate-slideDown">
            <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
            <span>Explore Our Courses</span>
          </div> */}

          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fadeIn">
            <img
              src={Star}
              alt="Robot Icon"
              className="inline-block ml-2 mr-4 w-12 h-12 -mt-2"
              />
            <span className="text-black font-Dan sans bg-black bg-clip-text text-transparent">
              Tinkrion
            </span>
          </h2>
          <h4 className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-3xl mx-auto leading-relaxed animate-slideUp">
           By STEMelix Introduces students to the exciting world of Robotics, Coding and Electronics.
          </h4>

          <p className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Choose your{" "}
            <span className="text-primary-blue font-semibold">learning path</span>{" "}-Junior, Explorer, or Master-
            and embark on an exciting journey of problem-solving and future powered by curiosity.
          </p>
        </div>

        {/* Static 3-Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
