"use client";

import React, { useEffect, useState } from 'react';
import type { QuoteContent } from '@/types/content';
import { cn } from '@/lib/utils';
import { BaseCard } from './BaseCard';
import { useTheme } from '@/context/themecontext';

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
}) => {
  const { theme } = useTheme();
  const setShimmerPosition = useState(0)[1];
  
  // Shimmer animation effect
  useEffect(() => {
    const animateShimmer = () => {
      setShimmerPosition(prev => (prev >= 100 ? 0 : prev + 0.5));
    };
    
    const interval = setInterval(animateShimmer, 50);
    return () => clearInterval(interval);
  }, [setShimmerPosition]);

  // Define gradient classes based on variant
  {/* 
  const gradientClasses = {
    primary: 'from-purple-600 via-indigo-600 to-blue-600',
    secondary: 'from-purple-600 via-blue-600 to-indigo-600'
  };
  */}
  
  // Define accent color classes based on variant
  const accentColors = {
    primary: 'text-purple-400',
    secondary: 'text-blue-400'
  };

  const displayQuote = content?.quote ?? quote;
  const displayAuthor = content?.author ?? author;
  if (!displayQuote) return null;

  return (
          <BaseCard className={
      cn('relative rounded-lg overflow-hidden p-4', 
        'bg-white dark:bg-gray-800',
        className)}
    >
      {/* Outer container with border gradient and shimmer effect */}
      <div className="relative overflow-hidden rounded-lg">
        
        {/* Inner card content with radial gradient */}
        <div 
          className={cn(
            'relative rounded-lg p-16',
            'bg-white dark:bg-gray-800',
            'text-gray-800 dark:text-gray-300',
            'transition-colors duration-200'
          )}
        >
          {/* Quote with quotation marks */}
          <div className="relative">
            <p 
              className={cn(
                'text-lg italic font-normal text-center',
                'text-gray-700 dark:text-gray-300',
                'transition-colors duration-200',
                theme === 'dark' ? 'opacity-90' : 'opacity-95'
              )}
              style={{
                textShadow: theme === 'dark'
                  ? '0 0 1px rgba(139, 92, 246, 0.1)'
                  : '0 0 1px rgba(0,0,0,0.05)'
              }}
            >
              <span className={cn('text-2xl mr-1', accentColors[variant])}>
                &ldquo;
              </span>
              {displayQuote}
              <span className={cn('text-2xl ml-1', accentColors[variant])}>
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

export default QuoteCard;
