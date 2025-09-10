# File Naming Conventions
This document outlines standard naming conventions for project files and directories to ensure consistency and clarity across the project.

## Directory Structure
- Use kebab-case (hyphenated lowercase) for directory names
  - Example: `code-reviews`, `project-guides`, `private`

- Maintain a logical hierarchy with clear parent-child relationships
  - Example: `project-documents/code-reviews/`

## Sequential Numbering Convention

For files that use sequential numbering (nn-prefix), follow these rules:

### Number Ranges
- **00**: System/core files (e.g., `00-process`)
- **01-89**: Regular sequential content in chronological order
- **90-98**: Special/reserved files (e.g., `90-code-review`, `91-legacy-migration`)
- **99**: Maintenance files (e.g., `99-maintenance-tasks`)

### Numbering Rules
- **Sequential within category**: Find the highest existing number in the same category and increment by 1
- **Ignore reserved ranges**: If you have `01-tasks`, `02-tasks`, and `90-tasks`, the next task file is `03-tasks` (not `91-tasks`)
- **Start at 01**: Begin regular sequences at 01, reserving 00 for system files

Examples:
- Existing: `01-tasks.auth.md`, `02-tasks.dashboard.md`, `90-tasks.legacy.md`
- Next task file: `03-tasks.reporting.md`

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
- `template` - Prompt or other templates, organized with project-guides
- `maintenance` - maintenance tasks or actions, in `private/maintenance`
- `slice` - Low-level design documents for individual slices
-  analysis - Item created as result of codebase analysis

### Date Format
When including dates in filenames:
- Use `MMDD` format for short-term documents (e.g., `0419` for April 19)
- Use `YYYYMMDD` format for archival purposes (e.g., `20250419`)

### Conditionals in File Naming
File naming schemes may contain sections such as `file-{nn}.project{.subproject?}.md`.  The `?` in the subproject indicates to only add the term enclosed in `{}` if it is non-null.

## Slice-Based File Naming

### Slice Design Files
Slice design documents follow this convention:
```
nn-slice.{slice-name}.md
```

Where:
- `nn` is a sequential index following the numbering rules above
- `{slice-name}` is the slice name in lowercase with spaces replaced by hyphens

Examples:
- `01-slice.user-authentication.md`
- `02-slice.trading-dashboard.md`
- `03-slice.portfolio-management.md`

### Task Files
Task files should follow this convention:

```
nn-tasks.{section-or-slice-name}.md
```

Where:
- `nn` is a sequential index following the numbering rules above
- `{section-or-slice-name}` is the section or slice name in lowercase with special characters removed and spaces replaced with hyphens

Examples:
- `01-tasks.user-authentication.md` (slice-based)
- `02-tasks.trading-dashboard.md` (slice-based)
- `03-tasks.maintenance-fixes.md` (feature/maintenance)

### Task File Structure
Modern task files include:
- **YAML front matter** with metadata (slice, project, dependencies, etc.)
- **Context summary** for AI restart capability
- **Granular tasks** with clear success criteria
- Always use checklist structure (see provided example)

Example structure:
```markdown
---
slice: user-authentication
project: trading-app
lld: private/slices/01-slice.user-authentication.md
dependencies: [foundation-setup]
projectState: foundation complete, database schema defined
lastUpdated: 2025-08-18
---

## Context Summary
[Context and current state]

## Tasks
[Detailed list of tasks (example provided below)]

### Task 3.4: Migrate BlogIndexCard
**Dependencies**: Task 3.3
**Objective**: Migrate complex BlogIndexCard that loads and displays multiple posts.

**Migration Steps**:
- [x] **Create ui-core component**:
- File: `packages/ui-core/src/components/cards/BlogIndexCard.tsx`
- Remove getAllContent dependency
- Add ContentProvider for multiple content loading
- Abstract content fetching logic

- [x] **Handle complex content loading**:
- Support for loading multiple posts
- Filtering and limiting functionality
- Sorting by date

- [x] **Framework integration**:
- Next.js adapter with server-side content loading
- Preserve async functionality for server components

**Success Criteria**:
- [x] Multiple post loading works
- [x] Filtering and limiting functional
- [x] Date sorting preserved
- [x] Server component compatibility maintained
```

### Legacy Task File Patterns
Previously used patterns (now deprecated):
- `tasks.[category].[component/feature].[additional-info].md`
- `{section}-tasks-phase-4.md`
- `nn-tasks-{section}.md`
- `tasks.code-review.{filename}.{date}.md` (still used for code review tasks)

## Feature Files
Feature files should follow the same convention as slice files:
```
nn-feature.{feature-name}.md
```

## Benefits
This naming convention provides:
- Clear visual hierarchy in filenames
- Consistent sequential numbering within categories
- Easier tab completion in terminals
- Better compatibility with various systems
- Consistent pattern for all project documentation
- Logical grouping when viewing directory contents
- Self-documenting file purposes

## Legacy Files
Existing files may follow different conventions. When updating or creating new versions of these files, convert to the new naming convention. Do not rename existing files solely for convention compliance unless part of a coordinated effort.