---
docType: repository-overview
---
# AI Project Guides & Methodology

> Structured project guides and parameterized prompts that dramatically expand what AI tools can help you build. Helps turn complex issues into manageable, AI-assisted workflows.  Setup scripts provided for Windsurf and Cursor.

This project was created in early 2025 to address difficulties I encountered when trying to create anything but the most trivial app using AI-assisted development.  Since then, the AI tools have advanced, adding better rule support, task lists, and more.  It is my experience that AI Project Guide still provides *far* better results than just using the built-in to-do lists and agent knowledge.  That said, the space is moving fast and this repository remains a work in progress.

The repository contains a comprehensive methodology for AI-assisted development, including:
- **Six-phase project process** with clear roles and workflows
- **Parameterized prompts** that work with any AI tool
- **Tool-specific guides** for frameworks, libraries, and APIs
- **Code rules and patterns** for consistent, maintainable code
---


## 🚀 Quick Start

### Add to Existing Project
```bash
# In your existing project root
git subtree add --prefix=project-documents https://github.com/ecorkran/ai-project-guide.git main --squash
```

This gives you all guides integrated into your project. Delete folders you don't need. Perfect for the "my Python project needs structure" use case.

**Alternative (if you prefer manual copy):**
```bash
# Download and extract without git history
curl -L https://github.com/ecorkran/ai-project-guide/archive/refs/heads/main.tar.gz | tar -xz
mv ai-project-guide-main project-documents
rm -rf project-documents/.git
```

### IDE Setup (Cursor/Windsurf)
After adding the guides to your project, set up IDE rules for enhanced AI assistance:

```bash
# Option 1: Direct script (run from project root)
./project-documents/scripts/setup-ide cursor     # For Cursor IDE
./project-documents/scripts/setup-ide windsurf   # For Windsurf IDE

# Option 2: npm scripts (recommended)
npm run setup-cursor                              # For Cursor IDE  
npm run setup-windsurf                            # For Windsurf IDE
```

This copies all project rules to your IDE's configuration directory, handles file renaming (`.md` to `.mdc` for Cursor), and validates frontmatter requirements.

**💡 Pro tip:** Use the npm scripts to avoid directory confusion. The direct script will warn you if run from the wrong location.

**📍 Important:** The script creates `.cursor/` and `.windsurf/` directories in your project root (not inside `project-documents/`).

**Manual setup:** See [IDE-Setup-Guide.md](IDE-Setup-Guide.md) for step-by-step instructions.

