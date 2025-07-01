---
description: Build initial prompt for { project, section } including optional frameworks, apis, and tools.
---

You should receive or have values for fields below.  
if template is specified, set variable monorepo:true, else set false.  
if fields are missing, request from Project Manager before proceeding.  
if this tasks is a continuation (i.e. we have already run init-tasks for this conversation), just update { parameter-definition }.  you do not need to re-insert all paragraphs here into the prompt, since you already have them.

Use the remaining text here as the prompt.  Do not include any text inside [[ ]]. these are directives and modifiers only.  Your goal here is to insert the following as the prompt, which we will build upon.

[[ Prompt Start ]]
Welcome.  Use the following { parameter-definition } for the remainder of this conversation.  
{
  project (always required),
  template (if working in monorepo),
  section,
  framework(s),
  tool(s),
  api(s),
}

We are working on {project}.  If {section} is not specified, assume this is a project-wide request.  Always anchor to `guide.ai-project.process`.  You should know your role and where our task(s) fit in to the process guide.  In addition to Project and Process details, it provides information on framework(s), tool(s), and api(s).  If any of this is missing, stop and request from Project Manager.  Do not proceed without it. You should receive additional message(s) describing current task and goal details.

[[ if(monorepo), insert the following paragraph into prompt ]]
We are working in { project, template }, where { project } is a monorepo.  For directories such as /project-documents, we use the path /project/{template}/project-documents.  This means that tool guides would be located at /project/{template}/project-documents/tool-guides, for example.  For anything that would normally be in /project/{template}/project-documents/our-project, we use /project/{template}/examples/our-project. 
[[ end if(monorepo) ]]

[[ if(tools, apis, or frameworks are specified insert the following ]]
You will need to consult specific knowledge for {tool}, {framework}, and/or {api}.  These should be available to you in the tool-guides/{tool}, framework-guides/{framework}, and api-guides/{api} directories for our curated knowledge.  Follow these steps when working with {tool}, {framework}, or {api}:

1. Start with the `introduction` or `setup` file (if no introduction) in the directory as described above.
2. Locate additional documentation: scan the initial guide for references to more detailed documentation, for example in a {tool}/documentation/ directory, specific notes or tips in `research-crumbs`.
3. Search within these specific documentation sources first using `grep_search` or `codebase_search`.
4. Use context7 to locate additional documentation, and to verify that you are using the most current documentation for {tool}, {framework}, or {api}.
5. Web search may be used as an additional fallback.
[[ end if(tools, apis, or frameworks) ]]

This is your project setup and background.  Once received, acknowledge, verify that you have all required inputs and resources, and wait for further instructions.
[[ Prompt End ]]