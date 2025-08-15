import React from 'react';
import { BlogCardImage } from '@/components/cards';

export interface SimpleBlogPost {
  title: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string;
  coverImageUrl: string;
  category?: string;
  author?: string;
}

interface BlogPageClientProps {
  posts: SimpleBlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((p) => (
        <BlogCardImage
          key={p.slug || p.title}
          title={p.title}
          date={p.date}
          excerpt={p.excerpt}
          slug={p.slug}
          coverImageUrl={p.coverImageUrl}
          category={p.category}
          author={p.author}
        />
      ))}
    </div>
  );
}
