import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../context/api.js";
import Scanner from "../assets/scanner.jpg";

const Cart = () => {
  const { courseName } = useParams();
  const { getCourseByTitle, createPayment, currentUser } = useAPI(); 

  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseName) {
        setError("Course name is missing");
        return;
      }

      setLoading(true);
      setError(""); // Clear any previous errors
      
      try {
        const foundCourse = await getCourseByTitle(courseName);
        
        if (!foundCourse) {
          throw new Error("Failed to fetch course details");
        }

        if (foundCourse.message) {
          throw new Error(foundCourse.message);
        }

        if (!foundCourse.price) {
          throw new Error("Course price information is missing");
        }

        setCourse(foundCourse);
        setAmount(foundCourse.price);
      } catch (err) {
        setError(err?.message || "Failed to load course details");
        setCourse(null);
        setAmount(0);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseName, getCourseByTitle]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('File selected:', selectedFile ? {
      name: selectedFile.name,
      type: selectedFile.type,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
    } : 'No file');
    
    // Reset message when new file is selected
    setMessage("");

    // File validation
    if (selectedFile) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
        console.log('Invalid file type:', selectedFile.type);
        setMessage("Please upload a valid image file (JPG or PNG)");
        e.target.value = ''; // Reset input
        return;
      }

      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        console.log('File too large:', selectedFile.size);
        setMessage("File is too large. Maximum size is 5MB");
        e.target.value = ''; // Reset input
        return;
      }

      console.log('File validation passed, setting file');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payment submission started...');
    
    // Pre-submission validation
    if (!currentUser?._id) {
      console.log('Validation failed: User not logged in');
      setMessage("Please log in to continue with the payment");
      return;
    }

    if (!course?._id) {
      console.log('Validation failed: Course information missing');
      setMessage("Course information is missing");
      return;
    }

    if (!file) {
      console.log('Validation failed: No file uploaded');
      setMessage("Please upload a screenshot of your payment");
      return;
    }

    if (!amount || amount <= 0) {
      console.log('Validation failed: Invalid amount', amount);
      setMessage("Invalid course amount");
      return;
    }

    console.log('Payment submission data:', {
      userId: currentUser._id,
      courseId: course._id,
      amount: amount,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      token: currentUser.token ? 'Present' : 'Missing'
    });

    try {
      setLoading(true);
      setMessage(""); // Clear any previous messages

      // Additional validation
      if (!currentUser.token) {
        console.error('Token missing');
        throw new Error('Authentication token is missing. Please log in again.');
      }

      // Validate file type again
      if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
        console.error('Invalid file type:', file.type);
        throw new Error('Please upload a valid image file (JPG or PNG)');
      }

      console.log('Sending payment request to server...', {
        userId: currentUser._id,
        courseId: course._id,
        amount: amount,
        file: {
          name: file.name,
          type: file.type,
          size: file.size
        }
      });

      const response = await createPayment(
        currentUser._id,
        course._id,
        amount,
        file,
        currentUser.token
      );

      console.log('Server response:', response);

      if (response?.success) {
        console.log('Payment submitted successfully');
        setMessage(response.message || "Payment submitted successfully! Our team will verify it shortly.");
        setFile(null); // Clear the file input
        // Reset file input element
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        // You might want to redirect after a successful submission
        // setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        console.error('Payment submission failed:', response);
        throw new Error(response?.message || "Failed to submit payment");
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      setMessage(error.message || "An error occurred while submitting your payment");
    } finally {
      setLoading(false);
      console.log('Payment submission process completed');
    }
  };

  // Loading state
  if (loading && !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <p className="text-center text-gray-600 mt-4">Loading course...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Secure your spot in this amazing course
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Course Details Section */}
          {course && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden order-2 lg:order-1">
              {/* Course Image */}
              <div className="relative">
                <img
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                  src={course?.CourseThumbnail || "https://via.placeholder.com/400"}
                  alt={course?.title || "Course"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {course?.title}
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                  {course?.description}
                </p>

                {/* Price Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-base">Course Price:</span>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        ₹{amount?.toLocaleString() || '0'}
                      </div>
                      <p className="text-xs text-gray-500">One-time payment</p>
                    </div>
                  </div>
                </div>

                {/* Features/Benefits */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Lifetime access to course content
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Expert instructor support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden order-1 lg:order-2">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Payment Instructions
              </h3>

              {/* Payment Steps */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Scan the QR code below using any UPI app (GPay, PhonePe, Paytm, etc.)
                  </p>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Pay 
                    ₹{amount?.toLocaleString() || '0'}
                    and take a screenshot of successful payment
                  </p>
                </div>
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload the screenshot below and submit for verification
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="inline-block bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
                  <img 
                    src={Scanner} 
                    alt="Payment QR Code" 
                    className="w-40 h-40 sm:w-48 sm:h-48 mx-auto object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Scan with any UPI app to pay ₹{amount?.toLocaleString() || '0'}
                </p>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Payment Screenshot *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPG, PNG, JPEG (Max 5MB)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Payment Screenshot"
                  )}
                </button>

                {/* Message Display */}
                {message && (
                  <div className={`p-4 rounded-lg text-sm ${
                    message.includes("successfully") || message.includes("verified")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {message.includes("successfully") || message.includes("verified") ? "✅" : "⚠️"}
                      </span>
                      {message}
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <div className="text-yellow-600 mr-2 text-lg">💡</div>
                    <div>
                      <p className="text-xs text-yellow-800 leading-relaxed">
                        <strong>Important:</strong> Your course enrollment will be completed once our team verifies your payment. 
                        You'll receive a confirmation email with course access details within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-medium">Secure Payment Process</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your payment information is processed securely. We never store your financial data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;