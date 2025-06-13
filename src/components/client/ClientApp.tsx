import React, { useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { Package, MapPin, Calendar, Clock, Truck, CreditCard, Star } from 'lucide-react';
import MapComponent from '../common/MapComponent';
import ImageGallery from '../common/ImageGallery';
import ScheduledDelivery from '../common/ScheduledDelivery';
import ClientDashboard from './ClientDashboard';
import BookingFlow from './BookingFlow';
import TrackingScreen from './TrackingScreen';
import PaymentScreen from './PaymentScreen';
import RatingScreen from './RatingScreen';

// Step 1: Profile Setup
const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    paymentMethod: 'mobile_money',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client/new-request');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Payment Method
          </label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="mobile_money">Mobile Money</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

// Step 2: New Request
const NewRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cargoType: 'parcel_boda',
    pickupLocation: null as { lat: number; lng: number; address: string } | null,
    deliveryLocation: null as { lat: number; lng: number; address: string } | null,
    contactName: '',
    contactPhone: '',
    instructions: '',
    scheduleDelivery: false,
    scheduledDate: '',
    scheduledTime: '',
  });
  const [parcelImages, setParcelImages] = useState<File[]>([]);
  const [truckImages, setTruckImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickupLocation || !formData.deliveryLocation) {
      alert('Please select both pickup and delivery locations');
      return;
    }
    if (parcelImages.length === 0) {
      alert('Please upload at least one parcel image');
      return;
    }
    navigate('/client/select-truck');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Delivery Request</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, cargoType: 'parcel_boda' })}
              className={`p-4 border rounded-lg text-center ${
                formData.cargoType === 'parcel_boda'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300'
              }`}
            >
              <Package className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm font-medium">Parcel Boda</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, cargoType: 'parcel_cargo' })}
              className={`p-4 border rounded-lg text-center ${
                formData.cargoType === 'parcel_cargo'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300'
              }`}
            >
              <Package className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm font-medium">Parcel Cargo</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, cargoType: 'truck' })}
              className={`p-4 border rounded-lg text-center ${
                formData.cargoType === 'truck'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300'
              }`}
            >
              <Truck className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm font-medium">Truck</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pickup Location
          </label>
          <MapComponent
            onLocationSelect={(location) =>
              setFormData({ ...formData, pickupLocation: location })
            }
          />
          {formData.pickupLocation && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.pickupLocation.address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Location
          </label>
          <MapComponent
            onLocationSelect={(location) =>
              setFormData({ ...formData, deliveryLocation: location })
            }
          />
          {formData.deliveryLocation && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.deliveryLocation.address}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person at Pickup
          </label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone Number
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions for Driver
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parcel Images
          </label>
          <ImageGallery
            type="parcel"
            images={parcelImages}
            onImagesChange={setParcelImages}
            maxImages={5}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Truck Images (if applicable)
          </label>
          <ImageGallery
            type="truck"
            images={truckImages}
            onImagesChange={setTruckImages}
            maxImages={3}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="scheduleDelivery"
            checked={formData.scheduleDelivery}
            onChange={(e) =>
              setFormData({ ...formData, scheduleDelivery: e.target.checked })
            }
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="scheduleDelivery" className="ml-2 block text-sm text-gray-700">
            Schedule for later delivery
          </label>
        </div>

        {formData.scheduleDelivery && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledTime: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Find Available Trucks
        </button>
      </form>
    </div>
  );
};

// Step 3: Select Truck
const SelectTruck = () => {
  const navigate = useNavigate();
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);

  const handleSelect = (truckId: string) => {
    setSelectedTruck(truckId);
    navigate('/client/confirm-order');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Trucks</h2>
      <div className="space-y-4">
        {/* Sample truck listings - replace with actual data */}
        {[1, 2, 3].map((truck) => (
          <div
            key={truck}
            className="border border-gray-300 rounded-lg p-4 hover:border-green-500 cursor-pointer"
            onClick={() => handleSelect(`truck-${truck}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Truck className="h-12 w-12 text-green-600" />
                <div>
                  <h3 className="font-medium text-gray-800">Truck {truck}</h3>
                  <p className="text-sm text-gray-600">Estimated arrival: 15 mins</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">$50.00</p>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm">4.8</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Step 4: Confirm Order
const ConfirmOrder = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/client/track-pickup');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Confirm Your Order</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
          <div className="space-y-2 text-gray-600">
            <p>Pickup: 123 Main St, City</p>
            <p>Delivery: 456 Oak Ave, City</p>
            <p>Cargo Type: Parcel Boda</p>
            <p className="font-medium text-gray-800">Total: $50.00</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Driver Details</h3>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-600">4.8 ★ (100+ trips)</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Vehicle Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>Truck Plate: ABC123</p>
            <p>Vehicle Type: Pickup Truck</p>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

// Step 5: Track Pickup
const TrackPickup = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Your Driver</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg">
          <MapComponent onLocationSelect={() => {}} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Driver is on the way</p>
            <p className="text-sm text-gray-600">ETA: 10 minutes</p>
          </div>
          <button
            onClick={() => navigate('/client/track-delivery')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
          >
            Arrived at Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 6: Track Delivery
const TrackDelivery = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Your Delivery</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="h-64 bg-gray-200 rounded-lg">
          <MapComponent onLocationSelect={() => {}} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Cargo is on the way</p>
            <p className="text-sm text-gray-600">ETA: 25 minutes</p>
          </div>
          <button
            onClick={() => navigate('/client/complete-trip')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
          >
            Arrived at Destination
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 7: Complete Trip
const CompleteTrip = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trip Completed</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-800 mb-2">Delivery Successful!</h3>
          <p className="text-gray-600">Your cargo has been delivered safely.</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Payment Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>Total Amount: $50.00</p>
            <p>Payment Method: Mobile Money</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/client/rate-trip')}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

// Step 8: Rate Trip
const RateTrip = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/client');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rate Your Trip</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How was your experience?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={4}
            placeholder="Share your experience..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

const ClientApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/client/profile" replace />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/select-truck" element={<SelectTruck />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/track-pickup" element={<TrackPickup />} />
        <Route path="/track-delivery" element={<TrackDelivery />} />
        <Route path="/complete-trip" element={<CompleteTrip />} />
        <Route path="/rate-trip" element={<RateTrip />} />
      </Routes>
    </div>
  );
};

export default ClientApp;