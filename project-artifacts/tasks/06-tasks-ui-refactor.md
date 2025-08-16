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
- [x] Move BaseCard component to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BaseCard.tsx to packages/ui-core/src/components/ui/BaseCard.tsx
  - [x] Remove Next.js specific imports from BaseCard
    1. Remove any `import` statements referencing 'next/*'
    2. Replace `import Image from 'next/image'` with generic Image prop pattern
    3. Replace `import Link from 'next/link'` with generic Link prop pattern
  - [x] Abstract Image dependency using dependency injection
    1. Update BaseCard interface to accept optional ImageComponent:
    ```typescript
    interface BaseCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
    }
    ```
    2. Use ImageComponent || 'img' as fallback in component
- [x] Move Button component to ui-core
  - [x] Copy templates/nextjs/src/components/ui/button.tsx to packages/ui-core/src/components/ui/Button.tsx
  - [x] Abstract any Next.js dependencies (likely minimal for Button)
  - [x] Update import/export paths to use ui-core structure
- [x] Create generic Image and Link primitives with dependency injection
  - [x] Create packages/ui-core/src/components/primitives/Image.tsx
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
  - [x] Create packages/ui-core/src/components/primitives/Link.tsx
    1. Implement with dependency injection pattern similar to Image
- [x] Update component exports
  - [x] Add BaseCard and Button to packages/ui-core/src/components/ui/index.ts:
    ```typescript
    export { BaseCard } from './BaseCard';
    export { Button } from './Button';
    ```
  - [x] Add primitives to packages/ui-core/src/components/primitives/index.ts:
    ```typescript
    export { CoreImage } from './Image';
    export { CoreLink } from './Link';
    ```
- [x] Test extraction
  - [x] Build ui-core: `pnpm build`
  - [x] Verify components can be imported: `import { BaseCard, Button } from '@manta-templates/ui-core'`
  - [x] Success: BaseCard and Button work independently without Next.js dependencies

### Extract and Abstract Core Cards
- [x] Move BlogCard with dependency injection
  - [x] Copy templates/nextjs/src/components/cards/BlogCard.tsx to packages/ui-core/src/components/cards/BlogCard.tsx
  - [x] Update BlogCard interface to accept ImageComponent and LinkComponent props
    1. Add to BlogCardProps:
    ```typescript
    interface BlogCardProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
    }
    ```
  - [x] Replace direct Next.js Image usage with injected ImageComponent
    1. Replace `<Image` with `<ImageComponent` or fallback to `<img`
    2. Update props to work with generic image component
  - [x] Replace direct Next.js Link usage with injected LinkComponent
    1. Replace `<Link` with `<LinkComponent` or fallback to `<a`
  - [x] Update imports to use ui-core utilities
    1. Change `import { cn } from '@/lib/utils'` to relative import from ui-core utils
- [x] Move ProjectCard with abstracted dependencies
  - [x] Copy templates/nextjs/src/components/cards/ProjectCard.tsx to packages/ui-core/src/components/cards/ProjectCard.tsx
  - [x] Apply same dependency injection pattern as BlogCard
  - [x] Abstract Next.js Link and Image usage
  - [x] Update utility imports to use ui-core paths
- [x] Move QuoteCard (minimal abstraction needed)
  - [x] Copy templates/nextjs/src/components/cards/QuoteCard.tsx to packages/ui-core/src/components/cards/QuoteCard.tsx
  - [x] Update utility imports to relative ui-core paths
  - [x] Minimal changes needed since QuoteCard likely has fewer Next.js dependencies
- [x] Update component interfaces and exports
  - [x] Ensure all card interfaces are properly typed with optional injected components
  - [x] Add cards to packages/ui-core/src/components/cards/index.ts:
    ```typescript
    export { BlogCard } from './BlogCard';
    export { ProjectCard } from './ProjectCard';  
    export { QuoteCard } from './QuoteCard';
    ```
- [x] Test card extraction
  - [x] Build ui-core package
  - [x] Test importing cards with mock injected components
  - [x] Verify cards render without errors when dependencies are injected
  - [x] Success: Cards render correctly with injected dependencies, maintain full functionality

### Extract Layout Components
- [x] Move BentoLayout to ui-core
  - [x] Copy templates/nextjs/src/components/layouts/bento-layout.tsx to packages/ui-core/src/components/layouts/BentoLayout.tsx
  - [x] Abstract any framework-specific dependencies (likely minimal for BentoLayout)
  - [x] Update utility imports to use ui-core relative paths
