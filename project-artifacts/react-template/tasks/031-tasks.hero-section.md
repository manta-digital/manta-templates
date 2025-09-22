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
- [ ] Develop `HeroSection.tsx` with:
  - [ ] CVA variants for size (sm, md, lg, xl/fullscreen)
  - [ ] CVA variants for content position (left, center, right)
  - [ ] CVA variants for layout (default, fullscreen, split)
  - [ ] Content prop handling and validation
  - [ ] Framework component injection (LinkComponent, ImageComponent)
  - [ ] Theme integration with existing design tokens
- [ ] Add responsive behavior detection
- [ ] Implement proper TypeScript generics
- [ ] Include comprehensive prop validation
- [ ] Write unit tests for HeroSection component
- [ ] Test all CVA variants and prop combinations
- [ ] Test framework component integration
- [ ] Update example page to demonstrate functionality
**Success Criteria**: Hero section renders with all variants, accepts framework components, tests pass

#### Task 2.1.1: Create Basic Example Page
**Effort**: 1/5
- [ ] Create initial example page after HeroSection component:
  - [ ] Create `templates/react/src/app/examples/hero/basic/page.tsx`
  - [ ] Implement simple static hero with placeholder content
  - [ ] Add to navigation/routing as appropriate
  - [ ] Include basic responsive behavior
- [ ] Test hero section renders correctly in browser
- [ ] Verify routing and navigation work
- [ ] Document example usage patterns
**Success Criteria**: Basic hero example renders, can be viewed in browser

#### Task 2.2: Implement HeroBackground Component
**Effort**: 3/5
- [ ] Develop `HeroBackground.tsx` with background type detection:
  - [ ] Static image background support (with dark mode variant)
  - [ ] Gradient background support
  - [ ] Placeholder for video/slides (Phase 3)
  - [ ] Background position and size variants
- [ ] Implement responsive image loading
- [ ] Add proper image optimization support
- [ ] Support WebP/AVIF format detection
- [ ] Handle loading states for images
- [ ] Write unit tests for HeroBackground component
- [ ] Test background type detection and switching
- [ ] Test responsive image loading and optimization
- [ ] Test error handling for failed image loads
- [ ] Update example page with background variants
**Success Criteria**: Background images render correctly, responsive loading works, tests pass

#### Task 2.3: Implement HeroText Component
**Effort**: 2/5
- [ ] Develop `HeroText.tsx` with text content rendering:
  - [ ] Title rendering with proper heading hierarchy (h1)
  - [ ] Subtitle and description support
  - [ ] CVA variants for text size (sm, md, lg)
  - [ ] Basic fade-in animation support
  - [ ] Text color variants for overlay contrast
- [ ] Implement responsive text sizing
- [ ] Add proper line height and spacing
- [ ] Support HTML content in description
- [ ] Write unit tests for HeroText component
- [ ] Test text variants and responsive sizing
- [ ] Test HTML content rendering and sanitization
- [ ] Test animation integration
- [ ] Update example page with text variants
**Success Criteria**: Text renders with proper hierarchy, responsive sizing works, tests pass

#### Task 2.4: Implement HeroCTA Component
**Effort**: 2/5
- [ ] Develop `HeroCTA.tsx` leveraging existing Button component:
  - [ ] Primary and secondary CTA button support
  - [ ] Button variant mapping (primary, secondary, outline)
  - [ ] Framework LinkComponent integration
  - [ ] Responsive button sizing
  - [ ] Proper spacing between buttons
- [ ] Implement mobile-friendly touch targets
- [ ] Add hover and focus states
- [ ] Support external links (target="_blank")
- [ ] Write unit tests for HeroCTA component
- [ ] Test button variant mapping and styling
- [ ] Test framework LinkComponent integration
- [ ] Test external link handling
- [ ] Update example page with CTA variants
**Success Criteria**: CTA buttons work with routing, proper styling and spacing, tests pass

#### Task 2.5: Implement HeroOverlay Component
**Effort**: 1/5
- [ ] Develop `HeroOverlay.tsx` for background darkening:
  - [ ] Configurable opacity levels
  - [ ] Custom color support
  - [ ] Gradient overlay options
  - [ ] Z-index management
- [ ] Ensure text contrast accessibility
- [ ] Add smooth transitions
- [ ] Support theme-aware overlays
- [ ] Write unit tests for HeroOverlay component
- [ ] Test opacity and color configurations
- [ ] Test theme integration and contrast
- [ ] Test z-index management
- [ ] Update example page with overlay variants
**Success Criteria**: Overlay provides proper contrast, configurable appearance, tests pass

### Phase 3: Advanced Background Features

#### Task 3.1: Implement Video Background Support
**Effort**: 3/5
- [ ] Extend `HeroBackground.tsx` with video support:
  - [ ] HTML5 video element integration
  - [ ] Autoplay, loop, and muted attributes
  - [ ] Poster image for loading state
  - [ ] Video format detection (mp4, webm)
  - [ ] Fallback to image on mobile/error
- [ ] Add video loading optimization
- [ ] Implement play/pause on visibility
- [ ] Handle video load errors gracefully
- [ ] Add performance monitoring
**Success Criteria**: Video backgrounds play smoothly, proper fallbacks work

#### Task 3.2: Implement Slide Background Support
**Effort**: 3/5
- [ ] Create slide functionality in `HeroBackground.tsx`:
  - [ ] Multiple slide image support
  - [ ] Automatic slide transitions
  - [ ] Configurable transition duration
  - [ ] Fade/slide transition effects
  - [ ] Optional slide content (title/subtitle)
- [ ] Implement slide navigation state
- [ ] Add pause on hover functionality
- [ ] Optimize image preloading for slides
- [ ] Handle slide cycling logic
**Success Criteria**: Slides transition smoothly, autoplay works, images preload

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

#### Task 4.2: Add Optional Framer Motion Support
**Effort**: 2/5
- [ ] Create enhanced animations with Framer Motion:
  - [ ] Complex staggered animations
  - [ ] Spring-based animations
  - [ ] Scroll-triggered animations
  - [ ] Custom animation curves
- [ ] Make Framer Motion optional import
- [ ] Provide CSS fallbacks
- [ ] Document when to use which approach
- [ ] Monitor bundle size impact
**Success Criteria**: Advanced animations work when enabled, graceful fallback

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

- [ ] Hero renders all variants (static, video, slides, animated)
- [ ] Background features work correctly with fallbacks
- [ ] Text animations respect user preferences
- [ ] CTA buttons integrate with routing
- [ ] Fully responsive across devices
- [ ] Accessibility audit passes
- [ ] Performance targets met (<3s load)
- [ ] All templates build successfully
- [ ] Production-ready for business websites