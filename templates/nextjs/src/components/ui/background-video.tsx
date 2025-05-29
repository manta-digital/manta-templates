import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundVideoProps } from '@/types/video';

/**
 * BackgroundVideo component skeleton
 */
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, poster, className, children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <div
      className={cn('relative overflow-hidden aspect-video', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        Your browser does not support the video tag.
      </video>
      {children}
    </div>
  );
};

export default BackgroundVideo;
