---
layer: project
docType: feature
phase: 1-2
section: code-review-agent
audience: [human, ai]
description: Cursor Background Agent for automated file-scoped code reviews
---

# Feature Design: Code Review Agent

## Phase 1: Concept

### High-Level Project Concept
We are creating a **Cursor Background Agent prompt** that enables automated, file-scoped code reviews according to our established review guidelines. This agent will:

* **Monitor and review code files** in the background as they are modified
* **Apply our comprehensive review methodology** from `.cursor/rules/review.md`
* **Generate structured review documents** and actionable task lists
* **Store artifacts** in the prescribed project-documents structure
* **Be configurable** for different project types and technology stacks

**Key Characteristics:**
* This is a **prompt design project**, not a custom code review system
* The agent operates within Cursor's Background Agent framework
* Follows our established code review questionnaire and process
* Integrates seamlessly with our existing project methodology
* Outputs conform to our file naming conventions and directory structure

### Target Users
* **Project Managers** who need systematic code quality assurance
* **Senior AI agents** who need comprehensive review coverage
* **Development teams** working with AI-assisted code generation
* **Quality assurance processes** requiring consistent review standards

### Proposed Technical Stack
* **Platform**: Cursor Background Agent (prompt-based)
* **Configuration**: YAML-based project configuration
* **Input Sources**: Local directory scanning or GitHub repository access
* **Output Format**: Markdown files following our established templates
* **Integration**: Existing project-documents directory structure

**Technology Knowledge Assessment:**
* ✅ **Cursor Background Agents**: Need to research capabilities and configuration
* ✅ **File system monitoring**: Standard directory scanning
* ✅ **Markdown generation**: Well-established format
* ✅ **YAML configuration**: Standard configuration format
* ✅ **Review methodology**: Fully documented in `.cursor/rules/review.md`

## Phase 2: Specification

### Overview and Purpose
**Project Title:** Cursor Background Agent Code Review Prompt
**Summary:** A configurable background agent that performs systematic code reviews using our established methodology, generating structured review documents and actionable task lists.
**Objectives:**
- Create a reusable prompt template for Cursor Background Agents
- Enable automated file-scoped code reviews following our 12-point questionnaire
- Generate properly formatted review artifacts in correct directory locations
- Support multiple project types and technology stacks through configuration

### Functional Requirements

#### Core Features
1. **Configurable Project Detection**
   - Accept project type (NextJS, Astro, etc.)
   - Accept technology stack (ShadCN, TailwindCSS, Radix, etc.)
   - Accept API integrations list
   - Infer appropriate file types to review based on configuration

2. **File Type Inference**
   - NextJS projects: `.ts`, `.tsx`, `.js`, `.jsx`
   - Configuration files: `package.json`, `tsconfig.json`, `next.config.ts` (optional)
   - Astro projects: `.astro`, `.ts`, `.tsx`
   - Infrastructure files: as configured

3. **Systematic Code Review**
   - Apply all 12 categories from code review questionnaire
   - Platform-specific checks (NextJS, React, TypeScript best practices)
   - Technology-specific validation (Tailwind v4, ShadCN, Radix compatibility)
   - Security and accessibility considerations

4. **Artifact Generation**
   - Create review documents: `review.{filename}.MMDD.md`
   - Create task lists: `tasks.code-review.{filename}.MMDD.md`
   - Include proper YAML front-matter
   - Store in `project-documents/our-project/code-reviews/`

5. **Review Process Automation**
   - Follow established review process steps 1-5
   - Generate P0-P3 prioritized task lists
   - Include acceptance criteria and success metrics
   - Reference specific code locations and examples

#### Use Cases
1. **Background Monitoring**: Agent monitors file changes and triggers reviews
2. **Batch Review**: Review multiple files in a project directory
3. **Targeted Review**: Review specific file types or directories
4. **Configuration-Driven**: Adapt review criteria based on project configuration

### Non-Functional Requirements

#### Performance Metrics
- Process individual files within 30 seconds
- Handle projects with up to 100 reviewable files
- Generate properly formatted output 99% of the time

#### Scalability
- Support multiple project types through configuration
- Extensible for new frameworks and tools
- Reusable across different repositories

#### Security Requirements
- No external network calls during review process
- Secure handling of source code content
- Respect file permissions and access controls

### Technical Specifications

#### Technology Stack
- **Primary Platform**: Cursor Background Agent framework
- **Configuration Format**: YAML for project settings
- **Output Format**: Markdown with YAML front-matter
- **File Processing**: Local file system access
- **Template Engine**: Built-in string templating

#### Configuration Schema
```yaml
project:
  type: "nextjs" | "astro" | "react" | "custom"
  name: string
  
technologies:
  framework: string
  ui_library: string[]
  styling: string[]
  state_management: string[]
  
apis:
  - name: string
    type: string
    
review_settings:
  file_types: string[]
  exclude_patterns: string[]
  include_infrastructure: boolean
  max_file_size: number
  
output:
  base_directory: string
  date_format: string
```

#### Integration Points
- **Input**: Project configuration file
- **Processing**: File system scanning and content analysis
- **Output**: Structured markdown files in project-documents directory
- **Logging**: Review activity and error reporting

### Process Flows

#### Primary Review Flow
1. **Configuration Loading**: Parse project configuration
2. **File Discovery**: Scan for reviewable files based on configuration
3. **File Analysis**: Apply review questionnaire to each file
4. **Artifact Generation**: Create review documents and task lists
5. **Storage**: Save artifacts in proper directory structure

#### Error Handling Flow
1. **Configuration Errors**: Validate and report configuration issues
2. **File Access Errors**: Handle permission and file system issues
3. **Processing Errors**: Graceful degradation for problematic files
4. **Output Errors**: Ensure directory structure exists before writing

### Success Criteria
- **Functional**: Agent successfully reviews files and generates proper artifacts
- **Quality**: Review findings align with manual review standards
- **Integration**: Artifacts properly integrate with existing project workflow
- **Usability**: Configuration is straightforward and well-documented
- **Reliability**: Consistent output format and error handling

### Next Steps
1. Research Cursor Background Agent capabilities and limitations
2. Create detailed task breakdown (Phase 3)
3. Develop and test the prompt template
4. Validate with sample projects and file types
5. Document configuration options and usage patterns 