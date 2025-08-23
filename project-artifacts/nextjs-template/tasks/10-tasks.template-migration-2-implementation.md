---
layer: project
docType: tasks
slice: template-migration
project: manta-templates
phase: 6
part: 2
partName: implementation-and-testing
lldRef: project-artifacts/nextjs-template/slices/10-slice.template-migration.md
dependencies:
  - Part 1: Analysis and Planning (COMPLETED)
  - All import inventories and mapping completed
  - All app router pages migrated to ui-core
status: ready
priority: CRITICAL
lastUpdated: 2025-01-16
---

# Tasks: Template Migration Part 2 - Implementation and Testing

## Context Summary

**CRITICAL CONTINUATION**: This is Part 2 of the template migration from local components to ui-core. Part 1 completed the analysis, planning, and initial page migration. Part 2 focuses on cleanup, validation, and comprehensive testing.

**Part 1 Completed**: 
- Complete import inventory and mapping
- App router pages migrated to ui-core imports
- Initial build validation and functionality testing

**This Part Contains**: Phases 3-4 (Component Cleanup and Comprehensive Validation)
**Next Part**: Part 3 - Deployment & Completion (Phase 5 + Final Verification)

## Phase 3: Component Cleanup

### Task 3.1: Remove Redundant Local Components

#### Identify Components Now Redundant with ui-core
- [ ] **List all local components that have equivalent ui-core versions**
  - [ ] Create comprehensive component inventory
    1. List all components currently in templates/nextjs/src/components/:
       ```bash
       find templates/nextjs/src/components -name "*.tsx" | sort
       ```
    2. Cross-reference with ui-core component exports
    3. Create removal candidates list in format:
       ```
       REMOVE: src/components/cards/BaseCard.tsx (available in ui-core)
       REMOVE: src/components/ui/ThemeToggle.tsx (available in ui-core)
       KEEP: src/components/CustomWrapper.tsx (template-specific)
       ```
  - [ ] Verify no unique functionality exists in local versions
    1. For each removal candidate, compare local vs ui-core implementation
    2. Check for template-specific customizations or features
    3. If unique functionality found, either:
       - Migrate functionality to ui-core (if broadly useful)
       - Keep as template-specific wrapper (if template-only)
       - Document decision rationale
  - [ ] Plan safe removal of redundant components
    1. Ensure no remaining imports reference components to be removed
    2. Plan removal order to avoid breaking dependencies
    3. Create removal script or checklist for systematic execution
  - [ ] **Success**: Clear list of components safe to remove with rationale

#### Remove Redundant Card Components
- [ ] **Delete local card components now available in ui-core**
  - [ ] Remove card components systematically
    1. Remove AboutCard if present:
       ```bash
       rm -f templates/nextjs/src/components/cards/people/AboutCard.tsx
       ```
    2. Remove ArticleCard if present:
       ```bash
       rm -f templates/nextjs/src/components/cards/articles/ArticleCard.tsx
       ```
    3. Remove BaseCard if present:
       ```bash
       rm -f templates/nextjs/src/components/cards/BaseCard.tsx
       ```
    4. Remove ProjectCard if present:
       ```bash
       rm -f templates/nextjs/src/components/cards/projects/ProjectCard.tsx
       ```
    5. Remove other card components (VideoCard, QuoteCard, etc.) if present
  - [ ] Update any references or exports
    1. Remove exports from component index files
    2. Update any remaining internal references
    3. Ensure no TypeScript errors from missing references
  - [ ] Clean up empty directories
    1. Remove empty card subdirectories: `rmdir` empty dirs
    2. Clean up directory structure after component removal
  - [ ] **Success**: No duplicate card components between template and ui-core

#### Remove Redundant UI Components
- [ ] **Delete local UI components now available in ui-core**
  - [ ] Remove ThemeToggle component
    1. Delete: `rm -f templates/nextjs/src/components/themetoggle.tsx`
    2. Remove any related theme toggle files
    3. Update imports in any files that used local ThemeToggle
  - [ ] Remove ColorSelector component if present
    1. Delete: `rm -f templates/nextjs/src/components/ui/ColorSelector.tsx`
    2. Ensure ui-core ColorSelector is used instead
  - [ ] Remove BrandMark component if present
    1. Delete: `rm -f templates/nextjs/src/components/ui/BrandMark.tsx`
    2. Update usage to ui-core BrandMark
  - [ ] Remove TechnologyScroller if present
    1. Delete: `rm -f templates/nextjs/src/components/ui/TechnologyScroller.tsx`
    2. Ensure ui-core TechnologyScroller works correctly
  - [ ] Ensure no functionality lost
    1. Test that all UI functionality still works with ui-core components
    2. Verify theme switching still works
    3. Test any component-specific features
  - [ ] **Success**: No duplicate UI components between template and ui-core

