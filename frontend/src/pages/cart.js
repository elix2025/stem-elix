import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../context/api.js";
import Scanner from "../assets/scanner.jpg";

const Cart = () => {
  const { courseName } = useParams();
  const { getCourseByTitle, createPayment, user, token } = useAPI(); 
  // ✅ assuming user & token are exposed from context

  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const foundCourse = await getCourseByTitle(courseName);
        if (foundCourse && !foundCourse.message) {
          setCourse(foundCourse);
          setAmount(foundCourse.price || 0);
        } else {
          setError(foundCourse?.message || "Course not found");
        }
      } catch (err) {
        setError(err?.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseName, getCourseByTitle]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a screenshot of your payment.");
      return;
    }
    if (!user || !token) {
      setMessage("You must be logged in to submit payment.");
      return;
    }

    setLoading(true);
    const response = await createPayment(
      user._id,
      course._id,
      amount,
      file,
      token
    );
    setLoading(false);

    if (response?.success) {
      setMessage(response.message);
    } else {
      setMessage(response.message || "Failed to submit payment.");
    }
  };

  if (loading && !course) return <p className="p-4">Loading course...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
      {/* Left Side */}
      {course && (
        <div className="flex-1 border rounded-lg shadow p-4">
          <img
            className="w-full rounded-lg mb-4"
            src={course?.CourseThumbnail || "https://via.placeholder.com/400"}
            alt={course?.title || "Course"}
          />
          <h2 className="text-2xl font-bold mb-2">{course?.title}</h2>
          <p className="text-gray-700 mb-4">{course?.description}</p>
          <div className="text-lg font-semibold">Amount: ₹{amount}</div>
        </div>
      )}

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center">
        <img src={Scanner} alt="Scanner" className="w-full max-w-sm mb-4" />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4 border p-4 rounded-lg shadow"
        >
          <label className="font-semibold">Upload Payment Screenshot</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Payment"}
          </button>
          {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
          <p className="text-xs mt-2 text-gray-500">
            Your course enrollment will be completed once verified by us. Details
            will be shared via your registered email.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cart;
