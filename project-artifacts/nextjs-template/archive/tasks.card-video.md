# Card Video


## project setup

- [x] **add react-player dependency**
  - [x] **install react-player package**
    - [x] navigate to project root directory
      1. ensure you're in `/templates/nextjs/` directory
      2. verify `package.json` exists in current directory
    - [x] install react-player using npm/pnpm
      1. run command:
      ```bash
      pnpm add react-player@^2.16.0
      ```
      2. wait for installation to complete without errors
    - [x] verify installation success
      1. check `package.json` dependencies section contains `"react-player": "^2.16.0"`
      2. confirm `node_modules/react-player` directory exists
      3. run `pnpm list react-player` to verify version
    - [x] success: react-player appears in package.json dependencies and installs without errors

- [x] **create video types interface**
  - [x] **create typescript interfaces file**
    - [x] create directory structure if needed
      1. ensure `src/types/` directory exists, create if missing
    - [x] create video types file
      1. create new file `src/types/video.ts`
      2. add file header comment explaining purpose
    - [x] define BackgroundVideoProps interface
      ```typescript
      interface BackgroundVideoProps {
        src: string;
        poster?: string;
        className?: string;
        children?: React.ReactNode;
      }
      ```
    - [x] define VideoPlayerProps interface
      ```typescript
      interface VideoPlayerProps {
        url: string;
        controls?: boolean;
        width?: string | number;
        height?: string | number;
        className?: string;
        onReady?: (player: any) => void;
        onError?: (error: any) => void;
      }
      ```
    - [x] define VideoCardProps interface
      ```typescript
      interface VideoCardProps {
        title?: string;
        description?: string;
        variant?: 'background' | 'player';
        size?: 'small' | 'medium' | 'large';
        aspectRatio?: '16:9' | '4:3' | '1:1';
        className?: string;
      }
      ```
    - [x] add proper exports
      1. export all interfaces using `export type { ... }`
      2. verify typescript compilation with `pnpm ai-typecheck`
    - [x] success: types file compiles without typescript errors and exports all interfaces

## background video component

- [x] **create background video base component**
  - [x] **create component file structure**
    - [x] ensure `src/components/ui/` directory exists
    - [x] create new file `src/components/ui/background-video.tsx`
    - [x] add file imports
      ```typescript
      import React from 'react';
      import { cn } from '@/lib/utils';
      import type { BackgroundVideoProps } from '@/types/video';
      ```
  - [x] **implement functional component**
    - [x] create component function with proper typing
      ```typescript
      const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
        src,
        poster,
        className,
        children
      }) => {
        // component implementation
      };
      ```
    - [x] implement video element with required attributes
      1. add `autoPlay`, `loop`, `muted`, and `playsInline` attributes
      2. use absolute positioning with `absolute inset-0`
      3. apply `object-cover` for responsive scaling
      4. set `z-index: -10` to stay behind content
    - [x] implement container div
      1. use `relative` positioning for parent container
      2. add `overflow-hidden` to prevent video overflow
      3. merge className prop using `cn()` utility
    - [x] add children rendering for overlay content
    - [x] add component export
      ```typescript
      export default BackgroundVideo;
      ```
    - [x] success: component renders video element with correct attributes and styling

- [x] **add background video responsive styling**
  - [x] implement tailwind css classes for responsive video scaling
  - [x] ensure video maintains aspect ratio across different screen sizes
  - [x] add overflow hidden to parent container
  - [x] test video positioning stays behind content on mobile and desktop
  - [x] success: video scales properly on all breakpoints without layout shifts

- [x] **add background video error handling**
  - [x] **implement error state management**
    - [x] add error state using useState hook
      ```typescript
      const [hasError, setHasError] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
      ```
    - [x] create onError event handler
      ```typescript
      const handleError = () => {
        setHasError(true);
        setIsLoading(false);
      };
      ```
    - [x] create onLoadedData handler
      ```typescript
      const handleLoadedData = () => {
        setIsLoading(false);
      };
      ```
  - [x] **implement fallback content**
    - [x] create fallback component for error state
      1. display poster image if available
      2. show error message if no poster
      3. maintain same dimensions as video
    - [x] add loading state with optional poster image
    - [x] add browser compatibility checks for video format support
      ```typescript
      const canPlayVideo = document.createElement('video').canPlayType('video/mp4');
      ```
  - [x] **integrate error handling into component**
    - [x] add error and loading handlers to video element
    - [x] conditionally render video or fallback based on error state
    - [x] ensure fallback maintains same styling as video
    - [x] success: component handles video load failures gracefully with fallback content

## video player component

- [ ] **create video player wrapper component**
  - [x] **create component file and imports**
    - [x] create new file `src/components/ui/video-player.tsx`
    - [x] add required imports
      ```typescript
      import React, { useState } from 'react';
      import dynamic from 'next/dynamic';
      import { cn } from '@/lib/utils';
      import type { VideoPlayerProps } from '@/types/video';
      ```
    - [x] add dynamic import for react-player
      ```typescript
      const ReactPlayer = dynamic(() => import('react-player'), {
        ssr: false,
        loading: () => <div className="animate-pulse bg-gray-200 w-full h-full" />
      });
      ```
  - [x] **implement wrapper component**
    - [x] create component function with typescript interface
    - [x] add error boundary state management
      ```typescript
      const [hasError, setHasError] = useState(false);
      ```
    - [x] implement ReactPlayer with proper configuration
      ```typescript
      <ReactPlayer
        url={url}
        controls={controls}
        width={width}
        height={height}
        onError={() => setHasError(true)}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
      />
      ```
    - [x] add responsive container wrapper
    - [x] implement error fallback UI
    - [x] success: component renders react-player with proper props and typescript support

