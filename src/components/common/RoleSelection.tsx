import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck } from 'lucide-react';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector variant="floating" />
      </div>

      {/* Header with Logo */}
      <div className="pt-20 pb-16 text-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mx-auto max-w-md mb-12">
          <Logo size="xl" showText={false} className="mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">mziGO</h1>
          <p className="text-emerald-100 text-lg">
            {language === 'en' ? 'Transportation Made Easy' : 'Usafirishaji Uliofanywa Rahisi'}
          </p>
          <p className="text-white/80 mt-4">
            {getTranslation('selectRole', language)}
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Client Card */}
          <div 
            onClick={() => navigate('/client/auth')}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group border-4 border-transparent hover:border-emerald-300"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl mb-6 mx-auto w-fit group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
                <Package className="h-16 w-16 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {getTranslation('client', language)}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === 'en' ? 'Send your cargo safely' : 'Tuma mizigo yako kwa usalama'}
              </p>
            </div>
          </div>

          {/* Driver Card */}
          <div 
            onClick={() => navigate('/driver/auth')}
            className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group border-4 border-transparent hover:border-cyan-300"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8 rounded-2xl mb-6 mx-auto w-fit group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                <Truck className="h-16 w-16 text-cyan-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {getTranslation('driver', language)}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === 'en' ? 'Start earning today' : 'Anza kupata mapato leo'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pb-8">
        <p className="text-white/80">© 2025 mziGO. All rights reserved.</p>
      </div>
    </div>
  );
};

export default RoleSelection;