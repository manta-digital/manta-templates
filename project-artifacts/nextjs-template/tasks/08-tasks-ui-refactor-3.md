
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


