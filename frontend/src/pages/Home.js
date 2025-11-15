import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../context/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TinkrionShowcase from "../components/coursecard";
import ShowCaseProjects from "../components/ShowCaseProjects";
import NeuroShowcase from "../components/NeuroShowcase";
import AnimatedSection from "../components/abotsec";
import ChooseUs from "../components/chooseus";

const Home = () => {
  const { currentUser } = useAPI();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

  // Enhanced how it works data
  const howItWorksData = useMemo(() => [
    {
      step: "1",
      title: "Choose Your Course",
      description: "Select from our range of age-appropriate STEM programs",
      icon: "📚"
    },
    {
      step: "2",
      title: "Join Live Sessions",
      description: "Attend interactive classes in English or Hindi",
      icon: "💻"
    },
    {
      step: "3",
      title: "Build Projects",
      description: "Create hands-on projects with real-world applications",
      icon: "🔧"
    },
    {
      step: "4",
      title: "Showcase & Share",
      description: "Present your creations and earn certifications",
      icon: "🏆"
    }
  ], []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 400);
  }, []);

  // Smooth scroll implementation
  useEffect(() => {
    const smoothScrollStyles = `
      html {
        scroll-behavior: smooth;
      }
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      ::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 4px;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = smoothScrollStyles;
    document.head.appendChild(styleElement);

    const throttledScroll = () => {
      if (window.scrollTimeout) clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      styleElement.remove();
      if (window.scrollTimeout) clearTimeout(window.scrollTimeout);
    };
  }, [handleScroll]);

  const handleEnrollNow = useCallback(() => {
    if (currentUser) navigate("/courses");
    else navigate("/login");
  }, [currentUser, navigate]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="home-page bg-white overflow-hidden"
    >
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10">
        <Hero handleEnrollNow={handleEnrollNow} />
      </div>


      {/* Main Content Container */}
      <div className="w-full">
        {/* Tinkrion Courses */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TinkrionShowcase />
          </div>
        </section>

        {/* Project Showcase */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NeuroShowcase />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How It <span className="text-[#ac6cf4]">Works</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple steps to start your child's STEM journey with STEMelix
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksData.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ac6cf4] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChooseUs />
          </div>
        </section>

        {/* Student Projects Showcase */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShowCaseProjects />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#ac6cf4] to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Start Your Child's STEM Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of parents preparing their children for the future with practical STEM skills
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/courses')}
                className="bg-white text-[#ac6cf4] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Courses
              </button>
              
              <button 
                onClick={() => navigate('/contact')}
                className="border-2 border-white text-white hover:bg-white hover:text-[#ac6cf4] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-[#f9f8f5] text-black rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;