---
layer: slice-design
slice: theme-aware-gradients
phase: 4-detailed-design
project: manta-templates
created: 2025-08-29
status: design
priority: medium
---

# Slice 14: Theme-Aware Gradients

## Overview

Enhance the GradientCard component to create dark and light theme versions of its gradients, transitioning from theme background colors to accent colors instead of the current black-through-color approach.

## Feature Goals

- **Theme Integration**: Gradients adapt to current theme's background and accent colors
- **Mode Awareness**: Automatic dark/light mode adjustment
- **Dual Control Systems**: Simple range-based AND advanced accent-to-accent gradients
- **Clean API**: Eliminate duplicate named gradients, use clear numeric controls
- **Zero Visual Impact**: Existing usage migrates with identical appearance
- **Performance**: Minimal impact on rendering performance

## Current State Analysis

### Existing GradientCard Structure

```typescript
// Current gradient presets (PROBLEMS: duplicates & confusing names)
const gradientPresets: Record<GradientPreset, string> = {
  teal: 'bg-gradient-to-br from-[var(--color-accent-7)] to-[var(--color-accent-10)]',
  blue: 'bg-gradient-to-br from-[var(--color-accent-6)] to-[var(--color-accent-10)]', // same end as teal
  purple: 'bg-gradient-to-br from-[var(--color-accent-7)] to-[var(--color-accent-11)]',
  sunset: 'bg-gradient-to-br from-[var(--color-accent-5)] to-[var(--color-accent-9)]',
  ocean: 'bg-gradient-to-br from-[var(--color-accent-6)] to-[var(--color-accent-10)]',  // DUPLICATE of blue
};

// ISSUES:
// 1. Names imply colors but gradients use current theme accent
// 2. Multiple duplicates: blue === ocean, teal ≈ sunset  
// 3. No clear relationship between name and intensity
```

### Current Usage Pattern

```typescript
<GradientCard
  customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
>
  {children}
</GradientCard>
```

### Theme System Integration Points

- Background colors: `--background` maps to `var(--color-neutral-1)`
- Accent colors: `--color-accent-{1-12}` mapped to theme palettes
- Theme switching: CSS custom properties update via data attributes

## Technical Design

### 1. Dual Gradient Control System

#### New Gradient Strategy

Replace named presets with two complementary control systems:

**A) Simple Range-Based (background → accent)**
```typescript
// Range-to-accent-level mapping for background gradients
const rangeToAccentLevel = (range: number): number => {
  return Math.round(1 + (range / 100) * 11);
};

// Examples:
// range=25  → background → accent-4  (soft)
// range=50  → background → accent-8  (moderate) 
// range=75  → background → accent-10 (strong)
// range=100 → background → accent-12 (maximum)
```

**B) Advanced Accent-to-Accent Control**
```typescript
// Direct accent level specification for precise control
const getAccentGradientClass = (fromAccent: number, toAccent: number): string => {
  return `bg-gradient-to-br from-[var(--color-accent-${fromAccent})] to-[var(--color-accent-${toAccent})]`;
};

// Examples:
// fromAccent=7, toAccent=10 → accent-7 → accent-10 (matches old "teal")
// fromAccent=9, toAccent=11 → accent-9 → accent-11 (current landing usage)
```

#### Dynamic Gradient Generation

```typescript
const getGradientClass = (props: GradientProps): string => {
  const { range, fromAccent, toAccent, customGradient } = props;
  
  if (customGradient) return '';
  
  if (fromAccent !== undefined && toAccent !== undefined) {
    // Advanced: accent-to-accent gradients
    return `bg-gradient-to-br from-[var(--color-accent-${fromAccent})] to-[var(--color-accent-${toAccent})]`;
  } else if (range !== undefined) {
    // Simple: background-to-accent gradients  
    const accentLevel = rangeToAccentLevel(range);
    return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
  }
  
  // Default fallback
  return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
};
```

#### Implementation Approach

1. **Dual Systems**: Simple range for common use, advanced accent control for precision
2. **Theme Aware**: All gradients use theme-specific accent colors
3. **Zero Duplication**: No named presets, only numeric control
4. **Migration Path**: Direct mapping from old gradients to new system

### 2. Component Enhancement

#### Updated GradientCard Interface

