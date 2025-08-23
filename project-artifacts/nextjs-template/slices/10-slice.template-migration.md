---
layer: project
docType: slice-design
slice: template-migration
project: manta-templates
dependencies:
  - Slice 09: Component Parity (COMPLETED)
status: ready
priority: CRITICAL
---

# Slice Design: Template Migration to ui-core

## Critical Problem Statement

Despite achieving complete component parity in Slice 09, the `templates/nextjs` template is still importing components from local directories (`@/components/*`) instead of from the ui-core package (`@manta-templates/ui-core`). This creates a critical deployment blocker:

**Current State (BROKEN):**
```typescript
// templates/nextjs/src/app/page.tsx
import { BaseCard } from '@/components/cards/BaseCard'
import { ThemeToggle } from '@/components/themetoggle'
import { AboutCard } from '@/components/cards/people/AboutCard'
```

**Required State (DEPLOYMENT READY):**
```typescript
// templates/nextjs/src/app/page.tsx  
import { BaseCard, ThemeToggle, AboutCard } from '@manta-templates/ui-core'
```

## Scope and Objectives

### Primary Objective
Transform `templates/nextjs` from using local components to consuming the ui-core package, making it deployment-ready as an actual template.

### Success Criteria
- [ ] All template pages import from `@manta-templates/ui-core` instead of `@/components/*`
- [ ] Template builds successfully with ui-core imports
- [ ] Template functions identically to current local-component version
- [ ] All dependency injection (Image, Link, social icons) works correctly
- [ ] Template is ready for deployment as a landing page

### Out of Scope
- Creating new components (component parity already achieved)
- Framework-specific optimizations 
- Performance improvements beyond ensuring no regressions
- Documentation updates (minimal changes expected)

## Technical Architecture

### Import Migration Strategy

**Phase 1: Systematic Component Import Replacement**
- Map all current `@/components/*` imports to their ui-core equivalents
- Replace imports file by file, maintaining dependency injection patterns
- Verify each page builds and renders identically after migration

**Phase 2: Component Cleanup**
- Remove redundant template components now available in ui-core
- Clean up unused import statements and exports
- Update TypeScript path mappings if needed

**Phase 3: Dependency Injection Validation**
- Ensure all ui-core components receive proper dependency injection:
  - `ImageComponent={Image}` (Next.js Image)
  - `LinkComponent={Link}` (Next.js Link) 
  - Social icons for AboutCard, ContactForm, etc.
- Validate theme context works across ui-core components

### Component Migration Mapping

Based on component parity achieved in Slice 09:

**Cards:**
- `@/components/cards/BaseCard` → `@manta-templates/ui-core` (BaseCard)
- `@/components/cards/people/AboutCard` → `@manta-templates/ui-core` (AboutCard)
- `@/components/cards/articles/ArticleCard` → `@manta-templates/ui-core` (ArticleCard)
- `@/components/cards/projects/ProjectCard` → `@manta-templates/ui-core` (ProjectCard)
- `@/components/cards/ContentCard` → `@manta-templates/ui-core` (ContentCard)
- `@/components/cards/VideoCard` → `@manta-templates/ui-core` (VideoCard)
- `@/components/cards/QuoteCard` → `@manta-templates/ui-core` (QuoteCard)
- All other card components with ui-core equivalents

**UI Components:**
- `@/components/themetoggle` → `@manta-templates/ui-core` (ThemeToggle)
- `@/components/ui/ColorSelector` → `@manta-templates/ui-core` (ColorSelector)
- `@/components/ui/BrandMark` → `@manta-templates/ui-core` (BrandMark)
- `@/components/ui/TechnologyScroller` → `@manta-templates/ui-core` (TechnologyScroller)

**Layout Components:**
- `@/components/layout/Container` → `@manta-templates/ui-core` (Container)
- `@/components/layout/Grid` → `@manta-templates/ui-core` (Grid)
- `@/components/layout/BentoLayout` → `@manta-templates/ui-core` (BentoLayout)
- `@/components/layout/CardCarousel` → `@manta-templates/ui-core` (CardCarousel)

**Headers/Footers:**
- `@/components/headers/*` → `@manta-templates/ui-core` (Header variants)
- `@/components/footers/*` → `@manta-templates/ui-core` (Footer variants)

**Overlays:**
- `@/components/overlays/ComingSoonOverlay` → `@manta-templates/ui-core` (ComingSoonOverlay)

## Implementation Plan

### Phase 1: Import Analysis and Mapping (1-2 hours)

**Task 1.1: Complete Import Inventory**
- Scan all template files for `@/components/*` imports
- Create comprehensive mapping of local imports to ui-core equivalents
- Identify any components still missing from ui-core (should be none after Slice 09)

**Task 1.2: Dependency Injection Audit**
- Identify all locations where dependency injection is required
- Map Image/Link/social icon injection patterns
- Ensure ui-core components support all required injection points

### Phase 2: Systematic Migration (3-4 hours)

**Task 2.1: Page-by-Page Migration**
- Migrate app router pages (`app/**/*.tsx`)
- Migrate components that remain template-specific
- Update imports while maintaining identical functionality

**Task 2.2: Build and Runtime Validation**
- Build template after each major page migration
- Run template locally to verify identical rendering
- Fix any build or runtime issues immediately

### Phase 3: Component Cleanup (1-2 hours)

