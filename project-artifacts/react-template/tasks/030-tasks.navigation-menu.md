---
slice: navigation-menu
project: manta-templates
lldReference: project-artifacts/react-template/slices/030-slice.navigation-menu.md
dependencies: []
projectState: React template with existing header components and ui-core framework-agnostic architecture
effort: 4/5
lastUpdated: 2025-09-17
---

# Tasks: Navigation Menu Component

## Context Summary

Creating a comprehensive navigation menu component that replaces the existing DefaultHeader for business/marketing websites. This component maintains all current header functionality (logo, branding, theme controls) while adding sophisticated navigation features including multi-level dropdowns, mobile responsiveness, and multiple layout variants.

**Key Requirements from GitHub Issue #72:**
- Multi-level menu support (dropdowns/submenus)
- Mobile-responsive with hamburger menu
- Logo/brand placement
- CTA button integration
- Consistent with existing form UI patterns
- Support for various layouts (horizontal, sidebar, etc.)
- Accessibility features (keyboard navigation, ARIA)

**Architecture Approach:**
- Framework-agnostic component using Radix UI Navigation Menu primitives
- Content-driven configuration (extends existing HeaderContent pattern)
- CVA variants for styling consistency
- Dependency injection for framework-specific components
- Complete replacement for DefaultHeader with migration path

## Task Breakdown

### Phase 1: Foundation and Dependencies

#### Task 1.1: Install and Configure Dependencies
**Effort**: 1/5
- [x] Add `@radix-ui/react-navigation-menu` to packages/package.json
- [x] Add `@radix-ui/react-dialog` to packages/package.json (for mobile menu modal)
- [x] Update package.json in all template targets (react, nextjs, electron)
- [x] Run `pnpm install` and verify no conflicts
- [x] Update any relevant documentation about dependencies
**Success Criteria**: Dependencies installed without conflicts, build succeeds

#### Task 1.2: Create Type Definitions
**Effort**: 2/5
- [x] Create `templates/react/src/lib/ui-core/types/navigation.ts` with all interfaces:
  - [x] `NavigationMenuItem` interface
  - [x] `NavigationMenuContent` interface  
  - [x] `NavigationMenuProps` interface
  - [x] `HeaderContentToNavigationContent` converter interface
- [x] Update `templates/react/src/lib/ui-core/types/index.ts` to export navigation types
- [x] Ensure TypeScript strict mode compliance
- [x] Add JSDoc comments for all public interfaces
**Success Criteria**: Types compile without errors, full TypeScript intellisense

#### Task 1.3: Create Base Component Structure
**Effort**: 2/5
- [x] Create `templates/react/src/lib/ui-core/components/navigation/` directory
- [x] Create placeholder files for all components:
  - [x] `NavigationMenu.tsx` (main wrapper)
  - [x] `NavigationMenuItem.tsx` (individual items)
  - [x] `NavigationMenuTrigger.tsx` (dropdown trigger)
  - [x] `NavigationMenuContent.tsx` (dropdown content)
  - [x] `NavigationMenuLink.tsx` (navigation link)
  - [x] `MobileMenu.tsx` (mobile-specific components)
  - [x] `index.ts` (exports)
- [x] Add basic TypeScript interfaces and exports
- [x] Verify import/export chain works correctly
**Success Criteria**: All files exist, imports work, TypeScript compiles

### Phase 2: Core Navigation Components

#### Task 2.1: Implement NavigationMenuRoot Component
**Effort**: 3/5
- [x] Develop in `templates/react/src/lib/ui-core/components/navigation/NavigationMenu.tsx`:
  - [x] Radix NavigationMenu.Root integration
  - [x] CVA variants implementation (uiVariant, sticky, variant)
  - [x] Content prop handling and validation
  - [x] Framework component injection (LinkComponent, ImageComponent)
  - [x] Theme integration with existing tokens
