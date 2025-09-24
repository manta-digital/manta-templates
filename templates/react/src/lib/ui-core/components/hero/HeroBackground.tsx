'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';
import { buildGradientClasses } from '../../utils/gradientUtils';

export function HeroBackground({ config, className, onLoad, onError, components }: HeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Video-specific state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Video format support detection
  const supportedVideoFormat = useMemo(() => {
    if (typeof window === 'undefined') return 'mp4';

    const video = document.createElement('video');
    if (video.canPlayType('video/webm; codecs="vp9"')) {
      return 'webm';
    } else if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      return 'mp4';
    }
    return 'mp4'; // fallback
  }, []);

  // Check if device is mobile for video optimization
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

  // Optimized video URL based on format support and device
  const optimizedVideoUrl = useMemo(() => {
    if (config.type !== 'video' || !config.video?.src) return null;

    let videoUrl = config.video.src;

    // On mobile, try to use lower quality or fallback to image
    if (isMobile && config.video.fallbackImage) {
      return null; // Will fallback to image on mobile
    }

    // Basic format optimization - replace extensions if better formats are supported
    if (supportedVideoFormat === 'webm' && videoUrl.includes('.mp4')) {
      const webmUrl = videoUrl.replace('.mp4', '.webm');
      return webmUrl;
    }

    return videoUrl;
  }, [config.video, config.type, supportedVideoFormat, isMobile]);

  // Video event handlers
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
    onLoad?.();
  }, [onLoad]);

  const handleVideoCanPlay = useCallback(() => {
    setVideoCanPlay(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoaded(false);

    // Try fallback to fallback image if video fails
    if (config.video?.fallbackImage) {
      // Set up image fallback
      const img = new Image();
      img.onload = () => {
        setCurrentImageUrl(config.video!.fallbackImage!);
        setImageLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        onError?.(new Error(`Failed to load video and fallback image: ${config.video?.src}`));
      };
      img.src = config.video.fallbackImage;
    } else {
      onError?.(new Error(`Failed to load hero background video: ${config.video?.src}`));
    }
  }, [config.video, onError, onLoad]);

  // Effect to handle video loading and play/pause on visibility
  useEffect(() => {
    if (config.type !== 'video' || !config.video?.src) return;

    const video = videoRef.current;
    if (!video) return;

    // Reset video state
    setVideoLoaded(false);
    setVideoError(false);
    setVideoCanPlay(false);

    // On mobile, fallback to image if available
    if (isMobile && config.video.fallbackImage) {
      setCurrentImageUrl(config.video.fallbackImage);
      setImageLoaded(true);
      onLoad?.();
      return;
    }

    // Set up video properties
    video.autoplay = config.video.autoPlay ?? true;
    video.loop = config.video.loop ?? true;
    video.muted = config.video.muted ?? true;
    video.playsInline = true; // Important for iOS
    video.preload = 'metadata';

    if (config.video.poster) {
      video.poster = config.video.poster;
    }

    // Set video source
    if (optimizedVideoUrl) {
      video.src = optimizedVideoUrl;
    } else {
      video.src = config.video.src;
    }

    // Add event listeners
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('error', handleVideoError);

    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented, not necessarily an error
        console.log('Video autoplay was prevented');
      });
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('error', handleVideoError);
    };
  }, [config.type, config.video, optimizedVideoUrl, isMobile, handleVideoLoad, handleVideoCanPlay, handleVideoError, onLoad]);

  // Effect to handle intersection observer for video play/pause optimization
  useEffect(() => {
    if (config.type !== 'video' || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Video is visible, try to play
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Play failed, not necessarily an error
            });
          }
        } else {
          // Video is not visible, pause to save bandwidth
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [config.type]);

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

  if (config.type === 'video') {
    // On mobile with fallback image, render as image
    if (isMobile && config.video?.fallbackImage && currentImageUrl && imageLoaded) {
      return (
        <div
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-500',
            'opacity-100',
            className
          )}
          style={{
            backgroundImage: `url(${currentImageUrl})`,
            backgroundPosition: config.position || 'center center',
            backgroundSize: config.size || 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      );
    }

    return (
      <div className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}>
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            videoCanPlay && !videoError ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            objectPosition: config.position || 'center center',
          }}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          Your browser does not support the video tag.
        </video>

        {/* Video poster/loading state */}
        {(!videoCanPlay || videoError) && config.video?.poster && (
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100"
            style={{
              backgroundImage: `url(${config.video.poster})`,
              backgroundPosition: config.position || 'center center',
              backgroundSize: config.size || 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {/* Loading state */}
        {!videoCanPlay && !videoError && !config.video?.poster && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse">
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
                <div className="text-sm">Loading video...</div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {videoError && !currentImageUrl && (
          <div className="absolute inset-0 bg-gray-100">
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-sm">Failed to load background video</div>
              </div>
            </div>
          </div>
        )}

        {/* Video error with image fallback */}
        {videoError && currentImageUrl && imageLoaded && (
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100"
            style={{
              backgroundImage: `url(${currentImageUrl})`,
              backgroundPosition: config.position || 'center center',
              backgroundSize: config.size || 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </div>
    );
  }

  // Placeholder for other background types (slides)
  return (
    <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
      <div className="flex items-center justify-center h-full text-gray-500">
        Background type &quot;{config.type}&quot; - Coming soon
      </div>
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';