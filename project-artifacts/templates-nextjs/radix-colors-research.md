# Radix Colors System Research

## Overview
This document contains research findings for implementing Radix Colors theming system in the manta-templates NextJS project.

## Radix Colors 1-12 Scale System

### Scale Methodology
Radix Colors uses a systematic 12-step scale where each step has specific semantic meanings:

| Step | Use Case | Description |
|------|----------|-------------|
| 1 | App background | Main application background |
| 2 | Subtle background | Striped tables, code blocks, card backgrounds |
| 3 | UI element background | Normal component states |
| 4 | Hovered UI element background | Hover states for components |
| 5 | Active/Selected UI element background | Pressed or selected states |
| 6 | Subtle borders and separators | Non-interactive component borders |
| 7 | UI element border and focus rings | Interactive component borders |
| 8 | Hovered UI element border | Stronger borders on hover |
| 9 | Solid backgrounds | Highest chroma, purest color step |
| 10 | Hovered solid backgrounds | Hover states for solid backgrounds |
| 11 | Low-contrast text | Secondary text content |
| 12 | High-contrast text | Primary text content |

### Key Characteristics
- **Step 9** has the highest chroma (purest color) and is most versatile
- **Steps 11-12** guarantee WCAG contrast ratios on Step 2 backgrounds
- **Steps 1-2** are interchangeable for backgrounds
- **Steps 3-5** form a progression for component states
- **Steps 6-8** form a progression for border states

## P3 Wide-Gamut Color Support

### Technical Details
- Radix Colors provides both sRGB and P3 wide-gamut definitions
- P3 support ensures full saturation on Apple displays and other wide-gamut screens
- Alpha blending works differently in P3 vs sRGB color spaces
- Custom palette generator includes P3 definitions automatically
- Fallbacks to sRGB are provided for compatibility

### Implementation
- Use `color(display-p3 1 0.5 0)` syntax for P3 colors
- Generated CSS includes both sRGB and P3 variants
- Browser automatically selects appropriate color space

## Available Color Scales

### Gray Scales
- **Gray**: Pure neutral gray
- **Mauve**: Warm gray with slight purple tint
- **Slate**: Cool gray with slight blue tint
- **Sage**: Green-tinted gray
- **Olive**: Warm green-tinted gray
- **Sand**: Warm beige-tinted gray

### Color Scales
- **Gold, Bronze, Brown**: Warm earth tones
- **Yellow, Amber, Orange**: Warm colors
- **Tomato, Red, Ruby, Crimson**: Red spectrum
- **Pink, Plum, Purple, Violet**: Purple spectrum
- **Iris, Indigo, Blue**: Blue spectrum
- **Cyan, Teal, Jade**: Blue-green spectrum
- **Green, Grass**: Green spectrum
- **Lime, Mint, Sky**: Light/bright variants

### Special Scales
- **Overlays**: Designed for overlays, don't change across light/dark themes

## Light/Dark Mode Relationships

### Automatic Pairing
- Each color scale has corresponding light and dark variants
- Dark mode colors are automatically calculated for optimal contrast
- Semantic relationships are maintained across themes
- Step numbers correspond to same use cases in both modes

### Implementation Pattern
```css
/* Light mode */
:root {
  --accent-1: var(--blue-1);
  --accent-9: var(--blue-9);
}

/* Dark mode */
.dark {
  --accent-1: var(--blue-dark-1);
  --accent-9: var(--blue-dark-9);
}
```

## Current Teal-500 Usage Analysis

### Usage Patterns Identified
Based on codebase analysis, teal-500 is used in the following semantic roles:

#### 1. Accent/Primary Color (Step 9 equivalent)
- Primary buttons and CTAs
- Brand accent elements
- Active states and selections

#### 2. Border Colors (Steps 7-8 equivalent)
- Interactive component borders
- Hover states for borders
- Focus rings and highlights

#### 3. Background Colors (Steps 3-5 equivalent)
- Component backgrounds
- Gradient starting points
- Overlay backgrounds

#### 4. Text Colors (Steps 11-12 equivalent)
- Status indicators
- Interactive text elements
- Theme mode indicators

### Specific Usage Locations

#### Core Card System
- `cardVariants.ts`: Border hover states, gradient backgrounds
- `cardThemes.css`: Primary card theming variables
- `BaseCard.tsx`: Border colors for overlay mode

#### Component Cards
- `ComingSoonFeatureCard.tsx`: Buttons, badges, animations, gradients
- `ProjectFeatureCard.tsx`: Theme variants and borders
- `FeatureCardWrapper.tsx`: Border and shadow colors

#### Layout Components
- `CardCarousel.tsx`: Dot indicators
- `VirtualCardList.tsx`: Loading spinners, scroll-to-top button

#### Test Components
- Various test components use teal-500 for theme indicators

### Color Role Mapping
Current teal usage maps to Radix semantic roles as follows:

| Current Usage | Radix Step | Semantic Role |
|---------------|------------|---------------|
| `teal-100` | Step 2-3 | Subtle backgrounds |
| `teal-300` | Step 6 | Subtle borders |
| `teal-400` | Step 7-8 | Interactive borders |
| `teal-500` | Step 9 | Primary/accent color |
| `teal-600` | Step 10 | Hover states |
| `teal-700` | Step 11 | Low-contrast text |
| `teal-800` | Step 12 | High-contrast text |

## Accessibility Requirements

### WCAG Compliance
- Steps 11-12 guarantee proper contrast ratios on Step 2 backgrounds
- Contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large text)
- AAA standards (7:1 for normal text, 4.5:1 for large text) supported where possible

### High Contrast Mode
- `@media (prefers-contrast: high)` support needed
- Override color selections with high contrast alternatives
- Ensure all interactive elements remain visible

### Color Blindness Considerations
- Radix Colors designed with color blindness in mind
- Semantic step system reduces reliance on color alone
- Testing with color blindness simulation tools recommended

## Implementation Strategy

### Semantic Color System
Create semantic aliases that map to Radix steps:
```css
:root {
  --color-accent: var(--teal-9);
  --color-accent-subtle: var(--teal-3);
  --color-accent-emphasis: var(--teal-10);
  --color-border: var(--teal-7);
  --color-border-hover: var(--teal-8);
  --color-text-accent: var(--teal-11);
}
```

### Migration Path
1. Replace hardcoded teal-* classes with semantic variables
2. Implement color palette switching via CSS custom properties
3. Maintain backward compatibility during transition
4. Add new color palette options (purple, blue, green, etc.)

### Dynamic Switching
- React context for color palette management
- CSS custom property updates for real-time switching
- localStorage persistence for user preferences
- Smooth transitions between palettes

## Next Steps
1. Install @radix-ui/colors package
2. Create color utility functions and TypeScript types
3. Implement Tailwind CSS v4 integration
4. Build color palette switching system
5. Update card theming system
6. Add accessibility validation
7. Create comprehensive documentation

## References
- [Radix Colors Documentation](https://www.radix-ui.com/colors)
- [Understanding the Scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Custom Palettes](https://www.radix-ui.com/colors/docs/overview/custom-palettes)
- [Color Aliasing](https://www.radix-ui.com/colors/docs/overview/aliasing)
