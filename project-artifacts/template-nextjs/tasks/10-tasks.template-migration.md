---
layer: project
docType: tasks
slice: template-migration
project: manta-templates
phase: 6
lldRef: project-artifacts/nextjs-template/slices/10-slice.template-migration.md
dependencies:
  - Slice 09: Component Parity (COMPLETED)
  - ui-core package building successfully
  - test-cards page demonstrating component parity
status: ready
priority: CRITICAL
lastUpdated: 2025-01-16
splitInto: 3 parts for AI worker manageability
---

# Tasks: Template Migration to ui-core - SPLIT INTO MANAGEABLE PARTS

## Important Note

**THIS FILE HAS BEEN SPLIT** into 3 manageable parts for better AI worker manipulation and execution:

### Part 1: Analysis and Planning (Phases 1-2)
**File**: `10-tasks.template-migration-1-analysis.md`
**Contains**:
- Complete import inventory and mapping
- Build configuration validation  
- App router pages migration
- Component layer migration
- Initial build validation and testing

### Part 2: Implementation and Testing (Phases 3-4)
**File**: `10-tasks.template-migration-2-implementation.md`
**Contains**:
- Component cleanup and redundant code removal
- TypeScript and dependency cleanup
- Production build verification
- Comprehensive functional testing
- Performance and accessibility validation

### Part 3: Deployment and Completion (Phase 5 + Final Verification)
**File**: `10-tasks.template-migration-3-deployment.md`
**Contains**:
- Production deployment testing
- Template distribution readiness
- Documentation updates and cleanup
- Final verification and completion
- Success criteria validation

## Usage Instructions for AI Workers

1. **Start with Part 1** - Complete all analysis, planning, and initial migration
2. **Continue to Part 2** - Execute cleanup, testing, and validation  
3. **Finish with Part 3** - Ensure deployment readiness and completion

Each part contains:
- Clear prerequisites and dependencies
- Detailed step-by-step tasks with bash commands
- Code examples and specific implementation guidance
- Success criteria and validation checkpoints
- Context preservation for resuming work

## Context Summary

**CRITICAL ISSUE**: Despite achieving component parity in Slice 09, `templates/nextjs` still imports components from local directories (`@/components/*`) instead of ui-core (`@manta-templates/ui-core`). This blocks deployment and makes the template unusable as an actual template.

**Current State**: Template uses local components  
**Required State**: Template consumes ui-core package  
**Impact**: Without this migration, the entire manta-templates project cannot be deployed or distributed

## Why This Was Split

The original comprehensive tasks file was over 1200 lines, making it difficult for AI workers to:
- Load and process the entire file efficiently
- Make precise edits without context overflow
- Resume work after context loss
- Navigate and reference specific sections

The 3-part split maintains all detail while providing manageable file sizes for systematic execution.

## Critical Success Dependencies

This slice is the **essential missing step** that transforms component parity into deployment readiness. Without completing this migration, the entire manta-templates project cannot achieve its core objective of providing deployable templates using the ui-core package.