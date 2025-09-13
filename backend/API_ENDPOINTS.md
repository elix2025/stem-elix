# Course API Endpoints Documentation

## Overview

Updated API endpoints for the course management system with improved validation, error handling, and response structures. All responses follow a consistent format with `success`, `message`, and relevant data fields.

## Authentication

- `AdminAuth`: Admin authentication required
- `protect`: User authentication required

## Response Format

All endpoints return responses in this format:

```json
{
  "success": boolean,
  "message": string,
  "data": object, // varies by endpoint
  "error": string // only in development mode for errors
}
```

## Course Management Endpoints

### Public Routes (No Authentication Required)

#### GET `/api/courses/search`

Search courses with filters

- **Query Parameters:**
  - `search` (required): Search term
  - `category`: Junior, Explorer, Master
  - `minPrice`, `maxPrice`: Price range
  - `gradeMin`, `gradeMax`: Grade range (1-12)
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `sortBy`: Sort field (default: relevance)

#### GET `/api/courses/featured`

Get featured courses

- **Query Parameters:**
  - `limit`: Number of courses (default: 6)

#### GET `/api/courses/category/:categoryId`

Get courses by category (Junior, Explorer, Master)

- **Query Parameters:**
  - `page`, `limit`, `sortBy`

### Course Detail Routes

#### GET `/api/courses/all`

Get all active courses (with optional filters)

- **Authentication:** Optional
- **Query Parameters:**
  - `category`, `status`, `featured`, `page`, `limit`, `search`, `sortBy`, `sortOrder`
  - `minPrice`, `maxPrice`, `gradeMin`, `gradeMax`

#### GET `/api/courses/slug/:slug`

Get course by slug

- **Authentication:** Optional
- **Returns:** Complete course data with computed fields

#### GET `/api/courses/:id`

Get course by ID

- **Authentication:** Optional
- **Returns:** Complete course data with computed fields

#### GET `/api/courses/:courseId/content`

Get course content (chapters and lectures)

- **Authentication:** Optional
- **Returns:** Course title and structured content

### Admin-Only Course Management

#### POST `/api/courses/create`

Create new course

- **Authentication:** Admin required
- **Body:** Multipart form data
  - `title`, `categoryId`, `levelNumber`, `description`
  - `price`, `duration`, `gradeRangeMin`, `gradeRangeMax`
  - `status`, `order`, `featured`, `tags[]`
  - `CourseThumbnail` (file)

#### PUT `/api/courses/:id`

Update course

- **Authentication:** Admin required
- **Body:** Same as create (all fields optional)

#### DELETE `/api/courses/:id`

Delete course

- **Authentication:** Admin required

### Chapter Management (Admin Only)

#### POST `/api/courses/:courseId/chapters`

Add chapter to course

- **Body:** `{ "chapterTitle": string, "chapterOrder": number }`

#### PUT `/api/courses/:courseId/chapters/:chapterId`

Update chapter

- **Body:** `{ "chapterTitle"?: string, "chapterOrder"?: number }`

#### DELETE `/api/courses/:courseId/chapters/:chapterId`

Delete chapter

### Lecture Management (Admin Only)

#### POST `/api/courses/:courseId/chapters/:chapterId/lectures`

Add lecture to chapter

- **Body:** Multipart form data
  - `lectureTitle`, `lectureUrl` (YouTube), `lectureDuration` (MM:SS)
  - `lectureOrder`, `isPreviewFree`
  - `lectureFile` (optional file)

#### PUT `/api/courses/:courseId/chapters/:chapterId/lectures/:lectureId`

Update lecture

- **Body:** Same fields as create (all optional)

#### DELETE `/api/courses/:courseId/chapters/:chapterId/lectures/:lectureId`

Delete lecture

### Project Management

#### POST `/api/courses/:courseId/projects`

Create project for course (Admin only)

- **Body:** Multipart form data
  - `projectName`, `ProjectDescription`
  - `projectFile` (file)

#### GET `/api/courses/:courseId/projects`

Get user's project submissions

- **Authentication:** Optional (Admin sees all, users see their own)

### Project Submissions

#### POST `/api/courses/:courseId/projects/:projectId/submit`

