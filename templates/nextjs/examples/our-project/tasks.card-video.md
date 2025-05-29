# Card Video


## project setup

- [ ] **add react-player dependency**
  - [ ] **install react-player package**
    - [ ] navigate to project root directory
      1. ensure you're in `/templates/nextjs/` directory
      2. verify `package.json` exists in current directory
    - [ ] install react-player using npm/pnpm
      1. run command:
      ```bash
      pnpm add react-player@^2.16.0
      ```
      2. wait for installation to complete without errors
    - [ ] verify installation success
      1. check `package.json` dependencies section contains `"react-player": "^2.16.0"`
      2. confirm `node_modules/react-player` directory exists
      3. run `pnpm list react-player` to verify version
    - [ ] success: react-player appears in package.json dependencies and installs without errors

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

- [ ] **create background video base component**
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

- [ ] **add background video error handling**
  - [ ] **implement error state management**
    - [ ] add error state using useState hook
      ```typescript
      const [hasError, setHasError] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
      ```
    - [ ] create onError event handler
      ```typescript
      const handleError = () => {
        setHasError(true);
        setIsLoading(false);
      };
      ```
    - [ ] create onLoadedData handler
      ```typescript
      const handleLoadedData = () => {
        setIsLoading(false);
      };
      ```
  - [ ] **implement fallback content**
    - [ ] create fallback component for error state
      1. display poster image if available
      2. show error message if no poster
      3. maintain same dimensions as video
    - [ ] add loading state with optional poster image
    - [ ] add browser compatibility checks for video format support
      ```typescript
      const canPlayVideo = document.createElement('video').canPlayType('video/mp4');
      ```
  - [ ] **integrate error handling into component**
    - [ ] add error and loading handlers to video element
    - [ ] conditionally render video or fallback based on error state
    - [ ] ensure fallback maintains same styling as video
    - [ ] success: component handles video load failures gracefully with fallback content

## video player component

- [ ] **create video player wrapper component**
  - [ ] **create component file and imports**
    - [ ] create new file `src/components/ui/video-player.tsx`
    - [ ] add required imports
      ```typescript
      import React, { useState } from 'react';
      import dynamic from 'next/dynamic';
      import { cn } from '@/lib/utils';
      import type { VideoPlayerProps } from '@/types/video';
      ```
    - [ ] add dynamic import for react-player
      ```typescript
      const ReactPlayer = dynamic(() => import('react-player'), {
        ssr: false,
        loading: () => <div className="animate-pulse bg-gray-200 w-full h-full" />
      });
      ```
  - [ ] **implement wrapper component**
    - [ ] create component function with typescript interface
    - [ ] add error boundary state management
      ```typescript
      const [hasError, setHasError] = useState(false);
      ```
    - [ ] implement ReactPlayer with proper configuration
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
    - [ ] add responsive container wrapper
    - [ ] implement error fallback UI
    - [ ] success: component renders react-player with proper props and typescript support

- [ ] **add video player responsive design**
  - [ ] implement aspect-ratio utilities for consistent video dimensions
  - [ ] ensure player scales properly across mobile, tablet, and desktop breakpoints
  - [ ] add touch-friendly controls for mobile devices
  - [ ] test video player maintains proportions during window resize
  - [ ] success: video player is fully responsive with appropriate controls for each device

- [ ] **implement video player accessibility features**
  - [ ] **add keyboard navigation support**
    - [ ] implement custom key handlers for video controls
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
    - [ ] add event listeners for keyboard interactions
    - [ ] ensure focus management works correctly
  - [ ] **add aria-labels and screen reader support**
    - [ ] add descriptive aria-labels to video container
      ```typescript
      <div
        role="region"
        aria-label={`Video player: ${title || 'Video content'}`}
        aria-describedby="video-description"
      >
      ```
    - [ ] implement screen reader announcements for state changes
    - [ ] add hidden text descriptions for video content
  - [ ] **implement reduced motion preferences**
    - [ ] check for `prefers-reduced-motion` media query
    - [ ] disable autoplay if reduced motion is preferred
    - [ ] provide alternative static content when needed
  - [ ] **add focus management**
    - [ ] ensure proper tab order for video controls
    - [ ] add visible focus indicators
    - [ ] manage focus when video enters/exits fullscreen
  - [ ] success: video player meets wcag accessibility standards and works with screen readers

- [ ] **add video player performance optimizations**
  - [ ] **implement lazy loading**
    - [ ] use intersection observer to detect when video enters viewport
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
    - [ ] conditionally render ReactPlayer only when in viewport
    - [ ] show placeholder/thumbnail until video loads
  - [ ] **optimize react-player imports**
    - [ ] import only needed players to reduce bundle size
      ```typescript
      import ReactPlayer from 'react-player/lazy';
      ```
    - [ ] configure webpack to exclude unused players
  - [ ] **add preload configuration**
    - [ ] set preload to 'metadata' by default
    - [ ] allow override for specific use cases
    - [ ] implement progressive loading strategies
  - [ ] **implement performance monitoring**
    - [ ] add loading time tracking
    - [ ] monitor video performance metrics
    - [ ] log performance data for optimization
  - [ ] success: video player loads efficiently and doesn't impact initial page load performance

## video card compositions

- [ ] **create background video card component**
  - [ ] create `src/components/cards/video-card-background.tsx` file
  - [ ] combine background-video component with shadcn card component
  - [ ] implement overlay content area for text and interactive elements
  - [ ] add proper z-index management for content layering
  - [ ] success: card displays video background with readable overlay content

- [ ] **create video player card component**
  - [ ] create `src/components/cards/video-card.tsx` file
  - [ ] integrate video-player component within shadcn card layout
  - [ ] add card header, content area, and optional footer sections
  - [ ] implement responsive card sizing with video aspect ratio preservation
  - [ ] success: card displays video player with proper card styling and layout

- [ ] **add video card variants**
  - [ ] create multiple card size variants (small, medium, large)
  - [ ] implement different aspect ratios (16:9, 4:3, 1:1) for video content
  - [ ] add optional card actions (play, share, favorite buttons)
  - [ ] include hover states and interactive animations using framer-motion
  - [ ] success: multiple card variants render correctly with smooth animations

- [ ] **implement video card grid layout**
  - [ ] create responsive grid layout for multiple video cards
  - [ ] ensure proper spacing and alignment across different screen sizes
  - [ ] add masonry-style layout option for cards of different heights
  - [ ] implement lazy loading for video cards in grid view
  - [ ] success: video cards display in responsive grid with optimal spacing

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
