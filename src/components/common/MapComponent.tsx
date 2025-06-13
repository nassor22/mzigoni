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
  const [error, setError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyCuPxmZhTN2wXCkICcuYSzAe_4HTWsS-38',
        version: 'weekly',
        libraries: ['places', 'geocoding']
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
            zoomControl: true,
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
                  // Remove previous marker if exists
                  if (selectedMarker) {
                    selectedMarker.setMap(null);
                  }

                  // Create new marker
                  const marker = new google.maps.Marker({
                    position: e.latLng,
                    map: mapInstance,
                    animation: google.maps.Animation.DROP,
                    draggable: true
                  });

                  setSelectedMarker(marker);

                  // Add drag end listener
                  marker.addListener('dragend', async (event: google.maps.MapMouseEvent) => {
                    if (event.latLng) {
                      const result = await geocoder.geocode({
                        location: event.latLng
                      });

                      if (result.results[0]) {
                        onLocationSelect({
                          lat: event.latLng.lat(),
                          lng: event.latLng.lng(),
                          address: result.results[0].formatted_address
                        });
                      }
                    }
                  });

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
                } catch (error) {
                  console.error('Geocoding error:', error);
                  setError('Error getting location details. Please try again.');
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

          // Add search box
          const input = document.createElement('input');
          input.className = 'controls';
          input.placeholder = 'Search for a location';
          input.style.cssText = `
            margin-top: 10px;
            margin-left: 10px;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 200px;
            font-size: 14px;
          `;

          const searchBox = new google.maps.places.SearchBox(input);
          mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          // Bias the SearchBox results towards current map's viewport
          mapInstance.addListener('bounds_changed', () => {
            searchBox.setBounds(mapInstance.getBounds()!);
          });

          // Listen for the event fired when the user selects a prediction
          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
              return;
            }

            const place = places[0];
            if (!place.geometry || !place.geometry.location) {
              return;
            }

            // If the place has a geometry, then present it on a map
            if (place.geometry.viewport) {
              mapInstance.fitBounds(place.geometry.viewport);
            } else {
              mapInstance.setCenter(place.geometry.location);
              mapInstance.setZoom(17);
            }

            // Add marker for the selected place
            if (selectedMarker) {
              selectedMarker.setMap(null);
            }

            const marker = new google.maps.Marker({
              map: mapInstance,
              position: place.geometry.location,
              animation: google.maps.Animation.DROP,
              draggable: true
            });

            setSelectedMarker(marker);

            if (onLocationSelect) {
              onLocationSelect({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address || ''
              });
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setError('Error loading map. Please refresh the page and try again.');
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
      {error && (
        <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">Click or search to select a location</p>
      </div>
    </div>
  );
};

export default MapComponent; 