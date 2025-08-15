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

## Phase 2: Core Component Extraction

### Extract Base UI Primitives
- [ ] Move BaseCard component to ui-core
  - [ ] Copy templates/nextjs/src/components/cards/BaseCard.tsx to packages/ui-core/src/components/ui/BaseCard.tsx
  - [ ] Remove Next.js specific imports from BaseCard
    1. Remove any `import` statements referencing 'next/*'
    2. Replace `import Image from 'next/image'` with generic Image prop pattern
    3. Replace `import Link from 'next/link'` with generic Link prop pattern
  - [ ] Abstract Image dependency using dependency injection
    1. Update BaseCard interface to accept optional ImageComponent:
    ```typescript
    interface BaseCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
    }
    ```
    2. Use ImageComponent || 'img' as fallback in component
- [ ] Move Button component to ui-core
  - [ ] Copy templates/nextjs/src/components/ui/button.tsx to packages/ui-core/src/components/ui/Button.tsx
  - [ ] Abstract any Next.js dependencies (likely minimal for Button)
  - [ ] Update import/export paths to use ui-core structure
- [ ] Create generic Image and Link primitives with dependency injection
  - [ ] Create packages/ui-core/src/components/primitives/Image.tsx
    1. Implement with this pattern:
    ```typescript
    interface CoreImageProps {
      src: string;
      alt: string;
      className?: string;
      ImageComponent?: React.ComponentType<any>;
      [key: string]: any;
    }
    
    export const CoreImage: React.FC<CoreImageProps> = ({ 
      ImageComponent = 'img', 
      ...props 
    }) => {
      const Component = ImageComponent;
      return <Component {...props} />;
    };
    ```
  - [ ] Create packages/ui-core/src/components/primitives/Link.tsx
    1. Implement with dependency injection pattern similar to Image
- [ ] Update component exports
  - [ ] Add BaseCard and Button to packages/ui-core/src/components/ui/index.ts:
    ```typescript
    export { BaseCard } from './BaseCard';
    export { Button } from './Button';
    ```
  - [ ] Add primitives to packages/ui-core/src/components/primitives/index.ts:
    ```typescript
    export { CoreImage } from './Image';
    export { CoreLink } from './Link';
    ```
- [ ] Test extraction
  - [ ] Build ui-core: `pnpm build`
  - [ ] Verify components can be imported: `import { BaseCard, Button } from '@manta-templates/ui-core'`
  - [ ] Success: BaseCard and Button work independently without Next.js dependencies

### Extract and Abstract Core Cards
- [ ] Move BlogCard with dependency injection
  - [ ] Copy templates/nextjs/src/components/cards/BlogCard.tsx to packages/ui-core/src/components/cards/BlogCard.tsx
  - [ ] Update BlogCard interface to accept ImageComponent and LinkComponent props
    1. Add to BlogCardProps:
    ```typescript
    interface BlogCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
    }
    ```
  - [ ] Replace direct Next.js Image usage with injected ImageComponent
    1. Replace `<Image` with `<ImageComponent` or fallback to `<img`
    2. Update props to work with generic image component
  - [ ] Replace direct Next.js Link usage with injected LinkComponent
    1. Replace `<Link` with `<LinkComponent` or fallback to `<a`
  - [ ] Update imports to use ui-core utilities
    1. Change `import { cn } from '@/lib/utils'` to relative import from ui-core utils
- [ ] Move ProjectCard with abstracted dependencies
  - [ ] Copy templates/nextjs/src/components/cards/ProjectCard.tsx to packages/ui-core/src/components/cards/ProjectCard.tsx
  - [ ] Apply same dependency injection pattern as BlogCard
  - [ ] Abstract Next.js Link and Image usage
  - [ ] Update utility imports to use ui-core paths
- [ ] Move QuoteCard (minimal abstraction needed)
  - [ ] Copy templates/nextjs/src/components/cards/QuoteCard.tsx to packages/ui-core/src/components/cards/QuoteCard.tsx
  - [ ] Update utility imports to relative ui-core paths
  - [ ] Minimal changes needed since QuoteCard likely has fewer Next.js dependencies
