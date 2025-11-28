# Meeting Scheduling System - API Usage Examples

## Overview
Complete examples for using the meeting scheduling API with curl, JavaScript/Axios, and Postman.

---

## 1. Schedule a Meeting

### Request

**Endpoint:** `POST /api/meetings/schedule`

**Headers:**
```
Authorization: Bearer <teacher_jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "topic": "Robotics - Advanced Sensor Integration",
  "description": "In this session, we'll explore analog sensors, digital sensors, and their applications in robotics projects.",
  "courseId": "507f1f77bcf86cd799439011",
  "start_time": "2025-09-20T15:00:00Z",
  "duration": 90
}
```

### Using cURL

```bash
curl -X POST http://localhost:4000/api/meetings/schedule \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Robotics - Advanced Sensor Integration",
    "description": "In this session, we will explore advanced sensors",
    "courseId": "507f1f77bcf86cd799439011",
    "start_time": "2025-09-20T15:00:00Z",
    "duration": 90
  }'
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const scheduleMeeting = async () => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/meetings/schedule',
      {
        topic: 'Robotics - Advanced Sensor Integration',
        description: 'In this session, we will explore advanced sensors',
        courseId: '507f1f77bcf86cd799439011',
        start_time: new Date('2025-09-20T15:00:00Z').toISOString(),
        duration: 90
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`
        }
      }
    );

    console.log('Meeting scheduled:', response.data.meeting);
    console.log(`Emails sent to ${response.data.meeting.enrolledStudentsCount} students`);
  } catch (error) {
    console.error('Error scheduling meeting:', error.response?.data?.message);
  }
};

scheduleMeeting();
```

### Response (Success)

```json
{
  "success": true,
  "message": "Meeting scheduled successfully",
  "meeting": {
    "_id": "5f9c7f8e8f9c7f8e8f9c7f8e",
    "topic": "Robotics - Advanced Sensor Integration",
    "start_time": "2025-09-20T15:00:00.000Z",
    "duration": 90,
    "join_url": "https://zoom.us/j/123456789",
    "enrolledStudentsCount": 35,
    "emailsSent": 35,
    "emailsFailed": 0
  }
}
```

### Response (Error - No Enrolled Students)

```json
{
  "success": false,
  "message": "No students enrolled in this course"
}
```

---

## 2. Get Meetings for a Course

### Request

**Endpoint:** `GET /api/meetings/course/:courseId`

**Headers:**
```
Authorization: Bearer <teacher_jwt_token>
```

### Using cURL

```bash
curl -X GET http://localhost:4000/api/meetings/course/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer your_jwt_token"
```

### Using JavaScript/Axios

```javascript
const getCourseMeetings = async (courseId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/meetings/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`
        }
      }
    );

    console.log('Meetings for course:', response.data.meetings);
    response.data.meetings.forEach(meeting => {
      console.log(`${meeting.topic} - ${meeting.start_time}`);
    });
  } catch (error) {
    console.error('Error fetching meetings:', error.response?.data?.message);
  }
};

getCourseMeetings('507f1f77bcf86cd799439011');
```

### Response

```json
{
  "success": true,
  "meetings": [
    {
      "_id": "5f9c7f8e8f9c7f8e8f9c7f8e",
      "topic": "Robotics - Advanced Sensor Integration",
      "start_time": "2025-09-20T15:00:00.000Z",
      "duration": 90,
      "join_url": "https://zoom.us/j/123456789",
      "status": "scheduled",
      "enrolledStudents": [
        {
          "studentId": "507f1f77bcf86cd799439012",
          "email": "student1@example.com",
          "name": "John Doe",
          "emailSent": true
        }
      ]
    }
  ],
  "total": 1
}
```

---

## 3. Get Student's Meetings

### Request

**Endpoint:** `GET /api/meetings/student/my-meetings`

**Headers:**
```
Authorization: Bearer <student_jwt_token>
```

### Using cURL

```bash
curl -X GET http://localhost:4000/api/meetings/student/my-meetings \
  -H "Authorization: Bearer student_jwt_token"
```

### Using JavaScript/Axios

```javascript
const getMyMeetings = async () => {
  try {
    const response = await axios.get(
      'http://localhost:4000/api/meetings/student/my-meetings',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('studentToken')}`
        }
      }
    );

    console.log('Your upcoming meetings:', response.data.meetings);
    response.data.meetings.forEach(meeting => {
      console.log(`Join: ${meeting.join_url}`);
    });
  } catch (error) {
    console.error('Error fetching your meetings:', error.response?.data?.message);
  }
};

getMyMeetings();
```

### Response

```json
{
  "success": true,
  "meetings": [
    {
      "_id": "5f9c7f8e8f9c7f8e8f9c7f8e",
      "topic": "Robotics - Advanced Sensor Integration",
      "description": "Explore advanced sensors...",
      "start_time": "2025-09-20T15:00:00.000Z",
      "duration": 90,
      "join_url": "https://zoom.us/j/123456789",
      "status": "scheduled",
      "courseId": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Advanced Robotics 2025"
      },
      "teacherId": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "Prof. Smith",
        "email": "prof.smith@example.com"
      }
    }
  ],
  "total": 5
}
```

---

## 4. Get Meeting Details

### Request

**Endpoint:** `GET /api/meetings/:meetingId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Using JavaScript/Axios

