---
layer: snippet
docType: template
purpose: reusable-llm-prompts
audience:
  - human
  - ai
description: Parameterised prompt library mapped to each project phase.
dependsOn:
  - guide.ai-project.process.md
npmScriptsAiSupport: "!include ../snippets/npm-scripts.ai-support.json"
---

This document contains prompt templates considered useful in applying the `guide.ai-project.process` and performing additional supplemental tasks.
##### Project Object Model and Parameters
```python
# Project Object Model and Parameters.  Use this when resolving user requests
# concerning project items and containing items enclosed in brackets code style
# { }

# objects
phase {
    n: integer;
    name: string;
    description: string;
}

# parameters (enclose in {}, use object syntax for multiple)
project: string;
phase: phase;
```

##### Project Kickoff
```markdown
input template: {project, project concept description} = { , }

We're starting work on a new project {project}.  We will use our curated AI Project Creation methods in `guide.ai-project.process` (can also be referred to as Project Guide, Process Guide, or the guide) to assist us in designing and performing the work.  Your role as described in the Project Guide is Technical Fellow.

The actual concept description as well as additional concept will be provided by project manager for injection into our process.  The first thing we need to do is to use our Project Guide together with the additional concept information to create documents tailored to our project.  We and our AI team members will use these to design, implement, and verify project tasks.

To do this, we need to use the Project Guide together with information provided to create our concept document. If any areas in the Concept guide need more information that is not provided, request from the Project Manager before continuing.  

When creating these project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.  Remember that you can use your context7 tool to access relevant documentation on almost any tool.  Pause here until you receive the project concept description from the Project Manager (me).
```

##### Project Phase
```markdown
input: {project, n, phase, optional: guide}

{if n>1} Phase {n-1} is approved!{end-if}

Now let's work together to create the {phase.name} for {project}.  Refer to our concept document (guide.ai-project.concept.md) describing the project.  We're now working on phase {n} - {phase}.  To do this, we'll use our `guide.ai-project.process` for our specific phase {if guide != null, add the following}: combined with additional information (potentially tailored to {project}) in {guide}.{end-if}.  We will not proceed beyond phase {n} until that output is complete, and then approved by the Project Manager. 

When creating project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.
```

##### Task Creation
```markdown
{project, section, goal} = { , }
Note: If goal is not input, request it.

Generate detailed tasks required to accomplish {goal} granular enough to be delegated to a junior AI.  Do not include any tasks that could not be completed by an AI or agent.  These should be very small tasks, think subtasks in a 1-point story.  

This is a variation of Phase 4 in `guide.ai-project.process`.  Please request if you don't have it.  In general, do not write code.  Our goal is to create detailed enough tasks that our junior team members can write the code.  Do not deviate from {goal}.

Make sure to follow our rules in .windsurfrules.  Additionally reference `guide.ui-development.ai.md` if this is a UI goal.  If you do not know if this is a UI goal, ask.  If your user gives you a UI goal that does not include UI in it, give them a good natured hard time because it is good for them and they will appreciate it.
```

##### Task Expansion
```markdown
{project, section} = { , }
We're working in our guide.ai-project.process, Phase 4: Task expansion and Enhancement by section.  Use `guide.ai-project.task-expansion` with {project, section} as provided above.  If this information is missing, request it from the Project Manager.  Continue working in the role: Senior AI as described in the Process Guide.

If you have all required inputs and sufficient information, go ahead and perform the tasks as instructed in the guide.  If not, request required information then proceed when received.

Output results into a new file our-project/tasks.{section}.md. In the filename, convert {section} to lowercase, drop any special characters, and replace any ' ' with '-'.
```

##### Task Evaluation and Expansion (v0.2)
Use to process a proposed Phase 3 task list, expanding tasks as needed.

