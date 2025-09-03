import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

import { useAPI } from "../context/api";
import Hero from "../components/Hero";
import TinkrionShowcase from "../components/coursecard";
import NeuroShowcase from "../components/NeuroShowcase";
import ShowCaseProjects from "../components/ShowCaseProjects";

const Home = () => {
  const { currentUser } = useAPI();
  const navigate = useNavigate();

  const neuroRef = useRef(null);
  const [neuroVisible, setNeuroVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setNeuroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (neuroRef.current) io.observe(neuroRef.current);
    return () => io.disconnect();
  }, []);

  const handleEnrollNow = () => {
    if (currentUser) navigate("/courses");
    else navigate("/login");
  };

  return (
    <div className="home-page bg-white text-slate-900">
      {/* HERO */}
      <Hero handleEnrollNow={handleEnrollNow} />

      {/* FEATURES — white chips with purple accents */}
      <section className="relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: AiOutlineFundProjectionScreen, label: "Interactive Learning" },
              { icon: GrUserExpert, label: "Expert Instructors" },
              { icon: LiaProjectDiagramSolid, label: "Hands-on Projects" },
              { icon: MdOutlineSupportAgent, label: "24/7 Support" },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-3xl
                           bg-white border border-gray-200 text-slate-800
                           hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <Icon className="w-[22px] h-[22px] text-purple-600" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TINKRION SHOWCASE - FULL WIDTH */}
      <TinkrionShowcase />

      {/* NEURO SHOWCASE (fade-in) */}
      <section
        ref={neuroRef}
        className={`relative bg-white transition-all duration-500 ${
          neuroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <NeuroShowcase />
        </div>
      </section>

      {/* BACK-TO-SCHOOL — dark band with purple accents */}
      <section className="relative bg-gradient-to-br from-slate-900 to-gray-900">
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-purple-400 to-fuchsia-400">
              🎒 Our Back-to-School Program
            </span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-12">
            We partner with schools to bring hands-on, future-ready learning that bridges classroom theory with real-world skills.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🏫", t: "Partnering with Schools", d: "Technology-driven, hands-on programs for every grade." },
              { icon: "💡", t: "Future-Ready Skills", d: "STEM, AI, Robotics to spark creativity and innovation." },
              { icon: "🤝", t: "Empowering Educators", d: "Modern tools and methods to boost engagement." },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6
                           backdrop-blur-sm shadow-xl text-left"
              >
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{c.t}</h3>
                <p className="text-slate-300">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className=" transition-all duration-500">
        <ShowCaseProjects/>
      </section>
    </div>
  );
};

export default Home;
