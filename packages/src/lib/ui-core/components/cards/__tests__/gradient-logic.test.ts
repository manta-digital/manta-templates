/**
 * GradientCard Logic Tests
 * Tests the utility functions and gradient class generation logic
 */

import { describe, test, expect } from 'vitest';

// Utility functions replicated from the component for testing
const rangeToAccentLevel = (range: number): number => {
  const clampedRange = Math.max(0, Math.min(100, range));
  return Math.round(1 + (clampedRange / 100) * 11);
};

const getSimpleGradientClass = (range: number): string => {
  const accentLevel = rangeToAccentLevel(range);
  return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
};

const parseColorScale = (colorScale: string): string => {
  const match = colorScale.match(/^(accent|neutral)-(\d+)$/);
  if (!match) return 'var(--color-accent-8)';
  
  const [, type, level] = match;
  const levelNum = parseInt(level, 10);
  if (levelNum < 1 || levelNum > 12) return 'var(--color-accent-8)';
  
  return `var(--color-${type}-${levelNum})`;
};

const getAdvancedGradientClass = (from: string, to: string): string => {
  const fromVar = parseColorScale(from);
  const toVar = parseColorScale(to);
  return `bg-gradient-to-br from-[${fromVar}] to-[${toVar}]`;
};

describe('GradientCard Logic', () => {
  describe('Range to Accent Level Mapping', () => {
    test('maps range values correctly', () => {
      expect(rangeToAccentLevel(0)).toBe(1);
      expect(rangeToAccentLevel(25)).toBe(4);  // 1 + (25/100 * 11) = 3.75 → 4
      expect(rangeToAccentLevel(50)).toBe(7);  // 1 + (50/100 * 11) = 6.5 → 7
      expect(rangeToAccentLevel(75)).toBe(9);  // 1 + (75/100 * 11) = 9.25 → 9
      expect(rangeToAccentLevel(100)).toBe(12);
    });

    test('clamps invalid range values', () => {
      expect(rangeToAccentLevel(-10)).toBe(1);  // Clamped to 0
      expect(rangeToAccentLevel(150)).toBe(12); // Clamped to 100
    });
  });

  describe('Simple Gradient Class Generation', () => {
    test('generates correct gradient classes', () => {
      expect(getSimpleGradientClass(0)).toBe('bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-1)]');
      expect(getSimpleGradientClass(50)).toBe('bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-7)]');
      expect(getSimpleGradientClass(100)).toBe('bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-12)]');
    });
  });

  describe('Color Scale Parsing', () => {
    test('parses valid color scales', () => {
      expect(parseColorScale('accent-7')).toBe('var(--color-accent-7)');
      expect(parseColorScale('neutral-3')).toBe('var(--color-neutral-3)');
      expect(parseColorScale('accent-12')).toBe('var(--color-accent-12)');
    });

    test('returns fallback for invalid input', () => {
      expect(parseColorScale('invalid')).toBe('var(--color-accent-8)');
      expect(parseColorScale('accent-15')).toBe('var(--color-accent-8)'); // Invalid level
      expect(parseColorScale('accent-0')).toBe('var(--color-accent-8)');  // Invalid level
    });
  });

  describe('Advanced Gradient Class Generation', () => {
    test('generates correct accent-to-accent gradients', () => {
      expect(getAdvancedGradientClass('accent-7', 'accent-10')).toBe(
        'bg-gradient-to-br from-[var(--color-accent-7)] to-[var(--color-accent-10)]'
      );
      
      expect(getAdvancedGradientClass('neutral-2', 'accent-8')).toBe(
        'bg-gradient-to-br from-[var(--color-neutral-2)] to-[var(--color-accent-8)]'
      );
    });

    test('handles mixed color types', () => {
      expect(getAdvancedGradientClass('neutral-5', 'accent-11')).toBe(
        'bg-gradient-to-br from-[var(--color-neutral-5)] to-[var(--color-accent-11)]'
      );
    });

    test('falls back to default for invalid scales', () => {
      expect(getAdvancedGradientClass('invalid', 'accent-8')).toBe(
        'bg-gradient-to-br from-[var(--color-accent-8)] to-[var(--color-accent-8)]'
      );
    });
  });
});