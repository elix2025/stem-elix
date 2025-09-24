import { useNavigate } from "react-router-dom";
import tinker from "../assets/tinker.png";

// Static background boxes configuration - Updated to match NeuroShowcase
const BACKGROUND_BOXES = [
  { position: "top-8 left-8", color: "bg-gray-200", opacity: "opacity-60", size: "w-12 h-12 sm:w-16 sm:h-16", shadow: "shadow-lg" },
  { position: "bottom-16 left-16", color: "bg-[#ecd0ec]/40", opacity: "opacity-60", size: "w-10 h-10 sm:w-14 sm:h-14", shadow: "shadow-md" },
  { position: "bottom-20 right-16", color: "bg-[#ecd0ec]/40", opacity: "opacity-50", size: "w-10 h-10 sm:w-14 sm:h-14", shadow: "shadow-md" },
  { position: "top-10 right-8", color: "bg-[#fc8eac]/40", opacity: "opacity-50", size: "w-12 h-12 sm:w-16 sm:h-16", shadow: "shadow-lg" },
  { position: "top-[120px] left-20", color: "bg-[#fc8eac]/50", opacity: "opacity-60", size: "w-14 h-10 sm:w-16 sm:h-12", shadow: "shadow" },
  { position: "top-40 right-12", color: "bg-gray-300", opacity: "opacity-60", size: "w-12 h-10 sm:w-16 sm:h-12", shadow: "shadow" },
  { position: "bottom-8 left-1/2 -translate-x-1/2", color: "bg-[#c6c2b6]/50", opacity: "opacity-60", size: "w-14 h-10 sm:w-20 sm:h-14", shadow: "shadow" }
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
          ${box.size}
          ${box.shadow}
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
        STEMelix, is a future-focused STEM Learning Platform. We teach coding, 
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
    <section 
      className="
        relative w-full 
        h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]
        my-20 
        bg-[#f9f8f5] 
        rounded-xl 
        flex flex-col items-center justify-start
        overflow-hidden 
        px-4 sm:px-6 lg:px-8 
        pt-8 sm:pt-12
      "
      role="region"
      aria-labelledby="about-us-heading"
    >
      {/* Background decorative elements */}
      <BackgroundBoxes />
      
      {/* Main content */}
      <ContentSection onLearnMore={handleLearnMore} />
      
      {/* Globe with tagline - uncomment if needed */}
      {/* <GlobeSection /> */}
    </section>
  );
};

export default AnimatedSection;
