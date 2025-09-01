---
item: react-components-2
project: manta-templates
type: tasks
sliceRef: slices/16-slice.react-components.md
dependencies: [ui-core]
projectState: ui-core established with Next.js injection patterns, ready for standard React support
status: not started
lastUpdated: 2025-08-31
---

# Tasks: React Components (Standard HTML Elements)

## Context Summary

Implementing standard React support for ui-core components by creating templates/react as validation and adding framework-agnostic video components. Current analysis shows that 95% of ui-core components already work in standard React environments through graceful HTML element defaults (img, a). Only video functionality requires new StandardBackgroundVideo and StandardVideoPlayer components.

**Development Approach**: Validate-first strategy by creating React template to prove existing functionality, then enhance with missing video components.

**Key Requirements**:
- Create templates/react using Vite + React to validate component compatibility
- Build StandardBackgroundVideo component for framework-agnostic video support  
- Maintain 100% backward compatibility with existing Next.js injection patterns
- Demonstrate full ui-core functionality in standard React environments


### Task 4: Home Page Implementation
**Objective**: Port Next.js home page to React with hardcoded content
**Effort**: 2/5

#### Create HomePage Component Structure
- [x] Set up basic HomePage.tsx structure
  - [x] Create src/pages/HomePage.tsx based on templates/nextjs/src/app/page.tsx
  - [x] Import required ui-core components
  - [x] Import hardcoded content from src/content/
  - [x] **Success**: HomePage component file structure ready

#### Replace Content Loading System
- [x] Convert from markdown loading to hardcoded imports
  - [x] Replace Next.js content loading with static imports:
    ```typescript
    import { homeContent, reactProjectContent, quoteContent } from '../content'
    ```
  - [x] Remove all async content loading logic
  - [x] **Success**: Content loading converted to static imports

#### Implement Hero Section
- [x] Port hero section with React-specific messaging
  - [x] Update title to "React Components Template"
  - [x] Update description to emphasize standard React usage
  - [x] Verify hero section styles render correctly
  - [x] **Success**: Hero section displays React template branding

#### Test Component Integration
- [x] Test QuoteCard component with hardcoded content
  - [x] Import and render QuoteCard with quoteContent
  - [x] Verify component renders without injection
  - [x] Test responsive layout behavior
  - [x] **Success**: QuoteCard works with standard HTML elements

- [x] Verify page renders correctly with theme system
  - [x] Test light/dark theme switching
  - [x] Verify CSS custom properties apply correctly
  - [x] **Success**: Theme system fully functional in React template

#### Test Navigation
- [x] Test responsive layout across device sizes
  - [x] Verify mobile layout works correctly
  - [x] Test tablet breakpoint behavior
  - [x] Test desktop layout displays properly
  - [x] **Success**: Responsive design works without framework dependencies

- [x] Verify navigation between Home and Examples pages works
  - [x] Test React Router navigation
  - [x] Verify page transitions work smoothly
  - [x] **Success**: Navigation system functional

### Task 5: Examples Page Implementation
**Objective**: Port Next.js examples page to validate complete component coverage with video support
**Effort**: 4/5
**Status**: COMPLETED ✅

#### Create ExamplesPage Component Structure
- [x] Set up comprehensive examples page
  - [x] Create src/pages/ExamplesPage.tsx based on templates/nextjs/src/app/examples/page.tsx
  - [x] Import all components (BentoLayout, GridItem, VideoCard, etc.)
  - [x] Plan responsive grid layout matching Next.js examples structure
  - [x] **Success**: ExamplesPage structure ready and functional

#### Remove Framework Dependencies
- [x] Convert all components to use standard HTML defaults
  - [x] Remove all Next.js Image and Link injection requirements
  - [x] Verify components default to img and a elements automatically
  - [x] Test that no injection is required for basic functionality
  - [x] **Success**: All components work with standard HTML elements

#### Implement Grid and Layout Components
- [x] Port BentoLayout with responsive grid system
  - [x] Test BentoLayout renders correctly without Next.js
  - [x] Verify grid responsiveness across breakpoints (mobile/tablet/desktop)
  - [x] **Success**: BentoLayout works perfectly in standard React environment

- [x] Port GridItem components with various content types
  - [x] Test GridItem with different span configurations
  - [x] Verify grid item positioning works correctly across all breakpoints
  - [x] **Success**: GridItem system fully functional

#### Implement Card Components
- [x] Port GradientCard with theme-aware gradient system
  - [x] Test gradient rendering with CSS custom properties
  - [x] Verify gradient system works with theme switching
  - [x] **Success**: GradientCard displays theme-aware gradients with working CSS custom properties

