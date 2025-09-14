import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Enhanced stat cards with new theme
  const statCards = [
    {
      number: "200K+",
      label: "Students Enrolled",
      icon: "🎓",
      wrap: "bg-gradient-to-br from-white to-blue-50/50 border-primary-blue/20",
      numberCls: "text-primary-blue",
    },
    {
      number: "120+",
      label: "Courses Available",
      icon: "📚",
      wrap: "bg-gradient-to-br from-cyan/10 to-primary-blue/10 border-cyan/30",
      numberCls: "text-cyan",
    },
    {
      number: "98%",
      label: "Student Satisfaction",
      icon: "⭐",
      wrap: "bg-gradient-to-br from-primary-blue/10 to-navy/10 border-primary-blue/20",
      numberCls: "text-navy",
    },
    {
      number: "50+",
      label: "Partner Schools",
      icon: "🏫",
      wrap: "bg-gradient-to-br from-white to-cyan/10 border-cyan/20",
      numberCls: "text-primary-blue",
    },
  ];

  const achievements = [
    {
      title: "Award-Winning Platform",
      description:
        "Recognized as 'Best STEM Education Platform' by EdTech Awards 2024",
      icon: "🏆",
      wrap: "bg-gradient-to-br from-primary-blue/10 to-cyan/10 border-primary-blue/30",
    },
    {
      title: "Global Reach",
      description:
        "Students from over 50 countries actively learning on our platform",
      icon: "🌎",
      wrap: "bg-gradient-to-br from-cyan/10 to-navy/10 border-cyan/30",
    },
    {
      title: "Research-Backed",
      description: "Our methods are proven to increase STEM engagement by 300%",
      icon: "📈",
      wrap: "bg-gradient-to-br from-navy/10 to-primary-blue/10 border-navy/30",
    },
  ];

  return (
    <main className="bg-gradient-to-br from-light-bg to-blue-50/30 min-h-screen">
      {/* Enhanced Hero Section */}
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
            </motion.div>


            {/* Enhanced Main Heading */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Empowering Tomorrow's</span>
                <span className="block text-gradient bg-gradient-to-r from-cyan via-primary-blue to-white bg-clip-text text-transparent">

                  STEM Innovators
                </span>
              </h1>


              <p className="text-xl lg:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed">

                We're revolutionizing STEM education through interactive
                learning, cutting-edge technology, and hands-on experiences that
                inspire the next generation of scientists, engineers, and
                innovators.
              </p>
            </motion.div>

            {/* Enhanced Key Highlights */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {[
                {
                  icon: "🚀",
                  title: "Innovation First",
                  text: "Cutting-edge learning experiences that prepare students for tomorrow's challenges",
                },
                {
                  icon: "🌍",
                  title: "Global Impact",
                  text: "Reaching students worldwide with accessible, engaging STEM education",
                },
                {
                  icon: "🔬",
                  title: "Hands-On Learning",
                  text: "Real-world applications and interactive experiments that make learning stick",
                },
              ].map((c, i) => (

                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">{c.title}</h3>
                  <p className="text-slate-600 text-sm">{c.text}</p>
                </div>

              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Mission & Vision Section */}
      <section
        id="mission"
        className={`section-padding bg-white transition-all duration-1000 delay-200 ${
          isVisible.mission
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.mission ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-primary-blue/10 text-primary-blue px-6 py-3 rounded-full text-sm font-medium mb-6">
              <span>🎯 Our Purpose</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Transforming STEM Education
            </h2>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              We believe that every student deserves access to world-class STEM
              education that's engaging, accessible, and prepares them for the
              future.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Mission & Vision Cards */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <motion.div
                className="group bg-gradient-to-br from-primary-blue/10 to-cyan/10 rounded-3xl p-8 border border-primary-blue/20 hover:border-primary-blue/40 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-primary-blue to-cyan rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 15 }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-charcoal group-hover:text-primary-blue transition-colors duration-300">
                    Our Mission
                  </h3>
                </div>
                <p className="text-charcoal/80 text-lg leading-relaxed">
                  To make STEM education accessible, engaging, and effective for
                  students worldwide through innovative technology, interactive
                  learning experiences, and expert instruction that bridges the
                  gap between theory and real-world application.
                </p>
              </motion.div>

              <motion.div
                className="group bg-gradient-to-br from-cyan/10 to-navy/10 rounded-3xl p-8 border border-cyan/20 hover:border-cyan/40 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-cyan to-navy rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -15 }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-charcoal group-hover:text-cyan transition-colors duration-300">
                    Our Vision
                  </h3>
                </div>
                <p className="text-charcoal/80 text-lg leading-relaxed">
                  A world where every student has the opportunity to explore,
                  create, and innovate in STEM fields, equipped with the skills
                  and confidence to solve tomorrow's challenges and drive
                  technological advancement.
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Values Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={itemVariants}
            >
              {[
                {
                  icon: "🔬",
                  title: "Innovation",
                  desc: "Pioneering new methods of learning",
                  color: "from-primary-blue/10 to-cyan/10",
                },
                {
                  icon: "🌟",
                  title: "Excellence",
                  desc: "Striving for the highest quality",
                  color: "from-cyan/10 to-primary-blue/10",
                },
                {
                  icon: "🤝",
                  title: "Collaboration",
                  desc: "Building together, learning together",
                  color: "from-navy/10 to-cyan/10",
                },
                {
                  icon: "🌍",
                  title: "Accessibility",
                  desc: "Education for everyone, everywhere",
                  color: "from-primary-blue/10 to-navy/10",
                },
                {
                  icon: "🚀",
                  title: "Growth",
                  desc: "Continuous improvement and evolution",
                  color: "from-cyan/10 to-navy/10",
                },
                {
                  icon: "💡",
                  title: "Creativity",
                  desc: "Fostering imagination and innovation",
                  color: "from-navy/10 to-primary-blue/10",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className={`group bg-gradient-to-br ${value.color} rounded-2xl p-6 border border-primary-blue/10 hover:border-cyan/30 hover:shadow-xl transition-all duration-300`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-primary-blue transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-charcoal/70 text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Team Section */}
      <section
        id="team"
        className={`section-padding bg-gradient-to-br from-light-bg to-cyan/5 transition-all duration-1000 delay-400 ${
          isVisible.team
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.team ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-cyan/10 text-cyan px-6 py-3 rounded-full text-sm font-medium mb-6">
              <span>👥 Our Team</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Meet the Innovators
            </h2>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              A diverse team of educators, engineers, designers, and researchers
              united by our passion for transforming STEM education.
            </p>
          </motion.div>

          {/* Enhanced Team Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
          >
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Learning Officer",
                icon: "🔬",
                bg: "from-primary-blue to-cyan",
              },
              {
                name: "Alex Rodriguez",
                role: "Head of Engineering",
                icon: "⚙️",
                bg: "from-cyan to-primary-blue",
              },
              {
                name: "Maya Patel",
                role: "UX Design Lead",
                icon: "🎨",
                bg: "from-navy to-cyan",
              },
              {
                name: "Dr. James Wilson",
                role: "Research Director",
                icon: "🧬",
                bg: "from-primary-blue to-navy",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-primary-blue/10 hover:border-cyan/30 hover:shadow-2xl transition-all duration-300">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${member.bg} rounded-3xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ rotate: 15 }}
                  >
                    {member.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-charcoal text-center mb-2 group-hover:text-primary-blue transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-charcoal/70 text-sm text-center">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Team Stats */}
          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              {
                number: "50+",
                label: "Team Members",
                icon: "👥",
                color: "text-primary-blue",
              },
              {
                number: "15+",
                label: "Countries",
                icon: "🌍",
                color: "text-cyan",
              },
              {
                number: "100+",
                label: "Years Combined Experience",
                icon: "📚",
                color: "text-navy",
              },
              {
                number: "24/7",
                label: "Student Support",
                icon: "🚀",
                color: "text-primary-blue",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-blue/10 hover:border-cyan/30 hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.number}
                </div>
                <div className="text-charcoal/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Impact & Statistics */}
      <section
        id="stats"
        className={`section-padding bg-white transition-all duration-1000 delay-600 ${
          isVisible.stats
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible.stats ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-navy/10 text-navy px-6 py-3 rounded-full text-sm font-medium mb-6">
              <span>📊 Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Making a Difference
            </h2>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              See how we're transforming STEM education and empowering students
              worldwide.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
          >
            {statCards.map((s, idx) => (
              <motion.div
                key={idx}
                className="group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`${s.wrap} rounded-3xl p-8 border hover:shadow-xl transition-all duration-300`}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    {s.icon}
                  </motion.div>
                  <div
                    className={`text-4xl font-bold ${s.numberCls} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {s.number}
                  </div>
                  <div className="text-charcoal/70 font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Achievement Highlights */}
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {achievements.map((ac, i) => (
              <motion.div
                key={i}
                className={`group ${ac.wrap} rounded-3xl p-8 border hover:shadow-lg transition-all duration-300`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  {ac.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-primary-blue transition-colors duration-300">
                  {ac.title}
                </h3>
                <p className="text-charcoal/70">{ac.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>


      {/* Enhanced Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-primary-blue to-cyan section-padding">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 bg-cyan/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="text-gradient bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
              STEM Journey?
            </span>
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already exploring the exciting
            world of Science, Technology, Engineering, and Mathematics with
            StemElix.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              className="group relative inline-flex items-center px-8 py-4 bg-white text-primary-blue font-semibold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 overflow-hidden focus-ring"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-primary-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Start Learning Today</span>
              <motion.svg
                className="relative z-10 ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.button>

            <motion.button
              className="group inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 focus-ring"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>Contact Us</span>
            </motion.button>
          </div>
        </motion.div>

      </section>
    </main>
  );
};

export default AboutUsPage;