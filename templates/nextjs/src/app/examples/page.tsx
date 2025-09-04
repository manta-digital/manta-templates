import React from 'react';
import { cn } from '@/lib/ui-core/utils';
import { 
  BentoLayout,
  GridItem,
  GradientCard,
  ArticleCard,
  BlogCardImage,
  ProjectCard,
  BaseCard,
  QuoteCard,
  CardCarousel,
  CosineTerrainCard,
  TechnologyScroller,
  VideoCard
} from '@/lib/ui-core';
import { BackgroundVideoComponent } from '@/lib/ui-adapters/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-6 pt-0 md:p-10 md:pt-0">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:row-span-2">
          <GradientCard className="h-full rounded-lg" title="Theme Test Grid" description="Switch palette and dark/light to validate tokens" from="accent-7" to="accent-10" />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2">
          <CardCarousel className="h-full" itemClassName="h-full" visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }} autoPlay={6000} infinite showArrows showDots={false} showControls={false}>

            {/* Simple article sample inside carousel to test image hover */}
            <ArticleCard 
              className="h-full" 
              ImageComponent={Image} 
              LinkComponent={Link} 
              title="Carousel Article" 
              subtitle="Demo" 
              description="Testing image hover inside carousel." 
              image="/image/blog/blog-sample-image.png" 
              href="/blog/sample-post" 
              imageProps={{ 
                width: 600, 
                height: 400 
              }} 
            />
            <ProjectCard
              className="h-full"
              ImageComponent={Image}
              LinkComponent={Link}
              imageProps={{
                width: 600,
                height: 400
              }}
              content={{
                type: 'project',
                title: 'Semantic Colors',
                description: 'Cards using accent and foreground tokens',
                techStack: ['Next.js', 'Tailwind v4', 'Radix'],
                image: '/image/blog/blog-sample-image.png',
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

            {/* Background video sample using ui-core VideoCard with Next.js BackgroundVideoComponent */}
            <VideoCard
              className="h-full"
              displayMode="background"
              videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
              thumbnailUrl="/image/blog/blog-sample-image.png"
              BackgroundVideoComponent={BackgroundVideoComponent}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-card-foreground text-xl font-semibold">Background Video Demo</h3>
              </div>
            </VideoCard>
          </CardCarousel>
        </GridItem>

        {/* Featured article */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-3">
          <ArticleCard 
            className="h-full" 
            ImageComponent={Image} 
            LinkComponent={Link} 
            title="Colors and Themes" 
            subtitle="Research" 
            description="Radix scales with semantic aliasing and palette switching.  Testing making this a longer description to see how it handles the card layout." 
            image="/image/blog/blog-sample-image.png" 
            href="/blog/sample-post" 
            imageProps={{ 
              width: 600, 
              height: 400 
            }} 
          />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-5">
          <BlogCardImage ImageComponent={Image} LinkComponent={Link} className='h-full' title="Foreground and Borders" excerpt="This card validates text-card-foreground and border tokens over imagery." coverImageUrl="/image/blog/blog-sample-image.png" textColorClassName="text-white" />
        </GridItem>

        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 md:col-span-8 md:row-span-2 lg:col-span-5 lg:row-span-1">
          <CosineTerrainCard 
            className="h-full" 
            variant="card" 
            renderPreset="wireframe" 
            materialType="basic"
            backgroundColor="var(--color-background)"
            backgroundAlpha={0.8}
            materialColor="var(--color-accent-11)"
          />
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