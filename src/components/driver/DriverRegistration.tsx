import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, Car, CreditCard, CheckCircle, MapPin, FileText, X, Camera, AlertCircle } from 'lucide-react';

interface DocumentUpload {
  file: File | null;
  preview: string | null;
  number: string;
}

const DriverRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      currentLocation: {
        latitude: '',
        longitude: '',
        address: ''
      }
    },
    documents: {
      license: {
        number: '',
        expiryDate: '',
        photo: null as File | null,
        preview: null as string | null
      },
      truckPlate: {
        number: '',
        photo: null as File | null,
        preview: null as string | null
      },
      carCard: {
        photo: null as File | null,
        preview: null as string | null
      }
    },
    vehicle: {
      type: '',
      make: '',
      model: '',
      year: '',
      color: '',
      capacity: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.personalInfo.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.personalInfo.phone) newErrors.phone = 'Phone number is required';
        if (!formData.personalInfo.email) newErrors.email = 'Email is required';
        if (!formData.personalInfo.password) newErrors.password = 'Password is required';
        if (!formData.personalInfo.currentLocation.address) newErrors.location = 'Current location is required';
        break;

      case 2:
        if (!formData.documents.license.number) newErrors.licenseNumber = 'License number is required';
        if (!formData.documents.license.expiryDate) newErrors.licenseExpiry = 'License expiry date is required';
        if (!formData.documents.license.photo) newErrors.licensePhoto = 'License photo is required';
        if (!formData.documents.truckPlate.number) newErrors.plateNumber = 'Truck plate number is required';
        if (!formData.documents.truckPlate.photo) newErrors.platePhoto = 'Truck plate photo is required';
        if (!formData.documents.carCard.photo) newErrors.carCard = 'Car card photo is required';
        break;

      case 3:
        if (!formData.vehicle.type) newErrors.vehicleType = 'Vehicle type is required';
        if (!formData.vehicle.make) newErrors.make = 'Vehicle make is required';
        if (!formData.vehicle.model) newErrors.model = 'Vehicle model is required';
        if (!formData.vehicle.year) newErrors.year = 'Vehicle year is required';
        if (!formData.vehicle.color) newErrors.color = 'Vehicle color is required';
        if (!formData.vehicle.capacity) newErrors.capacity = 'Vehicle capacity is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Submit application
        console.log('Form submitted:', formData);
        navigate('/driver/dashboard');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/driver');
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: {
            ...prev.documents[field as keyof typeof prev.documents],
            photo: file,
            preview: reader.result as string
          }
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm backdrop-blur-lg bg-opacity-90 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Driver Registration
                </h1>
                <p className="text-gray-600">Join our driver network</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              Step {step} of 3
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  num <= step 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {num <= step ? <CheckCircle className="h-5 w-5" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-16 md:w-32 h-1 mx-2 transition-all duration-300 ${
                    num < step 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: {...formData.personalInfo, fullName: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: {...formData.personalInfo, phone: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                  placeholder="+255 123 456 789"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: {...formData.personalInfo, email: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.personalInfo.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: {...formData.personalInfo, password: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                  placeholder="Create a secure password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.personalInfo.currentLocation.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        currentLocation: {
                          ...formData.personalInfo.currentLocation,
                          address: e.target.value
                        }
                      }
                    })}
                    className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                    }`}
                    placeholder="Enter your current location"
                  />
                  <button
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          setFormData({
                            ...formData,
                            personalInfo: {
                              ...formData.personalInfo,
                              currentLocation: {
                                latitude: position.coords.latitude.toString(),
                                longitude: position.coords.longitude.toString(),
                                address: '' // This would be populated by reverse geocoding
                              }
                            }
                          });
                        });
                      }
                    }}
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Required Documents</h2>
            </div>
            <div className="space-y-8">
              {/* Driver's License */}
              <div className="bg-gray-50 rounded-xl p-6 transform transition-all duration-200 hover:scale-[1.01]">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-green-600" />
                  Driver's License
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-200 hover:scale-[1.02]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={formData.documents.license.number}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {
                          ...formData.documents,
                          license: {
                            ...formData.documents.license,
                            number: e.target.value
                          }
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.licenseNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                      }`}
                      placeholder="Enter license number"
                    />
                    {errors.licenseNumber && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.licenseNumber}
                      </p>
                    )}
                  </div>
                  <div className="transform transition-all duration-200 hover:scale-[1.02]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.documents.license.expiryDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {
                          ...formData.documents,
                          license: {
                            ...formData.documents.license,
                            expiryDate: e.target.value
                          }
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.licenseExpiry ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                      }`}
                    />
                    {errors.licenseExpiry && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.licenseExpiry}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all duration-200 hover:border-green-500 hover:bg-green-50">
                    {formData.documents.license.preview ? (
                      <div className="relative group">
                        <img
                          src={formData.documents.license.preview}
                          alt="License preview"
                          className="mx-auto max-h-48 rounded-lg shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                        <button
                          onClick={() => setFormData({
                            ...formData,
                            documents: {
                              ...formData.documents,
                              license: {
                                ...formData.documents.license,
                                photo: null,
                                preview: null
                              }
                            }
                          })}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">Upload Driver's License Photo</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('license', file);
                          }}
                          className="hidden"
                          id="licensePhoto"
                        />
                        <label
                          htmlFor="licensePhoto"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                        >
                          Choose File
                        </label>
                      </>
                    )}
                  </div>
                  {errors.licensePhoto && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.licensePhoto}
                    </p>
                  )}
                </div>
              </div>

              {/* Truck Plate */}
              <div className="bg-gray-50 rounded-xl p-6 transform transition-all duration-200 hover:scale-[1.01]">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-green-600" />
                  Truck Plate
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-200 hover:scale-[1.02]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plate Number
                    </label>
                    <input
                      type="text"
                      value={formData.documents.truckPlate.number}
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: {
                          ...formData.documents,
                          truckPlate: {
                            ...formData.documents.truckPlate,
                            number: e.target.value
                          }
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        errors.plateNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                      }`}
                      placeholder="Enter plate number"
                    />
                    {errors.plateNumber && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.plateNumber}
                      </p>
                    )}
                  </div>
                  <div className="transform transition-all duration-200 hover:scale-[1.02]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plate Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all duration-200 hover:border-green-500 hover:bg-green-50">
                      {formData.documents.truckPlate.preview ? (
                        <div className="relative group">
                          <img
                            src={formData.documents.truckPlate.preview}
                            alt="Plate preview"
                            className="mx-auto max-h-48 rounded-lg shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                          <button
                            onClick={() => setFormData({
                              ...formData,
                              documents: {
                                ...formData.documents,
                                truckPlate: {
                                  ...formData.documents.truckPlate,
                                  photo: null,
                                  preview: null
                                }
                              }
                            })}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-2">Upload Truck Plate Photo</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('truckPlate', file);
                            }}
                            className="hidden"
                            id="platePhoto"
                          />
                          <label
                            htmlFor="platePhoto"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                          >
                            Choose File
                          </label>
                        </>
                      )}
                    </div>
                    {errors.platePhoto && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.platePhoto}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Car Card */}
              <div className="bg-gray-50 rounded-xl p-6 transform transition-all duration-200 hover:scale-[1.01]">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-green-600" />
                  Car Card
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all duration-200 hover:border-green-500 hover:bg-green-50">
                  {formData.documents.carCard.preview ? (
                    <div className="relative group">
                      <img
                        src={formData.documents.carCard.preview}
                        alt="Car card preview"
                        className="mx-auto max-h-48 rounded-lg shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          documents: {
                            ...formData.documents,
                            carCard: {
                              ...formData.documents.carCard,
                              photo: null,
                              preview: null
                            }
                          }
                        })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Upload Car Card Photo</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('carCard', file);
                        }}
                        className="hidden"
                        id="carCardPhoto"
                      />
                      <label
                        htmlFor="carCardPhoto"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </>
                  )}
                </div>
                {errors.carCard && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.carCard}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle Information */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <Car className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Vehicle Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={formData.vehicle.type}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, type: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.vehicleType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  <option value="">Select vehicle type</option>
                  <option value="motorcycle">Motorcycle/Boda</option>
                  <option value="small_car">Small Car</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="small_truck">Small Truck</option>
                  <option value="large_truck">Large Truck</option>
                </select>
                {errors.vehicleType && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.vehicleType}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <input
                  type="text"
                  value={formData.vehicle.make}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, make: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.make ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                />
                {errors.make && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.make}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  value={formData.vehicle.model}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, model: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.model ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                />
                {errors.model && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.model}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.vehicle.year}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, year: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                />
                {errors.year && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.year}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.vehicle.color}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, color: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.color ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                />
                {errors.color && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.color}
                  </p>
                )}
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="text"
                  value={formData.vehicle.capacity}
                  onChange={(e) => setFormData({
                    ...formData,
                    vehicle: {...formData.vehicle, capacity: e.target.value}
                  })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.capacity ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
                  }`}
                />
                {errors.capacity && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.capacity}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRegistration;