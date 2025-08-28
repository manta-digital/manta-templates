import VideoCard from './VideoCard';
import { getContentBySlug } from '@/lib/content';
import type { VideoContent } from '@/types/content';

interface VideoCardContainerProps {
  slug: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

export default async function VideoCardContainer({ 
  slug, 
  className,
  children,
  overlay = false
}: VideoCardContainerProps) {
  try {
    const { frontmatter: content } = await getContentBySlug<VideoContent>('videos', slug);
    
    return (
      <VideoCard 
        content={content} 
        className={className}
        overlay={overlay}
      >
        {children}
      </VideoCard>
    );
  } catch (error) {
    console.error(`Error loading video content for slug "${slug}":`, error);
    return null;
  }
}
