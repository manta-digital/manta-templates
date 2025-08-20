---
layer: project
docType: tasks
slice: markdown-content
phase: 3
project: manta-templates
priority: P1
dependencies:
  - Task 3.3.2 completed (test-example-2 transformation)
  - ui-adapters/nextjs package structure exists
  - ArticleCardWithContent pattern established
currentProjectState: test-example-2 uses hardcoded content data, needs adapter components. ui-core components need content provider pattern before adapters can be created.
lastUpdated: 2025-08-20
completedTasks:
  - Task 1.5.1: Added Content Provider Pattern to ProjectCard
  - Task 1.5.2: Added Content Provider Pattern to QuoteCard
  - Task 1.5.3: Added Content Provider Pattern to BlogCardImage
  - Task 1.5.4: Updated ui-core Package Exports
revisionNote: Added Phase 1.5 for ui-core content provider support. This is required before creating adapter components.
---

# Tasks: UI Adapters Completion - Missing Component Adapters

## Context Summary

The ui-adapters package is designed to provide framework-agnostic content loading for UI components, but currently only has `ArticleCardWithContent`. We need to create adapter components for all the cards used in test-example-2 to enable clean slug-based content loading.

**Current State:**
- ✅ `ArticleCardWithContent` exists and works
- ✅ `ArticleCard` in ui-core supports content provider pattern
- ❌ Missing `BaseCardWithContent` adapter
- ⚠️ `ProjectCard` in ui-core partially supports content provider pattern
- ❌ `QuoteCard` in ui-core lacks content provider support  
- ❌ `BlogCardImage` in ui-core lacks content provider support
- ✅ `ProjectCardWithContent` adapter exists
- ❌ Missing `QuoteCardWithContent` adapter
- ❌ Missing `BlogCardImageWithContent` adapter


**Target Usage:**
```typescript
// Instead of manual content loading
const content = await getProjectBySlug('carousel-project');
<ProjectCard content={content.frontmatter} />

// Clean adapter approach
<ProjectCardWithContent slug="carousel-project" contentType="example-2" />
```

## Phase 1: Component Analysis and Planning

### Task 1.1: Analyze ui-core Card Components
**Priority:** P0 - Foundation
**Estimated Time:** 30 minutes
**Dependencies:** None

Analyze each ui-core card component to understand their prop interfaces and content requirements.

**Components to Analyze:**
1. `ProjectCard` - props structure, content interface, required fields
2. `QuoteCard` - props structure, content interface, required fields  
3. `BlogCardImage` - props structure, content interface, required fields
4. `BaseCard` - props structure, content interface, required fields

**Implementation Steps:**
1. Read each component's TypeScript interface
2. Document required vs optional props
3. Identify which props come from content vs direct props
4. Map content schema fields to component props
5. Document any Next.js specific requirements (Image, Link, etc.)

**Success Criteria:**
- [x] Complete prop interface documentation for each component
- [x] Content mapping documented (schema field → component prop)
- [x] Next.js specific requirements identified
- [x] Adapter design pattern established

**Deliverables:**
- Component analysis document with prop mappings

### Task 1.2: Review Existing ArticleCardWithContent Pattern
**Priority:** P0 - Foundation  
**Estimated Time:** 15 minutes
**Dependencies:** Task 1.1

Study the existing `ArticleCardWithContent` to establish the pattern for new adapters.

**Analysis Points:**
1. How content loading is implemented
2. Error handling patterns
3. Loading state management
4. TypeScript interface design
5. Next.js component integration (Image, Link)
6. Default props and fallback behavior

**Success Criteria:**
- [x] Pattern documentation complete
- [x] Template structure identified for new adapters
- [x] Common utilities and helpers identified

### Task 1.3: Analyze Content Provider Requirements
**Priority:** P0 - Foundation  
**Estimated Time:** 15 minutes
**Dependencies:** Task 1.2

Analyze what changes are needed to add content provider support to ui-core components.

**Analysis Points:**
1. Compare ArticleCard with ProjectCard, QuoteCard, BlogCardImage
2. Identify missing content provider props and state management
3. Document required interfaces and hooks to add
4. Plan implementation approach for each component

**Success Criteria:**
- [x] Content provider gap analysis complete
- [x] Required changes documented for each component
- [x] Implementation approach planned

## Phase 1.5: Add Content Provider Support to ui-core Components

### Task 1.5.1: Add Content Provider Pattern to ProjectCard
**Priority:** P0 - Critical Foundation
**Estimated Time:** 60 minutes
**Dependencies:** Task 1.3

Add content loading capabilities to ProjectCard in ui-core to match ArticleCard pattern.

