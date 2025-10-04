This readme provides general information on project-guides including order in which they should be used.

## Phase → Guide map

| Phase              | Primary guide                          | Quick link                                                                   |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------- |
| 0 – Meta           | AI Project Process                     | [guide.ai-project.000-process.md](guide.ai-project.000-process.md)                   |
| 1 – Concept        | Concept Guide                          | [guide.ai-project.001-concept.md](guide.ai-project.001-concept.md)                   |
| 2 – Spec           | Spec Guide                             | [guide.ai-project.002-spec.md](guide.ai-project.002-spec.md)                         |
| 3 – Slice Planning | Slice Planning Guide                   | [guide.ai-project.003-slice-planning.md](guide.ai-project.003-slice-planning.md)     |
| 4 – Slice Design   | Slice Design Guide                     | [guide.ai-project.004-slice-design.md](guide.ai-project.004-slice-design.md)         |
| 5 – Task Breakdown | _none (method lives in Process Guide)_ | –                                                                            |
| 6 – Task Expansion | Task-Expansion Guide                   | [guide.ai-project.006-task-expansion.md](guide.ai-project.006-task-expansion.md)     |
| 7 – Execution      | _none (method lives in Process Guide)_ | –                                                                            |
| 8 – Integration    | _none (method lives in Process Guide)_ | –                                                                            |

## Supplemental Guides (90+)

| Guide                    | Purpose                                  | Quick link                                                                   |
| ------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------- |
| Code Review              | Systematic code review processes         | [guide.ai-project.090-code-review.md](guide.ai-project.090-code-review.md)           |
| Legacy Task Migration    | Migrate old projects to slice-based     | [guide.ai-project.091-legacy-task-migration.md](guide.ai-project.091-legacy-task-migration.md) |

## Additional Resources

| Resource                 | Purpose                                  | Quick link                                                                   |
| ------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------- |
| UI Development           | UI/UX specific guidance                  | [guide.ui-development.ai.md](guide.ui-development.ai.md)                           |
| Onboarding Notes         | Human developer onboarding               | [notes.ai-project.onboarding.md](notes.ai-project.onboarding.md)                   |
| System Prompts           | Parameterized prompt templates           | [prompt.ai-project.system.md](prompt.ai-project.system.md)                         |
| Code Review Crawler      | Automated code review prompts            | [prompt.code-review-crawler.md](prompt.code-review-crawler.md)                     |

### IDE Integration: Agents & Rules

The `agents/` and `rules/` directories contain configurations designed to be copied into your IDE's configuration directory:

**For Cursor:**
- Copy `agents/*` → `.cursor/agents/`
- Copy `rules/*` → `.cursor/rules/`

**For Windsurf:**
- Copy `agents/*` → `.windsurf/agents/`
- Copy `rules/*` → `.windsurf/rules/`

These files provide platform-specific configurations while maintaining consistency across your AI-assisted development workflow.

### Development Approaches

**Slice-Based Development (Recommended):**
- Use for complex projects with multiple features
- Follow Phases 1-3 for planning, then 4-8 for each slice
- Provides better context management and parallelization potential

**Traditional Development:**
- Use for simple features or small projects
- Follow Phases 1-2, then directly to task breakdown
- Suitable for single-feature additions or maintenance work

### YAML front-matter schema for project-guides

| Key           | Type   | Required | Allowed values / notes                                                                  |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| `layer`       | enum   | ✓        | Always **`process`** in this folder                                                     |
| `phase`       | int    | ✓        | `0`=meta, `1`-`8` map to the workflow phases, `90+` for supplemental guides            |
| `phaseName`   | string | ✓        | `meta`, `concept`, `spec`, `slice-planning`, `slice-design`, `task-breakdown`, `task-expansion`, `execution`, `integration` |
| `guideRole`   | enum   | ✓        | `primary`, `support`, `onboarding`                                                      |
| `audience`    | list   | ✓        | Any of `human`, `ai`, `pm`, …                                                           |
| `description` | string | ✓        | One-liner shown in index views                                                          |
| `dependsOn`   | list   | –        | Other guide filenames this one assumes are present                                      |