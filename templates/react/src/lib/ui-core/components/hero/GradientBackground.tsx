'use client';

import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';
import { buildGradientClasses } from '../../utils/gradientUtils';

interface GradientBackgroundProps {
  config: {
    gradient: {
      range?: number;
      from?: string;
      to?: string;
      custom?: string;
    };
  };
  className?: string;
}

export function GradientBackground({ config, className }: GradientBackgroundProps) {
  const gradientClasses = useMemo(() => {
    const gradient = config.gradient;
    return buildGradientClasses(gradient.range, gradient.from, gradient.to, gradient.custom);
  }, [config.gradient]);

  // Background styles for custom gradients
  const backgroundStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (config.gradient?.custom) {
      styles.background = config.gradient.custom;
    }

    return styles;
  }, [config.gradient]);

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full',
        gradientClasses,
        className
      )}
      style={backgroundStyles}
    />
  );
}

GradientBackground.displayName = 'GradientBackground';