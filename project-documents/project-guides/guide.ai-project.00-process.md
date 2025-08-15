---
layer: process
phase: 0               # 0 = meta-guide that defines all phases
phaseName: meta
guideRole: primary
audience: [human, ai]
description: Master process guide describing roles and the 6-phase workflow.
dependsOn: []
---

#### Overview
This document describes our AI project planning methodology and structure.

#### Roles
- Project Manager & Tech Lead: Typically a human. Oversees overall project direction, coordinates tasks, and makes key decisions.
- Technical Fellow (AI) : A “senior” AI model (e.g., GPT o3, GPT-4.5) providing high-level
  strategy, architecture ideas, brainstorming support.
- Researcher (AI): A thinking or deep research AI (o3, o1 pro, Sonnet 4 Thinking, Grok3).
- Senior AI (Agents): Specialized AI agents or tools (e.g., Claude Code,
  Windsurf Cascade, Cursor) capable of advanced tasks—code generation, advanced logic, or system design.
- Junior AI: Examples: ChatGPT o4-mini-high, 4-o, Claude 4 Sonnet, Grok3, DeepSeek (US-based). These can still be top-tier AIs in terms of capabilities, but in this context they do not make product decisions and are managed by the agents (Senior AI or Project Manager).
- Code Reviewer: (Human or AI)  
  Reviews code and documents findings in accordance with the AI Code Review Guide.

Note: Multiple roles can be combined in a single contributor (human or AI), and there can also be multiple contributors in a given role. The Project Manager will assign roles.

---
#### Project Phases
Each project phase must be approved by Project Manager & Tech Lead before moving on to the next phase. When working on project phases, ensure you have all required information first. If in doubt, request and obtain the required information from the Project Manager before proceeding. Do not guess or make assumptions.

1. Phase 1: Concept
   - Project Manager provides an initial product concept in plain language.
   - Collaborate with the Technical Fellow (AI) to refine the vision, identify challenges, and define the core product concept.
   - Outcome: _A short doc describing the problem, target users, and overall solution approach._

2. Phase 2: Spec Creation
   - The Project Manager will provide project-specific information relevant to the spec including proposed technical stack (including 3rd party tools), and additional specific requirements.
   - The Project Manager and Technical Fellow (AI) iterate on the core features and technical stack.
   - Produce a Spec Doc outlining:
     - Tech stack 
	     - If we are applying technologies for which we do not have knowledge, indicate this.  This means you need to search in tool-guides for available knowledge.
	     - Project Manager to gather missing knowledge and add to project.
	     - A concise list or object describing the tech stack components or tools and whether or not we have additional knowledge guides on each one.
     - Top-level features
     - Major workflows or data flows
     - Architectural considerations (if relevant)
     - Sample data, quick UI sketches/wireframes
   - Keep the doc concise.
   - Outcome: _A living doc with bullet points for features, known constraints, and initial architectural ideas._

3. Phase 3: Detailed Task Breakdown
   - Convert each feature or bullet point in the spec into granular, actionable tasks
   - For each {tool} in use described in the spec, ensure that you consult knowledge in `tool-guides/{tool}/`.  If not present search web if possible and alert Project Manager.
   - Only include tasks that can reasonably be completed by an AI. Do not include open-ended human-centric tasks such as SEO optimization.
   - If insufficient information is available to fully convert an item into tasks, _stop_ and request clarifying information before continuing. Ideally, perform analysis and identify missing information before creating the tasks.
   - Keep section names concise and self explanatory, ex: Project Setup, not: Project Setup & Base configuration. Follow all markdown guidelines.
   - use codingrules to guide task creation unless more specific rules are available.  If not available STOP and confirm with Project Manager before proceeding.
   - This is not a coding phase.
   - For each task, note acceptance criteria.

   * Each task must have:
     - Clearly defined scope (precise and narrow)
     - Actionable, unambiguous instructions for junior AI or human developer
     - Success criteria clearly defined (what done looks like)

   * Example 1-point task format:
   - [ ] **Create Next.js app skeleton**
     - Initialize new Next.js project with React and TypeScript support
     - Verify it runs on local environment without errors
     - Success: Local server running at http://localhost:3000 with default Next.js page visible
   - [ ] **Integrate SciChart React component**
     - Install and configure SciChart React Community edition
     - Create a sample candlestick chart component to display provided dummy tick data
     - Success: Component renders properly with dummy data on web app page

   - Common Task Considerations:
	   - If this project contains package.json, ensure a project setup task is created and add the scripts contained in `snippets/npm-scripts.ai-support.json` to its scripts block.  This also applies when creating package.json.

   - Outcome: _A detailed task list in raw markdown format that can be used for delegating tasks to junior AIs._

