import React from 'react';
import { cn, formatDate } from '../../utils';
import { BaseCard, CardContent, CardDescription, CardHeader, CardTitle } from './BaseCard';

interface BlogCardProps {
  title: string;
  date?: string | Date;
  excerpt: string;
  coverImageUrl: string;
  className?: string;
  imageMaxHeight?: string;
  author?: string;
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  coverImageUrl,
  imageMaxHeight,
  author,
  className,
  ImageComponent,
  LinkComponent,
  ...props
}) => {
  const formattedDate = date ? formatDate(date) : null;

  return (
    <BaseCard 
      className={cn('p-0 overflow-hidden', className)}
      {...props}
    >
      <div className="p-8 flex flex-col h-full">
        {coverImageUrl && (
          <div
            className={cn(
              'relative w-full aspect-[16/9] overflow-hidden rounded-lg',
              imageMaxHeight ? imageMaxHeight : 'min-h-[180px]'
            )}
          >
            {ImageComponent ? (
              <ImageComponent
                src={coverImageUrl}
                alt={title}
                fill="true"
                className="rounded-lg object-cover"
              />
            ) : (
              <img
                src={coverImageUrl}
                alt={title}
                className="rounded-lg w-full h-full object-cover"
              />
            )}
          </div>
        )}
        <div className="pt-6 flex flex-col grow">
          <CardHeader className="p-0">
            <CardTitle className="line-clamp-2">{title}</CardTitle>
            <CardDescription>
              {author && <span className="text-xs">{author}</span>}
              {author && formattedDate && ' ・ '}
              {formattedDate && <span className="text-xs">{formattedDate}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-2 grow flex flex-col">
            <p className="text-sm text-muted-foreground line-clamp-3 grow">
              {excerpt}
            </p>
          </CardContent>
        </div>
      </div>
    </BaseCard>
  );
};

export { BlogCard };
export type { BlogCardProps };