- [x] **add video player responsive design**
  - [x] implement aspect-ratio utilities for consistent video dimensions
  - [x] ensure player scales properly across mobile, tablet, and desktop breakpoints
  - [x] add touch-friendly controls for mobile devices
  - [x] test video player maintains proportions during window resize
  - [x] success: video player is fully responsive with appropriate controls for each device

- [x] **implement video player accessibility features**
  - [x] **add keyboard navigation support**
    - [x] implement custom key handlers for video controls
      ```typescript
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case ' ':
          case 'k':
            // toggle play/pause
            break;
          case 'ArrowLeft':
            // seek backward
            break;
          case 'ArrowRight':
            // seek forward
            break;
        }
      };
      ```
    - [x] add event listeners for keyboard interactions
    - [x] ensure focus management works correctly
  - [x] **add aria-labels and screen reader support**
    - [x] add descriptive aria-labels to video container
      ```typescript
      <div
        role="region"
        aria-label={`Video player: ${title || 'Video content'}`}
        aria-describedby="video-description"
      >
      ```
    - [x] implement screen reader announcements for state changes
    - [x] add hidden text descriptions for video content
  - [x] **implement reduced motion preferences**
    - [x] check for `prefers-reduced-motion` media query
    - [x] disable autoplay if reduced motion is preferred
    - [x] provide alternative static content when needed
  - [x] **add focus management**
    - [x] ensure proper tab order for video controls
    - [x] add visible focus indicators
    - [x] manage focus when video enters/exits fullscreen
  - [x] success: video player meets wcag accessibility standards and works with screen readers

- [ ] **add video player performance optimizations**
  - [x] **implement lazy loading**
    - [x] use intersection observer to detect when video enters viewport
      ```typescript
      const [shouldLoad, setShouldLoad] = useState(false);
      const videoRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        
        if (videoRef.current) {
          observer.observe(videoRef.current);
        }
        
        return () => observer.disconnect();
      }, []);
      ```
    - [x] conditionally render ReactPlayer only when in viewport
    - [x] show placeholder/thumbnail until video loads
  - [x] **optimize react-player imports**
    - [x] import only needed players to reduce bundle size
      ```typescript
      import ReactPlayer from 'react-player/lazy';
      ```
    - [x] configure webpack to exclude unused players
  - [x] **add preload configuration**
    - [x] set preload to 'metadata' by default
    - [x] allow override for specific use cases
    - [x] implement progressive loading strategies
  - [x] **implement performance monitoring**
    - [x] add loading time tracking
    - [x] monitor video performance metrics
    - [x] log performance data for optimization
  - [x] success: video player loads efficiently and doesn't impact initial page load performance

## video card compositions

- [x] **create background video card component**
  - [ ] create `src/components/cards/video-card-background.tsx` file
  - [x] combine background-video component with shadcn card component
  - [x] implement overlay content area for text and interactive elements
  - [x] add proper z-index management for content layering
  - [x] success: card displays video background with readable overlay content

- [x] **create video player card component**
  - [x] create `src/components/cards/video-card.tsx` file
  - [x] integrate video-player component within shadcn card layout
  - [x] add card header, content area, and optional footer sections
  - [x] implement responsive card sizing with video aspect ratio preservation
  - [x] success: card displays video player with proper card styling and layout

- [x] **add video card variants**
  - [x] create multiple card size variants (small, medium, large)
  - [x] implement different aspect ratios (16:9, 4:3, 1:1) for video content
  - [x] add optional card actions (play, share, favorite buttons)
  - [x] include hover states and interactive animations using framer-motion
  - [x] success: multiple card variants render correctly with smooth animations

- [x] **implement video card grid layout**
  - [x] create responsive grid layout for multiple video cards
  - [x] ensure proper spacing and alignment across different screen sizes
  - [x] add masonry-style layout option for cards of different heights
  - [x] implement lazy loading for video cards in grid view
  - [x] success: video cards display in responsive grid with optimal spacing

## testing and documentation

- [ ] **create video component examples**
  - [ ] create example usage files in `examples/our-project/` directory
  - [ ] include sample video urls and configuration examples
  - [ ] demonstrate both background video and video player implementations
  - [ ] add code snippets showing different card variants
  - [ ] success: examples compile and render correctly with sample content

- [ ] **add component documentation**
  - [ ] document component props and usage in jsdoc comments
  - [ ] create readme section explaining video format recommendations
  - [ ] include performance best practices and accessibility guidelines
  - [ ] document browser compatibility and fallback strategies
  - [ ] success: comprehensive documentation covers all component features and usage patterns

- [ ] **implement basic component tests**
  - [ ] create unit tests for video component prop handling
  - [ ] test error states and fallback behavior
  - [ ] verify responsive behavior across different viewport sizes
  - [ ] test accessibility features with automated testing tools
  - [ ] success: all tests pass and cover critical component functionality
