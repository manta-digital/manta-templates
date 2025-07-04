# Card Variants

This document describes the available card variants, sizes, radius options, states, and theming support.

## Usage

Import the `cardVariants` utility and apply it to your container:

```tsx
import { cardVariants } from '@/lib/cardVariants';

<div
  className={cardVariants({
    variant: 'elevated',
    size: 'md',
    radius: 'lg',
    state: 'success'
  })}
>
  Success Card
</div>
```

## Variants

- **base**: simple card with background, border, and default shadow
- **elevated**: hover shadow elevation and lift effect
- **bordered**: subtle border with hover color change
- **gradient**: gradient background with shimmer animation
- **interactive**: hover scale and glow effect
- **primary**: theme-based primary styling via CSS variables

## Sizes

- **sm**: small padding
- **md**: default padding
- **lg**: large padding
- **xl**: extra-large padding

## Radius

- **none**: sharp corners
- **sm**: small rounded corners
- **md**: default rounded corners
- **lg**: large rounded corners
- **xl**: pill/fully rounded corners

## States

- **loading**: skeleton loading patterns
- **success**: success state styling (checkmark, color)
- **error**: error state styling (error icon, color)

## Migration Guide

If migrating from the legacy `BaseCard` component:

1. Replace `<BaseCard>` elements with a `<div>` using `cardVariants`:
   ```diff
-  <BaseCard elevated>
-    Content
-  </BaseCard>
+  <div className={cardVariants({ variant: 'elevated' })}>
+    Content
+  </div>
   ```
2. Map old props to `cardVariants` options:
   - `elevated` prop → `variant: 'elevated'`
   - `bordered` prop → `variant: 'bordered'`
   - Other props remain as-is (size, radius)

## Accessibility Guidelines
Note: these are not all complete yet (2025-07-04).
- Respects `prefers-reduced-motion` for all animated variants
- Use appropriate `aria-busy="true"` for loading states
- Ensure text and icon contrast meet WCAG 2.1 AA (4.5:1) standards
- Colors adapt to light/dark mode via CSS variables in `cardThemes.css`
- Provide descriptive labels or alt text when using iconography
