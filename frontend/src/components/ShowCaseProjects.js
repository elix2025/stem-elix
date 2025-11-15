import React, { useEffect, useRef, useState } from "react";

const ShowcaseSection = ({ onShowFormClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#ac6cf4]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl animate-float delay-500"></div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ac6cf4]/10 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-[#ac6cf4] px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-[#ac6cf4] to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6cf4] to-purple-600">
              🎓 Student Innovation Gallery
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
            Showcase Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6cf4] to-purple-600">
              Amazing Creations
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Join our community of young innovators and showcase your projects to the world. 
            From robots to apps, your creativity inspires the next generation of STEM leaders.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          <div className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ac6cf4]/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ac6cf4] to-purple-600 rounded-2xl transform rotate-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#ac6cf4] to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    Get Featured & Recognized
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Showcase your creativity to a global audience. Get featured on our platform, 
                    receive expert feedback, and inspire thousands of fellow young innovators with your groundbreaking projects.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Featured on our innovation wall",
                    "Expert mentor feedback",
                    "Build your STEM portfolio",
                    "Inspire other students"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3 group/benefit">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#ac6cf4] to-purple-600 rounded-full group-hover/benefit:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-600 group-hover/benefit:text-gray-800 transition-colors duration-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`group relative bg-gradient-to-br from-[#ac6cf4] via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl transform rotate-6 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <span className="text-4xl">✨</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-white">Share Your Masterpiece</h3>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  Ready to showcase your innovation? Upload your project and join our exclusive community of young STEM pioneers.
                </p>
              </div>

              <button
                onClick={onShowFormClick}
                className="group/btn relative bg-white text-[#ac6cf4] px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border-2 border-white"
              >
                <span className="relative z-10">Upload Your Project</span>
               
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover/btn:opacity-30 blur-md transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Your Innovation Deserves to Be Celebrated!
            </h3>
            <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you've built a smart robot, developed an app, created digital art, 
              or conducted a scientific experiment - we want to see it! Share your journey and inspire others.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: "⚡", text: "Quick Upload" },
                { icon: "🌟", text: "Get Featured" },
                { icon: "💬", text: "Expert Feedback" },
                { icon: "📈", text: "Build Portfolio" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-semibold text-[#ac6cf4]">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;