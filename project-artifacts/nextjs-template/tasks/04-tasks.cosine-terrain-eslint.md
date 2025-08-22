## Tasks — Phase 4 (cosine-terrain ESLint/Types)

Scope: Fix strict TypeScript and ESLint issues in `templates/nextjs/src/components/cards/math/CosineTerrainCard.tsx` without changing behavior. Ignore `<img>` warnings elsewhere; this task targets `no-explicit-any`, unused vars, and safe typings only.

### Guardrails / Pre-flight
- [ ] Operate only under `templates/nextjs/`; do not modify `landing/`
- [ ] Keep algorithm/perf identical; typings only
- [ ] Run: `pnpm -C templates/nextjs ai-typecheck && pnpm -C templates/nextjs build`

### Error inventory (from build)
- `@typescript-eslint/no-explicit-any`: many occurrences around lines 215–303 and 387–399
- `@typescript-eslint/no-unused-vars`: variables `s`, `_deltaSec`, `nowMs`
- Hook cleanup warning about `mountRef.current` access timing

### Plan
- [ ] Replace `any` with concrete types
  - Vector/array shapes: define `type Vec2 = [number, number]; type Vec3 = [number, number, number];`
  - Settings/params: extract minimal interfaces for terrain, runtime, materials, etc. (module-local if only used here)
  - Event/RAF callbacks: proper DOM/RAF typings
- [ ] Remove or use unused variables
  - Rename or inline where appropriate; prefix with `_` only if required
- [ ] Effect cleanup safety
  - Copy `const mount = mountRef.current` inside effect and use `mount` in cleanup
- [ ] Add concise JSDoc for non-obvious types
- [ ] No `ts-ignore` or rule disables

### Acceptance
- [ ] `pnpm -C templates/nextjs ai-typecheck` passes
- [ ] `pnpm -C templates/nextjs build` passes (no new warnings)
- [ ] No behavioral changes (visual + perf parity)

### QA
- [ ] Verify terrain renders/animates
- [ ] Interactions still work (if any)


