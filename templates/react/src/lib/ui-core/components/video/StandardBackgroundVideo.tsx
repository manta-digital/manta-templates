import React, { useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface StandardBackgroundVideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const StandardBackgroundVideo: React.FC<StandardBackgroundVideoProps> = ({ 
  src, 
  poster, 
  autoplay = true, 
  className, 
  children 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;
    
    const video = videoRef.current;
    video.muted = true; // Required for autoplay
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Autoplay failed:', error);
      }
    };
    
    // Delay for DOM readiness
    const timer = setTimeout(playVideo, 300);
    
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [autoplay]);
  
  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop
        muted
        playsInline
        controls={false}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        onLoadedData={() => {
          if (autoplay && videoRef.current) {
            videoRef.current.play().catch(console.warn);
          }
        }}
      />
      {children}
    </div>
  );
};

export { StandardBackgroundVideo };
export type { StandardBackgroundVideoProps };