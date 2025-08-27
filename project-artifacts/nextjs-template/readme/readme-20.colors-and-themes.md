# Colors and Themes System

## Overview

The manta-templates color system follows a three-layer architecture that separates concerns and enables flexible theming:

```
Raw Color Palettes → Semantic Role Mappings → UI Component Styles
```

This approach allows:
- **Easy theme switching**: Change accent colors without touching components
- **Framework agnostic**: Same color system works across Next.js, React, Astro, etc.
- **Design system consistency**: All components use the same semantic color variables
- **Accessibility**: Built-in dark mode and high contrast support

## Architecture

### Layer 1: Raw Color Palettes (`radixColors.css`)

**Purpose**: Defines the actual color values in OKLCH format
**Contains**: Color scales (1-12 steps) for multiple palettes

```css
:root {
  /* Teal scale - 12 steps from lightest to darkest */
  --teal-1: oklch(0.99 0.005 180);    /* Lightest */
  --teal-2: oklch(0.97 0.013 174);
  /* ... */
  --teal-12: oklch(0.15 0.02 174);    /* Darkest */
  
  /* Alpha variants for overlays */
  --teal-a1: oklch(0.99 0.005 180 / 0.05);
  --teal-a2: oklch(0.97 0.013 174 / 0.1);
  /* ... */
}

.dark {
  /* Same variables, different values for dark mode */
  --teal-1: oklch(0.15 0.02 174);     /* Dark mode: starts dark */
  --teal-12: oklch(0.95 0.015 174);   /* Dark mode: ends light */
}
```

**Available Palettes**: 
- `teal` (default), `mintteal` (brand), `blue`, `purple`, `green`, `orange`
- Standard `gray` for neutral elements

### Layer 2: Semantic Role Mappings (`semanticColors.css` + `shadcn.css`)

**Purpose**: Maps raw colors to semantic roles that components can use

#### semanticColors.css - Accent Color System
Maps the active palette to semantic accent roles:

```css
:root {
  /* Accent system - dynamically points to active palette */
  --color-accent-1: var(--teal-1);    /* Can switch to --blue-1, etc. */
  --color-accent-2: var(--teal-2);
  /* ... */
  --color-accent-12: var(--teal-12);
  
  /* Component-specific semantics */
  --color-card-border: var(--color-accent-7);
  --color-card-accent: var(--color-accent-9);
}

/* Palette switching */
[data-palette="blue"] {
  --color-accent-1: var(--blue-1);    /* Switch entire accent system */
  /* ... */
}
```

#### shadcn.css - Design System Variables
Defines the ShadCN design system semantic colors:

```css
:root {
  /* Core design system colors */
  --radius: 1.5rem;
  --background: oklch(1 0 0);                    /* Page background */
  --foreground: oklch(0.129 0.042 264.695);     /* Primary text */
  --card: oklch(1 0 0);                         /* Card background */
  --card-foreground: oklch(0.129 0.042 264.695); /* Card text */
  --primary: oklch(0.208 0.042 265.755);        /* Primary buttons */
  --secondary: oklch(0.968 0.007 247.896);      /* Secondary buttons */
  --muted: oklch(0.968 0.007 247.896);          /* Muted backgrounds */
  --destructive: oklch(0.577 0.245 27.325);     /* Error/danger */
  --border: var(--color-border-accent);         /* Uses accent system */
  --input: oklch(0.929 0.013 255.508);          /* Form inputs */
  --ring: oklch(0.704 0.04 256.788);            /* Focus rings */
  
  /* Chart colors for data visualization */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  
  /* Sidebar system (for complex layouts) */
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  /* ... */
}

.dark {
  /* All the same variables, optimized for dark mode */
  --background: oklch(0.129 0.042 264.695);     /* Dark background */
  --foreground: oklch(0.984 0.003 247.858);     /* Light text */
  /* ... */
}
```

### Layer 3: UI Component Styles (`components.css`)

**Purpose**: Base styles and utility classes that use semantic variables

```css
/* Base framework-agnostic styles */
@layer base {
  * {
    @apply border-border outline-ring/50;  /* Use theme colors for all borders */
  }
  body {
    @apply bg-background text-foreground;  /* Apply theme to body */
  }
  
  /* Typography customizations */
  .prose-lg h1 {
    font-size: 2.5rem !important;
  }
}

/* Gradient utilities using accent system */
.gradient-accent {
  background: linear-gradient(135deg, var(--color-accent-7) 0%, var(--color-accent-10) 100%);
}

/* Scrollbar styles using neutral colors */
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--gray-6);      /* Neutral, not accent */
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: var(--gray-2);      /* Very light neutral */
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--gray-7);      /* Dark mode neutral */
}
```

## How Themes Work

### Theme Switching
Change the entire accent color system by setting a data attribute:

```html
<!-- Default: uses teal -->
<html>
  
<!-- Switch to blue theme -->
<html data-palette="blue">

<!-- Switch to purple theme -->  
<html data-palette="purple">
```

The `semanticColors.css` file automatically remaps all `--color-accent-*` variables to the selected palette.

### Dark Mode
Controlled by CSS class:

```html
<!-- Light mode -->
<html class="">

<!-- Dark mode -->
<html class="dark">
```

All color files include `.dark` selectors that redefine colors optimally for dark backgrounds.

### Custom Themes

#### Template-Level Theme Definition
Add custom themes directly in your template's `globals.css` without modifying ui-core:

**Step 1: Define Theme Registry**
```css
/* Control which themes appear in ColorSelector */
:root {
  --user-themes: "banana,sunset";              /* Theme IDs */
  --theme-names: "🍌 Banana,🌅 Sunset";       /* Display names (optional) */
  --default-theme: "banana";                  /* Default selection (optional) */
}
```

