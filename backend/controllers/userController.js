import Course from"../models/CourseModel.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

// Get user profile by user ID
export const getUserProfile = async (req, res) => {
  try {
    // Use req.user._id from protect middleware
    const user = await User.findById(req.user._id)
      .select(
        "name email role institute payments coursesEnrolled"
      )
      .populate("payments", "status amount createdAt")
      // .populate("coursesEnrolled.course", "title");
    if (!user || !req.user._id) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Input validation
    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Course ID are required"
      });
    }

    // Find user and course in parallel for better performance
    const [user, course] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Prevent duplicate enrollment
    if (user.coursesEnrolled.some((c) => c.course.toString() === courseId)) {
      return res.status(409).json({
        success: false,
        message: "User is already enrolled in this course"
      });
    }

    // Import Payment model at the top of the file
    const Payment = (await import("../models/orderModel.js")).default;

    // Check for verified payment
    const verifiedPayment = await Payment.findOne({
      user: userId,
      course: courseId,
      status: "verified"
    });

    if (!verifiedPayment) {
      return res.status(403).json({
        success: false,
        message: "Course enrollment requires payment verification first",
        requiresPayment: true
      });
    }

    // Proceed with enrollment
    user.coursesEnrolled.push({
      course: courseId,
      status: "in-progress",
      enrolledAt: new Date(),
      paymentId: verifiedPayment._id
    });

    // Update user statistics
    user.totalCoursesEnrolled = user.coursesEnrolled.length;
    
    // Update payment references
    if (!user.payments.includes(verifiedPayment._id)) {
      user.payments.push(verifiedPayment._id);
    }

    // Save user with new enrollment
    await user.save();

    // Update course enrollment count
    course.enrollmentCount = (course.enrollmentCount || 0) + 1;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Successfully enrolled in the course",
      enrollment: {
        courseId,
        courseName: course.title,
        enrollmentDate: new Date(),
        status: "in-progress",
        paymentId: verifiedPayment._id
      }
    });
  } catch (err) {
    console.error("Course enrollment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process course enrollment",
      error: err.message
    });
  }
};

// Mark course as completed
export const completeCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const courseObj = user.coursesEnrolled.find(
      (c) => c.course.toString() === courseId
    );
    if (!courseObj)
      return res.status(404).json({ message: "Course not found" });
    courseObj.status = "completed";
    user.coursesCompleted = user.coursesEnrolled.filter(
      (c) => c.status === "completed"
    ).length;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, institute } = req.body;

    // Basic field validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email! Please enter a valid email.",
      });
    }

    // Password length check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      institute,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create JWT token
    const token = createToken(savedUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Authenticates a user and returns a JWT token.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // to check if the user exists
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          // add other fields as needed
        },
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error.message" });
  }
};



// Route for admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {email, isAdmin: true},  process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500)({ success: false, message: error.message });
  }
};

// Add to courseController - content access
const checkCourseAccess = async (userId, courseId) => {
  const Payment = (await import("../models/orderModel.js")).default;
  const payment = await Payment.findOne({
    user: userId,
    course: courseId,
    status: "verified"
  });
  return !!payment;
};

// Admin endpoints for student management

// Get all students with their enrolled courses (Admin only)
export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status = "" } = req.query;
    
    // Build search query
    const searchQuery = search 
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { institute: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    // Add role filter to get only students
    searchQuery.role = { $ne: 'admin' };

    // Aggregation pipeline for rich student data
    const pipeline = [
      { $match: searchQuery },
      {
        $lookup: {
          from: 'payments',
          localField: '_id',
          foreignField: 'user',
          as: 'paymentHistory'
        }
      },
      {
        $lookup: {
          from: 'coursemodels',
          localField: 'coursesEnrolled.course',
          foreignField: '_id',
          as: 'enrolledCoursesDetails'
        }
      },
      {
        $addFields: {
          totalPayments: { $size: '$paymentHistory' },
          verifiedPayments: {
            $size: {
              $filter: {
                input: '$paymentHistory',
                cond: { $eq: ['$$this.status', 'verified'] }
              }
            }
          },
          totalSpent: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$paymentHistory',
                    cond: { $eq: ['$$this.status', 'verified'] }
                  }
                },
                in: '$$this.amount'
              }
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          institute: 1,
          createdAt: 1,
          totalCoursesEnrolled: 1,
          coursesCompleted: 1,
          coursesEnrolled: 1,
          enrolledCoursesDetails: {
            _id: 1,
            title: 1,
            categoryId: 1,
            price: 1,
            status: 1
          },
          paymentHistory: {
            _id: 1,
            amount: 1,
            status: 1,
            createdAt: 1,
            verifiedAt: 1,
            course: 1
          },
          totalPayments: 1,
          verifiedPayments: 1,
          totalSpent: 1
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) }
    ];

    const [students, totalCount] = await Promise.all([
      User.aggregate(pipeline),
      User.countDocuments(searchQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        students,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalStudents: totalCount,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error("Get all students error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students data",
      error: error.message
    });
  }
};

