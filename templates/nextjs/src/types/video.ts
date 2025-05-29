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
}

export interface VideoPlayerProps {
  /** Video source URL */
  url: string;
  /** Show native player controls */
  controls?: boolean;
  /** Width of the player */
  width?: string | number;
  /** Height of the player */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Called when player is ready */
  onReady?: (player: any) => void;
  /** Called on playback error */
  onError?: (error: any) => void;
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
