import React, { useEffect, useState, useRef } from "react";

export default function Hero({ handleEnrollNow }) {
  const [showContent, setShowContent] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null);
  const textRef = useRef(null);

  const fullText = "Cast | Craft | Create";
  const tagline = "Where Young Minds Build The Future";

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      const newVideoSrc = isSmallScreen
        ? require("../assets/herosection.mp4")
        : require("../assets/printervideo.mp4");
      setVideoSrc(newVideoSrc);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      setShowContent(true);

      let currentText = "";
      for (let i = 0; i < fullText.length; i++) {
        currentText += fullText[i];
        setAnimatedText(currentText);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowSubtext(true);

      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowButtons(true);
    };

    sequence();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !isMuted) {
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, [isMuted]);

  const handleWatchDemo = () => {
    window.open('/contact', '_self');
  };

  return (
    <section className="relative overflow-hidden h-screen hero-section">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover scale-105"
          autoPlay
          loop
          muted
          playsInline
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-[#ac6cf4]/40 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#ac6cf4]/20 to-purple-600/10"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#ac6cf4]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="hidden mb-8 md:block">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="text-sm font-semibold text-white/90 tracking-wide">
                {tagline}
              </span>
            </div>
          </div>

          <div className="mb-8 mt-9">
            <h1
              ref={textRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100">
                {animatedText}
                <span className="inline-block w-1 h-16 bg-cyan-400 ml-2 animate-pulse"></span>
              </span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${
              showSubtext
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Empowering young innovators to{" "}
              <span className="text-cyan-300 font-semibold">code</span>,{" "}
              <span className="[#ac6cf4] font-semibold">build</span>, and{" "}
              <span className="text-purple-300 font-semibold">create</span>{" "}
              through hands-on STEM education
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-1000 ${
              showButtons
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={handleEnrollNow}
              className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-[#ac6cf4] to-cyan-600 text-white font-bold text-lg rounded-2xl hover:from-[#ac6cf4] hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span className="relative z-10">Start Learning Today</span>
              <svg
                className="relative z-10 ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ac6cf4] to-cyan-400 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10"></div>
            </button>

            <button
              onClick={handleWatchDemo}
              className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-5 bg-transparent text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <svg
                className="relative z-10 mr-3 w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="relative z-10">Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}