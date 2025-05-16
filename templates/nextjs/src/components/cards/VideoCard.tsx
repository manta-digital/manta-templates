             import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import BaseCard from './BaseCard';
// import { PlayCircle } from 'lucide-react'; // Icon for later

interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  videoUrl: string; // URL to the video page or direct source
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnailUrl,
  videoUrl,
  className,
}) => {
  return (
    <BaseCard className={cn('overflow-hidden h-full justify-center', className)}> 
      {/* Make Link fill height */}
      <Link href={videoUrl} target="_blank" rel="noopener noreferrer" className="group"> 
        {/* Image container with 16:9 aspect ratio - This will now be centered vertically */}
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill
            className="object-cover"
          />
          {/* Overlay + Play Icon Placeholder - Placed *inside* the relative container */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.5)] transition-opacity flex items-center justify-center rounded-md z-10">
            <span className="text-white text-4xl opacity-0 group-hover:opacity-90 transition-opacity">▶</span>
          </div>
        </div>
        {/* Optional Title (can be added below if needed) */}
        {/* <h3 className="p-2 text-sm font-medium truncate">{title}</h3> */}
      </Link>
    </BaseCard>
  );
};

export default VideoCard;