---
item: react-components-3
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

### Task 8: VideoCard Enhancement
**Objective**: Update VideoCard to include standard video components as defaults
**Effort**: 2/5

#### Import Standard Video Components
- [ ] Update VideoCard.tsx with new imports
  - [ ] Add imports for standard video components:
    ```typescript
    import { StandardBackgroundVideo, StandardVideoPlayer } from '../video'
    ```
  - [ ] Verify import paths resolve correctly
  - [ ] **Success**: Standard video components imported successfully

#### Add Default Component Values
- [ ] Update VideoCard props with default values
  - [ ] Add default BackgroundVideoComponent:
    ```typescript
    const VideoCard: React.FC<VideoCardProps> = ({
      BackgroundVideoComponent = StandardBackgroundVideo,
      VideoPlayerComponent = StandardVideoPlayer,
      // ... existing props
    }) => {
    ```
  - [ ] **Success**: Default video components configured

- [ ] Update TypeScript interfaces for new defaults
  - [ ] Make BackgroundVideoComponent and VideoPlayerComponent optional in interface
  - [ ] Add proper type definitions matching standard components
  - [ ] Update JSDoc comments to document default behavior
  - [ ] **Success**: TypeScript interfaces reflect new optional defaults

#### Ensure Backward Compatibility
- [ ] Verify Next.js injection patterns still work
  - [ ] Test that explicit BackgroundVideoComponent prop overrides default
  - [ ] Test that Next.js-specific video components still inject properly
  - [ ] Verify no breaking changes to existing VideoCard usage
  - [ ] **Success**: Full backward compatibility maintained

#### Test All Video Modes
- [ ] Test thumbnail mode (existing functionality)
  - [ ] Verify thumbnail display works without video components
  - [ ] Test click behavior to switch modes
  - [ ] **Success**: Thumbnail mode unchanged and functional

- [ ] Test background video mode with StandardBackgroundVideo
  - [ ] Verify background video plays automatically
  - [ ] Test video overlay content displays correctly
  - [ ] Test video loop behavior
  - [ ] **Success**: Background video mode works with standard component

- [ ] Test video player mode with StandardVideoPlayer
  - [ ] Verify video player controls appear and function
  - [ ] Test play/pause functionality
  - [ ] Test fullscreen capability
  - [ ] **Success**: Video player mode works with standard component

#### Validate Error Handling
- [ ] Test error scenarios
  - [ ] Test behavior when video fails to load
  - [ ] Test behavior with invalid video URLs
  - [ ] Verify error states display appropriately
  - [ ] Test graceful fallback to thumbnail mode
  - [ ] **Success**: Robust error handling for all video failure scenarios

### Task 9: Video Integration in React Template
**Objective**: Add video functionality to templates/react examples page
**Effort**: 1/5

#### Create Video Content Configuration
- [ ] Create video content object
  - [ ] Add sample video content object in src/content/videoContent.ts:
    ```typescript
    export const sampleVideoContent = {
      title: "Background Video Demo",
      description: "StandardBackgroundVideo component demonstration",
      thumbnail: "/images/video-thumbnail.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      displayMode: "background" as const
    }
    ```
  - [ ] Use test video URL that works across browsers
  - [ ] **Success**: Video content ready for VideoCard testing

#### Add VideoCard to Examples Page
- [ ] Update templates/react/src/pages/ExamplesPage.tsx to include VideoCard
  - [ ] Import VideoCard component
  - [ ] Import sample video content
  - [ ] Add VideoCard to component grid
  - [ ] **Success**: VideoCard integrated into examples page

#### Test Background Video Mode
- [ ] Use VideoCard with displayMode="background" to test StandardBackgroundVideo
  - [ ] Test that background video plays automatically
  - [ ] Verify video is muted for autoplay compliance
  - [ ] Test video loops correctly
  - [ ] **Success**: Background video mode works in React template

- [ ] Test autoplay works correctly (muted, browser policy compliant)
  - [ ] Test in Chrome with autoplay policies
  - [ ] Test in Safari with autoplay restrictions
  - [ ] Verify graceful fallback when autoplay fails
  - [ ] **Success**: Autoplay compliance verified across browsers

