---
layer: snippet
docType: template
purpose: reusable-llm-prompts
audience:
  - human
  - ai
ai description: Parameterized prompt library mapped to slice-based project phases.
dependsOn:
  - guide.ai-project.00-process.md
npmScriptsAiSupport: "!include ../snippets/npm-scripts.ai-support.json"
---
## Prompts
This document contains prepared prompts useful in applying the `guide.ai-project.00-process` and performing additional supplemental tasks.
##### Project Object Model and Parameters
```python
# input keys
{
  project,
  slice,
  section, 
  subsection,
  framework/language,
  tools,
  apis,
  monorepo,
}
```

##### Project Kickoff
```markdown
We're starting work on a new project {project}.  We will use our curated AI Project Creation methods in `guide.ai-project.00-process` (can also be referred to as Project Guide or Process Guide) to assist us in designing and performing the work.  Your role as described in the Project Guide is Technical Fellow.

The actual concept description as well as additional concept will be provided by Project Manager for injection into our process.  The first thing we need to do is to use our Project Guide together with the additional concept information to create documents tailored to our project.  We and our AI team members will use these to design, implement, and verify project tasks.

To do this, we need to use the Project Guide together with information provided to create our concept document (Phase 1). If any areas in the Concept guide need more information that is not provided, request from the Project Manager before continuing.  

When creating these project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.  Pause here until you receive the project concept description from the Project Manager.
```

##### Project Phase (Traditional)
*Use to directly execute a phase without additional instructions needed. Also usable with traditional (non-slice-based) projects.*

```
Refer to the `guide.ai-project.00-process`, and function as a Senior AI.  Implement the phase requested according to the respective procedures described in the guide.  Remember to follow the rules in `directory-structure` for any files or directories created.
```

##### Spec Creation (Phase 2)
```markdown
We're working in our guide.ai-project.00-process, Phase 2: Spec Creation. Use `guide.ai-project.02-spec` with the approved concept document to create the project specification.

Your role is Technical Fellow as described in the Process Guide. Work with the Project Manager to create `private/project-guides/02-spec.{project}.md`.

Required inputs:
- Approved concept document (01-concept.{project}.md)
- Technical stack and requirements from Project Manager
- Any additional specific requirements

Focus on:
- Tech stack with tool-guides availability check
- Top-level features and major workflows
- Architectural considerations and system boundaries
- Sample data and UI sketches (if applicable)

Keep the spec concise and focused on coordination between components. If you need more information about requirements or cannot access referenced tools, stop and request from Project Manager.

Note: This is a design and planning task, not a coding task.
```

##### Slice Planning (Phase 3)
```markdown
We're working in our guide.ai-project.00-process, Phase 3: High-Level Design & Slice Planning.  Use `guide.ai-project.03-slice-planning` with the project concept and specification documents to break {project} into manageable vertical slices.

Your role is Technical Fellow as described in the Process Guide. Work with the Project Manager to:

1. Create the high-level design document (03-hld.{project}.md)
2. Identify foundation work, feature slices, and integration work
3. Create the slice plan document (03-slices.{project}.md)

Start with *at most 5* feature slices. Focus on slice independence and clear user value. If you have all required inputs and sufficient information, proceed with slice planning. If not, request required information from the Project Manager.

Note: This is a design and planning task, not a coding task.
```

##### Slice Design (Phase 4)
```markdown
We're working in our guide.ai-project.00-process, Phase 4: Slice Design (Low-Level Design). Create a detailed design for slice: {slice} in project {project}.

Use the high-level design (03-hld.{project}.md) and slice plan (03-slices.{project}.md) as inputs. Your role is Technical Fellow.

Create the slice design document at `private/slices/nn-slice.{slice}.md` where nn is the appropriate sequential number. Include:

- Detailed technical decisions for this slice
- Data flows and component interactions
- UI mockups or detailed specifications (if applicable)
- Cross-slice dependencies and interfaces
- Any conflicts or considerations discovered

If framework or platform are specified, guide(s) for the framework(s) should be provided in `/project-documents/framework-guides/{framework}/introduction.md`. If tools are specified, guide for each tool should be available at `/project-documents/tool-guides/{tool}/introduction.md`.

Stop and request clarification if you need more information to complete the slice design.
```

