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

### Task 5.4: Migrate ThemeProvider and Theme System
**Owner**: Junior AI  
**Complexity**: 3 (Moderate)  
**Dependencies**: Task 5.3  

**Objective**: Migrate the complete theme system (ThemeProvider, context, types) to ui-core for framework-agnostic theming.

**Context & Analysis**:
- Current theme system in `templates/nextjs/src/context/themecontext.tsx` manages both light/dark themes and custom accent colors
- System applies CSS classes (`.light/.dark`) and data attributes (`data-palette="teal"`) to `document.documentElement`
- Uses localStorage for persistence with key `ui-theme` and `ui-theme-accent`
- Must remain framework-agnostic while preserving all functionality

**Detailed Migration Steps**:

#### Step 5.4.1: Create Theme Type Definitions
- [x] **Create directory structure**:
  - `packages/ui-core/src/types/` (if not exists)
  - `packages/ui-core/src/providers/` (if not exists)  
  - `packages/ui-core/src/hooks/` (if not exists)

- [x] **Create theme types file**:
  - File: `packages/ui-core/src/types/theme.ts`
  - **Exact types to define**:
    ```typescript
    export type Theme = 'light' | 'dark';
    export type Accent = 'teal' | 'mintteal' | 'blue' | 'purple' | 'orange';
    
    export interface ThemeProviderProps {
      children: React.ReactNode;
      defaultTheme?: Theme;
      storageKey?: string;
      defaultAccent?: Accent;
    }
    
    export interface ThemeProviderState {
      theme: Theme;
      setTheme: (theme: Theme) => void;
      accent: Accent;
      setAccent: (accent: Accent) => void;
    }
    ```

#### Step 5.4.2: Create ThemeProvider Component
- [x] **Copy template ThemeProvider logic**:
  - Source: `templates/nextjs/src/context/themecontext.tsx`
  - Target: `packages/ui-core/src/providers/ThemeProvider.tsx`
  
- [x] **Preserve exact functionality**:
  - [x] useState hooks for theme and accent state
  - [x] localStorage initialization effect (lines 48-59 from template)
  - [x] CSS class application effect (lines 62-69 from template) 
  - [x] Data attribute application effect (lines 72-78 from template)
  - [x] Context creation and provider setup
  - [x] Default values: `defaultTheme = "light"`, `storageKey = "ui-theme"`, `defaultAccent = "teal"`

- [x] **Remove framework dependencies**:
  - [x] Remove any Next.js specific imports
  - [x] Ensure only React hooks and standard APIs used
  - [x] Test that `document.documentElement` access works in client components

#### Step 5.4.3: Create useTheme Hook
- [x] **Create hook file**:
  - File: `packages/ui-core/src/hooks/useTheme.ts`
  - **Exact implementation**:
    ```typescript
    import { useContext } from 'react';
    import { ThemeProviderContext } from '../providers/ThemeProvider';
    
    export const useTheme = () => {
      const context = useContext(ThemeProviderContext);
      if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
      return context;
    };
    ```

#### Step 5.4.4: Update Export Structure
- [x] **Create/update index files**:
  - [x] Create `packages/ui-core/src/providers/index.ts` if needed
  - [x] Create `packages/ui-core/src/hooks/index.ts` if needed
  - [x] Add exports: `export { ThemeProvider } from './ThemeProvider';`
  - [x] Add exports: `export { useTheme } from './useTheme';`
  - [x] Update `packages/ui-core/src/types/index.ts` to include theme types
  - [x] Update main `packages/ui-core/src/index.ts` to export providers and hooks

#### Step 5.4.5: Build and Verification
- [x] **TypeScript compilation**:
  - [x] Run `pnpm build` in ui-core package
  - [x] Resolve any TypeScript errors
  - [x] Ensure all exports are properly typed

- [x] **Functionality verification**:
  - [x] ThemeProvider context creation works
  - [x] useTheme hook throws error when used outside provider
  - [x] Theme state management functional
  - [x] Accent state management functional

**Success Criteria**:
- [x] **Functional Parity**: ThemeProvider works identically to template version
- [x] **Theme Support**: Both light/dark themes work with CSS class application
- [x] **Accent Support**: All 5 accent colors work with data-palette attributes  
- [x] **Persistence**: localStorage save/restore works for both theme and accent
- [x] **Framework Independence**: No Next.js dependencies, only React + standard APIs
- [x] **Type Safety**: Complete TypeScript types with no `any` types
- [x] **Build Success**: ui-core package builds without errors
- [x] **Export Accessibility**: All components/hooks accessible from main package export

