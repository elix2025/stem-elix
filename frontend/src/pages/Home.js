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
import LandingSection from "../components/labs";
import AnimatedSection from "../components/animatedicon";

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
    <div className="home-page bg-[#f9f8f5] text-slate-900">
      {/* HERO */}
      <Hero handleEnrollNow={handleEnrollNow} />

      {/* FEATURES — white chips with brand purple accents */}
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
                           hover:border-[#ac6cf4] hover:bg-[#ac6cf4]/10 transition"
              >
                <Icon className="w-[22px] h-[22px] text-[#ac6cf4]" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TINKRION SHOWCASE - FULL WIDTH */}
      <TinkrionShowcase />

<section >
<AnimatedSection/>
</section>


      <section>
        <LandingSection />
      </section>

      {/* NEURO SHOWCASE (fade-in) */}
      <section
        ref={neuroRef}
        className={`relative bg-none transition-all duration-500 ${
          neuroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <NeuroShowcase />
        </div>
      </section>

      
      <section className=" transition-all duration-500">
        <ShowCaseProjects/>
      </section>
    </div>
  );
};

export default Home;