```markdown
Analyze the file tasks.{project}.md in the `our-project` directory.  If {section} is specified, confine your analysis only tasks for {section}.  If you cannot locate or read this file or other inputs, stop and request from Project Manager.  Do not proceed without them.  This is a Project and Process work order, *not* a coding one.  Your role as defined in `guide.ai-project.process` is Technical Fellow.

Review the tasks in the file.  Is granularity and level sufficient to allow a Junior AI or human programmer to implement the task?  If splitting into additional detail or subtasks would increase chances for success, do so according to `guide.ai-project.task-expansion`.

Remember, do not include any subjective or other tasks that could not realistically be accomplished by an AI acting as a Junior Developer.

For any section with tasks benefitting from expansion as described above, record the Phase 3 *and* Phase 4 tasks in a file `our-project/tasks.{section}.md` where {section} will be the relevant section from the main tasks file.  Create the new expande task files if they don't exist.  If you encounter errors creating or editing the reuquisite file, stop and wait for the Project Manager.

In the output filename, convert {section} to lowercase, drop any special characters, and replace any ' ' with '-'.
```

##### Task Implementation (v0.2)

```markdown
We are working on the {project, section} tasks in phase 4 of `guide.ai-project.process`.  If framework or platform are specified, guide(s) for the framework(s) should be provided in `/project-documents/framework-guides/{framework}/introduction.md`.  If tools are specified, guide for each tool should be available at `/project-documents/tool-guides/{tool}/introduction.md`, for each tool or referenced.  If no documentation is available or additional documentation is needed, use the "context7" tool in your toolbox.  

Your role is "Senior AI".  Your job is to complete the tasks in the /project-documents/our-project/tasks.{section}.md file.  Please work through the tasks, following the guidelines in our project guides, and using the rules in the coderules file.  STOP and confer with Project Manager after each task.  Do not update windsurf-updates file until confirmation from Project Manager.

Work carefully and ensure that each task is verified complete before proceeding to the next.  If an attempted solution does not work or you otherwise find reason to try another way, do not make more than three such attempts without stopping and obtaining confirmation form Project Manager, and do not proceed to additional tasks in this case.

If our tasks document contains Phase 3 and Phase 4 items in our assigned area, use the Phase 4 items (with subtasks) as implementation items and Phase 3 as overview.  Don't forget to check off items when complete, and when all of the subtasks for something are complete, check off its corresponding phase 3 item, provided there is one (there should be).

If you need more information, stop and wait for confirmation from the Project Manager.  Once a task is complete and *verified with the project manager*, check it off in the section tasks file.

Notes: 
* ignore case sensitivity in all file and directory names.  If you cannot locate the files referenced above STOP until receiving information from the project manager.  Do not guess, assume, or proceed without them.
* do not mark any tasks in the 'three such attempts' or similar error state as complete.
```

##### Impromptu or Task Detail Processing

*Background or Context*
```markdown
Hello.  Please ensure that you have {project, section, issue, tool} inputs before proceeding with this work.  Issue may also be specified as goal or update.  Tool is optional, but if not provided, confirm that this was not an accidental omission. If tool is present, make sure to follow note: {tool} which should be included with this request.

Your role is "Senior AI".  Your job is to evaluate the tasks for our {issue} which should be contained in /project-documents/our-project/tasks.{section}.md or optionally tasks.{section}.phase-{n}.md.
```

*Task Creation Section*
```
Start by examining the tasks in light of Phase 3 and Phase 4 of `guide.ai-project.process`.  For Phase 4, additionally refer to `guide.ai-project.task-expansion` and follow its links as needed.  Expand detail as needed according to the guide.

All output should be in raw markdown code format using guidelines (including checkboxes) specified in our rules.  This is NOT a code writing assignment. Write output to the proper section of the tasks file mentioned above. 

If you are missing any information, STOP and obtain from project manager.  Do not move on to additional tasks.
```

##### Impromptu Task (v0.2)
```markdown
Hello.  We need to add {feature} to {project, section}.

Start by examining {feature} in light of Phase 3 and Phase 4 of `guide.ai-project.process`.  For Phase 4, additionally refer to `guide.ai-project.task-expansion` and follow its links as needed.  Expand detail as needed according to the guide.  Again project-customized versions of the respective guides supersede the general versions.

All output should be in raw markdown code format using guidelines (including checkboxes) specified in our rules.  This is NOT a code writing assignment. Write output to the proper section of the tasks file mentioned above. 

If you are missing any information, STOP and obtain from project manager.  Do not move on to additional tasks.
```


##### Add Subtask to Existing Item
*Use when directly adding subtasks to existing item.*

