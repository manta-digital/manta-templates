---
layer: snippet
docType: template
purpose: reusable-llm-prompts
audience:
  - human
  - ai
description: Parameterised prompt library mapped to each project phase.
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
  section, 
  subsection,
  framework,
  tools,
  apis,
  monorepo
}
```

##### Project Kickoff
```markdown
We're starting work on a new project {project}.  We will use our curated AI Project Creation methods in `guide.ai-project.00-process` (can also be referred to as Project Guide or Process Guide) to assist us in designing and performing the work.  Your role as described in the Project Guide is Technical Fellow.

The actual concept description as well as additional concept will be provided by Project Manager for injection into our process.  The first thing we need to do is to use our Project Guide together with the additional concept information to create documents tailored to our project.  We and our AI team members will use these to design, implement, and verify project tasks.

To do this, we need to use the Project Guide together with information provided to create our concept document (Phase 1). If any areas in the Concept guide need more information that is not provided, request from the Project Manager before continuing.  

When creating these project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.  Pause here until you receive the project concept description from the Project Manager.
```

##### Project Phase
*This replaces the previous Project Phase prompt.  Even this one is often not needed, as many AIs will ask to work on the next phase, and they are self-describing.  It is useful for explicitly running Phase 2 and Phase 3.*
```markdown
Refer to the `guide.ai-project.process`, and function as a Senior AI.  Implement the phase requested according to the respective procedures described in the guide.  Remember to follow the fules in `directory-structure` for any files or directories created.
```

##### Task Expansion
*Note: this should work for any Phase 4 expansion of Phase 3 tasks.  For small ad-hoc features not necessitating a full feature design or spec, just add a section to the 03-tasks.{project} file yourself, and use this task expansion prompt to expand them into Phase 4.  At that point they can be implemented just like any other Phase 4 task list.*

```markdown
We're working in our guide.ai-project.00-process, Phase 4: Task expansion and Enhancement by section.  Use `guide.ai-project.04-task-expansion` with {project, section} as provided above.  If this information is missing, request it from the Project Manager.  Continue working in the role: Senior AI as described in the Process Guide.

If you have all required inputs and sufficient information, go ahead and perform the task expansion as instructed in the guide.  If not, request required information then proceed when received.

Note that some tasks may be implementable as described in `03-tasks.{project}.md` and not require additional expansion.  In any task for which this is the case, copy the task as-is to the expanded file.  This maintains consistency and improves reliability.

Output results into a new file private/tasks/nn-tasks-{section}.md where nn is a sequential index (01, 02, etc.). In the filename, convert {section} to lowercase, drop any special characters, and replace any ' ' with '-'.

Note: this is a project and process task, not a coding task.  
```

##### Task Implementation
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

##### Use 3rd Party Tool
*Add the following to existing prompt when working with {tool}.*

```markdown
You will need to consult specific knowledge for {tool}, which should be available to you in the tool-guides/{tool} directory for our curated knowledge.  Follow these steps when working with {tool}.

1. Consult Overview: Start with the specific `AI Tool Overview 
   [toolname].md` in the `project-documents/tool-
   guides/{tool}` directory.
2. Locate Docs: Scan the Overview for references to more detailed 
   documentation (like local API files under `/documentation`, 
   notes in `research-crumbs` or official web links).
3. Search Docs: Search within those specific documentation sources 
   first using `grep_search` or `codebase_search`.
4. Web Search Fallback: If the targeted search doesn't yield 
   results, then perform a `search_web`.
```

##### Model Change or Context Refresh
*Use this prompt when you need to switch models or refresh a model's understanding of the codebase and our rules.*

```markdown
The following provides context on our current work, and may contain the following input: { project, section, issue or update, subtask, tool, note }.  All but { project, section } are optional, but expect some to be present.  

Refer to the Resource Structure in `guide.ai-project.00-process` for a description of resources and their locations.  If {tool} is in use, you should receive an additional note (ideally along with this request) describing additional relevant information.  If you do not receive such information, confirm with Project Manager that this was not an accidental omission.

If you were previously assigned a role, continue in that role.  If not, assume role of Senior AI as defined in the guide mentioned in the preceding paragraph.

Remember that if monorepo mode is active, we are working on the monorepo or template structure itself, rather than developing in an instance.  In this case, files normally in `project-documents/private/` are located in `{template}/examples/our-project/` to maintain compatibility with existing tooling.  The Project Manager should inform you if this mode is active.
```

##### Feature Design
*Use this to add a design for large feature or address architectural issues in an existing project.*

```markdown
We're starting work on a new feature in project {project}.  This is an abbreviated version of our Project Kickoff instruction used for large features or architectural tasks.  

