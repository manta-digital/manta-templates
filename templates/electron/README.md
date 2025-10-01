# Electron Template

A modern Electron application built with React, TypeScript, and Tailwind CSS that showcases the ui-core component library with a flexible content system for desktop applications.

## 🚀 Quick Start

### Option 1: Using degit (Recommended)
```bash
npx degit manta-digital/manta-templates/templates/electron my-electron-app
cd my-electron-app
pnpm install
pnpm dev
```

### Option 2: Clone and extract
```bash
git clone https://github.com/manta-digital/manta-templates.git
cp -r manta-templates/templates/electron my-electron-app
cd my-electron-app
rm -rf .git
pnpm install
pnpm dev
```

### Next Steps
- The Electron app will launch with hot reload enabled
- Edit `src/pages/` to modify UI content
- Customize themes in `src/index.css`
- Add content in the `content/` directory
- Build for distribution with `pnpm build && pnpm package`

## ✨ What's Included

- **Electron 37** with secure architecture (main/preload/renderer)
- **React 19** with TypeScript for the renderer process
- **Vite** for fast development and building via electron-vite
- **Tailwind CSS 4** for styling with custom themes
- **Content System** - Markdown-based content with hot reload
- **Theme System** - Light/dark modes + custom color themes
- **Component Library** - Pre-built UI components from ui-core
- **Router** - React Router with HashRouter for Electron compatibility
- **Build System** - Production packaging with electron-builder

## 🔧 Development

### Scripts
```bash
pnpm dev          # Start development server with Electron app
pnpm build        # Build for production
pnpm package      # Create distributable packages
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint code linting
```

### Architecture
```
src/
├── main/         # Electron main process
├── preload/      # Secure IPC bridge
├── renderer/     # React app entry point
├── pages/        # React pages/routes
├── components/   # Custom React components
├── lib/          # UI core library and utilities
└── content/      # Content management
```

## 📱 Electron Features

### Secure Architecture
- **Context Isolation**: Enabled for security
- **Node Integration**: Disabled in renderer
- **Preload Scripts**: Secure IPC communication bridge
- **CSP Headers**: Content Security Policy in production

### Native Menu
The template includes a minimal native menu example:

```typescript
// Platform-specific behavior:
// - macOS: Menu appears in system menu bar (always visible)
// - Windows/Linux: Menu hidden by default, press Alt to toggle

// Keyboard shortcuts work on all platforms:
// - Cmd/Ctrl+N: New file example
// - Cmd/Ctrl+O: Open file example  
// - F12: Toggle Developer Tools
// - Cmd/Ctrl+R: Reload application
// - Cmd/Ctrl+Q: Quit application
```

Extend the menu in `src/main/main.ts` for your app's specific needs, or delete the entire menu section if you prefer no native menu.

### IPC Examples
The template includes examples of secure communication between main and renderer:

```typescript
// In renderer (React components)
const result = await window.electronAPI.ping()
const version = await window.electronAPI.getAppVersion()
```

### Window Management
- Responsive window sizing (1200x800 default)
- Auto-hide menu bar (Windows/Linux: Alt to toggle, macOS: system menu bar)
- Platform-specific behaviors
- Ready-to-show pattern for smooth startup

## 🎨 UI System

### Components
The component library lives in `src/lib/ui-core/`. These components work seamlessly in Electron:

```typescript
import { ArticleCard, ProjectCard, QuoteCard } from './lib/ui-core/components/cards'
import { ThemeToggle, ColorSelector } from './lib/ui-core/components/ui'

<ProjectCard content={projectData} />
<QuoteCard content={quoteData} />
<ThemeToggle />
```

### Themes
The theme system uses CSS custom properties and works perfectly in Electron:

```css
/* Custom theme in src/index.css */
[data-palette="custom"] {
  --color-accent-9: #your-brand-color;
  --color-background: #your-bg-color;
}
```

Built-in themes:
- **Light/Dark**: System preference aware
- **Custom Examples**: Forest, Banana, Sunset themes included
- **Color Selector**: Runtime theme switching

### Content System
Add markdown content in the `content/` directory:

```markdown
<!-- content/projects/my-project.md -->
---
title: "My Desktop App"
description: "Built with Electron"
image: "/images/my-app.png"
---

Content here...
```

The content system provides hot reload during development.

## 📦 Building & Distribution

### Production URL Handling

This template uses a custom `app://` protocol for production builds, ensuring proper asset loading and routing without hash-based URLs. **No special configuration required** - it works automatically:

- **Development**: Uses `localhost:5173` with Vite dev server and hot reload
- **Production**: Uses `app://` protocol for packaged apps with proper path resolution

This approach provides:
- ✅ Root-absolute URLs work correctly (`/assets/image.png`)
- ✅ React Router with BrowserRouter (no `#` hashes needed)
- ✅ Secure path handling with traversal attack prevention
- ✅ Standard web development patterns

### Development Build
```bash
pnpm build
```
Creates optimized bundles in `out/` directory.

### Package for Distribution
```bash
pnpm package
```
Creates platform-specific distributables:
- **macOS**: DMG file in `dist/`
- **Windows**: NSIS installer in `dist/`
- **Linux**: AppImage, deb, rpm in `dist/` (configurable)

### Testing Production Builds

To test the packaged app locally (macOS example):
```bash
pnpm build
pnpm package
./dist/mac-arm64/electron-template.app/Contents/MacOS/electron-template
```

The app will launch with the `app://` protocol. Open DevTools (F12) and check:
- Console: Should show no `ERR_FILE_NOT_FOUND` errors
- Network tab: Should show `app://` URLs being loaded
- Verify all assets, routing, and navigation work correctly

### Electron Builder Configuration
The template includes `electron-builder` configuration in `package.json`:

```json
{
  "build": {
    "appId": "com.electron-template.app",
    "files": ["out/**", "resources/**"],
    "mac": { "target": ["dmg"] },
    "win": { "target": ["nsis"] }
  }
}
```

## 🔧 Customization

### Add Electron Features
Extend the main process (`src/main/main.ts`) to add:
- Native menus
- System tray
- File system access
- Native dialogs
- Auto-updater

### Router Configuration
Uses BrowserRouter with custom app:// protocol:
```typescript
import { BrowserRouter as Router } from 'react-router-dom'
// Works seamlessly with app:// protocol - no hash routing needed
```

### Security Configuration
Update CSP and security settings in the main process as needed for your app's requirements.

## 🚀 Deployment

### Ready for Distribution
The template creates production-ready Electron apps:
- Code signing ready (add certificates)
- Auto-updater ready (configure update server)
- Multi-platform builds supported
- Optimized bundle sizes with code splitting

### Recommended Workflow
1. Develop with `pnpm dev`
2. Test builds with `pnpm build && pnpm package`
3. Configure code signing certificates
4. Set up CI/CD for multi-platform builds
5. Deploy with electron-builder and update servers

## 📚 Learn More

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-vite Documentation](https://electron-vite.org/)
- [UI Core Components](../react/src/lib/ui-core/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

## 🤝 Contributing

This template is part of the manta-templates monorepo. Issues and contributions welcome!

## 📄 License

MIT - Build amazing desktop apps! 🚀