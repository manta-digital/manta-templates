# Tasks: template-split

[ ] **Create minimal starter page design**
  - [ ] Compile inventory of landing-specific sections/components currently rendered in `templates/nextjs/src/app/page.tsx`.
  - [ ] Produce low-fidelity wireframe (markdown list is fine) showing the minimal sections to keep (hero, sample card list, footer).
  -  Success criteria:
    - Document lists all landing-specific components to remove / hide.
    - Wireframe approved by Project Manager.

[ ] **Refactor template `page.tsx` to minimal starter**
  - [ ] Remove or comment out inventory items identified above – do **not** delete shared components/code.
  - [ ] Render a single markdown-driven sample card (e.g. QuoteCard) server-side and ensure dark/light theme toggle still functions.
  - [ ] Keep Tailwind v4 classes only; do not introduce a `tailwind.config.{js,ts}` file.
  -  Success criteria:
    - `pnpm dev --filter templates/nextjs` renders the minimal starter page without errors.
    - Switching theme via existing mechanism works with server-rendered markdown card.

[ ] **Update monorepo workspace & scripts**
  - [ ] Add `landing` workspace to `pnpm-workspace.yaml` if missing.
  - [ ] Update root `package.json` scripts:
      ```jsonc
      "dev:template": "pnpm --filter templates/nextjs dev",
      "dev:landing": "pnpm --filter landing dev",
      "build:template": "pnpm --filter templates/nextjs build",
      "build:landing": "pnpm --filter landing build"
      ```
  - [ ] Ensure `pnpm install` and `pnpm build` from repo root succeed using hoisted deps.
  -  Success criteria:
    - Running each script succeeds without duplication warnings.
    - `dist/` output for both workspaces generated on `pnpm build`.

[ ] **Smoke-test both workspaces**
  - [ ] Run `pnpm dev:template` and confirm minimal page loads at `localhost:3000`.
  - [ ] Run `pnpm dev:landing` and confirm showcase landing page renders unchanged.
  -  Success criteria:
    - Manual checklists/screenshots captured in `/project-documents/our-project/ui/screenshots`.

[ ] **Documentation & cleanup**
  - [ ] Add short note to `templates/nextjs/README.md` explaining difference between starter template and landing showcase and how to run each workspace.
  - [ ] Update changelog entry for template-split completion.
  -  Success criteria:
    - README changes merged.
    - Changelog entry present under “Unreleased”.