- [ ] Update component interfaces and exports
  - [ ] Ensure all card interfaces are properly typed with optional injected components
  - [ ] Add cards to packages/ui-core/src/components/cards/index.ts:
    ```typescript
    export { BlogCard } from './BlogCard';
    export { ProjectCard } from './ProjectCard';  
    export { QuoteCard } from './QuoteCard';
    ```
- [ ] Test card extraction
  - [ ] Build ui-core package
  - [ ] Test importing cards with mock injected components
  - [ ] Verify cards render without errors when dependencies are injected
  - [ ] Success: Cards render correctly with injected dependencies, maintain full functionality

### Extract Layout Components
- [ ] Move BentoLayout to ui-core
  - [ ] Copy templates/nextjs/src/components/layouts/bento-layout.tsx to packages/ui-core/src/components/layouts/BentoLayout.tsx
  - [ ] Abstract any framework-specific dependencies (likely minimal for BentoLayout)
  - [ ] Update utility imports to use ui-core relative paths
- [ ] Move GridLayout system to ui-core
  - [ ] Copy entire GridLayout system to ui-core:
    1. templates/nextjs/src/components/layouts/grid-layout/grid-container.tsx → packages/ui-core/src/components/layouts/GridContainer.tsx
    2. templates/nextjs/src/components/layouts/grid-layout/grid-item.tsx → packages/ui-core/src/components/layouts/GridItem.tsx  
    3. templates/nextjs/src/components/layouts/grid-layout/grid-layout.tsx → packages/ui-core/src/components/layouts/GridLayout.tsx
  - [ ] Update internal imports within GridLayout system to use relative paths
  - [ ] Update index.ts file references
- [ ] Move Container component to ui-core
  - [ ] Copy templates/nextjs/src/components/container.tsx to packages/ui-core/src/components/layouts/Container.tsx
  - [ ] Abstract any framework-specific dependencies
  - [ ] Update utility imports
- [ ] Update layout exports
  - [ ] Add layouts to packages/ui-core/src/components/layouts/index.ts:
    ```typescript
    export { BentoLayout } from './BentoLayout';
    export { GridLayout } from './GridLayout';
    export { GridContainer } from './GridContainer';
    export { GridItem } from './GridItem';
    export { Container } from './Container';
    ```
- [ ] Test layout extraction
  - [ ] Build ui-core package
  - [ ] Test importing and using layout components
  - [ ] Verify Tailwind classes work correctly
  - [ ] Success: Layout components work with any React framework, no Next.js coupling

### Extract Shared Utilities and Types
- [ ] Move utility functions to ui-core
  - [ ] Identify utilities in templates/nextjs/src/lib/utils
  - [ ] Copy cn utility function to packages/ui-core/src/utils/cn.ts
    1. Create standalone file with cn function
  - [ ] Copy formatDate utility to packages/ui-core/src/utils/formatDate.ts
  - [ ] Copy other shared utilities as identified
- [ ] Move shared TypeScript interfaces to ui-core
  - [ ] Identify shared types in templates/nextjs/src/types/
  - [ ] Copy content-related interfaces to packages/ui-core/src/types/content.ts
  - [ ] Copy component-related interfaces to packages/ui-core/src/types/components.ts
  - [ ] Update type imports throughout ui-core components
- [ ] Create theme-related utilities and hooks
  - [ ] Move theme-related hooks to packages/ui-core/src/hooks/
  - [ ] Create packages/ui-core/src/hooks/index.ts for hook exports
  - [ ] Abstract hooks to work without Next.js dependencies
- [ ] Set up barrel exports for utilities
  - [ ] Create packages/ui-core/src/utils/index.ts:
    ```typescript
    export { cn } from './cn';
    export { formatDate } from './formatDate';
    // Add other utilities as moved
    ```
  - [ ] Create packages/ui-core/src/types/index.ts:
    ```typescript
    export * from './content';
    export * from './components';
    ```
  - [ ] Create packages/ui-core/src/hooks/index.ts with hook exports
- [ ] Test utility extraction
  - [ ] Build ui-core package
  - [ ] Test importing utilities in components
  - [ ] Verify no circular dependencies
  - [ ] Success: All shared code accessible from single ui-core import, no duplication

