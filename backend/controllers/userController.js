import Course from"../models/CourseModel.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get user profile by user ID
export const getUserProfile = async (req, res) => {
  try {
    // Use req.user._id from protect middleware
    const user = await User.findById(req.user._id)
      .select(
        "name email role coursesEnrolled totalCoursesEnrolled coursesCompleted"
      )
      .populate("coursesEnrolled.course", "title");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Prevent duplicate enrollment
    if (user.coursesEnrolled.some((c) => c.course.toString() === courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    user.coursesEnrolled.push({ course: courseId, status: "in-progress" });
    user.totalCoursesEnrolled = user.coursesEnrolled.length;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
