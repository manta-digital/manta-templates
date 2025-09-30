---
layer: project
docType: slice
sliceIndex: 100
sliceName: production-paths
priority: P0
effortLevel: 3
frameworks: [electron, react, vite]
platforms: [electron]
tools: [electron-builder, vite]
dependencies: []
crossSliceDependencies: []
---

# Slice 100: Electron Production Paths

## Overview

This slice implements the `app://` protocol solution to resolve the fundamental file path issue in production Electron builds. The problem occurs when Electron loads `file://.../index.html` in production, causing all root-absolute URLs (like `/images/foo.png`) to point to the filesystem root instead of the app's resources, breaking asset loading, routing, and API calls.

## Problem Statement

### Current State
- **Development**: Renderer runs at `http://localhost:5173` - root-absolute URLs work correctly
- **Production**: Electron loads `file://` protocol - root-absolute URLs break completely
- **Impact**: Static assets, BrowserRouter, dynamic imports, and fetch calls fail in production

### Root Cause
The `file://` protocol has inherent limitations:
- No concept of "origin" for relative/absolute path resolution
- CORS restrictions prevent many modern web APIs
- Browser security model treats `file://` differently than HTTP origins

## Solution Architecture

### Core Approach: Custom `app://` Protocol
Replace `file://` loading with a secure, custom `app://` protocol that:
- Provides consistent URL behavior across dev/prod environments
- Maintains web-standard behavior for routing and asset loading
- Enables secure file serving from packaged app resources

### Technical Design

#### 1. Protocol Registration
```typescript
// Location: src/main/protocol-handler.ts (new file)
import { protocol } from 'electron';
import path from 'node:path';

export function registerAppProtocol() {
  // Must be called before app.whenReady()
  protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true
    }
  }]);
}

export function setupAppProtocolHandler() {
  protocol.registerFileProtocol('app', (request, callback) => {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    // Map app:// requests to packaged renderer files
    const root = path.join(process.resourcesPath, 'renderer');
    const resolved = path.normalize(path.join(root, pathname || '/index.html'));

    // Security: prevent path traversal attacks
    if (!resolved.startsWith(root)) {
      return callback({ error: -6 }); // net::ERR_FILE_NOT_FOUND
    }

    callback({ path: resolved });
  });
}
```

#### 2. Main Process Integration
```typescript
// Location: src/main/main.ts (modifications)
import { registerAppProtocol, setupAppProtocolHandler } from './protocol-handler';

// Before app.whenReady()
registerAppProtocol();

app.whenReady().then(() => {
  setupAppProtocolHandler();
  createWindow();
});

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    // ... existing config
  });

  // Production: use app:// protocol
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL('app://index.html');
  } else {
    // Development: continue using localhost
    mainWindow.loadURL('http://localhost:5173');
  }
}
```

#### 3. Build Configuration Updates
```json
// Location: electron.vite.config.ts (modifications)
{
  "build": {
    "rollupOptions": {
      "output": {
        "format": "es"
      }
    },
    "outDir": "../dist-electron/renderer"
  }
}
```

```json
// Location: package.json (build configuration)
{
  "build": {
    "files": [
      "dist-electron/main/**",
      "dist-electron/preload/**",
      {
        "from": "dist-electron/renderer",
        "to": "renderer"
      }
    ],
    "extraResources": [
      {
        "from": "src/assets",
        "to": "renderer/assets"
      }
    ]
  }
}
```

## Implementation Details

### File Structure Changes
```
templates/electron/
├── src/
│   ├── main/
│   │   ├── main.ts (modified)
│   │   └── protocol-handler.ts (new)
│   ├── renderer/
│   │   └── (existing React app - no changes needed)
│   └── assets/ (ensure proper packaging)
├── electron.vite.config.ts (modified)
└── package.json (build config modified)
```

### Development vs Production Behavior
- **Development**: Continue using `http://localhost:5173` for hot reload
- **Production**: Switch to `app://index.html` for consistent path behavior
- **Content**: No changes needed - keep root-absolute URLs in markdown/components

### Security Considerations
- Path traversal protection via `path.normalize()` and root checking
- Maintain `contextIsolation: true` and `nodeIntegration: false`
- CSP updates may be needed to allow `app:` scheme

## Data Flow

### Asset Loading Flow
1. React component requests `/images/logo.png`
2. In development: resolves to `http://localhost:5173/images/logo.png`
3. In production: resolves to `app://images/logo.png`
4. Custom protocol handler maps to `process.resourcesPath/renderer/images/logo.png`
5. File served with proper MIME types and headers

### Routing Flow
1. User navigates to `/about` in browser
2. BrowserRouter handles client-side routing (no hash required)
3. Deep links work correctly on app startup
4. No changes needed to existing routing code

## Cross-Slice Dependencies

### Dependencies
- None - this is foundational infrastructure

### Provides
- Stable file path resolution for all future template features
- Web-standard routing capability
- Asset loading consistency across environments

## Testing Strategy

### Manual Testing
1. Build and package Electron app
2. Verify assets load correctly in packaged app
3. Test deep linking and browser navigation
4. Verify markdown content renders with correct image paths

### Automated Testing
- Add E2E test for packaged app asset loading
- Unit tests for protocol handler path resolution
- Security tests for path traversal prevention

## Migration Impact

### Breaking Changes
- None for end users
- Template builds will use new protocol in production

### Compatibility
- Existing content and components work unchanged
- No API changes for renderer code
- Maintains compatibility with React/Next.js patterns

## Effort Estimation
**Level 3** - Moderate complexity requiring:
- New protocol handler implementation
- Build configuration updates
- Testing across dev/prod environments
- Documentation updates

## Success Criteria
- [ ] Production Electron app loads with `app://` protocol
- [ ] All static assets load correctly in packaged app
- [ ] BrowserRouter navigation works without hash
- [ ] Markdown content displays images properly
- [ ] Deep links work on app startup
- [ ] Development workflow unchanged
- [ ] Build process creates proper package structure
- [ ] Security: path traversal attacks prevented

## Rollback Plan
If issues arise:
1. Revert main.ts to use `file://` protocol
2. Fall back to HashRouter for navigation
3. Use relative paths for critical assets
4. Document remaining limitations for future fix

## Documentation Updates
- Update electron template README with new protocol explanation
- Add troubleshooting guide for asset loading issues
- Document CSP requirements if needed
- Update build process documentation