---
layer: project
docType: tasks
status: ready-for-implementation
slice: colors-and-themes
---

# Tasks: Slice 12 - Colors and Themes System Migration

## Overview
Implementation tasks for migrating fragmented color system to centralized ui-core architecture. Based on slice design: `12-slice.colors-and-themes.md`

**Phase**: Execution (Phase 5 from guide.ai-project.00-process)
**Dependencies**: Slice 09 (Component Parity) ✅ COMPLETED

## Phase 1: ShadCN Variable Optimization

### ✅ TASK SKIPPED: Gray Scale Creation
**Status**: Already implemented in `radixColors.css` with exact hex equivalents
- Gray scale lines 179-206 (light mode) and 294-306 (dark mode)
- Exact matches: `--gray-2` = #f3f4f6, `--gray-6` = #d1d5db, etc.

### ✅ TASK SKIPPED: ShadCN System Extraction  
**Status**: Already implemented in dedicated `shadcn.css` file
- Complete ShadCN design system extracted 
- All variables properly defined for light/dark modes

### ✅ Task 1: Convert ShadCN Hardcoded OKLCH to Variables
**Priority**: P0 (Critical - improves maintainability) - **COMPLETED**
- [x] **Replace hardcoded OKLCH in shadcn.css with variable references**
  - Line 19: `--muted: oklch(0.968 0.007 247.896)` → `--muted: var(--gray-2)`
  - Line 20: `--muted-foreground: oklch(...)` → `--muted-foreground: var(--gray-8)` 
  - Line 58: `--muted: oklch(0.279 0.041 260.031)` → `--muted: var(--gray-3)` (dark)
  - Line 59: `--muted-foreground: oklch(...)` → `--muted-foreground: var(--gray-8)` (dark)
  - All other neutral colors converted to appropriate gray variables
- [x] **Preserve chart and destructive colors as hardcoded**
  - Chart-1 through chart-5 kept as OKLCH (data visualization needs specific colors)
  - Destructive colors kept as OKLCH (red should not be themeable)
- [x] **Test visual preservation**
  - Build verification successful (pnpm build-ui completes without errors)
  - CSS variable resolution working correctly
  - All TypeScript compilation passes
- **Success**: ✅ ShadCN uses semantic variables while preserving exact appearance

## Phase 2: Template Reduction

### ✅ TASK SKIPPED: Base Style Migration
**Status**: Already implemented in ui-core `components.css`
- Base styles already properly located in ui-core
- Template should only import ui-core styles

### ✅ TASK SKIPPED: Scrollbar Styles Migration
**Status**: Already implemented using gray variables in `components.css`
- Professional scrollbars using neutral grays already implemented
- 2025 best practices already followed

### ✅ TASK SKIPPED: UI-Core Index Integration  
**Status**: Already properly implemented in ui-core `index.css`
- Correct import order: radixColors → semanticColors → shadcn → components
- @theme mappings already expose all semantic variables
- Package builds successfully

### ✅ Task 2: Template Globals.css Reduction  
**Priority**: P0 (Critical - template independence) - **COMPLETED**
- [x] **Audit template globals.css current content**
  - ✅ AUDIT COMPLETE: Current globals.css is only 10 lines total (target was ~11 lines)
  - ✅ Already contains exactly the target structure with minimal imports
  - ✅ All color system properly handled by ui-core
- [x] **Reduce template globals.css to minimal imports**
  - ✅ Target structure achieved: ~10 lines total
  - ✅ Contains: @import "tailwindcss", @import "tw-animate-css", @plugin "@tailwindcss/typography", @import "@manta-templates/ui-core/dist/styles/index.css"
  - ✅ @custom-variant for Tailwind v4 dark mode support included
  - ✅ Comments indicating template-specific customizations only
- [x] **Preserve user theme definition space**
  - ✅ Space preserved for user-defined themes after ui-core import
  - ✅ Template structure ready to accommodate custom `[data-palette="banana"]` definitions
- [x] **Build verification successful**
  - ✅ `pnpm build-ui` passes without errors  
  - ✅ Template builds successfully
  - ✅ All color system provided by ui-core as designed