#### Remove Redundant Layout Components
- [ ] **Delete local layout components now available in ui-core**
  - [ ] Remove Container component if present
    1. Delete: `rm -f templates/nextjs/src/components/layout/Container.tsx`
    2. Ensure ui-core Container is used throughout template
  - [ ] Remove Grid components if present
    1. Delete grid-related components in layout directory
    2. Update usage to ui-core Grid system
  - [ ] Remove BentoLayout if present
    1. Delete: `rm -f templates/nextjs/src/components/layout/BentoLayout.tsx`
    2. Test BentoLayout functionality with ui-core version
  - [ ] Remove CardCarousel if present
    1. Delete: `rm -f templates/nextjs/src/components/layout/CardCarousel.tsx`
    2. Verify carousel functionality works with ui-core
  - [ ] Update any remaining references
    1. Search for any remaining references to deleted layout components
    2. Update to use ui-core equivalents
    3. Test layout functionality after updates
  - [ ] Clean up layout directory structure
    1. Remove empty layout subdirectories
    2. Reorganize remaining layout files if any
  - [ ] **Success**: No duplicate layout components between template and ui-core

#### Remove Redundant Header/Footer Components
- [ ] **Delete local header/footer components now available in ui-core**
  - [ ] Identify header/footer components to remove
    1. List components in headers/ and footers/ directories
    2. Verify ui-core has equivalent header/footer variants
    3. Plan removal of redundant header/footer components
  - [ ] Remove redundant header components
    1. Delete local header variants available in ui-core
    2. Keep only template-specific header customizations
    3. Update header usage to ui-core components
  - [ ] Remove redundant footer components
    1. Delete local footer variants available in ui-core
    2. Keep only template-specific footer customizations
    3. Update footer usage to ui-core components
  - [ ] Ensure template uses ui-core header/footer variants
    1. Update layout files to import headers/footers from ui-core
    2. Test header/footer functionality after migration
    3. Verify responsive behavior and styling
  - [ ] **Success**: No duplicate header/footer components

### Task 3.2: TypeScript and Build Cleanup

#### Clean Up TypeScript Types
- [ ] **Remove type definitions now available in ui-core**
  - [ ] Identify duplicate type definitions
    1. Search for type definitions in template:
       ```bash
       grep -r "export.*type\|export.*interface" templates/nextjs/src/ --include="*.ts" --include="*.tsx"
       ```
    2. Cross-reference with ui-core type exports
    3. Identify types that are duplicated between template and ui-core
  - [ ] Remove redundant type definitions
    1. Delete type files that duplicate ui-core types
    2. Remove individual type exports that conflict with ui-core
    3. Keep only template-specific types
    4. Example cleanup:
       ```typescript
       // REMOVE (now in ui-core):
       export interface ArticleCardProps { ... }
       
       // KEEP (template-specific):
       export interface TemplateConfigProps { ... }
       ```
  - [ ] Update import statements for types
    1. Find imports of removed types:
       ```bash
       grep -r "import.*type\|import.*{.*}" templates/nextjs/src/ --include="*.ts" --include="*.tsx"
       ```
    2. Update imports to use ui-core types:
       ```typescript
       // OLD:
       import { ArticleCardProps } from '@/types/cards'
       
       // NEW:
       import { ArticleCardProps } from '@manta-templates/ui-core'
       ```
    3. Remove unused type imports
  - [ ] Ensure no TypeScript errors introduced
    1. Run type checking: `pnpm type-check`
    2. Fix any type-related errors immediately
    3. Ensure all type references resolve correctly
    4. Test that IntelliSense works properly with ui-core types
  - [ ] **Success**: Clean TypeScript with no duplicate or unused types

