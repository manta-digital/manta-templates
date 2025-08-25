---
layer: project
docType: slice-design
slice: technology-scroller
status: ready
readyDate: 2025-01-25
dependencies:
  - Slice 09: Component Parity (✅ COMPLETED - January 25, 2025)
---

# Slice 11: TechnologyScroller Migration to ui-core

## Overview
Migrate the TechnologyScroller component from templates/nextjs to ui-core package, resolving CSS masking issues and establishing a pattern for framework-specific image optimization through dependency injection.

## Current State - READY TO PROCEED ✅
**Status:** Ready for implementation (January 25, 2025)
**Dependency:** Slice 09 Component Parity provides foundation for ui-core component migration

### Prerequisites Completed:
- ✅ ui-core package has proven framework-agnostic component architecture 
- ✅ Dependency injection patterns established for Image components
- ✅ Tailwind v4 integration complete in ui-core
- ✅ CSS handling patterns proven working in ui-core build pipeline
- ✅ Test validation framework established with test-cards page

### Updated Migration Strategy:
With Slice 09 complete, TechnologyScroller can now follow the established migration pattern:
- Use proven dependency injection approach for ImageComponent
- Leverage working ui-core Tailwind v4 CSS pipeline  
- Apply same CSS-in-JS approach used for other ui-core components
- Follow established adapter pattern for Next.js optimization

## Problem Statement
The TechnologyScroller component currently works perfectly in templates/nextjs but fails when moved to ui-core:
- CSS masking for colored icons completely breaks (icons don't display)
- Color rendering fails across all approaches
- The component relies on Next.js Image for optimization
- 3+ hours of attempted fixes were unsuccessful and had to be reverted

## Technical Analysis

### Root Causes Identified
1. **CSS Masking Dependencies**: The masking technique relies on specific CSS and asset loading patterns that work in Next.js but fail in ui-core's build pipeline
2. **Asset Path Resolution**: SVG icons in `/public/assets/icons/tech/` aren't properly resolved when component is in ui-core
3. **Build Pipeline Differences**: ui-core's build process handles CSS differently than Next.js app

### Current Working Implementation (templates/nextjs)
- Component location: `templates/nextjs/src/components/ui/TechnologyScroller.tsx`
- CSS animations: Defined in `templates/nextjs/src/app/globals.css`
- SVG assets: Located in `templates/nextjs/public/assets/icons/tech/`
- Rendering: Uses CSS masking with `maskImage` for colored icons
- Image handling: Uses Next.js Image component for optimization

## Solution Design

### Architecture Approach
Keep TechnologyScroller in ui-core with proper dependency injection pattern:

1. **Core Component** (`packages/ui-core/src/components/ui/TechnologyScroller.tsx`)
   - Framework-agnostic React component
   - Accepts ImageComponent prop for framework-specific image handling
   - Self-contained CSS animations (inline styles or CSS-in-JS)
   - Flexible icon path resolution

2. **Next.js Adapter** (`packages/ui-adapters-nextjs/src/components/TechnologyScroller.tsx`)
   - Thin wrapper that injects Next.js Image component
   - Handles Next.js-specific optimizations
   - Re-exports with Next.js defaults

3. **Asset Strategy**
   - Icons remain in template's public directory
   - Component accepts `iconBasePath` prop for flexible asset location
   - Templates provide their own icon sets

### Implementation Details

#### 1. UI-Core Component Structure
```typescript
// packages/ui-core/src/components/ui/TechnologyScroller.tsx
interface TechnologyScrollerProps {
  items: Technology[];
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right';
  iconBasePath?: string; // Default: '/assets/icons/tech/'
  ImageComponent?: React.ComponentType<any>; // For framework optimization
}
```

#### 2. CSS Animation Solution
Instead of relying on external CSS files, embed animations directly:
```typescript
// Inline keyframes in component
const scrollKeyframes = `
  @keyframes technology-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

// Apply via style tag or CSS-in-JS
<style dangerouslySetInnerHTML={{ __html: scrollKeyframes }} />
```

#### 3. Icon Rendering Strategy
```typescript
const TechIcon = ({ item, iconBasePath, ImageComponent = 'img' }) => {
  const iconUrl = `${iconBasePath}${item.svg}`;
  
  // For colored icons - use simple img with inline SVG filters
  if (item.color && ImageComponent === 'img') {
    return (
      <img 
        src={iconUrl}
        alt={item.name}
        style={{ filter: `brightness(0) saturate(100%) ${getColorFilter(item.color)}` }}
        className="h-8 w-auto"
      />
    );
  }
  
  // For framework-specific optimization
  if (ImageComponent !== 'img') {
    return <ImageComponent src={iconUrl} alt={item.name} width={32} height={32} />;
  }
  
  // Default rendering
  return <img src={iconUrl} alt={item.name} className="h-8 w-auto" />;
};
```

#### 4. Next.js Adapter
```typescript
// packages/ui-adapters-nextjs/src/components/TechnologyScroller.tsx
import { TechnologyScroller as CoreScroller } from '@manta-templates/ui-core';
import Image from 'next/image';

export const TechnologyScroller = (props) => (
  <CoreScroller {...props} ImageComponent={Image} />
);
```

## Migration Path

### Phase 1: Fix ui-core Component
1. Update TechnologyScroller in ui-core with self-contained animations
2. Implement fallback rendering without CSS masking
3. Add proper dependency injection for ImageComponent
4. Test with basic HTML img elements

### Phase 2: Create Adapter
1. Create NextJS adapter in ui-adapters-nextjs
2. Inject Next.js Image component
3. Test in templates/nextjs

### Phase 3: Update Template
1. Update imports in templates/nextjs to use adapter
2. Verify all functionality works
3. Remove local TechnologyScroller component

## Alternative Approach (If Primary Fails)
If the CSS masking approach continues to fail:
1. Use SVG filters for color manipulation instead of CSS masks
2. Pre-process SVGs to inline colors
3. Use sprite sheets instead of individual files

## Success Criteria
- [ ] TechnologyScroller works identically in ui-core as it does in templates/nextjs
- [ ] Colored icons display correctly in both light and dark modes
- [ ] Animation performance is smooth
- [ ] Next.js Image optimization still works when used with adapter
- [ ] Component remains framework-agnostic in ui-core
- [ ] No build errors or warnings

## Risk Mitigation
1. **Risk**: CSS masking may still fail in ui-core
   - **Mitigation**: Implement SVG filter fallback approach
   
2. **Risk**: Performance degradation without Next.js Image
   - **Mitigation**: Lazy loading and intersection observer for non-Next.js usage
   
3. **Risk**: Asset path resolution issues
   - **Mitigation**: Make iconBasePath fully configurable with sensible defaults

## Dependencies
- ✅ Slice 09 (Component Parity) - COMPLETED (August 25, 2025) 
- No other blocking dependencies

## Testing Requirements
1. Visual regression tests comparing original vs migrated component
2. Performance benchmarks for scroll animation
3. Cross-browser testing (Chrome, Firefox, Safari, Edge)
4. Dark mode color accuracy verification
5. Framework adapter integration tests

## Documentation Updates
1. Update ui-core README with TechnologyScroller usage
2. Document ImageComponent injection pattern
3. Add examples for each framework adapter
4. Include troubleshooting guide for common issues

## Estimated Effort
- Design validation: 1 hour
- Core component fixes: 2-3 hours  
- Adapter creation: 1 hour
- Testing and verification: 1-2 hours
- Total: ~6-8 hours

## Notes
This slice specifically addresses the failed migration attempt and provides a more robust architecture that separates framework concerns while maintaining the visual fidelity of the original component.