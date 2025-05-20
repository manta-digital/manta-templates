import Layout from '@/components/layout';
import {
  Container,
  GridLayout,
  GridItem,
  BlogCardImage,
  ProjectCard,
  ProjectFeatureCard,
  ComingSoonFeatureCard,
  GuidesFeatureCard
} from "@/components"; 
import { BentoLayout } from "@/components/layouts/bento-layout";
import BentoGrid from "@/app/examples/bentogrid/BentoGrid";
import PortfolioGrid from "@/app/examples/portfolio/PortfolioGrid";
import GridLayoutExample from "@/app/examples/gridlayout/GridLayoutExample";
import MasonryGrid from "@/app/examples/masonrygrid/MasonryGrid";
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <Container className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold">manta-templates</h1>
          <p className="text-lg text-muted-foreground">
            A monorepo offering customizable templates for Next.js, Astro, and more.
          </p>
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
            <ProjectFeatureCard
              title="Next.js Starter"
              description="Modern full-stack starter with responsive grid layouts."
              techStack={["Next.js 15", "Tailwind 4", "shadcn/radix"]}
              repoUrl="/templates/nextjs"
              demoUrl="https://github.com/manta-digital/manta-templates/tree/main/nextjs"
            />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-2 lg:col-span-4"
            className="md:row-start-2"
          >
            <ComingSoonFeatureCard />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-4 lg:col-span-2" 
            rowSpan="md:row-span-2 lg:row-span-3"
            className="lg:row-start-1 md:col-start-3 lg:col-start-5"
          >
            <GuidesFeatureCard />
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
            default: [[6], [6], [6], [6], [6]],
            md: [[6], [3,3], [3,3]],
            lg: [[4,2], [2,2,2]],
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
        </GridLayout>
      </Container>
    </Layout>
  );
}
