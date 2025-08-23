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

### Task 2.1: App Router Pages Migration

#### Migrate app/page.tsx (Homepage)
- [ ] **Replace all @/components/* imports with ui-core imports**
  - [ ] Identify current imports in homepage
    1. Read `templates/nextjs/src/app/page.tsx`
    2. List all @/components/* imports currently used
    3. Note any props or configurations used with components
  - [ ] Replace imports systematically
    1. Replace component imports with ui-core equivalents:
       ```typescript
       // OLD:
       import { BaseCard } from '@/components/cards/BaseCard'
       import { ThemeToggle } from '@/components/themetoggle'
       import { AboutCard } from '@/components/cards/people/AboutCard'
       
       // NEW:
       import { BaseCard, ThemeToggle, AboutCard } from '@manta-templates/ui-core'
       ```
    2. Preserve all other imports (Next.js, React, etc.)
    3. Maintain exact same component usage patterns
  - [ ] Ensure proper dependency injection for Image/Link components
    1. Add Image import: `import Image from 'next/image'`
    2. Add Link import: `import Link from 'next/link'`
    3. Pass components as props to ui-core components:
       ```typescript
       <ArticleCard
         ImageComponent={Image}
         LinkComponent={Link}
         // ... other props
       />
       ```
    4. Add social icons if needed: `import { Github, Linkedin, Mail, X } from 'lucide-react'`
  - [ ] Test build and functionality
    1. Run build: `pnpm build`
    2. Run dev server: `pnpm dev`
    3. Verify page loads without errors
    4. Compare visual rendering to pre-migration state
  - [ ] **Success**: Homepage works identically with ui-core components

#### Migrate app/blog/page.tsx and Blog Routes
- [ ] **Replace ArticleCard and related component imports**
  - [ ] Update blog listing page
    1. Open `templates/nextjs/src/app/blog/page.tsx`
    2. Replace imports:
       ```typescript
       // OLD:
       import { ArticleCard } from '@/components/cards/articles/ArticleCard'
       
       // NEW:
       import { ArticleCard } from '@manta-templates/ui-core'
       ```
    3. Ensure dependency injection is properly added
    4. Test blog listing displays correctly
  - [ ] Update individual blog post routes
    1. Check `templates/nextjs/src/app/blog/[slug]/page.tsx`
    2. Replace any component imports with ui-core equivalents
    3. Test individual post pages work
  - [ ] Ensure content loading patterns work with ui-core components
    1. Verify markdown content loading still works
    2. Test that getArticleBySlug patterns work with ui-core ArticleCard
    3. Verify all blog metadata and frontmatter processing
  - [ ] Test all blog functionality
    1. Navigate to `/blog` and verify listing works
    2. Click into individual posts and verify they load
    3. Test any pagination or filtering if present
    4. Verify responsive behavior across device sizes
  - [ ] **Success**: Blog section fully functional with ui-core components

#### Migrate app/test-cards/page.tsx
- [ ] **Update test-cards to use ui-core components for both sections**
  - [ ] Replace template component imports
    1. Open `templates/nextjs/src/app/test-cards/page.tsx`
    2. Replace all @/components/* imports with ui-core imports
    3. Update "Template" section to use ui-core components
  - [ ] Update comparison structure
    1. Since both sections now use ui-core, update labels:
       - "Template (ui-core)" instead of "Template (local)"
       - "ui-core (direct)" instead of "ui-core"
    2. This demonstrates template successfully migrated to ui-core
  - [ ] Validate perfect parity
    1. Both sections should render identically
    2. This proves template migration successful
    3. Any differences indicate migration issues to fix
  - [ ] **Success**: test-cards shows perfect parity because both sides use ui-core

#### Migrate app/test-example-2/page.tsx and Other Test Pages
- [ ] **Replace all local component imports with ui-core equivalents**
  - [ ] Update test-example-2 page
    1. Open `templates/nextjs/src/app/test-example-2/page.tsx`
    2. Replace all @/components/* imports with ui-core imports
    3. Ensure dependency injection is properly implemented
    4. Test server-side content loading still works
  - [ ] Check for other test or example pages
    1. Search for other pages in app/ directory:
       ```bash
       find templates/nextjs/src/app -name "*.tsx" -type f
       ```
    2. Update any additional pages found
    3. Apply same import migration pattern
  - [ ] Verify server-side content loading continues to work
    1. Test async component patterns still function
    2. Verify markdown content loading works
    3. Test any getStaticProps or server component patterns
  - [ ] Test all demonstrated functionality
    1. Navigate to each test page
    2. Verify all components render correctly
    3. Test interactive functionality
    4. Verify no console errors or warnings
  - [ ] **Success**: All test pages work identically with ui-core components

#### Migrate Remaining App Router Pages
- [ ] **Update any other pages in app/ directory**
  - [ ] Complete directory scan
    1. List all remaining .tsx files in app/ directory
    2. Check each file for @/components/* imports
    3. Create migration checklist for remaining files
  - [ ] Apply systematic migration
    1. For each remaining file:
       - Replace @/components/* imports with ui-core imports
       - Add dependency injection as needed
       - Test build and functionality
    2. Ensure consistent patterns across all files
  - [ ] Ensure consistent import patterns across all pages
    1. All pages should import from '@manta-templates/ui-core'
    2. All pages should use consistent dependency injection patterns
    3. No @/components/* imports should remain
  - [ ] Verify build succeeds for entire app
    1. Run complete build: `pnpm build`
    2. Verify no build errors or TypeScript issues
    3. Test that all pages are generated successfully
  - [ ] **Success**: All app router pages use ui-core components

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