**Common Pitfalls for Junior AI**:
- ⚠️ Don't change the localStorage keys (`ui-theme`, `ui-theme-accent`)  
- ⚠️ Don't change the CSS class names (`.light`, `.dark`) or data attribute (`data-palette`)
- ⚠️ Ensure `'use client'` directive is preserved - ThemeProvider needs client-side APIs
- ⚠️ Don't modify the accent color list - must remain exactly 5 colors as specified

### Task 5.5: Migrate ThemeToggle Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.4  

**Objective**: Migrate theme toggle component for dark/light mode switching using ui-core ThemeProvider.

**Context & Analysis**:
- Current ThemeToggle in `templates/nextjs/src/components/themetoggle.tsx` uses Next.js theme context
- Component includes complex Tailwind styling with accent color integration
- Must preserve all visual styling, animations, and accessibility features
- Will use ui-core ThemeProvider (from Task 5.4) instead of template context

**Detailed Migration Steps**:

#### Step 5.5.1: Create ThemeToggle Component
- [x] **Create component file**:
  - File: `packages/ui-core/src/components/ui/ThemeToggle.tsx`
  - **Copy source template**: `templates/nextjs/src/components/themetoggle.tsx`
  
- [x] **Update imports and dependencies**:
  - [x] Replace `import { useTheme } from "@/context/themecontext";` 
  - [x] With `import { useTheme } from "../../hooks/useTheme";`
  - [x] Replace `import { Button } from "@/components/ui/button";`
  - [x] With `import { Button } from "./button";` 
  - [x] Replace `import { cn } from "@/lib/utils";`
  - [x] With `import { cn } from "../../utils/cn";`
  - [x] Keep `import { Moon, Sun } from "lucide-react";` unchanged

- [x] **Preserve exact component logic**:
  - [x] Keep same props interface: `{ className?: string }`
  - [x] Keep same theme toggle logic: `setTheme(theme === "light" ? "dark" : "light")`
  - [x] Keep same conditional icon rendering based on theme state
  - [x] Keep all accessibility attributes: `aria-pressed`, `title`, `sr-only`

- [x] **Preserve styling exactly**:
  - [x] Keep all Tailwind classes from lines 23-37 of template
  - [x] Keep all custom CSS variables: `--color-accent-*`, `--color-border-*`
  - [x] Keep all hover states and transitions
  - [x] Keep icon styling: `strokeWidth={1.75}`, size classes
  - [x] Keep all `!important` modifiers for style override

#### Step 5.5.2: Handle Only ThemeToggle (Not ColorSelector)
- [x] **Export only ThemeToggle**:
  - [x] Export `ThemeToggle` component
  - [x] **Do NOT migrate ColorSelector** - that's a separate component
  - [x] Remove or comment out ColorSelector if accidentally copied

#### Step 5.5.3: Update UI Component Exports
- [x] **Add to exports**:
  - [x] Update `packages/ui-core/src/components/ui/index.ts`
  - [x] Add `export { ThemeToggle } from './ThemeToggle';`
  - [x] Add TypeScript types if needed
  
#### Step 5.5.4: Add to Test Cards Page
- [x] **Import components in test-cards**:
  - [x] File: `templates/nextjs/src/app/test-cards/page.tsx`
  - [x] Add template import: `import { ThemeToggle as TemplateThemeToggle } from '@/components/themetoggle';`
  - [x] Add ui-core import: `import { ThemeToggle as UiCoreThemeToggle } from '@manta-templates/ui-core';`

- [x] **Add comparison section**:
  - [x] Create side-by-side ThemeToggle comparison
  - [x] **Template version**: `<TemplateThemeToggle />`
  - [x] **UI-Core version**: `<UiCoreThemeToggle />`
  - [x] Use same CardComparisonWrapper pattern as other components
  - [x] Include explanatory text about framework differences

- [x] **Test functionality**:
  - [x] Both versions should toggle theme when clicked
  - [x] Both should show correct icon for current theme
  - [x] Both should update simultaneously (same theme state)