// Get detailed student profile with purchase history (Admin only)
export const getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required"
      });
    }

    const Payment = (await import("../models/orderModel.js")).default;

    // Get student with populated data
    const student = await User.findById(studentId)
      .select('-password')
      .populate({
        path: 'coursesEnrolled.course',
        select: 'title categoryId price status CourseThumbnail levelNumber'
      })
      .lean();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Get payment history
    const payments = await Payment.find({ user: studentId })
      .populate('course', 'title categoryId price')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const stats = {
      totalCoursesEnrolled: student.coursesEnrolled?.length || 0,
      completedCourses: student.coursesEnrolled?.filter(c => c.status === 'completed').length || 0,
      inProgressCourses: student.coursesEnrolled?.filter(c => c.status === 'in-progress').length || 0,
      totalPayments: payments.length,
      verifiedPayments: payments.filter(p => p.status === 'verified').length,
      pendingPayments: payments.filter(p => p.status === 'pending').length,
      totalAmountSpent: payments
        .filter(p => p.status === 'verified')
        .reduce((sum, p) => sum + p.amount, 0)
    };

    res.json({
      success: true,
      data: {
        student,
        payments,
        stats
      }
    });

  } catch (error) {
    console.error("Get student details error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
      error: error.message
    });
  }
};

// Get enrollment statistics for admin dashboard (Admin only)
export const getEnrollmentStats = async (req, res) => {
  try {
    const Payment = (await import("../models/orderModel.js")).default;
    
    // Get various statistics
    const [
      totalStudents,
      totalEnrollments,
      recentEnrollments,
      paymentStats,
      coursePopularity
    ] = await Promise.all([
      // Total students (exclude admins)
      User.countDocuments({ role: { $ne: 'admin' } }),
      
      // Total enrollments across all users
      User.aggregate([
        { $match: { role: { $ne: 'admin' } } },
        { $group: { _id: null, total: { $sum: '$totalCoursesEnrolled' } } }
      ]),
      
      // Recent enrollments (last 30 days)
      User.aggregate([
        { $match: { role: { $ne: 'admin' } } },
        { $unwind: '$coursesEnrolled' },
        {
          $match: {
            'coursesEnrolled.enrolledAt': {
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        },
        { $count: 'recentEnrollments' }
      ]),
      
      // Payment statistics
      Payment.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$amount' }
          }
        }
      ]),
      
      // Course popularity
      User.aggregate([
        { $match: { role: { $ne: 'admin' } } },
        { $unwind: '$coursesEnrolled' },
        {
          $lookup: {
            from: 'coursemodels',
            localField: 'coursesEnrolled.course',
            foreignField: '_id',
            as: 'courseInfo'
          }
        },
        { $unwind: '$courseInfo' },
        {
          $group: {
            _id: '$courseInfo._id',
            courseTitle: { $first: '$courseInfo.title' },
            categoryId: { $first: '$courseInfo.categoryId' },
            enrollments: { $sum: 1 },
            completions: {
              $sum: { $cond: [{ $eq: ['$coursesEnrolled.status', 'completed'] }, 1, 0] }
            }
          }
        },
        { $sort: { enrollments: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalStudents,
          totalEnrollments: totalEnrollments[0]?.total || 0,
          recentEnrollments: recentEnrollments[0]?.recentEnrollments || 0,
        },
        paymentStats,
        popularCourses: coursePopularity
      }
    });

  } catch (error) {
    console.error("Get enrollment stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollment statistics",
      error: error.message
    });
  }
};
