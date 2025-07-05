'use client';

import React, { useState, useEffect } from 'react';
import { cardVariants } from '@/lib/cardVariants';
import { CardVariantProps } from '@/types/cardVariants';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCard } from '@/components/cards/animations/AnimatedCard';
import { AnimatePresence } from 'framer-motion';

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
    { variant: 'default', size: 'sm', label: 'Default Small', description: 'Clean minimal design' },
    { variant: 'elevated', size: 'md', label: 'Elevated Medium', description: 'Hover to see lift effect' },
    { variant: 'bordered', size: 'lg', label: 'Bordered Large', description: 'Hover to see border change' },
    { variant: 'gradient', size: 'xl', label: 'Gradient Extra Large', description: 'Hover to see shimmer effect' },
    { variant: 'interactive', size: 'md', label: 'Interactive Medium', description: 'Hover to see scale effect' },
  ];

  const radiusVariants: Array<CardVariantProps & { label: string }> = [
    { variant: 'default', size: 'md', radius: 'none', label: 'Sharp Corners' },
    { variant: 'default', size: 'md', radius: 'sm', label: 'Subtle Rounded' },
    { variant: 'default', size: 'md', radius: 'md', label: 'Default Rounded' },
    { variant: 'default', size: 'md', radius: 'lg', label: 'More Rounded' },
    { variant: 'default', size: 'md', radius: 'xl', label: 'Very Rounded' },
  ];

  // Animation controls
  const [animEnabled, setAnimEnabled] = useState(true);
  const [animVariant, setAnimVariant] = useState<'fade-in' | 'slide-up' | 'scale-in'>('fade-in');
  const [animDuration, setAnimDuration] = useState(0.5);
  const [animStagger, setAnimStagger] = useState(false);
  const [showCards, setShowCards] = useState(true);

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

      {/* Animation Controls */}
            {/* Micro-Interactions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Micro-Interactions</h3>
        <div className="flex flex-wrap gap-4">
          <div className={cardVariants({ variant: 'default', size: 'md', radius: 'md', state: 'loading' })}>
            Loading Card
          </div>
          <div className={cardVariants({ variant: 'default', size: 'md', radius: 'md', state: 'success' })}>
            Success Card
          </div>
          <div className={cardVariants({ variant: 'default', size: 'md', radius: 'md', state: 'error' })}>
            Error Card
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={animEnabled} onChange={e => setAnimEnabled(e.target.checked)} />
          <span>Enable animations</span>
        </label>
        <label className="flex items-center space-x-2">
          <span>Variant:</span>
          <select value={animVariant} onChange={e => setAnimVariant(e.target.value as 'fade-in' | 'slide-up' | 'scale-in')} className="border rounded px-2 py-1">
            <option value="fade-in">Fade In</option>
            <option value="slide-up">Slide Up</option>
            <option value="scale-in">Scale In</option>
          </select>
        </label>
        <label className="flex items-center space-x-2">
          <span>Duration:</span>
          <input type="number" min="0" step="0.1" value={animDuration} onChange={e => setAnimDuration(parseFloat(e.target.value) || 0)} className="w-16 border rounded px-1 py-1" />
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={animStagger} onChange={e => setAnimStagger(e.target.checked)} />
          <span>Stagger children</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={showCards} onChange={e => setShowCards(e.target.checked)} />
          <span>Show cards</span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Animation Demo</h3>
        <div className="flex space-x-4">
          <AnimatePresence mode="wait">
            {showCards && (
              <>
                <AnimatedCard key={`card1-${animEnabled}-${animVariant}-${animDuration}-${animStagger}`} enabled={animEnabled} variant={animVariant} duration={animDuration} staggerChildren={animStagger} className="p-4 bg-background rounded-lg shadow">
                  <div className={cardVariants({ variant: 'interactive', size: 'md' })}>
                    <h4 className="font-semibold mb-2">Slide-Up Entry</h4>
                    <p className="text-sm opacity-80">Interactive Card</p>
                  </div>
                </AnimatedCard>
                <AnimatedCard key={`card2-${animEnabled}-${animVariant}-${animDuration}-${animStagger}`} enabled={animEnabled} variant={animVariant} duration={animDuration} staggerChildren={animStagger} className="p-4 bg-background rounded-lg shadow">
                  <div className={cardVariants({ variant: 'gradient', size: 'md' })}>
                    <h4 className="font-semibold mb-2">Fade-In Entry</h4>
                    <p className="text-sm opacity-80">Gradient Card</p>
                  </div>
                </AnimatedCard>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
