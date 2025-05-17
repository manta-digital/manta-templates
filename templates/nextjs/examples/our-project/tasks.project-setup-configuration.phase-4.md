---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Project Setup & Configuration section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Project Setup & Configuration

The following subtasks expand the Detailed Task Breakdown for the Project Setup & Configuration section. Each subtask is atomic and includes acceptance criteria.

## Initialize Next.js Application

- [x] Verify Node.js and npm versions

  - Run `node -v` and `pnpm -v`
  - Acceptance: Node ≥ 18.18 and npm ≥ 9 installed

- [x] Handle existing project documents if non-empty

  - Run:
    ```bash
    mkdir next-temp && cd next-temp
    CI=true npx create-next-app@latest . \
      --typescript \
      --tailwind \
      --eslint \
      --app \
      --turbo \
      --src-dir \
      --use-npm \
      --import-alias "@/*"
    rsync -av --exclude='project-documents/' --exclude='.windsurfrules' ./ ../erikcorkran/
    cd ../erikcorkran && rm -rf ../next-temp
    npm install
    # Restore guide scripts to package.json
    npm pkg set scripts.setup-guides="git remote get-url ai-project-guide > /dev/null 2>&1 || git remote add ai-project-guide git@github.com:ecorkran/ai-project-guide.git && git fetch ai-project-guide && git subtree add --prefix project-documents ai-project-guide main --squash || echo 'Subtree already exists—run npm run guides to update.'"
    npm pkg set scripts.guides="git fetch ai-project-guide && git subtree pull --prefix project-documents ai-project-guide main --squash"
    npm run setup-guides
    ```
  - Acceptance: Existing documentation remains intact; Next.js scaffold merged; project-documents subtree and guide scripts restored.

- [x] Install project dependencies

  - Run `pnpm install` in project directory
  - Acceptance: `node_modules` folder exists and installs without errors

- [x] Start development server
  - Run `pnpm run dev`
  - Visit `http://localhost:3000`
  - Acceptance: Default Next.js welcome page loads and Tailwind styles apply

## Install and Configure Tailwind CSS

- [x] Install Tailwind dependencies

  - Run `pnpm install -D tailwindcss postcss autoprefixer`
  - Acceptance: Packages appear in `devDependencies`

- [x] Generate Tailwind config

  - Run `pnpm exec tailwindcss init -p`
  - Acceptance: `tailwind.config.js` and `postcss.config.js` exist

- [x] Update `tailwind.config.js`

  - Set:
    ```js
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    ```
  - Acceptance: File reflects updated content paths and dark mode

- [x] Add Tailwind directives to global CSS

  - Insert into `styles/globals.css`:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
  - Acceptance: Styles compile and apply Tailwind utilities

- [x] Verify Tailwind setup
  - Add `className="text-red-500"` to `app/page.tsx`
  - Refresh browser
  - Acceptance: Text appears in red

## Install and Configure ShadCN UI

- [x] Install ShadCN CLI

  - Run ` pnpm exec shadcn@latest init`
  - Acceptance: `shadcn.config.json` generated

- [x] Generate base UI components

  - Run `pnpm exec shadcn@latest add button`
  - Acceptance: Button component files in `src/components/ui/button`

- [x] Integrate Radix primitives

  - Ensure Radix packages are installed and imported
  - Acceptance: UI components compile without missing dependencies

- [x] Verify ShadCN component rendering
  - Import `<Button>` in `app/page.tsx`
  - Add `<Button>Test</Button>`
  - Acceptance: Styled button displays

## Set Up Custom Theming System

- [x] Define theme tokens in Tailwind config

  - Extend `theme.colors` with green and teal palettes
  - Acceptance: Colors under `theme.extend.colors` in `tailwind.config.js`

- [x] Create ThemeProvider context

  - File: `src/context/ThemeContext.tsx`
  - Provide `theme` state and toggle function
  - Acceptance: Context initializes with default theme

- [x] Implement theme toggle component

  - File: `src/components/ThemeToggle.tsx`
  - Toggle `light`/`dark` classes on `<html>` element
  - Acceptance: Toggle component switches themes

- [x] Persist user preference

  - Use `localStorage` to save and load theme
  - Acceptance: Theme selection persists across reloads

- [x] Test theme switching
  - Switch theme via toggle and refresh
  - Acceptance: Correct theme applies and persists

## Configure Build and Deployment Pipeline

- [x] Install ESLint and Prettier

  - Run `pnpm install -D eslint prettier eslint-config-prettier`
  - Acceptance: Packages appear in `devDependencies`

- [x] Create ESLint and Prettier config files

  - Files: `.eslintrc.js`, `prettier.config.js`
  - Acceptance: Config files exist with rules per coderules

- [x] Add lint and format scripts

  - In `package.json` under `scripts`:
    ```json
    "lint": "eslint . --ext .js,.ts,.jsx,.tsx",
    "format": "prettier --check ."
    ```
  - Acceptance: Scripts run without errors

- [x] Configure Vercel deployment

  - Add `vercel.json` with build settings if needed
  - Acceptance: Vercel build and deploy succeed

- [x] Set environment variables

  - Create `.env.local` with placeholder values
  - Acceptance: Variables load via `process.env`

- [x] Test production build
  - Run `pnpm run build && pnpm start`
  - Visit `http://localhost:3000`
  - Acceptance: Production build serves correctly

---

_STOP: Confirm completion of all subtasks before moving to Phase 5._
