---
layer: project
docType: slice-design
status: ready-for-implementation
phase: Phase 4 - Slice Design (Low-Level Design)
---

# Slice 12: Colors and Themes System Migration

## Overview

**Technical Fellow Design Document**

This slice migrates the fragmented color system from template-specific implementations to a centralized, framework-agnostic color architecture in ui-core. The design creates a professional 3-layer color system following 2025 design standards while preserving exact visual appearance.

## High-Level Context

Based on the slice plan (03-slices.manta-templates.md), this slice focuses on design system infrastructure that supports all templates. It creates the foundation for consistent theming across Next.js, Astro, and React Router templates.

**Dependencies**: 
- Slice 09 (Component Parity) ✅ COMPLETED
- Active after Slice 10 (Template Migration) priority work

## Problem Analysis

### Current State Assessment

**✅ ALREADY IMPLEMENTED**:
- Complete gray scale with exact hex equivalents in `radixColors.css`
- ShadCN design system extracted to dedicated `shadcn.css` file
- Theme switching system via ColorSelector component (teal, mintteal, blue, purple, orange)
- 3-layer color system architecture properly structured
- Proper import order in ui-core `index.css`

**🔄 PARTIALLY IMPLEMENTED**:
- `shadcn.css` still contains hardcoded OKLCH values instead of variable references
- Template `globals.css` still contains ~238 lines that should be minimal

**❌ REMAINING ISSUES**:
- ShadCN variables use hardcoded OKLCH instead of gray/accent variables
- Template-specific theme customization not documented
- No mechanism for users to add custom themes without modifying ui-core

### Key Problems to Solve

**Technical Debt**:
- `shadcn.css` lines 9-83 use hardcoded OKLCH values instead of `var(--gray-*)` references
- Template globals.css needs reduction from 238+ lines to minimal imports
- Duplicate radius definitions need consolidation

**User Experience Gaps**:
- No clear path for end-users to add custom themes (e.g., "banana" theme with brown+yellow)
- Missing documentation for theme customization patterns
- Theme switching limited to pre-built palettes in ui-core

## Technical Architecture

### 3-Layer Color System Design

**Layer 1: Raw Color Palettes** (`radixColors.css`)
```css
/* Base OKLCH color definitions */
:root {
  /* Teal Palette - 12 steps */
  --teal-1: oklch(98.5% 0.010 180);
  --teal-2: oklch(96.8% 0.020 180);
  /* ... through teal-12 */
  
  /* Gray Palette - Exact hex equivalents */
  --gray-1: oklch(99.0% 0.000 0);  /* Equivalent to #fefefe */
  --gray-2: oklch(95.3% 0.000 0);  /* Equivalent to #f3f4f6 */
  --gray-6: oklch(82.1% 0.000 0);  /* Equivalent to #d1d5db */
  /* ... complete 12-step scale */
}

/* Dark mode variants */
:root.dark {
  --gray-3: oklch(26.1% 0.000 0);  /* Equivalent to #374151 */
  --gray-7: oklch(43.8% 0.000 0);  /* Equivalent to #6b7280 */
  /* ... dark mode adjustments */
}
```

**Layer 2: Semantic Color Mappings** (`semanticColors.css` + `shadcn.css`)
```css
/* Accent system with palette switching */
:root,
[data-palette="teal"] {
  --color-accent-1: var(--teal-1);
  --color-accent-9: var(--teal-9);
  /* ... complete mapping */
}

[data-palette="orange"] {
  --color-accent-1: var(--orange-1);
  --color-accent-9: var(--orange-9);
  /* ... orange theme */
}

/* ShadCN design system variables */
:root {
  --background: var(--gray-1);
  --foreground: var(--gray-12);
  --muted: var(--gray-2);
  --muted-foreground: var(--gray-8);
  --border: var(--gray-6);
  /* ... complete ShadCN mapping */
}
```

