# Cards Light Mode

## Phase 3: Analyze & Plan for Light Mode
- [x] Locate and review dark-mode styles in `ProjectFeatureCard.tsx`, `ComingSoonFeatureCard.tsx`, `GuidesFeatureCard.tsx`, and `FeatureCardWrapper.tsx`
- [x] Identify theme tokens (colors, backgrounds, text) and Tailwind classes that need light-mode variants.  Remember that we are using Tailwind 4, NOT Tailwind 3, and there should in general be no tailwind.config.js/.ts.
- [x] Draft light-mode style mapping and necessary component API adjustments
- [x] Confirm design specifications for light-mode appearance and any overlay updates

## Phase 4: Detailed Task Expansion
- [x] Refactor `FeatureCardWrapper.tsx` to accept a `mode` prop and apply conditional classes
- [x] Modify `ProjectFeatureCard.tsx` to support `mode="light"` and override dark-only classes
- [x] Apply similar updates to `ComingSoonFeatureCard.tsx` and `GuidesFeatureCard.tsx`
- [x] Enhance `ComingSoonOverlay.tsx` to support light-mode backdrop and text colors
- [x] Validate visual changes in the local development environment (e.g., Storybook or browser preview)

## Implementation Summary

### Completed Changes

#### FeatureCardWrapper.tsx
- Added `mode?: 'dark' | 'light'` prop with default 'dark'
- Implemented conditional Tailwind classes for light vs dark backgrounds, borders, and shadows
- Light mode uses `from-slate-50 to-white` gradient with `border-teal-300` styling

#### ProjectFeatureCard.tsx
- Added `mode?: 'dark' | 'light'` prop
- Created separate `techColors` objects for dark and light modes
- Implemented comprehensive `textClasses` mapping for all text elements
- Updated all UI elements to use conditional styling based on mode
- Light mode features darker text on lighter backgrounds with appropriate contrast

#### ComingSoonFeatureCard.tsx
- Added `mode?: 'dark' | 'light'` prop
- Implemented `textClasses` mapping for conditional styling
- Updated animated dots, backgrounds, icons, and text colors for light mode
- Maintained visual hierarchy while ensuring readability in light mode

#### GuidesFeatureCard.tsx
- Added `mode?: 'dark' | 'light'` prop
- Comprehensive `textClasses` mapping covering all UI elements
- Updated card backgrounds, borders, text colors, and interactive states
- Passed `mode` prop to `ComingSoonOverlay` component

#### ComingSoonOverlay.tsx
- Added `mode?: 'dark' | 'light'` prop
- Restructured `colorMap` to support both light and dark variants for each color
- Updated badge backgrounds, text colors, patterns, and borders for light mode
- Maintained visual consistency across different color themes

### Usage
All components now accept an optional `mode` prop:
```tsx
<ProjectFeatureCard mode="light" {...otherProps} />
<ComingSoonFeatureCard mode="light" />
<GuidesFeatureCard mode="light" />
<FeatureCardWrapper mode="light">...</FeatureCardWrapper>
<ComingSoonOverlay mode="light" color="purple">...</ComingSoonOverlay>
