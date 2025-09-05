---
layer: project
docType: tasks
project: manta-templates
feature: packages-structure-redesign
status: in-progress
dateUpdated: 2025-09-04
dependencies: []
currentProjectState: "Templates use broken sync-template system with duplicate lib structures"
---

# Packages Structure Redesign - Task Breakdown

## Context Summary

The current monorepo packages structure is fundamentally broken:

1. **Fake Package System**: packages/ pretends to be npm packages with dist/ builds, package.json dependencies, but templates never use them as packages
2. **Complex Sync Script**: 283-line sync-template.js rewrites imports, copies files, and only works for NextJS
3. **Duplicate lib Structures**: Templates have both `/lib` (copied packages) and `/src/lib` (template-specific + duplicated packages)
4. **Unnecessary Build Steps**: build-ui command builds packages only to throw away the builds and copy source files instead

**Root Cause**: The packages/ structure uses fake `@manta-templates/ui-core` imports that require TypeScript dist/ builds, but templates copy source files with rewritten imports to `@/lib/ui-core`.

**Solution**: Make packages/ structure match templates' `/src/lib` structure exactly, eliminating the need for builds, rewrites, or complex sync scripts.

## Critical Discovery: `/src/lib` is Correct Structure

**Analysis shows**:
- `/lib` = artifact of broken sync-template system (copied packages)
- `/src/lib` = proper Next.js/React convention (source code belongs in `/src`)
- Current templates have **duplicate ui-core** in both locations
- Template-specific utilities belong with template source code

**Decision**: Use `/src/lib` structure throughout. Delete root `/lib` directories.

## Task Breakdown

### Phase 1: Clean Up React Template Structure

#### Task 1.1: Verify React Template Current State
**Effort**: 1
- [x] Document current imports in React template pointing to `/lib` vs `/src/lib`
- [x] Identify all files referencing `/lib/ui-core` or `/lib/ui-adapters`
- [x] List Vite config references to `/lib` directories
- [x] **Success**: Complete inventory of current lib usage

#### Task 1.2: Update React Template Import Paths
**Effort**: 2
- [x] Change all imports from `@/lib/ui-core` to use `/src/lib/ui-core` structure
- [x] Update Vite config aliases to point to `/src/lib` instead of `/lib`
- [x] Update any hardcoded paths in build scripts or configs
- [x] **Success**: All imports reference `/src/lib` structure only

#### Task 1.3: Verify React Template Has Complete Dependencies in src/lib
**Effort**: 2
- [x] Confirm `/src/lib/ui-core` contains all needed ui-core components
- [x] Confirm `/src/lib/ui-adapters/vite` contains vite adapter
- [x] Test that `pnpm run build` completes successfully
- [x] Test that `pnpm run dev` starts without errors
- [x] **Success**: React template builds and runs using only `/src/lib` structure

#### Task 1.4: Remove Root lib Directory from React Template
**Effort**: 1
- [x] Delete `templates/react/lib/` directory entirely
- [x] Verify no broken imports or missing files
- [x] Test `pnpm build` and `pnpm dev` commands still work
- [x] **Success**: React template works without root `/lib` directory

### Phase 2: Restructure Packages to Match src/lib

#### Task 2.1: Create New packages/src/lib Structure
**Effort**: 3
- [x] Create `packages/src/lib/` directory structure
- [x] Move `packages/ui-core/src/*` to `packages/src/lib/ui-core/`
- [x] Move `packages/ui-adapters/nextjs/src/*` to `packages/src/lib/ui-adapters/nextjs/`
- [x] Move `packages/ui-adapters/vite/src/*` to `packages/src/lib/ui-adapters/vite/`
- [x] Move `packages/content/src/*` to `packages/src/lib/content/`
- [x] **Success**: All package source code organized under `packages/src/lib/`

#### Task 2.2: Update All Package Internal Imports
**Effort**: 4
- [x] Change imports in ui-adapters from `@manta-templates/ui-core` to `../ui-core`
- [x] Update any cross-package imports to use relative paths
- [x] Verify no remaining `@manta-templates/*` imports in packages
- [x] **Success**: All packages use relative imports and compile cleanly

