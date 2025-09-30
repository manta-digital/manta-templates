# File Naming Conventions
This document outlines standard naming conventions for project files and directories to ensure consistency and clarity across the project.

## Directory Structure
- Use kebab-case (hyphenated lowercase) for directory names
  - Example: `code-reviews`, `project-guides`, `private`

- Maintain a logical hierarchy with clear parent-child relationships
  - Example: `project-documents/code-reviews/`

## Index Ranges and Semantic Structure

The project uses 3-digit indices (000-999) with semantic range allocation:

### Range Allocation
- **000-009**: Core AI-project process guides
  - Example: `guide.ai-project.000-process.md`, `guide.ai-project.001-concept.md`
  - Matching project files: `private/project-guides/001-concept.{project}.md`

- **010-049**: Reserved for future process extensions
  - Available for new methodology guides
  - Maintain consistent guide.ai-project.nnn-{name}.md pattern

- **050-089**: Architecture and system design (40 slots)
  - High-level designs (HLD)
  - System architecture documents
  - Technology selection and rationale
  - Example: `private/project-guides/050-hld.{project}.md`

- **090-099**: Specialized utility guides
  - Example: `guide.ai-project.090-code-review.md`
  - Example: `guide.ai-project.091-legacy-task-migration.md`

- **100-799**: Active work items (700 slots)
  - Slice design documents
  - Task files
  - User-created or user-initiated work
  - Primary working range for project execution
  - Example: `private/slices/100-slice.{name}.md`

- **800-899**: Feature documents
  - Standalone feature specifications
  - Feature-specific design documents

- **900-949**: Code review tasks and analysis (50 slots)
  - Code review task files
  - Review analysis documents
  - Code review follow-up work
  - Example: `private/code-reviews/review.{component}.{date}.md`

- **950-999**: Maintenance tasks (50 slots)
  - Maintenance task lists
  - Operational procedures
  - Bug tracking and tech debt
  - Example: `950-tasks.maintenance.md`

### Number Ranges
- **000-009**: Core process guides
- **010-049**: Extended process documentation
- **050-089**: Architecture documents
- **090-099**: Specialized guides (code review, legacy migration, etc.)
- **100-799**: Regular sequential content (slices, tasks, user work)
- **800-899**: Feature files
- **900-949**: Code review files
- **950-999**: Maintenance files

### Numbering Rules
- **Sequential within category**: Find the highest existing number in the same range category and increment by 1
- **Range boundaries**: Respect range semantics when numbering new files
- **Start appropriately**: Begin at the first number of the appropriate range (e.g., 100 for first slice)

Examples:
- Existing: `100-tasks.auth.md`, `200-tasks.dashboard.md`, `900-tasks.maintenance.md`
- Next regular task file: `300-tasks.reporting.md`
- Architecture file: `050-hld.{project}.md`

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
nnn-slice.{slice-name}.md
```

Where:
- `nnn` is a 3-digit sequential index following the numbering rules above (typically 100-799)
- `{slice-name}` is the slice name in lowercase with spaces replaced by hyphens

Examples:
- `100-slice.user-authentication.md`
- `200-slice.trading-dashboard.md`
- `300-slice.portfolio-management.md`

### Task Files
Task files should follow this convention:

```
nnn-tasks.{section-or-slice-name}.md
```

Where:
- `nnn` is a 3-digit sequential index following the numbering rules above (typically 100-799 for active work, 900-949 for maintenance)
- `{section-or-slice-name}` is the section or slice name in lowercase with special characters removed and spaces replaced with hyphens

Examples:
- `100-tasks.user-authentication.md` (slice-based)
- `200-tasks.trading-dashboard.md` (slice-based)
- `900-tasks.maintenance-fixes.md` (maintenance)

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
lld: private/slices/100-slice.user-authentication.md
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
- `nn-tasks-{section}.md` (2-digit index, replaced by nnn-tasks pattern)
- `tasks.code-review.{filename}.{date}.md` (still used for code review tasks)

## Feature Files
Feature files should follow the same convention as slice files:
```
nnn-feature.{feature-name}.md
```

Where:
- `nnn` is a 3-digit sequential index (typically 800-899 for features)

Examples:
- `800-feature.advanced-search.md`
- `810-feature.export-functionality.md`

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