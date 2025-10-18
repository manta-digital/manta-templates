---
layer: project
docType: feature-design
phase: low-level-design
feature: ui-refactor
audience: [technical-fellow, senior-ai, project-manager]
dependencies: [guide.ai-project.00-process, feature.ui-refactor.00-component-library-design, feature.ui-refactor.01-template-distribution-strategy]
---

# Low-Level Design: UI Refactor - Framework-Agnostic Component Library

## Executive Summary

This design outlines the comprehensive refactoring of manta-templates to extract framework-agnostic components from Next.js, enabling reuse across multiple frameworks (Astro, React Router, etc.) while maintaining Next.js optimization benefits. The approach uses a monorepo structure with automated template distribution to preserve simplicity for end users.

## Current State Analysis

### Component Inventory
**Total Components Analyzed**: 50+ components across:
- **Cards**: BlogCard, ProjectCard, QuoteCard, VideoCard, AboutCard, FeatureCard variants (20+ components)
- **Layouts**: BentoLayout, GridLayout, Container, VirtualCardList (8+ components) 
- **UI Primitives**: BaseCard, Button, ThemeToggle, VideoPlayer (10+ components)
- **Navigation**: Navbar, Header variants, Footer variants (6+ components)
- **Framework-Specific**: Pages, routing logic, server components (6+ components)

### Dependency Analysis
**Next.js-Specific Dependencies**:
- `next/image` - Used in BlogCard, ProjectCard, and other image-heavy components
- `next/link` - Used in ProjectCard, Navbar, and navigation components  
- App Router structure - Server/client component patterns
- Next.js build optimizations

**Framework-Agnostic Dependencies**:
- React 19.1.0
- Tailwind CSS 4.1.10 
- ShadCN UI components
- Radix UI (@radix-ui/colors, @radix-ui/react-slot)
- Framer Motion 12.23.0
- Lucide React 0.507.0
- Three.js 0.176.0

## Architecture Design

### Target Monorepo Structure

**Restructuring existing manta-templates monorepo**:

```
manta-templates/  # existing repo - no new monorepo created
├── packages/
│   ├── ui-core/                    # Framework-agnostic component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── cards/         # BlogCard, ProjectCard, QuoteCard, etc.
│   │   │   │   ├── layouts/       # BentoLayout, GridLayout, Container
│   │   │   │   ├── ui/            # BaseCard, Button, ThemeToggle
│   │   │   │   └── primitives/    # Core building blocks
│   │   │   ├── hooks/             # useTheme, custom hooks
│   │   │   ├── utils/             # cn, formatDate, shared utilities
│   │   │   ├── types/             # Shared TypeScript interfaces
│   │   │   └── index.ts           # Barrel exports
│   │   ├── tailwind.config.js     # Base Tailwind configuration
│   │   ├── package.json           # Peer dependencies only
│   │   └── tsconfig.json
│   │
│   ├── ui-adapters/               # Framework-specific adapters
│   │   ├── nextjs/
│   │   │   ├── src/
│   │   │   │   ├── Image.tsx      # Next.js Image wrapper
│   │   │   │   ├── Link.tsx       # Next.js Link wrapper
│   │   │   │   └── index.ts       # Re-exports with Next.js optimizations
│   │   │   └── package.json
│   │   ├── react-router/
│   │   │   ├── src/
│   │   │   │   ├── Image.tsx      # Standard img or react-image
│   │   │   │   ├── Link.tsx       # React Router Link wrapper
│   │   │   │   └── index.ts
│   │   │   └── package.json
│   │   └── astro/
│   │       ├── src/
│   │       │   ├── Image.astro    # Astro Image component
│   │       │   ├── Link.astro     # Astro anchor wrapper
│   │       │   └── index.ts
│   │       └── package.json
│   │
├── templates/                     # Development templates (monorepo context)
│   ├── nextjs/                    # Refactored Next.js template
│   ├── react/                     # New React + Router template
│   └── astro/                     # New Astro template
│
├── dist-templates/                # Standalone distributable templates
│   ├── nextjs-template/           # Built Next.js template
│   ├── react-template/            # Built React template
│   └── astro-template/            # Built Astro template
│
└── scripts/                       # Build automation
    ├── build-templates.js
    ├── bundle-components.js
    └── publish-templates.js
```

## Component Abstraction Strategy

### 1. Dependency Injection Pattern

**Image Component Abstraction**:
```typescript
// packages/ui-core/src/components/primitives/Image.tsx
interface CoreImageProps {
  src: string;
  alt: string;
  className?: string;
  ImageComponent?: React.ComponentType<any>;
  // Standard img props as fallback
}

export const CoreImage: React.FC<CoreImageProps> = ({ 
  ImageComponent, 
  ...props 
}) => {
  const Component = ImageComponent || 'img';
  return <Component {...props} />;
};
```

**Link Component Abstraction**:
```typescript
// packages/ui-core/src/components/primitives/Link.tsx  
interface CoreLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  LinkComponent?: React.ComponentType<any>;
}

export const CoreLink: React.FC<CoreLinkProps> = ({
  LinkComponent,
  ...props
}) => {
  const Component = LinkComponent || 'a';
  return <Component {...props} />;
};
```

### 2. Framework Adapters

**Next.js Adapter**:
```typescript
// packages/ui-adapters/nextjs/src/components.tsx
import NextImage from 'next/image';
import NextLink from 'next/link';
import { BlogCard as CoreBlogCard } from '@yourorg/ui-core';

export const BlogCard = (props) => (
  <CoreBlogCard 
    {...props} 
    ImageComponent={NextImage}
    LinkComponent={NextLink}
  />
);
```

