import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import AddCourses from "../components/AddCourses";
import { useNavigate } from "react-router-dom";


const Courses = () => {
  const { getAllCourses, getCourseContent } = useAdmin();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view"); // view, add, delete
  const navigate = useNavigate();

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseContent, setSelectedCourseContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        console.log("✅ Courses fetched from backend:", data);
        setCourses(Array.isArray(data)? data: []); // fallback to empty array
      } catch (err) {
        console.error("❌ Failed to fetch courses from backend:", err);
        setCourses([]); // ensure fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleThumbnailClick = async (courseId) => {
  if (!courseId) {
    console.error(" Invalid Course ID");
    return;
  }
    navigate(`/admin/course-content/${courseId}`); 
  };

  return (
    <div className="flex max-w-7xl mx-auto mt-10 p-6 gap-6">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md p-5 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("view")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "view" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              📚 View Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("add")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "add" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              ➕ Add Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("delete")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "delete" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              🗑️ Delete Courses
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-center">All Courses</h2>

        {activeTab === "view" && (
          <div className="p-4">
            {loading ? (
              <p className="text-center animate-pulse">⏳ Loading courses...</p>
            ) : !Array.isArray(courses) || courses.length === 0 ? (
              <p className="text-center">🚫 No courses found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 bg-white"
                    onClick={() => handleThumbnailClick(course._id)}
                  >
                    {course.CourseThumbnail && (
                      <img
                        src={course.CourseThumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded mb-3 cursor-pointer hover:opacity-80"
                        // onClick={() => handleThumbnailClick(course._id)}
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <p><strong>Category:</strong> {course.categoryId}</p>
                    <p><strong>Level:</strong> {course.levelNumber}</p>
                    <p><strong>Price:</strong> ₹{course.price}</p>
                    <p><strong>Status:</strong> {course.status}</p>
                  </div>
                ))}
              </div>

             
            )}
          </div>
        )}

        {activeTab === "add" && (
          <div className="mt-5">
            <AddCourses />
          </div>
        )}

        {activeTab === "delete" && (
          <div className="mt-5 text-center text-red-500">
            ⚠️ Delete functionality coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
