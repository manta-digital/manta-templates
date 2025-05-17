# manta-templates

## 🔧 Setup project-documents

This template ships with a curated set of **public** guides. To pull them into your project:

```bash
# Copy public guides (works offline, no Git required)
pnpm run setup-guides
```

If you have your own private guide repo (e.g. for internal checklists, proprietary docs, client-only content), you can layer that on top:

```sh
# Fetch your private guides, then public ones
pnpm run setup-guides:private
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
