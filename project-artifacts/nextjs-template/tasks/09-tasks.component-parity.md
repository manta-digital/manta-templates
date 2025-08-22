---
layer: project
docType: tasks
slice: component-parity
project: manta-templates
lldReference: project-artifacts/nextjs-template/slices/09-slice.component-parity.md
dependencies: 
  - slice-08-markdown-content
currentState: |
  - ui-refactor infrastructure complete (Phase 1-2)
  - VideoCard architecture and TypeScript cleanup complete
  - Template has 53 components, ui-core has 23 components (~30 components missing)
  - Ready for Priority 1 essential card migration
---

# Tasks: Slice 09 - UI-Core Component Parity

## Context Summary

**Objective**: Migrate Priority 1 essential card components from `templates/nextjs` to `packages/ui-core` to achieve comprehensive framework-agnostic component coverage.

**Current Component Gap**: Template contains 53 components while ui-core has only 23, representing a significant gap that limits multi-framework template development.

**Focus**: This task file covers only **Priority 1: Essential Card Components** (12 components) as requested. These are the most critical cards needed for basic functionality across frameworks.

**Dependencies**: 
- Slice 08 (Markdown Content) - ContentProvider system for content-driven cards
- Existing ui-core infrastructure with dependency injection patterns

## Priority 1 Component Analysis

### Component Necessity Assessment

Based on code analysis, here are the Priority 1 components and their necessity:

| Component | Necessity | Reason | Content-Driven |
|-----------|-----------|---------|----------------|
| `ComingSoonFeatureCard.tsx` | **SKIP** | Template-specific landing page content | ✅ Yes - FeatureContent |
| `EnhancedBaseCard.tsx` | **SKIP** | Simple wrapper around ShadCN Card - functionality exists in ui-core BaseCard | ❌ No |
| `FeatureCardContainer.tsx` | **SKIP** | Obsolete with new explicit content loading approach | ✅ Yes - FeatureContent |
| `FeatureCardWrapper.tsx` | **SKIP** | Template-specific wrapper for landing page features | ❌ No - but supports content cards |
| `GuidesFeatureCard.tsx` | **SKIP** | Template-specific landing page content | ✅ Yes - FeatureContent |
| `ProjectCardContainer.tsx` | **SKIP** | Obsolete with new explicit content loading approach | ✅ Yes - ProjectContent |
| `QuoteCardContainer.tsx` | **SKIP** | Obsolete with new explicit content loading approach | ✅ Yes - QuoteContent |
| `SidebarPostCard.tsx` | **ANALYZE** | May have equivalent functionality in ui-core BlogCard variants | ✅ Yes - PostContent |
| `VideoCardContainer.tsx` | **SKIP** | Obsolete with new explicit content loading approach | ✅ Yes - VideoContent |
| `articles/BlogIndexCard.tsx` | **NEEDED** | Loads and displays list of recent articles | ✅ Yes - PostContent |
| `layouts/VirtualCardList.tsx` | **SKIP** | Unused component (no references found in codebase) | ❌ No - utility component |
| `ui/TechnologyScroller.tsx` | **NEEDED** | Important reusable component for displaying technology stacks | ❌ No - utility component |
| `BaseCard.tsx` conflict | **RESOLVED** | Template uses @/components/cards/BaseCard, ui-core uses @manta-templates/ui-core | ❌ No |

**Result**: 2 out of 13 components need migration (BlogIndexCard, TechnologyScroller). 1 component needs analysis (SidebarPostCard). BaseCard conflict resolved.

## Phase 1: Foundation Tasks

### Task 1.1: Create Test Cards Infrastructure
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: None  

**Objective**: Set up test infrastructure for component comparison during migration.

**Subtasks**:
- [x] **Create test-cards page**:
   - File: `templates/nextjs/src/app/test-cards/page.tsx`
   - Use BentoLayout with 6-column grid
   - Each card spans 3 columns, 2 rows
   - Same media breakpoints for all cards

