import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { QuoteContent } from '../../types/content';
import type { ContentProvider } from '../../content/types';
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
  
  // Content loading props
  /**
   * Content provider instance for loading content dynamically
   */
  contentProvider?: ContentProvider<QuoteContent>;
  /**
   * Content slug to load when contentProvider is provided
   */
  contentSlug?: string;
  /**
   * Content type/category for loading (defaults to 'quotes')
   */
  contentType?: string;
  /**
   * Show loading indicator while content is being fetched
   */
  showLoadingIndicator?: boolean;
  /**
   * Custom loading component to display while loading content
   */
  LoadingComponent?: ComponentType;
  /**
   * Custom error component to display when content loading fails
   */
  ErrorComponent?: ComponentType<{ error: Error; retry: () => void }>;
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
  contentProvider,
  contentSlug,
  contentType = 'quotes',
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
}) => {
  // Content loading state
  const [loadedContent, setLoadedContent] = useState<QuoteContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Load content when provider and slug are provided
  useEffect(() => {
    if (!contentProvider || !contentSlug) {
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadContent = async () => {
      try {
        const contentData = await contentProvider.loadContent(contentSlug, contentType);
        if (isMounted) {
          setLoadedContent(contentData.frontmatter);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Failed to load content');
          setError(error);
          setIsLoading(false);
          console.warn(`Failed to load quote content for ${contentSlug}:`, error);
        }
      }
    };

    loadContent();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [contentProvider, contentSlug, contentType]);

  // Retry function for error component
  const retryContentLoad = () => {
    if (contentProvider && contentSlug) {
      setError(null);
      setLoadedContent(null);
      setIsLoading(true);
    }
  };

  // Merge props: hardcoded props override loaded content, fallback to loaded content
  const finalContent: QuoteContent | undefined = loadedContent ? {
    quote: quote || loadedContent.quote,
    author: author || loadedContent.author,
    role: loadedContent.role,
    company: loadedContent.company,
    featured: loadedContent.featured,
    order: loadedContent.order,
  } : content;

  // Show loading state if requested and content is loading
  if (showLoadingIndicator && isLoading && LoadingComponent) {
    return <LoadingComponent />;
  }

  // Show error state if content loading failed and no fallback content
  if (error && ErrorComponent && !quote && !content) {
    return <ErrorComponent error={error} retry={retryContentLoad} />;
  }
  // Define accent color classes based on variant
  const accentColors = {
    primary: 'text-purple-400',
    secondary: 'text-blue-400'
  };

  const displayQuote = finalContent?.quote ?? quote;
  const displayAuthor = finalContent?.author ?? author;
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