import { getContentBySlug } from '@/lib/content';
import type { AboutContent } from '@/types/content';
import AboutCard from './AboutCard';

interface Props {
  slug?: string; // defaults to 'about'
  className?: string;
}

export default async function AboutCardContentLoader({ slug = 'about', className }: Props) {
  const { frontmatter, contentHtml } = await getContentBySlug<AboutContent>('intro', slug);
  return <AboutCard {...frontmatter} contentHtml={contentHtml} className={className} />;
}


