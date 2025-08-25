import React from 'react';
import { BentoLayout, GridItem, BaseCard, QuoteCard, SidebarPostCard, BlogIndexCard, TechnologyScroller, BrandMark, ThemeToggle, Header, Footer, ComingSoonOverlay, ColorSelector, AboutCard, GradientCard } from '@manta-templates/ui-core';
import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';
import type { NextjsHeaderContent, NextjsFooterContent } from '@manta-templates/ui-adapters-nextjs';

// Next.js components for dependency injection
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, X } from 'lucide-react';

// Sample content for AboutCard testing
const sampleAboutContent = {
  title: "Jane Developer",
  description: "Full-stack developer passionate about creating beautiful user experiences",
  avatar: "/window.svg",
  socials: [
    { platform: "github" as const, url: "https://github.com/janedev" },
    { platform: "linkedin" as const, url: "https://linkedin.com/in/janedev" },
    { platform: "mail" as const, url: "jane@example.com" }
  ],
  contentHtml: `<p>I'm a passionate full-stack developer with over 5 years of experience building web applications. I love working with React, TypeScript, and modern web technologies.</p><p>When I'm not coding, you can find me hiking, reading tech blogs, or contributing to open source projects.</p>`
};

// Social icons for ui-core AboutCard
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  x: X,
  twitter: X,
  mail: Mail,
};

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
 * Test Cards Page - UI-Core Components Only
 * 
 * Showcases all ui-core components with proper dependency injection
 * and ui-adapters content loading patterns.
 */
