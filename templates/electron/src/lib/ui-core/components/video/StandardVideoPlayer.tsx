import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface StandardVideoPlayerProps {
  url: string;
  title?: string;
  controls?: boolean;
  autoplay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const StandardVideoPlayer: React.FC<StandardVideoPlayerProps> = ({
  url,
  title,
  controls = true,
  autoplay = false,
  className,
  children
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Handle autoplay if enabled
    if (autoplay) {
      video.muted = true; // Required for autoplay
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn('Autoplay failed:', error);
        }
      };
      const timer = setTimeout(playVideo, 300);
      
      return () => {
        clearTimeout(timer);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [autoplay]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.warn);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("relative w-full h-full bg-black", className)}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        controls={false} // We'll provide custom controls
        playsInline
        title={title}
      />
      
      {controls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3 text-white">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <span className="text-xs">⏸</span>
              ) : (
                <span className="text-xs">▶</span>
              )}
            </button>
            
            {/* Time Display */}
            <span className="text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
          
          {title && (
            <div className="mt-2">
              <h3 className="text-white text-sm font-medium">{title}</h3>
            </div>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
};

export { StandardVideoPlayer };
export type { StandardVideoPlayerProps };