import { cn } from '../../utils';
import { BaseCard } from '../ui/BaseCard';
import type { MotionProps, HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ComponentType, ElementType } from 'react';
import { useState, useEffect } from 'react';
import type { ContentProvider } from '../../content/types';

export interface ArticleContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

interface ArticleCardProps extends Partial<ArticleContent> {
  className?: string;
  href?: string;
  motionProps?: MotionProps;
  ImageComponent?: ComponentType<any> | string;
  LinkComponent?: ComponentType<any> | string;
  /**
   * Additional props to pass to the rendered image component.
   * Useful for framework adapters (e.g., Next.js Image `fill`, `priority`, `sizes`).
   */
  imageProps?: Record<string, unknown>;
  
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
   * Content type/category for loading (defaults to 'main-grid')
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

export function ArticleCard({ 
  title, 
  subtitle, 
  description, 
  image, 
  href = '#', 
  className, 
  motionProps = {},
  ImageComponent = 'img',
  LinkComponent = 'a',
  imageProps = {},
  contentProvider,
  contentSlug,
  contentType = 'main-grid',
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
  ...props 
}: ArticleCardProps) {
  const MotionDiv = motion.div;
  const Link = (LinkComponent || 'a') as ElementType;

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
          console.warn(`Failed to load article content for ${contentSlug}:`, error);
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
      // Trigger useEffect by setting a flag or using a dependency
      setIsLoading(true);
    }
  };

  // Merge props: hardcoded props override loaded content
  const finalContent: ArticleContent = {
    title: title || loadedContent?.title || 'Untitled Article',
    subtitle: subtitle || loadedContent?.subtitle,
    description: description || loadedContent?.description,
    image: image || loadedContent?.image
  };

  // Show loading state if requested and content is loading
  if (showLoadingIndicator && isLoading && LoadingComponent) {
    return <LoadingComponent />;
  }

  // Show error state if content loading failed and no fallback content
  if (error && ErrorComponent && !title && !description) {
    return <ErrorComponent error={error} retry={retryContentLoad} />;
  }

  return (
    <MotionDiv className="h-full w-full" {...motionProps}>
      <Link href={href} className={cn('group block h-full w-full', className)} {...props}>
        <BaseCard className="relative h-full w-full overflow-hidden p-0 m-0">
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {typeof ImageComponent === 'string' ? (
              <img
                src={finalContent.image || '/image/blog/blog-sample-image.png'}
                alt={finalContent.title || 'Featured article'}
                className="object-cover w-full h-full"
                {...imageProps}
              />
            ) : (
              <ImageComponent
                src={finalContent.image || '/image/blog/blog-sample-image.png'}
                alt={finalContent.title || 'Featured article'}
                className="object-cover w-full h-full"
                {...imageProps}
              />
            )}
          </MotionDiv>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:p-5 md:p-6 text-white pointer-events-none">
            {finalContent.subtitle && (
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/80">
                {finalContent.subtitle}
              </p>
            )}
            <h3 className="text-xl sm:text-2xl font-bold">{finalContent.title}</h3>
            {finalContent.description && (
              <p className="mt-2 text-sm sm:text-base text-white/90 line-clamp-3 md:line-clamp-3 lg:line-clamp-7">
                {finalContent.description}
              </p>
            )}
          </div>
        </BaseCard>
      </Link>
    </MotionDiv>
  );
}
