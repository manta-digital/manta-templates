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
| `ComingSoonFeatureCard.tsx` | **NEEDED** | Specialized announcement/roadmap card with unique animations | ✅ Yes - FeatureContent |
| `EnhancedBaseCard.tsx` | **SKIP** | Simple wrapper around ShadCN Card - functionality exists in ui-core BaseCard | ❌ No |
| `FeatureCardContainer.tsx` | **NEEDED** | Content-loading orchestrator for different feature card types | ✅ Yes - FeatureContent |
| `FeatureCardWrapper.tsx` | **NEEDED** | Reusable wrapper with mode-based styling for feature cards | ❌ No - but supports content cards |
| `GuidesFeatureCard.tsx` | **NEEDED** | Complex documentation/guides card with grid layout | ✅ Yes - FeatureContent |
| `ProjectCardContainer.tsx` | **NEEDED** | Content loader for project cards, delegates to ProjectCard | ✅ Yes - ProjectContent |
| `QuoteCardContainer.tsx` | **NEEDED** | Content loader for quote cards | ✅ Yes - QuoteContent |
| `SidebarPostCard.tsx` | **NEEDED** | Compact card for sidebar/list layouts | ✅ Yes - PostContent |
| `VideoCardContainer.tsx` | **NEEDED** | Content loader for video cards | ✅ Yes - VideoContent |
| `articles/BlogIndexCard.tsx` | **NEEDED** | Loads and displays list of recent articles | ✅ Yes - PostContent |
| `layouts/VirtualCardList.tsx` | **NEEDED** | Performance-critical virtualized list component | ❌ No - utility component |
| `BaseCard.tsx` conflict | **RESOLVE** | Determine differences between template and ui-core versions | ❌ No |

**Result**: 11 out of 12 components needed (skip EnhancedBaseCard, resolve BaseCard conflict)

## Phase 1: Foundation Tasks

### Task 1.1: Create Test Cards Infrastructure
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: None  

**Objective**: Set up test infrastructure for component comparison during migration.

**Subtasks**:
- [ ] **Create test-cards page**:
   - File: `templates/nextjs/src/app/test-cards/page.tsx`
   - Use BentoLayout with 6-column grid
   - Each card spans 3 columns, 2 rows
   - Same media breakpoints for all cards

- [ ] **Create test content directory**:
   - Directory: `templates/nextjs/src/content/test-cards/`
   - Create markdown files for each component being tested
   - Follow existing content schema patterns

- [ ] **Set up comparison layout**:
   - Template for side-by-side comparison (old vs new)
   - Grid item wrapper for consistent sizing
   - Labels for "Template Version" and "UI-Core Version"

**Success Criteria**:
- [ ] Test page renders without errors
- [ ] Grid layout displays correctly on all screen sizes
- [ ] Content loading works for test markdown files
- [ ] Page is accessible via `/test-cards` route

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
- [ ] Compare `templates/nextjs/src/components/cards/BaseCard.tsx` vs `packages/ui-core/src/components/ui/BaseCard.tsx`
- [ ] Identify functional differences
- [ ] Determine if template version has unique features needed

**Resolution Options**:
- Option A: Use ui-core BaseCard everywhere (if functionally equivalent)
- Option B: Enhance ui-core BaseCard with template features
- Option C: Rename template version to avoid conflict

**Success Criteria**:
- [ ] Conflict resolution documented
- [ ] Single BaseCard implementation chosen
- [ ] No breaking changes to existing functionality
- [ ] Clear import path for all components

## Phase 2: Content-Driven Card Migration

### Task 2.1: Migrate ComingSoonFeatureCard
**Owner**: Junior AI  
**Estimated Time**: 3 hours  
**Dependencies**: Task 1.1, Task 1.2  

