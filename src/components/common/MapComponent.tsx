import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface MapComponentProps {
  onLocationSelect: (location: Location) => void;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect, height = '400px' }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultCenter = {
    lat: -6.7924, // Default to Dar es Salaam
    lng: 39.2083,
  };

  const mapContainerStyle = {
    width: '100%',
    height: height,
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoading(false);
  }, []);

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || '',
          };
          setSelectedLocation(location);
          onLocationSelect(location);
          map?.panTo(place.geometry.location);
          setMarker(place.geometry.location);
        }
      }
    }
  }, [searchBox, map, onLocationSelect]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setMarker(event.latLng);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: event.latLng.lat(), lng: event.latLng.lng() } },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const location = {
                lat: event.latLng!.lat(),
                lng: event.latLng!.lng(),
                address: results[0].formatted_address,
              };
              setSelectedLocation(location);
              onLocationSelect(location);
            } else {
              setError('Could not find address for this location');
            }
          }
        );
      }
    },
    [onLocationSelect]
  );

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 p-2 text-sm z-10">
          {error}
        </div>
      )}
      <div className="relative">
        <div className="absolute top-2 left-2 right-2 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onFocus={() => setError(null)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
          libraries={['places']}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={13}
            onLoad={onMapLoad}
            onClick={handleMapClick}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {marker && <Marker position={marker} draggable onDragEnd={handleMapClick} />}
            {selectedLocation && (
              <InfoWindow position={marker!}>
                <div className="p-2">
                  <p className="text-sm font-medium">{selectedLocation.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
    </div>
  );
};

export default MapComponent; 