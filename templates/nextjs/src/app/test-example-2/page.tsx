"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BentoLayout, GridItem, GradientCard, BlogCardImage, ProjectCard, BaseCard, QuoteCard, CosineTerrainCard, CardCarousel } from '@manta-templates/ui-core';
import BackgroundVideo from '@/components/ui/background-video';
import { TechnologyScroller } from '@/components/ui/TechnologyScroller';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestExample2Page() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-2 xl:row-span-2">
          <GradientCard className="h-full" title="Theme Test Grid" description="Switch palette and dark/light to validate tokens" gradient="teal" />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2">
          <CardCarousel
            className="h-full"
            itemClassName="h-full"
            visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }}
            autoPlay={6000}
            infinite
            showArrows
            showDots={false}
            showControls={false}
            ChevronLeftIcon={ChevronLeft}
            ChevronRightIcon={ChevronRight}
          >
            {/* Simple article sample inside carousel to test image hover */}
            <BlogCardImage
              className="h-full"
              title="Carousel Article"
              excerpt="Testing image hover inside carousel."
              coverImageUrl="/image/blog-sample-image.png"
              slug="/blog/sample-post"
              textColorClassName="text-white"
            />
            <ProjectCard
              className="h-full"
              content={{
                title: 'Semantic Colors',
                description: 'Cards using accent and foreground tokens',
                techStack: ['Next.js', 'Tailwind v4', 'Radix'],
                displayVariant: 'showcase',
                image: '/image/blog-sample-image.png',
                repoUrl: 'https://github.com/manta-templates/semantic-colors',
                features: [
                  { label: 'Structured and Customizable Project Phases', icon: 'zap'},
                  { label: 'AI-driven Task Discovery and Expansion', icon: 'zap', color: 'primary' },
                  { label: 'Parameterized Prompts', icon: 'zap', color: 'primary' },
                  { label: 'Automated Code Reviews', icon: 'zap', color: 'primary' },
                ],
                actions: [
                  { label: 'View on GitHub', href: 'https://github.com/ecorkran/ai-project-guide', variant: 'outline' },
                ],
              }}
            />

            {/* Background video sample (from landing page) - use BackgroundVideo inside a BaseCard to match working layout */}
            <BaseCard className="h-full overflow-hidden relative !border-0 p-0">
              <BackgroundVideo full src="https://www.w3schools.com/html/mov_bbb.mp4" poster="/image/blog-sample-image.png" className="w-full h-full" autoplay>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-card-foreground text-xl font-semibold">Background Video Demo</h3>
                </div>
              </BackgroundVideo>
            </BaseCard>
          </CardCarousel>
        </GridItem>

        {/* Featured article (using BlogCardImage from UI package) */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2">
          <BlogCardImage
            className="h-full"
            title="Colors and Themes"
            excerpt="Radix scales with semantic aliasing and palette switching.  Testing making this a longer description to see how it handles the card layout."
            coverImageUrl="/image/blog-sample-image.png"
            slug="/blog/sample-post"
            textColorClassName="text-white"
          />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-3">
          <BlogCardImage title="Foreground and Borders" excerpt="This card validates text-card-foreground and border tokens over imagery." coverImageUrl="/image/blog-sample-image.png" textColorClassName="text-white" />
        </GridItem>

        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 md:col-span-8 md:row-span-2 lg:col-span-5 lg:row-span-1">
          <CosineTerrainCard className="h-full" variant="card" renderPreset="wireframe" materialType="basic" />
        </GridItem>

        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <BaseCard className={cn('h-full w-full flex flex-col justify-center')}>
            <TechnologyScroller items={[
            { name: 'Next.js', svg: 'nextdotjs.svg', invertOnDark: true },
            { name: 'Tailwind CSS', svg: 'tailwindcss.svg', color: '#38BDF8', colorDark: '#38BDF8' },
            { name: 'React', svg: 'react.svg', invertOnDark: true },
          ]}
          speed="fast"
          direction="left"
          />
          </BaseCard>
        </GridItem>

        {/* Quote */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <QuoteCard quote="Make the easy path the right path—semantic tokens everywhere." author="Manta Templates" />
        </GridItem>
      </BentoLayout>
    </main>
  );
}