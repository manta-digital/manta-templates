"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  BlogCard, 
  BlogCardImage, 
  BlogCardWide, 
  ArticleCard,
  ProjectCard, 
  QuoteCard, 
  BentoLayout, 
  GridItem, 
  GradientCard,
  AnimatedCard,
  VideoCard,
  AboutCard,
  ThreeJSCard,
  CosineTerrainCard,
  CardCarousel
} from '@manta-templates/ui-core';
import type { SocialIcons } from '@manta-templates/ui-core';
import { Github, Linkedin, Mail, X } from 'lucide-react';

// Background video component for autoplay functionality
const BackgroundVideoComponent: React.FC<{
  src: string;
  poster?: string;
  autoplay?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, poster, autoplay, className, children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = true;
    
    const timer = setTimeout(() => {
      video.play().catch(error => {
        console.warn('Autoplay failed:', error);
      });
    }, 300);
    
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [autoplay]);
  
  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoplay}
      loop
      muted
      playsInline
      controls={false}
      className={cn("absolute inset-0 w-full h-full object-cover", className)}
      onLoadedData={() => {
        if (autoplay && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.warn('Autoplay failed on data load:', error);
          });
        }
      }}
    >
      {children}
    </video>
  );
};

// Social icons for AboutCard
const socialIcons: SocialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  x: X,
  twitter: X
};