- [x] **Create test content directory**:
   - Directory: `templates/nextjs/src/content/test-cards/`
   - Create markdown files for each component being tested
   - Follow existing content schema patterns

- [x] **Set up comparison layout**:
   - Template for side-by-side comparison (old vs new)
   - Grid item wrapper for consistent sizing
   - Labels for "Template Version" and "UI-Core Version"

**Success Criteria**:
- [x] Test page renders without errors
- [x] Grid layout displays correctly on all screen sizes
- [x] Content loading works for test markdown files
- [x] Page is accessible via `/test-cards` route

**Files to Create**:
- `templates/nextjs/src/app/test-cards/page.tsx`
- `templates/nextjs/src/content/test-cards/feature-coming-soon.md`
- `templates/nextjs/src/content/test-cards/feature-guides.md`
- `templates/nextjs/src/content/test-cards/project-sample.md`
- `templates/nextjs/src/content/test-cards/quote-sample.md`
- `templates/nextjs/src/content/test-cards/video-sample.md`
- `templates/nextjs/src/content/test-cards/blog-posts.md` (for BlogIndexCard)

### Task 1.2: Resolve BaseCard Conflict
**Owner**: Junior AI  
**Estimated Time**: 1 hour  
**Dependencies**: Task 1.1  

**Objective**: Analyze and resolve differences between template BaseCard and ui-core BaseCard.

**Analysis Required**:
- [x] Compare `templates/nextjs/src/components/cards/BaseCard.tsx` vs `packages/ui-core/src/components/ui/BaseCard.tsx`
- [x] Identify functional differences
- [x] Determine if template version has unique features needed

**Resolution Options**:
- Option A: Use ui-core BaseCard everywhere (if functionally equivalent)
- Option B: Enhance ui-core BaseCard with template features
- Option C: Rename template version to avoid conflict

**Success Criteria**:
- [x] Conflict resolution documented
- [x] Single BaseCard implementation chosen
- [x] No breaking changes to existing functionality
- [x] Clear import path for all components

## Phase 2: Content-Driven Card Migration

### Task 2.1: Verify ComingSoonFeatureCard Exclusion
**Owner**: Junior AI  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 1.1, Task 1.2  

**Objective**: Confirm that ComingSoonFeatureCard is template-specific and does not require migration to ui-core.

**Verification Task**:
- [x] **Confirm component is template-specific**: Verify that ComingSoonFeatureCard contains project-specific content and styling that makes it unsuitable for framework-agnostic use in ui-core

### Task 2.2: Verify GuidesFeatureCard Exclusion  
**Owner**: Junior AI  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 2.1  

**Objective**: Confirm that GuidesFeatureCard is template-specific and does not require migration to ui-core.

**Verification Task**:
- [x] **Confirm component is template-specific**: Verify that GuidesFeatureCard contains project-specific content and styling that makes it unsuitable for framework-agnostic use in ui-core

### Task 2.3: Verify FeatureCardWrapper Exclusion
**Owner**: Junior AI  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 2.2  

**Objective**: Confirm that FeatureCardWrapper is template-specific and does not require migration to ui-core.

**Verification Task**:
- [x] **Confirm component is template-specific**: Verify that FeatureCardWrapper is only used for specific feature cards that won't be migrated to ui-core

### Task 2.4: Verify Container Components Exclusion
**Owner**: Junior AI  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 2.3  

**Objective**: Confirm that container components are not needed due to new explicit content loading approach.

**Verification Task**:
- [x] **Confirm containers are obsolete**: Verify that FeatureCardContainer, ProjectCardContainer, QuoteCardContainer, and VideoCardContainer are no longer needed with the new explicit content loading pattern

## Phase 3: Specialized Card Migration

