# Feature: ui-cards-refactor

Role: Technical Fellow
Project Guide: `project-documents/project-guides/guide.ai-project.00-process.md`

## Goal
Refactor card components to be framework-agnostic (React + Tailwind + ShadCN + Radix) so they can be consumed without Next.js, while keeping themes/tokens app-owned.

## Scope (Phase 1-2, near-term)
- Package: `packages/ui-core` (no Next.js)
  - Primitives: `Card`, `CardHeader|Content|Footer|Title|Description`, `BaseCard`, `Button`, `cn`, `cardVariants`.
  - No CSS/tokens exported.
- Migrate cards that don’t require Next features:
  - Round 1: `AboutCard`, `BlogCard`, `ProjectCard` (core variants), `QuoteCard`, `BlogCardImage` (replace Next `<Image>` with standard `<img>` or injected renderer prop).
  - Round 2: container/wrappers that are React-only (e.g., `FeatureCardContainer`) and list/virtualized layouts where feasible.
- Keep template-owned:
  - Any component using `next/link`, `next/image`, route loaders, server-only code, or `next/dynamic` SSR nuances (e.g., `VideoPlayer`).

## Theming & Tokens
- Radix color scales and semantic tokens remain in the consuming app (template).
- ui-core relies on CSS variables/classes only.

## API Adjustments to Decouple Next.js
- Image usage: Prefer `img` with alt + sizing or accept a `renderImage?: (props) => ReactNode` injection for templates to pass Next `<Image>`.
- Links: Accept `asChild` or `renderLink?: (p) => ReactNode` so templates can inject `next/link`.
- Assets: Accept `assetBaseUrl` or require full asset URLs from callers (e.g., `TechnologyScroller`).

## File Moves (initial)
- Move to `packages/ui-core/src/components/cards/`:
  - `AboutCard.tsx`, `BlogCard.tsx`, `BlogCardImage.tsx`, `ProjectCard.tsx`, `QuoteCard.tsx` (strip Next-only pieces or gate with injected renderers).
- Keep in template:
  - `VideoPlayer.tsx`, any `next/image`-hard dependency until renderer injection is added.

## Import Rewrite Plan
- Update template imports for moved components to `@manta/ui-core`.
- Validate pages compile and visually match (spot-check Examples page).

## Risks
- Hidden Next.js coupling via `next/image`, `Link`, or server imports.
- Style drift if tokens accidentally leak into ui-core. Mitigation: no CSS export from ui-core.

## Acceptance
- Build green across workspace.
- Examples page renders with ui-core cards without regressions.
- No Next.js imports inside ui-core.

## References
- Concept: `templates/nextjs/examples/our-project/feature.ui-cards-refactor.md`
