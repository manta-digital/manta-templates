# Changelog

All notable changes to the AI Project Guide system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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