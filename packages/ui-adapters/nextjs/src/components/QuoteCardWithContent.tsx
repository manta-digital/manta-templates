'use client';

import { QuoteCard } from '@manta-templates/ui-core';
import type { QuoteContent } from '@manta-templates/ui-core';
import { nextjsQuoteContentProvider } from '../content';
import type { ComponentType } from 'react';

interface QuoteCardWithContentProps {
  /**
   * Content slug to load
   */
  slug: string;
  /**
   * CSS class name for the card
   */
  className?: string;
  /**
   * Content type/category for loading (defaults to 'quotes')
   */
  contentType?: string;
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary';
  /**
   * Optional theme override
   */
  theme?: 'light' | 'dark';
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
  
  // Fallback props if content loading fails
  /**
   * Fallback quote text
   */
  quote?: string;
  /**
   * Fallback author attribution
   */
  author?: string;
  /**
   * Fallback role/title
   */
  role?: string;
  /**
   * Fallback company name
   */
  company?: string;
}

/**
 * Next.js Quote Card with Content Loading
 * 
 * A convenience wrapper around ui-core's QuoteCard that automatically loads
 * quote content from the content management system using a slug identifier.
 * 
 * Features:
 * - Automatic content loading from filesystem-based markdown
 * - Fallback to hardcoded props when content loading fails
 * - Full TypeScript support with proper type inference
 * - Loading and error state management
 * - Simple text-based content (no complex Next.js components needed)
 * 
 * Usage:
 * ```tsx
 * // Basic usage
 * <QuoteCardWithContent 
 *   slug="customer-testimonial-1" 
 *   contentType="quotes"
 * />
 * 
 * // With fallback content and custom styling
 * <QuoteCardWithContent 
 *   slug="featured-quote" 
 *   contentType="testimonials"
 *   variant="primary"
 *   theme="dark"
 *   className="max-w-lg"
 *   quote="Fallback quote text" // Used if content loading fails
 *   author="Fallback Author"
 * />
 * 
 * // With custom loading/error handling
 * <QuoteCardWithContent 
 *   slug="review-quote" 
 *   LoadingComponent={CustomSpinner}
 *   ErrorComponent={CustomErrorDisplay}
 *   showLoadingIndicator={true}
 * />
 * ```
 */
export function QuoteCardWithContent({
  slug,
  contentType = 'quotes',
  className,
  variant,
  theme,
  showLoadingIndicator = false,
  LoadingComponent,
  ErrorComponent,
  quote,
  author,
  role,
  company,
  ...props
}: QuoteCardWithContentProps) {
  return (
    <QuoteCard
      contentProvider={nextjsQuoteContentProvider}
      contentSlug={slug}
      contentType={contentType}
      className={className}
      variant={variant}
      theme={theme}
      showLoadingIndicator={showLoadingIndicator}
      LoadingComponent={LoadingComponent}
      ErrorComponent={ErrorComponent}
      // Fallback props
      quote={quote}
      author={author}
      {...props}
    />
  );
}

/**
 * Default Loading Component for Quote Cards
 * Optimized for quote card dimensions and styling
 */
export function DefaultQuoteLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 dark:border-purple-400"></div>
    </div>
  );
}

/**
 * Default Error Component for Quote Cards
 * Styled to match quote card aesthetics
 */
export function DefaultQuoteErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[200px] bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
      <div className="text-red-600 dark:text-red-400 text-center mb-4">
        <p className="font-semibold text-sm">Failed to load quote</p>
        <p className="text-xs mt-1 opacity-80">{error.message}</p>
      </div>
      <button
        onClick={retry}
        className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

/**
 * Quote Card with Content and Default UI Components
 * 
 * Includes default loading and error components optimized for quote cards
 */
export function QuoteCardWithContentAndUI(props: QuoteCardWithContentProps) {
  return (
    <QuoteCardWithContent
      LoadingComponent={DefaultQuoteLoadingComponent}
      ErrorComponent={DefaultQuoteErrorComponent}
      showLoadingIndicator={true}
      {...props}
    />
  );
}