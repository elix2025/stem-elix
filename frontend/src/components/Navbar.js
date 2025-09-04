import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../context/api";
import { createUserSlug } from "../utils/slugutils";

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logoutUser } = useAPI();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(() => {
    return isHomePage ? window.scrollY > 50 : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setMobileMenuOpen(false);
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
      ? "bg-[#efefef] backdrop-blur-md shadow-lg border-b border-gray-200/20"
      : "bg-transparent"
    : "bg-white shadow-lg border-b border-gray-200";

  const textColorClass =
    isHomePage && !scrolled ? "text-black" : "text-back";

  const logoColorClass =
    isHomePage && !scrolled ? "text-black" : "text-black";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 ${logoColorClass}`}
        >
          <Link
            to="/"
            className="hover:scale-105 transform transition-transform duration-200 inline-block"
          >
            <span className="bg-gradient-to-r from-[#ac6cf4] to-[#ac6cf4] bg-clip-text text-transparent font-extrabold">
              Stem
            </span>
            <span className={logoColorClass}>Elix</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/"
                ? "border-b-2 border-[#ac6cf4] pb-1"
                : "hover:text-[#ac6cf4] hover:border-b-2 hover:border-[#ac6cf4] hover:pb-1"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/about"
                ? "border-b-2 border-[#ac6cf4] pb-1"
                : "hover:text-[#ac6cf4] hover:border-b-2 hover:border-[#ac6cf4] hover:pb-1"
            }`}
          >
            About
          </Link>

          <Link
            to="/courses"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/courses"
                ? "border-b-2 border-[#ac6cf4] pb-1"
                : "hover:text-[#ac6cf4] hover:border-b-2 hover:border-[#ac6cf4] hover:pb-1"
            }`}
          >
            Courses
          </Link>

          <Link
            to="/contact"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/contact"
                ? "border-b-2 border-[#ac6cf4] pb-1"
                : "hover:text-[#ac6cf4] hover:border-b-2 hover:border-[#ac6cf4] hover:pb-1"
            }`}
          >
            Contact Us
          </Link>

          {/* Conditional rendering based on login status */}
          {currentUser && currentUser.token ? (
            <div className="flex items-center gap-4">
              <Link
                to={`/student/${createUserSlug(currentUser)}`}
                className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isHomePage && !scrolled
                    ? "bg-white text-slate-800 hover:bg-[#f3e8fd] shadow-md"
                    : "bg-[#ac6cf4] text-white hover:bg-[#9b5ee3] shadow-md"
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
                    ? "text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
                    : "text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
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
                    ? "border-b-2 border-[#ac6cf4] pb-1"
                    : "hover:text-[#ac6cf4] hover:border-b-2 hover:border-[#ac6cf4] hover:pb-1"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isHomePage && !scrolled
                    ? "bg-white text-slate-800 hover:bg-[#f3e8fd] shadow-md"
                    : "bg-[#ac6cf4] text-white hover:bg-[#9b5ee3] shadow-md"
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
            className={`p-2 rounded-lg transition-colors duration-200 ${textColorClass} hover:bg-gray-100/20`}
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
            ? "bg-slate-900/95 backdrop-blur-md"
            : "bg-white/95 backdrop-blur-md"
        } border-t border-gray-200/20`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            to="/"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/"
                ? "text-[#ac6cf4]"
                : "hover:text-[#ac6cf4]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/about"
                ? "text-[#ac6cf4]"
                : "hover:text-[#ac6cf4]"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/contact"
                ? "text-[#ac6cf4]"
                : "hover:text-[#ac6cf4]"
            }`}
          >
            Contact Us
          </Link>

          {currentUser && currentUser.token ? (
            <div className="space-y-4">
              <Link
                to={`/student/${createUserSlug(currentUser)}`}
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-[#ac6cf4] text-white hover:bg-[#9b5ee3] shadow-md"
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
                  isHomePage && !scrolled
                    ? "text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                    : "text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
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
                  isHomePage && !scrolled ? "text-white" : "text-slate-700"
                } ${
                  location.pathname === "/login"
                    ? "text-[#ac6cf4]"
                    : "hover:text-[#ac6cf4]"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-[#ac6cf4] text-white hover:bg-[#9b5ee3] shadow-md"
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
  );
};

export default Navbar;