**Implementation Steps:**
1. Add content provider props to ProjectCardProps interface:
   - `contentProvider?: ContentProvider<ProjectContent>`
   - `contentSlug?: string`
   - `contentType?: string`
   - `showLoadingIndicator?: boolean`
   - `LoadingComponent?: ComponentType`
   - `ErrorComponent?: ComponentType<{ error: Error; retry: () => void }>`
2. Add state management hooks (useState, useEffect)
3. Implement content loading logic with error handling
4. Add content merging logic (direct props override loaded content)
5. Add loading and error state rendering
6. Update TypeScript interfaces and exports

**Success Criteria:**
- [x] ProjectCard supports contentProvider prop
- [x] Content loading and error handling works
- [x] Loading states render correctly
- [x] Direct props override loaded content properly
- [x] TypeScript interfaces are complete
- [x] No breaking changes to existing usage

**Files Modified:**
- `packages/ui-core/src/components/cards/ProjectCard.tsx`

### Task 1.5.2: Add Content Provider Pattern to QuoteCard
**Priority:** P0 - Critical Foundation
**Estimated Time:** 45 minutes
**Dependencies:** Task 1.5.1

Add content loading capabilities to QuoteCard in ui-core.

**Implementation Steps:**
1. Add content provider props following ProjectCard pattern
2. Add state management for QuoteContent loading
3. Implement content loading with error handling
4. Add content merging logic
5. Update TypeScript interfaces

**Success Criteria:**
- [x] QuoteCard supports contentProvider prop
- [x] Content loading works for quote content
- [x] Error handling and fallbacks work
- [x] TypeScript interfaces complete

**Files Modified:**
- `packages/ui-core/src/components/cards/QuoteCard.tsx`

### Task 1.5.3: Add Content Provider Pattern to BlogCardImage
**Priority:** P0 - Critical Foundation
**Estimated Time:** 50 minutes
**Dependencies:** Task 1.5.2

Add content loading capabilities to BlogCardImage in ui-core.

**Implementation Steps:**
1. Add content provider props following established pattern
2. Add state management for article/blog content loading
3. Implement content loading with error handling
4. Add content merging logic for image URLs and text content
5. Update TypeScript interfaces

**Success Criteria:**
- [x] BlogCardImage supports contentProvider prop
- [x] Content loading works for blog/article content
- [x] Image loading and optimization preserved
- [x] Error handling and fallbacks work
- [x] TypeScript interfaces complete

**Files Modified:**
- `packages/ui-core/src/components/cards/BlogCardImage.tsx`

### Task 1.5.4: Update ui-core Package Exports
**Priority:** P0 - Critical Foundation
**Estimated Time:** 10 minutes
**Dependencies:** Tasks 1.5.1-1.5.3

Update ui-core exports to include new content provider types and interfaces.

**Implementation Steps:**
1. Export updated component interfaces
2. Ensure ContentProvider types are available
3. Update index.ts files as needed
4. Verify no circular dependencies

**Success Criteria:**
- [x] All updated interfaces exported
- [x] No build errors
- [x] TypeScript compilation succeeds

**Files Modified:**
- `packages/ui-core/src/components/cards/index.ts`
- `packages/ui-core/src/index.ts` (if needed)

## Phase 2: Core Adapter Implementation

### Task 2.1: Create BaseCardWithContent
**Priority:** P0 - Foundation Pattern
**Estimated Time:** 25 minutes  
**Dependencies:** Task 1.5.4

Create the simplest generic BaseCard adapter first to establish the foundational pattern for other adapters.

**Why First:** BaseCard is the simplest component without complex prop mapping or Next.js integrations, making it the ideal foundation pattern.

**Implementation Steps:**
1. Create `BaseCardWithContent.tsx` in `packages/ui-adapters/nextjs/src/components/`
2. Follow ArticleCardWithContent pattern structure
3. Create flexible content mapping (works with any schema)
4. Allow custom content rendering via render props
5. Add proper TypeScript interfaces with generics
6. Include loading and error states
7. Add JSDoc documentation with usage examples

**Required Props Interface:**
```typescript
interface BaseCardWithContentProps<T = any> {
  slug: string;
  contentType: string;
  className?: string;
  children: (content: T) => React.ReactNode;
  // Fallback content
  fallbackContent?: T;
  showLoadingIndicator?: boolean;
}
```

**Success Criteria:**
- [x] Component loads any content type by slug
- [x] Flexible render prop pattern works
- [x] Generic TypeScript interfaces
- [x] Proper error handling with fallbacks
- [x] Loading states work correctly
- [x] Pattern established for other adapters to follow

**Files Created:**
- `packages/ui-adapters/nextjs/src/components/BaseCardWithContent.tsx`

