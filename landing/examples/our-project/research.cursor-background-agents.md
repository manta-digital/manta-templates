---
layer: project
docType: research
section: code-review-agent
audience: [human, ai]
description: Research findings on Cursor Background Agent capabilities and limitations
---

# Research: Cursor Background Agent Capabilities

## Key Findings

### What Background Agents Are
- **Cloud-based agents** that run independently from the main Cursor IDE
- **Parallel execution**: Multiple agents can run simultaneously on different tasks
- **Container-based**: Each agent runs in a cloud container with configurable environment
- **GitHub integration**: Built-in support for creating branches and pull requests
- **Asynchronous**: Agents work in background while user continues other tasks

### Current Limitations & Constraints
1. **Early Access Program (EAP)**: Feature is in limited beta, not available to all users
2. **Platform Support**: Initially Mac/Linux only, Windows support unclear
3. **Cloud dependency**: Requires cloud infrastructure (expensive, uses "Max Mode")
4. **GitHub requirement**: Appears to require GitHub integration for full functionality
5. **File size limitations**: Some reports of issues with large files (500+ lines)

### Technical Capabilities
- **Environment setup**: Can install dependencies, configure development environment
- **File system access**: Can read/write files within the cloud container
- **Command execution**: Can run shell commands, build processes, tests
- **Repository access**: Can clone, branch, commit, and create pull requests
- **Snapshot functionality**: Can save environment state for reuse

### Configuration Process
1. **GitHub Access**: Must grant repository access permissions
2. **Environment Setup**: Interactive setup of cloud container with dependencies
3. **Base Environment**: Create snapshot of configured environment
4. **Task Assignment**: Assign tasks via prompts with screenshots/descriptions

## Implications for Code Review Agent

### Positive Aspects
- **File Access**: Background agents can definitely access and analyze files
- **Automation**: Can create branches, make changes, and create PRs automatically
- **Parallel Processing**: Could review multiple files simultaneously
- **Environment Awareness**: Can understand project structure and dependencies

### Challenges
- **Availability**: Limited beta access may restrict implementation
- **Cost**: Expensive cloud execution may limit practical usage
- **Complexity**: Requires significant setup and configuration
- **GitHub Dependency**: May not work with local-only projects

## Revised Approach Recommendation

Given the research findings, I recommend a **hybrid approach**:

### Phase 1: Local File Analysis (Immediate)
- Create a prompt that works with Cursor's regular chat/composer mode
- Focus on local file system access through existing Cursor capabilities
- Generate review documents and task files locally
- Use existing file reading/writing tools available in Cursor

### Phase 2: Background Agent Integration (Future)
- Once Background Agents become more widely available
- Leverage cloud-based parallel processing for large codebases
- Integrate with GitHub workflow for automated PR creation
- Scale to handle enterprise-level code reviews

## Technical Implementation Strategy

### For Local Implementation
- Use Cursor's existing file reading capabilities
- Implement as a structured prompt that can be triggered manually
- Generate review artifacts in local project structure
- Focus on systematic file analysis and task generation

### File Discovery Approach
- **Manual file specification**: User specifies files to review
- **Directory scanning**: Prompt includes logic to scan specific directories
- **Pattern matching**: Focus on common file types (.ts, .tsx, .js, .jsx)
- **Batch processing**: Review multiple files in single session

## Next Steps

1. **Prototype local implementation** using existing Cursor capabilities
2. **Test with sample files** to validate review quality
3. **Refine task generation** to match our review guidelines
4. **Plan Background Agent integration** for future enhancement

## Configuration Schema (Revised)

```yaml
# Local implementation configuration
review_session:
  project_type: "nextjs"
  target_files: ["src/**/*.tsx", "src/**/*.ts"]
  exclude_patterns: ["**/*.test.ts", "**/node_modules/**"]
  
technologies:
  framework: "nextjs"
  ui_library: ["shadcn", "radix"]
  styling: ["tailwindcss"]
  
output:
  review_file: "project-documents/our-project/code-reviews/review.session.MMDD.md"
  task_file: "project-documents/our-project/code-reviews/tasks.session.MMDD.md"
```

## Conclusion

While Background Agents offer powerful capabilities, their current limitations suggest starting with a local implementation approach. This allows immediate development and testing while preparing for future Background Agent integration when the feature becomes more accessible and stable. 