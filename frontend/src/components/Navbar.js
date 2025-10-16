import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../context/api";
import { createUserSlug } from "../utils/slugutils";
import LogoutModal from "./LogoutModal"; // Import the modal
import brainLogo from "../assets/brain.png"; // Import the brain logo

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAPI();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(() => {
    return isHomePage ? window.scrollY > 50 : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // New state for modal

  const handleLogout = () => {
    setLogoutModalOpen(true); // Open modal instead of direct logout
    setMobileMenuOpen(false);
  };

  const confirmLogout = () => {
    logoutUser();
    setLogoutModalOpen(false);
    navigate("/"); // Redirect to home page after logout
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  useEffect(() => {
    if (isHomePage) {
      setScrolled(window.scrollY > 50);
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(false);
    }
  }, [isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navbarClass = isHomePage
    ? scrolled
      ? "bg-[var(--color-background)] shadow-xl border-b border-[var(--color-border)]"
      : "bg-transparent"
    : "bg-[var(--color-background)] shadow-xl border-b border-[var(--color-border)]";

  const textColorClass = isHomePage && !scrolled ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]";

  const logoColorClass = isHomePage && !scrolled ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${navbarClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className={`flex items-center space-x transition-all duration-300 ${logoColorClass}`}
          >
            <Link
              to="/"
              className="hover:scale-105 transform transition-transform duration-200 inline-flex items-center "
            >
              <img 
                src={brainLogo} 
                alt="STEMelix Logo" 
                className="w-14 h-14 lg:w-12 lg:h-12"
              />
              <span className="text-2xl lg:text-3xl font-semibold">
              
                <span className="text-[var(--color-text-primary)]">STEMelix</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Only shown on large screens */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-semibold transition-all duration-300 hover:scale-105 transform text-[var(--color-text-primary)] ${
                location.pathname === "/"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-base font-semibold transition-all duration-300 hover:scale-105 transform text-[var(--color-text-primary)] ${
                location.pathname === "/about"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              About
            </Link>
            <Link
              to="/courses"
              className={`text-base font-semibold transition-all duration-300 hover:scale-105 transform text-[var(--color-text-primary)] ${
                location.pathname === "/courses"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`text-base font-semibold transition-all duration-300 hover:scale-105 transform text-[var(--color-text-primary)] ${
                location.pathname === "/contact"
                  ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
              }`}
            >
              Contact Us
            </Link>

            {/* Authentication Links */}
            {currentUser && currentUser.token ? (
              <Link
                to={`/student/${createUserSlug(currentUser)}`}
                className="inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
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
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-base font-semibold transition-all duration-300 hover:scale-105 transform text-[var(--color-text-primary)] ${
                    location.pathname === "/login"
                      ? "border-b-2 border-[var(--color-button)] pb-1 text-[var(--color-button)]"
                      : "hover:text-[var(--color-button)] hover:border-b-2 hover:border-[var(--color-button)] hover:pb-1"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
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
              </div>
            )}
          </div>

          {/* Contact Us Button - Only shown on large screens */}
          {/* <div className="hidden lg:flex">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
            >
              Contact Us
            </Link>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${textColorClass} hover:bg-[var(--color-button)]/20 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-y-0 left-0 w-80 transition-all duration-300 ease-in-out z-[90] ${
            mobileMenuOpen
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible -translate-x-full"
          } bg-[var(--color-background)] shadow-lg`}
        >
          <div className="h-full px-6 py-6">
            {/* Close button at the top right */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg transition-colors duration-200 text-[var(--color-text-primary)] hover:bg-[var(--color-button)]/20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="space-y-6">
            <Link
              to="/"
              className={`block text-xl font-semibold transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-primary)]"
              } ${
                location.pathname === "/"
                  ? "text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block text-xl font-semibold transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-primary)]"
              } ${
                location.pathname === "/about"
                  ? "text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)]"
              }`}
            >
              About
            </Link>
            <Link
              to="/courses"
              className={`block text-xl font-semibold transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-primary)]"
              } ${
                location.pathname === "/courses"
                  ? "text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)]"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`block text-xl font-semibold transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-primary)]"
              } ${
                location.pathname === "/contact"
                  ? "text-[var(--color-button)]"
                  : "hover:text-[var(--color-button)]"
              }`}
            >
              Contact Us
            </Link>

            {currentUser && currentUser.token ? (
              <div className="space-y-6 pt-6">
                <Link
                  to={`/student/${createUserSlug(currentUser)}`}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
                  className={`inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border-2 ${
                    isHomePage && !scrolled
                      ? "text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-button)]/10 hover:border-[var(--color-button)]"
                      : "text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-button)]/10 hover:border-[var(--color-button)]"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
              <div className="space-y-6 pt-6">
                <Link
                  to="/login"
                  className={`block text-xl font-semibold transition-colors duration-300 ${
                    isHomePage && !scrolled
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-primary)]"
                  } ${
                    location.pathname === "/login"
                      ? "text-[var(--color-button)]"
                      : "hover:text-[var(--color-button)]"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)] shadow-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
              </div>
            )}
            </div>
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

export default Navbar;
