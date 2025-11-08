import React from 'react';
import { cva } from 'class-variance-authority';
import { HeroOverlayProps } from '../../types/hero';
import { cn } from '../../utils/cn';

/**
 * CVA variants for hero overlay component
 */
const heroOverlayVariants = cva(
  "absolute inset-0 transition-opacity duration-300 ease-in-out pointer-events-none",
  {
    variants: {
      zIndex: {
        background: "z-0", // Behind text content
        foreground: "z-10", // In front of text content (rarely used)
      }
    },
    defaultVariants: {
      zIndex: "background",
    }
  }
);

/**
 * Hero overlay component
 *
 * Provides configurable overlay for better text contrast over background
 * images and videos. Supports opacity control, custom colors, gradients,
 * and smooth transitions.
 *
 * Features:
 * - Configurable opacity (0-1)
 * - Custom color support (CSS color values)
 * - Gradient overlay options
 * - Z-index management for proper layering
 * - Smooth opacity transitions
 * - Theme-aware default colors
 */
export function HeroOverlay({
  config,
  className
}: HeroOverlayProps) {
  // Early return if no overlay config
  if (!config) {
    return null;
  }

  const { opacity, color, gradient } = config;

  // Build overlay styles
  const overlayStyle: React.CSSProperties = {
    opacity: opacity,
  };

  // Apply gradient if specified
  if (gradient) {
    overlayStyle.backgroundImage = gradient;
  }
  // Apply solid color if specified (fallback to black if none)
  else {
    overlayStyle.backgroundColor = color || '#000000';
  }

  return (
    <div
      className={cn(
        heroOverlayVariants({ zIndex: "background" }),
        className
      )}
      style={overlayStyle}
      aria-hidden="true"
    />
  );
}

HeroOverlay.displayName = 'HeroOverlay';