#### Step 5.5.5: Build and Verification
- [x] **TypeScript compilation**:
  - [x] Run `pnpm build` in ui-core package
  - [x] Resolve any import or type errors
  - [x] Ensure ThemeToggle exports correctly
  
- [x] **Template integration**:
  - [x] Run `pnpm build` in templates/nextjs
  - [x] Verify test-cards page renders without errors
  - [x] Test that both ThemeToggle versions work

**Success Criteria**:
- [x] **Visual Parity**: ui-core ThemeToggle looks identical to template version
- [x] **Functional Parity**: Theme switching works identically  
- [x] **Styling Preservation**: All accent colors, hover states, transitions preserved
- [x] **Accessibility**: All ARIA attributes and screen reader support maintained
- [x] **Framework Independence**: Uses ui-core ThemeProvider, no Next.js dependencies
- [x] **Test Integration**: Appears in test-cards page with working comparison
- [x] **Build Success**: Both ui-core and template packages build without errors
- [x] **Interactive Testing**: Both versions toggle theme and update simultaneously

**Common Pitfalls for Junior AI**:
- ⚠️ Don't change any Tailwind classes or CSS variables - preserve styling exactly
- ⚠️ Don't migrate ColorSelector - this task is only for ThemeToggle
- ⚠️ Ensure `'use client'` directive is added - ThemeToggle needs client-side hooks
- ⚠️ Don't modify the toggle logic - keep exact same light/dark switching
- ⚠️ Import paths must be relative from ui-core structure, not absolute like template

### Task 5.6: Migrate Header Components
**Owner**: Junior AI  
**Complexity**: 3 (Moderate)  
**Dependencies**: Task 5.5  

**Objective**: Migrate header components to ui-core with dependency injection support, preserving all navigation and responsive functionality.

**Context & Analysis**:
- Current header system has two components: `header.tsx` (wrapper) and `headers/DefaultHeader.tsx` (implementation)
- DefaultHeader uses Next.js Image, Link, and complex content loading from headerContent
- Includes BrandMark, ThemeToggle, ColorSelector, and navigation menu
- Must preserve responsive behavior, accessibility, and all styling
- Dependencies: Container (migrated), BrandMark (migrated), ThemeToggle (from Task 5.5)

**Detailed Migration Steps**:

#### Step 5.6.1: Analyze Header Dependencies and Content
- [ ] **Examine header content system**:
  - File: `templates/nextjs/src/lib/headerContent.ts`
  - **Document interface**: getHeaderContent() return structure
  - **Note content fields**: title, logo, navigation links
  - **Identify dynamic vs static content**

- [ ] **Map current header usage**:
  - File: `templates/nextjs/src/components/headers/DefaultHeader.tsx`
  - **Document import dependencies**: Next.js Image, Link, headerContent
  - **List all sub-components used**: BrandMark, ThemeToggle, ColorSelector, Container
  - **Identify styling patterns**: Tailwind classes, responsive breakpoints

#### Step 5.6.2: Create Framework-Agnostic Header Interface
- [ ] **Create header types**:
  - File: `packages/ui-core/src/types/header.ts`
  - **Define HeaderContent interface**:
    ```typescript
    export interface HeaderContent {
      title?: string;
      logo?: string;
      navigation?: Array<{
        href: string;
        label: string;
        external?: boolean;
      }>;
    }
    
    export interface HeaderProps {
      content: HeaderContent;
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
      className?: string;
    }
    ```

#### Step 5.6.3: Create DefaultHeader Component
- [ ] **Create header component file**:
  - File: `packages/ui-core/src/components/headers/DefaultHeader.tsx`
  - **Copy template structure**: `templates/nextjs/src/components/headers/DefaultHeader.tsx`
  
- [ ] **Update imports and dependencies**:
  - [ ] Replace `import Image from 'next/image';` with ImageComponent prop usage
  - [ ] Replace `import Link from 'next/link';` with LinkComponent prop usage  
  - [ ] Replace `import { getHeaderContent } from '@/lib/headerContent';` with content prop
  - [ ] Update `import BrandMark` to `import { BrandMark } from '../ui/BrandMark';`
  - [ ] Update `import { ThemeToggle } from` to use ui-core ThemeToggle
  - [ ] Update `import Container` to `import { Container } from '../layouts/Container';`
  - [ ] Update `import { cn }` to `import { cn } from '../../utils/cn';`

