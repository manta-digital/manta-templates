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
