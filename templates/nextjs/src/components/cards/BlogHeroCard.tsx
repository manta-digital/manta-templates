import React from 'react';
import { cn } from '@/lib/utils';
import { BaseCard } from './BaseCard';

interface BlogHeroCardProps {
  title: string;
  subtitle: string;
  className?: string;
}

/**
 * A prominent hero card, often used for blog introductions.
 * Features a title, subtitle, and a gradient background.
 */
const BlogHeroCard: React.FC<BlogHeroCardProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    // Using BaseCard provides consistent padding and rounded corners
    // Apply gradient background here
    <BaseCard
      className={cn(
        'text-primary-foreground',
        'bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-800',
        'flex flex-col justify-center',
        // Removed hardcoded height for flexible sizing
        className
      )}
    >
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">{title}</h1>
      <p className="text-white text-sm md:text-base opacity-90">{subtitle}</p>
          </BaseCard>
  );
};

export default BlogHeroCard;
