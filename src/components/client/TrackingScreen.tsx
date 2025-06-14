import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Clock, User, Truck, Star } from 'lucide-react';
import GoogleMapsComponent from '../common/GoogleMapsComponent';
import LanguageSelector from '../common/LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

const TrackingScreen = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [status, setStatus] = useState('assigned');
  const [driverLocation, setDriverLocation] = useState({ lat: -6.7924, lng: 39.2083 });

  const driver = {
    name: 'John Doe',
    phone: '+255 123 456 789',
    rating: 4.8,
    vehicle: 'Toyota Hiace',
    plate: 'T123 ABC',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  };

  const trip = {
    pickup: { lat: -6.7924, lng: 39.2083, address: '123 Business District, Dar es Salaam' },
    delivery: { lat: -6.8024, lng: 39.2183, address: '456 Residential Area, Dar es Salaam' }
  };

  const statusSteps = [
    { 
      id: 'assigned', 
      label: language === 'en' ? 'Driver Assigned' : 'Dereva Amepangiwa', 
      completed: true 
    },
    { 
      id: 'enroute', 
      label: language === 'en' ? 'En Route to Pickup' : 'Anakwenda Kuchukua', 
      completed: status !== 'assigned' 
    },
    { 
      id: 'pickup', 
      label: language === 'en' ? 'Picking Up Cargo' : 'Anachukua Mizigo', 
      completed: ['delivering', 'completed'].includes(status) 
    },
    { 
      id: 'delivering', 
      label: language === 'en' ? 'Delivering Cargo' : 'Anafikisha Mizigo', 
      completed: status === 'completed' 
    },
    { 
      id: 'completed', 
      label: language === 'en' ? 'Delivered' : 'Imefikishwa', 
      completed: status === 'completed' 
    }
  ];

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate status updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'assigned') setStatus('enroute');
      else if (status === 'enroute') setStatus('pickup');
      else if (status === 'pickup') setStatus('delivering');
    }, 10000);

    return () => clearTimeout(timer);
  }, [status]);

  const getMapMarkers = () => {
    const markers = [
      {
        lat: trip.pickup.lat,
        lng: trip.pickup.lng,
        title: language === 'en' ? 'Pickup Location' : 'Mahali pa Kuchukua',
        type: 'pickup' as const
      },
      {
        lat: trip.delivery.lat,
        lng: trip.delivery.lng,
        title: language === 'en' ? 'Delivery Location' : 'Mahali pa Kufikisha',
        type: 'delivery' as const
      },
      {
        lat: driverLocation.lat,
        lng: driverLocation.lng,
        title: language === 'en' ? 'Driver Location' : 'Mahali pa Dereva',
        type: 'driver' as const
      }
    ];

    return markers;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/client/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {language === 'en' ? 'Track Delivery' : 'Fuatilia Uwasilishaji'}
                </h1>
                <p className="text-gray-600">
                  {language === 'en' ? 'Trip #TRP-001' : 'Safari #TRP-001'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            {language === 'en' ? 'Delivery Status' : 'Hali ya Uwasilishaji'}
          </h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : status === step.id 
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    step.completed ? 'text-green-700' : status === step.id ? 'text-emerald-700' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </p>
                  {status === step.id && (
                    <p className="text-sm text-emerald-600">
                      {language === 'en' ? 'Current status' : 'Hali ya sasa'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Map */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Live Location' : 'Mahali pa Moja kwa Moja'}
          </h2>
          <GoogleMapsComponent
            markers={getMapMarkers()}
            height="400px"
            showSearch={false}
            trackingMode={true}
            center={driverLocation}
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'ETA: 15 minutes' : 'Muda wa Kuwasili: dakika 15'}
            </p>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Driver Information' : 'Taarifa za Dereva'}
          </h2>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Trip Details' : 'Maelezo ya Safari'}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">
                  {language === 'en' ? 'Pickup Location' : 'Mahali pa Kuchukua'}
                </p>
                <p className="text-gray-600">{trip.pickup.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">
                  {language === 'en' ? 'Delivery Location' : 'Mahali pa Kufikisha'}
                </p>
                <p className="text-gray-600">{trip.delivery.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-800">
                  {language === 'en' ? 'Estimated Delivery' : 'Muda wa Kufikisha'}
                </p>
                <p className="text-gray-600">
                  {language === 'en' ? 'Today, 3:30 PM' : 'Leo, 3:30 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
            {language === 'en' ? 'Cancel Trip' : 'Ghairi Safari'}
          </button>
          <button className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            {language === 'en' ? 'Contact Support' : 'Wasiliana na Msaada'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingScreen;