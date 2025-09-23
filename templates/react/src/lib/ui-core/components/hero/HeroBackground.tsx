import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';
import { HeroBackgroundProps } from '../../types/hero';
import { buildGradientClasses } from '../../utils/gradientUtils';

export function HeroBackground({ config, className, onLoad, onError }: HeroBackgroundProps) {
  const gradientClasses = useMemo(() => {
    if (config.type !== 'gradient' || !config.gradient) {
      return '';
    }

    const gradient = config.gradient;
    return buildGradientClasses(gradient.range, gradient.from, gradient.to, gradient.custom);
  }, [config.gradient, config.type]);

  // Custom styles for custom gradient
  const customStyles: React.CSSProperties = {};
  if (config.type === 'gradient' && config.gradient?.custom) {
    customStyles.background = config.gradient.custom;
  }

  // Handle different background types
  if (config.type === 'gradient') {
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full',
          gradientClasses,
          className
        )}
        style={customStyles}
      />
    );
  }

  // Placeholder for other background types (image, video, slides)
  return (
    <div className={cn('absolute inset-0 w-full h-full bg-gray-100', className)}>
      <div className="flex items-center justify-center h-full text-gray-500">
        Background type "{config.type}" - Coming soon
      </div>
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';