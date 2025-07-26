---
layer: process
phase: 4
phaseName: task-expansion
guideRole: primary
audience: [human, ai]
description: Phase 4 playbook for turning breakdowns into atomic subtasks.
dependsOn:
  - guide.ai-project.00-process.md
  - guide.ai-project.02-spec.md
---
#### Summary
This guide provides instructions and methodology for expanding and enhancing sections of our Detailed Task Breakdown in order to create manageable lists to give to an (AI) working as a developer.  This assignment is Phase 4 in `guide.ai-projects.process`, and will not be received (and cannot be started) until confirmation that the Detailed Task Breakdown (Phase 3 Output) is available and and approved by the Project Manager.
#### Inputs and Outputs
The inputs to this task are as follows:
* guide.ai-project.00-process
* guide.ai-project.04-task-expansion (this document)
* {project} - spec (phase 2 output)
* {project} - tasks (this is the detailed task breakdown, phase 3 output)
* rules/ - directory containing specific coding rules and guidelines organized by platform/technology.
* {project, section} where section is the part of the Detailed Task Breakdown we will work on

If any inputs are missing, insufficient, or you have questions, stop and resolve these with the Project Manager before proceeding.

The output should be raw markdown code containing the tasks for our assigned section, after expansion and enhancement.  Ensure that every task in the input is accounted for.
#### Output Formatting
For this job we'll work in raw markdown code.  It's easy for all of us to read and write, and the raw code more easily pastes into other applications and documents.

We will continue to follow the checkbox list format that we have for our main tasks document.  L1 items have checkbox, L2 items underneath them, indented and also with checkboxes.  The Success condition remains in the L2 list not the L1.  Subtasks beyond L2 are considered L3, and should be numbered.

Code blocks should use the multi-line code block syntax tagged with their language:
```{language}
{code block here}
```

Very simple code statements (ex: npm run dev) can use inline: `npm run dev` (etc).

Document may begin with a 1-line title in H1 format.  No other H1 should be present.  In general, start at H3 or H3 and prefer H3, H4, H5.  Avoid any emoji in this document.  This is designed to be efficient, streamlined, and fast -- no distractions.

#### Specific Instructions
Our job is to examine our assigned section and *only* our assigned section of the Detailed Task Breakdown, and expand or enhance the tasks where this additional granularity would improve our AI developer's chances of completing the task successfully.

For any additional context, how and where we fit into the project or the overall plan, consult the additional documentation provided with the input.  While we are mostly not writing code, the rules/ directory will provide guidelines for writing any minimal required code as well as potential usefulness in structuring the tasks.  

Phases 1, 2, and 3 are completed and approved.  We are going to work on Phase 4, Task enhancement and expansion by section.  We will receive our assigned section of Detailed Task Breakdown from the Project Manager or delegate.  For this task, we will work *only* on the assigned section and we will not proceed beyond it.  
###### Procedure
* Identify and review all required inputs and confirm any questions, omissions, or inconsistencies.
* Determine if required output file project-documents/private/tasks/nn-tasks-{section}.md is present (where nn is a sequential index like 01, 02, etc.).  If not, create it.  If you encounter an error in file creation, stop and wait for Project Manager.  
* For each task in our assigned section, examine it.  Can a relatively junior developer complete it as described?  If we could improve the odds of that by making the task more granular, adding detail, potentially splitting into subtasks, let's do it.
* Make sure we cover all the tasks.
* If a task cannot effectively be improved, add it to our output verbatim.

##### Example of Input Task
Note: do use the markdown multiline codeblocks as we described.  I couldn't embed them all in here due to formatting concerns and have indicated them in the input and output examples.

```markdown
### Project Setup & Initialization
- [ ] Set up Next.js TypeScript project  
  - [ ] Initialize a new Next.js app with TypeScript (create-next-
        app@latest with --typescript).  
  - [ ] Install Tailwind CSS and configure it (including dark mode 
        support via the class strategy in tailwind.config.js).  
  - [ ] Verify the dev server runs without errors.  
  - [ ] Success: Next.js boilerplate launches at localhost:3000 and 
        Tailwind styles are being applied (e.g. test a Tailwind 
        class on the index page). 
```

##### Example of Expansion
This is provided as an example of expansion.  Use this in addition to the additional information in this document to guide your evaluation and expansion.  
```markdown
### Project Setup & Initialization

#### Create New Next.js Project with TypeScript
- [ ] Initialize new project using `create-next-app@latest`
  - [ ] Use the `--typescript` flag to enable TypeScript support  
    1. Run:
	   (multi-line code block)
        npx create-next-app@latest manta-trading-mvp --typescript
       
- [ ] Confirm `.ts` and `.tsx` files are used throughout
- [ ] Open project in your editor (e.g. VSCode) and verify it 
      compiles and runs
  - [ ] Run the dev server  
    1. Start with: `npm run dev`
    2. Visit `http://localhost:3000` and confirm the default 
       Next.js page renders

#### Install and Configure Tailwind CSS with Dark Mode
- [ ] Install Tailwind CSS, PostCSS, and Autoprefixer
  - [ ] Initialize Tailwind  
    1. Run:
       (multi-line code block) bash
       npm install -D tailwindcss postcss autoprefixer
       npx tailwindcss init -p
       
- [ ] Update `tailwind.config.js`
  - [ ] Set dark mode strategy to `'class'`
  - [ ] Configure content paths to include all project files
    (multi-line code block)js
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    
- [ ] Update `globals.css`
  - [ ] Add Tailwind's base, components, and utilities
    (multi-line code block) css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
- [ ] Apply a Tailwind class (e.g. `text-red-500`) in `index.tsx` 
      to verify styles
- [ ] Confirm Tailwind styles render correctly in the browser

#### Organize Project Folder Structure
- [ ] Create `/components` for reusable React components
- [ ] Create `/styles` for global and utility CSS
- [ ] Create `/lib` for utility functions (e.g. data loaders, 
      indicators)
- [ ] Create `/types` for TypeScript interfaces (e.g. OHLCV bar 
      definition)
```

Tasks expansions continue with similar levels of details, and should conclude with something such as the following:
```markdown
#### Final Check
- [ ] Confirm:
  - [ ] Dev server runs and shows default Next.js page
  - [ ] Tailwind styles are working
  - [ ] Folder structure follows conventions
  - [ ] Linting and formatting pass without errors
```

##### Additional Rules for UI Tasks
When working with UI/UX tasks, always consult the AI Development Guide - UI.
Mockups should be provided to cover all UI tasks.  Mockups should be interpreted as layout and design guides.  Ensure that controls or placeholders are present, in 1:1 correspondence with the UI.  Placeholders are only acceptable if specifically indicated and for the specific elements referenced.  UI elements should be laid out and positioned as specified by the mockup.  

If requested, generate a color scheme from a base color and a description, and apply this theme to the UI.

If requested to draw elements in a certain general style (ex: bento cards), adhere to this layout and use it to guide any design.  If you do not have enough information or knowledge of the style, request information and don't proceed until satisfied you have the information you need.

##### Summary
That's it.  A well defined job where we can apply our knowledge to help out the other developers on the team.