#### Validate Video Display
- [ ] Test video overlay content displays correctly over background video
  - [ ] Verify text content is readable over video
  - [ ] Test overlay positioning and styling
  - [ ] **Success**: Video overlay content properly displayed

- [ ] Add VideoCard to carousel with background video demonstration
  - [ ] Test VideoCard works in carousel context
  - [ ] Verify video performance during carousel transitions
  - [ ] **Success**: VideoCard works seamlessly in carousel

#### Final Video Integration Testing
- [ ] Verify no console errors or video loading issues
  - [ ] Check browser console for video-related errors
  - [ ] Test video loading states
  - [ ] Verify error handling for failed video loads
  - [ ] **Success**: Video integration error-free and robust

### Task 10: Template Documentation
**Objective**: Create comprehensive documentation for React template usage
**Effort**: 2/5

#### Create Setup Documentation
- [ ] Create templates/react/README.md with setup instructions
  - [ ] Document installation process step-by-step
  - [ ] Include all required dependencies
  - [ ] Add development server setup instructions
  - [ ] **Success**: Complete setup guide available

#### Document Component Usage
- [ ] Document all available components and their default behaviors
  - [ ] List all ui-core components available
  - [ ] Explain standard HTML element defaults (img, a)
  - [ ] Document component props and interfaces
  - [ ] **Success**: Comprehensive component documentation

- [ ] Add section explaining img/a element defaults vs Next.js injection
  - [ ] Compare injection vs default behavior
  - [ ] Explain when defaults are sufficient
  - [ ] Show examples of both approaches
  - [ ] **Success**: Clear explanation of default behavior

#### Document Video Components
- [ ] Document video component usage and browser compatibility notes
  - [ ] Explain StandardBackgroundVideo usage
  - [ ] Explain StandardVideoPlayer usage
  - [ ] Document browser autoplay policies
  - [ ] **Success**: Video component usage fully documented

- [ ] Add troubleshooting section for common setup issues
  - [ ] Document common build errors and solutions
  - [ ] Address video playback issues
  - [ ] Troubleshoot styling problems
  - [ ] **Success**: Troubleshooting guide covers common issues

#### Migration and Integration Guides
- [ ] Include migration guide from Next.js template patterns
  - [ ] Compare Next.js vs React template patterns
  - [ ] Show code migration examples
  - [ ] Document breaking changes to watch for
  - [ ] **Success**: Migration path clearly documented

- [ ] Document theme system integration and CSS custom property usage
  - [ ] Explain theme switching implementation
  - [ ] Document CSS custom property usage
  - [ ] Show theme customization examples
  - [ ] **Success**: Theme system thoroughly documented

#### Content and Deployment Documentation
- [ ] Add examples of hardcoded content vs future markdown integration
  - [ ] Show current hardcoded content patterns
  - [ ] Explain future markdown integration possibilities
  - [ ] **Success**: Content strategy documented

- [ ] Include build and deployment instructions
  - [ ] Document production build process
  - [ ] Add deployment platform guidance
  - [ ] Include performance optimization tips
  - [ ] **Success**: Deployment guide complete

### Task 11: Cross-Browser Testing
**Objective**: Validate component functionality across major browsers and devices
**Effort**: 2/5

#### Desktop Browser Testing
- [ ] Test React template in Chrome desktop (latest)
  - [ ] Verify all components render correctly
  - [ ] Test theme switching functionality
  - [ ] Test 3D components performance
  - [ ] **Success**: Chrome compatibility confirmed

- [ ] Test React template in Safari desktop (latest)
  - [ ] Test video autoplay behavior
  - [ ] Verify WebGL/Three.js compatibility
  - [ ] Test CSS custom properties
  - [ ] **Success**: Safari compatibility confirmed

- [ ] Test React template in Firefox desktop (latest)
  - [ ] Test component rendering consistency
  - [ ] Verify animation performance
  - [ ] Test responsive breakpoints
  - [ ] **Success**: Firefox compatibility confirmed

