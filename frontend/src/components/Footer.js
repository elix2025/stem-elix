import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-16 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    Stem
                  </span>
                  <span className="text-white">Elix</span>
                </h2>
                <p className="text-slate-300 text-base leading-relaxed max-w-sm">
                  Empowering the next generation with innovative STEM education.
                  Building brilliant minds for a technological future.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebookF, href: "#", label: "Facebook" },
                    { icon: FaTwitter, href: "#", label: "Twitter" },
                    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                    { icon: FaInstagram, href: "#", label: "Instagram" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="group bg-slate-700/50 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <Icon className="text-lg group-hover:text-white transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-teal-500 pb-2 inline-block">
                Explore
              </h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "STEM Labs",
                  "Contact",
                  "Blog",
                  "Careers",
                  "Shipping Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-teal-400 transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-emerald-500 pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/resources", text: "Learning Resources" },
                  { to: "/refund-policy", text: "Refund Policy" },
                  { to: "/terms", text: "Terms & Conditions" },
                  { to: "/policy", text: "Privacy Policy" },
                ].map(({ to, text }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-emerald-500 pb-2 inline-block">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300 group hover:text-emerald-400 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base leading-relaxed">
                    123 STEM Innovation Hub
                    <br />
                    Tech City, India 110001
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 group hover:text-emerald-400 transition-colors duration-300">
                  <FaPhone className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a href="tel:+919876543210" className="text-base">
                    +91-9876543210
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-300 group hover:text-emerald-400 transition-colors duration-300">
                  <FaEnvelope className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a href="mailto:support@stemelixu.com" className="text-base">
                    support@stemelixu.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-base">
              © 2025 StemElix. All rights reserved. Empowering futures through
              STEM education.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 text-slate-300 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <FaArrowUp className="text-sm group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
