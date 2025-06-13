import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm backdrop-blur-lg bg-opacity-90 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            mziGO
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Your trusted cargo transportation partner
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How would you like to use mziGO?
          </h2>
          <p className="text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Client Option */}
          <div 
            onClick={() => navigate('/client')}
            className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <Package className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                I need to send cargo
              </h3>
              <p className="text-gray-600 mb-6">
                Book reliable transportation for your cargo with our network of trusted drivers
              </p>
              <div className="flex items-center text-green-600 font-medium">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Driver Option */}
          <div 
            onClick={() => navigate('/driver')}
            className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <Truck className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                I want to drive
              </h3>
              <p className="text-gray-600 mb-6">
                Join our network of drivers and start earning by delivering cargo
              </p>
              <div className="flex items-center text-green-600 font-medium">
                Become a Driver
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2024 mziGO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 