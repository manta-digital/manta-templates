# Directory Structure — 2025-10-05 update
_This file is the canonical contract for where every guide, snippet, and asset lives._

```
project-documents/
├── ai-project-guide/        # Git submodule (framework guides)
│   ├── project-guides/      # project-process & meta-methodology
│   ├── framework-guides/    # app-level runtimes & platforms
│   │   └── nextjs/ …
│   ├── tool-guides/         # importable libraries / UI kits
│   │   └── scichart/ …
│   ├── api-guides/          # external data / service endpoints
│   │   └── usgs/ …
│   ├── domain-guides/       # cross-cutting subject knowledge
│   │   └── hydrology/ …
│   ├── snippets/            # copyable code/config examples
│   └── scripts/             # setup and utility scripts
└── private/                 # Your project-specific work (parent repo)
    ├── architecture/        # high-level designs & system architecture
    ├── code-reviews/        # review docs & follow-up actions
    ├── features/            # feature definitions & specifications
    ├── maintenance/         # maintenance tasks & outcomes
    ├── analysis/            # codebase analysis results
    ├── project-guides/      # project-specific guide customizations
    │   ├── 001-concept.{project}.md # project concept documents
    │   ├── 002-spec.{project}.md    # project specifications
    │   └── 003-slices.{project}.md  # slice planning
    ├── slices/              # slice design documents
    ├── tasks/               # task breakdowns & phase documents
    └── ui/                  # UI tasks & resources
        └── screenshots/     # mock-ups, design references
```
> **Directory Structure by Use Case:**
>
> **1. Regular Development** (standard project development - most users):
> - Your project work goes in `project-documents/private/`
> - Framework guides are in `project-documents/ai-project-guide/` (git submodule)
> - This is the standard structure shown above
>
> **2. Monorepo Template Development** (advanced - working on templates themselves):
> - References to `private/` map to `project-artifacts/{template-name}/` instead
> - Example: `private/tasks/` becomes `project-artifacts/react-template/tasks/`
> - This prevents contaminating templates with development artifacts
> - Framework guides location (`project-documents/ai-project-guide/`) remains the same

## Zero-ambiguity decision matrix

| Ask in order | Folder |
|--------------|--------|
| Process / methodology? | `project-guides/` |
| Owns whole app lifecycle? | `framework-guides/` |
| External network API? | `api-guides/` |
| Importable library? | `tool-guides/` |
| Broad subject knowledge? | `domain-guides/` |

> **One-path rule:** a doc lives in exactly one folder.  
> **Metadata override:** if a file has YAML front-matter key `layer`, that wins if it contradicts the path.

#### Attachment policy
Images will be moved to the `z-attachments` folder in Obsidian.  Obsidian will rewrite links automatically when you move files.
#### Snippets
* Process-wide prompts: `project-guides/prompt.ai-project.system.md`
* Ad-hoc code snippets and examples: `snippets/`
### Naming reminder
Follow the pattern `[doc-type].[subject].[info].md`. See `file-naming-conventions.md` for full details.

