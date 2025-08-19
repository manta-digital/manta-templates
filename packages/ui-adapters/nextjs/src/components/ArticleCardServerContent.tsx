import Image from 'next/image';
import Link from 'next/link';
import { ArticleCard } from '@manta-templates/ui-core';
import type { ArticleContent } from '@manta-templates/ui-core';
import { NextjsContentProvider } from '../content/NextjsContentProvider';
import type { ComponentType } from 'react';
import type { MotionProps } from 'framer-motion';

interface ArticleCardServerContentProps extends Partial<ArticleContent> {
  slug: string;
  className?: string;
  href?: string;
  motionProps?: MotionProps;
  /**
   * Content type/category for loading (defaults to 'main-grid')
   */
  contentType?: string;
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
  /**
   * Content root directory override (useful for testing or custom setups)
   */
  contentRoot?: string;
}

/**
 * Server-Side Article Card with Content Loading
 * 
 * A server component that loads content at build time or request time,
 * passing the loaded content as props to avoid client-side loading.
 * Optimized for Next.js SSG and SSR scenarios.
 * 
 * Features:
 * - Server-side content loading (no client-side async)
 * - Build-time optimization for static generation
 * - Automatic fallback to hardcoded props when content is unavailable
 * - Next.js Image and Link optimization
 * 
 * Usage:
 * ```tsx
 * // In a server component or page
 * <ArticleCardServerContent 
 *   slug="my-article" 
 *   contentType="articles"
 *   title="Fallback Title" // Used if content loading fails
 * />
 * ```
 */
export async function ArticleCardServerContent({
  slug,
  contentType = 'main-grid',
  ImageComponent = Image,
  LinkComponent = Link,
  imageProps = {},
  contentRoot,
  ...fallbackProps
}: ArticleCardServerContentProps) {
  let loadedContent: ArticleContent | null = null;

  // Load content server-side
  try {
    const contentProvider = new NextjsContentProvider({ 
      contentRoot,
      enableCaching: true,
      codeTheme: 'github-dark'
    });
    
    const contentData = await contentProvider.loadContent(slug, contentType);
    loadedContent = contentData.frontmatter as ArticleContent;
  } catch (error) {
    // Content loading failed - we'll use fallback props
    console.warn(`Failed to load server content for ${slug}:`, error);
  }

  // Merge loaded content with fallback props (fallback props take precedence)
  const finalContent: ArticleContent = {
    title: fallbackProps.title || loadedContent?.title,
    subtitle: fallbackProps.subtitle || loadedContent?.subtitle,  
    description: fallbackProps.description || loadedContent?.description,
    image: fallbackProps.image || loadedContent?.image
  };

  // Extract other props that aren't part of ArticleContent
  const { title: _title, subtitle: _subtitle, description: _description, image: _image, ...otherProps } = fallbackProps;

  // Default Next.js Image props for optimization
  const defaultImageProps = {
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { objectFit: 'cover' as const },
    priority: false, // Can be overridden via imageProps
    ...imageProps
  };

  return (
    <ArticleCard
      {...finalContent}
      {...otherProps}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
      imageProps={defaultImageProps}
    />
  );
}

/**
 * Helper function to preload content for static generation
 * Useful in getStaticProps or similar scenarios
 * 
 * @param slug Content slug to load
 * @param contentType Content type (defaults to 'main-grid')
 * @param contentRoot Optional content root override
 * @returns Promise resolving to the content data or null if not found
 */
export async function preloadArticleContent(
  slug: string, 
  contentType: string = 'main-grid',
  contentRoot?: string
): Promise<ArticleContent | null> {
  try {
    const contentProvider = new NextjsContentProvider({ 
      contentRoot,
      enableCaching: false, // Disable caching for build-time loading
      codeTheme: 'github-dark'
    });
    
    const contentData = await contentProvider.loadContent(slug, contentType);
    return contentData.frontmatter as ArticleContent;
  } catch (error) {
    console.warn(`Failed to preload content for ${slug}:`, error);
    return null;
  }
}

/**
 * Helper function to get all available content slugs for a content type
 * Useful for generateStaticParams in App Router
 * 
 * @param contentType Content type to get slugs for
 * @param contentRoot Optional content root override  
 * @returns Promise resolving to array of slug strings
 */
export async function getAllContentSlugs(
  contentType: string,
  contentRoot?: string
): Promise<string[]> {
  try {
    const contentProvider = new NextjsContentProvider({ 
      contentRoot,
      enableCaching: false,
      codeTheme: 'github-dark'
    });
    
    const allContent = await contentProvider.loadAllRawContent(contentType);
    return allContent.map((content: { slug: string; content: string }) => content.slug);
  } catch (error) {
    console.warn(`Failed to get content slugs for ${contentType}:`, error);
    return [];
  }
}