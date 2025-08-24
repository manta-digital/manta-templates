---
layer: project
docType: tasks
slice: template-migration
project: manta-templates
phase: 6
part: 1
partName: analysis-and-planning
lldRef: project-artifacts/nextjs-template/slices/10-slice.template-migration.md
dependencies:
  - Slice 09: Component Parity (COMPLETED)
  - ui-core package building successfully
  - test-cards page demonstrating component parity
status: ready
priority: CRITICAL
lastUpdated: 2025-08-23
---

# Tasks: Template Migration Part 1 - Analysis and Planning

## Context Summary

**CRITICAL ISSUE**: Despite achieving component parity in Slice 09, `templates/nextjs` still imports components from local directories (`@/components/*`) instead of ui-core (`@manta-templates/ui-core`). This blocks deployment and makes the template unusable as an actual template.

**Current State**: Template uses local components  
**Required State**: Template consumes ui-core package  
**Impact**: Without this migration, the entire manta-templates project cannot be deployed or distributed

**This File Contains**: Phases 1-2 (Analysis, Planning, and Initial Migration)
**Next Files**: 
- Part 2: Implementation & Testing (Phases 3-4)
- Part 3: Deployment & Completion (Phase 5 + Final Verification)

## Phase 1: Analysis and Planning

### Task 1.1: Complete Import Inventory ✓