Submit project (Authenticated users)

- **Body:** Multipart form data
  - `submissionFile` (file)

#### PUT `/api/courses/:courseId/submissions/:submissionId`

Update submission status (Admin only)

- **Body:** `{ "status": "pending|reviewed|approved|rejected", "feedback"?: string }`

## Data Models

### Course Response Structure

```json
{
  "_id": "string",
  "title": "string",
  "slug": "string",
  "categoryId": "Junior|Explorer|Master",
  "levelNumber": number,
  "description": "string",
  "CourseThumbnail": "string (URL)",
  "duration": "string",
  "gradeRange": { "min": number, "max": number },
  "price": number,
  "status": "draft|active|inactive",
  "order": number,
  "featured": boolean,
  "tags": ["string"],
  "enrollmentCount": number,
  "rating": { "average": number, "count": number },
  "totalChapters": number,
  "totalLectures": number,
  "previewLectures": [
    {
      "lectureId": "string",
      "lectureTitle": "string",
      "chapterTitle": "string",
      "lectureUrl": "string"
    }
  ],
  "CourseContent": [ /* Chapter objects */ ],
  "project": [ /* Project objects */ ],
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}
```

### Chapter Structure

```json
{
  "chapterId": "string",
  "chapterOrder": number,
  "ChapterTitle": "string",
  "chapterContent": [ /* Lecture objects */ ]
}
```

### Lecture Structure

```json
{
  "lectureId": "string",
  "lectureTitle": "string",
  "lectureDuration": "string (MM:SS)",
  "lectureUrl": "string (YouTube embed)",
  "youtubeData": {
    "videoId": "string",
    "isUnlisted": boolean
  },
  "isPreviewFree": boolean,
  "lectureOrder": number
}
```

### Project Structure

```json
{
  "projectId": "string",
  "projectName": "string",
  "ProjectDescription": "string",
  "projectupload": "string (URL)",
  "updatedAt": "ISO Date"
}
```

### Submission Structure

```json
{
  "projectId": "string",
  "userId": "ObjectId",
  "submissionFile": "string (URL)",
  "submittedAt": "ISO Date",
  "status": "pending|reviewed|approved|rejected",
  "feedback": "string"
}
```

## Error Handling

- All validation errors return 400 with detailed field information
- Authentication errors return 401
- Authorization errors return 403
- Not found errors return 404
- Server errors return 500 with optional error details in development mode

## Frontend Integration Notes

1. **File Uploads**: Use multipart/form-data for endpoints that accept files
2. **Authentication**: Include JWT token in Authorization header: `Bearer <token>`
3. **Pagination**: Most list endpoints support pagination with `page` and `limit` parameters
4. **Search**: Use the `/search` endpoint for text-based searching with filters
5. **Slugs**: Use course slugs for SEO-friendly URLs instead of IDs where possible
6. **Validation**: Check response `success` field and handle `missingFields` in error responses
7. **Grade Range**: Ensure min/max grades are between 1-12
8. **YouTube URLs**: Support various YouTube URL formats (watch, embed, youtu.be)
9. **Status Management**: Only active courses are shown to non-admin users
10. **Response Structure**: Always check `success` field before processing data

## Example Frontend API Calls

### Search Courses

```javascript
const searchCourses = async (searchTerm, filters = {}) => {
  const params = new URLSearchParams({
    search: searchTerm,
    ...filters,
  });

  const response = await fetch(`/api/courses/search?${params}`);
  const data = await response.json();

  if (data.success) {
    return data.courses;
  } else {
    throw new Error(data.message);
  }
};
```

### Create Course (Admin)

```javascript
const createCourse = async (courseData, thumbnailFile) => {
  const formData = new FormData();

  Object.keys(courseData).forEach((key) => {
    formData.append(key, courseData[key]);
  });

  formData.append("CourseThumbnail", thumbnailFile);

  const response = await fetch("/api/courses/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
```

### Submit Project

```javascript
const submitProject = async (courseId, projectId, submissionFile) => {
  const formData = new FormData();
  formData.append("submissionFile", submissionFile);

  const response = await fetch(
    `/api/courses/${courseId}/projects/${projectId}/submit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return response.json();
};
```
