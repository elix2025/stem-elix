import React, { useState } from "react";
import Schedulemeet from "./Schedulemeet";
import { useNavigate } from "react-router-dom";

const TeachDash = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    navigate("/teacher/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-sm"
            >
              Logout
            </button>
          </div>

          {!showScheduler ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Welcome Card */}
              <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Welcome Teacher! 👋</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Ready to connect with your students? Schedule a new Zoom meeting and notify them instantly.
                </p>
                <button
                  onClick={() => setShowScheduler(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
                >
                  Schedule Meeting
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-green-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Actions</h2>
                <ul className="text-gray-700 space-y-2">
                  <li>• Schedule meetings with students</li>
                  <li>• View all scheduled meetings</li>
                  <li>• Track attendance</li>
                  <li>• System settings</li>
                </ul>
              </div>

              {/* My Meetings */}
              <div className="bg-purple-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">My Meetings</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  View and manage your meeting schedule. Track attendance and follow-ups.
                </p>
                <button
                  onClick={() => navigate("/teacher/meetings")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow"
                >
                  View Meetings
                </button>
              </div>

              {/* Settings */}
              <div className="bg-orange-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Settings</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Update your preferences, notifications, and default meeting options.
                </p>
                <button
                  onClick={() => navigate("/teacher/settings")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow"
                >
                  Manage Settings
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowScheduler(false)}
                className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Dashboard
              </button>

              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <Schedulemeet onBack={() => setShowScheduler(false)} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TeachDash;
