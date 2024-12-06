// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Zap, Activity, MapPin, AlertTriangle, Map, InfoIcon, X, Clock, Users, Wifi, WifiOff, UserCog } from 'lucide-react';
import DisBarchart from '../components/disBarchart';
import TransBarchart from '../components/transBar';

const mockOutageData = [
  {
    municipality: "San Juan",
    affected: 1250,
    totalCustomers: 95000,
    status: "partial",
    estimatedRestoration: "2h 30m",
    reportedAt: "2024-10-26T08:30:00"
  },
  {
    municipality: "Ponce",
    affected: 3400,
    totalCustomers: 45000,
    status: "major",
    estimatedRestoration: "4h 15m",
    reportedAt: "2024-10-26T07:45:00"
  },
  {
    municipality: "Mayagüez",
    affected: 750,
    totalCustomers: 35000,
    status: "minor",
    estimatedRestoration: "1h 45m",
    reportedAt: "2024-10-26T09:15:00"
  },
  {
    municipality: "Carolina",
    affected: 2100,
    totalCustomers: 65000,
    status: "partial",
    estimatedRestoration: "3h 00m",
    reportedAt: "2024-10-26T08:00:00"
  },
  {
    municipality: "Bayamón",
    affected: 4200,
    totalCustomers: 75000,
    status: "major",
    estimatedRestoration: "5h 30m",
    reportedAt: "2024-10-26T07:30:00"
  },
  {
    municipality: "Arecibo",
    affected: 180,
    totalCustomers: 25000,
    status: "minor",
    estimatedRestoration: "45m",
    reportedAt: "2024-10-26T09:30:00"
  }
];

// eslint-disable-next-line react/prop-types
const StatusModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'major': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-indigo-600 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Live Outage Status
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-indigo-600">Total Affected</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-indigo-700">11,880</span>
                <span className="text-sm text-indigo-600 ml-2">customers</span>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <WifiOff className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-600">Active Outages</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-red-700">6</span>
                <span className="text-sm text-red-600 ml-2">municipalities</span>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Wifi className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600">Network Status</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-green-700">96.5%</span>
                <span className="text-sm text-green-600 ml-2">operational</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Restoration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOutageData.map((outage, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{outage.municipality}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(outage.status)}`}>
                        {outage.status.charAt(0).toUpperCase() + outage.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{outage.affected.toLocaleString()} / {outage.totalCustomers.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{((outage.affected / outage.totalCustomers) * 100).toFixed(1)}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(outage.reportedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {outage.estimatedRestoration}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="ml-2 text-xl font-bold text-indigo-600">PowerTrackPR</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                <Map className="w-4 h-4 mr-2" />
                Map View
              </button>
              <button
                onClick={() => setIsStatusModalOpen(true)}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                <Activity className="w-4 h-4 mr-2" />
                Live Status
              </button>
              <button className="flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Outage
              </button>
              <button className="flex items-center px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 ml-2">
                <UserCog className="w-4 h-4 mr-2" />
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Power Outage Tracking in Puerto Rico
            </h1>
            <p className="text-xl text-white mb-8">
              Stay informed about power outages in your area and get instant updates on restoration progress
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100">
                View Live Map
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10">
                Subscribe to Alerts
              </button>
            </div>
            <div className="mt-8">
        <div className='mb-4'><TransBarchart /></div>
        <div className='mb-4'><DisBarchart /></div>
      </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8 text-indigo-600 mb-4" />,
                title: 'Location-Based Tracking',
                description: 'Get real-time updates for power status in your specific area'
              },
              {
                icon: <Activity className="w-8 h-8 text-indigo-600 mb-4" />,
                title: 'Live Status Updates',
                description: 'Track outage duration and estimated restoration times'
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-indigo-600 mb-4" />,
                title: 'Incident Reporting',
                description: 'Report and verify power outages in your neighborhood'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 rounded-lg p-6 shadow-lg text-center"
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/90 rounded-lg p-6 shadow-lg">
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
        </div>
      </div>

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
