import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import NeuroShowcase from "../components/NeuroShowcase";
import StatsCard from "../components/StatsCard";

const Home = () => {
  const neuroRef = useRef(null);
  const [neuroVisible, setNeuroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNeuroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (neuroRef.current) observer.observe(neuroRef.current);
    return () => observer.disconnect();
  }, []);
  const navigate = useNavigate();

  const handleEnrollNow = () => {
    navigate("/register");
  };

  return (
    <div className="home-page">
      <Hero handleEnrollNow={handleEnrollNow} />
      <StatsCard />
      <div
        ref={neuroRef}
        className={`fade-in ${neuroVisible ? "visible" : ""}`}
      >
        <NeuroShowcase />
      </div>
    </div>
  );
};

export default Home;
