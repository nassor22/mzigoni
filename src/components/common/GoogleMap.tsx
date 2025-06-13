import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  height?: string;
  width?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: -6.7924, lng: 39.2083 }, // Default to Dar es Salaam
  zoom = 13,
  onLocationSelect,
  markers = [],
  height = '400px',
  width = '100%'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          });

          mapInstanceRef.current = map;

          // Add click listener for location selection
          if (onLocationSelect) {
            map.addListener('click', async (e: google.maps.MapMouseEvent) => {
              if (e.latLng) {
                const geocoder = new google.maps.Geocoder();
                const result = await geocoder.geocode({
                  location: e.latLng
                });

                if (result.results[0]) {
                  onLocationSelect({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    address: result.results[0].formatted_address
                  });
                }
              }
            });
          }

          // Add markers if provided
          markers.forEach(marker => {
            new google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map,
              title: marker.title
            });
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [center, zoom, markers, onLocationSelect]);

  return (
    <div
      ref={mapRef}
      style={{
        height,
        width,
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};

export default GoogleMap; 