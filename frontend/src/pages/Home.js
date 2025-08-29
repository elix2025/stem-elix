import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import NeuroShowcase from "../components/NeuroShowcase";
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { GrUserExpert } from "react-icons/gr";
import TinkrionShowcase from "../components/coursecard";

const Home = () => {
  const neuroRef = useRef(null);
  const [neuroVisible, setNeuroVisible] = useState(false);
  const { currentUser } = require("../context/api").useAPI();

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
    if (currentUser) {
      navigate("/courses");
    } else {
      navigate("/login");
    }
  };

  // background color class 
const  bgClass="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 bg-gradient-to-r from-slate-600/20 to-teal-600/20"

  return (
    <div className= {`home-page `} >
      <Hero handleEnrollNow={handleEnrollNow} />

      {/* Features List */}
      <div className='w-[100vw] min-h-[90px] flex items-center justify-center 
              flex-wrap gap-4 md:mb-[50px]'>
        <div className='flex items-center justify-center gap-2 px-5
                py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          {/* <img className="w-[35px] h-[35px] fill-[#03394b]" src="../assets/learning.png"  /> */}
          <AiOutlineFundProjectionScreen className="w-[35px] h-[35px] fill-[#03394b]" /> Interactive Learning
        </div>


        <div className='flex items-center justify-center gap-2 px-5
                py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <GrUserExpert className="w-[35px] h-[35px] fill-[#03394b]" />Expert Instructors
        </div>


        <div className='flex items-center justify-center gap-2 px-5
                py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <LiaProjectDiagramSolid className="w-[35px] h-[35px] fill-[#03394b]" />Hands-on Projects
        </div>


        <div className='flex items-center justify-center gap-2 px-5
                py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <MdOutlineSupportAgent className="w-[35px] h-[35px] fill-[#03394b]" />24/7 Support
        </div>

      </div>

      <div>
        <TinkrionShowcase />
      </div>

      <div
        ref={neuroRef}
        className={`fade-in ${neuroVisible ? "visible" : ""}`}
      >
        <NeuroShowcase />
      </div>

      <section className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
            🎒 Our Back-to-School Program
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            We are proud to partner with leading schools to provide students with innovative learning experiences. Our goal is to bridge the gap between classroom education and real-world skills, making learning exciting, practical, and future-ready.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-blue-500 text-4xl mb-4">🏫</div>
              <h3 className="text-lg font-semibold mb-2">Partnering with Schools</h3>
              <p className="text-gray-500">
                Collaborating with top schools to bring technology-driven, hands-on learning programs for students of all grades.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-green-500 text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold mb-2">Future-Ready Skills</h3>
              <p className="text-gray-500">
                Introducing STEM, AI, Robotics, and problem-solving workshops designed to boost creativity and innovation among kids.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-yellow-500 text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Empowering Educators</h3>
              <p className="text-gray-500">
                Training teachers with modern teaching tools and methodologies to enhance student engagement and understanding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
