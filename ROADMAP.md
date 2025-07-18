# manta-templates — Roadmap & Progress

## Status Table

| #  | Objective                                    | Key deliverables & details                                                                                             | Status       | Next steps                                    |
|---:|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------|-----------------------------------------------|
| **1** | **Next.js starter template**                | • Next 15 App Router + Tailwind 4 + shadcn/radix<br>• MDX-driven blog scaffold (Contentlayer, Shiki highlighting)<br>• Responsive layouts: GridLayout, MasonryGrid, BentoLayout<br>• Dark/Light theme, AI-docs subtree commands | ✅ Completed | None                                          |
| **2** | **Monorepo reorg**                          | • `manta-templates/` with `templates/`, `packages/ui/`, `guides/`<br>• `pnpm-workspace.yaml` + `turbo.json`<br>• Updated root & template-level `package.json` scripts | ✅ Completed | None                                          |
| **3** | **Public-&-private guides sync**            | • Root `sync-guides.sh` (auto-adds SSH remote, subtree-add/pull `project-documents/` from `public-only` branch)<br>• Template `setup-guides.sh` (rsync local or degit monorepo)<br>• `setup-private-guides.sh` for SSH-fetched private docs overlay | ✅ Completed | None                                          |
| **4** | **README & CLI UX**                         | • Unified Quickstart for monorepo & standalone (degit)<br>• All `npx/npm` → `pnpm dlx/exec` migrations<br>• Clear Contributing, License, Templates listing                                       | ✅ Completed | Minor wording tweaks as needed               |
| **5** | **Extract shared UI-kit (`@manta/ui`)**     | • Package skeleton in `packages/ui/`<br>• Build with tsup, peerDeps React<br>• Move Grid/Card components, barrel exports                                            | ⏸️ Deferred   | Extract when components stabilize; add tests |
| **6** | **Dogfood & extend**                       | • Rebuild erikcorkran.com from the new template<br>• Add new cards (Quote, Video, Three.js)<br>• Extract stable ones into UI-kit                                               | 🔜 In progress | Finish one card → extract into UI-kit        |
| **7** | **New Astro / RN templates**               | • Scaffold `templates/astro-landing/` (Astro v4 + Tailwind + shadcn)<br>• Plan React Native starter                                                            | 🔜 Backlog    | Kick off Astro-landing template              |
| **8** | **`create-manta` CLI integration**         | • Automate `degit` + `pnpm install` + `setup-guides` for any stack<br>• Flag support (`--stack=nextjs|astro`)                                                | 🔜 Backlog    | Define CLI spec & implement                  |

---

## High-level summary

- **Template & Monorepo**: Next.js starter, pnpm workspaces, Turborepo, public/private guides are fully wired up.
- **Standalone UX**: Users can spin up templates with `degit` + `pnpm dlx`, with no manual remotes.
- **UI-kit Extraction**: Deferred; focus on stabilizing components via dogfooding, then extract.
- **Next priorities**: Build out new cards in a real site, test Astro-landing starter, revisit UI-kit.

## Kanban Board
https://github.com/orgs/manta-digital/projects/2/views/1
