# General Coding Rules

## Project Structure

- If the first item in a list or sublist is `enabled: false`, ignore that section.
- Always refer to `guide.ai-project.process` and follow links as appropriate.
- For UI/UX tasks, always refer to `guide.ui-development.ai`.
- General Project guidance is in `/project-documents/project-guides/`.
- Relevant 3rd party tool and tech information is in `project-document/tool-guides`.
- Information and tasks specific to our project in `project-documents/our-project`.
- **IMPORTANT**: if we are working on a template in a monorepo, the 'our-project' path will be 'templates/{template-name}/examples/our-project'. Substitute accordingly.

## MCP (Model Context Protocol)

- Always use context7 (if available) to locate current relevant documentation for specific technologies or tools in use.
- Do not use smithery Toolbox (toolbox) for general tasks. Project manager will guide its use.

## Code Structure

- Keep source files to max 300 lines (excluding whitespace) when possible.
- Keep functions & methods to max 50 lines (excluding whitespace) when possible.
- Avoid hard-coded constants - declare a constant.
- Avoid hard-coded and duplicated values -- factor them into common object(s).
- Provide meaningful but concise comments in _relevant_ places.

## Code Style

- Use `eslint` unless directed otherwise.
- Use `prettier` if working in languages it supports.

## File & Folder Names

- Next.js routes in kebab-case (e.g. `app/dashboard/page.tsx`).
- Shared types in `src/lib/types.ts`.
- Sort imports (external → internal → sibling → styles).
- Filenames for project documents may use ` ` or `-` separators. Ignore case in all filenames, titles, and non-code content.

## Additional

- Keep code short; commits semantic.
- Reusable logic in `src/lib/utils/shared.ts` or `src/lib/utils/server.ts`.
- Use `tsx` scripts for migrations.

## Builds

- After all changes are made, ALWAYS build the project with `pnpm build`. Allow warnings, fix errors.
- If a `package.json` exists, ensure the AI-support script block from `snippets/npm-scripts.ai-support.json` is present before running `pnpm build`
- Always run typescript check to ensure no typescript errors.
- Log warnings to `/project-documents/our-project/maintenance/maintenance-tasks.md`. Write in raw markdown format, with each warning as a list item, using a checkbox in place of standard bullet point. 