We will use our curated AI Project Creation methods in `guide.ai-project.00-process` (can also be referred to as Project Guide or Process Guide) to assist us in designing and performing the work.  Your role as described in the Project Guide is Technical Fellow.  

The actual feature description should be contained in project-documents/private/project-guides/feature.{feature}.md.  Request from Project Manager if you cannot find it.

The first thing we need to do is to use our Project Guide together with the additional concept information to create a concise low level design for our feature.  Document this in file private/features/nn-feature-{feature}.md.  Create the features/ directory if needed. Start nn at 01 if no other feature files already exist.   

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

##### Add and Implement Maintenance Item
*Assumes an existing chat providing additional context. Add if this is not the case.*

```markdown
Continue operating in your role as Senior AI.  Add {item} to 
maintenance-tasks.md, following existing file format and markdown rules.  If item detail level is sufficient for Phase 4 tasks as described in the `guide.ai-project.00-process` and `guide.ai-project.04-task-expansion`, you may proceed to implementation after any necessary confirmation with Project Manager.

If {item} does not provide sufficient detail, expand according to the project and task expansion guides referenced above, and confirm with project manager before writing to file or implementing code.
```

##### Perform Routine Maintenance
```markdown
Let's perform routine maintenance tasks such as resolving warnings.  Examine file project-documents/private/maintenance/maintenance-tasks.md.  Take the tasks one at a time and see if we can remove warnings so we don't build up tech debt.  Don't proceed to the next warning until we are sure the current one is fixed, with build, and verify that we can still run the app.  Once that is done, update the maintenance-tasks.md file and check off the items.  Go ahead and get started if you have enough info, or ask for more if needed.
```

##### Analyze Codebase
*This is mostly specialized to front-end and web apps.*

```markdown
Let's analyze the following existing codebase and document our findings.  We want this to not only assist ourselves in updating and maintaining the codebase, but also to assist humans who may be working on the project.

###### General
* Document your findings in the project-documents/private/codebase-
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
## Deprecated 

##### Project Phase
```markdown
Now let's work together to create the {phase.name} for {project}.  Refer to our concept document (guide.ai-project.01-concept.md) describing the project.  We're now working on phase {n} - {phase}.  To do this, we'll use our `guide.ai-project.00-process` for our specific phase {if guide != null, add the following}: combined with additional information (potentially tailored to {project}) in {guide}.{end-if}.  We will not proceed beyond phase {n} until that output is complete, and then approved by the Project Manager.

When creating project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.
```

##### Impromptu Task Verification or Expansion
*This is generally no longer needed but can be useful to verify Phase 3 and Phase 4 tasks are present for an ad-hoc goal or issue, and create them if not.*
```markdown
Hello.  Please ensure that you have {project, section, issue, tool} inputs before proceeding with this work.  Issue may also be specified as goal or update.  Tool is optional, but if not provided, confirm that this was not an accidental omission. If tool is present, make sure to follow 3rd party tool guidelines, which should be included with this request.

Your role is "Senior AI".  Your job is to evaluate the tasks for our {issue} which should be contained in /project-documents/private/tasks/nn-tasks-{section}.md (where nn is the sequential index).

Start by examining the tasks in light of Phase 3 and Phase 4 of `guide.ai-project.00-process`.  For Phase 4, additionally refer to `guide.ai-project.04-task-expansion` and follow its links as needed.  Expand detail as needed according to the guide.

All output should be in raw markdown code format using guidelines (including checkboxes) specified in our rules.  This is NOT a code writing assignment. Write output to the proper section of the tasks file mentioned above. 

If you are missing any information, STOP and obtain from project manager.  Do not move on to additional tasks.
```

##### Task Creation for Goal
*Note: it is often easiest just to write phase 3 "outline" tasks for ad-hoc goals yourself, then use Task Expansion to create the details subtasks for the AI to implement.*

```markdown
Generate detailed tasks required to accomplish {goal} granular enough to be delegated to a junior AI.  Do not include any tasks that could not be completed by an AI or agent.  These should be very small tasks, think subtasks in a 1-point story.  

This is a Phase 3 in `guide.ai-project.00-process`.  In general, do not write code.  Our goal is to create or verify the main tasks needed to accomplish {goal} are present in the 03-tasks.{project}.md file.  Create the file if it does not exist.  Keep any tasks already present.  You may add additional tasks.