### Set up Theme System in ui-core
- [ ] Move theme context and provider from templates/nextjs
  - [ ] Copy templates/nextjs/src/context/themecontext.tsx to packages/ui-core/src/providers/ThemeProvider.tsx
  - [ ] Remove Next.js specific dependencies (if any)
  - [ ] Ensure theme system works with standard React patterns
- [ ] Move ThemeToggle component to ui-core
  - [ ] Copy templates/nextjs/src/components/themetoggle.tsx to packages/ui-core/src/components/ui/ThemeToggle.tsx
  - [ ] Update imports to use ui-core paths
  - [ ] Abstract any framework-specific dependencies
- [ ] Abstract theme system for framework independence
  - [ ] Ensure theme provider works without Next.js specific APIs
  - [ ] Update theme detection to use standard web APIs
  - [ ] Test theme persistence without Next.js specific storage
- [ ] Update theme exports
  - [ ] Add ThemeProvider to packages/ui-core/src/providers/index.ts:
    ```typescript
    export { ThemeProvider } from './ThemeProvider';
    ```
  - [ ] Add ThemeToggle to packages/ui-core/src/components/ui/index.ts:
    ```typescript
    export { ThemeToggle } from './ThemeToggle';
    ```
- [ ] Test theme system
  - [ ] Build ui-core package
  - [ ] Test theme provider and toggle work independently
  - [ ] Verify theme switching functionality
  - [ ] Success: Theme system works independently, can be used across frameworks

## Phase 3: Adapter Creation

### Create Next.js Adapter Package
- [ ] Set up packages/ui-adapters/nextjs package structure
  - [ ] Create packages/ui-adapters/nextjs/package.json:
    ```json
    {
      "name": "@manta-templates/ui-adapters-nextjs",
      "version": "0.1.0",
      "description": "Next.js adapters for manta-templates ui-core",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "dev": "tsc --watch"
      },
      "peerDependencies": {
        "next": ">=14.0.0",
        "react": ">=18.0.0",
        "react-dom": ">=18.0.0"
      },
      "dependencies": {
        "@manta-templates/ui-core": "workspace:*"
      },
      "devDependencies": {
        "typescript": "^5.8.3",
        "@types/react": "^19.1.8"
      }
    }
    ```
  - [ ] Create packages/ui-adapters/nextjs/tsconfig.json with proper configuration
- [ ] Create Next.js-specific Image wrapper
  - [ ] Create packages/ui-adapters/nextjs/src/Image.tsx:
    ```typescript
    import NextImage from 'next/image';
    import { CoreImage } from '@manta-templates/ui-core';
    
    export const Image = (props) => (
      <CoreImage {...props} ImageComponent={NextImage} />
    );
    ```
- [ ] Create Next.js-specific Link wrapper
  - [ ] Create packages/ui-adapters/nextjs/src/Link.tsx:
    ```typescript
    import NextLink from 'next/link';
    import { CoreLink } from '@manta-templates/ui-core';
    
    export const Link = (props) => (
      <CoreLink {...props} LinkComponent={NextLink} />
    );
    ```
- [ ] Export adapted components with Next.js optimizations
  - [ ] Create packages/ui-adapters/nextjs/src/components.tsx:
    ```typescript
    import NextImage from 'next/image';
    import NextLink from 'next/link';
    import { 
      BlogCard as CoreBlogCard,
      ProjectCard as CoreProjectCard 
    } from '@manta-templates/ui-core';
    
    export const BlogCard = (props) => (
      <CoreBlogCard 
        {...props} 
        ImageComponent={NextImage}
        LinkComponent={NextLink}
      />
    );
    
    export const ProjectCard = (props) => (
      <CoreProjectCard 
        {...props}
        ImageComponent={NextImage} 
        LinkComponent={NextLink}
      />
    );
    ```
  - [ ] Create packages/ui-adapters/nextjs/src/index.ts:
    ```typescript
    export * from './components';
    export * from './Image';
    export * from './Link';
    ```
