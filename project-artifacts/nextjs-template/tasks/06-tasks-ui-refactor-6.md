## Phase 6: Template Distribution

### Build React + Router Template
- [ ] Create new templates/react directory structure
  - [ ] Create templates/react/ directory
    1. Run: `mkdir -p templates/react`
  - [ ] Initialize React + TypeScript project structure:
    ```bash
    cd templates/react
    npm create vite@latest . -- --template react-ts
    ```
  - [ ] Install additional dependencies:
    ```bash
    pnpm add react-router-dom @manta-templates/ui-core @manta-templates/ui-adapters-react-router
    ```
- [ ] Configure build system (Vite + React + TypeScript)
  - [ ] Update vite.config.ts to include proper path resolution:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from 'path'
    
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    })
    ```
  - [ ] Configure TypeScript paths in tsconfig.json
- [ ] Import components from React Router adapter
  - [ ] Update src/main.tsx to include React Router setup:
    ```typescript
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import { BrowserRouter } from 'react-router-dom'
    import App from './App.tsx'
    import './index.css'
    
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
    ```
  - [ ] Import and use components from React Router adapter in App.tsx
- [ ] Create equivalent pages/routes to Next.js template
  - [ ] Create src/pages/ directory with route components
  - [ ] Port Next.js pages to React Router routes:
    1. Home page → src/pages/Home.tsx
    2. About page → src/pages/About.tsx  
    3. Blog pages → src/pages/Blog.tsx, src/pages/BlogPost.tsx
  - [ ] Set up routing in App.tsx with Route components
- [ ] Configure Tailwind CSS for React template
  - [ ] Install Tailwind: `pnpm add -D tailwindcss postcss autoprefixer`
  - [ ] Initialize Tailwind: `npx tailwindcss init -p`
  - [ ] Configure tailwind.config.js with content paths
  - [ ] Add Tailwind directives to src/index.css
- [ ] Test React template
  - [ ] Run dev server: `pnpm dev`
  - [ ] Verify all components render correctly
  - [ ] Test navigation between routes
  - [ ] Success: React template runs and displays same content as Next.js template

### Build Astro Template with React Islands
- [ ] Create new templates/astro directory
  - [ ] Create templates/astro/ directory
    1. Run: `mkdir -p templates/astro`
  - [ ] Initialize Astro project:
    ```bash
    cd templates/astro
    npm create astro@latest . -- --template minimal --typescript
    ```
- [ ] Configure Astro to use React components as islands
  - [ ] Install React integration: `pnpm astro add react`
  - [ ] Install ui-core components:
    ```bash
    pnpm add @manta-templates/ui-core @manta-templates/ui-adapters-react-router
    ```
  - [ ] Configure astro.config.mjs:
    ```javascript
    import { defineConfig } from 'astro/config';
    import react from '@astrojs/react';
    import tailwind from '@astrojs/tailwind';
    
    export default defineConfig({
      integrations: [react(), tailwind()]
    });
    ```
- [ ] Import components from appropriate adapter
  - [ ] Create src/components/ directory for Astro-specific wrappers if needed
  - [ ] Import React components for use in Astro islands
- [ ] Create equivalent pages using Astro pages + React islands
  - [ ] Create src/pages/index.astro (Home page):
    ```astro
    ---
    import Layout from '../layouts/Layout.astro';
    import { BlogCard } from '@manta-templates/ui-adapters-react-router';
    ---
    
    <Layout title="Home">
      <main>
        <BlogCard 
          client:load
          title="Example Post"
          excerpt="This is an example"
          coverImageUrl="/example.jpg"
        />
      </main>
    </Layout>
    ```
  - [ ] Create additional pages (about.astro, blog/index.astro, etc.)
  - [ ] Use client:load directive for interactive components
- [ ] Configure Tailwind CSS for Astro
  - [ ] Tailwind should be configured via astro add tailwind
  - [ ] Verify Tailwind styles work with React islands
- [ ] Test Astro template
  - [ ] Run dev server: `pnpm dev`
  - [ ] Verify pages load correctly
  - [ ] Test React island hydration
  - [ ] Verify component interactivity works
  - [ ] Success: Astro template displays same content with proper hydration

### Implement Template Bundling System
- [ ] Create scripts/build-templates.js for standalone template generation
  - [ ] Create scripts/ directory in repository root: `mkdir -p scripts`
  - [ ] Create scripts/build-templates.js:
    ```javascript
    const fs = require('fs-extra');
    const path = require('path');
    
    async function buildStandaloneTemplate(templateType) {
      const sourceDir = `./templates/${templateType}`;
      const distDir = `./dist-templates/${templateType}-template`;
      
      console.log(`Building ${templateType} template...`);
      
      // Copy template structure
      await fs.copy(sourceDir, distDir);
      
      // Process package.json to remove workspace dependencies
      await updatePackageJson(distDir, templateType);
      
      console.log(`${templateType} template built successfully`);
    }
    
    async function updatePackageJson(distDir, templateType) {
      const packageJsonPath = path.join(distDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      
      // Remove workspace dependencies
      if (packageJson.dependencies) {
        Object.keys(packageJson.dependencies).forEach(dep => {
          if (dep.startsWith('@manta-templates/')) {
            delete packageJson.dependencies[dep];
          }
        });
      }
      
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
    ```
- [ ] Implement component usage analysis
  - [ ] Add function to analyze which ui-core components are used:
    ```javascript
    async function analyzeComponentUsage(templateType) {
      const sourceDir = `./templates/${templateType}`;
      const componentUsage = new Set();
      
      // Scan files for ui-core imports
      // Implementation to find @manta-templates/ui-core imports
      
      return Array.from(componentUsage);
    }
    ```
- [ ] Create bundling system that inlines ui-core components
  - [ ] Add function to inline components into dist-templates:
    ```javascript
    async function inlineComponents(usedComponents, distDir) {
      const uiCoreDir = './packages/ui-core/src';
      const targetDir = path.join(distDir, 'src/components/ui-core');
      
      // Copy only used components
      for (const component of usedComponents) {
        // Copy component files
        // Update import paths
      }
    }
    ```
- [ ] Generate standalone package.json files
  - [ ] Ensure bundled templates have no workspace dependencies
  - [ ] Add all necessary dependencies directly to template package.json
  - [ ] Include build and dev scripts appropriate for each framework
- [ ] Test bundling system
  - [ ] Create dist-templates/ directory: `mkdir -p dist-templates`
  - [ ] Run build script: `node scripts/build-templates.js`
  - [ ] Verify bundled templates are self-contained
  - [ ] Success: Bundled templates are completely self-contained and work with `npx degit`

### Create Automated Distribution Pipeline
- [ ] Set up automated build process for all template variants
  - [ ] Update scripts/build-templates.js to build all templates:
    ```javascript
    async function buildAllTemplates() {
      const templates = ['nextjs', 'react', 'astro'];
      
      for (const template of templates) {
        await buildStandaloneTemplate(template);
      }
      
      console.log('All templates built successfully');
    }
    
    if (require.main === module) {
      buildAllTemplates().catch(console.error);
    }
    ```
  - [ ] Add script to root package.json:
    ```json
    "scripts": {
      "build:templates": "node scripts/build-templates.js",
      "clean:templates": "rimraf dist-templates"
    }
    ```
- [ ] Create scripts for updating dist-templates from templates
  - [ ] Create scripts/update-templates.js:
    ```javascript
    async function updateDistTemplates() {
      // Clean existing dist-templates
      await fs.remove('./dist-templates');
      
      // Rebuild all templates
      await buildAllTemplates();
      
      console.log('Distribution templates updated');
    }
    ```
- [ ] Generate framework-specific README files for each template
  - [ ] Create scripts/generate-readme.js:
    ```javascript
    function generateReadme(templateType) {
      return `# ${templateType.toUpperCase()} Template
    
    ## Quick Start
    \`\`\`bash
    npx degit yourorg/${templateType}-template my-project
    cd my-project
    npm install
    npm run dev
    \`\`\`
    
    ## Features
    ${getFeatureList(templateType)}
    `;
    }
    ```
  - [ ] Generate README.md for each dist-template
- [ ] Set up validation that bundled templates install and build correctly
  - [ ] Create scripts/validate-templates.js:
    ```javascript
    async function validateTemplate(templateType) {
      const tempDir = `./temp-test-${templateType}`;
      const distDir = `./dist-templates/${templateType}-template`;
      
      // Copy template to temp directory
      await fs.copy(distDir, tempDir);
      
      // Install dependencies
      await exec('npm install', { cwd: tempDir });
      
      // Run build
      await exec('npm run build', { cwd: tempDir });
      
      // Clean up
      await fs.remove(tempDir);
      
      console.log(`${templateType} template validated successfully`);
    }
    ```
- [ ] Test automated pipeline
  - [ ] Run complete pipeline: `pnpm build:templates`
  - [ ] Validate all generated templates: `node scripts/validate-templates.js`
  - [ ] Success: Single command generates all distributable templates ready for publication