#### Scan All Template Files for Local Component Imports
- [x] **Search for all @/components/* imports systematically**
  - [x] Search app router pages for component imports
    1. Run search command:
       ```bash
       cd templates/nextjs
       grep -r "from '@/components" src/app/ --include="*.tsx" --include="*.ts"
       ```
    2. Document all found imports with file locations
    3. Create initial inventory list in format: `file:line:import`
  - [x] Search remaining src directory for component imports
    1. Run comprehensive search:
       ```bash
       grep -r "from '@/components" src/ --include="*.tsx" --include="*.ts"
       ```
    2. Add findings to inventory list
    3. Cross-check with app router findings for completeness
  - [x] Create structured inventory document
    1. Create `/project-artifacts/nextjs-template/migration-inventory.md`
    2. List all files requiring migration
    3. Document current import patterns per file
    4. Include line numbers for precise location tracking
  - [x] **Success**: Complete inventory of all files requiring import changes documented

#### Map Local Imports to ui-core Equivalents ✓
- [x] **Cross-reference found imports with ui-core package exports**
  - [x] Review ui-core package.json exports section
    1. Read `packages/ui-core/package.json` exports field
    2. Verify all expected components are exported
    3. Document ui-core export structure
  - [x] Create import mapping table
    1. For each found @/components/* import, identify ui-core equivalent
    2. Create mapping in format:
       ```
       OLD: import { BaseCard } from '@/components/cards/BaseCard'
       NEW: import { BaseCard } from '@manta-templates/ui-core'
       ```
    3. Verify 100% coverage (all local imports have ui-core equivalents)
  - [x] Handle grouped imports properly
    1. Document cases where multiple components come from same ui-core import
    2. Plan consolidated imports like: `import { BaseCard, ArticleCard, ProjectCard } from '@manta-templates/ui-core'`
  - [x] **Success**: 1:1 mapping of all local imports to ui-core equivalents documented

#### Identify Dependency Injection Requirements ✓
- [x] **Catalog all locations requiring Image/Link/social icon injection**
  - [x] Search for dependency injection patterns in template
    1. Search for ImageComponent prop usage:
       ```bash
       grep -r "ImageComponent" src/ --include="*.tsx"
       ```
    2. Search for LinkComponent prop usage:
       ```bash
       grep -r "LinkComponent" src/ --include="*.tsx"
       ```
    3. Search for social icon injection patterns:
       ```bash
       grep -r "socialIcons\|GithubIcon\|LinkedinIcon" src/ --include="*.tsx"
       ```
  - [x] Document injection requirements per component
    1. List components needing Next.js Image injection
    2. List components needing Next.js Link injection
    3. List components needing social icon injection (Github, Linkedin, Mail, X)
    4. Note any other dependency injection requirements
  - [x] Verify ui-core components support required injection patterns
    1. Check ui-core component prop interfaces for ImageComponent
    2. Check ui-core component prop interfaces for LinkComponent
    3. Verify social icon injection works in test-cards page
  - [x] **Success**: Complete understanding of dependency injection needs documented

### Task 1.2: Build Configuration Validation ✓

#### Verify ui-core Package Imports Work in Template
- [x] **Create test import from ui-core in template**
  - [x] Create temporary test file for ui-core import validation
    1. Create `templates/nextjs/src/test-ui-core-import.tsx`
    2. Verify file can be created without immediate TypeScript errors
  - [x] Test TypeScript resolution
    1. Run TypeScript check on template
    2. Verify no errors related to ui-core imports
    3. Check that TypeScript can resolve ui-core types
  - [x] Test build with ui-core imports
    1. Run build command
    2. Verify build succeeds with ui-core imports
    3. Check for any build warnings related to ui-core
  - [x] Clean up test file
    1. Delete `templates/nextjs/src/test-ui-core-import.tsx`
    2. Verify cleanup doesn't affect build
  - [x] **Success**: Template can import and build with ui-core components

#### Validate Dependency Injection Compatibility
- [x] **Test Next.js Image component injection to ui-core components**
  - [x] Create focused test for Image injection
    1. Create temporary test component
    2. Verify component builds without errors
    3. Test in browser to ensure Image component works
  - [x] **Success**: Next.js Image injection works with ui-core components

- [x] **Test Next.js Link component injection to ui-core components**
  - [x] Create focused test for Link injection
    1. Create temporary test component
    2. Verify component builds without errors
    3. Test navigation functionality works
  - [x] **Success**: Next.js Link injection works with ui-core components

- [x] **Test social icon injection patterns**
  - [x] Import required social icons
    1. Verify icons are available
  - [x] Test AboutCard social icon injection
    1. Create test component
    2. Verify social icons render correctly
    3. Test social links work properly
  - [x] **Success**: All dependency injection patterns work with ui-core components

## Phase 2: Systematic Migration

### Task 2.01: Fix test-example-2 Content Loading Pattern ✓ **CRITICAL**
**Status**: Completed migration process. Successfully updated component imports and content loading pattern.

#### Background
test-example-2 was partially migrated to ui-core components but still uses legacy content loading patterns and local component imports. This creates inconsistency and doesn't demonstrate the correct migration pattern.

#### Issues Found
- [x] **Mixed component imports**: Uses ui-core for most components but imports `ArticleCard` and `BackgroundVideoComponent` from local paths
- [x] **Legacy content loading**: Uses `getArticleBySlug` from legacy loader instead of ui-adapters pattern
- [x] **Incorrect schema fields**: Accesses `frontmatter.excerpt` and `frontmatter.coverImage` instead of actual schema fields (`description`, `image`)
- [x] **Missing dependency injection**: ui-core components missing required `ImageComponent`, `LinkComponent` props

#### Migration Steps
- [x] **Replace component imports**
  1. Replace `import ArticleCard from '@/components/cards/articles/ArticleCard'`
     ```typescript
     // OLD:
     import ArticleCard from '@/components/cards/articles/ArticleCard';
     import BackgroundVideoComponent from '@/components/ui/BackgroundVideoComponent';
     
     // NEW:
     import { ArticleCard, BackgroundVideoComponent } from '@manta-templates/ui-core';
     ```

- [x] **Migrate content loading to ui-adapters pattern**
  1. Replace legacy content loading:
     ```typescript
     // OLD:
     import { getArticleBySlug } from '@/lib/content/loader';
     const themeGuideArticle = await getArticleBySlug('theme-guide');
     
     // NEW:
     import { nextjsContentProvider } from '@manta-templates/ui-adapters-nextjs';
     let themeGuideArticle = null;
     try {
       const article = await nextjsContentProvider.loadContent('theme-guide', 'articles');
       themeGuideArticle = article.frontmatter;
     } catch (error: unknown) {
       console.error('Error loading article content:', error);
     }
     ```
  2. Fix schema field mapping for themeGuideArticle object:
     - Use `themeGuideArticle.description` instead of `themeGuideArticle.excerpt`
     - Use `themeGuideArticle.image` instead of `themeGuideArticle.coverImage`

- [x] **Add dependency injection to all ui-core components**
  1. ArticleCard: Add `ImageComponent={Image}` and `LinkComponent={Link}`
  2. BlogCardImage components: Add `ImageComponent={Image}` and `LinkComponent={Link}`
  3. ProjectCard: Add `ImageComponent={Image}` and `LinkComponent={Link}`
  4. VideoCard: Add `BackgroundVideoComponent={BackgroundVideoComponent}`

- [x] **Optional: Migrate static content to markdown files**
  1. Create content files in `src/content/test-example-2/`:
     - `carousel-hero.md`
     - `semantic-colors.md` (project)
     - `colors-and-themes.md` (article)
     - `design-philosophy.md` (quote)
  2. Update `loadExampleContent()` to load from these files using ui-adapters pattern
  3. Keep hybrid approach: some content from markdown, some from static data

- [x] **Test migration**
  1. Run build: `pnpm build`
  2. Test dev server: Navigate to `/test-example-2`
  3. Verify all components render correctly
  4. Compare to pre-migration functionality
  - [x] **Success**: test-example-2 demonstrates correct ui-core + ui-adapters patterns

### Task 2.1: App Router Pages Migration

### Task 2.1.1: Footer Content Loading Architecture Migration

**Background**: The current footer content system uses complex HTML parsing with regex patterns to extract structured data from markdown content. This doesn't align with the ui-adapters architecture that expects YAML frontmatter. We need to convert the footer content to proper YAML structure to eliminate the parsing complexity.

**Current Issue**: 
- Footer uses `parseFooterContent()` function with regex parsing of HTML 
- Expects markdown like `### Quick Links\n- [About](/about)` 
- ui-adapters expects YAML frontmatter structure
- Currently using hybrid approach (header uses ui-adapters, footer uses legacy)

**Tasks**:
- [x] Convert footer content file to YAML frontmatter structure
  - Transform current markdown sections to YAML objects
  - Ensure all FooterSections properties are covered
  - Maintain same data structure as current parseFooterContent() output
- [x] Delete parseFooterContent() function and related parsing logic
  - Remove entire parsing function from footerContent.ts
  - Clean up regex patterns and HTML parsing code
- [x] Update NextjsFooterContent interface to match exact YAML structure
  - Ensure interface matches FooterSections exactly
  - Test TypeScript compatibility
- [x] Replace legacy getFooterContent() with ui-adapters pattern
  - Update all pages using footer to use nextjsContentProvider.loadContent<NextjsFooterContent>()
  - Remove legacy footerContent.ts imports
- [x] Test footer content loading across all pages
  - Verify app/layout.tsx works with new approach
  - Test test-cards page footer variants
  - Ensure no regressions in footer functionality

**Success**: Complete elimination of HTML parsing complexity, consistent ui-adapters pattern for both header and footer content loading.

#### Migrate app/page.tsx (Homepage) ✓
- [x] **Replace all @/components/* imports with ui-core imports**
  - [x] Identify current imports in homepage
  - [x] Replace imports systematically
  - [x] Ensure proper dependency injection for Image/Link components
  - [x] Test build and functionality
  - [x] **Success**: Homepage works identically with ui-core components ✅

#### Migrate Page Router Pages
- [x] **Update Header/Footer Components (Critical)**
  - [x] Update app/layout.tsx
    1. Replace all local header/footer component imports with ui-core imports ✅
    2. Ensure consistent layout structure with ui-core components ✅
    3. Implement proper dependency injection for Image/Link components ✅
    4. Test overall page layout and navigation ✅

- [x] **Migrate Personal and Legal Pages**
  1. Update the following pages with ui-core component imports:
    - [x] app/about/page.tsx
    - [x] app/legal/page.tsx
    - [x] app/privacy/page.tsx
    - [x] app/terms/page.tsx
    - [x] app/cookies/page.tsx
    2. For each page:
      - Replace @/components/* imports with ui-core imports
      - Add dependency injection as needed (Image, Link components)
      - Verify content rendering and layout

- [x] **Migrate Example and Demonstration Pages**
  1. Update the following example pages:
    - [x] app/examples/page.tsx
    - [x] app/examples/cards/page.tsx
    - [x] app/examples/blog/page.tsx
    - [x] app/examples/portfolio/PortfolioGrid.tsx
    - [x] app/examples/bentogrid/BentoGrid.tsx
    2. For each page:
      - Replace local component imports with ui-core equivalents
      - Implement consistent dependency injection
      - Verify component rendering and interaction


#### Test-Related Pages Migration
- [x] **Migrate test-example-2/page.tsx** (from Task 2.01)
- [x] **Migrate test-cards/page.tsx**
  - [x] Update ui-core components to use new ui-adapters content loading pattern
  - [x] Keep template components using legacy content loading for demonstration purposes
  - [x] Demonstrate migration strategy:
    1. ui-core section demonstrates new ui-adapters content loading
    2. Template section keeps existing content loading for comparison
  - [x] Ensure consistent visual rendering across both implementations

#### Final Verification
- [x] **Systematic Pattern Verification**
  1. Verify all migrated pages have consistent import patterns
    - Import from '@manta-templates/ui-core'
    - Consistent dependency injection for Image, Link components
  2. Run comprehensive build validation: `pnpm build`
  3. Test dev server and verify all pages load without errors
  4. Take screenshots to document pre and post-migration UI consistency

- [x] **Success Criteria**
  1. No remaining @/components/* imports in app router pages
  2. Consistent ui-core component usage across all pages
  3. Identical visual and functional rendering compared to pre-migration state
  4. Successful build and dev server start
  5. No console errors or warnings during page loads


### Task 2.2: Component Layer Migration

#### Migrate Template-Specific Components Still Using Local Imports
- [ ] **Search for remaining template components with local imports**
  - [ ] Scan src/components directory for remaining files
    1. List all files in templates/nextjs/src/components/:
       ```bash
       find templates/nextjs/src/components -name "*.tsx" -o -name "*.ts" | head -20
       ```
    2. Check each file for @/components/* imports
    3. These should be minimal since most components moved to ui-core
  - [ ] Identify template-specific components to keep
    1. Determine which components are truly template-specific
    2. These might include:
       - Page-specific layout wrappers
       - Template-specific configuration components
       - Components that customize ui-core components for this template
    3. Document why each remaining component is template-specific
  - [ ] Update component composition patterns
    1. For each remaining template component:
       - Replace any @/components/* imports with ui-core imports
       - Update to use dependency injection patterns
       - Ensure consistent with ui-core architecture
    2. Example migration:
       ```typescript
       // OLD:
       import { BaseCard } from '@/components/cards/BaseCard'
       
       // NEW:
       import { BaseCard } from '@manta-templates/ui-core'
       import Image from 'next/image'
       import Link from 'next/link'
       
       export function CustomWrapper(props) {
         return (
           <BaseCard ImageComponent={Image} LinkComponent={Link} {...props}>
             {/* Template-specific customization */}
           </BaseCard>
         )
       }
       ```
  - [ ] **Success**: No remaining @/components/* imports in template

#### Update Component Re-exports and Index Files
- [ ] **Remove or update any local component re-export files**
  - [ ] Check for component index files
    1. Look for files like `src/components/index.ts`
    2. Look for category-specific exports like `src/components/cards/index.ts`
    3. Identify what these files currently export
  - [ ] Update or remove redundant exports
    1. If file re-exports components now in ui-core, remove those exports
    2. If file only exports ui-core components, consider removing file entirely
    3. Keep only exports for truly template-specific components
    4. Example cleanup:
       ```typescript
       // OLD (remove these):
       export { BaseCard } from './cards/BaseCard'
       export { ArticleCard } from './cards/ArticleCard'
       
       // KEEP (template-specific):
       export { CustomTemplateWrapper } from './CustomTemplateWrapper'
       ```
  - [ ] Clean up component directory structure
    1. Remove empty directories after component removal
    2. Reorganize remaining template-specific components logically
    3. Ensure clear separation between ui-core usage and template-specific code
  - [ ] Update TypeScript path mappings if necessary
    1. Check `tsconfig.json` for any paths that reference removed components
    2. Update or remove obsolete path mappings
    3. Ensure remaining path mappings are accurate
  - [ ] **Success**: Clean component structure with no redundant exports

### Task 2.3: Build Validation and Testing

#### Incremental Build Testing
- [ ] **Run build validation after each major page migration**
  - [ ] Create build testing checklist
    1. After migrating app/page.tsx: `pnpm build`
    2. After migrating blog routes: `pnpm build`
    3. After migrating test pages: `pnpm build`
    4. After component layer migration: `pnpm build`
  - [ ] Fix any build errors immediately
    1. If build fails, identify the specific error
    2. Check for:
       - Missing import statements
       - Incorrect import paths
       - Missing dependency injection props
       - TypeScript type mismatches
    3. Fix errors before proceeding to next migration step
  - [ ] Monitor TypeScript errors throughout process
    1. Run type checking: `pnpm type-check`
    2. Ensure no new TypeScript errors introduced
    3. Address type issues immediately to prevent accumulation
  - [ ] Document any build warnings
    1. Note any new warnings that appear during migration
    2. Determine if warnings are acceptable or need addressing
    3. Track warning count to ensure no significant increase
  - [ ] **Success**: Build remains green throughout migration process

#### Runtime Functionality Testing
- [ ] **Test each migrated page in browser during development**
  - [ ] Set up development testing workflow
    1. Start dev server: `pnpm dev`
    2. Open browser to localhost:3000
    3. Keep developer console open to catch errors
  - [ ] Test homepage after migration
    1. Navigate to / and verify page loads
    2. Check that all components render correctly
    3. Compare visual appearance to pre-migration state
    4. Note any visual differences or layout issues
  - [ ] Test blog functionality after migration
    1. Navigate to /blog and verify listing loads
    2. Click into individual blog posts
    3. Test navigation between posts
    4. Verify content formatting matches previous state
  - [ ] Test all other migrated pages systematically
    1. Navigate to /test-cards and verify components display
    2. Navigate to /test-example-2 and test functionality
    3. Test any other pages that were migrated
  - [ ] Verify identical rendering and functionality
    1. Take screenshots of key pages for comparison
    2. Test responsive behavior across device sizes
    3. Ensure layout and styling match pre-migration state
    4. Document any differences found
  - [ ] Test interactive features comprehensively
    1. Theme switching (light/dark mode)
    2. Accent color switching if ColorSelector present
    3. Navigation links and routing
    4. Any form submissions or interactive elements
    5. Hover states and animations
  - [ ] Monitor browser console for errors
    1. Check for JavaScript errors during page loads
    2. Check for React warnings or errors
    3. Monitor network requests for failed asset loading
    4. Address any console errors immediately
  - [ ] **Success**: All pages function identically to pre-migration state

## Next Steps

**Continue to Part 2**: Implementation & Testing (Phases 3-4)
- Component cleanup and redundant code removal
- TypeScript and dependency cleanup
- Production build verification
- Comprehensive functional testing

**File**: `10-tasks.template-migration-2-implementation.md`