import React from 'react';
import MotionArticle from '@/components/MotionArticle';
import { getAllPostSlugs, getPostData, PostData } from '@/lib/content';
import { notFound } from 'next/navigation'; // For handling not found posts

// Generate static params for SSG
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // Now returns { params: { slug: '...' } }[]
  return paths;
}

// Define the type for the resolved params object
interface ResolvedParams {
  slug: string;
}

// Define the type for the props received by the Page component
interface PageProps {
  params: Promise<ResolvedParams>; // params is a Promise
}

export default async function Page(props: PageProps) { // Component receives a single props object
  const params = await props.params; // Await the params Promise
  const slug = params.slug; // Access slug from the resolved params

  let post: PostData;
  try {
    post = await getPostData(slug);
  } catch (error) {
    // Assuming getPostData might throw if file not found or parse error
    console.error(`Error fetching post for slug ${slug}:`, error);
    notFound(); // Triggers the not-found.tsx page or a default 404
  }

  return (
    <MotionArticle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8 mb-8 prose prose-lg max-w-[70ch] dark:prose-invert mx-auto p-6 pt-6 md:p-8 border border-slate-200 dark:border-slate-700 rounded-4xl transition-colors duration-300 ease-in-out hover:border-slate-300 dark:hover:border-slate-600 [&_img]:rounded-2xl [&_img]:mb-0 [&_p:last-child]:mb-0">
      {post.image && (
        <div className="mb-8 h-[300px] rounded-3xl shadow-lg not-prose overflow-clip">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </MotionArticle>
  );
}