# Feature: Cosine Terrain — Parametric time, interactivity, and smooth transitions (design)

## Objectives
- Add time-driven parametric behavior (waves) to the cosine terrain with configurable speed/shape.
- Plan a maintainable control panel (separate component/file) without coupling to the renderer.
- Respond to control changes smoothly (no hard jumps) with soft transitions.
- Keep camera behavior simple for now; allow future non–negative-Z travel.
- Preserve performance: avoid full rebuilds on each tweak.

## Integration Strategy
- Keep defaults and grouping in `CosineTerrainCard` via `DEFAULT_SETTINGS` and `settings` prop.
- Extend settings with a new group: `settings.time` and a few extras in `settings.terrain`.

### New/updated settings (proposed)
- `time.enabled: boolean` — master switch (default true)
- `time.speed: number` — units/sec factor applied to a time phase (default 1)
- `time.offset: number` — initial phase offset (default 0)
- `time.mode: 'seed-phase' | 'additive' | 'hybrid'`
  - seed-phase: animate by adding `t` to the phase term (behaves like moving waves)
  - additive: add an extra animated term on top of static field (water-like ripples)
  - hybrid: combine both at lower amplitudes
- `terrain.timeAmplitude: number` — amplitude scale for additive/hybrid terms (default small, e.g., 0.2× base)
- `transitions.enabled: boolean` — soft transitions for terrain param changes (default true)
- `transitions.durationMs: number` — lerp duration (e.g., 500–1000ms)
- `transitions.easing: 'linear' | 'easeInOut'` — simple easing for param lerp
- `motion.direction: 'negZ' | 'posZ' | 'negX' | 'posX' | 'diagonal'` — future travel direction (default 'negZ')

### Height function update (concept)
Current static terms:
- `cosX = cos(worldX * freq + seed)`
- `cosZ = cos(worldZ * freq + seed)`

Animated phase time `t = time.offset + now * time.speed`.
- seed-phase mode: `cosX = cos(worldX * freq + seed + t)` and same for `cosZ`
- additive mode: `height += timeAmplitude * sin(worldX * freq2 + t) * sin(worldZ * freq2 + t)`
- hybrid mode: apply seed-phase and a reduced additive ripple

Implementation notes:
- Store `runtime.target` vs `runtime.current` for all terrain params (`freq`, `amplitude`, multipliers…)
- On prop/settings change, set `target`; lerp `current ← lerp(current, target, alpha)` in the animation loop until converged (alpha from duration+easing)
- Use existing chunked geometry-refresh to update vertices over frames (soft path)

### Update application tiers
- Live (no rebuild): background, lighting, material PBR, renderPreset, camera speed/height/look-ahead
- Soft (geometry refresh only): amplitude/frequency/equation/multipliers/variation flags
- Hard (rebuild grid): meshResolution, tilesX/Z, terrainScale

### Control panel (separate component)
- New component (not implemented now): `CosineTerrainControls`
  - Lives under `examples/` or `components/panels/`
  - Emits partial settings via an imperative controller or prop callback
  - Avoids importing Three; pure React UI
- Recommended bridge: `forwardRef` controller on `CosineTerrainCard` with methods:
  - `set(next: Partial<SettingsGrouped>)`
  - `refreshGeometry()`
  - `rebuildGrid()`

### Performance
- Keep current chunked loops (recycling and geometry refresh); reuse for time-driven refresh if needed
- Debounce hard rebuilds (200ms)
- Clamp inputs and rate-limit expensive changes

## Tasks (overview)
- [ ] Add `settings.time`, `settings.transitions`, `settings.motion` groups and defaults
- [ ] Implement time-driven phase per `time.mode`; guard with `time.enabled`
- [ ] Add runtime lerp for soft transitions (terrain param changes); expose duration/easing
- [ ] Use existing geometry-refresh path to apply soft changes (chunked)
- [ ] Add controller (forwardRef) with `set`, `refreshGeometry`, `rebuildGrid`
- [ ] (Optional) Create `CosineTerrainControls` UI in `examples/` to drive settings
- [ ] QA performance: live tweaks (color/opacity/lighting), soft changes (amplitude/frequency), hard changes (meshResolution)

## Notes
- Do not implement camera mouse movement now
- Future: support `motion.direction` in camera advance logic
