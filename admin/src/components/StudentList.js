import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const StudentList = () => {
  const { getAllStudents, getStudentDetails, getEnrollmentStats } = useAdmin();
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });

  // Fetch students data
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getAllStudents(
        filters.page,
        filters.limit,
        filters.search,
        filters.status
      );
      
      if (result.success) {
        setStudents(result.data.students);
        setPagination(result.data.pagination);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  // Fetch enrollment statistics
  const fetchStats = async () => {
    try {
      const result = await getEnrollmentStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Fetch student details
  const handleViewDetails = async (studentId) => {
    try {
      setLoading(true);
      const result = await getStudentDetails(studentId);
      if (result.success) {
        setSelectedStudent(result.data);
        setShowDetails(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
    fetchStudents();
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [filters.page, filters.limit]);

  if (loading && students.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">Manage enrolled students and their course progress</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.overview?.totalStudents || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Enrollments</h3>
              <p className="text-2xl font-bold text-green-600">{stats.overview?.totalEnrollments || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Recent Enrollments</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.overview?.recentEnrollments || 0}</p>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(
                  stats.paymentStats?.find(p => p._id === 'verified')?.totalAmount || 0
                )}
              </p>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Students
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or institute..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit
              </label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institute
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                        {student.phone && (
                          <div className="text-sm text-gray-500">{student.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.institute || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.totalCoursesEnrolled || 0} courses
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.coursesCompleted || 0} completed
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(student.totalSpent || 0)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.verifiedPayments || 0} payments
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(student.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(student._id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {((pagination.currentPage - 1) * pagination.limit) + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(pagination.currentPage * pagination.limit, pagination.totalStudents)}
                    </span>{' '}
                    of{' '}
                    <span className="font-medium">{pagination.totalStudents}</span>{' '}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student Details Modal */}
        {showDetails && selectedStudent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Student Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Student Information</h4>
                    <div className="space-y-2">
                      <div><strong>Name:</strong> {selectedStudent.student.name}</div>
                      <div><strong>Email:</strong> {selectedStudent.student.email}</div>
                      <div><strong>Phone:</strong> {selectedStudent.student.phone || 'Not provided'}</div>
                      <div><strong>Institute:</strong> {selectedStudent.student.institute || 'Not specified'}</div>
                      <div><strong>Joined:</strong> {formatDate(selectedStudent.student.createdAt)}</div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Total Courses</div>
                        <div className="font-medium">{selectedStudent.stats.totalCoursesEnrolled}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Completed</div>
                        <div className="font-medium text-green-600">{selectedStudent.stats.completedCourses}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">In Progress</div>
                        <div className="font-medium text-blue-600">{selectedStudent.stats.inProgressCourses}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Total Spent</div>
                        <div className="font-medium">{formatCurrency(selectedStudent.stats.totalAmountSpent)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrolled Courses */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Enrolled Courses</h4>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {selectedStudent.student.coursesEnrolled?.map((enrollment, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded border">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-sm">{enrollment.course?.title || 'Course Title'}</div>
                              <div className="text-xs text-gray-500">
                                Level: {enrollment.course?.levelNumber || 'N/A'} | 
                                Category: {enrollment.course?.categoryId || 'N/A'}
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${
                              enrollment.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {enrollment.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Enrolled: {formatDate(enrollment.enrolledAt)}
                          </div>
                        </div>
                      ))}
                      {(!selectedStudent.student.coursesEnrolled || selectedStudent.student.coursesEnrolled.length === 0) && (
                        <div className="text-gray-500 text-center py-4">No courses enrolled</div>
                      )}
                    </div>
                  </div>

                  {/* Payment History */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Payment History</h4>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {selectedStudent.payments?.map((payment, index) => (
                        <div key={payment._id || index} className="bg-gray-50 p-3 rounded border">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-sm">{payment.course?.title || 'Course'}</div>
                              <div className="text-xs text-gray-500">
                                {formatCurrency(payment.amount)} | {formatDate(payment.createdAt)}
                              </div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${
                              payment.status === 'verified' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                          {payment.verifiedAt && (
                            <div className="text-xs text-gray-500 mt-1">
                              Verified: {formatDate(payment.verifiedAt)}
                            </div>
                          )}
                        </div>
                      ))}
                      {(!selectedStudent.payments || selectedStudent.payments.length === 0) && (
                        <div className="text-gray-500 text-center py-4">No payment history</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;