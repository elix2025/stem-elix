# Meeting Scheduling System - Implementation Guide

## Overview
This document describes the complete meeting scheduling functionality that allows teachers to create Zoom meetings for their courses and automatically notify enrolled students via email.

---

## System Architecture

### Components

#### 1. **Backend Files Created/Modified**

##### a. `models/meetingmodel.js` - Enhanced Meeting Schema
**Changes:**
- Added `topic` (required, trimmed)
- Added `description` (optional)
- Added `courseId` (reference to Course, required)
- Added `teacherId` (reference to User, required)
- Added `zoomMeetingId` (Zoom's meeting ID)
- Added `enrolledStudents` (array with student details and email tracking)
- Added `status` (enum: scheduled, in-progress, completed, cancelled)
- Added timestamps and validation

**Key Feature:** Tracks which students had emails sent and maintains student details for future communications.

---

##### b. `controllers/meetingController.js` - Complete Controller Logic

**Functions Implemented:**

1. **`scheduleZoomMeeting(req, res)` - Main Function**
   - Validates input (topic, start_time, duration, courseId)
   - Fetches all enrolled students from the course
   - Calls Zoom API to create meeting
   - Saves meeting to DB with all enrolled students
   - Sends notification emails to all students
   - Returns: Meeting details with email send status

   **Request Body:**
   ```json
   {
     "topic": "Robotics Class - Introduction to Sensors",
     "description": "Learn about different sensor types",
     "start_time": "2025-09-20T15:00:00Z",
     "duration": 60,
     "courseId": "ObjectId"
   }
   ```

   **Response:**
   ```json
   {
     "success": true,
     "message": "Meeting scheduled successfully",
     "meeting": {
       "_id": "...",
       "topic": "...",
       "start_time": "...",
       "duration": 60,
       "join_url": "https://zoom.us/j/...",
       "enrolledStudentsCount": 25,
       "emailsSent": 25,
       "emailsFailed": 0
     }
   }
   ```

2. **`sendMeetingNotificationEmails(meeting, course)` - Helper Function**
   - Generates HTML email template with meeting details
   - Sends to all enrolled students
   - Marks email as sent in DB
   - Includes: Meeting topic, date/time, join link, course info
   - Handles email failures gracefully

   **Email Features:**
   - Professional HTML template with branding
   - Meeting details (date, time, duration, topic)
   - Direct "Join Meeting" button
   - Course information
   - Timezone conversion (IST)

3. **`getMeetingsByCourse(req, res)` - Teacher View**
   - Returns all meetings for a specific course
   - Populates teacher and student details
   - Sorted by start_time (newest first)
   - Requires: courseId as param

4. **`getStudentMeetings(req, res)` - Student View**
   - Returns all meetings student is enrolled in
   - Populates teacher and course details
   - Sorted by start_time (newest first)

5. **`getMeetingById(req, res)` - Single Meeting Details**
   - Fetches complete meeting information
   - Populates all relations (teacher, course, students)

6. **`cancelMeeting(req, res)` - Meeting Cancellation**
   - Marks meeting as cancelled
   - Sends cancellation emails to all students
   - Verification: Only creator can cancel

7. **`resendMeetingLink(req, res)` - Resend Link to Student**
   - Resends meeting link to specific student
   - Useful if student missed the initial email

---

##### c. `routes/meetingRoutes.js` - API Routes

**Endpoint Structure:**

```
POST   /api/meetings/schedule              - Schedule new meeting
GET    /api/meetings/course/:courseId      - Get meetings for course
GET    /api/meetings/student/my-meetings   - Get student's meetings
GET    /api/meetings/:meetingId            - Get meeting details
POST   /api/meetings/:meetingId/cancel     - Cancel meeting
POST   /api/meetings/:meetingId/resend/:studentId - Resend link
```

All routes require authentication via `protect` middleware.

---

#### 2. **Frontend Files Created**

##### `teacher/src/components/Schedulemeet.js` - Teacher Dashboard

**Features:**

1. **Schedule Meeting Form**
   - Topic input (required)
   - Description textarea (optional)
   - Course selector dropdown
   - Date & time picker (datetime-local)
   - Duration slider (15 min - 24 hours)
   - Form validation

2. **Meetings Display Table**
   - Shows all scheduled meetings
   - Displays: Topic, Course, Date/Time, Student count, Status
   - Clickable meeting links
   - Join button for teacher
   - Cancel button for scheduled meetings
   - Status badge (Scheduled, In Progress, Completed, Cancelled)

3. **User Experience**
   - Real-time validation
   - Success/error messages
   - Loading states
   - Responsive design
   - IST timezone display

---

## Integration Steps

### Step 1: Update `server.js`

Add the meeting routes import:

```javascript
import meetingRoutes from "./routes/meetingRoutes.js";

// In app.use section:
app.use("/api/meetings", meetingRoutes);
```

**File Location:** `backend/server.js`

---

### Step 2: Verify Dependencies

Ensure these packages are installed in backend `package.json`:

```json
{
  "axios": "^1.x.x",
  "nodemailer": "^6.x.x",
  "dotenv": "^16.x.x",
  "mongoose": "^7.x.x"
}
```

If missing:
```bash
npm install axios nodemailer
```

---

### Step 3: Environment Variables

Add to `.env` file:

```env
# Zoom Configuration
ACCOUNT_ID=your_zoom_account_id
CLIENT_ID=your_zoom_client_id
CLIENT_SECRET=your_zoom_client_secret

# Email Configuration (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Zoom Setup:**
1. Go to https://marketplace.zoom.us/develop/create
2. Create OAuth app
3. Get credentials

**Gmail App Password:**
1. Enable 2FA on Google Account
2. Generate app-specific password
3. Use in EMAIL_PASS

---

### Step 4: Frontend Integration

If not already done, add to teacher app's routing:

```javascript
// In teacher app routing
import Schedulemeet from "./components/Schedulemeet";

// In your route component
<Route path="/schedule-meeting" element={<Schedulemeet />} />
```

---

## Data Flow

```
Teacher Submits Form
    ↓
Frontend Validation
    ↓
POST /api/meetings/schedule
    ↓
Backend Validation (topic, courseId, time, duration)
    ↓
Fetch Enrolled Students from Course
    ↓
Call Zoom API (Create Meeting)
    ↓
Save to Database (Meeting + Students)
    ↓
Send Emails to All Students (Async)
    ↓
Return Success Response to Frontend
    ↓
Student Receives Email with Zoom Link
    ↓
Student Clicks Link or Uses Join URL
    ↓
Student Joins Zoom Meeting
```

---

## Database Schema

### Meeting Collection

```javascript
{
  _id: ObjectId,
  topic: String,              // Meeting title
  description: String,         // Additional info
  start_time: Date,           // When meeting starts
  duration: Number,           // Minutes
  join_url: String,          // Student join link (from Zoom)
  start_url: String,         // Teacher start link (from Zoom)
  zoomMeetingId: String,     // Zoom's meeting ID
  teacherId: ObjectId,       // Reference to User
  courseId: ObjectId,        // Reference to Course
  enrolledStudents: [
    {
      studentId: ObjectId,   // Reference to User
      email: String,
      name: String,
      emailSent: Boolean,    // Tracking
      joinedAt: Date         // When student joined
    }
  ],
  status: "scheduled|in-progress|completed|cancelled",
  createdAt: Date,
  updatedAt: Date
}
```

---

## Email Template

The system sends a professional HTML email with:
- Course name and meeting topic
- Date and time (converted to IST)
- Duration
- Direct join button
- Teacher contact info
- Professional branding

---

## Error Handling

### Common Errors:

1. **"No students enrolled in this course"**
   - Ensure students are enrolled in the course
   - Check coursesEnrolled in User documents

2. **"Zoom API Error"**
   - Verify Zoom credentials in .env
   - Check if account is authorized
   - Verify API permissions

3. **"Email failed to send"**
   - Check EMAIL_USER and EMAIL_PASS
   - Verify Gmail app password (not regular password)
   - Check if email service is accessible

4. **"Invalid start_time format"**
   - Use ISO 8601 format: "2025-09-20T15:00:00Z"
   - Frontend date picker handles this automatically

---

## Testing

### Test Scenarios:

1. **Schedule Meeting**
   ```
   1. Go to /schedule-meeting
   2. Fill in form with valid data
   3. Select future date/time
   4. Click Schedule
   5. Verify: Meeting created, emails sent
   ```

2. **View Meetings**
   ```
   1. Check meetings table after scheduling
   2. Verify meeting appears with correct details
   3. Test status badge changes
   ```

3. **Cancel Meeting**
   ```
   1. Click Cancel on scheduled meeting
   2. Confirm cancellation
   3. Verify: Status changes to cancelled
   4. Check: Cancellation emails sent
   ```

4. **Student Perspective**
   ```
   1. Log in as enrolled student
   2. Check email for meeting invite
   3. Click join link
   4. Verify: Zoom meeting opens
   ```

---

## Advanced Features (Future)

1. **Meeting Recording**
   - Store Zoom recording links in DB
   - Make available to students

2. **Attendance Tracking**
   - Pull attendance from Zoom API
   - Store in enrolledStudents[].joinedAt

3. **Meeting Rescheduling**
   - Update meeting time
   - Send notification to students

4. **Recurring Meetings**
   - Weekly/bi-weekly classes
   - Automatic student enrollment

5. **Calendar Integration**
   - Export to iCal format
   - Google Calendar/Outlook sync

6. **Meeting Materials**
   - Upload slides/PDFs before meeting
   - Share links in email

---

## File Summary

### Created/Modified Files:

1. ✅ `backend/models/meetingmodel.js` - Enhanced schema
2. ✅ `backend/controllers/meetingController.js` - Full logic
3. ✅ `backend/routes/meetingRoutes.js` - API endpoints
4. ✅ `teacher/src/components/Schedulemeet.js` - UI component
5. ⚙️ `backend/server.js` - Add route import (manual)

### Configuration Changes:

1. Add `.env` variables
2. Install dependencies
3. Register routes in server.js

---

## API Response Examples

### Success Response:
```json
{
  "success": true,
  "message": "Meeting scheduled successfully",
  "meeting": {
    "_id": "507f1f77bcf86cd799439011",
    "topic": "Robotics Class",
    "start_time": "2025-09-20T15:00:00.000Z",
    "duration": 60,
    "join_url": "https://zoom.us/j/123456789",
    "enrolledStudentsCount": 25,
    "emailsSent": 25,
    "emailsFailed": 0
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Failed to schedule meeting",
  "error": "No students enrolled in this course"
}
```

---

## Support & Troubleshooting

If meetings aren't sending emails:
1. Check `.env` credentials
2. Verify email service configuration
3. Check server logs for errors
4. Test email with curl command

If Zoom integration fails:
1. Verify OAuth credentials
2. Check Zoom API rate limits
3. Ensure correct timezone (Asia/Kolkata)
4. Test with Zoom API explorer

---

## Conclusion

This complete meeting scheduling system provides:
- ✅ Zoom integration
- ✅ Student auto-notification via email
- ✅ Teacher dashboard
- ✅ Meeting management
- ✅ Status tracking
- ✅ Error handling
- ✅ Scalable architecture

Teachers can now efficiently schedule classes and students automatically receive meeting links via email!
