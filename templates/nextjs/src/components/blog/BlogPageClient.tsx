"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogLayoutSwitcher } from './BlogLayoutSwitcher';
import BlogIndexLayout, { BlogPost } from '../../app/blog/BlogIndexLayout';
import { BlogCard as BlogCardV2 } from '@/components/cards';
import { BlogCardWide as BlogCardWideV2 } from '@/components/cards';
import { BlogCardImage as BlogCardImageV2 } from '@/components/cards';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const params = useSearchParams();
  const variant = params.get('layout') ?? 'default';
  const CardComponent =
    variant === 'wide' ? BlogCardWideV2 : variant === 'image' ? BlogCardImageV2 : BlogCardV2;

  return (
    <>
      <BlogLayoutSwitcher />
      <BlogIndexLayout posts={posts} CardComponent={CardComponent} />
    </>
  );
}
