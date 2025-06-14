import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface GoogleMapsComponentProps {
  onLocationSelect?: (location: Location) => void;
  markers?: Array<{ lat: number; lng: number; title?: string; type?: 'pickup' | 'delivery' | 'driver' }>;
  height?: string;
  showSearch?: boolean;
  center?: { lat: number; lng: number };
  zoom?: number;
  trackingMode?: boolean;
}

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
  onLocationSelect,
  markers = [],
  height = '400px',
  showSearch = true,
  center = { lat: -6.7924, lng: 39.2083 }, // Dar es Salaam
  zoom = 13,
  trackingMode = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      // Check if Google Maps is already loaded
      if (typeof google === 'undefined') {
        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          createMap();
        };
        
        script.onerror = () => {
          setError('Failed to load Google Maps');
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } else {
        createMap();
      }
    } catch (err) {
      setError('Error initializing map');
      setIsLoading(false);
    }
  }, [center, zoom]);

  const createMap = useCallback(() => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    mapInstanceRef.current = map;

    // Add click listener for location selection
    if (onLocationSelect && !trackingMode) {
      map.addListener('click', async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const geocoder = new google.maps.Geocoder();
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
            }
          } catch (error) {
            console.error('Geocoding error:', error);
          }
        }
      });
    }

    setIsLoading(false);
    updateMarkers();
  }, [center, zoom, onLocationSelect, trackingMode]);

  const updateMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: mapInstanceRef.current,
        title: markerData.title,
        icon: getMarkerIcon(markerData.type)
      });

      markersRef.current.push(marker);

      // Add info window if title exists
      if (markerData.title) {
        const infoWindow = new google.maps.InfoWindow({
          content: markerData.title
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      }
    });
  }, [markers]);

  const getMarkerIcon = (type?: string) => {
    const baseUrl = 'https://maps.google.com/mapfiles/ms/icons/';
    switch (type) {
      case 'pickup':
        return `${baseUrl}blue-dot.png`;
      case 'delivery':
        return `${baseUrl}red-dot.png`;
      case 'driver':
        return `${baseUrl}green-dot.png`;
      default:
        return `${baseUrl}red-dot.png`;
    }
  };

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim() || !mapInstanceRef.current) return;

    const geocoder = new google.maps.Geocoder();
    try {
      const result = await geocoder.geocode({
        address: searchValue,
        componentRestrictions: { country: 'TZ' } // Restrict to Tanzania
      });

      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(15);

        if (onLocationSelect) {
          onLocationSelect({
            lat: location.lat(),
            lng: location.lng(),
            address: result.results[0].formatted_address
          });
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Location not found');
    }
  }, [searchValue, onLocationSelect]);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(location);
          mapInstanceRef.current.setZoom(15);
        }

        // Reverse geocode to get address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results && results[0] && onLocationSelect) {
            onLocationSelect({
              lat: latitude,
              lng: longitude,
              address: results[0].formatted_address
            });
          }
        });
      },
      (error) => {
        setError('Unable to get current location');
        console.error('Geolocation error:', error);
      }
    );
  }, [onLocationSelect]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 p-2 text-sm z-20 rounded-t-lg">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-2 text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {showSearch && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for a location..."
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={getCurrentLocation}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Get current location"
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="rounded-lg overflow-hidden"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsComponent;