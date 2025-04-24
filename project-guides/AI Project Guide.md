#### Overview

This document describes our AI project planning methodology and structure.

#### Roles

- Project Manager & Tech Lead: Typically a human. Oversees overall project direction, coordinates tasks, and makes key decisions.
- Technical Fellow (AI) : A “senior” AI model (e.g., GPT-4.5) providing high-level strategy, architecture ideas, brainstorming support.
- Researcher (AI): A thinking or deep research AI (o3, o1 pro, Claude 3.7 Thinking, Grok3).
- Senior AI (Agents): Specialized AI agents or tools (e.g., Claude Code, Windsurf Cascade) capable of advanced tasks—code generation, advanced logic, or system design.

- Junior AI: Examples: ChatGPT o3-mini-high, 4-o, Claude 3.7 Sonnet, Grok3, DeepSeek (US-based). These can still be top-tier AIs in terms of capabilities, but in this context they do not make product decisions and are managed by the agents (Senior AI or Project Manager).

- Reviewer: Human (typically the Project Manager)  
  Ensures quality control via code/design reviews and alignment with project goals.

Note: Multiple roles can be combined in a single contributor (human or AI), and there can also be multiple contributors in a given role. The Project Manager will assign roles.

---

#### Project Phases
Each project phase must be approved by Project Manager & Tech Lead before moving on to the next phase. When working on project phases, ensure you have all required information first. If in doubt, request and obtain the required information from the Project Manager before proceeding. Do not guess or make assumptions.

1. Phase 1: Concept

   - Project Manager provides an initial product concept in plain language.
   - Collaborate with the Technical Fellow (AI) to refine the vision, identify challenges, and define the core product concept.
   - Outcome: _A short doc describing the problem, target users, and overall solution approach._

1. Phase 2: Spec Creation

   - The Project Manager and Technical Fellow (AI) iterate on the core features.
   - The Project Manager will provide a project-customized version of AI Project Spec Guide.
   - Produce a Spec Doc outlining:
     - Top-level features
     - Major workflows or data flows
     - Architectural considerations (if relevant)
     - Sample data, quick UI sketches/wireframes
   - Keep the doc concise.
   - Outcome: _A living doc with bullet points for features, known constraints, and initial architectural ideas._

1. Phase 3: Detailed Task Breakdown

   - Convert each feature or bullet point in the spec into granular, actionable tasks
   - Only include tasks that can reasonably be completed by an AI. Do not include open-ended human-centric tasks such as SEO optimization.
   - If insufficient information is available to fully convert an item into tasks, _stop_ and request clarifying information before continuing. Ideally, perform analysis and identify missing information before creating the tasks.
   - Keep section names concise and self explanatory, ex: Project Setup, not: Project Setup & Base configuration. Follow all markdown guidelines.
   - Expect to receive a set of coding rules or guidelines to accompany this task. Confirm receipt of this file or that it is not needed.
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
   - Outcome: _A detailed task list in raw markdown format that can be used for delegating tasks to junior AIs._

1. Phase 4: Task enhancement and expansion by section.
   - For each section in the Detailed Task Breakdown, examine the tasks to see if we can enhance or expand/subdivide them to improve the chances that our "junior" AI workers can complete assigned tasks on their own.
   - If a task would not benefit from expansion, output it verbatim.
   - Use the AI Project Task Expansion Guide to guide this phase.
   - Project Manager will assign sections and we should only perform them as assigned. Do not just go looping through them all.
   - Success: All tasks in our assigned section have been processed and either output as is, or enhanced and divided into further subtasks.
   - Outcome: _raw markdown containing the task expansions and enhancements for our assigned section_.
1. Phase 5: Execution (AI/Human Collaboration)

   - Tasks are assigned to the Senior AI or human developers. They will delegate tasks to the Junior AIs or junior human developers.
   - The Project Manager or Senior AI (in a reviewer capacity) perform:
   - Code reviews
   - Design reviews
   - Ensuring alignment with the spec/vision
   - Outcome: _Working software increments, regularly tested and validated._

1. Phase 6: Continuous Iteration
   - As tasks complete, refine the spec if requirements change or new insights arise.
   - Revisit the Senior AI or Researcher AI to address emerging issues or new ideas.
   - Re-prioritize the backlog to reflect the latest changes.
   - Outcome: _An agile, iterative development flow that stays organized while adapting to evolving requirements._

---

### Resources
Resources directory structure (approximate).
{project-root}/project-documents: knowledge resources. supports at least the following subdirectories:
our-project: project files tailored to the current project, task lists, maintenance updates, etc
our-project/ui: ui mockups

### Specific Guide Notes:
- AI Project Guide: this document. provides information on roles and project phases, including phase details.
- AI Project Prompt Templates: templatized message prompts useful for interacting with the project phases.
- AI Project Concept Guide: guide to assist in creation of project concept documents tailored to individual projects.
- AI Project Spec Guide: describes our methods for creating detailed project specifications (spec)
- AI Project Task Expansion Guide: describes our methods for expanding and enhancing task lists.
- AI Tool Guide - {toolname}: gives overview on use of {toolname} and where to look for additional information.
