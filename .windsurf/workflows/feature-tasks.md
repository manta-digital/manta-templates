---
description: Split {feature} into tasks and subtasks suitable for AI implementaton.
---

Call /init-tasks

[[ when init-tasks workflow completes: 
  1. confirm completion of workflow /init-tasks
  2. insert the following into the prompt 
]]
Continuing to work in { project, section } as a Technical Fellow, we will now split our feature described in feature.{section}.md into tasks as described in Phase 3 and Phase 4 of our `guide.ai-project.process.md`.  We are more concerned with creating detailed tasks than a strict Phase 3 / Phase 4 adherance.  We will create our tasks in tasks.{section}.md.

If tasks.{section}.md already exists, you should be given a current subsection or phase of the {feature} document for which we will create tasks.  Insert our tasks into the existing document, keeping subsections in numerical order.
[[ end when init-tasks ]]