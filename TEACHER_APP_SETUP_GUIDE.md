# Teacher App Integration - Step by Step

## 📋 Prerequisites

Before starting, ensure:
- ✅ Node.js installed
- ✅ Backend running (port 5000)
- ✅ MongoDB connected
- ✅ All env variables set
- ✅ React 18+ installed in teacher app

---

## 🚀 Step 1: Update App.js with Provider

### Location: `teacher/src/App.js`

**Current Setup (Example):**
```javascript
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Dashboard />
    </Router>
  );
}

export default App;
```

**After Update:**
```javascript
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TeacherProvider } from "./context/teachapi";  // 👈 ADD THIS
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <TeacherProvider>  {/* 👈 WRAP APP */}
        <Navbar />
        <Dashboard />
      </TeacherProvider>
    </Router>
  );
}

export default App;
```

---

## 🎯 Step 2: Use in Your Course Page

### Location: Where you display course details

**Example: CourseDetail Component**

```javascript
import React, { useState, useEffect } from "react";
import Schedulemeet from "../components/Schedulemeet";

export default function CourseDetail({ courseId }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details
    // setCourse(...)
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-detail-page">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      
      {/* 👇 ADD THIS COMPONENT */}
      <Schedulemeet 
        courseId={courseId}
        courseName={course.title}
      />
    </div>
  );
}
```

---

## 🔧 Step 3: Advanced Usage with Custom Hook

### If you want direct access to meeting methods:

```javascript
import React, { useEffect } from "react";
import { useTeacher } from "../context/teachapi";

export default function MyMeetingsPage() {
  const { 
    meetings, 
    loading, 
    error,
    getMeetingsByCourse,
    cancelMeeting 
  } = useTeacher();

  useEffect(() => {
    // Load meetings when component mounts
    getMeetingsByCourse("course123");
  }, []);

  if (loading) return <div>Loading meetings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>My Meetings</h1>
      
      {meetings.length === 0 ? (
        <p>No meetings scheduled</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Date & Time</th>
              <th>Duration</th>
              <th>Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(meeting => (
              <tr key={meeting._id}>
                <td>{meeting.topic}</td>
                <td>
                  {new Date(meeting.start_time).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                  })}
                </td>
                <td>{meeting.duration} min</td>
                <td>{meeting.enrolledStudents?.length}</td>
                <td>
                  {meeting.status === 'scheduled' && (
                    <button 
                      onClick={() => cancelMeeting(meeting._id, meeting.courseId)}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

---

## 📝 Step 4: Handle Form Submission

### Example: Manual meeting scheduling without Schedulemeet component

```javascript
import React, { useState } from "react";
import { useTeacher } from "../context/teachapi";

export default function ScheduleForm({ courseId }) {
  const { scheduleMeeting, loading, error, success } = useTeacher();
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    start_time: "",
    duration: 60,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await scheduleMeeting({
      ...formData,
      courseId,
    });

    if (result.success) {
      alert("Meeting scheduled successfully!");
      setFormData({ topic: "", description: "", start_time: "", duration: 60 });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div>
        <label>Topic *</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={(e) => setFormData({...formData, topic: e.target.value})}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div>
        <label>Date & Time *</label>
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={(e) => setFormData({...formData, start_time: e.target.value})}
          required
        />
      </div>

      <div>
        <label>Duration (minutes) *</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
          required
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
          <option value="120">120 minutes</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Scheduling..." : "Schedule Meeting"}
      </button>
    </form>
  );
}
```

---

## 📧 Step 5: Display Sent Emails Status

### Show which students received the email

```javascript
import React, { useEffect } from "react";
import { useTeacher } from "../context/teachapi";

export default function MeetingDetails({ meetingId }) {
  const { selectedMeeting, getMeetingById } = useTeacher();

  useEffect(() => {
    getMeetingById(meetingId);
  }, [meetingId]);

  if (!selectedMeeting) return <div>Loading...</div>;

  const emailsSent = selectedMeeting.enrolledStudents?.filter(s => s.emailSent).length || 0;
  const totalStudents = selectedMeeting.enrolledStudents?.length || 0;

  return (
    <div>
      <h2>{selectedMeeting.topic}</h2>
      
      <div className="email-status">
        <p>📧 Email Delivery: {emailsSent}/{totalStudents} sent</p>
        
        <div className="student-list">
          <h3>Enrolled Students:</h3>
          <ul>
            {selectedMeeting.enrolledStudents?.map((student, idx) => (
              <li key={idx}>
                {student.name}
                {student.emailSent ? " ✅" : " ❌"}
              </li>
            ))}
          </ul>
        </div>

        <div className="meeting-link">
          <p>Zoom Link:</p>
          <a href={selectedMeeting.join_url} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Step 6: Add to Navbar (Optional)

### Add link to meetings page

```javascript
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/meetings">Meetings</Link></li>  {/* 👈 ADD THIS */}
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}
```

### Add route in router

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meetings from "./pages/Meetings";
import CourseDetail from "./pages/CourseDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/meetings" element={<Meetings />} />  {/* 👈 ADD THIS */}
    </Routes>
  );
}
```

---

## 🧪 Step 7: Test the Integration

### Test 1: Verify Provider Works

```javascript
// In any component inside TeacherProvider
import { useTeacher } from "./context/teachapi";

