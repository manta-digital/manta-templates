import React from 'react';
import { GradientCard, type GradientPreset } from '@/components/cards/variants/GradientCard';

/**
 * Test component to showcase all gradient card variants and features
 */
export function GradientCardTest() {
  const gradientPresets: Array<{ preset: GradientPreset; name: string; description: string }> = [
    { preset: 'teal', name: 'Teal Gradient', description: 'Professional teal to green gradient matching the design system' },
    { preset: 'blue', name: 'Blue Gradient', description: 'Cool blue to cyan gradient for tech and innovation themes' },
    { preset: 'purple', name: 'Purple Gradient', description: 'Rich purple to pink gradient for creative and artistic content' },
    { preset: 'sunset', name: 'Sunset Gradient', description: 'Warm orange to red gradient for energy and passion themes' },
    { preset: 'ocean', name: 'Ocean Gradient', description: 'Deep blue to teal gradient for calm and professional themes' },
  ];

  const overlayExamples = [
    { opacity: 0, label: 'No Overlay' },
    { opacity: 0.2, label: 'Light Overlay' },
    { opacity: 0.4, label: 'Medium Overlay' },
    { opacity: 0.6, label: 'Strong Overlay' },
  ];

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Gradient Card System Test</h2>
      
      {/* Gradient Presets */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Gradient Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradientPresets.map((item) => (
            <GradientCard
              key={item.preset}
              gradient={item.preset}
              size="md"
              radius="md"
              shimmer={true}
              title={item.name}
              description={item.description}
            >
              <p className="text-white/90 text-sm">
                Hover to see the shimmer effect in action. This gradient uses the {item.preset} preset.
              </p>
            </GradientCard>
          ))}
        </div>
      </div>

      {/* Overlay Examples */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Text Readability Overlays</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overlayExamples.map((item) => (
            <GradientCard
              key={item.opacity}
              gradient="sunset"
              size="md"
              radius="md"
              shimmer={false}
              overlayOpacity={item.opacity}
              title={item.label}
              description={`Overlay opacity: ${item.opacity}`}
            >
              <p className="text-white text-sm">
                This text demonstrates readability with {item.opacity === 0 ? 'no' : `${item.opacity * 100}%`} overlay.
              </p>
            </GradientCard>
          ))}
        </div>
      </div>

      {/* Custom Gradient Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Custom Gradient</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GradientCard
            customGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            size="lg"
            radius="lg"
            shimmer={true}
            title="Custom Gradient"
            description="Using a custom gradient definition"
          >
            <p className="text-white/90">
              This card uses a custom gradient definition instead of a preset. 
              The shimmer effect works with any gradient!
            </p>
          </GradientCard>
          
          <GradientCard
            customGradient="radial-gradient(circle at top right, #ff6b6b, #4ecdc4, #45b7d1)"
            size="lg"
            radius="lg"
            shimmer={true}
            overlayOpacity={0.3}
            title="Radial Gradient"
            description="Custom radial gradient with overlay"
          >
            <p className="text-white">
              Radial gradients are also supported with custom definitions. 
              The overlay helps with text readability.
            </p>
          </GradientCard>
        </div>
      </div>

      {/* Size Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Size Variants</h3>
        <div className="flex flex-wrap gap-4 justify-start items-start">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <GradientCard
              key={size}
              gradient="teal"
              size={size}
              radius="md"
              shimmer={true}
              title={`${size.toUpperCase()} Size`}
              description={`This is a ${size} gradient card`}
            >
              <p className="text-white/90 text-sm">
                Size: {size}
              </p>
            </GradientCard>
          ))}
        </div>
      </div>

      {/* Corner Radius Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Corner Radius Variants</h3>
        <div className="flex flex-wrap gap-4 justify-start items-start">
          {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((radius) => (
            <GradientCard
              key={radius}
              gradient="purple"
              size="md"
              radius={radius}
              shimmer={true}
              title={`${radius === 'none' ? 'Sharp' : radius.toUpperCase()} Corners`}
              description={`Radius: ${radius}`}
            >
              <p className="text-white/90 text-sm">
                Corner radius: {radius}
              </p>
            </GradientCard>
          ))}
        </div>
      </div>
    </div>
  );
}