##### Slice Task Breakdown (Phase 5)
```markdown
We're working in our guide.ai-project.00-process, Phase 5: Slice Task Breakdown. Convert the slice design for {slice} in project {project} into granular, actionable tasks.

Your role is Senior AI. Use the slice design document `private/slices/nn-slice.{slice}.md` as input.

Create task file at `private/tasks/nn-tasks.{slice}.md` with:

1. YAML front matter including slice name, project, LLD reference, dependencies, and current project state
2. Context summary section
3. Granular tasks following Phase 5 guidelines

For each {tool} in use, consult knowledge in `tool-guides/{tool}/`. Follow all task creation guidelines from the Process Guide.

Each task must be completable by a junior AI with clear success criteria. If insufficient information is available, stop and request clarifying information.

This is a project planning task, not a coding task.
```

##### Slice Task Expansion (Phase 6)
```markdown
We're working in our guide.ai-project.00-process, Phase 6: Task Enhancement and Expansion. Enhance the tasks for slice {slice} in project {project} to improve the chances that our "junior" AI workers can complete assigned tasks on their own.

Use `guide.ai-project.06-task-expansion` as your detailed guide for this phase. Work on the task file `private/tasks/nn-tasks.{slice}.md`.

Your role is Senior AI. For each task:
- If it would benefit from expansion or subdivision, enhance it
- If it's already appropriate, output it verbatim
- Ensure all tasks are accounted for

Output results by updating the existing task file. Success: All tasks have been processed and either output as is, or enhanced and divided into further subtasks.

Note: This is a project planning task, not a coding task.
```

##### Slice Implementation (Phase 7)
```markdown
We are working on the {slice} slice in project {project}, phase 7 of `/project-documents/project-guides/guide.ai-project.00-process`. 

Your role is "Senior AI". Your job is to complete the tasks in the `/project-documents/private/tasks/nn-tasks.{slice}.md` file. Please work through the tasks, following the guidelines in our project guides, and using the rules in the rules/ directory.

The slice design is available at `private/slices/nn-slice.{slice}.md` for additional context.

STOP and confer with Project Manager after each task, unless directed otherwise by the Project Manager. Do not update any progress files until confirmation from Project Manager.

Work carefully and ensure that each task is verified complete before proceeding to the next. If an attempted solution does not work or you find reason to try another approach, do not make more than three attempts without stopping and obtaining confirmation from Project Manager.

Check off completed tasks in the task file when verified complete. When all tasks for the slice are complete, proceed to Phase 8 (integration) with Project Manager approval.

Notes: 
* Use the task-checker to manage lists if it is available to you
* Ignore case sensitivity in all file and directory names
* If you cannot locate referenced files, STOP and request information from Project Manager
* Do not guess, assume, or proceed without required files
```

##### Ad-Hoc Task Creation (Feature/Maintenance)
```markdown
Create tasks for {feature/maintenance item} in project {project}. This is for smaller work items that need task breakdown but don't require full slice design.

Your role is Senior AI. Analyze the {feature/maintenance item} and create a task file at `private/tasks/nn-tasks.{item-name}.md` with:

1. YAML front matter:
---
item: {item-name}
project: {project}
type: feature|maintenance|bugfix
dependencies: [list-if-any]
projectState: brief current state
lastUpdated: YYYY-MM-DD
---

2.  Context summary explaining the work
3. Granular tasks following Phase 5 guidelines

Skip LLD creation - go directly from description to implementable tasks. Each task should be completable by a junior AI with clear success criteria.

If the item is too complex for this approach, recommend creating a proper slice instead. If you need more information about the requirements, stop and request from Project Manager.  Keep tasks focused and atomic.
```

##### Feature Design 
*Use this to add a new slice to an existing project.*
```markdown
We're adding a new feature slice to project {project}. This slice will be called {slice}.

We will use our slice-based methodology from `guide.ai-project.00-process` to design and implement this feature. Your role is Technical Fellow.

The feature description should be provided by the Project Manager. Use the existing project context including:
- High-level design (03-hld.{project}.md)  
- Existing slice plan (03-slices.{project}.md)
- Current project state

Create:
1. Updated slice plan adding this slice to the appropriate position
2. Slice design document (nn-slice.{slice}.md) 

Follow dependency management - identify what foundation work or other slices this depends on, and what future slices might depend on this.

If you need more information about the feature requirements, stop and request from Project Manager.
```

