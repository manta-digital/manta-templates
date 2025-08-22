import { getAllContent } from '../content';
import type { PostContent } from '@/types/content';
import type { BlogPost } from '@manta-templates/ui-core';

/**
 * Converts PostContent from the content system to BlogPost format expected by ui-core
 */
function convertPostContentToBlogPost(contentMeta: { slug: string; frontmatter: PostContent }): BlogPost {
  return {
    slug: contentMeta.slug,
    title: contentMeta.frontmatter.title,
    description: contentMeta.frontmatter.description,
    pubDate: contentMeta.frontmatter.pubDate,
    thumbnail: contentMeta.frontmatter.thumbnail,
    image: contentMeta.frontmatter.image,
    heroImage: contentMeta.frontmatter.heroImage,
  };
}

/**
 * Loads all blog posts and converts them to the format expected by BlogIndexCard
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const allPosts = getAllContent<PostContent>('blog');
  return allPosts.map(convertPostContentToBlogPost);
}

/**
 * Loads blog posts with filtering and limiting options
 */
export async function getBlogPosts(options: {
  limit?: number;
  excludeSlugs?: string[];
} = {}): Promise<BlogPost[]> {
  const { limit = 3, excludeSlugs = [] } = options;
  
  const allPosts = await getAllBlogPosts();
  const filteredPosts = allPosts.filter(post => !excludeSlugs.includes(post.slug));
  
  return filteredPosts.slice(0, limit);
}