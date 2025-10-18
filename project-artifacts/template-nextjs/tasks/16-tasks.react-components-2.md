---
item: react-components-2
project: manta-templates
type: tasks
sliceRef: slices/16-slice.react-components.md
dependencies: [ui-core]
projectState: ui-core established with Next.js injection patterns, ready for standard React support
status: complete
lastUpdated: 2025-09-01
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
  - [x] Update title to "React Template"
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
**Status**: COMPLETED ✅

#### Production Build Testing
- [x] Validate production build process
  - [x] Run `pnpm build` and verify successful completion
  - [x] Check build output for optimization
  - [x] Verify no build warnings or errors
  - [x] **Success**: Production build completes successfully

- [x] Test production application
  - [x] Test built application serves correctly with `pnpm preview`
  - [x] Verify all pages load correctly in production
  - [x] Test navigation works in production build
  - [x] **Success**: Production application fully functional

#### Component Testing in Production
- [x] Verify all components render correctly in production build
  - [x] Test all card components display properly
  - [x] Test 3D components work in production
  - [x] Verify no component rendering issues
  - [x] **Success**: All components work in production environment

- [x] Test theme switching functionality in production
  - [x] Verify theme persistence works
  - [x] Test theme transitions are smooth
  - [x] **Success**: Theme system fully functional in production

#### Performance Validation
- [x] Verify CosineTerrainCard WebGL/Three.js works in production
  - [x] Test 3D rendering performance
  - [x] Verify WebGL initialization succeeds
  - [x] Test animation smoothness
  - [x] **Success**: 3D components perform well in production

- [x] Check bundle size is reasonable compared to Next.js template
  - [x] Measure production bundle size
  - [x] Compare to Next.js template bundle size
  - [x] Verify bundle size is acceptable
  - [x] **Success**: Bundle size meets performance expectations

#### Final Quality Assurance
- [x] Verify no console errors in production build
  - [x] Check browser console for errors
  - [x] Test error handling works correctly
  - [x] **Success**: Production build error-free

- [x] Test responsive design across desktop, tablet, mobile viewports
  - [x] Test desktop viewport (1200px+)
  - [x] Test tablet viewport (768px-1199px)
  - [x] Test mobile viewport (<768px)
  - [x] **Success**: Responsive design works across all viewports

### Task 6.5: Layout Infrastructure Implementation
**Objective**: Add missing Header/Footer/ThemeProvider layout components to React template
**Effort**: 2/5
**Status**: COMPLETED ✅

#### Create Layout Content Files
- [x] Create header content file
  - [x] Create src/content/headerContent.ts with React template navigation
  - [x] Include Home and Examples links matching React Router structure
  - [x] Add type definitions for HeaderContent interface
  - [x] **Success**: Header content ready for React template

- [x] Create footer content file  
  - [x] Create src/content/footerContent.ts with React-specific content
  - [x] Include React/Vite/Tailwind technology attribution
  - [x] Add appropriate footer sections (quickLinks, resources, legal)
  - [x] **Success**: Footer content configured for React template

- [x] Update content index exports
  - [x] Add headerContent and footerContent to src/content/index.ts
  - [x] Ensure proper TypeScript exports for layout content
  - [x] **Success**: Layout content properly exported

#### Implement Complete Layout Structure
- [x] Update App.tsx with layout wrapper
  - [x] Add ThemeProvider wrapper with ui-theme storage key
  - [x] Add Header component with React Router Link injection
  - [x] Add Footer component with compact variant and MIT preset
  - [x] Add proper flex layout structure (header/main/footer)
  - [x] **Success**: Complete layout infrastructure implemented

- [x] Add theme persistence functionality
  - [x] Add useEffect for localStorage theme handling
  - [x] Add system theme detection for initial load
  - [x] Add proper theme class management on document.documentElement
  - [x] Match Next.js template theme persistence behavior exactly
  - [x] **Success**: Theme persistence works identically to Next.js template

#### Validate Layout Integration
- [x] Test Header component renders with navigation
  - [x] Verify React Router Link components work in Header
  - [x] Test navigation between Home and Examples pages
  - [x] **Success**: Header navigation functional

- [x] Test Footer component renders correctly
  - [x] Verify footer sections display properly
  - [x] Test external links open in new tabs
  - [x] **Success**: Footer displays complete site information

