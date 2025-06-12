import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Clock, MapPin, Star, ArrowLeft } from 'lucide-react';

const ClientDashboard = () => {
  const navigate = useNavigate();

  const recentTrips = [
    {
      id: '1',
      from: 'Downtown Office',
      to: 'Airport Terminal 2',
      status: 'Delivered',
      date: '2 hours ago',
      driver: 'John Doe',
      rating: 5
    },
    {
      id: '2',
      from: 'Warehouse District',
      to: 'Central Mall',
      status: 'In Transit',
      date: 'Active',
      driver: 'Sarah Wilson',
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
                <p className="text-gray-600">Ready to send your cargo?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/client/book')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <Plus className="h-8 w-8" />
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Package className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">New Booking</h3>
              <p className="text-blue-100">Book a new cargo delivery</p>
            </button>

            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <div className="flex items-center justify-between mb-3">
                <Clock className="h-8 w-8 text-gray-600" />
                <div className="bg-gray-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Track Delivery</h3>
              <p className="text-gray-600">View active deliveries</p>
            </button>

            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <div className="flex items-center justify-between mb-3">
                <Star className="h-8 w-8 text-gray-600" />
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Trip History</h3>
              <p className="text-gray-600">View past deliveries</p>
            </button>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Trips</h2>
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">{trip.from}</span>
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{trip.to}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Driver: {trip.driver}</span>
                      <span>•</span>
                      <span>{trip.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trip.status === 'Delivered' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {trip.status}
                  </span>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{trip.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;