// admin/src/pages/AddCourses.js
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import AddChapterLecture from "./AddChapter";

const AddCourses = () => {
  const { createCourse } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
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
    highlights: [""],
    prerequisites: [""],
    learningOutcomes: [""],
    tags: [""],
    // Instructor fields
    instructorName: "",
    instructorBio: "",
    instructorQualifications: [""],
    instructorExperience: "",
    instructorLinkedin: "",
    instructorTwitter: "",
    instructorWebsite: "",
  });

  const [files, setFiles] = useState({
    CourseThumbnail: null,
    instructorAvatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles[0],
    }));
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
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Create FormData for file uploads
    const courseData = new FormData();

    // Add basic course data
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key]
          .filter((item) => item.trim())
          .forEach((item) => {
            courseData.append(key, item);
          });
      } else {
        courseData.append(key, formData[key]);
      }
    });

    // Add files
    if (files.CourseThumbnail) {
      courseData.append("CourseThumbnail", files.CourseThumbnail);
    }
    if (files.instructorAvatar) {
      courseData.append("instructorAvatar", files.instructorAvatar);
    }

    try {
      await createCourse(courseData);
      setSuccessMsg("Course added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        categoryId: "",
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
        highlights: [""],
        prerequisites: [""],
        learningOutcomes: [""],
        tags: [""],
        instructorName: "",
        instructorBio: "",
        instructorQualifications: [""],
        instructorExperience: "",
        instructorLinkedin: "",
        instructorTwitter: "",
        instructorWebsite: "",
      });
      setFiles({ CourseThumbnail: null, instructorAvatar: null });

      setTimeout(() => navigate("/admin-dash"), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  const ArrayField = ({ label, field, placeholder }) => (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 border px-3 py-2 rounded"
          />
          {formData[field].length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayField(field, index)}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayField(field)}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add {label.slice(0, -1)}
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create New Course
      </h1>

      {errorMsg && (
        <p className="text-red-500 mb-4 text-center font-medium">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-green-500 mb-4 text-center font-medium">
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Course Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what this course is about"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Junior">Junior</option>
                <option value="Explorer">Explorer</option>
                <option value="Master">Master</option>
              </select>
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
              <label className="block font-medium mb-1">Level Number *</label>
              <input
                type="number"
                name="levelNumber"
                value={formData.levelNumber}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Duration *</label>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5 hours"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Grade Range Min *
              </label>
              <input
                type="number"
                name="gradeRangeMin"
                value={formData.gradeRangeMin}
                onChange={handleChange}
                min="1"
                max="12"
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Grade Range Max *
              </label>
              <input
                type="number"
                name="gradeRangeMax"
                value={formData.gradeRangeMax}
                onChange={handleChange}
                min="1"
                max="12"
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
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
          </div>
        </div>

        {/* Media Files */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Media Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Course Thumbnail *
              </label>
              <input
                type="file"
                name="CourseThumbnail"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Demo Video URL</label>
              <input
                name="demoVideo"
                value={formData.demoVideo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="YouTube embed URL"
              />
            </div>
          </div>
        </div>

        {/* Instructor Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Instructor Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Instructor Name</label>
              <input
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Instructor Avatar
              </label>
              <input
                type="file"
                name="instructorAvatar"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Instructor Bio</label>
              <textarea
                name="instructorBio"
                value={formData.instructorBio}
                onChange={handleChange}
                rows="3"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Brief bio about the instructor"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Experience</label>
              <input
                name="instructorExperience"
                value={formData.instructorExperience}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5+ years in AI/ML"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">LinkedIn Profile</label>
              <input
                name="instructorLinkedin"
                value={formData.instructorLinkedin}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="LinkedIn URL"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Twitter Profile</label>
              <input
                name="instructorTwitter"
                value={formData.instructorTwitter}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Twitter URL"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Website</label>
              <input
                name="instructorWebsite"
                value={formData.instructorWebsite}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Personal website URL"
              />
            </div>
          </div>

          <div className="mt-4">
            <ArrayField
              label="Qualifications"
              field="instructorQualifications"
              placeholder="e.g., PhD in Computer Science"
            />
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Course Content & Structure
          </h2>

          <ArrayField
            label="Course Highlights"
            field="highlights"
            placeholder="What will students learn?"
          />

          <ArrayField
            label="Prerequisites"
            field="prerequisites"
            placeholder="What should students know before taking this course?"
          />

          <ArrayField
            label="Learning Outcomes"
            field="learningOutcomes"
            placeholder="What will students achieve after completing this course?"
          />

          <ArrayField
            label="Tags"
            field="tags"
            placeholder="e.g., Machine Learning, Python, AI"
          />
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
        >
          {loading ? "Creating Course..." : "Create Course"}
        </button>
      </form>

      <div className="mt-12">
        <AddChapterLecture />
      </div>
    </div>
  );
};

export default AddCourses;