**React Router Adapter**:
```typescript
// packages/ui-adapters/react-router/src/components.tsx
import { Link as RouterLink } from 'react-router-dom';
import { BlogCard as CoreBlogCard } from '@yourorg/ui-core';

const OptimizedImage = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} loading="lazy" {...props} />
);

export const BlogCard = (props) => (
  <CoreBlogCard 
    {...props}
    ImageComponent={OptimizedImage}
    LinkComponent={RouterLink}
  />
);
```

## Migration Strategy

### Phase 1: Infrastructure Setup
**P0 Tasks**:
- [ ] Restructure existing manta-templates monorepo to add packages/ directory
- [ ] Set up ui-core package with base configuration within packages/
- [ ] Update root workspace configuration to include new packages
- [ ] Create initial TypeScript configurations for packages

**Success Criteria**: 
- Restructured workspace builds without errors
- ui-core package can be imported by existing templates
- All existing Next.js functionality preserved

### Phase 2: Core Component Extraction
**P0 Tasks**:
- [ ] Extract BaseCard, Button, and core UI primitives
- [ ] Extract BlogCard, ProjectCard, QuoteCard with dependency injection
- [ ] Extract BentoLayout, GridLayout, Container layouts
- [ ] Create shared utilities (cn, formatDate, etc.)
- [ ] Set up theme system in ui-core

**Component Priority Order**:
1. **Base Components**: BaseCard, Button (foundation for others)
2. **Core Cards**: BlogCard, ProjectCard, QuoteCard (most reusable)
3. **Layout Components**: BentoLayout, GridLayout (structural)
4. **Specialized Cards**: VideoCard, ThreeJSCard, FeatureCard variants

### Phase 3: Adapter Creation
**P1 Tasks**:
- [ ] Create Next.js adapter with optimized components
- [ ] Create React Router adapter with standard components
- [ ] Update Next.js template to use adapters
- [ ] Create comprehensive testing suite

### Phase 4: Template Distribution
**P1 Tasks**:
- [ ] Build React + Router template using adapters
- [ ] Build Astro template using React islands
- [ ] Implement template bundling system
- [ ] Create automated distribution pipeline

## Template Distribution Architecture

### Build Process
```javascript
// scripts/build-templates.js
async function buildStandaloneTemplate(templateType) {
  const sourceDir = `./templates/${templateType}`;
  const distDir = `./dist-templates/${templateType}-template`;
  
  // 1. Copy template structure
  await fs.copy(sourceDir, distDir);
  
  // 2. Bundle used ui-core components directly
  const usedComponents = await analyzeComponentUsage(templateType);
  const bundledComponents = await bundleComponents(usedComponents);
  
  // 3. Write bundled components to template
  await writeComponentBundle(bundledComponents, distDir);
  
  // 4. Remove workspace dependencies from package.json
  await updatePackageJson(distDir, templateType);
  
  // 5. Generate framework-specific documentation
  await generateTemplateReadme(distDir, templateType);
}
```

### Distribution Options
1. **NPX Create Commands**: `npx create-manta-template@latest my-app --framework nextjs`
2. **Direct Degit**: `npx degit yourorg/nextjs-template my-app`  
3. **GitHub Template Repos**: Separate repos for each built template

## Technical Specifications

### Package Dependencies
**ui-core package.json**:
```json
{
  "name": "@manta-templates/ui-core",
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@radix-ui/colors": "^3.0.0",
    "@radix-ui/react-slot": "^1.2.3", 
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "lucide-react": "^0.507.0"
  }
}
```

### Bundle Optimization
- **Tree Shaking**: Barrel exports with careful export mapping
- **Build Targets**: ESM + CJS for maximum compatibility  
- **Peer Dependencies**: React, Tailwind as peer deps to avoid duplication

## Risk Mitigation

### Technical Risks
1. **Bundle Size**: Abstraction layers may increase bundle size
   - *Mitigation*: Careful tree shaking, minimal abstractions
2. **Performance**: Extra component wrapping may impact performance  
   - *Mitigation*: Performance testing, React.memo where needed
3. **Type Safety**: Complex generic types across frameworks
   - *Mitigation*: Gradual TypeScript adoption, comprehensive testing

### Development Risks  
1. **Build Complexity**: Multiple packages increase build coordination
   - *Mitigation*: Automated build pipeline, clear documentation
2. **Testing Overhead**: Components need testing in multiple contexts
   - *Mitigation*: Shared test utilities, focused integration tests

## Success Metrics

### Technical Metrics
- **Component Reusability**: 80%+ of components framework-agnostic
- **Bundle Size**: <10% increase from abstraction overhead
- **Build Performance**: Templates build in <30s
- **Type Safety**: 100% TypeScript coverage in ui-core

### User Experience Metrics  
- **Template Instantiation**: Single command (`npx degit`) still works
- **Development Speed**: No regression in development workflow
- **Documentation**: Clear setup for all frameworks

## Implementation Phases

| Phase | Focus | Deliverables |
|-------|-------|-------------|
| 1 | Infrastructure | Restructured monorepo, build pipeline |
| 2 | Component Extraction | Core components in ui-core |  
| 3 | Adapter Creation | Framework adapters, updated Next.js template |
| 4 | Template Distribution | React/Astro templates, distribution system |

## Next Steps

1. **Project Manager Approval**: Confirm architecture and timeline
2. **Phase 1 Kickoff**: Begin infrastructure setup
3. **Component Audit**: Finalize extraction priority order
4. **Stakeholder Communication**: Coordinate with hackathon timeline

This design enables the overarching goal of separating excellent components from Next.js while maintaining framework-specific optimizations, supporting multiple frameworks, and preserving the simplicity that makes manta-templates valuable for rapid prototyping.