- [x] Implement responsive behavior and mobile breakpoint detection
- [x] Add proper TypeScript generics for framework components
- [x] Include comprehensive prop validation
**Success Criteria**: Root component renders, accepts all props, integrates with theme ✓

#### Task 2.2: Implement NavigationMenuItem Component
**Effort**: 3/5
- [x] Develop in `templates/react/src/lib/ui-core/components/navigation/NavigationMenuItem.tsx`:
  - [x] Support for both link and trigger items
  - [x] Recursive rendering for nested menu items
  - [x] Active state detection and styling
  - [x] Icon integration (lucide-react)
  - [x] Badge display functionality
- [x] Implement CVA variants for item styling
- [x] Add keyboard navigation support
- [x] Handle disabled state properly
**Success Criteria**: Menu items render correctly, support nesting, proper styling ✓

#### Task 2.3: Implement NavigationMenuTrigger Component  
**Effort**: 2/5
- [ ] Develop in `templates/react/src/lib/ui-core/components/navigation/NavigationMenuTrigger.tsx`:
  - [ ] Radix NavigationMenu.Trigger integration
  - [ ] Dropdown indicator (ChevronDown icon)
  - [ ] Hover and focus states
  - [ ] CVA variants for trigger styling
- [ ] Implement proper ARIA attributes
- [ ] Add animation classes for smooth transitions
- [ ] Support custom trigger content
**Success Criteria**: Triggers work with dropdowns, proper accessibility, smooth animations

#### Task 2.4: Implement NavigationMenuContent Component
**Effort**: 3/5
- [ ] Develop in `templates/react/src/lib/ui-core/components/navigation/NavigationMenuContent.tsx`:
  - [ ] Radix NavigationMenu.Content integration
  - [ ] Viewport positioning and sizing
  - [ ] Multi-level content support (3+ levels)
  - [ ] Content area variants (simple, grid, custom)
- [ ] Implement smooth enter/exit animations
- [ ] Add proper z-index management
- [ ] Support content overflow handling
**Success Criteria**: Dropdowns position correctly, support multi-level, smooth animations

#### Task 2.5: Implement NavigationMenuLink Component
**Effort**: 2/5
- [ ] Develop in `templates/react/src/lib/ui-core/components/navigation/NavigationMenuLink.tsx`:
  - [ ] Radix NavigationMenu.Link integration
  - [ ] Framework LinkComponent composition
  - [ ] Active state detection and styling
  - [ ] External link handling (target="_blank")
- [ ] Support for custom link styling variants
- [ ] Implement proper focus management
- [ ] Add click tracking capabilities
**Success Criteria**: Links work with framework routers, proper active states, accessibility

### Phase 3: Mobile Navigation

#### Task 3.1: Implement Mobile Menu Trigger
**Effort**: 2/5
- [ ] Create mobile hamburger menu button component:
  - [ ] Hamburger icon with open/close animation
  - [ ] Responsive visibility (hidden on desktop)
  - [ ] Proper touch target sizing (44px minimum)
  - [ ] Integration with mobile menu state
- [ ] Add keyboard accessibility for mobile trigger
- [ ] Implement proper ARIA controls attributes
- [ ] Support custom trigger styling
**Success Criteria**: Mobile trigger works on touch devices, proper accessibility

#### Task 3.2: Implement Mobile Menu Drawer Variant
**Effort**: 3/5
- [ ] Create mobile drawer component with:
  - [ ] Slide-in animation from left/right
  - [ ] Overlay background with dismiss functionality
  - [ ] Full-height menu with proper scrolling
  - [ ] Hierarchical navigation with back buttons
- [ ] Implement touch gestures (swipe to close)
- [ ] Add proper focus trapping
- [ ] Support brand area at top of drawer
**Success Criteria**: Drawer slides smoothly, proper touch interactions, accessibility

#### Task 3.3: Implement Mobile Menu Fullscreen Variant
**Effort**: 2/5
- [ ] Create fullscreen mobile menu with:
  - [ ] Full viewport takeover
  - [ ] Large touch-friendly targets
  - [ ] Prominent brand display
  - [ ] Search integration placeholder
