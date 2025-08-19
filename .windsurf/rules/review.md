---
trigger: model_decision
description: Rule applies to any Code Review tasks or goals
globs:
---
```

### Step 2: Conduct Review
Analyze the file systematically using the code review questionnaire. Group findings by category for clarity:
1. **Critical Issues**: Bugs, security vulnerabilities, performance problems
2. **Code Quality**: Hard-coded values, duplication, structure issues
3. **Best Practices**: Pattern improvements, TypeScript usage, NextJS conventions
4. **Accessibility & UX**: User experience and accessibility improvements
5. **Testing**: Missing or inadequate test coverage

### Step 3: Create Tasks from Review Findings
Transform review findings into actionable tasks in a separate file named `tasks.code-review.{filename}.MMDD.md` in the `project-documents/code-reviews` directory.  Create one such task file per reviewed file.  Add the file to the appropriate list in the review.{project}.{YYYYMMDD-nn}.md file, based on whether or not code review issues were present in the file.

### Step 4: Task Processing
Process the task list according to Phase 3 and Phase 4 of the `guide.ai-project.process`:

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
- **P0**: Critical bugs, security issues, performance blockers
- **P1**: Code quality issues that impact maintainability
- **P2**: Best practice improvements and technical debt
- **P3**: Nice-to-have optimizations and enhancements

## Approval Criteria
Before approving a code review, ensure:
- [ ] All automated checks pass (linting, type checking, build verification)
- [ ] No critical bugs or security vulnerabilities identified
- [ ] Code follows established patterns and conventions
- [ ] TypeScript strict mode compliance (no `any` types)
- [ ] NextJS best practices are followed
- [ ] Performance impact is acceptable
- [ ] Accessibility requirements are met
- [ ] Documentation is updated where necessary
- [ ] Tests are included for new functionality
- [ ] Hard-coded values are eliminated or justified

## Review Documentation Templates

### Code Review Template

```markdown
# Code Review: {Filename}

## Critical Issues
- [ ] **Bug/Security**: [Description]
- [ ] **Performance**: [Description]

## Code Quality Improvements
- [ ] **Hard-coded Elements**: [List hard-coded values that should be configurable]
- [ ] **Code Duplication**: [List repeated patterns to refactor]
- [ ] **Component Structure**: [Structure improvements]

## Best Practices & Patterns
- [ ] **TypeScript**: [Type safety improvements]
- [ ] **NextJS**: [Platform-specific improvements]
- [ ] **React Patterns**: [Pattern improvements]

## Accessibility & UX
- [ ] **Accessibility**: [ARIA, keyboard navigation, screen reader issues]
- [ ] **User Experience**: [UX improvements]

## Testing & Documentation
- [ ] **Testing**: [Missing test coverage]
- [ ] **Documentation**: [Documentation needs]

## Summary
[Overall assessment and priority level]
```

### Task List Template

```markdown
# Code Review Tasks: {Filename}

## P0: Critical Issues
- [ ] **Task: [Bug Fix Name]**
  - [Detailed description]
  - [Implementation guidance]
  - **Success:** [Success criteria]

## P1: Code Quality
- [ ] **Task: [Quality Improvement]**
  - [Description and implementation details]
  - **Success:** [Success criteria]

## P2: Best Practices
- [ ] **Task: [Pattern Improvement]**
  - [Description and implementation details]
  - **Success:** [Success criteria]

## P3: Enhancements
- [ ] **Task: [Enhancement Name]**
  - [Description and implementation details]
  - **Success:** [Success criteria]
```

---

## Quality Assessment
These guidelines facilitate comprehensive code reviews by:
1. **Systematic Approach**: The questionnaire ensures no critical areas are missed
2. **Actionable Outcomes**: Direct translation from findings to prioritized tasks
3. **Platform-Specific**: NextJS and React best practices are explicitly covered
4. **Comprehensive Coverage**: From bugs to accessibility to performance
5. **Documentation Standards**: Clear templates and naming conventions
6. **Priority Framework**: P0-P3 system for effective task management

The structured process transforms code reviews from subjective assessments into systematic quality assurance with measurable outcomes. 