# Code Review Process

## Overview

This document outlines the process for conducting code reviews in the Manta Trading MVP project. Code reviews ensure code quality, maintainability, and alignment with project goals while identifying potential issues before they become problematic.

## Code Review Questionnaire

When reviewing code, answer these core questions:

1. **Potential Bugs & Edge Cases**

   - Are there any bugs or strong potential for bugs?
   - Are there unhandled edge cases?
   - Are there race conditions or memory leaks?
   - Are subscriptions and event listeners properly cleaned up?

2. **Hard-coded Elements**

   - Is anything hard-coded that should be configurable?
   - Are there magic numbers or strings that should be constants or settings?
   - Are date ranges, timeouts, or numeric thresholds hard-coded?

3. **Artificial Constraints**

   - Are there assumptions that will limit future expansion?
   - Does the code artificially restrict functionality?
   - Are there fixed array sizes, limited input ranges, or hardcoded limits?

4. **Code Duplication & Reuse**

   - Is there repeated code that should be factored into functions?
   - Are there patterns that could be abstracted?
   - Could utility functions improve readability?

5. **Component Structure**

   - Are there monolithic pieces that should be split?
   - Does the component have a single responsibility?
   - Could the code benefit from being broken into smaller components?

6. **Design Patterns & Best Practices**

   - Are there opportunities to use better patterns?
   - Is the code following React/TypeScript best practices?
   - Could performance be improved with memoization or other techniques?
   - Is there proper error handling?

7. **Type Safety & Documentation**
   - Is the code properly typed?
   - Are there any `any` types that could be more specific?
   - Is the code well-documented with comments?

## Code Review Process

### Step 1: Create Review Document

Create a review document following the naming convention `review.{filename}.MMDD.md` in the `project-documents/code-reviews` directory.

### Step 2: Conduct Review

Analyze the file systematically using the code review questionnaire. Group findings by category for clarity.

### Step 3: Create Tasks from Review Findings

Transform review findings into actionable tasks in a separate file named `tasks.code-review.{filename}.MMDD.md` in the `project-documents/code-reviews` directory.

### Step 4: Task Processing

Process the task list according to Phase 3 and Phase 4 of the AI Project Guide:

1. **Phase 3: Granularity and Clarity**

   - Convert each review finding into clear, actionable tasks
   - Ensure task scope is precise and narrow
   - Include acceptance criteria

2. **Phase 4: Expansion and Detailing**
   - Add implementation details and subtasks
   - Reference specific code locations
   - Provide concrete examples where helpful

Example task structure:

```markdown
## Code Review Tasks: {Component}

- [ ] **Task 1: Remove Hard-coded Date Range**
  - Replace hard-coded 2024 date range with configurable values from settings
  - Add to chartSettings.ts with appropriate defaults
  - Update initialization code to use these settings
  - **Success:** Chart date constraints are configurable without code changes
```

### Step 5: Prioritization and Implementation

The Project Manager will prioritize tasks for implementation based on:

- Risk level (bugs first)
- Technical debt impact
- Development efficiency
- Feature roadmap alignment

## Review Documentation Templates

### Code Review Template

```markdown
# Code Review: {Filename}

## Potential Bugs & Concerns

[List identified bugs or concerns]

## Hard-coded Elements

[List hard-coded values that should be configurable]

## Architectural Improvements

[List architectural improvements]

## Improved Patterns

[List pattern improvements]

## Summary

[Summary of findings]
```

### Task List Template

```markdown
# Code Review Tasks: {Filename}

## Bug Fixes

- [ ] **Task: [Task Name]**
  - [Detailed description]
  - [Implementation guidance]
  - **Success:** [Success criteria]

## Configuration Improvements

[Configuration tasks]

## Architecture Refactoring

[Architecture tasks]

## Pattern Improvements

[Pattern improvement tasks]
```
