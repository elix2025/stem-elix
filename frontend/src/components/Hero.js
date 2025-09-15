import React, { useRef, useEffect, useState } from "react";
import robotImage from "../assets/3974104.png";

const Hero = ({ handleEnrollNow }) => {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const fullText = "Let's Start Your STEM Journey";
  const typingSpeed = 85; // milliseconds per character

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (heroVisible && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (currentIndex >= fullText.length && !showSubtext) {
      // Show subtext after typing completes
      const timer = setTimeout(() => {
        setShowSubtext(true);
        // Show buttons after subtext appears
        setTimeout(() => setShowButtons(true), 600);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [heroVisible, currentIndex, fullText.length, showSubtext]);

  const handleWatchDemo = () => {
    // Add your demo functionality here
    console.log("Watch Demo clicked");
  };

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden transition-opacity duration-300 ${
        heroVisible ? "opacity-100" : "opacity-90"
      } min-h-screen bg-[#f9f8f5] isolation-auto pb-0 my-0`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-blue/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan/10 rounded-full animate-float delay-200"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-blue/20 rounded-full animate-float delay-400"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-cyan/15 rounded-full animate-float delay-300"></div>

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 glass bg-white/20 backdrop-blur-sm border border-primary-blue/20 text-primary-blue px-4 py-2 rounded-full text-sm font-medium animate-slideDown">
              <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
              <span>Next-Gen STEM Education</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl text-charcoal lg:text-7xl font-bold min-h-[2.5em] lg:min-h-[2em] leading-tight">
                <span className="block relative">
                  <span className="text-gradient">{displayedText}</span>
                  {currentIndex < fullText.length && (
                    <span className="inline-block w-1 h-16 lg:h-20 bg-primary-blue ml-2 animate-pulse"></span>
                  )}
                </span>
              </h1>

              <div
                className={`transition-all duration-700 transform ${
                  showSubtext
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-xl lg:text-2xl text-charcoal/80 max-w-2xl leading-relaxed">
                  Dive into the world full of Coding , Robotics and Innovations.
                 
                  .
                </p>
              </div>
            </div>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 transform ${
                showButtons
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={handleEnrollNow}
                className="group relative inline-flex items-center px-8 py-4 bg-black  text-white font-semibold rounded-xl shadow-xl hover:shadow-primary-blue/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden focus-ring"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Learning</span>
                <svg
                  className="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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
                <div className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </button>

              <button
                onClick={handleWatchDemo}
                className="group relative inline-flex items-center px-8 py-4 border-2 border-primary-blue/30 hover:border-primary-blue text-charcoal hover:text-primary-blue font-semibold rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:scale-105 focus-ring"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg
                  className="relative z-10 mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300"
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
                <span className="relative z-10 transition-colors duration-300">
                  Watch Demo
                </span>
                <div className="absolute inset-0 rounded-xl border border-primary-blue/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
              </button>
            </div>

            {/* Feature badges */}
            <div
              className={`flex flex-wrap gap-3 pt-4 transition-all duration-700 delay-300 transform ${
                showButtons
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* {["Interactive Labs", "Expert Mentors", "24/7 Support"].map(
                (feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm border border-primary-blue/20 rounded-full px-4 py-2 animate-fadeIn"
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="w-2 h-2 bg-cyan rounded-full"></div>
                    <span className="text-sm font-medium text-charcoal">
                      {feature}
                    </span>
                  </div>
                )
              )} */}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex justify-center items-center w-full">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-cyan/5 to-primary-blue/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-transparent to-primary-blue/20 rounded-full blur-2xl animate-glow"></div>

            <div className="relative z-20">
              <div className="relative">
                <img
                  src={robotImage}
                  alt="Advanced STEM Robot"
                  className="hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl mask-fade-edges opacity-80"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  }}
                />
                {/* Gradient overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-br from-light-bg/30 via-transparent to-light-bg/50 rounded-full opacity-60"></div>
              </div>

              {/* Tech circles around robot */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-blue/20 rounded-full animate-bounce-slow"></div>
              <div className="absolute top-1/4 -right-6 w-6 h-6 bg-cyan/30 rounded-full animate-bounce-slow delay-200"></div>
              <div className="absolute -bottom-2 left-1/4 w-5 h-5 bg-primary-blue/25 rounded-full animate-bounce-slow delay-400"></div>
            </div>

            {/* Orbital elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-10 left-10 w-3 h-3 bg-primary-blue rounded-full opacity-60"></div>
              <div className="absolute bottom-10 right-10 w-2 h-2 bg-cyan rounded-full opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-primary-blue/5 to-cyan/5 transform skew-y-1"></div>
    </section>
  );
};

export default Hero;