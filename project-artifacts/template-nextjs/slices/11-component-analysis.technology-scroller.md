---
layer: project
docType: analysis
slice: technology-scroller
---

# TechnologyScroller Component Analysis

## Current Working Implementation Analysis

### Component Location and Structure
- **File**: `/templates/nextjs/src/components/ui/TechnologyScroller.tsx`
- **Framework**: React client component with Next.js patterns
- **Styling**: Tailwind CSS with custom animation classes
- **Assets**: SVG icons in `/templates/nextjs/public/assets/icons/tech/`

### Component Interface
```typescript
interface Technology {
  name: string;
  svg: string;
  color?: string;          // Primary color for light mode
  colorDark?: string;      // Optional dark mode color (falls back to color)
  invertOnDark?: boolean;  // Alternative to color - inverts SVG in dark mode
}

interface TechnologyScrollerProps {
  items: Technology[];
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}
```

### CSS Dependencies from templates/nextjs/src/app/globals.css

#### Animation Classes (Lines 234-251)
```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll-slow { animation: scroll 80s linear infinite; }
.animate-scroll-normal { animation: scroll 40s linear infinite; }
.animate-scroll-fast { animation: scroll 20s linear infinite; }
.animate-reverse { animation-direction: reverse; }
```

#### Additional Dependencies
- Uses Tailwind utility classes extensively
- Relies on semantic color system from ui-core (already imported via `@import "@manta-templates/ui-core/dist/styles/index.css"`)

### SVG Asset Inventory
Located in `/templates/nextjs/public/assets/icons/tech/`:
- docker.svg
- javascript.svg
- nextdotjs.svg
- nodedotjs.svg
- python.svg
- react.svg
- tailwindcss.svg
- typescript.svg

### CSS Masking Implementation Details

#### For Colored Icons (Lines 59-81)
- Uses CSS `maskImage` property to apply SVG as mask
- Sets `backgroundColor` to desired color
- Creates separate spans for light/dark modes using Tailwind's `dark:hidden` and `hidden dark:block`
- Light mode: Uses `item.color`
- Dark mode: Uses `item.colorDark` (falls back to `item.color` if not specified)

**Critical CSS Properties**:
```css
maskImage: url(/assets/icons/tech/${item.svg})
maskSize: contain
maskRepeat: no-repeat
maskPosition: center
```

#### For Non-Colored Icons (Lines 83-94)
- Uses standard `<img>` element
- Applies `dark:invert` class when `invertOnDark: true`
- Fixed dimensions: `h-8 w-auto` with `width="32" height="32"`

### Color Handling Strategy

#### Two Approaches Used:
1. **CSS Masking + Background Color**: For icons that should display in specific colors
   - Light mode: `backgroundColor: item.color`
   - Dark mode: `backgroundColor: item.colorDark || item.color`
   
2. **Image Inversion**: For monochrome icons that should invert in dark mode
   - Uses `item.invertOnDark` boolean flag
   - Applies Tailwind's `dark:invert` class

#### Example Usage Patterns:
```javascript
// Colored icon approach
{ name: 'Tailwind CSS', svg: 'tailwindcss.svg', color: '#38BDF8', colorDark: '#38BDF8' }

// Invert approach  
{ name: 'Next.js', svg: 'nextdotjs.svg', invertOnDark: true }
```

### Animation Implementation

#### Speed Control
- Maps speed prop to CSS classes: `fast` → `animate-scroll-fast` (20s), `normal` → `animate-scroll-normal` (40s), `slow` → `animate-scroll-slow` (80s)
- Uses `will-change-transform` for performance optimization

#### Direction Control
- Left (default): Normal animation direction
- Right: Adds `animate-reverse` class to reverse animation direction

#### Infinite Scroll Technique
- Duplicates items array: `items.concat(items)` 
- Animation translates exactly 50% (`translateX(-50%)`) to create seamless loop
- Uses `flex min-w-full shrink-0 w-max flex-nowrap` for proper layout

#### Mask Effect
- Container uses CSS mask for fade-in/fade-out edges:
```css
[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]
```

### Performance Optimizations
- `loading="lazy"` on img elements
- `will-change-transform` on animated container
- `pauseOnHover` with `hover:[animation-play-state:paused]`

### Dependencies Analysis

#### Internal Dependencies (NextJS Template)
- `@/lib/utils` for `cn` utility function
- Animation CSS classes in globals.css
- SVG assets in public directory

#### External Dependencies
- React (client component)
- Tailwind CSS for styling
- SVG mask support in browsers

### Current Functionality Verification
✅ **Working Features**:
- Smooth infinite scroll animation
- Proper color rendering with CSS masking
- Dark mode color switching
- Speed and direction controls
- Hover pause functionality
- Responsive design with proper spacing

## Key Findings for ui-core Migration

### Migration Challenges Identified:
1. **Asset Path Resolution**: Hard-coded `/assets/icons/tech/` paths won't work in ui-core
2. **CSS Class Dependencies**: Animation classes currently in template's globals.css
3. **Build Pipeline Differences**: CSS masking may behave differently in ui-core build process
4. **Framework Coupling**: Uses Next.js `@/lib/utils` import pattern

### Required Changes for ui-core:
1. Move animation CSS to ui-core styles
2. Make asset paths configurable via props
3. Abstract utility imports (cn function)
4. Add dependency injection for framework-specific features

### Semantic Colors Dependencies:
- Component primarily uses Tailwind utilities and CSS masking
- Does not directly depend on semantic color tokens from ui-core
- Dark mode handled via Tailwind's `dark:` variants
- Should work with existing ui-core semantic color system