### Task 2.2: Create ProjectCardWithContent
**Priority:** P0 - Critical Path
**Estimated Time:** 30 minutes
**Dependencies:** Task 2.1 (pattern established)

Create the ProjectCard adapter following the BaseCard pattern.

**Implementation Steps:**
1. Create `ProjectCardWithContent.tsx` following BaseCard pattern
2. Map Project schema to ProjectCard props
3. Configure Next.js Image and Link components with defaults
4. Pass contentProvider, slug, and contentType to updated ProjectCard
5. Add proper TypeScript interfaces
6. Add JSDoc documentation

**Required Props Interface:**
```typescript
interface ProjectCardWithContentProps {
  slug: string;
  contentType?: string; // defaults to 'projects'
  className?: string;
  displayVariant?: 'showcase' | 'compact';
  // Fallback props if content loading fails
  title?: string;
  description?: string;
  techStack?: string[];
  // ... other fallback props
}
```

**Success Criteria:**
- [x] Component loads project content by slug using ui-core ProjectCard
- [x] Next.js Image and Link components configured properly
- [x] TypeScript interfaces are complete
- [x] Follows BaseCardWithContent pattern

**Files Created:**
- `packages/ui-adapters/nextjs/src/components/ProjectCardWithContent.tsx`

### Task 2.3: Create QuoteCardWithContent  
**Priority:** P0 - Critical Path
**Estimated Time:** 20 minutes
**Dependencies:** Task 2.1 (pattern established)

Create the QuoteCard adapter following the established pattern.

**Implementation Steps:**
1. Create `QuoteCardWithContent.tsx` following BaseCard pattern
2. Map Quote schema to QuoteCard props
3. Handle simple text content (no images/links needed)
4. Add proper TypeScript interfaces
5. Include loading and error states
6. Add JSDoc documentation

**Required Props Interface:**
```typescript
interface QuoteCardWithContentProps {
  slug: string;
  contentType?: string; // defaults to 'quotes'
  className?: string;
  // Fallback props
  quote?: string;
  author?: string;
  context?: string;
}
```

**Success Criteria:**
- [x] Component loads quote content by slug
- [x] Proper error handling with fallbacks
- [x] TypeScript interfaces are complete
- [x] Loading states work correctly

**Files Created:**
- `packages/ui-adapters/nextjs/src/components/QuoteCardWithContent.tsx`

### Task 2.4: Create BlogCardImageWithContent
**Priority:** P0 - Critical Path  
**Estimated Time:** 25 minutes
**Dependencies:** Task 2.1 (pattern established)

Create the BlogCardImage adapter following the established pattern.

**Implementation Steps:**
1. Create `BlogCardImageWithContent.tsx` following BaseCard pattern
2. Map Article schema to BlogCardImage props
3. Handle Next.js Image component for cover images
4. Handle Next.js Link component for article URLs
5. Add proper TypeScript interfaces
6. Include loading and error states
7. Add JSDoc documentation

**Required Props Interface:**
```typescript
interface BlogCardImageWithContentProps {
  slug: string;
  contentType?: string; // defaults to 'articles'
  className?: string;
  textColorClassName?: string;
  href?: string; // override default slug-based URL
  // Fallback props
  title?: string;
  excerpt?: string;
  coverImageUrl?: string;
}
```

**Success Criteria:**
- [x] Component loads article content by slug
- [x] Next.js Image optimization for cover images
- [x] Next.js Link integration for article URLs
- [x] Proper error handling with fallbacks
- [x] TypeScript interfaces are complete
- [x] Loading states work correctly

**Files Created:**
- `packages/ui-adapters/nextjs/src/components/BlogCardImageWithContent.tsx`

## Phase 3: Integration and Testing

### Task 3.1: Update Package Exports
**Priority:** P0 - Critical Path
**Estimated Time:** 15 minutes
**Dependencies:** Tasks 2.1-2.4

Update the index.ts files to export the new adapter components.

**Implementation Steps:**
1. Update `packages/ui-adapters/nextjs/src/components/index.ts`
2. Add exports for all new adapter components
3. Add TypeScript type exports
4. Ensure no circular dependencies

**Success Criteria:**
- [ ] All new components are properly exported
- [ ] TypeScript types are exported
- [ ] No build errors or circular dependencies

**Files Modified:**
- `packages/ui-adapters/nextjs/src/components/index.ts`

### Task 3.2: Transform test-example-2 to Use Adapters
**Priority:** P0 - Critical Path
**Estimated Time:** 30 minutes
**Dependencies:** Task 3.1

Replace the hardcoded content data in test-example-2 with adapter components.

**Implementation Steps:**
1. Import adapter components from `@manta-templates/ui-adapters/nextjs`
2. Replace hardcoded content with adapter component usage
3. Remove static contentData object
4. Update imports to remove unused content loading functions
5. Test that page renders correctly

