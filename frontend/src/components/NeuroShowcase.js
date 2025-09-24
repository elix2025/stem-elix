import React from "react";
import { useNavigate } from "react-router-dom";
import gear from "../assets/gear.png";
import star from "../assets/star.webp";

const NeuroShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#f9f8f5] section-padding">
      {/* Static decorative boxes */}
      <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-xl opacity-60 shadow-lg"></div>
      <div className="absolute bottom-16 left-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-60 shadow-md"></div>
      <div className="absolute bottom-20 right-16 w-10 h-10 sm:w-14 sm:h-14 bg-[#ecd0ec]/40 rounded-xl opacity-50 shadow-md"></div>
      <div className="absolute top-10 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-[#fc8eac]/40 rounded-xl opacity-50 shadow-lg"></div>
      <div className="absolute top-[120px] left-20 w-14 h-10 sm:w-16 sm:h-12 bg-[#fc8eac]/50 rounded-xl opacity-60 shadow"></div>
      <div className="absolute top-40 right-12 w-12 h-10 sm:w-16 sm:h-12 bg-gray-300 rounded-xl opacity-60 shadow"></div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-10 sm:w-20 sm:h-14 bg-[#c6c2b6]/50 rounded-xl opacity-60 shadow"></div>

      {/* Static icons */}
      {/* <div className="absolute bottom-20 left-24">
        <img src={gear} alt="gear" className="w-20 h-20 object-contain" />
      </div>
      <div className="absolute bottom-5 right-1/4 w-20 h-35">
        <img src={star} alt="idea" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/3 right-24">
        <img src={gear} alt="gear" className="w-20 h-20 object-contain" />
      </div>
      <div className="absolute top-10 left-20 w-20 h-20">
        <img src={star} alt="star" className="w-full h-full object-contain" />
      </div> */}

      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static floating shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-cyan/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-blue/3 rounded-full blur-xl" />

        {/* Static pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header - Reduced font sizes */}
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-slate-800">STEM KIT</h3>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight m-5">
            Everything they need to build Dreams
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-xl m-auto">
            Delivered at your doorstep!
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center ">
          {/* Text Content */}
          <div className="space-y-8 mx-auto">
            <div className=" my-8  ">
              <button 
                onClick={() => navigate("/kits")}
                className="group inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-[#ac6cf4]/25 transform hover:-translate-y-0.5 transition-all duration-300 ease-out hover:scale-105 "
              >
                <span className="mx-auto">Learn More</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Container - Simplified */}
          <div className="relative">
            {/* Static decorative elements */}
          

            {/* Static connection lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 400 400"
            >
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1={50 + i * 30}
                  y1={50}
                  x2={350 - i * 20}
                  y2={350}
                  stroke="#2563EB"
                  strokeWidth="2"
                  opacity="0.3"
                />
              ))}
            </svg>

            {/* Static hover element */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan/20 to-primary-blue/30 rounded-full opacity-50" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default NeuroShowcase;