**Objective**: Migrate ComingSoonFeatureCard to ui-core with full dependency injection support.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/ComingSoonFeatureCard.tsx`
   - Remove Next.js dependencies (next/image, next/link)
   - Add ImageComponent and LinkComponent dependency injection
   - Preserve animated dots and all styling

- [ ] **Add ContentProvider support**:
   - Accept contentProvider prop for FeatureContent loading
   - Maintain fallback to hardcoded props
   - Support content-driven mode switching

- [ ] **Update test page**:
   - Add ComingSoonFeatureCard comparison to test-cards page
   - Use test content from `content/test-cards/feature-coming-soon.md`
   - Display both template and ui-core versions side-by-side

- [ ] **Create framework adapters**:
   - Next.js adapter: `packages/ui-adapters/nextjs/src/components/ComingSoonFeatureCardWithContent.tsx`
   - Include Next.js Image/Link injection

**Success Criteria**:
- [ ] ui-core component renders identically to template version
- [ ] Content loading works with ContentProvider
- [ ] Next.js adapter provides drop-in replacement
- [ ] All animations and interactivity preserved
- [ ] TypeScript types are complete and correct

**Files to Create**:
- `packages/ui-core/src/components/cards/ComingSoonFeatureCard.tsx`
- `packages/ui-adapters/nextjs/src/components/ComingSoonFeatureCardWithContent.tsx`
- Test content: `templates/nextjs/src/content/test-cards/feature-coming-soon.md`

### Task 2.2: Migrate GuidesFeatureCard
**Owner**: Junior AI  
**Estimated Time**: 4 hours  
**Dependencies**: Task 2.1  

**Objective**: Migrate complex GuidesFeatureCard with grid layout and documentation features.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/GuidesFeatureCard.tsx`
   - Remove Next.js dependencies
   - Add dependency injection for Image, Link, and ComingSoonOverlay
   - Preserve complex grid layout and styling

- [ ] **Handle complex dependencies**:
   - Abstract GridLayout dependency (already in ui-core)
   - Handle ComingSoonOverlay component dependency
   - Maintain icon mapping functionality

- [ ] **Add content support**:
   - Support FeatureContent with guides category
   - Maintain documentation grid structure
   - Preserve code block styling and interactions

- [ ] **Update test infrastructure**:
   - Add to test-cards comparison page
   - Create comprehensive test content
   - Test all interactive elements

**Success Criteria**:
- [ ] Complex layout renders correctly
- [ ] All documentation links work
- [ ] Code block styling preserved
- [ ] ComingSoonOverlay integration works
- [ ] Content-driven features functional

**Files to Create**:
- `packages/ui-core/src/components/cards/GuidesFeatureCard.tsx`
- `packages/ui-adapters/nextjs/src/components/GuidesFeatureCardWithContent.tsx`
- Test content: `templates/nextjs/src/content/test-cards/feature-guides.md`

### Task 2.3: Migrate FeatureCardWrapper
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.2  

**Objective**: Migrate FeatureCardWrapper as reusable wrapper for feature cards.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/FeatureCardWrapper.tsx`
   - Preserve mode-based styling (light/dark)
   - Maintain hover animations and gradients
   - No framework dependencies needed

- [ ] **Update existing feature cards**:
   - Update ComingSoonFeatureCard to use ui-core FeatureCardWrapper
   - Update GuidesFeatureCard to use ui-core FeatureCardWrapper
   - Ensure consistent styling across cards

**Success Criteria**:
- [ ] Wrapper component works with all feature cards
- [ ] Mode switching (light/dark) functions correctly
- [ ] Hover animations preserved
- [ ] Consistent styling maintained

**Files to Create**:
- `packages/ui-core/src/components/cards/FeatureCardWrapper.tsx`

### Task 2.4: Migrate Container Components
**Owner**: Junior AI  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.3  

**Objective**: Migrate content-loading container components to ui-core.

**Components in Scope**:
- FeatureCardContainer.tsx
- ProjectCardContainer.tsx  
- QuoteCardContainer.tsx
- VideoCardContainer.tsx

**Migration Strategy**:
- [ ] **Create generic container pattern**:
   - Base container component with ContentProvider integration
   - Framework-agnostic content loading
   - Error handling and fallback support

- [ ] **Migrate each container**:
   - `packages/ui-core/src/components/cards/FeatureCardContainer.tsx`
   - `packages/ui-core/src/components/cards/ProjectCardContainer.tsx`
   - `packages/ui-core/src/components/cards/QuoteCardContainer.tsx`
   - `packages/ui-core/src/components/cards/VideoCardContainer.tsx`

- [ ] **Framework adapters**:
   - Next.js versions that use Next.js ContentProvider
   - Preserve async/await patterns for server components

**Success Criteria**:
- [ ] All containers load content correctly
- [ ] Error handling works for missing content
- [ ] Content type routing functions properly
- [ ] Framework adapters provide seamless integration

## Phase 3: Specialized Card Migration

### Task 3.1: Migrate SidebarPostCard
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 2.4  

**Objective**: Migrate compact sidebar card component with dependency injection.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/SidebarPostCard.tsx`
   - Remove Next.js Image/Link dependencies
   - Add ImageComponent/LinkComponent props
   - Preserve compact layout and styling