##### Model Change or Context Refresh 
*Use this prompt when you need to switch models or refresh understanding in slice-based projects.*
```markdown
The following provides context on our current work in slice-based project {project}. Input may contain: { project, slice, task, issue, tool, note }.

We are using the slice-based methodology from `guide.ai-project.00-process`. Current work context:
- Project: {project}
- Current slice: {slice} (if applicable)
- Phase: [specify current phase]

Refer to the Resource Structure in `guide.ai-project.00-process` for locations of resources. Key project documents:
- High-level design: private/project-guides/03-hld.{project}.md
- Slice plan: private/project-guides/03-slices.{project}.md  
- Current slice design: private/slices/nn-slice.{slice}.md (if working on a slice)
- Current tasks: private/tasks/nn-tasks.{slice}.md (if in execution)

**Directory Structure by Development Type:**
- **Regular Development**: Use `project-documents/private/` for all project-specific files
- **Monorepo Template Development**: Use `project-artifacts/` for project-specific files
- The Project Manager should specify which mode is active

If you were previously assigned a role, continue in that role. If not, assume role of Senior AI as defined in the Process Guide.

{tool} information: [Project Manager will provide if relevant to current work]
```

##### Use 3rd Party Tool
*Add the following to existing prompt when working with {tool}.*

```markdown
You will need to consult specific knowledge for {tool}, which should be available to you in the tool-guides/{tool} directory for our curated knowledge.  Follow these steps when working with {tool}.  Use these tools proactively.

1. Consult Overview: Start with the specific `AI Tool Overview 
   [toolname].md` in the `project-documents/tool-
   guides/{tool}` directory.
2. Locate Docs: Scan the Overview for references to more detailed 
   documentation (like local API files under `/documentation`, 
   notes in `research-crumbs` or official web links).
3. Search Docs: Search within those specific documentation sources 
   first using `grep_search` or `codebase_search`.
4. Additional documentation.  If you have a documentation tool available (ex: 
   context7 MCP) use it for additional information.  Always use it if available 
   and no specific tool guide is provided.
5. Web Search Fallback: If the targeted search doesn't yield 
   results, then search the web.
```

##### Summarize Context
*Use when nearing context limit, e.g. when facing imminent auto-compaction in Claude Code.  Make sure to include inside `[ ]` or Claude will ignore the instructions.  Currently it appears that at best Claude will output the `[ ]` information into the new context.*
```markdown
Perform the following items and add their output to the compacted context:
* Preserve the initial context describing what we are working on.
* Summarize current project state at time of this compaction.
* Include any open todo list items and work in progress.
* add the tag --COMPACTED-- after inserting this information. 
```

##### Maintenance Item 
```markdown
Continue operating in your role as Senior AI. Add {item} to maintenance-tasks.md, following existing file format and markdown rules.

Current project context: {project}, slice-based development. If this maintenance item affects multiple slices or requires coordination, note this in the item description.

If item detail level is sufficient for immediate implementation, you may proceed after confirmation with Project Manager. If {item} requires more detailed planning (similar to a slice), expand according to project guides and confirm with Project Manager before implementation.

Consider impact on current slice work and dependencies when planning implementation.
```

##### Perform Routine Maintenance 
```markdown
Let's perform routine maintenance tasks while being mindful of our slice-based development approach. Examine file project-documents/private/maintenance/maintenance-tasks.md.

Work through maintenance items one at a time. For each item:
- Assess impact on current slice work
- Ensure fixes don't break slice boundaries or interfaces
- Test that slice functionality still works after maintenance
- Update maintenance-tasks.md when complete

Stop after each item for Project Manager verification. Don't proceed to next items until current one is verified complete and doesn't interfere with slice development.

Current project: {project}
Active slice work: {slice} (if applicable)
```

