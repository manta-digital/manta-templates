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
- [ ] Set up basic HomePage.tsx structure
  - [ ] Create src/pages/HomePage.tsx based on templates/nextjs/src/app/page.tsx
  - [ ] Import required ui-core components
  - [ ] Import hardcoded content from src/content/
  - [ ] **Success**: HomePage component file structure ready

#### Replace Content Loading System
- [ ] Convert from markdown loading to hardcoded imports
  - [ ] Replace Next.js content loading with static imports:
    ```typescript
    import { homeContent, reactProjectContent, quoteContent } from '../content'
    ```
  - [ ] Remove all async content loading logic
  - [ ] **Success**: Content loading converted to static imports

#### Implement Hero Section
- [ ] Port hero section with React-specific messaging
  - [ ] Update title to "React Components Template"
  - [ ] Update description to emphasize standard React usage
  - [ ] Verify hero section styles render correctly
  - [ ] **Success**: Hero section displays React template branding

#### Test Component Integration
- [ ] Test QuoteCard component with hardcoded content
  - [ ] Import and render QuoteCard with quoteContent
  - [ ] Verify component renders without injection
  - [ ] Test responsive layout behavior
  - [ ] **Success**: QuoteCard works with standard HTML elements

- [ ] Verify page renders correctly with theme system
  - [ ] Test light/dark theme switching
  - [ ] Verify CSS custom properties apply correctly
  - [ ] **Success**: Theme system fully functional in React template

#### Test Navigation
- [ ] Test responsive layout across device sizes
  - [ ] Verify mobile layout works correctly
  - [ ] Test tablet breakpoint behavior
  - [ ] Test desktop layout displays properly
  - [ ] **Success**: Responsive design works without framework dependencies

- [ ] Verify navigation between Home and Examples pages works
  - [ ] Test React Router navigation
  - [ ] Verify page transitions work smoothly
  - [ ] **Success**: Navigation system functional

### Task 5: Examples Page Implementation (No Video)
**Objective**: Port Next.js examples page excluding VideoCard to validate component coverage
**Effort**: 4/5

#### Create ExamplesPage Component Structure
- [ ] Set up comprehensive examples page
  - [ ] Create src/pages/ExamplesPage.tsx based on templates/nextjs/src/app/examples/page.tsx
  - [ ] Import all components except VideoCard
  - [ ] Plan component layout matching Next.js examples structure
  - [ ] **Success**: ExamplesPage structure ready for component testing

#### Remove Framework Dependencies
- [ ] Convert all components to use standard HTML defaults
  - [ ] Remove all Next.js Image and Link injection
  - [ ] Verify components default to img and a elements
  - [ ] Test that no injection is required
  - [ ] **Success**: All components work with standard HTML elements

#### Implement Grid and Layout Components
- [ ] Port BentoLayout with responsive grid system
  - [ ] Test BentoLayout renders correctly without Next.js
  - [ ] Verify grid responsiveness across breakpoints
  - [ ] **Success**: BentoLayout works in standard React environment

- [ ] Port GridItem components with various content types
  - [ ] Test GridItem with different span configurations
  - [ ] Verify grid item positioning works correctly
  - [ ] **Success**: GridItem system fully functional

#### Implement Card Components
- [ ] Port GradientCard with theme-aware gradient system
  - [ ] Test gradient rendering with theme variables
  - [ ] Verify gradient animations work with Framer Motion
  - [ ] **Success**: GradientCard displays theme-aware gradients

- [ ] Port ArticleCard with hardcoded content using img/a defaults
  - [ ] Test ArticleCard renders with standard img elements
  - [ ] Test links use standard a elements
  - [ ] Verify hover and interaction states work
  - [ ] **Success**: ArticleCard works without framework injection

- [ ] Port ProjectCard with React-specific content data
  - [ ] Use reactProjectContent from content system
  - [ ] Test ProjectCard displays React template information
  - [ ] **Success**: ProjectCard reflects React template context

- [ ] Port BlogCardImage with hardcoded blog content
  - [ ] Test image loading with standard img elements
  - [ ] Verify image optimization works through standard HTML
  - [ ] **Success**: BlogCardImage works with standard image elements

#### Implement Interactive Components
- [ ] Port CardCarousel with sample items (excluding video)
  - [ ] Test carousel navigation with Framer Motion animations
  - [ ] Verify touch/swipe gestures work
  - [ ] Test responsive carousel behavior
  - [ ] **Success**: CardCarousel fully functional without video

- [ ] Port QuoteCard with hardcoded quote content
  - [ ] Test QuoteCard styling matches design
  - [ ] Verify typography and spacing are correct
  - [ ] **Success**: QuoteCard displays properly styled quotes

- [ ] Port TechnologyScroller with React/Vite tech stack
  - [ ] Use React/Vite technology content
  - [ ] Test horizontal scrolling animation
  - [ ] Verify technology icons and labels display
  - [ ] **Success**: TechnologyScroller shows React stack

#### Implement 3D Components
- [ ] Port CosineTerrainCard with theme-aware colors
  - [ ] Test Three.js integration works in Vite
  - [ ] Verify WebGL canvas renders correctly
  - [ ] Test theme color integration with 3D scene
  - [ ] **Success**: CosineTerrainCard 3D rendering works

#### Validate Complete Integration
- [ ] Test all components render without injection
  - [ ] Verify no console errors for missing injection
  - [ ] Test that all components display correctly
  - [ ] **Success**: All components work without framework dependencies

- [ ] Test theme switching works across all components
  - [ ] Switch between light and dark themes
  - [ ] Verify all components respond to theme changes
  - [ ] **Success**: Theme system works for all components

- [ ] Verify responsive BentoLayout works correctly
  - [ ] Test layout at mobile breakpoint
  - [ ] Test layout at tablet breakpoint  
  - [ ] Test layout at desktop breakpoint
  - [ ] **Success**: Complete responsive design functional

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