export default async function TestCardsPage() {
  // Load header and footer content using ui-adapters pattern
  let headerContent = null;
  let footerSections = null;

  try {
    const header = await nextjsContentProvider.loadContent<NextjsHeaderContent>('header', 'main-grid');
    headerContent = header.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading header content:', error);
  }

  try {
    const footer = await nextjsContentProvider.loadContent<NextjsFooterContent>('footer-content', 'presets/mit/footer');
    footerSections = footer.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading footer content:', error);
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            UI-Core Component Showcase
          </h1>
          <p className="text-muted-foreground text-lg">
            All components from @manta-templates/ui-core with proper dependency injection
            and ui-adapters content loading patterns.
          </p>
        </div>

        {/* Header Component Showcase */}
        {headerContent && (
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Header Component</h2>
            <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
              <Header 
                content={headerContent}
                ImageComponent={Image}
                LinkComponent={Link}
              />
            </div>
          </div>
        )}

        {/* Footer Component Showcase */}
        {footerSections && (
          <div className="mb-8 space-y-8">
            <h2 className="text-2xl font-semibold text-foreground">Footer Components</h2>
            
            {/* Default Footer */}
            <div>
              <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
                Default Footer
              </div>
              <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
                <Footer 
                  sections={footerSections}
                  variant="default"
                  LinkComponent={Link}
                />
              </div>
            </div>

            {/* Compact Footer */}
            <div>
              <div className="text-sm font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
                Compact Footer
              </div>
              <div className="border border-border/40 rounded-lg overflow-hidden bg-background">
                <Footer 
                  sections={footerSections}
                  variant="compact"
                  legalPreset="mit"
                  LinkComponent={Link}
                  version="0.1.0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Component Grid */}
        <BentoLayout 
          columns="grid-cols-4" 
          gap={4}
          rowHeight="minmax(16rem, auto)"
          className="test-cards-grid"
        >
          
          {/* Guide */}
          <GridItem colSpan="col-span-4" className="mb-4">
            <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
              <h2 className="text-xl font-semibold mb-2">UI-Core Component Testing</h2>
              <p className="text-muted-foreground text-sm">
                All components use simplified dependency injection (only framework-specific ImageComponent, LinkComponent) 
                and follow the ui-core + ui-adapters architecture pattern.
              </p>
            </div>
          </GridItem>

          {/* BaseCard */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="BaseCard">
              <BaseCard className="h-full p-6">
                <h3 className="text-lg font-semibold mb-2">UI-Core BaseCard</h3>
                <p className="text-muted-foreground">
                  This is the BaseCard from @manta-templates/ui-core
                </p>
              </BaseCard>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* QuoteCard */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="QuoteCard">
              <QuoteCard 
                quote="Make the easy path the right path—semantic tokens everywhere."
                author="Manta Templates"
                className="h-full"
              />
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* SidebarPostCard */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="SidebarPostCard">
              <SidebarPostCard 
                title="Getting Started with Next.js"
                excerpt="Learn the fundamentals of Next.js and build your first application with this comprehensive guide."
                imageUrl="https://picsum.photos/96/96?random=1"
                href="/blog/getting-started-nextjs"
                ImageComponent={Image}
                LinkComponent={Link}
              />
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* BlogIndexCard */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="BlogIndexCard">
              <BlogIndexCard 
                posts={sampleBlogPosts}
                postLimit={3}
                ImageComponent={Image}
                LinkComponent={Link}
              />
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* TechnologyScroller */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="TechnologyScroller">
              <BaseCard className="h-full w-full flex flex-col justify-center">
                <TechnologyScroller 
                  items={sampleTechnologies}
                  speed="fast"
                  direction="left"
                  ImageComponent={Image}
                />
              </BaseCard>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* BrandMark */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="BrandMark">
              <BaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">UI-Core BrandMark</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <BrandMark size={24} />
                    <BrandMark size={36} />
                    <BrandMark size={48} />
                  </div>
                </div>
              </BaseCard>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* ThemeToggle */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="ThemeToggle">
              <BaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Theme Toggle</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Click to toggle light/dark theme.
                  </p>
                  <div className="flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              </BaseCard>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* ColorSelector */}
          <GridItem colSpan="col-span-2">
            <ComponentShowcaseWrapper title="ColorSelector">
              <BaseCard className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Color Selector</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Click to cycle through accent colors.
                  </p>
                  <div className="flex items-center justify-center">
                    <ColorSelector />
                  </div>
                </div>
              </BaseCard>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* ComingSoonOverlay */}
          <GridItem colSpan="col-span-2" className="h-full">
            <ComponentShowcaseWrapper title="ComingSoonOverlay">
              <ComingSoonOverlay color="teal" label="Coming Soon" blurAmount="md">
                <BaseCard className="h-full p-6">
                  <h3 className="text-lg font-semibold mb-2">Overlay Content</h3>
                  <p className="text-muted-foreground">
                    This content is behind the coming soon overlay.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 bg-muted rounded"></div>
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                    <div className="h-2 bg-muted rounded w-1/2"></div>
                  </div>
                </BaseCard>
              </ComingSoonOverlay>
            </ComponentShowcaseWrapper>
          </GridItem>

          {/* AboutCard with Gradient */}
          <GridItem colSpan="col-span-3" className="h-full">
            <GradientCard 
              className="h-full p-0 rounded-lg border-none"
              customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
            >
              <AboutCard
                className="h-full bg-transparent text-white border-1 border-white/30"
                title={sampleAboutContent.title}
                description={sampleAboutContent.description}
                avatar={sampleAboutContent.avatar}
                socials={sampleAboutContent.socials}
                contentHtml={sampleAboutContent.contentHtml}
                ImageComponent={Image}
                LinkComponent={Link}
                socialIcons={socialIcons}
              />
            </GradientCard>
          </GridItem>

        </BentoLayout>
      </div>
    </main>
  );
}

/**
 * Component Showcase Wrapper
 * 
 * Wraps individual components with a label.
 */
interface ComponentShowcaseWrapperProps {
  title: string;
  children: React.ReactNode;
}

function ComponentShowcaseWrapper({ title, children }: ComponentShowcaseWrapperProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="text-xs font-medium mb-2 px-2 py-1 rounded text-center bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 w-fit">
        {title}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}