**Layer 3: Component Styles** (`components.css`)
```css
/* Framework-agnostic base styles */
* {
  @apply border-border outline-ring/50;
}

body {
  @apply bg-background text-foreground;
}

/* Professional scrollbar styling (2025 best practices) */
::-webkit-scrollbar-track {
  background: var(--gray-2);
}
::-webkit-scrollbar-thumb {
  background: var(--gray-6);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--gray-7);
}

/* Utility classes using semantic variables */
.gradient-primary {
  background: linear-gradient(135deg, var(--color-accent-7), var(--color-accent-9));
}
```

### File Structure Design
```
packages/ui-core/src/styles/
├── index.css           # Main entry, @theme mappings, imports
├── radixColors.css     # Raw OKLCH color palettes (all colors)
├── semanticColors.css  # Accent mappings + palette switching logic
├── shadcn.css          # ShadCN design system variables
└── components.css      # Base styles, utilities, scrollbars
```

## Data Flow and Component Interactions

### Color Resolution Flow
```
Raw Color (--teal-9) 
  ↓
Semantic Role (--color-accent-9)
  ↓  
Design System Variable (--primary)
  ↓
Component Implementation (.btn-primary)
```

### Theme Switching Architecture
```javascript
// Theme switching via data attributes
document.documentElement.setAttribute('data-palette', 'orange');

// Automatic CSS variable cascade:
// --color-accent-9 → var(--orange-9) → oklch(65.3% 0.19 45)
```

### Import Order Dependency
```css
/* index.css - Critical import order */
@import "./radixColors.css";     /* Must be first - defines raw colors */
@import "./semanticColors.css";  /* Second - maps raw to semantic */
@import "./shadcn.css";          /* Third - design system variables */
@import "./components.css";      /* Last - component implementations */

/* Tailwind @theme integration */
@theme {
  --color-accent-1: var(--color-accent-1);
  /* ... expose all semantic colors as Tailwind utilities */
}
```

## Cross-Slice Dependencies and Interfaces

### Template Integration Interface
```typescript
// Template globals.css becomes minimal import-only
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";
@import "@manta-templates/ui-core/dist/styles/index.css";

/* Template-specific customizations only */
/* All color system handled by ui-core */
```

### Component Integration Pattern
```typescript
// ui-core components automatically inherit theme
export function Button({ variant = "primary", ...props }) {
  return (
    <button 
      className={`btn btn-${variant}`}  // Uses semantic color variables
      {...props} 
    />
  );
}

// No theme prop needed - CSS cascade handles theming
```

### Framework Adapter Considerations
- **Next.js**: Direct CSS import, Tailwind integration
- **Astro**: CSS module support, component island compatibility  
- **React Router**: Vite CSS bundling, development server support

## Color Preservation Strategy

### Exact Hex to OKLCH Mapping
Critical requirement: Zero visual changes during migration.

**Scrollbar Color Preservation**:
| Current Hex | Usage | Target Variable | OKLCH Equivalent |
|-------------|-------|----------------|------------------|
| `#f3f4f6` | Light track | `--gray-2` | `oklch(95.3% 0.000 0)` |
| `#d1d5db` | Light thumb | `--gray-6` | `oklch(82.1% 0.000 0)` |
| `#9ca3af` | Light hover | `--gray-7` | `oklch(66.9% 0.000 0)` |
| `#374151` | Dark track | `--gray-3` | `oklch(26.1% 0.000 0)` |
| `#6b7280` | Dark thumb | `--gray-7` | `oklch(43.8% 0.000 0)` |

**ShadCN Design System Preservation**:
All existing ShadCN variables must maintain identical OKLCH values to prevent component visual regressions.

**Gradient Utility Preservation**:
Gradient utilities must produce pixel-perfect results using semantic variables instead of hardcoded colors.  Must keep any special gradient classes defined in components.css (ui-core).

## Implementation Strategy

