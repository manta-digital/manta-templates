# Manta Templates Refactor: UI-Core Architecture

## Current State Analysis

From the documentation, manta-templates currently has:

### **Current Structure:**
```
templates/nextjs/
├── src/components/
│   ├── cards/          # BlogCard, ProjectCard, VideoCard, QuoteCard
│   ├── layouts/        # BentoLayout, GridLayout, Container  
│   └── ui/             # BaseCard, Button, ThemeToggle
```

### **Current Tech Stack:**
- Next.js 15 (App Router)
- Tailwind CSS v4
- ShadCN components  
- Radix (theming)
- React

## The Core Problem

You've identified the right friction point: **Most components are unnecessarily coupled to NextJS when they're really just React + Tailwind + ShadCN + Radix components.**

## Recommended Architecture

Here's how I'd restructure this for optimal monorepo workflow:

### **1. Create a Framework-Agnostic Core Layer**

```
packages/
├── ui-core/                    # Framework-agnostic components
│   ├── components/
│   │   ├── cards/             # AboutCard, BlogCard, ProjectCard
│   │   ├── layout/            # Header variants, Container
│   │   └── primitives/        # BaseCard, Button (ShadCN-based)
│   ├── styles/                # Tailwind config, CSS
│   └── tokens/                # Design tokens, Radix theme config
├── templates/
│   ├── nextjs/                # NextJS-specific template
│   │   ├── src/app/           # App Router, pages, NextJS features
│   │   └── src/components/    # NextJS-specific wrappers only
│   └── astro/                 # Astro-specific template  
│       ├── src/pages/         # Astro pages
│       └── src/components/    # Astro-specific wrappers
```

### **2. Component Classification**

| Component Type | Location | Dependencies | Framework-Specific? |
|---------------|----------|--------------|-------------------|
| **AboutCard/AboutMe** | `ui-core/cards/` | Tailwind + ShadCN + Radix | ❌ No |
| **Header variants** | `ui-core/layout/` | Tailwind + ShadCN + Radix | ❌ No |  
| **BentoLayout** | `ui-core/layout/` | Tailwind CSS Grid | ❌ No |
| **GridLayout** | `ui-core/layout/` | Tailwind CSS Grid | ❌ No |
| **BlogCard** | `ui-core/cards/` | Tailwind + ShadCN | ❌ No |
| **Navigation** | `templates/{framework}/` | Framework routing | ✅ Yes |
| **Page components** | `templates/{framework}/` | Framework features | ✅ Yes |

### **3. What Belongs Where**

#### **ui-core Package** (Framework Agnostic)
- All card components (AboutCard, BlogCard, ProjectCard, etc.)
- Layout components (BentoLayout, GridLayout, Header variants)
- Base UI primitives (BaseCard, Button, ThemeToggle)
- Tailwind configuration
- Radix theme tokens

#### **NextJS Template** (Framework Specific)
- App Router pages (`app/`)
- Server components
- NextJS-specific features (Image optimization, routing, etc.)
- Framework-specific component wrappers (if needed)

#### **Astro Template** (Framework Specific)  
- Astro pages (`src/pages/`)
- Astro components (`.astro` files)
- Astro-specific integrations
- Framework-specific component wrappers (if needed)

## Implementation Strategy

### **Phase 1: Extract Core Components**
1. Create `packages/ui-core` with shared Tailwind + ShadCN + Radix components
2. Move all truly generic components (80%+ of current components)
3. Keep only framework-specific code in templates

### **Phase 2: Template Refactoring**
1. Templates import from `ui-core`
2. Templates focus on framework-specific concerns (routing, pages, SSR, etc.)
3. Add Astro template using same core components

### **Phase 3: Component Variants**
1. Add your AboutCard and Header variants to `ui-core`
2. Both NextJS and Astro templates can use them immediately
3. No duplication, consistent behavior

## Benefits of This Approach

1. **✅ Eliminate Duplication**: Write once, use everywhere
2. **✅ Framework Flexibility**: Easy to add Vue, Svelte, etc. later
3. **✅ Faster Development**: No need to maintain multiple versions
4. **✅ Consistent Design**: Same components = same behavior
5. **✅ Better Testing**: Test components once in isolation
6. **✅ Cleaner Dependencies**: Framework templates stay lean

## What's Actually NextJS-Specific?

From analyzing the current structure, very little is actually NextJS-specific:
- **App Router pages** (app/)
- **Server Components** (if using SSR features)
- **NextJS Image component** (performance optimization)
- **NextJS routing** (Link components, navigation)

Everything else (cards, layouts, buttons, themes) can be framework-agnostic.

## Component Analysis: AboutCard & Header Examples

### **AboutCard/AboutMe Component**
- **Dependencies**: Tailwind CSS, ShadCN Card, potentially Radix themes
- **Framework Requirements**: None - pure React component
- **Recommendation**: Place in `ui-core/cards/AboutCard.tsx`
- **Usage**: Import in both NextJS and Astro templates

### **Header Component Variants**
- **Dependencies**: Tailwind CSS, ShadCN components, Radix themes
- **Framework Requirements**: None for layout - routing is injected as props
- **Recommendation**: Place in `ui-core/layout/Header/` with variants
- **Usage**: Templates pass framework-specific routing props

## Next Steps

1. **Audit existing components** - Identify which are truly framework-agnostic
2. **Create ui-core package** - Set up the shared component library
3. **Extract components** - Move generic components to ui-core
4. **Update templates** - Refactor to import from ui-core
5. **Add Astro support** - Create Astro template using same components
6. **Test integration** - Ensure components work across frameworks