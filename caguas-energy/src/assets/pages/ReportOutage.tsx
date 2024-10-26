// src/pages/ReportOutage.tsx
import { AlertTriangle } from 'lucide-react';

const ReportOutage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Report Power Outage</h2>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                When did the outage start?
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Describe any additional details about the outage..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportOutage;