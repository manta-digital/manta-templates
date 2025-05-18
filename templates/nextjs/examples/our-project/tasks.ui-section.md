###### section: ui-package

- [x] Move BentoGrid.tsx (now bento-layout.tsx) to UI package (`packages/ui/src/bento-layout.tsx`)
- [x] Create or update `packages/ui/src/index.ts` (barrel file)
- [ ] Update all imports in the codebase to use the new UI package path (e.g., `@manta/ui`)
- [x] Add `packages/ui` to `pnpm-workspace.yaml`
- [ ] Ensure `packages/ui/package.json` is correct (name, entry points, etc.)
- [ ] Ensure `packages/ui/tsconfig.json` is correct for a library build
- [ ] Add `@manta/ui` as a dependency in consumers (e.g., templates/nextjs)
- [ ] Run `pnpm install` and build/test
