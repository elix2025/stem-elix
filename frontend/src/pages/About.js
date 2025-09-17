// AboutUsPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState({});

  const observeSection = (sectionId) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => ({
          ...prev,
          [sectionId]: entry.isIntersecting,
        }));
      },
      { threshold: 0.2 }
    );
    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  };

  useEffect(() => {
    const observers = [
      observeSection("hero"),
      observeSection("mission"),
      observeSection("founder"),
      observeSection("team"),
      observeSection("stats"),
    ];
    return () => observers.forEach((cleanup) => cleanup && cleanup());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="bg-gradient-to-br from-background to-blue-50/30 min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative overflow-hidden bg-gradient-to-br from-text via-text/95 to-primary transition-all duration-1000 ${
          isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center text-white space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.hero ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-medium"
            variants={itemVariants}
          >
            <span>🌟 About StemElix</span>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block">Tinkering Minds,</span>
              <span className="block text-gradient bg-gradient-to-r from-cyan via-primary-blue to-white bg-clip-text text-transparent">
                Empowering Youth
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
              At StemElix, we’re reimagining education by blending science,
              technology, engineering, and mathematics with hands-on creativity.
              Our mission is simple: ignite curiosity and transform young learners
              into innovators who will shape tomorrow.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="section-padding bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.mission ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Transforming STEM Education
            </h2>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              We believe in making STEM accessible, engaging, and future-ready.
              By combining digital learning with hands-on tinkering, we help
              students move from learners to creators.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Founder’s Note */}
      <section
        id="founder"
        className={`section-padding bg-gradient-to-br from-navy/90 via-primary-blue/80 to-cyan/70 text-white transition-all duration-1000 ${
          isVisible.founder ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.founder ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold">A Note from Our Founder</h2>
          <p className="text-lg leading-relaxed italic max-w-3xl mx-auto">
            “We started StemElix with a vision to spark curiosity in young minds.
            Our journey began with a simple belief: every child deserves the
            tools to explore, tinker, and innovate. Today, we’re proud to see
            thousands of learners across the globe building projects, solving
            problems, and creating change. The future belongs to those who
            tinker—and we’re here to guide them every step of the way.”
          </p>
          <p className="font-semibold">— Founder of StemElix</p>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutUsPage;
