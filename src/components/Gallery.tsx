
import React, { useState } from 'react';
import ImageLoader from './ImageLoader';

interface GalleryProps {
  images: string[];
  columnLayout?: number;
}

const Gallery: React.FC<GalleryProps> = ({ images, columnLayout = 3 }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Dividir las imágenes en columnas
  const columns: string[][] = Array.from({ length: columnLayout }, () => []);
  
  images.forEach((image, index) => {
    columns[index % columnLayout].push(image);
  });

  return (
    <>
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-4 md:space-y-6">
              {column.map((image, imgIndex) => (
                <div 
                  key={`${colIndex}-${imgIndex}`} 
                  className="card-hover overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <ImageLoader 
                    src={image} 
                    alt="Melanie" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-xl z-10 bg-melanie-purple-dark/70 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageLoader 
              src={selectedImage} 
              alt="Melanie" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
