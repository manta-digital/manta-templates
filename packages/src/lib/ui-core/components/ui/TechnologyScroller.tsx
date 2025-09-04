'use client';

import React, { useEffect, useState } from 'react';
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
 * CSS animations are included in ui-core styles.
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
  const [isDark, setIsDark] = useState(false);

  // React kludge to fix dark mode that was causing inordinate amounts of difficulty.
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  const getSpeedClass = () => {
    switch (speed) {
      case 'fast': return 'tech-scroll-fast';
      case 'slow': return 'tech-scroll-slow';
      default: return 'tech-scroll-normal';
    }
  };

  const TechIcon: React.FC<{ item: Technology }> = ({ item }) => {
    const iconUrl = `${iconBasePath}${item.svg}`;

    // CSS masking for colored icons - IT WORKS!
    if (item.color) {
      return (
        <>
          <div 
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: item.color,
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
            className="block dark:hidden"
            aria-hidden="true"
          />
          <div 
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: item.colorDark || item.color,
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
            className="hidden dark:block"
            aria-hidden="true"
          />
        </>
      );
    }

    // Use regular image with optional dark mode inversion
    if (typeof ImageComponent === 'string') {
      if (item.invertOnDark) {
        return (
          <div 
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: isDark ? 'white' : 'black',
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
            aria-hidden="true"
          />
        );
      }
      return (
        <img
          src={iconUrl}
          alt={item.name}
          className="h-8 w-auto object-contain"
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
    <>
      <style>
        {`
          @keyframes tech-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3%); }
          }
          .tech-scroll-slow { animation: tech-scroll 50s linear infinite; }
          .tech-scroll-normal { animation: tech-scroll 20s linear infinite; }
          .tech-scroll-fast { animation: tech-scroll 8s linear infinite; }
          .tech-scroll-reverse { animation-direction: reverse; }
        `}
      </style>
      <div
        className={cn(
          'relative max-w-full overflow-hidden',
          '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
          className
        )}
      >
      <ul
        className={cn(
          'flex min-w-full shrink-0 py-4 flex-nowrap will-change-transform',
          getSpeedClass(),
          direction === 'right' ? 'tech-scroll-reverse' : '',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{ width: 'max-content' }}
      >
        {/* Fairly horrid kluge to avoid gaps.  Open issue but need to move on. */}
        {[...items, ...items, ...items].map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="flex items-center gap-2 pr-12"
          >
            <div>
              <TechIcon item={item} />
            </div>
            <span 
              className="text-lg font-medium text-muted-foreground whitespace-nowrap"
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export { TechnologyScroller };
export type { TechnologyScrollerProps, Technology };