import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/herosec.jpg";
import founder from "../assets/founder.jpg";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[75vh] w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${hero})` }}
        aria-label="About STEMelix hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple)]/60 via-purple-900/40 to-black/50" />
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--color-purple)]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-3xl text-white">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                <span className="text-sm font-semibold text-white/90 tracking-wide">
                  Learn About STEMelix
                </span>
              </div>
            </div>
            <h1 className="headline-1 text-white mb-6">About Us</h1>
            <p className="body-text-large text-white/90 max-w-2xl">
              Discover how we're transforming STEM education through hands-on learning and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-purple)]">
              Our Story
            </span>
            <h2 className="headline-2 mt-4 text-[var(--color-text-primary)]">Passion, Tinkering and a Few Mistakes</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div className="space-y-6">
              <p className="body-text text-[var(--color-text-secondary)]">
                STEMelix started with the belief that learning should be joyful. We built kits for friends, ran weekend sessions for local kids, and learned what actually helps spark sustained curiosity.
              </p>

              <p className="body-text text-[var(--color-text-secondary)]">
                Today we blend playful hardware kits, short project-based lessons, and mentor time so students learn by making. The end result: real things they can point to and say, "I made that." 
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => navigate('/courses')}
                  className="bg-gradient-to-r from-[var(--color-purple)] to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-[var(--color-purple)] hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  aria-label="Explore courses"
                >
                  Explore Courses
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="border-2 border-[var(--color-purple)] text-[var(--color-purple)] font-semibold px-8 py-4 rounded-xl hover:bg-[var(--color-purple)] hover:text-white transition-all duration-300 hover:scale-105"
                  aria-label="Contact us"
                >
                  Book a Demo
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[var(--color-purple)]/20">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img
                      src={founder}
                      alt="Founder - Deepak"
                      className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-[var(--color-purple)]/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--color-purple)] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="body-text-bold text-lg text-[var(--color-text-primary)] mb-1">Deepak</h3>
                    <p className="text-[var(--color-purple)] font-semibold text-sm mb-3">Founder & CEO</p>
                    <p className="body-text text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Electronics & Communication Engineer with expertise in Electric Vehicles and STEM education.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[var(--color-purple)]/5 to-purple-50 p-6 rounded-2xl border border-[var(--color-purple)]/10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--color-purple)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Professional Background</h4>
                    <p className="body-text text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Deepak is an Electronics & Communication Engineer with a Master’s in Electric Vehicles. He has worked at BOSCH and Delta Electronics on ECU software, EV safety (ISO 26262), and calibration. He has published research on EV functional safety and ECU systems. Served as an International STEM & Robotics Educator at Turito International.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-purple)]">Our Mission</span>
            <h3 className="headline-2 mt-3 text-[var(--color-text-primary)]">Help every curious kid make something</h3>
            <p className="body-text text-[var(--color-text-secondary)] max-w-3xl mt-4 mx-auto">
              We combine short, tangible projects and live mentor guidance so students build skills while having fun. No long lectures—just small wins that add up.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Hands-on Kits",
                desc: "Kits with clear steps so learners focus on making, not guessing.",
                icon: "🔧"
              },
              {
                title: "Short Projects",
                desc: "Projects that finish in a few sessions and lead to a showcase piece.",
                icon: "🚀"
              },
              {
                title: "Mentor Time",
                desc: "Real mentors who help unblock and inspire, not lecture.",
                icon: "👩‍🏫"
              }
            ].map((item, i) => (
              <div key={i} className="group card p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-purple)]/20">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-purple)] to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-[var(--color-text-primary)] text-lg mb-2">{item.title}</h4>
                <p className="body-text text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-purple)]">Our Values</span>
            <h3 className="headline-2 mt-3 text-[var(--color-text-primary)]">Small steps, big curiosities</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[{
              title: 'Curiosity First',
              desc: "We start with a question and build from there.",
              icon: "🔍"
            },{
              title: 'Learning By Doing',
              desc: "Real projects beat passive slides every time.",
              icon: "🛠️"
            },{
              title: 'Iterate Fast',
              desc: "Mistakes are data—try again with a small tweak.",
              icon: "⚡"
            },{
              title: 'Be Inclusive',
              desc: "We design for kids who haven't met a circuit before.",
              icon: "🤝"
            }].map((v, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 border border-gray-100 hover:border-[var(--color-purple)]/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-purple)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg">{v.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)] text-lg mb-2">{v.title}</h4>
                    <p className="body-text text-[var(--color-text-secondary)]">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[var(--color-purple)] to-purple-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="headline-2 text-white mb-6">Ready to try a project?</h3>
          <p className="body-text-large text-purple-100 mb-10 max-w-2xl mx-auto">
            Join a free demo or browse our starter kits. We promise no boring slides—only building.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/courses')} 
              className="bg-white text-[var(--color-purple)] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Explore Courses
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-purple)] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Book a Free Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
