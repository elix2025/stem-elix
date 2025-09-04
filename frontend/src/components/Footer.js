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
    <footer className="bg-white text-slate-800 relative overflow-hidden">
      {/* Decorative background elements (subtle on white) */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#ac6cf4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#ac6cf4]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-16 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-[#ac6cf4] to-[#ac6cf4]/80 bg-clip-text text-transparent">
                    Stem
                  </span>
                  <span className="text-slate-900">Elix</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed max-w-sm">
                  Empowering the next generation with innovative STEM education.
                  Building brilliant minds for a technological future.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-900">
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
                      className="group bg-slate-100 hover:bg-gradient-to-r hover:from-[#ac6cf4] hover:to-[#ac6cf4]/90 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    >
                      <Icon className="text-lg text-slate-700 group-hover:text-white transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b-2 border-[#ac6cf4] pb-2 inline-block">
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
                      className="text-slate-600 hover:text-[#ac6cf4] transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#ac6cf4] rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b-2 border-[#ac6cf4] pb-2 inline-block">
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
                      className="text-slate-600 hover:text-[#ac6cf4] transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-[#ac6cf4] rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b-2 border-[#ac6cf4] pb-2 inline-block">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600 group hover:text-[#ac6cf4] transition-colors duration-300">
                  <FaMapMarkerAlt className="text-[#ac6cf4] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base leading-relaxed">
                    123 STEM Innovation Hub
                    <br />
                    Tech City, India 110001
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 group hover:text-[#ac6cf4] transition-colors duration-300">
                  <FaPhone className="text-[#ac6cf4] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a href="tel:+919876543210" className="text-base">
                    +91-9876543210
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-600 group hover:text-[#ac6cf4] transition-colors duration-300">
                  <FaEnvelope className="text-[#ac6cf4] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a href="mailto:support@stemelixu.com" className="text-base">
                    support@stemelixu.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-base">
              © 2025 StemElix. All rights reserved. Empowering futures through
              STEM education.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-[#ac6cf4] hover:bg-[#ac6cf4]/90 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm"
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