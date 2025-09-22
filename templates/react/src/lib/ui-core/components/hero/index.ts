/**
 * Hero section components
 *
 * Exports all hero-related components for framework-agnostic
 * hero section implementation.
 */

export { HeroSection } from './HeroSection';
export { HeroBackground } from './HeroBackground';
export { HeroContent } from './HeroContent';
export { HeroText } from './HeroText';
export { HeroCTA } from './HeroCTA';
export { HeroOverlay } from './HeroOverlay';

// Re-export hero types for convenience
export type {
  HeroSectionProps,
  HeroBackgroundProps,
  HeroContentProps,
  HeroTextProps,
  HeroCTAProps,
  HeroOverlayProps,
  HeroContent as HeroContentConfig,
  HeroBackgroundConfig,
  HeroCTAConfig,
  HeroAnimationConfig,
  HeroFrameworkComponents,
  HeroSize,
  HeroContentPosition,
  HeroVariant,
  HeroTextSize,
} from '../../types/hero';