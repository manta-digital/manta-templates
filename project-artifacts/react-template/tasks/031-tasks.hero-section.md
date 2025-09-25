---
slice: hero-section
project: manta-templates
lldReference: project-artifacts/react-template/slices/031-slice.hero-section.md
dependencies: []
projectState: React template with ui-core framework-agnostic architecture, navigation components completed
effort: 3/5
lastUpdated: 2025-09-22
---

# Tasks: Hero Section Component

## Context Summary

Creating a comprehensive hero section component for business/marketing websites that supports multiple variants (static, video, slides, animated). The component follows our framework-agnostic architecture using CVA variants and content-driven configuration. It leverages existing ui-core components and patterns while maintaining bundle size efficiency.

**Key Requirements from GitHub Issue #73:**
- Static/traditional hero with HTML content and background image
- Video background hero with overlay and no player controls
- Slide hero with transitions, autoplay, and minimal controls
- Animated text effects and transitions
- Framework-agnostic with dependency injection
- Responsive design with mobile optimization
- Full accessibility compliance

**Architecture Approach:**
- Modular hero system with composition pattern
- CVA variants for consistent styling across variants
- Content-driven configuration via HeroContent interface
- Reuse existing Button, Container components
- Optional imports for video/animation features

## Task Breakdown

### Phase 1: Foundation and Setup

#### Task 1.1: Create Type Definitions and Structure
**Effort**: 1/5
- [x] Create `templates/react/src/lib/ui-core/types/hero.ts` with all interfaces:
  - [x] `HeroContent` interface with all configuration options
  - [x] `HeroBackgroundConfig` interface for background variants
  - [x] `HeroCTAConfig` interface for call-to-action buttons
  - [x] `HeroAnimationConfig` interface for animation options
- [x] Update `templates/react/src/lib/ui-core/types/index.ts` to export hero types
- [x] Create `templates/react/src/lib/ui-core/components/hero/` directory
- [x] Add JSDoc comments for all public interfaces
**Success Criteria**: Types compile without errors, full TypeScript intellisense

#### Task 1.2: Create Base Component Files
**Effort**: 1/5
- [x] Create placeholder files for all hero components:
  - [x] `HeroSection.tsx` - Main wrapper component
  - [x] `HeroBackground.tsx` - Background variant handler
  - [x] `HeroContent.tsx` - Content positioning wrapper
  - [x] `HeroText.tsx` - Text content with animations
  - [x] `HeroCTA.tsx` - Call-to-action buttons
  - [x] `HeroOverlay.tsx` - Darkening/styling overlay
  - [x] `index.ts` - Component exports
- [x] Set up basic TypeScript interfaces for each component
- [x] Verify import/export chain works correctly
**Success Criteria**: All files exist with proper structure, TypeScript compiles

#### Task 1.3: Setup Test Infrastructure
**Effort**: 1/5
- [x] Create test setup for hero components:
  - [x] Set up test utilities in `templates/react/src/lib/ui-core/components/hero/__tests__/`
  - [x] Create test setup file with common mocks and utilities
  - [x] Configure testing environment for hero-specific needs
  - [x] Create test data factories for HeroContent interfaces
- [x] Verify test runner works with new structure
- [x] Add test script to package.json if needed
**Success Criteria**: Test infrastructure ready, can run basic tests

### Phase 2: Core Hero Components

#### Task 2.1: Implement HeroSection Main Component
**Effort**: 2/5
- [x] Develop `HeroSection.tsx` with:
  - [x] CVA variants for size (sm, md, lg, xl/fullscreen)
  - [x] CVA variants for content position (left, center, right)
  - [x] CVA variants for layout (default, fullscreen, split)
  - [x] Content prop handling and validation
  - [x] Framework component injection (LinkComponent, ImageComponent)
  - [x] Theme integration with existing design tokens
- [x] Add responsive behavior detection
- [x] Implement proper TypeScript generics
- [x] Include comprehensive prop validation
- [x] Write unit tests for HeroSection component
- [x] Test all CVA variants and prop combinations
- [x] Test framework component integration
- [x] Update example page to demonstrate functionality
**Success Criteria**: Hero section renders with all variants, accepts framework components, tests pass

#### Task 2.1.1: Create Basic Example Page
**Effort**: 1/5
- [x] Create initial example page after HeroSection component:
  - [x] Create `templates/react/src/app/examples/hero/basic/page.tsx`
  - [x] Implement simple static hero with placeholder content
  - [x] Add to navigation/routing as appropriate
  - [x] Include basic responsive behavior
