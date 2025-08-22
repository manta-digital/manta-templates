'use client';

import React from 'react';
import { cn } from '../../utils';

interface Technology {
  name: string;
  svg: string;
  color?: string;
  colorDark?: string;
  invertOnDark?: boolean;
}

interface TechnologyScrollerProps {
  /** Array of technology items to display */
  items: Technology[];
  /** Animation speed - determines how fast items scroll */
  speed?: 'fast' | 'normal' | 'slow';
  /** Direction of the scroll animation */
  direction?: 'left' | 'right';
  /** Optional additional CSS classes for the container */
  className?: string;
  /** Whether to pause animation on hover */
  pauseOnHover?: boolean;
  /** Base path for technology icons (defaults to '/assets/icons/tech/') */
  iconBasePath?: string;
  /** Image component for framework-specific optimization (e.g., Next.js Image) */
  ImageComponent?: React.ComponentType<any>;
}

/**
 * A horizontal scrolling component that displays technology logos and names.
 * Features smooth infinite scrolling with customizable speed and direction.
 * Supports both colored SVGs (via CSS masks) and regular images with dark mode inversion.
 * 
 * Framework-agnostic with dependency injection for Image components.
 * 
 * Note: This component relies on CSS animations that should be defined by the consuming application:
 * - @keyframes scroll: { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
 * - .animate-scroll-fast, .animate-scroll-normal, .animate-scroll-slow classes
 * - .animate-reverse class for direction control
 */
const TechnologyScroller: React.FC<TechnologyScrollerProps> = ({
  items,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
  iconBasePath = '/assets/icons/tech/',
  ImageComponent = 'img',
}) => {
  const getAnimationStyle = () => {
    const duration = speed === 'fast' ? '20s' : speed === 'slow' ? '80s' : '40s';
    const animDirection = direction === 'right' ? 'reverse' : 'normal';
    
    return {
      animation: `technology-scroll ${duration} linear infinite`,
      animationDirection: animDirection,
    };
  };

  const TechIcon: React.FC<{ item: Technology }> = ({ item }) => {
    const iconUrl = `${iconBasePath}${item.svg}`;

    if (item.color) {
      // Use CSS mask for colored icons
      return (
        <>
          <span
            style={{
              backgroundColor: item.color,
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconUrl})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
            className="h-8 w-8 block dark:hidden"
            aria-hidden="true"
          />
          <span
            style={{
              backgroundColor: item.colorDark || item.color,
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconUrl})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
            className="h-8 w-8 hidden dark:block"
            aria-hidden="true"
          />
        </>
      );
    }

    // Use regular image with optional dark mode inversion
    if (typeof ImageComponent === 'string') {
      return (
        <img
          src={iconUrl}
          alt={item.name}
          className={cn(
            'h-8 w-auto object-contain',
            item.invertOnDark && 'dark:invert'
          )}
          width="32"
          height="32"
          loading="lazy"
        />
      );
    }

    return (
      <ImageComponent
        src={iconUrl}
        alt={item.name}
        width={32}
        height={32}
        className={cn(
          'h-8 w-auto object-contain',
          item.invertOnDark && 'dark:invert'
        )}
      />
    );
  };

  return (
    <div
      className={cn(
        'relative max-w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      {/* Inline keyframes definition for framework-agnostic usage */}
      <style>
        {`
          @keyframes technology-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      
      <ul
        className={cn(
          'flex min-w-full shrink-0 py-4 w-max flex-nowrap will-change-transform',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={getAnimationStyle()}
      >
        {items.concat(items).map((item, idx) => (
          <li
            className="flex-none flex items-center justify-center gap-2 pl-12"
            key={`${item.name}-${idx}`}
          >
            <TechIcon item={item} />
            <span className="text-lg font-medium text-muted-foreground">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TechnologyScroller };
export type { TechnologyScrollerProps, Technology };