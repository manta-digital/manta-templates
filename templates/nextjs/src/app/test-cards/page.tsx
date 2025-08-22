import React from 'react';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';

// Template components
import { BaseCard as TemplateBaseCard } from '@/components/cards/BaseCard';
import TemplateQuoteCard from '@/components/cards/QuoteCard';
import TemplateSidebarPostCard from '@/components/cards/SidebarPostCard';

// UI-Core components  
import { BaseCard as UiCoreBaseCard } from '@manta-templates/ui-core';
import { QuoteCard as UiCoreQuoteCard } from '@manta-templates/ui-core';
import { SidebarPostCard as UiCoreSidebarPostCard } from '@manta-templates/ui-core';

// Next.js components for dependency injection
import Image from 'next/image';
import Link from 'next/link';

/**
 * Test Cards Page
 * 
 * Provides a testing environment for comparing template components with ui-core components
 * during the migration process. Each component comparison is displayed side-by-side
 * in a consistent 6-column grid layout.
 */
export default function TestCardsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Component Migration Test Cards
          </h1>
          <p className="text-muted-foreground text-lg">
            Side-by-side comparison of template components and their ui-core equivalents.
            Each row shows template version (left) and ui-core version (right).
          </p>
        </div>

        {/* Test Grid Layout */}
        <BentoLayout 
          columns="grid-cols-6" 
          gap={4}
          rowHeight="minmax(16rem, auto)"
          className="test-cards-grid"
        >
          
          {/* Legend/Guide */}
          <GridItem colSpan="col-span-6" className="mb-4">
            <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
              <h2 className="text-xl font-semibold mb-2">Testing Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-blue-600 dark:text-blue-400">Template Version (Left)</h3>
                  <p className="text-muted-foreground">Original component from templates/nextjs/src/components/</p>
                </div>
                <div>
                  <h3 className="font-medium text-green-600 dark:text-green-400">UI-Core Version (Right)</h3>
                  <p className="text-muted-foreground">Migrated component from packages/ui-core/src/components/</p>
                </div>
              </div>
            </div>
          </GridItem>

          {/* BaseCard Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BaseCard" type="template">
              <TemplateBaseCard className="h-full p-6">
                <h3 className="text-lg font-semibold mb-2">Template BaseCard</h3>
                <p className="text-muted-foreground">
                  This is the BaseCard from templates/nextjs/src/components/cards/BaseCard.tsx
                </p>
              </TemplateBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BaseCard" type="ui-core">
              <UiCoreBaseCard className="h-full p-6">
                <h3 className="text-lg font-semibold mb-2">UI-Core BaseCard</h3>
                <p className="text-muted-foreground">
                  This is the BaseCard from packages/ui-core/src/components/ui/BaseCard.tsx
                </p>
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          {/* QuoteCard Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="QuoteCard" type="template">
              <TemplateQuoteCard 
                quote="Make the easy path the right path—semantic tokens everywhere."
                author="Manta Templates"
                className="h-full"
              />
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="QuoteCard" type="ui-core">
              <UiCoreQuoteCard 
                quote="Make the easy path the right path—semantic tokens everywhere."
                author="Manta Templates"
                className="h-full"
              />
            </CardComparisonWrapper>
          </GridItem>


          {/* SidebarPostCard Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="SidebarPostCard" type="template">
              <TemplateSidebarPostCard 
                title="Getting Started with Next.js"
                excerpt="Learn the fundamentals of Next.js and build your first application with this comprehensive guide."
                imageUrl="https://picsum.photos/96/96?random=1"
                href="/blog/getting-started-nextjs"
              />
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="SidebarPostCard" type="ui-core">
              <UiCoreSidebarPostCard 
                title="Getting Started with Next.js"
                excerpt="Learn the fundamentals of Next.js and build your first application with this comprehensive guide."
                imageUrl="https://picsum.photos/96/96?random=1"
                href="/blog/getting-started-nextjs"
                ImageComponent={Image}
                LinkComponent={Link}
              />
            </CardComparisonWrapper>
          </GridItem>

          {/* Placeholder for BlogIndexCard */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BlogIndexCard" type="template">
              <PlaceholderCard componentName="BlogIndexCard" />
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BlogIndexCard" type="ui-core">
              <PlaceholderCard componentName="BlogIndexCard" />
            </CardComparisonWrapper>
          </GridItem>

        </BentoLayout>
      </div>
    </main>
  );
}

/**
 * Card Comparison Wrapper
 * 
 * Wraps individual cards with a label indicating template vs ui-core version.
 */
interface CardComparisonWrapperProps {
  title: string;
  type: 'template' | 'ui-core';
  children: React.ReactNode;
}

function CardComparisonWrapper({ title, type, children }: CardComparisonWrapperProps) {
  const labelColor = type === 'template' 
    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50' 
    : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50';
  
  return (
    <div className="h-full flex flex-col">
      <div className={`text-xs font-medium mb-2 px-2 py-1 rounded text-center ${labelColor}`}>
        {title} ({type === 'template' ? 'Template' : 'UI-Core'})
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

/**
 * Placeholder Card
 * 
 * Used as a placeholder while components are being migrated.
 */
interface PlaceholderCardProps {
  componentName: string;
}

function PlaceholderCard({ componentName }: PlaceholderCardProps) {
  return (
    <div className="w-full h-full bg-muted/50 border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center">
      <div className="text-lg font-medium mb-2 text-muted-foreground">{componentName}</div>
      <div className="text-sm text-muted-foreground/70">
        Component not yet migrated
      </div>
    </div>
  );
}