- [x] Test hero section renders correctly in browser
- [x] Verify routing and navigation work
- [ ] Document example usage patterns
**Success Criteria**: Basic hero example renders, can be viewed in browser

#### Task 2.2: Implement HeroBackground Component
**Effort**: 3/5
- [x] Develop `HeroBackground.tsx` with background type detection:
  - [x] Static image background support (with dark mode variant)
  - [x] Gradient background support
  - [x] Placeholder for video/slides (Phase 3)
  - [x] Background position and size variants
- [x] Implement responsive image loading
- [x] Add proper image optimization support
- [x] Support WebP/AVIF format detection
- [x] Handle loading states for images
- [x] Write unit tests for HeroBackground component
- [x] Test background type detection and switching
- [x] Test responsive image loading and optimization
- [x] Test error handling for failed image loads
- [x] Update example page with background variants
**Success Criteria**: Background images render correctly, responsive loading works, all tests pass, image optimization fully implemented, WebP/AVIF support confirmed

#### Task 2.3: Implement HeroText Component
**Effort**: 2/5
- [x] Develop `HeroText.tsx` with text content rendering:
  - [x] Title rendering with proper heading hierarchy (h1)
  - [x] Subtitle and description support
  - [x] CVA variants for text size (sm, md, lg)
  - [x] Basic fade-in animation support
  - [x] Text color variants for overlay contrast
- [x] Implement responsive text sizing
- [x] Add proper line height and spacing
- [x] Support HTML content in description
- [x] Write unit tests for HeroText component
- [x] Test text variants and responsive sizing
- [x] Test HTML content rendering and sanitization
- [x] Test animation integration
- [x] Update example page with text variants
**Success Criteria**: Text renders with proper hierarchy, responsive sizing works, tests pass

#### Task 2.4: Implement HeroCTA Component
**Effort**: 2/5
- [x] Develop `HeroCTA.tsx` leveraging existing Button component:
  - [x] Primary and secondary CTA button support
  - [x] Button variant mapping (primary, secondary, outline)
  - [x] Framework LinkComponent integration
  - [x] Responsive button sizing
  - [x] Proper spacing between buttons
- [x] Implement mobile-friendly touch targets
- [x] Add hover and focus states
- [x] Support external links (target="_blank")
- [x] Write unit tests for HeroCTA component
- [x] Test button variant mapping and styling
- [x] Test framework LinkComponent integration
- [x] Test external link handling
- [x] Update example page with CTA variants
**Success Criteria**: CTA buttons work with routing, proper styling and spacing, tests pass

#### Task 2.5: Implement HeroOverlay Component
**Effort**: 1/5
- [x] Develop `HeroOverlay.tsx` for background darkening:
  - [x] Configurable opacity levels
  - [x] Custom color support
  - [x] Gradient overlay options
  - [x] Z-index management
- [x] Ensure text contrast accessibility
- [x] Add smooth transitions
- [x] Support theme-aware overlays
- [x] Write unit tests for HeroOverlay component
- [x] Test opacity and color configurations
- [x] Test theme integration and contrast
- [x] Test z-index management
- [x] Update example page with overlay variants
**Success Criteria**: Overlay provides proper contrast, configurable appearance, tests pass

### Phase 3: Advanced Background Features

#### Task 3.1: Implement Video Background Support
**Effort**: 3/5
- [x] Extend `HeroBackground.tsx` with video support:
  - [x] HTML5 video element integration
  - [x] Autoplay, loop, and muted attributes
  - [x] Poster image for loading state
  - [x] Video format detection (mp4, webm)
  - [x] Fallback to image on mobile/error
- [x] Add video loading optimization
- [x] Implement play/pause on visibility
- [x] Handle video load errors gracefully
- [x] Add performance monitoring
**Success Criteria**: Video backgrounds play smoothly, proper fallbacks work

#### Task 3.2: Implement Slide Background Support
**Effort**: 4/5
- [x] **Task 3.2.1: Analyze and Leverage Existing Carousel Infrastructure**
  - [x] Review existing `CardCarousel.tsx` component for reusable patterns
  - [x] Identify animation logic, state management, and breakpoint handling
  - [x] Document which patterns can be abstracted for hero slide functionality
  - [x] Assess useBreakpoint hook and useUniformHeight for potential reuse
  - **Success**: Clear understanding of reusable carousel patterns documented

