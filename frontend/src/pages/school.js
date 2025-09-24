import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

/**
 * Replace these imports with your real assets.
 * e.g. import labPhoto1 from "../assets/lab1.jpg";
 */
import labPhoto1 from "../assets/machine.jpg";
import labPhoto2 from "../assets/component1.jpg";
import labPhoto3 from "../assets/star.webp";
// import kitImg from "../assets/stemkit-box.png";

const steps = [
  {
    title: "Needs Assessment & Vision",
    desc:
      "Stakeholder workshops with principals and teachers to define learning goals, space constraints and student outcomes.",
  },
  {
    title: "Space Planning & Design",
    desc:
      "Custom lab layouts, power & network planning, ergonomics and student workflow to maximize learning and safety.",
  },
  {
    title: "Infrastructure & Safety Prep",
    desc:
      "Electrical upgrades, grounding, ventilation, safe storage, emergency procedures and child-safe fixtures.",
  },
  {
    title: "Equipment Procurement & Kit Assembly",
    desc:
      "Quality robotics, electronics and mechanics kits, inventory labeling, and verified part lists for classroom durability.",
  },
  {
    title: "Furniture & Zone Setup",
    desc:
      "Modular workstations, collaborative zones, teacher demo area and secure storage—designed for project-based learning.",
  },
  {
    title: "Installation & Systems Integration",
    desc:
      "Mounting, network setup, device testing and integration with school systems for smooth classroom operation.",
  },
  {
    title: "Pilot Projects & Student Onboarding",
    desc:
      "Initial student projects and onboarding sessions to gather feedback and fine-tune learning sequences.",
  },
  {
    title: "Handover & Ongoing Support",
    desc:
      "Handover documentation, maintenance plans, spare parts, and remote/on-call support for sustained impact.",
  },
];

const teacherCourses = [
  {
    title: "Foundations of STEM Pedagogy",
    desc:
      "Active learning, assessment strategies, and scaffolding techniques to run effective hands-on lessons.",
  },
  {
    title: "Robotics & Electronics for Classrooms",
    desc:
      "Practical labs on circuits, microcontrollers, sensors and building reliable student projects.",
  },
  {
    title: "Project-Based Learning (PBL) Design",
    desc:
      "How to design meaningful PBL units, rubrics, and cross-disciplinary projects aligned to learning goals.",
  },
  {
    title: "Lab Safety & Management",
    desc:
      "Risk assessment, safe storage, incident response and classroom management for maker spaces.",
  },
  {
    title: "Assessment & Student Portfolios",
    desc:
      "Helping students document learning, build portfolios and demonstrate skills for higher education pathways.",
  },
];

