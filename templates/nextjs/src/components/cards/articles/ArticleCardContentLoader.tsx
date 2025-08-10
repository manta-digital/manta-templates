import { getContentBySlug } from '@/lib/content';
import type { ArticleContent } from '@/types/content';
import ArticleCard from './ArticleCard';

interface ArticleCardContentLoaderProps {
  slug: string;
  className?: string;
}

export default async function ArticleCardContentLoader({ slug, className }: ArticleCardContentLoaderProps) {
  const { frontmatter } = await getContentBySlug<ArticleContent>('main-grid', slug);
  return <ArticleCard {...frontmatter} className={className} />;
}


