# High-Level Design: Electron Template

## Overview
Create an Electron template that combines the React template's UI/content system with the rummage app's proven Electron architecture.

## Architecture

### Core Structure
```
templates/electron/
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # Electron preload scripts  
│   └── renderer/       # React UI (from React template)
├── content/            # Markdown content system
├── electron.vite.config.ts
├── package.json
└── README.md
```

### Technology Stack
- **Electron**: Desktop application framework
- **electron-vite**: Modern build tooling (from rummage)
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling
- **Content System**: Markdown-based content with hot reload
- **Vite**: Fast development and building

### Key Components

#### 1. Electron Architecture (from rummage)
- **Main Process**: Window management, native OS integration
- **Preload Scripts**: Secure IPC bridge
- **Renderer Process**: React application

#### 2. UI System (from React template)
- React Router for navigation
- ui-core component library
- Theme system (light/dark modes)
- Content provider and hooks

#### 3. Content System Integration
- Same Vite plugin architecture as React template
- Hot reload for content changes
- Markdown processing with rehype/remark

## Technical Requirements

### Build Configuration
- electron-vite for multi-target builds (main/preload/renderer)
- Separate output directories (out/main, out/preload, out/renderer)
- Native dependencies handling (if needed)
- TypeScript compilation for all processes

### Development Experience
- `pnpm dev` for development with hot reload
- `pnpm build` for production builds
- `pnpm package` for distributable creation
- Same content editing experience as React template

### Security & Best Practices
- Context isolation enabled
- Node.js integration disabled in renderer
- Secure IPC patterns via preload scripts
- Type-safe communication between processes

## Deliverables

1. **Template Structure**: Complete Electron template in `templates/electron/`
2. **Documentation**: README with quickstart instructions
3. **Build System**: Working electron-vite configuration
4. **Content System**: Full markdown content integration
5. **Deployment**: degit-compatible template structure

## Success Criteria

- [x] Template deploys via `npx degit manta-digital/manta-templates/templates/electron`
- [x] Development server runs with hot reload
- [x] Content system works identically to React template
- [x] Application builds and packages successfully
- [x] All UI components render correctly in Electron context
- [x] Theme switching works in desktop environment