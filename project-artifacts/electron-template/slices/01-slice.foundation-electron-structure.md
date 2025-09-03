---
layer: project
docType: slice-design
project: electron-template
slice: foundation-electron-structure
status: in-progress
dateCreated: 2025-09-02
dateUpdated: 2025-09-02
---

# Slice 1: Foundation & Electron Structure

## Objective
Create the basic Electron template structure with build configuration by copying and adapting the proven architecture from the rummage app.

## Scope
- Basic Electron app structure (main/preload/renderer)
- Build configuration with electron-vite
- Package.json with correct dependencies
- TypeScript configuration
- Basic window management
- Development server setup

## Technical Approach
1. Copy proven electron-vite configuration from rummage
2. Adapt package.json dependencies for template use
3. Set up main process with basic window management
4. Create secure preload script foundation
5. Set up basic HTML entry point for renderer

## Success Criteria
- [ ] Electron app starts with empty window
- [ ] Build system compiles all processes without errors
- [ ] Development server runs (`pnpm dev`) successfully
- [ ] TypeScript compilation works for all processes
- [ ] Basic IPC bridge is functional (preload)

## Files Created/Modified
- `templates/electron/package.json`
- `templates/electron/electron.vite.config.ts`
- `templates/electron/tsconfig.json`
- `templates/electron/src/main/main.ts`
- `templates/electron/src/preload/preload.ts`
- `templates/electron/index.html`
- `templates/electron/README.md` (basic)

## Dependencies
- None (foundational slice)

## Risks & Mitigations
- **Risk**: electron-vite configuration complexity
- **Mitigation**: Copy proven working config from rummage
- **Risk**: Native dependency handling
- **Mitigation**: Start simple, add native deps in later slices if needed