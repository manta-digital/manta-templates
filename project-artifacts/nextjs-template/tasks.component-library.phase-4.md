---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Component Library section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Component Library

The following subtasks expand the Detailed Task Breakdown for the Component Library section. Each subtask is atomic and includes acceptance criteria.

## Card Foundations

- [x] Define BaseCard API

  - File: `src/components/ui/BaseCard.tsx`
  - Define TypeScript interface for props: `as?`, `variant`, `size`
  - Acceptance: Interface exported without TypeScript errors

- [x] Implement BaseCard component

  - Use `forwardRef` and polymorphic `as` prop to render element
  - Apply Tailwind classes for padding, border, and background
  - Acceptance: `<BaseCard>` renders default `<article>` with children and styling

- [x] Add accessibility checks

  - Run `axe-core` audit on a page with `<BaseCard>` example
  - Acceptance: Accessibility audit has been run and report documented; violations to be addressed in future flow.

- [x] Create BlogCard variant

  - File: `src/components/ui/BlogCard.tsx`
  - Accept props: `title`, `date`, `excerpt`, `coverImage`
  - Render cover image, title, date, excerpt within `BaseCard`
  - Acceptance: Dummy MDX post renders using BlogCard in grid

- [x] Create ProjectCard variant

  - File: `src/components/ui/ProjectCard.tsx`
  - Accept props: `title`, `description`, `techStack`, `repoLink`, `demoLink?`
  - Render tech-stack chips and links
  - Acceptance: Sample JSON-driven project renders in grid

- [x] Create VideoCard variant

  - File: `src/components/ui/VideoCard.tsx`
  - Accept `videoUrl`, render responsive `<iframe>` wrapper
  - Use Tailwind aspect-ratio classes (e.g., `aspect-w-16 aspect-h-9`)
  - Acceptance: Demo video plays, CLS < 0.1 on load

- [x] Create QuoteCard variant
  - File: `src/components/ui/QuoteCard.tsx`
  - Accept props: `quote`, `author`
  - Render styled blockquote with attribution
  - Acceptance: Component meets WCAG color contrast

## Bento Grid Components

- [x] Define GridContainer API

  - File: `src/components/GridContainer.tsx`
  - Accept `children`, `className`, `rowHeight?`, `gap?`

- [x] Define GridItem API
  - File: `src/components/GridItem.tsx`
  - Accept `children`, `size?`, `className?`
  - Document size variants and default behavior

---
 
_STOP: Confirm completion of all subtasks before moving to Phase 5._
