'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { useVideoFormatSupport, useMobileDetection } from './BackgroundFormatUtils';
import { optimizeVideoUrl } from './BackgroundFormatUtils';
import { VideoLoadingState, VideoErrorState } from './BackgroundLoadingStates';

interface VideoBackgroundConfig {
  src: string;
  poster?: string;
  fallbackImage?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

interface VideoBackgroundProps {
  config: VideoBackgroundConfig;
  position?: string;
  size?: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function VideoBackground({ config, position, size, className, onLoad, onError }: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { supportedVideoFormat } = useVideoFormatSupport();
  const { isMobile } = useMobileDetection();

  // Optimized video URL based on format support and device
  const optimizedVideoUrl = useMemo(() => {
    if (!config.src) return null;

    return optimizeVideoUrl(config.src, supportedVideoFormat, isMobile, config.fallbackImage);
  }, [config.src, supportedVideoFormat, isMobile, config.fallbackImage]);

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
    if (config.fallbackImage) {
      // Set up image fallback
      const img = new Image();
      img.onload = () => {
        setCurrentImageUrl(config.fallbackImage!);
        setImageLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        onError?.(new Error(`Failed to load video and fallback image: ${config.src}`));
      };
      img.src = config.fallbackImage;
    } else {
      onError?.(new Error(`Failed to load hero background video: ${config.src}`));
    }
  }, [config.fallbackImage, config.src, onError, onLoad]);

  // Effect to handle video loading and play/pause on visibility
  useEffect(() => {
    if (!config.src) return;

    const video = videoRef.current;
    if (!video) return;

    // Reset video state
    setVideoLoaded(false);
    setVideoError(false);
    setVideoCanPlay(false);

    // On mobile, fallback to image if available
    if (isMobile && config.fallbackImage) {
      setCurrentImageUrl(config.fallbackImage);
      setImageLoaded(true);
      onLoad?.();
      return;
    }

    // Set up video properties
    video.autoplay = config.autoPlay ?? true;
    video.loop = config.loop ?? true;
    video.muted = config.muted ?? true;
    video.playsInline = true; // Important for iOS
    video.preload = 'metadata';

    // Also set as attributes for better browser compatibility
    video.setAttribute('autoplay', config.autoPlay ?? true ? 'autoplay' : '');
    video.setAttribute('loop', config.loop ?? true ? 'loop' : '');
    video.setAttribute('muted', config.muted ?? true ? 'muted' : '');
    video.setAttribute('playsinline', 'playsinline');

    if (config.poster) {
      video.poster = config.poster;
    }

    // Set video source
    if (optimizedVideoUrl) {
      video.src = optimizedVideoUrl;
    } else {
      video.src = config.src;
    }

    // Add event listeners
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('error', handleVideoError);

    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setVideoPaused(false);
      }).catch((error) => {
        // Don't treat autoplay prevention as an error, just set paused state
        if (error.name === 'NotAllowedError') {
          setVideoPaused(true);
        } else {
          handleVideoError();
        }
      });
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('error', handleVideoError);
    };
  }, [config, optimizedVideoUrl, isMobile, handleVideoLoad, handleVideoCanPlay, handleVideoError, onLoad]);

  // Effect to handle intersection observer for video play/pause optimization
  useEffect(() => {
    if (!videoRef.current) return;

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
  }, []);

  // Manual video play handler
  const handleManualPlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setVideoPaused(false);
        }).catch(() => {
          // Manual play failed, keep paused state
        });
      }
    }
  }, []);

  // On mobile with fallback image, render as image
  if (isMobile && config.fallbackImage && currentImageUrl && imageLoaded) {
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-500',
          'opacity-100',
          className
        )}
        style={{
          backgroundImage: `url(${currentImageUrl})`,
          backgroundPosition: position || 'center center',
          backgroundSize: size || 'cover',
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
          objectPosition: position || 'center center',
        }}
        autoPlay={config.autoPlay ?? true}
        loop={config.loop ?? true}
        muted={config.muted ?? true}
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>

      {/* Video poster/loading state */}
      {(!videoCanPlay || videoError) && config.poster && (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100"
          style={{
            backgroundImage: `url(${config.poster})`,
            backgroundPosition: position || 'center center',
            backgroundSize: size || 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Loading state */}
      {!videoCanPlay && !videoError && !config.poster && (
        <VideoLoadingState />
      )}

      {/* Error state */}
      {videoError && !currentImageUrl && (
        <VideoErrorState />
      )}

      {/* Video error with image fallback */}
      {videoError && currentImageUrl && imageLoaded && (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100"
          style={{
            backgroundImage: `url(${currentImageUrl})`,
            backgroundPosition: position || 'center center',
            backgroundSize: size || 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Manual play button when autoplay is blocked */}
      {videoPaused && videoCanPlay && !videoError && (
        <button
          onClick={handleManualPlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 cursor-pointer group"
          aria-label="Play video"
        >
          <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-opacity-100 transition-colors duration-200">
            <svg className="w-6 h-6 ml-1 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

VideoBackground.displayName = 'VideoBackground';