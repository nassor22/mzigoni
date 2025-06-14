# mziGO - Cargo Transportation Platform

A modern cargo transportation platform for Tanzania, connecting clients with reliable drivers for their cargo needs.

## Features

- **Bilingual Support**: English and Swahili language options
- **Real-time Location Tracking**: Google Maps integration for live tracking
- **Modern UI**: Beautiful, production-ready interface with smooth animations
- **Role-based Access**: Separate interfaces for clients and drivers
- **Secure Authentication**: User registration and login system
- **Driver Verification**: License and vehicle documentation upload
- **Payment Integration**: Multiple payment options including mobile money
- **Rating System**: Rate drivers and track service quality

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Google Maps JavaScript API
- **Mobile**: Capacitor for Android/iOS apps
- **Build Tool**: Vite

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd mzigo
npm install
```

### 2. Google Maps API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API key)
5. Add your API key to the `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Development Server

```bash
npm run dev
```

### 4. Building for Production

```bash
npm run build
```

### 5. Mobile App Development

For Android:
```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

## Key Features Implemented

### 🌍 Bilingual Support
- English and Swahili language switching
- Persistent language preference
- Comprehensive translations for all UI elements

### 🗺️ Google Maps Integration
- Interactive map selection for pickup/delivery locations
- Real-time driver tracking
- Current location detection
- Address search functionality
- Custom markers for different location types

### 🎨 Modern Design
- Clean, professional interface
- Smooth animations and transitions
- Responsive design for all screen sizes
- Apple-level design aesthetics
- Consistent color scheme and typography

### 📱 Mobile-First Approach
- Touch-friendly interface
- Optimized for mobile devices
- Capacitor integration for native app features

### 🚛 Driver Features
- Driver registration with document upload
- Online/offline status toggle
- Trip management and tracking
- Earnings dashboard

### 📦 Client Features
- Easy cargo booking flow
- Real-time delivery tracking
- Payment processing
- Trip history and ratings

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── client/         # Client-specific components
│   ├── driver/         # Driver-specific components
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and translations
└── assets/             # Images and static assets
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2025 mziGO. All rights reserved.