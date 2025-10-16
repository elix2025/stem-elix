import { useNavigate } from "react-router-dom";
import tinker from "../assets/aboutus.jpg";

const ContentSection = ({ onLearnMore }) => (
  <div className="relative p-10 lg:p-14 w-full flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
    
    {/* Image Section */}
    <div className="relative w-full lg:w-1/3 flex justify-center lg:justify-start">
      <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] hover:border-[var(--color-button)] transition-all duration-300">
        <img 
          src={tinker} 
          alt="STEMelix hands-on learning" 
          className="w-full h-full object-cover object-center sm:max-w-[26rem] sm:max-h-[26rem] -mt-12 lg:mt-0
                   transform hover:scale-105 transition-transform duration-700"
          style={{
            imageRendering: 'auto',
            backfaceVisibility: 'hidden'
          }}
          loading="eager"
        />
        {/* Overlay to prevent image tearing */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      </div>
    </div>

    {/* Text Section */}
    <div className="w-full lg:w-2/3 flex flex-col items-end">
      <div className="w-full max-w-4xl">
        <h4 
          className="text-[var(--color-button)] font-medium mb-2"
        >
          About Us
        </h4>
        
        <h2 className="headline-1 mb-8">
          Where Youth Tinker, Think and Transform!
        </h2>

        <div className="space-y-6 body-text text-base lg:text-lg leading-relaxed text-left">
          <p>
            <span className="body-text-bold">STEMelix</span> is a future-focused STEM Learning Platform. 
            We teach coding, robotics, and electronics through mentor-led, 
            hands-on labs and progressive learning paths.
          </p>
          
          <p>
            Learners don't just study concepts; they design, build, and ship real projects. Our approach develops technical skills as well as{' '}
            <span className="body-text-bold">problem-solving</span>,{' '}
            <span className="body-text-bold">logical thinking</span>, and the{' '}
            <span className="body-text-bold">engineering confidence</span>{' '}
            young people need to shape the future.
          </p>
        </div>

        <div className="mt-8 text-left">
          <button
            onClick={onLearnMore}
            className="btn-primary inline-flex items-center gap-2"
            type="button"
            aria-label="Learn more about STEMelix"
          >
            Learn More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      className="relative w-full flex justify-center items-center py-20 px-6 bg-[#f5f7fa]"
      role="region"
      aria-labelledby="about-us-heading"
    >
      <div className="w-full max-w-6xl">
        <ContentSection onLearnMore={handleLearnMore} />
      </div>
    </section>
  );
};

export default AnimatedSection;



// Globe with tagline component - simplified
// const GlobeSection = () => (
//   <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
//     {/* Globe background */}
//     <div className="
//       w-80 h-40 
//       sm:w-[420px] sm:h-48 
//       md:w-[500px] md:h-[250px] 
//       lg:w-[560px] lg:h-[280px]
//       bg-gradient-to-b from-[#d6d3cc] via-[#d6d3cc] to-[#f9f8f5] 
//       rounded-t-full 
//       pointer-events-none
//       relative
//     ">
//       {/* Centered tagline */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <svg 
//           viewBox="0 0 400 200" 
//           className="w-full h-full max-w-[350px] max-h-[175px]"
//           role="img" 
//           aria-label="Cast, Craft, Create tagline"
//         >
//           <defs>
//             <path
//               id="tagline-curve"
//               d="M 75 125 A 125 125 0 0 1 325 125"
//               fill="transparent"
//             />
//           </defs>
//           <text 
//             fill="#333" 
//             fontSize="18" 
//             fontWeight="600" 
//             textAnchor="middle"
//             className="sm:text-xl md:text-2xl"
//           >
//             <textPath href="#tagline-curve" startOffset="50%">
//               Cast | Craft | Create
//             </textPath>
//           </text>
//         </svg>
//       </div>
//     </div>
//   </div>
// );

// Main component - no Framer Motion
