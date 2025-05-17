# manta-templates

> A unified monorepo for shipping opinionated frontend templates and shared UI packages at manta.digital.

---

## 📂 Repository structure

```text
manta-templates/                # Monorepo root
├─ guides/                      # Curated public and private guides
│  ├─ public/                   # Public docs shipped with templates
│  └─ private/                  # (Optional) Private docs, pulled on demand
├─ packages/                    # Shared utilities & UI kits
│  └─ ui/                       # @manta/ui package (BentoGrid, MasonryGrid, BlogCard)
├─ templates/                   # Opinionated project starters
│  ├─ nextjs/                   # Next.js 15 + Tailwind 4 + ShadCN starter
│  ├─ astro/                    # (Future) Astro static site with Islands pattern (coming soon)
│  └─ react-native/             # (Future) React Native starter
├─ pnpm-workspace.yaml          # pnpm workspace definition
├─ turbo.json                   # Turborepo pipeline config
└─ package.json                 # Root metadata & scripts
```

---

## 🛠 Prerequisites

* **Node.js** v18+ (or your preferred LTS)
* **pnpm** v8+ (preferred) or install via `npm install -g pnpm`

## 🚀 Getting started

1. **Clone the repo**

   ```bash
   git clone git@github.com:manta-digital/manta-templates.git
   cd manta-templates
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Sync public guides**

   ```bash
   pnpm sync-guides
   ```

4. **Bootstrap a template** (Next.js example)

   ```bash
   # from the monorepo root
   cd templates/nextjs
   pnpm install       # installs workspace packages
   pnpm run setup-guides        # copy public docs → project-documents
   pnpm dev            # start the dev server
   ```

> **Tip:** To include your private guides, run `pnpm run setup-guides:private` before `pnpm run setup-guides`.

---

## 📝 Guides workflow

* **Source of truth** lives in the private `ai-project-guide` repo:

  * The `public-only` branch maps to `guides/public/` via `git subtree`.
  * Private docs remain in `guides/private/` and are pulled on demand.

* **Sync public docs** anytime with:

  ```bash
  pnpm sync-guides
  ```

* **Update guides** in `ai-project-guide`, then sync into this monorepo.

---

## 🔧 Setup project-documents

This template ships with a curated set of **public** guides. To pull them into your project:

```bash
# Copy public guides (works offline, no Git required)
pnpm run setup-guides
```

If you have your own private guide repo (e.g. for internal checklists, proprietary docs, client-only content), you can layer that on top:

```bash
# Fetch your private guides, then public ones
pnpm run setup-guides:private
```

**Under the hood:**

* `setup-guides` does an rsync from `guides/public/` into `project-documents/`.
* `setup-guides:private` clones your private repo (SSH), copies everything under `private/` into `project-documents/`, then reruns `setup-guides` to ensure public files stay in sync.

**Why this pattern?**

* **Offline-first:** public docs live in the monorepo—no extra auth needed.
* **Private layers:** you decide which docs stay behind your firewall.
* **Trust & clarity:** everyone sees exactly what’s in their `project-documents` folder.

Feel free to rename the scripts or adjust paths to match your workflow.

## 📚 Demo Project Docs

See the `examples/our-project/` folder for examples of customized product documents and task lists created and implemented based on the `ai-project-guide`.

## 📦 Publishing & packages

* **Root** is marked `private: true` to prevent accidental `npm publish`.

* **@manta/ui** (in `packages/ui`) is a reusable component library:

  ```bash
  cd packages/ui
  pnpm publish --access public      # when you’re ready to release
  ```

* Future templates and packages can be added under `templates/` and `packages/` respectively.

---

## 💡 Contributing

> **Note:** This repository is primarily maintained by Erik Corkran. External contributions are welcome but please be aware that pull requests may not receive immediate attention.

1. **Create an issue** describing the new template or guide.
2. **Branch** off `main`, add your code or docs under the appropriate folder.
3. **Sync** public guides (if updating docs): `pnpm sync-guides`.
4. **Commit & PR** your changes to `manta-digital/manta-templates`.

> All templates should follow the [coderules.md](project-documents/project-guides/coderules.md) and [directory-structure.md](project-documents/project-guides/directory-structure.md).

---

## ⚙️ CI / Automation

* **sync-guides** script automates pulling in the latest public docs.
* You may add GitHub Actions in `.github/workflows` to run `pnpm sync-guides` on a schedule.

---

## 🛡️ License

[MIT](LICENSE) © 2025 Erik Corkran
