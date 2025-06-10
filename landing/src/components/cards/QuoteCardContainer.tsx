import QuoteCard from './QuoteCard';
import { getContentBySlug } from '@/lib/content';
import type { QuoteContent } from '@/types/content';

interface QuoteCardContainerProps {
  slug: string;
}

export default async function QuoteCardContainer({ slug }: QuoteCardContainerProps) {
  try {
    const { frontmatter: content } = await getContentBySlug<QuoteContent>('quotes', slug);
    return <QuoteCard content={content} />;
  } catch (error) {
    console.error(`Error loading quote content for slug "${slug}":`, error);
    return null;
  }
}
