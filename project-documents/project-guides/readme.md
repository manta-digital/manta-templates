This readme provides general information on project-guides including order in which they should be used.
## Phase → Guide map

| Phase              | Primary guide                          | Quick link                                                                   |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------- |
| 0 – Meta           | AI Project Process                     | [guide.ai-project.00-process.md](guide.ai-project.00-process.md)                   |
| 1 – Concept        | Concept Guide                          | [guide.ai-project.01-concept.md](guide.ai-project.01-concept.md)                   |
| 2 – Spec           | Spec Guide                             | [guide.ai-project.02-spec.md](guide.ai-project.02-spec.md)                         |
| 3 – Task Breakdown | _none (method lives in Process Guide)_ | –                                                                            |
| 4 – Task Expansion | Task-Expansion Guide                   | [guide.ai-project.04-task-expansion.md](guide.ai-project.04-task-expansion.md)     |
| 5 – Execution      | Code-Review Guide (support)            | [guide.ai-project.05-code-review.md](guide.ai-project.05-code-review.md)                           |
| 6 – Iteration      | –                                      | –                                                                            |
| All                | Prompt Templates                       | [prompt.ai-project.system.md](prompt.ai-project.system.md) |

##### Additional
```
guide.ui-development.ai: applicable to any UI development task (Phase 4, 5)
notes.ai-project.onboarding: onboarding notes primarily for human devs
```

### IDE Integration: Agents & Rules

The `agents/` and `rules/` directories contain configurations designed to be copied into your IDE's configuration directory:

**For Cursor:**
- Copy `agents/*` → `.cursor/agents/`
- Copy `rules/*` → `.cursor/rules/`

**For Windsurf:**
- Copy `agents/*` → `.windsurf/agents/`
- Copy `rules/*` → `.windsurf/rules/`

These files provide platform-specific configurations while maintaining consistency across your AI-assisted development workflow.

### YAML front-matter schema for project-guides

| Key           | Type   | Required | Allowed values / notes                                                                  |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| `layer`       | enum   | ✓        | Always **`process`** in this folder                                                     |
| `phase`       | int    | ✓        | `0`=meta, `1`-`6` map to the workflow phases                                            |
| `phaseName`   | string | ✓        | `meta`, `concept`, `spec`, `task-breakdown`, `task-expansion`, `execution`, `iteration` |
| `guideRole`   | enum   | ✓        | `primary`, `support`, `onboarding`                                                      |
| `audience`    | list   | ✓        | Any of `human`, `ai`, `pm`, …                                                           |
| `description` | string | ✓        | One-liner shown in index views                                                          |
| `dependsOn`   | list   | –        | Other guide filenames this one assumes are present                                      |
