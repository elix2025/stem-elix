import React, { useRef, useEffect, useState } from "react";
import FloatingDroneBot from "./RobotHead";
import NeuroShowcase from "./NeuroShowcase";

const Hero = ({ handleEnrollNow }) => {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true); // Start as visible to prevent flash

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      {
        threshold: 0.1, // Lower threshold for better performance
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before fully visible
      }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section with Modern Design */}
      <section
        ref={heroRef}
        className={`hero-section relative overflow-hidden transition-opacity duration-300 ${
          heroVisible ? "opacity-100" : "opacity-90"
        } min-h-screen isolation-auto`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-teal-600/20"></div>
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>🚀 Next-Gen STEM Education</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block">Let's Start Your</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-teal-400 to-emerald-400">
                    STEM Journey
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl leading-relaxed">
                  Empower your future with cutting-edge STEM education. Join
                  thousands of students exploring robotics, neuroscience, and
                  innovative technology.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleEnrollNow}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-600 to-teal-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-teal-500/25 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Start Learning</span>
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Watch Demo
                </button>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Interactive Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Expert Instructors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300">Hands-on Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-slate-300">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Robot */}
            <div className="relative flex justify-center items-center w-full">
              <div className="relative z-20">
                <FloatingDroneBot />
              </div>
              {/* Glow effects around robot */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
