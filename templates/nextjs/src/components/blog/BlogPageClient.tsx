import React from 'react';
import BlogIndexLayout, { BlogPost } from '../../app/blog/BlogIndexLayout';
import { BlogCardImage } from '@/components/cards';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  // Use BlogCardImage (image mode) for simplified, clean blog layout
  const CardComponent = BlogCardImage;

  return (
    <BlogIndexLayout posts={posts} CardComponent={CardComponent} />
  );
}
