// frontend/src/App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

// Component to handle layout with navbar spacing
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return <div className={isHomePage ? "" : "pt-16"}>{children}</div>;
};

function App() {
  return (
    <BrowserRouter>
      <APIContextProvider>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/about" element={<About />} />
            <Route path="/student" element={<StudentDash />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/info/:id" element={<CourseInfo />} />
            <Route path="/courses/content/:id" element={<CourseContent />} />
          </Routes>
        </Layout>
        <Footer />
      </APIContextProvider>
    </BrowserRouter>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
