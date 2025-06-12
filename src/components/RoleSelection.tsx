import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Globe } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      welcome: 'Welcome to CargoLink',
      subtitle: 'Your trusted transportation solution',
      client: 'Client',
      driver: 'Driver',
      selectLanguage: 'Select Language'
    },
    sw: {
      welcome: 'Karibu CargoLink',
      subtitle: 'Suluhisho lako la usafirishaji wa kuaminika',
      client: 'Mteja',
      driver: 'Dereva',
      selectLanguage: 'Chagua Lugha'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Language Selector */}
        <div className="absolute top-6 right-6">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 pr-8 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="sw" className="text-gray-800">Kiswahili</option>
            </select>
            <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <Truck className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.welcome}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Client Card */}
          <div
            onClick={() => navigate('/auth/client')}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:bg-blue-200 transition-colors">
                <Package className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t.client}
              </h2>
            </div>
          </div>

          {/* Driver Card */}
          <div
            onClick={() => navigate('/auth/driver')}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:bg-green-200 transition-colors">
                <Truck className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t.driver}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;