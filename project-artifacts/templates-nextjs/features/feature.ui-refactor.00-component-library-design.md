# Component Library Architecture Design

## Overview

This document outlines the architectural approach for creating a reusable component library that supports multiple frameworks (Next.js, React Router, Astro) while maintaining a single source of truth for component logic.

## Proposed Directory Structure

```
{root}/
├── packages/
│   ├── ui-core/              # Your shared component library
│   │   ├── src/
│   │   │   ├── components/   # All your components
│   │   │   ├── hooks/        # Shared React hooks
│   │   │   ├── utils/        # Utility functions
│   │   │   └── index.ts      # Barrel exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui-adapters/          # Framework-specific adapters (optional)
│       ├── nextjs/
│       ├── react-router/
│       └── astro/
├── templates/
│   ├── nextjs/               # Next.js implementation
│   ├── react/                # React + React Router
│   └── astro/                # Astro with React islands
└── package.json              # Workspace root
```

## Design Strategy

### 1. Component Abstraction Patterns

**Create framework-agnostic components** with dependency injection for routing/image concerns:

```typescript
// packages/ui-core/src/components/Button.tsx
interface ButtonProps {
  // Keep all your existing props
  href?: string;
  LinkComponent?: React.ComponentType<any>; // Injected Link
  onClick?: () => void;
}

// packages/ui-core/src/components/Image.tsx
interface ImageProps {
  src: string;
  alt: string;
  ImageComponent?: React.ComponentType<any>; // Injected Image
  // ... other props
}
```

### 2. Adapter Pattern for Framework-Specific Features

**Next.js Adapter** (`packages/ui-adapters/nextjs/`):
```typescript
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Button as CoreButton } from '@yourorg/ui-core'

export const Button = (props) => (
  <CoreButton {...props} LinkComponent={NextLink} />
)

export const Image = (props) => (
  <CoreImage {...props} ImageComponent={NextImage} />
)
```

**React Router Adapter** (`packages/ui-adapters/react-router/`):
```typescript
import { Link } from 'react-router-dom'
import { Button as CoreButton } from '@yourorg/ui-core'

export const Button = (props) => (
  <CoreButton {...props} LinkComponent={Link} />
)

// Custom image component with lazy loading
export const Image = (props) => (
  <CoreImage {...props} ImageComponent={LazyImage} />
)
```

## Work Ramifications & Migration Strategy

### Phase 1: Extract Core Components
1. **Move components** from `templates/nextjs` to `packages/ui-core`
2. **Abstract Next.js dependencies** - make Link/Image components configurable
3. **Update Next.js template** to use the new package structure
4. **Test thoroughly** - ensure Next.js template still works

### Phase 2: Create Adapters
1. **Build Next.js adapter** that wraps your core components
2. **Build React Router adapter** with alternative implementations
3. **Create shared configuration** for things like theme, Tailwind classes

### Phase 3: Template Creation
1. **React template** - Set up Vite + React Router + your adapted components
2. **Astro template** - Configure React islands + your components

## Technical Considerations

### Package Management
Use a monorepo tool:
```json
// root package.json
{
  "workspaces": [
    "packages/*",
    "templates/*"
  ]
}
```

### Component Design Patterns

**Provider Pattern** for framework-specific services:
```typescript
// packages/ui-core/src/providers/RouterProvider.tsx
const RouterContext = createContext<{
  Link: ComponentType<any>;
  navigate: (path: string) => void;
}>()

// In each template, provide the appropriate implementation
```

**Polymorphic Components** for maximum flexibility:
```typescript
interface ButtonProps<T extends ElementType = 'button'> {
  as?: T;
  // ... other props
}
```

### Bundle Considerations
- **Tree shaking** - Use barrel exports carefully
- **Peer dependencies** - React, Tailwind should be peer deps
- **Build targets** - ESM + CJS for maximum compatibility

## Astro Compatibility
Astro works great with this approach:
```astro
---
// Astro component
import { Button } from '@yourorg/ui-adapters/astro'
---

<Button client:load href="/about">
  Click me
</Button>
```

## Benefits of This Approach

1. **Reusable components** across all frameworks
2. **Maintainable** - single source of truth for component logic
3. **Framework flexibility** - can easily add new template types
4. **Gradual migration** - can migrate one component at a time
5. **Type safety** - TypeScript works across the entire system

## Potential Challenges

1. **Initial setup complexity** - more moving parts
2. **Build coordination** - need to rebuild ui-core when templates change
3. **Testing complexity** - need to test components in multiple contexts
4. **Bundle size** - might be slightly larger due to abstraction layers

## Next Steps

This architecture provides a solid foundation for component reusability across multiple frameworks while maintaining development simplicity. The key is to start with the monorepo structure and gradually migrate components while keeping existing templates functional.