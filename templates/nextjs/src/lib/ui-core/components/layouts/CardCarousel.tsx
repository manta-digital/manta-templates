'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Default breakpoints - can be overridden via props
const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Hook for breakpoint detection
function useBreakpoint(breakpoints: Record<string, number> = DEFAULT_BREAKPOINTS): string {
  const [breakpoint, setBreakpoint] = useState('default');

  useEffect(() => {
    const breakpointArray = Object.entries(breakpoints)
      .map(([name, min]) => ({ name, min }))
      .sort((a, b) => b.min - a.min);

    function getBreakpoint() {
      const width = window.innerWidth;
      for (const bp of breakpointArray) {
        if (width >= bp.min) return bp.name;
      }
      return 'default';
    }
    
    function handleResize() {
      setBreakpoint(getBreakpoint());
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return breakpoint;
}

// Hook for uniform height
function useUniformHeight<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  deps: unknown[] = []
): number | undefined {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    const items = Array.from(containerRef.current.children) as HTMLElement[];
    if (items.length === 0) return;

    const updateHeight = () => {
      const max = Math.max(...items.map(item => item.offsetHeight));
      setHeight(max);
    };

    updateHeight();
    const observers = items.map(item => {
      const obs = new ResizeObserver(updateHeight);
      obs.observe(item);
      return obs;
    });
    return () => observers.forEach(obs => obs.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);

  return height;
}

export interface CardCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  /** Number of cards visible at once */
  visibleCards?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  /** Gap between cards in pixels */
  gap?: number;
  /** Enable infinite loop */
  infinite?: boolean;
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlay?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show auto-play pause/play controls */
  showControls?: boolean;
  /** Enable touch/swipe gestures */
  enableSwipe?: boolean;
  /** Minimum height for carousel cards (e.g., '200px', '12rem') */
  minHeight?: string;
  /** Custom breakpoints for responsive behavior */
  breakpoints?: Record<string, number>;
  /** Injected button component for navigation */
  ButtonComponent?: React.ComponentType<any> | string;
  /** Injected chevron left icon */
  ChevronLeftIcon?: React.ComponentType<any>;
  /** Injected chevron right icon */
  ChevronRightIcon?: React.ComponentType<any>;
  /** Injected play icon */
  PlayIcon?: React.ComponentType<any>;
  /** Injected pause icon */
  PauseIcon?: React.ComponentType<any>;
  /** Motion component for animations - if not provided, uses div with CSS transitions */
  MotionComponent?: React.ComponentType<any>;
}

export function CardCarousel({
  children,
  className,
  itemClassName,
  visibleCards = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 16,
  infinite = false,
  autoPlay = 0,
  showArrows = true,
  showDots = true,
  showControls = false,
  enableSwipe = true,
  minHeight,
  breakpoints = DEFAULT_BREAKPOINTS,
  ButtonComponent = 'button',
  ChevronLeftIcon = ChevronLeft,
  ChevronRightIcon = ChevronRight,
  PlayIcon = () => <span>▶</span>,
  PauseIcon = () => <span>⏸</span>,
  MotionComponent,
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(visibleCards.desktop);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardHeight = useUniformHeight(containerRef, [children, visibleCount, infinite]);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragDirectionRef = useRef<'left' | 'right' | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const breakpoint = useBreakpoint(breakpoints);
  
  // Auto-play resume delay after manual interaction
  const AUTO_PLAY_RESUME_DELAY = 5000;

  const totalCards = children.length;
  const maxIndex = infinite ? totalCards : Math.max(0, totalCards - visibleCount);

  // Create carousel array with clones for infinite scrolling (padded-clone pattern)
  const carouselArray = useMemo(() => {
    if (!infinite) return children;
    // Calculate padding needed: enough clones to fill visible area during transitions
    const paddingCount = Math.max(visibleCount, totalCards - visibleCount + 1);
    // Add clones at beginning (from end of array) and at end (from beginning of array)
    const leftClones = children.slice(-paddingCount);
    const rightClones = children.slice(0, paddingCount);
    return [...leftClones, ...children, ...rightClones];
  }, [children, infinite, visibleCount, totalCards]);

  // Handle responsive visible cards using breakpoint hook
  useEffect(() => {
    if (breakpoint === 'default' || breakpoint === 'sm') {
      setVisibleCount(visibleCards.mobile);
    } else if (breakpoint === 'md') {
      setVisibleCount(visibleCards.tablet);
    } else {
      setVisibleCount(visibleCards.desktop);
    }
  }, [breakpoint, visibleCards]);

  // Slide navigation helpers (placed before effects to avoid use-before-define)
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    // Pause auto-play when manually navigating
    if (autoPlay > 0) {
      setIsAutoPlaying(false);
      // Clear any existing timeout
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      // Resume auto-play after AUTO_PLAY_RESUME_DELAY
      autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
    
    if (infinite) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }
  }, [infinite, maxIndex, autoPlay, isTransitioning]);

  const nextSlide = useCallback(() => {
    // Pause auto-play when manually navigating
    if (autoPlay > 0) {
      setIsAutoPlaying(false);
      // Clear any existing timeout
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      // Resume auto-play after AUTO_PLAY_RESUME_DELAY
      autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
    
    if (infinite) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  }, [infinite, maxIndex, autoPlay]);

  const prevSlide = useCallback(() => {
    // Pause auto-play when manually navigating
    if (autoPlay > 0) {
      setIsAutoPlaying(false);
      // Clear any existing timeout
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      // Resume auto-play after AUTO_PLAY_RESUME_DELAY
      autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
    
    if (infinite) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [infinite, autoPlay]);

  // Global event listeners to catch events that escape component boundaries (mainly for touch)
  useEffect(() => {
    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      const endX = e.changedTouches && e.changedTouches.length > 0 
        ? e.changedTouches[0].clientX 
        : startXRef.current;
      
      const deltaX = endX - startXRef.current;
      const threshold = 50;
      const velocity = Math.abs(deltaX) / 100;

      if (Math.abs(deltaX) > threshold || velocity > 0.5) {
        if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
          nextSlide();
        } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
          prevSlide();
        }
      }

      isDraggingRef.current = false;
      setDragOffset(0);
      if (autoPlay > 0) {
        setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
      }
    };

    // Only add touch listener globally, mouse events should be handled by component
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };

  }, [infinite, currentIndex, maxIndex, autoPlay, nextSlide, prevSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || autoPlay <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (infinite) {
          return prev + 1;
        }
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlay);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlay, infinite, totalCards, maxIndex]);

  // Handle seamless infinite carousel reset after transition
  useEffect(() => {
    if (!infinite) return;

    // Reset to equivalent position after transition completes
    const timer = setTimeout(() => {
      if (currentIndex >= totalCards) {
        // Reset back to start when we've scrolled past the original array
        setIsTransitioning(true);
        setCurrentIndex(currentIndex - totalCards);
        // Re-enable transitions after reset
        setTimeout(() => setIsTransitioning(false), 50);
      } else if (currentIndex < 0) {
        // Reset from negative position to equivalent positive position
        setIsTransitioning(true);
        setCurrentIndex(currentIndex + totalCards);
        // Re-enable transitions after reset
        setTimeout(() => setIsTransitioning(false), 50);
      }
    }, 300); // Slightly after transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, infinite, totalCards]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe || isTransitioning) return;
    const x = e.touches[0].clientX;
    startXRef.current = x;
    isDraggingRef.current = true;
    dragDirectionRef.current = null;
    setDragOffset(0);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current || isTransitioning) return;
    e.preventDefault();
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    
    // Update drag offset for smooth follow-the-finger movement
    setDragOffset(deltaX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;

    const endX = e.changedTouches && e.changedTouches.length > 0 
      ? e.changedTouches[0].clientX 
      : startXRef.current;
    
    const deltaX = endX - startXRef.current;
    const threshold = 50; // Require more movement to trigger slide change
    const velocity = Math.abs(deltaX) / 100; // Simple velocity calculation

    // Determine if we should change slides based on distance and velocity
    if (Math.abs(deltaX) > threshold || velocity > 0.5) {
      if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
        nextSlide();
      } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
        prevSlide();
      }
    }

    // Reset drag state and offset
    isDraggingRef.current = false;
    dragDirectionRef.current = null;
    setDragOffset(0);
    
    if (autoPlay > 0) {
      setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableSwipe || isTransitioning) return;
    const x = e.clientX;
    startXRef.current = x;
    isDraggingRef.current = true;
    dragDirectionRef.current = null;
    setDragOffset(0);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current || isTransitioning) return;
    e.preventDefault();
    
    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;
    
    // Update drag offset for smooth follow-the-mouse movement
    setDragOffset(deltaX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;

    const endX = e.clientX;
    const deltaX = endX - startXRef.current;
    const threshold = 50; // Require more movement to trigger slide change
    const velocity = Math.abs(deltaX) / 100; // Simple velocity calculation

    // Determine if we should change slides based on distance and velocity
    if (Math.abs(deltaX) > threshold || velocity > 0.5) {
      if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
        nextSlide();
      } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
        prevSlide();
      }
    }

    // Reset drag state and offset
    isDraggingRef.current = false;
    dragDirectionRef.current = null;
    setDragOffset(0);
    
    if (autoPlay > 0) {
      setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
  };

  const cardWidth = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  // Calculate translateX - account for offset in infinite carousel and drag offset
  const paddingCount = infinite ? Math.max(visibleCount, totalCards - visibleCount + 1) : 0;
  const actualIndex = infinite ? currentIndex + paddingCount : currentIndex;
  const baseTranslateX = `-${actualIndex * (100 / visibleCount)}% - ${actualIndex * gap / visibleCount}px`;
  const translateX = dragOffset !== 0 
    ? `calc(${baseTranslateX} + ${dragOffset}px)`
    : `calc(${baseTranslateX})`;
  
  // Use injected MotionComponent or framer-motion by default for consistent behavior
  const AnimationComponent = MotionComponent || motion.div;
  const animationProps = {
    animate: { x: translateX },
    transition: { duration: (isTransitioning || isDraggingRef.current) ? 0 : 0.3 }
  };

  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden h-full">
        <AnimationComponent
          {...animationProps}
          ref={containerRef}
          className="flex items-stretch cursor-grab active:cursor-grabbing h-full"
          style={{
            gap: `${gap}px`,
            ...(cardHeight !== undefined && { height: `${cardHeight}px` }),
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            // Reset drag state if mouse leaves while dragging
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              if (autoPlay > 0) {
                setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
              }
            }
          }}
        >
          {carouselArray.map((child, index) => {
              return (
                <div
                  key={infinite ? `${index}-${index >= children.length ? 'clone' : 'original'}` : index}
                  className={cn('flex-shrink-0 select-none flex flex-col', itemClassName)}
                  style={{
                    width: cardWidth,
                    ...(minHeight && { minHeight })
                  }}
                >
                  {child}
                </div>
              );
            })}
        </AnimationComponent>
      </div>
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <ButtonComponent
            type={typeof ButtonComponent === 'string' ? 'button' : undefined}
            style={{ 
              position: 'absolute', 
              left: '8px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              zIndex: 20,
              width: '40px',
              height: '40px',
              border: '1px solid var(--color-card-border)',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-a3)',
              color: 'var(--color-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
            onClick={prevSlide}
            disabled={!infinite && currentIndex === 0}
            aria-label="Previous slide"
          >
            {ChevronLeftIcon ? <ChevronLeftIcon className="h-4 w-4" /> : <span className="h-4 w-4">‹</span>}
          </ButtonComponent>
          <ButtonComponent
            type={typeof ButtonComponent === 'string' ? 'button' : undefined}
            style={{ 
              position: 'absolute', 
              right: '8px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              zIndex: 20,
              width: '40px',
              height: '40px',
              border: '1px solid var(--color-card-border)',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-a3)',
              color: 'var(--color-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
            onClick={nextSlide}
            disabled={!infinite && currentIndex >= maxIndex}
            aria-label="Next slide"
          >
            {ChevronRightIcon ? <ChevronRightIcon className="h-4 w-4" /> : <span className="h-4 w-4">›</span>}
          </ButtonComponent>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: infinite ? totalCards : maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors duration-200',
                index === currentIndex % (infinite ? totalCards : maxIndex + 1)
                 ? 'bg-[var(--color-accent-9)]'
                 : 'bg-[var(--color-accent-4)] hover:bg-[var(--color-accent-5)]'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play pause/resume button */}
      {autoPlay > 0 && showControls && (
        <ButtonComponent
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm !bg-[color-mix(in_oklab,var(--color-accent-3),transparent_90%)] hover:!bg-[color-mix(in_oklab,var(--color-accent-a9),transparent_30%)] !border-[var(--color-border-accent)] !text-[var(--color-accent-11)] dark:!bg-[var(--color-accent-a3)] dark:hover:!bg-[var(--color-accent-4)]"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          <span className="h-3 w-3">{isAutoPlaying ? <PauseIcon /> : <PlayIcon />}</span>
        </ButtonComponent>
      )}
    </div>
  );
}