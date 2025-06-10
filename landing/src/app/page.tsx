"use client";

import {
  Container,
  GridLayout,
  GridItem,
  BlogCardImage,
  ProjectCard,
  ThreeJSCard
} from "@/components"; 
import { BentoLayout } from "@/components/layouts/bento-layout";
import BentoGrid from "@/app/examples/bentogrid/BentoGrid";
import PortfolioGrid from "@/app/examples/portfolio/PortfolioGrid";
import GridLayoutExample from "@/app/examples/gridlayout/GridLayoutExample";
import MasonryGrid from "@/app/examples/masonrygrid/MasonryGrid";
import { useTheme } from "@/context/themecontext";
import Layout from '@/components/layout';
import FeatureCardContainer from "@/components/cards/FeatureCardContainer";
import FeatureCardWrapper from "@/components/cards/FeatureCardWrapper";
import BackgroundVideo from "@/components/ui/background-video";
import VideoPlayer from "@/components/ui/video-player";
import QuoteCardContainer from "@/components/cards/QuoteCardContainer";
import ProjectCardContainer from "@/components/cards/ProjectCardContainer";

export default function Home() {
  const { theme } = useTheme();

  return (
    <Layout>
      {/* Hero */}
      <Container className="pt-20 pb-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold">manta-templates</h1>
          <p className="text-lg text-muted-foreground text-left">
            A growing monorepo of customizable, AI-ready templates for modern web and app development. Designed to help developers, designers, and builders move fast with structured guidance and flexible layouts.
          </p>
          <ul className="text-left text-muted-foreground list-disc list-inside text-base">
            <li><strong>Next.js templates</strong> with responsive grid layouts and bento-style UIs</li>
            <li><strong>Astro templates</strong> (coming soon)</li>
            <li><strong>Python apps and Qt templates</strong> (coming soon)</li>
            <li><strong>AI project guidance</strong> with structured prompts and workflows</li>
            <li><strong>Feature-rich components</strong>: cards, quotes, 3D (Three.js), background and player video</li>
          </ul>
        </div>
      </Container>

      {/* Templates Showcase */}
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Templates</h2>
          <p className="text-muted-foreground">
            Choose a starter template to kick off your project.
          </p>
        </div>
        <BentoLayout gap={8} columns="grid-cols-6">
          <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
            <ProjectCardContainer
              slug="nextjs-starter"
              mode={theme}
            />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-2 lg:col-span-4"
            className="md:row-start-2"
          >
            <FeatureCardContainer slug="astro-starter" mode={theme} />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-4 lg:col-span-2" 
            rowSpan="md:row-span-2 lg:row-span-3"
            className="lg:row-start-1 md:col-start-3 lg:col-start-5"
          >
            <FeatureCardContainer slug="guides-docs" mode={theme} />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-6 lg:col-span-4"
            className="h-full"
          >
            <div className="h-full">
              <QuoteCardContainer slug="art-of-programming" />
            </div>
          </GridItem>
        </BentoLayout>
      </Container>

      {/* Examples Showcase */}
      <Container className="pb-20">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Examples</h2>
          <p className="text-muted-foreground">
            Explore example subprojects and layouts.
          </p>
        </div>
        <GridLayout
          gridData={{
            default: [[6], [6], [6], [6], [3,3], [3,3]],
            md: [[6], [3,3], [3,3], [3,3], [6]],
            lg: [[4,2], [2,2,2], [2,2,2]],
          }}
          gap="1rem"
          minRowHeight="200px"
        >
          <BlogCardImage
            title="Blog Example"
            excerpt="MDX-driven content, blog layout"
            coverImageUrl="/image/blog-sample-image.png"
            slug="/blog"
            className="h-full"
            imageMaxHeight="max-h-52"
          />
          <ProjectCard
            title="BentoGrid Example"
            description="BentoGrid layout showcase"
            techStack={[]}
            demoUrl="/examples/bentogrid"
            overlay
          >
            <BentoGrid mini />
          </ProjectCard>
          <ProjectCard
            title="GridLayout Example"
            description="Example container-driven layout"
            techStack={[]}
            demoUrl="/examples/gridlayout"
            overlay
          >
            <GridLayoutExample mini />
          </ProjectCard>
          <ProjectCard
            title="MasonryGrid Example"
            description="Masonry grid showcase"
            techStack={[]}
            demoUrl="/examples/masonrygrid"
            overlay
          >
            <MasonryGrid mini />
          </ProjectCard>
          <ProjectCard
            title="Portfolio Example"
            description="Portfolio layout showcase"
            techStack={[]}
            demoUrl="/examples/portfolio"
            overlay
          >
            <PortfolioGrid mini />
          </ProjectCard>
          <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
            <FeatureCardWrapper mode={theme} className={`h-full ${theme === 'dark' ? 'bg-black bg-none' : ''}`}>
              <ThreeJSCard className="w-full h-full" />
            </FeatureCardWrapper>
          </GridItem>
          <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
            <FeatureCardWrapper mode={theme} className={`h-full ${theme === 'dark' ? 'bg-black bg-none' : ''}`}>
              <BackgroundVideo
                key="background-video-component"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                poster="/image/blog-sample-image.png"
                className="w-full h-full"
                autoplay={true}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">Background Video Demo</h3>
                </div>
              </BackgroundVideo>
            </FeatureCardWrapper>
          </GridItem>
          <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
            <FeatureCardWrapper mode={theme} className={`h-full ${theme === 'dark' ? 'bg-black bg-none' : ''}`}>
              <VideoPlayer
                url="https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                width="100%"
                height="100%"
                className="w-full h-full"
              />
            </FeatureCardWrapper>
          </GridItem>
        </GridLayout>
      </Container>
    </Layout>
  );
}
