# Next.js Template (Tailwind v4 + shadcn/ui + Radix)

This template is designed to be approachable and flexible. Start simple, then stretch technically when you're ready.

## Quick Start

1. Install dependencies and run dev:
   ```bash
   pnpm install
   pnpm dev
   ```
2. Visit `http://localhost:3000`

## Site Configuration (one place)

All site-level data lives in `src/content/site.config.ts`:
- `site`: name, url, domain
- `author`: name
- `contacts`: primary, business, support (auto-derived from `domain` if omitted)
- `presets`: which content pack to use for legal (`'default' | 'mit'`)
- `variants`: UI choices like footer style (e.g., footer 'default' | 'compact')

Change values there once and the rest of the site updates. For example, set `domain = 'acme.com'` and we’ll default emails to `info@acme.com`, `business@acme.com`, `support@acme.com`.

## Content Presets & Variants

You can switch between a default content pack and a ready-to-edit MIT pack.

- Switch in `src/content/site.config.ts`:
  ```ts
  presets: {
    legal: 'mit',    // or 'default'
  },
  variants: {
    footer: 'compact', // or 'default'
  }
  ```
Where files live:
Default:
  - `src/content/legal/legal.md` (single-page neutral legal)
  - `src/content/legal/{privacy,terms,cookies}.md` (three-page placeholders used by expanded footer)
  - `src/content/footer/footer-content.md` (optional)
MIT Pack:
  - `src/content/presets/mit/legal/legal.md` (single-page MIT legal)
  - `src/content/presets/mit/legal/{privacy,terms,cookies}.md` (exist for completeness; expanded footer will consolidate to single Legal link)
  - `src/content/presets/mit/footer/footer-content.md`

### Open Graph (OG) Image

This template ships with a dynamic OG image generator.

- Route: `src/app/opengraph-image.tsx` (uses `next/og` `ImageResponse`)
- Metadata: `src/app/layout.tsx` points `openGraph.images[0].url` to `/opengraph-image`
- Config-driven: pulls title and tagline from `src/content/site.config.ts` (`site.name`, `site.domain`/`site.url`)

How to customize:
- Change `site.name` and `site.domain` (or `site.url`) in `site.config.ts`
- Tweak typography/colors in `opengraph-image.tsx`

Tip: Test previews with social debuggers (e.g., Facebook Sharing Debugger, LinkedIn Post Inspector). After deploying, paste your site URL and “Scrape Again/Refresh”.

Footer behavior summary:
- `variants.footer = 'compact'` always shows a single “Legal” link (points to `/legal`). Page content comes from `presets.legal` ('default' → neutral, 'mit' → MIT).
- `variants.footer = 'default'` shows legal links from content. If `presets.legal = 'mit'`, links are consolidated to a single “Legal” link.

### Tokens in Markdown

Markdown supports simple tokens we replace at build time using your site config:

- `{{site.name}}`, `{{site.url}}`
- `{{author.name}}` (falls back to `site.name` if empty)
- `{{contacts.primaryEmail}}`, `{{contacts.businessEmail}}`, `{{contacts.supportEmail}}`
- `{{copyright.year}}`, `{{copyright.lastUpdated}}`, `{{copyright.holder}}`

This makes it easy to hand the template to a friend: change `site.config.ts`, not 15 different files.

> Note: MIT preset text is provided as a convenience and is not legal advice. Please review and adapt for your project.

## Layout building blocks

- `Header` uses a variant pattern via re-export:
  - `src/components/header.tsx` re-exports from `components/headers/DefaultHeader`
  - To add header variants, create files under `components/headers/` and change the re-export.
- `Footer` variant is configured in `src/content/site.config.ts`:
  - `variants.footer = 'default' | 'compact'` (runtime switch)

- `ContentCard` (`src/components/layouts/ContentCard.tsx`)
  - A reusable wrapper for markdown/static pages
  - Centralizes width, padding, border, and prose classes (`max-w-[70rem]`)

## Stretch goals and learning ideas

- Add a compact footer variant and map variants to content presets.
- Create a headers gallery under `app/gallery/headers` to preview options.
- Extend tokens or add a remark plugin for richer site-wide content patterns.

Have fun, keep it readable, and don’t be afraid to tinker. Small steps add up fast.

# Manta Next 15 × Tailwind 4 × ShadCN Template

> A **clean**, production-ready starter that lets you ship beautiful, content-driven sites **fast**.

---

## 🚀 Quick Start

```bash
# Recommended: Install pnpm (one-time setup)
npm install -g pnpm

# Create your project from the template
pnpm dlx degit manta-digital/manta-templates/templates/nextjs my-project
cd my-project

# Install dependencies
pnpm install

# Set up project guides (optional)
pnpm setup-guides

# Start development
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll see a minimal starter with sample content.

---

## ✨ Features

| Stack | What you get out-of-the-box |
|-------|----------------------------|
| **Next.js 15** (App Router) | Strict TS, Turbopack dev server, optimized images |
| **Tailwind CSS v4** | Dark/Light mode, no config files needed |
| **ShadCN UI + Radix** | Pre-wired, accessible components |
| **Layout Components** | Flexible grid system with examples |
| **Markdown Content** | Gray-matter frontmatter, code highlighting |
| **Clean Structure** | Minimal examples, ready for your content |

---

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── content/            # Your markdown content (replace samples)
├── lib/                # Utilities and shared logic
└── types/              # TypeScript type definitions

examples/
├── sample-content/     # Sample markdown files (replace these)
└── our-project/        # Your project docs (populated by setup-guides)

project-documents/      # AI project guides (run setup-guides)
```

---

## 🎯 Getting Started

### 1. Replace Sample Content
The template includes minimal sample content in `src/content/` and `examples/sample-content/`:

- `quotes/sample-quote.md` - Example quote card
- `projects/sample-project.md` - Example project showcase

Replace these with your own content following the same frontmatter structure.

### 2. Set Up Project Guides (Optional)
If you want to use AI-assisted development workflows:

```bash
pnpm setup-guides
```

This populates `project-documents/` with comprehensive guides for AI-assisted development and enables version control for your project-specific documents. You can safely run this command multiple times.

### 3. Customize Your Site
- Update `src/app/page.tsx` with your homepage content
- Modify components in `src/components/` 
- Add your content to `src/content/`
- Customize themes in `src/app/globals.css`

---

## 🛠 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production  
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm setup-guides # Set up AI project guides
```

---

## 🎨 Content System

The template includes a flexible content system for markdown files:

### Quote Cards
```yaml
---
author: "Your Name"
quote: "Your inspiring quote here"
featured: true
---
```

### Project Showcases  
```yaml
---
title: "Project Name"
description: "Brief description"
techStack: ["Next.js", "TypeScript"]
repoUrl: "https://github.com/..."
---
```

### Blog Posts
```yaml
---
title: "Post Title"
pubDate: "2024-01-01"
description: "Post description"
---
```

---

## 🚀 Deployment

This template works with any Next.js hosting provider:

- **Vercel**: `git push` to deploy automatically
- **Netlify**: Connect your repository for auto-deploys
- **Docker**: `pnpm build` then containerize the output

---

## 📚 Documentation

After running `pnpm setup-guides`, you'll have access to comprehensive documentation including:

- AI-assisted development workflows
- Component architecture guides  
- Best practices and patterns
- Advanced customization examples

---

## 🤝 Contributing

This template is part of the [Manta Templates](https://github.com/manta-digital/manta-templates) monorepo. Contributions welcome!

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
