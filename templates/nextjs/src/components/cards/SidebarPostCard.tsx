import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BaseCard } from './BaseCard';

interface SidebarPostCardProps {
  /** The title of the blog post. */
  title: string;
  /** A short excerpt or description of the blog post. */
  excerpt: string;
  /** URL of the thumbnail image for the post. */
  imageUrl: string;
  /** The destination URL when the card is clicked. */
  href: string;
  /** Optional additional CSS classes for the container. */
  className?: string;
}

/**
 * A card component designed for sidebars, linking to a blog post.
 * Displays a thumbnail image, title, and excerpt.
 */
const SidebarPostCard: React.FC<SidebarPostCardProps> = ({
  title,
  excerpt,
  imageUrl,
  href,
  className,
}) => {
  return (
    <Link href={href} className="block">
      <BaseCard
        // Revert styles back onto BaseCard
        className={cn(
          'flex items-start gap-4 group transition-colors hover:bg-accent/50',
          'p-0! overflow-hidden', // Remove default BaseCard padding
          className
        )}
      >
        {/* Image Container */}
        <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 aspect-square">
          <Image
            src={imageUrl}
            alt={`Thumbnail for ${title}`}
            fill
            className="object-cover rounded-l-lg"
            // Consider adding sizes prop if images vary significantly
          />
        </div>

        {/* Text Content */}
        <div className="grow py-3 pr-4"> {/* Internal padding for text */}
          <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2 group-hover:text-primary">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </div>
              </BaseCard>
    </Link>
  );
};

export default SidebarPostCard;