- [ ] Test Next.js adapter
  - [ ] Build adapter package: `cd packages/ui-adapters/nextjs && pnpm build`
  - [ ] Test importing adapted components
  - [ ] Verify Next.js optimizations are applied
  - [ ] Success: Next.js adapter provides drop-in replacements with full Next.js optimizations

### Create React Router Adapter Package
- [ ] Set up packages/ui-adapters/react-router package structure
  - [ ] Create packages/ui-adapters/react-router/package.json:
    ```json
    {
      "name": "@manta-templates/ui-adapters-react-router",
      "version": "0.1.0",
      "description": "React Router adapters for manta-templates ui-core",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "peerDependencies": {
        "react": ">=18.0.0",
        "react-dom": ">=18.0.0",
        "react-router-dom": ">=6.0.0"
      },
      "dependencies": {
        "@manta-templates/ui-core": "workspace:*"
      }
    }
    ```
  - [ ] Create tsconfig.json for React Router adapter
- [ ] Create standard Image component with lazy loading
  - [ ] Create packages/ui-adapters/react-router/src/Image.tsx:
    ```typescript
    import { CoreImage } from '@manta-templates/ui-core';
    
    const LazyImage = ({ src, alt, ...props }) => (
      <img src={src} alt={alt} loading="lazy" {...props} />
    );
    
    export const Image = (props) => (
      <CoreImage {...props} ImageComponent={LazyImage} />
    );
    ```
- [ ] Create React Router Link wrapper
  - [ ] Create packages/ui-adapters/react-router/src/Link.tsx:
    ```typescript
    import { Link as RouterLink } from 'react-router-dom';
    import { CoreLink } from '@manta-templates/ui-core';
    
    export const Link = (props) => (
      <CoreLink {...props} LinkComponent={RouterLink} />
    );
    ```
- [ ] Export adapted components with React Router implementations
  - [ ] Create packages/ui-adapters/react-router/src/components.tsx with adapted components
  - [ ] Create barrel export in packages/ui-adapters/react-router/src/index.ts
- [ ] Test React Router adapter
  - [ ] Build adapter package
  - [ ] Test with minimal React Router setup
  - [ ] Success: React Router adapter works with standard React + React Router setup

### Update Next.js Template to Use Adapters
- [ ] Update component imports in Next.js template
  - [ ] Add Next.js adapter as dependency in templates/nextjs/package.json:
    ```json
    "@manta-templates/ui-adapters-nextjs": "workspace:*"
    ```
  - [ ] Run `pnpm install` in templates/nextjs
- [ ] Replace local component imports with adapter imports
  - [ ] Update all files importing from local components:
    1. Change `import { BlogCard } from '@/components/cards/BlogCard'` 
    2. To `import { BlogCard } from '@manta-templates/ui-adapters-nextjs'`
  - [ ] Update imports systematically across:
    1. templates/nextjs/src/app/ pages
    2. templates/nextjs/src/components/ files that use the extracted components
- [ ] Remove now-unused component files from templates/nextjs
  - [ ] Identify files that have been moved to ui-core
  - [ ] Move to backup location first: `mkdir templates/nextjs/src/components/_backup`
  - [ ] Move extracted files to backup directory
  - [ ] Test that template still builds and runs
- [ ] Verify all existing functionality preserved
  - [ ] Run templates/nextjs dev server: `pnpm dev`
  - [ ] Test all pages load correctly
  - [ ] Verify components render identically to before refactor
  - [ ] Check that Next.js optimizations (Image, Link) still work
- [ ] Test build and deployment
  - [ ] Run `pnpm build` in templates/nextjs
  - [ ] Verify build succeeds without errors
  - [ ] Test production build runs correctly
  - [ ] Success: Next.js template builds and runs identically to before refactor

### Create Comprehensive Testing Suite
- [ ] Set up testing infrastructure for ui-core package
  - [ ] Add testing dependencies to packages/ui-core/package.json:
    ```json
    "devDependencies": {
      "@testing-library/react": "^14.0.0",
      "@testing-library/jest-dom": "^6.1.0",
      "jest": "^29.7.0",
      "jest-environment-jsdom": "^29.7.0"
    },
    "scripts": {
      "test": "jest",
      "test:watch": "jest --watch"
    }
    ```
  - [ ] Create jest.config.js in packages/ui-core:
    ```javascript
    module.exports = {
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    };
    ```
  - [ ] Create packages/ui-core/src/setupTests.ts with testing-library setup
