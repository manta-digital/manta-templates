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

## ui-refactor
Design source: `project-artifacts/features/02-feature-ui-refactor.md`  
Scope: Extract framework-agnostic components from Next.js template into reusable ui-core package, enabling multi-framework support (Astro, React Router) while maintaining Next.js optimizations.

### Phase 1: Infrastructure Setup
- [ ] **Restructure monorepo workspace**
  - Create `packages/` directory in existing manta-templates repo
  - Update root `package.json` workspace configuration to include `packages/*`
  - Verify workspace structure builds without errors
  - Success: `pnpm build` runs successfully from root with new workspace structure

- [ ] **Create ui-core package foundation**
  - Initialize `packages/ui-core/` with package.json, tsconfig.json
  - Set up peer dependencies: React >=18.0.0, react-dom >=18.0.0
  - Configure build system (TypeScript compilation, barrel exports)
  - Add core dependencies: @radix-ui/colors, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge, lucide-react
  - Success: ui-core package builds independently and can be imported by templates

- [ ] **Set up TypeScript configurations**
  - Create packages/ui-core/tsconfig.json with appropriate module resolution
  - Configure path mapping for internal imports
  - Set up build scripts and export configuration
  - Success: TypeScript compilation works without errors, proper type exports

- [ ] **Create initial directory structure**
  - Create packages/ui-core/src/ with components/, hooks/, utils/, types/ subdirectories
  - Set up barrel export system in packages/ui-core/src/index.ts
  - Create packages/ui-adapters/ directory for framework-specific adapters
  - Success: Clean import structure, components can be imported from @manta-templates/ui-core

### Phase 2: Core Component Extraction
- [ ] **Extract base UI primitives**
  - Move BaseCard from templates/nextjs/src/components/cards/BaseCard.tsx to packages/ui-core/src/components/ui/
  - Move Button from templates/nextjs/src/components/ui/button.tsx to packages/ui-core/src/components/ui/
  - Abstract away Next.js specific dependencies (remove next/image, next/link imports)
  - Create generic Image and Link components with dependency injection pattern
  - Success: BaseCard and Button work independently without Next.js dependencies

- [ ] **Extract and abstract core cards**
  - Move BlogCard to packages/ui-core/src/components/cards/ with Image/Link dependency injection
  - Move ProjectCard to packages/ui-core/src/components/cards/ with abstracted dependencies  
  - Move QuoteCard to packages/ui-core/src/components/cards/ (minimal abstraction needed)
  - Update component interfaces to accept ImageComponent and LinkComponent props
  - Success: Cards render correctly with injected dependencies, maintain full functionality

- [ ] **Extract layout components**
  - Move BentoLayout from templates/nextjs/src/components/layouts/ to packages/ui-core/src/components/layouts/
  - Move GridLayout system (grid-container.tsx, grid-item.tsx, grid-layout.tsx) to ui-core
  - Move Container component to packages/ui-core/src/components/layouts/
  - Abstract any framework-specific dependencies
  - Success: Layout components work with any React framework, no Next.js coupling

- [ ] **Extract shared utilities and types**
  - Move cn utility, formatDate, and other shared functions to packages/ui-core/src/utils/
  - Move shared TypeScript interfaces to packages/ui-core/src/types/
  - Create theme-related utilities and hooks in packages/ui-core/src/hooks/
  - Export all utilities through barrel exports
  - Success: All shared code accessible from single ui-core import, no duplication

- [ ] **Set up theme system in ui-core**
  - Move theme context and provider from templates/nextjs to packages/ui-core/src/providers/
  - Move ThemeToggle component to packages/ui-core/src/components/ui/
  - Abstract theme system to work without Next.js specific features
  - Success: Theme system works independently, can be used across frameworks

### Phase 3: Adapter Creation
- [ ] **Create Next.js adapter package**
  - Set up packages/ui-adapters/nextjs/ with proper package.json
  - Create Next.js-specific Image wrapper using next/image
  - Create Next.js-specific Link wrapper using next/link  
  - Export adapted components (BlogCard, ProjectCard, etc.) with Next.js optimizations injected
  - Success: Next.js adapter provides drop-in replacements with full Next.js optimizations

- [ ] **Create React Router adapter package**
  - Set up packages/ui-adapters/react-router/ with package.json
  - Create standard Image component with lazy loading
  - Create React Router Link wrapper
  - Export adapted components with React Router specific implementations
  - Success: React Router adapter works with standard React + React Router setup

- [ ] **Update Next.js template to use adapters**
  - Modify templates/nextjs to import components from Next.js adapter instead of local components
  - Update all component imports across templates/nextjs/src/
  - Remove now-unused component files from templates/nextjs/src/components/
  - Verify all existing functionality preserved
  - Success: Next.js template builds and runs identically to before refactor

- [ ] **Create comprehensive testing suite**
  - Set up testing infrastructure for ui-core package
  - Create component tests for extracted components
  - Test dependency injection patterns with mock components
  - Create adapter tests to ensure framework integrations work
  - Success: >90% test coverage, all components tested in isolation and with adapters

### Phase 4: Template Distribution
- [ ] **Build React + Router template**
  - Create new templates/react/ directory with React + React Router setup
  - Configure build system (Vite + React + TypeScript)
  - Import components from React Router adapter
  - Create equivalent pages/routes to Next.js template
  - Success: React template runs and displays same content as Next.js template

- [ ] **Build Astro template with React islands**
  - Create new templates/astro/ directory with Astro + React integration
  - Configure Astro to use React components as islands
  - Import components from appropriate adapter (create astro adapter if needed)
  - Create equivalent pages using Astro pages + React islands
  - Success: Astro template displays same content with proper hydration

- [ ] **Implement template bundling system**
  - Create scripts/build-templates.js for standalone template generation
  - Implement component usage analysis to determine which components to bundle
  - Create bundling system that inlines ui-core components into dist-templates/
  - Generate standalone package.json files without workspace dependencies
  - Success: Bundled templates are completely self-contained and work with `npx degit`

- [ ] **Create automated distribution pipeline**
  - Set up automated build process for all template variants
  - Create scripts for updating dist-templates/ from templates/
  - Generate framework-specific README files for each template
  - Set up validation that bundled templates install and build correctly
  - Success: Single command generates all distributable templates ready for publication

### Quality Assurance
- [ ] **Verify component compatibility**
  - Test all extracted components work in Next.js, React Router, and Astro
  - Verify performance characteristics are maintained
  - Ensure bundle sizes remain reasonable (<10% increase from abstraction)
  - Test theme system works across all frameworks
  - Success: All components work identically across frameworks with acceptable performance

- [ ] **Validate TypeScript coverage**
  - Ensure 100% TypeScript coverage in ui-core package
  - Verify proper type exports for all components and utilities
  - Test adapter type safety and component prop forwarding
  - Success: No TypeScript errors, full type safety across all packages

- [ ] **Test template instantiation**
  - Verify `npx degit yourorg/nextjs-template my-app` still works
  - Test React and Astro template instantiation with degit
  - Verify all templates install dependencies and build successfully
  - Confirm development servers start without errors
  - Success: All templates can be instantiated and run with single command

- [ ] **Documentation and examples**
  - Update component documentation to reflect new import paths
  - Create migration guide for existing manta-templates users
  - Generate examples showing multi-framework usage
  - Update README files for all templates with correct setup instructions
  - Success: Clear documentation, smooth migration path for existing users
