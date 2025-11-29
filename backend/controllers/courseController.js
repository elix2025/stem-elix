import Course from "../models/CourseModel.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

export const createCourse = async (req, res) => {
  try {
    //  ADMIN CHECK
    if (!req.user?.isAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    console.log("incoming course data:", req.body);
    
    const {
      title,
      coursename,
      levelNumber,
      description,
      price,
      originalPrice,
      duration,
      gradeRangeMin,
      gradeRangeMax,
      status = "draft",
      order = 0,
      featured = false,
      tags = [],
      highlights = [],
      difficulty = "Beginner",
      demoVideo,
      prerequisites = [],
      learningOutcomes = [],
      language = "English",
      hasCertificate = true,
      accessType = "lifetime",
      // Instructor information
      instructorName,
      instructorBio,
      instructorQualifications = [],
      instructorExperience,
      instructorLinkedin,
      instructorTwitter,
      instructorWebsite,
    } = req.body;

    const CourseThumbnail = req.files?.CourseThumbnail?.[0];
    const instructorAvatar = req.files?.instructorAvatar?.[0];

    console.log("🔍 Required field check:", {
      title: title,
      titleTrimmed: title?.trim(),
      coursename: coursename,
      CourseThumbnail: !!CourseThumbnail
    });

    // Validate required fields
    const missingFields = [];
    if (!title?.trim()) missingFields.push("title");
    if (!coursename) missingFields.push("coursename");
    // levelNumber, description, duration, gradeRange, price can be empty - will use defaults
    if (!CourseThumbnail) missingFields.push("CourseThumbnail");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate grade range - provide defaults if empty
    // Handle empty strings and undefined/null values
    let minGrade = 1; // default
    let maxGrade = 12; // default
    
    if (gradeRangeMin && gradeRangeMin.toString().trim() && !isNaN(gradeRangeMin)) {
      minGrade = parseInt(gradeRangeMin);
    }
    
    if (gradeRangeMax && gradeRangeMax.toString().trim() && !isNaN(gradeRangeMax)) {
      maxGrade = parseInt(gradeRangeMax);
    }
    
    if (minGrade < 1 || minGrade > 12 || maxGrade < 1 || maxGrade > 12) {
      return res.status(400).json({
        success: false,
        message: "Grade range must be between 1 and 12",
      });
    }
    if (minGrade > maxGrade) {
      return res.status(400).json({
        success: false,
        message: "Minimum grade cannot be greater than maximum grade",
      });
    }

    // Validate category
    if (!["Junior", "Explorer", "Master"].includes(coursename)) {
      return res.status(400).json({
        success: false,
        message: "Category must be Junior, Explorer, or Master",
      });
    }

    // Upload thumbnail to cloudinary
    const thumbnailUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "course_thumbnails",
          transformation: [
            { width: 800, height: 600, crop: "fill" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(CourseThumbnail.buffer);
    });

    // Upload instructor avatar if provided
    let instructorAvatarUrl = null;
    if (instructorAvatar) {
      const avatarUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "instructor_avatars",
            transformation: [
              { width: 300, height: 300, crop: "fill" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(instructorAvatar.buffer);
      });
      instructorAvatarUrl = avatarUpload.secure_url;
    }

    const newCourse = new Course({
      title: title.trim(),
      coursename,
      levelNumber: levelNumber ? parseInt(levelNumber) : 1,
      description: description && description.trim() ? description.trim() : "Course description pending",
      CourseThumbnail: thumbnailUpload.secure_url,
      duration: duration && duration.trim() ? duration.trim() : "TBD",
      gradeRange: {
      min: minGrade,
      max: maxGrade,
      },
      price: price && price.toString().trim() ? parseFloat(price) : 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      status,
      order: parseInt(order),
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags.filter((tag) => tag.trim()) : [],
      highlights: Array.isArray(highlights)
      ? highlights.filter((h) => h.trim())
      : [],
      difficulty,
      demoVideo: demoVideo?.trim() || undefined, // Make demoVideo optional
      prerequisites: Array.isArray(prerequisites)
      ? prerequisites.filter((p) => p.trim())
      : [],
      learningOutcomes: Array.isArray(learningOutcomes)
      ? learningOutcomes.filter((l) => l.trim())
      : [],
      language,
      hasCertificate: Boolean(hasCertificate),
      accessType,
      instructor: {
      name: instructorName?.trim() || null,
      bio: instructorBio?.trim() || null,
      avatar: instructorAvatarUrl,
      qualifications: Array.isArray(instructorQualifications)
        ? instructorQualifications.filter((q) => q.trim())
        : [],
      experience: instructorExperience?.trim() || null,
      socialLinks: {
        linkedin: instructorLinkedin?.trim() || null,
        twitter: instructorTwitter?.trim() || null,
        website: instructorWebsite?.trim() || null,
      },
      },
      CourseContent: [],
    });

    const savedCourse = await newCourse.save();
    console.log(
      `Course created: ${savedCourse.title} by admin ${req.user.email}`
    );

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: {
        _id: savedCourse._id,
        title: savedCourse.title,
        slug: savedCourse.slug,
        coursename: savedCourse.coursename,
        levelNumber: savedCourse.levelNumber,
        description: savedCourse.description,
        CourseThumbnail: savedCourse.CourseThumbnail,
        duration: savedCourse.duration,
        gradeRange: savedCourse.gradeRange,
        price: savedCourse.price,
        originalPrice: savedCourse.originalPrice,
        status: savedCourse.status,
        order: savedCourse.order,
        featured: savedCourse.featured,
        tags: savedCourse.tags,
        highlights: savedCourse.highlights,
        difficulty: savedCourse.difficulty,
        demoVideo: savedCourse.demoVideo,
        instructor: savedCourse.instructor,
        totalChapters: savedCourse.totalChapters,
        totalLectures: savedCourse.totalLectures,
        createdAt: savedCourse.createdAt,
        updatedAt: savedCourse.updatedAt,
      },
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    console.log("🔍 getAllCourses called with query:", req.query);
    console.log("👤 User:", req.user ? "authenticated" : "not authenticated");

    let query = {};

    // Base query - show only active courses for non-admin users
    if (!req.user?.isAdmin) {
      query.status = "active";
      console.log("🔒 Non-admin user, filtering to active courses only");
    } else {
      console.log("👨‍💼 Admin user, showing all courses");
    }

    console.log("🔍 Final query:", JSON.stringify(query, null, 2));

    const courses = await Course.find(query)
      .select(
        "title slug coursename levelNumber description CourseThumbnail duration gradeRange price status order featured tags enrollmentCount rating createdAt updatedAt"
      )
      .lean();

    console.log("📚 Courses found:", courses.length);
    console.log("📊 Total courses in DB matching query:", courses.length);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
//  Fetch single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(id).lean();
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // If not admin → block draft/inactive
    if (!req.user?.isAdmin && course.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "This course is not available",
      });
    }

    // Add computed fields
    const courseWithVirtuals = {
      ...course,
      totalChapters: course.CourseContent?.length || 0,
      totalLectures:
        course.CourseContent?.reduce(
          (total, chapter) => total + (chapter.chapterContent?.length || 0),
          0
        ) || 0,
      previewLectures:
        course.CourseContent?.flatMap(
          (chapter) =>
            chapter.chapterContent
              ?.filter((lecture) => lecture.isPreviewFree)
              .map((lecture) => ({
                lectureId: lecture.lectureId,
                lectureTitle: lecture.lectureTitle,
                chapterTitle: chapter.ChapterTitle,
                lectureUrl: lecture.lectureUrl,
              })) || []
        ) || [],
    };

    res.status(200).json({
      success: true,
      course: courseWithVirtuals,
    });
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Course slug is required",
      });
    }

    console.log(`🔍 Looking for course with slug: ${slug}`);

    // Find course by slug (which is indexed)
    let course = await Course.findOne({ slug: slug.toLowerCase() }).lean();

    // Fallback: try to find by generated slug from title
    if (!course) {
      console.log(`🔄 Fallback: searching by title for slug: ${slug}`);
      const decodedTitle = decodeURIComponent(slug).replace(/-/g, " ");
      course = await Course.findOne({
        title: { $regex: new RegExp(`^${decodedTitle}$`, "i") },
      }).lean();
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // If not admin → block draft/inactive
    if (!req.user?.isAdmin && course.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "This course is not available",
      });
    }

    // Add computed fields
    const courseWithVirtuals = {
      ...course,
      totalChapters: course.CourseContent?.length || 0,
      totalLectures:
        course.CourseContent?.reduce(
          (total, chapter) => total + (chapter.chapterContent?.length || 0),
          0
        ) || 0,
      previewLectures:
        course.CourseContent?.flatMap(
          (chapter) =>
            chapter.chapterContent
              ?.filter((lecture) => lecture.isPreviewFree)
              .map((lecture) => ({
                lectureId: lecture.lectureId,
                lectureTitle: lecture.lectureTitle,
                chapterTitle: chapter.ChapterTitle,
                lectureUrl: lecture.lectureUrl,
              })) || []
        ) || [],
    };

    res.status(200).json({
      success: true,
      course: courseWithVirtuals,
    });
  } catch (err) {
    console.error("Error fetching course by slug:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin can edit
    if (!req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can edit courses",
      });
    }

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    // Collect update fields
    const {
      title,
      description,
      coursename,
      levelNumber,
      duration,
      gradeRangeMin,
      gradeRangeMax,
      price,
      status,
      order,
      featured,
      tags,
      highlights,
      prerequisites,
      learningOutcomes,
      difficulty,
      demoVideo,
      language,
      hasCertificate,
      accessType,
    } = req.body;

    const updateData = {};

    if (title?.trim()) updateData.title = title.trim();
    if (description?.trim()) updateData.description = description.trim();
    if (coursename) updateData.coursename = coursename;
    if (levelNumber) updateData.levelNumber = parseInt(levelNumber);
    if (duration?.trim()) updateData.duration = duration.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (status && ["draft", "active", "inactive"].includes(status)) {
      updateData.status = status;
    }
    if (order !== undefined) updateData.order = parseInt(order);
    if (featured !== undefined) {
      // Handle boolean from FormData (comes as string) or JSON (actual boolean)
      updateData.featured = featured === "true" || featured === true;
    }
    
    // Handle array fields - they might come as JSON strings from FormData or actual arrays from JSON
    const parseArray = (field) => {
      if (!field) return [];
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch (e) {
          return [field];
        }
      }
      return Array.isArray(field) ? field : [];
    };

    if (tags !== undefined) {
      const tagArray = parseArray(tags);
      updateData.tags = tagArray.filter((tag) => tag?.trim?.());
    }
    
    // Handle array fields for highlights, prerequisites, learning outcomes
    if (highlights !== undefined) {
      const highlightArray = parseArray(highlights);
      updateData.highlights = highlightArray.filter((h) => h?.trim?.());
    }
    
    if (prerequisites !== undefined) {
      const prereqArray = parseArray(prerequisites);
      updateData.prerequisites = prereqArray.filter((p) => p?.trim?.());
    }
    
    if (learningOutcomes !== undefined) {
      const outcomeArray = parseArray(learningOutcomes);
      updateData.learningOutcomes = outcomeArray.filter((l) => l?.trim?.());
    }
    
    // Handle other optional fields
    if (difficulty) updateData.difficulty = difficulty;
    if (demoVideo?.trim()) updateData.demoVideo = demoVideo.trim();
    if (language) updateData.language = language;
    if (hasCertificate !== undefined) updateData.hasCertificate = Boolean(hasCertificate);
    if (accessType) updateData.accessType = accessType;

    // Handle grade range update
    if (gradeRangeMin !== undefined || gradeRangeMax !== undefined) {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const minGrade =
        gradeRangeMin !== undefined
          ? parseInt(gradeRangeMin)
          : course.gradeRange.min;
      const maxGrade =
        gradeRangeMax !== undefined
          ? parseInt(gradeRangeMax)
          : course.gradeRange.max;

      if (minGrade < 1 || minGrade > 12 || maxGrade < 1 || maxGrade > 12) {
        return res.status(400).json({
          success: false,
          message: "Grade range must be between 1 and 12",
        });
      }
      if (minGrade > maxGrade) {
        return res.status(400).json({
          success: false,
          message: "Minimum grade cannot be greater than maximum grade",
        });
      }

      updateData.gradeRange = { min: minGrade, max: maxGrade };
    }

    // Handle thumbnail update
    if (req.file) {
      const thumbnailUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "course_thumbnails",
            transformation: [
              { width: 800, height: 600, crop: "fill" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      updateData.CourseThumbnail = thumbnailUpload.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to edit course",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete course by courseId
export const deleteCourse = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res.status(401).json({ message: "Unauthorized Access" });

    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Add a new chapter to a course
export const addChapter = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { courseId } = req.params;
    const { chapterOrder, chapterTitle } = req.body;

    // Validate required fields
    if (!chapterTitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Chapter title is required",
      });
    }
    if (!chapterOrder || chapterOrder < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid chapter order (≥1) is required",
      });
    }

    // Validate ObjectId format
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check for duplicate chapter order
    const orderExists = course.CourseContent.some(
      (ch) => ch.chapterOrder === parseInt(chapterOrder)
    );
    if (orderExists) {
      return res.status(400).json({
        success: false,
        message: "Chapter order already exists",
      });
    }

    const newChapter = {
      chapterId: uuidv4(),
      chapterOrder: parseInt(chapterOrder),
      ChapterTitle: chapterTitle.trim(),
      chapterContent: [],
    };

    course.CourseContent.push(newChapter);

    // Sort chapters by order
    course.CourseContent.sort((a, b) => a.chapterOrder - b.chapterOrder);

    await course.save();

    res.status(201).json({
      success: true,
      message: "Chapter added successfully",
      chapter: newChapter,
      totalChapters: course.CourseContent.length,
    });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const editChapter = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId } = req.params;
    const { chapterTitle, chapterOrder } = req.body;
    if (!chapterTitle && !chapterOrder) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    if (
      chapterOrder &&
      course.CourseContent.some(
        (ch) => ch.chapterOrder === chapterOrder && ch.chapterId !== chapterId
      )
    ) {
      return res.status(400).json({ message: "Chapter order already exists" });
    }

    if (chapterTitle) chapter.ChapterTitle = chapterTitle;
    if (chapterOrder) chapter.chapterOrder = chapterOrder;

    await course.save();
    res
      .status(200)
      .json({ success: true, message: "Chapter updated successfully", course });
  } catch (error) {
    console.error("Error editing chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete chapter
export const deleteChapter = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const index = course.CourseContent.findIndex(
      (chap) => chap.chapterId === chapterId
    );
    if (index === -1)
      return res.status(404).json({ message: "Chapter not found" });

    course.CourseContent.splice(index, 1);
    await course.save();

    res
      .status(200)
      .json({ success: true, message: "Chapter deleted successfully", course });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Add a new lecture to a chapter
export const addLecture = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { courseId, chapterId } = req.params;
    const { lectureTitle, lectureUrl } = req.body;
    let { lectureDuration, lectureOrder, isPreviewFree } = req.body;

    // Validate and sanitize inputs
    lectureDuration = String(lectureDuration);
    lectureOrder = parseInt(lectureOrder);
    isPreviewFree = isPreviewFree === "true" || isPreviewFree === true;

    // Validate required fields
    const missingFields = [];
    if (!lectureTitle?.trim()) missingFields.push("lectureTitle");
    if (!lectureDuration?.trim()) missingFields.push("lectureDuration");
    if (!lectureOrder || lectureOrder < 1)
      missingFields.push("lectureOrder (≥1)");
    if (isPreviewFree === undefined) missingFields.push("isPreviewFree");
    if (!lectureUrl?.trim()) missingFields.push("lectureUrl");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields",
        missingFields,
      });
    }

    // Validate duration format (MM:SS or HH:MM)
    if (!/^\d{1,2}:\d{2}$/.test(lectureDuration)) {
      return res.status(400).json({
        success: false,
        message: "Duration must be in format MM:SS or HH:MM",
      });
    }

    // Validate ObjectId formats
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find chapter
    const chapter = course.CourseContent.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Check for duplicate lecture order within chapter
    const orderExists = chapter.chapterContent.some(
      (lec) => lec.lectureOrder === lectureOrder
    );
    if (orderExists) {
      return res.status(400).json({
        success: false,
        message: "Lecture order already exists in this chapter",
      });
    }

    // Validate and process YouTube URL
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    const match = lectureUrl.match(youtubeRegex);
    if (!match) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid YouTube URL format. Please provide a valid YouTube URL",
      });
    }

    const videoId = match[4];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    const newLecture = {
      lectureId: uuidv4(),
      lectureTitle: lectureTitle.trim(),
      lectureDuration,
      lectureUrl: embedUrl,
      youtubeData: {
        videoId,
        isUnlisted: true,
      },
      isPreviewFree,
      lectureOrder,
    };

    chapter.chapterContent.push(newLecture);

    // Sort lectures by order within chapter
    chapter.chapterContent.sort((a, b) => a.lectureOrder - b.lectureOrder);

    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture: newLecture,
      chapterInfo: {
        chapterId: chapter.chapterId,
        chapterTitle: chapter.ChapterTitle,
        totalLectures: chapter.chapterContent.length,
      },
    });
  } catch (error) {
    console.error("Error adding lecture:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId, lectureId } = req.params;
    const { lectureTitle, lectureDuration, isPreviewFree, lectureOrder } =
      req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const lecture = chapter.chapterContent.find(
      (lec) => lec.lectureId === lectureId
    );
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (lectureDuration) lecture.lectureDuration = lectureDuration;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree;
    if (lectureOrder) lecture.lectureOrder = lectureOrder;

    await course.save();
    res
      .status(200)
      .json({ success: true, message: "Lecture updated successfully", course });
  } catch (error) {
    console.error("Error editing lecture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete lecture
export const deleteLecture = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res.status(401).json({ message: "Unauthorized Access" });

    const { courseId, chapterId, lectureId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const chapter = course.CourseContent.find(
      (chap) => chap.chapterId === chapterId
    );
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const index = chapter.chapterContent.findIndex(
      (lec) => lec.lectureId === lectureId
    );
    if (index === -1)
      return res.status(404).json({ message: "Lecture not found" });

    chapter.chapterContent.splice(index, 1);
    await course.save();

    res
      .status(200)
      .json({ success: true, message: "Lecture deleted successfully", course });
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
    const course = await Course.findById(courseId).select(
      "title CourseContent"
    );

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

// Create project for a course
export const createProject = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { courseId } = req.params;
    const { projectName, ProjectDescription } = req.body;
    const projectFile = req.file;

    // Validate required fields
    const missingFields = [];
    if (!projectName?.trim()) missingFields.push("projectName");
    if (!ProjectDescription?.trim()) missingFields.push("ProjectDescription");
    if (!projectFile) missingFields.push("projectFile");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields,
      });
    }

    // Validate ObjectId format
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Upload project file to cloudinary
    const projectUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // auto-detect file type
          folder: "course_projects",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(projectFile.buffer);
    });

    const newProject = {
      projectId: uuidv4(),
      projectName: projectName.trim(),
      ProjectDescription: ProjectDescription.trim(),
      projectupload: projectUpload.secure_url,
      updatedAt: new Date(),
    };

    course.project.push(newProject);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: newProject,
      totalProjects: course.project.length,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const submitProject = async (req, res) => {
  try {
    const { courseId, projectId } = req.params;
    const submissionFile = req.file;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found",
      });
    }

    // Validate required fields
    if (!submissionFile) {
      return res.status(400).json({
        success: false,
        message: "Submission file is required",
      });
    }

    // Validate ObjectId format
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if project exists in course
    const projectExists = course.project.find((p) => p.projectId === projectId);
    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found in this course",
      });
    }

    // Check if user already submitted for this project
    const existingSubmission = course.submissions.find(
      (sub) =>
        sub.projectId === projectId &&
        sub.userId.toString() === userId.toString()
    );
    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted for this project",
      });
    }

    // Upload submission file to cloudinary
    const submissionUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "project_submissions",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(submissionFile.buffer);
    });

    const newSubmission = {
      projectId,
      userId,
      submissionFile: submissionUpload.secure_url,
      submittedAt: new Date(),
      status: "pending",
    };

    course.submissions.push(newSubmission);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      submission: {
        ...newSubmission,
        projectName: projectExists.projectName,
      },
    });
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found",
      });
    }

    // Validate ObjectId format
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(courseId)
      .select("submissions project title")
      .populate("submissions.userId", "name email")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // For regular users, filter only their submissions
    let userSubmissions = course.submissions;
    if (!req.user?.isAdmin) {
      userSubmissions = course.submissions.filter(
        (sub) => sub.userId._id.toString() === userId.toString()
      );
    }

    // Enrich submissions with project details
    const enrichedSubmissions = userSubmissions.map((submission) => {
      const project = course.project.find(
        (p) => p.projectId === submission.projectId
      );
      return {
        ...submission,
        projectName: project?.projectName || "Unknown Project",
        projectDescription: project?.ProjectDescription || "",
      };
    });

    res.status(200).json({
      success: true,
      courseId,
      courseTitle: course.title,
      submissions: enrichedSubmissions,
      totalSubmissions: enrichedSubmissions.length,
    });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Search courses with filters
