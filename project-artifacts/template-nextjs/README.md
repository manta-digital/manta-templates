# NextJS Template Development Artifacts

This directory contains development-specific documents and artifacts for the NextJS template. These files are used during template development and improvement but are **not shipped** with the template itself.

## Contents

- **code-reviews/**: Code review findings and tasks from template development
- **features/**: Feature specifications and implementation plans  
- **tasks/**: Detailed task breakdowns and project management files
- **maintenance/**: Maintenance tasks and updates tracking
- **ui/**: UI-specific designs, mockups, and screenshots

## Usage

### For Template Development
When working on the template within the monorepo, run:

```bash
cd templates/nextjs
npm run setup-guides
```

This will:
1. Copy public guides to `project-documents/`
2. Copy these development artifacts to `examples/our-project/`

### For Template Users
Template users get a clean version without these development artifacts. The template ships with:
- `examples/sample-content/` - Sample markdown content
- Clean `project-documents/` (populated by setup-guides)
- Minimal `examples/our-project/` structure

## File Organization

All files follow the AI project guide conventions with proper YAML frontmatter and clear task structures. 