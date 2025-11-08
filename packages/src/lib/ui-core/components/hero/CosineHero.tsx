'use client';

import React from 'react';
import { CosineTerrainCard } from '../cards/CosineTerrainCard';
import { cn } from '../../utils/cn';
import type { CosineHeroProps } from '../../types/cosine-hero';

/**
 * CosineHero - Hero section with animated cosine terrain background
 *
 * Renders a full-width hero section with the CosineTerrainCard as an
 * animated background and content (title, subtitle, CTAs) overlaid on top.
 *
 * Uses a three-layer z-index system:
 * - Layer 0 (z-0): Terrain background (absolute positioned)
 * - Layer 1 (z-10): Optional overlay for text contrast
 * - Layer 2 (z-20): Content (relative positioned)
 *
 * @example
 * ```tsx
 * <CosineHero
 *   title="Welcome"
 *   subtitle="Beautiful animated backgrounds"
 *   primaryCTA={{ label: "Get Started", href: "/start" }}
 * />
 * ```
 *
 * @example With overlay for better contrast
 * ```tsx
 * <CosineHero
 *   title="Welcome"
 *   overlayOpacity={0.3}
 *   primaryCTA={{ label: "Get Started", href: "/start" }}
 * />
 * ```
 *
 * @example Custom content via children
 * ```tsx
 * <CosineHero overlayOpacity={0.2}>
 *   <CustomHeroContent />
 * </CosineHero>
 * ```
 *
 * @example Custom terrain colors
 * ```tsx
 * <CosineHero
 *   title="Welcome"
 *   materialColor="var(--color-accent-11)"
 *   backgroundColor="var(--color-background)"
 *   backgroundAlpha={0}
 * />
 * ```
 *
 * @example Pass-through terrain settings
 * ```tsx
 * <CosineHero
 *   title="Welcome"
 *   terrainSettings={{
 *     speed: 1200,
 *     terrainFrequency: 0.0002,
 *     renderPreset: 'wireframe',
 *   }}
 * />
 * ```
 */
export const CosineHero: React.FC<CosineHeroProps> = ({
  // Content props
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  // Layout props
  contentPosition = 'center',
  overlayOpacity = 0,
  // Theme props
  materialColor = 'var(--color-accent-11)',
  backgroundColor = 'var(--color-background)',
  backgroundAlpha = 0,
  // Advanced props
  terrainSettings = {},
  // Standard props
  className,
  children,
}) => {
  return (
    <div
      className={cn('relative w-full', className)}
    >
      {/* Layer 1: Background Terrain (z-0) */}
      <CosineTerrainCard
        variant="raw"
        className="absolute inset-0 z-0"
        renderPreset="wireframe"
        materialType="basic"
        materialColor={materialColor}
        backgroundColor={backgroundColor}
        backgroundAlpha={backgroundAlpha}
        {...terrainSettings}
      />

      {/* Layer 2: Optional Overlay for Contrast (z-10) */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 z-10 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Layer 3: Content (z-20) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className={cn(
          'max-w-4xl px-6 pointer-events-auto',
          contentPosition === 'center' && 'text-center mx-auto',
          contentPosition === 'left' && 'text-left ml-0 mr-auto',
          contentPosition === 'right' && 'text-right mr-0 ml-auto',
        )}>
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {title}
            </h1>
          )}

          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 text-white/90">
              {subtitle}
            </h2>
          )}

          {description && (
            <p className="text-base md:text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className={cn(
              'flex gap-4',
              contentPosition === 'center' && 'justify-center',
              contentPosition === 'left' && 'justify-start',
              contentPosition === 'right' && 'justify-end',
            )}>
              {primaryCTA && (
                <a
                  href={primaryCTA.href}
                  onClick={primaryCTA.onClick}
                  className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors"
                  {...(primaryCTA.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  })}
                >
                  {primaryCTA.label}
                </a>
              )}

              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  onClick={secondaryCTA.onClick}
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                  {...(secondaryCTA.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  })}
                >
                  {secondaryCTA.label}
                </a>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

CosineHero.displayName = 'CosineHero';
