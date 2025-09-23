import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';

/**
 * Maps a 0-100 range value to an accent level (1-12)
 * Reused from GradientCard implementation
 */
const rangeToAccentLevel = (range: number): number => {
  // Clamp range to 0-100
  const clampedRange = Math.max(0, Math.min(100, range));
  // Map 0-100 to accent levels 1-12
  return Math.round(1 + (clampedRange / 100) * 11);
};

/**
 * Generates Tailwind class for simple background-to-accent gradients
 * Reused from GradientCard implementation
 */
const getSimpleGradientClass = (range: number): string => {
  const accentLevel = rangeToAccentLevel(range);
  return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
};

/**
 * Parses color scale string and returns CSS variable name
 * Reused from GradientCard implementation
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
 * Reused from GradientCard implementation
 */
const getAdvancedGradientClass = (from: string, to: string): string => {
  const fromVar = parseColorScale(from);
  const toVar = parseColorScale(to);
  return `bg-gradient-to-br from-[${fromVar}] to-[${toVar}]`;
};

/**
 * Hero background component
 *
 * Handles different background types: image, video, slides, gradient.
 * Manages background loading states and fallbacks.
 * Uses the same gradient system as GradientCard for consistency.
 */
export function HeroBackground({ config, className, onLoad, onError }: HeroBackgroundProps) {
  // Build gradient classes using GradientCard logic
  const gradientClasses = useMemo(() => {
    if (config.type !== 'gradient' || !config.gradient) {
      return '';
    }

    const gradient = config.gradient;

    // Custom gradient (highest precedence)
    if (gradient.custom) {
      return '';
    }

    // Advanced: from/to gradients
    if (gradient.from !== undefined && gradient.to !== undefined) {
      return getAdvancedGradientClass(gradient.from, gradient.to);
    }

    // Simple: range-based gradients
    if (gradient.range !== undefined) {
      return getSimpleGradientClass(gradient.range);
    }

    // Default fallback
    return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
  }, [config.gradient, config.type]);

  // Custom styles for custom gradient
  const customStyles: React.CSSProperties = {};
  if (config.type === 'gradient' && config.gradient?.custom) {
    customStyles.background = config.gradient.custom;
  }

  // Handle different background types
  if (config.type === 'gradient') {
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full',
          gradientClasses,
          className
        )}
        style={customStyles}
      />
    );
  }

  // Placeholder for other background types (image, video, slides)
  return (
    <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
      <div className="flex items-center justify-center h-full text-gray-500">
        Background type "{config.type}" - Coming soon
      </div>
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';