- [x] Port VideoCard with comprehensive video showcase
  - [x] Added VideoCard with both background and player modes
  - [x] Integrated StandardBackgroundVideo and StandardVideoPlayer successfully
  - [x] Test video components work in standard React environment
  - [x] **Success**: VideoCard fully functional with both video modes

- [x] Port ArticleCard with hardcoded content using img/a defaults
  - [x] Test ArticleCard renders with standard img elements
  - [x] Test links use standard a elements
  - [x] Verify hover and interaction states work
  - [x] **Success**: ArticleCard works without framework injection

- [x] Port ProjectCard with React-specific content data
  - [x] Use reactProjectContent from content system
  - [x] Test ProjectCard displays React template information
  - [x] **Success**: ProjectCard reflects React template context

- [x] Port QuoteCard with hardcoded quote content
  - [x] Test QuoteCard styling matches design
  - [x] Verify typography and spacing are correct
  - [x] **Success**: QuoteCard displays properly styled quotes

#### Implement Interactive Components
- [x] Port CardCarousel with auto-play functionality
  - [x] Test carousel navigation with Framer Motion animations
  - [x] Add auto-play functionality for demonstration
  - [x] Test responsive carousel behavior
  - [x] **Success**: CardCarousel fully functional with auto-play

- [x] Port TechnologyScroller with React/Vite tech stack
  - [x] Use React/Vite technology content
  - [x] Test horizontal scrolling animation
  - [x] Verify technology icons and labels display
  - [x] **Success**: TechnologyScroller shows React stack

#### Implement 3D Components
- [x] Port CosineTerrainCard with theme-aware colors
  - [x] Test Three.js integration works in Vite
  - [x] Verify WebGL canvas renders correctly
  - [x] Test theme color integration with 3D scene
  - [x] **Success**: CosineTerrainCard 3D rendering works for WebGL demonstration

#### Validate Complete Integration
- [x] Test all components render without injection
  - [x] Verify no console errors for missing injection
  - [x] Test that all components display correctly
  - [x] TypeScript compilation successful with all component imports
  - [x] **Success**: All components work without framework dependencies

- [x] Test theme switching works across all components
  - [x] Switch between light and dark themes
  - [x] Verify all components respond to theme changes
  - [x] **Success**: Theme system works for all components

- [x] Verify responsive BentoLayout works correctly
  - [x] Test layout at mobile breakpoint
  - [x] Test layout at tablet breakpoint  
  - [x] Test layout at desktop breakpoint
  - [x] Build successful: 220KB main JS + 662KB ui-core chunk (includes Three.js)
  - [x] Dev server running smoothly at http://localhost:5173/examples
  - [x] **Success**: Complete responsive design functional with comprehensive examples page proving 100% ui-core compatibility

### Task 6: Template Build and Deployment Validation
**Objective**: Ensure React template is production-ready
**Effort**: 1/5

#### Production Build Testing
- [ ] Validate production build process
  - [ ] Run `pnpm build` and verify successful completion
  - [ ] Check build output for optimization
  - [ ] Verify no build warnings or errors
  - [ ] **Success**: Production build completes successfully

- [ ] Test production application
  - [ ] Test built application serves correctly with `pnpm preview`
  - [ ] Verify all pages load correctly in production
  - [ ] Test navigation works in production build
  - [ ] **Success**: Production application fully functional

#### Component Testing in Production
- [ ] Verify all components render correctly in production build
  - [ ] Test all card components display properly
  - [ ] Test 3D components work in production
  - [ ] Verify no component rendering issues
  - [ ] **Success**: All components work in production environment

- [ ] Test theme switching functionality in production
  - [ ] Verify theme persistence works
  - [ ] Test theme transitions are smooth
  - [ ] **Success**: Theme system fully functional in production

#### Performance Validation
- [ ] Verify CosineTerrainCard WebGL/Three.js works in production
  - [ ] Test 3D rendering performance
  - [ ] Verify WebGL initialization succeeds
  - [ ] Test animation smoothness
  - [ ] **Success**: 3D components perform well in production

- [ ] Check bundle size is reasonable compared to Next.js template
  - [ ] Measure production bundle size
  - [ ] Compare to Next.js template bundle size
  - [ ] Verify bundle size is acceptable
  - [ ] **Success**: Bundle size meets performance expectations

#### Final Quality Assurance
- [ ] Verify no console errors in production build
  - [ ] Check browser console for errors
  - [ ] Test error handling works correctly
  - [ ] **Success**: Production build error-free

