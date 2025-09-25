'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';
import { buildGradientClasses } from '../../utils/gradientUtils';

// Slide Transition Component
interface SlideTransitionContainerProps {
  currentSlide: any;
  previousSlide: any;
  currentSlideLoaded: boolean;
  previousSlideLoaded: boolean;
  transitionType: 'fade' | 'slide' | 'zoom' | 'dissolve';
  transitionDuration: number;
  transitionEasing: string;
  transitionDirection: 'forward' | 'backward';
  isTransitioning: boolean;
  backgroundPosition: string;
  backgroundSize: string;
}

function SlideTransitionContainer({
  currentSlide,
  previousSlide,
  currentSlideLoaded,
  previousSlideLoaded,
  transitionType,
  transitionDuration,
  transitionEasing,
  transitionDirection,
  isTransitioning,
  backgroundPosition,
  backgroundSize,
}: SlideTransitionContainerProps) {

  const baseSlideStyle = {
    backgroundPosition,
    backgroundSize,
    backgroundRepeat: 'no-repeat' as const,
  };

  const transitionStyle = {
    transition: `all ${transitionDuration}ms ${transitionEasing}`,
  };

  // Render transition based on type
  switch (transitionType) {
    case 'slide':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide (slides out during transition) */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                transform: transitionDirection === 'forward'
                  ? 'translateX(-100%)'
                  : 'translateX(100%)',
                opacity: previousSlideLoaded ? 1 : 0,
                zIndex: 1,
              }}
            />
          )}
          {/* Current slide (always visible, slides in during transition) */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                transform: 'translateX(0%)', // Always at center
                opacity: currentSlideLoaded ? 1 : 0,
                zIndex: isTransitioning ? 2 : 1,
              }}
            />
          )}
        </div>
      );

    case 'zoom':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                transform: 'scale(0.9)',
                opacity: previousSlideLoaded ? 0 : 0,
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                transform: isTransitioning ? 'scale(1)' : 'scale(1.1)',
                opacity: currentSlideLoaded ? 1 : 0,
              }}
            />
          )}
        </div>
      );

    case 'dissolve':
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                opacity: previousSlideLoaded ? 0.3 : 0,
                filter: 'blur(2px) brightness(0.8)',
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                opacity: currentSlideLoaded ? 1 : 0,
                filter: isTransitioning ? 'blur(0px) brightness(1)' : 'blur(1px) brightness(0.9)',
              }}
            />
          )}
        </div>
      );

    case 'fade':
    default:
      return (
        <div className="absolute inset-0 w-full h-full">
          {/* Previous slide */}
          {previousSlide && isTransitioning && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${previousSlide.image})`,
                opacity: previousSlideLoaded ? 0 : 0,
              }}
            />
          )}
          {/* Current slide */}
          {currentSlide && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                ...baseSlideStyle,
                ...transitionStyle,
                backgroundImage: `url(${currentSlide.image})`,
                opacity: currentSlideLoaded ? 1 : 0,
              }}
            />
          )}
        </div>
      );
  }
}

export function HeroBackground({ config, className, onLoad, onError, components }: HeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Video-specific state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slide-specific state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState<number | null>(null);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(false);
  const [slideImagesLoaded, setSlideImagesLoaded] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const slideAutoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Constants for slide management
  const SLIDE_AUTO_PLAY_RESUME_DELAY = 5000;

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

  // Slide management data (avoid using config.slides directly in effects to prevent re-render issues)
  const slideItems = useMemo(() => {
    return config.type === 'slides' && config.slides ? config.slides.items : [];
  }, [config.type, config.slides]);

  const slideConfig = useMemo(() => {
    if (config.type !== 'slides' || !config.slides) return null;
    return {
      transition: config.slides.transition,
      navigation: config.slides.navigation,
      accessibility: config.slides.accessibility
    };
  }, [config.type, config.slides]);

  const totalSlides = slideItems.length;
  const maxSlideIndex = Math.max(0, totalSlides - 1);

  // Motion preferences detection
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

    const videoUrl = config.video.src;

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

    // Also set as attributes for better browser compatibility
    video.setAttribute('autoplay', config.video.autoPlay ?? true ? 'autoplay' : '');
    video.setAttribute('loop', config.video.loop ?? true ? 'loop' : '');
    video.setAttribute('muted', config.video.muted ?? true ? 'muted' : '');
    video.setAttribute('playsinline', 'playsinline');

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

  // Slide navigation functions with transition support
  const goToSlide = useCallback((index: number) => {
    if (totalSlides === 0 || isTransitioning) return;

    const newIndex = Math.max(0, Math.min(index, maxSlideIndex));
    if (newIndex === currentSlideIndex) return;

    // Pause auto-play when manually navigating
    if (slideConfig?.navigation.autoPlay) {
      setIsSlideAutoPlaying(false);
      if (slideAutoPlayTimeoutRef.current) {
        clearTimeout(slideAutoPlayTimeoutRef.current);
      }
      // Resume auto-play after delay
      slideAutoPlayTimeoutRef.current = setTimeout(
        () => setIsSlideAutoPlaying(true),
        SLIDE_AUTO_PLAY_RESUME_DELAY
      );
    }

    // Start transition
    setIsTransitioning(true);
    setPreviousSlideIndex(currentSlideIndex);
    setTransitionDirection(newIndex > currentSlideIndex ? 'forward' : 'backward');
    setCurrentSlideIndex(newIndex);

    // End transition after duration
    const transitionDuration = slideConfig?.transition.duration || 800;
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousSlideIndex(null);
    }, transitionDuration);
  }, [totalSlides, slideConfig?.navigation.autoPlay, slideConfig?.transition.duration, maxSlideIndex, currentSlideIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    if (totalSlides === 0 || isTransitioning) return;
    const nextIndex = currentSlideIndex >= maxSlideIndex ? 0 : currentSlideIndex + 1;
    goToSlide(nextIndex);
  }, [totalSlides, currentSlideIndex, maxSlideIndex, isTransitioning, goToSlide]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0 || isTransitioning) return;
    const prevIndex = currentSlideIndex <= 0 ? maxSlideIndex : currentSlideIndex - 1;
    goToSlide(prevIndex);
  }, [totalSlides, currentSlideIndex, maxSlideIndex, isTransitioning, goToSlide]);

  // Slide auto-play functionality using transition system
  useEffect(() => {
    if (config.type !== 'slides' || !isSlideAutoPlaying || totalSlides <= 1 || isTransitioning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, slideItems[currentSlideIndex]?.duration || 5000);

    return () => clearInterval(interval);
  }, [config.type, isSlideAutoPlaying, totalSlides, currentSlideIndex, slideItems, nextSlide, isTransitioning]);

  // Initialize slide auto-play when slides are configured
  useEffect(() => {
    if (config.type === 'slides' && slideConfig?.navigation.autoPlay && totalSlides > 1) {
      setIsSlideAutoPlaying(true);
    }
  }, [config.type, slideConfig?.navigation.autoPlay, totalSlides]);

  // Slide image preloader
  useEffect(() => {
    if (config.type !== 'slides' || totalSlides === 0) return;

    const loadedStates = new Array(totalSlides).fill(false);
    setSlideImagesLoaded(loadedStates);

    // Preload current slide and adjacent slides
    const preloadIndexes = [
      currentSlideIndex,
      currentSlideIndex === maxSlideIndex ? 0 : currentSlideIndex + 1,
      currentSlideIndex === 0 ? maxSlideIndex : currentSlideIndex - 1
    ];

    preloadIndexes.forEach((index) => {
      const slide = slideItems[index];
      if (slide) {
        const img = new Image();
        img.onload = () => {
          setSlideImagesLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
        img.onerror = () => {
          // Mark as "loaded" even on error so slide doesn't get stuck
          console.warn(`Failed to load slide image: ${slide.image}`);
          setSlideImagesLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true; // Mark as loaded to prevent infinite loading
            return newState;
          });
        };
        img.src = slide.image;
      }
    });
  }, [config.type, totalSlides, currentSlideIndex, maxSlideIndex, slideItems]);

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
          autoPlay={config.video?.autoPlay ?? true}
          loop={config.video?.loop ?? true}
          muted={config.video?.muted ?? true}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          preload="metadata"
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

  // Handle slide backgrounds
  if (config.type === 'slides') {
    if (totalSlides === 0) {
      return (
        <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
          <div className="flex items-center justify-center h-full text-gray-500">
            No slides configured
          </div>
        </div>
      );
    }

    const currentSlide = slideItems[currentSlideIndex];
    const previousSlide = previousSlideIndex !== null ? slideItems[previousSlideIndex] : null;
    const currentSlideLoaded = slideImagesLoaded[currentSlideIndex];
    const previousSlideLoaded = previousSlideIndex !== null ? slideImagesLoaded[previousSlideIndex] : false;

    // Determine transition type (with reduced motion fallback)
    const transitionType = prefersReducedMotion ? 'fade' : (slideConfig?.transition.type || 'fade');
    const transitionDuration = slideConfig?.transition.duration || 800;
    const transitionEasing = slideConfig?.transition.easing || 'ease-in-out';

    return (
      <div className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}>
        {/* Transition Container */}
        <SlideTransitionContainer
          currentSlide={currentSlide}
          previousSlide={previousSlide}
          currentSlideLoaded={currentSlideLoaded}
          previousSlideLoaded={previousSlideLoaded}
          transitionType={transitionType}
          transitionDuration={transitionDuration}
          transitionEasing={transitionEasing}
          transitionDirection={transitionDirection}
          isTransitioning={isTransitioning}
          backgroundPosition={config.position || 'center center'}
          backgroundSize={config.size || 'cover'}
        />

        {/* Loading state for current slide */}
        {currentSlide && !currentSlideLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse z-30">
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
                <div className="text-sm">Loading slide...</div>
              </div>
            </div>
          </div>
        )}

        {/* Simple navigation dots */}
        {slideConfig?.navigation.showDots && totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {slideItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  index === currentSlideIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/70'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Simple navigation arrows */}
        {slideConfig?.navigation.showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 z-20"
              aria-label="Previous slide"
            >
              <span className="text-white text-lg">‹</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 z-20"
              aria-label="Next slide"
            >
              <span className="text-white text-lg">›</span>
            </button>
          </>
        )}
      </div>
    );
  }

  // Placeholder for other background types
  return (
    <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
      <div className="flex items-center justify-center h-full text-gray-500">
        Background type &quot;{config.type}&quot; not supported
      </div>
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';