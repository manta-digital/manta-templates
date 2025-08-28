import { Container, ProjectCard, ArticleCard, BentoLayout, GridItem, ComingSoonOverlay } from '@/lib/ui-core';
import { nextjsContentProvider } from '@/lib/ui-adapters';
import Image from 'next/image';
import Link from 'next/link';
import GuidesCard from '@/components/cards/GuidesCard';

interface GuidesContent {
  title: string;
  subtitle: string;
  comingSoonFeature: {
    title: string;
    icon: string;
    codeExample: string;
  };
  features: Array<{
    icon: string;
    label: string;
  }>;
  documentation: Array<{
    title: string;
    description: string;
    action: string;
    href: string;
  }>;
  footerAction: {
    text: string;
    href: string;
  };
}

interface ProjectContent {
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  demoUrl: string;
  features: Array<{ label: string }>;
  actions: Array<{ label: string; href: string; variant?: 'primary' | 'outline' | 'secondary' }>;
  comingSoon?: boolean;
  comingSoonOverlay?: {
    color?: 'teal' | 'purple' | 'amber';
    label?: string;
    blurAmount?: 'sm' | 'md' | 'lg';
  };
}

export default async function Home() {
  // Load content using ui-adapters
  let guidesContent: GuidesContent | null = null;
  let astroContent: ProjectContent | null = null;

  try {
    const guides = await nextjsContentProvider.loadContent('guides-docs', 'main');
    guidesContent = guides.frontmatter as GuidesContent;
  } catch (error: unknown) {
    console.error('Error loading guides content:', error);
  }

  try {
    const astro = await nextjsContentProvider.loadContent('astro-starter', 'main');
    astroContent = astro.frontmatter as ProjectContent;
  } catch (error: unknown) {
    console.error('Error loading astro content:', error);
  }

  return (
    <Container className="pb-20">
      <BentoLayout gap={8} columns="grid-cols-6">
        <GridItem colSpan="col-span-full md:col-span-3">
          <ProjectCard
            ImageComponent={Image}
            LinkComponent={Link}
            imageProps={{
              width: 600,
              height: 400
            }}
            content={{
              title: 'Next.js Starter',
              description: 'Modern full-stack Next.js starter template with responsive grid layouts and theming that actually works.',
              techStack: ['Next.js 15', 'Tailwind 4', 'shadcn/radix'],
              image: '/image/nextjs-template.png',
              repoUrl: 'https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs',
              features: [
                { label: 'Fast & modern React framework', icon: 'zap' },
                { label: 'Production-ready components', icon: 'zap', color: 'primary' },
              ],
              actions: [
                { label: 'View on GitHub', href: 'https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs', variant: 'outline' },
              ],
            }}
          />
        </GridItem>
        <GridItem
          colSpan="col-span-full row-span-1 md:col-span-3"
          className="md:row-start-2 lg:row-start-2"
        >
          {astroContent ? (
            <div className="h-full relative">
              <ProjectCard
                ImageComponent={() => (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                    <div className="text-white/80 text-4xl font-bold">🚀</div>
                  </div>
                )}
                LinkComponent={Link}
                content={{
                  ...astroContent,
                  image: '/image/placeholder-astro.png', // fallback
                }}
              />
              {astroContent.comingSoon && (
                <div className="absolute inset-0 z-10">
                  <ComingSoonOverlay 
                    color={astroContent.comingSoonOverlay?.color || "purple"}
                    label={astroContent.comingSoonOverlay?.label || "Coming Soon"}
                    blurAmount={astroContent.comingSoonOverlay?.blurAmount || "md"}
                  >
                    <div className="w-full h-full" />
                  </ComingSoonOverlay>
                </div>
              )}
            </div>
          ) : (
            <ArticleCard 
              className="h-full" 
              ImageComponent={Image} 
              LinkComponent={Link} 
              title="Astro Starter" 
              subtitle="Template" 
              description="Modern static site generator with island architecture for optimal performance." 
              image="/image/blog-sample-image.png" 
              href="https://astro.build" 
              imageProps={{ 
                width: 600, 
                height: 400 
              }} 
            />
          )}
        </GridItem>
        <GridItem
          colSpan="col-span-full md:col-span-3"
          rowSpan="md:row-span-2"
        >
          {guidesContent && guidesContent.title && guidesContent.features ? (
            <GuidesCard content={guidesContent} className="h-full" />
          ) : (
            <ArticleCard 
              className="h-full" 
              ImageComponent={Image} 
              LinkComponent={Link} 
              title="Documentation & Guides" 
              subtitle="Resources" 
              description="Comprehensive documentation and guides for getting started with modern web development." 
              image="/image/blog-sample-image.png" 
              href="/examples" 
              imageProps={{ 
                width: 600, 
                height: 400 
              }} 
            />
          )}
        </GridItem>
        {/* Quote Card 
        <GridItem
          colSpan="col-span-full md:col-span-6 lg:col-span-4"
          className="h-full"
        >
          <div className="h-full">
            {quoteContent && <QuoteCard content={quoteContent} />}
          </div>
        </GridItem>
        */}
      </BentoLayout>
    </Container>
  );
}
