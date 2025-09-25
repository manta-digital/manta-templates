'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';
import { GradientBackground } from './GradientBackground';
import { ImageBackground } from './ImageBackground';
import { VideoBackground } from './VideoBackground';
import { SlideBackground } from './SlideBackground';

/**
 * HeroBackground orchestrator component that routes to specialized background handlers
 *
 * This component has been refactored from 900+ lines to under 100 lines by extracting
 * specialized components for each background type:
 * - GradientBackground: Handles gradient backgrounds
 * - ImageBackground: Handles static images with format optimization
 * - VideoBackground: Handles video backgrounds with mobile fallbacks
 * - SlideBackground: Handles slide backgrounds with transitions
 */
export function HeroBackground({ config, className, onLoad, onError, components }: HeroBackgroundProps) {
  // Handle different background types by routing to specialized components
  switch (config.type) {
    case 'gradient':
      if (!config.gradient) {
        return (
          <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
            <div className="flex items-center justify-center h-full text-gray-500">
              Gradient configuration missing
            </div>
          </div>
        );
      }
      return (
        <GradientBackground
          config={{ gradient: config.gradient! }}
          className={className}
        />
      );

    case 'image':
      if (!config.image) {
        return (
          <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
            <div className="flex items-center justify-center h-full text-gray-500">
              Image configuration missing
            </div>
          </div>
        );
      }
      return (
        <ImageBackground
          config={{
            image: config.image,
            imageDark: config.imageDark,
            position: config.position,
            size: config.size,
          }}
          className={className}
          onLoad={onLoad}
          onError={onError}
        />
      );

    case 'video':
      if (!config.video?.src) {
        return (
          <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
            <div className="flex items-center justify-center h-full text-gray-500">
              Video configuration missing
            </div>
          </div>
        );
      }
      return (
        <VideoBackground
          config={config.video}
          position={config.position}
          size={config.size}
          className={className}
          onLoad={onLoad}
          onError={onError}
        />
      );

    case 'slides':
      if (!config.slides?.items || config.slides.items.length === 0) {
        return (
          <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
            <div className="flex items-center justify-center h-full text-gray-500">
              No slides configured
            </div>
          </div>
        );
      }
      return (
        <SlideBackground
          config={config.slides}
          position={config.position}
          size={config.size}
          className={className}
          onLoad={onLoad}
          onError={onError}
        />
      );

    default:
      // Placeholder for unsupported background types
      return (
        <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
          <div className="flex items-center justify-center h-full text-gray-500">
            Background type "{config.type}" not supported
          </div>
        </div>
      );
  }
}

HeroBackground.displayName = 'HeroBackground';