- [x] **Task 3.2.2: Extend Hero Types for Slide Configuration**
  - [x] Enhance `HeroBackgroundConfig.slides` interface in `types/hero.ts`
  - [x] Add slide transition configuration: `transitionType`, `duration`, `easing`
  - [x] Add navigation controls configuration: `showDots`, `showArrows`, `autoPlay`
  - [x] Add per-slide content override capability: `slideOverrides`
  - [x] Include accessibility options: `ariaLabels`, `slideAnnouncements`
  ```typescript
  slides?: {
    items: Array<{
      image: string;
      imageDark?: string;
      title?: string;
      subtitle?: string;
      duration?: number;
      contentPosition?: HeroContentPosition;
    }>;
    transition: {
      type: 'fade' | 'slide' | 'zoom' | 'dissolve';
      duration: number;
      easing?: string;
    };
    navigation: {
      showDots?: boolean;
      showArrows?: boolean;
      autoPlay?: boolean;
      pauseOnHover?: boolean;
    };
    accessibility?: {
      slideAnnouncements?: boolean;
      keyboardNavigation?: boolean;
    };
  };
  ```
  - **Success**: Complete type definitions support all slide functionality requirements

- [x] **Task 3.2.3: Implement Core Slide State Management**
  - [x] Add slide-specific state variables to `HeroBackground.tsx`:
    1. `currentSlideIndex`, `isTransitioning`, `isPaused`
    2. `slideImages` loading state tracking array
    3. `transitionDirection` for directional animations
  - [x] Create slide management hooks following CardCarousel patterns:
    1. `useSlideState` - manages current index and transition state
    2. `useSlideTimer` - handles autoplay timing with pause/resume
    3. `useSlidePreloader` - preloads next/previous slide images
  - [x] Implement slide cycling logic with wrap-around functionality
  - [x] Add transition state management to prevent rapid clicking/conflicts
  - **Success**: Slide state management handles all edge cases (wrap-around, rapid navigation, preloading)

