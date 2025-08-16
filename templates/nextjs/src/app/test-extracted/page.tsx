import Image from 'next/image';
import Link from 'next/link';
import { BlogCard, BlogCardImage, ProjectCard, QuoteCard, Container, BentoLayout } from '@manta-templates/ui-core';

// Sample data to test the extracted components
const sampleBlog = {
  title: "Test Blog Post", 
  date: "2024-01-15",
  excerpt: "This is a test excerpt to verify the extracted BlogCard component works correctly with Next.js Image and Link components injected.",
  coverImageUrl: "https://picsum.photos/400/200?random=1"
};

const sampleProject = {
  title: "Test Project",
  description: "This is a test project to verify the extracted ProjectCard component.",
  techStack: ["React", "TypeScript", "Next.js"],
  repoUrl: "https://github.com/test/repo", 
  demoUrl: "https://test-demo.com",
  content: {
    title: "Test Project",
    techStack: ["React", "TypeScript", "Next.js"],
    image: "https://picsum.photos/400/300?random=2"
  }
};

const sampleQuote = {
  quote: "This is a test quote to verify the extracted QuoteCard component renders correctly.",
  author: "Test Author"
};

const sampleBlogImage = {
  title: "Hero Blog Post with Background Image",
  date: "2024-01-25", 
  excerpt: "This is a test of the BlogCardImage component with a beautiful background image and overlay effects.",
  slug: "/blog/test-hero-post",
  coverImageUrl: "https://picsum.photos/800/600?random=7",
  category: "Design",
  author: "Test Author",
  dim: true,
  blur: false
};

export default function TestExtractedPage() {
  return (
    <Container maxWidth="full" className="py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-6">Extracted Components Test</h1>
          <p className="text-muted-foreground mb-8">
            Testing the extracted ui-core components with Next.js dependencies injected.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Card Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">BlogCard</h3>
                <BlogCard
                  {...sampleBlog}
                  ImageComponent={Image}
                  LinkComponent={Link}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">ProjectCard</h3>
                <ProjectCard
                  {...sampleProject}
                  ImageComponent={Image}
                  LinkComponent={Link}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">QuoteCard</h3>
                <QuoteCard
                  {...sampleQuote}
                  ImageComponent={Image}
                  LinkComponent={Link}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">BlogCardImage (Hero Style)</h3>
                <div className="h-96">
                  <BlogCardImage
                    {...sampleBlogImage}
                    ImageComponent={Image}
                    LinkComponent={Link}
                    className="h-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">BlogCardImage (Blur Effect)</h3>
                <div className="h-96">
                  <BlogCardImage
                    {...sampleBlogImage}
                    title="Blurred Background Example"
                    blur={true}
                    blurAmount="md"
                    dim={false}
                    ImageComponent={Image}
                    LinkComponent={Link}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">BentoLayout Test with BaseCard</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Card-Based Bento Grid</h3>
                <BentoLayout gap={4} columns="grid-cols-6" className="min-h-[400px]">
                  <div className="col-span-3 row-span-2">
                    <BlogCard
                      title="Featured Blog Post"
                      date="2024-01-20"
                      excerpt="This is a featured blog post in a larger card format within the bento grid layout."
                      coverImageUrl="https://picsum.photos/500/300?random=3"
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <ProjectCard
                      title="Cool Project"
                      description="A neat project showcase"
                      techStack={["React", "Next.js"]}
                      repoUrl="https://github.com/test/project"
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <QuoteCard
                      quote="Short quote"
                      author="Author"
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <ProjectCard
                      title="Another Project"
                      description="Different project"
                      techStack={["TypeScript", "Tailwind"]}
                      repoUrl="https://github.com/test/another"
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <QuoteCard
                      quote="Brief"
                      author="Someone"
                      className="h-full"
                    />
                  </div>
                </BentoLayout>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Edge Case Grid</h3>
                <BentoLayout gap={2} columns="grid-cols-12" className="min-h-[300px]">
                  <div className="col-span-1">
                    <QuoteCard
                      quote="Tiny"
                      className="h-full text-xs"
                    />
                  </div>
                  <div className="col-span-11">
                    <BlogCard
                      title="Ultra Wide Blog Card"
                      date="2024-01-21"
                      excerpt="This blog card spans almost the entire width to test extreme aspect ratios."
                      coverImageUrl="https://picsum.photos/800/200?random=4"
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-6 row-span-2">
                    <ProjectCard
                      title="Wide Project"
                      description="Testing wide project cards with longer descriptions and more content to see how it handles."
                      techStack={["React", "TypeScript", "Next.js", "Tailwind", "Framer"]}
                      repoUrl="https://github.com/test/wide"
                      demoUrl="https://demo.com"
                      content={{
                        title: "Wide Project",
                        techStack: ["React", "TypeScript", "Next.js"],
                        image: "https://picsum.photos/600/400?random=5"
                      }}
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-3">
                    <QuoteCard
                      quote="Medium length quote to test text wrapping and layout behavior in constrained spaces."
                      author="Quote Author"
                      className="h-full"
                    />
                  </div>
                  <div className="col-span-3">
                    <BlogCard
                      title="Compact Blog"
                      date="2024-01-22"
                      excerpt="Short excerpt for testing compact layouts."
                      coverImageUrl="https://picsum.photos/300/200?random=6"
                      ImageComponent={Image}
                      LinkComponent={Link}
                      className="h-full"
                    />
                  </div>
                </BentoLayout>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}