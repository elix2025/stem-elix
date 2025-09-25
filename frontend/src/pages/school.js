import React from "react";
import { useNavigate } from "react-router-dom";
// Using placeholder divs instead of images for now
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

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <header className="bg-gradient-to-br from-indigo-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              STEM Lab Design & Installation for Schools
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-700 max-w-2xl">
              End-to-end STEM Lab solutions for schools and institutes — from design
              and safety planning to equipment, installation and teacher training.
              Create future-ready classrooms where students learn by building and discovering.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => document.getElementById("installation-timeline")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base rounded-lg shadow hover:bg-indigo-700 transition w-full sm:w-auto"
                aria-label="See installation steps"
              >
                View Installation Steps
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-4 sm:px-6 py-2.5 sm:py-3 border border-indigo-600 text-indigo-600 text-sm sm:text-base rounded-lg hover:bg-indigo-50 transition w-full sm:w-auto"
                aria-label="Contact us to partner"
              >
                Become a Learning Partner
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-64 sm:w-72 lg:w-80 h-64 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6 text-center">
              <p className="text-slate-600">
                Interactive STEM Lab Setup with Modern Equipment and Safety Features
              </p>
            </div>
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

          <div className="aspect-[4/3] rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium">Modern STEM Lab Environment</p>
              <p className="text-sm text-slate-500">Equipped with the latest technology and safety features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Timeline */}
      <section id="installation-timeline" className="py-8 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Step-by-Step STEM Lab Installation</h3>

          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
              {/* Left column: textual intro */}
              <div className="lg:w-1/3">
                <p className="text-slate-700">
                  Our proven installation process ensures your STEM Lab is safe, effective and ready for teaching.
                  Each step includes detailed planning and school-ready documentation.
                </p>
              </div>

              {/* Center timeline steps */}
              <div className="lg:w-2/3">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {steps.map((step, idx) => (
                    <article
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition"
                      aria-labelledby={`step-title-${idx}`}
                      role="group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-none">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h4 id={`step-title-${idx}`} className="font-semibold text-slate-900 text-sm sm:text-base">
                            {step.title}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm text-slate-600">{step.desc}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500 text-center">
              Follow these steps for a successful STEM lab setup.
            </div>
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
            {[
              {
                icon: "🤖",
                title: "Robotics Zone",
                desc: "Collaborative robotics zone with student workstations"
              },
              {
                icon: "⚡",
                title: "Electronics Lab",
                desc: "Electronics bench and safe storage for components"
              },
              {
                icon: "🏆",
                title: "Showcase Area",
                desc: "Student showcases and portfolio display area"
              }
            ].map((item, idx) => (
              <figure key={idx} className="rounded-xl shadow bg-white">
                <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                </div>
                <figcaption className="p-4">
                  <h4 className="font-medium text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </figcaption>
              </figure>
            ))}
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
