import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/brain.png";
import { useAPI } from "../context/api";
import { createUserSlug } from "../utils/slugutils";
import LogoutModal from "./LogoutModal";

const Nav2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showNav2, setShowNav2] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAPI();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    setLogoutModalOpen(true);
    setMobileMenuOpen(false);
  };

  const confirmLogout = () => {
    logoutUser();
    setLogoutModalOpen(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const heroHeight = window.innerHeight; // Assuming hero is full screen height
        const scrollPosition = window.scrollY;
        
        // Show Nav2 only when scrolled past hero section
        setShowNav2(scrollPosition > heroHeight * 0.8); // Show when 80% past hero
        setScrolled(scrollPosition > heroHeight * 0.9); // Change background when 90% past hero
      };

      handleScroll(); // Initial call
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setShowNav2(true); // Always show on other pages
      setScrolled(true);
    }
  }, [isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navbarClass = scrolled
    ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200"
    : "bg-transparent";

  const textColorClass = scrolled ? "text-[var(--color-text-primary)]" : "text-white";
  const logoColorClass = scrolled ? "text-[var(--color-button)]" : "text-white";

  if (!showNav2) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-in-out ${navbarClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="w-12 h-12 flex-shrink-0">
              <img src={logo} alt="STEMelix Logo" className="w-full h-full object-contain" />
            </div>
            
            {/* Brand Name */}
            <Link
              to="/"
              className={`text-2xl lg:text-3xl font-bold transition-all duration-300 hover:scale-105 transform ${textColorClass}`}
            >
              <span className={logoColorClass}>STEM</span>
              <span className={textColorClass}>elix</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/about"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              About
            </Link>

            <Link
              to="/courses"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/courses"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Courses
            </Link>

            <Link
              to="/contact"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/contact"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Contact Us
            </Link>

            {/* Conditional rendering based on login status */}
            {currentUser && currentUser.token ? (
              <div className="flex items-center gap-4">
                <Link
                  to={`/student/${createUserSlug(currentUser)}`}
                  className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-blue/25 ${
                    scrolled
                      ? "bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center px-4 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 ${
                    scrolled
                      ? "text-[var(--color-text-primary)] border-2 border-[var(--color-text-primary)]/30 hover:bg-[var(--color-text-primary)]/10 hover:border-[var(--color-text-primary)]/50"
                      : "text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                    location.pathname === "/login"
                      ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                      : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    scrolled
                      ? "bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${textColorClass} hover:bg-[var(--color-button)]/10`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 right-0 md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100 shadow-md"
              : "-translate-y-4 opacity-0 pointer-events-none"
          } ${scrolled ? "bg-white/95" : "bg-black/95"} backdrop-blur-xl border-t border-gray-200`}
        >
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className={`block text-lg font-semibold transition-colors duration-300 ${
                location.pathname === "/"
                  ? "text-[var(--color-button)]"
                  : `${scrolled ? "text-[var(--color-text-primary)]" : "text-white"} hover:text-[var(--color-button)]`
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block text-lg font-semibold transition-colors duration-300 ${
                location.pathname === "/about"
                  ? "text-[var(--color-button)]"
                  : `${scrolled ? "text-[var(--color-text-primary)]" : "text-white"} hover:text-[var(--color-button)]`
              }`}
            >
              About
            </Link>
            <Link
              to="/courses"
              className={`block text-lg font-semibold transition-colors duration-300 ${
                location.pathname === "/courses"
                  ? "text-[var(--color-button)]"
                  : `${scrolled ? "text-[var(--color-text-primary)]" : "text-white"} hover:text-[var(--color-button)]`
              }`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`block text-lg font-semibold transition-colors duration-300 ${
                location.pathname === "/contact"
                  ? "text-[var(--color-button)]"
                  : `${scrolled ? "text-[var(--color-text-primary)]" : "text-white"} hover:text-[var(--color-button)]`
              }`}
            >
              Contact Us
            </Link>

            {currentUser && currentUser.token ? (
              <div className="space-y-4">
                <Link
                  to={`/student/${createUserSlug(currentUser)}`}
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 border-2 ${
                    scrolled
                      ? "text-[var(--color-text-primary)] border-[var(--color-text-primary)]/30 hover:bg-[var(--color-text-primary)]/10"
                      : "text-white border-white/30 hover:bg-white/10"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block text-lg font-semibold transition-colors duration-300 ${
                    location.pathname === "/login"
                      ? "text-[var(--color-button)]"
                      : `${scrolled ? "text-[var(--color-text-primary)]" : "text-white"} hover:text-[var(--color-button)]`
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default Nav2;