- [ ] **Preserve component logic**:
  - [ ] Keep same responsive behavior for mobile/desktop navigation
  - [ ] Keep same header layout: logo/title, navigation, theme controls
  - [ ] Keep same conditional logo vs BrandMark logic
  - [ ] Keep all accessibility attributes and ARIA labels
  - [ ] Keep all Tailwind styling and responsive classes

- [ ] **Implement dependency injection**:
  - [ ] Use ImageComponent for logo rendering: `<ImageComponent src={content.logo} ...>`
  - [ ] Use LinkComponent for navigation: `<LinkComponent href={nav.href} ...>`
  - [ ] Handle external links appropriately with LinkComponent
  - [ ] Default to standard elements if components not provided

#### Step 5.6.4: Create Header Wrapper Component
- [ ] **Create header wrapper**:
  - File: `packages/ui-core/src/components/headers/Header.tsx`
  - **Copy template logic**: `templates/nextjs/src/components/header.tsx`
  
- [ ] **Abstract variant selection**:
  - [ ] Accept variant prop instead of reading siteConfig directly
  - [ ] Support 'default' variant (maps to DefaultHeader)
  - [ ] Provide interface for adding more header variants later
  - [ ] Pass through all props to selected header component

#### Step 5.6.5: Handle ColorSelector Integration
- [ ] **Important decision point**:
  - [ ] ColorSelector is part of template ThemeToggle but complex
  - [ ] **For this task**: Keep ColorSelector import from template themetoggle
  - [ ] **Do NOT migrate ColorSelector** - treat as external dependency
  - [ ] Document this decision for future ColorSelector migration task

#### Step 5.6.6: Update Component Exports
- [ ] **Create headers directory exports**:
  - File: `packages/ui-core/src/components/headers/index.ts`
  - Add: `export { DefaultHeader } from './DefaultHeader';`
  - Add: `export { Header } from './Header';`
  
- [ ] **Update main component exports**:
  - File: `packages/ui-core/src/components/index.ts` (if exists)
  - Add: `export * from './headers';`
  
- [ ] **Update types exports**:
  - File: `packages/ui-core/src/types/index.ts`
  - Add: `export * from './header';`

#### Step 5.6.7: Add to Test Cards Page
- [ ] **Import header components**:
  - File: `templates/nextjs/src/app/test-cards/page.tsx`
  - Add template import: `import TemplateHeader from '@/components/header';`
  - Add ui-core imports: `import { Header as UiCoreHeader } from '@manta-templates/ui-core';`
  - Import headerContent: `import { getHeaderContent } from '@/lib/headerContent';`

- [ ] **Create header comparison section**:
  - [ ] **Challenge**: Headers are large - use different layout than cards
  - [ ] Create full-width comparison sections above card grid
  - [ ] **Template version**: `<TemplateHeader />` 
  - [ ] **UI-Core version**: `<UiCoreHeader content={headerContent} ImageComponent={Image} LinkComponent={Link} />`
  - [ ] Use server component pattern to load headerContent
  - [ ] Include labels distinguishing template vs ui-core versions

#### Step 5.6.8: Build and Verification
- [ ] **TypeScript compilation**:
  - [ ] Run `pnpm build` in ui-core package
  - [ ] Resolve any import path or type errors
  - [ ] Ensure all header exports are typed correctly
  
- [ ] **Template integration testing**:
  - [ ] Run `pnpm build` in templates/nextjs  
  - [ ] Verify test-cards page renders both headers
  - [ ] Test responsive behavior on both versions
  - [ ] Test navigation links work on both versions
  - [ ] Test theme toggle integration works

**Success Criteria**:
- [ ] **Visual Parity**: ui-core header looks identical to template version
- [ ] **Navigation Functionality**: All links work with dependency injection
- [ ] **Responsive Design**: Mobile/desktop layouts identical
- [ ] **Component Integration**: BrandMark, ThemeToggle, Container work correctly
- [ ] **Content Loading**: Header content passed via props works
- [ ] **Framework Independence**: No Next.js dependencies in ui-core version
- [ ] **Test Integration**: Both headers appear and function in test-cards page
- [ ] **Accessibility**: All ARIA attributes and keyboard navigation preserved
- [ ] **Build Success**: Both packages build without errors

