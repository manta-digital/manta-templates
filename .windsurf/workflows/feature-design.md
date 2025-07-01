---
description: Create spec and Phase-3 tasks for {feature}.
---

Call /init-tasks

[[ when init-tasks workflow completes, insert the following into the prompt ]]
We will be working in { project, section } and will document our feature design in feature.{section}.md, in the our-project directory.  As always, start with `guide.ai-project.process.md`, and use `.windsurfrules` to guide tasks, with `coderules.md` as a backup if the more specific rules file is not present.

Act as a Technical Fellow as defined in `guide.ai-process.md` and create a low-level design.  Use the { goal } as described in the feature file unless a more specific goal is described here.

We continue to work in { project }, so there is no need to describe the overall project here.  Concentrate only on the functionality needed to accomplish { goal }.  

This is a design and specification task *not* a coding task.  Address feature overview, any technical requirement or issue adding feature into current stack.  Address main sections or components of feature with sufficient detail for us to use this feature document in order to create and expand tasks according to the guide.  You do not need to create the detailed task breakdown yet.
[[ end when init-tasks ]]
