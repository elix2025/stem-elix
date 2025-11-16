import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.jpg";
import Master from "../assets/mastercourse.png";
import Junior from "../assets/juniorcourse.png";
import Aero from "../assets/aerocourse.jpg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BrainCircuit } from "lucide-react";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const handleClick = () => {
    let category = "All";
    if (course.title.toLowerCase().includes("junior")) {
      category = "Junior";
    } else if (course.title.toLowerCase().includes("explorer")) {
      category = "Explorer";
    } else if (course.title.toLowerCase().includes("master")) {
      category = "Master";
    }
    navigate("/courses", { state: { selectedCategory: category } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  const getCardStyle = () => {
    const styles = {
      junior: {
        bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
        hover: "hover:from-blue-100 hover:to-cyan-100",
        accent: "from-[#ac6cf4] to-cyan-500",
        icon: "text-[#ac6cf4]",
      },
      explorer: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        hover: "hover:from-green-100 hover:to-emerald-100",
        accent: "from-green-500 to-emerald-500",
        icon: "text-green-600",
      },
      master: {
        bg: "bg-gradient-to-br from-purple-50 to-violet-50",
        hover: "hover:from-purple-100 hover:to-violet-100",
        accent: "from-purple-500 to-violet-500",
        icon: "text-purple-600",
      },
      aero: {
        bg: "bg-gradient-to-br from-orange-50 to-red-50",
        hover: "hover:from-orange-100 hover:to-red-100",
        accent: "from-orange-500 to-red-500",
        icon: "text-orange-600",
      },
    };

    if (course.title.toLowerCase().includes("junior")) return styles.junior;
    if (course.title.toLowerCase().includes("explorer")) return styles.explorer;
    if (course.title.toLowerCase().includes("master")) return styles.master;
    if (course.title.toLowerCase().includes("aero")) return styles.aero;
    return styles.junior;
  };

  const cardStyle = getCardStyle();

  const getCourseIcon = () => {
    const iconClass = `w-14 h-14 ${
      cardStyle.icon
    } transition-transform duration-300 ${isHovered ? "scale-110" : "scale-90"}`;

    if (course.title.toLowerCase().includes("junior")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-2xl transform rotate-6"></div>
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      );
    } else if (course.title.toLowerCase().includes("explorer")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-2xl transform rotate-6"></div>
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </div>
      );
    } else if (course.title.toLowerCase().includes("master")) {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-purple-100 rounded-2xl transform rotate-6"></div>
          <BrainCircuit className={`w-14 h-14 ${cardStyle.icon} transition-transform duration-300 ${isHovered ? "scale-110" : "scale-90"}`} />
        </div>
      );
    } else {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-orange-100 rounded-2xl transform rotate-6"></div>
          <svg
            className={iconClass}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      className={`group relative h-96 w-80 flex-shrink-0
        ${cardStyle.bg} ${cardStyle.hover} rounded-3xl overflow-hidden
        transition-all duration-500 cursor-pointer border border-gray-100
        transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }
        hover:scale-105 hover:shadow-2xl shadow-lg`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cardStyle.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center text-center">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {getCourseIcon()}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
          {course.title.replace("Tinkrion ", "")}
        </h3>

        <p className="text-sm font-medium text-gray-600 mb-6 px-4">
          {course.grade}
        </p>

        <div className="space-y-2 mb-8">
          {course.features?.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-2 text-xs text-gray-500"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cardStyle.accent}`}
              ></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button
          className={`inline-flex items-center px-8 py-3 bg-gradient-to-r ${cardStyle.accent} text-white rounded-2xl font-semibold text-sm
          transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl group/btn`}
        >
          <span>Explore Course</span>
          <svg
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Tinkrion Junior",
      grade: "Grades 2-4 | Beginner Level",
      image: Junior,
      path: "coursejunior",
      features: [
        "Basic Robotics",
        "Simple Coding",
        "Creative Projects",
        "Fun Activities",
      ],
    },
    {
      id: 2,
      title: "Tinkrion Explorer",
      grade: "Grades 5-8 | Intermediate Level",
      image: Explorer,
      path: "courseexplorer",
      features: [
        "Advanced Robotics",
        "Game Development",
        "Electronics Basics",
        "Team Projects",
      ],
    },
    {
      id: 3,
      title: "Tinkrion Master",
      grade: "Grades 9-12 | Advanced Level",
      image: Master,
      path: "coursemaster",
      features: [
        "AI & Machine Learning",
        "Advanced Programming",
        "IoT Projects",
        "Industry Tools",
      ],
    },
    {
      id: 4,
      title: "Tinkrion Aero",
      grade: "All Grades | Specialized",
      image: Aero,
      path: "courseaero",
      features: [
        "Drone Technology",
        "Aerospace Concepts",
        "Flight Simulation",
        "Advanced Projects",
      ],
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-[#ac6cf4] font-medium text-sm mb-6">
            🚀 Tinkrion Learning Path
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6cf4] to-purple-600">
              STEM Skills
            </span>{" "}
            Step by Step
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Progressive learning paths designed for young innovators. From
            beginner basics to advanced projects, our Tinkrion courses grow with
            your child's curiosity and skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <FaChalkboardTeacher />,
              title: "Expert Mentors",
              description:
                "Learn from industry professionals and certified educators",
            },
            {
              icon: "🛠️",
              title: "Hands-on Projects",
              description:
                "Build real projects with professional tools and kits",
            },
            {
              icon: "📈",
              title: "Progress Tracking",
              description: "Monitor growth with detailed progress reports",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Choose Your Level
            </h3>
            <p className="text-gray-600">
              Select the perfect starting point for your journey
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide pb-8 pt-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Ready to Start Your STEM Journey?
              </h4>
              <p className="text-gray-600 text-sm">
                Book a free demo session with our experts
              </p>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book Free Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}