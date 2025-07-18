# Card Video

Video card (or cards) component(s) that provide the following:
1. background video. a component that loops a video in background, probably using HTML5 <video> element
2. video player component, using either video.js or React Player.  before we proceed to task breakdown, we need to figure out the best approach.  

# card video feature analysis

## overview

video card components for next.js 15 template with two distinct use cases:
1. **background video component** - decorative, auto-playing looped video backgrounds
2. **video player component** - interactive video player with controls

## technical stack compatibility

**current stack:**
- next.js 15.3.1
- react 19
- tailwind css 4
- shadcn ui components
- typescript
- framer-motion 12.11.0

## component analysis

### background video component

**recommended approach: native html5 video**

**rationale:**
- no external dependencies needed
- optimal performance for background use
- native browser support
- simple implementation
- works seamlessly with tailwind css

**key requirements:**
- `autoplay`, `loop`, `muted` attributes (required for modern browsers)
- `object-fit: cover` for responsive scaling
- absolute positioning with z-index management
- fallback content for unsupported browsers

**implementation strategy:**
```tsx
interface BackgroundVideoProps {
  src: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
}

const BackgroundVideo = ({ src, poster, className, children }: BackgroundVideoProps) => (
  <div className={cn("relative overflow-hidden", className)}>
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className="absolute inset-0 w-full h-full object-cover -z-10"
    >
      <source src={src} type="video/mp4" />
    </video>
    {children}
  </div>
);
```

### video player component

**recommended approach: react-player**

**rationale:**
- lightweight and modern
- excellent react 19 compatibility
- supports multiple video sources (youtube, vimeo, local files)
- typescript support
- active maintenance
- smaller bundle size than video.js
- simpler api for react developers

**alternative consideration: video.js**
- more features but heavier
- requires more complex lifecycle management
- better for advanced use cases
- larger learning curve

**react-player advantages for our stack:**
- native react component
- works well with next.js ssr
- easy integration with tailwind css
- supports responsive design
- minimal setup required

**implementation strategy:**
```tsx
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const VideoPlayer = ({ url, controls = true, width = "100%", height = "100%", className }: VideoPlayerProps) => (
  <div className={cn("relative", className)}>
    <ReactPlayer
      url={url}
      controls={controls}
      width={width}
      height={height}
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload'
          }
        }
      }}
    />
  </div>
);
```

## dependency recommendations

**add to package.json:**
```json
{
  "dependencies": {
    "react-player": "^2.16.0"
  }
}
```

**no additional dependencies needed for background video component**

## performance considerations

### background video
- use compressed video files (webm preferred, mp4 fallback)
- optimize video dimensions for target display sizes
- consider lazy loading for below-the-fold content
- implement intersection observer for performance

### video player
- lazy load react-player component
- preload metadata only by default
- implement error boundaries
- consider video thumbnail previews

## accessibility considerations

- provide captions/subtitles support
- keyboard navigation for video controls
- screen reader announcements
- reduced motion preferences
- focus management

## responsive design strategy

**tailwind css integration:**
- use aspect-ratio utilities for consistent video dimensions
- responsive breakpoint handling
- mobile-first approach
- touch-friendly controls

## file structure recommendation

```
src/
├── components/
│   ├── ui/
│   │   ├── background-video.tsx
│   │   └── video-player.tsx
│   └── cards/
│       ├── video-card.tsx
│       └── video-card-background.tsx
├── types/
│   └── video.ts
└── hooks/
    └── use-video-player.ts
```

## implementation phases

### phase 1: background video component
- create base background-video component
- implement with tailwind css styling
- add typescript interfaces
- create example usage

### phase 2: video player component
- add react-player dependency
- create video-player wrapper component
- implement responsive design
- add error handling

### phase 3: video card compositions
- combine components into card layouts
- implement with shadcn card component
- add framer-motion animations
- create multiple card variants

## testing strategy

- unit tests for component props
- visual regression tests
- accessibility testing
- performance testing
- cross-browser compatibility

## conclusion

**recommended approach:**
1. **background video:** native html5 video element
2. **video player:** react-player library

this combination provides optimal performance, maintainability, and compatibility with the current tech stack while minimizing bundle size and complexity.
