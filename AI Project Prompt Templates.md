This document contains prompt templates considered useful in applying the AI Project Planning Guide.

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
n: integer;
projectname: string;
phase: phase;
```

##### Task Creation
```markdown
{project, section, goal} = {manta trading MVP, UI data panel, }
Note: If goal is not input, request it.

Generate detailed tasks required to accomplish {goal} granular enough to be delegated to a junior AI.  Do not include any tasks that could not be completed by an AI or agent.  These should be very small tasks, think subtasks in a 1-point story.  

This is a variation of Phase 4 in the AI Project Planning guide.  Please request if you don't have it.  In general, do not write code.  Our goal is to create detailed enough tasks that our junior team members can write the code.  Do not deviate from {goal}.
```

##### Task Expansion
```markdown
{project, section} = {manta trading MVP, folder selection}
We're working in our AI Project Planning Guide, Phase 4: Task expansion and Enhancement by section.  Use the AI Project Task Expansion Guide with {project, section} as above.

If you have all required inputs and sufficient information, go ahead and perform the tasks as instructed in the guide.  If not, request required information then proceed when received.
```

##### Project Continuation Phase
```markdown
Phase {n-1} is approved!

Now let's work together to create the {phase.name} for manta trading MVP.  Refer to our concept document ({projectname} - concept) describing the project.  We're now working on phase {n} - {phase.name}.  To do this, we'll use our customized spec guide, tailored to the needs of this project.  Our goal is to iterate and arrive at the phase {n} output -- {phase.description}.

We will not proceed beyond phase {n} until that output is complete, and then approved by the Project Manager. 

When creating these project documents, do not guess.  If information is missing or you cannot access it (Scichart, for example), stop and ask for clarification so we can proceed properly.
```

##### Task Implementation
```markdown
Hello. Our {project, section} is {manta trading MVP, UI data panel}.

We are working on the {project, section} tasks in phase 4 of the /project-plan/project-guides/AI Project Planning Guide.  

Your role is "Senior AI".  Your job is to complete the tasks in the /project-plan/design/{project} - tasks - {section}.md file.  Please work through the tasks, following the guidelines in our project guides, and using the rules in the coderules file.

Work carefully and ensure that each task is verified complete before proceeding to the next.  If an attempted solution does not work or you otherwise find reason to try another way, do not make more than three such attempts without stopping and waiting for confirmation form Project Manager.  Reset count after confirmation from Project Manager.

If you need more information, stop and wait for confirmation from the Project Manager.  Once a task is verified complete, check it off in the section tasks file.

Note: ignore case sensitivity in all file and directory names.  If you cannot locate the files referenced above STOP until receiving information from the project manager.  Do not guess, assume, or proceed without them.
```

##### Perform Maintenance
```markdown
Examine file project-plan/maintenance/maintenance-tasks.md.  Take the tasks one at a time and see if we can remove warnings so we don't build up tech debt.  Don't proceed to the next warning until we are sure the current one is fixed, with build, and verify that we can still run the app.  Once that is done, update the maintenance-tasks.md file and check off the items.  Go ahead and get started if you have enough info, or ask for more if needed.
```


