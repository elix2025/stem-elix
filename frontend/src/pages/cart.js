import React, { useState,useEffect } from "react";
import axios from "axios";
import {useAPI} from "../context/api.js";
import { createSlug } from "../utils/slugutils.js";
import { useParams } from "react-router-dom";
import Scanner from "../assets/scanner.jpg";

const Cart = () => {
  const {courseName} = useParams();
    const { getCourseByTitle, } = useAPI();
    const [course,setCourse] = useState(null);
  const [error,setError] = useState("null");
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState(course?.price || 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    useEffect(() => {
      const loadCourse = async () => {
        setLoading(true);
        try {
          const foundCourse = await getCourseByTitle(courseName);
          if (foundCourse && !foundCourse.message) {
            setCourse(foundCourse);
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("");
    formData.append("courseId", course._id);
    formData.append("amount", amount);

    try {
      setLoading(true);
      const res = await axios.post("/api/payments/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
  

      {/* Left Side */}
      <div className="flex-1 border rounded-lg shadow p-4">
        <div className="">
          <img
          className=""
           src={
              course.CourseThumbnail ||
              `${encodeURIComponent(
                course.title
              )}`
            }
            alt={course.title}
            />
        </div>
        <h2 className="text-2xl font-bold mb-2">{course?.title}</h2>
        <p className="text-gray-700 mb-4">{course?.description}</p>
        {/* <div className="text-lg font-semibold">Amount: ₹{amount}</div> */}
        {/* Optionally add more course info like duration, teacher, etc */}
      </div>

      {/* {right side} */}

       <div className="flex-1 flex flex-col items-center">
        <img
          src={Scanner}
          alt="Scanner"
          className="w-full max-w-sm mb-4"
        />
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
          {message && (
            <p className="text-sm mt-2 text-green-600">{message}</p>
          )}
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
