```yaml
---
docType: intro-guide
platform: nextjs
audience:
  - human
  - ai
purpose: Quickstart guide for non‑interactive, CLI‑driven Next.js projects
---
```


# Introduction to Next.js (CLI‑Driven)

> **Goal** Provide AIs (and humans) a _fully scripted_ path to scaffold and configure modern Next.js apps—no manual prompts. Commands below run unattended in CI or agent workflows.

### Summary

A concise, copy‑pasteable guide that spins up a TypeScript‑flavoured **Next.js 14** app (App Router) with Tailwind CSS, ESLint, Turbopack, `src/` directory layout and aliasing, then hints at optional extras like ShadCN UI, Prisma and NextAuth. All steps assume **Node ≥ 18** and **npm ≥ 9** (or `pnpm` / `yarn`) are preinstalled.

### Prerequisites
- **Node ≥ 18.18** (LTS recommended) and npm / pnpm / yarn
- Git (initialise repo _after_ scaffold or pass `--git`)
- Bash / POSIX‑shell environment (commands use `\` for line continuations)
- Confirm use of ShadCN, Radix, and Auth or database with Project Manager *before* starting.

### 0  Installation Modes

|Mode|When to Use|Notes|
|---|---|---|
|**Scripted CLI**|_Default._ Hands‑off scaffolding for AIs/CI.|`CI=true` disables all prompts.|
|**Manual CLI**|Human wants interactive options.|Omit `CI=true`.|
|**From Template**|Company/generator template exists.|Use `degit`/`create‑next‑app --example`.|

> **If you are an AI agent:** Prefer _Scripted CLI_ unless Project Spec explicitly requires a template. Confirm with Project Manager before deviating.

---

### 1  Create Your Next.js Project (Scripted CLI)

#### 1.1 One‑liner (no prompts)

The following shows the general form we need for the create-next-app.  Note that you will usually need the additional information in 1.3 Handling Non-Empty Directories.

```bash
# {project} ⇒ replace with snake‑case or kebab‑case repo name
CI=true npx create-next-app@latest {project} \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --turbo \
  --src-dir \
  --use-npm \
  --import-alias "@/*"
```

- `CI=true` silences **all** interactive prompts.
- `--app` enables **App Router** & Server Components (Next 13+ default).
- `--src-dir` places pages/components under `src/` not project root.
- `--turbo` uses Turbopack for blazing‑fast dev server.
- `--import-alias "@/*"` lets you `import x from "@/components/..."`.

> **Tip:** For Yarn 2+/pnpm swap `--use-npm` with `--use-yarn` or `--use-pnpm`.

#### 1.2 Optional Flags

|Flag|Purpose|
|---|---|
|`--no-tailwind`|Skip Tailwind if styling handled elsewhere.|
|`--example "https://github.com/vercel/examples/tree/..."`|Start from example.|

#### 1.3 Handling Non‑Empty Directories 

^4cce9a

If the target folder already contains docs (e.g. `project-documents/`, `.windsurfrules`, `package.json`, etc), scaffold in a temp directory then move back.  Note that this is the expected and usual case, and a side-effect of the current method of incorporating the AI Project process.

```sh
mkdir next-temp && cd next-temp

npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --turbo \
  --src-dir \
  --use-npm \
  --import-alias "@/*"

rsync -av --exclude='project-documents/' --exclude='README.md' ./ ../{project}/

cd ../project
rm -rf ../next-temp
npm install
npm run dev
```

##### 1.3.1 Guides Scripts
If `package.json` already exists, the rsync above will overwrite, which is exactly what we need.  In general, the only thing the original `package.json` contains that we care about are the guides setup scripts, included here.  In general you can just add these to the `package.json` script block and be done.

```json
"scripts": {
    "setup-guides": "git remote get-url ai-project-guide > /dev/null 2>&1 || git remote add ai-project-guide git@github.com:ecorkran/ai-project-guide.git && git fetch ai-project-guide && git subtree add --prefix project-documents ai-project-guide main --squash || echo 'Subtree already exists—run npm run guides to update.'",
    "guides": "git fetch ai-project-guide && git subtree pull --prefix project-documents ai-project-guide main --squash"
  }
```

---

### 2  Post‑Create Setup

#### 2.1 Run Dev Server

```bash
cd {projectname}
npm run dev  # → http://localhost:3000
```

Verify the default Next.js welcome page loads and Tailwind classes style the page (inspect `.text-[color]` class).

#### 2.2 Git Initialise & First Commit (optional)

```bash
git init && git add . && git commit -m "chore: bootstrap Next.js app"
```

---

 ### 3  Common Add‑Ons
Common add-ons.  Confirm usage with Project Manager before adding.

#### 3.1 ShadCN UI (React + Tailwind component library)
```bash
npx shadcn-ui@latest init      # uses existing Tailwind config
npx shadcn-ui@latest add button
```

Imports live under `src/components/ui/`. Use inside **Client** components:
```tsx
"use client";
import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button>Click me</Button>;
}
```

#### 3.2 Prisma + PostgreSQL
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init --datasource-provider postgresql
# define schema, then
npx prisma migrate dev
```

#### 3.3 Auth (NextAuth.js)
```bash
npm install next-auth @auth/prisma-adapter
```

Follow NextAuth docs to add `api/auth/[...nextauth]/route.ts`.

---

### 4  Project Structure (Generated)
```
{projectname}/
├── public/                # static assets
├── src/
│   ├── app/               # App Router entrypoints (route groups)
│   ├── components/        # reusable React comps
│   │   └── ui/            # ShadCN components (optional)
│   ├── lib/               # utilities, API clients
│   ├── styles/            # global.css, tailwind.css
│   └── prisma/            # schema.prisma (if using Prisma)
├── .eslintrc.json
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

### 5  CI & Automation Tips

- **Set `CI=true` in your pipeline** before `npm ci` to ensure non‑interactive behaviour when re‑scaffolding or running `next build`.
- **Type Check:** `npm run type-check` (add script: `tsc --noEmit`).
- **Lint & Format:** `npm run lint` (ESLint) plus Prettier if configured.
- **Build:** `npm run build` → `out/` static export or server bundle.

---

### 6  Troubleshooting

| Symptom                             | Likely Cause                        | Fix                                          |
| ----------------------------------- | ----------------------------------- | -------------------------------------------- |
| `EEXIST: files already exist`       | Non‑empty directory                 | Scaffold elsewhere then move docs back       |
| Tailwind classes not applied        | Forgot `--tailwind` or wrong import | Ensure `globals.css` imports Tailwind layers |
| Module not found `next/font/google` | Using Next < 13.2                   | Upgrade Next.js or remove font import        |
| Prisma `P1001` cannot reach DB      | DB not running / URL wrong          | Check `DATABASE_URL` in `.env`               |

---

### 7  Further Reading
- [Next.js Docs](https://nextjs.org/docs)
- [create‑next‑app Flags](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [Tailwind Docs](https://tailwindcss.com/docs/guides/nextjs)
- [ShadCN UI](https://ui.shadcn.com/)

---

### Recap 
By exporting `CI=true` and passing the flags above, **any AI agent** (or human script) can bootstrap a production‑ready Next.js codebase in seconds—no prompts, no manual tweaks, ready for iterative development.