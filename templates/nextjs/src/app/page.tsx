import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themetoggle";
import Layout from '@/components/layout';
import {
  Container,
  GridContainer, 
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
      <main className="flex flex-col gap-[32px] items-center sm:items-start p-8 sm:p-20">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-(family-name:--font-geist-mono)">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-(family-name:--font-geist-mono) font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button className="bg-green-500 hover:bg-green-600">Test</Button>
        </div>

        <div className="mt-4">
          <p>Environment Variable Test:</p>
          <p className="font-mono bg-muted p-2 rounded text-sm">
            {process.env.NEXT_PUBLIC_PLACEHOLDER || "Variable not loaded"}
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ThemeToggle />
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      {/* Container Tests */}
      <div className="my-10 space-y-4">
        <Container maxWidth="sm">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 text-center rounded">Container maxWidth=&apos;sm&apos;</div>
        </Container>
        <Container maxWidth="lg">
          <div className="bg-green-100 dark:bg-green-900 p-4 text-center rounded">Container maxWidth=&apos;lg&apos;</div>
        </Container>
        <Container> {/* Default maxWidth */} 
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 text-center rounded">Container default maxWidth</div>
        </Container>
        <Container maxWidth="full">
          <div className="bg-red-100 dark:bg-red-900 p-4 text-center rounded">Container maxWidth=&apos;full&apos;</div>
        </Container>
      </div>

      {/* GridContainer Tests (Inspect elements to verify styles) */}
      <div className="my-10 space-y-4 p-4 border border-dashed">
        <p className="text-center font-bold">GridContainer Tests Below (Inspect Elements)</p>
        {/* Add rowHeight to define row tracks and make row-span visible */}
        <GridContainer rowHeight="3rem" className="h-auto min-h-[100px] border border-red-500">
          {/* Testing NEW size variants (Check classes: col-span-3/4/6, row-span-3/4) */}
          <GridItem size="large">Large (6x4)</GridItem>
          <GridItem size="extra-large">Extra Large (6x7)</GridItem>
          {/* 6 + 4 = 10 columns used on first 'row'. Remaining 2 cols are empty */}
          {/* Next items will likely wrap or position based on available space below */}
          <GridItem size="small">Small (3x3)</GridItem>
          <GridItem size="small">Small (3x3)</GridItem>
          {/* Example: A large (6x4) and medium (4x4) should fit side-by-side. */}
          {/* Two smalls (3x3) might fit below the medium depending on grid flow. */}
        </GridContainer>
        {/* This container also uses responsive columns now */}
        <GridContainer rowHeight="50px" className="h-10 border border-blue-500">
          <>{/* Empty grid container (6 cols, 50px rows) - Now responsive 4/8/12 */}</>
        </GridContainer>
        {/* Test Grid Area */}
        <BentoLayout className="mt-8"> {/* Let rows size automatically */}
          <GridItem size="small">
            <VideoCard
              title="Cool Video Title"
              thumbnailUrl="https://picsum.photos/seed/v1/400/225" // 16:9 aspect ratio
              videoUrl="#" // Placeholder link
            />
          </GridItem>
          <GridItem size="medium">
            <BlogCard
              title="My Latest Blog Post"
              date="2025-05-05" // Use string date for simplicity here
              excerpt="A quick summary of the blog post content goes here. It shouldn&apos;t be too long."
              coverImageUrl="https://picsum.photos/seed/b1/400/300" // Correct prop name and value type
              // Add slug later if needed for linking
            />
          </GridItem>
          <GridItem size="small">
            <QuoteCard
              quote="The only way to do great work is to love what you do."
              author="Steve Jobs"
            />
          </GridItem>
          <GridItem size="large">
            <ProjectCard
              title="Awesome Project X"
              description="This project demonstrates cutting-edge tech and solves a real-world problem."
              techStack={['React', 'TypeScript', 'Tailwind CSS', 'Next.js']}
              repoUrl="#" // Correct prop name
              demoUrl="#" // Correct prop name
              // No imageUrl prop exists
            />
          </GridItem>
        </BentoLayout>
      </div>

      {/* TwoColumnLayout Example removed. For two-column or sidebar layouts, use BentoLayout or GridLayout instead. */}
      {/* Example: <BentoLayout> or <GridLayout> with appropriate children */}

    </Layout>
  );
}
