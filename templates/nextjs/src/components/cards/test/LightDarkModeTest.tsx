'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cardVariants } from '@/lib/cardVariants';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

export function LightDarkModeTest() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen p-8 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Card Variants - Light/Dark Mode Test</h1>
            <div className="w-24 h-8 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen p-8 transition-colors', isDark ? 'dark' : '')}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Card Variants - Light/Dark Mode Test</h1>
          <Button onClick={toggleTheme} variant="outline" size="sm">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>

        {/* Current Mode Indicator */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-lg font-medium">
            Current Mode: <span className="text-teal-500">{isDark ? 'Dark' : 'Light'}</span>
          </p>
        </div>

        {/* Base Card Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Base Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardVariants({ variant: 'base' })}>
              <CardHeader>
                <CardTitle>Base Card</CardTitle>
                <CardDescription>Standard card with subtle shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the base card variant. It should have proper contrast in both light and dark modes.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Elevated Card Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Elevated Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardVariants({ variant: 'elevated' })}>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with enhanced shadow and hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card should have a prominent shadow that&apos;s visible in both light and dark modes. Hover to see the lift effect.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bordered Card Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Bordered Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardVariants({ variant: 'bordered' })}>
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
                <CardDescription>Card with distinctive border and hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a visible border that changes to teal on hover. The border should be clearly visible in both modes.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gradient Card Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Gradient Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardVariants({ variant: 'gradient' })}>
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
                <CardDescription className="text-white/80">Card with gradient background and shimmer effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a gradient background that should look consistent regardless of the theme mode. Hover to see the shimmer effect.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Card Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Interactive Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardVariants({ variant: 'interactive' })}>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Clickable card with hover and scale effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card is interactive with cursor pointer and scale effects. It should provide clear visual feedback in both modes.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Shadow Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Shadow Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>shadow-sm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Small shadow</p>
              </CardContent>
            </Card>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>shadow-xl</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Extra large shadow</p>
              </CardContent>
            </Card>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>shadow-2xl</CardTitle>
              </CardHeader>
              <CardContent>
                <p>2X large shadow</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Background Contrast Test */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Background Contrast Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">On Background</h3>
              <Card className={cardVariants({ variant: 'elevated' })}>
                <CardContent className="p-4">
                  <p>Elevated card on background</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4">On Muted Background</h3>
              <Card className={cardVariants({ variant: 'elevated' })}>
                <CardContent className="p-4">
                  <p>Elevated card on muted background</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
