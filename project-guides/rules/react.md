---
description: React and Next.js component rules, naming conventions, and best practices
globs: ["**/*.tsx", "**/*.jsx", "**/*.ts", "**/*.js", "src/components/**/*", "app/**/*"]
alwaysApply: false
---

# React & Next.js Rules

## Components & Naming
- Use functional components with `"use client"` if needed.
- Name in PascalCase under `src/components/`.
- Keep them small, typed with interfaces.
- React, Tailwind 4, and ShadCN are all available as needed.
- Use Tailwind for common UI components like textarea, button, etc.

## Next.js Structure
- Use App Router in `app/`. Server components by default, `"use client"` for client logic.
- NextAuth + Prisma for auth. `.env` for secrets.
- Skip auth unless and until it is needed.

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

## Builds
- After all changes are made, ALWAYS build the project with `pnpm build`. Allow warnings, fix errors.
