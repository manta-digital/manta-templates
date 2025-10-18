---
item: react-components-1
project: manta-templates
type: tasks
sliceRef: slices/16-slice.react-components.md
dependencies: [ui-core]
projectState: ui-core established with Next.js injection patterns, ready for standard React support
status: complete
lastUpdated: 2025-09-01
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
- [x] Create templates/react directory structure
  - [x] Navigate to templates/ directory: `cd templates/`
  - [x] Initialize new Vite project:
    ```bash
    npm create vite@latest react -- --template react-ts
    cd react/
    ```
  - [x] Verify directory structure matches expected layout
  - [x] **Success**: Base directory structure created with TypeScript support

#### Install Dependencies
- [x] Install Tailwind CSS and build dependencies
  - [x] Install core Tailwind packages:
    ```bash
    pnpm add tailwindcss @tailwindcss/vite
    ```
  - [x] Install animation and graphics libraries:
    ```bash
    pnpm add framer-motion three @types/three
    ```
  - [x] Install icon library:
    ```bash
    pnpm add lucide-react
    ```
  - [x] **Success**: Core dependencies installed without conflicts

- [x] Install ui-core required dependencies
  - [x] Install Radix UI packages:
    ```bash
    pnpm add @radix-ui/colors @radix-ui/react-slot
    ```
  - [x] Install class utilities:
    ```bash
    pnpm add class-variance-authority clsx
    ```
  - [x] **Success**: UI-core dependencies ready for integration

- [x] Install routing dependencies
  - [x] Install React Router:
    ```bash
    pnpm add react-router-dom @types/react-router-dom
    ```
  - [x] Verify TypeScript types are properly recognized
  - [x] **Success**: Routing dependencies ready for navigation setup

