import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { BaseCardV2 } from './BaseCard';

export interface BlogCardImageV2Props {
  imageMaxHeight?: string; 
  title: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string;
  coverImageUrl: string;
  category?: string;
  author?: string;
  textColorClassName?: string;
  overlayClassName?: string;
  className?: string;
}

const BlogCardImageV2: React.FC<BlogCardImageV2Props> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  textColorClassName = 'text-white',
  overlayClassName = 'bg-gradient-to-t from-black/70 via-black/50 to-transparent',
  className,
  imageMaxHeight,
  ...props
}) => {
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
    <BaseCardV2
      className={cn(
        'relative overflow-hidden w-full p-0', imageMaxHeight ?? 'min-h-[280px] md:min-h-[360px]',
        className
      )}
      {...props}
    >
      <Image
        src={coverImageUrl}
        alt={`Background for ${title}`}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        priority
      />
      <div
        className={cn(
          'relative z-10 h-full w-full flex flex-col justify-center p-8',
          textColorClassName
        )}
      >
        <div className={cn('absolute inset-0 z-0', overlayClassName)} />
        <div className="relative z-10">
          {category && (
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-1">
              {category}
            </p>
          )}
          <h3 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-3">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm md:text-base opacity-90 mb-3 line-clamp-2 md:line-clamp-3">
              {excerpt}
            </p>
          )}
          <div className="flex items-center text-xs opacity-80">
            {author && <span>By {author}</span>}
            {author && formattedDate && <span className="mx-2">•</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </div>
    </BaseCardV2>
  );

  return slug ? (
    <Link href={slug} className="contents" aria-label={`Read more about ${title}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default BlogCardImageV2;
