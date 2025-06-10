# Template Split

## Goal
Split the landing page from the NextJS template starter. Currently the template starter includes considerable content from the landing page, which is not ideal for a template starter. We want to keep anything general purpose, and provide the user with a clean starting point for their project. Additionally we want to keep the landing page as is, and keep it in the monorepo.

## Feature Overview
The template-split feature addresses a critical architectural issue where the NextJS template starter currently serves dual purposes: showcasing manta-templates capabilities and providing a clean starting point for developers. This creates friction for users who want a minimal template without the showcase content.

The solution involves creating two distinct but related applications:
1. **Clean Template Starter**: A minimal, general-purpose NextJS template for developers
2. **Landing Page/Showcase**: The current feature-rich demonstration of components and layouts

## Technical Requirements

### Current State Analysis
The existing template contains:
- **Landing page content**: Hero section, templates showcase, examples showcase
- **Rich component demonstrations**: BentoGrid, MasonryGrid, ThreeJS, Video components
- **Content management system**: Markdown-driven cards (quotes, projects, features, videos)
- **Complex layouts**: GridLayout, BentoLayout with sophisticated responsive configurations
- **Sample data**: Extensive content in `/src/content/` directories

### Architecture Approach

#### 1. Directory Structure Reorganization
```
templates/nextjs/
├── template/                    # Clean starter template
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx        # Minimal homepage
│   │   ├── components/         # All available components
│   │   └── content/            # Minimal sample content
│   ├── package.json            # Minimal dependencies
│   └── readme.md              # Template-focused documentation
├── showcase/                   # Landing page/demo site
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx        # Current rich homepage
│   │   ├── components/         # All current components
│   │   └── content/            # All current content
│   ├── package.json            # Full feature dependencies
│   └── readme.md              # Showcase documentation
└── shared/                     # Shared components and utilities
    ├── components/
    ├── hooks/
    └── lib/
```

#### 2. Component Classification

**Template Components (All Available)**:
- Basic layout components (Container, GridLayout, GridItem)
- Advanced layouts (BentoLayout, MasonryGrid)
- Core UI components (Button, Card, Input from ShadCN)
- Complex card variants (ProjectCard, FeatureCard, VideoCard, QuoteCard)
- ThreeJS components
- Video components (BackgroundVideo, VideoPlayer)
- Content management containers and system
- Theme context and theming
- All utilities and hooks

**Template Landing Page (Minimal Usage)**:
- Clean welcome page with basic layout examples
- Simple demonstrations of key components
- Focused on getting started quickly
- Minimal content examples

**Showcase Landing Page (Rich Demonstration)**:
- Current complex homepage showcasing all capabilities
- Extensive component demonstrations
- Rich content examples
- Full feature exploration

#### 3. Content Strategy

**Template Content**:
- Single welcome page with basic layout examples
- Minimal sample blog posts (1-2 examples)
- Basic component demonstrations
- Getting started documentation

**Showcase Content**:
- All current rich content (projects, features, quotes, videos)
- Complex layout demonstrations
- Full component library showcase
- Comprehensive examples

#### 4. Package Management

**Template Dependencies** (minimal):
```json
{
  "dependencies": {
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-slot": "^1.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0",
    "lucide-react": "^0.507.0"
  }
}
```

**Showcase Dependencies** (full-featured):
```json
{
  "dependencies": {
    // All current dependencies including:
    "framer-motion": "^12.11.0",
    "react-player": "^2.16.0",
    "three": "^0.176.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "zod": "^3.25.42"
  }
}
```

## Implementation Sections

### 1. Project Structure Setup
- Create new directory structure with template/, showcase/, and shared/
- Set up independent package.json files for each project
- Configure build and development scripts
- Establish shared component linking strategy

### 2. Component Migration and Classification
- Audit all existing components for essential vs showcase classification
- Move essential components to template/
- Move showcase-specific components to showcase/
- Create shared/ directory for reusable components
- Update import paths and dependencies
- **Clean up hardcoded content in components**:
  - Remove manta-specific defaults from FeatureCard variants
  - Make Footer component configurable
  - Ensure all components use content props or generic defaults

### 3. Content System Separation
- Create minimal content structure for template
- Migrate rich content system to showcase
- Ensure content management system remains functional in showcase
- Create sample content for template (basic examples)
- **Create generic content examples for template**:
  - Generic project examples (not manta-specific)
  - Sample blog posts with placeholder content
  - Basic quote examples
  - Minimal feature demonstrations

