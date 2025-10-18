---
layer: project
docType: review
filePath: src/app/layout.tsx
---

# Code Review Tasks: layout.tsx

## P0: Critical Issues
- [ ] **Task: Remove dangerouslySetInnerHTML inline script**
  - Lines 45-54: Replace inline script with Next.js Script component
  - Move theme initialization to proper client-side component
  - Use Next.js beforeInteractive strategy for theme loading
  - **Success:** Theme initialization secure without inline script injection

## P2: Best Practices
- [ ] **Task: Make site configuration configurable**
  - Lines 17, 22-24: Extract hard-coded site information to configuration
  - Create site configuration file with metadata defaults
  - Use environment variables for site-specific values
  - **Success:** Site metadata configurable without code changes 