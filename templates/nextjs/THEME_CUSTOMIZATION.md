# Theme Customization Guide

This guide shows how to create custom themes for your application using the theme-specific neutral colors architecture.

## Overview

The color system has 3 layers:
1. **Raw Colors** (`radixColors.css`) - Base OKLCH color definitions
2. **Semantic Mappings** (`semanticColors.css`) - Maps themes to raw colors
3. **Component Styles** (`shadcn.css`) - Uses semantic variables for UI

## Built-in Themes

Available themes via `data-palette` attribute:
- `teal` (default) - Professional teal with neutral grays
- `mintteal` - Mint teal variant
- `blue` - Classic blue theme
- `purple` - Rich purple theme
- `orange` - Warm orange theme
- `green` - Nature-inspired green theme

## Creating Custom Themes

### Step 1: Define Your Theme Colors

Add your theme definition to your `globals.css` file. Here are complete examples:

#### Banana Theme (Brown + Yellow)
```css
/* Banana theme - warm yellow accents with brown-tinted neutrals */
[data-palette="banana"] {
  /* Accent colors - warm yellow scale */
  --color-accent-1: oklch(0.995 0.005 85);
  --color-accent-2: oklch(0.984 0.012 85);
  --color-accent-3: oklch(0.968 0.025 85);
  --color-accent-4: oklch(0.946 0.042 85);
  --color-accent-5: oklch(0.918 0.062 85);
  --color-accent-6: oklch(0.877 0.085 85);
  --color-accent-7: oklch(0.799 0.112 85);
  --color-accent-8: oklch(0.719 0.142 85);
  --color-accent-9: oklch(0.708 0.15 85);
  --color-accent-10: oklch(0.665 0.14 85);
  --color-accent-11: oklch(0.598 0.125 85);
  --color-accent-12: oklch(0.156 0.028 85);

  /* Custom brown-tinted neutrals */
  --color-neutral-1: oklch(0.995 0.004 45);
  --color-neutral-2: oklch(0.984 0.005 45);
  --color-neutral-3: oklch(0.968 0.006 45);
  --color-neutral-4: oklch(0.946 0.007 45);
  --color-neutral-5: oklch(0.918 0.008 45);
  --color-neutral-6: oklch(0.877 0.009 45);
  --color-neutral-7: oklch(0.719 0.010 45);
  --color-neutral-8: oklch(0.609 0.011 45);
  --color-neutral-9: oklch(0.537 0.012 45);
  --color-neutral-10: oklch(0.481 0.013 45);
  --color-neutral-11: oklch(0.395 0.014 45);
  --color-neutral-12: oklch(0.156 0.026 45);
}
```

#### Sunset Theme (Orange + Pink)
```css
/* Sunset theme - warm orange-to-pink gradient */
[data-palette="sunset"] {
  /* Accent colors - sunset orange-pink */
  --color-accent-1: oklch(0.995 0.005 35);
  --color-accent-2: oklch(0.984 0.012 35);
  --color-accent-3: oklch(0.968 0.025 35);
  --color-accent-4: oklch(0.946 0.042 35);
  --color-accent-5: oklch(0.918 0.062 35);
  --color-accent-6: oklch(0.877 0.085 35);
  --color-accent-7: oklch(0.799 0.112 35);
  --color-accent-8: oklch(0.719 0.142 35);
  --color-accent-9: oklch(0.708 0.15 35);
  --color-accent-10: oklch(0.665 0.14 35);
  --color-accent-11: oklch(0.598 0.125 35);
  --color-accent-12: oklch(0.156 0.028 35);

  /* Warm-tinted neutrals */
  --color-neutral-1: oklch(0.995 0.003 25);
  --color-neutral-2: oklch(0.984 0.004 25);
  --color-neutral-3: oklch(0.968 0.005 25);
  --color-neutral-4: oklch(0.946 0.006 25);
  --color-neutral-5: oklch(0.918 0.007 25);
  --color-neutral-6: oklch(0.877 0.008 25);
  --color-neutral-7: oklch(0.719 0.009 25);
  --color-neutral-8: oklch(0.609 0.010 25);
  --color-neutral-9: oklch(0.537 0.011 25);
  --color-neutral-10: oklch(0.481 0.012 25);
  --color-neutral-11: oklch(0.395 0.013 25);
  --color-neutral-12: oklch(0.156 0.025 25);
}
```

