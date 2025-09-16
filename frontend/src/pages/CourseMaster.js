import React from "react";
import { useNavigate } from "react-router-dom";

const masterCourses = [
  {
    id: "master-1",
    level: "Tinkrion Master",
    grades: "Grades 9–12",
    description:
      "An advanced program combining Arduino, ESP, AI, Machine Learning, and Raspberry Pi integration for solving real-world problems.",
    highlights: [
      "AI Home Automation System with Raspberry Pi",
      "Smart Mirror Project with built-in AI features",
      "Smart Weather Station with cloud monitoring",
      "AI Emotion-Tracking",
      "Full Home Automation using ESP/Raspberry Pi",
      "Raspberry Pi based programming",
      "Certification upon completion",
    ],
  },
];

const CourseMaster = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">
        Master Courses
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {masterCourses.map((course) => (
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

            <button className="mt-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition "
            onClick={() => navigate("/courses")}>
              Know More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseMaster;
