import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cardVariants } from '@/lib/cardVariants';
import type { CardVariantProps } from '@/types/cardVariants';

/**
 * Gradient preset definitions for the GradientCard component
 */
export type GradientPreset = 'teal' | 'blue' | 'purple' | 'sunset' | 'ocean';

/**
 * Props for the GradientCard component
 */
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  /**
   * Predefined gradient preset to use
   * @default 'teal'
   */
  gradient?: GradientPreset;
  /**
   * Custom gradient definition (overrides preset)
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
 * Gradient preset configurations
 */
const gradientPresets: Record<GradientPreset, string> = {
  teal: 'bg-gradient-to-br from-teal-500 to-green-500',
  blue: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  purple: 'bg-gradient-to-br from-purple-500 to-pink-500',
  sunset: 'bg-gradient-to-br from-orange-500 to-red-500',
  ocean: 'bg-gradient-to-br from-blue-600 to-teal-600',
};

/**
 * GradientCard component with sophisticated gradient backgrounds and accessibility features
 */
export function GradientCard({
  gradient = 'teal',
  customGradient,
  shimmer = true,
  overlayOpacity = 0,
  size = 'md',
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
  // Build the gradient classes
  const gradientClasses = customGradient 
    ? '' 
    : gradientPresets[gradient];

  // Build shimmer classes
  const shimmerClasses = shimmer 
    ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000'
    : '';

  // Build overlay classes
  const overlayClasses = overlayOpacity > 0 
    ? 'relative after:absolute after:inset-0 after:bg-black after:pointer-events-none'
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
          size,
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
          className="absolute inset-0 bg-black pointer-events-none rounded-[inherit]"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Card content with relative positioning to appear above overlay */}
      <div className="relative z-10">
        {(header || title || description) && (
          <CardHeader>
            {header}
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription className="text-white/80">{description}</CardDescription>}
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
