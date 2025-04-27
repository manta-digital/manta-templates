Code rules for {target-platform: nextjs}.  Apply when working with any project tasks involving code, it's analysis, or its design.  General rules (`project-documents/project-guides/coderules/`) apply unless superseded by a more detailed ruleset (`project-documents/project-guides/{target-platform}/coderules`) is present.

Project Structure
- If the first item in a list or sublist is `enabled: false`, ignore that section.
- Always refer to the `AI Project Guide` and follow links as appropriate.
- For UI/UX tasks, always refer to the `AI Development Guide - UI`.
* These rules apply to NextJS projects ({target-platform: nextjs}).
- React, Tailwind, and ShadCN+Radix are all available as needed.

Components & Naming
- Use functional components with `"use client"` if needed.
- Name in PascalCase under `src/components/`.
- Keep them small, typed with interfaces.
- Use Tailwind for common UI components like textarea, button, etc.
- If we are using ShadCN in the project already, use it.

Prisma
- enabled: as needed only (default: false)
- Manage DB logic with Prisma in `prisma/schema.prisma`, `src/lib/db.ts`.
- snake_case table → camelCase fields.
- No raw SQL; run `npx prisma migrate dev`, never use `npx prisma db push`.

Icons
- Prefer `lucide-react`; name icons in PascalCase.
- Custom icons in `src/components/icons`.

Toast Notifications
- Use `react-toastify` in client components.
- `toast.success()`, `toast.error()`, etc.

Next.js Structure
- Use App Router in `app/`. Server components by default, `"use client"` for client logic.
- NextAuth + Prisma for auth. `.env` for secrets.
- Skip auth unless and until it is needed.

tRPC Routers
- enabled: as needed
- Routers in `src/lib/api/routers`, compose in `src/lib/api/root.ts`.
- `publicProcedure` or `protectedProcedure` with Zod.
- Access from React via `@/lib/trpc/react`.

TypeScript & Syntax
- Strict mode. Avoid `any`.
- Use optional chaining, union types (no enums).

File & Folder Names
- Next.js routes in kebab-case (e.g. `app/dashboard/page.tsx`).
- Shared types in `src/lib/types.ts`.
- Sort imports (external → internal → sibling → styles).
  
Tailwind Usage
- Use Tailwind (mobile-first, dark mode with dark:(class)). Extend brand tokens in `tailwind.config.ts`.
- For animations, prefer Framer Motion.

Inngest / Background Jobs
- enabled: false
- Use `inngest.config.ts` for Inngest configuration.
- Use `src/app/api/inngest/route.ts` for Inngest API route.
- Use polling to update the UI when Inngest events are received, not trpc success response.

Storybook
- enabled: false
- Place stories in `src/stories` with `.stories.tsx` extension.
- One story file per component, matching component name.
- Use autodocs for automatic documentation.
- Include multiple variants and sizes in stories.
- Test interactive features with actions.
- Use relative imports from component directory.

Tools
- When you make a change to the UI, use the `screenshot` tool to show the changes.
- If the user asks for a complex task to be performed, find any relevant files and call the `architect` tool to get a plan and show it to the user. Use this plan as guidance for the changes you make, but maintain the existing patterns and structure of the codebase.
- After a complex task is performed, use the `codeReview` tool create a diff and use the diff to conduct a code review of the changes.

Builds
- After all changes are made, ALWAYS build the project with `npm run build`. allow warnings, fix errors.
- Always run typescript check to ensure no typescript errors.
- Log warnings to `/project-documents/maintenance/maintenance-tasks.md`. Write in raw markdown format, with each warning as a list item, using a checkbox in place of standard bullet point.

Additional
- Keep code short; commits semantic.
- Reusable logic in `src/lib/utils/shared.ts` or `src/lib/utils/server.ts`.
- Use `tsx` scripts for migrations.
- filenames for project documents may use ` ` or `-` separators. ignore case in all filenames, titles, and non-code content.

IMPORTANT:
- Always add a one-sentence summary of changes to `.windsurf-updates` file in markdown format only after completing a task *and verifying it with the project manager*.
- Finally, update git with `git add . && git commit -m "..."`. Don't push.
