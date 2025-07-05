import React from 'react';
import Image from 'next/image'; 
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils'; 
import { BaseCardV2 } from './BaseCardV2'; 

interface BlogCardProps {
  title: string;
  date?: string | Date; 
  excerpt: string;
  coverImageUrl: string;
  className?: string;
  imageMaxHeight?: string; 
  author?: string;   
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  coverImageUrl,
  imageMaxHeight, // Destructured, used for styling internal image div
  author,
  className,
  ...baseCardProps
}) => {
  const formattedDate = date ? formatDate(date) : null;

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
      <div className="pt-4 flex flex-col grow"> 
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        {author && (
          <p className="text-xs text-muted-foreground mb-2">{author}</p>
        )}
        {formattedDate && (
          <p className="text-xs text-muted-foreground mb-2">{formattedDate}</p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-3 grow">
          {excerpt}
        </p>
      </div>
    </>
  );

  return (
    <BaseCardV2
      className={cn('overflow-hidden', className)}
      {...baseCardProps}
    >
      {cardContent}
    </BaseCardV2>
  );
};

export default BlogCard;
