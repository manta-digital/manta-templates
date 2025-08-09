import React from 'react';
import { BaseCard } from '@/components/cards';
import { cn } from '@/lib/utils';

type ContentCardProps = React.ComponentProps<typeof BaseCard> & {
  className?: string;
};

/**
 * Reusable content wrapper for static/markdown pages.
 * Centralizes width, prose, padding, border, and radius.
 */
export default function ContentCard({ className, children, ...props }: ContentCardProps) {
  return (
    <BaseCard
      className={cn(
        'prose prose-lg max-w-[70rem] dark:prose-invert mx-auto p-6 pt-6 md:p-8 border rounded-4xl',
        className,
      )}
      {...props}
    >
      {children}
    </BaseCard>
  );
}


