import React, { useState } from 'react';
import { Package, Truck, Upload, X } from 'lucide-react';

interface ImageGalleryProps {
  type: 'parcel' | 'truck';
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  type,
  images,
  onImagesChange,
  maxImages = 3
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    const totalImages = images.length + newImages.length;

    if (totalImages > maxImages) {
      setError(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = newImages.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Please upload only JPG, PNG, or WebP images');
      return;
    }

    // Validate file sizes (max 5MB per image)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = newImages.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setError('Each image must be less than 5MB');
      return;
    }

    setError(null);
    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

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

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={URL.createObjectURL(image)}
                alt={`${type} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <div className="aspect-w-4 aspect-h-3">
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload {type} image
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, or WebP (max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </label>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {images.length} of {maxImages} images uploaded
      </p>
    </div>
  );
};

export default ImageGallery; 