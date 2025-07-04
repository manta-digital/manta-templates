'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardCarousel } from '@/components/cards/layouts/CardCarousel';
import { VirtualCardList } from '@/components/cards/layouts/VirtualCardList';
import { cardVariants } from '@/lib/cardVariants';
import { cn } from '@/lib/utils';
import { Shuffle, Plus, Minus } from 'lucide-react';

// Sample data for testing
const sampleCards = [
  { id: 1, title: 'Elevated Card', description: 'Card with shadow elevation', variant: 'elevated' as const },
  { id: 2, title: 'Bordered Card', description: 'Card with distinctive border', variant: 'bordered' as const },
  { id: 3, title: 'Gradient Card', description: 'Card with gradient background', variant: 'gradient' as const },
  { id: 4, title: 'Interactive Card', description: 'Card with hover interactions', variant: 'interactive' as const },
  { id: 5, title: 'Base Card', description: 'Standard card design', variant: 'base' as const },
  { id: 6, title: 'Feature Card', description: 'Highlighting key features', variant: 'elevated' as const },
  { id: 7, title: 'Product Card', description: 'Showcasing products', variant: 'bordered' as const },
  { id: 8, title: 'Service Card', description: 'Service offerings', variant: 'gradient' as const },
  { id: 9, title: 'Team Card', description: 'Team member profiles', variant: 'interactive' as const },
  { id: 10, title: 'Testimonial Card', description: 'Customer testimonials', variant: 'base' as const },
];

// Generate large dataset for virtual scrolling
const generateLargeDataset = (count: number) => {
  const variants = ['base', 'elevated', 'bordered', 'gradient', 'interactive'] as const;
  const categories = ['Technology', 'Design', 'Business', 'Marketing', 'Development'];
  const baseDate = new Date(2020, 0, 1); // Jan 1, 2020

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    description: `This is card number ${index + 1} in the ${categories[index % categories.length]} category`,
    variant: variants[index % variants.length],
    category: categories[index % categories.length],
    date: new Date(baseDate.getTime() + index * 86400000).toLocaleDateString(), // Deterministic date
  }));
};

export function CardCompositionTest() {
  const [carouselAutoPlay, setCarouselAutoPlay] = useState(0);
  const [virtualListCount, setVirtualListCount] = useState(1000);
  const [virtualLoading, setVirtualLoading] = useState(false);

  const largeDataset = useMemo(() => generateLargeDataset(virtualListCount), [virtualListCount]);

  const handleLoadMore = () => {
    setVirtualLoading(true);
    setTimeout(() => {
      setVirtualListCount(prev => prev + 500);
      setVirtualLoading(false);
    }, 1000);
  };

  const renderCarouselCard = (card: typeof sampleCards[0]) => (
    <Card className={cardVariants({ variant: card.variant, size: 'md' })}>
      <CardHeader>
        <CardTitle className={card.variant === 'gradient' ? 'text-white' : ''}>{card.title}</CardTitle>
        <CardDescription className={card.variant === 'gradient' ? 'text-white/80' : ''}>
          {card.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className={card.variant === 'gradient' ? 'text-white/90' : 'text-muted-foreground'}>
          Card ID: {card.id}
        </p>
      </CardContent>
    </Card>
  );

  const renderVirtualCard = (item: ReturnType<typeof generateLargeDataset>[0], index: number) => (
    <Card className={cardVariants({ variant: item.variant, size: 'sm' })}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className={cn('text-sm', item.variant === 'gradient' ? 'text-white' : '')}>
            {item.title}
          </CardTitle>
          <span className={cn('text-xs px-2 py-1 rounded', 
            item.variant === 'gradient' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
          )}>
            {item.category}
          </span>
        </div>
        <CardDescription className={cn('text-xs', item.variant === 'gradient' ? 'text-white/80' : '')}>
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-xs">
          <span className={item.variant === 'gradient' ? 'text-white/70' : 'text-muted-foreground'}>
            {item.date}
          </span>
          <span className={item.variant === 'gradient' ? 'text-white/70' : 'text-muted-foreground'}>
            #{index + 1}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Card Composition System</h1>
        <p className="text-muted-foreground">
          Advanced card layouts with carousel and virtual scrolling
        </p>
      </div>

      {/* Card Carousel Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Card Carousel</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCarouselAutoPlay(carouselAutoPlay === 0 ? 3000 : 0)}
            >
              {carouselAutoPlay === 0 ? 'Enable Auto-play' : 'Disable Auto-play'}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Responsive Carousel</h3>
          <CardCarousel
            visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={16}
            autoPlay={carouselAutoPlay}
            showArrows={true}
            showDots={true}
            enableSwipe={true}
            className="bg-muted/30 p-4 rounded-lg"
          >
            {sampleCards.map(renderCarouselCard)}
          </CardCarousel>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Infinite Loop Carousel</h3>
          <CardCarousel
            visibleCards={{ mobile: 1, tablet: 2, desktop: 4 }}
            gap={12}
            infinite={true}
            autoPlay={2000}
            showArrows={true}
            showDots={false}
            enableSwipe={true}
            className="bg-muted/30 p-4 rounded-lg"
          >
            {sampleCards.slice(0, 6).map(renderCarouselCard)}
          </CardCarousel>
        </div>
      </section>

      {/* Virtual Scrolling Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Virtual Card List</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVirtualListCount(Math.max(100, virtualListCount - 500))}
              disabled={virtualListCount <= 100}
            >
              <Minus className="h-4 w-4" />
              Remove 500
            </Button>
            <span className="text-sm text-muted-foreground">
              {virtualListCount.toLocaleString()} items
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVirtualListCount(virtualListCount + 500)}
              disabled={virtualListCount >= 10000}
            >
              <Plus className="h-4 w-4" />
              Add 500
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Standard Virtual List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Standard Virtual List</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <VirtualCardList
                items={largeDataset}
                itemHeight={120}
                containerHeight={400}
                gap={8}
                overscan={3}
                renderItem={renderVirtualCard}
                className="border rounded"
              />
            </div>
          </div>

          {/* Infinite Loading Virtual List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Infinite Loading</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <VirtualCardList
                items={largeDataset.slice(0, Math.min(virtualListCount, 2000))}
                itemHeight={120}
                containerHeight={400}
                gap={8}
                overscan={5}
                renderItem={renderVirtualCard}
                loading={virtualLoading}
                onEndReached={handleLoadMore}
                endReachedThreshold={10}
                className="border rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Performance Benefits</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Only renders visible items + overscan buffer</li>
            <li>• Handles {virtualListCount.toLocaleString()} items with smooth scrolling</li>
            <li>• Memory efficient - constant DOM size regardless of data size</li>
            <li>• Supports infinite loading and scroll-to-top functionality</li>
          </ul>
        </div>
      </section>

      {/* Features Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Features Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Carousel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>✅ Responsive design (mobile/tablet/desktop)</p>
              <p>✅ Touch/swipe gestures</p>
              <p>✅ Auto-play with pause/resume</p>
              <p>✅ Infinite loop support</p>
              <p>✅ Navigation arrows and dot indicators</p>
              <p>✅ Keyboard accessibility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Virtual Scrolling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>✅ High performance with large datasets</p>
              <p>✅ Infinite loading support</p>
              <p>✅ Smooth scrolling with overscan</p>
              <p>✅ Scroll position indicator</p>
              <p>✅ Scroll-to-top functionality</p>
              <p>✅ Loading and empty states</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