#### Video-Specific Browser Testing
- [ ] Test video autoplay behavior across all desktop browsers
  - [ ] Test muted autoplay compliance
  - [ ] Verify autoplay fallback behavior
  - [ ] Test video loading states
  - [ ] **Success**: Video autoplay works consistently

#### Mobile Device Testing
- [ ] Test React template on iOS Safari (mobile)
  - [ ] Test touch interactions
  - [ ] Verify responsive layout
  - [ ] Test video playback on mobile
  - [ ] **Success**: iOS Safari compatibility confirmed

- [ ] Test React template on Android Chrome (mobile)
  - [ ] Test gesture navigation
  - [ ] Verify mobile layout breakpoints
  - [ ] Test video controls on mobile
  - [ ] **Success**: Android Chrome compatibility confirmed

#### Performance and Quality Testing
- [ ] Test video playback on mobile devices
  - [ ] Verify playsInline prevents fullscreen
  - [ ] Test video performance on mobile
  - [ ] **Success**: Mobile video playback optimal

- [ ] Verify CosineTerrainCard WebGL performance across browsers
  - [ ] Test WebGL initialization across browsers
  - [ ] Verify 3D animation smoothness
  - [ ] Test WebGL fallback behavior
  - [ ] **Success**: WebGL performance consistent

#### Theme System Cross-Browser Testing
- [ ] Test theme switching functionality across browsers
  - [ ] Verify theme persistence works
  - [ ] Test CSS custom property support
  - [ ] **Success**: Theme system works universally

- [ ] Document any browser-specific issues or limitations
  - [ ] Record any compatibility issues found
  - [ ] Document workarounds or limitations
  - [ ] **Success**: Browser compatibility matrix complete

### Task 12: Performance Validation
**Objective**: Ensure React template performance is comparable to Next.js template
**Effort**: 1/5

#### Bundle Size Analysis
- [ ] Measure bundle size of React template vs Next.js template
  - [ ] Run production builds for both templates
  - [ ] Compare main bundle sizes
  - [ ] Analyze chunk distribution
  - [ ] **Success**: Bundle size comparison completed

- [ ] Verify video components add minimal overhead (~5KB gzipped)
  - [ ] Measure bundle size with and without video components
  - [ ] Verify video component overhead is reasonable
  - [ ] **Success**: Video components have minimal impact

#### Performance Benchmarking
- [ ] Test CosineTerrainCard performance in React vs Next.js
  - [ ] Measure 3D rendering frame rates
  - [ ] Compare WebGL initialization times
  - [ ] **Success**: 3D component performance comparable

- [ ] Measure time to interactive for React template
  - [ ] Use browser dev tools to measure TTI
  - [ ] Compare against Next.js template
  - [ ] **Success**: Interactive performance meets expectations

#### Memory and Resource Management
- [ ] Test memory usage during extended usage (no leaks)
  - [ ] Monitor memory usage over time
  - [ ] Test for memory leaks during navigation
  - [ ] **Success**: No memory leaks detected

- [ ] Verify video component cleanup prevents memory leaks
  - [ ] Test video component mount/unmount cycles
  - [ ] Monitor video resource cleanup
  - [ ] **Success**: Video components properly cleaned up

#### Performance Documentation
- [ ] Document performance characteristics and any optimizations
  - [ ] Record benchmark results
  - [ ] Document optimization techniques used
  - [ ] Note any performance considerations
  - [ ] **Success**: Performance characteristics documented

## Completion Criteria

All tasks completed with:
- [ ] React template demonstrates all ui-core components working without injection
- [ ] Video functionality works in standard React environments
- [ ] Build process produces deployable production application
- [ ] Cross-browser compatibility validated
- [ ] Documentation enables confident adoption
- [ ] Performance meets expectations
- [ ] Backward compatibility with Next.js injection patterns maintained

## Notes

- **Validate First Approach**: Tasks 1-6 prove existing functionality before enhancing
- **Video Enhancement**: Tasks 7-9 add the missing 5% (video components)
- **Production Ready**: Tasks 10-12 ensure professional deployment readiness
- **Framework Agnostic**: All video components work in any React environment (Electron, Vite, CRA)