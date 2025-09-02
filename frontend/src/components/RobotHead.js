// src/components/FloatingDroneBot.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingDroneBot = () => {
  const botRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const bot = botRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!bot || !leftEye || !rightEye) return;

    // Floating animation
    gsap.to(bot, {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    // Head tilt animation
    gsap.to(bot, {
      rotate: 8,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
      delay: 0.5,
    });

    // Eyes glow and pulse
    gsap.to([leftEye, rightEye], {
      boxShadow: "0 0 16px 6px #22d3ee",
      backgroundColor: "#67e8f9",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
    });

    // Mouse tracking for eyes
    const handleMouseMove = (e) => {
      const botRect = bot.getBoundingClientRect();
      const botCenterX = botRect.left + botRect.width / 2;
      const botCenterY = botRect.top + botRect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate angle from bot center to mouse
      const angle = Math.atan2(mouseY - botCenterY, mouseX - botCenterX);

      // Limit eye movement within eye socket
      const maxDistance = 4;
      const moveX = Math.cos(angle) * maxDistance;
      const moveY = Math.sin(angle) * maxDistance;

      // Apply movement to both eyes
      gsap.to(leftEye, {
        x: moveX,
        y: moveY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(rightEye, {
        x: moveX,
        y: moveY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Move pupils within the eyes
      const pupils = [
        leftEye.querySelector(".absolute"),
        rightEye.querySelector(".absolute"),
      ];
      pupils.forEach((pupil) => {
        if (pupil) {
          gsap.to(pupil, {
            x: moveX * 1.5,
            y: moveY * 1.5,
            duration: 0.05,
            ease: "power2.out",
          });
        }
      });
    };

    // Add mouse move listener
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center"
      style={{ background: "transparent" }}
    >

      <div ref={botRef} className="relative w-48 h-48">
        {/* Purple Background Glow */}
        <div 
          className="absolute inset-0 -z-10 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, #a855f7 0%, transparent 70%)',
            transform: 'scale(1.5)'
          }}
        />
      </div>
      <div ref={botRef} className="relative w-48 h-48">
        {/* Oval Robot Head */}
        <div className="relative w-full h-full flex justify-center items-start">
          <div
            className="w-32 h-40 bg-white shadow-xl relative rounded-full"
            style={{
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
          />

          {/* Face / Screen */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[80px] h-[40px] bg-black rounded-xl flex items-center justify-around px-2 shadow-inner z-10">
            <div
              ref={leftEyeRef}
              className="w-4 h-4 bg-cyan-400 rounded-full shadow-md relative overflow-hidden"
              style={{ boxShadow: "0 0 8px 2px #22d3ee" }}
            >
              <div className="absolute w-2 h-2 bg-slate-800 rounded-full top-1 left-1 transition-transform duration-300"></div>
            </div>
            <div
              ref={rightEyeRef}
              className="w-4 h-4 bg-cyan-400 rounded-full shadow-md relative overflow-hidden"
              style={{ boxShadow: "0 0 8px 2px #22d3ee" }}
            >
              <div className="absolute w-2 h-2 bg-slate-800 rounded-full top-1 left-1 transition-transform duration-300"></div>
            </div>
          </div>

          {/* Side Arms */}
          <div className="absolute w-4 h-12 bg-white rounded-full left-[-8px] top-[60px] rotate-[-20deg] shadow-md"></div>
          <div className="absolute w-4 h-12 bg-white rounded-full right-[-8px] top-[60px] rotate-[20deg] shadow-md"></div>

          {/* Floating lines */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 space-y-1">
            <div className="w-1 h-3 bg-white opacity-50 animate-pulse rounded"></div>
            <div className="w-1 h-4 bg-white opacity-30 animate-pulse rounded"></div>
            <div className="w-1 h-3 bg-white opacity-20 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDroneBot;
