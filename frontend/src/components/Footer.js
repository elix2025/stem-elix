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
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-blue/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-16 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-primary-blue to-cyan bg-clip-text text-transparent">
                    Stem
                  </span>
                  <span className="text-white">Elix</span>
                </h2>
                <p className="text-gray-300 text-base leading-relaxed max-w-sm">
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
                      className="group bg-white/10 hover:bg-gradient-to-r hover:from-primary-blue hover:to-cyan p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-primary-blue/25 backdrop-blur-sm border border-white/10"
                    >
                      <Icon className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-primary-blue pb-2 inline-block">
                Explore
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "About Us", path: "/about" },
                  { label: "STEM Labs", path: "/labs" },
                  { label: "Contact", path: "/contact" },
                  { label: "Shipping Policy", path: "/shipping-policy" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.path}
                      className="text-gray-300 hover:text-primary-blue transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-blue rounded-full mr-3 group-hover:bg-cyan group-hover:scale-125 transition-all duration-300" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-primary-blue pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/faq", text: "FAQ" },
                  
                  { to: "/terms", text: "Terms & Conditions" },
                  { to: "/policy", text: "Privacy Policy" },
                ].map(({ to, text }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-gray-300 hover:text-primary-blue transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-blue rounded-full mr-3 group-hover:bg-cyan group-hover:scale-125 transition-all duration-300" />
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 border-primary-blue pb-2 inline-block">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                {/* <li className="flex items-start gap-3 text-gray-300 group hover:text-primary-blue transition-colors duration-300">
                  <FaMapMarkerAlt className="text-primary-blue mt-1 flex-shrink-0 group-hover:text-cyan group-hover:scale-110 transition-all duration-300" />
                  <span className="text-base leading-relaxed">
                    A-165 Adarsh Nagaar,
                    <br />
                    New Delhi, India 110033
                  </span>
                </li> */}
                <li className="flex items-center gap-3 text-gray-300 group hover:text-primary-blue transition-colors duration-300">
                  <FaPhone className="text-primary-blue flex-shrink-0 group-hover:text-cyan group-hover:scale-110 transition-all duration-300" />
                  <a href="tel:+919876543210" className="text-base">
                    +91-8287591144
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-300 group hover:text-primary-blue transition-colors duration-300">
                  <FaEnvelope className="text-primary-blue flex-shrink-0 group-hover:text-cyan group-hover:scale-110 transition-all duration-300" />
                  <a href="mailto:support@stemelixu.com" className="text-base">
                    info.stemelix@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              © 2025 StemElix. All rights reserved. Empowering futures through
              STEM education.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-cyan hover:from-cyan hover:to-primary-blue text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-blue/25 focus-ring"
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
