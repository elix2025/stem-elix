// frontend/src/App.js
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDash from "./pages/student/StudentDash";
import Contact from "./pages/Contact.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import About from "./pages/About.js";
import { APIContextProvider } from "./context/api.js";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition.js";
import Courses from "./pages/courses/courses.js";
import CourseInfo from "./pages/courses/courseinfo.js";
import CourseContent from "./pages/courses/coursecontent.js";
import Kits from "./pages/Kit.js";
import ForSchool from "./pages/school.js";
// Component to handle layout with navbar spacing and page transitions
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Add smooth page transitions
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Add a subtle fade-in effect for page transitions
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease-in-out";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);

    return () => {
      document.body.style.transition = "";
    };
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isHomePage ? "" : "pt-16"
      }`}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-light-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-blue/20 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-charcoal font-medium">Loading StemElix...</div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Set up global smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // Set up global CSS custom properties for consistent theming
    document.documentElement.style.setProperty("--primary", "#6366F1");
    document.documentElement.style.setProperty("--secondary", "#06B6D4");
    document.documentElement.style.setProperty("--background", "#F9FAFB");
    document.documentElement.style.setProperty("--text", "#111827");
    document.documentElement.style.setProperty("--success", "#22C55E");
    document.documentElement.style.setProperty("--error", "#EF4444");

    // Add custom CSS for enhanced UX
    const style = document.createElement("style");
    style.textContent = `
      /* Global smooth transitions */
      * {
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }

      /* Enhanced focus states */
      button:focus,
      input:focus,
      textarea:focus,
      select:focus,
      a:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      /* Smooth image loading */
      img {
        transition: opacity 0.3s ease;
      }

      /* Custom selection color */
      ::selection {
        background-color: var(--primary);
        color: white;
      }

      /* Loading states */
      .loading {
        position: relative;
        overflow: hidden;
      }

      .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      /* Improved mobile touch targets */
      @media (max-width: 768px) {
        button, a {
          min-height: 44px;
          min-width: 44px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <BrowserRouter>
      <APIContextProvider>
        <div className="bg-background text-text min-h-screen">
          <Navbar />
          <Layout>
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />
                <Route path="/kits" element={<Kits />} />
                <Route path="/labs" element={<ForSchool />} />
                <Route
                  path="/student"
                  element={<Navigate to="/login" replace />}
                />
                <Route path="/student/:username" element={<StudentDash />} />
                <Route path="/courses" element={<Courses />} />
                <Route
                  path="/courses/info/:courseName"
                  element={<CourseInfo />}
                />
                <Route
                  path="/courses/content/:courseName"
                  element={<CourseContent />}
                />
              </Routes>
            </main>
          </Layout>
          <Footer />
        </div>
      </APIContextProvider>
    </BrowserRouter>
  );
}

export default App;