export default function TestComponent() {
  const { scheduleMeeting } = useTeacher();
  
  console.log("✅ TeacherContext is working!");
  console.log("Available method: scheduleMeeting", typeof scheduleMeeting);
  
  return <div>Check console for context test</div>;
}
```

### Test 2: Schedule a Meeting

1. Navigate to course detail page
2. Click "Schedule New Meeting"
3. Fill all fields:
   - Topic: "Test Meeting"
   - Date & Time: Future date
   - Duration: 60 minutes
4. Click "Schedule Meeting"
5. Check for:
   - ✅ Success message
   - ✅ Meeting appears in list
   - ✅ Email sent to students (check server logs)

### Test 3: View Meetings

```bash
# Check browser console for API calls
# Should see: GET /api/meetings/course/[courseId]
```

### Test 4: Cancel Meeting

1. Click "Cancel" on a scheduled meeting
2. Confirm cancellation
3. Check for:
   - ✅ Status changes to "cancelled"
   - ✅ Meeting link remains but status shows cancelled
   - ✅ Cancellation email sent to students

---

## 🐛 Debugging

### Enable Logging

```javascript
// In components using useTeacher
const { error, success, loading } = useTeacher();

useEffect(() => {
  if (error) console.error("Error:", error);
  if (success) console.log("Success:", success);
  if (loading) console.log("Loading...");
}, [error, success, loading]);
```

### Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Schedule a meeting
4. Look for requests:
   - `POST /api/meetings/schedule` - should return 201
   - Check response for any errors

### Check Server Logs

```bash
# In terminal running backend
# Should see:
# [INFO] Meeting scheduled successfully
# [INFO] Email sent to student@email.com
```

---

## ✅ Checklist

### Before Going to Production

- [ ] App.js wrapped with TeacherProvider
- [ ] Schedulemeet component integrated
- [ ] All env variables set (.env file)
- [ ] Backend running on correct port
- [ ] Database connected
- [ ] Email sending works (test email sent)
- [ ] Zoom API credentials working
- [ ] Context hook working (tested with console.log)
- [ ] Form validation working
- [ ] Meeting creation works end-to-end
- [ ] Student receives email
- [ ] Email link opens Zoom meeting correctly
- [ ] Cancel meeting works
- [ ] No console errors

---

## 📞 Common Issues & Fixes

### Issue: "Context is not working"
```javascript
// Make sure App.js has TeacherProvider wrapping all components
✅ Correct:
<TeacherProvider>
  <YourApp />
</TeacherProvider>

❌ Wrong:
<YourApp />
// No TeacherProvider wrapper
```

### Issue: "Meetings not loading"
```javascript
// Verify courseId is passed correctly
✅ Correct:
<Schedulemeet courseId={courseId} courseName={name} />

❌ Wrong:
<Schedulemeet />  // Missing courseId
```

### Issue: "Emails not sent"
```javascript
// Check env variables
❌ Problem: EMAIL_USER or EMAIL_PASS missing
✅ Solution: Add to .env and restart backend
```

### Issue: "CORS error"
```javascript
// Check API base URL
❌ Problem: REACT_APP_API_BASE points to wrong port
✅ Solution: Verify backend port (default 5000) and update .env
```

---

## 🎉 Success Indicators

When everything is working:

✅ Meeting form appears on course page  
✅ Can schedule a meeting  
✅ Meeting appears in list  
✅ Students receive email  
✅ Email has clickable Zoom link  
✅ Can cancel meetings  
✅ Cancellation email sent  
✅ No console errors  
✅ No network errors  
✅ Existing features still work  

---

## Next Steps

1. Deploy to staging environment
2. Test with real students
3. Gather feedback
4. Fix any issues
5. Deploy to production
6. Monitor for errors
7. Plan future enhancements

---

**Ready to integrate? Start with Step 1: Update App.js! 🚀**
