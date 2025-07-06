'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Button } from '@/components/ui/button';
import { useUniformHeight } from '@/hooks/useUniformHeight';
import { motion } from 'framer-motion';

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
  /** Minimum height for carousel cards (e.g., '200px', '12rem') */
  minHeight?: string;
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
  minHeight,
}: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(visibleCards.desktop);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay > 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardHeight = useUniformHeight(containerRef, [children, visibleCount, infinite]);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragDirectionRef = useRef<'left' | 'right' | null>(null);
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

  // Slide navigation helpers (placed before effects to avoid use-before-define)
  const goToSlide = useCallback((index: number) => {
    if (infinite) {
      setCurrentIndex(((index % totalCards) + totalCards) % totalCards);
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }
  }, [infinite, totalCards, maxIndex]);

  const nextSlide = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  }, [infinite, totalCards, maxIndex]);

  const prevSlide = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [infinite, totalCards]);

  // Global event listeners to catch events that escape component boundaries (mainly for touch)
  useEffect(() => {
    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      const endX = e.changedTouches && e.changedTouches.length > 0 
        ? e.changedTouches[0].clientX 
        : startXRef.current;
      
      const deltaX = endX - startXRef.current;
      const threshold = 20;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && (infinite || currentIndex < maxIndex)) {
          nextSlide();
        } else if (deltaX > 0 && (infinite || currentIndex > 0)) {
          prevSlide();
        }
      }

      isDraggingRef.current = false;
      if (autoPlay > 0) {
        setTimeout(() => setIsAutoPlaying(true), 3000);
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
          return (prev + 1) % totalCards;
        }
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlay);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlay, infinite, totalCards, maxIndex]);

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
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableSwipe || isTransitioning) return;
    const x = e.clientX;
    startXRef.current = x;
    isDraggingRef.current = true;
    dragDirectionRef.current = null;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current || isTransitioning) return;
    e.preventDefault();
    
    const currentX = e.clientX;
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

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDraggingRef.current) return;

    // If no direction was triggered during move, check final position
    if (!dragDirectionRef.current) {
      const endX = e.clientX;
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
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const cardWidth = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  // Calculate translateX - each card "owns" a portion of the gap
  const translateX = `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * gap / visibleCount}px)`;
  

  return (
    <div className={cn('relative w-full', className)}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          
          animate={{ x: translateX }}
          transition={{ duration: 0.3 }}
          ref={containerRef}
          className="flex items-stretch cursor-grab active:cursor-grabbing"
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
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }
            }
          }}
        >
          {(infinite ? [...children, ...children] : children).map((child, index) => {
              // Ensure the card element itself fills the container height
              const content = React.isValidElement(child)
                ? React.cloneElement(
                    child as React.ReactElement<React.ComponentProps<'div'>>,
                    {
                      className: cn(
                        (child as React.ReactElement<React.ComponentProps<'div'>>).props.className,
                        'h-full'
                      ),
                    }
                  )
                : child;
              return (
                <div
                  key={infinite ? `${index}-${index >= children.length ? 'clone' : 'original'}` : index}
                  className={cn('flex-shrink-0 select-none flex flex-col h-full', itemClassName)}
                  style={{
                    width: cardWidth,
                    ...(minHeight && { minHeight })
                  }}
                >
                  {content}
                </div>
              );
            })}

        </motion.div>
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
