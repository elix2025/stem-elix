import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';


const AdminDash = () => {
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Welcome Admin!</h2>
              <p className="text-gray-600 mb-4">
                You are successfully logged in as an administrator.
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Manage Courses
              </button>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Create new courses</li>
                <li>• Manage existing courses</li>
                <li>• View student data</li>
                <li>• System settings</li>
              </ul>
            </div>
            <div>
              <a href="/payments" className="block w-full text-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Manage Payments
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
