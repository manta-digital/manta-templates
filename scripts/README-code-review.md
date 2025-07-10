# Automated Code Review Agent

## Overview

The Automated Code Review Agent performs comprehensive code reviews across your entire project codebase, generating review documents and task lists according to the guidelines in `.cursor/rules/review.md`.

## Features

- **🔄 Automatic Project Detection**: Identifies project type (NextJS, Python, C++, Rust, etc.)
- **📁 Full Project Crawl**: Reviews all relevant source files, not just changed files
- **🎯 Platform-Specific Reviews**: Applies different criteria based on project type
- **📋 Systematic Evaluation**: Uses 12-point questionnaire from review guidelines
- **📊 Priority-Based Tasks**: Generates P0-P3 prioritized task lists
- **📝 Comprehensive Documentation**: Creates review documents with YAML metadata
- **⚡ Parallel Processing**: Reviews multiple files concurrently for efficiency

## Quick Start

### Basic Usage

```bash
# Run a standard code review
pnpm code-review

# Quick review (surface-level)
pnpm code-review:quick

# Deep review (in-depth analysis)
pnpm code-review:deep
```

### Advanced Options

```bash
# Review with custom options
node scripts/code-review-agent.js --depth=deep --format=json --filter=.tsx

# Review specific directory
node scripts/code-review-agent.js --dir=src/components

# Limit file size
node scripts/code-review-agent.js --max-size=1000
```

## Output Structure

The agent generates a comprehensive set of documents:

```
project-documents/
└── our-project/
    └── code-reviews/
        ├── reviews/                    # Individual file reviews
        │   ├── review.component.tsx.0101.md
        │   ├── review.utils.ts.0101.md
        │   └── ...
        ├── tasks/                      # Actionable task lists
        │   ├── tasks.code-review.component.tsx.0101.md
        │   ├── tasks.code-review.utils.ts.0101.md
        │   └── ...
        ├── summary/                    # Project-wide summaries
        │   ├── review-summary.0101.md
        │   └── priority-actions.0101.md
        └── index/                      # Navigation index
            └── review-index.0101.md
```

## Project Type Detection

The agent automatically detects your project type and applies appropriate review criteria:

### NextJS Projects
- **Indicators**: `next.config.js/ts`, `package.json` with Next.js dependency
- **Focus**: React patterns, TypeScript usage, NextJS best practices, accessibility
- **File Types**: `.tsx`, `.ts`, `.jsx`, `.js`, `.css`, `.scss`, `.mdx`

### Python Projects
- **Indicators**: `requirements.txt`, `pyproject.toml`, `setup.py`
- **Focus**: Code quality, security, testing, documentation
- **File Types**: `.py`, `.pyx`, `.pyi`

### C++ Projects
- **Indicators**: `CMakeLists.txt`, `Makefile`
- **Focus**: Code quality, security, testing, documentation
- **File Types**: `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp`, `.hxx`

### Rust Projects
- **Indicators**: `Cargo.toml`, `Cargo.lock`
- **Focus**: Code quality, security, testing, documentation
- **File Types**: `.rs`

## Review Criteria

The agent systematically evaluates each file against 12 review criteria:

1. **Potential Bugs & Edge Cases** - Identifies bugs and unhandled edge cases
2. **Hard-coded Elements** - Finds hard-coded values that should be configurable
3. **Artificial Constraints** - Detects assumptions that limit future expansion
4. **Code Duplication & Reuse** - Identifies repeated code patterns
5. **Component Structure** - Evaluates component organization and responsibilities
6. **Design Patterns & Best Practices** - Checks adherence to best practices
7. **Type Safety & Documentation** - Reviews typing and documentation quality
8. **Performance Considerations** - Identifies performance optimization opportunities
9. **Security Considerations** - Checks for security vulnerabilities
10. **Testing Coverage** - Evaluates test coverage and quality
11. **Accessibility & User Experience** - Reviews accessibility compliance
12. **Platform-Specific** - Applies framework-specific best practices

## Priority System

Issues are categorized by priority:

- **P0 (Critical)**: Bugs, security vulnerabilities, performance blockers
- **P1 (Code Quality)**: Issues that impact maintainability
- **P2 (Best Practices)**: Pattern improvements and technical debt
- **P3 (Enhancements)**: Nice-to-have optimizations

## Configuration

### Agent Configuration

Edit `.cursor/agents/code-review-config.json` to customize:

```json
{
  "review": {
    "maxFileSize": 500,
    "parallelLimit": 5,
    "defaultDepth": "standard"
  },
  "filters": {
    "excludeDirectories": ["node_modules", ".git"],
    "maxFileSize": 500
  },
  "output": {
    "formats": ["markdown", "json", "html"],
    "generateSummary": true
  }
}
```

### Review Guidelines

The agent uses `.cursor/rules/review.md` as its source of truth for review criteria. Update this file to modify review standards.

## Integration

### CI/CD Pipeline

Add to your GitHub Actions workflow:

```yaml
- name: Run Code Review
  run: |
    pnpm code-review
    # Upload review artifacts
    - uses: actions/upload-artifact@v3
      with:
        name: code-review-reports
        path: project-documents/our-project/code-reviews/
```

### Scheduled Reviews

Set up weekly automated reviews:

```bash
# Add to crontab
0 9 * * 1 cd /path/to/project && pnpm code-review
```

### IDE Integration

Add to VS Code tasks:

```json
{
  "label": "Code Review",
  "type": "shell",
  "command": "pnpm",
  "args": ["code-review"],
  "group": "build"
}
```

## Workflow

### 1. Run the Agent

```bash
pnpm code-review
```

### 2. Review Generated Documents

- Check `project-documents/our-project/code-reviews/summary/` for overview
- Review individual files in `reviews/` directory
- Prioritize tasks from `tasks/` directory

### 3. Implement Improvements

- Start with P0 (Critical) issues
- Work through P1 (Code Quality) improvements
- Address P2 (Best Practices) as time permits
- Consider P3 (Enhancements) for future sprints

### 4. Update Guidelines

- Refine `.cursor/rules/review.md` based on findings
- Add project-specific criteria as needed
- Update configuration for your team's needs

## Customization

### Adding New Project Types

1. Update `.cursor/agents/code-review-config.json`:
```json
{
  "projectTypes": {
    "your-project-type": {
      "indicators": ["your-config-file"],
      "extensions": [".your-ext"],
      "focusCriteria": [1, 2, 3]
    }
  }
}
```

2. Add detection logic to `scripts/code-review-agent.js`

### Custom Review Criteria

1. Update `.cursor/rules/review.md` with new criteria
2. Add corresponding check methods to the agent
3. Update the `checkCriterion` method

### Output Formats

The agent supports multiple output formats:

- **Markdown**: Standard markdown files (default)
- **JSON**: Machine-readable format for automation
- **HTML**: Web-viewable reports
- **PDF**: Printable reports (requires additional setup)

## Troubleshooting

### Common Issues

**Agent fails to detect project type**
- Check that configuration files exist in project root
- Verify project type is supported in configuration

**Too many files being reviewed**
- Adjust `maxFileSize` in configuration
- Add more directories to `excludeDirectories`
- Use `--dir` option to limit scope

**Reviews taking too long**
- Use `--depth=quick` for faster reviews
- Reduce `parallelLimit` in configuration
- Increase `maxFileSize` to skip large files

**Missing review documents**
- Check file permissions in output directory
- Verify review guidelines file exists
- Check for JavaScript errors in console

### Performance Optimization

- **Parallel Processing**: Adjust `parallelLimit` based on system resources
- **File Filtering**: Use `--filter` to review only specific file types
- **Directory Limiting**: Use `--dir` to focus on specific areas
- **Caching**: Enable caching for incremental reviews

## Contributing

### Adding New Features

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

### Reporting Issues

1. Check existing issues
2. Create a new issue with:
   - Project type and structure
   - Expected vs actual behavior
   - Relevant configuration
   - Error messages

## License

This agent is part of the Manta Templates project and follows the same license terms.

---

## Support

For questions and support:

1. Check this README and configuration files
2. Review generated documentation
3. Check project issues and discussions
4. Contact the development team

The agent is designed to be self-documenting - review the generated documents to understand how it works with your specific project. 