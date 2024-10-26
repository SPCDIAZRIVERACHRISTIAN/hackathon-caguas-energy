// src/pages/MapView.tsx
import { MapPin } from 'lucide-react';

const MapView = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-2rem)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-indigo-600">Power Outage Map</h2>
            <div className="flex items-center space-x-2">
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                Active Outage
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                Power Restored
              </span>
            </div>
          </div>
          <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Map integration will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;