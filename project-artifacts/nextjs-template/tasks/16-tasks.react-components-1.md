---
item: react-components-1
project: manta-templates
type: tasks
sliceRef: slices/16-slice.react-components.md
dependencies: [ui-core]
projectState: ui-core established with Next.js injection patterns, ready for standard React support
status: not started
lastUpdated: 2025-08-31
---

# Tasks: React Components (Standard HTML Elements)

## Context Summary

Implementing standard React support for ui-core components by creating templates/react as validation and adding framework-agnostic video components. Current analysis shows that 95% of ui-core components already work in standard React environments through graceful HTML element defaults (img, a). Only video functionality requires new StandardBackgroundVideo and StandardVideoPlayer components.

**Development Approach**: Validate-first strategy by creating React template to prove existing functionality, then enhance with missing video components.

**Key Requirements**:
- Create templates/react using Vite + React to validate component compatibility
- Build StandardBackgroundVideo component for framework-agnostic video support  
- Maintain 100% backward compatibility with existing Next.js injection patterns
- Demonstrate full ui-core functionality in standard React environments

## Tasks

### Task 1: React Template Foundation
**Objective**: Create basic Vite + React template structure and validate build setup
**Effort**: 2/5

#### Create Directory Structure
- [ ] Create templates/react directory structure
  - [ ] Navigate to templates/ directory: `cd templates/`
  - [ ] Initialize new Vite project:
    ```bash
    npm create vite@latest react -- --template react-ts
    cd react/
    ```
  - [ ] Verify directory structure matches expected layout
  - [ ] **Success**: Base directory structure created with TypeScript support

#### Install Dependencies
- [ ] Install Tailwind CSS and build dependencies
  - [ ] Install core Tailwind packages:
    ```bash
    pnpm add tailwindcss @tailwindcss/vite
    ```
  - [ ] Install animation and graphics libraries:
    ```bash
    pnpm add framer-motion three @types/three
    ```
  - [ ] Install icon library:
    ```bash
    pnpm add lucide-react
    ```
  - [ ] **Success**: Core dependencies installed without conflicts

- [ ] Install ui-core required dependencies
  - [ ] Install Radix UI packages:
    ```bash
    pnpm add @radix-ui/colors @radix-ui/react-slot
    ```
  - [ ] Install class utilities:
    ```bash
    pnpm add class-variance-authority clsx
    ```
  - [ ] **Success**: UI-core dependencies ready for integration

- [ ] Install routing dependencies
  - [ ] Install React Router:
    ```bash
    pnpm add react-router-dom @types/react-router-dom
    ```
  - [ ] Verify TypeScript types are properly recognized
  - [ ] **Success**: Routing dependencies ready for navigation setup

