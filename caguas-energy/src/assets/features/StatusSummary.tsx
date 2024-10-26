// src/components/features/StatusSummary.tsx
import { InfoIcon } from 'lucide-react';

const StatusSummary = () => {
  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-indigo-600">Current Status Overview</h3>
        <InfoIcon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">94%</div>
          <div className="text-sm text-gray-600">Areas with Power</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">12</div>
          <div className="text-sm text-gray-600">Active Outages</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">45m</div>
          <div className="text-sm text-gray-600">Avg Response Time</div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;