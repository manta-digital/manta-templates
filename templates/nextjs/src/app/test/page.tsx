"use client";
import Link from 'next/link';
import { GradientCard } from '@/components/cards/variants/GradientCard';
import { useTheme } from '@/context/themecontext';
import { Sun, Moon } from 'lucide-react';

export default function TestIndex() {
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
      <h1 className="text-3xl font-bold text-foreground">Test Pages</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { href: '/test-cards', title: 'Card Variant Test' },
          { href: '/test-composition', title: 'Card Composition Test' },
          { href: '/test-variants', title: 'Animation Variant Test' },
          { href: '/dev/cards', title: 'Dev Card Test' },
        ].map(({ href, title }) => (
          <Link key={href} href={href} className="cursor-pointer">
            <GradientCard title={title} description={href} className="h-32 hover:shadow-xl">
              <div className="mt-auto text-white/80">Visit</div>
            </GradientCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
