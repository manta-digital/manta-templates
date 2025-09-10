# Directory Structure — 2025-08-18 update  
_This file is the canonical contract for where every guide, snippet, and asset lives._

```
project-documents/
├── project-guides/          # project-process & meta-methodology
│   ├── guide.ai-project.00-process.md      # main process guide
│   ├── guide.ai-project.01-concept.md      # concept creation guide
│   ├── guide.ai-project.02-spec.md         # specification guide
│   ├── guide.ai-project.03-slice-planning.md # slice planning guide
│   ├── guide.ai-project.04-slice-design.md # slice design guide
│   ├── guide.ai-project.06-task-expansion.md # task expansion guide
│   ├── guide.ai-project.90-code-review.md  # code review guide
│   ├── guide.ai-project.91-legacy-task-migration.md # migration guide
│   ├── guide.ui-development.ai.md          # UI development guide
│   ├── prompt.ai-project.system.md         # system prompts
│   ├── prompt.code-review-crawler.md       # code review prompts
│   ├── notes.ai-project.onboarding.md      # onboarding notes
│   ├── agents/              # IDE agent configurations
│   ├── rules/               # modular coding rules
│   └── …                    # (shared subtree)
├── framework-guides/        # app-level runtimes & platforms
│   └── nextjs/ …
├── tool-guides/             # importable libraries / UI kits
│   └── scichart/ …
├── api-guides/              # external data / service endpoints
│   └── usgs/ …
├── domain-guides/           # cross-cutting subject knowledge
│   └── hydrology/ …
├── snippets/                # language-agnostic code or prompt templates
│   └── npm-scripts.ai-support.json   # standard npm scripts
├── private/                 # project-specific customization, 1 project 1 repo.
│   ├── code-reviews/        # review docs & follow-up actions
│   ├── features/            # feature definitions & specifications
│   ├── maintenance/         # maintenance tasks & outcomes
│   ├── project-guides/      # project-specific guide customizations
│   │   ├── 01-concept.{project}.md    # project concept documents
│   │   ├── 02-spec.{project}.md       # project specifications
│   │   ├── 03-hld.{project}.md        # high-level design
│   │   └── 03-slices.{project}.md     # slice planning document
│   ├── slices/              # slice-specific low-level designs
│   │   ├── 01-slice.{slice-name}.md   # individual slice designs
│   │   └── 02-slice.{slice-name}.md   # additional slice designs
│   ├── tasks/               # task breakdowns for slices and features
│   │   ├── 01-tasks.{slice-name}.md   # slice-based task files
│   │   ├── 02-tasks.{slice-name}.md   # additional slice tasks
│   │   └── 99-tasks.maintenance.md    # maintenance task files
│   └── ui/                  # UI tasks & resources
│       └── screenshots/     # mock-ups, design references
└── README.md                # folder-local orientation (this file's sibling)
```
> **Note:**
> _If_ a prompt template is tightly coupled to your AI-process phases (as with prompt.ai-project.system.md), keep it in **project-guides/**; project-specific prompt templates go in **private/project-guides/**; ad-hoc language snippets still go to **snippets/**
> 
> **Directory Structure by Use Case (IMPORTANT):**   
> 
> **1. Regular Development** (standard template instance development):
> - Use `project-documents/private/` for all project-specific files
> - This is the standard path described throughout the AI Project Guide
> 
> **2. Monorepo Template Development** (working on templates themselves or other monorepo sections):
> - Use `project-artifacts/` for project-specific files that would normally go in `private/`
> - This maintains compatibility with existing tooling while working on the monorepo structure itself
> 
> **3. Legacy `{template}/examples/our-project/`**:
> - **DEPRECATED**: No longer used
> - Migrate any existing content to `project-artifacts/` for monorepo work

## Sequential File Numbering

Files use a consistent numbering system:
- **00**: System/core files (e.g., `00-process`)
- **01-89**: Regular sequential content in chronological order
- **90-98**: Special/reserved files (e.g., `90-code-review`)
- **99**: Maintenance files (e.g., `99-tasks.maintenance`)

When creating new files, increment sequentially within the same category, ignoring reserved ranges.

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

#### Templates & snippets
* **Prompt/code templates** that are part of the **process** live in  
  `project-guides/` (e.g., `prompt.ai-project.system.md`).  
* Ad-hoc language or tooling snippets that don't belong to a phase go in `snippets/`.

### Naming reminder
Follow the pattern `[doc-type].[subject].[info].md`. See `file-naming-conventions.md` for full details including sequential numbering conventions.</document_content></invoke>