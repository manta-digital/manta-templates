import React from 'react';
import { cn } from '@/lib/utils';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';
import BlogHeroCard from '@/components/cards/BlogHeroCard';
import ArticleCard from '@/components/cards/articles/ArticleCard';
import BlogCardImage from '@/components/cards/BlogCardImage';
import ProjectCard from '@/components/cards/ProjectCard';
import QuoteCard from '@/components/cards/QuoteCard';
import VideoCard from '@/components/cards/VideoCard';
import { CardCarousel } from '@/components/cards/layouts/CardCarousel';
import CosineTerrainCard from '@/components/cards/math/CosineTerrainCard';

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(120px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-2 xl:row-span-2">
          <BlogHeroCard title="Theme Test Grid" subtitle="Switch palette and dark/light to validate tokens" />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-4 xl:row-span-1">
          <CardCarousel className="h-full" itemClassName="h-full" visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }} autoPlay={6000} infinite showArrows>
            <ProjectCard className="h-full" content={{ title: 'Semantic Colors', description: 'Cards using accent and foreground tokens', techStack: ['Next.js', 'Tailwind v4', 'Radix'] }} />
            <VideoCard className="h-full" content={{ title: 'Video Card', videoUrl: 'https://storage.coverr.co/videos/coverr-a-mountain-with-a-waterfall-0042/1080p.mp4', displayMode: 'background', autoplay: true }} overlay />
          </CardCarousel>
        </GridItem>

        {/* Featured article */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 xl:col-span-2">
          <ArticleCard title="Colors and Themes" subtitle="Research" description="Radix scales with semantic aliasing and palette switching." image="/image/blog-sample-image.png" href="/blog/sample-post" />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-4">
          <BlogCardImage title="Foreground and Borders" excerpt="This card validates text-card-foreground and border tokens over imagery." coverImageUrl="/image/blog-sample-image.png" textColorClassName="text-card-foreground" />
        </GridItem>

        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-4">
          <CosineTerrainCard className="h-[260px]" renderPreset="wireframe" materialType="basic" />
        </GridItem>

        {/* Quote */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-4">
          <QuoteCard quote="Make the easy path the right path—semantic tokens everywhere." author="Manta Templates" />
        </GridItem>
      </BentoLayout>
    </main>
  );
}