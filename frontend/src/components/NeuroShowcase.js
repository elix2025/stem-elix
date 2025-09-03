const NeuroShowcase = () => {
  return (
    <section className="relative overflow-hidden isolate">
      {/* Subtle background gradient (white + purple tints) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-fuchsia-50/20" />

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-purple-100/80 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                <span>🧠</span>
                <span>Neuroscience Kit</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                Explore the Brain with Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  {" "}
                  Advanced Kit
                </span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Dive into the fascinating world of neurons, circuits, and the
                human brain! Designed for curious learners aged 6–18, our
                interactive
                <span className="font-semibold text-slate-700">
                  {" "}
                  Neuroscience STEM Kit
                </span>{" "}
                combines hands-on experiments with cutting-edge learning to
                build brilliant futures.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <span>Discover More</span>
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

              <button className="inline-flex items-center px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-purple-300 hover:text-purple-700 transition-all duration-300 ease-out">
                Learn More
              </button>
            </div>
          </div>

          {/* Image container */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-fuchsia-200 to-purple-200 rounded-full opacity-60" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-full opacity-40" />

            {/* Main image */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-200">
              <img
                src={require("../assets/stem.webp")}
                alt="Neuroscience Kit - Interactive Brain Learning"
                className="w-full max-w-sm mx-auto rounded-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuroShowcase;