### Task 3.1: Analyze SidebarPostCard for Equivalent Functionality  
**Owner**: Junior AI  
**Estimated Time**: 30 minutes  
**Dependencies**: Task 2.4  

**Objective**: Determine if SidebarPostCard functionality is already available in ui-core components.

**Analysis Tasks**:
- [x] **Compare with existing ui-core cards**: Review BlogCard, BlogCardImage, BlogCardWide, and ArticleCard to determine if SidebarPostCard functionality is already covered
- [x] **Document functionality gaps**: If unique functionality exists, document what would need to be added to existing components  
- [x] **Recommendation**: Provide recommendation on whether to migrate SidebarPostCard or enhance existing ui-core components
- [x] **Verify adapter usage patterns**: Confirmed current architecture uses direct dependency injection, not adapter wrappers

**Analysis Result**: SidebarPostCard fills unique gap for compact horizontal layout. **MIGRATE RECOMMENDED**.

### Task 3.2: Migrate SidebarPostCard  
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.1  

**Objective**: Migrate SidebarPostCard to ui-core with dependency injection support.

**Migration Steps**:
- [x] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/SidebarPostCard.tsx`
   - Remove Next.js Image/Link dependencies
   - Add ImageComponent/LinkComponent dependency injection
   - Preserve compact horizontal layout and styling
   - Maintain small thumbnail size (20-24px)

- [x] **Update test infrastructure**:
   - Add SidebarPostCard to test-cards page comparison
   - Create sample post content for testing
   - Test responsive behavior and compact layout

**Success Criteria**:
- [x] Compact layout preserved with small thumbnails
- [x] Image optimization works with dependency injection
- [x] Responsive design maintained
- [x] No adapter wrapper needed (uses direct injection pattern)

**Files to Create**:
- `packages/ui-core/src/components/cards/SidebarPostCard.tsx`

### Task 3.3: Clean Up Legacy Adapter Architecture
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.2  

**Objective**: Remove unused adapter components that are remnants of legacy architecture.

**Cleanup Tasks**:
- [x] **Remove unused adapter components**:
   - Remove `ArticleCardWithContent.tsx` and related components
   - Remove `BaseCardWithContent.tsx` 
   - Remove `ProjectCardWithContent.tsx`
   - Remove `QuoteCardWithContent.tsx`
   - Remove `BlogCardImageWithContent.tsx`
   - Clean up exports in `packages/ui-adapters/nextjs/src/components/index.ts`

- [x] **Update package dependencies**:
   - Remove `@manta-templates/ui-adapters-nextjs` from template package.json
   - Remove references from jest.config.js
   - Clean up build validation tests

- [x] **Clean up documentation references**:
   - Update or remove references in migration-guide.md
   - Remove commented imports in examples
   - Update content-loading-examples.tsx

**Success Criteria**:
- [x] No unused adapter components remain
- [x] Package builds successfully without adapter dependencies
- [x] Documentation reflects current direct injection pattern
- [x] All tests pass after cleanup

### Task 3.4: Migrate BlogIndexCard
**Owner**: Junior AI  
**Dependencies**: Task 3.3  

**Objective**: Migrate complex BlogIndexCard that loads and displays multiple posts.

**Migration Steps**:
- [x] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/BlogIndexCard.tsx`
   - Remove getAllContent dependency
   - Add ContentProvider for multiple content loading
   - Abstract content fetching logic

- [x] **Handle complex content loading**:
   - Support for loading multiple posts
   - Filtering and limiting functionality
   - Sorting by date

- [x] **Framework integration**:
   - Next.js adapter with server-side content loading
   - Preserve async functionality for server components

**Success Criteria**:
- [x] Multiple post loading works
- [x] Filtering and limiting functional
- [x] Date sorting preserved
- [x] Server component compatibility maintained

**Files to Create**:
- `packages/ui-core/src/components/cards/BlogIndexCard.tsx`
- `packages/ui-adapters/nextjs/src/components/BlogIndexCardWithContent.tsx`

