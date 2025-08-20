'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogCardImage } from '@manta-templates/ui-core';
import type { BlogCardImageProps } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '../content';
import type { ComponentType } from 'react';

interface BlogCardImageWithContentProps {
  /**
   * Content slug to load
   */
  slug: string;
  /**
   * Content type/category for loading (defaults to 'articles')
   */
  contentType?: string;
  /**
   * CSS class name for the card
   */
  className?: string;
  /**
   * Text color class for overlay text
   */
  textColorClassName?: string;
  /**
   * Custom overlay gradient class
   */
  overlayClassName?: string;
  /**
   * Override the default slug-based URL for the card link
   */
  href?: string;
  /**
   * Image maximum height style
   */
  imageMaxHeight?: string;
  /**
   * Dim background image using CSS brightness
   */
  dim?: boolean;
  /**
   * Apply blur to background image
   */
  blur?: boolean;
  /**
   * Tailwind blur amount
   */
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
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
  ImageComponent?: ComponentType<any>;
  /**
   * Override the default Link component  
   */
  LinkComponent?: ComponentType<any>;
  
  // Fallback props if content loading fails
  /**
   * Fallback article title
   */
  title?: string;
  /**
   * Fallback article excerpt/description
   */
  excerpt?: string;
  /**
   * Fallback cover image URL
   */
  coverImageUrl?: string;
  /**
   * Fallback article category
   */
  category?: string;
  /**
   * Fallback article author
   */
  author?: string;
  /**
   * Fallback publication date
   */
  date?: string | Date;
}

/**
 * Next.js Blog Card Image with Content Loading
 * 
 * A convenience wrapper around ui-core's BlogCardImage that pre-configures
 * Next.js specific components (Image, Link) and automatically loads article
 * content from the content management system using a slug identifier.
 * 
 * Features:
 * - Automatic content loading from filesystem-based markdown
 * - Next.js Image optimization for cover images
 * - Next.js Link integration for article URLs
 * - Fallback to hardcoded props when content loading fails
 * - Full TypeScript support with proper type inference
 * - Loading and error state management
 * - Rich visual styling options (overlays, blur, dim effects)
 * 
 * Usage:
 * ```tsx
 * // Basic usage
 * <BlogCardImageWithContent 
 *   slug="my-blog-post" 
 *   contentType="articles"
 *   className="h-64"
 * />
 * 
 * // With fallback content and custom styling
 * <BlogCardImageWithContent 
 *   slug="featured-article" 
 *   contentType="blog"
 *   textColorClassName="text-white"
 *   overlayClassName="bg-gradient-to-t from-blue-900/80 to-transparent"
 *   dim={true}
 *   blurAmount="sm"
 *   title="Fallback Title" // Used if content loading fails
 *   excerpt="Fallback description"
 *   coverImageUrl="/fallback-image.jpg"
 * />
 * 
 * // With custom href override
 * <BlogCardImageWithContent 
 *   slug="external-article" 
 *   href="https://external-site.com/article"
 *   LoadingComponent={CustomSpinner}
 *   ErrorComponent={CustomErrorDisplay}
 *   showLoadingIndicator={true}
 * />
 * ```
 */
export function BlogCardImageWithContent({
  slug,
  contentType = 'articles',
  ImageComponent = Image,
  LinkComponent = Link,
  imageProps = {},
  href,
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
  title,
  excerpt,
  coverImageUrl,
  category,
  author,
  date,
  ...props
}: BlogCardImageWithContentProps) {
  // Default Next.js Image props for optimization
  const defaultImageProps = {
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { objectFit: 'cover' as const },
    priority: true,
    ...imageProps
  };

  // Generate default href from slug if not provided
  const defaultHref = href || `/articles/${slug}`;

  return (
    <BlogCardImage
      contentProvider={nextjsContentProvider}
      contentSlug={slug}
      contentType={contentType}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
      slug={defaultHref}
      showLoadingIndicator={showLoadingIndicator}
      LoadingComponent={LoadingComponent}
      ErrorComponent={ErrorComponent}
      // Fallback props
      title={title}
      excerpt={excerpt}
      coverImageUrl={coverImageUrl}
      category={category}
      author={author}
      date={date}
      {...props}
    />
  );
}

/**
 * Default Loading Component for Blog Card Images
 * Optimized for blog card dimensions and visual appeal
 */
export function DefaultBlogLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
      <div className="flex flex-col items-center space-y-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading article...</p>
      </div>
    </div>
  );
}

/**
 * Default Error Component for Blog Card Images
 * Styled to match blog card visual aesthetics
 */
export function DefaultBlogErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[280px] bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6">
      <div className="text-red-600 dark:text-red-400 text-center mb-6">
        <div className="w-12 h-12 mx-auto mb-3 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="font-semibold mb-1">Failed to load article</p>
        <p className="text-sm opacity-80">{error.message}</p>
      </div>
      <button
        onClick={retry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
      >
        Try Again
      </button>
    </div>
  );
}

/**
 * Blog Card Image with Content and Default UI Components
 * 
 * Includes default loading and error components optimized for blog cards
 */
export function BlogCardImageWithContentAndUI(props: BlogCardImageWithContentProps) {
  return (
    <BlogCardImageWithContent
      LoadingComponent={DefaultBlogLoadingComponent}
      ErrorComponent={DefaultBlogErrorComponent}
      showLoadingIndicator={true}
      {...props}
    />
  );
}