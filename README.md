# manta-templates 🏄‍♂️ v0.8.3

> Card style UI templates for React, Electron, and Next.js.  Flexible, powerful, and *easy to use* Bento layout.  See examples at https://templates.manta.digital

* Markdown-driven content (precompiled in React!).
* Responsive and Mobile Friendly
* Radix 3.0 Custom Themes built-in
* Easily import from https://www.radix-ui.com/colors/custom. 
* Themed Radix primitives keep everything lightweight.


**New Features Available in v0.8.3** 
* React and Electron Templates
* Form Controls (more coming soon!)


## 🚀 Quickstart

### Deploy your preferred Template
If unsure, use React.  It's widely supported and easy to host.
```bash

# 1. Pull the React template
pnpm dlx degit manta-digital/manta-templates/templates/react my-app
cd my-app

# 2. Install & pull AI Project Guide.
pnpm install
pnpm run setup-guides

# 3. Build and run dev server
pnpm build
pnpm dev
```

### Additional Templates
```bash
# Next.js
pnpm dlx degit manta-digital/manta-templates/templates/nextjs my-app

# Electron (uses React / Vite)
pnpm dlx degit manta-digital/manta-templates/templates/electron my-app

```

## Available Cards & Controls

### Cards
* AboutCard:  profile detail card with avatar
* AnimatedCard: configurable animations
* ArticleCard: customizable to describe articles or projects
* BaseCard: basic customizable card
* BlogCard: use for blog posts or articles
* BlogCardImage: an image based blog/article card
* BlogIndexCard: list of blog articles with images
* CosineTerrainCard: animated cosine surface z = f(x,y)
* GradientCard: theme-aware gradient background, composable
* ProjectCard: details and badges for displaying projects
* QuoteCard: display a quote or statement
* SidebarPostCard: small horizontal card with left image
* ThreeJSCard: general purpose 3D rendering card
* VideoCard: player style or background video

### Layouts & Controls
* Footer: available in compact and full.  
* Header: with brand icon, links, and theme switches.
* BrandMark: customizable brand mark for header
* ColorSelector: allow user to select color themes
* ThemeToggle: sun/moon light/dark control
* TechnologyScroller: display configurable scrolling icons
* ComingSoonOverlay: blur and mark with semi-transparency
* CardCarousel: configurable slide carousel for cards
* BentoLayout: responsive, flexible layout of GridItems

### Form Controls
* Basic form controls including Checkbox, Input, Label, 
  Radio, Select, TextArea, Form Control and Form Field.
* ContactForm: reusable contact form.


Numerous optimizations were added to the React template specifically pre-compiling of all markdown content into HTML.  Components remain client-side without the extra load of processing and rendering the markdown on the client.


Bug reports are welcome; expect some rough edges as we stabilize toward v1.0.

## Documentation Still Needed:
* Theme structure
* Color customizations


## Guides Quickstart
Running `pnpm setup-guides` gets you the ai-project-guide in `project-documents/`.  Place any project-specific guides in a `private` subfolder.  Mimic structure of the parent folder (minus the `private` folder, lest you recurse infinitely).  Run `pnpm update-guides` to fetch any updates from ai-project-guide.  

### Organization Private Guides
You can also keep organization-wide private guides that you can easily use in multiple projects. Copy `env.example` to `.env` and set  `PRIVATE_GUIDES_URL=your-private-guides-repository`. Organization private guides will not overwrite project-specific guides.  *Disclaimer: this feature has not been thoroughly tested.*

### Guides Homepage
Guides repository is public and available at: https://github.com/ecorkran/ai-project-guide



## 🔧 Project Guides

This monorepo ships **public** guides under `project-documents/`. To copy them into *any* template's `project-documents/` folder, run in the template folder:

```bash
pnpm run setup-guides
```

If you maintain your own **private** guide repo, you can layer it on top:

```bash
pnpm run setup-guides:private
```

Under the hood:

* **`sync-guides`** (root) uses Git subtree to import or update `project-documents/` automatically (no manual remote setup).
* **`setup-guides`** (template) uses `rsync` to copy `project-documents/` → `project-documents/`.
* **`setup-guides:private`** clones your private repo, rsyncs its `private/` folder, then re-runs `setup-guides`.

---

## 🛠 Monorepo Development

### Template Development Workflow

When developing templates within the monorepo:

1. **Template development work** goes in `project-artifacts/{template}-template/` (not in the template itself)
2. **Templates ship clean** without `project-documents/` - users get guides via `setup-guides`
3. **setup-guides enables version control** for project-documents after population

### Why This Approach?

- **Clean distribution**: Templates ship without development artifacts
- **User flexibility**: Users get guides when they need them and can commit their customizations
- **No conflicts**: Template development work doesn't interfere with user experience

For template users, this complexity is hidden - they just run `setup-guides` and everything works.

---



## 🤝 Contributing

This repo is **solo-maintained**, primarily as a consumable starting point.
Feel free to open issues if you find bugs or have suggestions—PRs are welcome but may be merged at my discretion.

---


## 📝 License

MIT © 2025 Erik Corkran

