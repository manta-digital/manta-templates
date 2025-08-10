'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Technology {
  name: string;
  svg: string;
  color?: string;
  colorDark?: string;
  invertOnDark?: boolean;
}

interface TechnologyScrollerProps {
  items: Technology[];
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export const TechnologyScroller = ({
  items,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
}: TechnologyScrollerProps) => {

  const getSpeedClass = () => {
    switch (speed) {
      case 'fast': return 'animate-scroll-fast';
      case 'slow': return 'animate-scroll-slow';
      default: return 'animate-scroll-normal';
    }
  };

  return (
    <div
      className={cn(
        'relative max-w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <ul
        className={cn(
          'flex min-w-full shrink-0 py-4 w-max flex-nowrap will-change-transform',
          getSpeedClass(),
          direction === 'right' ? 'animate-reverse' : '',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.concat(items).map((item, idx) => (
          <li
            className="flex-none flex items-center justify-center gap-2 pl-12 first:pl-0"
            key={`${item.name}-${idx}`}
          >
            {item.color ? (
              <>
                <span
                  style={{
                    backgroundColor: item.color,
                    maskImage: `url(/assets/icons/tech/${item.svg})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                  className="h-8 w-8 block dark:hidden"
                />
                <span
                  style={{
                    backgroundColor: item.colorDark || item.color,
                    maskImage: `url(/assets/icons/tech/${item.svg})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                  className="h-8 w-8 hidden dark:block"
                />
              </>
            ) : (
              <img
                src={`/assets/icons/tech/${item.svg}`}
                alt={item.name}
                className={cn(
                  'h-8 w-auto object-contain',
                  item.invertOnDark && 'dark:invert'
                )}
                width="32"
                height="32"
                loading="lazy"
              />
            )}
            <span className="text-lg font-medium text-muted-foreground">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


