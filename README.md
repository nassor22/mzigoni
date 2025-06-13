# mziGO - Cargo Transportation Platform

A modern cargo transportation platform for Tanzania, connecting clients with reliable drivers for their cargo needs.

## Features

- Real-time location tracking using Google Maps
- Scheduled and instant delivery options
- Driver verification with license and vehicle documentation
- Secure payment processing
- User-friendly interface for both clients and drivers

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. Get a Google Maps API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API and Places API
   - Create credentials (API key)
   - Add the API key to your `.env` file

5. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Google Maps API
- Vite