**Target Transformation:**
```typescript
// Before
const carouselHeroContent = contentData.carouselHero;
<BlogCardImage title={carouselHeroContent.frontmatter.title} ... />

// After  
<BlogCardImageWithContent slug="carousel-hero" contentType="example-2" className="h-full" />
```

**Success Criteria:**
- [ ] All hardcoded content replaced with adapter components
- [ ] Page renders identically to before
- [ ] Content loads from actual markdown files
- [ ] All responsive behavior preserved
- [ ] Error handling works correctly

**Files Modified:**
- `templates/nextjs/src/app/test-example-2/page.tsx`

### Task 3.3: Create Validation Tests
**Priority:** P1 - Important
**Estimated Time:** 45 minutes
**Dependencies:** Task 3.2

Create tests to validate that all adapter components work correctly.

**Implementation Steps:**
1. Create test file for adapter components in appropriate test directory
2. Test content loading for each adapter (BaseCard, ProjectCard, QuoteCard, BlogCardImage)
3. Test error handling and fallback behavior for all components
4. Test TypeScript type safety and generic type inference
5. Test Next.js specific features (Image, Link) where applicable
6. Test render prop pattern in BaseCardWithContent

**Test Cases by Component:**
- **BaseCardWithContent**: Generic content loading, render props, type inference
- **ProjectCardWithContent**: Project schema mapping, tech stack display
- **QuoteCardWithContent**: Simple text content, author attribution
- **BlogCardImageWithContent**: Image optimization, link prefetching, cover images
- **Cross-cutting**: Loading states, error handling, fallback behavior

**Success Criteria:**
- [ ] All adapter components pass tests
- [ ] Error scenarios are properly handled
- [ ] TypeScript compilation succeeds
- [ ] Next.js features work correctly
- [ ] Render prop pattern tested in BaseCard
- [ ] Generic type inference works correctly

**Files Created:**
- `packages/ui-adapters/nextjs/src/__tests__/adapter-components.test.tsx`

## Phase 4: Documentation and Optimization

### Task 4.1: Create Usage Documentation
**Priority:** P2 - Important
**Estimated Time:** 30 minutes
**Dependencies:** Task 3.3

Create comprehensive documentation for the adapter components.

**Implementation Steps:**
1. Document each adapter component with examples
2. Show migration path from manual content loading
3. Document error handling and fallback strategies
4. Create troubleshooting guide
5. Add performance considerations

**Success Criteria:**
- [ ] Complete usage examples for each adapter
- [ ] Migration guide from hardcoded content
- [ ] Error handling documentation
- [ ] Performance optimization tips

**Files Created:**
- `packages/ui-adapters/nextjs/README.md` (update)
- `docs/ui-adapters-usage.md`

### Task 4.2: Performance Optimization
**Priority:** P2 - Enhancement
**Estimated Time:** 30 minutes
**Dependencies:** Task 4.1

Optimize adapter components for performance.

**Implementation Steps:**
1. Add memoization where appropriate
2. Optimize content provider caching
3. Add preloading capabilities
4. Profile bundle size impact

**Success Criteria:**
- [ ] Components are properly memoized
- [ ] Content caching works efficiently
- [ ] Bundle size impact is minimal
- [ ] Performance meets requirements

## Success Criteria Summary

### Phase Complete When:
1. **ui-core Content Support**: ProjectCard, QuoteCard, BlogCardImage support content provider pattern
2. **All Adapter Components**: ProjectCard, QuoteCard, BlogCardImage, BaseCard adapters created
3. **Clean API**: Simple slug-based content loading works for all components
4. **Framework Integration**: Next.js Image and Link components properly integrated
5. **Error Handling**: Graceful fallbacks and error states implemented
6. **Type Safety**: Full TypeScript support with proper type inference
7. **Testing**: All components tested and validated
8. **Documentation**: Usage examples and migration guides complete

### Quality Gates:
- [ ] All adapter components build without errors
- [ ] test-example-2 page works with adapter components
- [ ] Visual appearance identical to before
- [ ] All tests pass
- [ ] TypeScript compilation succeeds
- [ ] Documentation is complete

### Deliverables:
- Updated ProjectCard in ui-core with content provider support
- Updated QuoteCard in ui-core with content provider support
- Updated BlogCardImage in ui-core with content provider support
- ProjectCardWithContent adapter component
- QuoteCardWithContent adapter component  
- BlogCardImageWithContent adapter component
- BaseCardWithContent adapter component
- Updated test-example-2 using adapters
- Comprehensive test suite
- Usage documentation and migration guide
- Performance optimizations