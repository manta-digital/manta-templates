'use client';

import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '../../utils';
import { BaseCard } from '../ui/BaseCard';
import type { ArticleContent } from './ArticleCard';
import type { ContentProvider } from '../../content/types';

export interface BlogCardImageProps {
  imageMaxHeight?: string; 
  title?: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string;
  coverImageUrl?: string;
  category?: string;
  author?: string;
  textColorClassName?: string;
  overlayClassName?: string;
  /** Dim background image using CSS brightness (e.g. 75%) */
  dim?: boolean;
  /** Apply blur to background image. If blurAmount is provided, this is ignored. */
  blur?: boolean;
  /** Tailwind blur amount, e.g. 'sm', 'md', 'lg', 'xl', '2xl', '3xl'. */
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
  
  // Content loading props
  /**
   * Content provider instance for loading content dynamically
   */
  contentProvider?: ContentProvider<ArticleContent>;
  /**
   * Content slug to load when contentProvider is provided
   */
  contentSlug?: string;
  /**
   * Content type/category for loading (defaults to 'articles')
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

const BlogCardImage: React.FC<BlogCardImageProps> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  textColorClassName = 'text-white',
  overlayClassName = 'bg-gradient-to-t from-black/70 via-black/50 to-transparent',
  dim = false,
  blur = false,
  blurAmount,
  className,
  imageMaxHeight,
  ImageComponent,
  LinkComponent,
  contentProvider,
  contentSlug,
  contentType = 'articles',
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
  ...props
}) => {
  // Content loading state
  const [loadedContent, setLoadedContent] = useState<ArticleContent | null>(null);
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
          console.warn(`Failed to load blog content for ${contentSlug}:`, error);
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
  const finalTitle = title || loadedContent?.title || 'Untitled Article';
  const finalExcerpt = excerpt || loadedContent?.description;
  const finalCoverImageUrl = coverImageUrl || loadedContent?.image;

  // Show loading state if requested and content is loading
  if (showLoadingIndicator && isLoading && LoadingComponent) {
    return <LoadingComponent />;
  }

  // Show error state if content loading failed and no fallback content
  if (error && ErrorComponent && !title && !coverImageUrl) {
    return <ErrorComponent error={error} retry={retryContentLoad} />;
  }

  // Return null if no content to display
  if (!finalTitle || !finalCoverImageUrl) {
    return null;
  }
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
    <BaseCard
      className={cn(
        'group relative overflow-hidden w-full p-0 transition-shadow duration-300 hover:shadow-lg',
        imageMaxHeight ?? 'min-h-[280px] md:min-h-[360px]',
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 z-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {ImageComponent ? (
          <ImageComponent
            src={finalCoverImageUrl}
            alt={`Background for ${finalTitle}`}
            fill
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              dim && 'brightness-75',
              blurAmount ? `blur-${blurAmount}` : (blur && 'blur-sm')
            )}
            priority
          />
        ) : (
          <img
            src={finalCoverImageUrl}
            alt={`Background for ${finalTitle}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              dim && 'brightness-75',
              blurAmount ? `blur-${blurAmount}` : (blur && 'blur-sm')
            )}
          />
        )}
      </motion.div>
      <div className={cn('absolute inset-0 z-10 pointer-events-none', overlayClassName)} />
      <div
        className={cn(
          'relative z-20 h-full w-full flex flex-col justify-center p-8 pointer-events-none',
          textColorClassName
        )}
      >
        
        <div className="relative z-10">
          {category && (
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1">
              {category}
            </p>
          )}
          <h3 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-3">
            {finalTitle}
          </h3>
          {finalExcerpt && (
            <p className="text-sm md:text-base opacity-90 mb-3 line-clamp-2 md:line-clamp-3">
              {finalExcerpt}
            </p>
          )}
          <div className="flex items-center text-xs opacity-80">
            {author && <span>By {author}</span>}
            {author && formattedDate && <span className="mx-2">•</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </div>
    </BaseCard>
  );

  return slug ? (
    LinkComponent ? (
      <LinkComponent href={slug} className="contents" aria-label={`Read more about ${finalTitle}`}>
        {cardContent}
      </LinkComponent>
    ) : (
      <a href={slug} className="contents" aria-label={`Read more about ${finalTitle}`}>
        {cardContent}
      </a>
    )
  ) : (
    cardContent
  );
};

export { BlogCardImage };
export default BlogCardImage;