##### Analysis Processing
```markdown
We need to process the artifacts from our recent code analysis.

Role: Senior AI, processing analysis results into actionable items
Context: Analysis has been completed on {project} (optionally {subproject}) and findings need to be converted into proper maintenance tasks, code review issues, or GitHub issues as appropriate.

Notes: 
- Be sure to know the current date first.  Do not assume dates based on training 
  data timeframes.

Process:
1. Categorize Findings:
- P0 Critical: Data loss, security vulnerabilities, system failures
- P1 High: Performance issues, major technical debt, broken features
- P2 Medium: Code quality, maintainability, best practices
- P3 Low: Optimizations, nice-to-have improvements

2. Create File and Document by Priority:
- Create markdown file `maintenance/{nn}-analysis.{project-name}
  {.subproject?}-00.md`.  If this is the first such file created, {nn} = "01".
- Note that subproject is often not specified.  Do not add its term to the name 
  if this is the case. 
- Divide file into Critical Issues (P0/P1) and Additional Issues(P2/P3)
- Add concise documentation of each issue -- overview, context, conditions.  

3. File Creation Rules:
- Use existing file naming conventions from `file-naming-conventions.md`
- Include YAML front matter for all created files
- Add the correct date (YYYY-MM-DD) in the file's frontmatter
- Reference source analysis document (if applicable)
- Add line numbers and specific locations where applicable

4. GitHub Integration (if available):
- Create GitHub issues for P0/P1 items
- Label appropriately: `bug`, `critical`, `technical-debt`, `analysis`
- Reference analysis document in issue description
- Include reproduction steps and success criteria
```

##### Analysis Task Creation

*Create tasks based on codebase analysis.  While we don't yet have a generic analysis prompt, we do have the following modified task-creation prompt for use with analysis results.*
```markdown
We're working in our guide.ai-project.00-process, Phase 5: Slice Task Breakdown. Convert the issues from {analysis-file} into granular, actionable tasks if they are not already.  Keep them in priority order (P0/P1/P2/P3). 

If the tasks are already sufficiently granular and in checklist format, you do not need to modify them. Note that each success criteria needs a checkbox.

Your role is Senior AI. Use the specified analysis document `private/maintenance/nn-analysis.{project-name}{.subproject?}.00.md` as input.  Note that subproject is optional (hence the ?).  Avoid adding extra `.` characters to filename if subproject is not present.

Create task file at `private/tasks/nn-analysis{.subproject?}-{date}.md` with:
1. YAML front matter including slice or subproject name, project, YYYYMMDD date, main analysis file reference, dependencies, and current project state
2. Context summary section
3. Granular tasks following Phase 5 guidelines
4. Keep success criteria with their respective task
5. Always use checklist format described in guide.ai-project.00-process under Task Files.

For each {tool} in use, consult knowledge in `tool-guides/{tool}/`. Follow all task creation guidelines from the Process Guide.

Each task must be completable by a junior AI with clear success criteria. If insufficient information is available, stop and request clarifying information.

This is a project planning task, not a coding task.
```

##### Analysis to LLD
```markdown
We need to create a Low-Level Design (LLD) for {feature/component} identified during codebase analysis or task planning in project {project}.  It may be an expansion of an initial task section identified during analysis.

Your role is Technical Fellow as described in the Process Guide. This LLD will bridge the gap between high-level understanding and implementable tasks.

**Context:**
- Analysis document: `private/maintenance/nn-analysis.{project-name}{.subproject 
  or analysis topic?}` (or specify location)
- Related task file: `private/tasks/nn-analysis{.subproject?}-{date}.md` (if 
  exists)
- Current issue: {brief description of what analysis revealed}

**Create LLD document at:** `private/features/nn-lld.{feature-name}.md`

**Required YAML front matter:**
```yaml
---
layer: project
docType: lld
feature: {feature-name}
project: {project}
triggeredBy: analysis|task-breakdown|architecture-review
sourceDocument: {path-to-analysis-or-task-file}
dependencies: [list-any-prerequisites]
affects: [list-components-or-slices-impacted]
complexity: low|medium|high
lastUpdated: YYYY-MM-DD
---

**Guidelines for creating LLD:**

**Cross-Reference Requirements:**

- Update source analysis/task document to reference this LLD
- Add back-reference in this LLD to triggering document
- Note any slice designs or existing features this affects

**Focus Areas:**

- Keep design concrete and implementation-ready
- Include code examples or pseudocode where helpful
- Reference specific files, classes, or components by name
- Address both immediate needs and future extensibility

If you need more context about the analysis findings or existing system architecture, stop and request from Project Manager.

