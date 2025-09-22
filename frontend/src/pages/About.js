import React from "react";

const AboutUsPage = () => {
  return (
    <main className="bg-[#f9f8f5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f9f8f5] pt-24 pb-16">
        {/* Background decorative elements - matching homepage */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-blue/3 rounded-full blur-lg"></div>
          
          {/* Tech grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full font-medium mb-8">
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <span>About Stemelix </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#6366F1] font-bold leading-tight ">
              <span className="block">Tinkering Minds,</span>
              <span className="block text-[#6366F1] bg-clip-text ">
                Empowering Youth
              </span>
            </h1>
            <p className="sm:text-lg md:text-xl text-charcoal/80 max-w-4xl mx-auto leading-relaxed">
              At Stemelix, we're reimagining education by blending science,
              technology, engineering, and mathematics with hands-on creativity.
              Our mission is simple: ignite curiosity and transform young learners
              into innovators who will shape tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass bg-[#6366f1]/10 backdrop-blur-sm border border-cyan/20 text-cyan px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-[#6366f1] rounded-full"></div>
              <span className="text-[#6366F1]">Our Mission</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6366F1] mb-6">
              Transforming STEM Education
            </h2>
            <p className="sm:text-lg md:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              We believe in making STEM accessible, engaging, and future-ready.
              By combining digital learning with hands-on tinkering, we help
              students move from learners to creators.
            </p>
          </div>

          {/* Mission Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Hands-On Learning",
                desc: "Interactive labs and projects that make abstract concepts tangible and understandable.",
                icon: "🔬"
              },
              {
                title: "Future Skills",
                desc: "Teaching coding, robotics, and electronics to prepare students for tomorrow's challenges.",
                icon: "🚀"
              },
              {
                title: "Creative Problem Solving",
                desc: "Encouraging innovative thinking and engineering mindset in young learners.",
                icon: "💡"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-primary-blue/10 hover:border-primary-blue/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#6366F1] mb-4 group-hover:text-primary-blue transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-[#f9f8f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 glass bg-primary-blue/10 backdrop-blur-sm border border-primary-blue/20 text-primary-blue px-6 py-3 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                <span>Our Story</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6366F1]">
                Where Youth Tinker, Think and Transform
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  Stemelix is a future-focused STEM Learning Platform. We teach coding, 
                  robotics and electronics through mentor-led, hands-on labs and progressive 
                  learning paths—so learners don't just study concepts; they design, build 
                  and ship real projects.
                </p>
                
                <p className="text-lg text-charcoal/80 leading-relaxed">
                  Our approach develops technical skills and the creative problem-solving, 
                  logical thinking and engineering confidence young people need to shape the future. 
                  Our programs are aligned with NEP 2020 and NITI Aayog's vision, preparing 
                  India's next generation of innovators.
                </p>
              </div>
            </div>

            {/* Image/Visual Content */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#6366f1]/10">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-[#6366f1]/10 rounded-3xl flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#6366F1]">Igniting Innovation</h3>
                  
                  <p className="text-charcoal/70 leading-relaxed">
                    From curious beginners to confident creators, we guide every 
                    step of the learning journey with personalized mentorship and 
                    hands-on experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass bg-[#6366f1]/10 backdrop-blur-sm border border-cyan/20 text-cyan px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-[#6366f1] rounded-full"></div>
              <span className="text-[#6366F1]">Our Values</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6366F1] mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
              Our core values shape everything we do, from curriculum design to student mentorship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Curiosity First",
                desc: "We believe curiosity is the spark that ignites all learning. Every project starts with a question, every solution begins with wonder."
              },
              {
                title: "Learning by Doing", 
                desc: "Theory meets practice in our labs. Students don't just learn about circuits—they build them. They don't just study code—they create with it."
              },
              {
                title: "Innovation Mindset",
                desc: "We encourage students to think beyond existing solutions, to see problems as opportunities for creative innovation."
              },
              {
                title: "Future Ready",
                desc: "Our curriculum evolves with technology, ensuring students are prepared for careers that may not even exist today."
              }
            ].map((value, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-blue/10 to-cyan/10 rounded-2xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-blue to-cyan rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal">{value.title}</h3>
                </div>
                <p className="text-charcoal/70 leading-relaxed pl-16">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-primary-blue/5 to-cyan/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6366F1]">
            Ready to Start Your STEM Journey?
          </h2>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
            Join thousands of students who have already begun transforming their 
            curiosity into creation. The future starts with your first project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-blue/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <span>Explore Courses</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button className="inline-flex items-center px-8 py-4 border-2 border-primary-blue/30 hover:border-primary-blue text-charcoal hover:text-primary-blue font-semibold rounded-xl bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
