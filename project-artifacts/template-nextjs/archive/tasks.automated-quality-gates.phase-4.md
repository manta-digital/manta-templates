---
phase: 4
docType: task-expansion
audience: [ai, human]
description: Expanded and enhanced tasks for Automated Quality Gates section (Phase 4)
dependsOn:
  [detailed-task-breakdown.md, guide.ai-project.task-expansion.md, coderules.md]
---

# Phase 4 – Task Expansion: Automated Quality Gates

The following subtasks expand the Detailed Task Breakdown for the Automated Quality Gates section. Each subtask is atomic and includes clear acceptance criteria.

## Add GitHub Actions workflow

- [ ] **Create CI workflow file**
  - Path: `.github/workflows/ci.yml`
  - Triggers: `push` and `pull_request` on `main`, `dev`
  - Steps:
    1. `actions/checkout@v3`
    2. `actions/setup-node@v4` with `node-version: 18`
    3. `npm ci`
    4. `pnpm lint`
    5. `pnpm test`
    6. `pnpm build`
    7. `actions/upload-artifact@v3` to upload `.next`
  - Acceptance: CI passes on commits and blocks PR merges on failure

## Set up Jest & React Testing Library

- [ ] **Install testing dependencies**
  - Run: `pnpm install -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom`
  - Acceptance: Packages appear in `devDependencies`
- [ ] **Configure Jest**
  - Create `jest.config.cjs`:
    ```js
    module.exports = {
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    };
    ```
  - Create `jest.setup.js`:
    ```js
    import "@testing-library/jest-dom";
    ```
  - Acceptance: Jest runs without configuration errors
- [ ] **Add test script**
  - In `package.json` scripts: `"test": "jest --passWithNoTests"`
  - Acceptance: `pnpm test` completes without errors
- [ ] **Write smoke test for BaseCard**
  - File: `src/components/ui/BaseCard.test.tsx`
  - Test: Renders child text and matches snapshot
  - Acceptance: `pnpm test` exits 0 and passes all tests

## Add Lighthouse-CI GitHub Action

- [ ] **Install LHCI CLI**
  - Run: `pnpm install -D @lhci/cli`
  - Acceptance: `@lhci/cli` appears in `devDependencies`
- [ ] **Configure Lighthouse CI**
  - Create `lighthouserc.json`:
    ```json
    {
      "ci": {
        "collect": {
          "startServerCommand": "pnpm dev",
          "url": ["http://localhost:3000"]
        },
        "assert": {
          "assertions": {
            "categories:performance": ["error", { "minScore": 0.9 }],
            "categories:accessibility": ["error", { "minScore": 0.95 }]
          }
        }
      }
    }
    ```
  - Acceptance: `pnpm exec lhci autorun --config=lighthouserc.json` runs without errors
- [ ] **Create Lighthouse CI workflow**
  - File: `.github/workflows/lighthouse-ci.yml`
  - Trigger: `pull_request`
  - Steps:
    1. `actions/checkout@v3`
    2. `actions/setup-node@v4` with `node-version: 18`
    3. `pnpm ci`
    4. `pnpm dev -- --port 3000 &`
    5. `pnpm exec lhci autorun --config=lighthouserc.json`
  - Acceptance: PR status comment shows green scores and blocks merge on failure

---

_STOP: Confirm completion of all subtasks before moving to Phase 5._
