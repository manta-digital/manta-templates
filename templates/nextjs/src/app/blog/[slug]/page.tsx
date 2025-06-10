import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import MotionArticle from '@/components/MotionArticle';
import { getAllContent, getContentBySlug } from '@/lib/content';
import type { PostContent } from '@/types/content';

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllContent<PostContent>('blog');
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Define the props for the Page component
// Define a unique interface for the page props to avoid conflicts
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const { frontmatter, contentHtml } = await getContentBySlug<PostContent>('blog', slug);

    return (
      <MotionArticle 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="mt-8 mb-8 prose prose-lg max-w-[70ch] dark:prose-invert mx-auto p-6 pt-6 md:p-8 border border-slate-200 dark:border-slate-700 rounded-4xl transition-colors duration-300 ease-in-out hover:border-slate-300 dark:hover:border-slate-600 [&_img]:rounded-2xl [&_img]:mb-0 [&_p:last-child]:mb-0"
      >
        {frontmatter.heroImage && (
          <div className="mb-8 h-[300px] rounded-3xl shadow-lg not-prose overflow-clip">
            <Image
              src={frontmatter.heroImage}
              alt={frontmatter.title}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              priority
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </MotionArticle>
    );
  } catch (error) {
    console.error(`Error fetching post for slug "${slug}":`, error);
    notFound();
  }
}