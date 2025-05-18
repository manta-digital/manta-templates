import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; 
import { cn } from '@manta/ui';
import { formatDate } from '@manta/ui'; 
import BaseCard, { BaseCardProps } from './BaseCard';

// Define props for the BlogCardWide, similar to BlogCardProps
export interface BlogCardWideProps extends Omit<BaseCardProps, 'children'> {
  title: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string; // For linking to the blog post
  coverImageUrl?: string;
  category?: string; // Optional: for a category badge or similar
  author?: string;   // Optional: if you want to display author
  imageMaxHeight?: string; // Optional: Tailwind class for max image height
  // Add any specific props for BlogCardWide if different from BlogCard
}

export const BlogCardWide: React.FC<BlogCardWideProps> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  imageMaxHeight = 'h-[200px]', // Default value, used for styling internal image div
  className,
  ...baseCardProps
}) => {
  const formattedDate = date ? formatDate(date) : null;

  // For now, the internal structure is the same as BlogCard.
  // This can be customized later for a 'wide' specific layout (e.g., image side-by-side with text).
  const cardContent = (
    <>
      {coverImageUrl && (
        <div className={cn('relative w-full aspect-[16/9] overflow-hidden', imageMaxHeight ? imageMaxHeight : 'min-h-[180px]' )}>
          <Image 
            src={coverImageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="rounded-t-lg" 
          />
        </div>
      )}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        {author && (
          <p className="text-xs text-muted-foreground mb-1">By: {author}</p>
        )}
        {formattedDate && (
          <p className="text-xs text-muted-foreground mb-2">{formattedDate}</p>
        )}
        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 grow">
            {excerpt}
          </p>
        )}
        {category && (
          <p className="text-xs bg-secondary text-secondary-foreground inline-block px-2 py-1 rounded-full mt-auto self-start">
            {category}
          </p>
        )}
      </div>
    </>
  );

  return (
    <BaseCard 
      className={cn('flex flex-col overflow-hidden h-full', className)} 
      {...baseCardProps}
    >
      {slug ? (
        <Link href={slug} className="contents">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </BaseCard>
  );
};
