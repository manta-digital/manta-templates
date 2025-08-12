import React from 'react';
import { cn } from '@/lib/utils';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';
import { GradientCard } from '@/components/cards/variants/GradientCard';
import ArticleCard from '@/components/cards/articles/ArticleCard';
import BlogCardImage from '@/components/cards/BlogCardImage';
import ProjectCard from '@/components/cards/ProjectCard';
import { BaseCard } from '@/components/cards/BaseCard';
import BackgroundVideo from '@/components/ui/background-video';
import Image from 'next/image';
import QuoteCard from '@/components/cards/QuoteCard';
import VideoCard from '@/components/cards/VideoCard';
import { CardCarousel } from '@/components/cards/layouts/CardCarousel';
import CosineTerrainCard from '@/components/cards/math/CosineTerrainCard';

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-2 xl:row-span-2">
          <GradientCard className="h-full" title="Theme Test Grid" description="Switch palette and dark/light to validate tokens" gradient="teal" />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-1 xl:col-span-4 xl:row-span-2">
          <CardCarousel className="h-full" itemClassName="h-full" visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }} autoPlay={6000} infinite showArrows showDots={false} showControls={false}>

            {/* Simple article sample inside carousel to test image hover */}
            <ArticleCard className="h-full" title="Carousel Article" subtitle="Demo" description="Testing image hover inside carousel." image="/image/blog-sample-image.png" href="/blog/sample-post" />
            <ProjectCard className="h-full" content={{ title: 'Semantic Colors', description: 'Cards using accent and foreground tokens', techStack: ['Next.js', 'Tailwind v4', 'Radix'] }} />

            {/* Background video sample (from landing page) - use BackgroundVideo inside a BaseCard to match working layout */}
            <BaseCard className="h-full overflow-hidden relative !border-0 p-0">
              <BackgroundVideo full src="https://www.w3schools.com/html/mov_bbb.mp4" poster="/image/blog-sample-image.png" className="w-full h-full" autoplay>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">Background Video Demo</h3>
                </div>
              </BackgroundVideo>
            </BaseCard>
          </CardCarousel>
        </GridItem>

        {/* Featured article */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2">
          <ArticleCard className="h-full" title="Colors and Themes" subtitle="Research" description="Radix scales with semantic aliasing and palette switching.  Testing making this a longer description to see how it handles the card layout." image="/image/blog-sample-image.png" href="/blog/sample-post" />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-4">
          <BlogCardImage title="Foreground and Borders" excerpt="This card validates text-card-foreground and border tokens over imagery." coverImageUrl="/image/blog-sample-image.png" textColorClassName="text-white" />
        </GridItem>

        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-4">
          <CosineTerrainCard className="h-[260px]" variant="card" renderPreset="wireframe" materialType="basic" />
        </GridItem>

        {/* Quote */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-4">
          <QuoteCard quote="Make the easy path the right path—semantic tokens everywhere." author="Manta Templates" />
        </GridItem>
      </BentoLayout>
    </main>
  );
}