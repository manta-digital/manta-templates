'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../utils/cn';
import { cardVariants } from '../../utils/cardVariants';
import type { CardVariantProps } from '../../types/cardVariants';


/**
 * Props for the GradientCard component
 * 
 * ## Gradient Systems
 * 
 * GradientCard provides three gradient control methods (use only one):
 * 
 * ### 1. Simple Range-Based Gradients
 * Use the `range` prop for background-to-accent gradients:
 * ```tsx
 * <GradientCard range={50}>Content</GradientCard>  // Moderate gradient
 * <GradientCard range={100}>Content</GradientCard> // Strong gradient
 * ```
 * 
 * ### 2. Advanced Accent-to-Accent Gradients  
 * Use `from` and `to` props for precise control:
 * ```tsx
 * <GradientCard from="accent-7" to="accent-10">Content</GradientCard>
 * <GradientCard from="neutral-3" to="accent-8">Content</GradientCard>
 * ```
 * 
 * ### 3. Custom Gradients
 * Use `customGradient` for complete control:
 * ```tsx
 * <GradientCard customGradient="linear-gradient(135deg, red, blue)">Content</GradientCard>
 * ```
 * 
 * ## Theme Awareness
 * All gradients automatically adapt to the current theme's color palette and light/dark mode.
 * 
 * ## Migration from Legacy API
 * - `gradient="teal"` → `from="accent-7" to="accent-10"`
 * - `gradient="blue"` → `from="accent-6" to="accent-10"`  
 * - `gradient="purple"` → `from="accent-7" to="accent-11"`
 */
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  /**
   * Simple gradient range from background to accent (0-100)
   * 0 = barely visible (background → accent-1)
   * 25 = soft (background → accent-4)
   * 50 = moderate (background → accent-8) 
   * 75 = strong (background → accent-10)
   * 100 = maximum (background → accent-12)
   */
  range?: number;
  
  /**
   * Advanced gradient: color scale to start from
   * Supports: "accent-1" through "accent-12", "neutral-1" through "neutral-12"
   * Must be used with `to` prop
   */
  from?: string;
  
  /**
   * Advanced gradient: color scale to end at
   * Supports: "accent-1" through "accent-12", "neutral-1" through "neutral-12"
   * Must be used with `from` prop
   */
  to?: string;
  
  /**
   * Custom gradient definition (overrides all other gradient props)
   * Example: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
   */
  customGradient?: string;
  /**
   * Enable shimmer animation on hover
   * @default true
   */
  shimmer?: boolean;
  /**
   * Overlay opacity for better text readability (0-1)
   * @default 0
   */
  overlayOpacity?: number;
  /**
   * Card header content
   */
  header?: React.ReactNode;
  /**
   * Card title
   */
  title?: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  /**
   * Main card content
   */
  children?: React.ReactNode;
}

/**
 * Maps a 0-100 range value to an accent level (1-12)
 */
const rangeToAccentLevel = (range: number): number => {
  // Clamp range to 0-100
  const clampedRange = Math.max(0, Math.min(100, range));
  // Map 0-100 to accent levels 1-12
  return Math.round(1 + (clampedRange / 100) * 11);
};

/**
 * Generates Tailwind class for simple background-to-accent gradients
 */
const getSimpleGradientClass = (range: number): string => {
  const accentLevel = rangeToAccentLevel(range);
  return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
};

/**
 * Parses color scale string and returns CSS variable name
 */
const parseColorScale = (colorScale: string): string => {
  // Validate format: "accent-1" to "accent-12", "neutral-1" to "neutral-12"
  const match = colorScale.match(/^(accent|neutral)-(\d+)$/);
  if (!match) {
    console.warn(`Invalid color scale format: "${colorScale}". Expected format: "accent-1" to "accent-12" or "neutral-1" to "neutral-12"`);
    return 'var(--color-accent-8)'; // fallback
  }
  
  const [, type, level] = match;
  const levelNum = parseInt(level, 10);
  
  // Validate level range
  if (levelNum < 1 || levelNum > 12) {
    console.warn(`Invalid color level: ${level}. Must be between 1-12`);
    return 'var(--color-accent-8)'; // fallback
  }
  
  return `var(--color-${type}-${levelNum})`;
};

/**
 * Generates Tailwind class for advanced accent-to-accent gradients
 */
