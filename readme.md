---
docType: repository-overview
---
```
---
docType: repository-overview
---
```
# Manta Knowledge & Guide Repository

Welcome!  
This repo is the single source of truth for every guide, playbook, and reference that powers our projects and agentic workflows.  If you’re a human contributor, start here. If you’re an AI agent, parse the folder map below to find exactly what you need—no guessing required.

---
## 🔑 What lives where?

| Folder | Look here when you need… |
|--------|-------------------------|
| **`project-guides/`** | Process & methodology docs that apply to *every* project (e.g., AI Project Guide, Spec Guide, Code Rules). |
| **`framework-guides/`** | App-level runtimes or platforms that own the entire build/runtime cycle (Next.js, Astro, Flutter, Qt…). |
| **`tool-guides/`** | Importable libraries or UI kits you slot *into* an app (SciChart, Three.js, Tailwind…). |
| **`api-guides/`** | External data or service endpoints accessed over HTTP/gRPC (USGS Water Services, ArcGIS, Alpha Vantage…). |
| **`domain-guides/`** | Cross-cutting subject knowledge useful across many projects (game-development, hydrology, financial-visualisation…). |
| **`snippets/`** | Language-agnostic code fragments and quick copy-paste helpers. |

*Full details and rationale live in [`project-documents/directory-structure.md`](project-documents/directory-structure.md).* directory-structure.md](file-service://file-7qir1sE13SRFYrvctFhnsb)

---
## 🧭 Zero-ambiguity decision matrix

1. Is it a **process** document? → `project-guides/`  
2. Does it **own the whole app lifecycle**? → `framework-guides/`  
3. Is it an **external network API**? → `api-guides/`  
4. Is it **imported as a library** inside another app? → `tool-guides/`  
5. Is it broad **subject matter** knowledge? → `domain-guides/`  

Anything that doesn’t match gets flagged for discussion before filing.

---
## 📐 Naming & formatting conventions

All file and folder names follow our kebab-case pattern and document-type prefixes outlined in [`file-naming-conventions.md`](project-documents/file-naming-conventions.md). file-naming-conventions.md](file-service://file-9aqEMStvihP9s5DfmT7yFh)  
Please review that doc before adding or renaming files.

---
## 🚀 Quick start for humans & AIs

1. **Read this README** (you’re here!).  
2. **Jump to the folder** that matches the decision matrix above.  
3. **Add YAML front-matter** (`layer: framework|tool|api|domain|process`) to any new guide so agents can auto-classify even if it’s misplaced.  

---
## 🤝 Contributing
* Keep documents concise; link out rather than duplicate content.  
* Cite sources inline when pulling in external material.  
* Follow the “one-path rule”: each document should live in exactly one canonical folder.  
* For substantial restructures, update `directory-structure.md` first, then this README.

Thanks for helping maintain a knowledge base that humans and AI agents can navigate with zero friction!  Happy building. 
