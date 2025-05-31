import QuoteCard from './QuoteCard';
import { getQuoteBySlug } from '@/lib/content-api.client';

interface QuoteCardContainerProps {
  slug: string;
}

export default function QuoteCardContainer({ slug }: QuoteCardContainerProps) {
  const content = getQuoteBySlug(slug);
  if (!content) return null;
  return <QuoteCard content={content} />;
}