- [x] Move GridLayout system to ui-core
  - [x] Copy entire GridLayout system to ui-core:
    1. templates/nextjs/src/components/layouts/grid-layout/grid-container.tsx → packages/ui-core/src/components/layouts/GridContainer.tsx
    2. templates/nextjs/src/components/layouts/grid-layout/grid-item.tsx → packages/ui-core/src/components/layouts/GridItem.tsx  
    3. templates/nextjs/src/components/layouts/grid-layout/grid-layout.tsx → packages/ui-core/src/components/layouts/GridLayout.tsx
  - [x] Update internal imports within GridLayout system to use relative paths
  - [x] Update index.ts file references
- [x] Move Container component to ui-core
  - [x] Copy templates/nextjs/src/components/container.tsx to packages/ui-core/src/components/layouts/Container.tsx
  - [x] Abstract any framework-specific dependencies
  - [x] Update utility imports
- [x] Update layout exports
  - [x] Add layouts to packages/ui-core/src/components/layouts/index.ts:
    ```typescript
    export { BentoLayout } from './BentoLayout';
    export { GridLayout } from './GridLayout';
    export { GridContainer } from './GridContainer';
    export { GridItem } from './GridItem';
    export { Container } from './Container';
    ```
- [x] Test layout extraction
  - [x] Build ui-core package
  - [x] Test importing and using layout components
  - [x] Verify Tailwind classes work correctly
  - [x] Success: Layout components work with any React framework, no Next.js coupling

## Phase 2 Extended: Additional Card Component Extraction

### Extract Blog Variant Cards
- [x] Extract BlogCardImage to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BlogCardImage.tsx to packages/ui-core/src/components/cards/BlogCardImage.tsx
  - [x] CRITICAL: Preserve exact CSS layout and Tailwind classes - do not approximate
  - [x] Update BlogCardImage interface to accept ImageComponent and LinkComponent props:
    ```typescript
    interface BlogCardImageProps {
      // existing props...
      ImageComponent?: React.ComponentType<any>;
      LinkComponent?: React.ComponentType<any>;
    }
    ```
  - [x] Replace direct Next.js Image usage with conditional rendering:
    1. Replace `<Image` with conditional `ImageComponent ? <ImageComponent : <img`
    2. Update props to work with both Next.js Image and standard img
    3. Maintain exact aspect ratios and sizing from original
  - [x] Replace direct Next.js Link usage with conditional rendering
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with Next.js components injected - verify exact visual match to original
  - [x] Success: BlogCardImage renders identically to original with dependency injection

- [x] Extract BlogCardWide to ui-core
  - [x] Copy templates/nextjs/src/components/cards/BlogCardWide.tsx to packages/ui-core/src/components/cards/BlogCardWide.tsx
  - [x] CRITICAL: Preserve exact CSS layout and Tailwind classes - do not approximate
  - [x] Apply same dependency injection pattern as BlogCardImage
  - [x] Update interface for ImageComponent and LinkComponent props
  - [x] Abstract Next.js dependencies with conditional rendering
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with Next.js components injected - verify exact visual match to original
  - [x] Success: BlogCardWide renders identically to original with dependency injection

### Extract Specialized Cards
- [x] Extract AnimatedCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/animations/AnimatedCard.tsx to packages/ui-core/src/components/cards/AnimatedCard.tsx
  - [x] CRITICAL: Preserve exact animations and Tailwind classes - do not approximate
  - [x] Identify animation dependencies (Framer Motion, CSS animations, etc.)
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle animation library dependencies:
    1. Check if animations use Framer Motion or other libraries
    2. Keep animation logic intact - do not simplify or approximate
    3. Ensure animations work with framework-agnostic approach
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test animations work correctly with dependency injection
  - [x] Success: AnimatedCard maintains exact animation behavior and visual appearance

- [x] Extract GradientCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/variants/GradientCard.tsx to packages/ui-core/src/components/cards/GradientCard.tsx
  - [x] CRITICAL: Preserve exact gradient styles and Tailwind classes - do not approximate
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Maintain gradient calculations and CSS custom properties
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test gradient rendering across different themes/modes
  - [x] Success: GradientCard renders with exact gradients and styling

- [x] Extract AboutCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/people/AboutCard.tsx to packages/ui-core/src/components/cards/AboutCard.tsx
  - [x] CRITICAL: Preserve exact layout and Tailwind classes - do not approximate
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle person/profile image requirements with ImageComponent
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test with person data and profile images
  - [x] Success: AboutCard renders identically to original with dependency injection

