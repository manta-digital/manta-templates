---
description: Testing guidelines, Storybook configuration, and development tools usage
globs: ["**/*.test.*", "**/*.spec.*", "**/*.stories.*", "src/stories/**/*"]
alwaysApply: false
---

# Testing & Development Tools

## Storybook

- **enabled**: false
- Place stories in `src/stories` with `.stories.tsx` extension.
- One story file per component, matching component name.
- Use autodocs for automatic documentation.
- Include multiple variants and sizes in stories.
- Test interactive features with actions.
- Use relative imports from component directory.

## Tools

- When you make a change to the UI, use the `screenshot` tool to show the changes.
- If the user asks for a complex task to be performed, find any relevant files and call the `architect` tool to get a plan and show it to the user. Use this plan as guidance for the changes you make, but maintain the existing patterns and structure of the codebase.
- After a complex task is performed, use the `codeReview` tool create a diff and use the diff to conduct a code review of the changes. 