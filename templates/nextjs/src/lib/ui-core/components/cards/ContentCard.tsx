import React from 'react';
import { BaseCard } from './BaseCard';
import { cn } from '../../utils/cn';

type ContentCardProps = React.ComponentProps<typeof BaseCard> & {
  className?: string;
};

/**
 * Reusable content wrapper for static/markdown pages.
 * Centralizes width, prose, padding, border, and radius.
 */
export function ContentCard({ className, children, ...props }: ContentCardProps) {
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

export type { ContentCardProps };