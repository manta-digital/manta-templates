---
layer: project
docType: tasks
slice: component-parity
project: manta-templates
lldReference: project-artifacts/nextjs-template/slices/09-slice.component-parity.md
status: complete
dependencies: 
  - slice-08-markdown-content
currentState: |
  - All Priority 1 components migrated to ui-core with framework-agnostic architecture
  - Tailwind v4 support and theming fixes completed 
  - Test-cards page demonstrates visual parity and build validation successful
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
- [x] **THEMING FIXES COMPLETED**: Fixed BlogIndexCard hover theming with light/dark mode variants

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
- [x] All animation speeds and directions work correctly ✅ COMPLETED: Animation issues fixed, smooth scrolling without jumping
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
- [x] **Examine header content system**:
  - File: `templates/nextjs/src/lib/headerContent.ts`
  - **Document interface**: getHeaderContent() return structure
  - **Note content fields**: title, logo, navigation links
  - **Identify dynamic vs static content**

- [x] **Map current header usage**:
  - File: `templates/nextjs/src/components/headers/DefaultHeader.tsx`
  - **Document import dependencies**: Next.js Image, Link, headerContent
  - **List all sub-components used**: BrandMark, ThemeToggle, ColorSelector, Container
  - **Identify styling patterns**: Tailwind classes, responsive breakpoints

#### Step 5.6.2: Create Framework-Agnostic Header Interface
- [x] **Create header types**:
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
- [x] **Create header component file**:
  - File: `packages/ui-core/src/components/headers/DefaultHeader.tsx`
  - **Copy template structure**: `templates/nextjs/src/components/headers/DefaultHeader.tsx`
  
- [x] **Update imports and dependencies**:
  - [x] Replace `import Image from 'next/image';` with ImageComponent prop usage
  - [x] Replace `import Link from 'next/link';` with LinkComponent prop usage  
  - [x] Replace `import { getHeaderContent } from '@/lib/headerContent';` with content prop
  - [x] Update `import BrandMark` to `import { BrandMark } from '../ui/BrandMark';`
  - [x] Update `import { ThemeToggle } from` to use ui-core ThemeToggle
  - [x] Update `import Container` to `import { Container } from '../layouts/Container';`
  - [x] Update `import { cn }` to `import { cn } from '../../utils/cn';`

- [x] **Preserve component logic**:
  - [x] Keep same responsive behavior for mobile/desktop navigation
  - [x] Keep same header layout: logo/title, navigation, theme controls
  - [x] Keep same conditional logo vs BrandMark logic
  - [x] Keep all accessibility attributes and ARIA labels
  - [x] Keep all Tailwind styling and responsive classes

- [x] **Implement dependency injection**:
  - [x] Use ImageComponent for logo rendering: `<ImageComponent src={content.logo} ...>`
  - [x] Use LinkComponent for navigation: `<LinkComponent href={nav.href} ...>`
  - [x] Handle external links appropriately with LinkComponent
  - [x] Default to standard elements if components not provided

#### Step 5.6.4: Create Header Wrapper Component
- [x] **Create header wrapper**:
  - File: `packages/ui-core/src/components/headers/Header.tsx`
  - **Copy template logic**: `templates/nextjs/src/components/header.tsx`
  
- [x] **Abstract variant selection**:
  - [x] Accept variant prop instead of reading siteConfig directly
  - [x] Support 'default' variant (maps to DefaultHeader)
  - [x] Provide interface for adding more header variants later
  - [x] Pass through all props to selected header component

#### Step 5.6.5: Handle ColorSelector Integration
- [x] **Important decision point**:
  - [x] ColorSelector is part of template ThemeToggle but complex
  - [x] **For this task**: Keep ColorSelector import from template themetoggle
  - [x] **Do NOT migrate ColorSelector** - treat as external dependency
  - [x] Document this decision for future ColorSelector migration task

#### Step 5.6.6: Update Component Exports
- [x] **Create headers directory exports**:
  - File: `packages/ui-core/src/components/headers/index.ts`
  - Add: `export { DefaultHeader } from './DefaultHeader';`
  - Add: `export { Header } from './Header';`
  
- [x] **Update main component exports**:
  - File: `packages/ui-core/src/components/index.ts` (if exists)
  - Add: `export * from './headers';`
  
- [x] **Update types exports**:
  - File: `packages/ui-core/src/types/index.ts`
  - Add: `export * from './header';`

