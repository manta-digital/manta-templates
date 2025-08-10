# manta-templates

> Modern starter templates with AI-assisted development workflows built-in. Ship faster with Next.js 15, Tailwind 4, and comprehensive project guides.

---

# manta-templates 🏄‍♂️ v0.7.1

https://templates.manta.digital

A **Next.js 15 template** that lets you spin up modern, AI-assisted project sites quickly.

> **Note:** This project is in active development (v0.7.1). Expect breaking changes.

---

## 🚀 Quickstart

### Standalone Template usage
```bash
# 1. Grab only the Next.js starter
pnpm dlx degit manta-digital/manta-templates/templates/nextjs my-app
cd my-app

# 2. Install & pull public docs
pnpm install
pnpm run setup-guides

# 3. Spin up the dev server
pnpm dev
```

### Using the monorepo
```bash
# 1. Clone the monorepo
git clone https://github.com/manta-digital/manta-templates.git
cd manta-templates

# 2. Install dependencies
pnpm install

# 3. Import public guides (at monorepo root)
pnpm sync-guides

# 4. Bootstrap the Next.js starter
cd templates/nextjs
pnpm install
pnpm setup-guides    # copies guides from monorepo into template
pnpm dev             # launches the dev server
```

*Astro and React-Native starters are coming soon under `templates/ast​ro` and `templates/react-native`.*

---

## Guides Quickstart
Running `pnpm setup-guides` gets you the ai-project-guide in `project-documentation/`.  Place any project-specific guides in a `private` subfolder.  Mimic structure of the parent folder (minus the `private` folder, lest you recurse infinitely).  Run `pnpm update-guides` to fetch any updates from ai-project-guide.  

### Organization Private Guides
You can also keep organization-wide private guides that you can easily use in multiple projects. Copy `env.example` to `.env` and set  `PRIVATE_GUIDES_URL=your-private-guides-repository`. Organization private guides will not overwrite project-specific guides.

### Guides Homepage
Guides repository is public and available at: https://github.com/ecorkran/ai-project-guide


## Why it Exists and Where it's Going

### Why it exists  
I wanted one repo that handled the boring plumbing **and** baked in my AI project guides and useful workflows.  

* **ai-project-guide** ↔️ pre-wired: generate detailed task lists, docs, or next steps with parameterized prompts.
* **Tailwind 4** grid **Cards**: drop-in components for text, code, metrics, images—ready to customize.  
* Clean Markdown content pipeline, Shiki code-highlighting, image optimization, dark/light theme toggle.

### Where it's Going

🎞️ Video, 3D, and chart cards (embed YouTube, Three.js, SciChart)
🎨 Radix color themes & preset palettes
📚 Astro static template

Status · Early-Access (v0.7.1)
Heads-up: v0.7.1 is an α-grade release—perfect for hacking, learning, and giving feedback, not for shipping critical production workloads.

Known gaps: limited card types, no Radix theme switcher, inconsistent lint rules, limited support for markdown-driven content.

Interfaces may change between minor versions.

Bug reports are welcome; expect some rough edges as we stabilize toward v1.0.

---

## 📂 Repository structure

```
manta-templates/
├─ project-documents/      # Your curated project guides
│   └─ private/            # Private docs (pulled only by you, when needed)
│
├─ templates/              # Application & site starter templates
│   ├─ nextjs/             # Next.js 15 + Tailwind 4 + ShadCN
│   └─ astro/              # (future) Astro Islands
│
├─ packages/               # Workspace packages
│   └─ ui/                 # @manta/ui: shared React components (BentoGrid, etc.)
│
├─ pnpm-workspace.yaml     # pnpm workspace config
├─ turbo.json              # Turborepo pipeline (build/lint/dev)
└─ package.json            # Root scripts & dependencies
```

---

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

## 📦 Publishing & Consumption

* **Templates**:

  ```bash
  pnpm dlx degit manta-digital/manta-templates/templates/nextjs my-app
  ```
* **UI Kit** (`@manta/ui`):

  * Lives in `packages/ui`.
  * To publish to npm: in `packages/ui/package.json` set `"private": false`, then `cd packages/ui && npm publish --access public`.

---

## 📋 Changelog

### v0.7.4
- **site.config.ts** - configures metadata, policy, author, and components.
- **Headers and Footers** - configurable, choice of default/compact
- **Policy Text** - added canned policy text (helper, *not legal advice*).
- **OpenGraph** - dynamic OG image/card created from react component.

### v0.7.3
- **Fixed sync-guides script** - Now pulls from `main` branch instead of `public-only` to get latest guides

### v0.7.2
- **Directory structure migration** - Migrated from `our-project/` to `private/` throughout all guides
- **Setup script fixes** - Template instances now create `project-documents/private/` correctly
- **Git submodule warnings eliminated** - Added `.git` exclusion to all setup scripts
- **Documentation consistency** - Updated 13 files across the guide system for new structure
- **Migration guide added** - Clear instructions for updating older projects

### v0.7.1
- **Private guides workflow** - Environment-based configuration for organization private guides
- **.env file support** - Simple configuration via `.env` files (like Python!)
- **Project files preservation** - Update scripts now properly preserve project-specific content
- **Cross-platform compatibility** - Improved Node.js scripts for better Windows support
- **Template development workflow** - Clarified development vs distribution separation

### v0.7.0
- **Monorepo structure cleanup** - Clean separation between templates and development artifacts
- **Fixed sync-guides workflow** - Fresh monorepo clones now work out of the box
- **Template distribution improvements** - Templates ship clean without project-documents
- **Updated template README** - Correct user workflow with `pnpm dlx degit`
- **Cross-platform compatibility** - Better support for different development environments
- **Repository structure flattening** - Consistent `project-documents/` structure across monorepo and standalone usage

### v0.6.0
- Next.js 15 upgrade
- Tailwind CSS v4 integration
- Enhanced card component system

### v0.5.x
- Initial template development
- Basic project structure
- Core component library

---

## 🤝 Contributing

This repo is **solo-maintained**, primarily as a consumable starting point.
Feel free to open issues if you find bugs or have suggestions—PRs are welcome but may be merged at my discretion.

---

## ⚙️ Root `package.json` scripts

```jsonc
"scripts": {
  // First-time or recurring import of public guides:
  "sync-guides": "bash scripts/sync-guides.sh"
}
```

---

## 📝 License

MIT © 2025 Erik Corkran

