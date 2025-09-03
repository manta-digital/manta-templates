# React Template

A modern React application built with Vite, TypeScript, and Tailwind CSS that showcases the ui-core component library with a flexible content system.

## 🚀 Quick Start

### Option 1: Using degit (Recommended)
```bash
npx degit manta-digital/manta-templates/templates/react my-react-app
cd my-react-app
pnpm install
pnpm dev
```

### Option 2: Clone and extract
```bash
git clone https://github.com/manta-digital/manta-templates.git
cp -r manta-templates/templates/react my-react-app
cd my-react-app
rm -rf .git
pnpm install
pnpm dev
```

### Next Steps
- Open http://localhost:5173 to see your app
- Edit `src/pages/` to modify content
- Customize themes in `src/index.css`
- Add content in the `content/` directory
- Build for production with `pnpm build`

## ✨ What's Included

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 4** for styling
- **Content System** - Markdown-based content with hot reload
- **Theme System** - Light/dark modes with CSS custom properties
- **Component Library** - Pre-built UI components from ui-core
- **Router** - React Router for navigation

## Components

The component library lives in `src/lib/ui-core/`. These are copied from the main `packages/ui-core` package. You get cards, layouts, themes, and interactive components that work in any React app.

To use a component, just import it:

```typescript
import { ArticleCard, ProjectCard } from './lib/ui-core';

<ArticleCard title="Title" image="/image.jpg" href="/article" />
<ProjectCard content={projectData} />
```

The components default to standard HTML elements (`<img>`, `<a>`, etc.) so they work without any setup. For React Router navigation, use the adapter components in `src/components/` that handle the href→to conversion.

To add your own components, put them in `src/components/` or modify the ui-core files directly.

## Themes

The theme system uses CSS custom properties. Colors are defined as CSS variables like `--color-background`, `--color-foreground`, etc. When you switch themes, these variables change.

To add a new color theme:

1. Edit `src/index.css` and add new theme classes:
```css
.purple-theme {
  --color-background: #2d1b47;
  --color-foreground: #e2d9f0;
  --color-accent-9: #8b5cf6;
  /* ... other color variables */
}
```

2. Add the theme option to the ThemeProvider or ColorSelector component.

The theme system automatically applies to all components that use the CSS custom properties. Check the existing light/dark themes in `index.css` to see all the available color variables.