import React, { useState } from "react";
import QRScanner from "../assets/star.webp"; // replace with your QR image
import axios from "axios";

const CartPage = ({ cart }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [message, setMessage] = useState("");

  if (!cart || cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  // Assume only one course at a time (you can extend later)
  const course = cart[0];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Upload to backend (which uploads to Cloudinary)
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload/payment-proof", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setScreenshot(res.data.url);
      setMessage("Payment screenshot uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload screenshot. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6">
      {/* LEFT SIDE - QR + Upload */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Scan & Pay</h3>
          <img src={QRScanner} alt="Google Pay QR" className="w-56 h-56" />
          <p className="text-gray-500 text-sm mt-2 text-center">
            Please scan this QR using Google Pay to complete your payment.
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-bold mb-4">Upload Payment Screenshot</h3>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {screenshot && (
            <div className="mt-4">
              <img
                src={screenshot}
                alt="Payment Proof"
                className="w-40 h-40 object-cover rounded-lg"
              />
            </div>
          )}
          {message && (
            <p className="text-sm text-center mt-2 text-blue-600">{message}</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Course Details */}
      <div className="w-full md:w-2/3">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Your Course</h2>
          <div className="flex gap-6">
            <img
              src={course.image || "/default-course.jpg"}
              alt={course.title || "Course"}
              className="w-40 h-40 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{course.title || "Untitled Course"}</h3>
              <p className="text-gray-600 mt-2">{course.description || "No description available"}</p>
              <p className="mt-4 font-bold text-lg">₹{course.price || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-100 rounded-xl">
          <p className="text-sm text-gray-700">
            ⚠️ Your course enrollment will be completed once we verify your
            payment. Details will be shared via your registered email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
