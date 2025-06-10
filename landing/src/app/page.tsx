import HomePageClient from './HomePageClient';

import { GridItem, GridLayout } from '@/components';
import {
  BlogCardImage,
  ProjectCard,
  ThreeJSCard,
} from '@/components/cards';
import { BentoLayout } from '@/components/layouts/bento-layout';
import BackgroundVideo from '@/components/ui/background-video';
import VideoPlayer from '@/components/ui/video-player';
import BentoGrid from './examples/bentogrid/BentoGrid';
import GridLayoutExample from './examples/gridlayout/GridLayoutExample';
import MasonryGrid from './examples/masonrygrid/MasonryGrid';
import PortfolioGrid from './examples/portfolio/PortfolioGrid';
import FeatureCardContainer from '@/components/cards/FeatureCardContainer';
import ProjectCardContainer from '@/components/cards/ProjectCardContainer';
import QuoteCardContainer from '@/components/cards/QuoteCardContainer';
import FeatureCardWrapper from '@/components/cards/FeatureCardWrapper';

export default function Home() {
  const templates = (
    <BentoLayout gap={8} columns="grid-cols-6">
      <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
        <ProjectCardContainer slug="nextjs-starter" />
      </GridItem>
      <GridItem
        colSpan="col-span-full md:col-span-2 lg:col-span-4"
        className="md:row-start-2"
      >
        <FeatureCardContainer slug="astro-starter" />
      </GridItem>
      <GridItem
        colSpan="col-span-full md:col-span-4 lg:col-span-2"
        rowSpan="md:row-span-2 lg:row-span-3"
        className="lg:row-start-1 md:col-start-3 lg:col-start-5"
      >
        <FeatureCardContainer slug="guides-docs" />
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
  );

  const examples = (
    <GridLayout
      gridData={{
        default: [[6], [6], [6], [6], [3, 3], [3, 3]],
        md: [[6], [3, 3], [3, 3], [3, 3], [6]],
        lg: [[4, 2], [2, 2, 2], [2, 2, 2]],
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
        <FeatureCardWrapper className="h-full">
          <ThreeJSCard className="w-full h-full" />
        </FeatureCardWrapper>
      </GridItem>
      <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
        <FeatureCardWrapper className="h-full">
          <BackgroundVideo
            key="background-video-component"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="/image/blog-sample-image.png"
            className="w-full h-full"
            autoplay={true}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                Background Video Demo
              </h3>
            </div>
          </BackgroundVideo>
        </FeatureCardWrapper>
      </GridItem>
      <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
        <FeatureCardWrapper className="h-full">
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
  );

  return <HomePageClient templates={templates} examples={examples} />;
}