export default function ForSchool () {
  const navigate = useNavigate();
  const planeRef = useRef(null);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  stepRefs.current = [];

  function addStepRef(el) {
    if (el && !stepRefs.current.includes(el)) stepRefs.current.push(el);
  }

  useLayoutEffect(() => {
    // Wait for layout to compute positions
    const ctx = gsap.context(() => {
      const plane = planeRef.current;
      const container = containerRef.current;
      if (!plane || !container || stepRefs.current.length === 0) return;

      // reset plane position
      gsap.set(plane, { x: 0, y: 0, rotation: 0 });

      // compute coordinates relative to container
      const containerRect = container.getBoundingClientRect();
      const positions = stepRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        // we aim for center of the step card
        return {
          x: r.left + r.width / 2 - containerRect.left - plane.offsetWidth / 2,
          y:
            r.top +
            r.height / 2 -
            containerRect.top -
            plane.offsetHeight / 2,
        };
      });

      // Timeline - fly through each step
      const tl = gsap.timeline({ defaults: { duration: 1.1, ease: "power2.inOut" } });

      positions.forEach((pos, i) => {
        // rotate slightly forward/back while moving
        tl.to(plane, { x: pos.x, y: pos.y, rotation: i % 2 === 0 ? 10 : -6 });
      });

      // a subtle hover/float loop after reaching last step
      tl.to(plane, { rotation: 0, y: `+=-6`, duration: 0.8 });
      tl.to(plane, { y: `+=6`, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" }, "+=0.2");

      // cleanup
      return () => {
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <header className="bg-gradient-to-br from-indigo-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              STEM Lab Design & Installation for Schools
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl">
              End-to-end STEM Lab solutions for schools and institutes — from design
              and safety planning to equipment, installation and teacher training.
              Create future-ready classrooms where students learn by building and discovering.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("installation-timeline")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                aria-label="See installation steps"
              >
                View Installation Steps
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                aria-label="Contact us to partner"
              >
                Become a Learning Partner
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
            //   src={kitImg}
              alt="STEM Kits and Lab"
              className="w-64 sm:w-72 lg:w-80 rounded-xl shadow-lg object-contain"
            />
          </div>
        </div>
      </header>

      {/* Overview / Why Build a Lab */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Why Build a STEM Lab?</h2>
            <p className="text-slate-700 mb-4">
              A dedicated STEM Lab transforms passive learning into active discovery.
              By combining hands-on robotics, electronics and mechanical projects,
              schools can nurture critical thinking, collaboration and design skills.
              Our approach is curriculum-aligned, safe and adaptable to any school size.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <div>
                  <div className="font-semibold">Project-Based Learning</div>
                  <div className="text-sm">Real projects that reinforce concepts taught in class.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <div>
                  <div className="font-semibold">Curriculum-Aligned</div>
                  <div className="text-sm">Designed to complement school syllabi and learning outcomes.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <div>
                  <div className="font-semibold">Operational Safety</div>
                  <div className="text-sm">Practical safety systems and guidelines for every lab activity.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <div>
                  <div className="font-semibold">Sustainability</div>
                  <div className="text-sm">Maintenance plans and spare parts for long-term use.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img src={labPhoto1} alt="STEM Lab classroom setup" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Installation Timeline with paper plane motif */}
      <section id="installation-timeline" className="py-8 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Step-by-Step STEM Lab Installation</h3>

          {/* Container for plane + steps */}
          <div ref={containerRef} className="relative bg-white rounded-2xl p-6 md:p-10 shadow-sm overflow-visible">
            {/* absolute paper plane element */}
            <div
              ref={planeRef}
              aria-hidden
              className="pointer-events-none absolute w-10 h-10 md:w-12 md:h-12"
              style={{ transform: "translate(0,0)" }}
            >
              {/* Simple inline SVG of a paper plane */}
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M2 12l20-8-8 20-3-7-9-5z" fill="#6366F1" />
              </svg>
            </div>

            {/* Horizontal timeline (desktop) and vertical (mobile). We'll render steps with flex and let Tailwind handle wrapping. */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
              {/* Left column: textual intro */}
              <div className="lg:w-1/3">
                <p className="text-slate-700">
                  Our proven installation process ensures your STEM Lab is safe, effective and ready for teaching.
                  Watch the paper plane move through each phase — each step includes detailed planning and school-ready documentation.
                </p>
              </div>

              {/* Center timeline steps */}
              <div className="lg:w-2/3">
                <div className="flex flex-col lg:flex-row lg:space-x-6 items-stretch">
                  {steps.map((step, idx) => (
                    <article
                      key={idx}
                      ref={addStepRef}
                      className="flex-1 bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition relative"
                      aria-labelledby={`step-title-${idx}`}
                      role="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-none">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold shadow">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h4 id={`step-title-${idx}`} className="font-semibold text-slate-900">
                            {step.title}
                          </h4>
                          <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                        </div>
                      </div>

                      {/* small connector line for large screens */}
                      <div
                        aria-hidden
                        className={`hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-slate-200 ${idx === steps.length - 1 ? "opacity-0" : ""}`}
                        style={{ transform: "translateY(-50%)" }}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* small accessibility text */}
            <div className="mt-6 text-xs text-slate-500">Tip: This visual outlines the typical sequence we follow when building a STEM lab.</div>
          </div>
        </div>
      </section>

      {/* Teacher Training Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold">Teacher Training & Curriculum Support</h3>
            <p className="text-slate-700 max-w-2xl mx-auto mt-2">
              Empowering teachers to run hands-on STEM classes with confidence. Our courses combine pedagogy, practical labs and classroom management techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {teacherCourses.map((c, i) => (
                <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                  <h4 className="font-semibold text-slate-900">{c.title}</h4>
                  <p className="text-sm text-slate-600 mt-2">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* visual / outcome box */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold mb-2">Training Outcomes</h4>
                <ul className="text-sm space-y-2">
                  <li>• Confident facilitation of hands-on STEM lessons</li>
                  <li>• Ability to scaffold student projects effectively</li>
                  <li>• Assessment & portfolio-building skills for students</li>
                </ul>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-5 py-3 bg-white text-indigo-700 rounded-lg font-semibold"
                >
                  Arrange Teacher Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">STEM Labs We've Built</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="rounded-xl overflow-hidden shadow">
              <img src={labPhoto1} alt="STEM Lab 1" className="w-full h-56 object-cover" />
              <figcaption className="p-4 text-sm text-slate-700">Collaborative robotics zone with student workstations.</figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden shadow">
              <img src={labPhoto2} alt="STEM Lab 2" className="w-full h-56 object-cover" />
              <figcaption className="p-4 text-sm text-slate-700">Electronics bench and safe storage for components.</figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden shadow">
              <img src={labPhoto3} alt="STEM Lab 3" className="w-full h-56 object-cover" />
              <figcaption className="p-4 text-sm text-slate-700">Student showcases and portfolio display area.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Final CTA - Become Our Learning Partner */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-10 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Partner with STEMelix to Build a Future-Ready Lab</h3>
          <p className="mb-6 text-slate-100 max-w-2xl mx-auto">
            Join hands with us to design, equip and operate a STEM Lab that fits your school’s objectives.
            We provide full project management, teacher training, and ongoing technical support.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-white text-indigo-700 rounded-md font-semibold shadow"
            >
              Become a Learning Partner
            </button>
            <button
              onClick={() => document.getElementById("installation-timeline")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold shadow"
            >
              View Installation Steps
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} STEMelix — STEM Labs, Teacher Training & Ongoing Support
      </footer>
    </main>
  );
}