export const searchCourses = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      gradeMin,
      gradeMax,
      page = 1,
      limit = 10,
      sortBy = "relevance",
    } = req.query;

    if (!search?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const filters = { status: "active" };

    if (category) filters.coursename = category;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }
    if (gradeMin || gradeMax) {
      if (gradeMin)
        filters["gradeRange.min"] = { $lte: parseInt(gradeMax) || 12 };
      if (gradeMax)
        filters["gradeRange.max"] = { $gte: parseInt(gradeMin) || 1 };
    }

    const courses = await Course.searchCourses(search.trim(), filters);

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedCourses = courses.slice(startIndex, endIndex);
    const totalPages = Math.ceil(courses.length / limitNum);

    res.status(200).json({
      success: true,
      courses: paginatedCourses,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: courses.length,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      searchTerm: search,
      filters: {
        category,
        priceRange: { min: minPrice, max: maxPrice },
        gradeRange: { min: gradeMin, max: gradeMax },
      },
    });
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get featured courses
export const getFeaturedCourses = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const featuredCourses = await Course.findFeatured(parseInt(limit));

    res.status(200).json({
      success: true,
      courses: featuredCourses,
      total: featuredCourses.length,
    });
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured courses",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get courses by category
export const getCoursesByCategory = async (req, res) => {
  try {
    const { coursename } = req.params;
    const { page = 1, limit = 10, sortBy = "order" } = req.query;

    if (!["Junior", "Explorer", "Master"].includes(coursename)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be Junior, Explorer, or Master",
      });
    }

    const options = {
      limit: parseInt(limit),
      select:
        "title slug coursename levelNumber description CourseThumbnail duration gradeRange price rating totalChapters totalLectures createdAt",
    };

    const courses = await Course.findActiveByCategory(coursename, options);

    res.status(200).json({
      success: true,
      category: coursename,
      courses,
      total: courses.length,
    });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses by category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update submission status (Admin only)
export const updateSubmissionStatus = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const { courseId, submissionId } = req.params;
    const { status, feedback } = req.body;

    if (!["pending", "reviewed", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be pending, reviewed, approved, or rejected",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const submission = course.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    submission.status = status;
    if (feedback) submission.feedback = feedback.trim();

    await course.save();

    res.status(200).json({
      success: true,
      message: "Submission status updated successfully",
      submission,
    });
  } catch (error) {
    console.error("Error updating submission status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getTeacherCourses = async (req, res) => {
  try {
    // Get teacher ID from authenticated user
    const teacherId = req.user?.id || req.user?._id;
    
    if (!teacherId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Teacher ID not found",
      });
    }

    // Find all courses where the teacher is the instructor
    const courses = await Course.find({
      instructorId: teacherId,
    }).select("_id title coursename description price enrollmentCount status");

    if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found for this teacher",
        courses: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher courses retrieved successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching teacher courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
