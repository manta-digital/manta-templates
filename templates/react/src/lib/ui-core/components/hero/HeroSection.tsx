import React from 'react';
import { cn } from '../../utils/cn';
import { HeroSectionProps } from '../../types/hero';
import { HeroBackground } from './HeroBackground';

/**
 * Main hero section component wrapper
 *
 * Handles layout variants, sizing, and content positioning.
 * Coordinates all child hero components.
 */
export function HeroSection({
  content,
  size = 'lg',
  contentPosition = 'center',
  variant = 'default',
  textSize = 'md',
  components,
  className,
  children,
  onLoad,
  onError,
  ...props
}: HeroSectionProps) {

  // Default content if none provided
  const defaultContent = {
    title: 'Hero Section Placeholder',
    subtitle: 'This is a placeholder hero section',
    description: 'A simple hero section with gradient background',
    background: {
      type: 'gradient' as const,
      gradient: { range: 50 }
    }
  };

  const heroContent = content || defaultContent;

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        // Size variants
        size === 'sm' && 'h-64',
        size === 'md' && 'h-96',
        size === 'lg' && 'h-[32rem]',
        size === 'xl' && 'h-screen',
        // Variant classes
        variant === 'fullscreen' && 'h-screen',
        className
      )}
      {...props}
    >
      {/* Background Layer */}
      <HeroBackground
        config={heroContent.background}
        components={components}
        onLoad={onLoad}
        onError={onError}
      />

      {/* Content Layer */}
      <div className={cn(
        'relative z-10 h-full flex items-center',
        contentPosition === 'left' && 'justify-start',
        contentPosition === 'center' && 'justify-center',
        contentPosition === 'right' && 'justify-end',
      )}>
        <div className="container mx-auto px-4">
          {children || (
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">{heroContent.title}</h1>
              {heroContent.subtitle && (
                <p className="text-xl mb-6">{heroContent.subtitle}</p>
              )}
              {heroContent.description && (
                <p className="text-lg mb-8">{heroContent.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

HeroSection.displayName = 'HeroSection';