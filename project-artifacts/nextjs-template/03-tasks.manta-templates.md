# 03 – Tasks (manta-templates)
Sections are in L2 headings (ex: component-parity).

**Project Status:** Ready for next phase after VideoCard architecture improvements and TypeScript cleanup
**Current Focus:** Achieving component parity between template and ui-core package

## component-parity
Scope: Migrate remaining components from templates/nextjs to packages/ui-core to achieve full component parity and enable multi-framework support.

**Current Status:** Template has 53 components, ui-core has 23 components (~30 components missing)

### Priority 1: Essential Card Components (12 components)
- [ ] `ComingSoonFeatureCard.tsx` - migrate to ui-core/cards
- [ ] `EnhancedBaseCard.tsx` - migrate to ui-core/cards
- [ ] `FeatureCardContainer.tsx` - migrate to ui-core/cards
- [ ] `FeatureCardWrapper.tsx` - migrate to ui-core/cards
- [ ] `GuidesFeatureCard.tsx` - migrate to ui-core/cards
- [ ] `ProjectCardContainer.tsx` - migrate to ui-core/cards
- [ ] `QuoteCardContainer.tsx` - migrate to ui-core/cards
- [ ] `SidebarPostCard.tsx` - migrate to ui-core/cards
- [ ] `VideoCardContainer.tsx` - migrate to ui-core/cards
- [ ] `articles/BlogIndexCard.tsx` - migrate to ui-core/cards
- [ ] `layouts/VirtualCardList.tsx` - migrate to ui-core/layouts
- [ ] Resolve `BaseCard.tsx` conflict (template vs ui-core/ui/)

### Priority 2: Content Loader Components (3 components)
- [ ] `articles/ArticleCardContentLoader.tsx` - migrate to ui-core/cards
- [ ] `people/AboutCardContentLoader.tsx` - migrate to ui-core/cards
- [ ] `projects/ProjectCardContentLoader.tsx` - migrate to ui-core/cards

### Priority 3: Header/Footer Components (5 components)
- [ ] `header.tsx` - migrate to ui-core/components
- [ ] `footer.tsx` - migrate to ui-core/components
- [ ] `headers/DefaultHeader.tsx` - migrate to ui-core/components
- [ ] `footers/CompactFooter.tsx` - migrate to ui-core/components
- [ ] `footers/DefaultFooter.tsx` - migrate to ui-core/components

### Priority 4: Critical UI Components (7 components)
- [ ] `MotionArticle.tsx` - migrate to ui-core/components
- [ ] `container.tsx` - migrate to ui-core/layouts
- [ ] `layout.tsx` - migrate to ui-core/layouts
- [ ] `navbar.tsx` - migrate to ui-core/components
- [ ] `themetoggle.tsx` - migrate to ui-core/components
- [ ] `ui/BackgroundVideoComponent.tsx` - migrate to ui-core/ui
- [ ] `ui/TechnologyScroller.tsx` - migrate to ui-core/ui

### Layout Conflicts Resolution
- [ ] Resolve `bento-layout.tsx` vs `BentoLayout.tsx` naming conflict
- [ ] Migrate `ContentCard.tsx` to ui-core/layouts
- [ ] Verify `CardCarousel.tsx` is properly migrated

## ui-refactor
Design source: `project-artifacts/features/02-feature-ui-refactor.md`  
Scope: Complete framework-agnostic ui-core package and enable multi-framework support.

### Phase 1: Infrastructure Setup ✓ COMPLETED
- [x] Restructure monorepo workspace
- [x] Create ui-core package foundation  
- [x] Set up TypeScript configurations
- [x] Create initial directory structure

### Phase 2: Core Component Extraction ✓ COMPLETED
- [x] Extract base UI primitives
- [x] Extract and abstract core cards
- [x] Extract layout components
- [x] Extract shared utilities and types

### Phase 3: Adapter Creation (IN PROGRESS)
- [ ] **Create Next.js adapter package**
  - Set up packages/ui-adapters/nextjs/ with proper package.json
  - Create Next.js-specific Image wrapper using next/image
  - Create Next.js-specific Link wrapper using next/link  
  - Export adapted components with Next.js optimizations injected
  - Success: Next.js adapter provides drop-in replacements with full Next.js optimizations

- [ ] **Create React Router adapter package**
  - Set up packages/ui-adapters/react-router/ with package.json
  - Create standard Image component with lazy loading
  - Create React Router Link wrapper
  - Export adapted components with React Router specific implementations
  - Success: React Router adapter works with standard React + React Router setup

