import { Container, ProjectCard, ArticleCard, BentoLayout, GridItem, ComingSoonOverlay, CosineTerrainCard, BaseCard, TechnologyScroller, cn, AboutCard, GradientCard, CardCarousel, VideoCard, QuoteCard, ThreeJSCard, BlogCardImage } from '@/lib/ui-core';
import { BackgroundVideoComponent, nextjsContentProvider } from '@/lib/ui-adapters';
import Image from 'next/image';
import Link from 'next/link';
import GuidesCard from '@/components/cards/GuidesCard';
import { Github, Linkedin, Mail, X } from 'lucide-react';

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

interface AboutContent {
  title: string;
  description: string;
  avatar: string;
  socials: Array<{
    platform: 'github' | 'linkedin' | 'x' | 'twitter' | 'mail';
    url: string;
  }>;
}

interface QuoteContent {
  quote: string;
  author: string;
  type?: string;
  featured?: boolean;
  order?: number;
}

interface BlogContent {
  type: 'blog';
  title: string;
  category?: string;
  excerpt?: string;
  coverImageUrl?: string;
  slug?: string;
}

interface VideoContent {
  type: 'video';
  displayMode?: 'background' | 'thumbnail' | 'player';
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
}

interface TechnologyItem {
  name: string;
  svg: string;
  color?: string;
  colorDark?: string;
  invertOnDark?: boolean;
}

