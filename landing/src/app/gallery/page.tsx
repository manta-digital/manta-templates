"use client";
import Link from 'next/link';
import { GradientCard } from '@/components/cards/variants/GradientCard';
import { useTheme } from '@/context/themecontext';
import { Sun, Moon } from 'lucide-react';

export default function GalleryIndex() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-8 space-y-6 min-h-screen bg-background">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded bg-muted hover:bg-muted/80 transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
        </button>
      </div>
      <h1 className="text-3xl font-bold text-foreground">Component Gallery</h1>
      <p className="text-lg text-muted-foreground">
        Interactive showcase of card components, theming system, and development utilities
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { href: '/gallery/cards', title: 'Card Variants', description: 'Light/dark mode card testing' },
          { href: '/gallery/composition', title: 'Card Composition', description: 'Layout and composition patterns' },
          { href: '/gallery/variants', title: 'Animation Variants', description: 'Interactive animations and micro-interactions' },
          { href: '/gallery/radix-colors', title: 'Radix Colors', description: 'Color palette and theming system' },
        ].map(({ href, title, description }) => (
          <Link key={href} href={href} className="cursor-pointer">
            <GradientCard title={title} description={description} className="h-32 hover:shadow-xl">
              <div className="mt-auto text-white/80">Explore →</div>
            </GradientCard>
          </Link>
        ))}
      </div>
    </div>
  );
}


