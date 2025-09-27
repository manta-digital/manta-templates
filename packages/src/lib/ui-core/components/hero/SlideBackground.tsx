'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDrag } from '@use-gesture/react';
import { cn } from '../../utils/cn';
import { useMotionPreferences } from './BackgroundFormatUtils';
import { SlideTransitionEngine } from './SlideTransitionEngine';
import { SlideLoadingState } from './BackgroundLoadingStates';

interface SlideItem {
  image: string;
  imageDark?: string;
  title?: string;
  subtitle?: string;
  duration?: number;
}

interface SlideBackgroundConfig {
  items: SlideItem[];
  transition: {
    type: 'fade' | 'slide' | 'zoom' | 'dissolve';
    duration: number;
    easing?: string;
  };
  navigation: {
    showDots?: boolean;
    showArrows?: boolean;
    autoPlay?: boolean;
    pauseOnHover?: boolean;
    loop?: boolean;
  };
  accessibility?: {
    slideAnnouncements?: boolean;
    keyboardNavigation?: boolean;
  };
}

interface SlideBackgroundProps {
  config: SlideBackgroundConfig;
  position?: string;
  size?: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function SlideBackground({ config, position, size, className, onLoad, onError }: SlideBackgroundProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState<number | null>(null);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(false);
  const [slideImagesLoaded, setSlideImagesLoaded] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const slideAutoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { prefersReducedMotion } = useMotionPreferences();

  // Constants for slide management
  const SLIDE_AUTO_PLAY_RESUME_DELAY = 5000;

  // Slide management data
  const slideItems = useMemo(() => config.items || [], [config.items]);
  const slideConfig = useMemo(() => ({
    transition: config.transition,
    navigation: config.navigation,
    accessibility: config.accessibility
  }), [config.transition, config.navigation, config.accessibility]);

  const totalSlides = slideItems.length;
  const maxSlideIndex = Math.max(0, totalSlides - 1);

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

    const shouldLoop = slideConfig?.navigation.loop ?? true;
    if (currentSlideIndex >= maxSlideIndex) {
      // At last slide
      if (shouldLoop) {
        goToSlide(0); // Go to first slide
      }
      // Don't go anywhere if not looping
    } else {
      goToSlide(currentSlideIndex + 1);
    }
  }, [totalSlides, currentSlideIndex, maxSlideIndex, isTransitioning, goToSlide, slideConfig?.navigation.loop]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0 || isTransitioning) return;

    const shouldLoop = slideConfig?.navigation.loop ?? true;
    if (currentSlideIndex <= 0) {
      // At first slide
      if (shouldLoop) {
        goToSlide(maxSlideIndex); // Go to last slide
      }
      // Don't go anywhere if not looping
    } else {
      goToSlide(currentSlideIndex - 1);
    }
  }, [totalSlides, currentSlideIndex, maxSlideIndex, isTransitioning, goToSlide, slideConfig?.navigation.loop]);

  // Slide auto-play functionality using transition system
  useEffect(() => {
    if (!isSlideAutoPlaying || totalSlides <= 1 || isTransitioning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, slideItems[currentSlideIndex]?.duration || 5000);

    return () => clearInterval(interval);
  }, [isSlideAutoPlaying, totalSlides, currentSlideIndex, slideItems, nextSlide, isTransitioning]);

  // Initialize slide auto-play when slides are configured
  useEffect(() => {
    if (slideConfig?.navigation.autoPlay && totalSlides > 1) {
      setIsSlideAutoPlaying(true);
    }
  }, [slideConfig?.navigation.autoPlay, totalSlides]);

  // Keyboard navigation support
  useEffect(() => {
    if (totalSlides <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keys when slide controls are enabled
      if (!slideConfig?.accessibility?.keyboardNavigation) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'Enter':
        case ' ': // Space bar
          event.preventDefault();
          // Pause/resume autoplay
          setIsSlideAutoPlaying(prev => !prev);
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(maxSlideIndex);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, slideConfig?.accessibility?.keyboardNavigation, prevSlide, nextSlide, goToSlide, maxSlideIndex]);

  // Touch/swipe gesture support
  const bind = useDrag(
    ({ swipe: [swipeX], down, canceled }) => {
      // Only process swipes when there are multiple slides and not currently transitioning
      if (totalSlides <= 1 || isTransitioning || canceled) return;

      // Handle horizontal swipes for slide navigation
      if (swipeX !== 0) {
        if (swipeX > 0) {
          // Swiped right - go to previous slide
          prevSlide();
        } else if (swipeX < 0) {
          // Swiped left - go to next slide
          nextSlide();
        }
      }
    },
    {
      // Configure swipe detection
      swipe: {
        distance: 50, // Minimum distance in pixels to trigger a swipe
        velocity: 0.3, // Minimum velocity in pixels/ms
        duration: 1000 // Maximum duration for swipe detection
      },
      // Prevent accidental scrolling during horizontal swipes
      preventScroll: false, // Allow vertical scrolling
      preventScrollAxis: 'x', // But prevent horizontal scrolling during gesture
      // Touch event configuration
      pointer: {
        touch: true, // Enable touch events on touch devices
      },
      // Filter out taps to prevent accidental slide changes
      filterTaps: true,
      tapsThreshold: 10 // Pixel threshold for tap detection
    }
  );

  // Slide image preloader
  useEffect(() => {
    if (totalSlides === 0) return;

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
  }, [totalSlides, currentSlideIndex, maxSlideIndex, slideItems]);

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
    <div
      {...bind()}
      className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}
      style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but capture horizontal gestures
    >
      {/* Transition Container */}
      <SlideTransitionEngine
        currentSlide={currentSlide}
        previousSlide={previousSlide}
        currentSlideLoaded={currentSlideLoaded}
        previousSlideLoaded={previousSlideLoaded}
        transitionType={transitionType}
        transitionDuration={transitionDuration}
        transitionEasing={transitionEasing}
        transitionDirection={transitionDirection}
        isTransitioning={isTransitioning}
        backgroundPosition={position || 'center center'}
        backgroundSize={size || 'cover'}
      />

      {/* Loading state for current slide */}
      {currentSlide && !currentSlideLoaded && (
        <SlideLoadingState className="z-30" />
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
      {slideConfig?.navigation.showArrows && totalSlides > 1 && (() => {
        const shouldLoop = slideConfig?.navigation.loop ?? true;
        const isFirstSlide = currentSlideIndex <= 0;
        const isLastSlide = currentSlideIndex >= maxSlideIndex;
        const isPrevDisabled = !shouldLoop && isFirstSlide;
        const isNextDisabled = !shouldLoop && isLastSlide;

        return (
          <>
            <button
              onClick={prevSlide}
              disabled={isPrevDisabled}
              className={cn(
                "absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 z-20",
                isPrevDisabled
                  ? "bg-white/10 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30 cursor-pointer"
              )}
              aria-label="Previous slide"
            >
              <span className={cn("text-lg", isPrevDisabled ? "text-white/40" : "text-white")}>‹</span>
            </button>
            <button
              onClick={nextSlide}
              disabled={isNextDisabled}
              className={cn(
                "absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 z-20",
                isNextDisabled
                  ? "bg-white/10 cursor-not-allowed"
                  : "bg-white/20 hover:bg-white/30 cursor-pointer"
              )}
              aria-label="Next slide"
            >
              <span className={cn("text-lg", isNextDisabled ? "text-white/40" : "text-white")}>›</span>
            </button>
          </>
        );
      })()}
    </div>
  );
}

SlideBackground.displayName = 'SlideBackground';