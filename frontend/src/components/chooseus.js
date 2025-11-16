import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ feature, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100
        transition-all duration-700 cursor-pointer overflow-hidden
        transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }
        hover:scale-105 hover:-translate-y-2`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div className="relative z-10">
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ac6cf4] to-purple-600 rounded-2xl transform rotate-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-[#ac6cf4] to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {feature.icon}
          </div>
          {/* Pulse Animation */}
          <div className="absolute inset-0 border-2 border-[#ac6cf4]/30 rounded-2xl animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {feature.description}
        </p>

        {/* Features List */}
        <div className="space-y-3">
          {feature.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center space-x-3 group/benefit">
              <div className="w-2 h-2 bg-gradient-to-r from-[#ac6cf4] to-purple-600 rounded-full group-hover/benefit:scale-150 transition-transform duration-300"></div>
              <span className="text-sm text-gray-600 group-hover/benefit:text-gray-800 transition-colors duration-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Curriculum Aligned with National Policies",
      description: "Our STEM programs are meticulously designed to align with NEP 2020 guidelines and NITI Aayog's vision, ensuring your child receives education that's both innovative and nationally recognized.",
      benefits: [
        "NEP 2020 compliant curriculum",
        "Future-ready skill development",
        "Industry-aligned learning outcomes",
        "Global standards with local relevance"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Expert Mentors & Industry Professionals",
      description: "Learn from certified educators and industry experts who bring real-world experience into the classroom, providing mentorship that goes beyond textbooks.",
      benefits: [
        "Certified STEM educators",
        "Industry professionals as mentors",
        "1:1 personalized guidance",
        "Career counseling sessions"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Project-Based Learning Approach",
      description: "We believe in learning by doing. Our hands-on project-based approach ensures students apply theoretical concepts to build real, working projects.",
      benefits: [
        "Hands-on project development",
        "Real-world problem solving",
        "Portfolio building projects",
        "Industry tool exposure"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Safe & Secure Learning Environment",
      description: "Your child's safety is our priority. We provide a moderated platform with secure interactions and parental controls.",
      benefits: [
       
        "Secure video sessions",
        "Parental monitoring tools",
        "Moderated community interactions"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Comprehensive Progress Tracking",
      description: "Track your child's growth with detailed analytics, regular progress reports, and personalized feedback from mentors.",
      benefits: [
        "Real-time progress dashboard",
        "Skill mastery tracking",
        "Personalized learning paths",
        "Regular performance reports"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Certification & Recognition",
      description: "Earn industry-recognized certificates and showcase projects in our student gallery, building a strong portfolio for future opportunities.",
      benefits: [
        "Industry-recognized certificates",
        "Project showcase opportunities",
        "Competition participation",
        "Portfolio development support"
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ac6cf4]/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[#ac6cf4] font-semibold text-sm mb-6 shadow-lg border border-blue-100">
            🏆 Why STEMelix Stands Out
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ac6cf4] to-purple-600">Excellence</span> in STEM Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another STEM platform. We're a comprehensive learning ecosystem designed to 
            nurture young innovators with the right blend of technology, mentorship, and real-world experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Child's Learning Journey?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of parents who trust STEMelix for their child's STEM education. 
              Start with a free demo session and see the difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-[#ac6cf4] to-purple-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Book Free Demo Session
              </button> 
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/STEMelix 2nd to 12th Grade Brochure .pdf';
                  link.download = 'STEMelix-Curriculum-Brochure.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#ac6cf4] flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;