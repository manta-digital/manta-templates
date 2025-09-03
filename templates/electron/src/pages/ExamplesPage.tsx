import { useMemo } from 'react';
import { cn } from '../lib/ui-core/utils';
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
  VideoCard,
  AboutCard
} from '../lib/ui-core';
import { useContentCollection, useContent } from '../lib/ui-core/content/hooks';
import { contentProvider } from '../lib/content';
//import type { ProjectContent, QuoteContent, VideoContent, AboutContent } from '../lib/ui-core/content';
import type { ProjectContent, QuoteContent, VideoContent } from '../lib/ui-core/content';
import type { AboutContent } from '../lib/ui-core/types/content';

export default function ExamplesPage() {
  // Memoize filter objects to prevent infinite re-renders
  const projectFilters = useMemo(() => ({ type: 'project' as const }), []);
  const quoteFilters = useMemo(() => ({ type: 'quote' as const }), []);
  const videoFilters = useMemo(() => ({ type: 'video' as const }), []);
  const technologyFilters = useMemo(() => ({ type: 'technology' as const }), []);
  const articleFilters = useMemo(() => ({ type: 'article' as const }), []);

  // Load content collections with memoized filters
  const { content: projects, loading: projectsLoading, error: projectsError } = useContentCollection<ProjectContent>(
    projectFilters, 
    contentProvider
  );

  const { content: quotes, loading: quotesLoading, error: quotesError } = useContentCollection<QuoteContent>(
    quoteFilters, 
    contentProvider
  );

  const { content: videos, loading: videosLoading, error: videosError } = useContentCollection<VideoContent>(
    videoFilters, 
    contentProvider
  );

  const { content: technologies, error: technologiesError } = useContentCollection<any>(
    technologyFilters, 
    contentProvider
  );

  const { content: articles } = useContentCollection<any>(
    articleFilters, 
    contentProvider
  );

  const { content: aboutContent } = useContent<AboutContent>(
    'about/sample-profile',
    contentProvider
  );

  // Debug states
  console.log('Content states:', {
    projects: { data: projects, loading: projectsLoading, error: projectsError },
    quotes: { data: quotes, loading: quotesLoading, error: quotesError },
    videos: { data: videos, loading: videosLoading, error: videosError }
  });

  // Handle errors first
  if (projectsError) {
    console.error('Projects error:', projectsError);
    return <div>Error loading projects: {projectsError.message}</div>;
  }
  if (quotesError) {
    console.error('Quotes error:', quotesError);
    return <div>Error loading quotes: {quotesError.message}</div>;
  }
  if (videosError) {
    console.error('Videos error:', videosError);
    return <div>Error loading videos: {videosError.message}</div>;
  }

  // Skip loading state to avoid annoying flash - content loads fast enough

  return (
    <main className="min-h-screen px-6 pt-0 pb-6 md:px-10 md:pt-0 md:pb-10">
      <BentoLayout className={cn('max-w-7xl mx-auto')} gap={6} rowHeight="minmax(200px, auto)" columns="grid-cols-8">
        {/* Hero */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2">
          <GradientCard className="h-full rounded-lg" title="Theme Test Grid" description="Switch palette and dark/light to validate tokens" from="accent-7" to="accent-10" />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-4 md:row-span-2 lg:row-span-2 xl:col-span-4 xl:row-span-2">
          <CardCarousel className="h-full" itemClassName="h-full" visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }} autoPlay={6000} infinite showArrows showDots={false} showControls={false}>

            {/* Simple article sample inside carousel to test image hover */}
            <ArticleCard 
              className="h-full" 
              title="Carousel Article" 
              subtitle="Demo" 
              description="Testing image hover inside carousel." 
              image="/image/blog/blog-sample-image.png" 
              href="/blog/sample-post" 
            />
            {projects && projects.length > 0 && (
              <ProjectCard
                className="h-full"
                content={projects[0].frontmatter as any}
              />
            )}

            {/* Background video sample using ui-core VideoCard (no injection needed!) */}
            {videos && videos.length > 0 && (
              <VideoCard
                className="h-full"
                displayMode={videos[0].frontmatter.displayMode}
                videoUrl={videos[0].frontmatter.videoUrl}
                thumbnailUrl={videos[0].frontmatter.thumbnail}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-card-foreground text-xl font-semibold">{videos[0].frontmatter.title}</h3>
                </div>
              </VideoCard>
            )}
          </CardCarousel>
        </GridItem>

        {/* Featured article */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-3 lg:row-span-2 xl:col-span-3">
          <ArticleCard 
            className="h-full" 
            title="Colors and Themes" 
            subtitle="Research" 
            description="Radix scales with semantic aliasing and palette switching.  Testing making this a longer description to see how it handles the card layout." 
            image="/image/blog/blog-sample-image.png" 
            href="/blog/sample-post" 
          />
        </GridItem>

        {/* Blog image card */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-5">
          {articles && articles.length > 0 && (
            <BlogCardImage 
              className='h-full' 
              title={articles[0].frontmatter.title} 
              excerpt={articles[0].frontmatter.description} 
              coverImageUrl={articles[0].frontmatter.image} 
              textColorClassName="text-white" 
            />
          )}
        </GridItem>

        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 md:col-span-8 md:row-span-2 lg:col-span-5 lg:row-span-1">
          <CosineTerrainCard 
            className="h-full" 
            variant="card" 
            renderPreset="wireframe" 
            materialType="basic"
            backgroundColor="var(--color-background)"
            materialColor="var(--color-accent-11)"
          />
        </GridItem>

        {/* Quote */}
        <GridItem className="col-span-8 md:col-span-4 lg:col-span-4 h-full">
          {quotes && quotes.length > 0 && (
            <QuoteCard 
              className="md:col-span-4 h-full"
              quote={quotes[0].frontmatter.quote} 
              author={quotes[0].frontmatter.author} 
            />
          )}
        </GridItem>
        
        <GridItem className="col-span-8 row-span-2 md:col-span-4">
            <GradientCard
              className="h-full p-0 rounded-lg border-none [&>div:last-child]:h-full [&>div:last-child>div]:h-full [&>div:last-child>div]:p-0"
              from="accent-9" to="accent-11"
            >
              {aboutContent && (
                <AboutCard
                  className="h-full bg-transparent text-white border-1 border-white/30"
                  title={aboutContent.frontmatter.title}
                  description={aboutContent.frontmatter.description}
                  avatar={aboutContent.frontmatter.avatar}
                  socials={aboutContent.frontmatter.socials}
                  contentHtml={aboutContent.contentHtml}
                />
              )}
            </GradientCard>
          </GridItem>

          <GridItem className="col-span-8 md:col-span-8 lg:col-span-8">
          <BaseCard className={cn('h-full w-full flex flex-col justify-center')}>
            {technologies && technologies.length > 0 && (
              <TechnologyScroller 
                items={technologies[0].frontmatter.items}
                speed={technologies[0].frontmatter.speed}
                direction={technologies[0].frontmatter.direction}
              />
            )}
          </BaseCard>
        </GridItem>

      </BentoLayout>
    </main>
  );
}