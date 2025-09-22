import { useNavigate } from "react-router-dom";

// Static background boxes configuration
const BACKGROUND_BOXES = [
  { position: "top-5 left-5", color: "bg-gray-200", opacity: "opacity-70" },
  { position: "bottom-10 left-10", color: "bg-[#ecd0ec]/40", opacity: "opacity-70" },
  { position: "bottom-10 right-10", color: "bg-[#ecd0ec]/40", opacity: "opacity-60" },
  { position: "top-5 right-5", color: "bg-[#fc8eac]/40", opacity: "opacity-60" },
  { position: "top-[120px] sm:top-[160px] left-10", color: "bg-[#fc8eac]/50", opacity: "opacity-70", size: "w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-[100px]" },
  { position: "top-32 right-5", color: "bg-gray-300", opacity: "opacity-70", size: "w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24" },
  { position: "bottom-5 left-1/2 -translate-x-1/2", color: "bg-[#c6c2b6]/50", opacity: "opacity-70", size: "w-20 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24" }
];

// Background decorative boxes component
const BackgroundBoxes = () => (
  <>
    {BACKGROUND_BOXES.map((box, index) => (
      <div
        key={index}
        className={`
          absolute rounded-xl
          ${box.position}
          ${box.color}
          ${box.opacity}
          ${box.size || 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'}
        `}
      />
    ))}
  </>
);

// Content section component - no animations
const ContentSection = ({ onLearnMore }) => (
  <div className="relative z-10 text-center max-w-md sm:max-w-lg lg:max-w-2xl px-4">
    <header className="mb-6">
      <h3 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-3">
        About Us
      </h3>
      <h2 className="text-xl sm:text-xl lg:text-3xl font-bold text-gray-900 mb-4">
        Where Youth Tinker, Think and Transform!
      </h2>
    </header>
    
    <div className="mb-6">
      <p className="text-gray-600 text-sm sm:text-xl font-medium leading-relaxed text-left sm:text-center">
        Stemelix, is a future-focused STEM Learning Platform. We teach coding, 
        robotics and electronics through mentor-led, hands-on labs and progressive 
        learning paths—so learners don't just study concepts; they design, build 
        and ship real projects. Our approach develops technical skills and the 
        creative problem-solving, logical thinking and engineering confidence young 
        people need to shape the future. Our programs Aligned with NEP 2020 and 
        NITI Aayog's vision, we're ready preparing India's next generation of innovators.
      </p>
    </div>

    <button
      onClick={onLearnMore}
      className="
        inline-flex items-center justify-center
        px-6 py-3 sm:px-8 sm:py-4
        bg-black text-white font-semibold
        rounded-lg hover:bg-gray-800 
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        active:transform active:scale-95
        hover:scale-105
      "
      type="button"
      aria-label="Learn more about Stem-Elix"
    >
      Learn More
    </button>
  </div>
);

// Globe with tagline component - simplified
const GlobeSection = () => (
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
    {/* Globe background */}
    <div className="
      w-80 h-40 
      sm:w-[420px] sm:h-48 
      md:w-[500px] md:h-[250px] 
      lg:w-[560px] lg:h-[280px]
      bg-gradient-to-b from-[#d6d3cc] via-[#d6d3cc] to-[#f9f8f5] 
      rounded-t-full 
      pointer-events-none
      relative
    ">
      {/* Centered tagline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 400 200" 
          className="w-full h-full max-w-[350px] max-h-[175px]"
          role="img" 
          aria-label="Cast, Craft, Create tagline"
        >
          <defs>
            <path
              id="tagline-curve"
              d="M 75 125 A 125 125 0 0 1 325 125"
              fill="transparent"
            />
          </defs>
          <text 
            fill="#333" 
            fontSize="18" 
            fontWeight="600" 
            textAnchor="middle"
            className="sm:text-xl md:text-2xl"
          >
            <textPath href="#tagline-curve" startOffset="50%">
              Cast | Craft | Create
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  </div>
);

// Main component - no Framer Motion
const AnimatedSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section className="relative w-full bg-[#f9f8f5] section-padding overflow-hidden">
      {/* Background decorative elements - matching homepage pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full blur-lg"></div>
        
        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section - consistent with other sections */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <span>About Us</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6366F1] mb-6">
            Where Youth Tinker, Think and Transform!
          </h2>
        </div>

        {/* Main Content Grid - Better alignment */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="sm:text-lg md:text-xl text-charcoal/80 leading-relaxed">
                STEMElix is a future-focused STEM Learning Platform. We teach coding, 
                robotics and electronics through mentor-led, hands-on labs and progressive 
                learning paths—so learners don't just study concepts; they design, build 
                and ship real projects.
              </p>
              
              <p className="sm:text-lg md:text-xl text-charcoal/80 leading-relaxed">
                Our approach develops technical skills and the creative problem-solving, 
                logical thinking and engineering confidence young people need to shape the future. 
                Our programs are aligned with NEP 2020 and NITI Aayog's vision, preparing 
                India's next generation of innovators.
              </p>
            </div>

            <button
              onClick={handleLearnMore}
              className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              type="button"
              aria-label="Learn more about STEMElix"
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
            </button>
          </div>

          {/* Visual Content */}
          <div className="relative hidden md:block">
            {/* Main visual card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary-blue/10 hover:border-primary-blue/30 transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary-blue/10 to-cyan/10 rounded-3xl flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Tagline */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#6366F1]">Cast | Craft | Create</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    From curious minds to confident creators, we guide every step 
                    of the innovation journey.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { icon: "🔧", label: "Build" },
                    { icon: "💡", label: "Think" },
                    { icon: "🚀", label: "Create" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium text-charcoal/70">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary-blue/20 to-cyan/30 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan/20 to-primary-blue/20 rounded-full blur-lg opacity-60"></div>
          </div>
        </div>

        {/* Bottom highlight section */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 text-primary-blue px-6 py-3 rounded-full text-sm font-medium border border-primary-blue/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Preparing India's next generation of innovators</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AnimatedSection;
