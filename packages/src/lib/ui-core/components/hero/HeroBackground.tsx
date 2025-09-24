'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';
import { buildGradientClasses } from '../../utils/gradientUtils';

export function HeroBackground({ config, className, onLoad, onError, components }: HeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Support for modern image formats
  const supportsWebP = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  const supportsAVIF = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }, []);

  // Optimize image URL based on format support
  const optimizedImageUrl = useMemo(() => {
    if (config.type !== 'image' || !config.image) return null;

    let imageUrl = config.image;

    // Basic format optimization - replace extensions if modern formats are supported
    if (supportsAVIF && imageUrl.includes('.jpg')) {
      imageUrl = imageUrl.replace('.jpg', '.avif');
    } else if (supportsAVIF && imageUrl.includes('.png')) {
      imageUrl = imageUrl.replace('.png', '.avif');
    } else if (supportsWebP && imageUrl.includes('.jpg')) {
      imageUrl = imageUrl.replace('.jpg', '.webp');
    } else if (supportsWebP && imageUrl.includes('.png')) {
      imageUrl = imageUrl.replace('.png', '.webp');
    }

    return imageUrl;
  }, [config.image, config.type, supportsAVIF, supportsWebP]);

  // Handle theme-aware image selection
  const selectedImageUrl = useMemo(() => {
    if (config.type !== 'image') return null;

    // For now, we'll use the light image as default
    // In a real implementation, you'd check the theme context here
    const isDarkMode = false; // TODO: Get from theme context

    if (isDarkMode && config.imageDark) {
      return config.imageDark;
    }

    return optimizedImageUrl;
  }, [config.type, config.imageDark, optimizedImageUrl]);

  // Effect to handle image loading
  useEffect(() => {
    if (config.type !== 'image' || !selectedImageUrl) return;

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
          setCurrentImageUrl(config.image!);
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
  }, [selectedImageUrl, config.type, config.image, onLoad, onError]);

  const gradientClasses = useMemo(() => {
    if (config.type !== 'gradient' || !config.gradient) {
      return '';
    }

    const gradient = config.gradient;
    return buildGradientClasses(gradient.range, gradient.from, gradient.to, gradient.custom);
  }, [config.gradient, config.type]);

  // Background styles for images
  const backgroundStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (config.type === 'gradient' && config.gradient?.custom) {
      styles.background = config.gradient.custom;
    } else if (config.type === 'image' && currentImageUrl && imageLoaded) {
      styles.backgroundImage = `url(${currentImageUrl})`;
      styles.backgroundPosition = config.position || 'center center';
      styles.backgroundSize = config.size || 'cover';
      styles.backgroundRepeat = 'no-repeat';
    }

    return styles;
  }, [config.type, config.gradient, config.position, config.size, currentImageUrl, imageLoaded]);

  // Handle different background types
  if (config.type === 'gradient') {
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full',
          gradientClasses,
          className
        )}
        style={backgroundStyles}
      />
    );
  }

  if (config.type === 'image') {
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
          <div className="absolute inset-0 bg-gray-100 animate-pulse">
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
                <div className="text-sm">Loading image...</div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100">
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm">Failed to load background image</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placeholder for other background types (video, slides)
  return (
    <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
      <div className="flex items-center justify-center h-full text-gray-500">
        Background type &quot;{config.type}&quot; - Coming soon
      </div>
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';