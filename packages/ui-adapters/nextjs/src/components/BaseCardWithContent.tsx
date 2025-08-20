'use client';

import { BaseCard } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '../content';
import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import type { ContentProvider } from '@manta-templates/ui-core';

interface BaseCardWithContentProps<T = any> {
  /**
   * Content slug to load
   */
  slug: string;
  /**
   * Content type/category for loading
   */
  contentType: string;
  /**
   * CSS class name for the card
   */
  className?: string;
  /**
   * Render prop function that receives the loaded content
   */
  children: (content: T | null, { isLoading, error }: { isLoading: boolean; error: Error | null }) => React.ReactNode;
  /**
   * Fallback content to use if loading fails
   */
  fallbackContent?: T;
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
  /**
   * Content provider instance for loading content
   */
  contentProvider: ContentProvider<T>;
}

/**
 * Generic Base Card with Content Loading
 * 
 * A flexible, generic adapter that can load any content type and render it
 * via a render prop pattern. This component serves as the foundation for
 * all other content adapters.
 * 
 * Features:
 * - Generic TypeScript support for any content type
 * - Render prop pattern for maximum flexibility
 * - Automatic content loading with error handling
 * - Fallback content support
 * - Loading and error state management
 * - Framework-agnostic core with Next.js optimizations
 * 
 * Usage:
 * ```tsx
 * // Basic usage with render prop
 * <BaseCardWithContent<ArticleContent>
 *   slug="my-article"
 *   contentType="articles"
 *   className="h-64"
 * >
 *   {(content, { isLoading, error }) => (
 *     <div>
 *       {isLoading && <p>Loading...</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       {content && <h2>{content.title}</h2>}
 *     </div>
 *   )}
 * </BaseCardWithContent>
 * 
 * // With custom loading/error components
 * <BaseCardWithContent
 *   slug="my-content"
 *   contentType="general"
 *   LoadingComponent={CustomSpinner}
 *   ErrorComponent={CustomErrorDisplay}
 *   showLoadingIndicator={true}
 * >
 *   {(content) => content && <MyCustomRenderer content={content} />}
 * </BaseCardWithContent>
 * ```
 */
export function BaseCardWithContent<T = any>({
  slug,
  contentType,
  className,
  children,
  fallbackContent,
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
  contentProvider,
}: BaseCardWithContentProps<T>) {
  // Content loading state
  const [loadedContent, setLoadedContent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load content when slug or contentType changes
  useEffect(() => {
    if (!slug || !contentType || !contentProvider) {
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadContent = async () => {
      try {
        const contentData = await contentProvider.loadContent(slug, contentType);
        if (isMounted) {
          setLoadedContent(contentData.frontmatter);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Failed to load content');
          setError(error);
          setIsLoading(false);
          console.warn(`Failed to load content for ${slug} (${contentType}):`, error);
        }
      }
    };

    loadContent();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [slug, contentType, contentProvider]);

  // Retry function for error component
  const retryContentLoad = () => {
    setError(null);
    setLoadedContent(null);
    setIsLoading(true);
  };

  // Determine final content (loaded content or fallback)
  const finalContent = loadedContent || fallbackContent || null;

  // Show loading component if requested and loading
  if (showLoadingIndicator && isLoading && LoadingComponent) {
    return <LoadingComponent />;
  }

  // Show error component if loading failed and no content available
  if (error && ErrorComponent && !finalContent) {
    return <ErrorComponent error={error} retry={retryContentLoad} />;
  }

  return (
    <BaseCard className={className}>
      {children(finalContent, { isLoading, error })}
    </BaseCard>
  );
}

/**
 * Default Loading Component for BaseCardWithContent
 */
export function DefaultBaseLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}

/**
 * Default Error Component for BaseCardWithContent
 */
export function DefaultBaseErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[200px] bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
      <div className="text-red-600 dark:text-red-400 text-center mb-4">
        <p className="font-semibold">Failed to load content</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
      <button
        onClick={retry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Retry
      </button>
    </div>
  );
}

/**
 * BaseCardWithContent with Default UI Components
 * 
 * Includes default loading and error components for a complete experience
 */
export function BaseCardWithContentAndUI<T = any>(props: Omit<BaseCardWithContentProps<T>, 'LoadingComponent' | 'ErrorComponent' | 'showLoadingIndicator'>) {
  return (
    <BaseCardWithContent<T>
      LoadingComponent={DefaultBaseLoadingComponent}
      ErrorComponent={DefaultBaseErrorComponent}
      showLoadingIndicator={true}
      {...props}
    />
  );
}