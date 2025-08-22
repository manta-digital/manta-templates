# UI Refactor Tasks - Expanded

## Phase 1: Infrastructure Setup

### Restructure Monorepo Workspace
- [x] Create packages directory in repository root
  - [x] Navigate to manta-templates repository root
  - [x] Create `packages/` directory if it doesn't exist
    1. Run: `mkdir -p packages`
    2. Verify creation with `ls -la` to confirm packages/ exists
- [x] Update root package.json workspace configuration
  - [x] Open root `package.json` file
  - [x] Add or update workspaces configuration to include packages
    1. Add this configuration to package.json:
    ```json
    {
      "workspaces": [
        "templates/*",
        "packages/*"
      ]
    }
    ```
  - [x] Save the file
- [x] Verify workspace structure builds without errors
  - [x] Run `pnpm install` from repository root
  - [x] Check that no workspace errors occur
  - [x] Success: `pnpm build` runs successfully from root with new workspace structure

### Create ui-core Package Foundation
- [x] Initialize packages/ui-core directory structure
  - [x] Create `packages/ui-core/` directory
    1. Run: `mkdir -p packages/ui-core`
  - [x] Create initial package.json for ui-core
    1. Create `packages/ui-core/package.json` with this content:
    ```json
    {
      "name": "@manta-templates/ui-core",
      "version": "0.1.0",
      "description": "Framework-agnostic UI components for manta-templates",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "files": ["dist"],
      "scripts": {
        "build": "tsc",
        "dev": "tsc --watch"
      },
      "peerDependencies": {
        "react": ">=18.0.0",
        "react-dom": ">=18.0.0"
      },
      "dependencies": {
        "@radix-ui/colors": "^3.0.0",
        "@radix-ui/react-slot": "^1.2.3",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "tailwind-merge": "^3.3.1",
        "lucide-react": "^0.507.0"
      },
      "devDependencies": {
        "typescript": "^5.8.3",
        "@types/react": "^19.1.8",
        "@types/react-dom": "^19.1.6"
      }
    }
    ```
- [x] Configure build system for TypeScript compilation
  - [x] Create `packages/ui-core/tsconfig.json`
    1. Create file with this configuration:
    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "lib": ["DOM", "DOM.Iterable", "ES6"],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": false,
        "declaration": true,
        "outDir": "dist",
        "jsx": "react-jsx"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }
    ```
- [x] Test package builds independently
  - [x] Navigate to packages/ui-core: `cd packages/ui-core`
  - [x] Install dependencies: `pnpm install`
  - [x] Create minimal src/index.ts file for testing:
    ```typescript
    export const version = "0.1.0";
    ```
  - [x] Run build: `pnpm build`
  - [x] Verify dist/ directory created with index.js and index.d.ts
  - [x] Success: ui-core package builds independently and can be imported by templates

### Set up TypeScript Configurations
- [x] Configure module resolution for internal imports
  - [x] Update packages/ui-core/tsconfig.json to include path mapping
    1. Add to compilerOptions:
    ```json
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
    ```
- [x] Set up build scripts and export configuration
  - [x] Verify package.json scripts are correctly configured for build
  - [x] Test TypeScript compilation with: `pnpm build`
  - [x] Check that type definitions are generated in dist/
- [x] Test import resolution from templates
  - [x] Navigate to templates/nextjs
  - [x] Add ui-core as dependency in package.json:
    ```json
    "@manta-templates/ui-core": "workspace:*"
    ```
  - [x] Run `pnpm install` from templates/nextjs
  - [x] Test import in a TypeScript file:
    ```typescript
    import { version } from '@manta-templates/ui-core';
    ```
  - [x] Success: TypeScript compilation works without errors, proper type exports

### Create Initial Directory Structure
- [x] Create core directory structure in ui-core
  - [x] Create packages/ui-core/src/ subdirectories
    1. Run these commands:
    ```bash
    mkdir -p packages/ui-core/src/components/cards
    mkdir -p packages/ui-core/src/components/layouts
    mkdir -p packages/ui-core/src/components/ui
    mkdir -p packages/ui-core/src/components/primitives
    mkdir -p packages/ui-core/src/hooks
    mkdir -p packages/ui-core/src/utils
    mkdir -p packages/ui-core/src/types
    mkdir -p packages/ui-core/src/providers
    ```
- [x] Set up barrel export system
  - [x] Create packages/ui-core/src/index.ts as main export file
    1. Start with this structure:
    ```typescript
    // Components
    export * from './components/cards';
    export * from './components/layouts';
    export * from './components/ui';
    export * from './components/primitives';
    
    // Utilities
    export * from './utils';
    export * from './hooks';
    export * from './types';
    export * from './providers';
    ```
  - [x] Create index.ts files for each component directory
    1. Create packages/ui-core/src/components/cards/index.ts (empty for now)
    2. Create packages/ui-core/src/components/layouts/index.ts (empty for now)
    3. Create packages/ui-core/src/components/ui/index.ts (empty for now)
    4. Create packages/ui-core/src/components/primitives/index.ts (empty for now)
- [x] Create packages/ui-adapters directory structure
  - [x] Create adapter directory structure
    1. Run:
    ```bash
    mkdir -p packages/ui-adapters/nextjs/src
    mkdir -p packages/ui-adapters/react-router/src
    mkdir -p packages/ui-adapters/astro/src
    ```
- [x] Test import structure
  - [x] Build ui-core package: `cd packages/ui-core && pnpm build`
  - [x] Verify clean import paths work (even with empty exports)
  - [x] Success: Clean import structure, components can be imported from @manta-templates/ui-core
