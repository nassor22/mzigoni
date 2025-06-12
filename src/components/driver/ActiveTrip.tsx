import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, MapPin, Navigation, CheckCircle } from 'lucide-react';

const ActiveTrip = () => {
  const navigate = useNavigate();
  const [tripStatus, setTripStatus] = useState('enroute'); // enroute, arrived, pickup, delivering, completed

  const customer = {
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    rating: 4.9
  };

  const trip = {
    id: 'TRP-001',
    pickup: '123 Business District, Downtown',
    dropoff: '456 Residential Area, Uptown',
    fare: 30.00,
    distance: '12.5 km',
    instructions: 'Please call when you arrive. Office is on the 3rd floor.'
  };

  const handleStatusUpdate = () => {
    if (tripStatus === 'enroute') {
      setTripStatus('arrived');
    } else if (tripStatus === 'arrived') {
      setTripStatus('pickup');
    } else if (tripStatus === 'pickup') {
      setTripStatus('delivering');
    } else if (tripStatus === 'delivering') {
      setTripStatus('completed');
      setTimeout(() => navigate('/driver'), 2000);
    }
  };

  const getStatusButton = () => {
    switch (tripStatus) {
      case 'enroute':
        return { text: 'Arrived at Pickup', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'arrived':
        return { text: 'Cargo Picked Up', color: 'bg-orange-600 hover:bg-orange-700' };
      case 'pickup':
        return { text: 'Start Delivery', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'delivering':
        return { text: 'Cargo Delivered', color: 'bg-green-600 hover:bg-green-700' };
      default:
        return { text: 'Complete Trip', color: 'bg-green-600 hover:bg-green-700' };
    }
  };

  if (tripStatus === 'completed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Completed!</h2>
          <p className="text-gray-600 mb-6">Great job! You've successfully completed the delivery.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-gray-800">${trip.fare.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Trip Earnings</p>
          </div>
          <p className="text-sm text-gray-500">Returning to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/driver')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Active Trip</h1>
                <p className="text-gray-600">Trip #{trip.id}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              tripStatus === 'enroute' ? 'bg-blue-100 text-blue-700' :
              tripStatus === 'arrived' ? 'bg-orange-100 text-orange-700' :
              tripStatus === 'pickup' ? 'bg-purple-100 text-purple-700' :
              'bg-green-100 text-green-700'
            }`}>
              {tripStatus === 'enroute' && 'En Route to Pickup'}
              {tripStatus === 'arrived' && 'At Pickup Location'}
              {tripStatus === 'pickup' && 'Loading Cargo'}
              {tripStatus === 'delivering' && 'Delivering'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <Navigation className="h-5 w-5" />
            </button>
          </div>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Turn-by-turn navigation</p>
              <p className="text-sm text-gray-500">
                {tripStatus === 'enroute' || tripStatus === 'arrived' ? 'To pickup location' : 'To delivery location'}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{customer.name}</h3>
              <p className="text-gray-600">Rating: {customer.rating} ⭐</p>
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
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                tripStatus === 'enroute' || tripStatus === 'arrived' ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {tripStatus === 'enroute' || tripStatus === 'arrived' ? 'Pickup Location' : 'Picked up from'}
                </p>
                <p className="text-gray-600">{trip.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                tripStatus === 'delivering' ? 'bg-blue-500' : 'bg-gray-400'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {tripStatus === 'delivering' ? 'Delivering to' : 'Delivery Location'}
                </p>
                <p className="text-gray-600">{trip.dropoff}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-800 mb-2">Special Instructions</h4>
              <p className="text-blue-700">{trip.instructions}</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-gray-600">Distance: {trip.distance}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">${trip.fare.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Trip Fare</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-4">
          <button
            onClick={handleStatusUpdate}
            className={`w-full py-4 text-white rounded-lg transition-colors font-semibold text-lg ${getStatusButton().color}`}
          >
            {getStatusButton().text}
          </button>
          
          <button className="w-full py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Cancel Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTrip;