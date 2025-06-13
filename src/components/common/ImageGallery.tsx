import React from 'react';
import { Package, Truck } from 'lucide-react';

interface ImageGalleryProps {
  type: 'parcel' | 'truck';
  images: string[];
  onImageSelect?: (image: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ type, images, onImageSelect }) => {
  // Default images if none provided
  const defaultImages = {
    parcel: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop'
    ],
    truck: [
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=300&fit=crop'
    ]
  };

  const displayImages = images.length > 0 ? images : defaultImages[type];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        {type === 'parcel' ? (
          <Package className="h-6 w-6 text-green-600 mr-3" />
        ) : (
          <Truck className="h-6 w-6 text-green-600 mr-3" />
        )}
        <h2 className="text-xl font-semibold text-gray-800">
          {type === 'parcel' ? 'Parcel Images' : 'Truck Images'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => onImageSelect?.(image)}
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${type} image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Using placeholder images. Upload your own images to replace these.
        </p>
      )}
    </div>
  );
};

export default ImageGallery; 