#### Step 5.6.7: Add to Test Cards Page
- [x] **Import header components**:
  - File: `templates/nextjs/src/app/test-cards/page.tsx`
  - Add template import: `import TemplateHeader from '@/components/header';`
  - Add ui-core imports: `import { Header as UiCoreHeader } from '@manta-templates/ui-core';`
  - Import headerContent: `import { getHeaderContent } from '@/lib/headerContent';`

- [x] **Create header comparison section**:
  - [x] **Challenge**: Headers are large - use different layout than cards
  - [x] Create full-width comparison sections above card grid
  - [x] **Template version**: `<TemplateHeader />` 
  - [x] **UI-Core version**: `<UiCoreHeader content={headerContent} ImageComponent={Image} LinkComponent={Link} />`
  - [x] Use server component pattern to load headerContent
  - [x] Include labels distinguishing template vs ui-core versions

#### Step 5.6.8: Build and Verification
- [x] **TypeScript compilation**:
  - [x] Run `pnpm build` in ui-core package
  - [x] Resolve any import path or type errors
  - [x] Ensure all header exports are typed correctly
  
- [x] **Template integration testing**:
  - [x] Run `pnpm build` in templates/nextjs  
  - [x] Verify test-cards page renders both headers
  - [x] Test responsive behavior on both versions
  - [x] Test navigation links work on both versions
  - [x] Test theme toggle integration works

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
**Status**: Completed ✓

**Objective**: Migrate complete footer system to ui-core with full feature preservation, including multi-variant support and complex content loading.

**Comprehensive Migration Summary**:
✅ Comprehensive footer system analysis completed
✅ Created framework-agnostic footer content interfaces
✅ Created FooterLinkComponent abstraction for handling internal vs external links
✅ Migrated DefaultFooter with full complexity preservation:
   - 4-column responsive grid layout (Quick Links + Contact, Resources, Social, Legal + Professional)
   - Conditional rendering logic (professionalLinks vs professionalContact)
   - Contact information with Mail/MapPin icons
   - Copyright HTML rendering with dangerouslySetInnerHTML
   - ThemeToggle integration in bottom section
✅ Created CompactFooter with minimal single-row design + **THEMING FIXES COMPLETED**:
  - Fixed hardcoded colors to semantic tokens in CompactFooter
  - Properly integrated with theme system for light/dark mode support
✅ Created Footer wrapper with variant selection ('default', 'compact')
✅ Updated all export structures (footers, types, main index)
✅ Added comprehensive footer comparison to test-cards page showing template + both ui-core variants
✅ Both packages build successfully with no TypeScript errors

**Success Criteria Confirmation**:
- [x] Visual Parity: Both footer variants look identical to template versions
- [x] Content Fidelity: All sections render correctly
- [x] Conditional Logic: Professional links vs contact switching works
- [x] Link Functionality: All footer links work with dependency injection
- [x] External Link Indicators: Correct handling of external links
- [x] Contact Display: Email and location information render properly
- [x] Copyright Rendering: HTML attribution renders correctly
- [x] Responsive Design: All 4 responsive breakpoints work identically
- [x] Theme Integration: ThemeToggle placement and functionality preserved
- [x] Variant Selection: Footer wrapper correctly switches between variants
- [x] Framework Independence: No Next.js dependencies in ui-core components
- [x] Type Safety: All complex interfaces properly typed
- [x] Test Integration: All footer variants appear and function in test-cards
- [x] Build Success: Both packages build without errors
- [x] Accessibility: All ARIA attributes and screen reader support maintained

**Detailed Migration Tasks Completed**:
- [x] Step 5.7.1: Comprehensive Footer System Analysis
- [x] Step 5.7.2: Design Framework-Agnostic Content Interfaces
- [x] Step 5.7.3: Create FooterLinkComponent Abstraction
- [x] Step 5.7.4: Migrate DefaultFooter with Full Complexity
- [x] Step 5.7.5: Create CompactFooter
- [x] Step 5.7.6: Create Footer Wrapper with Variant Selection
- [x] Step 5.7.7: Update Export Structure with Full Footer System
- [x] Step 5.7.8: Complex Test Cards Integration
- [x] Step 5.7.9: Comprehensive Build and Integration Testing

**Project Impact**: Footer migration represents the most complex component migration, handling multiple variants, rich content structure, and conditional rendering logic.

### Task 5.8: Migrate ComingSoonOverlay Component
**Owner**: Junior AI  
**Complexity**: 2 (Simple-Moderate)  
**Dependencies**: Task 5.7  