const getAdvancedGradientClass = (from: string, to: string): string => {
  const fromVar = parseColorScale(from);
  const toVar = parseColorScale(to);
  return `bg-gradient-to-br from-[${fromVar}] to-[${toVar}]`;
};

/**
 * GradientCard component with theme-aware gradient backgrounds and accessibility features.
 * 
 * Provides a dual gradient system that automatically adapts to theme changes:
 * - Simple range-based gradients (background → accent-X)
 * - Advanced accent-to-accent gradients (accent-X → accent-Y)  
 * - Full custom gradient support
 * 
 * Features:
 * - 🎨 Theme-aware color adaptation (light/dark modes)
 * - 🎯 Dual control system (simple + advanced)
 * - ⚡ Memoized gradient computation for performance
 * - ✅ Full TypeScript support with validation
 * - ♿ Accessibility-first design
 * - ✨ Optional shimmer animation
 * 
 * @example
 * ```tsx
 * // Simple gradient
 * <GradientCard range={75}>Simple content</GradientCard>
 * 
 * // Advanced gradient  
 * <GradientCard from="accent-7" to="accent-10">Advanced content</GradientCard>
 * 
 * // With additional features
 * <GradientCard 
 *   from="accent-9" 
 *   to="accent-11"
 *   shimmer={true}
 *   overlayOpacity={0.1}
 *   title="Card Title"
 *   description="Card description"
 * >
 *   Card content
 * </GradientCard>
 * ```
 */
export function GradientCard({
  range,
  from,
  to,
  customGradient,
  shimmer = true,
  overlayOpacity = 0,
  radius = 'md',
  state,
  header,
  title,
  description,
  footer,
  children,
  className,
  style,
  ...props
}: GradientCardProps) {
  // Prop validation for gradient systems
  React.useEffect(() => {
    // Warn if both systems used simultaneously
    if (range !== undefined && (from !== undefined || to !== undefined)) {
      console.warn('GradientCard: Cannot use both range and from/to props. Range will be ignored.');
    }
    
    // Validate incomplete advanced gradient props
    if ((from !== undefined && to === undefined) || (from === undefined && to !== undefined)) {
      console.warn('GradientCard: Both from and to props must be provided together for advanced gradients.');
    }
  }, [range, from, to]);

  // Build the gradient classes with memoization
  const gradientClasses = useMemo(() => {
    if (customGradient) return '';
    
    // Advanced: from/to gradients (highest precedence after customGradient)
    if (from !== undefined && to !== undefined) {
      return getAdvancedGradientClass(from, to);
    } 
    
    // Simple: range-based gradients
    if (range !== undefined) {
      return getSimpleGradientClass(range);
    }
    
    // Default fallback
    return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
  }, [customGradient, range, from, to]);

  // Build shimmer classes
  const shimmerClasses = shimmer 
    ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000'
    : '';

  // Build overlay classes
  const overlayClasses = overlayOpacity > 0 
    ? 'relative after:absolute after:inset-0 after:bg-foreground/80 after:pointer-events-none'
    : '';

  // Custom styles for custom gradient and overlay
  const customStyles: React.CSSProperties = {
    ...style,
    ...(customGradient && { background: customGradient }),
    ...(overlayOpacity > 0 && { '--overlay-opacity': overlayOpacity.toString() } as React.CSSProperties),
  };

  return (
    <Card
      className={cn(
        cardVariants({
          variant: 'default', // We'll override the background
          radius,
          state: state === 'hover' ? 'default' : state,
        }),
        // Override background with gradient
        gradientClasses,
        // Add shimmer effect
        shimmerClasses,
        // Add overlay support
        overlayClasses,
        // Custom classes
        className
      )}
      style={{
        ...customStyles,
        '--card-foreground': '#fff',
      } as React.CSSProperties}
      {...props}
    >
      {/* Overlay for better text readability */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-foreground/80 pointer-events-none rounded-[inherit]"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Card content with relative positioning to appear above overlay */}
      <div className="relative z-10">
        {(header || title || description) && (
          <CardHeader>
            {header}
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription className="text-card-foreground/80">{description}</CardDescription>}
          </CardHeader>
        )}
        
        {children && (
          <CardContent>
            {children}
          </CardContent>
        )}
        
        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </div>
    </Card>
  );
}