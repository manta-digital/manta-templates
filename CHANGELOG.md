# Changelog

All notable changes to the AI Project Guide system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Feature file naming convention**: Updated from `{feature}-feature.md` to `nn-feature.{feature}.md` format
- **Task file naming convention**: Updated from `{section}-tasks-phase-4.md` to `nn-tasks-{section}.md` format
  - Added sequential index prefix (01, 02, 03, etc.) for better organization
  - Removed confusing '-phase-4' suffix from task file names
  - Updated all prompt templates and guides to use new naming pattern
  - Streamlined and updated system prompts.
- **File naming documentation**: Updated `file-naming-conventions.md` with new task file patterns and documented legacy formats

## [0.5.2] - 2025-01-27

### Added
- **Project document phase numbering**: Implemented `XX-name.{project}.md` naming convention for project-specific documents
- **Consistent ordering**: Project documents now follow the same phase-based ordering as guides
- **Setup Script**: setup scripts for Windsurf and Cursor rules/ and agents/.

### Changed
- **Project document names**: Updated project-specific document naming to use phase numbers:
  - `concept.{project}.md` → `01-concept.{project}.md`
  - `spec.{project}.md` → `02-spec.{project}.md`
  - `notes.{project}.md` → `03-notes.{project}.md`
- **Guide output locations**: Updated all guides to reference new phase-numbered document names
- **Directory structure**: Updated structure diagrams to reflect new naming convention

## [0.5.1] - 2025-01-27

### Added
- **Phase numbering system**: Implemented `guide.ai-project.XX-name.md` naming convention for all project guides
- **Clear phase progression**: Files now alphabetize correctly while showing clear phase order (00-process, 01-concept, 02-spec, 04-task-expansion, 05-code-review)

### Changed
- **Guide file names**: Renamed all project guides to use phase numbers:
- **Prompt file names**: Renamed prompt files for better clarity:
  - `template.ai-project.prompts.md` → `prompt.ai-project.system.md`
  - `guide.ai-project.05-code-review-crawler.md` → `prompt.code-review-crawler.md`
  - `guide.ai-project.process.md` → `guide.ai-project.00-process.md`
  - `guide.ai-project.concept.md` → `guide.ai-project.01-concept.md`
  - `guide.ai-project.spec.md` → `guide.ai-project.02-spec.md`
  - `guide.ai-project.task-expansion.md` → `guide.ai-project.04-task-expansion.md`
  - `guide.code-review.ai.md` → `guide.ai-project.05-code-review.md`
  - `guide.code-review-2.ai.md` → `guide.ai-project.05-code-review-2.md` (consolidated into main code review guide)
  - `guide.code-review-crawler.md` → `prompt.code-review-crawler.md`
- **Internal references**: Updated all cross-references between guides to use new naming convention
- **Template prompts**: Updated all prompt templates to reference new guide names
- **Rules consistency**: Updated `rules/general.md` to use `private/` instead of `our-project/`

### Removed
- **`project-guides/coderules.md`**: Completely removed deprecated file, replaced by `project-guides/rules/general.md`
- **`project-guides/guide.ai-project.05-code-review-2.md`**: Consolidated duplicate content into main code review guide

### Fixed
- **File organization**: All guides now follow consistent phase-based naming
- **Cross-references**: All internal links and dependencies updated to new structure

## [0.5.0] - 2025-01-27

### Added
- **New modular rules system**: Replaced monolithic `coderules.md` with organized `project-guides/rules/` directory
- **Agent configurations**: Added `project-guides/agents/` directory for IDE-specific agent configurations
- **IDE integration guide**: Added instructions for copying rules and agents to `.cursor/` and `.windsurf/` directories
- **Migration documentation**: Added comprehensive migration guide from `our-project/` to `private/` structure

### Changed
- **Directory structure**: Migrated from `our-project/` to `private/` throughout all guides
- **File organization**: Established flat structure under `private/` with dedicated folders for tasks, code-reviews, maintenance, ui
- **Task file naming**: Updated to consistent hyphen-separated naming (`{section}-tasks.md`)
- **Code review paths**: Updated all review guides to use `private/code-reviews/`
- **Template prompts**: Updated all prompt templates to reference new `private/` structure

### Deprecated
- **`project-guides/coderules.md`**: Marked as deprecated, replaced by modular `rules/` system
- **`our-project/` directory**: Replaced by `private/` directory (with migration path provided)

### Fixed
- **Monorepo compatibility**: Added note explaining `{template}/examples/our-project/` usage for template development
- **File naming consistency**: Updated examples in `file-naming-conventions.md` to use `private/`
- **Link references**: Fixed broken links in `project-guides/readme.md`

### Technical Details
- Updated 13 files to use new `private/` structure
- Added migration instructions for existing projects
- Maintained backward compatibility for legacy `coderules.md`
- Established clear separation between shared methodology and project-specific work

## [0.4.0] - Previous Release

### Added
- Initial AI project guide system
- 6-phase project methodology
- Tool-specific guides and framework documentation
- Code review processes and templates 