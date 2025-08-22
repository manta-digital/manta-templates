import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BentoLayout, GridItem, GradientCard, BaseCard, CosineTerrainCard, CardCarousel, BlogCardImage, ProjectCard, QuoteCard, VideoCard } from '@manta-templates/ui-core';
import { TechnologyScroller } from '@/components/ui/TechnologyScroller';
import ArticleCard from '@/components/cards/articles/ArticleCard';
import BackgroundVideoComponent from '@/components/ui/BackgroundVideoComponent';
import { getArticleBySlug } from '@/lib/content/loader';

// Mock content loading function (replace with actual content loading)
async function loadExampleContent() {
  // Load real article content from markdown
  const themeGuideArticle = await getArticleBySlug('theme-guide');
  
  return {
    carouselHero: {
      title: "Semantic Design System",
      excerpt: "Building consistent user experiences with design tokens and systematic approach to component architecture.",
      coverImageUrl: "/image/blog-sample-image.png",
      category: "Design System",
      author: "Manta Templates",
      date: "2024-01-15",
    },
    carouselProject: {
      title: "Semantic Colors",
      description: "Cards using accent and foreground tokens with comprehensive theming support",
      techStack: ["Next.js", "Tailwind v4", "Radix"],
      image: "/image/blog-sample-image.png",
      repoUrl: "https://github.com/manta-templates/semantic-colors",
      displayVariant: 'showcase' as const,
      features: [
        { label: "Structured and Customizable Project Phases" },
        { label: "AI-driven Task Discovery and Expansion" },
        { label: "Parameterized Prompts" },
        { label: "Automated Code Reviews" },
      ]
    },
    featuredArticle: {
      title: "Colors and Themes",
      excerpt: "Radix scales with semantic aliasing and palette switching. Testing making this a longer description to see how it handles the card layout.",
      coverImageUrl: "/image/blog-sample-image.png",
      category: "Design",
      author: "Design Team",
      date: "2024-01-20",
    },
    designQuote: {
      quote: "Make the easy path the right path—semantic tokens everywhere.",
      author: "Manta Templates",
      role: "Design Philosophy"
    },
    themeGuideArticle: {
      title: themeGuideArticle.frontmatter.title,
      subtitle: themeGuideArticle.frontmatter.tags?.[0] || 'Design',
      description: themeGuideArticle.frontmatter.excerpt,
      image: themeGuideArticle.frontmatter.coverImage,
      href: `/articles/${themeGuideArticle.slug}`
    }
  };
}

export default async function TestExample2Page() {
  // Load content server-side
  const content = await loadExampleContent();

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
          >
            {/* Carousel hero content loaded from server */}
            <BlogCardImage
              className="h-full"
              title={content.carouselHero.title}
              excerpt={content.carouselHero.excerpt}
              coverImageUrl={content.carouselHero.coverImageUrl}
              category={content.carouselHero.category}
              author={content.carouselHero.author}
              date={content.carouselHero.date}
              slug="/content/example-2/carousel-hero"
              textColorClassName="text-white"
            />
            <ProjectCard
              className="h-full"
              content={{
                title: content.carouselProject.title,
                description: content.carouselProject.description,
                techStack: content.carouselProject.techStack,
                image: content.carouselProject.image,
                repoUrl: content.carouselProject.repoUrl,
                displayVariant: content.carouselProject.displayVariant,
                features: content.carouselProject.features,
              }}
            />

            {/* Background video content using VideoCard with Link wrapper */}
            {(() => {
              const gameHref = "https://tanks.erikcorkran.com/"; // Example game link
              const videoCard = (
                <div className="relative w-full h-full">
                  <VideoCard
                    className="p-0 h-full"
                    title="Tank Battle Game"
                    thumbnailUrl="https://picsum.photos/400/225?random=7"
                    videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    content={{
                      title: "Tank Battle Game",
                      description: "Epic multiplayer tank warfare",
                      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                      displayMode: "background",
                      autoplay: true,
                      controls: false
                    }}
                    overlay={false}
                    ImageComponent={Image}
                    LinkComponent={Link}
                    BackgroundVideoComponent={BackgroundVideoComponent}
                  />
                  {/* Text overlay positioned outside VideoCard for reliable visibility */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/60 via-40% to-transparent pointer-events-none min-h-[50%] flex flex-col justify-end z-50">
                    <h3 className="text-white text-lg md:text-xl font-bold leading-tight">Tank Battle Game</h3>
                    <p className="text-white/90 text-sm md:text-base mt-2 leading-relaxed">Epic multiplayer tank warfare</p>
                  </div>
                </div>
              );
              
              // Apply your erikcorkran.com pattern: conditional Link wrapper
              return gameHref ? (
                <Link href={gameHref} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  {videoCard}
                </Link>
              ) : (
                videoCard
              );
            })()}
          </CardCarousel>
        </GridItem>

        {/* Featured article loaded from server */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-2">
          <ArticleCard 
            className="h-full"
            title={content.themeGuideArticle.title}
            subtitle={content.themeGuideArticle.subtitle}
            description={content.themeGuideArticle.description}
            image={content.themeGuideArticle.image}
            href={content.themeGuideArticle.href}
          />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-3">
          <BlogCardImage
              className="h-full"
              title={content.featuredArticle.title}
              excerpt={content.featuredArticle.excerpt}
              coverImageUrl={content.featuredArticle.coverImageUrl}
              category={content.featuredArticle.category}
              author={content.featuredArticle.author}
              date={content.featuredArticle.date}
              slug="/articles/theme-guide"
              textColorClassName="text-white"
            />
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

        {/* Quote loaded from server */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-4">
          <QuoteCard
            quote={content.designQuote.quote}
            author={content.designQuote.author}
          />
        </GridItem>
      </BentoLayout>
    </main>
  );
}