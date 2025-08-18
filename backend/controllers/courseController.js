import Course from "../models/CourseModel.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

export const createCourse = async (req, res) => {
  try {

        //  ADMIN CHECK
    if (!req.user?.isAdmin) {
      return res.status(401).json({ success: false, message: "Unauthorized Access" });
    }

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

    const thumbnailUpload = await cloudinary.uploader.upload(CourseThumbnail.path);

    const newCourse = new Course({
      title,
      categoryId,
      levelNumber,
      description,

      CourseThumbnail: thumbnailUpload.secure_url,
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
   

    const savedCourse = await newCourse.save();
    console.log(`Course created: ${savedCourse.title} by admin ${req.user.email}`);
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
    let query = {status: "active"};

    if(req.users?.isAdmin){
      query = {};
    }
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
    const {id} = req.params;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

        // If not admin → block draft/inactive
    if (!req.user?.isAdmin && course.status !== "active") {
      return res.status(403).json({ error: "This course is not available" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin can edit
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: "Only admins can edit courses" });
    }

    // Collect update fields (body may contain any of these)
    const {
      title,
      description,
      categoryId,
      levelNumber,
      duration,
      gradeRangeMin,
      gradeRangeMax,
      price,
      status,
    } = req.body;

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (categoryId) updateData.categoryId = categoryId;
    if (levelNumber) updateData.levelNumber = levelNumber;
    if (duration) updateData.duration = duration;
    if (gradeRangeMin) updateData.gradeRangeMin = gradeRangeMin;
    if (gradeRangeMax) updateData.gradeRangeMax = gradeRangeMax;
    if (price) updateData.price = price;
    if (status) updateData.status = status; // "draft" | "active" | "inactive"

    // Handle thumbnail update (if provided)
    if (req.file) {
      updateData.CourseThumbnail = req.file.path; // if uploading to cloudinary, replace with secure_url
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ error: "Failed to edit course" });
  }
};


// Delete course by courseId
export const deleteCourse = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(401).json({ message: "Unauthorized Access" });

    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
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

      // Check for duplicate chapter order
    if (course.CourseContent.some(ch => ch.chapterOrder === chapterOrder)) {
      return res.status(400).json({ message: "Chapter order already exists" });
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
      chapter: newChapter,
    });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editChapter = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId } = req.params;
    const { chapterTitle, chapterOrder } = req.body;
        if (!chapterTitle && !chapterOrder) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(chap => chap.chapterId === chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
       if (chapterOrder && course.CourseContent.some(ch => ch.chapterOrder === chapterOrder && ch.chapterId !== chapterId)) {
      return res.status(400).json({ message: "Chapter order already exists" });
    }



    if (chapterTitle) chapter.ChapterTitle = chapterTitle;
    if (chapterOrder) chapter.chapterOrder = chapterOrder;

    await course.save();
    res.status(200).json({ success: true, message: "Chapter updated successfully", course });
  } catch (error) {
    console.error("Error editing chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete chapter
export const deleteChapter = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const index = course.CourseContent.findIndex(chap => chap.chapterId === chapterId);
    if (index === -1) return res.status(404).json({ message: "Chapter not found" });

    course.CourseContent.splice(index, 1);
    await course.save();

    res.status(200).json({ success: true, message: "Chapter deleted successfully", course });
  } catch (error) {
    console.error("Error deleting chapter:", error);
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

export const editLecture = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId, lectureId } = req.params;
    const { lectureTitle, lectureDuration, isPreviewFree, lectureOrder } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(chap => chap.chapterId === chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const lecture = chapter.chapterContent.find(lec => lec.lectureId === lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (lectureDuration) lecture.lectureDuration = lectureDuration;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree;
    if (lectureOrder) lecture.lectureOrder = lectureOrder;

    await course.save();
    res.status(200).json({ success: true, message: "Lecture updated successfully", course });
  } catch (error) {
    console.error("Error editing lecture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete lecture
export const deleteLecture = async (req, res) => {
  try {
    if (!req.user?.isAdmin) return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId, lectureId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(chap => chap.chapterId === chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const index = chapter.chapterContent.findIndex(lec => lec.lectureId === lectureId);
    if (index === -1) return res.status(404).json({ message: "Lecture not found" });

    chapter.chapterContent.splice(index, 1);
    await course.save();

    res.status(200).json({ success: true, message: "Lecture deleted successfully", course });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all chapters and lectures of a specific course
export const getCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("Fetching content for courseId:", courseId);

    // Find course and fetch its content
    const course = await Course.findById(courseId).select("title CourseContent");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      courseId,
      title: course.title,
      chapters: course.CourseContent,
    });
  } catch (error) {
    console.error("Error fetching course content:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//project
export const createProject = async (req, res) => {
  try {
    const { courseId} = req.params;
    const { projectName, ProjectDescription, projectupload } = req.body;

    if (!projectName || !ProjectDescription || !projectupload) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newProject = {
      projectId: uuidv4(),
      projectName,
      ProjectDescription,
      projectupload,
      updatedAt: new Date(),
    };

    course.project.push(newProject);
    await course.save();

 

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    });
} catch(error) {
   console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });

}
};

export const submitProject = async (req, res) => {
  try {
    const { courseId, projectId } = req.params;
    const { submissionFile } = req.body;

    const userId = req.user?._id; // user should be logged in
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if project exists inside course
    const projectExists = course.project.id(projectId);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newSubmission = {
      projectId,
      userId,
      submissionFile,
    };

    course.submissions.push(newSubmission);
    await course.save();

   

    res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const course = await Course.findById(courseId).select("submissions project");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Filter only this user's submissions
    const userSubmissions = course.submissions.filter(
      (sub) => sub.userId.toString() === userId.toString()
    );

    res.status(200).json({
      success: true,
      courseId,
      submissions: userSubmissions,
    });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};