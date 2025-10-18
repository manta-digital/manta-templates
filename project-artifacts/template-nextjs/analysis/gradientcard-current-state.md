---
layer: analysis
project: manta-templates
slice: theme-aware-gradients
created: 2025-08-29
analyzed-component: GradientCard
source-file: packages/ui-core/src/components/cards/GradientCard.tsx
---

# GradientCard Current State Analysis

## Component Interface Analysis

### Current Props (GradientCardProps)
```typescript
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  gradient?: GradientPreset;           // DEPRECATED - confusing color-named presets
  customGradient?: string;             // KEEP - full control escape hatch
  shimmer?: boolean;                   // KEEP - animation feature
  overlayOpacity?: number;             // KEEP - text readability feature
  header?: React.ReactNode;            // KEEP - card content
  title?: string;                      // KEEP - card content
  description?: string;                // KEEP - card content
  footer?: React.ReactNode;            // KEEP - card content
  children?: React.ReactNode;          // KEEP - card content
}
```

### Current TypeScript Types
- `GradientPreset = 'teal' | 'blue' | 'purple' | 'sunset' | 'ocean'` - **TO BE REMOVED**
- All other types remain unchanged

## Current Gradient System Analysis

### Gradient Preset Mappings (PROBLEMATIC)
```typescript
const gradientPresets: Record<GradientPreset, string> = {
  teal: 'bg-gradient-to-br from-[var(--color-accent-7)] to-[var(--color-accent-10)]',
  blue: 'bg-gradient-to-br from-[var(--color-accent-6)] to-[var(--color-accent-10)]',
  purple: 'bg-gradient-to-br from-[var(--color-accent-7)] to-[var(--color-accent-11)]',
  sunset: 'bg-gradient-to-br from-[var(--color-accent-5)] to-[var(--color-accent-9)]',
  ocean: 'bg-gradient-to-br from-[var(--color-accent-6)] to-[var(--color-accent-10)]',  // DUPLICATE of blue!
};
```

### Issues Identified
1. **Misleading Names**: "teal", "blue" etc. don't represent actual colors - they use current theme's accent
2. **Duplicates**: `blue === ocean` (both accent-6 → accent-10)
3. **No Clear Pattern**: Random accent level combinations with no semantic meaning
4. **Theme Limitation**: All gradients use accent-to-accent, no background integration

### Migration Mapping (Legacy → New System)
| Legacy Preset | Current CSS | New API Equivalent |
|---------------|-------------|-------------------|
| `gradient="teal"` | accent-7 → accent-10 | `from="accent-7" to="accent-10"` |
| `gradient="blue"` | accent-6 → accent-10 | `from="accent-6" to="accent-10"` |
| `gradient="purple"` | accent-7 → accent-11 | `from="accent-7" to="accent-11"` |
| `gradient="sunset"` | accent-5 → accent-9 | `from="accent-5" to="accent-9"` |
| `gradient="ocean"` | accent-6 → accent-10 | `from="accent-6" to="accent-10"` (same as blue) |

## Current Usage Patterns in Codebase

### Template Usage (templates/nextjs/src/app/examples/page.tsx)
```tsx
<GradientCard 
  className="h-full rounded-lg" 
  title="Theme Test Grid" 
  description="Switch palette and dark/light to validate tokens" 
  gradient="teal"    // ← ONLY LEGACY USAGE FOUND
/>
```
**Impact**: Single usage that needs migration to `from="accent-7" to="accent-10"`

### Landing Page Usage (landing/src/app/page.tsx)
```tsx
<GradientCard
  className="h-full p-0 rounded-lg border-none [&>div:last-child]:h-full [&>div:last-child>div]:h-full [&>div:last-child>div]:p-0"
  customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"
>
```
**Impact**: Uses `customGradient` - no changes needed, but could be simplified to `from="accent-9" to="accent-11"`

### Other Files
- Multiple lib copies of the component exist but are not actively used
- Test mocks reference GradientCard but don't test gradient functionality
- Documentation files reference the component

## Available Color System

### Theme Colors Available
- `--color-accent-1` through `--color-accent-12` (accent scale)
- `--color-neutral-1` through `--color-neutral-12` (neutral scale) 
- `--color-accent-a1` through `--color-accent-a12` (accent alpha/transparency)
- `--background` (maps to `--color-neutral-1`)

## Proposed New Gradient System

### Three-Tier Control System
1. **Simple Range-Based**: `range={0-100}` → background to accent-X
2. **Advanced Color Scale**: `from="accent-7" to="accent-10"` → precise control
3. **Custom CSS**: `customGradient="..."` → full control (unchanged)

### New Props Design
```typescript
export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  // NEW: Simple gradient control
  range?: number;                      // 0-100 scale, background → accent-X
  
  // NEW: Advanced gradient control  
  from?: string;                       // "accent-7", "neutral-3", etc.
  to?: string;                         // "accent-10", "neutral-8", etc.
  
  // EXISTING: Full control (unchanged)
  customGradient?: string;
  
  // EXISTING: All other props unchanged
  shimmer?: boolean;
  overlayOpacity?: number;
  header?: React.ReactNode;
  title?: string;
  description?: string; 
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
```

### Precedence Order
1. `customGradient` (highest - full control)
2. `from`/`to` (advanced - precise color scale control)  
3. `range` (simple - background to accent)
4. Default fallback (background → accent-8)

## Zero-Impact Migration Plan

### Template Migration
- `gradient="teal"` → `from="accent-7" to="accent-10"` (identical visual result)

### Landing Page  
- `customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"` 
- Could become: `from="accent-9" to="accent-11"` (cleaner API, identical result)
- No change required - `customGradient` continues to work

### Benefits
- **Eliminates Confusion**: No more misleading color names
- **Theme Integration**: Background gradients blend with page
- **Precise Control**: Direct accent/neutral level specification
- **Full Compatibility**: `customGradient` unchanged
- **Clean API**: Intuitive range-based gradients for common cases

---

*Analysis complete. Ready for implementation of new gradient system with zero visual impact migration.*