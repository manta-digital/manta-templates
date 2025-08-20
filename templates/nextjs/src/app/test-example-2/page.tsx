"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { BentoLayout, GridItem, GradientCard, BlogCardImage, ProjectCard, BaseCard, QuoteCard, CosineTerrainCard, CardCarousel } from '@manta-templates/ui-core';
import BackgroundVideo from '@/components/ui/background-video';
import { TechnologyScroller } from '@/components/ui/TechnologyScroller';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article, Project, Quote } from '@/lib/content/schemas';

// Content data - simulating loaded content for testing phase
const contentData = {
  carouselHero: {
    frontmatter: {
      title: "Semantic Design System",
      excerpt: "Building consistent user experiences with design tokens and systematic approach to component architecture.",
      coverImage: "/image/blog-sample-image.png",
      publishedAt: new Date("2024-01-15"),
      featured: true,
      tags: ["design-system", "tokens", "ui"]
    } as Article,
    slug: "carousel-hero"
  },
  carouselProject: {
    frontmatter: {
      title: "Semantic Colors",
      description: "Cards using accent and foreground tokens with comprehensive theming support",
      techStack: ["Next.js", "Tailwind v4", "Radix"],
      image: "/image/blog-sample-image.png",
      repoUrl: "https://github.com/manta-templates/semantic-colors",
      features: [
        { label: "Structured and Customizable Project Phases", icon: "zap" },
        { label: "AI-driven Task Discovery and Expansion", icon: "zap", color: "primary" },
        { label: "Parameterized Prompts", icon: "zap", color: "primary" },
        { label: "Automated Code Reviews", icon: "zap", color: "primary" },
      ]
    } as Project,
    slug: "carousel-project"
  },
  carouselVideo: {
    frontmatter: {
      title: "Background Video Demo",
      excerpt: "Interactive video backgrounds with semantic overlay content and accessibility considerations.",
      coverImage: "/image/blog-sample-image.png",
      publishedAt: new Date("2024-01-10"),
      tags: ["video", "background", "demo"]
    } as Article,
    slug: "carousel-video"
  },
  featuredArticle: {
    frontmatter: {
      title: "Colors and Themes",
      excerpt: "Radix scales with semantic aliasing and palette switching. Testing making this a longer description to see how it handles the card layout.",
      coverImage: "/image/blog-sample-image.png",
      publishedAt: new Date("2024-01-20"),
      featured: true,
      tags: ["colors", "themes", "radix", "palette"]
    } as Article,
    slug: "theme-guide"
  },
  designQuote: {
    frontmatter: {
      quote: "Make the easy path the right path—semantic tokens everywhere.",
      author: "Manta Templates",
      context: "Design system principles and developer experience philosophy"
    } as Quote,
    slug: "design-philosophy"
  }
};

export default function TestExample2Page() {
  // Use the content data (simulating loaded content for testing phase)
  const carouselHeroContent = contentData.carouselHero;
  const carouselProjectContent = contentData.carouselProject;
  const carouselVideoContent = contentData.carouselVideo;
  const featuredArticle = contentData.featuredArticle;
  const designQuote = contentData.designQuote;

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
            {/* Carousel hero content loaded from markdown */}
            <BlogCardImage
              className="h-full"
              title={carouselHeroContent.frontmatter.title}
              excerpt={carouselHeroContent.frontmatter.excerpt}
              coverImageUrl={carouselHeroContent.frontmatter.coverImage}
              slug={`/content/example-2/carousel-hero`}
              textColorClassName="text-white"
            />
            <ProjectCard
              className="h-full"
              content={{
                title: carouselProjectContent.frontmatter.title,
                description: carouselProjectContent.frontmatter.description,
                techStack: carouselProjectContent.frontmatter.techStack,
                displayVariant: 'showcase',
                image: carouselProjectContent.frontmatter.image,
                repoUrl: carouselProjectContent.frontmatter.repoUrl,
                features: carouselProjectContent.frontmatter.features || [],
                actions: [
                  { label: 'View on GitHub', href: carouselProjectContent.frontmatter.repoUrl, variant: 'outline' },
                ],
              }}
            />

            {/* Background video content loaded from markdown */}
            <BaseCard className="h-full overflow-hidden relative !border-0 p-0">
              <BackgroundVideo full src="https://www.w3schools.com/html/mov_bbb.mp4" poster={carouselVideoContent.frontmatter.coverImage} className="w-full h-full" autoplay>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-card-foreground text-xl font-semibold">{carouselVideoContent.frontmatter.title}</h3>
                </div>
              </BackgroundVideo>
            </BaseCard>
          </CardCarousel>
        </GridItem>

        {/* Featured article loaded from markdown */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2">
          <BlogCardImage
            className="h-full"
            title={featuredArticle.frontmatter.title}
            excerpt={featuredArticle.frontmatter.excerpt}
            coverImageUrl={featuredArticle.frontmatter.coverImage}
            slug={`/articles/${featuredArticle.slug}`}
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

        {/* Quote loaded from markdown */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <QuoteCard quote={designQuote.frontmatter.quote} author={designQuote.frontmatter.author} />
        </GridItem>
      </BentoLayout>
    </main>
  );
}