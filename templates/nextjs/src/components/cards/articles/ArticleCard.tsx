'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BaseCard } from '@/components/cards/BaseCard';
import { ArticleContent } from '@/types/content';
import { motion } from 'framer-motion';

interface ArticleCardProps extends Partial<ArticleContent> {
  className?: string;
  href?: string;
}

export default function ArticleCard({ title, subtitle, description, image, href = '/#', className }: ArticleCardProps) {
  return (
    <motion.div className="h-full w-full">
      <Link href={href} className={cn('group block h-full w-full', className)}>
        <BaseCard className="relative h-full w-full overflow-hidden p-0 m-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={image || '/image/blog/blog-sample-image.png'}
              alt={title || 'Featured article'}
              fill
              className="object-cover"
            />
          </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:p-5 md:p-6 text-card-foreground pointer-events-none">
          {subtitle && (
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-card-foreground/80">
              {subtitle}
            </p>
          )}
          <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
          {description && (
            <p className="mt-2 text-sm sm:text-base text-card-foreground/90 line-clamp-3 md:line-clamp-3 lg:line-clamp-7">
              {description}
            </p>
          )}
        </div>
        </BaseCard>
      </Link>
    </motion.div>
  );
}