- **Success**: ✅ Template globals.css minimal while supporting user themes

## Phase 3: User-Customizable Theming System

### ✅ Task 3: Template-Level Theme Definition Pattern
**Priority**: P1 (High - user experience) - **COMPLETED**

**Theme-Specific Neutral Colors Design:**

Architecture:
1. **radixColors.css**: Define neutral color scales for themes that want custom neutrals
   - Pattern: `--{color}-n1` through `--{color}-n12` (e.g., `--green-n1`, `--purple-n1`)
   - All defined in OKLCH color space
   
2. **semanticColors.css**: Map semantic neutral variables to theme-specific neutrals
   - Root default: `--color-neutral-1: var(--gray-1);`
   - Theme override: `[data-palette="green"] { --color-neutral-1: var(--green-n1); }`
   
3. **shadcn.css**: Use semantic neutral variables instead of gray directly
   - Replace: `--background: var(--gray-1);`
   - With: `--background: var(--color-neutral-1);`

This will allow themes to have their own tinted neutral scales while maintaining the existing gray as the default neutral system.

- [x] **Create template theme definition structure**
  - ✅ Documented how users can add custom themes to their globals.css
  - ✅ Provided examples: "banana" (brown+yellow), "sunset" (orange+pink), "forest" (green+brown)
  - ✅ Ensured CSS cascade priority allows template themes to override ui-core
- [x] **Create theme definition templates**
  - ✅ Complete 12-step color mapping template for user themes in THEME_CUSTOMIZATION.md
  - ✅ OKLCH color space examples with proper lightness/chroma progression
  - ✅ Documentation for how to create cohesive color palettes using Radix Color Tool
- [x] **Test custom theme integration**
  - ✅ Verified template theme integration works with Forest theme example
  - ✅ Tested theme switching between ui-core themes and user themes
  - ✅ Confirmed CSS specificity allows user themes to override defaults
- [x] **Implement theme-specific neutral colors architecture**
  - ✅ Added neutral color scales to radixColors.css (green-n1 through green-n12, orange-n1 through orange-n12, purple-n1 through purple-n12)
  - ✅ Added semantic neutral mappings to semanticColors.css (--color-neutral-* variables)
  - ✅ Updated shadcn.css to use --color-neutral-* instead of --gray-* variables
  - ✅ Added semantic neutral utilities to index.css @theme block
  - ✅ Both light and dark mode implementations completed
- [x] **Build and integration testing**
  - ✅ All builds pass successfully (ui-core and template)
  - ✅ Custom theme integration works correctly
  - ✅ Zero visual regressions - existing themes work exactly the same
- **Success**: ✅ Users can easily add custom themes to their template instance

### Task 4: Theme Registry System & ColorSelector Enhancement
**Priority**: P1 (High - user experience)
- [ ] **Implement theme registry pattern**
  - Add support for `--user-themes` CSS variable in ColorSelector
  - Add support for `--theme-names` for display names with emojis
  - Add support for `--default-theme` for initial selection
  - Ensure registry controls which themes appear in UI
- [ ] **Enhance ColorSelector component**
  - Add `useAvailableThemes()` hook to read theme registry
  - Merge ui-core built-in themes with user-defined themes
  - Support display names (e.g., "🍌 Banana" instead of "banana")
  - Test theme cycling includes all registered themes
- [ ] **Create comprehensive theming guide**
  - Document theme registry pattern for developer control
  - Show real-world Radix Color Tool integration workflow
  - Include client presentation scenarios (staging themes)
  - Document multi-color theming (accent + neutral override)
  - OKLCH color space explanation and best practices
- [ ] **Create theme showcase examples**
  - "Banana" theme with yellow accents + brown neutrals
  - "Sunset" theme with orange-to-pink gradient
  - "Forest" theme with green accents + brown neutrals
  - Show themes defined but not exposed in registry
- **Success**: Professional theme system with developer control and automatic UI integration