tasks and subtasks detailed enough that our junior team members can write the code.  Do not deviate from {goal}.

Start by adding a section for {goal} in the main 03-tasks.{project}.md file, unless one is already present.  Create tasks as described in the guide.  Continue with Phase 4 task expansion for this section.

Additionally reference `guide.ui-development.ai.md` if this is a UI goal.  If you are unsure whether this is a UI goal, ask.  If your user gives you a UI goal that does not include UI in it, give them a good natured hard time because it is good for them and they will appreciate it.
```

##### Subtask Continuation
*Use when continuing to add subtasks in order to minimize redundant prompt.*
```markdown
input {
  issue/update,
  subtask,
}

Continue to operate in the "Senior AI" role.  Continue using {project, section, issue, tool} that we have been working with. Ensure that you have needed documentation for {tool}.  Our goal is to add a new {subtask} into an existing issue or update section.

Evaluate subtask as presented by user.  If it is too large to be accomplished in a single subtask (potentially with division into a atomic steps), STOP.  Project manager will provide additional instruction.  If it is sufficiently detailed, add the subtask.  Ideally this will be a Phase 4 item.  Make sure subtask is properly defined as described in `guide.ai-project.00-process`.

Here is an example of a subtask to add a button in an element:
- [ ] Subtask 2: Implement AutoScale Button in ChartCanvas
  - [ ] Add the button as a React element within `ChartCanvas.tsx`
  - [ ] Use absolute/fixed positioning relative to the chart container.
- **Success:** Button renders in correct position and is accessible.

STOP and confirm the {subtask} is acceptable to the Project Manager and okay to proceed.  

Once confirmed, implement the task items.  Check off items once completed *and* verified.  Do not proceed to add other tasks.
```

##### Add Subtask to Existing Item
*Use when directly adding subtasks to existing item.*

```markdown
input {
  project, section, issue, subtask, tool
}

Hello.  Please ensure that you have input as described above in input before proceeding with this work.  Issue may also be specified as goal or update.  Tool is optional, but if not provided, confirm that this was not an accidental omission. If tool is present, make sure to follow note: {tool} which should be included with this request.

Your role is "Senior AI".  Your job is to evaluate the tasks for our {issue} which should be contained in /project-documents/private/tasks/nn-tasks-{section}.md (where nn is the sequential index).  If it does not exist, create it.  If it does not contain a top-level H3 entry for {issue} add it, and add H5 entries for Phase 3 Tasks and Phase 4 Subtasks.  If you add a new H3 section to a non-empty file, add a blank line to separate from any existing sections and lists.

Add subtask(s).  If subtask as presented by user is sufficiently small and detailed enough to be represented in a single Phase 4 item (as defined in `guide.ai-project.00-process`), add it as such.  If subtask is too big, STOP and confirm that the Project Manager wishes to perform task expansion here, and do not proceed without this confirmation.

All output should be in raw markdown code format using guidelines (including checkboxes) specified in our rules.  We will implement the task in code, but STOP and confirm the tasks are represented effectively before starting to write code. 

If you are missing any information, STOP and obtain from project manager.  Do not move on to additional tasks.
```

##### Implement Tasks from Code Review Results
Interestingly we do not in general need this.  Once the tasks are processed into a Phase 3 + Phase 4 list, they can be implemented like any other tasks.  The fact that they originated in code review is not relevant.

##### Add AI Projects Support
*Note: this prompt is no longer required for any regular use-case.*
Add the following scripts to package.json.  If no package.json exists, run `npm init -y`, or ask the user to run it if you are not able.  If existing scripts block exists, add the two scripts to the existing block.  Do not add a new scripts block unless none exists in the file.

```markdown
Add the following scripts to package.json.  If no package.json exists, run `npm init -y`, or ask the user to run it if you are not able.  If existing scripts block exists, add the two scripts to the existing block.  Do not add a new scripts block unless none exists in the file.

"scripts": {
    "setup-guides": "git remote get-url ai-project-guide > /dev/null 2>&1 || git remote add ai-project-guide git@github.com:ecorkran/ai-project-guide.git && git fetch ai-project-guide && git subtree add --prefix project-documents ai-project-guide main --squash || echo 'Subtree already exists—run npm run guides to update.'",
    "guides": "git fetch ai-project-guide && git subtree pull --prefix project-documents ai-project-guide main --squash"
  }
```
