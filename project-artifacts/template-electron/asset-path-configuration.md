---
layer: project
docType: documentation
title: Asset Path Configuration System
---

# Asset Path Configuration for UI-Core Components

## Overview

The UI-core component library uses a compile-time environment variable system to handle asset paths across different deployment targets (web vs Electron).

## Problem Solved

- **Web applications**: Use absolute paths starting with `/` (e.g., `/assets/icons/tech/react.svg`)
- **Electron applications**: Use relative paths starting with `./` (e.g., `./assets/icons/tech/react.svg`)
- **Framework-agnostic**: UI-core components work in both environments without modification

## Implementation

### Environment Variable

Components use `import.meta.env.VITE_ASSET_BASE_PATH` with fallback to `/`:

```typescript
// In ui-core components
iconBasePath = `${import.meta.env.VITE_ASSET_BASE_PATH || '/'}assets/icons/tech/`
defaultImageUrl = `${import.meta.env.VITE_ASSET_BASE_PATH || '/'}image/blog/blog-sample-image.png`
```

### Build Configuration

#### Electron (requires relative paths)
```typescript
// electron.vite.config.ts
renderer: defineViteConfig(() => ({
  base: './',
  define: {
    'import.meta.env.VITE_ASSET_BASE_PATH': JSON.stringify('./')
  },
  // ...
}))
```

#### Web Applications (default absolute paths)
```typescript
// vite.config.ts - no configuration needed
// VITE_ASSET_BASE_PATH defaults to '/' for standard web deployment
```

## Affected Components

- `TechnologyScroller`: Icon base path for technology logos
- `BlogIndexCard`: Default image URL for blog posts
- `AboutCard`: Default avatar image path

## Benefits

1. **Framework-agnostic**: UI-core components work unchanged across platforms
2. **Copy-packages compatible**: No platform-specific code in shared components
3. **Compile-time optimization**: Asset paths are resolved at build time
4. **Zero runtime overhead**: No path resolution logic at runtime
5. **Automatic**: Works for all asset references without manual overrides

## Usage for New Components

When creating components that reference static assets:

```typescript
// ✅ Good - Environment-aware
const defaultIcon = `${import.meta.env.VITE_ASSET_BASE_PATH || '/'}icons/default.svg`;

// ❌ Bad - Hardcoded absolute path
const defaultIcon = '/icons/default.svg';

// ❌ Bad - Hardcoded relative path
const defaultIcon = './icons/default.svg';
```

## Future Templates

New templates requiring relative paths should add the same `define` configuration:

```typescript
define: {
  'import.meta.env.VITE_ASSET_BASE_PATH': JSON.stringify('./')
}
```

Templates using standard web deployment can omit this configuration.