Note: This creates implementation-ready technical designs, not high-level planning documents.
```

##### Analysis Task Implementation
*Phase 7 Task Implementation customized for analysis files. *
```markdown
We are working on the analysis file {analysis} in project {project}, phase 7 of `/project-documents/project-guides/guide.ai-project.00-process`. 

Your role is "Senior AI". Your job is to complete the tasks in the `/project-documents/private/tasks/nn-analysis.{project}{date-from-{analysis}}.md` file. Please work through the tasks, following the guidelines in our project guides, and using the rules in the rules/ directory.

The analysis overview is available at {analysis} for additional context.

STOP and confer with Project Manager after each task, unless directed otherwise by the Project Manager. Do not update any progress files until confirmation from Project Manager.

Work carefully and ensure that each task is verified complete before proceeding to the next. If an attempted solution does not work or you find reason to try another approach, do not make more than three attempts without stopping and obtaining confirmation from Project Manager.

Check off completed tasks in the task file when verified complete. When all tasks for the slice are complete, proceed to Phase 8 (integration) with Project Manager approval.

Notes: 
* Use the task-checker to manage lists if it is available to you
* Ignore case sensitivity in all file and directory names
* If you cannot locate referenced files, STOP and request information from Project Manager
* Do not guess, assume, or proceed without required files
```

##### Analyze Codebase
*This is mostly specialized to front-end and web apps and should be moved to a specific guide.*
```markdown
Let's analyze the following existing codebase and document our findings.  We want this to not only assist ourselves in updating and maintaining the codebase, but also to assist humans who may be working on the project.

###### General
* Document your findings in the project-documents/private/maintenance/codebase-
  analysis.md. You will probably need to create this file.
* Write in markdown format, following our rules for markdown output.  If you 
  cannot find these rules, STOP and do not proceed until you request and receive 
  them fro the Project Manager.
* Document the codebase structure.  Also note presence of any project-documents 
  or similar folders which probably contain information for us.
* Document presence or average of tests, and an estimate of coverage if tests 
  are present.
* Identify technologies and frameworks in use.  If this is a JS app, does it use 
  React?  Vue?  Is it NextJS?  Is it typescript, javascript, or both?  Does it 
  use TailWind?  ShadCN?  Something else?
* What package managers are in use?
* Is there a DevOps pipeline indicated?
* Analysis should be concise and relevant - no pontificating.
* Add note in README as follows: Claude: please find code analysis details in 
  {file mentioned above}.

###### NextJS
* Perform standard analysis and identify basic environment -- confirm NextJS, 
  identify common packages in use (Tailwind, ShadCN, etc) and any unusual 
  packages or features.  
* If auth is present, attempt to determine its structure and describe its 
  methodology
* Is the project containerized?
* If special scripts (ex: 'docker: {command}') are present, document them in the 
  README.
* Provide a description of the UI style, interactivity, etc
* Document page structure.
  
###### Tailwind
* Is cn used instead of string operations with parameterized or variable   
  classNames?
* Prefer Tailwind classes, there should not be custom CSS classes.
* If this is Tailwind 4, are customizations correctly in CSS and no attempt to 
  use tailwind.config.ts/.js. 
```

***
### Deprecated (Legacy Full-Project Approach)

##### Legacy Task Expansion
*Note: Use slice-based approach for new projects. This is for legacy projects only.*
```markdown
We're working in our guide.ai-project.00-process, Phase 4: Task expansion and Enhancement by section.  Use `guide.ai-project.06-task-expansion` with {project, section} as provided above.  If this information is missing, request it from the Project Manager.  Continue working in the role: Senior AI as described in the Process Guide.

Output results into a new file private/tasks/nn-tasks-{section}.md where nn is a sequential index (01, 02, etc.). In the filename, convert {section} to lowercase, drop any special characters, and replace any ' ' with '-'.

Note: this is a project and process task, not a coding task.
```

##### Legacy Task Implementation
*Note: Use slice-based approach for new projects.*
```markdown
We are working on the {project, section} tasks in phase 4 of `/project-documents/project-guides/guide.ai-project.00-process`.  If framework or platform are specified, guide(s) for the framework(s) should be provided in `/project-documents/framework-guides/{framework}/introduction.md`.  If tools are specified, guide for each tool should be available at `/project-documents/tool-guides/{tool}/introduction.md`, for each tool or referenced.

