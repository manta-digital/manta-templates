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
We're working in our guide.ai-project.00-process, Phase 4: Slice Design (Low-Level Design). Create a detailed design for slice: {slice} in project {project} by following the instructions here. These instructions may be used for adding a new slice with provided description, or designing {slice} included in the project slice plan.

Use the following inputs:
1. The project high-level design (03-hld.{project}.md) if applicable.
2. One of the following (only one will be applicable):
	1. Slice description provided with this request.
	2. The project slice plan at `03-slices.{project}.md`.

Note: if you are using the slice plan, it must contain information on this slice.

Create the slice design document at `private/slices/nn-slice.{slice}.md` where nn is the appropriate sequential number. Your role is Technical Fellow.

Include:
- YAML frontmatter as described below.
- Detailed technical decisions for this slice
- Data flows and component interactions
- UI mockups or detailed specifications (if applicable)
- Cross-slice dependencies and interfaces
- Any conflicts or considerations discovered

Avoid:
- Time estimates in hours/days/etc.  You may use a 1-5 relative effort scale.
- Extensive benchmarking tasks unless actually relevant to this effort.
- Extensive or speculative risk items.  Include only if truly relevant.

YAML Frontmatter Detils:
```yaml
---
item: {item-name}
project: {project}
type: slice
github: {url of github issue, if one is related}
dependencies: [list-if-any]
projectState: brief current state
status: not started
lastUpdated: YYYY-MM-DD
---
```
```
If framework or platform are specified, guide(s) for the framework(s) should be provided in `/project-documents/framework-guides/{framework}/introduction.md`. If tools are specified, guide for each tool should be available at `/project-documents/tool-guides/{tool}/introduction.md`.

Stop and request clarification if you need more information to complete the slice design.
```

##### Slice | Feature Task Breakdown (Phase 5)
*This should be usable for Slice or Feature task breakdown.*

```markdown
We're working in our guide.ai-project.00-process, Phase 5: Slice Task Breakdown. Convert the design for {slice | feature} in project {project} into granular, actionable tasks.  Note that this request can be used for *slice* or *feature*, but only one will be applicable to a particular request.

Your role is Senior AI. Use exactly one of the following as input:
1. The slice design document `private/slices/{nn}-slice.{slice}.md`.
2. The feature design document 'private/features/{nn}-feature.{feature}.md'.

Create task file at `private/tasks/nn-tasks.{slice|feature}.md`.  

Include:
1. YAML front matter including slice name, project, LLD reference, dependencies, and current project state
2. Context summary section
3. Granular tasks following Phase 5 guidelines
4. Create separate sub-tasks for each similar component.
5. Organize so that tasks can be completed sequentially.
6. Use checklist format for all task files.

Avoid:
- Time estimates in hours/days/etc.  You may use a 1-5 relative effort scale.
- Extensive benchmarking tasks unless actually relevant to this effort.
- Extensive or speculative risk items.  Include only if truly relevant.

For each {tool} in use, consult knowledge in `tool-guides/{tool}/`. Follow all task creation guidelines from the Process Guide.

Each task must be completable by a junior AI with clear success criteria. If insufficient information is available, stop and request clarifying information.

This is a project planning task, not a coding task.
```

##### Slice | Feature Task Breakdown - Explicit Follow (Phase 5 - Extra)
*Use this when you have a detailed slice design especially one containing code that may have been iterated on in order to solve complex or subtle design problems.  Add this to the regular Slice | Feature Task Breakdown*

```markdown
Note that our slice design is intricate, detailed, and has been refined extensively in order to address complex and/or subtle issues.  The slice design contains code, and we *need* to use this code in our task planning.

As you are planning tasks, proceed *carefully* through the slice design, creating tasks to accomplish the design *exactly* as presented.  Once you complete the task breakdown, review it in light of the slice design to ensure that:
1. You completely addressed the design.  If there are similar items, for example numerous wrapper components, ensure that your tasks explicitly address creation of each one.  
2. You did not miss any details.  This is critical.  Do not "gloss over", simplify, or add workarounds to any coding sections of the design even though they may be difficult.
   
Note also that tasks may reference the relevant design document.  You do not need to replicate large pieces of the design document all over the task list.  Ensure that references are accurate.  Do not assume or guess anywhere in this task.

After creation of task list, you must review the entire list against the slice design to ensure that these requirements are met.
```


##### Slice Task Expansion (Phase 6)
```markdown
We're working in our guide.ai-project.00-process, Phase 6: Task Enhancement and Expansion. Enhance the tasks for slice {slice} in project {project} to improve the chances that our "junior" AI workers can complete assigned tasks on their own.

Use `guide.ai-project.06-task-expansion` as your detailed guide for this phase. Work on the task file `private/tasks/nn-tasks.{slice}.md`.

Your role is Senior AI. For each task:
- If it would benefit from expansion or subdivision, enhance it.
- If it's already appropriate, output it verbatim.
- Ensure all tasks are accounted for.

After any expansion, review it against the original unexpanded task and ensure that your expansion is a detailed representation of the original task, not a reinterpretation or change of the original task.

Output results by updating the existing task file. Success: All tasks have been processed and either output as is, or enhanced and divided into further subtasks.

Note: This is a project planning task, not a coding task.
```

