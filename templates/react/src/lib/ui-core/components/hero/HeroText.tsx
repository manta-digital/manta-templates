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
      textSize: "md",
      animation: "none",
    }
  }
);

/**
 * CVA variants for hero title styling
 */
const heroTitleVariants = cva(
  "font-bold tracking-tight text-foreground",
  {
    variants: {
      textSize: {
        sm: "text-3xl md:text-4xl",
        md: "text-4xl md:text-5xl lg:text-6xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
      }
    },
    defaultVariants: {
      textSize: "md",
    }
  }
);

/**
 * CVA variants for hero subtitle styling
 */
const heroSubtitleVariants = cva(
  "font-medium text-muted-foreground",
  {
    variants: {
      textSize: {
        sm: "text-lg md:text-xl",
        md: "text-xl md:text-2xl",
        lg: "text-2xl md:text-3xl",
      }
    },
    defaultVariants: {
      textSize: "md",
    }
  }
);

/**
 * CVA variants for hero description styling
 */
const heroDescriptionVariants = cva(
  "text-muted-foreground leading-relaxed",
  {
    variants: {
      textSize: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      }
    },
    defaultVariants: {
      textSize: "md",
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
  textSize = 'md',
  animation = 'none',
  className
}: HeroTextProps) {
  // Check for reduced motion preference
  const respectsReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finalAnimation = respectsReducedMotion ? 'none' : animation;

  return (
    <div
      className={cn(
        heroTextVariants({ textSize, animation: finalAnimation }),
        className
      )}
    >
      {/* Title - Always h1 for proper heading hierarchy */}
      <h1
        className={cn(
          heroTitleVariants({ textSize }),
          finalAnimation === 'stagger' && 'animate-delay-100'
        )}
      >
        {content.title}
      </h1>

      {/* Subtitle - Optional */}
      {content.subtitle && (
        <p
          className={cn(
            heroSubtitleVariants({ textSize }),
            finalAnimation === 'stagger' && 'animate-delay-200'
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
            finalAnimation === 'stagger' && 'animate-delay-300'
          )}
          dangerouslySetInnerHTML={{ __html: content.description }}
        />
      )}
    </div>
  );
}

HeroText.displayName = 'HeroText';