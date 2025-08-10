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
        {/* Media area with fixed aspect ratio so fill images have height */}
        <div className="relative w-full aspect-[16/9] min-h-[200px]">
          {image ? (
            <Image
              src={image}
              alt={title || 'Featured article'}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>
        <div className="p-4 pb-6 sm:p-5 md:p-6 text-white">
          {subtitle && (
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/80">{subtitle}</p>
          )}
          <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
          {description && (
            <p className="mt-2 text-sm sm:text-base text-white/90 line-clamp-3 md:line-clamp-3 lg:line-clamp-7">{description}</p>
          )}
        </div>
      </BaseCard>
    </Link>
  );
}


