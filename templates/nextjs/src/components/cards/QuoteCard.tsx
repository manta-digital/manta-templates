import React from 'react';
import { cn } from '@/lib/utils';
import BaseCard from './BaseCard';

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

/**
 * A card component specifically for displaying quotes with attribution.
 */
const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  className,
}) => {
  return (
    <BaseCard className={cn('justify-center p-6', className)}>
      <figure>
        <blockquote className="italic text-lg md:text-xl leading-snug">
          <p>&quot;{quote}&quot;</p>
        </blockquote>
        <figcaption className="mt-4 text-sm text-muted-foreground text-right">
          — {author}
        </figcaption>
      </figure>
    </BaseCard>
  );
};

export default QuoteCard;
