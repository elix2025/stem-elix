import { useState } from "react";
import { useAPI } from "../context/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useAPI();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    institute: "",
    role: "student", // Default role
  });

  const [showField, setShowField] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Only validate institute if checkbox is ticked
    if (showField && !formData.institute.trim()) {
      setError("Institute is required for students.");
      return;
    }

    console.log("📤 Sending registration data:", formData);

    const result = await registerUser(formData);
    console.log("📥 Register API response:", result);

    if (result.success) {
      alert("Registered successfully!");
      navigate("/");
    } else {
      setError(result.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Student Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        {/* ✅ Checkbox */}
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={showField}
            onChange={(e) => setShowField(e.target.checked)}
          />
          <span className="text-sm">Are you from a school?</span>
        </label>

        {/* ✅ Conditional Institute field */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            showField ? "max-h-40 mt-2" : "max-h-0"
          }`}
        >
          {showField && (
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              placeholder="Institute Name"
              className="w-full mb-4 p-3 border rounded"
              required={showField}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
