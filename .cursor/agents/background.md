# Background Agent Configuration

## Agent Purpose
This agent runs in the background to automatically review code changes and ensure compliance with project guidelines.

## Monitoring Tasks

### File Changes
- Watch for changes in source files (`src/`, `app/`, `components/`)
- Monitor project documentation updates
- Track configuration file changes

### Code Review
- Apply review guidelines from `.cursor/rules/review.md`
- Check for adherence to coding standards
- Verify TypeScript types and linting
- Ensure build compatibility

### Documentation Updates
- Monitor for outdated references
- Check for broken links
- Verify code examples are current

## Review Guidelines
- Reference `.cursor/rules/review.md` for specific review criteria
- Focus on code quality, maintainability, and consistency
- Flag potential issues before they become problems
- Provide actionable feedback

## Actions
- **Automatic**: Run linting and type checking on file changes
- **Notifications**: Alert on build failures or critical issues
- **Reports**: Generate periodic code quality reports
- **Suggestions**: Propose improvements based on guidelines

## Configuration
- **Enabled**: true
- **Frequency**: On file save and git commits
- **Scope**: Monorepo-wide (templates, landing, guides)
- **Priority**: High for critical issues, medium for suggestions 