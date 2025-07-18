```yaml
---
docType: meta-guide
subject: creating-tool-guides
audience:
  - ai
  - human
purpose: Standard template & process for producing platform/tool guides
---
```

# Guide‑on‑Guides 📚

_A repeatable template for writing concise, AI‑friendly documentation._

> **Why this guide?** To streamline onboarding of _any_ new technology—frameworks, libraries, services—by giving writers (human or AI) a battle‑tested pattern.

---

## 1 Core Principles

1. **AI‑first, human‑readable** All content should be easily parseable by language models (consistent headings, code blocks) while remaining clear for humans.
2. **Minimal friction** Keep total reading time ≤ 5 mins for the _introduction_.
3. **Action‑oriented** Prioritise commands, flags, and pitfalls over prose.
4. **Single‑source YAML metadata** Front‑matter tells agents _what_ the file is and _how_ to use it.

---

## 2 Required File Set

| Filename                    | Purpose                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `introduction.md`           | 80/20 overview, quickstart, _lightweight_ install steps.            |
| `setup.md`                  | Deep‑dive install/config (only if intro would become >≈ 200 lines). |
| `knowledge.md` _(optional)_ | Grab‑bag of pitfalls, FAQs, copy‑paste snippets, perf tips.         |

> **Tip:** For very complex stacks, break `knowledge.md` into topical docs (`pitfalls.md`, `performance.md`, `auth.md`, …). Follow the same front‑matter pattern.

---

## 3 Front‑Matter Schema
```yaml
---
docType: intro-guide  # or setup-guide / knowledge-guide
platform: <tool‑name> # e.g. nextjs, astro, threejs
audience: [ ai, human ]
features: [ optional, bullet, list ]
purpose: Short one‑liner
---
```

### Rules
- **Keep keys lowercase**; arrays lower‑snake or kebab.
- Use `docType` values: `intro-guide`, `setup-guide`, `knowledge-guide`.  
- Always include `audience` and `purpose`.

---

## 4 Section Templates

### 4.1 `introduction.md`

````markdown
## Summary
1‑2 sentences why the tool matters.

## Prerequisites
- Node ≥ 18, pnpm 8…

## Quickstart (copy‑paste)
```bash
CI=true npx create‑<tool>@latest my‑project --yes
````

## Folder Structure (optional)

## Next Steps / Links

- Official docs ↗
````

### 4.2 `setup.md`
Focus on *exact* install commands, env vars, OS‑specific quirks.  Keep narrative
low.

### 4.3 `knowledge.md`, `issues.md`, `scripts.ai-support.md`, etc.
Organise as collapsible bullet lists or tables:
```markdown
### Common Pitfalls
| Symptom | Cause | Fix |
|---------|-------|-----|
| Build hangs on `next build` | ESM + CommonJS mix | Add `type:"module"` |
````

---

## 5 Writing Style Checklist ✅

-  Use **imperative voice**: "Run", "Add", "Verify".
-  Start commands with `$` _only_ in inline snippets; omit in blocks for easier copy‑paste.
-  Wrap paths, flags, env vars in backticks.
-  Limit paragraphs to ≤ 3 sentences.
-  Prefer tables over long prose for comparisons.
-  Cite internal docs with relative paths (`../../project-guides/...`).

---

## 6 Code‑Snippet Conventions

```bash
# Good: minimal, standalone, no user prompts
CI=true npx create‑next‑app@latest my‑site --typescript --tailwind

# ❌ Avoid: ellipses, comments requiring edit
npm install some‑lib   # then edit config <-- move to text above
```

---

## 7 Naming & Placement

- Obey _file‑naming‑conventions.md_ (kebab for dirs, period‑separated names).
- Place guides under:
```
project-documents/tool-guides/<tool>/
  |- introduction.md
  |- setup.md
  |- knowledge.md
```

- If the tool is also a primary _project platform_ (e.g. nextjs), mirror docs in `project-guides/<platform>/` when custom rules apply.

---

## 8 Automation Hooks (for AI pipelines)

|Signal|Meaning|Example|
|---|---|---|
|`docType:intro-guide` header|Fast detect intro file|Used by agent to suggest quickstart|
|Code fences `bash /` sh|Commands to execute|Parsing script extracts and runs|

---
## 9 Example Skeleton
```text
project-documents/tool-guides/scichart/
  ├── introduction.md        # < 300 lines, includes install via pnpm
  ├── setup.md               # OS deps, license key env, WebGL fallback
  └── react.customization.md # Scichart react customization guide
```

---
## 10 Revision & Ownership
- **Single‑source of truth**: Update intro & setup together when tool version bumps.
- **Changelog**: Add one‑liner to `.windsurf-updates` after _Project Manager_ sign‑off.
- **Review**: Use _AI Code Review Guide_ rules when PRing doc changes.

---
### Recap
Follow this template to deliver concise, executable guides that your AI agents (and teammates) can consume instantly—speeding up adoption of any new tech.