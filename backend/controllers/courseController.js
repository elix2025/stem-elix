import Course from "../models/CourseModel.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

export const createCourse = async (req, res) => {
  try {
    console.log("incoming course data:", req.body);
    const {
      title,
      categoryId,
      levelNumber,
      description,
      price,
      duration,
      gradeRangeMin,
      gradeRangeMax,
      status,
      order,
      featured,
    } = req.body;
    const CourseThumbnail = req.file;
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!categoryId) missingFields.push("categoryId");
    if (!levelNumber) missingFields.push("levelNumber");
    if (!description) missingFields.push("description");
    if (!duration) missingFields.push("duration");
    if (!gradeRangeMax) missingFields.push("grade range max");
    if (!gradeRangeMin) missingFields.push("grade range min");
    if (!price) missingFields.push("price");
    if (!CourseThumbnail) missingFields.push("CourseThumbnail");
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    const newCourse = new Course({
      title,
      categoryId,
      levelNumber,
      description,

      CourseThumbnail,
      duration,
      gradeRange: {
        min: gradeRangeMin,
        max: gradeRangeMax,
      },
      price,
      status,
      order,
      featured,
      CourseContent: [],
    });
    const thumbnailUpload = await cloudinary.uploader.upload(
      CourseThumbnail.path
    );
    newCourse.CourseThumbnail = thumbnailUpload.secure_url;

    const savedCourse = await newCourse.save();
    console.log(`Course created: ${savedCourse.title} by admin ${req.user.id}`);
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

//  Fetch single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  Add a new chapter to a course
export const addChapter = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { chapterOrder, chapterTitle } = req.body;

    if (!chapterTitle || !chapterOrder) {
      return res
        .status(400)
        .json({ message: "Missing required fields for chapter" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newChapter = {
      chapterId: uuidv4(),
      chapterOrder: chapterOrder,
      ChapterTitle: chapterTitle,
      chapterContent: [],
    };

    course.CourseContent.push(newChapter);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Chapter added successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Add a new lecture to a chapter
export const addLecture = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { lectureTitle, lectureDuration, isPreviewFree, lectureOrder } =
      req.body;
    const lectureFile = req.file; //video file comes from frontend via multipart

    if (
      !lectureTitle ||
      !lectureDuration ||
      !lectureFile ||
      isPreviewFree === undefined ||
      !lectureOrder
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields for lecture" });
    }

    // Fond course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    //find chapter
    const chapter = course.CourseContent.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const uploadVideo = await cloudinary.uploader.upload(lectureFile.path, {
      resource_type: "video", //imp. fr videos
      folder: "course_lectures",
    });

    const newLecture = {
      lectureId: uuidv4(),
      lectureTitle,
      lectureDuration,
      lectureUrl: uploadVideo.secure_url, //save cloudinary video url
      isPreviewFree,
      lectureOrder,
    };

    chapter.chapterContent.push(newLecture);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding lecture:", error);
    res.status(500).json({ message: "Server error" });
  }
};