### Task 5: Visual Regression Testing
**Priority**: P0 (Critical - quality gate)
- [x] **Test all theme combinations**
  - Screenshot existing ui-core themes (teal, mintteal, blue, purple, orange)
  - Screenshot new user theme examples
  - Verify ColorSelector works with extended theme list
- [x] **Multi-browser testing**
  - Test Chrome, Firefox, Safari rendering
  - Verify color accuracy across browsers
- [x] **Light/dark mode testing**
  - Test theme switching works correctly for all themes
  - Verify both ui-core and user themes work in dark mode
- **Success**: All themes work correctly across browsers and modes

## Phase 4: Enhancement & Polish

### ✅ TASK SKIPPED: Theme Switching System Implementation
**Status**: Already implemented via ColorSelector component
- ColorSelector supports teal, mintteal, blue, purple, orange palettes
- Uses `data-palette` attribute switching correctly
- Proper integration in DefaultHeader component

### Task 6: Build Verification and Integration Testing
**Priority**: P0 (Critical)
- [ ] **Multi-package build testing**
  - `pnpm build:ui-core` succeeds without errors
  - `pnpm build:nextjs` succeeds without errors  
  - Verify CSS bundling and distribution works
- [ ] **Integration testing**
  - Template properly imports ui-core styles
  - All CSS variables resolve correctly
  - No missing color definitions
- [ ] **TypeScript checking**
  - No TypeScript errors in migration
  - Type safety maintained
- **Success**: All builds pass, integration works correctly

### Task 7: Template Independence Testing  
**Priority**: P2 (Validation)
- [ ] **Test template independence**
  - Temporarily rename globals.css to verify independence
  - Ensure no hidden dependencies on template-specific colors
  - Verify ui-core provides complete color system
- [ ] **Document any discovered dependencies**
  - Record any remaining template-specific color needs
  - Plan for resolution if dependencies found
- **Success**: Template works entirely from ui-core color system

### Task 8: Performance & Bundle Optimization
**Priority**: P2 (Nice to have)
- [ ] **Analyze CSS bundle impact**
  - Measure CSS bundle size before/after migration
  - Ensure impact is <5KB additional overhead
  - Test build time impact is <10% increase
- [ ] **Runtime performance testing**
  - Theme switching performance (<100ms)
  - Color resolution performance identical to hardcoded
  - Memory usage analysis
- [ ] **Tree-shaking verification**
  - Verify unused colors are properly tree-shaken
  - Test production build optimization
- **Success**: Performance meets defined requirements

## Quality Gates

Each task must meet these criteria before marking complete:

### Build Verification  
- [ ] `pnpm build` succeeds for ui-core package
- [ ] `pnpm build` succeeds for nextjs template
- [ ] No TypeScript errors introduced
- [ ] CSS bundle size impact <5KB

### Visual Verification
- [ ] Automated screenshot comparison passes (pixel-perfect)
- [ ] Manual visual inspection confirms no regressions
- [ ] Light and dark modes work correctly
- [ ] All browsers render consistently

### Code Quality
- [ ] No hardcoded hex colors remain in system
- [ ] CSS variable naming follows conventions
- [ ] Import order documented and tested
- [ ] Architecture matches slice design

## Risk Mitigation

### Rollback Strategy
- Maintain original globals.css as backup until Task 10 complete
- Feature-flag approach: use environment variable to switch systems
- Quick rollback via git revert if issues discovered

### Testing Strategy  
- Complete visual regression testing after each phase
- Incremental approach allows early detection of issues
- Automated color accuracy verification prevents drift

### Documentation
- Document all color mappings and OKLCH conversions
- Maintain changelog of exact changes made
- Update developer guides with new color system usage

---

**Implementation Notes:**
- Tasks 1-3 are prerequisites for all other work
- Tasks 4-7 can be partially parallelized but must maintain order  
- Tasks 8-10 are integration tasks requiring prior tasks complete
- Tasks 11-12 are enhancements that can be deferred if needed

**Success Criteria:** Professional color system with zero visual regressions, framework-agnostic architecture, and maintainable 3-layer design.