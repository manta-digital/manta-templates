'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { useImageFormatSupport } from './BackgroundFormatUtils';
import { optimizeImageUrl } from './BackgroundFormatUtils';
import { ImageLoadingState, ImageErrorState } from './BackgroundLoadingStates';

interface ImageBackgroundConfig {
  image: string;
  imageDark?: string;
  position?: string;
  size?: string;
}

interface ImageBackgroundProps {
  config: ImageBackgroundConfig;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function ImageBackground({ config, className, onLoad, onError }: ImageBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const { supportsWebP, supportsAVIF } = useImageFormatSupport();

  // Optimize image URL based on format support
  const optimizedImageUrl = useMemo(() => {
    if (!config.image) return null;

    return optimizeImageUrl(config.image, supportsWebP, supportsAVIF);
  }, [config.image, supportsWebP, supportsAVIF]);

  // Handle theme-aware image selection
  const selectedImageUrl = useMemo(() => {
    // For now, we'll use the light image as default
    // In a real implementation, you'd check the theme context here
    const isDarkMode = false; // TODO: Get from theme context

    if (isDarkMode && config.imageDark) {
      return config.imageDark;
    }

    return optimizedImageUrl;
  }, [config.imageDark, optimizedImageUrl]);

  // Effect to handle image loading
  useEffect(() => {
    if (!selectedImageUrl) return;

    setImageLoaded(false);
    setImageError(false);
    setCurrentImageUrl(selectedImageUrl);

    // Preload the image
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);

      // Try fallback to original format if optimized format failed
      if (selectedImageUrl !== config.image && config.image) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setCurrentImageUrl(config.image);
          setImageLoaded(true);
          setImageError(false);
          onLoad?.();
        };
        fallbackImg.onerror = () => {
          onError?.(new Error(`Failed to load hero background image: ${config.image}`));
        };
        fallbackImg.src = config.image;
      } else {
        onError?.(new Error(`Failed to load hero background image: ${selectedImageUrl}`));
      }
    };

    img.src = selectedImageUrl;
  }, [selectedImageUrl, config.image, onLoad, onError]);

  // Background styles
  const backgroundStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (currentImageUrl && imageLoaded) {
      styles.backgroundImage = `url(${currentImageUrl})`;
      styles.backgroundPosition = config.position || 'center center';
      styles.backgroundSize = config.size || 'cover';
      styles.backgroundRepeat = 'no-repeat';
    }

    return styles;
  }, [config.position, config.size, currentImageUrl, imageLoaded]);

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full transition-opacity duration-500',
        imageLoaded ? 'opacity-100' : 'opacity-0',
        imageError && 'bg-gray-100',
        className
      )}
      style={backgroundStyles}
    >
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <ImageLoadingState />
      )}

      {/* Error state */}
      {imageError && (
        <ImageErrorState />
      )}
    </div>
  );
}

ImageBackground.displayName = 'ImageBackground';