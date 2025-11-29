import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const { editCourse, getAllCourses, getCourseContent } = useAdmin();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coursename: "",
    levelNumber: 1,
    duration: "",
    gradeRangeMin: "",
    gradeRangeMax: "",
    price: "",
    originalPrice: "",
    status: "draft",
    difficulty: "Beginner",
    demoVideo: "",
    language: "English",
    hasCertificate: true,
    accessType: "lifetime",
    order: 0,
    featured: false,
    highlights: [""],
    prerequisites: [""],
    learningOutcomes: [""],
    tags: [""],
  });

  const [files, setFiles] = useState({
    CourseThumbnail: null,
  });

  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch course data on mount
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const courses = await getAllCourses();
        const course = courses.find((c) => c._id === courseId);

        if (!course) {
          setErrorMsg("Course not found");
          return;
        }

        // Populate form with existing course data
        setFormData({
          title: course.title || "",
          description: course.description || "",
          coursename: course.coursename || "",
          levelNumber: course.levelNumber || 1,
          duration: course.duration || "",
          gradeRangeMin: course.gradeRange?.min || "",
          gradeRangeMax: course.gradeRange?.max || "",
          price: course.price || "",
          originalPrice: course.originalPrice || "",
          status: course.status || "draft",
          difficulty: course.difficulty || "Beginner",
          demoVideo: course.demoVideo || "",
          language: course.language || "English",
          hasCertificate: course.hasCertificate || true,
          accessType: course.accessType || "lifetime",
          order: course.order || 0,
          featured: course.featured || false,
          highlights: course.highlights && course.highlights.length > 0 ? course.highlights : [""],
          prerequisites: course.prerequisites && course.prerequisites.length > 0 ? course.prerequisites : [""],
          learningOutcomes: course.learningOutcomes && course.learningOutcomes.length > 0 ? course.learningOutcomes : [""],
          tags: course.tags && course.tags.length > 0 ? course.tags : [""],
        });

        // Set current thumbnail
        if (course.CourseThumbnail) {
          setCurrentThumbnail(course.CourseThumbnail);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setErrorMsg("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: selectedFiles[0],
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Prepare data object with filtered array fields
      const dataToSend = {};

      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          // Filter empty strings from array fields
          dataToSend[key] = formData[key].filter((item) => item.trim());
        } else {
          dataToSend[key] = formData[key];
        }
      });

      // If we have a file to upload, use FormData; otherwise send JSON
      if (files.CourseThumbnail) {
        const courseData = new FormData();

        // Add all form fields to FormData
        Object.keys(dataToSend).forEach((key) => {
          if (Array.isArray(dataToSend[key])) {
            // Send arrays as JSON string
            courseData.append(key, JSON.stringify(dataToSend[key]));
          } else {
            courseData.append(key, dataToSend[key]);
          }
        });

        // Add thumbnail file
        courseData.append("CourseThumbnail", files.CourseThumbnail);

        const result = await editCourse(courseId, courseData);

        if (result.success) {
          setSuccessMsg("Course updated successfully!");
          setTimeout(() => {
            navigate("/admin/courses", { state: { refresh: true } });
          }, 2000);
        } else {
          setErrorMsg(result.message || "Failed to update course");
        }
      } else {
        // Send as JSON if no file upload
        const result = await editCourse(courseId, dataToSend);

        if (result.success) {
          setSuccessMsg("Course updated successfully!");
          setTimeout(() => {
            navigate("/admin/courses", { state: { refresh: true } });
          }, 2000);
        } else {
          setErrorMsg(result.message || "Failed to update course");
        }
      }
    } catch (error) {
      console.error("Error updating course:", error);
      setErrorMsg(error.message || "Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded">
        <p className="text-center animate-pulse text-gray-600">Loading course data...</p>
      </div>
    );
  }

  const ArrayField = ({ label, field, placeholder }) => (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      {formData[field].map((item, index) => (
        <div key={`${field}-${index}`} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData[field].length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayField(field, index)}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayField(field)}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Edit Course
      </h1>

      {errorMsg && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Course Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what this course is about"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Course Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="coursename"
                value={formData.coursename}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Junior, Explorer, Master, Tinkerion"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter the course name/category</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Difficulty Level</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Level Number</label>
              <input
                type="number"
                name="levelNumber"
                value={formData.levelNumber}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Duration</label>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5 hours"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Grade Range Min
              </label>
              <input
                type="number"
                name="gradeRangeMin"
                value={formData.gradeRangeMin}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Grade Range Max
              </label>
              <input
                type="number"
                name="gradeRangeMax"
                value={formData.gradeRangeMax}
                onChange={handleChange}
                min="1"
                max="12"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Leave empty if no discount"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Language</label>
              <input
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-medium">Featured Course</label>
            </div>
          </div>
        </div>

        {/* Media Files */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Media Files
          </h2>
          
          {currentThumbnail && (
            <div className="mb-4">
              <label className="block font-medium mb-2">Current Thumbnail</label>
              <img
                src={currentThumbnail}
                alt="Current course thumbnail"
                className="h-32 w-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-500 mt-2">
                Upload a new image to replace the current thumbnail
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Course Thumbnail (Optional)
              </label>
              <input
                type="file"
                name="CourseThumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
              {files.CourseThumbnail && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ New image selected
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Demo Video URL</label>
              <input
                name="demoVideo"
                value={formData.demoVideo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="YouTube embed URL (optional)"
              />
            </div>
          </div>
        </div>

        {/* Course Content & Structure */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Course Highlights & Learning Outcomes
          </h2>

          <div>
            <ArrayField
              label="Course Highlights (What students will learn)"
              field="highlights"
              placeholder="e.g., Master fundamental concepts and principles"
            />
          </div>

          <div>
            <ArrayField
              label="Prerequisites"
              field="prerequisites"
              placeholder="e.g., Basic knowledge of programming"
            />
          </div>

          <div>
            <ArrayField
              label="Learning Outcomes"
              field="learningOutcomes"
              placeholder="e.g., Build real-world projects"
            />
          </div>

          <div>
            <ArrayField
              label="Tags"
              field="tags"
              placeholder="e.g., Python, AI, Machine Learning"
            />
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Additional Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Access Type</label>
              <select
                name="accessType"
                value={formData.accessType}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="lifetime">Lifetime Access</option>
                <option value="1year">1 Year Access</option>
                <option value="6months">6 Months Access</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasCertificate"
                checked={formData.hasCertificate}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-medium">Provides Certificate</label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-400"
          >
            {submitting ? "Updating Course..." : "Update Course"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition font-semibold text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