- [ ] Test responsive design across desktop, tablet, mobile viewports
  - [ ] Test desktop viewport (1200px+)
  - [ ] Test tablet viewport (768px-1199px)
  - [ ] Test mobile viewport (<768px)
  - [ ] **Success**: Responsive design works across all viewports

### Task 7: Standard Video Components Creation
**Objective**: Create framework-agnostic video components for standard React environments
**Effort**: 3/5

#### Set Up Video Component Structure
- [ ] Create video component directory
  - [ ] Create packages/ui-core/src/components/video/ directory
  - [ ] Verify directory structure aligns with existing components
  - [ ] **Success**: Video component directory ready for implementation

#### Implement StandardBackgroundVideo Component
- [ ] Create StandardBackgroundVideo.tsx with autoplay handling
  - [ ] Set up component file with TypeScript interface:
    ```typescript
    import React, { useRef, useEffect } from 'react'
    import { cn } from '../../lib/utils'
    
    interface StandardBackgroundVideoProps {
      src: string
      poster?: string
      autoplay?: boolean
      className?: string
      children?: React.ReactNode
    }
    ```
  - [ ] **Success**: Component file structure and interface defined

- [ ] Implement video element with ref control
  - [ ] Add useRef for video element control:
    ```typescript
    const videoRef = useRef<HTMLVideoElement>(null)
    ```
  - [ ] Implement useEffect for autoplay management
  - [ ] Add muted requirement for browser autoplay policies
  - [ ] **Success**: Video element ref and basic control implemented

- [ ] Add robust autoplay error handling
  - [ ] Handle play() promise rejections gracefully:
    ```typescript
    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.warn('Autoplay failed:', error)
      }
    }
    ```
  - [ ] Add 300ms delay for DOM readiness
  - [ ] Implement proper cleanup in useEffect return
  - [ ] **Success**: Autoplay works reliably across browsers with graceful fallback

- [ ] Complete video element implementation
  - [ ] Add comprehensive video attributes:
    ```typescript
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
      onLoadedData={handleLoadedData}
    >
      {children}
    </video>
    ```
  - [ ] **Success**: Complete background video component implemented

#### Implement StandardVideoPlayer Component
- [ ] Create StandardVideoPlayer.tsx with player controls
  - [ ] Set up component with player interface:
    ```typescript
    interface StandardVideoPlayerProps {
      src: string
      poster?: string
      controls?: boolean
      className?: string
      onPlay?: () => void
      onPause?: () => void
    }
    ```
  - [ ] **Success**: Player component structure defined

- [ ] Implement standard HTML video element with controls
  - [ ] Add video element with standard controls enabled
  - [ ] Implement play/pause event handling
  - [ ] Add loading states and error handling
  - [ ] Support standard video props (src, poster, controls)
  - [ ] **Success**: Standard video player with controls implemented

#### Set Up Component Exports
- [ ] Create video/index.ts for clean exports
  - [ ] Export StandardBackgroundVideo and StandardVideoPlayer:
    ```typescript
    export { StandardBackgroundVideo } from './StandardBackgroundVideo'
    export { StandardVideoPlayer } from './StandardVideoPlayer'
    export type { 
      StandardBackgroundVideoProps,
      StandardVideoPlayerProps 
    } from './types'
    ```
  - [ ] **Success**: Video components properly exported

- [ ] Add comprehensive TypeScript interfaces
  - [ ] Create types.ts with interfaces matching Next.js video components
  - [ ] Ensure type compatibility with existing VideoCard component
  - [ ] Add JSDoc documentation for all interfaces
  - [ ] **Success**: Complete TypeScript support for video components

#### Validate Cross-Browser Compatibility
- [ ] Test video components across desktop browsers
  - [ ] Test autoplay behavior in Chrome (latest)
  - [ ] Test autoplay behavior in Safari (latest)
  - [ ] Test autoplay behavior in Firefox (latest)
  - [ ] Verify video controls work in all browsers
  - [ ] **Success**: Desktop browser compatibility confirmed

- [ ] Test mobile compatibility
  - [ ] Test video playback on iOS Safari
  - [ ] Test video playback on Android Chrome
  - [ ] Verify playsInline attribute prevents fullscreen on mobile
  - [ ] Test touch controls on mobile devices
  - [ ] **Success**: Mobile compatibility confirmed

- [ ] Handle video codec support gracefully
  - [ ] Test MP4 video format support
  - [ ] Test WebM video format fallback
  - [ ] Add error handling for unsupported formats
  - [ ] **Success**: Video format support robust across platforms