### Extract Media Cards (Complex)
- [x] Extract VideoCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/VideoCard.tsx to packages/ui-core/src/components/cards/VideoCard.tsx
  - [x] CRITICAL: Preserve exact video layout and Tailwind classes - do not approximate
  - [x] Analyze video player dependencies and requirements
  - [x] Apply dependency injection pattern for:
    1. ImageComponent (for video thumbnails)
    2. LinkComponent (for video links)
    3. VideoComponent (for video player - may need custom injection pattern)
  - [x] Handle video-specific features:
    1. Video thumbnails and poster images
    2. Play button overlays and controls
    3. Video player integration (maintain existing player setup)
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test video functionality with Next.js components injected
  - [x] Success: VideoCard maintains exact video functionality and appearance

- [x] Extract ThreeJSCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/ThreeJSCard.tsx to packages/ui-core/src/components/cards/ThreeJSCard.tsx
  - [x] CRITICAL: Preserve exact 3D rendering and layout - do not approximate
  - [x] Analyze Three.js dependencies and WebGL requirements
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle Three.js specific features:
    1. WebGL canvas integration
    2. 3D scene setup and rendering
    3. Animation loops and interactions
    4. Ensure Three.js imports and setup remain intact
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test 3D rendering works correctly across frameworks
  - [x] Success: ThreeJSCard maintains exact 3D functionality and rendering

- [x] Extract CosineTerrainCard to ui-core
  - [x] Copy templates/nextjs/src/components/cards/math/CosineTerrainCard.tsx to packages/ui-core/src/components/cards/CosineTerrainCard.tsx
  - [x] CRITICAL: Preserve exact mathematical visualization and layout - do not approximate
  - [x] Analyze mathematical rendering dependencies (Canvas, SVG, etc.)
  - [x] Apply dependency injection pattern for ImageComponent and LinkComponent
  - [x] Handle mathematical visualization features:
    1. Canvas or SVG rendering for terrain
    2. Mathematical calculations and algorithms
    3. Animation and interactive features
    4. Maintain exact mathematical accuracy
  - [x] Update utility imports to use ui-core relative paths
  - [x] Test mathematical visualizations render correctly
  - [x] Success: CosineTerrainCard maintains exact mathematical visualization behavior

### Extract Layout Cards
- [ ] Extract CardCarousel to ui-core
  - [ ] Copy templates/nextjs/src/components/cards/layouts/CardCarousel.tsx to packages/ui-core/src/components/layouts/CardCarousel.tsx
  - [ ] CRITICAL: Preserve exact carousel behavior and Tailwind classes - do not approximate
  - [ ] Analyze carousel dependencies (Swiper, custom carousel logic, etc.)
  - [ ] Apply dependency injection pattern for:
    1. ImageComponent (for carousel item images)
    2. LinkComponent (for carousel item links)
    3. Maintain carousel library integration if used
  - [ ] Handle carousel-specific features:
    1. Touch/swipe gestures
    2. Navigation arrows and pagination
    3. Auto-play and transition animations
    4. Responsive breakpoints for carousel behavior
  - [ ] Update utility imports to use ui-core relative paths
  - [ ] Test carousel functionality across different screen sizes
  - [ ] Success: CardCarousel maintains exact carousel functionality and behavior

### Update Exports and Testing
- [x] Update component exports
  - [x] Add all new cards to packages/ui-core/src/components/cards/index.ts:
    ```typescript
    // Blog variants
    export { BlogCardImage } from './BlogCardImage';
    export { BlogCardWide } from './BlogCardWide';
    
    // Specialized cards
    export { AnimatedCard } from './AnimatedCard';
    export { GradientCard } from './GradientCard';
    export { AboutCard } from './AboutCard';
    
    // Media cards
    export { VideoCard } from './VideoCard';
    export { ThreeJSCard } from './ThreeJSCard';
    export { CosineTerrainCard } from './CosineTerrainCard';
    ```
  - [x] Add CardCarousel to packages/ui-core/src/components/layouts/index.ts:
    ```typescript
    export { CardCarousel } from './CardCarousel';
    ```

- [ ] Comprehensive testing of extracted cards
  - [ ] Build ui-core package: `pnpm build`
  - [ ] Create comprehensive test page for all new cards
  - [ ] Test each card with Next.js Image and Link components injected
  - [ ] Verify exact visual and functional match to originals
  - [ ] Test responsive behavior and animations
  - [ ] Test video and 3D functionality where applicable
  - [ ] Success: All extracted cards render and function identically to originals

## Phase 2 Final: Comprehensive Testing Infrastructure

### Create Test Suite for Next.js Integration
- [ ] Create comprehensive test page for all extracted components
  - [ ] Create templates/nextjs/src/app/test-all-cards/page.tsx
  - [ ] Import and test ALL extracted cards with Next.js Image and Link injection
  - [ ] Include edge cases, different props, responsive behavior
  - [ ] Test dark/light mode compatibility for all cards
  - [ ] Test animations, videos, 3D rendering where applicable
  - [ ] Document visual regression testing approach

