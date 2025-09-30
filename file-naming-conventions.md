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
nnn-tasks.{section}.md
```

Where:
- `nnn` is a 3-digit sequential index following the range allocation above (typically 100-799 for active work)
- `{section}` is the section name in lowercase with special characters removed and spaces replaced with hyphens

Examples:
- `100-tasks.user-authentication.md`
- `200-tasks.backend-api.md`
- `300-tasks.database-setup.md`
- `900-tasks.maintenance.md` (for maintenance items)

### Legacy Task File Patterns
Previously used patterns (now deprecated):
- `tasks.[category].[component/feature].[additional-info].md`
- `{section}-tasks-phase-4.md`
- `nn-tasks-{section}.md` (2-digit index, replaced by nnn-tasks pattern)
- `tasks.code-review.{filename}.{date}.md` (still used for code review tasks)

## Slice Files
Slice design files should follow this convention:

```
nnn-slice.{slice-name}.md
```

Where:
- `nnn` is a 3-digit sequential index (typically 100-799 for active work)
- `{slice-name}` is the slice name in lowercase with spaces replaced by hyphens

Examples:
- `100-slice.user-authentication.md`
- `200-slice.trading-dashboard.md`
- `300-slice.portfolio-management.md`

## Feature Files
Feature files should follow the same convention as slice files, but with "feature" instead of "slice":

```
nnn-feature.{feature-name}.md
```

Examples:
- `800-feature.advanced-search.md`
- `810-feature.export-functionality.md`


## Benefits
This naming convention provides:
- Clear visual hierarchy in filenames
- Easier tab completion in terminals
- Better compatibility with various systems
- Consistent pattern for all project documentation
- Logical grouping when viewing directory contents

## Legacy Files
Existing files may follow different conventions. When updating or creating new versions of these files, convert to the new naming convention. Do not rename existing files solely for convention compliance unless part of a coordinated effort.
