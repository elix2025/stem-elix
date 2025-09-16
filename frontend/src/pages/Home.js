import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

import { useAPI } from "../context/api";
import Hero from "../components/Hero";
import TinkrionShowcase from "../components/coursecard";
import NeuroShowcase from "../components/NeuroShowcase";
import ShowCaseProjects from "../components/ShowCaseProjects";
import LandingSection from "../components/labs";
import AnimatedSection from "../components/abotsec";

// Simplified animation variants for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Simplified chip animation
const chipAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Memoized Animated Section Wrapper
const AnimatedSectionWrapper = React.memo(({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50px 0px",
    once: true,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
});

const Home = () => {
  const { currentUser } = useAPI();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef(null);
  
  // Optimize scroll tracking with throttling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Memoize transform values to prevent recalculation
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
      
      /* Smooth transitions for all elements */
      * {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
      window.scrollTimeout = setTimeout(handleScroll, 50); // Reduced timeout for smoother response
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', throttledScroll, { 
      passive: true,
      capture: false 
    });

    // Smooth wheel event handling for better mouse wheel experience
    const handleWheel = (e) => {
      // Allow default behavior but ensure smooth scrolling
      if (!e.ctrlKey && !e.shiftKey) {
        // Optional: Add custom smooth scrolling logic here if needed
        // For now, rely on CSS scroll-behavior: smooth
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('wheel', handleWheel);
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
      className="home-page bg-[#f9f8f5] overflow-hidden smooth-scroll"
      style={{
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain'
      }}
    >
      {/* HERO with optimized parallax */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10"
      >
        <Hero handleEnrollNow={handleEnrollNow} />
      </motion.div>

      {/* FEATURES with optimized animation */}
      <div className="hidden lg:block">
      <AnimatedSectionWrapper className="relative bg-[#f9f8f5]" delay={0.1}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {featuresData.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={i}
                variants={chipAnimation}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl
                           bg-none backdrop-blur-sm border border-gray/20 text-black
                           hover:border-[#ac6cf4] hover:bg-[#ac6cf4]/10 
                           transition-all duration-300 cursor-pointer shadow-sm
                           hover:shadow-md hover:-translate-y-1 transform"
              >
                <Icon className={`w-6 h-6 ${color} transition-transform duration-200 group-hover:scale-110`} />
                <span className="text-base font-semibold transition-colors duration-200">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSectionWrapper>
      </div>

      {/* Simplified section components with enhanced scroll snap */}
      <AnimatedSectionWrapper delay={0.1} className="bg-[#f9f8f5] scroll-mt-16">
        <TinkrionShowcase />
      </AnimatedSectionWrapper>

      <AnimatedSectionWrapper delay={0.1} className="bg-white scroll-mt-16">
        <AnimatedSection />
      </AnimatedSectionWrapper>

      <AnimatedSectionWrapper delay={0.1} className="bg-gradient-to-br from-primary-blue/5 to-cyan/5 scroll-mt-16">
        <LandingSection />
      </AnimatedSectionWrapper>

      <AnimatedSectionWrapper className="relative bg-[#f9f8f5] scroll-mt-16" delay={0.1}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <NeuroShowcase />
          </motion.div>
        </div>
      </AnimatedSectionWrapper>

      <AnimatedSectionWrapper className="bg-gradient-to-br from-light-bg to-white scroll-mt-16" delay={0.1}>
        <ShowCaseProjects />
      </AnimatedSectionWrapper>

      {/* Enhanced scroll to top button with smooth animation */}
      {showScrollTop && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-blue to-blue-700 
                       shadow-xl flex items-center justify-center cursor-pointer
                       backdrop-blur-sm border border-white/20"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)",
              rotate: -5 
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.svg
              className="w-6 h-6 text-white transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7-7m0 0l-7 7m7-7v18"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced floating action button */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      >
        <motion.button
          onClick={() => smoothNavigate("/courses")}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan to-cyan/80 
                     text-white font-semibold rounded-2xl shadow-xl transition-all duration-300
                     backdrop-blur-sm border border-white/20"
          whileHover={{ 
            scale: 1.05,
            x: 10,
            boxShadow: "0 15px 30px rgba(6, 182, 212, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </motion.svg>
          <span>Explore Courses</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;