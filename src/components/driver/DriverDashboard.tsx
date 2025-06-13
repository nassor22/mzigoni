import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, DollarSign, Clock, Star, Menu, X, Bell, Settings, LogOut } from 'lucide-react';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm backdrop-blur-lg bg-opacity-90 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/path-to-driver-photo.jpg"
                alt="Driver"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">John Doe</h1>
                <p className="text-sm text-gray-600">Driver ID: DRV123456</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4 space-y-4">
              <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </button>
              <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Driver Status</h2>
              <p className="text-gray-600">
                {isOnline ? 'You are online and ready for trips' : 'You are offline'}
              </p>
            </div>
            <button
              onClick={toggleStatus}
              className={`px-6 py-3 rounded-lg font-medium ${
                isOnline
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-2xl font-semibold text-gray-800">$150.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Online Hours</p>
                <p className="text-2xl font-semibold text-gray-800">4.5 hrs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-semibold text-gray-800">4.8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Trips</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((trip) => (
              <div
                key={trip}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-500"
              >
                <div className="flex items-center space-x-4">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Trip #{trip}</p>
                    <p className="text-sm text-gray-600">123 Main St → 456 Oak Ave</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">$25.00</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;