**Task 3.1: Remove Redundant Components**
- Delete template components now available in ui-core
- Clean up component export files (index.ts)
- Remove unused TypeScript types and interfaces

**Task 3.2: Final Build Verification**
- Complete production build validation
- Runtime testing of all major pages and functionality
- Performance comparison (no significant regressions expected)

### Phase 4: Quality Assurance (1 hour)

**Task 4.1: Comprehensive Testing**
- Test all pages load correctly
- Verify theme switching works (light/dark + accent colors)
- Test responsive behavior across device sizes
- Validate all interactive elements function correctly

**Task 4.2: Production Readiness**
- Confirm template can be deployed as a landing page
- Verify all assets and dependencies resolve correctly
- Test build output is deployment-ready

## Risk Assessment

### High Priority Risks

**Risk 1: Dependency Injection Breakage**
- **Issue**: ui-core components might not receive proper Image/Link injection
- **Mitigation**: Systematic testing of dependency injection patterns during migration
- **Detection**: Build errors or runtime component failures

**Risk 2: Build Configuration Issues**
- **Issue**: Template build might fail with ui-core imports due to configuration
- **Mitigation**: Validate build configuration supports ui-core package imports
- **Detection**: Build failures during TypeScript compilation

**Risk 3: Runtime Functionality Differences** 
- **Issue**: Minor behavioral differences between local and ui-core components
- **Mitigation**: Side-by-side comparison testing, reference test-cards validation
- **Detection**: Visual or functional regressions during testing

### Medium Priority Risks

**Risk 4: Theme System Integration**
- **Issue**: ui-core theme components might not integrate properly with template theme context
- **Mitigation**: Theme system proven working in test-cards page
- **Detection**: Theme switching not working correctly

**Risk 5: TypeScript Configuration**
- **Issue**: Path mappings or type definitions might need updates
- **Mitigation**: Incremental migration with immediate build validation
- **Detection**: TypeScript compilation errors

## Quality Gates

### Build Quality Gates
- [ ] `pnpm build` succeeds without errors
- [ ] `pnpm type-check` passes without errors  
- [ ] `pnpm lint` passes (warnings acceptable)
- [ ] No console errors in browser during development

### Functional Quality Gates  
- [ ] All pages render identically to pre-migration state
- [ ] Theme switching (light/dark + accent colors) works correctly
- [ ] All interactive elements function as expected
- [ ] Responsive behavior preserved across device sizes
- [ ] All dependency injection works correctly (images, links, social icons)

### Deployment Quality Gates
- [ ] Template builds for production successfully
- [ ] Template can be deployed as standalone landing page
- [ ] All asset references resolve correctly
- [ ] Performance metrics show no significant regression (<5% impact)

## Dependencies and Prerequisites

### Prerequisites (COMPLETED)
- ✅ Slice 09: Component Parity - All essential components migrated to ui-core
- ✅ ui-core package builds successfully and exports all required components
- ✅ test-cards page demonstrates identical functionality between template and ui-core components
- ✅ Dependency injection patterns proven working in ui-core components

### Development Environment
- Working monorepo setup with ui-core package
- Template builds successfully with current local components
- Git feature branch (ui-refactor) ready for migration changes

## Success Metrics

### Primary Metrics
- **Import Migration**: 100% of @/components/* imports replaced with ui-core equivalents
- **Build Success**: Template builds successfully with ui-core imports
- **Functional Parity**: All pages function identically to pre-migration state
- **Deployment Readiness**: Template can be deployed as production landing page

### Secondary Metrics  
- **Performance**: No regression >5% in build time or runtime performance
- **Code Reduction**: Reduction in template codebase size due to component removal
- **Type Safety**: No increase in TypeScript errors or 'any' types

## Post-Migration Validation

### Validation Checklist
- [ ] Homepage renders correctly with ui-core components
- [ ] Blog pages work with ui-core ArticleCard and content loading
- [ ] Project showcases use ui-core ProjectCard variants
- [ ] About section uses ui-core AboutCard with social icons
- [ ] Theme toggle and color selector work from ui-core
- [ ] All layout components (Grid, Container, Carousel) function correctly
- [ ] Responsive behavior maintained across all breakpoints
- [ ] Production build creates deployable output

### Comparison Testing
- Side-by-side comparison with pre-migration version
- Automated screenshot comparison (optional)
- Performance benchmarking (build time, bundle size, runtime performance)
- Accessibility testing (no regressions in a11y scores)

## Future Implications

### Enables Next Steps
- **Template Deployment**: Template ready for production deployment as landing page
- **Multi-Framework Templates**: Foundation for Astro and React Router templates
- **Distribution System**: Template can be packaged for distribution
- **Advanced Testing**: Enables comprehensive testing of ui-core package in production context

### Long-term Benefits
- **Maintainability**: Single source of truth for components across all templates
- **Consistency**: Guaranteed visual and functional consistency across framework implementations
- **Developer Experience**: Clear separation between template-specific and shared components
- **Deployment Flexibility**: Template becomes truly framework-agnostic foundation

## Conclusion

Slice 10 is the critical missing step that transforms our component parity achievement into actual deployment readiness. While the technical work is straightforward (systematic import replacement), it's essential for making the entire manta-templates project viable for real-world use.

The migration should be low-risk given the proven component parity from test-cards validation, but requires careful systematic execution to ensure zero functional regressions while achieving deployment readiness.