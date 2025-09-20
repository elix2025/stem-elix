import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Explorer from "../assets/explorer.png";
import Master from "../assets/Master.png";
import Junior from "../assets/junior.png";
import Star from "../assets/star.webp";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    // Direct routing based on course title
    switch (course.title.toLowerCase()) {
      case 'junior':
        navigate('/coursejunior');
        break;
      case 'explorer':
        navigate('/coursexplorer');
        break;
      case 'master':
        navigate('/coursemaster');
        break;
      default:
        navigate('/courses');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      tabIndex={0}
      className={`group relative h-[350px] bg-white rounded-2xl shadow-lg hover:shadow-2xl 
        border border-primary-blue/10 hover:border-primary-blue/30
        transition-all duration-300 cursor-pointer overflow-hidden
        hover:scale-105 hover:-translate-y-2`}
    >
      <div className={`relative w-full h-full transition-transform duration-500 ${
        isFlipped ? 'rotate-y-180' : ''
      }`} style={{ transformStyle: "preserve-3d" }}>
        
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden"
             style={{ backfaceVisibility: "hidden" }}>
          <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-primary-blue/10 p-8 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-blue/10 via-cyan/5 to-primary-blue/10 
                rounded-3xl flex items-center justify-center transition-all duration-500">
                <img src={course.image} alt={course.title} className="w-12 h-12" />
              </div>
            </div>

            <h3 className="text-charcoal font-bold text-xl md:text-2xl text-center mb-4">
              {course.title}
            </h3>

            <span className="px-4 py-2 bg-gradient-to-r from-primary-blue/10 to-cyan/10 
              text-primary-blue text-sm font-semibold rounded-full">
              Level: {course.level}
            </span>
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden"
             style={{ 
               backfaceVisibility: 'hidden',
               transform: 'rotateY(180deg)'
             }}>
          <div className="w-full h-full bg-gradient-to-br from-primary-blue to-cyan rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
            <h3 className="text-white font-bold text-xl md:text-2xl text-center mb-4">
              {course.title} Course
            </h3>
            <p className="text-white/90 text-center mb-6">
              Click to explore the {course.title} curriculum and start your learning journey!
            </p>
            <button className="px-6 py-3 bg-white text-primary-blue rounded-full font-semibold 
              hover:bg-opacity-90 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TinkrionShowcase() {
  const courses = [
    { id: 1, title: "Junior", level: "Beginner", image: Junior, path: 'coursejunior' },
    { id: 2, title: "Explorer", level: "Intermediate", image: Explorer, path: 'courseexplorer' },
    { id: 3, title: "Master", level: "Advanced", image: Master, path: 'coursemaster' },
  ];

  return (
    <div className="w-full section-padding bg-[#f9f8f5] relative overflow-hidden">
      {/* Static Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 w-full px-4 md:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm
            border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <span>Explore Our Courses</span>
          </div>

          <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-8">
            {/* <img
              src={Star}
              alt="Robot Icon"
              className="inline-block ml-2 mr-4 w-12 h-12 -mt-2"
            /> */}
            <span className="text-black font-Dan sans bg-black bg-clip-text text-transparent">
              Tinkrion
            </span>
          </h2>
          
          <h4 className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-3xl mx-auto leading-relaxed">
           By STEMElix Introduces students to the exciting world of Robotics, Coding and Electronics.
          </h4>

          <p className="text-charcoal/80 text-xl md:text-2xl px-2 max-w-3xl mx-auto leading-relaxed">
            Choose your{" "}
            <span className="text-primary-blue font-semibold">learning path</span>{" "}-Junior, Explorer, or Master-
            and embark on an exciting journey of problem-solving and future powered by curiosity.
          </p>
        </div>

        {/* Simple 3-Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}