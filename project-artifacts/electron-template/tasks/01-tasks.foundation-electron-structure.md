---
layer: project
docType: tasks
project: electron-template
slice: foundation-electron-structure
status: in-progress
dateCreated: 2025-09-02
dateUpdated: 2025-09-02
---

# Tasks: Foundation & Electron Structure

## Task 1.1: Create Directory Structure
- [ ] Create `templates/electron/src/main/` directory
- [ ] Create `templates/electron/src/preload/` directory  
- [ ] Create `templates/electron/src/renderer/` directory (placeholder)
- [ ] Create `templates/electron/public/` directory
- [ ] Create `templates/electron/resources/` directory

**Success**: Directory structure matches electron-vite conventions

## Task 1.2: Copy and Adapt electron-vite Configuration
- [ ] Copy `electron.vite.config.ts` from rummage app
- [ ] Remove rummage-specific externals (sqlite, onnx) 
- [ ] Adapt paths for template structure
- [ ] Ensure renderer config supports React + Tailwind

**Success**: Configuration file compiles without errors

## Task 1.3: Create Package.json with Electron Dependencies  
- [ ] Copy relevant dependencies from rummage `package.json`
- [ ] Remove rummage-specific deps (better-sqlite3, onnx, etc.)
- [ ] Add React template dependencies (React, Tailwind, content system)
- [ ] Set up proper scripts (dev, build, package)
- [ ] Configure electron-builder basics

**Success**: `pnpm install` completes without errors

## Task 1.4: Set Up TypeScript Configuration
- [ ] Copy `tsconfig.json` from rummage
- [ ] Adapt paths and aliases for template structure
- [ ] Ensure compatibility with React template's TS setup
- [ ] Configure proper module resolution

**Success**: TypeScript compilation works for all processes

## Task 1.5: Create Main Process
- [ ] Copy basic main process structure from rummage
- [ ] Remove rummage-specific functionality (DB, ML features)
- [ ] Set up basic window management
- [ ] Configure development vs production behavior
- [ ] Add proper app lifecycle management

**Success**: Electron app launches with empty window

## Task 1.6: Create Preload Script
- [ ] Copy preload script foundation from rummage
- [ ] Remove rummage-specific IPC methods
- [ ] Set up secure IPC bridge pattern
- [ ] Add type definitions for renderer IPC access

**Success**: Preload script loads without security warnings

## Task 1.7: Create Basic HTML Entry Point
- [ ] Create `index.html` with proper Electron configuration
- [ ] Set up basic meta tags and CSP
- [ ] Reference renderer entry point
- [ ] Ensure hot reload works in development

**Success**: HTML loads and renderer process starts

## Task 1.8: Test Basic Electron App
- [ ] Run `pnpm dev` and verify app launches
- [ ] Test window controls (minimize, maximize, close)
- [ ] Verify hot reload functionality
- [ ] Check developer tools access
- [ ] Test build process (`pnpm build`)

**Success**: All development workflows function correctly

## Commit Strategy
- Commit after Task 1.2 (configuration)
- Commit after Task 1.5 (main process working) 
- Commit after Task 1.8 (full functionality verified)