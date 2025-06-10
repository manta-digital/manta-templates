import React, { Suspense } from 'react';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { getAllContent } from '@/lib/content';
import type { PostContent } from '@/types/content';

export default async function BlogIndexPage() {
  const allPosts = getAllContent<PostContent>('blog');
  return (
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogPageClient posts={allPosts} />
    </Suspense>
  );
}