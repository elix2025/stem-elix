import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/herosec.jpg";
// import founder1 from "../assets/about.jpg";
// import founder2 from "../assets/about2.jpg";

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
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="headline-1 text-white mb-4">We make STEM feel do-able</h1>
            <p className="body-text text-white/90">
              Hands-on projects, friendly mentors, and a step-by-step approach that turns curiosity into confidence. We help kids build things they can show off—and be proud of.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-button)]">
              Our Story
            </span>
            <h2 className="headline-2 mt-4">Passion, Tinkering and a Few Mistakes</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div className="space-y-6">
              <p className="body-text text-[var(--color-text-secondary)]">
                STEMelix started with the belief that learning should be joyful. We built kits for friends, ran weekend sessions for local kids, and learned what actually helps spark sustained curiosity.
              </p>

              <p className="body-text text-[var(--color-text-secondary)]">
                Today we blend playful hardware kits, short project-based lessons, and mentor time so students learn by making. The end result: real things they can point to and say, "I made that." 
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate('/courses')}
                  className="btn-primary"
                  aria-label="Explore courses"
                >
                  Explore Courses
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="btn-secondary"
                  aria-label="Contact us"
                >
                  Book a Demo
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6 flex items-center gap-4">
                  <img
                    // src={founder1}
                    alt="Founder - Anshu"
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <p className="body-text-bold">Deepak</p>
                    <p className="body-text text-[var(--color-text-secondary)] text-sm">Co-founder • Loves robotics and messy code that works</p>
                  </div>
                </div>

              
              </div>

              <blockquote className="mt-4 p-4 border-l-4 border-[var(--color-button)] bg-[var(--color-button)]/5 rounded">
                <p className="body-text text-[var(--color-text-secondary)]">"We design experiences that nudge kids to try one more step—because that next step is where learning happens."</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-button)]">Our Mission</span>
            <h3 className="headline-2 mt-3">Help every curious kid make something</h3>
            <p className="body-text text-[var(--color-text-secondary)] max-w-3xl mt-4">
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
              <div key={i} className="card p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                <p className="body-text text-[var(--color-text-secondary)] mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wide font-semibold text-[var(--color-button)]">Our Values</span>
            <h3 className="headline-2 mt-3">Small steps, big curiosities</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[{
              title: 'Curiosity First',
              desc: "We start with a question and build from there."
            },{
              title: 'Learning By Doing',
              desc: "Real projects beat passive slides every time."
            },{
              title: 'Iterate Fast',
              desc: "Mistakes are data—try again with a small tweak."
            },{
              title: 'Be Inclusive',
              desc: "We design for kids who haven't met a circuit before."
            }].map((v, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="font-semibold text-[var(--color-text-primary)]">{v.title}</h4>
                <p className="body-text text-[var(--color-text-secondary)]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-[var(--color-button)]/5 to-cyan/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h3 className="headline-2">Ready to try a project?</h3>
          <p className="body-text text-[var(--color-text-secondary)]">Join a free demo or browse our starter kits. We promise no boring slides—only building.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/kits')} className="btn-primary">Starter Kits</button>
            <button onClick={() => navigate('/contact')} className="btn-secondary">Book a Free Demo</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
