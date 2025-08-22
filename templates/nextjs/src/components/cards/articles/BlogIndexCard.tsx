import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogIndexCard as CoreBlogIndexCard } from '@manta-templates/ui-core';
import { getBlogPosts } from '@/lib/content/blog-loader';

interface BlogIndexCardProps {
  mini?: boolean;
  className?: string;
  postLimit?: number;
  excludeSlugs?: string[];
}

export default async function BlogIndexCard({ mini = false, className, postLimit = 3, excludeSlugs = [] }: BlogIndexCardProps) {
  const posts = await getBlogPosts({ limit: postLimit, excludeSlugs });

  return (
    <CoreBlogIndexCard
      posts={posts}
      mini={mini}
      className={className}
      postLimit={postLimit}
      excludeSlugs={excludeSlugs}
      ImageComponent={Image}
      LinkComponent={Link}
    />
  );
}


