---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Interactive Features section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Interactive Features

The following subtasks expand the Detailed Task Breakdown for the Interactive Features section. Each subtask is atomic and includes clear acceptance criteria.

## Three.js & React Three Fiber Integration

- [ ] Verify environment compatibility
  - Check Next.js 15 and React 19 support for R3F
  - Acceptance: Supported versions documented
- [ ] Install R3F dependencies
  - Run: `pnpm install three @react-three/fiber @react-three/drei`
  - Acceptance: Packages in `dependencies`
- [ ] Create `ThreeCanvas` component
  - File: `src/components/ThreeCanvas.tsx` using `<Canvas>`
  - Acceptance: Blank canvas renders without errors
- [ ] Build base scene component
  - File: `src/components/SceneBase.tsx`, add lights and sample mesh
  - Acceptance: 3D box or sphere appears in canvas
- [ ] Optimize canvas performance
  - Configure `dpr`, `frameloop`, and shadows
  - Acceptance: Canvas maintains ≥30fps on desktop
- [ ] Implement loading and error handling
  - Wrap scene with `Suspense` and use `useProgress` for spinner
  - Acceptance: Loading indicator shows; errors caught gracefully

## Framer Motion Animation System

- [ ] Install Framer Motion
  - Run: `pnpm install framer-motion`
  - Acceptance: Package in `dependencies`
- [ ] Configure layout transitions
  - Wrap pages with `<AnimatePresence>` in `app/layout.tsx`
  - Acceptance: Route transitions animate smoothly
- [ ] Create scroll animation hook
  - File: `src/hooks/useScrollAnimation.ts`, use `useViewportScroll`
  - Acceptance: Scroll-based values respond correctly
- [ ] Develop reusable motion components
  - Create `FadeIn`, `SlideUp` with `motion.div`
  - Acceptance: Components animate on mount
- [ ] Add stagger effect for lists
  - Define `staggerChildren` variants for card arrays
  - Acceptance: Cards animate in sequence on page load
- [ ] Performance test animations
  - Render 20 motion items; measure FPS
  - Acceptance: Animations run ≥50fps on mid-spec device

## Interactive Card Components

- [ ] Define card interaction API
  - File: `src/components/ui/Card.tsx`, props for hover & expand
  - Acceptance: Interface compiles without errors
- [ ] Implement hover animations
  - Use `whileHover` to scale or elevate card
  - Acceptance: Hover interaction is smooth and responsive
- [ ] Build expandable card
  - Use `AnimatePresence` for expand/collapse variants
  - Acceptance: Card expands to show details; closes properly
- [ ] Add transition variants
  - Define `collapsed` and `expanded` states in `variants`
  - Acceptance: Transitions animate width/height changes
- [ ] Ensure accessibility
  - Support keyboard focus and reduced-motion media query
  - Acceptance: Animations respect `prefers-reduced-motion`

## Media Embedding Components

- [ ] Create `VideoPlayer` component
  - File: `src/components/VideoPlayer.tsx`, responsive `<iframe>`
  - Acceptance: Video maintains 16:9 aspect ratio
- [ ] Develop `ImageGallery`
  - File: `src/components/ImageGallery.tsx`, grid & lightbox
  - Acceptance: Images open in lightbox with navigation
- [ ] Implement `CodeBlock` component
  - File: `src/components/CodeBlock.tsx`, PrismJS or Highlight.js
  - Acceptance: Syntax highlighting renders for JS/TS
- [ ] Build `AudioPlayer` component
  - File: `src/components/AudioPlayer.tsx`, HTML5 `<audio>` UI
  - Acceptance: Play, pause, and progress bar function
- [ ] Test media accessibility
  - Verify keyboard operability and ARIA labels
  - Acceptance: Media controls pass a11y checks

---

_STOP: Confirm completion of all subtasks before moving to Phase 5._