### 4. Template Simplification
- Create clean, minimal homepage for template
- Remove complex layout demonstrations from landing page
- Keep essential layout components (GridLayout, Container)
- Maintain theme system but simplify implementation
- Create focused documentation for template users
- **Implement configurable branding**:
  - Environment-based footer configuration
  - Configurable site metadata
  - Generic default content throughout

### 5. Content Cleanup
- Remove hardcoded content from components
- Replace with generic defaults or content props
- Update documentation to reflect changes
- Ensure all components are reusable and configurable

### 6. Showcase Enhancement
- Preserve all current functionality in showcase
- Enhance showcase with better navigation between examples
- Add template download/copy functionality
- Improve documentation for component library

### 7. Build System Configuration
- Configure independent build processes for template and showcase
- Set up shared component building and linking
- Ensure proper TypeScript configuration across projects
- Configure deployment strategies for both applications

### 8. Documentation and Distribution
- Create template-specific README with quick start guide
- Update showcase documentation to reflect new structure
- Set up template distribution mechanism (degit, npm, etc.)
- Create migration guide for existing users

## Content Analysis

### Content Analysis Results

#### Components with Hardcoded Content (Require Updates):

**Footer Component**:
- Hardcoded: "Copyright {year} Erik Corkran & manta.digital"
- **Template Fix**: Make copyright configurable via environment variables or config file
- **Showcase**: Can keep current branding

**ComingSoonFeatureCard**:
- Hardcoded defaults: "Astro Starter", "Lightning-fast static site generation"
- Hardcoded GitHub URL: "https://github.com/manta-digital/manta-templates"
- **Template Fix**: Remove manta-specific defaults, use generic placeholders
- **Showcase**: Keep current manta-specific content via markdown

**GuidesFeatureCard**:
- Hardcoded defaults: "Guides & Docs", "Comprehensive guides and documentation"
- Hardcoded GitHub URL: "https://github.com/manta-digital/manta-templates"
- **Template Fix**: Remove manta-specific defaults, use generic placeholders
- **Showcase**: Keep current content via markdown

#### Markdown-Driven Components (Ready for Template):
- **ProjectCard**: Fully markdown-driven via ProjectContent interface
- **VideoCard**: Fully markdown-driven via VideoContent interface  
- **QuoteCard**: Fully markdown-driven via QuoteContent interface
- **FeatureCard variants**: Accept content prop but need default cleanup
- **ThreeJSCard**: No content dependencies
- **All layout components**: No content dependencies

#### Content System Architecture:
- **Template**: Minimal sample content with generic examples
- **Showcase**: Rich content system with all current markdown files
- **Both projects**: Share the same content management infrastructure

## Technical Considerations

### Shared Component Strategy
Use a monorepo approach with workspace linking:
- Shared components published as internal packages
- Template and showcase import from shared workspace
- Maintains consistency while allowing independent development

### Build Performance
- Template builds should be fast with minimal dependencies
- Showcase can have longer build times due to rich content
- Consider build caching strategies for shared components

### Maintenance Strategy
- Changes to shared components affect both projects
- Template should remain stable and minimal
- Showcase can evolve with new features and components

### Migration Path
- Provide clear migration instructions for existing users
- Maintain backward compatibility where possible
- Document breaking changes and upgrade paths

## Success Criteria

### Template Success
- Clean, minimal starting point for developers
- Fast build times and minimal dependencies
- Clear documentation and examples
- Easy customization and extension

### Showcase Success
- Preserves all current functionality
- Enhanced demonstration of capabilities
- Better organization of examples and components
- Improved developer experience for exploring features

### Overall Success
- Clear separation of concerns
- Maintainable codebase structure
- Improved user experience for both use cases
- Sustainable development workflow

## Risks and Mitigation

### Risk: Complexity of Separation
**Mitigation**: Phased approach starting with directory structure, then gradual component migration

### Risk: Shared Component Maintenance
**Mitigation**: Clear ownership model and automated testing across both projects

### Risk: User Confusion
**Mitigation**: Clear documentation and migration guides, maintain both options initially

### Risk: Build System Complexity
**Mitigation**: Use proven monorepo tools and patterns, extensive testing of build processes