## Phase 4: UI Component Migration

### Task 4.1: Migrate TechnologyScroller
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 3.4  

**Objective**: Migrate TechnologyScroller component to ui-core with dependency injection support.

**Migration Steps**:
- [x] **Create ui-core component**:
   - File: `packages/ui-core/src/components/ui/TechnologyScroller.tsx`
   - Remove Next.js Image dependency (currently uses standard img tag)
   - Add ImageComponent dependency injection for optimized images
   - Preserve all animation and styling functionality
   - Keep technology data interface and prop structure

- [x] **Follow direct injection pattern**:
   - No adapter wrapper needed (follows current architecture)
   - Uses ImageComponent dependency injection like other ui-core components

- [x] **Update test infrastructure**:
   - Add TechnologyScroller to test-cards page
   - Create sample technology data
   - Test all speed and direction options

- [x] **Update test-example-2**:
   - Replace template technology scroller with ui-core version in test-example-2 page
   - Have project manager verify that new version matches template version

**Success Criteria**:
- [x] Component renders identically to template version
- [x] All animation speeds and directions work correctly
- [x] Hover pause functionality preserved
- [x] Image optimization works with dependency injection
- [x] Technology data structure maintained
- [x] TypeScript types are complete and correct

**Files to Create**:
- `packages/ui-core/src/components/ui/TechnologyScroller.tsx`

## Phase 5: Performance Components

### Task 5.1: Verify VirtualCardList Exclusion
**Owner**: Junior AI  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 4.1  

**Objective**: Confirm that VirtualCardList is unused and can be excluded from migration.

**Verification Task**:
- [x] **Confirm component is unused**: Verify that VirtualCardList is not referenced anywhere in the codebase and is only present in the component definition file

### Task 5.2: Migrate ContentCard
**Owner**: Junior AI  
**Complexity**: 1 (Simple)  
**Dependencies**: Task 5.1  

**Objective**: Migrate ContentCard layout component to ui-core with dependency injection support.

**Migration Steps**:
- [x] **Create ui-core component**:
  - File: `packages/ui-core/src/components/layouts/ContentCard.tsx`
  - Simple wrapper around BaseCard with consistent styling
  - Currently used in legal, privacy, terms, and cookies pages

**Success Criteria**:
- [x] Component renders identically to template version
- [x] Maintains consistent padding and styling
- [x] Works with all BaseCard props
- [x] TypeScript types are complete

### Task 5.3: Migrate BrandMark Component
**Owner**: Junior AI  
**Complexity**: 1 (Simple)  
**Dependencies**: Task 5.2  

**Objective**: Migrate brand mark/logo component to ui-core.

**Migration Steps**:
- [x] **Create ui-core component**:
  - File: `packages/ui-core/src/components/ui/BrandMark.tsx`
  - SVG logo/brand component
  - Configurable size and colors
  - Link wrapper support
- [x] **Add to test-cards page**:
  - Include BrandMark in test-cards comparison
  - Test different size variants
  - Test color theming

**Success Criteria**:
- [x] Brand mark renders correctly
- [x] Size variants work
- [x] Color theming supported
- [x] Link wrapping optional
- [x] Component appears in test-cards page

### Task 5.4: Migrate ThemeToggle Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.3  

**Objective**: Migrate theme toggle component for dark/light mode switching.

**Migration Steps**:
- [ ] **Create ui-core component**:
  - File: `packages/ui-core/src/components/ui/ThemeToggle.tsx`
  - Framework-agnostic theme switching
  - Icon component dependency injection
- [ ] **Abstract theme context**:
  - Create theme provider interface
  - Support different theme implementations
- [ ] **Add to test-cards page**:
  - Include ThemeToggle in test-cards comparison
  - Test theme switching functionality
  - Test accessibility features

