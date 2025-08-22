import React from 'react';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';

// Template components
import { BaseCard as TemplateBaseCard } from '@/components/cards/BaseCard';
import TemplateQuoteCard from '@/components/cards/QuoteCard';
import TemplateSidebarPostCard from '@/components/cards/SidebarPostCard';
import TemplateBlogIndexCard from '@/components/cards/articles/BlogIndexCard';
import { TechnologyScroller as TemplateTechnologyScroller } from '@/components/ui/TechnologyScroller';
import TemplateBrandMark from '@/components/ui/brand-mark';
import { ThemeToggle as TemplateThemeToggle } from '@/components/themetoggle';
import TemplateHeader from '@/components/header';
import TemplateFooter from '@/components/footer';

// UI-Core components  
import { BaseCard as UiCoreBaseCard } from '@manta-templates/ui-core';
import { QuoteCard as UiCoreQuoteCard } from '@manta-templates/ui-core';
import { SidebarPostCard as UiCoreSidebarPostCard } from '@manta-templates/ui-core';
import { BlogIndexCard as UiCoreBlogIndexCard } from '@manta-templates/ui-core';
import { TechnologyScroller as UiCoreTechnologyScroller } from '@manta-templates/ui-core';
import { BrandMark as UiCoreBrandMark } from '@manta-templates/ui-core';
import { ThemeToggle as UiCoreThemeToggle } from '@manta-templates/ui-core';
import { Header as UiCoreHeader, Container as UiCoreContainer } from '@manta-templates/ui-core';
import { Footer as UiCoreFooter } from '@manta-templates/ui-core';
import { ColorSelector } from '@/components/themetoggle';

// Next.js components for dependency injection
import Image from 'next/image';
import Link from 'next/link';

// Header content for testing
import { getHeaderContent } from '@/lib/headerContent';
import { getFooterContent } from '@/lib/footerContent';

// Sample blog posts for ui-core testing
const sampleBlogPosts = [
  {
    slug: 'getting-started-nextjs',
    title: 'Getting Started with Next.js',
    description: 'Learn the fundamentals of Next.js and build your first application with this comprehensive guide.',
    pubDate: '2024-01-15',
    thumbnail: 'https://picsum.photos/80/80?random=1',
  },
  {
    slug: 'react-best-practices',
    title: 'React Best Practices for 2024',
    description: 'Discover the latest React patterns and practices to write better, more maintainable code.',
    pubDate: '2024-01-10',
    thumbnail: 'https://picsum.photos/80/80?random=2',
  },
  {
    slug: 'typescript-tips',
    title: 'TypeScript Tips and Tricks',
    description: 'Advanced TypeScript techniques that will make your development workflow more efficient.',
    pubDate: '2024-01-05',
    thumbnail: 'https://picsum.photos/80/80?random=3',
  },
];

// Sample technology data for ui-core testing
const sampleTechnologies = [
  { name: 'Next.js', svg: 'nextdotjs.svg', invertOnDark: true },
  { name: 'Tailwind CSS', svg: 'tailwindcss.svg', color: '#38BDF8', colorDark: '#38BDF8' },
  { name: 'React', svg: 'react.svg', invertOnDark: true },
  { name: 'TypeScript', svg: 'typescript.svg', color: '#3178C6' },
  { name: 'Node.js', svg: 'nodedotjs.svg', invertOnDark: true },
];

/**
 * Test Cards Page
 * 
 * Provides a testing environment for comparing template components with ui-core components
 * during the migration process. Each component comparison is displayed side-by-side
 * in a consistent 6-column grid layout.
 */
