import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

import { useAPI } from "../context/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TinkrionShowcase from "../components/coursecard";
import NeuroShowcase from "../components/NeuroShowcase";
import ShowCaseProjects from "../components/ShowCaseProjects";

import AnimatedSection from "../components/abotsec";
import ChooseUs from "../components/chooseus";

const Home = () => {
  const { currentUser } = useAPI();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef(null);

  // Memoized features data
  const featuresData = useMemo(() => [
    {
      icon: AiOutlineFundProjectionScreen,
      label: "Interactive Learning",
      color: "text-primary-blue",
    },
    {
      icon: GrUserExpert,
      label: "Expert Instructors",
      color: "text-cyan",
    },
    {
      icon: LiaProjectDiagramSolid,
      label: "Hands-on Projects",
      color: "text-primary-blue",
    },
    {
      icon: MdOutlineSupportAgent,
      label: "24/7 Support",
      color: "text-cyan",
    },
  ], []);

  // Throttled scroll handler for scroll-to-top button
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 400);
  }, []);

  // Smooth scroll implementation
  useEffect(() => {
    // Enhanced smooth scrolling styles
    const smoothScrollStyles = `
      /* Enhanced smooth scrolling */
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 2rem;
      }
      
      /* For webkit browsers - enhanced momentum scrolling */
      * {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar with smooth feel */
      ::-webkit-scrollbar {
        width: 12px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(249, 248, 245, 0.3);
        border-radius: 6px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #2563EB, #06B6D4);
        border-radius: 6px;
        border: 2px solid rgba(249, 248, 245, 0.3);
        transition: all 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #1d4ed8, #0891b2);
        border-color: rgba(249, 248, 245, 0.5);
        transform: scale(1.1);
      }
      
      /* Enhanced body scrolling */
      body {
        overflow-x: hidden;
        scroll-behavior: smooth;
      }
      
      /* Momentum scrolling for touch devices */
      .smooth-scroll {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      /* Custom easing for scroll animations */
      .scroll-smooth {
        scroll-behavior: smooth;
        scroll-snap-type: y proximity;
      }
      
      /* Section snap points for smooth navigation */
      section {
        scroll-snap-align: start;
        scroll-snap-stop: normal;
      }
    `;

    // Create and inject styles
    const styleElement = document.createElement('style');
    styleElement.textContent = smoothScrollStyles;
    styleElement.setAttribute('data-smooth-scroll', 'true');
    document.head.appendChild(styleElement);

    // Add smooth scroll class to body
    document.body.classList.add('smooth-scroll', 'scroll-smooth');

    // Enhanced throttled scroll handler
    const throttledScroll = () => {
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      window.scrollTimeout = setTimeout(handleScroll, 50);
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', throttledScroll, { 
      passive: true,
      capture: false 
    });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      document.body.classList.remove('smooth-scroll', 'scroll-smooth');
      
      // Clean up styles
      const existingStyles = document.querySelector('style[data-smooth-scroll]');
      if (existingStyles) {
        existingStyles.remove();
      }
      
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, [handleScroll]);

  const handleEnrollNow = useCallback(() => {
    if (currentUser) navigate("/courses");
    else navigate("/login");
  }, [currentUser, navigate]);

  // Enhanced smooth scroll to top function
  const scrollToTop = useCallback(() => {
    // Use both methods for maximum compatibility
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth",
        block: "start" 
      });
    } else {
      // Fallback for older browsers with custom smooth animation
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollAnimation = () => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
          requestAnimationFrame(scrollAnimation);
        }
      };
      requestAnimationFrame(scrollAnimation);
    }
  }, []);

  // Smooth navigation helper
  const smoothNavigate = useCallback((path) => {
    // Add a small delay to ensure smooth transition
    requestAnimationFrame(() => {
      navigate(path);
    });
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="home-page bg-[var(--color-background)] overflow-hidden smooth-scroll"
      style={{
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain'
      }}
    >
     
      <Navbar />

      {/* HERO - No animations */}
      <div className="relative z-10">
        <Hero handleEnrollNow={handleEnrollNow} />
      </div>

      {/* FEATURES - No animations */}
      {/* <div className="hidden lg:block">
        <div className="relative bg-[#f9f8f5]">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="flex flex-wrap gap-4 justify-center">
              {featuresData.map(({ icon: Icon, label, color }, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl
                             bg-none backdrop-blur-sm border border-gray/20 text-black
                             hover:border-[#ac6cf4] hover:bg-[#ac6cf4]/10 
                             transition-all duration-300 cursor-pointer shadow-sm
                             hover:shadow-md hover:-translate-y-1 transform"
                >
                  <Icon className={`w-6 h-6 ${color} transition-transform duration-200 group-hover:scale-110`} />
                  <span className="text-base font-semibold transition-colors duration-200">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Sections without animations */}
      {/* Main card container for all content except Hero */}
      <div className="w-full px-0 py-12">
        <div className="bg-[var(--color-background)] shadow-2xl overflow-hidden">
          {/* Content sections inside the main card */}
          <div>
            <div className="p-6">
              <TinkrionShowcase />
            </div>
            <NeuroShowcase />

            {/* Call to Action Section */}
            <section className="relative overflow-hidden bg-[var(--color-background)] py-16 sm:py-20">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--color-button)]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[var(--color-button)]/5 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h4 className="text-[var(--color-button)] font-medium mb-2">
                    Start Learning
                  </h4>
                  <h2 className="headline-1 mb-4">
                    Ready to Start Your Child's
                    <span className="text-[var(--color-button)]"> STEM Journey?</span>
                  </h2>
                  <p className="body-text text-lg sm:text-xl mb-10">
                    Discover our carefully curated STEM kits delivered to your doorstep and book a free demo session with our experts.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <button 
                      onClick={() => navigate('/kits')}
                      className="btn-primary w-full sm:w-auto px-8 py-4 font-semibold
                               shadow-lg shadow-[var(--color-button)]/25 transition-all duration-300 hover:scale-105"
                    >
                      Explore Our STEM Kits
                    </button>
                    
                    <button 
                      onClick={() => navigate('/contact')}
                      className="btn-secondary w-full sm:w-auto px-8 py-4 font-semibold
                               shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Book a Free Demo
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div>
              <AnimatedSection />
            </div>
            <ChooseUs />
                    <section id="how" className="py-16 bg-[#F5F7FA]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h3 className="text-2xl font-poppins font-semibold text-center">How It Works</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mx-auto">1</div>
                <h4 className="mt-3 font-semibold">Choose Course</h4>
                <p className="text-sm text-gray-600 mt-2">Pick the right program for your child.</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mx-auto">2</div>
                <h4 className="mt-3 font-semibold">Join Live Classes</h4>
                <p className="text-sm text-gray-600 mt-2">Attend interactive Zoom sessions.</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mx-auto">3</div>
                <h4 className="mt-3 font-semibold">Build Projects</h4>
                <p className="text-sm text-gray-600 mt-2">Hands-on assignments & mentorship.</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mx-auto">4</div>
                <h4 className="mt-3 font-semibold">Showcase & Certify</h4>
                <p className="text-sm text-gray-600 mt-2">Showcase work & receive certificates.</p>
              </div>
            </div>
          </div>
        </section>
            <ShowCaseProjects />
          </div>
        </div>
      </div>

      {/* Scroll to top button - Simple version */}
      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <div
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-blue to-blue-700 
                       shadow-xl flex items-center justify-center cursor-pointer
                       backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform duration-300"
            onClick={scrollToTop}
          >
            <svg
              className="w-6 h-6 text-white transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7-7m0 0l-7 7m7-7v18"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Floating action button - Simple version */}
      {/* <div className="fixed bottom-8 left-8 z-50 hidden lg:block">
        <button
          onClick={() => smoothNavigate("/courses")}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan to-cyan/80 
                     text-white font-semibold rounded-2xl shadow-xl transition-all duration-300
                     backdrop-blur-sm border border-white/20 hover:scale-105"
        >
          <svg 
            className="w-5 h-5" 
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
          </svg>
          <span>Explore Courses</span>
        </button>
      </div> */}
    </div>
  );
}

export default Home;