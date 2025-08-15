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
- Keep in template:
  - `VideoPlayer.tsx`, any `next/image`-hard dependency until renderer injection is added.

## Theming & Tokens
- Radix color scales and semantic tokens remain in the consuming app (template).
- ui-core relies on CSS variables/classes only.

## API Adjustments to Decouple Next.js
- Image usage: Prefer `img` with alt + sizing or accept a `renderImage?: (props) => React.ReactNode` injection for templates to pass Next `<Image>`.
- Links: Accept `asChild` or `renderLink?: (p) => React.ReactNode` so templates can inject `next/link`.
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

---

## UI-Core Dependencies Policy (allowed, peers, disallowed)

- Allowed runtime deps (lightweight, framework-agnostic):
  - `class-variance-authority`, `clsx`, `tailwind-merge`
  - Radix Slot: `@radix-ui/react-slot` (for asChild patterns)
- Peer dependencies (provided by consumers):
  - `react`, `react-dom`
  - For component-specific Radix primitives (e.g., tooltip), prefer peer dependency (`@radix-ui/react-tooltip`) once that component is moved
- Dev-only tooling: `typescript`, `@types/react`, `@types/react-dom`
- Disallowed in ui-core:
  - Any `next/*` imports (e.g., `next/link`, `next/image`, `next/dynamic`)
  - Framework- or platform-specific code (SSR-only, server APIs)
  - Shipping CSS/themes/tokens; ui-core only references CSS variables/classes

Rationale: ui-core must remain framework-agnostic and portable. Heavy or framework-bound dependencies belong in templates.

---

## Theme Contract (what ui-core expects from the app)

ui-core reads CSS variables and classes; it does not ship styles. The consuming app supplies Radix scales and semantic tokens. Minimum expected tokens:

- Accent scale and card semantics:
  - `--color-accent-1..12`
  - `--color-card-accent`, `--color-card-accent-subtle`, `--color-card-accent-emphasis`
  - `--color-card-border`, `--color-card-border-hover`
  - `--card-surface-accessible`, `--card-surface-text`
  - Optional alpha steps: `--color-accent-a1..a12`
  - Dark overrides (e.g., `.dark { --color-card-border: … }`)
- Base design tokens (mapped via Tailwind `@theme inline`):
  - `--background`, `--foreground`, `--card`, `--card-foreground`,
    `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`,
    `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`,
    `--destructive`, `--border`, `--input`, `--ring`, `--radius`
  - Radius expansions: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Palette switching:
  - App controls palette via `[data-palette="<name>"]` and provides underlying Radix scales (e.g., `--teal-*`, `--blue-*`, `--purple-*`), mapping them to `--color-accent-*`

Contract principle: if the app provides these tokens and Tailwind mappings, ui-core components render correctly across frameworks with no CSS shipped by ui-core.

---

## Image Strategy (framework-agnostic with optional Next.js optimization)

- Default baseline: plain `<img>` semantics (width/height or `aspect-ratio` to avoid CLS; `loading="lazy"`, `decoding="async"`, `fetchpriority` for heroes; optional `srcSet`/`sizes` or `<picture>` sources from caller props)
- Next.js integration: expose a `renderImage` injection (consumer passes `next/image`) to regain on-the-fly optimization, prefetch, blur placeholders, and router-aware behavior
- CDN loaders: optionally accept an `imageLoader` function so consumers can plug Cloudinary/Imgix/etc.

---

## Link Strategy (decoupling Next.js `Link`)

1) What Next.js `Link` provides:
   - Client-side navigation (SPA), prefetching, router awareness (locale/basePath/rewrites), push/replace/scroll behavior

2) What we lose without it:
   - Full document reload on navigation; no automatic prefetch; no router config awareness; manual scroll/history management

3) Simple workarounds (not complicated):
   - Injection pattern: accept `renderLink` (or `asChild`) so templates pass `next/link`; default to a plain `<a>`
   - Keep ui-core link props minimal (`href`, `target`, `rel`, `aria-*`); SPA behavior stays in the consumer
   - Optional `prefetch` hint prop or `data-prefetch` attribute that consumers interpret; ui-core itself doesn’t implement prefetch

Risk focus: `next/image` and `Link` are the main coupling points. Injection keeps ui-core portable while preserving Next benefits in templates.

---

## Is Next.js “vendor-locked”? Can we self-host?

- Next.js is open-source and can be self-hosted; it is not vendor-locked to Vercel.
- The perception of lock-in often stems from convenience features:
  - Image Optimization defaults to Vercel’s infra, but you can configure a custom loader or serve static, or use external CDNs.
  - Edge/Functions and analytics integrate smoothly with Vercel, but self-hosted Node deployments work (or other platforms supporting Next SSR/Edge runtimes).
- Operationally, self-hosting can be more involved (build output, runtime, image loader infra, caching) but it’s not prohibited. Our design avoids tight coupling so templates remain portable with or without Vercel.
