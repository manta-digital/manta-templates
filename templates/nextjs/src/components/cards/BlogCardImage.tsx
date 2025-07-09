import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { BaseCard } from './BaseCard';

export interface BlogCardImageProps {
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
  /** Dim background image using CSS brightness (e.g. 75%) */
  dim?: boolean;
  /** Apply blur to background image. If blurAmount is provided, this is ignored. */
  blur?: boolean;
  /** Tailwind blur amount, e.g. 'sm', 'md', 'lg', 'xl', '2xl', '3xl'. */
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

const BlogCardImage: React.FC<BlogCardImageProps> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  textColorClassName = 'text-white',
  overlayClassName = 'bg-gradient-to-t from-black/70 via-black/50 to-transparent',
  dim = false,
  blur = false,
  blurAmount,
  className,
  imageMaxHeight,
  ...props
}) => {
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
          <BaseCard
      className={cn(
        'group relative overflow-hidden w-full p-0 transition-shadow duration-300 hover:shadow-lg',
        imageMaxHeight ?? 'min-h-[280px] md:min-h-[360px]',
        className
      )}
      {...props}
    >
      <Image
        src={coverImageUrl}
        alt={`Background for ${title}`}
        layout="fill"
        objectFit="cover"
        className={cn(
          'absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105',
          dim && 'brightness-75',
          blurAmount ? `blur-${blurAmount}` : (blur && 'blur-sm')
        )}
        priority
      />
      <div className={cn('absolute inset-0 z-10', overlayClassName)} />
      <div
        className={cn(
          'relative z-20 h-full w-full flex flex-col justify-center p-8',
          textColorClassName
        )}
      >
        
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
          </BaseCard>
  );

  return slug ? (
    <Link href={slug} className="contents" aria-label={`Read more about ${title}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default BlogCardImage;
