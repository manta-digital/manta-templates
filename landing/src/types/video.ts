import type { ReactNode } from 'react';

/**
 * Video component type definitions
 */

export interface BackgroundVideoProps {
  /** URL of the video source */
  src: string;
  /** Optional poster image URL */
  poster?: string;
  /** Additional CSS classes */
  className?: string;
  /** Overlay content element */
  children?: ReactNode;
  /** Autoplay toggle; when true, video plays immediately */
  autoplay?: boolean;
}

export interface VideoPlayerProps {
  /** Video source URL */
  url: string;
  /** Show native player controls */
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  onReady?: (player: unknown) => void;
  /** Called on playback error */
  onError?: (error: unknown) => void;
  /** Optional accessible title for aria-label */
  title?: string;
  /** Preload attribute for video ('metadata', 'auto', 'none') */
  preload?: string;
}

export interface VideoCardProps {
  /** Optional card title */
  title?: string;
  /** Optional card description */
  description?: string;
  /** Choose background vs player card */
  variant?: 'background' | 'player';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Video aspect ratio */
  aspectRatio?: '16:9' | '4:3' | '1:1';
  /** Additional CSS classes */
  className?: string;
}