4. Phase 4: Task enhancement and expansion by section.
   - For each section in the Detailed Task Breakdown, examine the tasks to see if we can enhance or expand/subdivide them to improve the chances that our "junior" AI workers can complete assigned tasks on their own.
   - If a task would not benefit from expansion, output it verbatim.
   - Use `guide.ai-project.04-task-expansion` the guide this phase.
   - Project Manager will assign sections and we should only perform them as assigned. Do not just go looping through them all.
   - Success: All tasks in our assigned section have been processed and either output as is, or enhanced and divided into further subtasks.
   - Outcome: _raw markdown containing the task expansions and enhancements for our assigned section_.

5. Phase 5: Execution (AI/Human Collaboration)
   - Tasks are assigned to the Senior AI or human developers. They will delegate tasks to the Junior AIs or junior human developers.
   - The Project Manager or Senior AI (in a reviewer capacity) perform:
   - Code reviews
   - Design reviews
   - Ensuring alignment with the spec/vision
   - Outcome: _Working software increments, regularly tested and validated._

6. Phase 6: Continuous Iteration
   - As tasks complete, refine the spec if requirements change or new insights arise.
   - Revisit the Senior AI or Researcher AI to address emerging issues or new ideas.
   - Re-prioritize the backlog to reflect the latest changes.
   - Outcome: _An agile, iterative development flow that stays organized while adapting to evolving requirements._


---

### Resource Structure
The following structure should be present in every project.  Assume files are in markdown format (.md) unless otherwise specified.  Tool documentation may also be present as .pdf.
### Resource Structure  (updated 2025-05-01)

```
{project-root}/
└── project-documents/
    ├── project-guides/    # process & methodology (start here)
    ├── framework-guides/  # app-level platforms (Next.js, Astro …)
    ├── tool-guides/       # importable libs (SciChart, Three.js …)
    ├── api-guides/        # external data endpoints (USGS, ArcGIS …)
    ├── domain-guides/     # cross-cutting subject matter (hydrology …)
    ├── snippets/          # reusable templates / code fragments
    └── private/           # project-specific artifacts (tasks, UI, reviews)
```

###### private subfolders
```markdown
* private/: information customized to our current project.
* private/code-reviews: code review findings, task lists, and 
  resolutions.
* private/maintenance:  maintenance item issue and resolution 
  tracking.
* private/project-guides: project-specific guide customizations.
* private/tasks: task breakdowns & phase documents.
* private/ui: UI specific designs, tasks, and guidance for our 
  project.
* private/ui/screenshots: supporting images for UI information.
```

> Each folder has its own `README.md` or `introduction.md` with deeper context.  
> Attachments live in `project-documents/z-attachments/`.

###### Project Guide Files
```markdown
These files, shared by all of our projects, are contained in {project-root}/project-documents/project-guides/.  Synonyms (syn, aka (for also known as)) are provided as some older documentation may still reference by these names.

* guide.ai-project.00-process (aka: AI Project Guide): this document.  Describes 
  roles and project phases.  Always start here.
* guide.ai-project.01-concept (aka: AI Project Concept Guide): details on creating 
  Project Concept documents.
* guide.ai-project.02-spec (aka: AI Spec Guide): details on creating Project 
  Specification (Spec) documents.
* guide.ai-project.04-task-expansion (aka: AI Task Expansion Guide): specific 
  guidance on task expansion (described in general in the AI Project Guide).
* guide.ui-development.ai (aka: AI Development Guide - UI): specific guidance 
  pertaining to UI/UX tasks.
* guide.ai-project.05-code-review (aka: AI Code Review Guide): specific guidance for 
  performing and responding to code reviews.
* prompt.ai-project.system (aka: AI Project Prompt Templates): parameterized 
  prompts to assist in creating and completing projects using the AI Project 
  Guide. Usable by humans or AIs.
* rules/: modular code rules organized by platform/technology.  Copy to IDE-specific directories (.cursor/rules/, .windsurf/rules/, etc) as needed.  

Additional Relevant in `project-documents/` Directory:
* directory-structure: defines our `project-documents` directory structure
* file-naming-conventions: describes our file-naming conventions
```

###### Tool Guide Files
```markdown
These files provide knowledge on use of 3rd party tools, both in general and in specific {tool} subdirectories.  All documents for {tool} will be in the `tool-guides/{tool}/` subdirectory.  Always start with tool's introduction, which should be located at `tool-guides/{tool}/introduction.md`.  If you cannot locate this, confirm usage of the tool and presence of its documentation with the Project Manager before starting work.

* introduction (aka: AI Tool Overview - {tool}): Overall guidance for 
  {tool}.  Always start here.
* setup: Information on installing and configuring {tool}.
* guide.{descriptions}: our specific guides and indices.  If `documentation` 
  subdirectory is present, these guides may be built from review of 
  documentation files.
* {tool}/documentation: documentation by tool authors, from web or download.  
  May be in alternate formats such as PDF.
* {tool}/research-crumbs: specific knowledge items for {tool}.  often used to 
  provide additional detail for a complex {tool} task.
```
