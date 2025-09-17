---
description: React and Typescript component rules, naming conventions, and best practices
globs: ["**/*.tsx", "**/*.jsx", "**/*.ts", "**/*.js", "src/components/**/*", "app/**/*"]
alwaysApply: false
---

# React & Next.js Rules

## Components & Naming
- Use functional components with `"use client"` if needed.
- Name in PascalCase under `src/components/`.
- Keep them small, typed with interfaces.
- Use React, Tailwind 4, and Radix.  Do not use Shadcn

## React and Next.js Structure
- Use App Router in `app/`. 
- Skip auth unless and until it is needed.
- Use `.env` for secrets.

## Icons
- Prefer `lucide-react`; name icons in PascalCase.
- Custom icons in `src/components/icons`.

## Toast Notifications
- Use `react-toastify` in client components.
- `toast.success()`, `toast.error()`, etc.

## Tailwind Usage
- Always use tailwind 4, never tailwind 3.  If you see or use a tailwind.config.ts (or .ts), it's almost always wrong.  
- Use Tailwind (mobile-first, dark mode with dark:(class)). 
- For animations, prefer Framer Motion. 

##  Code Style
- Use `eslint` unless directed otherwise.
- Use `prettier` if working in languages it supports.

## File & Folder Names
- Routes in kebab-case (e.g. `app/dashboard/page.tsx`).
- Sort imports (external → internal → sibling → styles).

## Testing
- Prefer vitest over jest

## Builds
- use pnpm not npm
- After all changes are made, ALWAYS build the project with `pnpm build`. Allow warnings, fix errors.
- If a `package.json` exists, ensure the AI-support script block from `snippets/npm-scripts.ai-support.json` is present before running `pnpm build`

## Next.js
- Default to client components in server pages for Next.js
- NextAuth + Prisma for auth.

## Inngest / Background Jobs
- **enabled**: false
- Use `inngest.config.ts` for Inngest configuration.
- Use `src/app/api/inngest/route.ts` for Inngest API route.
- Use polling to update the UI when Inngest events are received, not trpc success response. 