### Phase 1: ShadCN Variable Optimization ✅ Foundation Ready
1. **✅ SKIP: Gray Scale** - Already implemented with exact hex equivalents
2. **✅ SKIP: ShadCN Extraction** - Already extracted to dedicated file
3. **Convert ShadCN Hardcoded OKLCH** - Replace hardcoded values with `var(--gray-*)` references

### Phase 2: Template Reduction
4. **Template Globals Reduction** - Minimize globals.css from 238+ lines to minimal imports
5. **Visual Regression Testing** - Ensure zero visual changes during reduction
6. **Build Integration Testing** - Verify template still works identically

### Phase 3: User-Customizable Theming System
7. **Template-Level Theme Definition** - Enable users to define custom themes in their template
8. **Theme Registration Pattern** - Allow `data-palette="banana"` for user-defined themes
9. **Documentation & Examples** - Complete guide for end-user theme customization

### Phase 4: Enhancement & Polish
10. **✅ SKIP: Theme Switching** - Already implemented via ColorSelector component
11. **Template Independence Testing** - Verify template works entirely from ui-core
12. **Performance & Bundle Optimization** - Ensure minimal CSS overhead

## Risk Assessment and Mitigation

### Technical Risks

**High Risk: Color Accuracy**
- **Risk**: OKLCH conversion introduces visual differences
- **Mitigation**: Precise hex-to-OKLCH conversion with automated testing
- **Verification**: Pixel-perfect screenshot comparison

**Medium Risk: CSS Cascade Dependencies**  
- **Risk**: Import order affecting color resolution
- **Mitigation**: Explicit import order documentation, build-time verification
- **Verification**: CSS variable resolution testing

**Medium Risk: Framework Compatibility**
- **Risk**: CSS processing differences between Next.js, Astro, Vite
- **Mitigation**: Framework-agnostic CSS patterns, compatibility testing
- **Verification**: Multi-framework build testing

### Process Risks

**Low Risk: Migration Complexity**
- **Risk**: Coordinating multiple file changes
- **Mitigation**: Incremental approach with rollback capability
- **Verification**: Feature-flag approach for safe deployment

## Testing and Validation Strategy

### Visual Regression Testing
```bash
# Before migration
npm run build && npm run screenshot-baseline

# After each migration step  
npm run build && npm run screenshot-compare

# Automated pixel-perfect comparison
```

### Color Accuracy Testing
```javascript
// Automated OKLCH equivalence testing
const testColorAccuracy = () => {
  const expectedHex = '#f3f4f6';
  const actualOklch = getComputedStyle(document.documentElement)
    .getPropertyValue('--gray-2');
  
  expect(oklchToHex(actualOklch)).toBe(expectedHex);
};
```

### Build Integration Testing
```bash
# Multi-package build verification
pnpm build:ui-core && pnpm build:nextjs
pnpm test:visual-regression
pnpm test:color-accuracy
```

## Success Criteria

### Functional Requirements
- [ ] All current colors preserved exactly (zero visual changes)
- [ ] ShadCN components work identically 
- [ ] Scrollbars maintain current appearance with neutral grays
- [ ] Theme switching works via `data-palette` attribute
- [ ] Dark mode functions correctly
- [ ] Framework-agnostic architecture achieved

### Quality Requirements  
- [ ] All builds pass (ui-core, templates)
- [ ] No hardcoded hex colors remain in system
- [ ] Complete gray scale available (--gray-1 through --gray-12)
- [ ] Professional scrollbar styling follows 2025 best practices
- [ ] TypeScript support for theme variables

### Performance Requirements
- [ ] CSS bundle size impact <5KB additional
- [ ] Color resolution performance identical
- [ ] Build time impact <10% increase
- [ ] Runtime theme switching <100ms

## User-Customizable Theming System

### Template-Level Theme Definitions
Enable users to add custom themes without modifying ui-core:

**Complete Theme System in Template globals.css**:
```css
/* Theme Registry - Controls which themes appear in ColorSelector */
:root {
  --user-themes: "banana,sunset,forest";     /* Available theme IDs */
  --theme-names: "🍌 Banana,🌅 Sunset,🌲 Forest"; /* Display names (optional) */
  --default-theme: "banana";                 /* Default selection (optional) */
}

/* Multi-Color Theme Definitions */
[data-palette="banana"] {
  /* Yellow accent system */
  --color-accent-1: oklch(0.99 0.02 85);   /* Light yellow */
  --color-accent-2: oklch(0.96 0.04 85);   
  --color-accent-3: oklch(0.92 0.06 85);   
  --color-accent-4: oklch(0.86 0.08 85);   
  --color-accent-5: oklch(0.78 0.10 85);   
  --color-accent-6: oklch(0.68 0.12 85);   
  --color-accent-7: oklch(0.56 0.14 85);   
  --color-accent-8: oklch(0.45 0.16 85);   
  --color-accent-9: oklch(0.58 0.14 45);   /* Brown primary accent */
  --color-accent-10: oklch(0.52 0.16 45);  
  --color-accent-11: oklch(0.46 0.18 45);  /* Dark brown text */
  --color-accent-12: oklch(0.15 0.04 45);  /* Very dark brown */
  
  /* Alpha variants for transparency effects */
  --color-accent-a1: oklch(0.99 0.02 85 / 0.05);
  --color-accent-a6: oklch(0.68 0.12 85 / 0.4);
  --color-accent-a9: oklch(0.58 0.14 45 / 0.7);
  
  /* Override neutral colors with brown tones */
  --gray-1: oklch(0.96 0.01 45);    /* Light brown background */
  --gray-2: oklch(0.92 0.02 45);    /* Brown scrollbar track */
  --gray-6: oklch(0.68 0.08 45);    /* Brown borders/thumbs */
  --gray-8: oklch(0.52 0.12 45);    /* Brown muted text */
  --gray-11: oklch(0.32 0.16 45);   /* Dark brown text */
}

[data-palette="sunset"] {
  /* Orange-to-pink gradient theme */
  --color-accent-1: oklch(0.99 0.02 25);   /* Light orange */
  --color-accent-9: oklch(0.65 0.18 350);  /* Pink accent */
  --color-accent-11: oklch(0.45 0.20 350); /* Dark pink */
  /* ... complete 12-step mapping */
}

/* Define additional themes but don't expose until needed */
[data-palette="forest"] {
  /* Green-brown earthy theme - ready but not in registry yet */
  --color-accent-9: oklch(0.55 0.15 130);  /* Forest green */
  --gray-6: oklch(0.65 0.08 85);           /* Warm brown borders */
  /* ... complete definition */
}
```

### Automatic ColorSelector Integration

**Enhanced ColorSelector with Theme Discovery**:
```typescript
// ColorSelector automatically reads theme registry
const BUILTIN_ACCENTS = ["teal", "mintteal", "blue", "purple", "orange"] as const;

function useAvailableThemes() {
  const [userThemes, setUserThemes] = useState<string[]>([]);
  const [themeNames, setThemeNames] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Read user-defined themes
    const userThemesString = getComputedStyle(document.documentElement)
      .getPropertyValue('--user-themes').trim();
    const themeNamesString = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-names').trim();
    
    if (userThemesString) {
      const themes = userThemesString.split(',').map(s => s.trim()).filter(Boolean);
      setUserThemes(themes);
      
      // Parse display names if provided
      if (themeNamesString) {
        const names = themeNamesString.split(',').map(s => s.trim());
        const nameMap = {};
        themes.forEach((theme, i) => {
          nameMap[theme] = names[i] || theme;
        });
        setThemeNames(nameMap);
      }
    }
  }, []);
  
  return {
    allThemes: [...BUILTIN_ACCENTS, ...userThemes],
    getDisplayName: (theme: string) => themeNames[theme] || theme
  };
}
```

