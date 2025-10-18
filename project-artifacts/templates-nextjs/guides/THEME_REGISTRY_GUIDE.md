---
layer: project
docType: guide
slice: colors-and-themes
---

# Theme Registry System - Developer Guide

## Overview

The **Theme Registry System** provides developer control over which themes appear in the ColorSelector UI component. This system allows you to:

- ✅ Control which themes are exposed to users
- ✅ Add custom themes alongside built-in ui-core themes  
- ✅ Define beautiful display names with emojis
- ✅ Set default theme selection
- ✅ Keep themes defined but hidden from UI (staging themes)

## How It Works

The theme registry uses CSS variables that are read dynamically by the `useAvailableThemes()` hook, which powers the enhanced ColorSelector component.

### Architecture

```
CSS Variables → useAvailableThemes() Hook → ColorSelector Component → User UI
```

1. **CSS Variables**: Define which themes are available and their display names
2. **useAvailableThemes()**: Reads CSS variables and merges ui-core + user themes  
3. **ColorSelector**: Dynamically shows only registered themes with proper names
4. **User Experience**: Users see curated theme list with beautiful display names

## Quick Start

### 1. Basic Theme Registry

Add to your template's `globals.css`:

```css
:root {
  /* Add your custom themes */
  --user-themes: "forest,sunset";
  --user-theme-names: "🌲 Forest;🌅 Sunset";
}
```

### 2. Define Your Custom Themes

```css
/* Forest Theme - Green accent with green-tinted neutrals */
[data-palette="forest"] {
  /* Accent colors */
  --color-accent-1: var(--green-1);
  --color-accent-2: var(--green-2);
  /* ... continue through --color-accent-12 */
  
  /* Tinted neutrals for cohesive feel */
  --color-neutral-1: var(--green-n1);
  --color-neutral-2: var(--green-n2);
  /* ... continue through --color-neutral-12 */
}

/* Sunset Theme - Orange-to-pink gradient theme */
[data-palette="sunset"] {
  /* Custom OKLCH colors */
  --color-accent-1: oklch(0.98 0.02 45);
  --color-accent-9: oklch(0.65 0.25 25); /* Orange-red accent */
  /* ... define your complete palette */
}
```

### 3. Update TypeScript Types

```typescript
// packages/ui-core/src/types/theme.ts
export type Accent = 'teal' | 'mintteal' | 'blue' | 'purple' | 'orange' | 'forest' | 'sunset';
```

## Advanced Configuration

### Full Registry Control

```css
:root {
  /* UI-core themes to show (override default) */
  --ui-themes: "teal,blue,purple";
  --ui-theme-names: "🌊 Ocean;💙 Sky;💜 Galaxy";
  
  /* Your custom themes */
  --user-themes: "forest,sunset,corporate";
  --user-theme-names: "🌲 Forest;🌅 Sunset;🏢 Corporate";
  
  /* Default selection */
  --ui-default-theme: "forest";
}
```

### Available Registry Variables

| Variable | Purpose | Format |
|----------|---------|---------|
| `--ui-themes` | Built-in ui-core themes to show | `"teal,blue,purple"` |
| `--ui-theme-names` | Display names for ui-core themes | `"🌊 Teal;💙 Blue;💜 Purple"` |
| `--user-themes` | Your custom themes | `"forest,sunset"` |  
| `--user-theme-names` | Display names for custom themes | `"🌲 Forest;🌅 Sunset"` |
| `--ui-default-theme` | Initial theme selection | `"teal"` |

### Staging Themes (Hidden from UI)

You can define themes without exposing them in the ColorSelector:

```css
/* Define theme CSS but don't add to registry */
[data-palette="beta-theme"] {
  /* Complete theme definition */
}

/* Not in --user-themes, so won't appear in UI */
:root {
  --user-themes: "forest"; /* beta-theme not included */
}
```

## Theme Complexity Levels

### 🎨 **Simple Theme - Accents Only**
Perfect for quick brand colors or subtle variations:

```css
[data-palette="simple-red"] {
  /* Just define your 12 accent colors */
  --color-accent-1: oklch(98% 0.01 25);
  --color-accent-2: oklch(95% 0.03 25);
  --color-accent-3: oklch(92% 0.05 25);
  /* ... continue through 12 */
  --color-accent-12: oklch(25% 0.08 25);
}
```

