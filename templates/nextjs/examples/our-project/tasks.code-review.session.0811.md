---
layer: review
docType: code-review-session
sessionId: 0811-CR-01
project: manta-templates
template: templates/nextjs
target: src/components/cards/math/
filter: "*.tsx"
exclude: ["*.test.*", "*.spec.*", "node_modules"]
projectType: nextjs
stack: ["tailwindcss", "shadcn", "radix", "threejs"]
status: COMPLETED
---

# Code Review Tasks: Session 0811

## Session Summary
- **Target**: `templates/nextjs/src/components/cards/math/`
- **Files Reviewed**: 1/1
- **Issues Found**: 9 total (P0: 0, P1: 3, P2: 4, P3: 2)
- **Status**: COMPLETED

## Current Progress
- **Last File**: `CosineTerrainCard.tsx`
- **Next File**: —
- **Resume Point**: —

## Tasks by File

### templates/nextjs/src/components/cards/math/CosineTerrainCard.tsx

- [x] P1: Make rendering style configurable
  - Lines 132-143: Hard-coded `MeshBasicMaterial` (wireframe, color `0x00ff00`).
  - Add props: `materialColor`, `wireframe`, optional `materialType` (`'basic' | 'lambert' | 'phong' | 'standard'`).
  - Success: Consumers can customize color/material without editing source.

- [x] P1: Clamp unsafe inputs
  - Lines 43-47, 60, 72-78: Guard `meshResolution` (>= 1), `tilesX`/`tilesZ` (>= 1), `amplitudeVariationIntensity` (>= 0), `speed` (>= 0).
  - Success: No invalid geometry or NaNs from degenerate inputs.

- [x] P1: Silence logs in production
  - Lines 79-89, 357-369: Gate `console.*` by `showTerrainLogs && process.env.NODE_ENV !== 'production'`.
  - Success: No noisy logs in production builds.

- [x] P2: Fast resume for all quality levels
  - Lines 287-303: On `visibilitychange`, regeneration runs only for `terrainQuality >= 2`.
  - Add a one-shot full regeneration (positions update) for quality 0–1 and render immediately.
  - Success: Instant resume regardless of quality setting.

- [x] P2: Cap dynamic tilesX
  - Lines 72-92, 114-117: `calculateOptimalTilesX` may produce very large counts with big far plane/aspect.
  - Add `maxTilesX` prop (default ~96) and clamp calculated value.
  - Success: Stable FPS; avoid excessive memory.

- [ ] P2: Reduce per-frame scanning work
  - Lines 371-385: Scans all tiles every frame to recycle.
  - Track a sliding Z-window or chunk work into fixed-size batches; only inspect tiles near recycle boundary.
  - Success: CPU per frame scales well with tile count.

- [x] P2: Limit pixel ratio for perf
  - Line 128: `renderer.setPixelRatio(window.devicePixelRatio)` can be heavy on hi-DPI.
  - Add `maxPixelRatio` prop (default 2) and use `Math.min(window.devicePixelRatio, maxPixelRatio)`.
  - Success: Improved FPS on 2×/3× displays.

- [x] P3: Prop docs and clarity
  - Lines 6-34: Add concise JSDoc on major props (quality levels, equations, variation fields).
  - Success: Easier tuning for template users.

- [ ] P3: Optional non-wireframe preset
  - Provide a preset (via props object or booleans) for a solid material look to showcase variety.
  - Success: Quick visual swap without code changes.

## Notes
- No P0 issues (cleanup correct; no leaks observed).
- Intentional one-run effect; consider opt-in responsiveness to some props in future.


