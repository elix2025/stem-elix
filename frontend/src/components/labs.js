import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "STEM Labs",
    subTitle: "Building the Environment for Learning",
    desc: "We design and set up fully equipped STEM Labs that bring science, technology, engineering, and mathematics to life in classrooms.From robotics and electronics to coding and innovation kits, our labs provide students with hands-on experiences that spark creativity and problem-solving. Partner with us to transform your institution into a hub of future-ready learning.",
    accent: "from-primary-blue to-cyan",
    icon: (
      <img
        className="w-full h-full"
        src={logo}
        alt="logo"
      />
    ),
  },
  {
    title: "Courses For Teachers",
    subTitle: "Empowering Educators",
    desc: "Transform your teaching methodology with our specialized courses designed for modern STEM education and interactive learning experiences.",
    accent: "from-cyan to-primary-blue",
    icon: (
      <img
        className="w-full h-full"
        src={logo}
        alt="logo"
      >
        {/* <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        /> */}
      </img>
    ),
  },
];

export default function LandingSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextCard();
    }, 11000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full bg-[#f9f8f5] section-padding overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-cyan/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary-blue/5 rounded-full blur-2xl animate-float delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan/3 rounded-full blur-xl animate-float delay-500"></div>

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #06B6D4 1px, transparent 0)`,
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
            className="inline-flex items-center space-x-2 glass bg-cyan/10 backdrop-blur-sm
                          border border-cyan/20 text-cyan px-6 py-3 rounded-full 
                          text-sm font-medium mb-8"
          >
            <motion.div
              className="w-2 h-2 bg-cyan rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <span>Educational Excellence</span>
          </div>

          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-gradient bg-gradient-to-r from-primary-blue via-cyan to-navy bg-clip-text text-transparent">
              Equip Your Institution with STEM Labs & Courses
            </span>
          </h2>

          <p className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive program designed to enhance STEM
            education and empower educators with cutting-edge teaching
            methodologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Enhanced image */}
          <motion.div className="relative group" variants={itemVariants}>
            {/* Floating background effects */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-cyan/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-cyan/20 to-primary-blue/20 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

            <div 
            className="relative  group-hover:border-cyan/30 transition-all duration-500 group-hover:scale-105">
              <img
                src={require("../assets/school.png")}
                alt="Learning Environment"
                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500 filter group-hover:brightness-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-primary-blue/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          {/* Right side - Enhanced animated cards */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Enhanced Navigation buttons */}
            <div className="absolute -top-4 right-0 flex gap-3 z-20">
              <motion.button
                onClick={handlePrevCard}
                className="w-12 h-12 rounded-xl bg-white border-2 border-primary-blue/30 hover:border-primary-blue text-primary-blue hover:text-cyan transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-primary-blue/20 hover:scale-110 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={handleNextCard}
                className="w-12 h-12 rounded-xl bg-white border-2 border-primary-blue/30 hover:border-primary-blue text-primary-blue hover:text-cyan transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-primary-blue/20 hover:scale-110 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Progress indicators */}
            <div className="absolute -top-16 left-0 flex gap-2 z-10">
              {cards.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-primary-blue scale-125"
                      : "bg-primary-blue/30"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Enhanced Card container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-3xl border-2 border-primary-blue/20 hover:border-cyan/30 min-h-[400px] flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Dynamic gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cards[current].accent} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500">
                  <div
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
                      backgroundSize: "20px 20px",
                    }}
                    className="w-full h-full"
                  ></div>
                </div>

                <div className="relative z-10 w-full h-full p-8 bg-white/95 backdrop-blur-sm">
                  {/* Enhanced Header section */}
                  <div className="mb-8">
                    {/* Icon and brand */}
                    <motion.div
                      className="flex items-center gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="w-16 h-16 bg-rounded-2xl flex items-center justify-center group-hover:from-primary-blue/20 group-hover:to-cyan/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <div className="text-primary-blue group-hover:text-cyan transition-colors duration-300">
                          {cards[current].icon}
                        </div>
                      </div>
                      <div
                        className={`text-sm font-bold tracking-wider uppercase bg-gradient-to-r ${cards[current].accent} bg-clip-text text-transparent`}
                      >
                        STEM Elix
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold text-charcoal mb-3 leading-tight group-hover:text-primary-blue transition-colors duration-300"
                    >
                      {cards[current].title}
                    </motion.h2>

                    {/* Subtitle */}
                    {cards[current].subTitle && (
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r ${cards[current].accent} bg-clip-text text-transparent`}
                      >
                        {cards[current].subTitle}
                      </motion.h3>
                    )}
                  </div>

                  {/* Enhanced Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary-blue to-cyan rounded-full"></div>
                      <blockquote className="text-charcoal/80 leading-relaxed text-lg md:text-xl pl-6 italic group-hover:text-charcoal transition-colors duration-300">
                        "{cards[current].desc}"
                      </blockquote>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className={`inline-flex items-center px-6 py-3 bg-black ${cards[current].accent} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus-ring`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick = {() => navigate("/labs")}
                    >
                      <span>Learn More</span>
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