- [x] Test ThemeProvider functionality
  - [x] Verify theme switching works across all pages
  - [x] Test theme persistence across page refreshes  
  - [x] **Success**: Theme system fully functional

### Task 7: Standard Video Components Creation
**Objective**: Create framework-agnostic video components for standard React environments
**Effort**: 3/5
**Status**: COMPLETED ✅

#### Set Up Video Component Structure
- [x] Create video component directory
  - [x] Create packages/ui-core/src/components/video/ directory
  - [x] Verify directory structure aligns with existing components
  - [x] **Success**: Video component directory ready for implementation

#### Implement StandardBackgroundVideo Component
- [x] Create StandardBackgroundVideo.tsx with autoplay handling
  - [x] Set up component file with TypeScript interface:
    ```typescript
    interface StandardBackgroundVideoProps {
      src: string
      poster?: string
      autoplay?: boolean
      className?: string
      children?: React.ReactNode
    }
    ```
  - [x] **Success**: Component file structure and interface defined

- [x] Implement video element with ref control
  - [x] Add useRef for video element control: `const videoRef = useRef<HTMLVideoElement>(null)`
  - [x] Implement useEffect for autoplay management
  - [x] Add muted requirement for browser autoplay policies
  - [x] **Success**: Video element ref and basic control implemented

- [x] Add robust autoplay error handling
  - [x] Handle play() promise rejections gracefully with try/catch blocks
  - [x] Add 300ms delay for DOM readiness with setTimeout
  - [x] Implement proper cleanup in useEffect return (clearTimeout and pause)
  - [x] **Success**: Autoplay works reliably across browsers with graceful fallback

- [x] Complete video element implementation
  - [x] Add comprehensive video attributes (autoPlay, loop, muted, playsInline, controls=false)
  - [x] Add onLoadedData handler with play() error handling
  - [x] Add proper className composition with cn utility
  - [x] **Success**: Complete background video component implemented

#### Implement StandardVideoPlayer Component
- [x] Create StandardVideoPlayer.tsx with player controls
  - [x] Set up component with player interface (url, title, controls, autoplay, className, children)
  - [x] Add state management for isPlaying, currentTime, duration
  - [x] **Success**: Player component structure defined

- [x] Implement standard HTML video element with controls
  - [x] Add video element with custom controls (controls=false)
  - [x] Implement play/pause event handling with togglePlayPause
  - [x] Add loading states and progress tracking
  - [x] Support standard video props and custom control overlay
  - [x] **Success**: Standard video player with custom controls implemented

#### Set Up Component Exports
- [x] Create video/index.ts for clean exports
  - [x] Export StandardBackgroundVideo and StandardVideoPlayer
  - [x] Export TypeScript interfaces (StandardBackgroundVideoProps, StandardVideoPlayerProps)
  - [x] **Success**: Video components properly exported

- [x] Add comprehensive TypeScript interfaces
  - [x] Create interfaces matching video component requirements
  - [x] Ensure type compatibility with existing VideoCard component
  - [x] Components properly typed with React.FC interfaces
  - [x] **Success**: Complete TypeScript support for video components

#### Integrate Video Components with VideoCard
- [x] Update VideoCard to use StandardVideo components as defaults
  - [x] Import StandardBackgroundVideo and StandardVideoPlayer in VideoCard
  - [x] Set StandardBackgroundVideo as default for BackgroundVideoComponent
  - [x] Set StandardVideoPlayer as default for VideoPlayerComponent  
  - [x] Remove injection requirement for video functionality
  - [x] **Success**: VideoCard works without component injection for video modes

- [x] Test integration in React template examples page
  - [x] Verify VideoCard background mode works without injection
  - [x] Verify VideoCard player mode works without injection
  - [x] Test autoplay and controls functionality
  - [x] **Success**: Video functionality works seamlessly in React template

#### Validate Cross-Browser Compatibility  
- [x] Test video components in React template environment
  - [x] Confirm components work with Vite dev server
  - [x] Verify no TypeScript compilation errors
  - [x] Test components render and function correctly in browser
  - [x] **Success**: Video components functional in React environment

- [x] Additional browser testing (if needed)
  - [x] Test autoplay behavior across browsers if issues arise
  - [x] Test mobile compatibility if deployment planned
  - [x] Add codec fallback handling if format issues discovered
  - [x] **Success**: Extended compatibility validated as needed

