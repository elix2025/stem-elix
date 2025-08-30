import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAPI } from "../context/api";

/* ===== Small Card (subtle pop on enter/hover) ===== */
const CourseCard = ({ img, title }) => (
  <motion.div
    className="flex-shrink-0 snap-center
               min-w-[88%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[40%]"
    initial={{ opacity: 0, y: 10, scale: 1, filter: "grayscale(100%)" }}
    whileInView={{ opacity: 1, y: 0, scale: 1.02, filter: "grayscale(0%)" }}
    whileHover={{ scale: 1.04 }}
    viewport={{ amount: 0.45, once: false }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
      <img
        src={img}
        alt={title}
        loading="lazy"
        draggable="false"
        className="w-full h-56 md:h-64 object-cover select-none"
        onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
      />
      <div className="p-5">
        <h3 className="text-white font-semibold text-center text-base md:text-lg">
          {title}
        </h3>
      </div>
    </div>
  </motion.div>
);

/* ===== Showcase (row-wise, simple, no hijack) ===== */
export default function TinkrionShowcase() {
  const { getAllCourses } = useAPI();
  const [courses, setCourses] = useState([]);

  const stripRef = useRef(null);

  // Fetch & normalize
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllCourses();
        const list =
          Array.isArray(res) ? res :
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.courses) ? res.courses :
          Array.isArray(res?.data?.courses) ? res.data.courses : [];
        if (!cancelled) setCourses(list);
      } catch (e) {
        console.error("❌ load courses failed:", e);
      }
    })();
    return () => { cancelled = true; };
  }, [getAllCourses]);

  // Wheel → horizontal ONLY when hovering slider
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    let hovering = false;
    const enter = () => (hovering = true);
    const leave = () => (hovering = false);
    const onWheel = (e) => {
      if (!hovering) return;                 // page scroll as usual
      if (e.deltaY === 0) return;

      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth && e.deltaY > 0;
      if (atStart || atEnd) return;          // let page scroll at edges

      e.preventDefault();                    // IMPORTANT: needs passive:false
      el.scrollLeft += e.deltaY * 1;         // map vertical wheel → horizontal
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Helpers
  const resolveImg = (c) => {
    const raw = c.courseThumbnail || c.CourseThumbnail || c.thumbnail || c.image || c.imageUrl;
    if (!raw) return "/fallback.jpg";
    return String(raw).startsWith("http")
      ? raw
      : `${import.meta.env?.VITE_API_URL || ""}${raw}`;
  };
  const resolveTitle = (c) => c.title || c.name || c.courseTitle || "Course";

  // Chevrons (tap-friendly for mobile)
  const scrollByAmount = (dir = 1) => {
    const el = stripRef.current;
    if (!el) return;
    const amt = Math.max(240, Math.floor(el.clientWidth * 0.9)); // ~1 viewport
    el.scrollBy({ left: dir * amt, behavior: "smooth" });
  };

  // Hide scrollbars (scoped CSS)
  // If you prefer global, move this to globals.css
  const NoScrollbarStyle = () => (
    <style>{`
      .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
    `}</style>
  );

  const list = courses.length
    ? courses
    : [
        { title: "Junior", imageUrl: "https://via.placeholder.com/1200x800" },
        { title: "Master", imageUrl: "https://via.placeholder.com/1200x800" },
        { title: "Explorer", imageUrl: "https://via.placeholder.com/1200x800" },
        { title: "Innovator", imageUrl: "https://via.placeholder.com/1200x800" },
        { title: "Creator", imageUrl: "https://via.placeholder.com/1200x800" },
      ];

  return (
    <section className="relative">
      <NoScrollbarStyle />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Glass panel + border to break page continuity */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Row 1: Text (top) */}
          <div className="px-6 md:px-8 lg:px-10 pt-10">
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-teal-400 to-emerald-400">
                Tinkrion
              </span>
            </h2>
            <p className="text-slate-300 mt-3 max-w-3xl">
              Welcome to <span className="font-semibold">Tinkrion</span> — our unique
              learning ecosystem for curious minds. Explore{" "}
              <span className="font-semibold">Junior, Master, Explorer</span> and more
              tracks on your STEM journey.
            </p>
          </div>

          {/* Row 2: Slider (bottom) */}
          <div className="relative mt-6 pb-10">
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-slate-900/60 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-slate-900/60 to-transparent" />

            {/* Mobile chevrons (also usable on desktop) */}
            <button
              onClick={() => scrollByAmount(-1)}
              className="md:left-3 left-2 absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full
                         border border-white/20 bg-white/10 backdrop-blur text-white text-xl
                         flex items-center justify-center active:scale-95"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              className="md:right-3 right-2 absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full
                         border border-white/20 bg-white/10 backdrop-blur text-white text-xl
                         flex items-center justify-center active:scale-95"
              aria-label="Scroll right"
            >
              ›
            </button>

            {/* Strip */}
            <div
              ref={stripRef}
              className="mt-2 px-6 md:px-8 lg:px-10 flex gap-6 overflow-x-auto no-scrollbar
                         snap-x snap-mandatory scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {list.map((c, i) => (
                <CourseCard key={c._id || i} img={resolveImg(c) ?? c.imageUrl} title={resolveTitle(c)} />
              ))}
            </div>

            {/* Mobile hint */}
            <div className="px-6 md:px-8 lg:px-10 mt-3 text-xs text-slate-400 md:hidden">
              Tap chevrons or swipe to explore →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
