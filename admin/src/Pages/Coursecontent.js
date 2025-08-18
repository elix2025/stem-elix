import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { useParams } from "react-router-dom";

const CourseContentPage = () => {
  const { courseId } = useParams();
  const { getCourseContent } = useAdmin();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openChapter, setOpenChapter] = useState(null); // Track which chapter is open

  useEffect(() => {
    const fetchContent = async () => {
      if (!courseId) {
        console.error("❌ No courseId found in URL");
        return;
      }

      try {
        const data = await getCourseContent(courseId);
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId, getCourseContent]);

  const toggleChapter = (chapterId) => {
    setOpenChapter((prev) => (prev === chapterId ? null : chapterId));
  };

  if (loading) return <p className="text-center mt-10">⏳ Loading course content...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📘 Course Content</h2>

      {content && content.chapters && content.chapters.length > 0 ? (
        content.chapters.map((ch) => (
          <div
            key={ch.chapterId}
            className="mb-4 border rounded-lg shadow-sm"
          >
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(ch.chapterId)}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg transition"
            >
              <h3 className="text-lg font-semibold">{ch.ChapterTitle}</h3>
              <span className="text-xl">
                {openChapter === ch.chapterId ? "🔽" : "▶️"}
              </span>
            </button>

            {/* Chapter Lectures Dropdown */}
            {openChapter === ch.chapterId && (
              <div className="p-4 bg-white">
                {ch.chapterContent.length > 0 ? (
                  ch.chapterContent.map((lec) => (
                    <div
                      key={lec.lectureId}
                      className="mb-4 p-3 border rounded-lg bg-gray-50"
                    >
                      <h4 className="font-medium mb-2">🎥 {lec.lectureTitle}</h4>
                      <video
                        controls
                        className="w-full rounded-lg shadow-md"
                      >
                        <source src={lec.lectureUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    No lectures found in this chapter.
                  </p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No chapters found for this course.
        </p>
      )}
    </div>
  );
};

export default CourseContentPage;