#### Update Package.json Dependencies
- [ ] **Ensure ui-core package is properly listed as dependency**
  - [ ] Check current dependency configuration
    1. Review templates/nextjs/package.json dependencies section
    2. Verify @manta-templates/ui-core is listed with correct version
    3. Ensure dependency type is correct (dependencies vs devDependencies)
  - [ ] Update ui-core dependency if needed
    1. If missing, add ui-core dependency:
       ```json
       "dependencies": {
         "@manta-templates/ui-core": "workspace:*",
         // ... other dependencies
       }
       ```
    2. If version is incorrect, update to workspace reference
    3. Run `pnpm install` to update lockfile
  - [ ] Remove any dependencies no longer needed after component removal
    1. Identify dependencies that were only used by removed components
    2. Check if any styling libraries, icon libraries, or utilities are now redundant
    3. Remove redundant dependencies from package.json
    4. Example removals might include:
       - Component-specific styling libraries
       - Icon libraries now handled by ui-core
       - Utility libraries now provided by ui-core
  - [ ] Clean up devDependencies if needed
    1. Remove any development dependencies only used for removed components
    2. Keep dependencies needed for template build and development
    3. Ensure TypeScript and other essential dev dependencies remain
  - [ ] Validate dependency cleanup
    1. Run `pnpm install` to update dependencies
    2. Run `pnpm build` to ensure build still works
    3. Check for any missing dependency errors
    4. Verify bundle size hasn't increased significantly
  - [ ] **Success**: Package dependencies accurately reflect template needs

## Phase 4: Comprehensive Validation

### Task 4.1: Production Build Verification

#### Full Production Build Test
- [ ] **Run complete production build systematically**
  - [ ] Clean build environment
    1. Clear any previous build artifacts:
       ```bash
       cd templates/nextjs
       rm -rf .next
       rm -rf dist
       ```
    2. Clear node_modules if needed: `rm -rf node_modules && pnpm install`
  - [ ] Execute production build
    1. Run build command: `pnpm build`
    2. Monitor build output for errors and warnings
    3. Time the build process to check for performance regressions
    4. Document build output and any issues found
  - [ ] Analyze build results
    1. Verify no build errors occurred
    2. Document any warnings (warnings acceptable, errors not)
    3. Check that all pages were successfully generated
    4. Verify static assets were processed correctly
  - [ ] Test build output size and performance
    1. Check bundle size: analyze .next/static/ directory size
    2. Compare to pre-migration build size
    3. Look for any significant size increases (>10% warrants investigation)
    4. Check for proper tree-shaking of ui-core components
  - [ ] Test production server locally
    1. Start production server: `pnpm start`
    2. Navigate to all major pages in production mode
    3. Verify functionality matches development mode
    4. Check for any production-specific issues
  - [ ] **Success**: Template builds successfully for production

#### Type Checking Validation
- [ ] **Run complete TypeScript check comprehensively**
  - [ ] Execute TypeScript validation
    1. Run type checking: `pnpm type-check`
    2. Monitor output for any type errors
    3. Document the number of type issues (should be zero)
  - [ ] Ensure no TypeScript errors introduced
    1. Compare type error count to pre-migration baseline
    2. Address any new TypeScript errors immediately
    3. Common issues to check:
       - Missing type imports from ui-core
       - Incorrect prop types for ui-core components
       - Missing dependency injection prop types
  - [ ] Verify type inference works correctly
    1. Test IntelliSense in IDE with ui-core components
    2. Verify prop autocomplete works for ui-core components
    3. Test that TypeScript catches prop type mismatches
    4. Ensure dependency injection props are properly typed
  - [ ] Check strict TypeScript compliance
    1. Verify no 'any' types were introduced during migration
    2. Ensure all ui-core component usage is properly typed
    3. Check that generic types are properly inferred
  - [ ] **Success**: Perfect TypeScript compliance

#### Linting Validation
- [ ] **Run comprehensive linting validation**
  - [ ] Execute linting process
    1. Run ESLint: `pnpm lint`
    2. Monitor output for linting errors and warnings
    3. Count total issues and compare to pre-migration
  - [ ] Fix any critical linting errors
    1. Address any linting errors that prevent build
    2. Common issues to check:
       - Unused imports after component migration
       - Import order violations
       - Missing dependencies in useEffect hooks
    3. Fix errors immediately to prevent accumulation
  - [ ] Document any warnings that are acceptable
    1. List warnings that existed pre-migration
    2. Note any new warnings introduced (should be minimal)
    3. Document rationale for accepting specific warnings
    4. Ensure warning count hasn't significantly increased
  - [ ] Run Prettier formatting check if configured
    1. Check code formatting: `pnpm format:check` (if available)
    2. Fix any formatting issues: `pnpm format` (if available)
    3. Ensure consistent code style throughout
  - [ ] **Success**: Clean linting results

### Task 4.2: Functional Testing

