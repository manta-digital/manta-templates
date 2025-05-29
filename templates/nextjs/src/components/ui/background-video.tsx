import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundVideoProps } from '@/types/video';

/**
 * BackgroundVideo component skeleton
 */
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, poster, className, children, autoplay = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();
  const handleError = () => { setHasError(true); };
  const handleLoadedData = () => { if (autoplay && videoRef.current) { videoRef.current.play().catch(error => { console.warn('Autoplay failed:', error); }); } };

  useEffect(() => {
    if (autoplay && videoRef.current && !hasError) {
      videoRef.current.play().catch((error) => {
        console.warn('Autoplay failed:', error);
      });
    }
  }, [autoplay, hasError]);

  return (
    <div
      className={cn('relative overflow-hidden aspect-video', className)}
      onMouseEnter={!autoplay ? handleMouseEnter : undefined}
      onMouseLeave={!autoplay ? handleMouseLeave : undefined}
    >
      { !hasError && (
        <video
          autoPlay={autoplay}
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
