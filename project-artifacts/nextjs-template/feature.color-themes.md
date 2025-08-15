# Feature — Color Themes System

This document captures the current theming/color systems in the Next.js template, key gaps, and a design for a single, extensible system that:
- Uses Radix Colors 1–12 as the foundation across light/dark (including alpha and P3 variants)
- Enables easy palette switching (e.g., teal, mintteal, blue, purple; user-generated palettes)
- Supports Radix Custom Palettes generator output
- Provides a safe migration path away from hard-coded color classes

Primary external reference: Radix Colors Custom Palettes (https://www.radix-ui.com/colors/custom)

## Inventory — Systems and Sources

- Radix custom palettes and neutrals (source of truth)
  - File: `templates/nextjs/src/styles/radixCustomColors.css`
  - Provides `--<scale>-1..12`, alpha (`--<scale>-a1..a12`), light/dark, and P3 definitions for:
    - `teal`, `mintteal` (brand), `blue`, `purple`, `green`, and a gray family
  - Example: `--teal-1..12`, `--teal-a1..a12`, `--teal-contrast`, `--teal-surface`, etc.

- Semantic alias layer (accent mapped to Radix steps)
  - File: `templates/nextjs/src/styles/semanticColors.css`
  - Default maps `--color-accent-1..12` to `--teal-*`, plus alpha and roles for cards, borders, interaction, and text.

- Card theming layer (consumes semantic aliases)
  - File: `templates/nextjs/src/styles/cardThemes.css`
  - Uses `--color-card-*` and related semantic variables to define card backgrounds, borders, and surfaces.

- Shadcn base tokens (OKLCH) and Tailwind v4 tokens
  - File: `templates/nextjs/src/app/globals.css`
  - Declares shadcn tokens (`--background`, `--foreground`, `--primary`, `--border`, etc.) and Tailwind `@theme` tokens.

- Hard-coded Tailwind utilities (teal-*) still in use
  - Examples: `text-teal-600`, `bg-teal-500`, `border-teal-300`, `from-teal-500`, etc. across multiple components.

## Gaps / Issues

- Border token mismatch in shadcn tokens:
  - `--border: var(--color-teal-500)` points to a non-existent Tailwind variable (we expose 1–12, not 50/500 steps). Borders won’t reliably follow the accent palette.

- Semantic aliases default to `teal` only
  - No remapping blocks for `mintteal`, `blue`, `purple`, etc. so true palette switching is not yet wired.

- Hard-coded Tailwind utilities limit theme switching
  - `teal-*` classes bypass the semantic layer; need a compatibility path to avoid breaking visuals during migration.

## Target Design — Single Semantic System

- Keep Radix palette CSS as the source of truth
  - `radixCustomColors.css` remains unchanged; it provides all scales, alpha, P3, and light/dark.

- Use semantic aliases as the primary API
  - `--color-accent-1..12`, `--color-accent-a1..a12` and role-based tokens (`--color-card-*`, `--color-border-accent*`, `--color-text-accent`, etc.).
  - Add per-palette mapping blocks keyed by `[data-accent="<palette>"]` (e.g., `teal`, `mintteal`, `blue`, `purple`, `green`) that simply remap the semantic aliases to a different Radix scale.

- Align Tailwind v4 utilities
  - In `globals.css`, expose Tailwind `@theme` tokens for semantic aliases so `bg-accent-9`, `text-accent-12`, `border-accent-7` utilities become available.
  - Fix the `--border` token to use the semantic border alias, e.g., `--border: var(--color-border-accent)`.
  - Add a compatibility shim: define `--color-teal-50..950` mapped from Radix steps to keep existing `teal-*` utilities functional until migration completes (e.g., Step 9 → 500, Step 10 → 600, Step 11 → 700, Step 12 → 800).

- Theme management
  - Extend `ThemeProvider` to also manage `accent` (e.g., `teal | mintteal | blue | purple`), persist it, and reflect via `[data-accent]` on `html`. Light/dark toggling remains as-is.

## Supporting Radix Custom Palettes

Allow users to generate new palettes via the Radix generator and drop them in with minimal steps:
1) Add the new palette variables (light/dark + alpha/P3) into `templates/nextjs/src/styles/radixCustomColors.css`.
2) Create a semantic mapping block in `templates/nextjs/src/styles/semanticColors.css` under `[data-accent="<name>"]` that maps `--color-accent-1..12` (and `-a1..a12`) to the new `--<name>-<step>` variables.

No code beyond CSS mappings is required to enable a new palette.

## Implementation Plan (Phased)

A. Semantic and Tailwind token alignment
- Expose Tailwind tokens for `accent-1..12` (from the semantic aliases) to enable `bg-accent-9`, `text-accent-12`, etc.
- Expose neutrals (`gray-1..12`) from the chosen gray family in `@theme` tokens if needed.
- Fix shadcn `--border` to `var(--color-border-accent)`.
- Add the `teal-*` compatibility shim as a temporary bridge.

B. Accent palette switching (CSS mapping)
- Add `[data-accent]` blocks for `teal` (default), `mintteal`, `blue`, `purple` (extensible) in `semanticColors.css` that remap the semantic aliases to the chosen Radix scale.

C. ThemeProvider enhancement
- Manage `accent` in state and localStorage; update `[data-accent]` on `document.documentElement`.
- Extend `useTheme()` to return `{ theme, setTheme, accent, setAccent }`.

D. Radix Custom Palettes support
- Document the drop-in process in README and keep a strict mapping convention for new palettes.
- Optionally add a registry/type for available accents.

E. Migration from hard-coded classes (incremental)
- Inventory `teal-*` usages; replace in phases:
  1) New/edited components: use semantic utilities (e.g., `bg-accent-3`, `text-accent-12`, `border-accent-7`) or `var(--color-*)` directly for fine control.
  2) Gradually refactor existing `teal-*` usages, verifying light/dark and accent switching.
  3) Remove the compatibility shim when no longer needed.

## Accessibility & Quality

- Follow Radix guidance: Steps 11–12 provide text contrast over Step 2 backgrounds.
- Validate WCAG contrast (AA/AAA) on key surfaces.
- Provide `@media (prefers-contrast: high)` overrides for borders/focus rings where needed.
- Test dark/light parity and each accent palette.

## Risks / Mitigations

- Risk: Visual regressions during migration.
  - Mitigation: Compatibility shim; incremental replacements; visual QA.
- Risk: Component-specific gradients/badges relying on fixed hues.
  - Mitigation: Use semantic-based gradients (e.g., `from-[var(--color-accent-9)] to-[var(--color-accent-10)]`) or define per-accent gradient variables.

## References

- Radix Colors (overview, scale semantics, aliasing)
- Radix Custom Palettes generator: https://www.radix-ui.com/colors/custom
- Project research: `templates/nextjs/examples/our-project/radix-colors-research.md`