- [ ] Create component tests for extracted components
  - [ ] Create packages/ui-core/src/components/cards/__tests__/BlogCard.test.tsx
    1. Test BlogCard renders with required props
    2. Test dependency injection with mock ImageComponent and LinkComponent
    3. Test component behavior with different prop combinations
  - [ ] Create similar test files for ProjectCard and QuoteCard
  - [ ] Create tests for layout components (BentoLayout, GridLayout, Container)
- [ ] Test dependency injection patterns with mock components
  - [ ] Create mock components for testing:
    ```typescript
    const MockImage = ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />;
    const MockLink = ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>;
    ```
  - [ ] Test that components work correctly with injected dependencies
  - [ ] Test fallback behavior when no dependencies are provided
- [ ] Create adapter tests for framework integrations
  - [ ] Create packages/ui-adapters/nextjs/__tests__/ directory
  - [ ] Test Next.js adapter components integrate correctly with Next.js Image and Link
  - [ ] Test React Router adapter components work with React Router Link
- [ ] Run comprehensive test suite
  - [ ] Run tests in ui-core: `cd packages/ui-core && pnpm test`
  - [ ] Run tests in adapters
  - [ ] Achieve >90% test coverage
  - [ ] Success: >90% test coverage, all components tested in isolation and with adapters

## Phase 4: Template Distribution

### Build React + Router Template
- [ ] Create new templates/react directory structure
  - [ ] Create templates/react/ directory
    1. Run: `mkdir -p templates/react`
  - [ ] Initialize React + TypeScript project structure:
    ```bash
    cd templates/react
    npm create vite@latest . -- --template react-ts
    ```
  - [ ] Install additional dependencies:
    ```bash
    pnpm add react-router-dom @manta-templates/ui-core @manta-templates/ui-adapters-react-router
    ```
