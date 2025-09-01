import React from 'react';
import { cn } from '../lib/ui-core/utils';
import { 
  BentoLayout,
  GridItem,
  CardCarousel
} from '../lib/ui-core/components/layouts';
import { 
  GradientCard,
  ArticleCard,
  ProjectCard,
  BaseCard,
  QuoteCard,
  CosineTerrainCard,
  VideoCard
} from '../lib/ui-core/components/cards';
import { TechnologyScroller } from '../lib/ui-core/components/ui';
import { StandardBackgroundVideo, StandardVideoPlayer } from '../lib/ui-core/components/video';
import { 
  reactProjectContent, 
  showcaseProjects, 
  sampleQuote, 
  testimonialQuotes,
  featuredArticle, 
  relatedArticles,
  techStack
} from '../content';

export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-2 xl:row-span-2">
          <GradientCard 
            className="h-full rounded-lg" 
            title="React Template" 
            description="UI-core components working without injection" 
            from="accent-7" 
            to="accent-10" 
          />
        </GridItem>

        {/* Project Card Carousel */}
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
          >
            <ArticleCard 
              className="h-full" 
              title="Framework Agnostic Components" 
              subtitle="React Template" 
              description="Testing standard HTML elements without Next.js injection." 
              image="/images/blog/react-components.png" 
              href="/blog/framework-agnostic-components"
            />
            <ProjectCard
              className="h-full"
              content={{
                title: 'UI-Core Showcase',
                description: 'Components using standard HTML defaults',
                techStack: ['React', 'Vite', 'Standard HTML'],
                image: '/images/projects/ui-core-showcase.png',
                repoUrl: 'https://github.com/manta-templates/react',
                actions: [
                  { label: 'View Demo', href: '/examples', variant: 'primary' }
                ]
              }}
            />
          </CardCarousel>
        </GridItem>

        {/* Video Card with Background Video */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4 xl:col-span-2 xl:row-span-2">
          <VideoCard
            className="h-full"
            displayMode="background"
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            title="Background Video Demo"
            overlay={true}
            BackgroundVideoComponent={StandardBackgroundVideo}
            content={{
              title: "Background Video Mode",
              description: "StandardBackgroundVideo working without Next.js injection",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              thumbnailUrl: "/images/video-thumbnails/bigbuckbunny.jpg",
              displayMode: "background" as const,
              autoplay: true
            }}
          />
        </GridItem>

        {/* Quote Card */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-3">
          <QuoteCard content={sampleQuote} className="h-full" />
        </GridItem>

        {/* Article Card */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-3">
          <ArticleCard 
            className="h-full"
            title={featuredArticle.title}
            subtitle={featuredArticle.category}
            description={featuredArticle.description}
            image={featuredArticle.image}
            href={`/blog/${featuredArticle.slug}`}
          />
        </GridItem>

        {/* Technology Scroller */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <BaseCard className={cn('h-full w-full flex flex-col justify-center')}>
            <TechnologyScroller items={[
              { name: 'React', svg: 'react.svg', invertOnDark: true },
              { name: 'Tailwind CSS', svg: 'tailwindcss.svg', color: '#38BDF8', colorDark: '#38BDF8' },
              { name: 'TypeScript', svg: 'typescript.svg', invertOnDark: true },
            ]}
            speed="fast"
            direction="left"
            />
          </BaseCard>
        </GridItem>

        {/* Additional Project Cards */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4">
          <ProjectCard
            className="h-full"
            content={showcaseProjects[0]}
          />
        </GridItem>

        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4">
          <ProjectCard
            className="h-full"
            content={showcaseProjects[1]}
          />
        </GridItem>

        {/* CosineTerrainCard for 3D demonstration */}
        <GridItem className="col-span-8 md:col-span-8 md:row-span-2 lg:col-span-5 lg:row-span-1">
          <CosineTerrainCard 
            className="h-full" 
            variant="card" 
            renderPreset="wireframe" 
            materialType="basic"
            speed={2}
            cameraHeight={3}
          />
        </GridItem>

        {/* VideoCard in background mode */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4">
          <VideoCard
            className="h-full"
            displayMode="background"
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            title="Second Background Video"
            overlay={true}
            BackgroundVideoComponent={StandardBackgroundVideo}
            content={{
              title: "Another Background Video",
              description: "Second StandardBackgroundVideo demonstration",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              displayMode: "background" as const,
              autoplay: true
            }}
          />
        </GridItem>
      </BentoLayout>
    </main>
  )
}