```typescript
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  // Gradient Control Systems (mutually exclusive)
  
  /**
   * Simple gradient range from background to accent (0-100)
   * 0 = barely visible (background → accent-1)
   * 25 = soft (background → accent-4)
   * 50 = moderate (background → accent-8) 
   * 75 = strong (background → accent-10)
   * 100 = maximum (background → accent-12)
   */
  range?: number;
  
  /**
   * Advanced gradient: accent level to start from (1-12)
   * Must be used with toAccent
   */
  fromAccent?: number;
  
  /**
   * Advanced gradient: accent level to end at (1-12)
   * Must be used with fromAccent
   */
  toAccent?: number;
  
  /**
   * Full custom gradient definition (overrides all other gradient props)
   * Example: "linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
   */
  customGradient?: string;
  
  // Existing props
  shimmer?: boolean;
  overlayOpacity?: number;
  header?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
```

#### Core Implementation Logic

```typescript
export function GradientCard({
  customGradient,
  range,
  fromAccent,
  toAccent,
  shimmer = true,
  overlayOpacity = 0,
  // ... other props
}: GradientCardProps) {
  
  const gradientClasses = useMemo(() => {
    if (customGradient) return '';
    
    if (fromAccent !== undefined && toAccent !== undefined) {
      // Advanced: accent-to-accent gradients
      return `bg-gradient-to-br from-[var(--color-accent-${fromAccent})] to-[var(--color-accent-${toAccent})]`;
    } else if (range !== undefined) {
      // Simple: background-to-accent gradients  
      const accentLevel = Math.round(1 + (range / 100) * 11);
      return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
    }
    
    // Default fallback
    return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
  }, [customGradient, range, fromAccent, toAccent]);
  
  // ... rest of component
}
```

### 3. CSS Implementation Strategy

#### Recommended: Direct CSS Variable Usage

Since both gradient systems use existing theme colors, no additional CSS custom properties are needed:

```typescript
// Both systems use existing --color-accent-{n} and --background variables
// which automatically adapt to themes and light/dark mode

// Simple gradients: background → accent
`bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`

// Advanced gradients: accent → accent  
`bg-gradient-to-br from-[var(--color-accent-${fromAccent})] to-[var(--color-accent-${toAccent})]`
```

#### No Additional CSS Required

The existing theme system already provides:
- `--background` - theme-aware background color
- `--color-accent-{1-12}` - full accent scale for current theme
- Automatic light/dark mode switching via CSS classes
- Theme palette switching via data attributes

#### Runtime Class Generation

```typescript
// Clean, minimal implementation
const getGradientClass = (props: GradientProps): string => {
  const { range, fromAccent, toAccent, customGradient } = props;
  
  if (customGradient) return '';
  
  if (fromAccent && toAccent) {
    return `bg-gradient-to-br from-[var(--color-accent-${fromAccent})] to-[var(--color-accent-${toAccent})]`;
  }
  
  if (range !== undefined) {
    const accentLevel = Math.round(1 + (range / 100) * 11);
    return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
  }
  
  return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
};
```

### 4. Migration Strategy

#### Legacy Removal and Transparent Migration

**Current Usage Analysis**:
- **Landing page**: Uses `customGradient` (already theme-aware - no changes needed)
- **Templates**: One instance of `gradient="teal"` needs migration
- **Legacy tests**: Can be removed/updated

**Legacy Migration Mapping** (for transparent migration):
```typescript
// Current landing usage (already perfect - no changes needed):
customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
// Becomes:
<GradientCard fromAccent={9} toAccent={11} />

// Template usage migration:
const legacyMigration = {
  teal: { fromAccent: 7, toAccent: 10 },     // Preserves exact visual appearance
  blue: { fromAccent: 6, toAccent: 10 },
  purple: { fromAccent: 7, toAccent: 11 },
  sunset: { fromAccent: 5, toAccent: 9 },
  ocean: { fromAccent: 6, toAccent: 10 }     // Same as blue
};
```

#### Migration Steps

1. **Update template usage**:
   ```typescript
   // Before: templates/nextjs/src/app/examples/page.tsx
   <GradientCard gradient="teal" />
   
   // After (preserves exact appearance):
   <GradientCard fromAccent={7} toAccent={10} />
   ```

2. **Update landing usage**:
   ```typescript
   // Before: landing/src/app/page.tsx  
   customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
   
   // After (cleaner API):
   <GradientCard fromAccent={9} toAccent={11} />
   ```

3. **Remove legacy interface**:
   ```typescript
   // Delete from GradientCard component:
   // - gradient?: GradientPreset
   // - export type GradientPreset  
   // - const gradientPresets
   // - all legacy handling logic
   ```

#### Zero Visual Impact Migration

