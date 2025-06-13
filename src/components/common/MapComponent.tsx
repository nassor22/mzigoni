import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapComponentProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  height?: string;
  width?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialLocation = { lat: -6.7924, lng: 39.2083 }, // Default to Dar es Salaam
  markers = [],
  height = '400px',
  width = '100%'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyCuPxmZhTN2wXCkICcuYSzAe_4HTWsS-38',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: initialLocation,
            zoom: 13,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          setMap(mapInstance);
          setGeocoder(new google.maps.Geocoder());

          // Add click listener for location selection
          if (onLocationSelect) {
            mapInstance.addListener('click', async (e: google.maps.MapMouseEvent) => {
              if (e.latLng && geocoder) {
                try {
                  const result = await geocoder.geocode({
                    location: e.latLng
                  });

                  if (result.results[0]) {
                    onLocationSelect({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                      address: result.results[0].formatted_address
                    });

                    // Add a marker at the clicked location
                    new google.maps.Marker({
                      position: e.latLng,
                      map: mapInstance,
                      animation: google.maps.Animation.DROP
                    });
                  }
                } catch (error) {
                  console.error('Geocoding error:', error);
                }
              }
            });
          }

          // Add markers if provided
          markers.forEach(marker => {
            new google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map: mapInstance,
              title: marker.title
            });
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [initialLocation, markers, onLocationSelect]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        style={{
          height,
          width,
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
      <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">Click on the map to select a location</p>
      </div>
    </div>
  );
};

export default MapComponent; 