export default function TestExtractedPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Extracted Components Test</h1>
        <p className="text-muted-foreground">
          Testing extracted ui-core components with Next.js injection, using the same structure as examples page.
        </p>
      </div>
      
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        <GridItem className="col-span-8 md:col-span-8 md:row-span-2 lg:row-span-1">
          <CosineTerrainCard className="h-full" variant="card" renderPreset="wireframe" materialType="basic" />
        </GridItem>

        {/* Hero - using BlogCardImage */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-2 xl:row-span-2">
          <BlogCardImage 
            className="h-full" 
            title="Hero Test Card" 
            excerpt="Testing BlogCardImage in hero position with dependency injection." 
            coverImageUrl="https://picsum.photos/600/400?random=1"
            category="Testing"
            author="Claude"
            ImageComponent={Image}
            LinkComponent={Link}
          />
        </GridItem>

        {/* Project spotlight - using ProjectCard */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2">
          <ProjectCard
            className="h-full"
            title="Showcase Project"
            description="Testing ProjectCard with showcase variant and dependency injection"
            techStack={["React", "TypeScript", "Next.js"]}
            repoUrl="https://github.com/test/showcase"
            content={{
              title: 'UI Core Components',
              description: 'Framework-agnostic component library with dependency injection',
              techStack: ['React', 'TypeScript', 'Tailwind v4'],
              displayVariant: 'showcase',
              image: 'https://picsum.photos/600/400?random=2',
              repoUrl: 'https://github.com/manta-templates/ui-core',
              features: [
                { label: 'Framework Agnostic Design', icon: 'zap'},
                { label: 'Dependency Injection Pattern', icon: 'zap', color: 'primary' },
                { label: 'Next.js Optimized', icon: 'zap', color: 'primary' },
                { label: 'Tailwind v4 Compatible', icon: 'zap', color: 'primary' },
              ],
              actions: [
                { label: 'View on GitHub', href: 'https://github.com/manta-templates/ui-core', variant: 'outline' },
              ],
            }}
            ImageComponent={Image}
            LinkComponent={Link}
          />
        </GridItem>

        {/* ArticleCard demo - validates Next.js Image/Link injection */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-2 lg:row-span-2">
          <ArticleCard
            className="h-full"
            title="Featured Article"
            subtitle="Architecture"
            description="Testing ArticleCard with injected Next.js primitives and imageProps passthrough."
            image="https://picsum.photos/800/500?random=9"
            href="#"
            ImageComponent={Image}
            LinkComponent={Link}
            imageProps={{ fill: true, priority: true }}
          />
        </GridItem>

        {/* Content Loading Patterns Demo */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2">
          <div className="h-full bg-card border rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Content Loading Patterns</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ArticleCard supports three content loading patterns:
            </p>
            <div className="flex-1 space-y-3 text-xs">
              <div className="border rounded p-3">
                <strong className="text-green-600">✓ Hardcoded Props</strong>
                <code className="block mt-1 text-gray-600">
                  title=&quot;My Title&quot; description=&quot;...&quot;
                </code>
              </div>
              <div className="border rounded p-3">
                <strong className="text-blue-600">→ Content Loading</strong>
                <code className="block mt-1 text-gray-600">
                  contentProvider={"{provider}"} contentSlug=&quot;article&quot;
                </code>
              </div>
              <div className="border rounded p-3">
                <strong className="text-purple-600">⚡ Mixed Mode</strong>
                <code className="block mt-1 text-gray-600">
                  contentSlug=&quot;article&quot; title=&quot;Override&quot;
                </code>
              </div>
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs">
                <strong>Next.js Adapter Available:</strong><br/>
                <code>@manta-templates/ui-adapters-nextjs</code>
              </div>
            </div>
          </div>
        </GridItem>

        {/* Featured article - using BlogCard */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2">
          <BlogCard 
            className="h-full" 
            title="Component Architecture" 
            date="2024-01-25"
            excerpt="Deep dive into the dependency injection architecture that makes these components framework-agnostic while maintaining optimal performance."
            coverImageUrl="https://picsum.photos/400/300?random=3"
            author="UI Team"
            ImageComponent={Image}
            LinkComponent={Link}
          />
        </GridItem>

        {/* Blog image card with blur */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-3">
          <BlogCardImage 
            className="h-full"
            title="Blur Effects Demo" 
            excerpt="Testing blur and dim effects on background images with text overlays." 
            coverImageUrl="https://picsum.photos/700/400?random=4"
            blur={true}
            blurAmount="md"
            category="Visual Effects"
            author="Design Team"
            ImageComponent={Image}
            LinkComponent={Link}
          />
        </GridItem>

        {/* Overlay ProjectCard testing */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-8 lg:row-span-1 xl:col-span-8">
          <ProjectCard
            className="h-full"
            title="Overlay Project Demo"
            description="Testing ProjectCard in overlay mode with background image and text overlay effects."
            techStack={["Next.js", "Framer Motion", "Tailwind"]}
            repoUrl="https://github.com/test/overlay-demo"
            // demoUrl="https://overlay-demo.example.com" // Temporarily removed to test hover
            overlay={true}
            ImageComponent={Image}
            LinkComponent={Link}
          >
            {/* Background content for overlay */}
            <Image
              src="https://picsum.photos/800/400?random=5"
              alt="Background for overlay demo"
              fill
              className="object-cover"
            />
          </ProjectCard>
        </GridItem>

        {/* GradientCard variant of the previous BaseCard content */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <GradientCard 
            className="h-full" 
            gradient="sunset" 
            shimmer={true}
          >
            <div className={cn('h-full w-full flex flex-col justify-center items-center text-center')}>
              <h3 className="text-xl font-semibold mb-2">Framework Agnostic</h3>
              <p className="text-muted-foreground">
                These components work with Next.js, Astro, React Router, or pure React through dependency injection.
              </p>
            </div>
          </GradientCard>
        </GridItem>

        {/* Quote card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <QuoteCard 
            quote="The dependency injection pattern allows us to maintain framework-specific optimizations while keeping components truly reusable." 
            author="Manta Templates Team" 
          />
        </GridItem>

        {/* BlogCardWide test */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4 xl:col-span-5">
          <BlogCardWide
            className="h-full"
            title="Wide Blog Card Test"
            excerpt="Testing the BlogCardWide component with Next.js injection"
            coverImageUrl="https://picsum.photos/400/200?random=6"
            author="Test Author"
            date="2024-01-20"
            imageMaxHeight="h-32 sm:h-40 md:h-full"
            ImageComponent={Image}
            LinkComponent={Link}
          />
        </GridItem>

        {/* GradientCard test */}
        <GridItem className="col-span-8 row-span-2 md:col-span-4 lg:row-span-2 xl:col-span-3">
          <GradientCard 
            className="h-full"
            gradient="sunset"
            title="Gradient Card"
            description="Beautiful gradient backgrounds with dependency injection support"
            shimmer={true}
          />
        </GridItem>

        {/* AnimatedCard test */}
        <GridItem className="col-span-8 md:col-span-4 xl:col-span-5">
          <AnimatedCard 
            enabled={true}
            variant="slide-up"
            className="bg-card border rounded-lg p-6 h-full flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold mb-2">Animated Card</h3>
            <p className="text-muted-foreground">This card animates on load with Framer Motion</p>
          </AnimatedCard>
        </GridItem>

        {/* CardCarousel example: 3 slides, infinite, 1 visible */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-8">
          <CardCarousel
            className="h-full"
            itemClassName="h-full"
            visibleCards={{ mobile: 1, tablet: 3, desktop: 3 }}
            infinite
            showArrows
            showDots={false}
          >
            <GradientCard
              className="h-full"
              gradient="sunset"
              title="Carousel Slide One"
              description="GradientCard in carousel"
              shimmer
            />
            <GradientCard
              className="h-full"
              gradient="teal"
              title="Carousel Slide Two"
              description="GradientCard in carousel"
              shimmer
            />
            <GradientCard
              className="h-full"
              gradient="purple"
              title="Carousel Slide Three"
              description="GradientCard in carousel"
              shimmer
            />
          </CardCarousel>
        </GridItem>

        {/* VideoCard test */}
        <GridItem className="col-span-8 row-span-2 md:col-span-4 md:row-span-2">
          <VideoCard
            className="p-0 h-full"
            title="Sample Video"
            thumbnailUrl="https://picsum.photos/400/225?random=7"
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            content={{
              title: "Sample Video",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              displayMode: "background",
              autoplay: true,
              controls: false
            }}
            ImageComponent={Image}
            LinkComponent={Link}
            BackgroundVideoComponent={BackgroundVideoComponent}
          />
        </GridItem>

        {/* AboutCard test */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2">
          <AboutCard 
            className="h-full"
            title="UI Core Developer"
            description="Framework-agnostic component architect"
            avatar="https://picsum.photos/80/80?random=8"
            socials={[
              { platform: 'github', url: 'https://github.com/manta-templates' },
              { platform: 'linkedin', url: 'https://linkedin.com/in/example' },
              { platform: 'mail', url: 'contact@example.com' }
            ]}
            contentHtml="<p>Specializing in building reusable, framework-agnostic components with dependency injection patterns. Creating tools that work seamlessly across Next.js, Astro, and pure React applications.</p><p>Current focus on extracting and refining UI components for maximum reusability and developer experience.</p>"
            ImageComponent={Image}
            LinkComponent={Link}
            socialIcons={socialIcons}
          />
        </GridItem>

        {/* ThreeJSCard test */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2">
          <ThreeJSCard className="h-full" variant="blend" />
        </GridItem>

        {/* ThreeJSCard inside regular card with themed background and border */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2">
          <ThreeJSCard className="h-full" variant="card" />
        </GridItem>
      </BentoLayout>
    </main>
  );
}