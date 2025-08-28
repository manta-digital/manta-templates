import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BentoLayout } from '@/components/layouts/bento-layout';
import GridItem from '@/components/layouts/grid-layout/grid-item';
import { BaseCard } from '@/components/cards';

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    pubDate: string;
    description: string;
    image?: string;
  };
}

interface BlogIndexLayoutProps {
  posts: BlogPost[];
  CardComponent: React.ComponentType<{
    title: string;
    date: string;
    excerpt: string;
    coverImageUrl: string;
    imageMaxHeight?: string;
    className?: string;
  }>;
}

/**
 * Shared layout for the blog index page.
 * Renders header, About Me card, and a list of post cards using a provided CardComponent.
 */
export default function BlogIndexLayout({ posts, CardComponent }: BlogIndexLayoutProps) {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>

      <BentoLayout
        columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
        rowHeight="minmax(180px,auto)"
        gap={6}
        className="max-w-7xl mx-auto"
        autoFlow="row"
      >
        {/* --- GROUP 1: Title Card --- */}
        <GridItem
          colSpan="lg:col-span-2"
          className="col-start-1"
        >
          <BaseCard 
            className={cn(
              'justify-center items-start',
              'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white p-6 h-full'
            )}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Zefram Cochrane — Blog</h2>
            <p className="text-sm opacity-90">My thoughts on faster-than-light travel.</p>
          </BaseCard>
        </GridItem>

        {/* Group 2: About Me */}
        <GridItem
          colSpan="lg:col-span-2"
          rowSpan="row-span-1 md:row-span-3 lg:row-span-3 xl:row-span-3"
          className="col-start-1 row-start-2"
        >
          <BaseCard
            className={cn(
              'justify-start items-start',
              'bg-slate-800 text-slate-200 p-6 h-full'
            )}
          >
            <h3 className="text-xl font-semibold mb-3">About Me</h3>
            <p className="text-sm mb-3">
              Name&apos;s Cochrane. I&apos;m the scruffy mechanic who bolted a warp nacelle onto a broken
              missile and proved space doesn&apos;t have to take its sweet time. I build things that <em>work</em>,
              not museum pieces—engines that light, code that ships, dashboards that actually tell you
              something before the market closes.
            </p>

            <p className="text-sm mb-3">
              I&apos;m impatient with red tape, allergic to buzzwords, and happiest when a prototype rattles
              the windows on first power-up. Need a stubborn problem hauled past the sound barrier—be it
              data-driven tools, performance-hungry apps, or any contraption that ought to run faster than
              it does? Toss me a contract or part-time gig and step back: I&apos;ll tune it, test it, and punch
              the button.
            </p>

            <p className="text-sm">
              Coffee preferred black, feedback preferred blunt, results guaranteed to move.
            </p>

          </BaseCard>
        </GridItem>

        {/* Group 3: Blog Posts */}
        {posts.map((post, index) => (
          <GridItem
            key={post.slug}
            colSpan={{ md: 'col-span-2', lg: 'col-span-4' }}
            className={cn(
              'md:col-start-2 lg:col-start-3',
              index === 0 && 'md:row-start-1 lg:row-start-1'
            )}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <CardComponent
                title={post.frontmatter.title}
                date={post.frontmatter.pubDate}
                excerpt={post.frontmatter.description}
                coverImageUrl={post.frontmatter.image || '/images/placeholder-image.jpg'}
                imageMaxHeight="h-[200px]"
                className="h-full"
              />
            </Link>
          </GridItem>
        ))}
      </BentoLayout>
    </main>
  );
}
