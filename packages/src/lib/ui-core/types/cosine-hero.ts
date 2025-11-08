/**
 * CosineHero component type definitions
 *
 * Provides interfaces for the CosineHero component, which renders
 * an animated cosine terrain background with overlaid content.
 */

import type { CosineTerrainCardProps } from '../components/cards/CosineTerrainCard';

/**
 * Call-to-action button configuration
 */
export interface CosineHeroCTA {
  /** Button label text */
  label: string;
  /** Link destination */
  href: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Whether link should open in new tab */
  external?: boolean;
}

/**
 * CosineHero component props
 *
 * Creates a full-width hero section with an animated cosine terrain
 * background and overlaid content (title, subtitle, CTAs).
 *
 * @example
 * ```tsx
 * <CosineHero
 *   title="Welcome"
 *   subtitle="Beautiful animated backgrounds"
 *   primaryCTA={{ label: "Get Started", href: "/start" }}
 * />
 * ```
 */
export interface CosineHeroProps {
  // ========== Content Props ==========

  /** Hero title text */
  title?: string;

  /** Hero subtitle text */
  subtitle?: string;

  /** Hero description text */
  description?: string;

  /** Primary call-to-action button */
  primaryCTA?: CosineHeroCTA;

  /** Secondary call-to-action button */
  secondaryCTA?: CosineHeroCTA;

  // ========== Layout Props ==========

  /** Content horizontal alignment */
  contentPosition?: 'left' | 'center' | 'right';

  /** Overlay opacity for better text contrast (0-1) */
  overlayOpacity?: number;

  // ========== Theme Props ==========

  /** Terrain material color (supports theme CSS variables like 'var(--color-accent-11)') */
  materialColor?: string | number;

  /** Background color (supports theme CSS variables like 'var(--color-background)') */
  backgroundColor?: string | number;

  /** Background alpha transparency (0-1) */
  backgroundAlpha?: number;

  // ========== Advanced Props ==========

  /** Pass-through settings for CosineTerrainCard customization */
  terrainSettings?: Partial<CosineTerrainCardProps>;

  // ========== Standard Props ==========

  /** Additional CSS classes */
  className?: string;

  /** Custom content (alternative to title/subtitle/description props) */
  children?: React.ReactNode;
}
