import React from "react";
import { useNavigate } from "react-router-dom";

const juniorCourses = [
  {
    id: "junior-1",
    level: "Junior Level 1",
    grades: "Grades 2–4",
    description:
      "An introductory level where young learners engage with basic robotics and coding using visual programming.",
    highlights: [
      "Learn Arduino, basic scratch junior, Block coding & graphical coding",
      "Beginner friendly-circuits and robots",
      "Participate in DI projects designed for easy home use",
      "1:1 personalized sessions with STEM mentors",
      "Earn a certification upon successful completion",
    ],

    projects: [
      "Smart Traffic Light",
      "Remote-Controlled Toy Car",
      "Obstacle-Avoiding Robot",
      "Automatic Candy Dispenser (coded)",
      "Interactive Scratch Games",
      "Fun IR Sensor Activities"
    ]
  },
  {
    id: "junior-2",
    level: "Junior Level 2",
    grades: "Grades 2–4",
    description:
      "Builds on Level 1 to introduce Arduino simulations, AI, smart automation, and mobile app development using MIT App Inventor.",
    highlights: [
      "Hands-on with Arduino simulations.",
      "Learn app development using MIT App Inventor.",
      "Introduction to Wi-Fi-based automation and smart sensors.",
      "Advanced DIY projects",
      "Certification upon course completion",
    ],

    projects: [
      "Smart Room Lighting System",
      "Burglar Alarm with AI facial recognition",
      "Wi-Fi Controlled Car (App Inventor)",
      "Gesture-Controlled Robot",
      "Face Mask Detection (AI)",
      "Fun AI Activities",
    ],
  },
  {
    id: "junior-3",
    level: "Junior Level 3",
    grades: "Grades 2–4",
    description:
      "Builds on Level 2 Student engage in coding, sensor integration and AI-powered projects.",
      highlights: [
        "Master interface of microcontrollers with different devices.",
        "Incorporate sensors and AI into projects.",
        "Highly interactive and engaging DIY projects.",
        "Certification upon course completion.",
      ],
    projects: [
      "Gesture-Controlled Robot (hardware)",
      "Pathfinder Explorer Robot",
      "Line-Following Robot",
      "AI Emotion-Sensing Music",
      "Smart Pet Feeder with AI detection",
    ],
  },
];

const CourseJunior = () => {
  const navigate = useNavigate();
  const [openProjectIdx, setOpenProjectIdx] = React.useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        Junior Courses
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {juniorCourses.map((course, idx) => (
          <div
            key={course.id}
            className="bg-white border border-purple-200 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              {course.level}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{course.grades}</p>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <h3 className="font-medium text-gray-800 mb-2">Highlights:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 flex-1">
              {course.highlights.map((item, hidx) => (
                <li key={hidx}>{item}</li>
              ))}
            </ul>

            {/* Projects Dropdown */}
            <div className="mt-4">
              <button
                className="font-medium text-gray-800 mb-2 flex items-center focus:outline-none"
                onClick={() =>
                  setOpenProjectIdx(openProjectIdx === idx ? null : idx)
                }
                aria-expanded={openProjectIdx === idx}
                aria-controls={`projects-list-${idx}`}
              >
                <span>Projects</span>
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${
                    openProjectIdx === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openProjectIdx === idx && (
                <ul
                  id={`projects-list-${idx}`}
                  className="list-disc pl-5 space-y-1 text-gray-600 mt-2"
                >
                  {course.projects.map((item, pidx) => (
                    <li key={pidx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            <button
              className="mt-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              onClick={() => navigate('/courses')}
            >
              get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseJunior;
