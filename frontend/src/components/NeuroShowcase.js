import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gear from "../assets/gear.png";
import transistor from "../assets/trans.png";
import star from "../assets/star.webp";
import bolt from "../assets/bolt.png";

// import testtube from "../assets/testtube.png";
const NeuroShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [0, 10, 0, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f9f8f5] section-padding">
    {/* bg-gradient-to-br from-navy/5 via-light-bg to-cyan/5 */}
     
     {/* <section className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] my-20 bg-[#f9f8f5] rounded-xl flex items-center justify-center overflow-hidden px-4"> */}
    {/* Sprinkled floating elements */}
    <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-xl opacity-60 shadow-lg"></div>
    <div className="absolute bottom-16 left-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-60 shadow-md"></div>
    <div className="absolute bottom-20 right-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-50 shadow-md"></div>
    <div className="absolute top-10 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-[#fc8eac]/40 rounded-xl opacity-50 shadow-lg"></div>
    <div className="absolute top-[120px] left-20 w-14 h-10 sm:w-16 sm:h-12 bg-[#fc8eac]/50 rounded-xl opacity-60 shadow"></div>
    <div className="absolute top-40 right-12 w-12 h-10 sm:w-16 sm:h-12 bg-gray-300 rounded-xl opacity-60 shadow"></div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-10 sm:w-20 sm:h-14 bg-[#c6c2b6]/50 rounded-xl opacity-60 shadow"></div>

    {/* Sprinkled icons */}
    <div className="absolute bottom-20 left-24 ">
      <img src={gear} alt="gear" className="w-25 h-20 object-contain animate-spin-slow" />
    </div>
    { <div className="absolute bottom-5 right-1/4 w-20 h-35 ">
      <img src={star} alt="idea" className="w-full h-full object-contain animate-slow" />
    </div> }
    <div className="absolute top-1/3 right-24 ">
      <img src={gear} alt="gear" className="w-20 h-20 object-contain animate-spin-slow" />
    </div>
    <div className="absolute top-10 left-20 w-20 h-20 w-12 ">
      <img src={star} alt="star" className="w-full h-full object-contain animate-slow" />
    </div>
      {/* <div className="absolute bottom-1/3 right-60 w-20 h-20  ">
      <img src={transistor} alt="transistor" className="w-full h-full object-contain animate-slow" />
    </div> */}
      <motion.div
        className="relative z-10 text-center max-w-md sm:max-w-lg"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
      
      </motion.div>
   
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-primary-blue/5 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-cyan/5 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-blue/3 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />

        {/* Neural network pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated brain synapses effect */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan/30 rounded-full"
              style={{
                top: `${20 + i * 10}%`,
                left: `${10 + i * 8}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Enhanced Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div>

             <h3 className="text-2xl font-semibold text-slate-800">STEM Kits</h3>

             <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                Everything they need to build Dreams
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Delivered at your doorstep!
              </p>
            {/* <motion.div
              className="text-2xl filter drop-shadow-lg"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🧠
            </motion.div>
            <span>Neuroscience Innovation</span> */}
          </div>

        
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Enhanced Text Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              {/* Feature highlights */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: "🔬",
                    title: "Interactive Experiments",
                    desc: "Hands-on neuroscience activities",
                  },
                  {
                    icon: "🧬",
                    title: "Brain Mapping",
                    desc: "Explore neural pathways",
                  },
                  {
                    icon: "⚡",
                    title: "Neural Circuits",
                    desc: "Build and test connections",
                  },
                  {
                    icon: "🎯",
                    title: "Age Appropriate",
                    desc: "Designed for ages 6-18",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="group p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary-blue/10 hover:border-cyan/30 transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="text-2xl"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-charcoal group-hover:text-primary-blue transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-charcoal/70">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div> */}

              
            </div>

            <div className="flex justify-center my-8">
              <motion.button onClick={() => navigate("/kits")}
              className="group inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-[#ac6cf4]/25 transform hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <span>Learn More</span>
                <motion.svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.button>

           
            </div>
          </motion.div>

          {/* Enhanced Image Container */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Floating decorative elements with animations */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-cyan/30 rounded-full blur-2xl"
              variants={pulseVariants}
              animate="animate"
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-cyan/20 to-primary-blue/20 rounded-full blur-3xl"
              variants={pulseVariants}
              animate="animate"
              style={{ animationDelay: "1.5s" }}
            />

            {/* Neural connection lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 400 400"
            >
              {[...Array(6)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={50 + i * 30}
                  y1={50}
                  x2={350 - i * 20}
                  y2={350}
                  stroke="#2563EB"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </svg>

            {/* Main image container with enhanced effects */}
            {/* <motion.div
              className="relative group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary-blue/20 hover:border-cyan/30 transition-all duration-500"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            > */}
              {/* Gradient overlay
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}

              {/* Enhanced image with mask effect */}
              <div className="relative">
                {/* <img
                  src={require("../assets/stem.webp")}
                  alt="Neuroscience Kit - Interactive Brain Learning"
                  className="w-full max-w-sm mx-auto rounded-2xl transform group-hover:scale-110 transition-all duration-500 filter group-hover:brightness-110"
                  style={{
                    maskImage:
                      "radial-gradient(ellipse at center, black 60%, transparent 90%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 60%, transparent 90%)",
                  }}
                /> */}

                {/* Floating brain particles */}
                {/* {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-[#ac6cf4] to-[#ecd0e5] rounded-full"
                    style={{
                      top: `${20 + i * 15}%`,
                      right: `${10 + i * 5}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut",
                    }}
                  />
                ))} */}
              </div>

              {/* Interactive hover elements */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan/20 to-primary-blue/30 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Status badge */}
            {/* <motion.div
              className="absolute -bottom-4 left-4 bg-gradient-to-r from-primary-blue to-cyan text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              ✨ Award-Winning Kit
            </motion.div> */}
          {/* </motion.div> */}
        </div>

        {/* Enhanced Features Section */}
        <motion.div className="mt-20 text-center" variants={itemVariants}>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Experiments", icon: "🔬" },
              { number: "6-18", label: "Age Range", icon: "👥" },
              { number: "100%", label: "Interactive", icon: "⚡" },
              { number: "Award", label: "Winning", icon: "🏆" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary-blue/10 hover:border-cyan/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.2 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl font-bold text-primary-blue group-hover:text-cyan transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-charcoal/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NeuroShowcase;
