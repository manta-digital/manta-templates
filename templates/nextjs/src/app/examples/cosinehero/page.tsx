'use client';

import { CosineHero } from '@/lib/ui-core/components/hero';

/**
 * CosineHero Examples Page
 */
export default function CosineHeroExamples() {
  return (
    <div className="min-h-screen bg-background">

      {/* Single test - bright green wireframe on black */}
      <CosineHero
        className="h-[100vh]"
        title="Welcome to Manta"
        subtitle="Beautiful animated backgrounds"
        primaryCTA={{ label: "Get Started", href: "#start" }}
      />

      {/*
      <div className="h-[600px] border-2 border-yellow-500">
        <CosineTerrainCard
          variant="raw"
          className="w-full h-full"
          renderPreset="wireframe"
          materialType="basic"
          materialColor={0x00ff00}
          backgroundColor={0x000000}
          backgroundAlpha={1}
        />
      </div>
      */}
    </div>
  );
}
