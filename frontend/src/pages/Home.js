import React, { useRef, useEffect, useState } from "react";
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

// Animation variants for reusability
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75], // Custom easing for premium feel
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const chipAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Animated Section Wrapper Component
const AnimatedSectionWrapper = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px 0px -100px 0px", // Start animation slightly before element is fully visible
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1.5,
            delay: delay,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const { currentUser } = useAPI();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hero parallax effect
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth scroll setup
  useEffect(() => {
    // Add smooth scrolling CSS if not already present
    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar for premium feel */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #2563EB;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #1d4ed8;
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  const handleEnrollNow = () => {
    if (currentUser) navigate("/courses");
    else navigate("/login");
  };

  return (
    <div
      ref={containerRef}
      className="home-page bg-light-bg text-charcoal overflow-hidden custom-scrollbar"
    >
      {/* HERO with parallax */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="relative z-10"
      >
        <Hero handleEnrollNow={handleEnrollNow} />
      </motion.div>

      {/* FEATURES with staggered animation */}
      <AnimatedSectionWrapper className="relative bg-gradient-to-br from-light-bg to-white" delay={0.2}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
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
            ].map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={i}
                variants={chipAnimation}
                whileHover="hover"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl
                           bg-none backdrop-blur-sm border border-gray/20 text-black px-4 py-2 rounded-full
                           hover:border-[#ac6cf4] hover:bg-[#ac6cf4]/10 transition-colors duration-300
                           cursor-pointer shadow-sm hover:shadow-md"
              >
                <Icon className={`w-6 h-6 ${color}`} />
                <span className="text-base font-semibold">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSectionWrapper>

      {/* TINKRION SHOWCASE */}
      <AnimatedSectionWrapper
        delay={0.1}
        className="bg-gradient-to-br from-light-bg to-white"
      >
        <TinkrionShowcase />
      </AnimatedSectionWrapper>

      {/* ANIMATED SECTION */}
      <AnimatedSectionWrapper delay={0.15} className="bg-white">
        <AnimatedSection />
      </AnimatedSectionWrapper>

      {/* LANDING SECTION */}
      <AnimatedSectionWrapper
        delay={0}
        className="bg-gradient-to-br from-primary-blue/5 to-cyan/5"
      >
        <LandingSection />
      </AnimatedSectionWrapper>

      {/* NEURO SHOWCASE with enhanced animation */}
      <AnimatedSectionWrapper className="relative bg-white" delay={0.2}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 0.75],
              },
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <NeuroShowcase />
          </motion.div>
        </div>
      </AnimatedSectionWrapper>

      {/* SHOWCASE PROJECTS */}
      <AnimatedSectionWrapper
        className="transition-all duration-10 bg-gradient-to-br from-light-bg to-white"
        delay={0}
      >
        <ShowCaseProjects />
      </AnimatedSectionWrapper>

      {/* Enhanced scroll to top button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-blue to-blue-700 shadow-xl shadow-primary-blue/25 flex items-center justify-center cursor-pointer"
          whileHover={{
            scale: 1.1,
            shadow: "0 20px 40px rgba(37, 99, 235, 0.3)",
            rotate: -5,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
        </motion.div>
      </motion.div>

      {/* Floating action button for courses */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 hidden lg:block"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan to-cyan/80 text-white font-semibold rounded-2xl shadow-xl shadow-cyan/25 hover:shadow-cyan/40 transition-all duration-300"
          whileHover={{
            scale: 1.05,
            x: 10,
          }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
