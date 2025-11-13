import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  priority = false,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Generate WebP source path
  const getWebPSrc = (src: string) => {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 animate-pulse" />
      )}
      
      {/* Main image with WebP support */}
      <picture>
        {/* WebP format for modern browsers */}
        <source 
          type="image/webp" 
          srcSet={getWebPSrc(imageSrc)}
        />
        
        {/* Fallback to original format */}
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          onLoad={handleLoad}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
    </div>
  );
}