### Real-World Radix Color Integration

**Step 1: Generate Colors with Radix Tool**
```css
/* Generated by Radix Custom Color Tool */
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
      --yellow-1: oklch(14.2% 0.0135 107.2);
      --yellow-2: oklch(20.2% 0.0177 107.2);
      /* ... complete yellow scale */
      
      --brown-1: oklch(18.5% 0.012 45);
      --brown-2: oklch(22.3% 0.015 45);
      /* ... complete brown scale */
    }
  }
}
```

**Step 2: Map to Semantic System**
```css
[data-palette="banana"] {
  /* Map yellow to accent system */
  --color-accent-1: var(--yellow-1);
  --color-accent-2: var(--yellow-2);
  --color-accent-9: var(--yellow-9);   /* Primary accent */
  --color-accent-11: var(--brown-11);  /* High contrast brown */
  
  /* Map brown to neutral system */
  --gray-1: var(--brown-1);
  --gray-2: var(--brown-2);
  --gray-6: var(--brown-6);  /* Borders, scrollbars */
  --gray-8: var(--brown-8);  /* Muted text */
  
  /* Alpha variants automatically work */
  --color-accent-a1: var(--yellow-a1);
  --gray-a1: var(--brown-a1);
}
```

### Client Workflow Benefits

**Developer Control Scenarios**:
```css
/* Scenario 1: Initial client presentation */
:root {
  --user-themes: "sunset,forest";  /* Show only 2 curated options */
}

/* Scenario 2: Client wants to see "something warmer" */
:root {
  --user-themes: "sunset,banana";  /* Swap forest for banana */
}

/* Scenario 3: Final decision with backup */
:root {
  --user-themes: "forest";         /* Launch theme */
  --default-theme: "forest";       /* Ensure consistency */
}
/* Keep sunset and banana definitions ready but hidden */
```

**CSS Cascade Priority**:
Template themes override ui-core defaults through import order:
```css
@import "@manta-templates/ui-core/dist/styles/index.css";

/* User themes defined after ui-core import take precedence */
[data-palette="banana"] { /* Overrides any ui-core definitions */ }
```

### Future Extensibility

**Component-Specific Theming**:
```css
/* Component-level theme overrides */
.card-special {
  --background: var(--color-accent-2);
  --foreground: var(--color-accent-11);
}
```

**Dynamic Theme Generation**:
Future support for runtime theme generation from brand colors using OKLCH color space math.

## Integration with Existing Slices

### Slice 10 Coordination (Template Migration)
This slice provides the color infrastructure that Slice 10 template migration depends on. Template migration should consume ui-core styles after this migration.

### Slice 11+ Framework Templates
This color system becomes the foundation for Astro and React Router templates, ensuring consistent theming across all frameworks.

## Documentation Requirements

### Developer Documentation
- [ ] Color system architecture guide
- [ ] Theme customization tutorial  
- [ ] Migration guide from hardcoded colors
- [ ] Framework-specific integration examples

### Design System Documentation
- [ ] Complete color palette reference
- [ ] Semantic color usage guidelines
- [ ] Accessibility and contrast guidelines
- [ ] Theme switching API documentation

---

**Technical Fellow Assessment**: This slice creates a production-ready, framework-agnostic color system that maintains exact visual fidelity while enabling powerful theming capabilities. The 3-layer architecture provides clear separation of concerns and supports both current needs and future extensibility.

The design follows 2025 design system best practices with professional scrollbar styling, OKLCH color space usage, and semantic color mapping. Risk mitigation through exact color preservation and comprehensive testing ensures zero visual regression during migration.

Implementation complexity is moderate with clear phase-based execution and rollback capabilities. The architecture integrates cleanly with existing slices and provides foundation for multi-framework template development.