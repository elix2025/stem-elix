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
    categoryId: "",        // Replace with category _id (dropdown preferred)
    levelNumber: 1,
     duration: "",
     gradeRangeMin: "",
     gradeRangeMax: "",
     price: "",
     status: "",       // Options: active, inactive, draft
     CourseThumbnail: "",
    // videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const coursePayload = {
      title: formData.title,
      description: formData.description,
      //programHighlights: formData.programHighlights.split(',').map(s => s.trim()),
      categoryId: formData.categoryId,
      levelNumber: Number(formData.levelNumber),
      duration: Number(formData.duration),
      gradeRange: {
       min: Number(formData.gradeRangeMin),
       max: Number(formData.gradeRangeMax),
      },
      price: Number(formData.price),
      CourseThumbnail: formData.CourseThumbnail,
      //videoUrl: formData.videoUrl,
      //status: formData.status,
    };

    try {
      await createCourse(coursePayload);
      setSuccessMsg("Course added successfully!");
      setFormData({
        title: "",
        description: "",
         categoryId: "",
         levelNumber: 1,
         duration: "",
         gradeRangeMin: "",
         gradeRangeMax: "",
         price: "",
         CourseThumbnail: "",
        // videoUrl: "",
        // status: "draft",
      });
      setTimeout(() => navigate("/admin-dash"), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Course</h1>

      {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mb-4 text-center">{successMsg}</p>}

         <form onSubmit={handleSubmit} className="space-y-4">
         <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
         </div>

         <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
            className="w-full border px-3 py-2 rounded"
          />
         </div>
         {/* <div>
          <label className="block font-medium mb-1">Program Highlights</label>
          <input
            name="programHighlights"
            value={formData.programHighlights}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Highlight 1, Highlight 2"
          />
         </div> */}

         <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category ID</label>
            <input
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 64f89c1a..." // Ideally use a dropdown
            />
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
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Duration (hours)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Grade Range Min</label>
            <input
              type="number"
              name="gradeRangeMin"
              value={formData.gradeRangeMin}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Grade Range Max</label>
            <input
              type="number"
              name="gradeRangeMax"
              value={formData.gradeRangeMax}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div> 
         </div>

        <div
           className="block font-medium mb-1">Thumbnail Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, CourseThumbnail: e.target.files[0] })}
            
            name="CourseThumbnail"
           required
          />
          <label htmlFor="CourseThumbnail-upload" className="cursor-ponter text blue-600 hover:underline">
            Click to upload or drag and drop
          </label>
        </div>

        {/* <div>
          <label className="block font-medium mb-1">YouTube Video URL</label>
          <input
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="e.g. https://youtube.com/embed/abc123"
            className="w-full border px-3 py-2 rounded"
          />
        </div> */}

         <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select> 
         </div> 

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Create Course"}
        </button>
      </form>
      <div>
        <AddChapterLecture/>
      </div>
    </div>
  );
};

export default AddCourses;
