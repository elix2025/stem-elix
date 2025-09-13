import React, { useRef, useEffect, useState } from "react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState({});

  const observeSection = (sectionId) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => ({
          ...prev,
          [sectionId]: entry.isIntersecting,
        }));
      },
      { threshold: 0.2 }
    );
    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  };

  useEffect(() => {
    const observers = [
      observeSection("hero"),
      observeSection("mission"),
      observeSection("team"),
      observeSection("values"),
      observeSection("stats"),
    ];
    return () => observers.forEach((cleanup) => cleanup && cleanup());
  }, []);

  // Static style map (avoid dynamic Tailwind class strings)
  const statCards = [
    {
      number: "200K+",
      label: "Students Enrolled",
      icon: "🎓",
      wrap: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200",
      numberCls: "text-[#ac6cf4]",
    },
    {
      number: "120+",
      label: "Courses Available",
      icon: "📚",
      wrap: "bg-gradient-to-br from-[#ac6cf4]/10 to-fuchsia-50 border-[#ac6cf4]/30",
      numberCls: "text-[#ac6cf4]",
    },
    {
      number: "98%",
      label: "Student Satisfaction",
      icon: "⭐",
      wrap: "bg-gradient-to-br from-violet-50 to-[#ac6cf4]/10 border-violet-200",
      numberCls: "text-[#ac6cf4]",
    },
    {
      number: "50+",
      label: "Partner Schools",
      icon: "🏫",
      wrap: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200",
      numberCls: "text-[#ac6cf4]",
    },
  ];

  const achievements = [
    {
      title: "Award-Winning Platform",
      description:
        "Recognized as 'Best STEM Education Platform' by EdTech Awards 2024",
      icon: "🏆",
      wrap: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
    },
    {
      title: "Global Reach",
      description:
        "Students from over 50 countries actively learning on our platform",
      icon: "🌎",
      wrap: "bg-gradient-to-br from-[#ac6cf4]/10 to-fuchsia-50 border-[#ac6cf4]/30",
    },
    {
      title: "Research-Backed",
      description:
        "Our methods are proven to increase STEM engagement by 300%",
      icon: "📈",
      wrap: "bg-gradient-to-br from-violet-50 to-[#ac6cf4]/10 border-violet-200",
    },
  ];

  return (
    <main className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative overflow-hidden py-20 transition-all duration-1000 ${
          isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
       >
        {/* STEM Icons Floating */}
        <div className="absolute top-16 right-20 text-[#ac6cf4]/20 animate-bounce">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 text-[#ac6cf4]/20 animate-bounce delay-300">
          <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H5V22H11V16H13V22H19V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9M11,4H13V6H11V4Z" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-10 text-[#ac6cf4]/20 animate-bounce delay-700">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#ac6cf4]/10 text-slate-800 mb-4 px-6 py-3 rounded-full text-sm font-medium border border-[#ac6cf4]/20">
              <span className="w-2 h-2 bg-[#ac6cf4] rounded-full animate-pulse"></span>
              <span>🌟 About StemElix</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block text-slate-800 mb-4">Empowering Tomorrow's</span>
                <span className="block text-slate-800 mb-4">
                  STEM Innovators
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                We're revolutionizing STEM education through interactive
                learning, cutting-edge technology, and hands-on experiences that
                inspire the next generation of scientists, engineers, and
                innovators.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { icon: "🚀", title: "Innovation First", text: "Cutting-edge learning experiences that prepare students for tomorrow's challenges" },
                { icon: "🌍", title: "Global Impact", text: "Reaching students worldwide with accessible, engaging STEM education" },
                { icon: "🔬", title: "Hands-On Learning", text: "Real-world applications and interactive experiments that make learning stick" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">{c.title}</h3>
                  <p className="text-slate-600 text-sm">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        id="mission"
        className={`py-20 px-6 lg:px-8 bg-white transition-all duration-1000 delay-200 ${
          isVisible.mission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#ac6cf4]/10 text-[#ac6cf4] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🎯 Our Purpose</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Transforming STEM Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe that every student deserves access to world-class STEM
              education that's engaging, accessible, and prepares them for the
              future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#ac6cf4]/10 to-fuchsia-50 rounded-3xl p-8 border border-[#ac6cf4]/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-[#ac6cf4] rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To make STEM education accessible, engaging, and effective for
                  students worldwide through innovative technology, interactive
                  learning experiences, and expert instruction that bridges the
                  gap between theory and real-world application.
                </p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-[#ac6cf4]/10 rounded-3xl p-8 border border-violet-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A world where every student has the opportunity to explore,
                  create, and innovate in STEM fields, equipped with the skills
                  and confidence to solve tomorrow's challenges and drive
                  technological advancement.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "🔬", title: "Innovation", desc: "Pioneering new methods of learning" },
                { icon: "🌟", title: "Excellence", desc: "Striving for the highest quality" },
                { icon: "🤝", title: "Collaboration", desc: "Building together, learning together" },
                { icon: "🌍", title: "Accessibility", desc: "Education for everyone, everywhere" },
                { icon: "🚀", title: "Growth", desc: "Continuous improvement and evolution" },
                { icon: "💡", title: "Creativity", desc: "Fostering imagination and innovation" },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className={`py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-[#ac6cf4]/10 transition-all duration-1000 delay-400 ${
          isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#ac6cf4]/10 text-[#ac6cf4] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>👥 Our Team</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Meet the Innovators
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A diverse team of educators, engineers, designers, and researchers
              united by our passion for transforming STEM education.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { name: "Dr. Sarah Chen", role: "Chief Learning Officer", icon: "🔬", bg: "from-[#ac6cf4] to-fuchsia-500" },
              { name: "Alex Rodriguez", role: "Head of Engineering", icon: "⚙️", bg: "from-violet-400 to-[#ac6cf4]" },
              { name: "Maya Patel", role: "UX Design Lead", icon: "🎨", bg: "from-fuchsia-400 to-violet-500" },
              { name: "Dr. James Wilson", role: "Research Director", icon: "🧬", bg: "from-[#ac6cf4] to-violet-500" },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${member.bg} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {member.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-sm text-center">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Team Members", icon: "👥" },
              { number: "15+", label: "Countries", icon: "🌍" },
              { number: "100+", label: "Years Combined Experience", icon: "📚" },
              { number: "24/7", label: "Student Support", icon: "🚀" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#ac6cf4] mb-1">{stat.number}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Statistics */}
      <section
        id="stats"
        className={`py-20 px-6 lg:px-8 bg-white transition-all duration-1000 delay-600 ${
          isVisible.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#ac6cf4]/10 text-[#ac6cf4] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>📊 Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Making a Difference
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we're transforming STEM education and empowering students
              worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statCards.map((s, idx) => (
              <div key={idx} className="group">
                <div
                  className={`${s.wrap} rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className={`text-4xl font-bold ${s.numberCls} mb-2`}>
                    {s.number}
                  </div>
                  <div className="text-slate-600 font-medium">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Highlights */}
          <div className="grid lg:grid-cols-3 gap-8">
            {achievements.map((ac, i) => (
              <div
                key={i}
                className={`${ac.wrap} rounded-3xl p-8 border hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-4xl mb-4">{ac.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{ac.title}</h3>
                <p className="text-slate-600">{ac.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Mission / Vision / Promise */}
      <section className="bg-zinc-50 py-20 px-6 md:px-24">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">🚀 Our Mission</h4>
            <p className="text-zinc-600 text-base">
              Make STEM accessible, relatable, and exciting for every learner —
              from first-grade to high school.
            </p>
          </div>
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">🔍 Our Vision</h4>
            <p className="text-zinc-600 text-base">
              Equip students with the mindset and skills needed to thrive in a
              world driven by innovation.
            </p>
          </div>
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">🤝 Our Promise</h4>
            <p className="text-zinc-600 text-base">
              Always keep learning joyful, student-centric, and grounded in
              real-world impact.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;