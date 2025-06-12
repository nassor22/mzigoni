import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Power, MapPin, DollarSign, Clock, User, Settings, History, AlertCircle, Globe } from 'lucide-react';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showTripRequest, setShowTripRequest] = useState(false);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      driverDashboard: 'Driver Dashboard',
      welcomeBack: 'Welcome back, John!',
      youreOnline: "You're Online",
      youreOffline: "You're Offline",
      readyToReceive: 'Ready to receive trip requests',
      goOnlineToStart: 'Go online to start receiving trips',
      todaysEarnings: "Today's Earnings",
      thisWeek: 'This Week',
      tripsCompleted: 'Trips Completed',
      rating: 'Rating',
      currentStatus: 'Current Status',
      onlineWaiting: 'Online - Waiting for requests',
      offline: 'Offline',
      lookingForTrips: 'Looking for trips in your area...',
      tripHistory: 'Trip History',
      viewCompleted: 'View your completed trips',
      support: 'Support',
      getHelp: 'Get help when you need it',
      newTripRequest: 'New Trip Request',
      away: 'away',
      pickup: 'Pickup',
      dropoff: 'Dropoff',
      distance: 'Distance',
      fare: 'Fare',
      decline: 'Decline',
      accept: 'Accept'
    },
    sw: {
      driverDashboard: 'Dashibodi ya Dereva',
      welcomeBack: 'Karibu tena, John!',
      youreOnline: 'Uko Mtandaoni',
      youreOffline: 'Haupo Mtandaoni',
      readyToReceive: 'Tayari kupokea maombi ya safari',
      goOnlineToStart: 'Ingia mtandaoni kuanza kupokea safari',
      todaysEarnings: 'Mapato ya Leo',
      thisWeek: 'Wiki Hii',
      tripsCompleted: 'Safari Zilizokamilika',
      rating: 'Ukadiriaji',
      currentStatus: 'Hali ya Sasa',
      onlineWaiting: 'Mtandaoni - Inasubiri maombi',
      offline: 'Nje ya Mtandao',
      lookingForTrips: 'Inatafuta safari katika eneo lako...',
      tripHistory: 'Historia ya Safari',
      viewCompleted: 'Ona safari zako zilizokamilika',
      support: 'Msaada',
      getHelp: 'Pata msaada unapohitaji',
      newTripRequest: 'Ombi Jipya la Safari',
      away: 'mbali',
      pickup: 'Kuchukua',
      dropoff: 'Kuacha',
      distance: 'Umbali',
      fare: 'Nauli',
      decline: 'Kataa',
      accept: 'Kubali'
    }
  };

  const t = translations[language as keyof typeof translations];

  const stats = {
    todayEarnings: 251000, // TZS 251,000
    weeklyEarnings: 1694600, // TZS 1,694,600
    tripsCompleted: 23,
    rating: 4.8
  };

  const tripRequest = {
    id: 'TRP-001',
    pickup: '123 Business District',
    dropoff: '456 Residential Area',
    distance: '12.5 km',
    fare: 60000, // TZS 60,000
    customerRating: 4.9,
    timeToPickup: '8 min'
  };

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  // Simulate trip request
  React.useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        setShowTripRequest(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleAcceptTrip = () => {
    setShowTripRequest(false);
    navigate('/driver/trip/123');
  };

  const handleDeclineTrip = () => {
    setShowTripRequest(false);
  };

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
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.driverDashboard}</h1>
                <p className="text-gray-600">{t.welcomeBack}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/driver/register')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Online/Offline Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {isOnline ? t.youreOnline : t.youreOffline}
              </h2>
              <p className="text-gray-600">
                {isOnline ? t.readyToReceive : t.goOnlineToStart}
              </p>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-16 w-28 items-center rounded-full transition-colors ${
                isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-12 w-12 transform rounded-full bg-white shadow-lg transition-transform ${
                  isOnline ? 'translate-x-14' : 'translate-x-2'
                }`}
              >
                <Power className={`h-6 w-6 m-3 ${isOnline ? 'text-green-500' : 'text-gray-500'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">
                {formatCurrency(stats.todayEarnings)}
              </span>
            </div>
            <p className="text-gray-600">{t.todaysEarnings}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">
                {formatCurrency(stats.weeklyEarnings)}
              </span>
            </div>
            <p className="text-gray-600">{t.thisWeek}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-800">{stats.tripsCompleted}</span>
            </div>
            <p className="text-gray-600">{t.tripsCompleted}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <User className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-800">{stats.rating}</span>
            </div>
            <p className="text-gray-600">{t.rating}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.currentStatus}</h2>
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="font-medium text-gray-800">
              {isOnline ? t.onlineWaiting : t.offline}
            </span>
          </div>
          {isOnline && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-blue-700 font-medium">{t.lookingForTrips}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/driver/history')}
            className="bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm transition-colors text-left"
          >
            <div className="flex items-center space-x-4">
              <History className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{t.tripHistory}</h3>
                <p className="text-gray-600">{t.viewCompleted}</p>
              </div>
            </div>
          </button>

          <button className="bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm transition-colors text-left">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{t.support}</h3>
                <p className="text-gray-600">{t.getHelp}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Trip Request Modal */}
      {showTripRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t.newTripRequest}</h2>
              <div className="bg-blue-50 px-3 py-1 rounded-full inline-flex items-center">
                <Clock className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-blue-700 font-medium">{tripRequest.timeToPickup} {t.away}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t.pickup}</p>
                <p className="font-medium text-gray-800">{tripRequest.pickup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t.dropoff}</p>
                <p className="font-medium text-gray-800">{tripRequest.dropoff}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{t.distance}</p>
                  <p className="font-medium text-gray-800">{tripRequest.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.fare}</p>
                  <p className="font-bold text-green-600 text-lg">{formatCurrency(tripRequest.fare)}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeclineTrip}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t.decline}
              </button>
              <button
                onClick={handleAcceptTrip}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;