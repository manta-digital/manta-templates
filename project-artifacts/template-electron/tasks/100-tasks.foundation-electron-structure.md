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
- [x] Create `templates/electron/src/main/` directory
- [x] Create `templates/electron/src/preload/` directory
- [x] Create `templates/electron/src/renderer/` directory (placeholder)
- [x] Create `templates/electron/public/` directory
- [x] Create `templates/electron/resources/` directory

**Success**: Directory structure matches electron-vite conventions ✅

## Task 1.2: Copy and Adapt electron-vite Configuration
- [x] Copy `electron.vite.config.ts` from rummage app
- [x] Remove rummage-specific externals (sqlite, onnx)
- [x] Adapt paths for template structure
- [x] Ensure renderer config supports React + Tailwind

**Success**: Configuration file compiles without errors ✅

## Task 1.3: Create Package.json with Electron Dependencies
- [x] Copy relevant dependencies from rummage `package.json`
- [x] Remove rummage-specific deps (better-sqlite3, onnx, etc.)
- [x] Add React template dependencies (React, Tailwind, content system)
- [x] Set up proper scripts (dev, build, package)
- [x] Configure electron-builder basics

**Success**: `pnpm install` completes without errors ✅

## Task 1.4: Set Up TypeScript Configuration
- [x] Copy `tsconfig.json` from rummage
- [x] Adapt paths and aliases for template structure
- [x] Ensure compatibility with React template's TS setup
- [x] Configure proper module resolution

**Success**: TypeScript compilation works for all processes ✅

## Task 1.5: Create Main Process
- [x] Copy basic main process structure from rummage
- [x] Remove rummage-specific functionality (DB, ML features)
- [x] Set up basic window management
- [x] Configure development vs production behavior
- [x] Add proper app lifecycle management

**Success**: Electron app launches with empty window ✅

## Task 1.6: Create Preload Script
- [x] Copy preload script foundation from rummage
- [x] Remove rummage-specific IPC methods
- [x] Set up secure IPC bridge pattern
- [x] Add type definitions for renderer IPC access

**Success**: Preload script loads without security warnings ✅

## Task 1.7: Create Basic HTML Entry Point
- [x] Create `index.html` with proper Electron configuration
- [x] Set up basic meta tags and CSP
- [x] Reference renderer entry point
- [x] Ensure hot reload works in development

**Success**: HTML loads and renderer process starts ✅

## Task 1.8: Test Basic Electron App
- [x] Run `pnpm dev` and verify app launches
- [x] Test window controls (minimize, maximize, close)
- [x] Verify hot reload functionality
- [x] Check developer tools access
- [x] Test build process (`pnpm build`)

**Success**: All development workflows function correctly ✅

## Commit Strategy
- Commit after Task 1.2 (configuration)
- Commit after Task 1.5 (main process working) 
- Commit after Task 1.8 (full functionality verified)