- **Template usage**: `gradient="teal"` → `fromAccent={7} toAccent={10}` (identical appearance)
- **Landing usage**: Already using theme-aware colors, API just gets cleaner
- **All gradients**: Continue to automatically adapt to theme changes

## Data Flows and Component Interactions

### 1. Theme System Integration

```
ThemeProvider → CSS Variables → GradientCard → Computed Styles
     ↓
Theme Context → Component Props → Gradient Selection
```

### 2. Rendering Pipeline

1. **Theme Detection**: Component reads current theme from CSS or context
2. **Gradient Selection**: Chooses appropriate gradient based on theme + preset
3. **Style Application**: Applies computed gradient classes/styles
4. **Dynamic Updates**: Responds to theme changes via CSS variable updates

### 3. Performance Considerations

- **Memoization**: Gradient class computation cached with `useMemo`
- **CSS Variables**: Leverage browser optimization for custom properties  
- **Class Reuse**: Minimal unique class generation

## Cross-Slice Dependencies

### Dependencies

1. **Slice 12 (Colors and Themes)**: Core theme system infrastructure
2. **UI-Core Components**: Base Card and styling system
3. **Tailwind Configuration**: Gradient utility classes

### Interfaces

#### With Theme System

```typescript
interface ThemeGradientConfig {
  presets: Record<GradientPreset, ThemeGradientDefinition>;
  intensities: Record<IntensityLevel, AccentLevelMapping>;
}

interface ThemeGradientDefinition {
  light: {
    from: string;
    to: string;
  };
  dark: {
    from: string; 
    to: string;
  };
}
```

#### With Component Library

- Maintains existing `GradientCardProps` interface
- Extends with theme-aware options
- Preserves all current functionality

## Implementation Phases

### Phase 1: Core Enhancement (Priority)

1. **Theme-Aware Logic**: Implement gradient selection system
2. **CSS Variables**: Set up theme-responsive custom properties
3. **Component Updates**: Enhance GradientCard with new props
4. **Testing**: Verify theme switching behavior

### Phase 2: Template Integration

1. **Landing Page**: Update existing GradientCard usage
2. **Template Examples**: Add theme-aware demonstrations
3. **Documentation**: Update component documentation

### Phase 3: Advanced Features

1. **Intensity Variants**: Implement subtle/medium/bold options
2. **Animation Support**: Theme-aware gradient transitions
3. **Performance Optimization**: Fine-tune rendering performance

## Testing Strategy

### Unit Tests

```typescript
describe('GradientCard Theme Awareness', () => {
  test('applies theme-aware gradients when enabled', () => {
    render(<GradientCard gradient="teal" themeAware />);
    // Verify appropriate gradient classes applied
  });
  
  test('maintains legacy behavior when disabled', () => {
    render(<GradientCard gradient="teal" />);
    // Verify existing gradient behavior unchanged
  });
  
  test('responds to theme changes', () => {
    // Test theme switching scenarios
  });
});
```

### Integration Tests

- Theme switching with GradientCard active
- Multiple GradientCards with different presets
- Performance under rapid theme changes

### Visual Regression Tests

- Light/dark mode gradient rendering
- Theme switching transitions
- Intensity variant differences

## Risks and Mitigation

### Risk: Performance Impact

- **Mitigation**: Memoize gradient computations, use CSS variables for efficiency

### Risk: Browser Compatibility

- **Mitigation**: CSS custom properties have excellent support; provide fallbacks

### Risk: Theme System Coupling

- **Mitigation**: Maintain clear interfaces, test theme independence

### Risk: Visual Inconsistency

- **Mitigation**: Careful color selection, comprehensive visual testing

## Success Criteria

1. **Functional**: GradientCard adapts seamlessly to theme changes
2. **Dual Control**: Both simple range and advanced accent-to-accent systems work
3. **Zero Visual Impact**: Migration preserves exact appearance of existing gradients
4. **Performance**: No measurable rendering performance degradation  
5. **Clean API**: Eliminates confusing named presets, provides clear numeric control
6. **Developer Experience**: Intuitive gradient specification for both simple and advanced cases

## Future Considerations

1. **Gradient Animations**: Theme-aware gradient transitions
2. **Additional Presets**: Expand gradient variety per theme
3. **Automatic Theme Detection**: Smart defaults based on content
4. **Advanced Blending**: Multiple gradient techniques per theme

---

*This slice eliminates confusing color-named gradient presets and provides a clean dual-control system: simple range-based gradients for common use and advanced accent-to-accent gradients for precise control. All gradients automatically adapt to theme changes while preserving exact visual appearance during migration.*