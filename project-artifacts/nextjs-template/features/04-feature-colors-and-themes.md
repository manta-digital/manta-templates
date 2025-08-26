---
layer: project
docType: feature
status: implementation
---

# Feature: Colors and Themes System Migration

## Overview

Migrate color system from split template/ui-core architecture to centralized ui-core design system. This creates a framework-agnostic color system that can be shared across Next.js, Astro, React, and other frameworks.

## Problem Statement

### Current State
- ❌ Colors split between `templates/nextjs/src/app/globals.css` and `packages/ui-core/src/styles/`
- ❌ ShadCN design system colors only in template (not framework-agnostic)
- ❌ Missing gray color scale (`--gray-1` through `--gray-12` referenced but not defined)
- ❌ Hardcoded hex colors in scrollbar styles
- ❌ Framework-specific base styles scattered across files

### Target State  
- ✅ Complete color system centralized in ui-core
- ✅ Framework-agnostic design system variables
- ✅ Proper gray scale with exact color preservation
- ✅ Semantic color mappings for easy theming
- ✅ Clean separation: raw colors → semantic roles → UI components

## Technical Approach

### Architecture Design
Three-layer color system:

**Layer 1: Raw Color Palettes** (`radixColors.css`)
- OKLCH color definitions for all palettes
- 12-step scales for each color (teal, blue, purple, etc.)
- Alpha variants for overlays
- Light and dark mode variants

**Layer 2: Semantic Mappings** (`semanticColors.css` + `shadcn.css`)
- Map raw colors to semantic roles
- Accent color system (`--color-accent-1` through `--color-accent-12`)
- ShadCN design system variables (background, foreground, card, primary, etc.)
- Palette switching via `data-palette` attributes

**Layer 3: Component Styles** (`components.css`)
- Base layer styles using semantic variables
- Utility classes (gradients, scrollbars)
- Framework-agnostic component styles

### File Organization
```
packages/ui-core/src/styles/
├── index.css           # Main entry, imports everything
├── radixColors.css     # Raw color palettes (OKLCH values)  
├── semanticColors.css  # Accent color mappings & palette switching
├── shadcn.css          # ShadCN design system variables
└── components.css      # Base styles, utilities, components
```

## Critical Findings

### Missing Gray Scale Issue
**DISCOVERED:** Template references `--gray-1` through `--gray-12` but these are **NOT DEFINED** anywhere in the codebase.

**Current hardcoded scrollbar colors:**
```css
/* Light mode */
#f3f4f6  /* gray-100 - track */
#d1d5db  /* gray-300 - thumb */
#9ca3af  /* gray-400 - thumb hover */

/* Dark mode */  
#374151  /* gray-700 - track */
#6b7280  /* gray-500 - thumb */
#9ca3af  /* gray-400 - thumb hover */
```

**SOLUTION:** Add complete gray scale to `radixColors.css` with exact OKLCH equivalents of these hex values.

### Scrollbar Best Practices (2025)
- ✅ Use neutral grays (NOT accent colors)
- ✅ Subtle, non-intrusive styling
- ✅ Consistent with GitHub, Discord, VS Code, Figma patterns
- ✅ Theme-aware but neutral

## Implementation Plan

### Phase 1: Foundation (Tasks 1-2)
1. **Add gray color scale to radixColors.css**
   - Convert hardcoded hex values to OKLCH equivalents
   - Define complete 12-step gray scale for light/dark modes
   - Ensure exact color preservation

2. **Create shadcn.css file**
   - Extract ShadCN variables from globals.css
   - Include radius, background, foreground, card, primary, secondary
   - Include chart colors and sidebar system
   - Maintain exact color values

### Phase 2: Migration (Tasks 3-6)  
3. **Move base layer styles to components.css**
   - `* { @apply border-border outline-ring/50; }`
   - `body { @apply bg-background text-foreground; }`
   - `.prose-lg h1` typography customizations

4. **Move gradient utilities to components.css**
   - Convert to use semantic accent variables
   - Maintain visual appearance

5. **Convert scrollbar styles to use gray variables**
   - Replace hardcoded hex with `var(--gray-*)` 
   - Preserve exact visual appearance
   - Use neutral approach (best practices)

6. **Update ui-core index.css**
   - Add proper import order
   - Add @theme mappings for Tailwind utilities
   - Ensure all semantic colors available as utilities

### Phase 3: Integration (Tasks 7-9)
7. **Test color preservation**
   - Take before/after screenshots
   - Verify scrollbars, gradients, base styles identical
   - Test light/dark mode consistency

8. **Update template globals.css**
   - Reduce to minimal import-only file
   - Remove all migrated styles
   - Keep only template-specific overrides

