import { useNavigate } from "react-router-dom";
import tinker from "../assets/aboutus.jpg";

const ContentSection = ({ onLearnMore }) => (
  <div className="relative p-6 sm:p-10 lg:p-14 w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
    
    {/* Image Section - Improved for mobile */}
    <div className="relative w-full lg:w-2/5 flex justify-center">
      <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] hover:border-[var(--color-button)] transition-all duration-300 shadow-lg max-w-md lg:max-w-none">
        <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none lg:w-full">
          <img 
            src={tinker} 
            alt="STEMelix hands-on learning with students building robotics projects" 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            style={{
              imageRendering: 'auto',
              backfaceVisibility: 'hidden'
            }}
            loading="eager"
          />
        </div>
        {/* Decorative elements to make it less "lonely" */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#ac6cf4]/10 rounded-full z-0"></div>
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-purple-500/10 rounded-full z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ac6cf4]/5 to-purple-500/5 pointer-events-none"></div>
      </div>
    </div>

    {/* Text Content Section */}
    <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-end">
      <div className="w-full max-w-2xl lg:max-w-4xl text-center lg:text-left">
        <h4 className="text-[#ac6cf4] font-medium mb-3 text-lg">
          About Us
        </h4>
        
        <h2 className="headline-1 mb-6 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl">
          Where Youth Tinker, Think and Transform!
        </h2>

        <div className="space-y-5 sm:space-y-6 body-text text-base sm:text-lg leading-relaxed">
          <p className="text-gray-700">
            <span className="body-text-bold text-gray-900">STEMelix</span> is a future-focused STEM Learning Platform. 
            We teach coding, robotics, and electronics through mentor-led
           and progressive learning paths.
          </p>
          
          <p className="text-gray-700">
            Learners don't just study concepts; they design, build, and ship real projects. Our approach develops technical skills as well as{' '}
            <span className="body-text-bold text-gray-900">problem-solving</span>,{' '}
            <span className="body-text-bold text-gray-900">logical thinking</span>, and the{' '}
            <span className="body-text-bold text-gray-900">engineering confidence</span>{' '}
            young people need to shape the future.
          </p>
        </div>

        <div className="mt-8 text-center lg:text-left">
          <button
            onClick={onLearnMore}
            className="btn px-6 py-3 rounded-lg bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white inline-flex items-center gap-2 hover:from-[#ac6cf4] hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            type="button"
            aria-label="Learn more about STEMelix"
          >
            <span className="font-semibold">Learn More</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AnimatedSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section 
      className="relative w-full flex justify-center items-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#f5f7fa] to-[#e8ecf1]"
      role="region"
      aria-labelledby="about-us-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-5 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-5 w-24 h-24 bg-purple-200/30 rounded-full blur-xl"></div>
      
      <div className="w-full max-w-6xl relative z-10">
        <ContentSection onLearnMore={handleLearnMore} />
      </div>
    </section>
  );
};

export default AnimatedSection;