### Phase 3: Create Simple Copy Script

#### Task 3.1: Write Minimal Copy Script
**Effort**: 2
- [x] Create `scripts/copy-packages.js` (replace sync-template.js)
- [x] Copy `packages/src/lib/ui-core` to `templates/{template}/src/lib/ui-core`
- [x] Copy appropriate adapter based on build tool:
  - NextJS templates get `packages/src/lib/ui-adapters/nextjs/`
  - React/Electron templates get `packages/src/lib/ui-adapters/vite/` (both use Vite)
- [x] Copy content: `packages/src/lib/content` to `templates/{template}/content`
- [x] No import rewriting needed (paths already match)
- [x] **Success**: Simple <50 line script copies files preserving structure

#### Task 3.2: Test Copy Script with All Templates
**Effort**: 3
- [x] Run copy script for React template, verify build works
- [x] STOP HERE AND WAIT FOR PROJECT MANAGER VERIFICATION
- [ ] Run copy script for NextJS template, verify build works  
- [ ] STOP HERE AND WAIT FOR PROJECT MANAGER VERIFICATION
- [ ] Run copy script for Electron template, verify build works
- [ ] STOP HERE AND WAIT FOR PROJECT MANAGER VERIFICATION
- [ ] Confirm each template gets correct adapter (NextJS→nextjs, React/Electron→vite)
- [ ] **Success**: All templates build successfully with copied packages

### Phase 4: Remove Build Infrastructure

#### Task 4.1: Remove Package Build Scripts
**Effort**: 2
- [ ] Delete all `package.json` files from packages subdirectories
- [ ] Remove TypeScript build configs from packages
- [ ] Delete all `dist/` directories from packages
- [ ] Remove workspace references to individual packages
- [ ] **Success**: No build infrastructure remains in packages

#### Task 4.2: Remove build-ui Script and Dependencies  
**Effort**: 2
- [ ] Remove `build-ui` script from root package.json
- [ ] Delete `scripts/sync-template.js` file
- [ ] Update documentation to reference new copy-packages script
- [ ] Remove any CI/CD references to build-ui
- [ ] **Success**: No references to old build system remain

### Phase 5: Verification and Cleanup

#### Task 5.1: Full Template Testing
**Effort**: 3
- [ ] Test `pnpm dev` in each template
- [ ] Test `pnpm build` in each template  
- [ ] Verify all UI components render correctly
- [ ] Test content loading functionality works
- [ ] **Success**: All templates fully functional

#### Task 5.2: Apply Same Structure to NextJS and Electron Templates
**Effort**: 4
- [ ] Update NextJS template to use `/src/lib` structure only
- [ ] Update Electron template to use `/src/lib` structure only
- [ ] Delete root `/lib` directories from both templates
- [ ] Test both templates build and run correctly
- [ ] **Success**: All templates use consistent `/src/lib` structure

## Notes and Warnings

**CRITICAL**: The `/src/lib` structure is the correct approach because:
- Follows Next.js/React/TypeScript conventions (source in `/src`)
- Template-specific utilities belong with template source
- Root `/lib` was just an artifact of the broken sync system
- Eliminates duplicate ui-core copies

**Package Build System is Completely Unnecessary**: The packages only build dist/ files so TypeScript can resolve fake `@manta-templates/*` imports during package compilation. Since templates copy source files and use local imports, these builds serve no purpose.

**Import Rewriting is Eliminated**: When packages/ structure matches template structure (`/src/lib`), imports work identically in both contexts with relative paths.

**Selective Copying Required**: Each template should get only its appropriate adapter (nextjs, vite, electron) to avoid bloat and framework conflicts.

## Success Criteria

- [ ] All templates use `/src/lib` structure exclusively
- [ ] No root `/lib` directories in any template
- [ ] packages/ structure mirrors template `/src/lib` exactly
- [ ] Simple copy script replaces 283-line sync-template.js
- [ ] No package builds or dist/ directories
- [ ] All templates build and run correctly
- [ ] No `@manta-templates/*` imports anywhere in codebase