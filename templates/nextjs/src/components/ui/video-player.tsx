import React, { useState } from 'react';
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
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, controls = true, width = '100%', height = '100%', className, onReady, onError }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className={cn('flex items-center justify-center bg-gray-100 p-4', className)}>Video failed to load.</div>;
  }

  return (
    <div className={cn('relative overflow-hidden aspect-video', className)}>
      <ReactPlayer
        className="absolute inset-0"
        url={url}
        controls={controls}
        width={width}
        height={height}
        onReady={onReady}
        onError={(e) => { setHasError(true); onError?.(e); }}
      />
    </div>
  );
};

export default VideoPlayer;