- [ ] Implement smooth fade-in/out animations
- [ ] Add proper escape key handling
- [ ] Support for different content layouts
**Success Criteria**: Fullscreen menu covers viewport, large touch targets, smooth transitions

#### Task 3.4: Implement Mobile Menu Dropdown Variant
**Effort**: 2/5
- [ ] Create mobile dropdown menu with:
  - [ ] Dropdown below trigger positioning
  - [ ] Compact mobile-optimized layout
  - [ ] Touch-friendly interaction areas
  - [ ] Auto-dismiss on outside click
- [ ] Implement collision detection and repositioning
- [ ] Add touch-specific interactions
- [ ] Support for different dropdown styles
**Success Criteria**: Mobile dropdown positions correctly, touch-friendly, proper dismiss behavior

### Phase 4: Brand and Control Integration

#### Task 4.1: Implement Brand Section
**Effort**: 2/5
- [ ] Create brand section component with:
  - [ ] Logo display with light/dark theme support
  - [ ] Brand title with responsive hiding
  - [ ] BrandMark fallback integration
  - [ ] Clickable brand area (home link)
- [ ] Support for custom brand layouts
- [ ] Implement proper image optimization integration
- [ ] Add brand hover effects
**Success Criteria**: Brand section matches existing header, theme-aware, responsive

#### Task 4.2: Integrate Theme Controls
**Effort**: 2/5
- [ ] Integrate existing ThemeToggle component:
  - [ ] Proper positioning in navigation
  - [ ] Consistent styling with navigation
  - [ ] Mobile menu integration
  - [ ] Optional show/hide functionality
- [ ] Integrate existing ColorSelector component with same requirements
- [ ] Ensure controls work in all navigation variants
- [ ] Add proper spacing and alignment
**Success Criteria**: Theme controls work identically to current header, all variants

#### Task 4.3: Implement CTA Button Integration
**Effort**: 2/5
- [ ] Create CTA button component with:
  - [ ] Multiple variants (primary, secondary, outline)
  - [ ] Responsive positioning and sizing
  - [ ] Integration with navigation layout
  - [ ] Mobile menu placement
- [ ] Support for custom CTA styling
- [ ] Implement proper focus order
- [ ] Add click tracking capabilities
**Success Criteria**: CTA button displays prominently, works across all layouts

### Phase 5: Advanced Features and Polish

#### Task 5.1: Implement Navigation Indicator
**Effort**: 2/5
- [ ] Create navigation indicator component with:
  - [ ] Active item highlighting
  - [ ] Smooth transition animations
  - [ ] Horizontal and vertical orientation support
  - [ ] Custom indicator styling options
- [ ] Implement indicator positioning logic
- [ ] Add indicator show/hide functionality
- [ ] Support for custom indicator designs
**Success Criteria**: Indicator highlights active items, smooth animations, customizable

#### Task 5.2: Implement Advanced Accessibility
**Effort**: 2/5
- [ ] Add comprehensive ARIA support:
  - [ ] Proper role and state attributes
  - [ ] Screen reader announcements
  - [ ] High contrast mode support
  - [ ] Reduced motion preferences
- [ ] Implement full keyboard navigation
- [ ] Add focus management for complex interactions
- [ ] Support for accessibility preferences
**Success Criteria**: Passes axe-core audit, screen reader compatible, full keyboard nav

#### Task 5.3: Implement Performance Optimizations
EVALUATE.  Stop and evaluate with Project Manager when you reach this task.
**Effort**: 2/5
- [ ] Add performance optimizations:
  - [ ] Lazy loading for dropdown content
  - [ ] Memoization for expensive calculations
  - [ ] Code splitting for mobile menu
  - [ ] Bundle size optimization
- [ ] Implement intersection observer for sticky behavior
- [ ] Add debounced interactions where appropriate
- [ ] Optimize re-render patterns
**Success Criteria**: <100ms interaction response, optimized bundle size, smooth scrolling