**Step 2: Generate Colors (Recommended)**
Use the [Radix Custom Color Tool](https://radix-ui.com/colors/custom) to generate professional color scales:

```css
/* Generated by Radix Color Tool */
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
      --yellow-1: oklch(14.2% 0.0135 107.2);
      --yellow-2: oklch(20.2% 0.0177 107.2);
      /* ... complete 12-step yellow scale */
      
      --brown-1: oklch(18.5% 0.012 45);
      --brown-2: oklch(22.3% 0.015 45);
      /* ... complete 12-step brown scale */
    }
  }
}
```

**Step 3: Map to Semantic System**
```css
[data-palette="banana"] {
  /* Yellow accents */
  --color-accent-1: var(--yellow-1);
  --color-accent-2: var(--yellow-2);
  --color-accent-9: var(--yellow-9);   /* Primary accent */
  --color-accent-11: var(--brown-11);  /* High contrast text */
  
  /* Brown neutrals (overrides gray system) */
  --gray-1: var(--brown-1);            /* Background tint */
  --gray-2: var(--brown-2);            /* Scrollbar track */
  --gray-6: var(--brown-6);            /* Borders */
  --gray-8: var(--brown-8);            /* Muted text */
  
  /* Alpha variants work automatically */
  --color-accent-a9: var(--yellow-a9);
  --gray-a6: var(--brown-a6);
}
```

**Result**: ColorSelector automatically includes "🍌 Banana" in theme options

#### ShadCN Integration Notes

**Important**: When you override `--gray-*` variables, ShadCN design system variables automatically update:

```css
/* ShadCN variables that use gray system */
--muted: var(--gray-2);           /* Updates when you override --gray-2 */
--border: var(--gray-6);          /* Updates when you override --gray-6 */
--muted-foreground: var(--gray-8); /* Updates when you override --gray-8 */
```

This means when you use brown tones for your "gray" system in a theme, all ShadCN components (buttons, cards, inputs) automatically adapt to use brown tones instead of neutral grays. This is the intended behavior and creates cohesive theming across all components.

For more details on ShadCN color system integration, see: [ShadCN Colors Documentation](https://ui.shadcn.com/docs/theming)

## File Organization

```
packages/ui-core/src/styles/
├── index.css           # Main entry point, imports everything
├── radixColors.css     # Raw color palettes (OKLCH values)
├── semanticColors.css  # Accent color mappings & palette switching
├── shadcn.css          # ShadCN design system variables
└── components.css      # Base styles, utilities, component styles
```

### Import Order (Critical)
```css
/* In index.css - order matters! */
@import "tailwindcss";
@import './radixColors.css';     /* 1. Raw colors first */
@import './semanticColors.css';  /* 2. Semantic mappings second */
@import './shadcn.css';          /* 3. Design system third */
@import './components.css';      /* 4. Components & utilities last */
```

### Tailwind Integration
The main `index.css` includes a `@theme` block that exposes all color variables as Tailwind utilities:

```css
@theme {
  /* Make semantic colors available as Tailwind classes */
  --color-background: var(--background);     /* Enables bg-background */
  --color-foreground: var(--foreground);     /* Enables text-foreground */
  --color-accent-9: var(--color-accent-9);   /* Enables bg-accent-9 */
  /* ... */
}
```

This allows using semantic colors in Tailwind classes:
```html
<div class="bg-card text-card-foreground border-border">
  <h1 class="text-accent-11">Title</h1>
  <p class="text-muted-foreground">Subtitle</p>
</div>
```

## Customization Guide

### Changing Accent Colors
**Easy way**: Use existing palettes
```html
<html data-palette="blue">    <!-- Blue theme -->
<html data-palette="purple">  <!-- Purple theme -->
<html data-palette="green">   <!-- Green theme -->
```

**Custom way**: Add your own palette to `radixColors.css` and `semanticColors.css`

### Customizing Component Colors
**Option 1**: Override semantic mappings
```css
:root {
  --color-card-border: var(--color-accent-8);  /* Stronger borders */
}
```

**Option 2**: Override ShadCN variables
```css
:root {
  --card: oklch(0.98 0.01 180);  /* Slightly tinted cards */
}
```

**Option 3**: Create component-specific variables
```css
:root {
  --color-my-component: var(--color-accent-6);
}

.my-component {
  background-color: var(--color-my-component);
}
```

### Neutral vs Accent Elements
**Use accent colors for**:
- Interactive elements (buttons, links)
- Important UI elements (selected states, highlights)
- Brand elements

**Use neutral colors for**:
- Scrollbars, borders, dividers
- Background elements
- Text (except when highlighting)

## Migration Notes

This documentation describes the **target state** after migrating from the current split between `globals.css` (in template) and ui-core styles.

### What's Moving to UI-Core
- **ShadCN color system** (background, foreground, card, primary, etc.)
- **Base layer styles** (*, body styling)
- **Typography customizations** (.prose-lg, etc.)
- **Gradient utilities**
- **Scrollbar styles** (converted to use neutral grays)
- **Theme mappings** for Tailwind utilities

### Benefits After Migration
- **Single source of truth**: All colors defined in ui-core
- **Framework agnostic**: Same color system works in any React framework
- **Easier customization**: Clear layer separation
- **Better maintainability**: Colors defined in one place
- **Template simplification**: Templates just import ui-core styles

### Template Impact
After migration, template `globals.css` becomes minimal:
```css
@import "tailwindcss";
@import "tw-animate-css"; 
@plugin "@tailwindcss/typography";
@import "@manta-templates/ui-core/dist/styles/index.css";

/* Template-specific overrides only */
```

This creates a much cleaner separation between framework-agnostic design system (ui-core) and template-specific customizations.