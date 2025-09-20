import React from "react";

const ShowcaseSection = ({ onShowFormClick }) => {
  return (
    <section className="relative w-full bg-[#f9f8f5] section-padding overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-cyan/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-blue/3 rounded-full blur-xl"></div>

        {/* Tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
                          border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full 
                          text-sm font-medium mb-8"
          >
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <span>Student Innovations</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
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
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Card - Rewards */}
          <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-primary-blue/10 hover:border-primary-blue/30 p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Static decoration */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-primary-blue/20 to-cyan/30 rounded-full"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-4">
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  Get recognized and rewarded for your creativity, innovation,
                  and learning achievements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Innovation Card */}
            <div className="group relative bg-gradient-to-br from-navy to-navy/90 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex items-center gap-4">
                <span className="text-4xl filter drop-shadow-lg">
                  ✨
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    Show Us Your Innovations
                  </h3>
                  <p className="text-white/80 text-lg">
                    Transform ideas into reality and inspire others
                  </p>
                </div>
              </div>
            </div>

            {/* Categories Card */}
            <div className="group bg-[#f9f8f5] rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-primary-blue/10 hover:border-primary-blue/30 transition-all duration-500 hover:scale-105 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-center ">
                  <div className="flex flex-wrap justify-center gap-6">
                    <button
                      onClick={onShowFormClick}
                      className="group relative inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Share Your Creation</span>
                      <svg
                        className="relative z-10 ml-2 w-5 h-5 bg-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>

                    <button
                      className="group relative inline-flex items-center px-8 py-4 border-2 border-primary-blue/30 hover:border-primary-blue text-charcoal hover:text-primary-blue font-semibold rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-2"
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
};

export default ShowcaseSection;