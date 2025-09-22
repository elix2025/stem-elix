import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../context/api";
import { createUserSlug } from "../utils/slugutils";
import LogoutModal from "./LogoutModal"; // Import the modal

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
      ? "bg-text/95 backdrop-blur-xl shadow-xl border-b border-primary/20"
      : "bg-transparent"
    : "bg-text shadow-xl border-b border-primary/10";

  const textColorClass = isHomePage && !scrolled ? "text-text" : "text-white";

  const logoColorClass = isHomePage && !scrolled ? "text-text" : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${navbarClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className={`text-2xl lg:text-3xl font-bold transition-all duration-300 ${logoColorClass}`}
          >
            <Link
              to="/"
              className="hover:scale-105 transform transition-transform duration-200 inline-block"
            >
              <span className="text-primary font-extrabold">STEM</span>
              <span className={logoColorClass}>elix</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/"
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "hover:text-primary hover:border-b-2 hover:border-primary hover:pb-1"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/about"
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "hover:text-primary hover:border-b-2 hover:border-primary hover:pb-1"
              }`}
            >
              About
            </Link>

            <Link
              to="/courses"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/courses"
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "hover:text-primary hover:border-b-2 hover:border-primary hover:pb-1"
              }`}
            >
              Courses
            </Link>

            <Link
              to="/contact"
              className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
                location.pathname === "/contact"
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "hover:text-primary hover:border-b-2 hover:border-primary hover:pb-1"
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
                    isHomePage && !scrolled
                      ? "bg-primary-blue text-white hover:bg-blue-700 shadow-md"
                      : "bg-primary-blue text-white hover:bg-blue-700 shadow-md"
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
                    isHomePage && !scrolled
                      ? "text-charcoal border-2 border-charcoal/30 hover:bg-charcoal/10 hover:border-charcoal/50"
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
                      ? "border-b-2 border-primary-blue pb-1 text-primary-blue"
                      : "hover:text-primary-blue hover:border-b-2 hover:border-primary-blue hover:pb-1"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-blue/25 ${
                    isHomePage && !scrolled
                      ? "bg-primary-blue text-white hover:bg-blue-700 shadow-md"
                      : "bg-primary-blue text-white hover:bg-blue-700 shadow-md"
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
              className={`p-2 rounded-lg transition-colors duration-200 ${textColorClass} hover:bg-primary-blue/20`}
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
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          } ${
            isHomePage && !scrolled
              ? "bg-navy/95 backdrop-blur-xl"
              : "bg-navy/95 backdrop-blur-xl"
          } border-t border-primary-blue/20`}
        >
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className={`block text-lg font-semibold transition-colors duration-300 text-white ${
                location.pathname === "/"
                  ? "text-primary-blue"
                  : "hover:text-primary-blue"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block text-lg font-semibold transition-colors duration-300 text-white ${
                location.pathname === "/about"
                  ? "text-primary-blue"
                  : "hover:text-primary-blue"
              }`}
            >
              About
            </Link>
            <Link
              to="/courses"
              className={`block text-lg font-semibold transition-colors duration-300 text-white ${
                location.pathname === "/courses"
                  ? "text-primary-blue"
                  : "hover:text-primary-blue"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`block text-lg font-semibold transition-colors duration-300 text-white ${
                location.pathname === "/contact"
                  ? "text-primary-blue"
                  : "hover:text-primary-blue"
              }`}
            >
              Contact Us
            </Link>

            {currentUser && currentUser.token ? (
              <div className="space-y-4">
                <Link
                  to={`/student/${createUserSlug(currentUser)}`}
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-primary-blue text-white hover:bg-blue-700 shadow-md"
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
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 border-2 text-white border-white/30 hover:bg-white/10 hover:border-white/50"
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
                  className={`block text-lg font-semibold transition-colors duration-300 text-white ${
                    location.pathname === "/login"
                      ? "text-primary-blue"
                      : "hover:text-primary-blue"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-primary-blue text-white hover:bg-blue-700 shadow-md"
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

export default Navbar;
