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
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;

    if (!card || !cardInner) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(cardInner, {
            rotateY: 180,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.2,
            onComplete: () => {
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
    }, { threshold: 0.5 });

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

    observer.observe(card);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.unobserve(card);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [index]);

  const handleClick = () => {
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
      className={`group relative h-[300px] sm:h-[350px] perspective-1000 bg-white 
        rounded-2xl shadow-lg hover:shadow-2xl 
        border border-primary-blue/10 hover:border-primary-blue/30
        transition-all duration-500 cursor-pointer overflow-hidden
        hover:scale-105 hover:-translate-y-2 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div
        ref={cardInnerRef}
        className="relative w-full h-full transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-white rounded-2xl border border-primary-blue/10 p-6 sm:p-8 flex flex-col items-center justify-center">
            <div className="relative mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-blue/10 via-cyan/5 to-primary-blue/10 
                rounded-3xl flex items-center justify-center transition-all duration-500">
                <img src={course.image} alt={course.title} className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <h3 className="text-charcoal font-bold text-lg sm:text-xl md:text-2xl text-center mb-3 sm:mb-4">
              {course.title}
            </h3>

            <span className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 
              text-primary-blue text-xs sm:text-sm font-semibold rounded-full">
              Level: {course.level}
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-blue to-cyan rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center">
            <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center mb-3 sm:mb-4">
              {course.title} Course
            </h3>
            <p className="text-white/90 text-center text-sm sm:text-base mb-4 sm:mb-6 px-2">
              Click to explore the {course.title} curriculum and start your learning journey!
            </p>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-primary-blue rounded-full font-semibold 
              hover:bg-opacity-90 transition-all duration-300 text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
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
    <section className="relative w-full bg-[#f9f8f5] section-padding overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full animate-float delay-300 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full animate-float delay-500 blur-lg"></div>
        
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
            border border-primary-blue/20 text-primary-blue px-4 py-2 sm:px-6 sm:py-3 rounded-full 
            text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-slideDown">
            <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
            <span>Explore Our Courses</span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeIn">
              <img
                src={Star}
                alt="Robot Icon"
                className="inline-block ml-1 mr-2 sm:ml-2 sm:mr-4 w-8 h-8 sm:w-12 sm:h-12 -mt-1 sm:-mt-2"
              />
              <span className="text-[#6366F1] font-Dan sans bg-clip-text">
                Tinkrion
              </span>
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-charcoal/80 text-base sm:text-lg md:text-xl px-2 max-w-3xl mx-auto leading-relaxed animate-slideUp">
               By Stemelix Introduces students to the exciting world of Robotics, Coding and Electronics.
              </h4>

              <p className="text-charcoal/80 text-base sm:text-lg md:text-xl px-2 max-w-3xl mx-auto leading-relaxed animate-slideUp">
                Choose your{" "}
                <span className="text-primary-blue font-semibold">learning path</span>{" "}-Junior, Explorer, or Master-
                and embark on an exciting journey of problem-solving and future powered by curiosity.
              </p>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}