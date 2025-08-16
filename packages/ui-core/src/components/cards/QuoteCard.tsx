import React from 'react';
import { QuoteContent } from '../../types/content';
import { cn } from '../../utils';
import { BaseCard } from '../ui/BaseCard';

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
  /** Optional theme override */
  theme?: 'light' | 'dark';
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
}

/**
 * A visually appealing quote card with gradient borders
 */
const QuoteCard: React.FC<QuoteCardProps> = ({
  content,
  quote,
  author,
  className,
  variant = 'primary',
  theme = 'light',
  ImageComponent,
  LinkComponent,
}) => {
  // Define accent color classes based on variant
  const accentColors = {
    primary: 'text-purple-400',
    secondary: 'text-blue-400'
  };

  const displayQuote = content?.quote ?? quote;
  const displayAuthor = content?.author ?? author;
  if (!displayQuote) return null;

  return (
    <BaseCard 
      className={cn('relative rounded-lg overflow-hidden p-4', 
        'bg-white dark:bg-gray-800',
        className)}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
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

export { QuoteCard };
export type { QuoteCardProps };