#### Configure Build System
- [x] Configure Vite with Tailwind CSS v4
  - [x] Update vite.config.ts with Tailwind plugin:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [react(), tailwindcss()],
    })
    ```
  - [x] **Success**: Vite configured to process Tailwind CSS v4

- [x] Configure Tailwind CSS to match Next.js theme system
  - [x] Copy globals.css from templates/nextjs to src/index.css (Tailwind v4 uses CSS-based config)
  - [x] Verify CSS custom properties match Next.js setup
  - [x] Update import paths if necessary for Vite structure
  - [x] **Success**: Theme system configuration matches Next.js template

#### Set Up Application Structure
- [x] Configure React Router structure
  - [x] Update src/App.tsx with router setup:
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
  - [x] Create src/pages/ directory structure
  - [x] **Success**: Router configuration ready for page components

#### Validate Build Process
- [x] Test build process functionality
  - [x] Run development server: `pnpm dev`
  - [x] Verify application starts without errors
  - [x] Run production build: `pnpm build`
  - [x] Verify build completes without errors
  - [x] Test built application: `pnpm preview`
  - [x] **Success**: Build system fully functional

### Task 2: UI-Core Integration
**Objective**: Copy ui-core components and verify they work without modification
**Effort**: 2/5

#### Copy UI-Core Components
- [x] Copy component files from packages/ui-core
  - [x] Copy entire packages/ui-core/src/ to templates/react/src/lib/ui-core/
  - [x] Verify all component files transferred correctly
  - [x] Check that directory structure matches: components/, hooks/, lib/, types/
  - [x] **Success**: All ui-core source files available in React template

- [x] Update import paths for local usage
  - [x] Replace all @manta-templates/ui-core imports with relative paths
  - [x] Update imports to use ../lib/ui-core/ pattern
  - [x] Search and replace imports across all component files:
    ```bash
    find src/lib/ui-core -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@manta-templates\/ui-core/..\/..\/lib\/ui-core/g'
    ```
  - [x] **Success**: Import paths converted to local references

#### Configure Styling System
- [x] Copy global CSS styles from Next.js template
  - [x] Copy templates/nextjs/src/app/globals.css to templates/react/src/index.css
  - [x] Verify CSS custom properties for theme system are included
  - [x] Import styles in main.tsx:
    ```typescript
    import './index.css'
    ```
  - [x] **Success**: Theme system CSS available in React template

- [x] Configure Tailwind to recognize ui-core classes
  - [x] Verify tailwind.config.js includes ui-core component paths
  - [x] Add content path for ui-core components:
    ```javascript
    module.exports = {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/lib/ui-core/**/*.{js,ts,jsx,tsx}"
      ]
    }
    ```
  - [x] **Success**: Tailwind processes ui-core component classes

#### Test Component Integration
- [x] Create minimal test imports
  - [x] Create src/pages/HomePage.tsx with basic structure:
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
  - [x] Create src/pages/ExamplesPage.tsx placeholder
  - [x] **Success**: Basic pages created with ui-core imports

- [x] Verify core component imports work
  - [x] Test BaseCard import and basic rendering
  - [x] Test Container import and basic rendering
  - [x] Test BentoLayout import without content
  - [x] Test GridItem import with minimal content
  - [x] Check browser console for import errors
  - [x] **Success**: Core components render without import errors

#### Validate Styling Integration
- [x] Test theme system functionality
  - [x] Verify CSS custom properties load correctly
  - [x] Test basic Tailwind classes render properly
  - [x] Check theme colors display correctly
  - [x] **Success**: Styling system fully integrated and functional

### Task 3: Content Structure Setup
**Objective**: Create hardcoded content objects to replace markdown loading
**Effort**: 2/5

#### Create Content Directory Structure
- [x] Set up content organization
  - [x] Create src/content/ directory for hardcoded content objects
  - [x] Create subdirectories: cards/, projects/, quotes/, articles/
  - [x] **Success**: Content directory structure ready for data objects

#### Port Home Page Content
- [x] Create homeContent.ts with page-level content
  - [x] Port Next.js home page content to hardcoded objects
  - [x] Replace "Next.js Starter Template" with "React Template"
  - [x] Update hero section messaging for React/Vite context
  - [x] Create homeContent object:
    ```typescript
    export const homeContent = {
      hero: {
        title: "React Template",
        description: "Standard React template with ui-core components working without injection",
        actions: [
          { label: "View Examples", href: "/examples" }
        ]
      }
    }
    ```
  - [x] **Success**: Home page content converted to React context

#### Create Component-Specific Content
- [x] Create projectContent.ts with React-specific project data
  - [x] Design React showcase project:
    ```typescript
    export const reactProjectContent = {
      title: "React Components Showcase",
      description: "Standard React template with ui-core components working without injection",
      techStack: ["React 19", "Vite 5", "Tailwind 4"],
      image: "/images/react-template.png"
    }
    ```
  - [x] **Success**: Project content reflects React template context

- [x] Create quoteContent.ts with sample quote data
  - [x] Port quote content from Next.js template
  - [x] Ensure content matches QuoteCard interface
  - [x] **Success**: Quote content ready for QuoteCard testing

- [x] Create articleContent.ts with sample article data  
  - [x] Port article content with hardcoded data
  - [x] Ensure content uses standard img/a defaults
  - [x] **Success**: Article content ready for ArticleCard testing

- [x] Create technologyContent.ts with React/Vite tech stack data
  - [x] Replace Next.js technologies with React/Vite equivalents
  - [x] Include: React, TypeScript, Vite, Tailwind CSS, Framer Motion
  - [x] **Success**: Technology content matches React template stack

#### Create Content Index
- [x] Create index.ts to export all content objects
  - [x] Export all content modules cleanly:
    ```typescript
    export * from './homeContent'
    export * from './projectContent'
    export * from './quoteContent'
    export * from './articleContent'
    export * from './technologyContent'
    ```
  - [x] Verify all content objects match ui-core component interfaces
  - [x] **Success**: Complete content structure ready for component testing

