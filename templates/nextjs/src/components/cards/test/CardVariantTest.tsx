'use client';

import React, { useState, useEffect } from 'react';
import { cardVariants } from '@/lib/cardVariants';
import { CardVariantProps } from '@/types/cardVariants';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Test component to verify the card variant system works correctly
 */
export function CardVariantTest() {
  const [isDark, setIsDark] = useState(false);
  const [, setMounted] = useState(false);

  // Handle hydration-safe theme detection
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  const testVariants: Array<CardVariantProps & { label: string; description: string }> = [
    { variant: 'base', size: 'sm', label: 'Base Small', description: 'Clean minimal design' },
    { variant: 'elevated', size: 'md', label: 'Elevated Medium', description: 'Hover to see lift effect' },
    { variant: 'bordered', size: 'lg', label: 'Bordered Large', description: 'Hover to see border change' },
    { variant: 'gradient', size: 'xl', label: 'Gradient Extra Large', description: 'Hover to see shimmer effect' },
    { variant: 'interactive', size: 'md', label: 'Interactive Medium', description: 'Hover to see scale effect' },
  ];

  const radiusVariants: Array<CardVariantProps & { label: string }> = [
    { variant: 'base', size: 'md', radius: 'none', label: 'Sharp Corners' },
    { variant: 'base', size: 'md', radius: 'sm', label: 'Subtle Rounded' },
    { variant: 'base', size: 'md', radius: 'md', label: 'Default Rounded' },
    { variant: 'base', size: 'md', radius: 'lg', label: 'More Rounded' },
    { variant: 'base', size: 'md', radius: 'xl', label: 'Very Rounded' },
  ];

  return (
    <div className={cn('p-8 space-y-8 min-h-screen transition-colors', isDark ? 'dark' : '')}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Card Variant System Test</h2>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? 'Switch to Light' : 'Switch to Dark'}
        </Button>
      </div>
      
      {/* Current Mode Indicator */}
      <div className="text-center p-4 bg-muted rounded-lg mb-6">
        <p className="text-lg font-medium">
          Current Mode: <span className="text-teal-500">{isDark ? 'Dark' : 'Light'}</span>
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Size & Style Variants</h3>
        <div className="flex flex-wrap gap-4 justify-start items-start">
          {testVariants.map((props, index) => (
            <div
              key={index}
              className={cardVariants({
                variant: props.variant,
                size: props.size,
                radius: props.radius,
              })}
            >
              <h4 className="font-semibold mb-2">{props.label}</h4>
              <p className="text-sm opacity-80 mb-2">
                {props.description}
              </p>
              <p className="text-xs opacity-60">
                Variant: {props.variant} | Size: {props.size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Corner Radius Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {radiusVariants.map((props, index) => (
            <div
              key={index}
              className={cardVariants({
                variant: props.variant,
                size: props.size,
                radius: props.radius,
              })}
            >
              <h4 className="font-semibold mb-2">{props.label}</h4>
              <p className="text-sm opacity-80">
                Radius: {props.radius}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
