import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero({ handleEnrollNow }) {
  const [showContent, setShowContent] = useState(false);
  const [text, setText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef(null);

  // Handle responsive video source and positioning
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      const newVideoSrc = isSmallScreen 
        ? require("../assets/herosection.mp4")
        : require("../assets/printervideo.mp4");
      
      setVideoSrc(newVideoSrc);

      if (videoRef.current) {
        const isLargeScreen = window.innerWidth >= 992;
        const isMediumScreen = window.innerWidth >= 768 && window.innerWidth <= 850;
        
        if (isMediumScreen) {
          // For screens around 790px, move video up
          videoRef.current.style.objectPosition = 'center 20%';
        } else if (isLargeScreen) {
          videoRef.current.style.objectPosition = 'center center';
        } else {
          videoRef.current.style.objectPosition = 'center 30%';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Sequential fade-in animations
    const sequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Show the container
      setShowContent(true);
      
      // Set the main text
      setText("Cast|Craft|Create");
      
      // Show subtext after 800ms
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowSubtext(true);
      
      // Show buttons after another 800ms
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowButtons(true);
    };

    sequence();
  }, []);

  // Handle video muting on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !isMuted) {
            // If video is not in view and not already muted, mute it
            setIsMuted(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is out of view
      }
    );

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, [isMuted]);

  //   useEffect(() => {
  //   // Try to play unmuted video
  //   const playVideo = async () => {
  //     try {
  //       if (videoRef.current) {
  //         await videoRef.current.play();
  //       }
  //     } catch (error) {
  //       // If autoplay with sound fails, fall back to muted
  //       console.log("Autoplay with sound failed, falling back to muted");
  //       setIsMuted(true);
  //       if (videoRef.current) {
  //         videoRef.current.play();
  //       }
  //     }
  //   };
  //   playVideo();
  // }, []); 

  const handleWatchDemo = () => {
    console.log("Watch Demo clicked");
  };

  return (
    <section className="relative overflow-hidden h-screen hero-section">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          key={videoSrc} // Force re-render when video source changes
          style={{ 
            height: '100vh',
            width: '100vw',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Sound Toggle Button */}
        <button 
          onClick={() => {
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            if (videoRef.current) {
              videoRef.current.muted = newMutedState;
            }
          }}
          className="absolute bottom-4 right-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          {isMuted ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 8v8m9.536-9.536a9 9 0 010 11.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Content */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-left max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white transform transition-all duration-1000 leading-tight ${text ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {text}
          </h1>

          <div className={`transform transition-all duration-1000 ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl">
              Empowering young minds to code, build, and innovate through creative learning that turns imagination into innovations
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start transform transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={handleEnrollNow}
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 border border-white text-white font-medium text-sm rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 w-fit"
              >
                <span className="relative z-10">Start Learning</span>
                <svg
                  className="relative z-10 ml-2 w-4 h-4 transition-transform duration-300"
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
              </button>

              {/* <button
                onClick={handleWatchDemo}
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 border border-white text-white font-medium text-sm rounded-lg hover:bg-white/10 transition-all duration-300 w-fit"
              >
                <svg
                  className="relative z-10 mr-2 w-4 h-4"
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
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
