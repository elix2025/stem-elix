import { AdminProvider } from './context/AdminContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import AdminDash from './Pages/AdminDash';
import Courses from './Pages/Courses';
import CourseContentPage from './Pages/Coursecontent';
import AdminProgressDemo from './Pages/AdminProgressDemo';
import PaymentManagement from "./Pages/payment.js";
import StudentList from "./components/StudentList.js";
import EditCourse from "./components/EditCourse.js";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-dash" element={<AdminDash />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/edit-course/:courseId" element={<EditCourse />} />
          <Route path="/admin/course-content/:courseId" element={<CourseContentPage/>}/>
          <Route path="/admin/progress" element={<AdminProgressDemo />} />
          <Route path="/admin/payments" element={<PaymentManagement />} />
          <Route path="/admin/students" element={<StudentList />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;

