# 03 – Tasks (manta-templates)
Sections are in L2 headings (ex: cards-migration).

## cards-migration
Design source: `templates/nextjs/examples/our-project/feature.cards-migration.md`
Scope: Integrate reusable, markdown-driven cards into `templates/nextjs/src/components/cards/` with clear functional subfolders and ContentLoader wrappers. Do not modify `landing/`.

### Overview (completed)
- [x] Types added/extended: `ArticleContent`, `ProjectContent (displayVariant, image)`, `AboutContent`, `SocialLink`, `TechnologiesContent`
- [x] Sample content added: featured article, technologies, about, sample project
- [x] Presentational components: `ArticleCard`, `BlogIndexCard`, `ProjectCard` (panel/showcase), `AboutCard`
- [x] ContentLoaders: `ArticleCardContentLoader`, `ProjectCardContentLoader`, `AboutCardContentLoader`
- [x] Migrations/cleanup: replaced legacy card usages; removed `ProjectFeatureCard`
- [x] Docs: README updated (cards section, header/footer variants, `/examples/cards`)
- [x] QA: build/lint/typecheck green; visual parity and a11y verified (note: one img warning intentionally ignored)

## cosine-card
- [x] Add cosine surface card from provided source
- [x] Refactor and reorganize parameters to improve usability

## cosine-card-terrain
- [ ] Analyze the provided source and see how we might integrate the parameteric behavior
- [ ] Determine if the new source provides any additional terrain calculation features
- [ ] Examine viability and best method of adding control panel (design task)
- [ ] Panel should be accessed by a small gear icon or similar.  Don't display it all the time.
- [ ] Consider how to respond to changes in controls (refresh, smoothly adapt to new parameters, etc).  Use feature.cosine-live-update as additional background in evaluating this task.

## color-themes 
Design source: `templates/nextjs/examples/our-project/tasks/03-tasks-color-themes.md`

### Overview
- [x] Inventory current theming systems and propose unified design
  - Systems: Radix custom palettes (`radixCustomColors.css`), semantic aliases (`semanticColors.css`), shadcn base tokens (in `globals.css`), Tailwind v4 utilities (some hard-coded `teal-*`) (cardThemes.css removed)
- [x] Implement accent palette switching via `[data-palette]` mappings (mintteal, blue, purple, green, orange; extensible)
- [x] Align Tailwind tokens and semantic aliases; added neutral tokens and semantic gradient strategy
- [x] ThemeProvider: manage `accent` with persistence; set `[data-palette]`
- [x] Migrate hard-coded classes to semantic tokens; removed shim and legacy brand gradients
- [x] Docs + a11y verification (contrast, high-contrast media)

Notes:
- Technologies marquee: use `BaseCard` + `TechnologyScroller` directly; no dedicated wrapper.
- All tasks apply under monorepo mode—operate only inside `templates/nextjs/`.

## cosine-terrain-eslint
Design source: `templates/nextjs/examples/our-project/tasks/04-tasks-cosine-terrain-eslint.md`

- [ ] Fix strict types and ESLint in `CosineTerrainCard.tsx` (no-explicit-any, unused vars, cleanup warning)
- [ ] No behavior changes; keep perf identical


## color-themes-2

Goal: simplify and consolidate potentially overlapping color systems. Establish one clear source of truth and eliminate drift.

- Remove duplicates and define single source of truth
  - Consolidate palette definitions in `src/styles/radixCustomColors.css` only (raw scales: light/dark + alpha).
  - Keep all semantic mappings and palette switching in `src/styles/semanticColors.css` only.
  - Trim `src/app/globals.css` to just `@theme` exposure and Shadcn base tokens; no palette values.

- Normalize semantic token surface
  - Ensure `semanticColors.css` is the only place mapping scale → semantic tokens (`--color-accent-*`, `--color-accent-a*`, border, surface, ring).
  - Keep neutral mapping (gray-1..12) defined once; `@theme` only re-exports.

- Eliminate legacy/overlapping systems
  - Remove `cardThemes.css` color constants or migrate still-needed values into semantic tokens; delete the file if redundant.
  - Remove compatibility shim usages (`teal-*`, `text-white`) by migrating to semantic utilities; then delete the shim block from `globals.css`.
  - Replace legacy gradient hexes in `globals.css` with semantic/scale-based gradients or move gradients into a small semantic gradients section.

- Tighten palette switching
  - Verify each `[data-palette]` block remaps both solid and alpha steps (1..12 and a1..a12).
  - Keep dark/light border and contrast tuning within `semanticColors.css` only.

- Document and enforce
  - Doc: “Palette onboarding” (where to drop Radix custom output, how to wire `[data-palette]`, and how `@theme` exposes tokens).
  - Rule: avoid raw hex/classes in components; prefer semantic utilities.
  - Optional guardrail: lint/codemod to flag hard-coded color classes.

- Audit and migrate
  - Repo-wide audit for `teal-*`, `text-white`, raw hex in components/styles.
  - Migrate remaining components to semantic tokens and gradients.

- A11y/QA safeguards
  - WCAG contrast checks for all palettes; add `@media (prefers-contrast: high)` overrides centrally in `semanticColors.css`.
  - Add an examples section demonstrating `useTheme()` with all palettes; use for visual regression.

- Cleanup milestones (deletion gates)
  - After migration: remove the teal compatibility shim.
  - After consolidation: remove `cardThemes.css` if empty.

- Optional helpers
  - Provide a small TS token map for semantic names to aid auto-complete and consistency.
  - Script to validate presence of `--color-accent-*`/`--color-accent-a*` across palettes.

- High-impact order
  1. Consolidate sources (raw scales in `radixCustomColors.css`; mappings in `semanticColors.css`; keep `globals.css` minimal).
  2. Audit/migrate legacy classes and raw hex; replace gradients with semantic/scale values.
  3. Remove shim and `cardThemes.css` if redundant.
  4. Documentation + a11y checks.
