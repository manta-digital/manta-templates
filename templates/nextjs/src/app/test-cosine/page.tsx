"use client";

import React from 'react';
import { CosineTerrainCard } from '@manta-templates/ui-core';

export default function TestCosinePage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">CosineTerrainCard – Minimal Demo</h1>
      <div className="w-full max-w-5xl mx-auto">
        <CosineTerrainCard
          className="w-full h-[480px]"
          variant="raw"
          // Mirror working defaults explicitly for reliability
          renderPreset="wireframe"
          materialType="basic"
          materialOpacity={0.95}
          backgroundAlpha={0}
          showFPS={true}
          cameraFarPlane={28000}
          fov={60}
          speed={2400}
          cameraHeight={3600}
          followTerrain={true}
          lookAheadDistance={8100}
          lookAtHeight={1024}
          terrainScale={2048}
          terrainFrequency={0.000113}
          terrainAmplitude={2400}
          terrainEquation="multiplicative"
          xAmplitudeMultiplier={1.2}
          zAmplitudeMultiplier={1.0}
          enableAmplitudeVariation={true}
          amplitudeVariationFrequency={0.000233}
          amplitudeVariationIntensity={1.73}
          meshResolution={8}
          tilesX={20}
          tilesZ={65}
          enableDynamicTilesX={true}
          maxPixelRatio={2}
          recycleChunkSize={128}
        />
      </div>
    </main>
  );
}


