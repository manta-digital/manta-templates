---
docType: intro-guide  
platform: electron  
audience: [ai, human]  
features: [react, vite, desktop, native-modules, secure-apis, production-builds]  
purpose: Guide to building accessible, performant desktop apps with Electron using React and Vite  
---

# Electron + React + Vite Guide

## Summary

Electron enables modern desktop application development using web technologies, combining Node.js APIs and Chromium's rendering engine. When paired with React and Vite, Electron projects gain fast hot-reloading, a modular front-end, and access to OS-level features for robust cross-platform apps.

## Prerequisites

- Node.js ≥ 18  
- Electron v28+  
- Vite v4+  
- React v18+  
- Basic knowledge of JavaScript, npm, and ES Modules

## What's Included

This guide provides resources and reference patterns for developing scalable Electron desktop apps with React+Vite integration:

### Core Documentation

- **`electron-react-vite-setup.md`**  
  - Boilerplate for app structure (main, preload, renderer)
  - Dev and production build commands
  - Secure context isolation and IPC messaging patterns
  - Hot-reload setup for React UI

- **`electron-api-reference.md`**  
  - Native Node.js API patterns (filesystem, OS, dialogs)
  - Secure IPC recipes with preload scripts
  - Packaging and code-signing best practices
  - Environment variable management

## Key Features

- **Fast Hot Reloads**  
  - Instant UI updates with Vite’s dev server for the renderer process.

- **Secure IPC and Native Modules**  
  - Patterns for safe main-preload-renderer communication, preventing remote code execution risk.

- **Optimized Production Builds**  
  - Guidance for packaging—cross-platform builds, code signing for macOS/Windows, auto-updates.

- **Modern React Integration**  
  - Out-of-the-box support for JSX, hooks, context, and React-based state management.

- **Direct Access to Desktop APIs**  
  - Native dialogs, file operations, system notifications.

## Quick Start
The following Quick Start and app creation method is provided for reference only.  In general manta-templates Electron template should be used as the starting point.


```bash
npm create electron-app my-app --template=react-vite
cd my-app
npm run dev
```

**Sample app structure:**

```
my-app/
│
├─ main/
│   └─ main.ts         # Electron main process
├─ preload/
│   └─ preload.ts      # Secure exposes for renderer (IPC, APIs)
├─ renderer/
│   └─ App.tsx         # React UI powered by Vite
├─ public/
│   └─ index.html
└─ package.json
```

**IPC Example (preload.ts):**
```ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, (_, ...args) => func(...args))
});
```

## Next Steps

1. Review `electron-react-vite-setup.md` for scaffolding, dev workflow, and security patterns.
2. Use `electron-api-reference.md` for quick access to desktop API recipes.
3. Implement context isolation and secure IPC routines in all production apps.
4. Explore code signing, packaging, and auto-update solutions for distributions.

## External Resources

- [Electron Documentation](https://www.electronjs.org/docs/latest/)
- [Vite + Electron Example](https://github.com/electron-vite/electron-vite-react)
- [Electron Security Checklist](https://www.electronjs.org/docs/latest/tutorial/security)
- [React Documentation](https://react.dev/)
- [Code Signing Overview](https://www.electronjs.org/docs/latest/tutorial/code-signing)

***

This guide establishes a best-practices foundation for secure, fast Electron desktop app development using React and Vite, providing reference implementations and patterns for scaling, packaging, and native integration.

Sources
