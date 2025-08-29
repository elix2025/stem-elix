import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAPI } from "../context/api";

gsap.registerPlugin(ScrollTrigger);

const CourseCard = ({ img, title }) => (
  <motion.div
    className="inline-block w-72 mr-24"
    initial={{ filter: "grayscale(100%)" }}
    whileInView={{ filter: "grayscale(0%)" }}
    transition={{ duration: 0.5 }}
    viewport={{ once: false, amount: "all" }}
     >
    <img
      src={img}
      alt={title}
      className="w-full h-auto rounded-xl shadow-lg cursor-pointer"
    />
    <h2 className="mt-4 text-xl font-semibold text-center">{title}</h2>
  </motion.div>
);


const TinkrionShowcase = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const leftRef = useRef(null);

  const { getAllCourses } = useAPI();
  const [showcaseCourses,setShowcaseCourses]=useState([]);
  
  // Dummy data
  const courses = [
    { img: "https://via.placeholder.com/400x300", title: "Junior" },
    { img: "https://via.placeholder.com/400x300", title: "Master" },
    { img: "https://via.placeholder.com/400x300", title: "Explorer" },
    { img: "https://via.placeholder.com/400x300", title: "Innovator" },
    { img: "https://via.placeholder.com/400x300", title: "Creator" },
  ];
  
  useEffect(()=>{
     const loadCourses=async()=>{
          try {
            
            const data=await getAllCourses();
            console.log("📦 Raw data received:", data);
            // Ensure data is an array
        
        setShowcaseCourses(data);
        
          } catch (error) {
             console.error("❌ Error loading courses:", error);
          }
     }
     loadCourses();
  },[])
  console.log("courses from home ",showcaseCourses)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const scroller = horizontalRef.current;

      // how far we need to move horizontally
      const getScrollAmount = () => {
        const leftW = leftRef.current?.offsetWidth || 0;       // fixed sidebar width
        const viewportW = window.innerWidth;
        const visibleRightArea = Math.max(0, viewportW - leftW);
        const maxX = scroller.scrollWidth - visibleRightArea;  // total overflow
        return Math.max(0, maxX);
      };

      // make the section tall enough to allow vertical scroll that maps to horizontal distance
      gsap.set(section, { height: () => `${window.innerHeight}px` });

      // main tween – function values mean it recalculates on refresh/resizes
      gsap.to(scroller, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`, // enough distance to complete the horizontal move
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          // If you use a custom scroll container (e.g., Locomotive), uncomment:
          // scroller: ".App",
        },
      });

      // ensure layout is correct once images load
      const imgs = Array.from(scroller.querySelectorAll("img"));
      const refresh = () => ScrollTrigger.refresh();
      imgs.forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", refresh, { once: true });
      });
      window.addEventListener("resize", refresh);

    }, sectionRef);

    return () => {
      ctx.revert(); // cleans timelines & ScrollTriggers created in this context
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex justify-start items-start overflow-hidden"
    >
      {/* Title */}
      <h1 className="absolute top-4 left-10 text-6xl font-bold z-10 text-gray-900">
        Tinkrion
      </h1>

      {/* Left Sidebar (fixed) */}
      <div
        ref={leftRef}
        className="w-1/3 min-h-screen fixed left-0 flex justify-center items-center bg-white text-black z-10 p-6"
      >
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-bold">Tinkrion</span> — our unique
          learning ecosystem designed for curious minds.
          <br />
          <br />
          Explore categories like{" "}
          <span className="font-semibold">Junior, Master, and Explorer</span>,
          each crafted to take you on an exciting STEM journey.
        </p>
      </div>

      {/* Horizontal strip */}
      <div
        ref={horizontalRef}
        className="absolute left-1/3 min-h-screen flex justify-start items-center pl-40 space-x-24 bg-gray-50"
       >
        {showcaseCourses.map((c, i) => <CourseCard key={i} img={c.CourseThumbnail} title={c.title} />
        )}
      </div>
    </section>
  );
};

export default TinkrionShowcase;
