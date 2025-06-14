import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, User, Phone, MessageCircle } from 'lucide-react';
import GoogleMapsComponent from '../common/GoogleMapsComponent';
import LanguageSelector from '../common/LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const BookingFlow = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cargoType: '',
    pickupLocation: null as Location | null,
    deliveryLocation: null as Location | null,
    contactName: '',
    contactPhone: '',
    instructions: ''
  });

  const cargoTypes = [
    { 
      id: 'parcel-boda', 
      name: language === 'en' ? 'Parcel Boda' : 'Mizigo ya Boda', 
      capacity: language === 'en' ? 'Up to 10kg' : 'Hadi kilo 10', 
      icon: Package 
    },
    { 
      id: 'parcel-cargo', 
      name: language === 'en' ? 'Parcel Cargo' : 'Mizigo ya Kawaida', 
      capacity: language === 'en' ? 'Up to 50kg' : 'Hadi kilo 50', 
      icon: Package 
    },
    { 
      id: 'trucks', 
      name: language === 'en' ? 'Trucks' : 'Malori', 
      capacity: language === 'en' ? 'Up to 1000kg' : 'Hadi kilo 1000', 
      icon: Truck 
    }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/client/track/123');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/client/dashboard');
    }
  };

  const stepTitles = {
    1: language === 'en' ? 'Select Cargo Type' : 'Chagua Aina ya Mizigo',
    2: language === 'en' ? 'Location Details' : 'Maelezo ya Mahali',
    3: language === 'en' ? 'Contact Details' : 'Maelezo ya Mawasiliano'
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
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Book Delivery' : 'Agiza Uwasilishaji'}
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? `Step ${step} of 3` : `Hatua ${step} ya 3`}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  num <= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-16 md:w-32 h-1 mx-2 ${
                    num < step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: Cargo Type */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{stepTitles[1]}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {cargoTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, cargoType: type.id})}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.cargoType === type.id
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <type.icon className={`h-8 w-8 ${
                      formData.cargoType === type.id ? 'text-emerald-600' : 'text-gray-600'
                    }`} />
                    {formData.cargoType === type.id && (
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{type.name}</h3>
                  <p className="text-gray-600">{type.capacity}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{stepTitles[2]}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation('pickupLocation', language)}
                </label>
                <GoogleMapsComponent
                  onLocationSelect={(location) => setFormData({...formData, pickupLocation: location})}
                  height="300px"
                  markers={formData.pickupLocation ? [{
                    lat: formData.pickupLocation.lat,
                    lng: formData.pickupLocation.lng,
                    title: language === 'en' ? 'Pickup Location' : 'Mahali pa Kuchukua',
                    type: 'pickup'
                  }] : []}
                />
                {formData.pickupLocation && (
                  <p className="mt-2 text-sm text-gray-600">
                    {language === 'en' ? 'Selected:' : 'Umechagua:'} {formData.pickupLocation.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation('deliveryLocation', language)}
                </label>
                <GoogleMapsComponent
                  onLocationSelect={(location) => setFormData({...formData, deliveryLocation: location})}
                  height="300px"
                  markers={formData.deliveryLocation ? [{
                    lat: formData.deliveryLocation.lat,
                    lng: formData.deliveryLocation.lng,
                    title: language === 'en' ? 'Delivery Location' : 'Mahali pa Kufikisha',
                    type: 'delivery'
                  }] : []}
                />
                {formData.deliveryLocation && (
                  <p className="mt-2 text-sm text-gray-600">
                    {language === 'en' ? 'Selected:' : 'Umechagua:'} {formData.deliveryLocation.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{stepTitles[3]}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Contact Person Name' : 'Jina la Mtu wa Mawasiliano'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder={language === 'en' ? 'Contact person at pickup' : 'Mtu wa mawasiliano mahali pa kuchukua'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Contact Phone Number' : 'Nambari ya Simu ya Mawasiliano'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="+255 123 456 789"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Instructions for Driver' : 'Maelekezo kwa Dereva'}
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                    placeholder={language === 'en' ? 'Any special instructions or notes' : 'Maelekezo maalum au maelezo'}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {step === 1 ? getTranslation('cancel', language) : getTranslation('back', language)}
          </button>
          <button
            onClick={handleNext}
            disabled={step === 1 && !formData.cargoType}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {step === 3 
              ? (language === 'en' ? 'Find Available Drivers' : 'Tafuta Madereva Waliopo') 
              : getTranslation('next', language)
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;