```javascript
const getMeetingDetails = async (meetingId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/meetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const meeting = response.data.meeting;
    console.log(`Topic: ${meeting.topic}`);
    console.log(`Students enrolled: ${meeting.enrolledStudents.length}`);
    console.log(`Join URL: ${meeting.join_url}`);
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

### Response

```json
{
  "success": true,
  "meeting": {
    "_id": "5f9c7f8e8f9c7f8e8f9c7f8e",
    "topic": "Robotics - Advanced Sensor Integration",
    "description": "Explore advanced sensors...",
    "start_time": "2025-09-20T15:00:00.000Z",
    "duration": 90,
    "join_url": "https://zoom.us/j/123456789",
    "start_url": "https://zoom.us/s/123456789",
    "zoomMeetingId": "123456789",
    "status": "scheduled",
    "courseId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Advanced Robotics 2025",
      "description": "Learn advanced robotics concepts"
    },
    "teacherId": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "Prof. Smith",
      "email": "prof.smith@example.com",
      "phone": "+91-1234567890"
    },
    "enrolledStudents": [
      {
        "studentId": "507f1f77bcf86cd799439012",
        "email": "student1@example.com",
        "name": "John Doe",
        "emailSent": true,
        "joinedAt": null
      }
    ]
  }
}
```

---

## 5. Cancel a Meeting

### Request

**Endpoint:** `POST /api/meetings/:meetingId/cancel`

**Headers:**
```
Authorization: Bearer <teacher_jwt_token>
```

### Using JavaScript/Axios

```javascript
const cancelMeeting = async (meetingId) => {
  if (!window.confirm('Are you sure you want to cancel this meeting?')) {
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:4000/api/meetings/${meetingId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`
        }
      }
    );

    console.log('Meeting cancelled');
    console.log('Cancellation emails sent to students');
  } catch (error) {
    console.error('Error cancelling meeting:', error.response?.data?.message);
  }
};

cancelMeeting('5f9c7f8e8f9c7f8e8f9c7f8e');
```

### Response

```json
{
  "success": true,
  "message": "Meeting cancelled successfully",
  "meeting": {
    "_id": "5f9c7f8e8f9c7f8e8f9c7f8e",
    "topic": "Robotics - Advanced Sensor Integration",
    "status": "cancelled"
  }
}
```

---

## 6. Resend Meeting Link to Student

### Request

**Endpoint:** `POST /api/meetings/:meetingId/resend/:studentId`

**Headers:**
```
Authorization: Bearer <teacher_jwt_token>
```

### Using JavaScript/Axios

```javascript
const resendMeetingLink = async (meetingId, studentId) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/meetings/${meetingId}/resend/${studentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('teacherToken')}`
        }
      }
    );

    if (response.data.success) {
      console.log('Meeting link resent successfully');
    }
  } catch (error) {
    console.error('Error resending link:', error.response?.data?.message);
  }
};

// Usage
resendMeetingLink(
  '5f9c7f8e8f9c7f8e8f9c7f8e',
  '507f1f77bcf86cd799439012'
);
```

### Response

```json
{
  "success": true,
  "message": "Meeting link sent successfully"
}
```

---

## 7. Complete Frontend Implementation Example

```javascript
// meetingService.js - Axios instance for meetings API

import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/meetings';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

export const meetingService = {
  // Schedule a meeting
  schedule: async (meetingData) => {
    try {
      const response = await axios.post(
        `${API_BASE}/schedule`,
        meetingData,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get meetings for course
  getBycourse: async (courseId) => {
    try {
      const response = await axios.get(
        `${API_BASE}/course/${courseId}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get student's meetings
  getStudentMeetings: async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/student/my-meetings`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get meeting by ID
  getById: async (meetingId) => {
    try {
      const response = await axios.get(
        `${API_BASE}/${meetingId}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cancel meeting
  cancel: async (meetingId) => {
    try {
      const response = await axios.post(
        `${API_BASE}/${meetingId}/cancel`,
        {},
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Resend link
  resendLink: async (meetingId, studentId) => {
    try {
      const response = await axios.post(
        `${API_BASE}/${meetingId}/resend/${studentId}`,
        {},
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
```

### Usage in Component

```javascript
import { meetingService } from './services/meetingService';

// In your component
const handleSchedule = async (formData) => {
  try {
    const result = await meetingService.schedule(formData);
    console.log('Meeting scheduled:', result.meeting);
    showSuccessMessage(`Meeting scheduled! ${result.meeting.emailsSent} emails sent`);
  } catch (error) {
    showErrorMessage(error.message);
  }
};
```

---

## Error Response Examples

### Missing Required Fields

```json
{
  "success": false,
  "message": "Missing required fields",
  "missingFields": ["topic", "courseId"]
}
```

### Invalid Time

```json
{
  "success": false,
  "message": "Meeting must be scheduled for a future date/time"
}
```

### Zoom API Error

```json
{
  "success": false,
  "message": "Failed to create Zoom meeting. Please try again.",
  "error": "Invalid OAuth credentials"
}
```

### Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized Access"
}
```

---

## Postman Collection

Import this into Postman to test all endpoints:

```json
{
  "info": {
    "name": "STEMelix Meeting API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Schedule Meeting",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{teacher_token}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"topic\": \"Robotics Class\",\n  \"description\": \"Advanced sensors\",\n  \"courseId\": \"507f1f77bcf86cd799439011\",\n  \"start_time\": \"2025-09-20T15:00:00Z\",\n  \"duration\": 90\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/meetings/schedule",
          "host": ["{{base_url}}"],
          "path": ["api", "meetings", "schedule"]
        }
      }
    },
    {
      "name": "Get Course Meetings",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{teacher_token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/meetings/course/507f1f77bcf86cd799439011",
          "host": ["{{base_url}}"],
          "path": ["api", "meetings", "course", "507f1f77bcf86cd799439011"]
        }
      }
    }
  ]
}
```

---

## Notes

- All timestamps in requests should be ISO 8601 format
- Responses always include a `success` boolean
- Errors include descriptive messages
- Authentication required for all endpoints
- Email sending is asynchronous

---

Generated: 2025-01-28
