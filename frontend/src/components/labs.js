import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      />
    ),
  },
];

export default function LandingSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

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
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="relative w-full bg-[#f9f8f5] section-padding overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary-blue/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan/3 rounded-full blur-xl"></div>

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #06B6D4 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center space-x-2 glass bg-cyan/10 backdrop-blur-sm
                          border border-cyan/20 text-cyan px-6 py-3 rounded-full 
                          text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 bg-[#6366f1] rounded-full"></div>
            <span className="text-[#6366F1]">Educational Excellence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-[#6366F1] bg-gradient-to-r from-primary-blue via-cyan to-navy bg-clip-text text-transparent">
              Equip Your Institution with STEM Labs & Courses
            </span>
          </h2>

          <p className="text-charcoal/80 sm:text-lg md:text-xl px-2 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive program designed to enhance STEM
            education and empower educators with cutting-edge teaching
            methodologies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Enhanced image */}
          <div className="relative group">
            {/* Static background effects */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-cyan/20 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-cyan/20 to-primary-blue/20 rounded-full blur-3xl opacity-40"></div>

            <div className="relative group-hover:scale-105 transition-transform duration-500">
              <img
                src={require("../assets/school.png")}
                alt="Learning Environment"
                className="w-full h-auto rounded-2xl hover:brightness-110 transition-all duration-500"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-primary-blue/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Right side - Simplified cards */}
          <div className="relative">
            {/* Navigation buttons */}
            <div className="absolute -top-4 right-0 flex gap-3 z-20">
              <button
                onClick={handlePrevCard}
                className="w-12 h-12 rounded-xl bg-white border-2 border-primary-blue/30 hover:border-primary-blue text-primary-blue hover:text-cyan transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50"
                disabled={isAnimating}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextCard}
                className="w-12 h-12 rounded-xl bg-white border-2 border-primary-blue/30 hover:border-primary-blue text-primary-blue hover:text-cyan transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50"
                disabled={isAnimating}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="absolute -top-16 left-0 flex gap-2 z-10">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-120 ${
                    index === current
                      ? "bg-primary-blue scale-125"
                      : "bg-primary-blue/30"
                  }`}
                />
              ))}
            </div>

            {/* Card container - simplified transitions */}
            <div className="relative">
              <div
                className={`relative overflow-hidden rounded-3xl border-2 border-primary-blue/20 hover:border-cyan/30 min-h-[400px] flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 group ${
                  isAnimating ? 'opacity-75' : 'opacity-100'
                }`}
              >
                {/* Dynamic gradient background */}
                <div
                  className={`absolute inset-0 bg-[#6366f1] opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Background pattern */}
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
                  {/* Header section */}
                  <div className="mb-8">
                    {/* Icon and brand */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <div className="text-primary-blue group-hover:text-cyan transition-colors duration-300">
                          {cards[current].icon}
                        </div>
                      </div>
                      <div
                        className={`text-sm font-bold tracking-wider bg-gradient-to-r ${cards[current].accent} bg-clip-text text-transparent`}
                      >
                      STEMelix
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[#6366F1] mb-3 leading-tight group-hover:text-primary-blue transition-colors duration-300">
                      {cards[current].title}
                    </h2>

                    {/* Subtitle */}
                    {cards[current].subTitle && (
                      <h3
                        className={`text-[#6366F1] text-lg md:text-xl font-semibold mb-6 bg-gradient-to-r ${cards[current].accent} bg-clip-text text-transparent`}
                      >
                        {cards[current].subTitle}
                      </h3>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary-blue to-cyan rounded-full"></div>
                      <blockquote className="text-charcoal/80 leading-relaxed text-base md:text-lg pl-6 italic group-hover:text-charcoal transition-colors duration-300">
                        "{cards[current].desc}"
                      </blockquote>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`inline-flex items-center px-6 py-3 bg-[#6366f1] ${cards[current].accent} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
                      onClick={() => navigate("/labs")}
                    >
                      <span className="">Learn More</span>
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
