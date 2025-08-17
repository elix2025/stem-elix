import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Mock chapters data
const CHAPTERS = [
  {
    id: 1,
    title: "Introduction",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Getting Started",
    video: "https://www.youtube.com/embed/9bZkp7q19f0",
  },
  {
    id: 3,
    title: "Core Concepts",
    video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  },
  {
    id: 4,
    title: "Hands-on Project",
    video: "https://www.youtube.com/embed/L_jWHffIx5E",
  },
  {
    id: 5,
    title: "Summary & Next Steps",
    video: "https://www.youtube.com/embed/tVj0ZTS4WF4",
  },
];

const CourseContent = () => {
  const { id } = useParams();
  const [currentChapter, setCurrentChapter] = useState(CHAPTERS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Video Player */}
      <div className="lg:col-span-3 flex flex-col">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          {currentChapter.title}
        </h1>
        <div className="mb-6">
          <iframe
            width="100%"
            height="420"
            src={currentChapter.video}
            title={currentChapter.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow"
          ></iframe>
        </div>
        {/* ...additional content, notes, resources, etc. can go here... */}
      </div>
      {/* Chapters Sidebar */}
      <aside className="lg:col-span-1 bg-white/80 rounded-2xl shadow p-6 border border-slate-100 flex flex-col gap-4 h-fit sticky top-24">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">
          Course Chapters
        </h2>
        <ul className="space-y-2">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg border text-base font-medium transition-all duration-200 ${
                  currentChapter.id === chapter.id
                    ? "bg-teal-500 text-white border-teal-500 shadow"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-100 hover:text-teal-700"
                }`}
                onClick={() => setCurrentChapter(chapter)}
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CourseContent;
