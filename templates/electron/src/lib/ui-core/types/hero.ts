/**
 * Hero section component type definitions
 *
 * Provides interfaces for hero section variants including static, video,
 * slides, and animated text heroes. Designed for framework-agnostic
 * implementation with dependency injection support.
 */

import { ReactNode } from 'react';

/**
 * Configuration for hero section background
 */
export interface HeroBackgroundConfig {
  /** Background type determines which variant to render */
  type: 'image' | 'video' | 'slides' | 'gradient';

  /** Static image background (light mode) */
  image?: string;

  /** Static image background (dark mode) */
  imageDark?: string;

  /** Video background configuration */
  video?: {
    /** Video source URL */
    src: string;
    /** Poster image displayed before video loads */
    poster?: string;
    /** Whether video should autoplay */
    autoPlay?: boolean;
    /** Whether video should loop */
    loop?: boolean;
    /** Whether video should be muted */
    muted?: boolean;
    /** Fallback image if video fails to load */
    fallbackImage?: string;
  };

  /** Slide carousel configuration */
  slides?: Array<{
    /** Slide background image */
    image: string;
    /** Optional slide-specific title */
    title?: string;
    /** Optional slide-specific subtitle */
    subtitle?: string;
    /** Slide display duration in milliseconds */
    duration?: number;
  }>;

  /** Gradient configuration - supports multiple formats */
  gradient?: {
    /** Simple gradient range from background to accent (0-100) */
    range?: number;
    /** Advanced gradient: color scale to start from */
    from?: string;
    /** Advanced gradient: color scale to end at */
    to?: string;
    /** Custom gradient definition (overrides other gradient props) */
    custom?: string;
  };

  /** Background position (CSS background-position values) */
  position?: string;

  /** Background size (CSS background-size values) */
  size?: string;
}

/**
 * Configuration for call-to-action buttons
 */
export interface HeroCTAConfig {
  /** Button text label */
  label: string;

  /** Button destination URL or path */
  href: string;

  /** Visual variant for the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /** Whether link should open in new tab */
  external?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Custom click handler */
  onClick?: () => void;
}

/**
 * Configuration for hero animations
 */
export interface HeroAnimationConfig {
  /** Text animation type */
  text?: 'fade' | 'slide' | 'typewriter' | 'stagger' | 'none';

  /** Background animation type */
  background?: 'parallax' | 'ken-burns' | 'zoom' | 'none';

  /** Animation duration in milliseconds */
  duration?: number;

  /** Animation delay in milliseconds */
  delay?: number;

  /** Animation easing function */
  easing?: string;

  /** Whether to respect prefers-reduced-motion */
  respectMotionPreference?: boolean;
}

/**
 * Main hero content configuration interface
 *
 * This interface defines all content and configuration options
 * for hero section variants.
 */
export interface HeroContent {
  /** Hero title (typically h1) */
  title: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Optional description text (supports HTML) */
  description?: string;

  /** Primary call-to-action button */
  primaryCTA?: HeroCTAConfig;

  /** Secondary call-to-action button */
  secondaryCTA?: HeroCTAConfig;

  /** Background configuration */
  background: HeroBackgroundConfig;

  /** Overlay configuration for better text contrast */
  overlay?: {
    /** Overlay opacity (0-1) */
    opacity: number;
    /** Overlay color (CSS color value) */
    color?: string;
    /** Overlay gradient (CSS gradient) */
    gradient?: string;
  };

  /** Animation configuration */
  animations?: HeroAnimationConfig;

  /** Accessibility options */
  accessibility?: {
    /** Alternative text for background images */
    backgroundAlt?: string;
    /** Aria label for the hero section */
    ariaLabel?: string;
    /** Whether to announce content changes to screen readers */
    announceChanges?: boolean;
  };
}

/**
 * Props for framework component injection
 */
export interface HeroFrameworkComponents {
  /** Framework-specific link component (e.g., Next.js Link, React Router Link) */
  LinkComponent?: React.ComponentType<any>;

  /** Framework-specific image component (e.g., Next.js Image) */
  ImageComponent?: React.ComponentType<any>;

  /** Framework-specific video component if needed */
  VideoComponent?: React.ComponentType<any>;
}

/**
 * Hero section variant types
 */
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeroContentPosition = 'left' | 'center' | 'right';
export type HeroVariant = 'default' | 'fullscreen' | 'split';
export type HeroTextSize = 'default' | 'sm' | 'md' | 'lg';

/**
 * Main HeroSection component props
 */
export interface HeroSectionProps {
  /** Hero content configuration */
  content?: HeroContent;

  /** Hero size variant */
  size?: HeroSize;

  /** Content positioning */
  contentPosition?: HeroContentPosition;

  /** Layout variant */
  variant?: HeroVariant;

  /** Text size variant */
  textSize?: HeroTextSize;

  /** Framework component injection */
  components?: HeroFrameworkComponents;

  /** Additional CSS classes */
  className?: string;

  /** Custom content to render instead of default text */
  children?: ReactNode;

  /** Callback fired when hero is fully loaded */
  onLoad?: () => void;

  /** Callback fired when hero encounters an error */
  onError?: (error: Error) => void;
}

/**
 * Props for individual hero components
 */
export interface HeroBackgroundProps {
  config: HeroBackgroundConfig;
  className?: string;
  components?: HeroFrameworkComponents;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export interface HeroTextProps {
  content: Pick<HeroContent, 'title' | 'subtitle' | 'description'>;
  textSize?: HeroTextSize;
  animation?: HeroAnimationConfig['text'];
  className?: string;
}

export interface HeroCTAProps {
  primaryCTA?: HeroCTAConfig;
  secondaryCTA?: HeroCTAConfig;
  components?: HeroFrameworkComponents;
  className?: string;
}

export interface HeroOverlayProps {
  config?: HeroContent['overlay'];
  className?: string;
}

export interface HeroContentProps {
  children: ReactNode;
  position?: HeroContentPosition;
  className?: string;
}