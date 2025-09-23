'use client';

import React from 'react';
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
    background: {
      type: 'gradient',
      gradient: { range: 75 }
    }
  };

  const advancedGradientContent: HeroContent = {
    title: 'Advanced Gradient',
    subtitle: 'Using from/to color scales',
    description: 'Accent-7 to Accent-11 gradient for rich colors',
    background: {
      type: 'gradient',
      gradient: { from: 'accent-7', to: 'accent-11' }
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
    </div>
  );
}