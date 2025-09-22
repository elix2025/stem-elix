import { useEffect } from "react";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            
            <h2 className="text-xl font-bold text-[#6366F1]">Confirm Logout</h2>
          </div>
          
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-slate-600 text-base leading-relaxed">
            Are you sure you want to logout? You will be redirected to the home page and will need to login again to access your account.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 text-slate-700 font-semibold rounded-full border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 transform hover:scale-105"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-[#6366f1] text-white font-semibold rounded-full  transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Yes, Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;