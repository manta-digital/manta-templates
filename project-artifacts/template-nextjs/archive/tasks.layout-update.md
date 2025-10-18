# Layout Update

## Phase 3: Implementation Planning

- [x] Define variant switching mechanism (component-based) using React props or URL query parameter.
- [x] Identify shared blog page structure (header, About card, grid container) and factor into `BlogIndexLayout.tsx`.
- [x] Determine card variant components: `BlogCardDefault`, `BlogCardWide`, `BlogCardImage`.
- [x] Decide whether layout selection state lives in component state or is driven by Next.js search params.
- [x] Outline file organization and required exports for new layout components.

## Phase 4: Task Expansion

- [x] Create `src/app/blog/BlogIndexLayout.tsx`
  - [x] Implement blog header and About Me card in layout component.
  - [x] Accept `posts` data and `CardComponent` render prop.
  - [x] Map `posts` to `GridItem` wrappers, rendering via `CardComponent`.

- [x] Implement `BlogCardWide` component
  - [x] Extend `BlogCard` styles for full-width spans.
  - [x] Apply Tailwind CSS classes using ShadCN conventions where relevant.

- [x] Adapt or create `BlogCardImage` component
  - [x] Use Next.js `Image` for optimized loading.
  - [x] Support responsive aspect ratios.

- [x] Update `src/app/blog/page.tsx`
  - [x] Import `BlogIndexLayout` and all card variants.
  - [x] Add UI toggle for layout selection (use ShadCN switch or button group).
  - [x] Manage selection via React state or `useSearchParams()`.
  - [x] Pass correct `CardComponent` to `BlogIndexLayout` based on selection.

- [x] Update project documentation:
  - [x] Add section in readme.md describing layout variants and how to switch.
  - [x] Document new files in `/project-documents/our-project/detailed-task-breakdown.md`.

- [x] Perform manual QA:
  - [x] Switch between layouts and verify behavior in browser.
  - [x] Confirm grid spans and responsive layouts.

- [x] Review changes, build project (`npm run build`), and address any lint/type issues.
