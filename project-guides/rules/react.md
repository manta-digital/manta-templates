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
- React, Tailwind, and ShadCN are all available as needed.
- Use Tailwind for common UI components like textarea, button, etc.
- If we are using ShadCN in the project already, use it.

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

- Use Tailwind (mobile-first, dark mode with dark:(class)). Extend brand tokens in `tailwind.config.ts`.
- For animations, prefer Framer Motion. 