- [ ] Configure build system (Vite + React + TypeScript)
  - [ ] Update vite.config.ts to include proper path resolution:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from 'path'
    
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    })
    ```
  - [ ] Configure TypeScript paths in tsconfig.json
- [ ] Import components from React Router adapter
  - [ ] Update src/main.tsx to include React Router setup:
    ```typescript
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import { BrowserRouter } from 'react-router-dom'
    import App from './App.tsx'
    import './index.css'
    
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
    ```
  - [ ] Import and use components from React Router adapter in App.tsx
- [ ] Create equivalent pages/routes to Next.js template
  - [ ] Create src/pages/ directory with route components
  - [ ] Port Next.js pages to React Router routes:
    1. Home page → src/pages/Home.tsx
    2. About page → src/pages/About.tsx  
    3. Blog pages → src/pages/Blog.tsx, src/pages/BlogPost.tsx
  - [ ] Set up routing in App.tsx with Route components
- [ ] Configure Tailwind CSS for React template
  - [ ] Install Tailwind: `pnpm add -D tailwindcss postcss autoprefixer`
  - [ ] Initialize Tailwind: `npx tailwindcss init -p`
  - [ ] Configure tailwind.config.js with content paths
  - [ ] Add Tailwind directives to src/index.css
- [ ] Test React template
  - [ ] Run dev server: `pnpm dev`
  - [ ] Verify all components render correctly
  - [ ] Test navigation between routes
  - [ ] Success: React template runs and displays same content as Next.js template

### Build Astro Template with React Islands
- [ ] Create new templates/astro directory
  - [ ] Create templates/astro/ directory
    1. Run: `mkdir -p templates/astro`
  - [ ] Initialize Astro project:
    ```bash
    cd templates/astro
    npm create astro@latest . -- --template minimal --typescript
    ```
- [ ] Configure Astro to use React components as islands
  - [ ] Install React integration: `pnpm astro add react`
  - [ ] Install ui-core components:
    ```bash
    pnpm add @manta-templates/ui-core @manta-templates/ui-adapters-react-router
    ```
  - [ ] Configure astro.config.mjs:
    ```javascript
    import { defineConfig } from 'astro/config';
    import react from '@astrojs/react';
    import tailwind from '@astrojs/tailwind';
    
    export default defineConfig({
      integrations: [react(), tailwind()]
    });
    ```
- [ ] Import components from appropriate adapter
  - [ ] Create src/components/ directory for Astro-specific wrappers if needed
  - [ ] Import React components for use in Astro islands
- [ ] Create equivalent pages using Astro pages + React islands
  - [ ] Create src/pages/index.astro (Home page):
    ```astro
    ---
    import Layout from '../layouts/Layout.astro';
    import { BlogCard } from '@manta-templates/ui-adapters-react-router';
    ---
    
    <Layout title="Home">
      <main>
        <BlogCard 
          client:load
          title="Example Post"
          excerpt="This is an example"
          coverImageUrl="/example.jpg"
        />
      </main>
    </Layout>
    ```
  - [ ] Create additional pages (about.astro, blog/index.astro, etc.)
  - [ ] Use client:load directive for interactive components
- [ ] Configure Tailwind CSS for Astro
  - [ ] Tailwind should be configured via astro add tailwind
  - [ ] Verify Tailwind styles work with React islands
- [ ] Test Astro template
  - [ ] Run dev server: `pnpm dev`
  - [ ] Verify pages load correctly
  - [ ] Test React island hydration
  - [ ] Verify component interactivity works
  - [ ] Success: Astro template displays same content with proper hydration

### Implement Template Bundling System
- [ ] Create scripts/build-templates.js for standalone template generation
  - [ ] Create scripts/ directory in repository root: `mkdir -p scripts`
  - [ ] Create scripts/build-templates.js:
    ```javascript
    const fs = require('fs-extra');
    const path = require('path');
    
    async function buildStandaloneTemplate(templateType) {
      const sourceDir = `./templates/${templateType}`;
      const distDir = `./dist-templates/${templateType}-template`;
      
      console.log(`Building ${templateType} template...`);
      
      // Copy template structure
      await fs.copy(sourceDir, distDir);
      
      // Process package.json to remove workspace dependencies
      await updatePackageJson(distDir, templateType);
      
      console.log(`${templateType} template built successfully`);
    }
    
    async function updatePackageJson(distDir, templateType) {
      const packageJsonPath = path.join(distDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      
      // Remove workspace dependencies
      if (packageJson.dependencies) {
        Object.keys(packageJson.dependencies).forEach(dep => {
          if (dep.startsWith('@manta-templates/')) {
            delete packageJson.dependencies[dep];
          }
        });
      }
      
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
    ```
- [ ] Implement component usage analysis
  - [ ] Add function to analyze which ui-core components are used:
    ```javascript
    async function analyzeComponentUsage(templateType) {
      const sourceDir = `./templates/${templateType}`;
      const componentUsage = new Set();
      
      // Scan files for ui-core imports
      // Implementation to find @manta-templates/ui-core imports
      
      return Array.from(componentUsage);
    }
    ```
- [ ] Create bundling system that inlines ui-core components
  - [ ] Add function to inline components into dist-templates:
    ```javascript
    async function inlineComponents(usedComponents, distDir) {
      const uiCoreDir = './packages/ui-core/src';
      const targetDir = path.join(distDir, 'src/components/ui-core');
      
      // Copy only used components
      for (const component of usedComponents) {
        // Copy component files
        // Update import paths
      }
    }
    ```
- [ ] Generate standalone package.json files
  - [ ] Ensure bundled templates have no workspace dependencies
  - [ ] Add all necessary dependencies directly to template package.json
  - [ ] Include build and dev scripts appropriate for each framework
- [ ] Test bundling system
  - [ ] Create dist-templates/ directory: `mkdir -p dist-templates`
  - [ ] Run build script: `node scripts/build-templates.js`
  - [ ] Verify bundled templates are self-contained
  - [ ] Success: Bundled templates are completely self-contained and work with `npx degit`

### Create Automated Distribution Pipeline
- [ ] Set up automated build process for all template variants
  - [ ] Update scripts/build-templates.js to build all templates:
    ```javascript
    async function buildAllTemplates() {
      const templates = ['nextjs', 'react', 'astro'];
      
      for (const template of templates) {
        await buildStandaloneTemplate(template);
      }
      
      console.log('All templates built successfully');
    }
    
    if (require.main === module) {
      buildAllTemplates().catch(console.error);
    }
    ```
  - [ ] Add script to root package.json:
    ```json
    "scripts": {
      "build:templates": "node scripts/build-templates.js",
      "clean:templates": "rimraf dist-templates"
    }
    ```
- [ ] Create scripts for updating dist-templates from templates
  - [ ] Create scripts/update-templates.js:
    ```javascript
    async function updateDistTemplates() {
      // Clean existing dist-templates
      await fs.remove('./dist-templates');
      
      // Rebuild all templates
      await buildAllTemplates();
      
      console.log('Distribution templates updated');
    }
    ```
- [ ] Generate framework-specific README files for each template
  - [ ] Create scripts/generate-readme.js:
    ```javascript
    function generateReadme(templateType) {
      return `# ${templateType.toUpperCase()} Template
    
    ## Quick Start
    \`\`\`bash
    npx degit yourorg/${templateType}-template my-project
    cd my-project
    npm install
    npm run dev
    \`\`\`
    
    ## Features
    ${getFeatureList(templateType)}
    `;
    }
    ```
  - [ ] Generate README.md for each dist-template
- [ ] Set up validation that bundled templates install and build correctly
  - [ ] Create scripts/validate-templates.js:
    ```javascript
    async function validateTemplate(templateType) {
      const tempDir = `./temp-test-${templateType}`;
      const distDir = `./dist-templates/${templateType}-template`;
      
      // Copy template to temp directory
      await fs.copy(distDir, tempDir);
      
      // Install dependencies
      await exec('npm install', { cwd: tempDir });
      
      // Run build
      await exec('npm run build', { cwd: tempDir });
      
      // Clean up
      await fs.remove(tempDir);
      
      console.log(`${templateType} template validated successfully`);
    }
    ```
- [ ] Test automated pipeline
  - [ ] Run complete pipeline: `pnpm build:templates`
  - [ ] Validate all generated templates: `node scripts/validate-templates.js`
  - [ ] Success: Single command generates all distributable templates ready for publication

## Quality Assurance

### Verify Component Compatibility
- [ ] Test all extracted components work in Next.js
  - [ ] Run templates/nextjs development server
  - [ ] Test all pages load correctly
  - [ ] Verify all components render and function as expected
  - [ ] Test interactive features (theme toggle, navigation, etc.)
- [ ] Test components work in React Router template
  - [ ] Run templates/react development server  
  - [ ] Navigate through all routes
  - [ ] Verify components display identical content
  - [ ] Test component interactions and state management
- [ ] Test components work in Astro template
  - [ ] Run templates/astro development server
  - [ ] Verify React islands hydrate correctly
  - [ ] Test client-side interactions work in islands
  - [ ] Verify SSG builds work correctly
- [ ] Verify performance characteristics are maintained
  - [ ] Use browser dev tools to measure load times
  - [ ] Compare bundle sizes before and after refactor
  - [ ] Test image loading performance (Next.js Image optimization)
  - [ ] Verify hydration performance in Astro
- [ ] Ensure bundle sizes remain reasonable
  - [ ] Analyze bundle sizes: `npx webpack-bundle-analyzer`
  - [ ] Compare total bundle size increase
  - [ ] Verify increase is <10% from abstraction overhead
- [ ] Test theme system across all frameworks
  - [ ] Verify theme switching works in all templates
  - [ ] Test theme persistence
  - [ ] Verify dark/light mode renders correctly
  - [ ] Success: All components work identically across frameworks with acceptable performance

### Validate TypeScript Coverage
- [ ] Ensure 100% TypeScript coverage in ui-core package
  - [ ] Run TypeScript compiler with strict settings
  - [ ] Check for any `any` types: `grep -r "any" packages/ui-core/src`
  - [ ] Verify all component props are properly typed
  - [ ] Ensure all utility functions have return type annotations
- [ ] Verify proper type exports for all components
  - [ ] Test importing types: `import { BlogCardProps } from '@manta-templates/ui-core'`
  - [ ] Verify TypeScript IntelliSense works for imported components
  - [ ] Check that adapter components inherit correct types
- [ ] Test adapter type safety and component prop forwarding
  - [ ] Verify Next.js adapter components accept all original props
  - [ ] Test that injected component props are properly typed
  - [ ] Ensure no type errors in adapter implementations
- [ ] Run comprehensive TypeScript checks
  - [ ] Run `tsc --noEmit` in all packages
  - [ ] Run `tsc --noEmit` in all templates
  - [ ] Fix any TypeScript errors discovered
  - [ ] Success: No TypeScript errors, full type safety across all packages

### Test Template Instantiation
- [ ] Verify Next.js template instantiation works
  - [ ] Test degit command: `npx degit yourorg/nextjs-template test-nextjs`
  - [ ] Navigate to test directory: `cd test-nextjs`
  - [ ] Install dependencies: `npm install`
  - [ ] Run dev server: `npm run dev`
  - [ ] Verify template runs without errors
- [ ] Test React template instantiation
  - [ ] Test degit command: `npx degit yourorg/react-template test-react`
  - [ ] Install and run following same process
  - [ ] Verify all functionality works correctly
- [ ] Test Astro template instantiation
  - [ ] Test degit command: `npx degit yourorg/astro-template test-astro`
  - [ ] Install and run following same process
  - [ ] Verify React islands work correctly
- [ ] Verify all templates install dependencies successfully
  - [ ] Test with npm: `npm install`
  - [ ] Test with pnpm: `pnpm install`
  - [ ] Test with yarn: `yarn install`
  - [ ] Verify no dependency conflicts
- [ ] Confirm development servers start without errors
  - [ ] Test `npm run dev` for all templates
  - [ ] Test `npm run build` for all templates
  - [ ] Verify production builds work correctly
- [ ] Test templates work without workspace context
  - [ ] Copy dist-templates to separate directory outside repo
  - [ ] Test installation and running from clean environment
  - [ ] Success: All templates can be instantiated and run with single command

### Documentation and Examples
- [ ] Update component documentation to reflect new import paths
  - [ ] Update all README files to use new import syntax
  - [ ] Create comprehensive API documentation for ui-core components
  - [ ] Document dependency injection patterns for each component
  - [ ] Create examples showing component usage in different frameworks
- [ ] Create migration guide for existing manta-templates users
  - [ ] Document breaking changes in import paths
  - [ ] Provide step-by-step migration instructions
  - [ ] Create automated migration script if possible:
    ```bash
    # Script to update imports
    find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/components\/cards\/BlogCard/@manta-templates\/ui-adapters-nextjs/g'
    ```
- [ ] Generate examples showing multi-framework usage
  - [ ] Create examples/ directory in repository root
  - [ ] Create side-by-side examples of same component in different frameworks
  - [ ] Document framework-specific considerations
- [ ] Update README files for all templates with correct setup instructions
  - [ ] Ensure each template has comprehensive setup documentation
  - [ ] Include troubleshooting section for common issues
  - [ ] Document framework-specific features and optimizations
- [ ] Create comprehensive documentation site
  - [ ] Set up documentation framework (e.g., Docusaurus, VitePress)
  - [ ] Create component showcase with live examples
  - [ ] Document best practices and patterns
- [ ] Success: Clear documentation, smooth migration path for existing users

### Final Integration Test
- [ ] Run complete build process from clean state
  - [ ] Clean all build artifacts: `pnpm clean`
  - [ ] Install all dependencies: `pnpm install`
  - [ ] Build all packages: `pnpm build`
  - [ ] Build all templates: `pnpm build:templates`
  - [ ] Verify no errors in entire process
- [ ] Test complete user workflow
  - [ ] Simulate new user downloading templates
  - [ ] Test template customization workflow
  - [ ] Verify development and build processes work end-to-end
- [ ] Performance regression testing
  - [ ] Compare build times before and after refactor
  - [ ] Compare runtime performance metrics
  - [ ] Verify no significant degradation
- [ ] Success: Complete UI refactor implementation validated and ready for production use