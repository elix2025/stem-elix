import mongoose from "mongoose";
import CourseModel from "../models/CourseModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedCourses = [
  {
    title: "Introduction to Robotics and AI",
    categoryId: "Junior",
    levelNumber: 1,
    description:
      "Dive into the fascinating world of robotics and artificial intelligence. This beginner-friendly course will teach you the fundamentals of robotics, programming, and AI concepts through hands-on projects and interactive lessons. Perfect for young minds curious about technology!",
    CourseThumbnail:
      "https://res.cloudinary.com/dagzofoow/image/upload/v1726309123/courses/robotics-intro-thumbnail.jpg",
    duration: "4 weeks",
    gradeRange: {
      min: 3,
      max: 6,
    },
    price: 2999,
    originalPrice: 4999,
    instructor: {
      name: "Dr. Sarah Chen",
      bio: "Dr. Sarah Chen is a robotics engineer with 15+ years of experience in AI and robotics education. She has worked with NASA and teaches at Stanford University.",
      avatar:
        "https://res.cloudinary.com/dagzofoow/image/upload/v1726309123/instructors/sarah-chen-avatar.jpg",
      qualifications: [
        "PhD in Robotics Engineering from MIT",
        "Former NASA Robotics Engineer",
        "Published 50+ research papers on AI",
        "Stanford University Professor",
      ],
      experience: "15+ years in robotics and AI education",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarah-chen-robotics",
        twitter: "https://twitter.com/sarahchen_ai",
        website: "https://sarahchen-robotics.com",
      },
    },
    highlights: [
      "Build your first robot from scratch",
      "Learn basic programming with Scratch",
      "Understand AI concepts through fun games",
      "Create interactive robotic projects",
      "Get hands-on with sensors and motors",
      "Certificate of completion included",
    ],
    difficulty: "Beginner",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    prerequisites: [
      "Basic computer skills",
      "Curiosity about technology",
      "No prior programming experience needed",
    ],
    learningOutcomes: [
      "Understand basic robotics principles",
      "Create simple programs using Scratch",
      "Build and control basic robotic systems",
      "Recognize AI applications in daily life",
      "Develop problem-solving skills",
      "Gain confidence in technology exploration",
    ],
    language: "English",
    hasCertificate: true,
    accessType: "lifetime",
    status: "active",
    order: 1,
    featured: true,
    enrollmentCount: 156,
    rating: {
      average: 4.8,
      count: 45,
    },
    tags: ["robotics", "AI", "beginner", "kids", "STEM", "programming"],
    CourseContent: [
      {
        chapterId: "ch1-intro",
        chapterOrder: 1,
        ChapterTitle: "Welcome to Robotics",
        chapterContent: [
          {
            lectureId: "lec1-1",
            lectureTitle: "What are Robots?",
            lectureDuration: "8:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lec1-2",
            lectureTitle: "Types of Robots in Our World",
            lectureDuration: "12:15",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "lec1-3",
            lectureTitle: "Robot Parts and Components",
            lectureDuration: "15:45",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "ch2-programming",
        chapterOrder: 2,
        ChapterTitle: "Programming Basics",
        chapterContent: [
          {
            lectureId: "lec2-1",
            lectureTitle: "Introduction to Scratch Programming",
            lectureDuration: "18:20",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "lec2-2",
            lectureTitle: "Making Your First Program",
            lectureDuration: "22:10",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "ch3-building",
        chapterOrder: 3,
        ChapterTitle: "Building Your First Robot",
        chapterContent: [
          {
            lectureId: "lec3-1",
            lectureTitle: "Gathering Materials",
            lectureDuration: "10:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "lec3-2",
            lectureTitle: "Assembly Instructions",
            lectureDuration: "25:45",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 2,
          },
          {
            lectureId: "lec3-3",
            lectureTitle: "Testing and Troubleshooting",
            lectureDuration: "16:20",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
    ],
    project: [
      {
        projectId: "proj1-robot",
        projectName: "Build a Simple Drawing Robot",
        ProjectDescription:
          "Create a robot that can draw simple shapes and patterns. This project will combine everything you've learned about robotics, programming, and creativity!",
        projectupload:
          "https://res.cloudinary.com/dagzofoow/raw/upload/v1726309123/projects/drawing-robot-guide.pdf",
      },
    ],
  },
  {
    title: "Advanced Machine Learning and Neural Networks",
    categoryId: "Master",
    levelNumber: 8,
    description:
      "Master the cutting-edge concepts of machine learning and neural networks. This advanced course covers deep learning architectures, computer vision, natural language processing, and real-world AI applications. Build sophisticated AI systems from scratch!",
    CourseThumbnail:
      "https://res.cloudinary.com/dagzofoow/image/upload/v1726309123/courses/ml-advanced-thumbnail.jpg",
    duration: "12 weeks",
    gradeRange: {
      min: 9,
      max: 12,
    },
    price: 8999,
    originalPrice: 12999,
    instructor: {
      name: "Prof. Michael Rodriguez",
      bio: "Prof. Michael Rodriguez is a leading AI researcher and former Google DeepMind scientist. He specializes in neural networks and has contributed to breakthrough AI technologies.",
      avatar:
        "https://res.cloudinary.com/dagzofoow/image/upload/v1726309123/instructors/michael-rodriguez-avatar.jpg",
      qualifications: [
        "PhD in Computer Science from Carnegie Mellon",
        "Former Google DeepMind Senior Scientist",
        "Author of 'Deep Learning Mastery' textbook",
        "IEEE Fellow in Artificial Intelligence",
      ],
      experience: "12+ years in AI research and development",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michael-rodriguez-ai",
        twitter: "https://twitter.com/prof_rodriguez",
        website: "https://michaelrodriguez-ai.com",
      },
    },
    highlights: [
      "Build state-of-the-art neural networks",
      "Master TensorFlow and PyTorch frameworks",
      "Implement computer vision systems",
      "Create natural language processing models",
      "Deploy AI models to production",
      "Work on real industry projects",
      "Access to exclusive AI research papers",
      "1-on-1 mentorship sessions included",
    ],
    difficulty: "Advanced",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    prerequisites: [
      "Strong Python programming skills",
      "Understanding of linear algebra and calculus",
      "Basic knowledge of statistics and probability",
      "Familiarity with data structures and algorithms",
      "Previous experience with machine learning concepts",
    ],
    learningOutcomes: [
      "Design and implement deep neural networks",
      "Master convolutional and recurrent neural networks",
      "Build computer vision applications",
      "Create sophisticated NLP systems",
      "Understand transformer architectures",
      "Deploy ML models using cloud platforms",
      "Optimize model performance and efficiency",
      "Conduct AI research and experimentation",
    ],
    language: "English",
    hasCertificate: true,
    accessType: "lifetime",
    status: "active",
    order: 2,
    featured: true,
    enrollmentCount: 89,
    rating: {
      average: 4.9,
      count: 32,
    },
    tags: [
      "machine learning",
      "neural networks",
      "deep learning",
      "AI",
      "python",
      "advanced",
      "computer vision",
      "NLP",
    ],
    CourseContent: [
      {
        chapterId: "ch1-foundations",
        chapterOrder: 1,
        ChapterTitle: "Deep Learning Foundations",
        chapterContent: [
          {
            lectureId: "lec1-1",
            lectureTitle: "Neural Network Architecture Deep Dive",
            lectureDuration: "45:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lec1-2",
            lectureTitle: "Backpropagation and Gradient Descent",
            lectureDuration: "38:15",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "lec1-3",
            lectureTitle: "Activation Functions and Optimization",
            lectureDuration: "42:45",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "ch2-cnn",
        chapterOrder: 2,
        ChapterTitle: "Convolutional Neural Networks",
        chapterContent: [
          {
            lectureId: "lec2-1",
            lectureTitle: "CNN Architecture and Convolution Operations",
            lectureDuration: "52:20",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "lec2-2",
            lectureTitle: "Pooling Layers and Feature Maps",
            lectureDuration: "35:10",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 2,
          },
          {
            lectureId: "lec2-3",
            lectureTitle: "Building an Image Classifier",
            lectureDuration: "67:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "ch3-rnn",
        chapterOrder: 3,
        ChapterTitle: "Recurrent Neural Networks and LSTMs",
        chapterContent: [
          {
            lectureId: "lec3-1",
            lectureTitle: "Understanding Sequential Data",
            lectureDuration: "28:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "lec3-2",
            lectureTitle: "LSTM and GRU Architecture",
            lectureDuration: "45:45",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 2,
          },
          {
            lectureId: "lec3-3",
            lectureTitle: "Building a Language Model",
            lectureDuration: "58:20",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "ch4-transformers",
        chapterOrder: 4,
        ChapterTitle: "Transformer Architecture and Attention",
        chapterContent: [
          {
            lectureId: "lec4-1",
            lectureTitle: "Self-Attention Mechanism",
            lectureDuration: "41:15",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "lec4-2",
            lectureTitle: "Multi-Head Attention and Positional Encoding",
            lectureDuration: "48:30",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 2,
          },
          {
            lectureId: "lec4-3",
            lectureTitle: "Building GPT from Scratch",
            lectureDuration: "72:45",
            lectureUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            youtubeData: {
              videoId: "dQw4w9WgXcQ",
              isUnlisted: true,
            },
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
    ],
    project: [
      {
        projectId: "proj1-cv",
        projectName: "Advanced Computer Vision System",
        ProjectDescription:
          "Build a comprehensive computer vision system that can detect, classify, and track objects in real-time video streams. Implement YOLO architecture and deploy to edge devices.",
        projectupload:
          "https://res.cloudinary.com/dagzofoow/raw/upload/v1726309123/projects/cv-system-guide.pdf",
      },
      {
        projectId: "proj2-nlp",
        projectName: "Natural Language Processing Engine",
        ProjectDescription:
          "Create a sophisticated NLP engine capable of sentiment analysis, named entity recognition, and text generation using transformer architecture.",
        projectupload:
          "https://res.cloudinary.com/dagzofoow/raw/upload/v1726309123/projects/nlp-engine-guide.pdf",
      },
    ],
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Clear existing courses (optional - comment out if you want to keep existing data)
    // await CourseModel.deleteMany({});
    // console.log("Cleared existing courses");

    // Insert seed courses
    const insertedCourses = await CourseModel.insertMany(seedCourses);
    console.log(`Successfully seeded ${insertedCourses.length} courses`);

    // Log the created courses
    insertedCourses.forEach((course) => {
      console.log(`✅ Created course: ${course.title} (ID: ${course._id})`);
      console.log(
        `   - Category: ${course.categoryId}, Level: ${course.levelNumber}`
      );
      console.log(`   - Instructor: ${course.instructor.name}`);
      console.log(`   - Chapters: ${course.CourseContent.length}`);
      console.log(`   - Total Lectures: ${course.totalLectures}`);
      console.log(`   - Price: ₹${course.price}`);
      console.log(
        `   - Rating: ${course.rating.average}/5 (${course.rating.count} reviews)`
      );
      console.log("");
    });

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeding function
if (process.argv[2] === "--seed") {
  seedDatabase();
}

export { seedCourses, seedDatabase };
