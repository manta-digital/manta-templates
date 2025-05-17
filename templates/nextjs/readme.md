# Manta Next 15 × Tailwind 4 × ShadCN Template

> An opinionated starter that lets you ship beautiful, content-driven sites **fast**.

---

## ✨ Features

| Stack | Goodies you get out-of-the-box |
|-------|--------------------------------|
| **Next.js 15** (App Router) | Strict TS, Turbopack dev server, image optimisation |
| **Tailwind CSS v4** | Dark/Light mode via CSS variables, Radix preset & `@tailwindcss/typography` |
| **ShadCN UI + Radix** | Pre-wired and theme-aware components |
| **Layout kit** | • Flexible **GridContainer** / **GridItem**<br>• Responsive **MasonryGrid**<br>• “Bento” six-column grid |
| **Markdown / MDX blog** | Gray-matter front-matter, remark & rehype pipeline, Shiki code highlighting |
| **Animations** | Framer Motion baseline, `tw-animate-css` helpers |
| **Tooling** | ESLint, Prettier 3, TypeScript strict, Axe CLI accessibility check |
| **AI project docs** | Built-in subtree commands to pull your *ai-project-guide* docs |

---

## 🚀 Quick start

```bash
# Option 1: use a template to start your project
npx degit manta-digital/manta-templates/templates/nextjs my-nextjs-app
cd my-nextjs-app
pnpm install  # or npm/yarn
pnpm dev

# Option 2: clone the template repository to modify templates or process.
git clone --depth 1 https://github.com/manta-digital/manta-templates/templates/nextjs.git my-site
cd my-site
pnpm install
pnpm dev

Open http://localhost:3000 and start editing files under app/.
```

⸻

📚 Content & Blog workflow
	1.	Add a new Markdown file to src/content/blog/your-post.mdx.
	2.	Include the required front-matter:

---
title: "Post Title"
date: "2025-05-16"
description: "Optional summary"
image: "/images/posts/cover.jpg"   # optional
type: "article"                    # optional
cardSize: "medium"                 # small | medium | large (optional)
---

	3.	Restart the dev server (or let Contentlayer HMR pick it up).
	4.	Visit /blog/your-post.

All posts render inside a .prose container with Dark/Light theming and code blocks highlighted by Shiki.

⸻

## 🧩 Using the layout components

Both layout primitives share the same `GridItem` component (just a styled `div`).  
**GridLayout** decides the grid structure, while **BentoLayout** lets each card decide its own footprint.

---

### GridLayout – container-driven flow

```tsx
import { GridLayout, GridItem } from '@/components/layouts';

/**
 * 3 equal-width columns, 1 rem gap, rows auto-height
 */
<GridLayout columns={3} gap={4} rowHeight="auto">
  <GridItem>Card A</GridItem>
  <GridItem>Card B</GridItem>
  <GridItem>Card C</GridItem>
</GridLayout>

Prop	Type (GridLayout)	Default	What it does
columns	number | string	2	A number (3) or Tailwind class ("grid-cols-4").
gap	number | string	4	Tailwind spacing scale or custom class.
rowHeight	string	"auto"	"auto", "8rem", etc.

Cards flow left-to-right, top-to-bottom; you don’t set spans or positions—just drop them in.
```
⸻

### BentoLayout – card-driven mosaic

```tsx
import BentoLayout, { GridItem } from '@/components/layouts';

/**
 * 6 columns by default; you can override with `columns`.
 * Each GridItem declares its own span *and* (optionally) start row/col.
 */
<BentoLayout columns={6} gap={4} rowHeight="6rem">
  {/* row 1, columns 1-2 */}
  <GridItem className="col-span-2 row-span-1">Wide card</GridItem>

  {/* row 1-2, column 3 */}
  <GridItem className="col-span-1 row-span-2">Tall card</GridItem>

  {/* row 2, columns 1-2 */}
  <GridItem className="col-span-2 row-span-1">Another</GridItem>
</BentoLayout>
```

Prop	Type (BentoLayout)	Default	Notes
columns	number	6	Total columns in the grid.
gap	number | string	4	Same as GridLayout.
rowHeight	string	"auto"	Fixed height per row, or "auto".

	•	In BentoLayout the cards control their size (row-span, col-span) and position (row-start-*, col-start-*)—perfect for Pinterest / Apple-site style mosaics.
	•	If you omit row-start / col-start, cards still flow top-left, but you can override to create intentional gaps & overlaps.

⸻

That’s it—drop layouts, and feed them GridItems.

⸻

## 🎨 Customising the theme

All colours run through CSS custom properties defined in styles/theme.css.
Edit the file (or generate a new palette with your own script) and both Tailwind classes and ShadCN components update instantly.

⸻

## 🔧 Script reference

Script	Purpose
pnpm dev	Run dev server with Turbopack
pnpm build	Production build
pnpm start	Start prod server
pnpm lint ESLint with Next config
pnpm format:write	Prettier auto-format
pnpm ai-typecheck	TS type check (no emit)
pnpm guides	Pull the latest ai-project-guide subtree

## 🔧 Setup project-documents

This template ships with a curated set of **public** guides. To pull them into your project:

```bash
# Copy public guides (works offline, no Git required)
npm run setup-guides
```

If you have your own private guide repo (e.g. for internal checklists, proprietary docs, client-only content), you can layer that on top:

```sh
# Fetch your private guides, then public ones
npm run setup-guides:private
```

Under the hood:
* `setup-guides` does an rsync from guides/public/ into project-documents/.
* `setup-guides:private` clones your private repo (SSH), copies everything under private/ into 
project-documents/, then re-runs setup-guides to ensure public files stay in sync.

Why this pattern?
* Offline-first: public docs live in the repo—no extra auth needed.
* Private layers: you decide what stays behind your firewall.
* Trust & clarity: everyone sees exactly what’s in their project-documents folder.

Feel free to rename the scripts or adjust paths to match your workflow.

## 📚 Demo Project Docs
See `examples/our-project/` for examples of customized product documents and task lists created and implemented based on the ai-project-guide.

⸻

🙏 Acknowledgements

Inspired by Kevin Leneway’s next-ai-starter and his video on prompt-driven task lists.

⸻

📜 License

MIT © 2025 Erik Corkran