- [x] **Task 3.2.4: Build Slide Transition System**
  - [x] Create transition effect implementations using CSS-based patterns:
    1. ✅ Fade transition with opacity and optional scale - **COMPLETE**
    2. ⚠️ Slide transition with directional movement (left/right) - **MOVED TO ISSUE #84**
    3. ✅ Zoom transition with scale and opacity combination - **COMPLETE**
    4. ✅ Dissolve transition with blur/brightness effects - **COMPLETE**
  - [x] Implement transition timing with configurable duration and easing
  - [x] Add transition direction awareness (forward/backward navigation)
  - [x] Ensure smooth transitions prevent visual glitches between slides (3/4 working)
  - [x] Implement prefers-reduced-motion support with fallback to fade
  - **Success**: 3/4 transition types work smoothly with accessibility support ✓ (Slide transition moved to Issue #84)

- [ ] **Task 3.2.5: Create Slide Navigation Controls**
  - [ ] Build navigation dot indicator component:
    1. Responsive dot sizing and spacing
    2. Active/inactive visual states with smooth transitions
    3. Click handlers for direct slide navigation
    4. Keyboard navigation support (arrow keys, Enter)
  - [ ] Build navigation arrow controls:
    1. Previous/Next button components with appropriate icons
    2. Hover and focus states for accessibility
    3. Disabled states at first/last slide (if not looping)
    4. Touch/swipe gesture support for mobile devices
  - [ ] Integrate navigation with slide state management
  - [ ] Add ARIA labels and roles for screen reader accessibility
  - **Success**: Navigation controls provide full accessibility and responsive design

- [ ] **Task 3.2.6: Implement Advanced Slide Features**
  - [ ] Add per-slide content override functionality:
    1. Allow slides to override main hero title/subtitle/CTAs
    2. Support different content positioning per slide
    3. Smooth text transitions synchronized with background transitions
  - [ ] Implement pause-on-hover functionality for autoplay
  - [ ] Add keyboard navigation support (arrow keys, space bar pause)
  - [ ] Create slide progress indicator (optional linear progress bar)
  - [ ] Optimize image preloading strategy: current + next + previous slides
  - **Success**: Advanced features enhance user experience without compromising performance

- [ ] **Task 3.2.7: Enhance TechnologyScroller for Generic Object Support**
  - [ ] Abstract `TechnologyScroller` to `ObjectScroller` component:
    1. Generic item interface: `{ id: string; title: string; image?: string; content?: ReactNode }`
    2. Configurable item rendering function prop
    3. Support for cards, logos, images, or custom content
    4. Maintain backward compatibility with technology items
  - [ ] Add scroll behavior configuration:
    1. `scrollMode`: 'continuous' | 'discrete' | 'pause-on-hover'
    2. `itemSpacing`, `containerHeight`, `itemSize` properties
    3. Support for vertical scrolling direction
  - [ ] Create specialized variants:
    1. `CardScroller` for scrolling card components
    2. `LogoScroller` for brand/technology logos (original behavior)
    3. `TestimonialScroller` for scrolling testimonials or quotes
  - [ ] Update animation performance and smooth transitions
  - **Success**: Generic scroller supports multiple content types while maintaining smooth performance

- [ ] **Task 3.2.8: Create Slide Background Examples**
  - [ ] Build comprehensive slide examples in hero test page:
    1. Basic image slideshow with fade transitions
    2. Advanced slideshow with slide transitions and navigation
    3. Content-rich slides with per-slide text overrides
    4. Mobile-optimized slideshow with touch navigation
  - [ ] Demonstrate different transition types in separate examples
  - [ ] Show accessibility features: keyboard navigation, reduced motion
  - [ ] Include performance comparison with static/video backgrounds
  - **Success**: Examples demonstrate all slide functionality with clear documentation

#### Task 3.3: Add Background Animation Effects
**Effort**: 2/5
- [ ] Implement CSS-based background animations:
  - [ ] Ken Burns effect for static images
  - [ ] Parallax scrolling effect
  - [ ] Zoom on hover effects
  - [ ] Respect prefers-reduced-motion
- [ ] Add animation duration controls
- [ ] Implement smooth transitions
- [ ] Optimize for performance
- [ ] Test across different devices
**Success Criteria**: Animations are smooth, respect user preferences

### Phase 4: Text Animations and Effects

#### Task 4.1: Implement Text Animation Variants
**Effort**: 2/5
- [ ] Extend `HeroText.tsx` with animation options:
  - [ ] Fade in animation
  - [ ] Slide up from bottom animation
  - [ ] Staggered animation for elements
  - [ ] Basic typewriter effect for titles
- [ ] Use CSS animations where possible
- [ ] Add animation delay configuration
- [ ] Implement animation triggers on mount
- [ ] Respect reduced motion preferences
**Success Criteria**: Text animations work smoothly, accessibility compliant

#### Task 4.2: Add Optional Framer Motion Support and Fix Viewport Animation Issues
**Effort**: 3/5
- [ ] **Task 4.2.1: Analyze Current Animation Trigger Problems**
  - [ ] Audit existing CSS animations in `HeroText.tsx` and identify mount-triggered animations
  - [ ] Document specific cases where hero sections appear lower on pages (e.g., second hero, multiple heroes)
  - [ ] Test current animation behavior when hero components are below the fold
  - [ ] Identify which animations should be viewport-triggered vs mount-triggered
  - **Success**: Clear documentation of animation trigger issues and requirements

- [ ] **Task 4.2.2: Implement Framer Motion Integration Architecture**
  - [ ] Create optional Framer Motion integration pattern:
    1. `useMotionPreference` hook to detect user reduced-motion preferences
    2. `MotionConfig` wrapper for hero section animation settings
    3. Conditional imports to avoid bundle bloat when not using motion
  - [ ] Design fallback system: CSS animations → Framer Motion → No animation (reduced motion)
  - [ ] Create animation configuration interface:
  ```typescript
  interface HeroAnimationConfig {
    enabled: boolean;
    triggerType: 'mount' | 'viewport' | 'scroll';
    viewport?: {
      threshold: number;
      triggerOnce: boolean;
      margin?: string;
    };
    fallback: 'css' | 'none';
  }
  ```
  - **Success**: Architecture supports both CSS and Framer Motion with intelligent fallbacks

- [ ] **Task 4.2.3: Build Viewport-Triggered Animation System**
  - [ ] Implement `useViewportAnimation` hook using Intersection Observer:
    1. Track hero section visibility with configurable thresholds
    2. Support one-time vs repeated animation triggers
    3. Handle viewport margins for earlier/later trigger points
    4. Debounce rapid visibility changes to prevent animation conflicts
  - [ ] Enhance `HeroText.tsx` with viewport awareness:
    1. Replace mount-triggered CSS animations with viewport-triggered
    2. Add Framer Motion `whileInView` implementation as enhanced option
    3. Maintain existing animation types (fade, slide, stagger) with new triggers
  - [ ] Create animation orchestration system for multiple hero components on same page
  - **Success**: Animations trigger correctly when hero sections enter viewport

- [ ] **Task 4.2.4: Implement Enhanced Framer Motion Animations**
  - [ ] Create advanced animation variants using Framer Motion:
    1. Spring-based animations with realistic physics (bounce, elastic)
    2. Complex staggered animations for text elements with customizable delays
    3. Scroll-linked animations that respond to scroll velocity and direction
    4. Morphing animations for background transitions
  - [ ] Build custom animation curves and timing functions:
    1. Brand-specific easing curves for consistent feel
    2. Adaptive timing based on content length and complexity
    3. Performance-optimized animations using `transform` and `opacity`
  - [ ] Add advanced interaction animations:
    1. Magnetic hover effects for CTA buttons
    2. Parallax text effects synchronized with background
    3. Gesture-responsive animations for touch devices
  - **Success**: Enhanced animations provide superior user experience when Framer Motion is available

- [ ] **Task 4.2.5: Create Animation Performance Optimization**
  - [ ] Implement smart animation loading:
    1. Lazy load Framer Motion only when enhanced animations needed
    2. Bundle splitting to avoid loading animation code for users with reduced motion
    3. Progressive enhancement from CSS → Framer Motion
  - [ ] Add performance monitoring:
    1. Frame rate detection during animations
    2. Fallback to simpler animations on low-performance devices
    3. Memory usage tracking for complex animation sequences
  - [ ] Optimize animation patterns:
    1. Use `will-change` CSS property appropriately
    2. Promote animated elements to new layer when needed
    3. Clean up animation resources after completion
  - **Success**: Animation performance is optimal across all devices and conditions

- [ ] **Task 4.2.6: Build Animation Configuration Examples**
  - [ ] Create comprehensive animation examples:
    1. CSS-only animations for performance-critical scenarios
    2. Framer Motion enhanced animations for premium experiences
    3. Viewport-triggered animations for multiple heroes on same page
    4. Reduced motion compliance demonstrations
  - [ ] Document animation decision tree:
    1. When to use CSS vs Framer Motion
    2. Performance implications of different animation choices
    3. Accessibility considerations and reduced motion handling
  - [ ] Create animation debugging tools and guidelines
  - **Success**: Clear guidance and examples for implementing hero animations in production

### Phase 5: Mobile Optimization

#### Task 5.1: Implement Mobile-Specific Optimizations
**Effort**: 2/5
- [ ] Add mobile-specific features:
  - [ ] Different images for mobile devices
  - [ ] Reduced video quality on mobile
  - [ ] Touch-friendly CTA sizing
  - [ ] Adjusted text sizes for mobile
  - [ ] Simplified animations on mobile
- [ ] Implement viewport detection
- [ ] Add mobile performance optimizations
- [ ] Test on various mobile devices
- [ ] Optimize load times for mobile
**Success Criteria**: Mobile experience is optimized, fast load times

#### Task 5.2: Add Responsive Design Features
**Effort**: 2/5
- [ ] Implement responsive behavior:
  - [ ] Breakpoint-based content adjustments
  - [ ] Dynamic height calculations
  - [ ] Flexible content positioning
  - [ ] Responsive typography scaling
  - [ ] Container width constraints
- [ ] Test across all breakpoints
- [ ] Handle orientation changes
- [ ] Verify on different screen sizes
- [ ] Document responsive behavior
**Success Criteria**: Hero adapts smoothly to all screen sizes

### Phase 6: Performance and Accessibility

#### Task 6.1: Implement Performance Optimizations
**Effort**: 2/5
- [ ] Add performance features:
  - [ ] Lazy loading for video content
  - [ ] Intersection Observer for animations
  - [ ] Image preloading strategies
  - [ ] Code splitting for video/slides
  - [ ] Resource hints (preload, prefetch)
- [ ] Measure Core Web Vitals impact
- [ ] Optimize initial render time
- [ ] Implement progressive enhancement
- [ ] Add performance monitoring
**Success Criteria**: Hero loads under 3s, good Core Web Vitals scores

#### Task 6.2: Ensure Full Accessibility
**Effort**: 2/5
- [ ] Implement accessibility features:
  - [ ] Proper ARIA labels and roles
  - [ ] Keyboard navigation support
  - [ ] Screen reader announcements
  - [ ] Focus management
  - [ ] High contrast mode support
- [ ] Test with screen readers
- [ ] Verify keyboard navigation
- [ ] Run axe-core audits
- [ ] Document accessibility features
**Success Criteria**: Passes WCAG 2.1 AA, axe-core audit passes

### Phase 7: Integration and Examples

#### Task 7.1: Copy Components to Packages
**Effort**: 1/5
- [ ] Copy completed hero components to `packages/ui-core/`:
  - [ ] Copy `components/hero/` directory
  - [ ] Copy `types/hero.ts` to packages
  - [ ] Update package component exports
  - [ ] Update package type exports
- [ ] Verify imports in packages
- [ ] Test build in packages
- [ ] Commit before copy-packages script
**Success Criteria**: Components in packages, ready for propagation

#### Task 7.2: Create Example Implementations
**Effort**: 2/5
- [ ] Create example pages in `templates/react/src/app/examples/hero/`:
  - [ ] Static hero with image background
  - [ ] Video background hero example
  - [ ] Multi-slide hero example
  - [ ] Animated text hero example
  - [ ] Split-screen hero layout
- [ ] Add comprehensive prop documentation
- [ ] Include performance best practices
- [ ] Show responsive behavior
**Success Criteria**: Examples demonstrate all features clearly

#### Task 7.3: Test Framework Integration
**Effort**: 2/5
- [ ] Test with different frameworks:
  - [ ] Next.js Image/Link integration
  - [ ] React Router Link integration
  - [ ] Static site generation
  - [ ] Server-side rendering
- [ ] Verify routing works correctly
- [ ] Test image optimization
- [ ] Check build processes
- [ ] Document framework-specific notes
**Success Criteria**: Works across all target frameworks

### Phase 8: Documentation and Testing

#### Task 8.1: Create Component Documentation
**Effort**: 2/5
- [ ] Write comprehensive documentation:
  - [ ] API reference for all components
  - [ ] Usage examples for each variant
  - [ ] Performance guidelines
  - [ ] Accessibility notes
  - [ ] Migration from other hero components
- [ ] Add inline code comments
- [ ] Create README for hero package
- [ ] Document bundle size impacts
**Success Criteria**: Complete documentation, clear examples

#### Task 8.2: Write Component Tests
**Effort**: 2/5
- [ ] Create test coverage:
  - [ ] Unit tests for all components
  - [ ] Integration tests for variants
  - [ ] Accessibility tests
  - [ ] Performance tests
  - [ ] Responsive behavior tests
- [ ] Test error states
- [ ] Verify prop validation
- [ ] Test animation triggers
- [ ] Check framework integration
**Success Criteria**: >80% test coverage, all tests pass

#### Task 8.4: Final Build Verification
**Effort**: 1/5
- [ ] Verify production readiness:
  - [ ] Build succeeds in all templates
  - [ ] TypeScript compilation clean
  - [ ] No console errors/warnings
  - [ ] Bundle size acceptable
  - [ ] Performance metrics met
- [ ] Run copy-packages script
- [ ] Test in production build
- [ ] Update any configurations
**Success Criteria**: Production-ready, all builds succeed

## Dependencies and Sequencing

**Critical Path:**
1. Phase 1 (Foundation) → Phase 2 (Core Components) → Phase 3 (Advanced Features)
2. Phase 4 (Animations) can run parallel with Phase 3
3. Phase 5 (Mobile) requires Phases 2-3 complete
4. Phase 6 (Performance) after core features complete
5. Phase 7-8 (Integration/Testing) require all features complete

**Parallel Work Opportunities:**
- Tasks 2.1-2.5 can be worked simultaneously
- Tasks 3.1-3.3 can be developed in parallel
- Documentation can begin early and update throughout

## Success Criteria Summary

- [x] Hero renders all variants (static, video, slides, animated)
- [x] Background features fully implemented with WebP/AVIF optimization
- [x] Background images render with responsive loading and error handling
- [x] Background positioning and sizing variants complete
- [ ] Text animations respect user preferences
- [x] CTA buttons integrate with routing
- [ ] Fully responsive across devices
- [ ] Accessibility audit passes
- [ ] Performance targets met (<3s load)
- [ ] All templates build successfully
- [ ] Production-ready for business websites

### Next Priority Tasks

3. **Task 2.5: HeroOverlay Component** ✓
   - [x] Develop overlay functionality
   - [x] Ensure text contrast accessibility
   - [x] Write unit tests for HeroOverlay component