#### Homepage Comprehensive Testing
- [ ] **Test all components render correctly**
  - [ ] Visual rendering verification
    1. Load homepage in browser: navigate to `/`
    2. Compare visual appearance to pre-migration screenshots
    3. Check that all components are visible and positioned correctly
    4. Verify no missing components or broken layouts
  - [ ] Component functionality testing
    1. Test each ui-core component on homepage individually
    2. Verify props are being passed correctly to ui-core components
    3. Check that component interactions work (clicks, hovers, etc.)
    4. Test any component-specific features
  - [ ] Verify theme switching functionality
    1. Test light/dark mode toggle:
       - Click theme toggle button
       - Verify visual theme changes across all components
       - Check that theme preference persists on page reload
    2. Test accent color switching if ColorSelector present:
       - Click through available accent colors
       - Verify color changes apply to all themed components
       - Test that accent preference persists
  - [ ] Test responsive behavior across device sizes
    1. Test desktop view (>1200px width)
    2. Test tablet view (768px - 1199px width)
    3. Test mobile view (<768px width)
    4. Verify layout adapts correctly at each breakpoint
    5. Test component stacking and spacing on mobile
  - [ ] Test all interactive elements and navigation
    1. Test all links and navigation elements
    2. Verify buttons and interactive components respond
    3. Test form inputs if present on homepage
    4. Check hover states and focus indicators
    5. Test keyboard navigation accessibility
  - [ ] **Success**: Homepage fully functional with ui-core components

#### Content System Testing
- [ ] **Test blog pages with ui-core ArticleCard**
  - [ ] Blog listing functionality
    1. Navigate to `/blog` page
    2. Verify ArticleCard components render correctly
    3. Test that article previews display properly
    4. Check article metadata (date, author, tags) if present
    5. Test pagination or infinite scroll if implemented
  - [ ] Individual blog post testing
    1. Click into individual blog posts from listing
    2. Verify content loads and renders properly
    3. Test navigation between posts
    4. Check that markdown content displays correctly
  - [ ] Verify markdown content loading works
    1. Test that frontmatter data populates ArticleCard correctly
    2. Verify markdown body content renders with proper styling
    3. Test code syntax highlighting if present
    4. Check image loading and responsive sizing
  - [ ] Test project showcases with ui-core ProjectCard
    1. Navigate to any project showcase pages
    2. Verify ProjectCard components render correctly
    3. Test different ProjectCard variants (panel, showcase)
    4. Verify project links and CTAs work properly
  - [ ] **Success**: All content loading works with ui-core components

#### Theme System Testing
- [ ] **Test ThemeToggle from ui-core works correctly**
  - [ ] Basic theme toggle functionality
    1. Locate ThemeToggle component on page
    2. Test switching from light to dark mode
    3. Verify all ui-core components respond to theme change
    4. Test switching from dark back to light mode
  - [ ] Theme persistence testing
    1. Set theme to dark mode and reload page
    2. Verify dark mode persists after reload
    3. Test theme persistence across different pages
    4. Check localStorage or cookie storage for theme preference
  - [ ] Test ColorSelector from ui-core cycles through accents
    1. Locate ColorSelector component if present
    2. Click to cycle through available accent colors
    3. Verify accent changes apply to all themed components
    4. Test accent color persistence across page reloads
  - [ ] Cross-component theme integration
    1. Verify theme changes affect all ui-core components consistently
    2. Test that custom template components respect theme
    3. Check that both solid and alpha color variants update
  - [ ] **Success**: Complete theme system works from ui-core

#### Dependency Injection Testing
- [ ] **Test Next.js Image component injection works**
  - [ ] Image rendering and optimization
    1. Identify components using ImageComponent prop
    2. Verify images load and display correctly
    3. Test Next.js Image optimization features (lazy loading, sizing)
    4. Check responsive image behavior across device sizes
  - [ ] Image interaction testing
    1. Test image hover effects if implemented
    2. Verify image click handlers work if present
    3. Check image accessibility attributes (alt text)
  - [ ] Test Next.js Link component injection works
    1. Identify components using LinkComponent prop
    2. Test internal navigation links
    3. Test external links (should open appropriately)
    4. Verify Link optimization features (prefetching)
  - [ ] Link functionality and accessibility
    1. Test keyboard navigation to links
    2. Verify focus indicators on links
    3. Test that links announce properly to screen readers
  - [ ] Test social icon injection comprehensively
    1. Locate components with social icon injection (AboutCard, etc.)
    2. Verify social icons render correctly:
       - Github icon displays and links correctly
       - LinkedIn icon displays and links correctly
       - Mail icon displays and triggers email correctly
       - X (Twitter) icon displays and links correctly
    3. Test social icon interactions (hover, focus, click)
    4. Verify icons are accessible with proper labels
  - [ ] **Success**: All dependency injection functions correctly

