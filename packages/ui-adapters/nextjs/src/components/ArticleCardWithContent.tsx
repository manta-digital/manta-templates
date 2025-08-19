'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArticleCard } from '@manta-templates/ui-core';
import type { ArticleContent } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '../content';
import type { ComponentType } from 'react';
import type { MotionProps } from 'framer-motion';

interface ArticleCardWithContentProps extends Partial<ArticleContent> {
  slug: string;
  className?: string;
  href?: string;
  motionProps?: MotionProps;
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
  /**
   * Additional props to pass to the rendered Next.js Image component
   */
  imageProps?: Record<string, unknown>;
  /**
   * Override the default Image component
   */
  ImageComponent?: ComponentType<any> | string;
  /**
   * Override the default Link component
   */
  LinkComponent?: ComponentType<any> | string;
}

/**
 * Next.js Article Card with Content Loading
 * 
 * A convenience wrapper around ui-core's ArticleCard that pre-configures
 * Next.js specific components (Image, Link) and the NextjsContentProvider.
 * 
 * Features:
 * - Automatic content loading from filesystem-based markdown
 * - Next.js Image optimization and Link prefetching
 * - Fallback to hardcoded props when content loading fails
 * - Full TypeScript support with proper type inference
 * 
 * Usage:
 * ```tsx
 * <ArticleCardWithContent 
 *   slug="my-article" 
 *   contentType="articles"
 *   title="Fallback Title" // Used if content loading fails
 * />
 * ```
 */
export function ArticleCardWithContent({
  slug,
  contentType = 'main-grid',
  ImageComponent = Image,
  LinkComponent = Link,
  imageProps = {},
  ...props
}: ArticleCardWithContentProps) {
  // Default Next.js Image props for optimization
  const defaultImageProps = {
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { objectFit: 'cover' as const },
    ...imageProps
  };

  return (
    <ArticleCard
      contentProvider={nextjsContentProvider}
      contentSlug={slug}
      contentType={contentType}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
      imageProps={defaultImageProps}
      {...props}
    />
  );
}

/**
 * Default Loading Component
 * Simple loading spinner for content loading state
 */
export function DefaultLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}

/**
 * Default Error Component
 * Simple error display with retry functionality
 */
export function DefaultErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
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
 * Article Card with Content and Default UI Components
 * 
 * Includes default loading and error components for a complete experience
 */
export function ArticleCardWithContentAndUI(props: ArticleCardWithContentProps) {
  return (
    <ArticleCardWithContent
      LoadingComponent={DefaultLoadingComponent}
      ErrorComponent={DefaultErrorComponent}
      showLoadingIndicator={true}
      {...props}
    />
  );
}