- [ ] **Add content support**:
   - Support for PostContent type
   - ContentProvider integration for dynamic loading
   - Fallback to direct props

- [ ] **Test integration**:
   - Add to test-cards page
   - Create sample post content
   - Test responsive behavior

**Success Criteria**:
- [ ] Compact layout preserved
- [ ] Image optimization works with dependency injection
- [ ] Content loading functional
- [ ] Responsive design maintained

**Files to Create**:
- `packages/ui-core/src/components/cards/SidebarPostCard.tsx`
- `packages/ui-adapters/nextjs/src/components/SidebarPostCardWithContent.tsx`

### Task 3.2: Migrate BlogIndexCard
**Owner**: Junior AI  
**Estimated Time**: 4 hours  
**Dependencies**: Task 3.1  

**Objective**: Migrate complex BlogIndexCard that loads and displays multiple posts.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/cards/BlogIndexCard.tsx`
   - Remove getAllContent dependency
   - Add ContentProvider for multiple content loading
   - Abstract content fetching logic

- [ ] **Handle complex content loading**:
   - Support for loading multiple posts
   - Filtering and limiting functionality
   - Sorting by date

- [ ] **Framework integration**:
   - Next.js adapter with server-side content loading
   - Preserve async functionality for server components

**Success Criteria**:
- [ ] Multiple post loading works
- [ ] Filtering and limiting functional
- [ ] Date sorting preserved
- [ ] Server component compatibility maintained

**Files to Create**:
- `packages/ui-core/src/components/cards/BlogIndexCard.tsx`
- `packages/ui-adapters/nextjs/src/components/BlogIndexCardWithContent.tsx`

## Phase 4: Performance Components

### Task 4.1: Migrate VirtualCardList
**Owner**: Junior AI  
**Estimated Time**: 3 hours  
**Dependencies**: Task 3.2  

**Objective**: Migrate performance-critical virtualized list component.

**Migration Steps**:
- [ ] **Create ui-core component**:
   - File: `packages/ui-core/src/components/layouts/VirtualCardList.tsx`
   - Pure React implementation (no framework dependencies)
   - Preserve all virtualization logic
   - Maintain performance optimizations

- [ ] **Test performance**:
   - Create test with large dataset (1000+ items)
   - Verify scrolling performance
   - Test infinite loading functionality

**Success Criteria**:
- [ ] Virtualization performance maintained
- [ ] All scroll features work correctly
- [ ] Memory usage optimized
- [ ] Infinite loading functional

**Files to Create**:
- `packages/ui-core/src/components/layouts/VirtualCardList.tsx`

## Phase 5: Testing and Integration

### Task 5.1: Comprehensive Component Testing
**Owner**: Junior AI (use tester agent)  
**Estimated Time**: 4 hours  
**Dependencies**: Task 4.1  

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

### Task 5.2: Update Documentation and Exports
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 5.1  

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
- [ ] **Component Parity**: 11 Priority 1 components successfully migrated to ui-core
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