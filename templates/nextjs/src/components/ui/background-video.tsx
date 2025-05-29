import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundVideoProps } from '@/types/video';

/**
 * BackgroundVideo component skeleton
 */
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, poster, className, children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();
  const handleError = () => { setHasError(true); setIsLoading(false); };
  const handleLoadedData = () => { setIsLoading(false); };

  return (
    <div
      className={cn('relative overflow-hidden aspect-video', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      { !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          onError={handleError}
          onLoadedData={handleLoadedData}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          Your browser does not support the video tag.
        </video>
      )}
      { hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Video failed to load.</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default BackgroundVideo;
