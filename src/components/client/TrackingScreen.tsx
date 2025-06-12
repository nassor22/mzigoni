import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, User, Truck, Star } from 'lucide-react';

const TrackingScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('assigned'); // assigned, enroute, pickup, delivering, completed

  const driver = {
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    vehicle: 'Toyota Hiace',
    plate: 'ABC-1234',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  };

  const statusSteps = [
    { id: 'assigned', label: 'Driver Assigned', completed: true },
    { id: 'enroute', label: 'En Route to Pickup', completed: status !== 'assigned' },
    { id: 'pickup', label: 'Picking Up Cargo', completed: ['delivering', 'completed'].includes(status) },
    { id: 'delivering', label: 'Delivering Cargo', completed: status === 'completed' },
    { id: 'completed', label: 'Delivered', completed: status === 'completed' }
  ];

  useEffect(() => {
    // Simulate status updates
    const timer = setTimeout(() => {
      if (status === 'assigned') setStatus('enroute');
      else if (status === 'enroute') setStatus('pickup');
      else if (status === 'pickup') setStatus('delivering');
    }, 5000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/client')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Track Delivery</h1>
                <p className="text-gray-600">Trip #TRP-001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Delivery Status</h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : status === step.id 
                      ? 'bg-blue-500 text-white animate-pulse'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    step.completed ? 'text-green-700' : status === step.id ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </p>
                  {status === step.id && (
                    <p className="text-sm text-blue-600">Current status</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Location</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Live map view</p>
              <p className="text-sm text-gray-500">ETA: 15 minutes</p>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Information</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{driver.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <Truck className="h-4 w-4" />
                  <span>{driver.vehicle} • {driver.plate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="text-sm text-gray-600">{driver.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Trip Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">Pickup Location</p>
                <p className="text-gray-600">123 Business District, Downtown</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">Delivery Location</p>
                <p className="text-gray-600">456 Residential Area, Uptown</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-800">Estimated Delivery</p>
                <p className="text-gray-600">Today, 3:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
            Cancel Trip
          </button>
          <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;