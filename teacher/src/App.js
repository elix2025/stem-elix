import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeacherProvider } from './context/teachapi';
import TeachDash from './Pages/TeachDash';

function App() {
  return (
    <TeacherProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TeachDash />} />
          
        </Routes>
      </Router>
    </TeacherProvider>
  );
}

export default App;
