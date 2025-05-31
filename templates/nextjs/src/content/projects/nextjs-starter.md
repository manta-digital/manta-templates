---
title: "Next.js Starter"
description: "Modern full-stack starter with responsive grid layouts."
techStack: ["Next.js 15", "Tailwind 4", "shadcn/radix"]
repoUrl: "https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs"
demoUrl: "https://github.com/manta-digital/manta-templates/tree/main/templates/nextjs"
features:
  - label: "Fast & modern React framework"
  - label: "Production-ready components"
featured: true
order: 1
displayMode: "feature"
---

# Next.js Starter Template

A modern, production-ready Next.js starter template with responsive grid layouts and a comprehensive component library.

## Features

### ⚡ Fast & Modern React Framework
Built on Next.js 15 with the latest React features including:
- Server Components for optimal performance
- App Router for modern routing
- Static Site Generation (SSG) support
- Incremental Static Regeneration (ISR)

### 🧩 Production-Ready Components
Comprehensive component library featuring:
- Responsive grid layouts (Bento, Masonry, Portfolio)
- Card components (Blog, Project, Quote, Video)
- Theme system with dark/light mode
- Accessible UI components with shadcn/ui

### 🎨 Modern Styling
- Tailwind CSS 4 for utility-first styling
- Custom design tokens and color schemes
- Responsive design patterns
- Component variants and themes

## Tech Stack

- **Next.js 15**: React framework with App Router
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **TypeScript**: Type-safe development
- **Radix UI**: Unstyled, accessible UI primitives

## Getting Started

1. **Clone the template**:
   ```bash
   git clone https://github.com/manta-digital/manta-templates.git
   cd manta-templates/templates/nextjs
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── cards/          # Card component library
│   ├── grids/          # Grid layout components
│   └── ui/             # Base UI components
├── content/            # Markdown content files
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Customization

The template is designed to be easily customizable:

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Components**: Extend or modify components in `src/components/`
- **Content**: Add markdown files to `src/content/` directories
- **Layouts**: Create new grid layouts in `src/components/grids/`

## Deployment

The template is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any static hosting provider

## License

MIT License - feel free to use this template for your projects!
