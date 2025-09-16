import React from "react";
import { useNavigate } from "react-router-dom";

const explorerCourses = [
  {
    id: "explorer-1",
    level: "Explorer Level 1",
    grades: "Grades 5–8",
    description:
      "Intermediate robotics and IoT course focusing on real hardware integration with microcontrollers and sensor-based projects.",
    highlights: [
      "Smart Study Lamp (touch & sensor-controlled)",
      "Gesture-Controlled Robot",
      "Security Alarm System using microcontrollers",
      "Automatic Hand Sanitizer (proximity sensor)",
      "Advanced Line-Following Robot",
      "Certification upon completion",
    ],
  },
  {
    id: "explorer-2",
    level: "Explorer Level 2",
    grades: "Grades 5–8",
    description:
      "Explore app-based robot control, smart automation, and AI-powered safety systems with real hardware and sensors.",
    highlights: [
      "Mobile-Controlled Robot (smartphone app)",
      "Gesture-Controlled Robot",
      "AI Drowsiness Detector (driver safety)",
      "Smart Room Lighting System (wireless)",
      "Face Mask Detection (AI system)",
      "Certification upon completion",
    ],
  },
];

const CourseExplorer = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        Explorer Courses
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {explorerCourses.map((course) => (
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
              {course.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <button className="mt-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Let's Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseExplorer;
