
import React, { useState, useEffect } from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "" 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setLoading(false);
    };
    
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {loading && (
        <div className="absolute inset-0 bg-melanie-purple-dark/50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-melanie-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!loading && !error && (
        <img 
          src={src} 
          alt={alt} 
          className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`}
        />
      )}
      
      {error && (
        <div className="absolute inset-0 bg-melanie-purple-dark/50 flex items-center justify-center">
          <p className="text-white text-sm">Error al cargar la imagen</p>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
