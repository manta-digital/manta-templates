---
docType: repository-overview
---
# AI Project Guides & Methodology

> Structured project guides and parameterized prompts that dramatically expand what AI tools can help you build. Turn complex projects into manageable, AI-assisted workflows.

This repository contains a comprehensive methodology for AI-assisted development, including:
- **6-phase project process** with clear roles and workflows
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

### Want a Full Template?
If you want a complete Next.js starter with these guides pre-integrated:
- **Web**: https://templates.manta.digital
- **GitHub**: https://github.com/manta-digital/manta-templates

### Essential Files for Quick Structure
For immediate project organization, focus on:
- **`project-guides/guide.ai-project.00-process.md`** - The core 6-phase methodology
- **`project-guides/prompt.ai-project.system.md`** - Ready-made AI prompts  
- **`project-guides/rules/`** - Copy to your IDE's rules directory (`.cursor/rules/`, `.windsurf/rules/`, etc.)

These three files will immediately give your AIs the structure and context they need to help effectively.

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

All file and folder names follow our kebab-case pattern and document-type prefixes outlined in [`file-naming-conventions.md`](project-documents/file-naming-conventions.md).  
Please review that doc before adding or renaming files.

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