**Common Pitfalls for Junior AI**:
- ⚠️ Don't migrate ColorSelector - import from template for now
- ⚠️ Preserve all responsive Tailwind classes exactly
- ⚠️ Use dependency injection properly - don't hardcode Image/Link components
- ⚠️ Header is large - don't try to fit in regular card layout on test page
- ⚠️ Ensure headerContent is loaded at server level, not passed as static data

### Task 5.7: Migrate Footer Components  
**Owner**: Junior AI  
**Complexity**: 4 (Complex)  
**Dependencies**: Task 5.6  

**Objective**: Migrate complete footer system to ui-core with full feature preservation, including multi-variant support and complex content loading.

**Context & Analysis - CRITICAL COMPLEXITY FACTORS**:
- **Multiple footer variants**: DefaultFooter (complex multi-column) and CompactFooter (minimal)
- **Complex content system**: Dynamic loading from footerContent with multiple data structures
- **Rich feature set**: Contact info, social links, legal links, professional links, external link indicators
- **Deep integrations**: ThemeToggle, custom styling, responsive design, accessibility
- **Configuration-driven**: Runtime variant selection based on site configuration
- **Content complexity**: Conditional rendering, multiple link types, dynamic sections

**PHASE 1: Deep Analysis and Planning (MANDATORY)**

#### Step 5.7.1: Comprehensive Footer System Analysis
- [ ] **Analyze footerContent system**:
  - File: `templates/nextjs/src/lib/footerContent.ts` 
  - **Document complete interface**: FooterSections, FooterLink types
  - **Map all content fields**: quickLinks, resources, socialProfessional, socialCommunity, legal, professionalLinks, professionalContact, primaryContact, copyright
  - **Note conditional logic**: professionalLinks vs professionalContact switching
  - **Document async loading**: getFooterContent() async function

- [ ] **Analyze DefaultFooter complexity**:
  - File: `templates/nextjs/src/components/footers/DefaultFooter.tsx`
  - **Document layout structure**: 4-column responsive grid with complex breakpoints
  - **Map all sections**: Quick Links + Contact, Resources, Social & Community, Legal & Professional
  - **Note conditional rendering**: logo vs BrandMark, professionalLinks vs contact emails
  - **Document external link indicators**: ExternalLink icon usage
  - **Map responsive behavior**: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

- [ ] **Analyze CompactFooter** (if exists):
  - File: `templates/nextjs/src/components/footers/CompactFooter.tsx`
  - **Document minimal layout**: single-row design
  - **Map essential elements**: copyright, basic links, theme toggle
  - **Compare with DefaultFooter**: identify shared vs unique elements

- [ ] **Analyze footer wrapper**:
  - File: `templates/nextjs/src/components/footer.tsx`
  - **Document variant selection**: siteConfig.variants.footer logic
  - **Map configuration options**: 'default' vs 'compact'
  - **Note async pattern**: server component with content loading

#### Step 5.7.2: Design Framework-Agnostic Content Interfaces
- [ ] **Create comprehensive footer types**:
  - File: `packages/ui-core/src/types/footer.ts`
  - **Define exact interfaces** (copy from template analysis):
    ```typescript
    export interface FooterLink {
      href: string;
      label: string;
      external?: boolean;
    }
    
    export interface FooterContact {
      email?: string;
      business?: string;
      support?: string;
      location?: string;
    }
    
    export interface FooterCopyright {
      attribution: string; // HTML string
      notice: string;
      lastUpdated: string;
    }
    
    export interface FooterSections {
      quickLinks: FooterLink[];
      resources: FooterLink[];
      socialProfessional: FooterLink[];
      socialCommunity: FooterLink[];
      legal: FooterLink[];
      professionalLinks?: FooterLink[];
      professionalContact: FooterContact;
      primaryContact: FooterContact;
      copyright: FooterCopyright;
    }
    
    export interface FooterProps {
      sections: FooterSections;
      variant?: 'default' | 'compact';
      LinkComponent?: React.ComponentType<any>;
      className?: string;
    }
    ```

**PHASE 2: Component Migration (HIGH COMPLEXITY)**