### Task 4.3: Performance and Quality Validation

#### Performance Comparison
- [ ] **Compare build time before and after migration**
  - [ ] Record pre-migration build time
    1. If not already recorded, build pre-migration state for baseline
    2. Document build time in seconds
    3. Note any build warnings or issues
  - [ ] Measure post-migration build time
    1. Run clean build: `rm -rf .next && pnpm build`
    2. Time the build process from start to completion
    3. Compare to pre-migration baseline
    4. Acceptable variance: ±10% of original build time
  - [ ] Compare bundle size before and after migration
    1. Analyze bundle size using Next.js built-in analyzer:
       ```bash
       npx @next/bundle-analyzer
       ```
    2. Compare .next/static directory sizes
    3. Document any significant size changes (>5% warrants investigation)
    4. Verify proper tree-shaking of ui-core components
  - [ ] Compare runtime performance
    1. Test page load times using browser DevTools
    2. Measure First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
    3. Test JavaScript execution time
    4. Compare to pre-migration performance metrics
    5. Use Lighthouse for comprehensive performance audit
  - [ ] **Success**: No significant performance regression (>5%)

#### Visual Regression Testing
- [ ] **Side-by-side comparison of pages before/after migration**
  - [ ] Prepare comparison environment
    1. Have pre-migration template available for comparison
    2. Set up both versions running on different ports if possible
    3. Use same browser and viewport settings for fair comparison
  - [ ] Take screenshots of all major pages and components
    1. Homepage screenshot (desktop and mobile)
    2. Blog listing page screenshot
    3. Individual blog post screenshot
    4. Test pages (test-cards, test-example-2) screenshots
    5. Any other significant pages
  - [ ] Document visual differences systematically
    1. Compare screenshots pixel-by-pixel where possible
    2. Note any layout shifts or spacing changes
    3. Check for color consistency across components
    4. Verify typography and styling matches
  - [ ] Verify pixel-perfect or near-pixel-perfect match
    1. Acceptable differences:
       - Minor anti-aliasing differences
       - Slight font rendering variations between systems
    2. Unacceptable differences:
       - Layout shifts or component misalignment
       - Color changes (unless intentional theme updates)
       - Missing or broken components
    3. Document rationale for any accepted differences
  - [ ] **Success**: Visual parity maintained across migration

#### Accessibility Validation
- [ ] **Run accessibility testing on migrated pages**
  - [ ] Use automated accessibility testing tools
    1. Run Lighthouse accessibility audit on major pages
    2. Use axe-core browser extension for detailed analysis
    3. Test with WAVE (Web Accessibility Evaluation Tool)
    4. Document accessibility scores and issues
  - [ ] Test keyboard navigation comprehensively
    1. Navigate entire homepage using only Tab key
    2. Verify all interactive elements are reachable
    3. Test that focus indicators are visible and appropriate
    4. Check that tab order is logical and intuitive
    5. Test Escape key functionality for modals/dropdowns
  - [ ] Test screen reader compatibility
    1. Test with VoiceOver (macOS) or NVDA (Windows)
    2. Verify headings structure is logical (h1, h2, h3...)
    3. Check that images have appropriate alt text
    4. Verify form labels are properly associated
    5. Test that interactive elements announce their purpose
  - [ ] Verify no accessibility regressions introduced
    1. Compare accessibility scores to pre-migration baseline
    2. Check that no new accessibility violations were introduced
    3. Address any regressions immediately
    4. Document any accessibility improvements gained
  - [ ] Test color contrast and visual accessibility
    1. Verify color contrast meets WCAG AA standards
    2. Test both light and dark theme modes
    3. Test all accent color variants for contrast compliance
    4. Check that information isn't conveyed by color alone
  - [ ] **Success**: Accessibility scores maintained or improved

## Phase 4 Completion Verification

### Mid-Migration Quality Gates
- [ ] **All Phase 3-4 quality gates satisfied**
  - [ ] Component cleanup completed without functional loss
  - [ ] TypeScript compilation clean with no new errors
  - [ ] Production build succeeds with acceptable performance
  - [ ] All functional testing passed with ui-core components
  - [ ] Visual parity maintained across migration
  - [ ] Accessibility standards maintained or improved

## Next Steps

**Continue to Part 3**: Deployment & Completion (Phase 5 + Final Verification)
- Production deployment testing and validation  
- Template distribution readiness
- Documentation updates and final cleanup
- Complete slice verification and impact assessment

**File**: `10-tasks.template-migration-3-deployment.md`