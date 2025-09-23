'use client';

import { HeroSection } from '../../lib/ui-core/components/hero/HeroSection';
import type { HeroContent } from '../../lib/ui-core/types/hero';

/**
 * Hero section test page
 * Quick testing page for hero section development
 */
export default function HeroTestPage() {
  // Test content for different gradient variants
  const simpleGradientContent: HeroContent = {
    title: 'Simple Range Gradient',
    subtitle: 'Using range-based gradient (75/100)',
    description: 'This hero uses the same gradient system as GradientCard',
    primaryCTA: {
      label: 'Get Started',
      href: '/get-started',
      variant: 'primary'
    },
    secondaryCTA: {
      label: 'Learn More',
      href: '/learn-more',
      variant: 'secondary'
    },
    background: {
      type: 'gradient',
      gradient: { from: 'accent-9', to: 'accent-8' }
    }
  };

  const advancedGradientContent: HeroContent = {
    title: 'Advanced Gradient',
    subtitle: 'Using from/to color scales',
    description: 'Accent-1 to Accent-8 gradient for rich colors',
    background: {
      type: 'gradient',
      gradient: { from: 'accent-1', to: 'accent-8' }
    }
  };

  const customGradientContent: HeroContent = {
    title: 'Custom Gradient',
    subtitle: 'Using custom CSS gradient',
    description: 'Full control over gradient definition',
    background: {
      type: 'gradient',
      gradient: { custom: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    }
  };

  // Test content for image backgrounds
  const imageBackgroundContent: HeroContent = {
    title: 'Image Background Hero',
    subtitle: 'With automatic format optimization',
    description: 'This hero supports WebP/AVIF optimization, loading states, and fallback handling',
    primaryCTA: {
      label: 'Explore Features',
      href: '/features',
      variant: 'primary'
    },
    secondaryCTA: {
      label: 'View Gallery',
      href: '/gallery',
      variant: 'outline'
    },
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
      position: 'center center',
      size: 'cover'
    },
    overlay: {
      opacity: 0.4,
      color: '#000000'
    }
  };

  const imageWithCustomPositionContent: HeroContent = {
    title: 'Custom Positioned Image',
    subtitle: 'Background image with top positioning',
    description: 'Demonstrates different background positioning and sizing options',
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      position: 'top center',
      size: 'cover'
    },
    overlay: {
      opacity: 0.3,
      color: '#1a1a1a'
    }
  };

  const imageContainContent: HeroContent = {
    title: 'Contained Image Background',
    subtitle: 'Using background-size: contain',
    description: 'Shows how images can be contained rather than cropped',
    background: {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop',
      position: 'center center',
      size: 'contain'
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold p-4 text-center">Hero Section Test Page</h1>

      {/* Basic hero test with default gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Basic Hero (Default Gradient)</h2>
        <HeroSection size="md" />
      </div>

      {/* Simple range gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Simple Range Gradient</h2>
        <HeroSection
          content={simpleGradientContent}
          size="md"
        />
      </div>

      {/* Advanced from/to gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Advanced From/To Gradient</h2>
        <HeroSection
          content={advancedGradientContent}
          size="md"
        />
      </div>

      {/* Custom gradient */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Custom CSS Gradient</h2>
        <HeroSection
          content={customGradientContent}
          size="md"
        />
      </div>

      {/* Image background with overlay */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Image Background with Overlay</h2>
        <HeroSection
          content={imageBackgroundContent}
          size="lg"
        />
      </div>

      {/* Custom positioned image */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Custom Positioned Image</h2>
        <HeroSection
          content={imageWithCustomPositionContent}
          size="md"
          contentPosition="left"
        />
      </div>

      {/* Contained image */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Contained Image Background</h2>
        <HeroSection
          content={imageContainContent}
          size="sm"
          contentPosition="right"
        />
      </div>

      {/* Fullscreen image hero */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold p-4">Fullscreen Image Hero</h2>
        <HeroSection
          content={{
            title: 'Fullscreen Hero Experience',
            subtitle: 'Taking up the full viewport height',
            description: 'Perfect for landing pages and impactful first impressions',
            primaryCTA: {
              label: 'Get Started',
              href: '/get-started',
              variant: 'primary'
            },
            secondaryCTA: {
              label: 'Learn More',
              href: '/learn-more',
              variant: 'outline'
            },
            background: {
              type: 'image',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
              position: 'center center',
              size: 'cover'
            },
            overlay: {
              opacity: 0.5,
              color: '#000000'
            }
          }}
          size="xl"
          variant="fullscreen"
          contentPosition="center"
        />
      </div>
    </div>
  );
}