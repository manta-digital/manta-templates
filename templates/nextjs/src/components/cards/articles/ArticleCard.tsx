import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BaseCard } from '@/components/cards/BaseCard';
import type { ArticleContent } from '@/types/content';

interface ArticleCardProps extends Partial<ArticleContent> {
  className?: string;
}

export default function ArticleCard({ title, subtitle, description, image, href = '/#', className }: ArticleCardProps) {
  return (
    <Link href={href} className={cn('group block w-full', className)}>
      <BaseCard className="relative w-full overflow-hidden p-0 m-0">
        {/* Full-bleed media with overlayed content; aspect ensures height in generic grids */}
        <div className="relative w-full aspect-[16/9] min-h-[260px]">
          {image ? (
            <Image
              src={image}
              alt={title || 'Featured article'}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          {/* gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
          {/* content overlay anchored to bottom */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 text-white">
            {subtitle && (
              <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-wider text-white/80">{subtitle}</p>
            )}
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-balance">
              {title}
            </h3>
            {description && (
              <p className="mt-3 text-sm sm:text-base text-white/90 line-clamp-3 md:line-clamp-4 lg:line-clamp-5">
                {description}
              </p>
            )}
          </div>
        </div>
      </BaseCard>
    </Link>
  );
}


