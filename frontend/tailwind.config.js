/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx,html}"];
export const theme = {
  extend: {
    colors: {
      navy: "#0F172A",
      "primary-blue": "#2563EB",
      cyan: "#06B6D4",
      "light-bg": "#F9FAFB",
      charcoal: "#111827",
    },
    animation: {
      float: "float 6s ease-in-out infinite",
      glow: "glow 2s ease-in-out infinite alternate",
      slideUp: "slideUp 0.8s ease-out",
      slideDown: "slideDown 0.8s ease-out",
      fadeIn: "fadeIn 1s ease-out",
      scaleIn: "scaleIn 0.6s ease-out",
      "spin-slow": "spin 8s linear infinite",
      "bounce-slow": "bounce 3s infinite",
      "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-20px)" },
      },
      glow: {
        "0%": { boxShadow: "0 0 20px #2563EB" },
        "100%": { boxShadow: "0 0 30px #06B6D4, 0 0 40px #2563EB" },
      },
      slideUp: {
        "0%": { transform: "translateY(100px)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      slideDown: {
        "0%": { transform: "translateY(-100px)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      scaleIn: {
        "0%": { transform: "scale(0.8)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
    },
    backdropBlur: {
      xs: "2px",
    },
    fontFamily: {
      sans: ["Inter", "DM Sans", "system-ui", "sans-serif"],
    },
  },
};
export const plugins = [];