Your role is "Senior AI".  Your job is to complete the tasks in the /project-documents/private/tasks/nn-tasks-{section}.md file (where nn is the sequential index).  Please work through the tasks, following the guidelines in our project guides, and using the rules in the rules/ directory.  STOP and confer with Project Manager after each task.  Do not update windsurf-updates file until confirmation from Project Manager.

Work carefully and ensure that each task is verified complete before proceeding to the next.  If an attempted solution does not work or you otherwise find reason to try another way, do not make more than three such attempts without stopping and obtaining confirmation form Project Manager, and do not proceed to additional tasks in this case.

If our tasks document contains Phase 3 and Phase 4 items in our assigned area, use the Phase 4 items (with subtasks) as implementation items and Phase 3 as overview.  Don't forget to check off items when complete, and when all of the subtasks for something are complete, check off its corresponding phase 3 item, provided there is one (there should be).

If you need more information, stop and wait for confirmation from the Project Manager.  Once a task is complete and *verified with the project manager*, check it off in the section tasks file.

Notes: 
* ignore case sensitivity in all file and directory names.  If you cannot locate the files referenced above STOP until receiving information from the project manager.  Do not guess, assume, or proceed without them.
* do not mark any tasks in the 'three such attempts' or similar error state as complete.
```

##### Model Change or Context Refresh
*Use this prompt when you need to switch models or refresh a model's understanding of the codebase and our rules.*

```markdown
The following provides context on our current work, and may contain the following input: { project, section, issue or update, subtask, tool, note }.  All but { project, section } are optional, but expect some to be present.  

Refer to the Resource Structure in `guide.ai-project.00-process` for a description of resources and their locations.  If {tool} is in use, you should receive an additional note (ideally along with this request) describing additional relevant information.  If you do not receive such information, confirm with Project Manager that this was not an accidental omission.

If you were previously assigned a role, continue in that role.  If not, assume role of Senior AI as defined in the guide mentioned in the preceding paragraph.

**Directory Structure by Development Type:**
- **Regular Development** (template instances): Use `project-documents/private/` for all project-specific files
- **Monorepo Template Development** (working on templates or monorepo structure): Use `project-artifacts/` for project-specific files that would normally go in `private/`
- The Project Manager should inform you which mode is active for the current work
```

##### Feature Design
*Use this to add a design for large feature or address architectural issues in an existing project.*

```markdown
We're starting work on a new feature in project {project}.  This is an abbreviated version of our Project Kickoff instruction used for large features or architectural tasks.  

We will use our curated AI Project Creation methods in `guide.ai-project.00-process` (can also be referred to as Project Guide or Process Guide) to assist us in designing and performing the work.  Your role as described in the Project Guide is Technical Fellow.  

The actual feature description should be contained in the appropriate project-specific directory (either `project-documents/private/project-guides/feature.{feature}.md` for regular development or `project-artifacts/project-guides/feature.{feature}.md` for monorepo template development).  Request from Project Manager if you cannot find it.

The first thing we need to do is to use our Project Guide together with the additional concept information to create a concise low level design for our feature.  Document this in the appropriate features directory (`private/features/` or `project-artifacts/features/`) in file `nn-feature-{feature}.md`.  Create the features/ directory if needed. Start nn at 01 if no other feature files already exist.   

If at any point in this process you are missing required information, do not guess or proceed without it.  Stop and request the information from Project Manager.
```

##### Feature Create Tasks
*Implement Phase 3 - Task Breakdown for feature.  Use the prompt above to add the feature design first.  Output of this work is a standard {section} in the 03-tasks.{project}.md file, after which point, the feature can be treated like any other set of tasks.*

```markdown
Now we need to create tasks for our feature {feature} in {project}.  Apply the Phase 3 process as described in `00-guide.ai-project.process.md` to the feature file which should be present in `features/nn-feature.{feature}.md`.  We will create a new section for our tasks in `03-tasks.{project}.md`.  

Specifically, do the following:
* Add a section to `03-tasks.{project}.md` using our {feature} as the section name.
* Perform the Phase 3 procedure for our {feature}, using our feature file described above as the spec for this work.

Continue to follow all process guidelines, and remember to use `directory-structure.md` to resolve any file or directory naming or location issues. If any required files are not present or you do not have sufficient information, stop and request update from Project Manager before continuing. 
```

