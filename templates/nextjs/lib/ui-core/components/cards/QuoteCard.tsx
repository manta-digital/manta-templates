'use client';

import React, { useEffect, useState } from 'react';
import { QuoteContent } from '../../types/content';
import { cn } from '../../utils';
import { BaseCard } from './BaseCard';

interface QuoteCardProps {
  /** Content-driven props */
  content?: QuoteContent;
  /** Fallback quote text */
  quote?: string;
  /** Fallback author attribution */
  author?: string;
  /** Additional class names */
  className?: string;
  /** Visual style variant */
  variant?: 'primary' | 'secondary';
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
}

/**
 * A visually appealing quote card with gradient borders and shimmer effect
 */
const QuoteCard: React.FC<QuoteCardProps> = ({
  content,
  quote,
  author,
  className,
  variant = 'primary',
  ImageComponent,
  LinkComponent,
}) => {
  const setShimmerPosition = useState(0)[1];
  
  // Shimmer animation effect
  useEffect(() => {
    const animateShimmer = () => {
      setShimmerPosition(prev => (prev >= 100 ? 0 : prev + 0.5));
    };
    
    const interval = setInterval(animateShimmer, 50);
    return () => clearInterval(interval);
  }, [setShimmerPosition]);

  // Define accent color styles using CSS custom properties that work with our semantic color system
  const accentColorStyles = {
    primary: { color: 'var(--color-accent-9)' },
    secondary: { color: 'var(--color-accent-10)' }
  };

  const displayQuote = content?.quote ?? quote;
  const displayAuthor = content?.author ?? author;
  if (!displayQuote) return null;

  return (
    <BaseCard 
      className={cn(
        'relative rounded-lg overflow-hidden p-4',
        'bg-card text-card-foreground', // Use semantic card colors
        className
      )}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
    >
      {/* Outer container with border gradient and shimmer effect */}
      <div className="relative overflow-hidden rounded-lg">
        
        {/* Inner card content with proper padding and semantic colors */}
        <div 
          className={cn(
            'relative rounded-lg p-16',
            'bg-card text-card-foreground', // Explicit semantic colors
            'transition-colors duration-200'
          )}
        >
          {/* Quote with quotation marks */}
          <div className="relative">
            <p 
              className={cn(
                'text-lg italic font-normal text-center',
                'text-card-foreground transition-colors duration-200',
                'opacity-95'
              )}
            >
              <span className="text-2xl mr-1" style={accentColorStyles[variant]}>
                &ldquo;
              </span>
              {displayQuote}
              <span className="text-2xl ml-1" style={accentColorStyles[variant]}>
                &rdquo;
              </span>
            </p>
            {displayAuthor && (
              <figcaption className="mt-4 text-right text-sm text-muted-foreground">
                — {displayAuthor}
              </figcaption>
            )}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export { QuoteCard };
export type { QuoteCardProps };