##### Slice | Feature Implementation (Phase 7)
```markdown
We are working on {slice | feature} in project {project}, phase 7 of `/project-documents/project-guides/guide.ai-project.00-process`. 

Your job is to complete the tasks in the `/project-documents/private/tasks/{nn}-tasks.{slice|feature}.md` file. Please work through the tasks, following the guidelines in our project guides, and using the relevant provided rules (`rules/`, `CLAUDE.md`, etc).  Your role is "Senior AI". 

Use exactly one of the following (only one match should exist):
- The slice design at `private/slices/{nn}-slice.{slice}.md`.
- The feature design at `private/features/{nn}-feature.{feature}.md`.

Always git commit at least once per task but ideally after every section of items containing a 'Success:' criteria.  For example, if a file contains Task 1.2, Task 1.2.1, commit after each task.  If 1.2.1 contains multiple checklists each with its own 'Success:' criteria, commit after any section containing Success.  STOP and confer with Project Manager after each task, unless directed otherwise 

Work carefully and sequentially through the tasks, ensuring that each task is verified complete before proceeding to the next.  You should write unit tests for code as you work through the task. Ensure that tests pass and task is complete before moving to the next.

If an attempted solution does not work or you find reason to try another approach, do not make more than three attempts without stopping and obtaining confirmation from Project Manager.

Be sure to check off tasks as they are completed.  If a parent file (ex: `03-slices.{project}.md`) contains checklist items, check off parent items after all child items are complete. If a `task-checker` tool|agent is available to you, use it.

Maintain the YAML frontmatter including:
- Status: not-started, in-progress, complete, not-applicable
- Date updated

Notes: 
- Use the task-checker to manage lists if it is available to you.
- Ignore case sensitivity in all file and directory names.
- Use the directory-structure and file-naming-conventions guides.
- If you are mising required information or referenced files, STOP and obtain 
  from Project Manager (PM).
- Do not guess, assume, or proceed without required files.
```


##### Feature Design
*Use this to create a feature file for a feature that is too big to just run tasks for or "wing it", but doesn't represent a full vertical project slice.*
```markdown
We're adding a new feature to project {project}. Name this feature as described or, if creating from a github issue, create a concise but descriptive name from the issue title.

Use relevant methodology from `guide.ai-project.00-process` to create the design for the feature.  Keep this concise and minimal.  Your role is Technical Fellow.

The feature description should be provided by the Project Manager. Additionally consider the existing project context including.  

- High-level design (03-hld.{project}.md)  
- Current project state

Create:
1. Add indexed section in tasks/91-adhoc-features.  Create file if needed.  
2. Title the section {nn}-feature.{feature}.md.
3. Concise feature design document (features/{nn}-feature.{feature}.md). 

Add YAML FrontMatter to your created file:
```yaml
---
item: {item-name}
project: {project}
type: feature
github: {url of github issue, if one is related}
dependencies: [list-if-any]
projectState: brief current state
status: not started
lastUpdated: YYYY-MM-DD
---
```
``` markdown
Follow dependency management - identify what foundation work project elements may depend on or be affected by this change.

Guidelines:
1. Stick to relevant information only.  
2. Follow Phase 4 guidelines substituting 'feauture' for 'slice' as needed.

Avoid:
1. Vague fluff about future performance testing or involved benchmarking, 
   unless this is specifically relevant.  
2. Avoid vague or speculative Risk Items.
3. Do not add a time estimate in hours/days etc.  You may use 1-5 relative 
   effort scale.

If you need more information about the feature requirements, stop and request from Project Manager.
```


##### Ad-Hoc Tasks (Feature | Maintenance)
```markdown
Create tasks for {feature | maintenance item} in project {project}. This is for smaller work items that need task breakdown but don't require full slice design.

Your role is Senior AI. Analyze the {feature/maintenance item} and create a task file at `private/tasks/nn-tasks.{item-name}.md` with:

1. YAML front matter:
---
item: {item-name}
project: {project}
type: feature|maintenance|bugfix tasks
dependencies: [list-if-any]
projectState: brief current state
lastUpdated: YYYY-MM-DD
---

2. Context summary explaining the work
3. Granular tasks following Phase 5 guidelines

Skip LLD creation - go directly from description to implementable tasks. Each task should be completable by a junior AI with clear success criteria.

If the item is too complex for this approach, recommend creating a design file instead. If you need more information about the requirements, stop and request from Project Manager.  Keep tasks focused and atomic.
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
* Do not guess, assume, or proceed without required files.
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
### Experimental
*Less than no guarantees here.  Generally promoted to active, or deprecated.*

***
### Deprecated 

Experimental: TDD
*Note that this prompt was an absolute fail and it is not recommended to use this.  Preserved to assist in creating a better one.*

```markdown
You are implementing tasks using strict Test-Driven Development.  Continue to function in your assigned role.  If you have no assigned role, assume: Senior AI.

MANDATORY TDD CYCLE:
1. Write a failing test that specifies the next small behavior
2. Run the test - confirm it fails for the right reason
3. Write minimal REAL code to make the test pass.  Never write the implementation in the test file.
4. Run tests - confirm they pass
5. Refactor if needed while keeping tests green
6. STOP and ask for next test case

CRITICAL CONSTRAINTS:
- Never write production code without a failing test first
- Never write more than one failing test at a time
- Never implement multiple behaviors in one cycle
- Always implement real code to get test to pass. Do not use irrelevant utility 
  functions and plan to "integrate later".  Never write the implementation in 
  the test file.
- Always run tests and show results before proceeding
- Refactor only when tests are green

REQUIRED FOR EACH CYCLE:
- Exact test name and assertion
- Test output showing failure
- Minimal implementation (not full solution)
- Test output showing success
- Explicit "Ready for next test case"
```


