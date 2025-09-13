import React, { useRef, useEffect, useState } from "react";
import FloatingDroneBot from "./RobotHead";
import robotImage from "../assets/Robotrep.png";

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
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
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
      } min-h-screen isolation-auto pb-0 my-0`}
    >
      {/* NOTE: Background now comes from <GlobalBackground /> mounted at the page root */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left copy */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
              <span>Next-Gen STEM Education</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl text-black lg:text-7xl font-Dan Sans min-h-[2.5em] lg:min-h-[2em]">
                <span className="block relative">
                  {displayedText}
                  {currentIndex < fullText.length && (
                    <span className="inline-block w-1 h-16 lg:h-20 bg-[#ac6cf4] ml-2 animate-pulse"></span>
                  )}
                </span>
              </h1>
              
              <div className={`transition-all duration-700 transform ${
                showSubtext 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-xl lg:text-2xl text-black max-w-2xl leading-relaxed">
                  Empower your future with cutting-edge STEM education. Join thousands of students exploring robotics, neuroscience, and innovative technology.
                </p>
              </div>
            </div>

            <div className={`flex flex-wrap gap-4 transition-all duration-700 transform ${
              showButtons 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <button
                onClick={handleEnrollNow}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#ac6cf4] to-[#9c5ce8] text-white font-semibold rounded-2xl shadow-2xl hover:shadow-[#ac6cf4]/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#9c5ce8] to-[#8b4fd6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Learning</span>
                <svg
                  className="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </button>

              <button 
                onClick={handleWatchDemo}
                className="group relative inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-[#ac6cf4]/50 text-white font-semibold rounded-2xl bg-black/20 hover:bg-[#ac6cf4]/20 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ac6cf4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="relative z-10 mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Watch Demo</span>
                <div className="absolute inset-0 rounded-2xl border border-white/10 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
              </button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex justify-center items-center w-full">
            <div className="relative z-20">
              <img 
                src={robotImage} 
                alt="Robot" 
                className="hover:scale-105 transition-transform duration-700"
              />
              {/* <FloatingDroneBot /> */}
            </div>
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ac6cf4]/20 via-blue-500/10 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;