'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  /** Button component injection for styling consistency */
  ButtonComponent?: React.ComponentType<any> | 'button';
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
  ButtonComponent = 'button',
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(visibleCards.desktop);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragDirectionRef = useRef<'left' | 'right' | null>(null);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Auto-play resume delay after manual interaction
  const AUTO_PLAY_RESUME_DELAY = 5000;
    
  const totalCards = children.length;
  const maxIndex = infinite ? totalCards : Math.max(0, totalCards - visibleCount);

  // Simple responsive handling without external breakpoint hook
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(visibleCards.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(visibleCards.tablet);
      } else {
        setVisibleCount(visibleCards.desktop);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCards]);

  // Slide navigation helpers
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
        // Reset from firstSlide duplicate to actual first slide
        setIsTransitioning(true);
        setCurrentIndex(0);
        // Re-enable transitions after reset
        setTimeout(() => setIsTransitioning(false), 50);
      } else if (currentIndex === -1) {
        // Reset from lastSlide position to actual last slide immediately
        setIsTransitioning(true);
        setCurrentIndex(totalCards - 1);
        // Re-enable transitions after reset
        setTimeout(() => setIsTransitioning(false), 50);
      } else if (currentIndex < -1) {
        // Reset to equivalent position in the main array
        setIsTransitioning(true);
        const equivalentIndex = ((currentIndex + 1) % totalCards + totalCards) % totalCards;
        setCurrentIndex(equivalentIndex);
        // Re-enable transitions after reset
        setTimeout(() => setIsTransitioning(false), 50);
      }
    }, 350); // Slightly after transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, infinite, totalCards]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe || isTransitioning) return;
    const x = e.touches[0].clientX;
    startXRef.current = x;
    isDraggingRef.current = true;
    dragDirectionRef.current = null;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current || isTransitioning) return;
    e.preventDefault();
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    const threshold = 15; // Lower threshold for quicker response
    
    // Determine direction and trigger smooth transition immediately
    if (Math.abs(deltaX) > threshold && !dragDirectionRef.current) {
      if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
        dragDirectionRef.current = 'left';
        setIsTransitioning(true);
        nextSlide();
        setTimeout(() => setIsTransitioning(false), 300);
      } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
        dragDirectionRef.current = 'right';
        setIsTransitioning(true);
        prevSlide();
        setTimeout(() => setIsTransitioning(false), 300);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;

    // If no direction was triggered during move, check final position
    if (!dragDirectionRef.current) {
      const endX = e.changedTouches && e.changedTouches.length > 0 
        ? e.changedTouches[0].clientX 
        : startXRef.current;
      
      const deltaX = endX - startXRef.current;
      const threshold = 20;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
          setIsTransitioning(true);
          nextSlide();
          setTimeout(() => setIsTransitioning(false), 300);
        } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
          setIsTransitioning(true);
          prevSlide();
          setTimeout(() => setIsTransitioning(false), 300);
        }
      }
    }

    // Always reset drag state
    isDraggingRef.current = false;
    dragDirectionRef.current = null;
    if (autoPlay > 0) {
      setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
    }
  };

  const cardWidth = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  // Calculate translateX - account for offset in infinite carousel
  const actualIndex = infinite ? currentIndex + 1 : currentIndex;
  const translateX = `calc(-${actualIndex * (100 / visibleCount)}% - ${actualIndex * gap / visibleCount}px)`;
  
  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden h-full">
        <div
          ref={containerRef}
          className="flex items-stretch cursor-grab active:cursor-grabbing h-full transition-transform duration-300"
          style={{
            gap: `${gap}px`,
            transform: translateX,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {(infinite ? [...children.slice(-1), ...children, ...children.slice(0, 1)] : children).map((child, index) => {
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
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          {React.createElement(ButtonComponent, {
            className: "absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-white/90 shadow-md border border-gray-200",
            onClick: prevSlide,
            disabled: !infinite && currentIndex === 0
          }, React.createElement(ChevronLeft, { className: "h-4 w-4" }))}
          {React.createElement(ButtonComponent, {
            className: "absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-white/90 shadow-md border border-gray-200",
            onClick: nextSlide,
            disabled: !infinite && currentIndex >= maxIndex
          }, React.createElement(ChevronRight, { className: "h-4 w-4" }))}
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
                 ? 'bg-blue-600'
                 : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play pause/resume button */}
      {autoPlay > 0 && showControls && 
        React.createElement(ButtonComponent, {
          className: "absolute top-2 right-2 z-10 bg-white/80 hover:bg-white/90 shadow-md border border-gray-200 px-3 py-1 text-sm rounded",
          onClick: () => setIsAutoPlaying(!isAutoPlaying)
        }, isAutoPlaying ? 'Pause' : 'Play')
      }
    </div>
  );
}