- [ ] **Update Next.js template to use adapters**
  - Modify templates/nextjs to import components from Next.js adapter instead of local components
  - Update all component imports across templates/nextjs/src/
  - Remove now-unused component files from templates/nextjs/src/components/
  - Verify all existing functionality preserved
  - Success: Next.js template builds and runs identically to before refactor

- [ ] **Create comprehensive testing suite**
  - Set up testing infrastructure for ui-core package
  - Create component tests for extracted components
  - Test dependency injection patterns with mock components
  - Create adapter tests to ensure framework integrations work
  - Success: >90% test coverage, all components tested in isolation and with adapters

### Phase 4: Template Distribution
- [ ] **Build React + Router template**
  - Create new templates/react/ directory with React + React Router setup
  - Configure build system (Vite + React + TypeScript)
  - Import components from React Router adapter
  - Create equivalent pages/routes to Next.js template
  - Success: React template runs and displays same content as Next.js template

- [ ] **Build Astro template with React islands**
  - Create new templates/astro/ directory with Astro + React integration
  - Configure Astro to use React components as islands
  - Import components from appropriate adapter (create astro adapter if needed)
  - Create equivalent pages using Astro pages + React islands
  - Success: Astro template displays same content with proper hydration

- [ ] **Implement template bundling system**
  - Create scripts/build-templates.js for standalone template generation
  - Implement component usage analysis to determine which components to bundle
  - Create bundling system that inlines ui-core components into dist-templates/
  - Generate standalone package.json files without workspace dependencies
  - Success: Bundled templates are completely self-contained and work with `npx degit`

- [ ] **Create automated distribution pipeline**
  - Set up automated build process for all template variants
  - Create scripts for updating dist-templates/ from templates/
  - Generate framework-specific README files for each template
  - Set up validation that bundled templates install and build correctly
  - Success: Single command generates all distributable templates ready for publication

### Quality Assurance
- [ ] **Verify component compatibility**
  - Test all extracted components work in Next.js, React Router, and Astro
  - Verify performance characteristics are maintained
  - Ensure bundle sizes remain reasonable (<10% increase from abstraction)
  - Test theme system works across all frameworks
  - Success: All components work identically across frameworks with acceptable performance

- [ ] **Validate TypeScript coverage**
  - Ensure 100% TypeScript coverage in ui-core package
  - Verify proper type exports for all components and utilities
  - Test adapter type safety and component prop forwarding
  - Success: No TypeScript errors, full type safety across all packages

- [ ] **Test template instantiation**
  - Verify `npx degit yourorg/nextjs-template my-app` still works
  - Test React and Astro template instantiation with degit
  - Verify all templates install dependencies and build successfully
  - Confirm development servers start without errors
  - Success: All templates can be instantiated and run with single command

- [ ] **Documentation and examples**
  - Update component documentation to reflect new import paths
  - Create migration guide for existing manta-templates users
  - Generate examples showing multi-framework usage
  - Update README files for all templates with correct setup instructions
  - Success: Clear documentation, smooth migration path for existing users

## recent-accomplishments
**Completed in Previous Sessions:**

### VideoCard Architecture ✓ COMPLETED
- [x] Extracted BackgroundVideoComponent to reusable Next.js-optimized component
- [x] Implemented linkable background videos using erikcorkran.com conditional Link wrapper pattern
- [x] Added customizable text overlays with gradient backgrounds for video content
- [x] Updated test-example-2 to use VideoCard with dependency injection

### Content Loading & UI Enhancements ✓ COMPLETED
- [x] Replaced BlogCardImage with ArticleCard loading real markdown content (theme-guide.md)
- [x] Fixed BlogCardImage alignment issues (justify-start for consistent layout)
- [x] Maintained Server Component Pattern with proper content loading and object spreading

### TypeScript & Build Quality ✓ COMPLETED
- [x] Fixed all require() imports → ES6 imports in test files
- [x] Replaced 'any' types with proper TypeScript interfaces
- [x] Fixed unused variables and ESLint violations
- [x] Resolved shiki version conflict (3.11.0 → 3.7.0) for markdown syntax highlighting
- [x] All 63 tests passing with clean TypeScript compilation

### Legacy Completed Tasks ✓ COMPLETED
- [x] **cards-migration**: Complete card system with ContentLoaders
- [x] **cosine-card**: Interactive cosine surface card implementation
- [x] **cosine-card-terrain**: Parametric terrain with gear-icon controls
- [x] **color-themes**: Unified theming with Radix + semantic tokens + palette switching