**Success Criteria**:
- [ ] Theme toggle works across frameworks
- [ ] Icon switching animation preserved
- [ ] Accessibility features maintained
- [ ] Works with different theme providers
- [ ] Component appears in test-cards page

### Task 5.5: Migrate Header Components
**Owner**: Junior AI  
**Complexity**: 3 (Moderate)  
**Dependencies**: Task 5.4  

**Objective**: Migrate header components to ui-core with dependency injection support.

**Migration Steps**:
- [ ] **Migrate DefaultHeader.tsx**:
  - Main header implementation with navigation
  - Add LinkComponent dependency injection
  - Preserve responsive behavior
- [ ] **Migrate header.tsx wrapper**:
  - Wrapper that selects header variant
  - Support configuration-based selection
- [ ] **Handle dependencies**:
  - Container component integration (already migrated)
  - Theme toggle integration (Task 5.4 dependency)
  - BrandMark integration (Task 5.3 dependency)
- [ ] **Add to test-cards page**:
  - Include Header in test-cards comparison
  - Test responsive behavior
  - Test navigation functionality

**Success Criteria**:
- [ ] Headers render identically to template versions
- [ ] Navigation works with dependency injection
- [ ] Responsive menu behavior preserved
- [ ] Theme toggle integration maintained
- [ ] Container width constraints work correctly
- [ ] Component appears in test-cards page

### Task 5.6: Migrate Footer Components
**Owner**: Junior AI  
**Complexity**: 4 (Complex)  
**Dependencies**: Task 5.5  

**Objective**: Migrate footer components to ui-core with full feature preservation.

**Analysis Required**:
- [ ] **Document footer features**:
  - DefaultFooter: Multi-column layout with sections
  - CompactFooter: Minimal single-row layout
  - Dynamic content loading from footerContent
  - Legal links configuration
  - Contact information display
  - Social links integration
  - Theme toggle placement
- [ ] **Identify dependencies**:
  - FooterContent loading system
  - Site configuration integration
  - Icon components (lucide-react)

**Migration Steps**:
- [ ] **Migrate DefaultFooter.tsx**:
  - Multi-column responsive layout
  - Section-based content organization
  - External link indicators
  - Contact information display
- [ ] **Migrate CompactFooter.tsx**:
  - Single-row minimal layout
  - Essential links only
  - Mobile-optimized design
- [ ] **Migrate footer.tsx wrapper**:
  - Variant selection logic
  - Configuration-based switching
- [ ] **Create content abstraction**:
  - FooterContent interface
  - Dependency injection for content loading
- [ ] **Add to test-cards page**:
  - Include both Footer variants in test-cards comparison
  - Test content loading functionality
  - Test responsive layouts

**Success Criteria**:
- [ ] Both footer variants render correctly
- [ ] Content loading abstraction works
- [ ] Legal links configurable
- [ ] Responsive layouts maintained
- [ ] External link indicators work
- [ ] Theme toggle integration preserved
- [ ] Components appear in test-cards page

### Task 5.7: Migrate ComingSoonOverlay Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.6  

**Objective**: Migrate coming soon overlay component with updates for reusability.

**Migration Steps**:
- [ ] **Create ui-core component**:
  - File: `packages/ui-core/src/components/overlays/ComingSoonOverlay.tsx`
  - Full-screen overlay design
  - Customizable messaging
  - Optional countdown timer support
- [ ] **Update for flexibility**:
  - Configurable text and styling
  - Optional email capture
  - Animation support
- [ ] **Add to test-cards page**:
  - Include ComingSoonOverlay in test-cards comparison
  - Test customizable content
  - Test responsive behavior

**Success Criteria**:
- [ ] Overlay displays correctly
- [ ] Customizable content works
- [ ] Responsive design maintained
- [ ] Optional features configurable
- [ ] Component appears in test-cards page

### Task 5.8: Migrate Container Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.7  

**Objective**: Migrate container layout component for consistent width constraints.

