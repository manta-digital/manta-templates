"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogLayoutSwitcher } from './BlogLayoutSwitcher';
import BlogIndexLayout, { BlogPost } from '../../app/blog/BlogIndexLayout';
import BlogCard from '@/components/cards/BlogCard';
import { BlogCardWide } from '@/components/cards/BlogCardWide';
import { BlogCardImage } from '@/components/cards/BlogCardImage';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const params = useSearchParams();
  const variant = params.get('layout') ?? 'default';
  const CardComponent =
    variant === 'wide' ? BlogCardWide : variant === 'image' ? BlogCardImage : BlogCard;

  return (
    <>
      <BlogLayoutSwitcher />
      <BlogIndexLayout posts={posts} CardComponent={CardComponent} />
    </>
  );
}
