"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '../../ui-core';

interface BackgroundVideoComponentProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * BackgroundVideoComponent - Next.js optimized video component for autoplay functionality
 * 
 * Handles browser autoplay policies, SSR compatibility, and provides
 * proper cleanup for video elements. Designed for dependency injection
 * into framework-agnostic VideoCard components.
 */
const BackgroundVideoComponent: React.FC<BackgroundVideoComponentProps> = ({ 
  src, 
  poster, 
  autoplay = true, 
  className, 
  children 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Required for autoplay in most browsers
    video.muted = true;
    
    // Delay play to ensure DOM is ready and improve autoplay success
    const timer = setTimeout(() => {
      video.play().catch(error => {
        console.warn('Autoplay failed:', error);
      });
    }, 300);
    
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [autoplay]);
  
  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop
      muted
      playsInline
      controls={false}
      className={cn("absolute inset-0 w-full h-full object-cover", className)}
      onLoadedData={() => {
        if (autoplay && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.warn('Autoplay failed on data load:', error);
          });
        }
      }}
    >
      {children}
    </video>
  );
};

export { BackgroundVideoComponent };