# manta-templates

> Monorepo of opinionated starter templates (Next.js, Astro, React-Native soon!), plus shared UI components and curated project guides.

---

# manta-templates 🏄‍♂️ v0.4

A **Next.js 15 starter** that lets you spin up modern, AI-assisted project sites in minutes—not hours.

> **Note:** This project is in active development (v0.4). Expect breaking changes.


---

## Why it Exists and Where it's Going

### Why it exists  
I wanted one repo that handled the boring plumbing **and** baked in my AI project guides and useful workflows:

* **ai-project-guide** ↔️ pre-wired: generate detailed task lists, docs, or next steps with parameterized prompts.
* **Tailwind 4** grid **Cards**: drop-in components for text, code, metrics, images—ready to customize.  
* Clean Markdown content pipeline, Shiki code-highlighting, image optimization, dark/light theme toggle.

### Where it's Going

🎞️ Video, 3D, and chart cards (embed YouTube, Three.js, SciChart)
🎨 Radix color themes & preset palettes
📚 Astro static template

Status · Early-Access (v0.4)
Heads-up: v0.4 is an α-grade release—perfect for hacking, learning, and giving feedback, not for shipping critical production workloads.

Known gaps: limited card types, no Radix theme switcher, inconsistent lint rules, limited support for markdown-driven content.

Interfaces may change between minor versions.

Bug reports are welcome; expect some rough edges as we stabilize toward v1.0.



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

# 3. Import public guides (auto-adds remote & handles first-time import)
pnpm run sync-guides

# 4. Bootstrap the Next.js starter
cd templates/nextjs
pnpm install
pnpm run setup-guides    # copies public guides into project-documents
pnpm dev                 # launches the dev server
```

*Astro and React-Native starters are coming soon under `templates/ast​ro` and `templates/react-native`.*

---

## 📂 Repository structure

```
manta-templates/
├─ guides/                 # Your curated project guides
│   ├─ public/             # Public docs (shipped in this repo)
│   └─ private/            # Private docs (pulled only by you)
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

This monorepo ships **public** guides under `guides/public`. To copy them into *any* template’s `project-documents/` folder, run in the template folder:

```bash
pnpm run setup-guides
```

If you maintain your own **private** guide repo, you can layer it on top:

```bash
pnpm run setup-guides:private
```

Under the hood:

* **`sync-guides`** (root) uses Git subtree to import or update `guides/public` automatically (no manual remote setup).
* **`setup-guides`** (template) uses `rsync` to copy `guides/public/` → `project-documents/`.
* **`setup-guides:private`** clones your private repo, rsyncs its `private/` folder, then re-runs `setup-guides`.

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

## 🤝 Contributing

This repo is **solo-maintained**, primarily as a consumable starting point.
Feel free to open issues if you find bugs or have suggestions—PRs are welcome but may be merged at my discretion.

---

## ⚙️ Root `package.json` scripts

```jsonc
"scripts": {
  // First-time or recurring import of public guides:
  "sync-guides": "git remote get-url ai-guides > /dev/null 2>&1 || git remote add ai-guides git@github.com:ecorkran/ai-project-guide.git; git fetch ai-guides; git subtree add --prefix guides/public ai-guides public-only --squash -m \"docs: import public guides\" || git subtree pull --prefix guides/public ai-guides public-only --squash -m \"docs: sync public guides\""
}
```

---

## 📝 License

MIT © 2025 Erik Corkran

