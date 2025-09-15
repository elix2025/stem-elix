import React from "react";
import { motion } from "framer-motion";
// import kitImg from "../assets/stemkit-box.png"; // Replace with actual kit image
// import circuitImg from "../assets/circuit.png"; // Replace with actual project images
// import robotImg from "../assets/robot.png";
// import machineImg from "../assets/machine.png";
// import diyImg from "../assets/diy.png";

const StemKitsPage = () => {
  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-purple-50 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              STEM Kits That Bring Ideas to Life
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Hands-on projects combining electronics, mechanics, and creativity —
              designed to nurture curiosity, problem-solving, and innovation in
              every child.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href="#kits"
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                Explore Our Kits
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            {/* <img
            //   src={}
              alt="STEM Kit"
              className="w-80 h-auto drop-shadow-xl"
            /> */}
          </div>
        </div>
      </section>

      {/* Kit Components */}
      <section id="kits" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            A Complete Learning Experience in Every Box
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Each STEM-Elix Kit is thoughtfully curated with high-quality
            components and engaging guides to make learning fun and effective.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Electronics Essentials", desc: "Circuits, LEDs, sensors, motors, and switches." },
              { title: "Mechanical Parts", desc: "Gears, pulleys, levers, and structural pieces." },
              { title: "Experiment Guidebook", desc: "Illustrated step-by-step instructions for projects." },
              { title: "Video Tutorials", desc: "QR-accessible digital learning support." },
              { title: "Creative Add-ons", desc: "Extra materials for custom designs and unique builds." },
              { title: "Safe & Durable", desc: "Child-friendly components built to last through experiments." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Learning by Building Real Projects
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            With every kit, children can transform concepts into working models.
            Each project is designed to be engaging, safe, and achievable —
            boosting both confidence and curiosity.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                // img: circuitImg,
                 title: "Electronic Circuits" },
              { 
              
                title: "Mini Robots" },
              {  
                title: "Simple Machines" },
              { 
                title: "Creative DIY Builds" },
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h4 className="text-lg font-semibold">{proj.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why STEM-Elix */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Learning That Lasts a Lifetime</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚀",
                text: "Future-ready skills — encourages critical thinking, creativity, and innovation.",
              },
              {
                icon: "🧠",
                text: "Curriculum-aligned — matches real STEM concepts taught in schools.",
              },
              {
                icon: "🏗",
                text: "Hands-on exploration — kids learn by doing, not memorizing.",
              },
              {
                icon: "👨‍👩‍👧",
                text: "Parent-approved — screen-free, safe, and designed for curious minds.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">See What Kids Can Create</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Real projects built by curious young minds using STEM-Elix Kits.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[].map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={img}
                  alt="STEM project"
                  className="w-full h-56 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 text-center bg-[#ac6cf4] to-[#ac6cf4] text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Turn Curiosity Into Creation
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          STEM-Elix Kits are more than toys — they are gateways to imagination,
          problem-solving, and innovation.
        </p>
       
      </section>
    </div>
  );
};

export default StemKitsPage;