**Objective**: Migrate coming soon overlay component with updates for reusability.

**Migration Steps**:
- [x] **Create ui-core component**:
  - File: `packages/ui-core/src/components/overlays/ComingSoonOverlay.tsx`
  - Full-screen overlay design
  - Customizable messaging
  - Optional countdown timer support
- [x] **Update for flexibility**:
  - Configurable text and styling
  - Optional email capture
  - Animation support
- [x] **Add to test-cards page**:
  - Include ComingSoonOverlay in test-cards comparison
  - Test customizable content
  - Test responsive behavior

**Success Criteria**:
- [x] Overlay displays correctly
- [x] Customizable content works
- [x] Responsive design maintained
- [x] Optional features configurable
- [x] Component appears in test-cards page

✅ **COMPLETED with Additional Theming Fixes**:
- Fixed ComingSoonOverlay height issues for proper full-screen display
- Resolved overlay positioning and sizing problems
- Comprehensive test coverage and feature preservation maintained

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

### Task 6.1: Component Validation and Build Verification
**Owner**: Junior AI  
**Estimated Time**: 2 hours  
**Dependencies**: Task 5.9, AboutCard test integration  

**Objective**: Validate migrated components work correctly and maintain quality standards.

**Validation Strategy**:
- [x] **Visual Parity Testing**:
   - Test-cards page comparison verification
   - Template vs ui-core rendering identical
   - All interactive features functional (theme toggle, color selector, etc.)

- [x] **Build and Type Safety**:
   - ✅ ui-core TypeScript compilation clean
   - ✅ Template production build successful 
   - ✅ All import/export paths working correctly

- [x] **Basic Functionality Tests**:
   - ✅ Dependency injection working (Image, Link, social icons)
   - ✅ Content loading via ContentProvider functional
   - ✅ Test-cards page demonstrates responsive behavior
   - ✅ Complete theme system operational (Provider + Toggle + ColorSelector)

**Success Criteria**:
- [x] Visual comparison shows identical rendering
- [x] Clean TypeScript compilation (only test warnings remain)
- [x] All interactive features work as expected
- [x] Theme system fully functional across components

### Task 6.2: Export Validation and Documentation Update
**Owner**: Junior AI  
**Estimated Time**: 1 hour  
**Dependencies**: Task 6.1  

**Objective**: Ensure all migrated components are properly exported and accessible.

**Validation Tasks**:
- [x] **UI-Core Package Exports**:
   - All migrated components exported from main index
   - Category-based exports working (cards, layouts, ui, overlays)
   - TypeScript types properly exported

- [x] **Template Integration Verification**:
   - ✅ All ui-core imports working in template
   - ✅ No missing dependencies or circular imports
   - ✅ Test-cards page demonstrates all migrated components

- [x] **Architecture Documentation**:
   - ✅ Direct dependency injection pattern established
   - ✅ No adapter wrapper architecture needed
   - ✅ Clear component usage patterns in test-cards page

**Success Criteria**:
- [x] All components importable from @manta-templates/ui-core
- [x] Template successfully uses ui-core components
- [x] Clean import structure with no circular dependencies

## Success Metrics

### Technical Metrics
- [x] **Component Migration Complete**: Successfully migrated all essential components
  - Cards: AboutCard, ArticleCard, BaseCard, BlogCard variants, ContentCard, ProjectCard, QuoteCard, SidebarPostCard, VideoCard, etc.
  - Layouts: BentoLayout, Container, Grid system, CardCarousel  
  - UI: ThemeToggle, ColorSelector, BrandMark, TechnologyScroller
  - Overlays: ComingSoonOverlay
  - Headers/Footers: Complete header and footer systems with variants

- [x] **Framework Support**: All components work with Next.js via dependency injection
- [x] **Complete Theme System**: ThemeProvider + ThemeToggle + ColorSelector integrated
- [x] **Build Success**: Both ui-core and template packages build without errors
- [x] **TAILWIND V4 SUPPORT COMPLETED**: Added comprehensive Tailwind CSS v4 support to ui-core package
- [ ] **Type Safety**: Zero TypeScript errors (some test-related errors remain)

### Quality Metrics  
- [x] **Visual Fidelity**: Test-cards page demonstrates identical rendering
- [x] **Functionality**: All features preserved with dependency injection
- [x] **Content Integration**: ContentProvider system working across components
- [x] **Architecture**: Direct dependency injection (no adapter wrappers needed)

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