- [ ] Create unit/integration tests (high priority for accuracy)
  - [ ] Set up testing infrastructure in ui-core package
  - [ ] Create tests for each component with mocked Image/Link components
  - [ ] Test dependency injection patterns work correctly
  - [ ] Test component props and interfaces
  - [ ] Test responsive behavior programmatically
  - [ ] Success: Comprehensive test coverage prevents regressions

- [ ] Performance testing and optimization
  - [ ] Test bundle size impact of extracted components
  - [ ] Verify no performance degradation from dependency injection
  - [ ] Test lazy loading and code splitting compatibility
  - [ ] Success: Performance maintained or improved over originals

## Phase 3: Framework-Specific Adapter Creation

### Create Adapter Infrastructure
- [ ] Set up ui-adapters workspace structure
  - [ ] Create packages/ui-adapters/ directory structure
  - [ ] Create packages/ui-adapters/package.json for monorepo workspace
  - [ ] Set up shared types and utilities for adapters
  - [ ] Create packages/ui-adapters/shared/ for common adapter utilities

### Next.js Adapter Package
- [ ] Create packages/ui-adapters/nextjs/ package
  - [ ] Create packages/ui-adapters/nextjs/package.json with Next.js peer dependencies
  - [ ] Create packages/ui-adapters/nextjs/src/adapters.ts:
    ```typescript
    import Image from 'next/image';
    import Link from 'next/link';
    
    export const NextJSImageAdapter = Image;
    export const NextJSLinkAdapter = Link;
    export const NextJSVideoAdapter = 'video'; // or custom video component
    
    export const nextjsAdapters = {
      ImageComponent: NextJSImageAdapter,
      LinkComponent: NextJSLinkAdapter,
      VideoComponent: NextJSVideoAdapter,
    };
    ```
  - [ ] Create optimized component wrappers that pre-inject Next.js components
  - [ ] Test adapter integration with all ui-core components
  - [ ] Success: Next.js adapter provides optimal Next.js component integration

### Astro Adapter Package
- [ ] Create packages/ui-adapters/astro/ package
  - [ ] Create packages/ui-adapters/astro/package.json with Astro peer dependencies
  - [ ] Research Astro's Image and Link components for React islands
  - [ ] Create packages/ui-adapters/astro/src/adapters.ts with Astro components
  - [ ] Handle Astro's island architecture and hydration requirements
  - [ ] Create Astro-optimized component wrappers
  - [ ] Test adapter with Astro React islands
  - [ ] Success: Astro adapter works correctly with island architecture

### React Router Adapter Package  
- [ ] Create packages/ui-adapters/react-router/ package
  - [ ] Create packages/ui-adapters/react-router/package.json with React Router peer dependencies
  - [ ] Create packages/ui-adapters/react-router/src/adapters.ts:
    ```typescript
    import { Link as RouterLink } from 'react-router-dom';
    
    export const ReactRouterImageAdapter = 'img';
    export const ReactRouterLinkAdapter = RouterLink;
    export const ReactRouterVideoAdapter = 'video';
    
    export const reactRouterAdapters = {
      ImageComponent: ReactRouterImageAdapter,
      LinkComponent: ReactRouterLinkAdapter, 
      VideoComponent: ReactRouterVideoAdapter,
    };
    ```
  - [ ] Create React Router optimized component wrappers
  - [ ] Test SPA navigation and client-side routing
  - [ ] Success: React Router adapter provides SPA-optimized components

### Pure React Adapter Package
- [ ] Create packages/ui-adapters/react/ package
  - [ ] Create packages/ui-adapters/react/package.json with minimal React dependencies
  - [ ] Create packages/ui-adapters/react/src/adapters.ts with standard HTML elements
  - [ ] Create wrappers for pure React usage (no framework)
  - [ ] Test components work in vanilla React applications
  - [ ] Success: Pure React adapter works without any framework dependencies

### Adapter Testing and Validation
- [ ] Create comprehensive adapter test suite
  - [ ] Test each adapter package independently
  - [ ] Verify optimal component selection for each framework
  - [ ] Test performance characteristics of each adapter
  - [ ] Test bundle size impact of each adapter
  - [ ] Cross-framework compatibility testing
  - [ ] Success: All adapters provide framework-optimal component integration

## Phase 4: Convenience Layer Development

