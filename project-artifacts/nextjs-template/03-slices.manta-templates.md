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
- **Status**: ✅ COMPLETED
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

#### Slice 09: UI-Core Component Parity  
- **Status**: ✅ COMPLETED
- **Dependencies**: Slice 08 (markdown content system)
- **Design**: project-artifacts/nextjs-template/slices/09-slice.component-parity.md
- **Tasks**: project-artifacts/nextjs-template/tasks/09-tasks.component-parity.md
- **Scope**: Migrate essential components from templates/nextjs to ui-core package for framework-agnostic coverage
- **Key Deliverables**:
  - [x] Priority 1: Essential card components - All major card types migrated with dependency injection
  - [x] Priority 2: Content system - Server-side content loading pattern superseded content loaders  
  - [x] Priority 3: Header/footer components - Complete header/footer system with variants
  - [x] Priority 4: UI components - Complete theme system (ThemeProvider + ThemeToggle + ColorSelector)
  - [x] Layout system - Grid, bento, container, carousel, overlay systems
  - [x] **Architecture Achievement**: Direct dependency injection proven more effective than adapter wrappers

#### Slice 10: Template Migration to ui-core 🚨 CRITICAL
- **Status**: 🔴 CRITICAL - BLOCKS DEPLOYMENT
- **Dependencies**: Slice 09 (component parity) ✅ COMPLETED
- **Design**: project-artifacts/nextjs-template/slices/10-slice.template-migration.md
- **Tasks**: project-artifacts/nextjs-template/tasks/10-tasks.template-migration.md
- **Scope**: Migrate templates/nextjs to actually use ui-core components instead of local components
- **Critical Issue**: Despite component parity, template still uses local imports (@/components/*) instead of ui-core
- **Key Deliverables**:
  - Systematic import migration from @/components/* to @manta-templates/ui-core
  - Remove redundant template components now available in ui-core
  - Ensure proper dependency injection across all template pages
  - Validate template works identically after migration
  - Production build verification with ui-core imports
- **Success Criteria**: Template is deployment-ready using ui-core package

#### Slice 11: Advanced Testing Infrastructure  
- **Dependencies**: Slice 10 (template migration)
- **Scope**: Comprehensive testing for multi-framework components
- **Key Deliverables**:
  - Unit/integration tests for ui-core components
  - Framework adapter testing
  - Visual regression testing setup
  - Performance testing and optimization

#### Slice 12: Astro Template Development
- **Dependencies**: Slice 08 (content system), Slice 11 (testing)
- **Scope**: Create production-ready Astro template using ui-core
- **Key Deliverables**:
  - templates/astro/ directory with full template
  - Astro-specific optimizations and patterns
  - Content collection integration
  - React island configuration

#### Slice 13: React Router Template Development  
- **Dependencies**: Slice 08 (content system), Slice 11 (testing)
- **Scope**: Create production-ready React Router template using ui-core
- **Key Deliverables**:
  - templates/react-router/ directory with full template
  - Vite configuration with markdown processing
  - Client-side routing patterns
  - Bundle optimization

#### Slice 14: Template Distribution System
- **Dependencies**: Slice 12 (Astro template), Slice 13 (React Router template)
- **Scope**: Automated template bundling and distribution
- **Key Deliverables**:
  - Component usage analysis and bundling system
  - Standalone template generation (dist-templates/)
  - Automated distribution pipeline
  - Template instantiation validation

## Dependency Graph
```
Slice 01-07 (UI Refactor Foundation) [✅ COMPLETED]
    ↓
Slice 08 (Markdown Content) [✅ COMPLETED]
    ↓
Slice 09 (Component Parity) [✅ COMPLETED]
    ↓
Slice 10 (Template Migration) [🚨 CRITICAL - NEXT]
    ↓
Slice 11 (Testing Infrastructure) [FUTURE]
    ↓
┌─ Slice 12 (Astro Template) [FUTURE]
└─ Slice 13 (React Router Template) [FUTURE]
    ↓
Slice 14 (Distribution System) [FUTURE]
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