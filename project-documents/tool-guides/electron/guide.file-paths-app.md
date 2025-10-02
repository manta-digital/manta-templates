---
layer: tool-guide
tool: electron
topic: file-paths-production
category: protocols
difficulty: intermediate
tags: [electron, app-protocol, production, file-paths, routing]
status: implemented
relatedGuides: []
---

# Stabilizing Electron Template with `app://` Protocol

This guide documents how to solve the **broken paths problem** in production Electron apps when using React/Next with markdown-driven content.

---

## Problem We Are Solving

In development, your renderer runs at `http://localhost:...`. Absolute links like `/images/foo.png` work fine.

In production, Electron loads `file://.../index.html`. Under `file://`, `/images/foo.png` points to the **filesystem root**, breaking all root-absolute links. Libraries that expect a real origin (`fetch('/x')`, CSS `url(/x)`, dynamic imports, BrowserRouter) also fail.

We want **one set of URLs** (e.g. `/images/foo.png`) that work consistently in:

- Web (Next.js / React dev server)
- Electron dev
- Electron prod (packaged)

---

## Solution: Option B (`app://` Protocol)

Instead of relying on `file://`, we define a secure, standard `app://` protocol. We then load `app://index.html` and serve files out of the packaged renderer folder.

Advantages:

- Keep root-absolute URLs (`/images/foo.png`) in content and markdown
- Web and Electron behave identically
- BrowserRouter and deep links work (no need for HashRouter)
- Avoids `file://` quirks (CORS, CSS, dynamic imports)

---

## Implementation

### 1. Main process setup

```js
// main.ts / main.js
import { app, BrowserWindow, protocol } from 'electron';
import path from 'node:path';

function registerAppProtocol() {
  protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true }
  }]);

  app.whenReady().then(() => {
    protocol.registerFileProtocol('app', (request, callback) => {
      const url = new URL(request.url);
      const pathname = decodeURIComponent(url.pathname); // '/index.html' or '/images/x.png'

      const root = path.join(process.resourcesPath, 'renderer');
      const resolved = path.normalize(path.join(root, pathname || '/index.html'));

      if (!resolved.startsWith(root)) {
        return callback({ error: -6 }); // net::ERR_FILE_NOT_FOUND
      }
      callback({ path: resolved });
    });
  });
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL('app://index.html');
}

app.once('ready', () => {
  registerAppProtocol();
  createMainWindow();
});
```

---

### 2. Packaging with `electron-builder`

Ensure your renderer build is packaged to `resources/renderer`.

```json
{
  "name": "myapp",
  "productName": "MyApp",
  "version": "0.1.0",
  "main": "dist/main.cjs",
  "build": {
    "appId": "com.yourco.myapp",
    "files": [
      "dist/**",
      { "from": "renderer-dist", "to": "renderer" }
    ],
    "mac": {
      "category": "public.app-category.productivity"
    }
  },
  "scripts": {
    "build:renderer": "vite build",
    "build:main": "tsc -p tsconfig.main.json",
    "build": "pnpm build:renderer && pnpm build:main && electron-builder --mac"
  }
}
```

- Configure your frontend build (`vite build` or `next export`) to output into `renderer-dist/`
- At runtime, the app serves from `process.resourcesPath/renderer`

---

### 3. Router + content

- Use **BrowserRouter** (React) or default Next routing
- Markdown/frontmatter can keep absolute URLs:  
  ```yaml
  imageFile: /images/someFile.png
  ```

---

### 4. Dev setup

Two options:

- Use Vite/Next dev server (`http://localhost:...`) during development, only switch to `app://` in production.
- Or build with `vite build --watch`, serve from `app://` in dev for parity (no HMR).

---

### 5. Handling files

- **Static assets**: put in `renderer-dist/images/...` or map an `assets` folder via `extraResources`.
- **Writable data**: always use `app.getPath('userData')`. Do not write inside `.asar` or `renderer`.

---

## Gotchas & Suggestions

- Always call `protocol.registerSchemesAsPrivileged` before `app.whenReady()`
- Guard against `../` path escapes
- If you set a Content-Security-Policy, add `app:` to allowed sources
- Keep `contextIsolation: true` and `nodeIntegration: false` for security

---

## Related ideas (are they useful?)

### `process.env['APP_PATH'] = app.getAppPath();`
- Helpful for Node-side file lookups (`fs.readFile`)
- **Does not solve renderer URL problem** → still need `app://`

### `app.getPath(...)`, `extraResources`
- ✅ Use `app.getPath('userData')` for writable files
- ✅ Use `extraResources` to package custom files
- ⚠️ Using `__dirname` + `file://` doesn’t solve absolute path issues in renderer

---

## Final Checklist

- [ ] Register `app://` scheme (secure, standard, fetch-capable)
- [ ] Map it to `process.resourcesPath/renderer`
- [ ] Package renderer output with electron-builder
- [ ] Load `win.loadURL('app://index.html')`
- [ ] Keep `/images/...` style URLs in content
- [ ] Use BrowserRouter / default Next routing
- [ ] Store writable files in `app.getPath('userData')`

This template is now stable across dev, prod, Electron, and web. 🚀
