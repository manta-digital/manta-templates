'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Button } from '@/components/ui/button';

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
  /** Enable touch/swipe gestures */
  enableSwipe?: boolean;
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
  enableSwipe = true,
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(visibleCards.desktop);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay > 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const breakpoint = useBreakpoint();

  const totalCards = children.length;
  const maxIndex = infinite ? totalCards : Math.max(0, totalCards - visibleCount);

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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || autoPlay <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (infinite) {
          return (prev + 1) % totalCards;
        }
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlay);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlay, infinite, maxIndex, totalCards]);

  const goToSlide = (index: number) => {
    if (infinite) {
      setCurrentIndex(((index % totalCards) + totalCards) % totalCards);
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = startXRef.current - endX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDraggingRef.current = false;
    if (autoPlay > 0) {
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableSwipe) return;
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;
    
    const endX = e.clientX;
    const deltaX = startXRef.current - endX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDraggingRef.current = false;
    if (autoPlay > 0) {
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const cardWidth = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  
  // Calculate translateX - each card "owns" gap/visibleCount of gap space
  const translateX = `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * gap / visibleCount}px)`;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(${translateX})`,
            gap: `${gap}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            isDraggingRef.current = false;
          }}
        >
          {(infinite ? [...children, ...children] : children).map((child, index) => (
            <div
              key={infinite ? `${index}-${index >= children.length ? 'clone' : 'original'}` : index}
              className={cn('flex-shrink-0 select-none', itemClassName)}
              style={{ width: cardWidth }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={prevSlide}
            disabled={!infinite && currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={nextSlide}
            disabled={!infinite && currentIndex >= maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
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
                  ? 'bg-teal-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play pause/resume button */}
      {autoPlay > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </Button>
      )}
    </div>
  );
}
