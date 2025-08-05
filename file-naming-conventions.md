# File Naming Conventions
This document outlines standard naming conventions for project files and directories to ensure consistency and clarity across the project.

## Directory Structure
- Use kebab-case (hyphenated lowercase) for directory names
  - Example: `code-reviews`, `project-guides`, `private`

- Maintain a logical hierarchy with clear parent-child relationships
  - Example: `project-documents/code-reviews/`

## Document Naming

### General Convention

Use periods (`.`) as primary separators and hyphens (`-`) for secondary grouping:
```
[document-type].[subject].[additional-info].md
```

Examples:
- `review.chartcanvas.0419.md`
- `tasks.code-review.chartcanvas.0419.md`
- `guide.development.react.md`

### Document Types

Common document type prefixes:
- `introduction` - Overview of platform, tech, or project area
- `tasks` - Task lists for implementation
- `review` - Code or design review documents
- `guide` - Technical or process guidance
- `spec` - Technical specifications
- `notes` - Meeting notes or research findings
- `template` - Prompt or other templates, organized with project-guides.
- `maintenance` - maintenance tasks or actions, in `private/maintenance`.

### Date Format

When including dates in filenames:
- Use `MMDD` format for short-term documents (e.g., `0419` for April 19)
- Use `YYYYMMDD` format for archival purposes (e.g., `20250419`)

## Task Files
Task files should follow this convention:

```
nn-tasks.{section}.md
```

Where:
- `nn` is a sequential index (01, 02, 03, etc.)
- `{section}` is the section name in lowercase with special characters removed and spaces replaced with hyphens

Examples:
- `01-tasks.frontend.md`
- `02-tasks.backend-api.md`  
- `03-tasks.database-setup.md`

### Legacy Task File Patterns
Previously used patterns (now deprecated):
- `tasks.[category].[component/feature].[additional-info].md`
- `{section}-tasks-phase-4.md`
- `nn-tasks-{section}.md`
- `tasks.code-review.{filename}.{date}.md` (still used for code review tasks)

## Feature Files
Feature files should follow the same convention as task files, but with the word "feature" instead of "tasks".


## Benefits
This naming convention provides:
- Clear visual hierarchy in filenames
- Easier tab completion in terminals
- Better compatibility with various systems
- Consistent pattern for all project documentation
- Logical grouping when viewing directory contents

## Legacy Files
Existing files may follow different conventions. When updating or creating new versions of these files, convert to the new naming convention. Do not rename existing files solely for convention compliance unless part of a coordinated effort.
