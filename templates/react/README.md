# React Template

This is a React application using Vite and TypeScript that demonstrates the ui-core component library. The components work without framework-specific injection - they use standard HTML elements by default but can be customized for different frameworks like Next.js.

## Installation

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173. Build with `pnpm build`.

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