#### Step 5.7.3: Create FooterLinkComponent Abstraction
- [ ] **Extract link rendering logic**:
  - **Source reference**: DefaultFooter.tsx lines 7-19 (FooterLinkComponent)
  - **Target**: `packages/ui-core/src/components/footers/FooterLinkComponent.tsx`
  - **Preserve exact styling**: text-sm, text-muted-foreground, hover states, flex items-center gap-1
  - **Abstract Link component**: Accept LinkComponent via dependency injection
  - **Preserve external link logic**: conditional ExternalLink icon rendering
  - **Handle link types**: external (with target="_blank") vs internal routing

#### Step 5.7.4: Migrate DefaultFooter with Full Complexity
- [ ] **Create DefaultFooter component**:
  - File: `packages/ui-core/src/components/footers/DefaultFooter.tsx`
  - **Source**: `templates/nextjs/src/components/footers/DefaultFooter.tsx`
  
- [ ] **Handle complex imports and dependencies**:
  - [ ] Replace `import Link from 'next/link';` with LinkComponent prop
  - [ ] Replace `import { getFooterContent } from '@/lib/footerContent';` with sections prop
  - [ ] Update ThemeToggle import to use ui-core version
  - [ ] Keep lucide-react icons: `ExternalLink, Mail, MapPin`
  - [ ] Update cn utility import path

