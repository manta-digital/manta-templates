# Template Distribution Strategy

## Overview

This document outlines how to manage template distribution complexity while maintaining the simplicity of template instantiation (like `npx degit`) for both humans and AIs.

## Template Distribution Strategy

### Proposed Structure

```
{root}/
├── packages/
│   ├── ui-core/              # Your component library
│   └── create-templates/     # Template generation tools
│       ├── nextjs/
│       ├── react/
│       └── astro/
├── templates/               # Development templates (full monorepo context)
│   ├── nextjs/
│   ├── react/
│   └── astro/
└── dist-templates/          # Standalone, distributable templates
    ├── nextjs-template/
    ├── react-template/
    └── astro-template/
```

## Recommended Approach: Hybrid Strategy

### 1. Development in Monorepo
Keep your current development workflow in the monorepo for easy iteration and testing.

### 2. Distribution via Template Bundling

**Create a build script** that generates standalone templates:

```json
// root package.json
{
  "scripts": {
    "build:templates": "node scripts/build-templates.js",
    "publish:templates": "npm run build:templates && npm run publish:all-templates"
  }
}
```

**Template build process:**
```javascript
// scripts/build-templates.js
async function createStandaloneTemplate(templateType) {
  const templateDir = `./dist-templates/${templateType}-template`
  
  // 1. Copy base template
  await fs.copy(`./templates/${templateType}`, templateDir)
  
  // 2. Inline ui-core components (tree-shaken)
  const components = await getUsedComponents(templateType)
  await inlineComponents(components, templateDir)
  
  // 3. Update dependencies
  await updatePackageJson(templateDir, templateType)
  
  // 4. Create README with setup instructions
  await generateReadme(templateDir, templateType)
}
```

### 3. Easy Instantiation Methods

**Option A: NPX Create Commands**
```bash
npx create-my-app@latest my-project --template nextjs
npx create-my-app@latest my-project --template react
npx create-my-app@latest my-project --template astro
```

**Option B: Degit with Built Templates**
```bash
npx degit yourorg/templates/dist-nextjs my-project
npx degit yourorg/templates/dist-react my-project
npx degit yourorg/templates/dist-astro my-project
```

**Option C: GitHub Template Repositories**
Create separate GitHub repos for each built template:
- `yourorg/nextjs-template`
- `yourorg/react-template` 
- `yourorg/astro-template`

Then users can:
```bash
npx degit yourorg/nextjs-template my-project
```

## Template Structure for Easy Usage

Each distributed template should be **completely self-contained**:

```
nextjs-template/
├── src/
│   ├── components/
│   │   ├── ui/           # Bundled from ui-core
│   │   │   ├── button.tsx
│   │   │   ├── image.tsx
│   │   │   └── index.ts
│   │   └── layout/
│   ├── pages/
│   └── styles/
├── package.json          # No workspace deps
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md             # Clear setup instructions
```

## Automation for Simplicity

### 1. Component Bundling Strategy

**Smart bundling** that only includes used components:

```javascript
// scripts/bundle-components.js
async function bundleComponentsForTemplate(templateType) {
  // Analyze template usage
  const usedComponents = await analyzeComponentUsage(`./templates/${templateType}`)
  
  // Create optimized bundle
  const bundle = await createComponentBundle(usedComponents, templateType)
  
  return bundle
}
```

### 2. Dependency Management

**Template-specific package.json generation:**

```javascript
function generatePackageJson(templateType) {
  const base = require(`./templates/${templateType}/package.json`)
  
  // Remove workspace dependencies
  delete base.dependencies['@yourorg/ui-core']
  
  // Add framework-specific optimizations
  if (templateType === 'react') {
    base.dependencies['react-router-dom'] = '^6.8.0'
    base.dependencies['react-image'] = '^4.1.0'
  }
  
  return base
}
```

### 3. Documentation Generation

**Auto-generate README for each template:**

```javascript
function generateTemplateReadme(templateType) {
  return `
# ${templateType.toUpperCase()} Template

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Components Included
${getComponentList(templateType)}

## Framework-Specific Notes
${getFrameworkNotes(templateType)}
`
}
```

## Developer Experience Workflow

### For Template Users (Simple)
```bash
# Just like before - one command, ready to go
npx degit yourorg/nextjs-template my-app
cd my-app
npm install
npm run dev
```

### For Template Maintainers (You)
```bash
# Work in monorepo
cd monorepo
npm run dev:nextjs    # Develop with hot reload

# Build and distribute
npm run build:templates
npm run publish:templates

# Templates are automatically updated and distributed
```

## Advanced Build Process

### Automated Template Building

```javascript
// scripts/build-templates.js
const fs = require('fs-extra')
const path = require('path')

async function buildTemplate(templateName) {
  const source = `./templates/${templateName}`
  const dest = `./dist-templates/${templateName}-template`
  
  // Copy template files
  await fs.copy(source, dest)
  
  // Bundle ui-core directly into the template
  const uiCore = await bundleUiCore(templateName)
  await fs.writeFile(
    path.join(dest, 'src/components/ui/index.js'), 
    uiCore
  )
  
  // Update package.json to remove workspace dependencies
  const packageJson = await fs.readJson(path.join(dest, 'package.json'))
  delete packageJson.dependencies['@yourorg/ui-core']
  await fs.writeJson(path.join(dest, 'package.json'), packageJson)
}
```

## Benefits of This Approach

1. **Users get simplicity** - One command, everything works
2. **You get maintainability** - Single source of truth in monorepo  
3. **AI-friendly** - Templates are still simple, standalone projects
4. **Version control** - Can version templates independently
5. **Zero complexity** for end users - they don't know about the monorepo

## Implementation Timeline

1. **Week 1**: Set up monorepo structure, extract ui-core
2. **Week 2**: Build template bundling system
3. **Week 3**: Create automated distribution pipeline
4. **Week 4**: Test and refine user experience

## Key Success Metrics

- Template instantiation remains one command
- No workspace knowledge required for template users
- Automated build process maintains template currency
- Component changes propagate to all templates automatically