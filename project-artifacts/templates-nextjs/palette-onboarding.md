# Palette Onboarding (Radix custom → semantic tokens)

This guide shows how to add a new accent palette (e.g., orange) that switches with `data-palette` and flows through semantic tokens and Tailwind utilities.

## 1) Drop raw scales (one place)
- File: `templates/nextjs/src/styles/radixCustomColors.css`
- Add the palette with full steps for light and dark:
  - Solid: `--yourcolor-1..12`
  - Alpha: `--yourcolor-a1..a12`
- Keep this file scale-only (no base tokens). Example block exists for `orange`.

## 2) Wire palette switching (one place)
- File: `templates/nextjs/src/styles/semanticColors.css`
- Add a `[data-palette="yourcolor"]` block that remaps BOTH:
  - Solid: `--color-accent-1..12 → var(--yourcolor-1..12)`
  - Alpha: `--color-accent-a1..a12 → var(--yourcolor-a1..a12)`
- Keep dark/light border tuning here only (and high-contrast overrides).

## 3) Tailwind access via @theme
- File: `templates/nextjs/src/app/globals.css`
- `@theme` exposes semantic tokens (e.g., `--color-accent-*`, neutrals). Use them in utilities:
  - Example: `bg-[var(--color-accent-9)]`, `text-[var(--color-accent-12)]`, `border-[var(--color-card-border)]`.
  - Prefer semantic utilities like `text-foreground`, `text-muted-foreground` where applicable.

## 4) Runtime switching
- Accent is toggled by setting `document.documentElement.dataset.palette = 'yourcolor'` (ThemeProvider handles this).
- Components automatically update because they consume semantic tokens.

## 5) Success checklist
- Palette appears correctly in light/dark.
- Alpha tints (A-steps) follow the active palette (buttons, overlays, frosted surfaces).
- No raw hex or Tailwind brand color utilities used in components (use semantic tokens instead).

## Optional: palette-scoped overrides (e.g., sidebar)
You can remap specific UI areas to follow the active palette without changing components. Example: make the sidebar purple when the `purple` palette is active.

In `templates/nextjs/src/styles/semanticColors.css` add inside the `[data-palette="purple"]` block:

```css
[data-palette="purple"] {
  /* Sidebar uses current accent */
  --sidebar-primary: var(--color-accent-9);
  --sidebar-accent: var(--color-accent-3);
  --sidebar-foreground: var(--color-accent-12);
}
```

Because `@theme inline` exposes `--color-sidebar-*` from `--sidebar-*`, the sidebar will pick these up automatically. Switch palettes and the sidebar updates with no component changes.