- [ ] **Preserve exact layout complexity**:
  - [ ] **4-column responsive grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`
  - [ ] **Column 1 - Quick Links + Contact**: quickLinks array + primaryContact (email, location)
  - [ ] **Column 2 - Resources**: resources array  
  - [ ] **Column 3 - Social**: socialProfessional + socialCommunity arrays
  - [ ] **Column 4 - Legal + Professional**: legal array + conditional professionalLinks/Contact
  - [ ] **Bottom section**: copyright + theme toggle with responsive flex layout

- [ ] **Preserve conditional rendering logic**:
  - [ ] **Professional links vs contact**: `(s.professionalLinks && s.professionalLinks.length > 0)` condition
  - [ ] **Contact information display**: conditional email and location rendering  
  - [ ] **Copyright HTML**: `dangerouslySetInnerHTML` for attribution
  - [ ] **Icon integration**: Mail and MapPin icons for contact info

- [ ] **Maintain exact styling and accessibility**:
  - [ ] All Tailwind classes preserved exactly
  - [ ] All hover states and transitions maintained
  - [ ] All responsive breakpoints identical
  - [ ] Screen reader support for external links maintained

#### Step 5.7.5: Create CompactFooter (if exists) or Design Minimal Version
- [ ] **Investigate CompactFooter existence**:
  - Check if `templates/nextjs/src/components/footers/CompactFooter.tsx` exists
  
- [ ] **If exists - migrate exactly**:
  - Follow same dependency injection pattern as DefaultFooter
  - Preserve minimal layout and essential elements only
  
- [ ] **If doesn't exist - create minimal version**:
  - Single-row layout with copyright + essential links + theme toggle
  - Use same FooterSections interface but render subset
  - Responsive design for mobile optimization

#### Step 5.7.6: Create Footer Wrapper with Variant Selection
- [ ] **Create footer wrapper**:
  - File: `packages/ui-core/src/components/footers/Footer.tsx`
  - **Source logic**: `templates/nextjs/src/components/footer.tsx`
  
- [ ] **Abstract variant selection**:
  - [ ] Accept `variant` prop instead of reading siteConfig
  - [ ] Support 'default' (DefaultFooter) and 'compact' (CompactFooter) 
  - [ ] Pass through all props to selected footer variant
  - [ ] Maintain same conditional rendering pattern

**PHASE 3: Integration and Testing (CRITICAL)**

#### Step 5.7.7: Update Export Structure with Full Footer System
- [ ] **Create comprehensive footer exports**:
  - File: `packages/ui-core/src/components/footers/index.ts`
  - Export: `DefaultFooter`, `CompactFooter`, `Footer`, `FooterLinkComponent`
  
- [ ] **Update main component exports**:
  - File: `packages/ui-core/src/components/index.ts`
  - Add: `export * from './footers';`
  
- [ ] **Update types exports**:
  - File: `packages/ui-core/src/types/index.ts` 
  - Add: `export * from './footer';`

#### Step 5.7.8: Complex Test Cards Integration 
- [ ] **Import all footer variants**:
  - File: `templates/nextjs/src/app/test-cards/page.tsx`
  - Add template import: `import TemplateFooter from '@/components/footer';`
  - Add ui-core imports: `import { Footer as UiCoreFooter } from '@manta-templates/ui-core';`
  - Import content loader: `import { getFooterContent } from '@/lib/footerContent';`

- [ ] **Create footer comparison sections**:
  - [ ] **Challenge**: Footers are very large - need special layout treatment
  - [ ] **Default footer comparison**: Side-by-side DefaultFooter versions
  - [ ] **Compact footer comparison**: Side-by-side CompactFooter versions  
  - [ ] **Load footer content at server level**: Use getFooterContent()
  - [ ] **Template version**: `<TemplateFooter />` (uses siteConfig variant)
  - [ ] **UI-Core versions**: Test both 'default' and 'compact' variants explicitly
  - [ ] Use full-width sections, not card grid layout

#### Step 5.7.9: Comprehensive Build and Integration Testing
- [ ] **TypeScript compilation verification**:
  - [ ] Run `pnpm build` in ui-core package
  - [ ] Resolve complex type dependencies (FooterSections, FooterLink interfaces)
  - [ ] Ensure all footer variant exports are typed correctly
  - [ ] Verify dependency injection types work correctly
  
- [ ] **Template integration testing**:
  - [ ] Run `pnpm build` in templates/nextjs
  - [ ] Verify test-cards page renders all footer variants
  - [ ] Test that variant switching works (default vs compact)
  - [ ] Test all footer links work correctly
  - [ ] Test external link indicators appear and function
  - [ ] Test responsive behavior across all breakpoints
  - [ ] Test theme toggle integration in footer
  - [ ] Test contact information display (email, location)
  - [ ] Test copyright attribution HTML rendering

**Success Criteria - COMPREHENSIVE**:
- [ ] **Visual Parity**: Both footer variants look identical to template versions
- [ ] **Content Fidelity**: All sections render correctly (quickLinks, resources, social, legal, professional)
- [ ] **Conditional Logic**: Professional links vs contact switching works correctly  
- [ ] **Link Functionality**: All footer links work with dependency injection
- [ ] **External Link Indicators**: ExternalLink icons appear for external links
- [ ] **Contact Display**: Email and location information render with icons
- [ ] **Copyright Rendering**: HTML attribution renders correctly
- [ ] **Responsive Design**: All 4 responsive breakpoints work identically
- [ ] **Theme Integration**: ThemeToggle placement and functionality preserved
- [ ] **Variant Selection**: Footer wrapper correctly switches between variants
- [ ] **Framework Independence**: No Next.js dependencies in ui-core components
- [ ] **Type Safety**: All complex interfaces properly typed
- [ ] **Test Integration**: All footer variants appear and function in test-cards
- [ ] **Build Success**: Both packages build without errors
- [ ] **Accessibility**: All ARIA attributes and screen reader support maintained

**CRITICAL PITFALLS FOR JUNIOR AI - SPECIAL ATTENTION**:
- 🚨 **DO NOT simplify the content structure** - FooterSections interface is complex for a reason
- 🚨 **Preserve ALL conditional rendering logic** - professional links vs contact switching is critical
- 🚨 **Don't break responsive grid layout** - 4-column responsive behavior must work exactly
- 🚨 **Handle external links correctly** - ExternalLink icons and target="_blank" are essential  
- 🚨 **Preserve copyright HTML rendering** - dangerouslySetInnerHTML is intentional
- 🚨 **Footer is too large for card layout** - needs special test-cards page treatment
- 🚨 **Test both footer variants** - don't just test DefaultFooter
- 🚨 **ThemeToggle integration is complex** - footer controls theme toggle placement
- 🚨 **Content loading is async** - maintain server component patterns for content
- 🚨 **Don't modify contact icons or styling** - Mail/MapPin icon usage is specific

### Task 5.8: Migrate ComingSoonOverlay Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.7  

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

### Task 5.9: Migrate Container Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.8  

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
**Dependencies**: Task 5.9  

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
- [x] **Component Parity**: In progress - 5/11 Priority 1 components successfully migrated to ui-core (SidebarPostCard, Adapter Cleanup, BlogIndexCard, TechnologyScroller, and ThemeProvider)
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