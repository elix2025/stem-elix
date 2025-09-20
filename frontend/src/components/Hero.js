import React, { useRef, useEffect, useState } from "react";
import robotImage from "../assets/3974104.png";

const Hero = ({ handleEnrollNow }) => {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const fullText = "Turn Curiosity into Creation"; //From Ideas to Inventors
  const typingSpeed = 85; // milliseconds per character

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect - KEEPING THIS
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
      className="relative overflow-hidden min-h-screen bg-background pb-0 my-0"
    >
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 rounded-full"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-secondary/10 rounded-full"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-20 sm:right-40 w-20 sm:w-24 h-20 sm:h-24 bg-secondary/15 rounded-full"></div>

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-16 sm:py-20 lg:py-0">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 glass bg-white/20 backdrop-blur-sm border border-primary/20 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              
              <span>Advanced STEM Learning Platform</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text leading-tight">
                <span className="block relative">
                  <span className="text-primary">{displayedText}</span>
                  {currentIndex < fullText.length && (
                    <span className="inline-block w-1 h-12 sm:h-16 lg:h-20 bg-primary ml-2 animate-pulse"></span>
                  )}
                </span>
              </h1>

              <div className={`transition-opacity duration-700 ${
                  showSubtext ? "opacity-100" : "opacity-0"
                }`}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                 Stemelix where curiosity meets creation. Igniting innovation in young learners.
                </p>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-opacity duration-700 ${
                showButtons ? "opacity-100" : "opacity-0"
              }`}>
              <button
                onClick={handleEnrollNow}
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white font-semibold rounded-xl shadow-xl hover:shadow-primary/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary/30 hover:border-primary text-text hover:text-primary font-semibold rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                <div className="absolute inset-0 rounded-xl border border-primary/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
              </button>
            </div>

            {/* Feature badges */}
            <div className={`flex flex-wrap gap-3 pt-4 justify-center lg:justify-start transition-opacity duration-700 delay-300 lg:hidden ${
                showButtons ? "opacity-100" : "opacity-0"
              }`}>
              {["Interactive Labs", "Expert Mentors", "24/7 Support"].map(
                (feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm border border-primary/20 rounded-full px-3 sm:px-4 py-2"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-xs sm:text-sm font-medium text-text">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex justify-center items-center w-full order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Static background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 rounded-full blur-2xl"></div>

            <div className="relative z-20 w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative">
                <img
                  src={robotImage}
                  alt="Advanced STEM Robot"
                  className="w-full h-auto hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl opacity-80"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  }}
                />
                {/* Gradient overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/50 rounded-full opacity-60"></div>
              </div>

              {/* Static tech circles around robot */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 bg-primary/20 rounded-full"></div>
              <div className="absolute top-1/4 -right-3 sm:-right-6 w-4 sm:w-6 h-4 sm:h-6 bg-secondary/30 rounded-full"></div>
              <div className="absolute -bottom-1 sm:-bottom-2 left-1/4 w-4 sm:w-5 h-4 sm:h-5 bg-primary/25 rounded-full"></div>
            </div>

            {/* Static orbital elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full opacity-60"></div>
              <div className="absolute bottom-10 right-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-secondary rounded-full opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-10 sm:h-20 bg-gradient-to-r from-primary/5 to-secondary/5 transform skew-y-1"></div>
    </section>
  );
};

export default Hero;