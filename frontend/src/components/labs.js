import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    title: "STEM Labs",
    subTitle: "Building the Environment for Learning",
    desc: "Empower educators with cutting-edge STEM teaching skills through our comprehensive training program.",
    accent: "text-indigo-600",
  },
  {
    title: "Courses For Teachers",
    subTitle: "Empowering Educators",
    desc: "Transform your teaching methodology with our specialized courses designed for modern STEM education.",
    accent: "text-purple-600",
  },
];

export default function LandingSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextCard();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-10 items-center">
      {/* Left side image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={require("../assets/school.png")}
          alt="Learning"
          className="w-full h-auto rounded-2xl"
        />
      </motion.div>

      {/* Right side animated cards */}
      <div className="relative , border-none">
        {/* Navigation buttons */}
        <div className="absolute -top-4 right-0 flex gap-2 z-10">
          <button
            onClick={handlePrevCard}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                       transition-all duration-300 flex items-center justify-center 
                       text-gray-600 hover:text-indigo-600 disabled:opacity-50"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextCard}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                       transition-all duration-300 flex items-center justify-center 
                       text-gray-600 hover:text-indigo-600 disabled:opacity-50"
            disabled={isAnimating}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Card container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-gray-200 min-h-[350px] flex flex-col justify-between"
          >
            <div className="w-full h-full p-8">
              {/* Header section */}
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-sm font-semibold tracking-wider uppercase ${cards[current].accent} mb-2`}
                >
                  STEM Elix
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight"
                >
                  {cards[current].title}
                </motion.h2>
                {cards[current].subTitle && (
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg md:text-xl text-gray-600 font-medium mb-4"
                  >
                    {cards[current].subTitle}
                  </motion.h3>
                )}
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <blockquote className="text-gray-700 leading-relaxed text-base md:text-lg italic border-l-4 border-indigo-200 pl-6">
                  "{cards[current].desc}"
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
