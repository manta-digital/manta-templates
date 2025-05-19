import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themetoggle";
import Layout from '@/components/layout';
import {
  Container,
  GridContainer,  
  GridLayout,
  GridItem,
  BlogCard,
  ProjectCard,
  VideoCard,
  QuoteCard,
  BentoLayout,

} from "@/components"; 

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
            <ProjectCard
              title="Next.js Starter"
              description="Next.js 15 + Tailwind 4 + shadcn/radix"
              techStack={["Next.js 15", "Tailwind 4", "shadcn/radix"]}
              repoUrl="/templates/nextjs"
            />
          </GridItem>
          <GridItem colSpan="col-span-full md:col-span-2 lg:col-span-4">
            <ProjectCard
              title="Astro Starter"
              description="Astro-based template (coming soon)"
              techStack={[]}
            />
          </GridItem>
          <GridItem 
            colSpan="col-span-full md:col-span-2 lg:col-span-2" 
            rowSpan="lg:row-span-2"
            className="lg:row-start-1 lg:col-start-5"
          >
            <ProjectCard
              title="Guides & Docs"
              description="Comprehensive usage guides and documentation"
              techStack={[]}
              demoUrl="/project-documents"
            />
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
          <ProjectCard
            title="Blog"
            description="MDX-driven content, blog layout"
            techStack={[]}
            demoUrl="/blog"
          />
          <ProjectCard
            title="BentoGrid Example"
            description="BentoGrid layout showcase"
            techStack={[]}
            demoUrl="/examples/bentogrid"
          />
          <ProjectCard
            title="Blog Example"
            description="Example blog layout"
            techStack={[]}
            demoUrl="/examples/blog"
          />
          <ProjectCard
            title="MasonryGrid Example"
            description="Masonry grid showcase"
            techStack={[]}
            demoUrl="/examples/masonrygrid"
          />
          <ProjectCard
            title="Portfolio Example"
            description="Portfolio layout showcase"
            techStack={[]}
            demoUrl="/examples/portfolio"
          />
        </GridLayout>
      </Container>
    </Layout>
  );
}
