import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const PaymentVerification = () => {
  const { getAllPayments, verifyPayment, getPaymentDetails } = useAdmin();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gpayTransactionId, setGpayTransactionId] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const result = await getAllPayments();
      console.log('📊 Payments loaded:', result);
      if (result.success) {
        setPayments(result.payments || []);
      } else {
        setError(result.message || 'Failed to load payments');
      }
    } catch (err) {
      console.error('Error loading payments:', err);
      setError('Failed to load payments: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (paymentId) => {
    try {
      const result = await getPaymentDetails(paymentId);
      if (result.success) {
        setSelectedPayment(result.payment);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to load payment details');
    }
  };

  const handleVerify = async (paymentId) => {
    console.log('🔄 Starting payment verification...', { paymentId, gpayTransactionId });
    
    if (!gpayTransactionId) {
      setError('Please enter GPay Transaction ID');
      return;
    }

    try {
      console.log('📤 Sending verification request...');
      const result = await verifyPayment(paymentId, 'verify', { gpayTransactionId });
      console.log('📥 Verification response:', result);
      
      if (result.success) {
        setSelectedPayment(null);
        setGpayTransactionId('');
        loadPayments(); // Refresh the list
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('❌ Verification error:', err);
      setError('Failed to verify payment: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (paymentId) => {
    if (!rejectionReason) {
      setError('Please enter rejection reason');
      return;
    }

    try {
      const result = await verifyPayment(paymentId, 'reject', { rejectionReason });
      if (result.success) {
        setSelectedPayment(null);
        setRejectionReason('');
        loadPayments(); // Refresh the list
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to reject payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Verification</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Payments List */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No payments found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.user?.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.course?.title || 'Course not found'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        payment.status === 'verified' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleViewDetails(payment._id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          )}
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Payment Screenshot */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Screenshot</h3>
                  <img
                    src={selectedPayment.screenshotUrl}
                    alt="Payment Screenshot"
                    className="w-full max-h-96 object-contain border rounded"
                  />
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">User</h4>
                    <p className="mt-1">{selectedPayment.user?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-400">{selectedPayment.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Course</h4>
                    <p className="mt-1">{selectedPayment.course?.title || 'Course not found'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                    <p className="mt-1">₹{selectedPayment.amount}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="mt-1">{selectedPayment.status}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Order ID</h4>
                    <p className="mt-1 text-sm">{selectedPayment.orderId || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                    <p className="mt-1 text-sm">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {selectedPayment.status === 'pending' && (
                  <div className="space-y-4 border-t pt-4">
                    {/* Verify Payment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPay Transaction ID
                      </label>
                      <input
                        type="text"
                        value={gpayTransactionId}
                        onChange={(e) => setGpayTransactionId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter GPay Transaction ID"
                      />
                      <button
                        onClick={() => handleVerify(selectedPayment._id)}
                        className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Verify Payment
                      </button>
                    </div>

                    {/* Reject Payment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter reason for rejection"
                        rows={3}
                      />
                      <button
                        onClick={() => handleReject(selectedPayment._id)}
                        className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Reject Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;