export default async function TestCardsPage() {
  const headerContent = await getHeaderContent();
  const { sections: footerSections } = await getFooterContent();
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

        {/* Header Component Comparison - Full Width */}
        <div className="mb-8 space-y-8">
          <h2 className="text-2xl font-semibold text-foreground">Header Components</h2>
          
          {/* Template Header */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 w-fit">
              Template Header
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <TemplateHeader />
            </div>
          </div>
          
          {/* UI-Core Header */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
              UI-Core Header
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <UiCoreHeader 
                content={headerContent}
                ImageComponent={Image}
                LinkComponent={Link}
                BrandMarkComponent={UiCoreBrandMark}
                ContainerComponent={UiCoreContainer}
                ThemeToggleComponent={UiCoreThemeToggle}
                ColorSelectorComponent={ColorSelector}
              />
            </div>
          </div>
        </div>

        {/* Footer Component Comparison - Full Width */}
        <div className="mb-8 space-y-8">
          <h2 className="text-2xl font-semibold text-foreground">Footer Components</h2>
          
          {/* Template Footer - Default Variant */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 w-fit">
              Template Footer (Default)
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <TemplateFooter />
            </div>
          </div>
          
          {/* UI-Core Footer - Default Variant */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
              UI-Core Footer (Default)
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <UiCoreFooter 
                sections={footerSections}
                variant="default"
                LinkComponent={Link}
                ThemeToggleComponent={UiCoreThemeToggle}
              />
            </div>
          </div>

          {/* UI-Core Footer - Default with Full Legal */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
              UI-Core Footer (Default + Full Legal)
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <UiCoreFooter 
                sections={footerSections}
                variant="default"
                legalPreset="mit"
                LinkComponent={Link}
                ThemeToggleComponent={UiCoreThemeToggle}
              />
            </div>
          </div>

          {/* UI-Core Footer - Compact Variant */}
          <div>
            <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
              UI-Core Footer (Compact)
            </div>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <UiCoreFooter 
                sections={footerSections}
                variant="compact"
                legalPreset="mit"
                LinkComponent={Link}
                version="0.1.0"
              />
            </div>
          </div>
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

          {/* BlogIndexCard Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BlogIndexCard" type="template">
              <TemplateBlogIndexCard postLimit={3} />
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BlogIndexCard" type="ui-core">
              <UiCoreBlogIndexCard 
                posts={sampleBlogPosts}
                postLimit={3}
                ImageComponent={Image}
                LinkComponent={Link}
              />
            </CardComparisonWrapper>
          </GridItem>

          {/* TechnologyScroller Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="TechnologyScroller" type="template">
              <UiCoreBaseCard className="h-full w-full flex flex-col justify-center">
                <TemplateTechnologyScroller 
                  items={sampleTechnologies}
                  speed="fast"
                  direction="left"
                />
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="TechnologyScroller" type="ui-core">
              <UiCoreBaseCard className="h-full w-full flex flex-col justify-center">
                <UiCoreTechnologyScroller 
                  items={sampleTechnologies}
                  speed="fast"
                  direction="left"
                  ImageComponent={Image}
                />
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          {/* BrandMark Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BrandMark" type="template">
              <UiCoreBaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Template BrandMark</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <TemplateBrandMark size={24} />
                    <TemplateBrandMark size={36} />
                    <TemplateBrandMark size={48} />
                  </div>
                </div>
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="BrandMark" type="ui-core">
              <UiCoreBaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">UI-Core BrandMark</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <UiCoreBrandMark size={24} />
                    <UiCoreBrandMark size={36} />
                    <UiCoreBrandMark size={48} />
                  </div>
                </div>
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          {/* ThemeToggle Comparison */}
          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="ThemeToggle" type="template">
              <UiCoreBaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Template ThemeToggle</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Click to toggle light/dark theme. Uses template context.
                  </p>
                  <div className="flex items-center justify-center">
                    <TemplateThemeToggle />
                  </div>
                </div>
              </UiCoreBaseCard>
            </CardComparisonWrapper>
          </GridItem>

          <GridItem colSpan="col-span-3">
            <CardComparisonWrapper title="ThemeToggle" type="ui-core">
              <UiCoreBaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">UI-Core ThemeToggle</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Click to toggle light/dark theme. Uses ui-core ThemeProvider.
                  </p>
                  <div className="flex items-center justify-center">
                    <UiCoreThemeToggle />
                  </div>
                </div>
              </UiCoreBaseCard>
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

