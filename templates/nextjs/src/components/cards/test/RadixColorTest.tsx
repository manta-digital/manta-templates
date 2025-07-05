'use client';

import React, { useState } from 'react';
import { EnhancedBaseCard } from '../EnhancedBaseCard';
import type { CardProps } from '@/lib/cardVariants';

const colorPalettes = [
  { 
    name: 'Custom Teal', 
    value: 'default', 
    description: 'Your custom Radix teal palette',
    colors: ['#14b8ad', '#1d6963', '#dafaf6'] // teal-9, teal-7, teal-3
  },
  { 
    name: 'Mintteal', 
    value: 'mintteal', 
    description: 'Your existing brand color',
    colors: ['#A7F5D8', '#2d5545', '#e6fbf2'] // mintteal-9, mintteal-7, mintteal-3
  },
  { 
    name: 'Blue', 
    value: 'blue', 
    description: 'Standard Radix blue',
    colors: ['#0090ff', '#96c7f2', '#edf6ff'] // blue-9, blue-7, blue-3
  },
  { 
    name: 'Purple', 
    value: 'purple', 
    description: 'Standard Radix purple',
    colors: ['#8e4ec6', '#d1afec', '#f7edfe'] // purple-9, purple-7, purple-3
  },
  { 
    name: 'Green', 
    value: 'green', 
    description: 'Standard Radix green',
    colors: ['#30a46c', '#92ceac', '#e9f9ee'] // green-9, green-7, green-3
  },
];

const cardVariants = [
  { name: 'Default', value: 'default' },
  { name: 'Bordered', value: 'bordered' },
  { name: 'Gradient', value: 'gradient' },
  { name: 'Interactive', value: 'interactive' },
  { name: 'Elevated', value: 'elevated' },
  { name: 'Accent', value: 'accent' },
  { name: 'Surface', value: 'surface' },
];

export function RadixColorTest() {
  const [selectedPalette, setSelectedPalette] = useState('default');

  return (
    <div className="p-8 space-y-8" data-palette={selectedPalette}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Radix Color Palette Test
        </h1>
        <p className="text-muted-foreground">
          Test your custom Radix color palettes with different card variants. 
          Switch between palettes to see the semantic color system in action.
        </p>
      </div>

      {/* Palette Selector */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {colorPalettes.map((palette) => (
            <button
              key={palette.value}
              onClick={() => setSelectedPalette(palette.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedPalette === palette.value
                  ? 'border-[var(--color-accent-9)] bg-[var(--color-accent-3)] text-[var(--color-accent-12)]'
                  : 'border-gray-200 hover:border-[var(--color-accent-7)] dark:border-gray-700 bg-card text-card-foreground'
              }`}
            >
              <div className="font-medium">{palette.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {palette.description}
              </div>
              <div className="flex space-x-1 mt-2">
                <div 
                  className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600" 
                  style={{ backgroundColor: palette.colors[0] }}
                />
                <div 
                  className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600" 
                  style={{ backgroundColor: palette.colors[1] }}
                />
                <div 
                  className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600" 
                  style={{ backgroundColor: palette.colors[2] }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Scale Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Radix Color Scale (1-12)</h2>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
            <div key={step} className="space-y-2">
              <div 
                className="w-full h-16 rounded border"
                style={{ backgroundColor: `var(--color-accent-${step})` }}
              />
              <div className="text-xs text-center">
                <div className="font-medium">Step {step}</div>
                <div className="text-muted-foreground">
                  {step === 1 && 'App BG'}
                  {step === 2 && 'Subtle BG'}
                  {step === 3 && 'UI BG'}
                  {step === 4 && 'Hover BG'}
                  {step === 5 && 'Active BG'}
                  {step === 6 && 'Borders'}
                  {step === 7 && 'UI Border'}
                  {step === 8 && 'Hover Border'}
                  {step === 9 && 'Accent'}
                  {step === 10 && 'Hover Accent'}
                  {step === 11 && 'Low Text'}
                  {step === 12 && 'High Text'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Variants */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardVariants.map((variant) => (
            <EnhancedBaseCard 
              key={variant.value}
              variant={variant.value as CardProps['variant']}
              className="p-6"
            >
              <h3 className="font-semibold mb-2">{variant.name} Card</h3>
              <p className={`text-sm mb-4 ${
                variant.value === 'gradient' 
                  ? 'text-white/90' 
                  : 'text-muted-foreground'
              }`}>
                This is a {variant.name.toLowerCase()} card variant using semantic colors.
                The colors automatically adapt to the selected palette.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent-9)]" />
                <span className="text-xs">Accent Color</span>
              </div>
            </EnhancedBaseCard>
          ))}
        </div>
      </div>

      {/* Semantic Colors Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Semantic Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[var(--color-card-accent-subtle)] border border-[var(--color-card-border)]">
            <div className="font-medium text-[var(--color-card-text-primary)]">Subtle Background</div>
            <div className="text-sm text-[var(--color-card-text-accent)]">--color-card-accent-subtle</div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-card-accent)] text-[var(--color-accent-contrast)]">
            <div className="font-medium">Accent Background</div>
            <div className="text-sm opacity-90">--color-card-accent</div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-card-accent-emphasis)] text-[var(--color-accent-contrast)]">
            <div className="font-medium">Emphasis Background</div>
            <div className="text-sm opacity-90">--color-card-accent-emphasis</div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--card-surface)] border border-[var(--color-card-border)] backdrop-blur-sm">
            <div className="font-medium">Surface Background</div>
            <div className="text-sm text-muted-foreground">--card-surface</div>
          </div>
        </div>
      </div>

      {/* Current Palette Info */}
      <div className="p-6 rounded-lg bg-muted border">
        <h3 className="font-semibold mb-2">Current Palette: {colorPalettes.find(p => p.value === selectedPalette)?.name}</h3>
        <p className="text-sm text-muted-foreground">
          {colorPalettes.find(p => p.value === selectedPalette)?.description}
        </p>
        <div className="mt-4 text-xs font-mono bg-background p-2 rounded border">
          data-palette=&quot;{selectedPalette}&quot;
        </div>
      </div>
    </div>
  );
}