#### Configure Build System
- [ ] Configure Vite with Tailwind CSS v4
  - [ ] Update vite.config.ts with Tailwind plugin:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [react(), tailwindcss()],
    })
    ```
  - [ ] **Success**: Vite configured to process Tailwind CSS v4

- [ ] Configure Tailwind CSS to match Next.js theme system
  - [ ] Copy tailwind.config.js from templates/nextjs
  - [ ] Verify CSS custom properties match Next.js setup
  - [ ] Update import paths if necessary for Vite structure
  - [ ] **Success**: Theme system configuration matches Next.js template

#### Set Up Application Structure
- [ ] Configure React Router structure
  - [ ] Update src/App.tsx with router setup:
    ```typescript
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
    import HomePage from './pages/HomePage'
    import ExamplesPage from './pages/ExamplesPage'
    
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/examples" element={<ExamplesPage />} />
          </Routes>
        </Router>
      )
    }
    ```
  - [ ] Create src/pages/ directory structure
  - [ ] **Success**: Router configuration ready for page components

#### Validate Build Process
- [ ] Test build process functionality
  - [ ] Run development server: `pnpm dev`
  - [ ] Verify application starts without errors
  - [ ] Run production build: `pnpm build`
  - [ ] Verify build completes without errors
  - [ ] Test built application: `pnpm preview`
  - [ ] **Success**: Build system fully functional

### Task 2: UI-Core Integration
**Objective**: Copy ui-core components and verify they work without modification
**Effort**: 2/5

#### Copy UI-Core Components
- [ ] Copy component files from packages/ui-core
  - [ ] Copy entire packages/ui-core/src/ to templates/react/src/lib/ui-core/
  - [ ] Verify all component files transferred correctly
  - [ ] Check that directory structure matches: components/, hooks/, lib/, types/
  - [ ] **Success**: All ui-core source files available in React template

- [ ] Update import paths for local usage
  - [ ] Replace all @manta-templates/ui-core imports with relative paths
  - [ ] Update imports to use ../lib/ui-core/ pattern
  - [ ] Search and replace imports across all component files:
    ```bash
    find src/lib/ui-core -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@manta-templates\/ui-core/..\/..\/lib\/ui-core/g'
    ```
  - [ ] **Success**: Import paths converted to local references

#### Configure Styling System
- [ ] Copy global CSS styles from Next.js template
  - [ ] Copy templates/nextjs/src/app/globals.css to templates/react/src/index.css
  - [ ] Verify CSS custom properties for theme system are included
  - [ ] Import styles in main.tsx:
    ```typescript
    import './index.css'
    ```
  - [ ] **Success**: Theme system CSS available in React template

- [ ] Configure Tailwind to recognize ui-core classes
  - [ ] Verify tailwind.config.js includes ui-core component paths
  - [ ] Add content path for ui-core components:
    ```javascript
    module.exports = {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/lib/ui-core/**/*.{js,ts,jsx,tsx}"
      ]
    }
    ```
  - [ ] **Success**: Tailwind processes ui-core component classes

#### Test Component Integration
- [ ] Create minimal test imports
  - [ ] Create src/pages/HomePage.tsx with basic structure:
    ```typescript
    import { Container } from '../lib/ui-core/components'
    
    export default function HomePage() {
      return (
        <Container>
          <h1>React Template</h1>
        </Container>
      )
    }
    ```
  - [ ] Create src/pages/ExamplesPage.tsx placeholder
  - [ ] **Success**: Basic pages created with ui-core imports

- [ ] Verify core component imports work
  - [ ] Test BaseCard import and basic rendering
  - [ ] Test Container import and basic rendering
  - [ ] Test BentoLayout import without content
  - [ ] Test GridItem import with minimal content
  - [ ] Check browser console for import errors
  - [ ] **Success**: Core components render without import errors

#### Validate Styling Integration
- [ ] Test theme system functionality
  - [ ] Verify CSS custom properties load correctly
  - [ ] Test basic Tailwind classes render properly
  - [ ] Check theme colors display correctly
  - [ ] **Success**: Styling system fully integrated and functional

### Task 3: Content Structure Setup
**Objective**: Create hardcoded content objects to replace markdown loading
**Effort**: 2/5

#### Create Content Directory Structure
- [ ] Set up content organization
  - [ ] Create src/content/ directory for hardcoded content objects
  - [ ] Create subdirectories: cards/, projects/, quotes/, articles/
  - [ ] **Success**: Content directory structure ready for data objects

#### Port Home Page Content
- [ ] Create homeContent.ts with page-level content
  - [ ] Port Next.js home page content to hardcoded objects
  - [ ] Replace "Next.js Starter Template" with "React Components Template"
  - [ ] Update hero section messaging for React/Vite context
  - [ ] Create homeContent object:
    ```typescript
    export const homeContent = {
      hero: {
        title: "React Components Template",
        description: "Standard React template with ui-core components working without injection",
        actions: [
          { label: "View Examples", href: "/examples" }
        ]
      }
    }
    ```
  - [ ] **Success**: Home page content converted to React context

#### Create Component-Specific Content
- [ ] Create projectContent.ts with React-specific project data
  - [ ] Design React showcase project:
    ```typescript
    export const reactProjectContent = {
      title: "React Components Showcase",
      description: "Standard React template with ui-core components working without injection",
      techStack: ["React 19", "Vite 5", "Tailwind 4"],
      image: "/images/react-template.png"
    }
    ```
  - [ ] **Success**: Project content reflects React template context

- [ ] Create quoteContent.ts with sample quote data
  - [ ] Port quote content from Next.js template
  - [ ] Ensure content matches QuoteCard interface
  - [ ] **Success**: Quote content ready for QuoteCard testing

- [ ] Create articleContent.ts with sample article data  
  - [ ] Port article content with hardcoded data
  - [ ] Ensure content uses standard img/a defaults
  - [ ] **Success**: Article content ready for ArticleCard testing

- [ ] Create technologyContent.ts with React/Vite tech stack data
  - [ ] Replace Next.js technologies with React/Vite equivalents
  - [ ] Include: React, TypeScript, Vite, Tailwind CSS, Framer Motion
  - [ ] **Success**: Technology content matches React template stack

#### Create Content Index
- [ ] Create index.ts to export all content objects
  - [ ] Export all content modules cleanly:
    ```typescript
    export * from './homeContent'
    export * from './projectContent'
    export * from './quoteContent'
    export * from './articleContent'
    export * from './technologyContent'
    ```
  - [ ] Verify all content objects match ui-core component interfaces
  - [ ] **Success**: Complete content structure ready for component testing

