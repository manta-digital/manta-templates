---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Advanced Layout section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Advanced Layout

The following subtasks expand the Detailed Task Breakdown for the Advanced Layout section. Each subtask is atomic and includes acceptance criteria.

## Advanced Layout
### Grid as Data for Advanced Layout

- [x] Design grid-as-data structure
  - Specify JSON/JS object format for grid rows and columns (e.g., `[[6], [1,4,1], ...]`)
  - Define how to specify alternates for Tailwind variant sizes (e.g., :lg, :md)
  - Acceptance: Structure supports at least 3 breakpoint variants and arbitrary row/col spans

- [x] Implement GridLayout component
  - File: `src/components/GridLayout.tsx`
  - Accepts grid data prop and renders children in correct layout using Tailwind classes
  - Acceptance: Renders a 6-col grid matching the data structure at all breakpoints

- [x] Variant support logic
  - Implement logic to handle responsive variants (e.g., :lg, :md) in grid data
  - Acceptance: Layout updates responsively when resizing window

- [x] Example/test page for GridLayout
  - File: `src/app/grid-layout-demo.tsx`
  - Demonstrates at least 3 grid configurations and 2+ breakpoints
  - Acceptance: Visual confirmation of correct layout at each breakpoint

- [x] Documentation
  - Add usage and grid-data structure docs to project documentation
  - Acceptance: Docs explain how to use and extend grid-as-data for new layouts

- [ ] (Optional, for future) Plan for visual grid designer tool
  - Outline requirements and possible tech approach for future visual editor
  - Acceptance: Written plan added to `/project-documents/our-project/ideas.visual-grid-designer.md`


### Grid Utilities

- [x] Create useMasonryGrid hook

  - File: `src/hooks/useMasonryGrid.ts`
  - Accept `items`, `columnCount`, `gap`; return array of positions
  - Acceptance: Hook compiles and returns expected layout array

- [x] Implement MasonryGrid component

  - File: `src/components/MasonryGrid.tsx`
  - Use `useMasonryGrid` for positioning; apply inline styles
  - Acceptance: Items layout correctly in masonry style

- [x] Style MasonryGrid

  - Use Tailwind classes for container positioning and gap
  - Acceptance: Layout visually resembles masonry grid