#### Forest Theme (Green Accents + Green Neutrals)
```css
/* Forest theme - deep greens with green-tinted neutrals */
[data-palette="forest"] {
  /* Use built-in green accent colors */
  --color-accent-1: var(--green-1);
  --color-accent-2: var(--green-2);
  --color-accent-3: var(--green-3);
  --color-accent-4: var(--green-4);
  --color-accent-5: var(--green-5);
  --color-accent-6: var(--green-6);
  --color-accent-7: var(--green-7);
  --color-accent-8: var(--green-8);
  --color-accent-9: var(--green-9);
  --color-accent-10: var(--green-10);
  --color-accent-11: var(--green-11);
  --color-accent-12: var(--green-12);

  /* Green-tinted neutrals for forest feel */
  --color-neutral-1: var(--green-n1);
  --color-neutral-2: var(--green-n2);
  --color-neutral-3: var(--green-n3);
  --color-neutral-4: var(--green-n4);
  --color-neutral-5: var(--green-n5);
  --color-neutral-6: var(--green-n6);
  --color-neutral-7: var(--green-n7);
  --color-neutral-8: var(--green-n8);
  --color-neutral-9: var(--green-n9);
  --color-neutral-10: var(--green-n10);
  --color-neutral-11: var(--green-n11);
  --color-neutral-12: var(--green-n12);
}
```

### Step 2: Using Pre-built Neutral Scales

The ui-core provides pre-built neutral scales for common themes:

- `--green-n1` through `--green-n12` - Subtle green-tinted grays
- `--orange-n1` through `--orange-n12` - Warm orange-tinted grays  
- `--blue-n1` through `--blue-n12` - Cool blue-tinted grays
- `--purple-n1` through `--purple-n12` - Cool purple-tinted grays

Use these for quick neutral customization:

```css
[data-palette="oceanic"] {
  /* Use built-in blue accents */
  --color-accent-1: var(--blue-1);
  /* ... other accent colors ... */
  
  /* Use pre-built blue-tinted neutrals */
  --color-neutral-1: var(--blue-n1);
  --color-neutral-2: var(--blue-n2);
  /* ... other neutral colors ... */
}

[data-palette="twilight"] {
  /* Use built-in purple accents */
  --color-accent-1: var(--purple-1);
  /* ... other accent colors ... */
  
  /* Use pre-built purple-tinted neutrals */
  --color-neutral-1: var(--purple-n1);
  --color-neutral-2: var(--purple-n2);
  /* ... other neutral colors ... */
}
```

### Step 3: Apply Your Theme

Set the theme via HTML attribute:

```html
<html data-palette="banana">
  <!-- Your app content -->
</html>
```

Or dynamically with JavaScript:
```javascript
document.documentElement.setAttribute('data-palette', 'sunset');
```

### Step 4: Theme Switching

The built-in ColorSelector component will automatically detect and include custom themes defined in your template. Custom themes appear alongside built-in themes in the theme picker.

## OKLCH Color Space Guide

All colors use OKLCH format: `oklch(lightness chroma hue)`

- **Lightness**: 0 (black) to 1 (white)
- **Chroma**: 0 (gray) to 0.15+ (vivid)
- **Hue**: 0-360 degrees (red=0, yellow=60, green=120, cyan=180, blue=240, magenta=300)

### Color Scale Progression

For consistent themes, follow these lightness progressions:

**Light Mode Scale:**
```
-1: 0.995   (near white)
-2: 0.984   (very light)  
-3: 0.968   (light)
-4: 0.946   (light-medium)
-5: 0.918   (medium-light)
-6: 0.877   (medium)
-7: 0.799   (medium-dark)
-8: 0.719   (dark)
-9: 0.708   (primary/accent)
-10: 0.665  (dark accent)
-11: 0.598  (very dark)
-12: 0.156  (near black)
```

**Chroma Progression:**
- Start low (0.003-0.005) for subtle steps
- Increase gradually (0.012, 0.025, 0.042...)
- Peak at step 9 for primary colors (0.15)
- Reduce slightly for darker steps

### Dark Mode Considerations

Dark mode automatically inverts the lightness scale while preserving hue and chroma relationships. Your light mode definitions will work in both modes.

## Best Practices

1. **Test Both Modes**: Always test your theme in both light and dark mode
2. **Maintain Contrast**: Ensure sufficient contrast for accessibility
3. **Consistent Hue**: Use related hues for accent and neutral colors
4. **Subtle Neutrals**: Keep neutral color saturation low (chroma < 0.015)
5. **Progressive Enhancement**: Theme should work even if neutrals aren't overridden

## Troubleshooting

**Theme not appearing?** Check that:
- CSS syntax is correct (no typos in variable names)
- Theme is defined after the ui-core import
- HTML `data-palette` attribute matches your theme name

**Colors look wrong?** Verify:
- OKLCH values are in correct format
- Lightness progression follows the scale
- Chroma isn't too high for neutral colors

**Build errors?** Ensure:
- All 12 color steps are defined
- Variable names use exact syntax (`--color-accent-1`, etc.)
- No circular references in variable definitions

## Examples in Action

See the `/test-cards` page in your application to preview how your custom themes look across different UI components.

---

For more advanced theming scenarios, see the ui-core documentation and consider contributing your theme back to the community!