### Smart Provider System
- [ ] Create packages/ui-providers/ package structure
  - [ ] Create packages/ui-providers/package.json
  - [ ] Create framework detection utilities
  - [ ] Create packages/ui-providers/src/UIProvider.tsx:
    ```typescript
    interface UIProviderProps {
      framework?: 'nextjs' | 'astro' | 'react-router' | 'react';
      children: React.ReactNode;
      customAdapters?: Partial<AdapterConfig>;
    }
    
    export const UIProvider: React.FC<UIProviderProps> = ({
      framework = 'auto',
      children,
      customAdapters
    }) => {
      // Auto-detect framework or use provided framework
      // Inject appropriate adapters into context
    };
    ```

- [ ] Create hooks for accessing injected components
  - [ ] Create packages/ui-providers/src/hooks/useUIComponents.ts
  - [ ] Provide easy access to framework-appropriate components
  - [ ] Support custom adapter overrides
  - [ ] Success: Provider system eliminates manual component injection

### Auto-injection Utilities
- [ ] Create automatic component injection utilities
  - [ ] Create packages/ui-providers/src/utils/autoInject.ts
  - [ ] Automatically detect environment and inject appropriate components
  - [ ] Support build-time optimization where possible
  - [ ] Create development vs production injection strategies
  - [ ] Success: Zero-configuration component usage

### Developer Experience Enhancements
- [ ] Create TypeScript utilities for better DX
  - [ ] Provide typed component exports for each framework
  - [ ] Create framework-specific type definitions
  - [ ] Add IDE auto-completion support
  - [ ] Create comprehensive JSDoc documentation
  - [ ] Success: Excellent developer experience across all frameworks

## Phase 5: Pre-configured Framework Packages

### Next.js Package (@manta-templates/nextjs)
- [ ] Create packages/nextjs/ pre-configured package
  - [ ] Create packages/nextjs/package.json with Next.js optimizations
  - [ ] Pre-inject all ui-core components with Next.js adapters
  - [ ] Create packages/nextjs/src/index.ts:
    ```typescript
    // Pre-configured components with Next.js injection
    import { BlogCard as CoreBlogCard } from '@manta-templates/ui-core';
    import { nextjsAdapters } from '@manta-templates/ui-adapters/nextjs';
    
    export const BlogCard = (props) => (
      <CoreBlogCard {...props} {...nextjsAdapters} />
    );
    // ... all other components
    ```
  - [ ] Optimize bundle size and tree-shaking
  - [ ] Test with Next.js applications
  - [ ] Success: Drop-in Next.js package with optimal performance

### Astro Package (@manta-templates/astro)
- [ ] Create packages/astro/ pre-configured package
  - [ ] Create packages/astro/package.json with Astro optimizations
  - [ ] Pre-inject all ui-core components with Astro adapters
  - [ ] Handle Astro's island hydration requirements
  - [ ] Test with Astro + React islands
  - [ ] Success: Drop-in Astro package with island optimization

### React Router Package (@manta-templates/react-router)
- [ ] Create packages/react-router/ pre-configured package
  - [ ] Create packages/react-router/package.json with React Router optimizations
  - [ ] Pre-inject all ui-core components with React Router adapters
  - [ ] Test with React Router applications
  - [ ] Success: Drop-in React Router package with SPA optimization

### Pure React Package (@manta-templates/react)
- [ ] Create packages/react/ pre-configured package
  - [ ] Create packages/react/package.json with minimal dependencies
  - [ ] Pre-inject all ui-core components with standard HTML elements
  - [ ] Test with vanilla React applications
  - [ ] Success: Drop-in React package with zero framework dependencies

### Package Testing and Distribution
- [ ] Create comprehensive package testing suite
  - [ ] Test each pre-configured package in real applications
  - [ ] Verify bundle sizes and performance characteristics
  - [ ] Test package installation and import patterns
  - [ ] Create sample applications for each framework
  - [ ] Document usage patterns and migration guides
  - [ ] Success: All packages ready for production use

## Final Integration and Documentation

### Complete Integration Testing
- [ ] End-to-end testing across all frameworks
  - [ ] Create test applications for each framework
  - [ ] Verify identical visual and functional behavior
  - [ ] Test migration paths between packages
  - [ ] Performance benchmarking across frameworks
  - [ ] Success: Consistent experience across all frameworks

### Documentation and Developer Guides
- [ ] Create comprehensive documentation
  - [ ] Architecture decision records (ADRs)
  - [ ] Framework-specific usage guides
  - [ ] Migration guides from existing implementations
  - [ ] Performance optimization guides
  - [ ] Troubleshooting and FAQ documentation
  - [ ] Success: Complete documentation ecosystem

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


## Phase 6: Template Distribution

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