interface TechnologyContent {
  title: string;
  description: string;
  items: TechnologyItem[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
}

// Social icons mapping - using Lucide React icons
const socialIcons = {
  github: Github,
  linkedin: Linkedin, 
  mail: Mail,
  x: X,
  twitter: X,  // Twitter uses X icon
};

export default async function Home() {
  // Load content using ui-adapters
  let guidesContent: GuidesContent | null = null;
  let astroContent: ProjectContent | null = null;
  let aboutContent: AboutContent & { contentHtml?: string } | null = null;
  let quoteContent: QuoteContent | null = null;
  let carouselBlogContent: BlogContent | null = null;
  let carouselProjectContent: ProjectContent | null = null;
  let carouselVideoContent: VideoContent | null = null;
  let technologyContent: TechnologyContent | null = null;

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

  try {
    const about = await nextjsContentProvider.loadContent('gallery-about', 'main');
    aboutContent = {
      ...(about.frontmatter as AboutContent),
      contentHtml: about.contentHtml
    };
  } catch (error: unknown) {
    console.error('Error loading about content:', error);
  }

  try {
    const quote = await nextjsContentProvider.loadContent('sample-quote', 'main');
    quoteContent = quote.frontmatter as QuoteContent;
  } catch (error: unknown) {
    console.error('Error loading quote content:', error);
  }

  try {
    const carouselBlog = await nextjsContentProvider.loadContent('carousel-blog', 'main');
    carouselBlogContent = carouselBlog.frontmatter as BlogContent;
  } catch (error: unknown) {
    console.error('Error loading carousel blog content:', error);
  }

  try {
    const carouselProject = await nextjsContentProvider.loadContent('carousel-project', 'main');
    carouselProjectContent = carouselProject.frontmatter as ProjectContent;
  } catch (error: unknown) {
    console.error('Error loading carousel project content:', error);
  }

  try {
    const carouselVideo = await nextjsContentProvider.loadContent('carousel-video', 'main');
    carouselVideoContent = carouselVideo.frontmatter as VideoContent;
  } catch (error: unknown) {
    console.error('Error loading carousel video content:', error);
  }

  try {
    const technologies = await nextjsContentProvider.loadContent('technologies', 'main');
    technologyContent = technologies.frontmatter as TechnologyContent;
  } catch (error: unknown) {
    console.error('Error loading technology content:', error);
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
              height: 400,
            }}
            content={{
              title: "Next.js Template",
              description:
                "Modern full-stack Next.js starter template with responsive grid layouts and theming that actually works.",
              techStack: ["Next.js 15", "Tailwind 4", "shadcn/radix"],
              image: "/image/nextjs-template.png",
              repoUrl:
                "https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs",
              features: [
                { label: "Fast & modern React framework", icon: "zap" },
                {
                  label: "Production-ready components",
                  icon: "zap",
                  color: "primary",
                },
              ],
              actions: [
                {
                  label: "View on GitHub",
                  href: "https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs",
                  variant: "outline",
                },
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
                  image: "/image/placeholder-astro.png", // fallback
                }}
              />
              {astroContent.comingSoon && (
                <div className="absolute inset-0 z-10">
                  <ComingSoonOverlay
                    color={astroContent.comingSoonOverlay?.color || "purple"}
                    label={
                      astroContent.comingSoonOverlay?.label || "Coming Soon"
                    }
                    blurAmount={
                      astroContent.comingSoonOverlay?.blurAmount || "md"
                    }
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
              image="/image/blog/blog-sample-image.png"
              href="/"
              imageProps={{
                width: 600,
                height: 400,
              }}
            />
          )}
        </GridItem>
        <GridItem colSpan="col-span-full md:col-span-3" rowSpan="md:row-span-2">
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
              image="/image/blog/blog-sample-image.png"
              href="/"
              imageProps={{
                width: 600,
                height: 400,
              }}
            />
          )}
        </GridItem>
      </BentoLayout>

      {/* Section separator */}
      <div className="pt-24 pb-8 pl-2">
        <h2 className="text-2xl font-bold mb-2">Component Gallery</h2>
        <p className="text-muted-foreground">
          Interactive showcases of components and layouts
        </p>
      </div>

      {/* Component Gallery */}
      <BentoLayout gap={8} columns="grid-cols-8">
        {/* Cosine terrain visual */}
        <GridItem className="col-span-8 row-span-2 md:col-span-8 md:row-span-2 lg:col-span-8 lg:row-span-2">
          <CosineTerrainCard
            className="h-full"
            variant="card"
            renderPreset="wireframe"
            materialType="basic"
          />
        </GridItem>

        {/* Project spotlight / carousel */}
        <GridItem className="col-span-8 md:col-span-5 md:row-span-2 lg:row-span-2 xl:row-span-2">
          <CardCarousel className="h-full" itemClassName="h-full" visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }} autoPlay={6000} infinite showArrows showDots={false} showControls={false}>

            {/* Blog card from markdown */}
            {carouselBlogContent && (
              <BlogCardImage 
                className="h-full" 
                ImageComponent={Image} 
                LinkComponent={Link} 
                title={carouselBlogContent.title}
                category={carouselBlogContent.category}
                excerpt={carouselBlogContent.excerpt}
                coverImageUrl={carouselBlogContent.coverImageUrl}
                slug={carouselBlogContent.slug}
              />
            )}

            {/* Project card from markdown */}
            {carouselProjectContent && (
              <ProjectCard
                className="h-full"
                ImageComponent={Image}
                LinkComponent={Link}
                imageProps={{
                  width: 600,
                  height: 400
                }}
                content={carouselProjectContent}
              />
            )}

            {/* Video card from markdown */}
            {carouselVideoContent && (
              <VideoCard
                className="h-full"
                displayMode={carouselVideoContent.displayMode || "background"}
                videoUrl={carouselVideoContent.videoUrl}
                thumbnailUrl={carouselVideoContent.thumbnailUrl}
                BackgroundVideoComponent={BackgroundVideoComponent}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-card-foreground text-xl font-semibold">{carouselVideoContent.title}</h3>
                </div>
              </VideoCard>
            )}
          </CardCarousel>
        </GridItem>

        {/* Featured article */}
        <GridItem className="col-span-8 row-span-2 md:col-span-3 md:row-span-2 lg:col-span-3 lg:row-span-2 xl:col-span-3">
          <ArticleCard 
            className="h-full" 
            ImageComponent={Image} 
            LinkComponent={Link} 
            title="Colors and Themes" 
            subtitle="Research" 
            description="Radix scales with semantic aliasing and palette switching.  Testing making this a longer description to see how it handles the card layout." 
            image="/image/blog/blog-sample-image.png" 
            href="/" 
            imageProps={{ 
              width: 600, 
              height: 400 
            }} 
          />
        </GridItem>


        {/* Quote Card */}
        <GridItem className="col-span-8 row-span-1 md:col-span-8 lg:col-span-4">
          {quoteContent && (
            <QuoteCard
              className={cn("h-full w-full flex flex-col justify-center")}
              content={{
                quote: quoteContent.quote,
                author: quoteContent.author
              }}
            />
          )}
        </GridItem>

        {/* About Card */}
        <GridItem className="col-span-8 row-span-2 md:col-span-5 md:row-span-2 lg:col-span-4 lg:row-span-2">

          {/* The wrapped card caused CSS nightmares but let AI write these. */}
          <GradientCard
            className="h-full p-0 rounded-lg border-none [&>div:last-child]:h-full [&>div:last-child>div]:h-full [&>div:last-child>div]:p-0"
            from="accent-9" to="accent-11"
          >
            {aboutContent && (
              <AboutCard
                className="h-full bg-transparent text-white border-1 border-white/30"
                title={aboutContent.title}
                description={aboutContent.description}
                avatar={aboutContent.avatar}
                socials={aboutContent.socials}
                contentHtml={aboutContent.contentHtml}
                ImageComponent={Image}
                LinkComponent={Link}
                socialIcons={socialIcons}
              />
            )}
          </GradientCard>
        </GridItem>

        {/* ThreeJS Card */}
        <GridItem className="col-span-8 row-span-1 md:col-span-3 md:row-span-2 lg:col-span-4 lg:row-span-1">
          <ThreeJSCard
            className="h-full"
            variant="card"
          />
        </GridItem>

        {/* Technology scroller */}
        <GridItem className="col-span-8 md:col-span-8 lg:col-span-8">
          <BaseCard
            className={cn("h-full w-full flex flex-col justify-center")}
          >
            {technologyContent ? (
              <TechnologyScroller
                items={technologyContent.items}
                speed={technologyContent.speed || "fast"}
                direction={technologyContent.direction || "left"}
              />
            ) : (
              <TechnologyScroller
                items={[
                  { name: "Next.js", svg: "nextdotjs.svg", invertOnDark: true },
                  { name: "Tailwind CSS", svg: "tailwindcss.svg", color: "#38BDF8", colorDark: "#38BDF8" },
                  { name: "React", svg: "react.svg", invertOnDark: true },
                  { name: "Docker", svg: "docker.svg", invertOnDark: true },
                  { name: "Figma", svg: "figma-color.svg" },
                  { name: "Python", svg: "python.svg", invertOnDark: true },
                  { name: "TensorFlow", svg: "tensorflow.svg", invertOnDark: true },
                  { name: "Linux", svg: "linux.svg", invertOnDark: true },
                  { name: "LangChain", svg: "langchain.svg", color: "#1C3C3C", colorDark: "#FFFFFF" },
                  { name: "TypeScript", svg: "typescript.svg", color: "#3178C6" },
                ]}
                speed="fast"
                direction="left"
              />
            )}
          </BaseCard>
        </GridItem>
      </BentoLayout>
    </Container>
  );
}
