import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";

const AddChapterLecture = () => {
  const { getAllCourses, addChapter, addLecture } = useAdmin();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterOrder, setChapterOrder] = useState("");

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureOrder, setLectureOrder] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");

  const [isPreviewFree, setIsPreviewFree] = useState(false);

  // ✅ Load all courses
  useEffect(() => {
    (async () => {
      const data = await getAllCourses();
      setCourses(data);
    })();
  }, [getAllCourses]);

  // ✅ Load chapters of selected course
  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find((c) => c._id === selectedCourse);
      setChapters(course?.CourseContent || []);
    }
  }, [selectedCourse, courses]);

  // ✅ Handle Add Chapter
  const handleAddChapter = async () => {
    if (!selectedCourse) return alert("Select a course first");
    try {
      await addChapter(selectedCourse, {
        chapterOrder: Number(chapterOrder),
        chapterTitle: chapterTitle,
      });
      alert("✅ Chapter added successfully!");
    } catch (err) {
      console.error("Error adding chapter:", err.response?.data || err.message);
      alert("❌ Failed to add chapter");
    }
  };

  // ✅ Handle Add Lecture
  const handleAddLecture = async () => {
    if (!selectedCourse || !selectedChapter) {
      return alert("Please select both course and chapter");
    }

    // Validate YouTube URL
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    if (!youtubeRegex.test(lectureUrl)) {
      return alert("Please enter a valid YouTube URL");
    }

    try {
      const lectureData = {
        lectureTitle,
        lectureOrder: Number(lectureOrder),
        lectureDuration,
        lectureUrl,
        isPreviewFree,
      };

      await addLecture(selectedCourse, selectedChapter, lectureData);

      // Reset form
      setLectureTitle("");
      setLectureOrder("");
      setLectureDuration("");
      setLectureUrl("");
      setIsPreviewFree(false);

      alert("✅ Lecture added successfully!");
    } catch (err) {
      console.error("Error adding lecture:", err);
      alert(err.message || "Failed to add lecture");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Manage Course Content</h2>

      {/* Select Course */}
      <div className="mb-4">
        <label className="block font-semibold">Select Course</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Chapter */}
      <div className="p-4 border rounded mb-4">
        <h3 className="font-semibold mb-2">➕ Add Chapter</h3>
        <input
          type="text"
          placeholder="Chapter Title"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setChapterTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Chapter Order"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setChapterOrder(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddChapter}
        >
          Add Chapter
        </button>
      </div>

      {/* Select Chapter */}
      <div className="mb-4">
        <label className="block font-semibold">Select Chapter</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          <option value="">-- Select Chapter --</option>
          {chapters.map((ch) => (
            <option key={ch.chapterId} value={ch.chapterId}>
              {ch.ChapterTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Add Lecture */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">📺 Add YouTube Lecture</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Lecture Title"
            value={lectureTitle}
            className="w-full border p-2 rounded"
            onChange={(e) => setLectureTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Lecture Order"
              value={lectureOrder}
              className="w-full border p-2 rounded"
              onChange={(e) => setLectureOrder(e.target.value)}
            />

            <input
              type="text"
              placeholder="Duration (HH:MM:SS)"
              value={lectureDuration}
              className="w-full border p-2 rounded"
              onChange={(e) => setLectureDuration(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="YouTube Video URL"
            value={lectureUrl}
            className="w-full border p-2 rounded"
            onChange={(e) => setLectureUrl(e.target.value)}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={(e) => setIsPreviewFree(e.target.checked)}
            />
            <span>Free Preview?</span>
          </label>

          <button
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddLecture}
          >
            Add Lecture
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChapterLecture;
