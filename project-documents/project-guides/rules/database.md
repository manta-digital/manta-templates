---
description: Database management with Prisma, schema guidelines, and background job configuration
globs: ["prisma/**/*", "**/*.prisma", "src/lib/db.*", "**/*inngest*"]
alwaysApply: false
---

# Database & Prisma Rules

## Prisma

- **enabled**: as needed only (default: false)
- Manage DB logic with Prisma in `prisma/schema.prisma`, `src/lib/db.ts`.
- snake_case table → camelCase fields.
- No raw SQL; run `npx prisma migrate dev`, never use `npx prisma db push`.

## Inngest / Background Jobs

- **enabled**: false
- Use `inngest.config.ts` for Inngest configuration.
- Use `src/app/api/inngest/route.ts` for Inngest API route.
- Use polling to update the UI when Inngest events are received, not trpc success response. 