**Analysis Notes**:
- Currently used in multiple components (headers, pages, cards)
- Provides responsive max-width constraints
- Essential for layout consistency

**Migration Steps**:
- [x] **Create ui-core component**:
  - File: `packages/ui-core/src/components/layouts/Container.tsx`
  - Configurable max-width options
  - Responsive breakpoints
  - Padding management

**Success Criteria**:
- [x] Container width constraints work
- [x] All size variants supported
- [x] Responsive behavior maintained
- [x] Compatible with existing layouts

**Note**: Container component was already migrated to ui-core in previous work.

## Phase 6: Testing and Integration

### Task 6.1: Comprehensive Component Testing
**Owner**: Junior AI (use tester agent)  
**Estimated Time**: 4 hours  
**Dependencies**: Task 5.1  

**Objective**: Create comprehensive test suite for all migrated components.

**Testing Strategy**:
- [ ] **Unit tests for each component**:
   - Render tests with various props
   - Content loading scenarios
   - Error state handling
   - Dependency injection validation

- [ ] **Integration tests**:
   - Framework adapter functionality
   - ContentProvider integration
   - Cross-framework compatibility

- [ ] **Visual regression tests**:
   - Component appearance comparison
   - Responsive behavior
   - Animation and interaction states

**Success Criteria**:
- [ ] All components have >90% test coverage
- [ ] Framework adapters tested
- [ ] Visual regression tests pass
- [ ] Performance tests within acceptable limits

### Task 6.2: Update Documentation and Exports
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 6.1  

**Objective**: Update package exports and documentation for new components.

**Documentation Tasks**:
- [ ] **Update ui-core exports**:
   - Add all new components to `packages/ui-core/src/index.ts`
   - Create category-based exports (cards, layouts)
   - Update package.json if needed

- [ ] **Update adapter exports**:
   - Export all framework-specific wrapper components
   - Update Next.js adapter index file

- [ ] **Create migration guide**:
   - Document import path changes
   - Provide example usage for each component
   - Include framework-specific notes

**Success Criteria**:
- [ ] All components exported correctly
- [ ] Import paths documented
- [ ] Migration examples provided
- [ ] Framework compatibility documented

## Success Metrics

### Technical Metrics
- [x] **Component Parity**: In progress - 4/11 Priority 1 components successfully migrated to ui-core (SidebarPostCard, Adapter Cleanup, BlogIndexCard, and TechnologyScroller)
- [ ] **Framework Support**: All components work in Next.js with adapters
- [ ] **Type Safety**: Zero TypeScript errors across all packages
- [ ] **Performance**: <5% performance overhead from abstraction
- [ ] **Test Coverage**: >90% test coverage for all migrated components

### Quality Metrics
- [ ] **Visual Fidelity**: ui-core versions render identically to template versions
- [ ] **Functionality**: All features preserved during migration
- [ ] **Content Integration**: All content-driven features work with ContentProvider
- [ ] **Developer Experience**: Clear migration path with comprehensive documentation

## Risk Mitigation

### Technical Risks
1. **Complex Dependencies**: Some components have intricate Next.js dependencies
   - **Mitigation**: Careful dependency analysis, abstraction where needed

2. **Performance Impact**: Abstraction layers affecting component performance
   - **Mitigation**: Performance testing, framework-specific optimizations

### Process Risks
1. **Scope Creep**: Discovering additional component dependencies during migration
   - **Mitigation**: Thorough upfront analysis, clear scope boundaries

2. **Breaking Changes**: Accidentally breaking existing template functionality
   - **Mitigation**: Side-by-side testing, comprehensive test coverage

## Next Steps
After completing Priority 1 components:
1. Evaluate for Priority 2 (Content Loaders) migration
2. Assess Priority 3 (Headers/Footers) requirements
3. Plan Priority 4 (Critical UI) component migration
4. Begin Slice 10 (Testing Infrastructure) preparation