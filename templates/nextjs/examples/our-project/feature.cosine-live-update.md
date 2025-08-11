# Feature: CosineTerrain live updates (design)

## Goals
- Live-tweak visuals (material color/opacity, background, lighting, camera speed/height/look-ahead) without rebuild.
- Live-tweak field parameters (amplitude/frequency/equation/multipliers) with a budgeted geometry refresh.
- Rebuild only when structurally necessary (meshResolution, tilesX/Z, terrainScale).

## Current state
- Defaults consolidated in `DEFAULT_SETTINGS` inside `CosineTerrainCard`.
- Settings passed via grouped `settings` prop; flat props override.
- Solid preset uses MeshStandardMaterial + Ambient/Directional lights; wireframe preset uses MeshBasicMaterial.
- Geometry refresh exists for visibility resume; recycling already chunked.

## Design

### Settings change handling
Maintain a ref of the latest desired settings. On React prop changes:
- Diff new settings vs previous snapshot
- Enqueue update tasks by category:
  - Live updates (no rebuild):
    - material: `renderPreset`, `materialColor`, `materialOpacity`, `metalness`, `roughness`
    - background: `backgroundColor`, `backgroundAlpha`
    - lighting: `ambientColor`, `ambientIntensity`
    - camera: `speed`, `cameraHeight`, `lookAheadDistance`, `lookAtHeight`
  - Soft rebuild (refresh geometry only):
    - terrain: `terrainAmplitude`, `terrainFrequency`, `terrainEquation`, `xAmplitudeMultiplier`, `zAmplitudeMultiplier`, `enableAmplitudeVariation`, `amplitudeVariationFrequency`, `amplitudeVariationIntensity`
    - Action: refresh all tile positions/normals chunked across frames
  - Hard rebuild (full tiles re-gen):
    - tiling: `meshResolution`, `tilesX`, `tilesZ`; terrain: `terrainScale`
    - Action: dispose tiles and regenerate grid; keep camera/renderer intact

### Runtime application (minimal overhead)
- Animation loop checks a small update queue (bitflags/enum set)
- Apply live updates immediately (cheap object property updates)
- For soft rebuild, process a limited batch per frame (reuse existing chunked pattern)
- For hard rebuild, debounce (100–200ms) to coalesce slider spam, then rebuild once

### API surface
- Prop-driven (no new API): component diffs `settings`/flat props and updates internally
- Optional imperative controller (recommended): forwardRef with:
  - `set(partialSettings)`
  - `refreshGeometry()` // soft refresh now
  - `rebuildGrid()`     // hard rebuild now
- Optional external store/hook (e.g., `useCosineTerrainController`) for a settings panel; component reads a ref each frame

### Guardrails
- Rate-limit expensive operations (meshResolution, tilesX/Z, terrainScale)
- Clamp inputs (already present for many)
- Debounce hard rebuilds; chunk soft refresh

### Testing
- Live: toggle `renderPreset`, change color/opacity/ambient intensity; immediate response
- Soft: drag amplitude/frequency; smooth geometry refresh without stutter
- Hard: change `meshResolution`; verify disposal/regeneration and stable memory/FPS


