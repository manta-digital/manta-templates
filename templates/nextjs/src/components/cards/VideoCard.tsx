             import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BaseCard } from './BaseCard';
import BackgroundVideo from '@/components/ui/background-video';
import VideoPlayer from '@/components/ui/video-player';
import { VideoContent } from '@/types/content';
// import { PlayCircle } from 'lucide-react'; // Icon for later

interface VideoCardProps {
  title?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  content?: VideoContent;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnailUrl,
  videoUrl,
  content,
  className,
  overlay = false,
  children,
}) => {
  // Use content prop if provided, otherwise fall back to individual props
  const cardTitle = content?.title || title || '';
  const cardThumbnailUrl = content?.thumbnailUrl || thumbnailUrl || '';
  const cardVideoUrl = content?.videoUrl || videoUrl || '';
  const displayMode = content?.displayMode || 'thumbnail';
  const autoplay = content?.autoplay ?? true;
  const controls = content?.controls ?? true;
  const poster = content?.poster;

  // Background video mode
  if (displayMode === 'background') {
    return (
              <BaseCard className={cn('overflow-hidden h-full relative', className)}>
        <BackgroundVideo
          src={cardVideoUrl}
          poster={poster || cardThumbnailUrl}
          autoplay={autoplay}
          className="w-full h-full"
        >
          {overlay && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <h3 className="text-lg font-semibold mb-2">{cardTitle}</h3>
                {content?.description && (
                  <p className="text-sm opacity-90">{content.description}</p>
                )}
              </div>
            </div>
          )}
          {children}
        </BackgroundVideo>
      </BaseCard>
    );
  }

  // Interactive player mode
  if (displayMode === 'player') {
    return (
      <BaseCard className={cn('overflow-hidden h-full', className)}>
        <div className="w-full h-full">
          <VideoPlayer
            url={cardVideoUrl}
            controls={controls}
            title={cardTitle}
            className="w-full h-full"
          />
          {overlay && cardTitle && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white text-sm font-medium">{cardTitle}</h3>
              {content?.description && (
                <p className="text-white/80 text-xs mt-1">{content.description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </BaseCard>
    );
  }

  // Default thumbnail mode (original behavior)
  return (
    <BaseCard className={cn('overflow-hidden h-full justify-center', className)}> 
      {/* Make Link fill height */}
      <Link href={cardVideoUrl} target="_blank" rel="noopener noreferrer" className="group"> 
        {/* Image container with 16:9 aspect ratio - This will now be centered vertically */}
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          <Image
            src={cardThumbnailUrl}
            alt={`Thumbnail for ${cardTitle}`}
            fill
            className="object-cover"
          />
          {/* Overlay + Play Icon Placeholder - Placed *inside* the relative container */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.5)] transition-opacity flex items-center justify-center rounded-md z-10">
            <span className="text-white text-4xl opacity-0 group-hover:opacity-90 transition-opacity">▶</span>
          </div>
        </div>
        {overlay && cardTitle && (
          <div className="p-3">
            <h3 className="text-sm font-medium truncate">{cardTitle}</h3>
            {content?.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{content.description}</p>
            )}
          </div>
        )}
        {children}
      </Link>
    </BaseCard>
  );
};

export default VideoCard;