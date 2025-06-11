# Tasks: template-split

[x] **Create minimal starter page design**
  - [x] Compile inventory of landing-specific sections/components currently rendered in `templates/nextjs/src/app/page.tsx`.
  
[x] **Refactor template `page.tsx` to minimal starter**
  - [x] Remove or comment out inventory items identified above – do **not** delete shared components/code.
  - [x] Render a single markdown-driven sample card (e.g. QuoteCard) server-side and ensure dark/light theme toggle still functions.
  - [x] Keep Tailwind v4 classes only; do not introduce a `tailwind.config.{js,ts}` file.
  -  Success criteria:
    - `pnpm dev --filter templates/nextjs` renders the minimal starter page without errors.
    - Switching theme via existing mechanism works with server-rendered markdown card.

[x] **Update monorepo workspace & scripts**
  - [x] Add `landing` workspace to `pnpm-workspace.yaml` if missing.
  - [x] Update root `package.json` scripts:
      ```jsonc
      "dev:template": "pnpm --filter templates/nextjs dev",
      "dev:landing": "pnpm --filter landing dev",
      "build:template": "pnpm --filter templates/nextjs build",
      "build:landing": "pnpm --filter landing build"
      ```
  - [x] Ensure `pnpm install` and `pnpm build` from repo root succeed using hoisted deps.
  -  Success criteria:
    - Running each script succeeds without duplication warnings.
    - `dist/` output for both workspaces generated on `pnpm build`.

[x] **Smoke-test both workspaces**
  - [x] Run `pnpm dev:template` and confirm minimal page loads at `localhost:3000`.
  - [x] Run `pnpm dev:landing` and confirm showcase landing page renders unchanged.
  -  Success criteria:
    - Manual checklists/screenshots captured in `/project-documents/our-project/ui/screenshots`.

[x] **Documentation & cleanup**
  - [x] Add short note to `templates/nextjs/README.md` explaining difference between starter template and landing showcase and how to run each workspace.
  -  Success criteria:
    - README changes merged.
