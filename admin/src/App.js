import { AdminProvider } from './context/AdminContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import AdminDash from './Pages/AdminDash';
import Courses from './Pages/Courses';
import CourseContentPage from './Pages/Coursecontent';

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-dash" element={<AdminDash />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admin/course-content/:courseId" element={<CourseContentPage/>}/>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;

