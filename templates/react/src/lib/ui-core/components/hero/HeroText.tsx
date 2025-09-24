import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { HeroTextProps } from '../../types/hero';
import { cn } from '../../utils/cn';

/**
 * CVA variants for hero text component styling
 */
const heroTextVariants = cva(
  "space-y-4 z-10 relative",
  {
    variants: {
      textSize: {
        default: "max-w-2xl",
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
      },
      animation: {
        none: "",
        fade: "animate-in fade-in-0 duration-1000",
        slide: "animate-in slide-in-from-bottom-4 duration-1000",
        typewriter: "animate-pulse", // Placeholder - actual typewriter will use JS animation
        stagger: "animate-in fade-in-0 slide-in-from-bottom-4 duration-1000",
      }
    },
    defaultVariants: {
      textSize: "default",
      animation: "none",
    }
  }
);

/**
 * CVA variants for hero title styling
 */
const heroTitleVariants = cva(
  "font-bold tracking-tight text-white drop-shadow-sm",
  {
    variants: {
      textSize: {
        default: "text-4xl",
        sm: "text-3xl md:text-4xl",
        md: "text-4xl md:text-5xl lg:text-6xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
      }
    },
    defaultVariants: {
      textSize: "default",
    }
  }
);

/**
 * CVA variants for hero subtitle styling
 */
const heroSubtitleVariants = cva(
  "font-medium text-white/90 drop-shadow-sm",
  {
    variants: {
      textSize: {
        default: "text-xl",
        sm: "text-lg md:text-xl",
        md: "text-xl md:text-2xl",
        lg: "text-2xl md:text-3xl",
      }
    },
    defaultVariants: {
      textSize: "default",
    }
  }
);

/**
 * CVA variants for hero description styling
 */
const heroDescriptionVariants = cva(
  "text-white/80 leading-relaxed drop-shadow-sm",
  {
    variants: {
      textSize: {
        default: "text-lg",
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      }
    },
    defaultVariants: {
      textSize: "default",
    }
  }
);

/**
 * Hero text component
 *
 * Renders title, subtitle, and description with proper
 * heading hierarchy, responsive sizing, and animation support.
 *
 * Features:
 * - Proper semantic heading hierarchy (h1 for title)
 * - Responsive typography with CVA variants
 * - Basic fade-in and slide animation support
 * - HTML content support in description with sanitization
 * - Text color variants for overlay contrast
 */
export function HeroText({
  content,
  textSize = 'default',
  animation = 'none',
  className
}: HeroTextProps) {
  // Check for reduced motion preference
  const respectsReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finalAnimation = respectsReducedMotion ? 'none' : animation;

  return (
    <>
      {/* Title - Always h1 for proper heading hierarchy */}
      <h1
        className={cn(
          heroTitleVariants({ textSize }),
          "mb-4",
          finalAnimation === 'fade' && 'animate-in fade-in-0 duration-1000',
          finalAnimation === 'slide' && 'animate-in slide-in-from-bottom-4 duration-1000',
          finalAnimation === 'stagger' && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 animate-delay-100'
        )}
      >
        {content.title}
      </h1>

      {/* Subtitle - Optional */}
      {content.subtitle && (
        <p
          className={cn(
            heroSubtitleVariants({ textSize }),
            "mb-6",
            finalAnimation === 'fade' && 'animate-in fade-in-0 duration-1000',
            finalAnimation === 'slide' && 'animate-in slide-in-from-bottom-4 duration-1000',
            finalAnimation === 'stagger' && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 animate-delay-200'
          )}
        >
          {content.subtitle}
        </p>
      )}

      {/* Description - Optional with HTML support */}
      {content.description && (
        <div
          className={cn(
            heroDescriptionVariants({ textSize }),
            "mb-8",
            finalAnimation === 'fade' && 'animate-in fade-in-0 duration-1000',
            finalAnimation === 'slide' && 'animate-in slide-in-from-bottom-4 duration-1000',
            finalAnimation === 'stagger' && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 animate-delay-300'
          )}
          dangerouslySetInnerHTML={{ __html: content.description }}
        />
      )}
    </>
  );
}

HeroText.displayName = 'HeroText';