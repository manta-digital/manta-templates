import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import {
  BaseCardV2,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './BaseCardV2';

export interface BlogCardWideV2Props {
  title: string;
  date?: string | Date;
  excerpt?: string;
  slug?: string;
  coverImageUrl?: string;
  category?: string;
  author?: string;
  className?: string;
}

const BlogCardWideV2: React.FC<BlogCardWideV2Props> = ({
  title,
  date,
  excerpt,
  slug,
  coverImageUrl,
  category,
  author,
  className,
  ...props
}) => {
  const formattedDate = date ? formatDate(date) : null;

  const cardContent = (
    <BaseCardV2
      className={cn(
        'p-0 overflow-hidden flex flex-col md:flex-row',
        className
      )}
      {...props}
    >
      {coverImageUrl && (
        <div className="relative w-full md:w-1/3 aspect-[16/9] md:aspect-auto">
          <Image
            src={coverImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="md:rounded-l-lg md:rounded-t-none rounded-t-lg"
          />
        </div>
      )}
      <div className="flex flex-col p-8 w-full md:w-2/3">
        <CardHeader className="p-0">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription>
            {author && <span className="text-xs">{author}</span>}
            {author && formattedDate && ' ・ '}
            {formattedDate && <span className="text-xs">{formattedDate}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-2 grow flex flex-col">
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {excerpt}
            </p>
          )}
          {category && (
            <p className="text-xs bg-secondary text-secondary-foreground inline-block px-2 py-1 rounded-full mt-auto self-start">
              {category}
            </p>
          )}
        </CardContent>
      </div>
    </BaseCardV2>
  );

  return slug ? (
    <Link href={slug} className="contents">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default BlogCardWideV2;
