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
        <GridItem className="col-span-8">
          <div className="bg-card rounded-lg p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Technology Stack</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {techStack.slice(0, 4).map((tech, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
                  <span className="text-2xl">
                    {tech.name === 'React' && '⚛️'}
                    {tech.name === 'TypeScript' && '🔷'}
                    {tech.name === 'Vite' && '⚡'}
                    {tech.name === 'Tailwind CSS' && '🎨'}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">v{tech.version}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4">
          <CosineTerrainCard 
            className="h-full"
            variant="card"
            speed={2}
            cameraHeight={3}
          />
        </GridItem>

        {/* VideoCard in player mode */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4">
          <VideoCard
            className="h-full"
            displayMode="player"
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            title="Video Player Demo"
            VideoPlayerComponent={StandardVideoPlayer}
            content={{
              title: "Video Player Mode",
              description: "StandardVideoPlayer with custom controls",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              displayMode: "player" as const,
              controls: true
            }}
          />
        </GridItem>
      </BentoLayout>
    </main>
  )
}