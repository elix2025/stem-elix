import React, { useState } from "react";
import Schedulemeet from "../components/Schedulemeet";

const TeachDash = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "schedule", label: "Schedule Meeting", icon: "📅" },
    { id: "meetings", label: "My Meetings", icon: "📋" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md flex flex-col h-screen sticky top-0">
        {/* Logo Section */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎓</div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">STEMelix</h1>
              <p className="text-xs opacity-80">Teacher Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                if (item.id === "schedule") setShowScheduler(true);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md border ${
                activeNav === item.id
                  ? "bg-blue-600 text-white border-blue-700 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-100 text-center text-sm text-gray-600">
          <p className="font-semibold">Welcome Teacher!</p>
          <p className="mt-1 text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-6 sticky top-0 z-10">
          <h2 className="text-3xl font-bold text-gray-800">
            {activeNav === "dashboard" && "Dashboard"}
            {activeNav === "schedule" && "Schedule a Meeting"}
            {activeNav === "meetings" && "My Meetings"}
            {activeNav === "settings" && "Settings"}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeNav === "dashboard" && "Welcome back! Here's your overview."}
            {activeNav === "schedule" && "Create a new Zoom meeting for your students."}
            {activeNav === "meetings" && "View all your scheduled meetings."}
            {activeNav === "settings" && "Manage your preferences."}
          </p>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeNav === "dashboard" && !showScheduler && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Meetings</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                    </div>
                    <div className="text-3xl">📅</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Scheduled</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                    </div>
                    <div className="text-3xl">✓</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Completed</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                    </div>
                    <div className="text-3xl">✅</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Emails Sent</p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                    </div>
                    <div className="text-3xl">📧</div>
                  </div>
                </div>
              </div>

              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">Welcome Back! 👋</h3>
                    <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                      Ready to connect with your students? Schedule a new Zoom meeting and watch your students receive instant notifications.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowScheduler(true)}
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-md"
                      >
                        📅 Schedule Meeting
                      </button>
                      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition">
                        📚 View Meetings
                      </button>
                    </div>
                  </div>
                  <div className="text-6xl">🎯</div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Quick Setup</h4>
                  <p className="text-gray-600 text-sm">
                    Create meetings in seconds without complex configurations.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-4xl mb-4">🔗</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Auto Email</h4>
                  <p className="text-gray-600 text-sm">
                    Students automatically receive Zoom links via email.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Track Status</h4>
                  <p className="text-gray-600 text-sm">
                    Monitor email delivery and meeting attendance in real-time.
                  </p>
                </div>
              </div>
            </>
          )}

          {(activeNav === "schedule" || showScheduler) && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Schedulemeet onBack={() => setShowScheduler(false)} />
            </div>
          )}

          {activeNav === "meetings" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Meetings Yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by scheduling your first meeting with students.
                </p>
                <button
                  onClick={() => setShowScheduler(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  📅 Schedule Your First Meeting
                </button>
              </div>
            </div>
          )}

          {activeNav === "settings" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Settings</h3>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Notifications</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Choose how you want to be notified about meeting updates.
                    </p>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-700">Email notifications</span>
                    </label>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Preferences</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Configure your default meeting settings.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Default Duration</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>60 minutes</option>
                          <option>90 minutes</option>
                          <option>120 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachDash;