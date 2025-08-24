import React from 'react';
import { CardCarousel, BaseCard, BentoLayout, GridItem } from '@manta-templates/ui-core';

/**
 * Test Page for UI-Core CardCarousel
 * 
 * This page tests the CardCarousel component from @manta-templates/ui-core
 * to verify it works independently of the template version.
 */
export default function TestUICarousel() {
  // Sample cards for testing
  const sampleCards = [
    {
      title: "Card 1",
      description: "This is the first test card with some content.",
      color: "bg-red-100 dark:bg-red-900/20"
    },
    {
      title: "Card 2", 
      description: "This is the second test card with different content.",
      color: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Card 3",
      description: "This is the third test card for carousel testing.",
      color: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Card 4",
      description: "This is the fourth test card in the carousel.",
      color: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      title: "Card 5",
      description: "This is the fifth and final test card.",
      color: "bg-purple-100 dark:bg-purple-900/20"
    }
  ];

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            UI-Core CardCarousel Test
          </h1>
          <p className="text-muted-foreground text-lg">
            Testing the CardCarousel component from @manta-templates/ui-core
          </p>
        </div>

        {/* Test Carousel 1: Basic */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Basic Carousel</h2>
          <div className="h-64 border-2 border-red-500">
            <CardCarousel
              visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
              showArrows={true}
              showDots={true}
              className="border-2 border-blue-500 min-h-[200px]"
            >
              {sampleCards.map((card, index) => (
                <BaseCard key={index} className={`h-full p-6 ${card.color}`}>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </BaseCard>
              ))}
            </CardCarousel>
          </div>
        </div>

        {/* Test Carousel 2: Auto-play */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Auto-play Carousel</h2>
          <div className="h-64">
            <CardCarousel
              visibleCards={{ mobile: 1, tablet: 2, desktop: 2 }}
              autoPlay={3000}
              showArrows={true}
              showDots={true}
              showControls={true}
              infinite={true}
            >
              {sampleCards.map((card, index) => (
                <BaseCard key={index} className={`h-full p-6 ${card.color}`}>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                  <div className="mt-4 text-sm text-muted-foreground">Auto-play enabled</div>
                </BaseCard>
              ))}
            </CardCarousel>
          </div>
        </div>

        {/* Test Carousel 3: No arrows, dots only */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dots Only Carousel</h2>
          <div className="h-64">
            <CardCarousel
              visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }}
              showArrows={false}
              showDots={true}
              enableSwipe={true}
            >
              {sampleCards.map((card, index) => (
                <BaseCard key={index} className={`h-full p-6 ${card.color}`}>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                  <div className="mt-4 text-sm text-muted-foreground">Swipe to navigate</div>
                </BaseCard>
              ))}
            </CardCarousel>
          </div>
        </div>

        {/* Test Carousel 4: In BentoLayout */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Carousel in BentoLayout</h2>
          <BentoLayout columns="grid-cols-1" gap={4}>
            <GridItem colSpan="col-span-1">
              <div className="h-64">
                <CardCarousel
                  visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
                  showArrows={true}
                  showDots={true}
                  gap={12}
                >
                  {sampleCards.slice(0, 3).map((card, index) => (
                    <BaseCard key={index} className={`h-full p-4 ${card.color}`}>
                      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </BaseCard>
                  ))}
                </CardCarousel>
              </div>
            </GridItem>
          </BentoLayout>
        </div>

        {/* Debug Info */}
        <div className="mt-12 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
          <p className="text-sm text-muted-foreground">
            This page imports CardCarousel directly from @manta-templates/ui-core to test 
            the ui-core implementation independently of any template overrides.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            If buttons appear scrambled or misplaced, it indicates an issue with the 
            ui-core CardCarousel implementation.
          </p>
        </div>
      </div>
    </main>
  );
}