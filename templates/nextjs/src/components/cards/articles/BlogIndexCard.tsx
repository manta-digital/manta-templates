import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllContent } from '@/lib/content';
import { BaseCard } from '@/components/cards/BaseCard';
import { cn } from '@/lib/utils';
import type { PostContent } from '@/types/content';

interface BlogIndexCardProps {
  mini?: boolean;
  className?: string;
  postLimit?: number;
  excludeSlugs?: string[];
}

export default async function BlogIndexCard({ mini = false, className, postLimit = 3, excludeSlugs = [] }: BlogIndexCardProps) {
  const allPosts = await getAllContent<PostContent>('blog');
  const filteredPosts = allPosts.filter(post => !excludeSlugs.includes(post.slug));
  const latestPosts = filteredPosts.slice(0, postLimit);

  return (
    <BaseCard className={cn('h-full w-full flex flex-col', mini ? 'p-4' : 'p-6', className)}>
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-xl font-bold">More Great Articles</h3>
      </div>
      <div className="flex flex-col gap-2 -mx-2">
        {latestPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 w-20 h-20 aspect-square">
                <Image
                  src={post.frontmatter.thumbnail || post.frontmatter.image || post.frontmatter.heroImage || '/image/blog/blog-sample-image.png'}
                  alt={`Thumbnail for ${post.frontmatter.title}`}
                  sizes="5rem"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="grow py-1">
                <h4 className="font-semibold mb-1 line-clamp-2">{post.frontmatter.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 hidden lg:block">
                  {new Date(post.frontmatter.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 block lg:hidden">{post.frontmatter.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/blog" className="pt-3 pl-2 text-sm font-semibold text-primary hover:underline flex items-center">
        View All Posts
      </Link>
    </BaseCard>
  );
}


