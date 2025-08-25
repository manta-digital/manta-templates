'use client';

import { cn } from '../../utils';
import { BaseCard } from './BaseCard';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ComponentType, ElementType } from 'react';

export interface ArticleContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

interface ArticleCardProps extends Partial<ArticleContent> {
  className?: string;
  href?: string;
  motionProps?: MotionProps;
  ImageComponent?: ComponentType<any> | string;
  LinkComponent?: ComponentType<any> | string;
  /**
   * Additional props to pass to the rendered image component.
   * Useful for framework adapters (e.g., Next.js Image `fill`, `priority`, `sizes`).
   */
  imageProps?: Record<string, unknown>;
}

export function ArticleCard({ 
  title, 
  subtitle, 
  description, 
  image, 
  href = '#', 
  className, 
  motionProps = {},
  ImageComponent = 'img',
  LinkComponent = 'a',
  imageProps = {},
  ...props 
}: ArticleCardProps) {
  const MotionDiv = motion.div;
  const Link = (LinkComponent || 'a') as ElementType;


  return (
    <MotionDiv className="h-full w-full" {...motionProps}>
      <Link href={href} className={cn('group block h-full w-full', className)} {...props}>
        <BaseCard className="relative h-full w-full overflow-hidden p-0 m-0">
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {typeof ImageComponent === 'string' ? (
              <img
                src={image || '/image/blog/blog-sample-image.png'}
                alt={title || 'Featured article'}
                className="object-cover w-full h-full"
                {...imageProps}
              />
            ) : (
              <ImageComponent
                src={image || '/image/blog/blog-sample-image.png'}
                alt={title || 'Featured article'}
                className="object-cover w-full h-full"
                {...imageProps}
              />
            )}
          </MotionDiv>
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:p-5 md:p-6 text-white pointer-events-none">
            {subtitle && (
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/80">
                {subtitle}
              </p>
            )}
            <h3 className="text-xl sm:text-2xl font-bold">{title || 'Untitled Article'}</h3>
            {description && (
              <p className="mt-2 text-sm sm:text-base text-white/90 line-clamp-3 md:line-clamp-3 lg:line-clamp-7">
                {description}
              </p>
            )}
          </div>
        </BaseCard>
      </Link>
    </MotionDiv>
  );
}
