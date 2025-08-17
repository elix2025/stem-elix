import mongoose from "mongoose";
import Course from "./models/CourseModel.js";
import dotenv from "dotenv";
dotenv.config();

const placeholderImage =
  "https://via.placeholder.com/300x200.png?text=Course+Thumbnail";

const courses = [
  {
    title: "Introduction to Artificial Intelligence",
    categoryId: "AI",
    levelNumber: 1,
    description:
      "Learn the basics of AI, including history, applications, and simple algorithms.",
    CourseThumbnail: placeholderImage,
    duration: 2,
    gradeRange: { min: 6, max: 12 },
    price: 0,
    status: "active",
    order: 1,
    featured: true,
    CourseContent: [],
  },
  {
    title: "Mathematics for Machine Learning",
    categoryId: "Math",
    levelNumber: 2,
    description:
      "Essential math concepts for ML: calculus, linear algebra, probability.",
    CourseThumbnail: placeholderImage,
    duration: 3,
    gradeRange: { min: 8, max: 12 },
    price: 0,
    status: "active",
    order: 2,
    featured: false,
    CourseContent: [],
  },
  {
    title: "Python Programming Essentials",
    categoryId: "Programming",
    levelNumber: 1,
    description:
      "Start coding in Python: syntax, data types, loops, and functions.",
    CourseThumbnail: placeholderImage,
    duration: 1.5,
    gradeRange: { min: 6, max: 12 },
    price: 0,
    status: "active",
    order: 3,
    featured: true,
    CourseContent: [],
  },
  {
    title: "Robotics and Automation",
    categoryId: "Robotics",
    levelNumber: 2,
    description:
      "Explore robotics concepts, sensors, actuators, and simple projects.",
    CourseThumbnail: placeholderImage,
    duration: 2.5,
    gradeRange: { min: 8, max: 12 },
    price: 0,
    status: "active",
    order: 4,
    featured: false,
    CourseContent: [],
  },
  {
    title: "3D Modeling for Beginners",
    categoryId: "Modeling",
    levelNumber: 1,
    description:
      "Learn the basics of 3D modeling using free tools and simple projects.",
    CourseThumbnail: placeholderImage,
    duration: 2,
    gradeRange: { min: 6, max: 12 },
    price: 0,
    status: "active",
    order: 5,
    featured: false,
    CourseContent: [],
  },
  {
    title: "Cloud Computing Fundamentals",
    categoryId: "Cloud",
    levelNumber: 1,
    description:
      "Understand cloud basics, services, and how to deploy simple apps.",
    CourseThumbnail: placeholderImage,
    duration: 2,
    gradeRange: { min: 8, max: 12 },
    price: 0,
    status: "active",
    order: 6,
    featured: false,
    CourseContent: [],
  },
];

async function seedCourses() {
  await mongoose.connect(process.env.MONGO_URI);
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log("✅ Sample courses seeded!");
  mongoose.disconnect();
}

seedCourses();
