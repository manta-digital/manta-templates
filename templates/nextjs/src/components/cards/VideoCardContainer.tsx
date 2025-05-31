'use client';

import VideoCard from './VideoCard';
import { getVideoBySlug } from '@/lib/content-api.client';

interface VideoCardContainerProps {
  slug: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

export default function VideoCardContainer({ 
  slug, 
  className,
  children,
  overlay = false
}: VideoCardContainerProps) {
  const content = getVideoBySlug(slug);
  if (!content) return null;
  
  return (
    <VideoCard 
      content={content} 
      className={className}
      overlay={overlay}
    >
      {children}
    </VideoCard>
  );
}