### Start with Full Template Instead
For a complete template with easy setup scripts, use the full template from [manta-templates](https://github.com/manta-digital/manta-templates).  It makes the guides setup extremely easy.  Just Next.js for now, but more flexible options should be coming very soon.  See demo at https://templates.manta.digital.

---


## 🛠️ How to Use

### 🆕 New Projects
The project guide is well-suited to new projects and can assist you with all phases of development.  

#### 📝 Describe your Project
Start by describing your project, ideally in a markdown file. Include goals, design ideas, target environments, and technical details if available.  

* Place your file in `project-documents/private/`.
* Name it `concept.{project}.description.md`. You can use a different filename if you like—just provide it to the AI with your kickoff prompt.

#### 🚦 Initial Prompts – Phases 1 and 2
After you describe your project and provide basic Input Parameters, paste the **Project Kickoff** prompt into your chat. If third-party tools are in use (they almost always are), additionally paste the **3rd Party Tools** prompt.

This will generate `01-concept.{project}.md` in `private/project-guides/`, customized to your project. Once you’re happy with it, run the **Project Phase** prompt and specify **Phase 2** to produce `02-spec.{project}.md` in the same folder.

At this point you’re ready to create tasks.

#### 🔨 Creating & Expanding Tasks – Phases 3 and 4
The `guide.ai-project.00-process` file instructs the AI on how to perform all project phases, including creating and expanding tasks. Use the **Project Phase** prompt again for **Phase 3**.  The guide will write the `03-tasks.{project}.md` file in `private/project-guides/`.

In general, letting the AI subdivide tasks as needed results in tasks that can be more easily implemented by the AI, with less need to be constantly in the middle.  

Just run the "Task Expansion" prompt.  Make sure to provide a `{ section: section-name }` so the AI knows what tasks to focus on.  Tasks will be expanded as needed and written to `tasks/nn-tasks.{section}.md`, with nn starting at 01.  

#### 💻 Implementing Tasks – Phase 5
Once tasks are written to `tasks/nn-tasks.{section}.md`, you’re ready to implement them. You can pass the entire task file to an AI, but for complex cases it’s better to tackle **subsections** one at a time.  Just update `{ subsection: subsection-name }` as needed.

Then run the **Task Implementation** prompt. You can have it process all tasks in a file or just a subsection.  For non-trivial cases, subsection generally provides higher quality results.

#### 🔁 Continuous Integration – Phase 6
Less structured, but it maps well onto the same process used for **Feature Development & Continuous Integration** (next section).

#### 🧪 Testing – Phase 7 (coming soon)
If you’re thinking “where is testing?!” you’re not alone. Unit-test integration is high on the to-do list and will be added ASAP.


### Feature Development and Continuous Integration
It is almost always the case that projects need additional items not completely reflected in the initial task breakdown.  These may be additional features, expanded requirements, or unforeseen complexities in the initial implementation.  Several prompts are provided to simplify this process.

#### Context Refresh or Model Change
When starting a new conversation in an existing project (recommended to keep context size from growing uncontrollably), use the "Model Change or Context Refresh" prompt to improve anchoring to the project guide process.  Also useful to add into long conversation to minimize forgotten information.

When starting a new chat for the project, remember to again provide the input parameters { project: etc }.

#### Feature Development
For major new features, or addressing architectural issues, use the Features prompts.  Features large enough to require this should be described in a short feature document, i.e. `project-documents/private/feature.{project}.{feature-name}.md`
##### Feature Design
Use the "Feature Design" prompt with your file and you will receive a `features/nn-feature.{feature}.md` file containing your feature's combined spec + low-level design as output.
##### Feature Tasks
Now use the "Feature Tasks" prompt and it will add a new section of Phase 3 tasks to `03-tasks.{project}.md`.  These tasks will be consistent with the existing sections.
##### Feature Expansion and Implementation
Your feature tasks are now no different from the other tasks in the project.  Use the same prompts described above for Task Expansion and Implementation.

#### Ad-Hoc Items
For addressing new features or issues not large enough to warrant their own spec, you can create task sections ad-hoc.  Just create a new section in `03-tasks.{project}.md` and describe your tasks.  You don't necessarily need the level of detail used by the AI in creating its Phase 3 tasks, but the more specific you are, the better the results will be.

Now you can run the same Task Expansion and Task Implementation prompts on your new task section, with no special process required.


### Notes
#### Prompts
Parameter-aware stored prompts are available in `prompt.ai-project.system`.  These provide instruction to create the big points of your project, and to allow you to insert new features using the same structured methods and guides.
#### Input Parameters
When working with AI Project Guide, provide input in a format like this, and your parameters should be used throughout the project.  When you update to work on a new section or subsection, just provide that input.  Just provide what is in use, you do not need every field.

```
{
  project: ,    # your project name
  section: ,    # (when working with a section)
  subsection: , # (for subsections)
  framework: ,  # (main framework in use for example NextJS)
  tools: ,      # (tools in use such as ShadCN, Tailwind, etc)
  apis: ,       # (any specific apis in use)
}
```

#### Core Files
- **`project-guides/guide.ai-project.00-process.md`** - This is *the* core file that instructs your AI on the overall process.
- **`project-guides/rules/`** - Use the `setup-ide` script to copy for your IDE, or copy manually if using other than Cursor and Windsurf.  

#### TroubleShooting
In Windsurf, the rules are sometimes not recognized until you manually access them in settings.  *todo: add tip for fixing this here, and verifying that rules are loaded correctly in Cursor*

---


## 📚 Guide System Overview

The AI project guide system operates on three layers, designed to work together seamlessly:

### **1. Public Guides** (This Repository)
- **Source**: `ai-project-guide.git`
- **Content**: Core methodology, tool guides, framework guides
- **Behavior**: Updated frequently, safe to overwrite
- **Usage**: Everyone gets these automatically

### **2. Organization Private Guides** (Advanced Feature)
- **Source**: Configurable via `PRIVATE_GUIDES_URL` environment variable
- **Content**: Company procedures, specialized knowledge, internal standards
- **Behavior**: Fail silently if not configured, overlay on public guides
- **Usage**: Advanced teams with private knowledge repositories

### **3. Project Private Guides** (Your Work)
- **Location**: `project-documents/private/`
- **Content**: Project-specific concept docs, specs, tasks, code reviews
- **Behavior**: Never overwritten, always preserved
- **Usage**: Your valuable project work that should be committed to git

### **Update Strategy**
- **Public guides**: Safe to update (overwrite)
- **Organization guides**: Overlay carefully (project wins in conflicts)
- **Project guides**: Never touched, always preserved

### **Collision Resolution**
- **Public vs Private**: Public wins (safe to update)
- **Organization vs Project Private**: Project wins (preserve user work)
- **Same file in both**: Project version preserved
---


## 🔑 What lives where?

| Folder | Look here when you need…                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **`project-guides/`** | Process & methodology docs that apply to *every* project (e.g., guide.ai-project.00-process, guide.ai-project.02-spec, Code Rules). |
| **`framework-guides/`** | App-level runtimes or platforms that own the entire build/runtime cycle (Next.js, Astro, Flutter, Qt…).                       |
| **`tool-guides/`** | Importable libraries or UI kits you slot *into* an app (SciChart, Three.js, Tailwind…).                                       |
| **`api-guides/`** | External data or service endpoints accessed over HTTP/gRPC (USGS Water Services, ArcGIS, Alpha Vantage…).                     |
| **`domain-guides/`** | Cross-cutting subject knowledge useful across many projects (game-development, hydrology, financial-visualisation…).          |
| **`snippets/`** | Language-agnostic code fragments and quick copy-paste helpers.                                                                |

*Full details and rationale live in [`project-documents/directory-structure.md`](project-documents/directory-structure.md).*

---


## 🧭 Zero-ambiguity decision matrix

1. Is it a **process** document? → `project-guides/`  
2. Does it **own the whole app lifecycle**? → `framework-guides/`  
3. Is it an **external network API**? → `api-guides/`  
4. Is it **imported as a library** inside another app? → `tool-guides/`  
5. Is it broad **subject matter** knowledge? → `domain-guides/`  

Anything that doesn't match gets flagged for discussion before filing.

---


## 📐 Naming & formatting conventions

All file and folder names follow our kebab-case pattern and document-type prefixes outlined in [`file-naming-conventions.md`](project-documents/file-naming-conventions.md).    Please review that doc before adding or renaming files.

---


## 📦 Advanced Usage

### Git Subtree (Recommended for ongoing updates)
If you used the git subtree method above, you can update guides later:
```bash
git subtree pull --prefix=project-documents https://github.com/ecorkran/ai-project-guide.git main --squash
```

### Manual Copy (One-time setup)
If you used the manual copy method, you'll need to re-download for updates:
```bash
# Backup your project-specific files first
cp -r project-documents/private project-documents-private-backup

# Download fresh guides
curl -L https://github.com/ecorkran/ai-project-guide/archive/refs/heads/main.tar.gz | tar -xz
rm -rf project-documents
mv ai-project-guide-main project-documents
rm -rf project-documents/.git

# Restore your project-specific files
cp -r project-documents-private-backup/* project-documents/private/
```
---

## 🔄 Migrating from `our-project/` to `private/`
If you're working with an existing project that uses the old `our-project/` structure, here's how to migrate to the new `private/` structure:

### Quick Migration Steps
1. **Rename the directory**: `mv project-documents/our-project project-documents/private`
2. **Create new subdirectories** (if they don't exist):
   ```bash
   mkdir -p project-documents/private/tasks
   ```
3. **Move project documents** to the `private/project-guides/` directory:
   ```bash
   # Create project-guides directory if it doesn't exist
   mkdir -p project-documents/private/project-guides
   
   # Move concept, spec, and notes files to private/project-guides/
   mv project-documents/private/concept/* project-documents/private/project-guides/ 2>/dev/null || true
   mv project-documents/private/spec/* project-documents/private/project-guides/ 2>/dev/null || true
   ```
4. **Update any references** in your project-specific files from `our-project/` to `private/`

### New Structure After Migration
```
private/
├── code-reviews/        # (existing)
├── maintenance/         # (existing) 
├── features/            # (new) - feature definitions & specifications
├── project-guides/      # (new) - project-specific guide customizations
│   ├── 01-concept.{project}.md # (moved here)
│   ├── 02-spec.{project}.md    # (moved here)
│   └── 03-notes.{project}.md   # (moved here)
├── tasks/               # (new) - move task files here
└── ui/                  # (existing)
    └── screenshots/     # (existing)
```

> **Note**: The guides in this repository have been updated to use `private/`. If you see references to `our-project/` in guides, those are likely outdated and should be treated as `private/`.
---


## 🤝 Contributing
* Keep documents concise; link out rather than duplicate content.  
* Cite sources inline when pulling in external material.  
* Follow the "one-path rule": each document should live in exactly one canonical folder.  
* For substantial restructures, update `directory-structure.md` first, then this README.

Thanks for helping maintain a knowledge base that humans and AI agents can navigate with zero friction!  Happy building. 
