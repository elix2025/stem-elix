import { useState } from "react";
import { useAPI } from "../context/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const { registerUser } = useAPI();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    institute: "",
    role: "student",
  });

  const [showField, setShowField] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (showField && !formData.institute.trim()) {
      setError("Institute is required for students.");
      setIsLoading(false);
      return;
    }

    console.log("📤 Sending registration data:", formData);

    const result = await registerUser(formData);
    console.log("📥 Register API response:", result);

    setIsLoading(false);

    if (result.success) {
      alert("Registered successfully!");
      navigate("/");
    } else {
      setError(result.message || "Registration failed. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="bg-gradient-to-br from-background via-white to-secondary/10 flex items-center justify-center p-4 relative overflow-hidden min-h-screen">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Floating STEM Icons */}
        <motion.div
          className="absolute top-16 right-20 text-primary/20"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 text-secondary/20"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H5V22H11V16H13V22H19V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9M11,4H13V6H11V4Z" />
          </svg>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Welcome Content */}
        <motion.div
          className="text-text space-y-8 lg:pr-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 glass bg-white/20 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-medium">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Join Our STEM Community</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Start Your <span className="text-primary">STEM Journey</span>
            </h1>

            <p className="text-xl text-text/80 leading-relaxed max-w-lg">
              Join thousands of students exploring Science, Technology,
              Engineering, and Mathematics through interactive learning and
              hands-on experiences.
            </p>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              { icon: "🧪", text: "Interactive Labs", color: "primary" },
              { icon: "🤖", text: "AI-Powered Learning", color: "secondary" },
              {
                icon: "🔬",
                text: "Virtual Experiments",
                color: "primary",
              },
              { icon: "🏆", text: "Skill Certification", color: "secondary" },
            ].map(({ icon, text, color }, index) => (
              <motion.div
                key={text}
                className="group flex items-center space-x-3 card bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.span
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  {icon}
                </motion.span>
                <span className="text-text text-sm font-semibold group-hover:text-primary transition-colors duration-300">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div className="flex space-x-8" variants={itemVariants}>
            {[
              {
                number: "200K+",
                label: "Students",
                color: "text-primary",
              },
              { number: "120+", label: "Courses", color: "text-secondary" },
              { number: "98%", label: "Success Rate", color: "text-text" },
            ].map(({ number, label, color }) => (
              <motion.div
                key={label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className={`text-2xl font-bold ${color}`}>{number}</div>
                <div className="text-sm text-text/70">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Enhanced Registration Form */}
        <motion.div
          className="w-full max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card-gradient backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">
            <motion.div
              className="text-center space-y-2 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-text">Create Account</h2>
              <p className="text-text/70">Begin your STEM learning adventure</p>
            </motion.div>

            {error && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-700 text-sm font-medium">
                    {error}
                  </span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-semibold text-text">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-text/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-base bg-white/70 backdrop-blur-sm focus-ring transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-text">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-text/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-base bg-white/70 backdrop-blur-sm focus-ring transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-semibold text-text">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-text/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-base bg-white/70 backdrop-blur-sm focus-ring transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-semibold text-text">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-text/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-base bg-white/70 backdrop-blur-sm focus-ring transition-all duration-300"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-text/50 hover:text-text transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* School Checkbox */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showField}
                    onChange={(e) => setShowField(e.target.checked)}
                    className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors duration-200"
                  />
                  <span className="text-sm font-medium text-charcoal">
                    Are you from a school or institution?
                  </span>
                </label>

                {/* Conditional Institute Field */}
                <motion.div
                  initial={false}
                  animate={{
                    height: showField ? "auto" : 0,
                    opacity: showField ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {showField && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-charcoal/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="institute"
                        value={formData.institute}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-base bg-white/70 backdrop-blur-sm focus-ring transition-all duration-300"
                        placeholder="Enter your institution name"
                        required={showField}
                      />
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 text-lg focus-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Your Account"
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-charcoal/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary-blue hover:text-blue-700 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
