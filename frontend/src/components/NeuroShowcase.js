import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import component1 from "../assets/makingrobot.jpg";
import project2 from "../assets/project2.jpg";
import project from "../assets/projectcamera.jpg";

const NeuroShowcase = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects = [
    {
      id: 1,
      title: "Smart Racing Car",
      description: "Your first step into autonomous vehicles - build a car that drives itself!",
      skills: ["Arduino", "Sensors", "Motor Control"],
      image: car1
    },
    {
      id: 2,
      title: "RC Robot Vehicle",
      description: "A Remote-Controlled robot which avoids obstacles",
      skills: ["Robotics", "Wireless Control", "Camera Systems"],
      image: car2
    },
    {
      id: 3,
      title: "Robot Companion",
      description: "Build a friendly robot having lively interactions",
      
      
      skills: ["AI", "Voice Recognition", "Machine Learning"],
      image: component1
    },
    {
      id: 4,
      title: "Explorer Robot",
      description: "Create a robot that maps unknown territories and avoids obstacles",
     
      
      skills: ["Navigation", "Mapping", "Sensors"],
      image: project2
    },
    {
      id: 5,
      title: "Smart Camera System",
      description: "Build an intelligent security system that recognizes faces and objects",
      
      
      skills: ["Computer Vision", "AI", "IoT"],
      image: project
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-button)]/5 via-transparent to-[var(--color-button)]/5"></div>
      
      <style>
        {`
          .carousel-3d {
            perspective: 800px;
            transform-style: preserve-3d;
          }
          
          .carousel-item {
            transform-style: preserve-3d;
            transition: all 0.6s ease-out;
          }
          
          /* Desktop positioning */
          @media (min-width: 1024px) {
            .carousel-item-0 { transform: translateZ(300px) rotateY(0deg); opacity: 1; z-index: 10; }
            .carousel-item-1 { transform: translateZ(150px) translateX(280px) rotateY(35deg); opacity: 0.8; z-index: 5; }
            .carousel-item-2 { transform: translateZ(0px) translateX(400px) rotateY(70deg); opacity: 0.5; z-index: 1; }
            .carousel-item--1 { transform: translateZ(150px) translateX(-280px) rotateY(-35deg); opacity: 0.8; z-index: 5; }
            .carousel-item--2 { transform: translateZ(0px) translateX(-400px) rotateY(-70deg); opacity: 0.5; z-index: 1; }
          }
          
          /* Tablet positioning */
          @media (min-width: 768px) and (max-width: 1023px) {
            .carousel-item-0 { transform: translateZ(200px) rotateY(0deg); opacity: 1; z-index: 10; }
            .carousel-item-1 { transform: translateZ(100px) translateX(200px) rotateY(30deg); opacity: 0.7; z-index: 5; }
            .carousel-item--1 { transform: translateZ(100px) translateX(-200px) rotateY(-30deg); opacity: 0.7; z-index: 5; }
            .carousel-item-2, .carousel-item--2 { transform: translateZ(-100px) rotateY(90deg); opacity: 0; z-index: 0; }
          }
          
          /* Mobile positioning - simplified */
          @media (max-width: 767px) {
            .carousel-item-0 { transform: translateZ(100px) rotateY(0deg); opacity: 1; z-index: 10; }
            .carousel-item-1 { transform: translateZ(50px) translateX(120px) rotateY(20deg); opacity: 0.6; z-index: 5; }
            .carousel-item--1 { transform: translateZ(50px) translateX(-120px) rotateY(-20deg); opacity: 0.6; z-index: 5; }
            .carousel-item-2, .carousel-item--2 { transform: translateZ(-50px) rotateY(60deg); opacity: 0; z-index: 0; }
          }
          
          .carousel-item-hidden {
            transform: translateZ(-200px) rotateY(180deg);
            opacity: 0;
            z-index: 0;
          }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ac6cf4]5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-12 lg:mb-16">
          <h4 className="text-[var(--color-button)] font-medium mb-2">
            Our Projects
          </h4>
          <div className="max-w-3xl">
            <h2 className="headline-1 mb-6">
              A Glimpse into the World of 
              <span className="text-[#ac6cf4]"> STEM Creation</span>
            </h2>
            <p className="body-text text-lg sm:text-xl leading-relaxed">
              Explore the fun side of STEM! Build, code, and create projects like smart cars and AI robots — and experience how technology turns imagination into action.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] sm:h-[480px] lg:h-[600px] mb-12 lg:mb-16">
          <div className="carousel-3d h-full flex items-center justify-center">
            {projects.map((project, index) => {
              let position = index - currentSlide;
              if (position > 2) position -= projects.length;
              if (position < -2) position += projects.length;
              
              let positionClass = 'carousel-item-hidden';
              if (position === 0) positionClass = 'carousel-item-0';
              else if (position === 1) positionClass = 'carousel-item-1';
              else if (position === 2) positionClass = 'carousel-item-2';
              else if (position === -1) positionClass = 'carousel-item--1';
              else if (position === -2) positionClass = 'carousel-item--2';
              
              return (
                <div
                  key={project.id}
                  className={`carousel-item ${positionClass} absolute w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 cursor-pointer`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="card relative w-full h-full overflow-hidden">
                    <div className="absolute inset-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[[#ac6cf4]]/95 via-[var(--color-button)]/60 to-[var(--color-button)]/20"></div>
                    </div>
                    
                    <div className="relative z-10 p-4 sm:p-5 lg:p-6 h-full flex flex-col justify-between text-[var(--color-background)]">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs sm:text-sm font-[var(--font-body)] font-medium">{project.level}</span>
                          <span className="text-xs opacity-90">{project.age}</span>
                        </div>
                        
                        <h3 className="font-[var(--font-headlines)] text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3 leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="font-[var(--font-body)] text-xs sm:text-sm opacity-90 mb-3 lg:mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {position === 0 && (
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {project.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="px-2 py-1 bg-[#ac6cf4]/20 text-white rounded text-xs font-medium border border-[#ac6cf4]/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white rounded-full hover:bg-[var(--color-button-hover)] transition-all duration-300 shadow-md"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[var(--color-background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white rounded-full hover:bg-[var(--color-button-hover)] transition-all duration-300 shadow-md"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[var(--color-background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-1 sm:space-x-1.5 lg:space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#ac6cf4] scale-110' 
                    : 'bg-[#ac6cf4]/30 hover:bg-[#ac6cf4]/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hidden sm:block absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 z-30 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
        </div>

      
      </div>
    </section>
  );
};

export default NeuroShowcase;