### Phase 6: Migration and Compatibility

#### Task 6.1: Create Migration Utilities
**Effort**: 2/5
- [ ] Create `convertHeaderContentToNavigationContent` utility:
  - [ ] Convert HeaderContent to NavigationMenuContent
  - [ ] Preserve all existing functionality
  - [ ] Add sensible defaults for new features
  - [ ] Provide migration warnings/guidance
- [ ] Create compatibility wrapper component
- [ ] Add migration documentation
- [ ] Provide side-by-side examples
**Success Criteria**: Existing header content converts seamlessly, clear migration path

#### Task 6.2: Implement Simple Variant for Backwards Compatibility
**Effort**: 2/5
- [ ] Create `NavigationMenu variant="simple"`:
  - [ ] Mimics existing DefaultHeader exactly
  - [ ] Same visual appearance and behavior
  - [ ] Accepts existing HeaderContent structure
  - [ ] Drop-in replacement capability
- [ ] Ensure pixel-perfect compatibility
- [ ] Add comprehensive compatibility tests
- [ ] Document usage patterns
**Success Criteria**: Simple variant indistinguishable from DefaultHeader

#### Task 6.3: Update Header Component Integration
**Effort**: 1/5
- [ ] Update `packages/ui-core/components/headers/Header.tsx`:
  - [ ] Add new navigation variant option
  - [ ] Maintain existing default behavior
  - [ ] Add deprecation notices for migration
  - [ ] Preserve all existing functionality
- [ ] Update header exports and documentation
- [ ] Add variant selection guidance
- [ ] Ensure backwards compatibility
**Success Criteria**: Existing header usage unaffected, new variants available

### Phase 7: Template Integration and Testing

#### Task 7.1: Copy Components Up to Packages
**Effort**: 1/5
- [ ] Copy completed navigation components from `templates/react/src/lib/ui-core/` to `packages/ui-core/`:
  - [ ] Copy `components/navigation/` directory and all files
  - [ ] Copy `types/navigation.ts` to packages types
  - [ ] Update `packages/ui-core/components/index.ts` exports
  - [ ] Update `packages/ui-core/types/index.ts` exports
- [ ] Verify all imports work correctly in packages
- [ ] Test build process in packages directory
- [ ] Commit changes before running copy-packages script
**Success Criteria**: Components successfully copied to packages, ready for propagation

#### Task 7.2: Create Example Implementations
**Effort**: 2/5
- [ ] Create example pages in `templates/react/src/app/examples/navigation/`:
  - [ ] Basic horizontal navigation example
  - [ ] Multi-level dropdown example
  - [ ] Mobile menu variants showcase
  - [ ] Business website layout example
- [ ] Add comprehensive prop examples
- [ ] Include migration examples
- [ ] Add performance demonstration
**Success Criteria**: Examples demonstrate all features, clear usage patterns

#### Task 7.3: Framework Integration Testing
**Effort**: 2/5
- [ ] Test Next.js integration:
  - [ ] Next/Link component integration
  - [ ] Next/Image component integration
  - [ ] App Router compatibility
  - [ ] Static export compatibility
- [ ] Test React Router integration:
  - [ ] RouterLink component integration
  - [ ] Route matching and active states
  - [ ] History API integration
- [ ] Test Electron integration:
  - [ ] Standard link handling
  - [ ] Electron-specific optimizations
**Success Criteria**: All framework integrations work correctly, proper routing

#### Task 7.4: Comprehensive Component Testing
**Effort**: 3/5
- [ ] Create unit tests for all components:
  - [ ] Navigation state management
  - [ ] Content rendering
  - [ ] Event handling
  - [ ] Accessibility attributes
- [ ] Create integration tests:
  - [ ] Multi-level navigation flows
  - [ ] Mobile menu interactions
  - [ ] Framework router integration
  - [ ] Theme switching
