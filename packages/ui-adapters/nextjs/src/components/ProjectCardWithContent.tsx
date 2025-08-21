'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProjectCard } from '@manta-templates/ui-core';
import type { ProjectContent } from '@manta-templates/ui-core';
import { nextjsProjectContentProvider } from '../content';
import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

interface ProjectCardWithContentProps {
  slug: string;
  className?: string;
  /**
   * Content type/category for loading (defaults to 'projects')
   */
  contentType?: string;
  /**
   * Display variant for the project card
   */
  displayVariant?: 'showcase';
  /**
   * Enable overlay mode where children render as background
   */
  overlay?: boolean;
  /**
   * Custom children to render (used with overlay mode)
   */
  children?: React.ReactNode;
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
  title?: string;
  description?: string;
  techStack?: string[];
  repoUrl?: string;
  demoUrl?: string;
}

/**
 * Next.js Project Card with Content Loading
 * 
 * A convenience wrapper around ui-core's ProjectCard that pre-configures
 * Next.js specific components (Image, Link) and the NextjsContentProvider.
 * 
 * Features:
 * - Automatic content loading from filesystem-based markdown
 * - Next.js Image optimization and Link prefetching
 * - Fallback to hardcoded props when content loading fails
 * - Full TypeScript support with proper type inference
 * - Support for showcase and overlay display variants
 * 
 * Usage:
 * ```tsx
 * // Basic usage
 * <ProjectCardWithContent 
 *   slug="my-project" 
 *   contentType="projects"
 *   title="Fallback Title" // Used if content loading fails
 * />
 * 
 * // Showcase variant with image
 * <ProjectCardWithContent 
 *   slug="featured-project" 
 *   contentType="projects"
 *   displayVariant="showcase"
 * />
 * 
 * // Overlay mode with custom background
 * <ProjectCardWithContent 
 *   slug="demo-project" 
 *   overlay={true}
 * >
 *   <YourCustomBackground />
 * </ProjectCardWithContent>
 * ```
 */
export function ProjectCardWithContent({
  slug,
  contentType = 'projects',
  ImageComponent = Image,
  LinkComponent = Link,
  imageProps = {},
  displayVariant,
  ...props
}: ProjectCardWithContentProps) {
  // Default Next.js Image props for optimization
  const defaultImageProps = {
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { objectFit: 'cover' as const },
    priority: true,
    ...imageProps
  };

  // Create content with displayVariant if specified (must be partial ProjectContent)
  const contentWithVariant = displayVariant ? { 
    title: '', // Will be overridden by loaded content or fallback props
    techStack: [], // Will be overridden by loaded content or fallback props
    displayVariant 
  } : undefined;

  return (
    <ProjectCard
      contentProvider={nextjsProjectContentProvider}
      contentSlug={slug}
      contentType={contentType}
      content={contentWithVariant}
      ImageComponent={ImageComponent}
      LinkComponent={LinkComponent}
      {...props}
    />
  );
}

/**
 * Default Loading Component
 * Simple loading spinner for content loading state
 */
export function DefaultProjectLoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[280px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}

/**
 * Default Error Component
 * Simple error display with retry functionality
 */
export function DefaultProjectErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[280px] bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
      <div className="text-red-600 dark:text-red-400 text-center mb-4">
        <p className="font-semibold">Failed to load project</p>
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
 * Project Card with Content and Default UI Components
 * 
 * Includes default loading and error components for a complete experience
 */
export function ProjectCardWithContentAndUI(props: ProjectCardWithContentProps) {
  return (
    <ProjectCardWithContent
      LoadingComponent={DefaultProjectLoadingComponent}
      ErrorComponent={DefaultProjectErrorComponent}
      showLoadingIndicator={true}
      {...props}
    />
  );
}