**What you get:** Custom accent colors with default teal-tinted neutrals  
**Use case:** Brand colors, quick theme variants, subtle customization

### 🎨 **Complete Theme - Accents + Neutrals**  
For cohesive, professional themes:

```css
[data-palette="cohesive-theme"] {
  /* Accent colors (required) */
  --color-accent-1: oklch(/* your accent scale */);
  /* ... through 12 */
  
  /* Matching neutral colors (recommended) */
  --color-neutral-1: oklch(/* your neutral scale */);
  /* ... through 12 */
}
```

**What you get:** Fully cohesive theme with matching tinted neutrals  
**Use case:** Professional themes, client presentations, branded experiences

### 🎨 **Full Radix Theme - Everything**
For complete Radix Theme Creator integration:

```css
[data-palette="full-radix"] {
  /* Accent scale */
  --color-accent-1: oklch(/* from Radix export */);
  /* ... through 12 */
  
  /* Neutral scale */
  --color-neutral-1: oklch(/* from Radix export */);
  /* ... through 12 */
  
  /* Alpha variants for transparency effects */
  --color-neutral-a1: color(display-p3 /* alpha values */);
  /* ... through 12 */
  
  /* Special Radix colors for component compatibility */
  --color-neutral-contrast: #000000;
  --color-neutral-surface: color(display-p3 /* surface color */);
  --color-neutral-indicator: oklch(/* indicator color */);
  --color-neutral-track: oklch(/* track color */);
}
```

**What you get:** 100% Radix Theme Creator compatibility  
**Use case:** Advanced theming, component libraries, complex design systems

## **Dependencies & Requirements**

### ✅ **If you define accents, you must also define:**
- **Nothing!** Accents work standalone with default neutrals

### ✅ **If you define neutrals, you should also define:**
- `--color-neutral-1` through `--color-neutral-12` (complete scale)
- That's it! Alpha and special variants are optional

### ✅ **Optional but recommended for full compatibility:**
- `--color-neutral-a1` through `--color-neutral-a12` (transparency effects)  
- `--color-neutral-contrast` (high contrast text)
- `--color-neutral-surface` (surface backgrounds)
- `--color-neutral-indicator` & `--color-neutral-track` (progress elements)

### ✅ **Dark mode variants:**
Add `.dark[data-palette="your-theme"]` versions of any colors you want to customize for dark mode. If you skip dark mode variants, the light colors will be used in both modes.

### ⚠️ **Critical CSS Selector Syntax:**
**Use:** `.dark[data-palette="theme"]` (no space)  
**Not:** `.dark [data-palette="theme"]` (with space)

The space makes CSS look for a child element instead of the same element with both attributes. This is the most common issue when dark mode themes don't work.

## Theme Creation Workflow

### 1. Design Your Color Palette

