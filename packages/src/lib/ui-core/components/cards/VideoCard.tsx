import React from 'react';
import { cn } from '../../utils/cn';
import { BaseCard } from './BaseCard';
import { VideoContent } from '../../types/content';

interface VideoCardProps {
  title?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  content?: VideoContent;
  className?: string;
  overlay?: boolean;
  displayMode?: 'thumbnail' | 'background' | 'player';
  children?: React.ReactNode;
  // Dependency injection props
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
  // Video component injection (for advanced modes)
  VideoPlayerComponent?: React.ComponentType<any>;
  BackgroundVideoComponent?: React.ComponentType<any>;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnailUrl,
  videoUrl,
  content,
  className,
  overlay = false,
  displayMode = 'thumbnail',
  children,
  ImageComponent = 'img',
  LinkComponent = 'a',
  VideoPlayerComponent,
  BackgroundVideoComponent,
}) => {
  // Use content prop if provided, otherwise fall back to individual props
  const cardTitle = content?.title || title || '';
  const cardThumbnailUrl = content?.thumbnailUrl || thumbnailUrl || '';
  const cardVideoUrl = content?.videoUrl || videoUrl || '';
  const finalDisplayMode = content?.displayMode || displayMode;
  const autoplay = content?.autoplay ?? true;
  const controls = content?.controls ?? true;
  const poster = content?.poster;

  // Background video mode (requires BackgroundVideoComponent injection)
  if (finalDisplayMode === 'background' && BackgroundVideoComponent) {
    return (
      <BaseCard className={cn('overflow-hidden h-full relative p-0', className)}>
        <BackgroundVideoComponent
          src={cardVideoUrl}
          poster={poster || cardThumbnailUrl}
          autoplay={autoplay}
          className="w-full h-full"
        >
          {overlay && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-card-foreground text-center p-4">
                <h3 className="text-lg font-semibold mb-2">{cardTitle}</h3>
                {content?.description && (
                  <p className="text-sm opacity-90">{content.description}</p>
                )}
              </div>
            </div>
          )}
          {children}
        </BackgroundVideoComponent>
      </BaseCard>
    );
  }

  // Interactive player mode (requires VideoPlayerComponent injection)
  if (finalDisplayMode === 'player' && VideoPlayerComponent) {
    return (
      <BaseCard className={cn('overflow-hidden h-full', className)}>
        <div className="w-full h-full">
          <VideoPlayerComponent
            url={cardVideoUrl}
            controls={controls}
            title={cardTitle}
            className="w-full h-full"
          />
          {overlay && cardTitle && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-card-foreground text-sm font-medium">{cardTitle}</h3>
              {content?.description && (
                <p className="text-card-foreground/80 text-xs mt-1">{content.description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </BaseCard>
    );
  }

  // Default thumbnail mode (works without additional dependencies)
  return (
    <BaseCard className={cn('overflow-hidden h-full p-0', className)}> 
      {/* Make Link fill height */}
      <LinkComponent href={cardVideoUrl} target="_blank" rel="noopener noreferrer" className="group h-full block"> 
        {/* Image container with 16:9 aspect ratio - This will now be centered vertically */}
        <div className="relative w-full h-full overflow-hidden">
          <ImageComponent
            src={cardThumbnailUrl}
            alt={`Thumbnail for ${cardTitle}`}
            className="object-cover w-full h-full"
            {...(ImageComponent !== 'img' && { fill: true })}
            {...(ImageComponent === 'img' && { 
              style: { width: '100%', height: '100%', objectFit: 'cover' }
            })}
          />
          {/* Overlay + Play Icon Placeholder - Placed *inside* the relative container */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.5)] transition-opacity flex items-center justify-center z-10">
            <span className="text-white text-4xl opacity-0 group-hover:opacity-90 transition-opacity">▶</span>
          </div>
          {overlay && cardTitle && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <h3 className="text-sm font-medium truncate text-white">{cardTitle}</h3>
              {content?.description && (
                <p className="text-xs text-white/80 mt-1 line-clamp-2">{content.description}</p>
              )}
            </div>
          )}
        </div>
        {children}
      </LinkComponent>
    </BaseCard>
  );
};

export { VideoCard };