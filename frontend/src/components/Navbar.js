import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAPI } from "../context/api";
import { createUserSlug } from "../utils/slugutils";
import LogoutModal from "./LogoutModal";
import brainLogo from "../assets/brain.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAPI();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
  }, [isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Professional navbar styling
  const navbarClass = `
    fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
    ${scrolled 
      ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100" 
      : isHomePage 
        ? "bg-transparent" 
        : "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
    }
  `;

  const textColorClass = scrolled || !isHomePage 
    ? "text-gray-800" 
    : "text-white";

  const logoColorClass = scrolled || !isHomePage 
    ? "text-gray-900" 
    : "text-white";

  const navLinkClass = (path) => `
    relative text-sm font-medium transition-all duration-300 hover:scale-105
    ${location.pathname === path 
      ? "text-[#ac6cf4] font-semibold" 
      : `${textColorClass} hover:text-[#ac6cf4]`
    }
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 
    after:h-0.5 after:bg-[#ac6cf4] after:transition-all after:duration-300
    hover:after:w-full ${location.pathname === path ? "after:w-full" : ""}
  `;

  return (
    <>
      <nav className={navbarClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
              >
                <div className="relative">
                  <img 
                    src={brainLogo} 
                    alt="STEMelix Logo" 
                    className="w-10 h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#ac6cf4]/10 rounded-full group-hover:bg-[#ac6cf4]/20 transition-colors duration-300" />
                </div>
                <span className={`text-2xl lg:text-3xl font-bold tracking-tight ${logoColorClass}`}>
                  STEMelix
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>
              <Link to="/about" className={navLinkClass("/about")}>
                About
              </Link>
              <Link to="/courses" className={navLinkClass("/courses")}>
                Courses
              </Link>
              <Link to="/contact" className={navLinkClass("/contact")}>
                Contact
              </Link>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {currentUser && currentUser.token ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/student/${createUserSlug(currentUser)}`}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r bg-[#ac6cf4] text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className={`px-4 py-2.5 font-medium transition-all duration-300 hover:scale-105 ${navLinkClass("/login")}`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r bg-[#ac6cf4] text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  scrolled || !isHomePage 
                    ? "text-gray-700 hover:bg-gray-100" 
                    : "text-white hover:bg-white/10"
                } ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`
            absolute top-0 left-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img src={brainLogo} alt="STEMelix" className="w-8 h-8" />
                  <span className="text-xl font-bold text-gray-900">STEMelix</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 p-6 space-y-6">
                <Link
                  to="/"
                  className={`block text-lg font-medium transition-all duration-300 ${
                    location.pathname === "/" 
                      ? "[#ac6cf4] font-semibold" 
                      : "text-gray-700 hover:text-[#ac6cf4]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`block text-lg font-medium transition-all duration-300 ${
                    location.pathname === "/about" 
                      ? "[#ac6cf4] font-semibold" 
                      : "text-gray-700 hover:text-[#ac6cf4]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/courses"
                  className={`block text-lg font-medium transition-all duration-300 ${
                    location.pathname === "/courses" 
                      ? "text-[#ac6cf4] font-semibold" 
                      : "text-gray-700 hover:text-[#ac6cf4]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/contact"
                  className={`block text-lg font-medium transition-all duration-300 ${
                    location.pathname === "/contact" 
                      ? "text-[#ac6cf4] font-semibold" 
                      : "text-gray-700 hover:text-[#ac6cf4]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Auth Section */}
              <div className="p-6 border-t border-gray-100 space-y-4">
                {currentUser && currentUser.token ? (
                  <>
                    <Link
                      to={`/student/${createUserSlug(currentUser)}`}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r bg-[#ac6cf4] text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-[#ac6cf4]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r bg-[#ac6cf4] text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
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