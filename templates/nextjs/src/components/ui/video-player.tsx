import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { VideoPlayerProps } from '@/types/video';

// Dynamically load ReactPlayer for client-side only
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 w-full h-full" />
});

/**
 * VideoPlayer wrapper component
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, controls = true, width = '100%', height = '100%', className, onReady, onError, title }) => {
  const [hasError, setHasError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={title || 'Video player'}
      aria-describedby="video-player-description"
      className={cn('relative overflow-hidden aspect-video focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500', className)}
    >
      <span id="video-player-description" className="sr-only">
        {title || 'Video player'} content
      </span>
      <div aria-live="polite" className="sr-only">
        {hasError ? 'Video failed to load.' : 'Video loaded successfully.'}
      </div>
      {!reducedMotion ? (
        !hasError ? (
          <ReactPlayer
            className="absolute inset-0"
            url={url}
            controls={controls}
            width={width}
            height={height}
            onReady={onReady}
            onError={(e) => { setHasError(true); onError?.(e); }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4">
            <span className="text-gray-500">Video failed to load.</span>
          </div>
        )
      ) : hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4">
          <span className="text-gray-500">Video failed to load.</span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-4">
          <span className="text-gray-500">Reduced motion enabled – playback disabled.</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