```markdown
input {
  project, section, issue, subtask, tool
}

Hello.  Please ensure that you have input as described above in input before proceeding with this work.  Issue may also be specified as goal or update.  Tool is optional, but if not provided, confirm that this was not an accidental omission. If tool is present, make sure to follow note: {tool} which should be included with this request.

Your role is "Senior AI".  Your job is to evaluate the tasks for our {issue} which should be contained in /project-documents/our-project/{project} - tasks - {section}.md.  If it does not exist, create it.  If it does not contain a top-level H3 entry for {issue} add it, and add H5 entries for Phase 3 Tasks and Phase 4 Subtasks.  If you add a new H3 section to a non-empty file, add a blank line to separate from any existing sections and lists.

Add subtask(s).  If subtask as presented by user is sufficiently small and detailed enough to be represented in a single Phase 4 item (as defined in `guide.ai-project.process`), add it as such.  If subtask is too big, STOP and confirm that the Project Manager wishes to perform task expansion here, and do not proceed without this confirmation.

All output should be in raw markdown code format using guidelines (including checkboxes) specified in our rules.  We will implement the task in code, but STOP and confirm the tasks are represented effectively before starting to write code. 

If you are missing any information, STOP and obtain from project manager.  Do not move on to additional tasks.
```

##### Subtask Continuation
*Use when continuing to add subtasks in order to minimize redundant prompt.*
```markdown
input {
  issue/update,
  subtask,
}

Continue to operate in the "Senior AI" role.  Continue using {project, section, issue, tool} that we have been working with. Ensure that you have needed documentation for {tool}.  Our goal is to add a new {subtask} into an existing issue or update section.

Evaluate subtask as presented by user.  If it is too large to be accomplished in a single subtask (potentially with division into a atomic steps), STOP.  Project manager will provide additional instruction.  If it is sufficiently detailed, add the subtask.  Ideally this will be a Phase 4 item.  Make sure subtask is properly defined as described in `guide.ai-project.process`.

Here is an example of a subtask to add a button in an element:
- [ ] Subtask 2: Implement AutoScale Button in ChartCanvas
  - [ ] Add the button as a React element within `ChartCanvas.tsx`
  - [ ] Use absolute/fixed positioning relative to the chart container.
- **Success:** Button renders in correct position and is accessible.

STOP and confirm the {subtask} is acceptable to the Project Manager and okay to proceed.  

Once confirmed, implement the task items.  Check off items once completed *and* verified.  Do not proceed to add other tasks.
```

##### Design Feature
```markdown
We will be working in { project, section } and will document our feature design in feature.{section}.md, in the our-project directory.  As always, start with `guide.ai-project.process.md`, and use `coderules.md` to guide tasks.

Act as a Technical Fellow as defined in `guide.ai-process.md` and create a low-level design.  Use the { goal } as described in the feature file unless a more specific goal is described here.

We continue to work in { project }, so there is no need to describe the overall project here.  Concentrate only on the functionality needed to accomplish { goal }.  

This is a design and specification task *not* a coding task.  Address feature overview, any technical requirement or issue adding feature into current stack.  Address main sections or components of feature with sufficient detail for us to use this feature document in order to create and expand tasks according to the guide.  You do not need to create the detailed task breakdown yet.
```

##### Split Feature into Tasks
```markdown
Continuing to work in { project, section }, we will now split our feature described in feature.{section}.md into tasks as described in Phase 3 and Phase 4 of our `guide.ai-project.process.md`.  We are more concerned with creating detailed tasks than a strict Phase 3 / Phase 4 adherance.  We will create our tasks in tasks.{section}.md.
```

##### Monorepo Template
```
We are working in { project, template }, where { project } is a monorepo.  For directories such as /project-documents, we use the path /project/{template}/project-documents.  This means that tool guides would be located at /project/{template}/project-documents/tool-guides, for example.  For anything that would normally be in /project/{template}/project-documents/our-project, we use /project/{template}/examples/our-project. 
```

##### Use 3rd Party Tool

*Add the following to existing prompt when working with {tool}.*
```markdown
You will need to consult specific knowledge for {tool(s)}, which should be available to you in the tool-guides/{tool} directory for our curated knowledge.  Follow these steps when working with {tool}.

1. Start with the `introduction` or `setup` file (if no introduction) 
   in the `project-documents/tool-guides/{tool}` directory.
2. Locate Docs: Scan the Overview for references to more detailed 
   documentation (like local API files under `/documentation`, 
   notes in `research-crumbs` or official web links).
3. Search Docs: Search within those specific documentation sources 
   first using `grep_search` or `codebase_search`.
4. Use context7 to locate additional documentation, and to verify that you are
   using the most current documentation for {tool}.
5. Web Search Fallback: If the targeted search doesn't yield 
   results, then perform a `search_web`.
```

