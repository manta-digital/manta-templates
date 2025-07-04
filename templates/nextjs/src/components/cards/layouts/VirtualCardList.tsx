'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface VirtualCardListProps<T = unknown> {
  /** Array of data items to render */
  items: T[];
  /** Height of each item in pixels */
  itemHeight: number;
  /** Height of the container in pixels */
  containerHeight: number;
  /** Number of items to render outside visible area (for smooth scrolling) */
  overscan?: number;
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Optional className for the container */
  className?: string;
  /** Optional className for each item wrapper */
  itemClassName?: string;
  /** Gap between items in pixels */
  gap?: number;
  /** Loading state */
  loading?: boolean;
  /** Loading component */
  loadingComponent?: React.ReactNode;
  /** Empty state component */
  emptyComponent?: React.ReactNode;
  /** Callback when scrolling near the end (for infinite loading) */
  onEndReached?: () => void;
  /** Threshold for triggering onEndReached (items from end) */
  endReachedThreshold?: number;
}

export function VirtualCardList<T = unknown>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
  renderItem,
  className,
  itemClassName,
  gap = 0,
  loading = false,
  loadingComponent,
  emptyComponent,
  onEndReached,
  endReachedThreshold = 10,
}: VirtualCardListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalHeight = items.length * (itemHeight + gap) - gap;
  const visibleItemCount = Math.ceil(containerHeight / (itemHeight + gap));
  const startIndex = Math.max(0, Math.floor(scrollTop / (itemHeight + gap)) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleItemCount + (overscan * 2)
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  }, [items, startIndex, endIndex]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollTop(scrollTop);
    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scrolling to false after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    // Check if we're near the end for infinite loading
    if (onEndReached && endReachedThreshold > 0) {
      const scrollBottom = scrollTop + containerHeight;
      const threshold = totalHeight - (endReachedThreshold * (itemHeight + gap));
      
      if (scrollBottom >= threshold) {
        onEndReached();
      }
    }
  }, [containerHeight, totalHeight, itemHeight, gap, onEndReached, endReachedThreshold]);



  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollTop = 0;
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div 
        className={cn('flex items-center justify-center', className)}
        style={{ height: containerHeight }}
      >
        {loadingComponent || (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div 
        className={cn('flex items-center justify-center', className)}
        style={{ height: containerHeight }}
      >
        {emptyComponent || (
          <div className="text-center text-muted-foreground">
            <p>No items to display</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollElementRef}
        className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        {/* Total height spacer */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Visible items */}
          {visibleItems.map(({ item, index }) => (
            <div
              key={index}
              className={cn('absolute left-0 right-0', itemClassName)}
              style={{
                top: index * (itemHeight + gap),
                height: itemHeight,
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Loading indicator for infinite scroll */}
        {loading && items.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading more...</span>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {isScrolling && items.length > visibleItemCount && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {Math.round((scrollTop / (totalHeight - containerHeight)) * 100)}%
        </div>
      )}

      {/* Scroll to top button */}
      {scrollTop > containerHeight && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// Hook for easier virtual list management
export function useVirtualList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleRange = useMemo(() => {
    const visibleItemCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(items.length - 1, startIndex + visibleItemCount);
    
    return { startIndex, endIndex, visibleItemCount };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  return {
    ...visibleRange,
    scrollTop,
    setScrollTop,
    totalHeight: items.length * itemHeight,
  };
}
