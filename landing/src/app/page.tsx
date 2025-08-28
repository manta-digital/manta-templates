import { Container, QuoteCard, ProjectCard, ArticleCard, BentoLayout, GridItem } from '@/lib/ui-core';
import { nextjsContentProvider } from '@/lib/ui-adapters';
import type { QuoteContent } from '@/lib/ui-core';
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

export default async function Home() {
  // Load content using ui-adapters
  let quoteContent: QuoteContent | null = null;
  let guidesContent: GuidesContent | null = null;
  
  try {
    const quote = await nextjsContentProvider.loadContent<QuoteContent>('sample-quote', 'quotes');
    quoteContent = quote.frontmatter;
  } catch (error: unknown) {
    console.error('Error loading quote content:', error);
  }

  try {
    const guides = await nextjsContentProvider.loadContent('guides-docs', 'main');
    guidesContent = guides.frontmatter as GuidesContent;
  } catch (error: unknown) {
    console.error('Error loading guides content:', error);
  }

  return (
    <Container className="py-20">
      <BentoLayout gap={8} columns="grid-cols-6">
        <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
          <ProjectCard
            ImageComponent={Image}
            LinkComponent={Link}
            imageProps={{
              width: 600,
              height: 400
            }}
            content={{
              title: 'Next.js Starter',
              description: 'Modern full-stack starter with responsive grid layouts.',
              techStack: ['Next.js 15', 'Tailwind 4', 'shadcn/radix'],
              image: '/image/blog-sample-image.png',
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
          colSpan="col-span-full md:col-span-2 lg:col-span-4"
          className="md:row-start-2"
        >
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
        </GridItem>
        <GridItem
          colSpan="col-span-full md:col-span-4 lg:col-span-2"
          rowSpan="md:row-span-2 lg:row-span-3"
          className="lg:row-start-1 md:col-start-3 lg:col-start-5"
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
        <GridItem
          colSpan="col-span-full md:col-span-6 lg:col-span-4"
          className="h-full"
        >
          <div className="h-full">
            {quoteContent && <QuoteCard content={quoteContent} />}
          </div>
        </GridItem>
      </BentoLayout>
    </Container>
  );
}
