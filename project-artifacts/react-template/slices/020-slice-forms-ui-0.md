---
layer: project
docType: tasks
project: manta-templates
feature: forms-ui
status: in-progress
dateUpdated: 2025-09-05
dependencies: []
currentProjectState: "We are going to support themed shadcn ui controls in all templates"
---

## Overview

High-Level Plan: Forms UI Slice for Manta Templates             │ │
│ │                                                                 │ │
│ │ Architecture Overview                                           │ │
│ │                                                                 │ │
│ │ Goal: Add comprehensive forms UI and controls that integrate    │ │
│ │ seamlessly with the existing theme system                       │ │
│ │                                                                 │ │
│ │ Current State Analysis                                          │ │
│ │                                                                 │ │
│ │ - Theme System: Robust semantic color system using Radix colors │ │
│ │  with accent switching (teal, blue, purple, etc.)               │ │
│ │ - Existing Components: Button and Card components using         │ │
│ │ Tailwind + CVA + Radix Slot                                     │ │
│ │ - Package Structure: packages/src/lib/ui-core → propagates to   │ │
│ │ templates/*/src/lib/ui-core                                     │ │
│ │ - Framework Support: React-based components that work across    │ │
│ │ Next.js, React, and Electron templates                          │ │
│ │                                                                 │ │
│ │ Proposed Approach                                               │ │
│ │                                                                 │ │
│ │ 1. Component Library Foundation                                 │ │
│ │                                                                 │ │
│ │ - Primary Choice: Shadcn/ui components as base                  │ │
│ │ - Why: Already have button pattern established, uses same tech  │ │
│ │ stack (Radix primitives, CVA, Tailwind)                         │ │
│ │ - Integration: Components will use existing semantic color      │ │
│ │ system (--color-accent-*, --color-neutral-*)                    │ │
│ │                                                                 │ │
│ │ 2. Theme Integration Strategy                                   │ │
│ │                                                                 │ │
│ │ - Use semantic CSS variables consistently across all form       │ │
│ │ components                                                      │ │
│ │ - Leverage existing accent color switching mechanism            │ │
│ │ - Ensure dark/light mode works automatically via existing       │ │
│ │ ThemeProvider                                                   │ │
│ │                                                                 │ │
│ │ 3. Component Priority Tiers                                     │ │
│ │                                                                 │ │
│ │ Tier 1 - Core Form Controls (Phase 1)                           │ │
│ │ - Input (text, email, password, number)                         │ │
│ │ - Textarea                                                      │ │
│ │ - Checkbox & Radio                                              │ │
│ │ - Select/Dropdown                                               │ │
│ │ - Label & Form Field wrapper                                    │ │
│ │                                                                 │ │
│ │ Tier 2 - Navigation & Layout (Phase 2)                          │ │
│ │ - Navigation Menu (responsive)                                  │ │
│ │ - Tabs                                                          │ │
│ │ - Dialog/Modal                                                  │ │
│ │ - Tooltip                                                       │ │
│ │                                                                 │ │
│ │ Tier 3 - Data Display (Phase 3)                                 │ │
│ │ - Table/DataTable                                               │ │
│ │ - List                                                          │ │
│ │ - Menubar (for Electron)                                        │ │
│ │                                                                 │ │
│ │ 4. Implementation Structure                                     │ │
│ │                                                                 │ │
│ │ packages/src/lib/ui-core/                                       │ │
│ │ ├── components/                                                 │ │
│ │ │   ├── ui/                                                     │ │
│ │ │   │   ├── form/           # New form components               │ │
│ │ │   │   │   ├── input.tsx                                       │ │
│ │ │   │   │   ├── textarea.tsx                                    │ │
│ │ │   │   │   ├── checkbox.tsx                                    │ │
│ │ │   │   │   ├── radio.tsx                                       │ │
│ │ │   │   │   ├── select.tsx                                      │ │
│ │ │   │   │   ├── form.tsx    # Form wrapper with validation      │ │
│ │ │   │   │   └── index.ts                                        │ │
│ │ │   │   ├── navigation/     # Navigation components             │ │
│ │ │   │   │   ├── nav-menu.tsx                                    │ │
│ │ │   │   │   ├── tabs.tsx                                        │ │
│ │ │   │   │   └── index.ts                                        │ │
│ │ │   │   └── data/          # Data display                       │ │
│ │ │   │       ├── table.tsx                                       │ │
│ │ │   │       └── index.ts                                        │ │
│ │ │   └── ...                                                     │ │
│ │ ├── hooks/                                                      │ │
│ │ │   ├── useForm.ts         # Form state management              │ │
│ │ │   └── useValidation.ts   # Validation logic                   │ │
│ │ └── styles/                                                     │ │
│ │     └── forms.css          # Form-specific styles               │ │
│ │                                                                 │ │
│ │ 5. Technical Approach                                           │ │
│ │                                                                 │ │
│ │ - Install Radix UI primitives for each component type           │ │
│ │ - Create theme-aware wrappers using CVA for variants            │ │
│ │ - Ensure all components respect semantic color system           │ │
│ │ - Add proper TypeScript types and props interfaces              │ │
│ │ - Include accessibility features (ARIA labels, keyboard nav)    │ │
│ │                                                                 │ │
│ │ 6. Development Workflow                                         │ │
│ │                                                                 │ │
│ │ 1. Work in templates/react/src/lib/ui-core for rapid iteration  │ │
│ │ 2. Test with existing theme system and accent switching         │ │
│ │ 3. Once stable, copy to packages/src/lib/ui-core                │ │
│ │ 4. Run pnpm copy-packages:all to propagate to all templates     │ │
│ │ 5. Test in each template context (Next.js, React, Electron)     │ │
│ │                                                                 │ │
│ │ 7. Slice Breakdown                                              │ │
│ │                                                                 │ │
│ │ - Slice 1: Core form controls (input, textarea, checkbox,       │ │
│ │ radio, select)                                                  │ │
│ │ - Slice 2: Navigation components (menu, tabs)                   │ │
│ │ - Slice 3: Data display (table, list)                           │ │
│ │ - Slice 4: Electron-specific components (menubar)               │ │
│ │                                                                 │ │
│ │ Next Steps                                                      │ │
│ │                                                                 │ │
│ │ 1. Create slice documentation in project-artifacts/slices/      │ │
│ │ 2. Set up Radix UI dependencies                                 │ │
│ │ 3. Begin with Slice 1 implementation                            │ │
│ │ 4. Create example/demo pages showing all components with theme  │ │
│ │ switching                                                       │ │
