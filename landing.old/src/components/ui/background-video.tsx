"use client";

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundVideoProps } from '@/types/video';

/**
 * BackgroundVideo component - simplified version focused on autoplay
 */
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, poster, className, children, autoplay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  // Handle errors
  const handleError = () => setHasError(true);

  // Play video on mouse enter (only if autoplay is false)
  const handleMouseEnter = () => {
    if (!autoplay && videoRef.current) {
      videoRef.current.play();
    }
  };

  // Pause video on mouse leave (only if autoplay is false)
  const handleMouseLeave = () => {
    if (!autoplay && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Force play when video data is loaded
  const handleLoadedData = () => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('Autoplay failed on data load:', error);
      });
    }
  };

  // Try to play the video when the component mounts
  useEffect(() => {
    // Only run this effect if autoplay is enabled
    if (!autoplay || hasError) return;

    // Get reference to the video element
    const video = videoRef.current;
    if (!video) return;

    // Make sure the video is muted (required for autoplay)
    video.muted = true;
    
    // Try to play the video after a short delay
    const timer = setTimeout(() => {
      video.play().catch(error => {
        console.warn('Autoplay failed after timeout:', error);
      });
    }, 300);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [autoplay, hasError]);

  return (
    <div
      className={cn(
        'relative overflow-hidden aspect-video',
        className
      )}
      onMouseEnter={autoplay ? undefined : handleMouseEnter}
      onMouseLeave={autoplay ? undefined : handleMouseLeave}
    >
      { !hasError && (
        <video
          autoPlay={autoplay}
          ref={videoRef}
          src={src}
          poster={poster}
          onError={handleError}
          onLoadedData={handleLoadedData}
          loop
          muted={true}
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      )}
      { hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Video failed to load.</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default BackgroundVideo;
