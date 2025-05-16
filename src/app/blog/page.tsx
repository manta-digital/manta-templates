import React, { Suspense } from 'react';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { getSortedPostsData } from '@/lib/content';

export default async function BlogIndexPage() {
  const allPosts = getSortedPostsData();
  return (
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogPageClient posts={allPosts} />
    </Suspense>
  );
}