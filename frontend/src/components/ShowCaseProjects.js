import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ShowcaseSection = ({ onShowFormClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-light-bg via-white to-blue-50/30 section-padding overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-blue/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-cyan/5 rounded-full blur-2xl animate-float delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-blue/3 rounded-full blur-xl animate-float delay-500"></div>

        {/* Tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Enhanced Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div
            className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
                          border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full 
                          text-sm font-medium mb-8"
          >
            <motion.div
              className="w-2 h-2 bg-primary-blue rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <span>Student Innovations</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            What Have You{" "}
            <span className="text-gradient bg-gradient-to-r from-primary-blue via-cyan to-primary-blue bg-clip-text text-transparent">
              Created?
            </span>
          </h2>

          <p className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-4xl mx-auto leading-relaxed">
            We'd love to see the amazing things you've built! Share your
            projects, inventions, art, experiments, or anything cool you've made
            while learning with us.
          </p>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Card - Rewards */}
          <motion.div
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-primary-blue/10 hover:border-primary-blue/30 p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
            variants={itemVariants}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating decorations */}
            <motion.div
              className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-primary-blue/20 to-cyan/30 rounded-full"
              variants={floatingVariants}
              animate="animate"
            ></motion.div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
              {/* Enhanced icon */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-blue/10 via-cyan/5 to-primary-blue/10 rounded-3xl flex items-center justify-center group-hover:from-primary-blue/20 group-hover:to-cyan/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
                  <svg
                    className="w-12 h-12 text-primary-blue group-hover:text-cyan transition-colors duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-primary-blue/20 to-cyan/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal group-hover:text-primary-blue transition-colors duration-300">
                  Rewards for Everything
                </h3>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  Get recognized and rewarded for your creativity, innovation,
                  and learning achievements.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Innovation Card */}
            <motion.div
              className="group relative bg-gradient-to-br from-navy to-navy/90 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex items-center gap-4">
                <motion.span
                  className="text-4xl filter drop-shadow-lg"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Show Us Your Innovations
                  </h3>
                  <p className="text-white/80 text-lg">
                    Transform ideas into reality and inspire others
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Categories Card */}
            <motion.div
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-primary-blue/10 hover:border-primary-blue/30 transition-all duration-500 hover:scale-105 overflow-hidden"
              variants={itemVariants}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h4 className="text-xl font-bold text-charcoal mb-6 group-hover:text-primary-blue transition-colors duration-300">
                  Share Your Projects In
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Robotics",
                    "AI Projects",
                    "Electronics",
                    "Programming",
                    "3D Printing",
                    "IoT Devices",
                    "Mobile Apps",
                    "Web Development",
                  ].map((item, index) => (
                    <motion.span
                      key={item}
                      className="px-4 py-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 text-primary-blue border border-primary-blue/20 rounded-full text-sm font-medium hover:from-primary-blue/20 hover:to-cyan/20 hover:scale-105 transition-all duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div className="text-center mt-16" variants={itemVariants}>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              onClick={onShowFormClick}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-blue to-blue-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 overflow-hidden focus-ring"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Share Your Creation</span>
              <motion.svg
                className="relative z-10 ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </motion.svg>
            </motion.button>

            <motion.button
              className="group relative inline-flex items-center px-8 py-4 border-2 border-primary-blue/30 hover:border-primary-blue text-charcoal hover:text-primary-blue font-semibold rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 focus-ring"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View Gallery</span>
              <svg
                className="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ShowcaseSection;