##### Implement Tasks from Code Review Results
Interestingly we do not in general need this.  Once the tasks are processed into a Phase 3 + Phase 4 list, they can be implemented like any other tasks.  The fact that they originated in code review is not relevant.

##### Perform Routine Maintenance
```markdown
Let's perform routine maintenance tasks such as resolving warnings.  Examine file project-documents/our-project/maintenance/maintenance-tasks.md.  Take the tasks one at a time and see if we can remove warnings so we don't build up tech debt.  Don't proceed to the next warning until we are sure the current one is fixed, with build, and verify that we can still run the app.  Once that is done, update the maintenance-tasks.md file and check off the items.  Go ahead and get started if you have enough info, or ask for more if needed.
```

##### Add and Implement Maintenance Item
*Assumes an existing chat providing additional context. Add if this is not the case.*
```markdown
Continue operating in your role as Senior AI.  Add {item} to 
maintenance-tasks.md, following existing file format and markdown rules.  If item detail level is sufficient for Phase 4 tasks as described in the `guide.ai-project.process` and `guide.ai-project.task-expansion`, you may proceed to implementation after any necessary confirmation with Project Manager.

If {item} does not provide sufficient detail, expand according to the project and task expansion guides referenced above, and confirm with project manager before writing to file or implementing code.
```


##### Analyze Codebase
```markdown
Let's analyze the following existing codebase and document our findings.  We want this to not only assist ourselves in updating and maintaining the codebase, but also to assist humans who may be working on the project.

###### General
* Document your findings in the project-documents/our-project/codebase-
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


##### Model Onboarding (v0.2)
Use when starting a new chat, or to onboard a model to an existing project, for example initial Windsurf prompts for an existing project.  This replaces "Model Change or Context Review"

*Properties*
```markown
Welcome.  Use the following input for the remainder of this conversation.  
{
  project,
  section (optional),
  framework(s),
  tool(s),
  api(s)
}
```

*Prompt*
```markdown
We are working on {project}.  If {section} is not specified, assume this is a project-wide request.  Always anchor to `guide.ai-project.process`.  You should know your role and where our task(s) fit in to the process guide.  In addition to Project and Process details, it provides information on framework(s), tool(s), and api(s).  If any of this is missing, stop and request from Project Manager.  Do not proceed without it. You should receive additional message(s) describing current task and goal details.
```


##### Add AI Projects Support
```markdown
Add the following scripts to package.json.  If no package.json exists, run `npm init -y`, or ask the user to run it if you are not able.  If existing scripts block exists, add the two scripts to the existing block.  Do not add a new scripts block unless none exists in the file.

"scripts": {
    "setup-guides": "git remote get-url ai-project-guide > /dev/null 2>&1 || git remote add ai-project-guide git@github.com:ecorkran/ai-project-guide.git && git fetch ai-project-guide && git subtree add --prefix project-documents ai-project-guide main --squash || echo 'Subtree already exists—run npm run guides to update.'",
    "guides": "git fetch ai-project-guide && git subtree pull --prefix project-documents ai-project-guide main --squash"
  }
```


***
#### Deprecated

##### Model Change or Context Review (deprecated)
*Use this prompt when you need to switch models or refresh a model's understanding of the codebase and our rules.*

```markdown
We are working on {project} and you may receive additional input data such as { section, subsection, framework(s), tool(s), issue or goal }.  Operate as 'Senior AI' as defined in `guide.ai-project.process`, unless otherwise specified.  See that same document for a description of resources and their locations.  Always start with the `guide.ai-project.process` for project and process tasks, the `guide.ui-development.ai` for UI tasks, and `coderules` or `.windsurfrules` for coding tasks.  

You should receive information on { issue | goal } and preferably some idea of initial guidance (e.g. you should know what you are working on).

If {tool(s)} is in use, you should receive an additional note (ideally along with this request) describing additional relevant information.  If you do not receive such information, confirm with Project Manager that this was not an accidental omission.
```