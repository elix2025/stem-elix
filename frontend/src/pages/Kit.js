import React, { useState } from "react";
import { motion } from "framer-motion";
import Img1 from "../assets/projectcamera.jpg";
import Img2 from "../assets/project2.jpg";
import Img3 from "../assets/kit1.jpg";
import Img4 from "../assets/kitbox3.jpg";
import Img8 from "../assets/kitbox2.jpg";
import img5 from "../assets/sensors.jpg";
import img6 from "../assets/car1.jpg";
import img7 from "../assets/car2.jpg";

// Add CSS to hide scrollbar
const hideScrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const StemKitsPage = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Add styles to document head
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = hideScrollbarStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const kitData = {
    components: [
      {
        title: " Microcontroller",
        description: "The brain of your projects - programmable controller with multiple I/O pins",
        features: ["Arduino Uno", "Arduino Mega 2560", "Raspberry Pi"],
        image: img5
      },
      {
        title: "Distance Sensing Alert System",
        description: "Detects obstacles and alerts users with visual and audio signals",
        features: ["Ultrasonic distance sensor", "Buzzer for alerts", "LED indicators"],
        image: Img2
      },
      // {
      //   title: "Servo Motors",
      //   description: "Precision motors for movement and positioning in robotics projects",
      //   features: ["180° rotation control", "High torque", "Easy integration"],
      //   image: Img2
      // },
      {
        title: "Sensors Kit",
        description: "Complete sensor collection for environmental monitoring and interaction",
        features: ["Temperature sensor", "Light sensor", "Motion detector", "Sound sensor"],
        image: Img8
      },
      {
        title: "Breadboards & Wires",
        description: "Essential prototyping tools for circuit building without soldering",
        features: ["Reusable connections", "Color-coded wires", "Multiple sizes"],
        image: Img3
      },
      {
        title: "Electronic Components",
        description: "Resistors, capacitors, LEDs, buttons, and other essential electronics",
        features: ["Assorted resistors", "Push buttons", "Colorful LEDs", "Buzzers"],
        image: Img4
      }
    ],
    // Projects section removed for simplified UI
  };

  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                STEMelix Learning Kits
              </h1>
              <p className="text-xl text-slate-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Transform curiosity into innovation with our comprehensive STEM kits. 
                Each kit contains real components, detailed guides, and exciting projects 
                that bring learning to life.
              </p>
            </motion.div>
          </div>

          {/* Kit Overview Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "🔧",
                title: "Real Components",
                description: "Industry-standard electronics and mechanical parts used by professionals"
              },
              {
                icon: "📚",
                title: "Guided Learning",
                description: "Step-by-step tutorials with video support and detailed explanations"
              },
              {
                icon: "🚀",
                title: "Hands-on Projects",
                description: "Build working prototypes and functional devices that solve real problems"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              >
                {/* <div className="text-4xl mb-4">{item.icon}</div> */}
                <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Kit Explorer */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Explore What's Inside Each Kit
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional-grade components and real-world projects designed to challenge and inspire
            </p>
          </div>

          {/* Components Carousel */}
          <div className="relative overflow-hidden">
            {/* Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => {
                  const container = document.querySelector('.components-scroll');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all"
              >
                <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => {
                  const container = document.querySelector('.components-scroll');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="p-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all"
              >
                <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Scrolling Container */}
            <div 
              className="components-scroll relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex gap-8 px-4 pb-4">
                {/* First set of components for infinite scroll effect */}
                {kitData.components.map((component, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex-none w-[300px] snap-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={component.image}
                        alt={component.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{component.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{component.description}</p>
                    <div className="space-y-2">
                      {component.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
                {/* Duplicate components for seamless loop */}
                {kitData.components.map((component, idx) => (
                  <motion.div
                    key={`dup-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex-none w-[300px] snap-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={component.image}
                        alt={component.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{component.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{component.description}</p>
                    <div className="space-y-2">
                      {component.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Skills That Shape the Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every project builds essential 21st-century skills through hands-on experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💡",
                title: "Critical Thinking",
                description: "Analyze problems, evaluate solutions, and make informed decisions",
                skills: ["Problem decomposition", "Logic reasoning", "Solution optimization"]
              },
              {
                icon: "🔬",
                title: "Scientific Method",
                description: "Hypothesis formation, experimentation, and data analysis",
                skills: ["Observation skills", "Data collection", "Result interpretation"]
              },
              {
                icon: "⚙️",
                title: "Engineering Design",
                description: "Design thinking, prototyping, and iterative improvement",
                skills: ["CAD basics", "Prototyping", "Design iteration"]
              },
            
            ].map((outcome, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl group-hover:shadow-lg transition-shadow duration-300">
                  {outcome.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{outcome.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{outcome.description}</p>
                <div className="space-y-1">
                  {outcome.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="text-sm text-indigo-600 font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit Specifications */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Complete Kit Specifications
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to start building, learning, and creating
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { category: "Electronics", count: "50+", items: ["Microcontroller", "Sensors", "LEDs", "Motors"] },
                    { category: "Tools", count: "15+", items: ["Breadboards", "Wires", "Screwdrivers", "Multimeter"] },
                    { category: "Materials", count: "20+", items: ["Chassis parts", "Screws", "Adhesives", "Batteries"] },
                    { category: "Guides", count: "6+", items: ["Project booklets", "Video tutorials", "Quick reference", "Safety guide"] }
                  ].map((category, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-400 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-slate-800">{category.category}</h4>
                        {/* <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {category.count} items
                        </span> */}
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center">
                            <span className="w-1 h-1 bg-slate-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Age & Skill Levels</h3>
                <div className="space-y-4">
                  {[
                    { level: "Starter (Ages 8-10)", description: "Basic electronics and simple programming", projects: "4-6 projects" },
                    { level: "Builder (Ages 11-13)", description: "Intermediate circuits and sensor integration", projects: "8-12 projects" },
                    { level: "Creator (Ages 14+)", description: "Advanced programming and custom designs", projects: "15+ projects" }
                  ].map((level, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 mb-1">{level.level}</h4>
                        <p className="text-slate-600 mb-2">{level.description}</p>
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                          {level.projects}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Safety & Quality</h3>
                <div className="space-y-6">
                  {[
                    { 
                      title: "CE Certified Components", 
                      description: "All electronic parts meet international safety standards",
                      icon: "✅" 
                    },
                    { 
                      title: "Child-Safe Materials", 
                      description: "Non-toxic plastics and rounded edges on all components",
                      icon: "🛡️" 
                    },
                    { 
                      title: "Low Voltage Design", 
                      description: "All circuits operate at safe 5V DC with battery protection",
                      icon: "⚡" 
                    },
                    { 
                      title: "Quality Assurance", 
                      description: "Each kit tested and inspected before shipping",
                      icon: "🔍" 
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{feature.title}</h4>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Transform Curiosity Into Innovation
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Give your child the tools to build tomorrow's technology today. 
              STEMelix kits combine fun with learning to create unforgettable educational experiences.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-50 transition-colors duration-300">
                Order Kit Now - ₹2,999
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-colors duration-300">
                Download Sample Projects
              </button>
            </div> */}
            {/* <p className="mt-6 text-sm opacity-75">
              ✅ Free shipping nationwide • 🔄 30-day money-back guarantee • 🎁 Bonus project ideas included
            </p> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StemKitsPage;