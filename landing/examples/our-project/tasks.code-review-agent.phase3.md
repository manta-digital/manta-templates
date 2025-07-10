---
layer: project
docType: tasks
phase: 3
section: code-review-agent
audience: [human, ai]
description: Phase 3 detailed task breakdown for Cursor Background Agent code review prompt
---

# Phase 3 Tasks: Code Review Agent

## Research and Prerequisites

- [ ] **Research Cursor Background Agent capabilities**
  - Investigate Cursor Background Agent framework and configuration options
  - Determine file system access capabilities and limitations
  - Document supported trigger events and scheduling options
  - Success: Clear understanding of Background Agent capabilities and constraints documented

- [ ] **Analyze existing code review guidelines**
  - Review `.cursor/rules/review.md` for complete questionnaire and process
  - Extract all 12 review categories and specific criteria
  - Identify platform-specific requirements (NextJS, React, TypeScript)
  - Success: Comprehensive list of review criteria organized by category

- [ ] **Define configuration schema**
  - Create YAML schema for project configuration
  - Define supported project types and technology stacks
  - Specify file type inference rules for each project type
  - Success: Complete configuration schema with validation rules

## Prompt Design and Structure

- [ ] **Create base prompt template**
  - Design main prompt structure following Cursor Background Agent format
  - Include role definition and core responsibilities
  - Establish input/output specifications
  - Success: Base prompt template that can be configured for different projects

- [ ] **Implement review questionnaire logic**
  - Translate 12-point questionnaire into prompt instructions
  - Create systematic approach for applying each review category
  - Include specific examples and criteria for each category
  - Success: Prompt can systematically apply all review categories

- [ ] **Design configuration integration**
  - Create configuration parsing logic within prompt
  - Implement file type inference based on project configuration
  - Add technology-specific review criteria selection
  - Success: Prompt adapts review criteria based on project configuration

- [ ] **Implement artifact generation**
  - Create templates for review document generation
  - Design task list generation with proper formatting
  - Include YAML front-matter generation
  - Success: Prompt generates properly formatted review artifacts

## File Processing and Analysis

- [ ] **Design file discovery mechanism**
  - Create file scanning logic based on configuration
  - Implement file type filtering and exclusion patterns
  - Add file size limits and safety checks
  - Success: Prompt can discover and filter appropriate files for review

- [ ] **Implement code analysis structure**
  - Create systematic approach for analyzing code files
  - Design context extraction for meaningful review
  - Add error handling for problematic files
  - Success: Prompt can analyze code files and extract relevant context

- [ ] **Create platform-specific review logic**
  - Implement NextJS-specific checks (App Router, server components, etc.)
  - Add React best practices validation
  - Include TypeScript strict mode compliance checks
  - Success: Prompt applies platform-specific review criteria correctly

- [ ] **Design security and accessibility checks**
  - Implement security vulnerability detection
  - Add accessibility compliance verification
  - Include input validation and sanitization checks
  - Success: Prompt identifies security and accessibility issues

## Output Generation and Storage

- [ ] **Create review document templates**
  - Design structured review document format
  - Include proper YAML front-matter templates
  - Add categorized findings sections
  - Success: Consistent, well-structured review documents generated

- [ ] **Implement task list generation**
  - Create prioritized task list format (P0-P3)
  - Include acceptance criteria and success metrics
  - Add specific code location references
  - Success: Actionable task lists with clear priorities and criteria

- [ ] **Design directory structure management**
  - Implement proper file naming conventions
  - Create directory structure validation and creation
  - Add file conflict resolution logic
  - Success: Artifacts stored in correct locations with proper naming

- [ ] **Add date and versioning support**
  - Implement MMDD date format in filenames
  - Add version tracking for multiple reviews of same file
  - Include timestamp metadata in artifacts
  - Success: Proper versioning and dating of review artifacts

## Integration and Configuration

- [ ] **Create project type detection**
  - Implement automatic project type inference
  - Add manual override capabilities
  - Include validation for supported project types
  - Success: Accurate project type detection and configuration

- [ ] **Design technology stack integration**
  - Create technology-specific review criteria
  - Implement tool-specific validation (ShadCN, Tailwind, Radix)
  - Add API integration considerations
  - Success: Technology-specific review criteria properly applied

- [ ] **Implement error handling and logging**
  - Add comprehensive error handling throughout prompt
  - Create meaningful error messages and recovery options
  - Include logging for review activity and issues
  - Success: Robust error handling with clear diagnostic information

- [ ] **Create configuration validation**
  - Implement configuration schema validation
  - Add helpful error messages for configuration issues
  - Include default configuration options
  - Success: Clear validation and helpful guidance for configuration

## Testing and Validation

- [ ] **Create test file samples**
  - Develop sample files for different project types
  - Include files with various types of issues
  - Create edge cases and boundary conditions
  - Success: Comprehensive test file suite for validation

- [ ] **Design validation criteria**
  - Create criteria for measuring review quality
  - Define success metrics for artifact generation
  - Include comparison standards with manual reviews
  - Success: Clear validation criteria and success metrics

- [ ] **Implement prompt testing framework**
  - Create systematic testing approach for prompt
  - Design regression testing for prompt modifications
  - Include performance testing for large projects
  - Success: Reliable testing framework for prompt validation

## Documentation and Deployment

- [ ] **Create usage documentation**
  - Write comprehensive configuration guide
  - Include examples for different project types
  - Add troubleshooting and FAQ sections
  - Success: Clear, comprehensive documentation for users

- [ ] **Design deployment instructions**
  - Create step-by-step setup instructions
  - Include Cursor Background Agent configuration
  - Add integration with existing project workflows
  - Success: Straightforward deployment process documented

- [ ] **Create example configurations**
  - Develop sample configurations for common project types
  - Include real-world examples and use cases
  - Add best practices and optimization tips
  - Success: Helpful examples and guidance for configuration

- [ ] **Implement prompt versioning**
  - Create version tracking for prompt updates
  - Add changelog and update documentation
  - Include backward compatibility considerations
  - Success: Proper versioning and update management for prompt 