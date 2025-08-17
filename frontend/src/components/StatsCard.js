import React, { useRef, useEffect, useState } from "react";

const StatsCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const cardTop = entry.boundingClientRect.top;
        const navbarHeight = 95;

        if (cardTop <= navbarHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 1],
        rootMargin: "0px 0px 0px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative z-50 mx-auto max-w-5xl px-6 lg:px-20 -mt-16 transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              200K+
            </div>
            <div className="text-sm lg:text-base text-slate-600 mt-1">
              Students Empowered
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
              120+
            </div>
            <div className="text-sm lg:text-base text-slate-600 mt-1">
              STEM Courses
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-600 to-teal-600 bg-clip-text text-transparent">
              1K+
            </div>
            <div className="text-sm lg:text-base text-slate-600 mt-1">
              Success Stories
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              30M+
            </div>
            <div className="text-sm lg:text-base text-slate-600 mt-1">
              Learning Hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