- [ ] Create accessibility tests:
  - [ ] Screen reader compatibility
  - [ ] Keyboard navigation
  - [ ] Focus management
**Success Criteria**: >90% test coverage, all accessibility tests pass

### Phase 8: Documentation and Quality Assurance

#### Task 8.1: Create Comprehensive Documentation
**Effort**: 2/5
- [ ] Create component documentation:
  - [ ] API reference for all components
  - [ ] Usage examples and patterns
  - [ ] Migration guide from DefaultHeader
  - [ ] Best practices and recommendations
- [ ] Add Storybook stories (if enabled):
  - [ ] All component variants
  - [ ] Interactive property controls
  - [ ] Accessibility testing tab
- [ ] Update project-level documentation
**Success Criteria**: Complete documentation, clear usage examples

#### Task 8.2: Performance and Accessibility Audit
**Effort**: 2/5
- [ ] Run performance audits:
  - [ ] Bundle size analysis
  - [ ] Interaction response time testing
  - [ ] Memory usage profiling
  - [ ] Mobile performance testing
- [ ] Run accessibility audits:
  - [ ] axe-core automated testing
  - [ ] Screen reader manual testing
  - [ ] Keyboard navigation testing
  - [ ] High contrast mode testing
- [ ] Fix any identified issues
**Success Criteria**: Performance targets met, accessibility audit passes

#### Task 8.3: Cross-browser and Device Testing
**Effort**: 2/5
- [ ] Test across browsers:
  - [ ] Chrome, Firefox, Safari, Edge
  - [ ] Mobile browsers (iOS Safari, Chrome Mobile)
  - [ ] Desktop and mobile viewports
- [ ] Test on different devices:
  - [ ] Touch interactions on tablets/phones
  - [ ] Keyboard navigation on desktop
  - [ ] Screen reader testing
- [ ] Fix any compatibility issues
**Success Criteria**: Consistent behavior across all target browsers/devices

#### Task 8.4: Final Integration and Build Verification
**Effort**: 1/5
- [ ] Run final build verification:
  - [ ] `pnpm build` succeeds in all templates
  - [ ] TypeScript compilation without errors
  - [ ] No console warnings in production
  - [ ] Bundle size within acceptable limits
- [ ] Verify copy-packages script works correctly
- [ ] Test production deployment scenarios
- [ ] Update any build configuration if needed
**Success Criteria**: All builds succeed, ready for production use

## Dependencies and Sequencing

**Critical Path:**
1. Phase 1 (Foundation) → Phase 2 (Core Components) → Phase 3 (Mobile) → Phase 4 (Integration)
2. Phase 5 (Polish) can run parallel with Phase 6 (Migration)
3. Phase 7 (Template Integration) requires Phases 1-6 complete
4. Phase 8 (QA) requires all previous phases complete

**Parallel Work Opportunities:**
- Tasks 2.1-2.5 can be worked on simultaneously by different developers
- Tasks 3.1-3.4 can be worked on in parallel after Task 2.1 complete
- Tasks 4.1-4.3 can be worked on in parallel after Phase 2 complete
- Documentation (8.1) can begin early and be updated throughout

**Risk Mitigation:**
- Test mobile interactions early (Phase 3) to catch UX issues
- Begin accessibility work in Phase 2, not just Phase 5
- Create migration utilities early (Phase 6) to validate compatibility approach
- Performance testing in Phase 5 to avoid late optimization needs

## Success Criteria Summary

- [ ] NavigationMenu component fully replaces DefaultHeader functionality
- [ ] Multi-level dropdown navigation works flawlessly (3+ levels deep)
- [ ] All mobile menu variants function properly across devices
- [ ] Framework integration works with Next.js, React Router, and Electron
- [ ] Migration path from existing header is seamless and well-documented
- [ ] Accessibility audit passes with no critical issues
- [ ] Performance metrics meet targets (<100ms interactions, reasonable bundle size)
- [ ] All template targets build and deploy successfully
- [ ] Component is ready for production use in business/marketing websites