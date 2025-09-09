---
trigger: model_decision
description: Rule applies to React and Next.js applications.
globs:
---
# React & Next.js Rules

## Components & Naming
- Use functional components with `"use client"` if needed.
- Name in PascalCase under `src/components/`.
- Keep them small, typed with interfaces.
- React, Tailwind, and Radix primitives are all available as needed.
- Use Tailwind for common UI components like textarea, button, etc.
- If we are using Radix primitives in the project already, use them consistently.

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


