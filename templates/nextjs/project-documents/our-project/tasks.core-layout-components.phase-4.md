---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Core Layout Components section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Core Layout Components

The following subtasks expand the Detailed Task Breakdown for the Core Layout Components section. Each subtask is atomic and includes acceptance criteria.

## Create responsive layout system

- [x] Verify base layout file

  - File: `src/app/layout.tsx` exists
  - Acceptance: Contains `<html>` and `<body>` structure

- [x] Create `Layout` component

  - File: `src/components/Layout.tsx`
  - Wraps children with header and footer
  - Acceptance: Renders header and footer in dev server

- [x] Develop `Container` component

  - File: `src/components/Container.tsx`
  - Props: `maxWidth` to constrain content width
  - Uses Tailwind classes for padding and centering
  - Acceptance: Centers content and respects width prop

- [x] Implement `NavBar` component

  - File: `src/components/NavBar.tsx`
  - Add links: Home, Blog, Demos, About using Next.js `Link`
  - Ensure keyboard navigation and focus states
  - Acceptance: NavBar renders links and navigates; passes a11y checks with axe-core

- [x] Test layout responsiveness
  - Resize viewport for mobile, tablet, desktop
  - Acceptance: No overflow or misalignment across breakpoints

- [ ] Refine `Container` mobile responsiveness
  - Adjust `Container` component to allow `maxWidth` constraints (e.g., `sm`) to be full-width on smallest viewports.
  - Acceptance: Containers with `maxWidth` prop behave appropriately on mobile and larger screens.

## Implement bento grid layout system

- [x] Design `GridContainer`

  - File: `src/components/GridContainer.tsx`
  - Props: `columns`, `rowHeight` for CSS Grid
  - Acceptance: Renders empty grid matching props

- [x] Create `GridItem` component

  - File: `src/components/GridItem.tsx`
  - Prop: `area` to place item in grid area // Implemented using colSpan/rowSpan
  - Acceptance: Positions child content in correct cell // Verified via inline styles

- [x] Define size variants

  - Variants: small (3×3), medium (4×4), large (6×4)
  - Allow for and expect additional variants in the near future
  - Use Tailwind `col-span` and `row-span`
  - Acceptance: Variants apply correct spans in GridContainer

- [x] Configure responsive breakpoints

  - Update `tailwind.config.js` with sm/md/lg/xl breakpoints // Defaults used
  - Use responsive classes in `GridContainer` and `GridItem`
  - Acceptance: Column count and item spans adapt per viewport

- [x] Test bento layout
  - Add sample items in `src/app/page.tsx` with each variant // Done
  - Acceptance: Items render correctly across screen sizes // Verified

## Implement theme switching

- [x] Verify `ThemeContext`

  - File: `src/context/ThemeContext.tsx`
  - Provides `theme` state and `setTheme` function
  - Acceptance: Default theme loads without error // Looks good

- [x] Add theme toggle in `NavBar`

  - Insert toggle button/icon // Done (icon button)
  - Uses `setTheme` from context // Done
  - Acceptance: Clicking toggle switches theme state // Verified

- [x] Animate theme transition

  - Use CSS transitions or Framer Motion on `<body>` or `<main>` // Done (Tailwind transitions on body)
  - Acceptance: Theme change has smooth fade effect // Verified

- [x] Update components for theming

  - Ensure `Container`, `GridContainer`, `GridItem` use Tailwind `dark:` variants // Checked, looks good
  - Acceptance: Components update styles on theme change // Verified (Container/GridContainer inherit, GridItem has dark:border)

- [x] Persist theme preference
  - Read/write `localStorage` in `ThemeContext` // Verified
  - Acceptance: Theme choice persists across reloads // Verified


---
_STOP: Confirm completion of all subtasks before moving to Phase 5._
