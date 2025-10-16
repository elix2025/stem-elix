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
    <section className="relative w-full  overflow-hidden">
      {/* Static decorative boxes - same as NeuroShowcase */}
      {/* <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-xl opacity-60 shadow-lg"></div>
      <div className="absolute bottom-16 left-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-60 shadow-md"></div>
      <div className="absolute bottom-20 right-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-50 shadow-md"></div>
      <div className="absolute top-10 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-[#fc8eac]/40 rounded-xl opacity-50 shadow-lg"></div>
      <div className="absolute top-[120px] left-20 w-14 h-10 sm:w-16 sm:h-12 bg-[#fc8eac]/50 rounded-xl opacity-60 shadow"></div>
      <div className="absolute top-40 right-12 w-12 h-10 sm:w-16 sm:h-12 bg-gray-300 rounded-xl opacity-60 shadow"></div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-10 sm:w-20 sm:h-14 bg-[#c6c2b6]/50 rounded-xl opacity-60 shadow"></div> */}

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
            <h3 className="text-xl md:text-5xl lg:text-3xl  mb-8 animate-fadeIn">
        
            <span className="text-black font-Dan sans bg-black bg-clip-text text-transparent">
              Our Services
            </span>
          </h3>

          {/* <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-black ">
              Equip Your Institution with STEM Labs & Courses
            </span>
          </h2> */}

          <p className="text-charcoal/80 text-lg md:text-xl px-2 max-w-4xl mx-auto leading-relaxed">
            A school is more than just a place where children study — it’s where they spend most of their time growing, exploring, and shaping the way they see the world. 
            Every child comes with an imagination beyond our expectations, and as educators, it’s our responsibility to nurture that spark. 
            We partner with institutions to turn imagination into reality — by creating hands-on STEM labs and empowering teachers through training, so that students can learn, experiment, and innovate with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Simplified cards */}
          <div className="relative">
            {/* Progress indicators */}
            <div className="absolute -bottom-10 left-5 flex gap-3 z-10">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrent(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer
                    hover:scale-125 ${
                    index === current
                      ? "bg-primary-blue scale-110"
                      : "bg-primary-blue/30 hover:bg-primary-blue/50"
                  }`}
                />
              ))}
            </div>

            {/* Card container - simplified transitions */}
            <div className="relative">
              <div
                className={`relative overflow-hidden   min-h-[400px] flex flex-col justify-between  transition-shadow duration-300 hover:shadow-xl ${
                  isAnimating ? 'opacity-90' : 'opacity-100'
                }`}
              >
                <div className="relative z-10 w-full h-full p-8 bg-white">
                  {/* Header section */}
                  <div className="mb-8">
                    {/* Icon and title row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <div className="text-primary-blue">
                          {cards[current].icon}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-black">
                        {cards[current].title}
                      </h2>
                    </div>

                    {/* Subtitle */}
                    {cards[current].subTitle && (
                      <h3 className="text-lg font-semibold mb-4 text-primary-blue">
                        {cards[current].subTitle}
                      </h3>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary-blue rounded-full"></div>
                      <div className="text-gray-700 leading-relaxed text-base pl-6">
                        {cards[current].desc}
                      </div>
                    </div>

                    {/* CTA Button */}
                    {/* <button
                      className="inline-flex items-center px-6 py-3 bg-primary-blue text-white font-semibold rounded-lg 
                                shadow-md hover:bg-blue-600 transition-all duration-300"
                      onClick={() => navigate("/labs")}
                    >
                      <span>Learn More</span>
                      <svg
                        className="ml-2 w-5 h-5"
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
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="overflow-hidden ">
              <img
                src={require("../assets/sch.png")}
                alt="Learning Environment"
                className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
