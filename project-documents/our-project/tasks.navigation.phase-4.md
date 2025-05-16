---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Navigation section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Navigation

The following subtasks expand the Detailed Task Breakdown for the Navigation section. Each subtask is atomic and includes clear acceptance criteria.

## Primary Header & Mobile Drawer

- [ ] Create `Header` component

  - File: `src/components/Header.tsx`
  - Render site logo and navigation links: Home, Blog, Demos, About
  - Use Next.js `Link` for routing and ShadCN UI for styling
  - Acceptance: Links display correctly on desktop header

- [ ] Implement mobile menu toggle

  - Add hamburger icon button visible on small screens
  - Use Radix Dialog (or ShadCN Dialog) for drawer overlay
  - Acceptance: Toggle opens mobile drawer

- [ ] Build `MobileDrawer` component

  - File: `src/components/MobileDrawer.tsx`
  - List same navigation links plus close button
  - Manage focus trap and ARIA roles
  - Acceptance: Drawer is keyboard-navigable and screen-reader friendly

- [ ] Integrate Header & Drawer into layout

  - Import and render `<Header />` in `src/app/layout.tsx`
  - Ensure `<MobileDrawer />` is included and controlled by toggle
  - Acceptance: Header and drawer appear in app layout without errors

- [ ] Accessibility & Keyboard Navigation
  - Run `axe-core` audit on header and drawer
  - Test Tab navigation, focus order, and ARIA labels
  - Acceptance: No a11y violations; drawer traps focus correctly

## Breadcrumb / Secondary Navigation

- [ ] Create `Breadcrumb` component

  - File: `src/components/Breadcrumb.tsx`
  - Use Next.js `useRouter` to derive path segments
  - Map segments to human-readable labels and `Link`
  - Acceptance: Breadcrumb shows Home > Section > Page for nested routes

- [ ] Style Breadcrumb

  - Use Tailwind CSS for separators (`/` or `>`), spacing, and responsive layout
  - Acceptance: Breadcrumb displays inline and wraps gracefully on narrow screens

- [ ] Integrate Breadcrumb into pages

  - Insert `<Breadcrumb />` at top of page templates (e.g., `app/blog/[slug]/page.tsx`)
  - Acceptance: Breadcrumb appears on deep pages and links navigate correctly

- [ ] Accessibility for Breadcrumb
  - Wrap in `<nav aria-label="Breadcrumb">`
  - Provide `aria-current="page"` on current page item
  - Acceptance: Breadcrumb passes axe-core checks and announces structure

---

_STOP: Confirm completion of all subtasks before moving to Phase 5._