9. **Build and test packages**
   - Verify ui-core builds correctly
   - Test template imports ui-core properly
   - Confirm no visual regressions

## Color Preservation Strategy

### Exact Hex to OKLCH Mapping Required
Must preserve these exact colors:

| Current Hex | Usage | Target Gray Variable |
|-------------|-------|---------------------|
| `#f3f4f6` | Light track | `--gray-2` |
| `#d1d5db` | Light thumb | `--gray-6` |
| `#9ca3af` | Light thumb hover | `--gray-7` |
| `#374151` | Dark track | `--gray-3` |
| `#6b7280` | Dark thumb | `--gray-7` |
| `#9ca3af` | Dark thumb hover | `--gray-8` |

### ShadCN Color Preservation  
All ShadCN design system colors must maintain exact OKLCH values to prevent component visual changes.

### Gradient Preservation
Gradient utilities must produce identical visual results using semantic accent variables instead of hardcoded colors.

## Benefits After Migration

### For Developers
- **Single source of truth**: All colors in ui-core
- **Framework agnostic**: Works across any React framework
- **Easy customization**: Change `data-palette` attribute for new themes
- **Better maintainability**: Clear layer separation

### For Templates
- **Simplified globals.css**: Minimal import-only file
- **Consistent theming**: Automatic theme support
- **Reduced duplication**: No more color definitions in templates

### For Design System
- **Professional scrollbars**: Follow 2025 best practices
- **Complete theme system**: Accent + neutral + semantic colors
- **Accessibility ready**: Built-in dark mode and contrast support

## Risk Assessment

### Low Risk
- ✅ Moving CSS files (straightforward copy/paste)
- ✅ Color variable mappings (direct 1:1)
- ✅ @apply base styles (simple move)

### Medium Risk  
- ⚠️ Color matching (need exact OKLCH equivalents)
- ⚠️ Import order (critical for CSS cascade)
- ⚠️ Build process (ui-core distribution)

### Mitigation Strategies
- **Color audit first**: Verify exact mappings before migration
- **Visual testing**: Before/after screenshot comparison
- **Incremental approach**: One file at a time with testing
- **Rollback plan**: Keep original globals.css until verification complete

## Success Criteria

### Functional Requirements
- [ ] All current colors preserved exactly (no visual changes)
- [ ] Scrollbars maintain current appearance
- [ ] ShadCN components work identically
- [ ] Theme switching works via data-palette
- [ ] Dark mode functions correctly

### Quality Requirements
- [ ] All builds pass (ui-core, template)
- [ ] No hardcoded hex colors remain
- [ ] Professional scrollbar styling (neutral grays)
- [ ] Complete gray scale available
- [ ] Framework-agnostic architecture achieved

### Documentation Requirements
- [ ] Color system architecture documented
- [ ] Customization guide complete
- [ ] Migration notes clear
- [ ] Examples provided for common use cases

## Migration Tasks

1. **Add gray color scale to radixColors.css with exact color matches**
2. **Create new shadcn.css file with ShadCN design system variables**
3. **Move base layer styles from globals.css to components.css**  
4. **Move gradient utilities from globals.css to components.css**
5. **Convert scrollbar styles to use gray variables in components.css**
6. **Update ui-core index.css with proper import order and theme mappings**
7. **Test color preservation - compare before/after screenshots**
8. **Update template globals.css to minimal import-only file**
9. **Build and test all packages work correctly**

## Additional Tasks from Design Review
RECOMMENDATIONS FOR NEXT ITERATION:

  1. Fix ShadCN Color Inconsistency

  Replace hardcoded OKLCH in shadcn.css with gray variable
  references:
  --muted-foreground: var(--gray-8);
  --border: var(--gray-6);

  2. Simplify Theme Creation

  Create a single "theme definition" file that maps semantic
  roles to specific colors:
  /* theme-default.css */
  :root {
    --theme-primary: var(--teal-9);
    --theme-secondary: var(--gray-6);
    --theme-accent: var(--teal-7);
  }

  /* theme-banana.css */
  :root {
    --theme-primary: var(--orange-9);
    --theme-secondary: var(--yellow-6);
    --theme-accent: var(--brown-7);
  }

  3. Clean Up @theme Block

  - Remove duplicate radius definitions
  - Clarify what this theme represents
  - Add proper theme switching mechanism

  4. Test Template Independence

  Try temporarily renaming globals.css to see if the build
  breaks - this will reveal hidden dependencies.


---

*This migration creates a professional, framework-agnostic color system that follows 2025 design system best practices while preserving exact visual appearance.*