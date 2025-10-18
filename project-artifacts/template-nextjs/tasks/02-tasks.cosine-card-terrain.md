# Tasks — Phase 4 (cosine-card-terrain)

Design sources:
- templates/nextjs/examples/our-project/feature.cosine-card-terrain.md
- templates/nextjs/examples/our-project/feature.cosine-live-update.md

Scope: Extend CosineTerrainCard with time-parametric waves, smooth transitions for param changes, optional controller API, and plan an example control panel (deferred implementation) — without regressing performance. Do not modify landing/.

## Guardrails / Pre-flight
- [ ] Confirm work is performed only under templates/nextjs/; do not modify landing/
  - Success: git status shows changes only under templates/nextjs/
- [ ] Type safety and build
  - Run: pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs build
  - Success: no type or build errors

## Settings model (grouped)
- [ ] Add settings.time group
  - Props: enabled:boolean=true, speed:number=1, offset:number=0, mode:'seed-phase'|'additive'|'hybrid'='seed-phase'
  - Success: defaults in DEFAULT_SETTINGS; cfg computed with flat-prop override pattern
- [ ] Add settings.transitions group
  - Props: enabled:boolean=true, durationMs:number=600, easing:'linear'|'easeInOut'='easeInOut'
  - Success: defaults present; consumed by runtime lerp
- [ ] Add settings.motion group (future-facing)
  - Props: direction:'negZ'|'posZ'|'negX'|'posX'|'diagonal'='negZ'
  - Success: stored in cfg; used later to alter camera advance logic

## Parametric time (waves)
- [ ] Integrate animated time t = time.offset + now * time.speed
  - [ ] Implement time modes per design
    - [ ] seed-phase: add t into cosine phase
    - [ ] additive: height += timeAmplitude * sin(f2x + t) * sin(f2z + t)
    - [ ] hybrid: combine reduced seed-phase + additive
  - [ ] Add terrain.timeAmplitude:number (default small, e.g. 0.2× amplitude)
  - Success: visible water-like motion with adjustable speed and intensity; toggled by time.enabled

## Smooth transitions (soft updates)
- [ ] Runtime lerp for terrain parameters on change
  - Params: terrainFrequency, terrainAmplitude, terrainEquation, xAmplitudeMultiplier, zAmplitudeMultiplier, variation flags
  - [ ] Maintain runtime.current vs runtime.target; lerp over transitions.durationMs with transitions.easing
  - [ ] Apply via existing chunked geometry-refresh path (batch work per frame)
  - Success: parameter changes blend smoothly without abrupt jumps or frame spikes

## Update tiers wiring
- [ ] Live (no rebuild) — apply immediately
  - background, lighting, material (PBR, color, opacity), renderPreset, camera speed/height/lookAhead/lookAtHeight
  - Success: changes reflect next frame without geometry work
- [ ] Soft (geometry refresh only)
  - terrain param changes (as above) trigger refresh queue; chunked across frames
  - Success: no frame spikes; terrain visibly transitions
- [ ] Hard (grid rebuild)
  - meshResolution, tilesX, tilesZ, terrainScale trigger debounced grid rebuild (dispose old tiles, regen)
  - Success: rebuild occurs once after debounce; memory stable; animation continuous

## Controller API (imperative) — optional but recommended
- [ ] Expose forwardRef controller with methods
  - set(next: Partial<SettingsGrouped>)
  - refreshGeometry()
  - rebuildGrid()
  - Success: example usage can change settings at runtime without remount; typings provided

## Example control panel (deferred, stub only)
- [ ] Create examples-scoped stub CosineTerrainControls (no Three imports)
  - Emits partial settings via callback or uses the controller
  - Trigger a few common changes (amplitude, frequency, time.speed, material color)
  - Success: stub compiles and is optional; not mounted by default (access via a small gear icon on examples page)

## Documentation
- [ ] Update templates/nextjs/readme.md (brief)
  - Note time/transition settings groups; link to examples page
  - Success: concise usage guidance
- [ ] Add dev notes to design files if any deviations occur
  - Success: design files stay in sync with implemented behavior

## QA & performance
- [ ] Lint, typecheck, and build at template root
  - Run: pnpm -C templates/nextjs lint && pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs build
  - Success: green
- [ ] Live updates: verify immediate reflection of color/opacity/lighting/camera changes
  - Success: instant visual change; no rebuild
- [ ] Soft updates: drag amplitude/frequency; confirm smooth transitions
  - Success: transitions occur within configured duration; FPS stable
- [ ] Hard updates: change meshResolution; confirm disposal/regeneration
  - Success: no leaks; animation continuous post-rebuild
