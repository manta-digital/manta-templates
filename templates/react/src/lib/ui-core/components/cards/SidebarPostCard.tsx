import React from 'react';
import { cn } from '../../utils';
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
  /** Image component for framework-specific optimization (e.g., Next.js Image) */
  ImageComponent?: React.ComponentType<any>;
  /** Link component for framework-specific routing (e.g., Next.js Link) */
  LinkComponent?: React.ComponentType<any>;
}

/**
 * A card component designed for sidebars, linking to a blog post.
 * Displays a thumbnail image, title, and excerpt in a compact horizontal layout.
 * 
 * Framework-agnostic with dependency injection for Image and Link components.
 */
const SidebarPostCard: React.FC<SidebarPostCardProps> = ({
  title,
  excerpt,
  imageUrl,
  href,
  className,
  ImageComponent = 'img',
  LinkComponent = 'a',
}) => {
  const cardContent = (
    <BaseCard
      className={cn(
        className
      )}
      style={{ display: 'flex', flexDirection: 'row', padding: 0 }}
    >
      <div className="flex items-start gap-4 group transition-colors hover:bg-accent/50 w-full">
      {/* Image Container */}
      <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 aspect-square">
        {typeof ImageComponent === 'string' ? (
          <img
            src={imageUrl}
            alt={`Thumbnail for ${title}`}
            className="object-cover rounded-l-lg w-full h-full"
          />
        ) : (
          <ImageComponent
            src={imageUrl}
            alt={`Thumbnail for ${title}`}
            fill
            className="object-cover rounded-l-lg"
          />
        )}
      </div>

      {/* Text Content */}
      <div className="grow py-3 pr-4">
        <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
      </div>
      </div>
    </BaseCard>
  );

  return typeof LinkComponent === 'string' ? (
    <a href={href} className="block">
      {cardContent}
    </a>
  ) : (
    <LinkComponent href={href} className="block">
      {cardContent}
    </LinkComponent>
  );
};

export { SidebarPostCard };
export type { SidebarPostCardProps };