import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MapComponent from '../common/MapComponent';
import ImageGallery from '../common/ImageGallery';
import ScheduledDelivery from '../common/ScheduledDelivery';
import { Package, Truck, MapPin, Calendar } from 'lucide-react';
import ClientDashboard from './ClientDashboard';
import BookingFlow from './BookingFlow';
import TrackingScreen from './TrackingScreen';
import PaymentScreen from './PaymentScreen';
import RatingScreen from './RatingScreen';

const ClientApp = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [deliveryType, setDeliveryType] = useState<'instant' | 'scheduled'>('instant');
  const [schedule, setSchedule] = useState<{ date: string; time: string; notes?: string } | null>(null);
  const [parcelImages, setParcelImages] = useState<File[]>([]);
  const [truckImages, setTruckImages] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!selectedLocation) {
      alert('Please select a location');
      return;
    }

    if (parcelImages.length === 0) {
      alert('Please upload at least one parcel image');
      return;
    }

    if (deliveryType === 'scheduled' && !schedule) {
      alert('Please select a delivery schedule');
      return;
    }

    // Handle form submission
    console.log({
      location: selectedLocation,
      deliveryType,
      schedule,
      parcelImages,
      truckImages
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">mziGO</h1>
          <p className="text-gray-600">Cargo Transportation Made Easy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Location Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Select Location</h2>
              </div>
              <MapComponent
                onLocationSelect={setSelectedLocation}
                height="300px"
              />
              {selectedLocation && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Selected Location:</p>
                  <p className="font-medium">{selectedLocation.address}</p>
                </div>
              )}
            </div>

            {/* Delivery Type Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Delivery Type</h2>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDeliveryType('instant')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    deliveryType === 'instant'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Instant Delivery
                </button>
                <button
                  onClick={() => setDeliveryType('scheduled')}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    deliveryType === 'scheduled'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Scheduled Delivery
                </button>
              </div>
            </div>

            {/* Scheduled Delivery Form */}
            {deliveryType === 'scheduled' && (
              <ScheduledDelivery onScheduleSelect={setSchedule} />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Parcel Images */}
            <ImageGallery
              type="parcel"
              images={parcelImages}
              onImagesChange={setParcelImages}
              maxImages={3}
            />

            {/* Truck Images */}
            <ImageGallery
              type="truck"
              images={truckImages}
              onImagesChange={setTruckImages}
              maxImages={3}
            />

            {/* Submit Button */}
            <button
              className="w-full py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              onClick={handleSubmit}
            >
              Request Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientApp;