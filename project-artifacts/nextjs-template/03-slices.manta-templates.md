---
layer: project
docType: slice-plan
---

# Slice Plan: Manta Templates

## Overview
This document outlines the slice-based development plan for the manta-templates project, organizing work into logical phases that build upon each other while maintaining system coherence.

## Project Context
- **Project**: manta-templates (monorepo template development mode)
- **Primary Template**: templates/nextjs (Next.js 15 + Tailwind 4 + TypeScript)
- **Goal**: Multi-framework UI component system with shared ui-core package

## Slice Organization

### Foundation Slices (Completed)
These slices established the project foundation and are now complete:

- **Slice 01-07: UI Refactor Foundation** 
  - **Status**: Completed
  - **Scope**: Extract framework-agnostic components from Next.js template to ui-core package
  - **Deliverables**: ui-core package, dependency injection patterns, extracted cards and layouts
  - **Tasks**: project-artifacts/nextjs-template/tasks/01-07-tasks-ui-refactor.md

### Current Active Slices

#### Slice 08: Markdown-Driven Content
- **Status**: Design Complete, Ready for Implementation
- **Dependencies**: Requires completed ui-refactor foundation (Slices 01-07)
- **Design**: project-artifacts/nextjs-template/slices/08-slice.markdown-content.md
- **Tasks**: project-artifacts/nextjs-template/tasks/08-tasks-markdown-content.md
- **Scope**: Enable ui-core cards to consume markdown content through framework-agnostic dependency injection
- **Key Deliverables**:
  - ContentProvider interface and framework adapters  
  - Enhanced ui-core cards with content loading capabilities
  - Next.js content adapter (maintains existing functionality)
  - Astro and React Router content adapters
  - Framework-specific wrapper components

### Planned Future Slices

#### Slice 09: Advanced Testing Infrastructure  
- **Dependencies**: Slice 08 (markdown content system)
- **Scope**: Comprehensive testing for multi-framework components
- **Key Deliverables**:
  - Unit/integration tests for ui-core components
  - Framework adapter testing
  - Visual regression testing setup
  - Performance testing and optimization

#### Slice 10: Astro Template Development
- **Dependencies**: Slice 08 (content system), Slice 09 (testing)
- **Scope**: Create production-ready Astro template using ui-core
- **Key Deliverables**:
  - templates/astro/ directory with full template
  - Astro-specific optimizations and patterns
  - Content collection integration
  - React island configuration

#### Slice 11: React Router Template Development  
- **Dependencies**: Slice 08 (content system), Slice 09 (testing)
- **Scope**: Create production-ready React Router template using ui-core
- **Key Deliverables**:
  - templates/react-router/ directory with full template
  - Vite configuration with markdown processing
  - Client-side routing patterns
  - Bundle optimization

#### Slice 12: Template Distribution System
- **Dependencies**: Slice 10 (Astro template), Slice 11 (React Router template)
- **Scope**: Automated template bundling and distribution
- **Key Deliverables**:
  - Component usage analysis and bundling system
  - Standalone template generation (dist-templates/)
  - Automated distribution pipeline
  - Template instantiation validation

## Dependency Graph
```
Slice 01-07 (UI Refactor Foundation) [COMPLETED]
    ↓
Slice 08 (Markdown Content) [CURRENT]
    ↓
Slice 09 (Testing Infrastructure) [PLANNED]
    ↓
┌─ Slice 10 (Astro Template) [PLANNED]
└─ Slice 11 (React Router Template) [PLANNED]
    ↓
Slice 12 (Distribution System) [PLANNED]
```

## Risk Management

### High-Priority Risks
1. **Framework Compatibility**: Ensuring ui-core works consistently across frameworks
   - **Mitigation**: Early testing with multiple frameworks, clear adapter interfaces

2. **Performance Impact**: Abstraction layers affecting performance  
   - **Mitigation**: Performance testing in Slice 09, framework-specific optimizations

3. **Developer Experience**: Complex setup discouraging adoption
   - **Mitigation**: Simple wrapper components, clear documentation, working examples

### Medium-Priority Risks  
1. **Content Processing Complexity**: Markdown processing differences between frameworks
   - **Mitigation**: Shared processing core, framework-specific optimizations where needed

2. **Bundle Size**: ui-core package becoming too large
   - **Mitigation**: Tree-shaking optimization, component usage analysis in Slice 12

## Success Criteria

### Project-Level Success
- ✅ Framework-agnostic ui-core package with full component library
- 📋 Multiple production-ready templates (Next.js, Astro, React Router)  
- 📋 Seamless markdown-driven content across frameworks
- 📋 Automated template distribution system
- 📋 <10% performance overhead from abstraction

### Current Slice Success (Slice 08)
- Framework-agnostic content loading system
- Full feature parity with existing Next.js markdown system  
- Working content adapters for Next.js, Astro, React Router
- Developer-friendly API with TypeScript support
- No breaking changes to existing Next.js template

## Implementation Notes

### Development Mode
- **Active Mode**: Monorepo template development (using project-artifacts/)
- **File Locations**: All project-specific files in project-artifacts/ directory
- **Template Work**: Direct work on templates/ directory for template development

### Coordination with Legacy Work
- Previous UI refactor work used numbered task files (01-07)
- Current work continues this pattern with 08+ for new slices  
- Maintain backward compatibility with existing Next.js template patterns
- Preserve all existing functionality while adding multi-framework support

### Quality Gates
Each slice must pass:
- ✅ Build verification (pnpm build succeeds)
- ✅ Type checking (no TypeScript errors)
- ✅ Existing functionality preserved
- ✅ New functionality demonstrated in test applications
- ✅ Documentation updated