Use the [Radix Color Tool](https://www.radix-ui.com/colors/custom) to create cohesive 12-step color scales:

- **Accent colors**: Your primary theme color (e.g., forest green)
- **Neutral colors**: Tinted grays that complement your accent

### 2. Define Theme Colors  

```css
[data-palette="your-theme"] {
  /* Accent scale - use Radix tool output */
  --color-accent-1: oklch(0.995 0.005 142);
  --color-accent-2: oklch(0.986 0.013 142);
  --color-accent-3: oklch(0.973 0.027 142);
  /* ... continue through 12 */
  
  /* Optional: Custom neutrals for unique feel */
  --color-neutral-1: var(--green-n1); /* or custom OKLCH */
  /* ... continue through 12 */
}
```

### 3. Register Theme

```css
:root {
  --user-themes: "your-theme";
  --user-theme-names: "🎨 Your Theme Name";
}
```

### 4. Update Types

```typescript
export type Accent = '...' | 'your-theme';
```

## Real-World Examples

### Example 1: Corporate Theme System

```css
:root {
  /* Only show corporate-approved themes */
  --ui-themes: "blue,teal";
  --ui-theme-names: "💙 Corporate Blue;🌊 Corporate Teal";
  
  /* Custom branded theme */
  --user-themes: "brand";
  --user-theme-names: "🏢 Brand Theme";
  
  --ui-default-theme: "brand";
}

[data-palette="brand"] {
  /* Use exact brand colors */
  --color-accent-9: oklch(0.55 0.20 230); /* Brand blue */
  /* ... complete branded palette */
}
```

### Example 2: Client Presentation

```css
:root {
  /* Show current options + staging themes */
  --user-themes: "forest,sunset,client-option-a,client-option-b";
  --user-theme-names: "🌲 Current Forest;🌅 Current Sunset;🎨 Option A;✨ Option B";
}
```

### Example 3: Seasonal Themes

```css
:root {
  /* Winter theme selection */
  --ui-themes: "blue,purple";
  --ui-theme-names: "❄️ Winter Blue;🔮 Winter Purple";
  
  --user-themes: "holiday";
  --user-theme-names: "🎄 Holiday Theme";
}
```

## Technical Details

### useAvailableThemes() Hook

The hook automatically:
- ✅ Reads CSS variables from document root
- ✅ Parses comma-separated theme lists  
- ✅ Merges ui-core and user themes
- ✅ Provides fallback display names
- ✅ Returns typed `ThemeInfo[]` array

### ColorSelector Enhancement

The enhanced ColorSelector:
- ✅ Uses dynamic theme discovery instead of hardcoded arrays
- ✅ Cycles through all registered themes
- ✅ Shows beautiful display names with emojis
- ✅ Updates button text and accessibility labels

### CSS Variable Parsing

Format requirements:
- **Theme lists**: `"theme1,theme2,theme3"` (comma-separated)
- **Display names**: `"Name 1;Name 2;Name 3"` (semicolon-separated)  
- **Quotes**: Wrap values in quotes for proper CSS parsing

## Migration from Hardcoded Themes

### Before (Old System)
```typescript
const ACCENTS = ["teal", "blue", "purple"] as const;
```

### After (Registry System)  
```typescript
const availableThemes = useAvailableThemes();
// Automatically includes ui-core + user themes with display names
```

## Best Practices

### 1. Theme Naming
- ✅ Use descriptive names: `"forest"` not `"green"`  
- ✅ Add emojis for visual appeal: `"🌲 Forest"`
- ✅ Keep names short for UI space: `"🌅 Sunset"` not `"🌅 Beautiful Sunset Theme"`

### 2. Color Design  
- ✅ Use OKLCH color space for consistent perception
- ✅ Maintain 12-step scales for design system compatibility
- ✅ Consider tinted neutrals for cohesive themes
- ✅ Test in both light and dark modes

### 3. Registry Management
- ✅ Group related themes: seasonal, corporate, experimental
- ✅ Use staging approach for client presentations  
- ✅ Keep registry lean - too many choices overwhelm users
- ✅ Set sensible defaults for new users

### 4. TypeScript Integration
- ✅ Update `Accent` type for new themes
- ✅ Use strict typing for theme IDs
- ✅ Leverage `ThemeInfo` interface for theme metadata

## Troubleshooting

### Theme Not Appearing in ColorSelector?

1. **Check registration**: Is theme added to `--user-themes`?
2. **Check CSS cascade**: Does theme definition come after ui-core import?  
3. **Check TypeScript**: Is theme added to `Accent` type?
4. **Check format**: Are CSS variables properly quoted?

### Display Name Issues?

1. **Check separator**: Use semicolons `;` not commas for names
2. **Check alignment**: Same number of themes and names?
3. **Check quotes**: Wrap complete list in quotes

### Theme Colors Not Working?

1. **Check CSS specificity**: Use `[data-palette="theme"]` selector
2. **Check variable names**: Match semantic color system exactly
3. **Check OKLCH format**: Valid lightness/chroma/hue values?

## Summary

The Theme Registry System provides professional-grade theme management with:

- 🎯 **Developer Control**: You decide which themes users see
- 🎨 **Beautiful UI**: Emoji display names enhance user experience  
- 🔧 **Flexible**: Mix built-in and custom themes seamlessly
- 📱 **Dynamic**: No hardcoded arrays, themes discovered at runtime
- 🚀 **Professional**: Perfect for client presentations and corporate environments

This system transforms theme selection from a technical constraint into a powerful design tool. ✨