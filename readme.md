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
mkdir project-documents
cd project-documents
git clone --depth 1 --filter=blob:none https://github.com/ecorkran/ai-project-guide.git .
```

This gives you all guides in read-only mode. Delete folders you don't need. Perfect for the "my Python project needs structure" use case.

### Want a Full Template?
If you want a complete Next.js starter with these guides pre-integrated:
- **Web**: https://templates.manta.digital
- **GitHub**: https://github.com/manta-digital/manta-templates

### Essential Files for Quick Structure
For immediate project organization, focus on:
- **`project-guides/guide.ai-project.process.md`** - The core 6-phase methodology
- **`project-guides/template.ai-project.prompts.md`** - Ready-made AI prompts  
- **`project-guides/coderules.md`** - Copy into your `.cursorrules` or equivalent

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
| **`project-guides/`** | Process & methodology docs that apply to *every* project (e.g., guide.ai-project.process, guide.ai-project.spec, Code Rules). |
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

### Git Subtree (For updates)
```bash
# In your existing project root
git subtree add --prefix=project-documents https://github.com/ecorkran/ai-project-guide.git main --squash
```

To update later:
```bash
git subtree pull --prefix=project-documents https://github.com/ecorkran/ai-project-guide.git main --squash
```

---

## 🤝 Contributing
* Keep documents concise; link out rather than duplicate content.  
* Cite sources inline when pulling in external material.  
* Follow the "one-path rule": each document should live in exactly one canonical folder.  
* For substantial restructures, update `directory-structure.md` first, then this README.

Thanks for helping maintain a knowledge base that humans and AI agents can navigate with zero friction!  Happy building. 
