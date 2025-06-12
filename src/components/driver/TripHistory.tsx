import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Star, Globe } from 'lucide-react';

const TripHistory = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      tripHistory: 'Trip History',
      viewCompleted: 'View your completed trips',
      totalEarnings: 'Total Earnings',
      totalTrips: 'Total Trips',
      averageRating: 'Average Rating',
      recentTrips: 'Recent Trips',
      trip: 'Trip',
      pickup: 'Pickup',
      dropoff: 'Dropoff',
      customer: 'Customer',
      distance: 'Distance',
      loadMore: 'Load More Trips'
    },
    sw: {
      tripHistory: 'Historia ya Safari',
      viewCompleted: 'Ona safari zako zilizokamilika',
      totalEarnings: 'Jumla ya Mapato',
      totalTrips: 'Jumla ya Safari',
      averageRating: 'Ukadiriaji wa Wastani',
      recentTrips: 'Safari za Hivi Karibuni',
      trip: 'Safari',
      pickup: 'Kuchukua',
      dropoff: 'Kuacha',
      customer: 'Mteja',
      distance: 'Umbali',
      loadMore: 'Pakia Safari Zaidi'
    }
  };

  const t = translations[language as keyof typeof translations];

  const trips = [
    {
      id: 'TRP-001',
      date: '2024-01-15',
      time: '2:30 PM',
      pickup: 'Downtown Office',
      dropoff: 'Airport Terminal 2',
      distance: '15.2 km',
      fare: 70000, // TZS 70,000
      customer: 'John Smith',
      rating: 5
    },
    {
      id: 'TRP-002',
      date: '2024-01-15',
      time: '11:45 AM',
      pickup: 'Warehouse District',
      dropoff: 'Central Mall',
      distance: '8.7 km',
      fare: 45000, // TZS 45,000
      customer: 'Sarah Wilson',
      rating: 4
    },
    {
      id: 'TRP-003',
      date: '2024-01-14',
      time: '4:15 PM',
      pickup: 'Residential Area',
      dropoff: 'Business Park',
      distance: '12.1 km',
      fare: 56000, // TZS 56,000
      customer: 'Mike Johnson',
      rating: 5
    },
    {
      id: 'TRP-004',
      date: '2024-01-14',
      time: '9:20 AM',
      pickup: 'Shopping Center',
      dropoff: 'University Campus',
      distance: '6.5 km',
      fare: 36000, // TZS 36,000
      customer: 'Lisa Brown',
      rating: 4
    }
  ];

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const totalEarnings = trips.reduce((sum, trip) => sum + trip.fare, 0);
  const totalTrips = trips.length;
  const averageRating = trips.reduce((sum, trip) => sum + trip.rating, 0) / trips.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/driver')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.tripHistory}</h1>
                <p className="text-gray-600">{t.viewCompleted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">
                {formatCurrency(totalEarnings)}
              </span>
            </div>
            <p className="text-gray-600">{t.totalEarnings}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">{totalTrips}</span>
            </div>
            <p className="text-gray-600">{t.totalTrips}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-gray-600">{t.averageRating}</p>
          </div>
        </div>

        {/* Trip List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{t.recentTrips}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {trips.map((trip) => (
              <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t.trip} #{trip.id}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{trip.date}</span>
                        <span>•</span>
                        <span>{trip.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(trip.fare)}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < trip.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.pickup}</p>
                    <p className="font-medium text-gray-800">{trip.pickup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.dropoff}</p>
                    <p className="font-medium text-gray-800">{trip.dropoff}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{t.customer}: {trip.customer}</span>
                  <span>{t.distance}: {trip.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            {t.loadMore}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;