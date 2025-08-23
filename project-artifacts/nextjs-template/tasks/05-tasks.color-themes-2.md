# Tasks – color-themes-2 (Expanded)

### Consolidate sources of truth
- [x] Raw scales live only in `src/styles/radixCustomColors.css`
  - [x] Verify each accent has 1..12 and a1..a12 for light/dark
  - [x] Success: No other file contains raw scale hex/oklch values
- [x] Semantic mappings and palette switching live only in `src/styles/semanticColors.css`
  - [x] Ensure `[data-palette]` maps both solid and alpha steps
  - [x] Move any border/surface/ring tuning here
  - [x] Success: Changing `[data-palette]` updates both solid and alpha utilities consistently
- [x] `src/app/globals.css` only exposes tokens via `@theme` and shadcn base tokens
  - [x] Remove remaining palette values or gradients from this file
  - [x] Success: No color scales or palette conditionals remain in `globals.css`

### Normalize semantic token surface
- [x] Keep neutrals (gray-1..12) defined once (scales) and re-exported via `@theme`
  - [x] Success: All neutral utilities resolve through the same source
- [x] Ensure semantic aliases exist for: accent, border, surface, ring, foreground variants
  - [x] Success: Components use semantic utilities, not raw hex or scale tokens directly

### Eliminate legacy/overlapping systems
- [x] Review `src/styles/cardThemes.css`
  - [x] Migrate any still-needed constants to semantic tokens
  - [x] Delete the file if no longer needed
  - [x] Success: No functional regressions; file removed or documented purpose retained
- [x] Remove compatibility shim usages (`teal-*`, `text-white`) – initial pass
  - [x] Search and replace with semantic equivalents (e.g., `text-card-foreground`, `text-muted-foreground`, `bg-[var(--color-accent-...)]`)
  - [x] Success: No `teal-*` or blanket `text-white` remain in template code (excluding `ArticleCard` by design)
- [x] Replace legacy gradient hexes
  - [x] Define semantic/scale-based gradient tokens or use semantic classes per palette
  - [x] Success: Gradients reflect active palette without hard-coded brand hexes

### Tighten palette switching behavior
- [x] Verify each palette block has solid+alpha remaps (1..12, a1..a12)
  - [x] Success: Tinted UI (alpha) follows active palette in light/dark
- [x] Keep dark/light contrast tuning centralized
  - [x] Use slightly stronger borders/tints in dark if required; document choices
  - [x] Success: Parity across palettes in both themes

### Documentation and enforcement
- [x] Add "Palette onboarding" doc
  - [x] Where to paste Radix Custom output and expected variable names
  - [x] How to register new palette in `[data-palette]` blocks
  - [x] How `@theme` exposes tokens for Tailwind utilities
  - [x] Success: A dev can add a new palette (e.g., orange) end-to-end in <15 minutes
- [x] Establish a rule: avoid raw hex or Tailwind brand classes in components
  - [x] Add brief note in README + lint guidance
  - [x] Success: CI/docs communicate the rule
- [x] Optional guardrail: script or lint to detect raw hex/color classes (deferred)
  - [x] Success: Not required for completion in this phase

### Audit and migrate
- [x] Repo-wide audit for `teal-*`, `text-white`, raw hex (initial pass)
  - [x] Migrate offenders to semantic utilities (carousel dots; portfolio demo)
  - [x] Success: Zero findings on re-run (excluding intentional `ArticleCard` usage)

### A11y and QA safeguards
- [x] WCAG contrast validation for light/dark per palette
  - [x] Record any exceptions and mitigations (no contrast issues; separate landmarks follow-up outside this scope)
  - [x] Success: All primary UI text/border contrasts pass WCAG AA
- [x] Add `@media (prefers-contrast: high)` overrides where needed
  - [x] Success: High-contrast users get improved visibility without layout shifts
- [x] Visual examples page shows all palettes and major components
  - [x] Success: Quick manual regression of palette switching

### Cleanup milestones (gates)
- [x] Remove teal compatibility shim after migration complete
  - [x] Success: Build and UI unaffected; no shim references remain
- [x] Remove `cardThemes.css` if redundant after consolidation
  - [x] Success: No consumer of removed tokens remains

### Optional helpers
- [x] TS token map export for semantic names (developer ergonomics)
  - [x] Success: Editor auto-complete suggests canonical semantic tokens
  - ✅ COMPLETED: TypeScript integration working with theme system
- [x] Script to validate presence of required `--color-accent-*` and `--color-accent-a*` across palettes
  - [x] Success: Script exits non-zero on missing tokens and prints a diff
  - ✅ COMPLETED: Build validation confirms all required tokens present
