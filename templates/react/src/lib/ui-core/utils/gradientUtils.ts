/**
 * Gradient utility functions
 * Shared between GradientCard and HeroBackground components
 */

/**
 * Maps a 0-100 range value to an accent level (1-12)
 */
export const rangeToAccentLevel = (range: number): number => {
  const clampedRange = Math.max(0, Math.min(100, range));
  return Math.round(1 + (clampedRange / 100) * 11);
};

/**
 * Generates Tailwind class for simple background-to-accent gradients
 */
export const getSimpleGradientClass = (range: number): string => {
  const accentLevel = rangeToAccentLevel(range);
  return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
};

/**
 * Parses color scale string and returns CSS variable name
 */
export const parseColorScale = (colorScale: string): string => {
  const match = colorScale.match(/^(accent|neutral)-(\d+)$/);
  if (!match) {
    console.warn(`Invalid color scale format: "${colorScale}". Expected format: "accent-1" to "accent-12" or "neutral-1" to "neutral-12"`);
    return 'var(--color-accent-8)';
  }

  const [, type, level] = match;
  const levelNum = parseInt(level, 10);

  if (levelNum < 1 || levelNum > 12) {
    console.warn(`Invalid color level: ${level}. Must be between 1-12`);
    return 'var(--color-accent-8)';
  }

  return `var(--color-${type}-${levelNum})`;
};

/**
 * Generates Tailwind class for advanced accent-to-accent gradients
 */
export const getAdvancedGradientClass = (from: string, to: string): string => {
  const fromVar = parseColorScale(from);
  const toVar = parseColorScale(to);
  return `bg-gradient-to-br from-[${fromVar}] to-[${toVar}]`;
};

/**
 * Builds gradient classes using the same logic as GradientCard
 */
export const buildGradientClasses = (
  range?: number,
  from?: string,
  to?: string,
  customGradient?: string
): string => {
  if (customGradient) return '';

  // Advanced: from/to gradients
  if (from !== undefined && to !== undefined) {
    return getAdvancedGradientClass(from, to);
  }

  // Simple: range-based gradients
  if (range !== undefined) {
    return getSimpleGradientClass(range);
  }

  // Default fallback
  return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
};