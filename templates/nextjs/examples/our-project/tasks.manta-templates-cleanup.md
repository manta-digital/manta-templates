# Manta Templates Cleanup - Task Breakdown

## Section 1: Card System Migration (V1 → V2)

### Overview
Migrate template from V1 cards to V2 cards for consistency with landing page and better ShadCN integration. V2 cards use ShadCN foundation with Card, CardHeader, CardContent components, providing better accessibility via Radix UI primitives and enhanced TypeScript interfaces.

### Current State
- **Template**: Uses V1 cards (BlogCard, BlogCardWide, BlogCardImage, BaseCard)
- **Landing Page**: Uses V2 cards (BlogCardV2, BlogCardWideV2, BlogCardImageV2, BaseCardV2)
- **Dev Page**: Shows side-by-side comparison at `/dev/cards`

### Tasks

#### 1.1: Analyze Current V1 Card Usage
- [x] **Audit all V1 card imports in template**
  - Scan `src/components/blog/BlogPageClient.tsx` for V1 card imports
  - Check all files in `src/app/examples/` for V1 card usage
  - Identify all files importing from `@/components/cards/BlogCard`, `BlogCardWide`, `BlogCardImage`
  - Document current import patterns and file locations
  - Success: Complete list of files using V1 cards with specific import statements

- [x] **Verify V2 card functionality**
  - Test V2 cards in dev environment at `/dev/cards`
  - Compare visual rendering between V1 and V2 cards
  - Verify responsive behavior across mobile, tablet, desktop
  - Test theme switching (light/dark mode) with V2 cards
  - Success: V2 cards render correctly with no visual regressions

#### 1.2: Update Template Imports to V2 Cards
- [x] **Update BlogPageClient component**
  - Change `src/components/blog/BlogPageClient.tsx` imports:
    - `import BlogCard from '@/components/cards/BlogCard'` → `import BlogCardV2 from '@/components/cards/BlogCardV2'`
    - `import { BlogCardWide } from '@/components/cards/BlogCardWide'` → `import BlogCardWideV2 from '@/components/cards/BlogCardWideV2'`
    - `import { BlogCardImage } from '@/components/cards/BlogCardImage'` → `import BlogCardImageV2 from '@/components/cards/BlogCardImageV2'`
  - Update component usage in CardComponent assignment logic
  - Success: BlogPageClient imports and uses V2 cards without errors

- [x] **Update example pages to use V2 cards**  <!-- no V1 blog card imports in examples -->
  - Update `/examples/blog` page to import V2 cards
  - Update `/examples/portfolio` page if using blog cards
  - Update any other example pages using blog cards
  - Verify all import statements point to V2 versions
  - Success: All example pages use V2 cards and render correctly

- [x] **Update components/cards/index.ts exports**
  - Change exports from V1 to V2 cards:
    - `export { default as BlogCard } from './BlogCard'` → `export { default as BlogCard } from './BlogCardV2'`
    - Add exports for BlogCardWide and BlogCardImage pointing to V2 versions
  - Ensure no V1 cards are exported from index.ts
  - Success: Index file exports V2 cards, no V1 references remain

#### 1.3: Replace BaseCard Usage with BaseCardV2
- [x] **Audit BaseCard usage**
  - Search for all imports of `BaseCard` in template files
  - Identify components that extend or use BaseCard
  - Check if any custom cards inherit from BaseCard
  - Document all BaseCard usage patterns
  - Success: Complete inventory of BaseCard usage

- [x] **Update BaseCard imports to BaseCardV2**
  - Replace `import BaseCard from './BaseCard'` with `import BaseCardV2 from './BaseCardV2'`
  - Update component props and interfaces to use BaseCardV2Props
  - Verify ShadCN Card component compatibility
  - Test component rendering with BaseCardV2
  - Success: All components use BaseCardV2 without errors

#### 1.4: Remove V1 Card Files
- [x] **Delete V1 card component files**
  - Delete `src/components/cards/BlogCard.tsx`
  - Delete `src/components/cards/BlogCardWide.tsx`
  - Delete `src/components/cards/BlogCardImage.tsx`
  - Delete `src/components/cards/BaseCard.tsx`
  - Success: V1 card files removed from filesystem

- [x] **Clean up V1-specific references**
  - Remove any V1-specific styling or CSS classes
  - Clean up any V1 card references in documentation
  - Remove V1 card imports from any remaining files
  - Check for any hardcoded references to V1 card names
  - Success: No V1 card references remain in codebase

#### 1.5: Optional V2 File Renaming
- [x] **Rename V2 files to remove suffix (Optional)**
  - Rename `BlogCardV2.tsx` → `BlogCard.tsx`
  - Rename `BlogCardWideV2.tsx` → `BlogCardWide.tsx`
  - Rename `BlogCardImageV2.tsx` → `BlogCardImage.tsx`
  - Rename `BaseCardV2.tsx` → `BaseCard.tsx`
  - Update all import statements to use new filenames
  - Success: Clean naming convention without V2 suffix

#### 1.6: Migration Testing and Validation
- [x] **Test blog functionality**
  - Verify `/blog` page renders correctly with V2 cards
  - Test all blog layout variants (default, wide, image)
  - Check blog card responsiveness across devices
  - Verify blog card interactions and hover states
  - Success: Blog functionality works perfectly with V2 cards

- [x] **Test example pages**
  - Verify `/examples/blog` renders correctly
  - Test `/examples/portfolio` if using blog cards
  - Check all example page layouts and styling
  - Verify no console errors or warnings
  - Success: All example pages work correctly with V2 cards

- [x] **Cross-browser compatibility testing**
  - Test in Chrome, Firefox, Safari
  - Verify responsive design on mobile devices
  - Check accessibility features work correctly
  - Test theme switching functionality
  - Success: V2 cards work consistently across all browsers

#### 1.7: Documentation Updates
- [ ] **Update component documentation**
  - Update any documentation referencing V1 cards
  - Document V2 card usage patterns
  - Update code examples to use V2 cards
  - Add migration notes for future reference
  - Success: Documentation accurately reflects V2 card usage

- [ ] **Update README and setup guides**
  - Ensure setup instructions reference correct card components
  - Update any getting started guides
  - Fix any broken links or references
  - Add notes about ShadCN integration benefits
  - Success: All documentation is accurate and up-to-date

### Success Criteria
- ✅ Template uses V2 cards consistently with landing page
- ✅ All blog functionality works without regressions
- ✅ Better ShadCN integration and accessibility
- ✅ No V1 card references remain in codebase
- ✅ Clean build with no errors or warnings
- ✅ Enhanced TypeScript interfaces and prop validation
- ✅ Single source of truth across template and landing page

### Benefits Achieved
- **Design System Consistency**: Template matches landing page implementation
- **Better Accessibility**: Radix UI primitives provide enhanced a11y features
- **Enhanced TypeScript**: Improved interfaces and prop validation
- **Maintainability**: Single card system across entire project
- **ShadCN Integration**: Proper use of Card, CardHeader, CardContent components

## Section 2: Test Infrastructure Organization

### Overview
Reorganize test pages, components, and utilities to provide a clear separation between the clean production template and the comprehensive landing-page gallery while preserving developer tooling.

### Tasks

#### 2.1 Inventory & Analysis
- [x] **Catalog all test routes and components**
  - Scan `src/app/(test|dev)/**` and `src/components/**` for test-only code
  - Document each route/component, its purpose, and key dependencies in task notes
  - Success: Complete list of test pages (`/test*`, `/dev/cards`, etc.) and dev-only components with file paths

- [x] **Assess landing workspace capacity**
  - Verify that corresponding routes/components do not already exist in `landing/` workspace  
  - Identify naming collisions or required renames  
  - Success: Clear migration map from template → landing gallery

#### 2.2 Migrate Test Pages to Landing Gallery
- [x] **Create gallery routes in landing workspace**
  - Add pages under `landing/src/app/gallery/*` mirroring original routes (`cards`, `composition`, `variants`, `radix-colors`)  
  - Ensure routing uses App Router conventions (Next 15)  
  - Success: Landing dev server displays migrated pages without errors

- [x] **Transfer page source & assets**
  - Copy TSX/MDX, images, and local helpers; update import paths to landing equivalents  
  - Replace Tailwind v3 classes with v4 utilities if encountered  
  - Success: Pages compile with Tailwind 4 & Radix custom palettes intact

#### 2.3 Reorganize Dev-Only Components
- [ ] **Move reusable dev components to `/components/dev/`**
  - Within template, create `src/components/dev/` and move test utilities (e.g., `CardVariantTest`, `RadixColorTest`)  
  - Export via `components/dev/index.ts` for easy tree-shaking  
  - Success: No dev component lives in production bundles (verified via `next build --profile`)

- [x] **Update imports after move**
  - Refactor test pages (now in landing) to import from `landing/components/dev`  
  - Template code must not import from `components/dev`  
  - Success: `grep -R "from .*components/dev" templates/nextjs/src` returns 0 results

#### 2.4 Clean Template Routes & Navigation
- [x] **Remove test routes from template**
  - Delete `/src/app/test*`, `/src/app/dev/cards`, and related navigation links  
  - Update any leftover links in header/footer components  
  - Success: Production template build contains no test routes (checked via `.next/routes-manifest.json`)

#### 2.5 Landing Gallery Link Card
- [x] **2.5.1 Analyze Existing Grid Layout**
  - Review the Examples section grid implementation in `landing/src/app/page.tsx` (done)
  - Determine how grid rows and columns are structured (e.g., CSS grid, Bento grid, etc.) (done)
  - Identify how to insert a new row at the top without breaking layout (done)

- [x] **2.5.2 Define Gallery Card Requirements**
  - Card should visually match other example cards in the grid
  - Card must always span all columns (full-width, first row)
  - Card should function as a link to the gallery page (`/gallery` or equivalent)
  - Card should have a clear label (e.g., “Explore Card Gallery”)
  - Card should be accessible (keyboard, screen reader)

- [x] **2.5.3 Implement Full-Width Gallery Card**
  - Insert a new grid row (row 0) with a single cell spanning all columns (done)
  - Add the gallery card with correct styling and link behavior (done)
  - Ensure card is responsive and maintains grid integrity across breakpoints (done)

- [x] **2.5.5 Test and Validate**
  - Verify card appears as the first row, full width, on all screen sizes
  - Confirm link navigates to gallery page
  - Check accessibility and keyboard navigation
  - Ensure no regressions in grid layout or other cards

#### 2.6 Testing & Validation
- [x] **Functional tests**
  - Manually verify each gallery page renders and functions (carousel, composition, animations)  
  - Run `pnpm test` (or Playwright/Cypress suite when available) across template & landing  
  - Success: All tests pass, no console warnings

- [x] **Cross-browser & accessibility checks**
  - Test in Chrome, Firefox, Safari, mobile simulators  
  - Use Axe DevTools to ensure WCAG-AA compliance  
  - Success: No critical a11y issues, contrast meets Radix guidelines

#### 2.7 Documentation Updates
- [x] **Update docs and READMEs**
  - Remove references to old `/test*` routes in template docs  
  - Add "Developer Utilities" section explaining new gallery structure  
  - Success: Documentation reflects reorganized test infrastructure

### Success Criteria
- ✅ Template production build contains no test routes/components
- ✅ Landing gallery includes all migrated demos with enhanced UI
- ✅ All dev utilities live under `/components/dev` or landing workspace only
- ✅ Tailwind 4 and Radix custom palettes work across all gallery pages
- ✅ No build errors, lint warnings, or broken links

### Benefits Achieved
- **Clean Starter**: Production template is free of dev clutter
- **Rich Gallery**: Landing demonstrates full capabilities without polluting core template
- **Better DX**: Developers still have access to utilities in an organized location
- **Maintainability**: Clear separation simplifies future updates and CLI automation

### 97: Bugs
- [ ] Some objects are not maintaining proper height, for example the documentation inner cards in the landing page.
- [ ] Some focus rectangles do not match their card shape (blog, gallery).
- [x] Blog card is skipped in tab layout -- cannot tab to blog card.
- [x] in light mode, we should use Text White or similar, not dark text, for gradient cards

### 98: Maintenance Items
- [x] interactive card in variant test needs transition

### 99: Future Enhancements
- [ ] carousel sizing needs adjustment as it cuts off the elevated card shadow
- [ ] update and enhance gallery card (placeholder in first grid row)
- [x] default card variant now displays correct border and shadow consistently across test pages.

## Section 3: Example Pages Curation

### Overview
Curate example pages in the template to keep only essential demos, while migrating advanced and experimental examples to the landing page. Ensure all examples use updated (V2) cards, maintain a clean and professional appearance, and provide clear documentation and navigation.

### Tasks

#### 3.1 Inventory & Analysis
- [x] **Catalog all example pages in the template**
  - List all files under `src/app/examples/` (blog, portfolio, bentogrid, masonrygrid, gridlayout, etc.)
  - Document which examples are essential (to keep) and which are advanced/experimental (to migrate)
  - Success: Complete inventory of example pages with migration status
  - **Findings**: Essential (keep): blog, bentogrid, portfolio. Advanced (migrate): masonrygrid, gridlayout

- [x] **Audit card usage in all example pages**
  - Check that all examples use V2 card components (BlogCard, BlogCardWide, BlogCardImage, BaseCard)
  - Note any pages still using V1 cards or outdated imports
  - Success: List of pages needing card import updates
  - **Findings**: All examples use BaseCard imports. No V1 card names found. Portfolio uses custom grid without cards.

- [x] **Catalog pages currently used in landing workspace**
  - List all pages under `landing/src/app/` (gallery, examples, blog, etc.)
  - Document which test pages have been migrated to landing gallery
  - Document which examples already exist in landing examples
  - Success: Complete inventory of landing pages with migration status
  - **Findings**: Gallery contains cards, variants, composition, radix-colors. Examples contains blog, bentogrid, portfolio, gridlayout, masonrygrid

- [x] **Audit and clean up V2 suffix references**
  - Remove dev/cards page that contains V2 aliases and comparisons
  - Audit remaining V2 references in component files and exports
  - Success: No V2 suffix references remain in template
  - **Findings**: Removed dev/cards page and updated all component files to remove V2 suffixes from names, imports, and exports

- [x] **Remove dev/cards**
  - Analyze cards and demos present in dev/cards/page.tsx in templates/nextjs
  - Preserve the image + blur BlogImageCard test --> but MOVE it to a preserved example
  - Ensure all card types in the to-be-removed page are available somewhere -- ideally card variants or animation
    variants in landing page gallery example. 

#### 3.2 Essential Example Preservation
- [ ] **Retain only essential examples in the template**
  - Keep `/examples/blog`, `/examples/portfolio`, and `/examples/bentogrid` in the template
  - Remove or migrate `/examples/masonrygrid`, `/examples/gridlayout`, and any other advanced/experimental examples
  - Success: Only essential examples remain in the template

- [ ] **Update all essential examples to use V2 cards**
  - Refactor imports and usage to ensure BlogCard, BlogCardWide, BlogCardImage, and BaseCard are V2
  - Test rendering and styling for each essential example
  - Success: All essential examples use V2 cards and render correctly

#### 3.3 Migration of Advanced Examples
- [ ] **Migrate advanced/experimental examples to landing page**
  - Note: very likely these are already in landing page.  Verify first.
  - Move `/examples/masonrygrid`, `/examples/gridlayout`, and any other advanced/experimental examples to the landing workspace (e.g., `landing/src/app/examples/`)
  - Update import paths and dependencies as needed for landing environment
  - Test migrated pages in landing dev server
  - Success: Advanced examples function correctly in landing page

#### 3.4 Navigation & Documentation Updates
- [ ] **Update navigation and routing in the template**
  - Remove links to migrated examples from template navigation (header, footer, sidebars)
  - Ensure navigation only references preserved examples
  - Success: Navigation is clean and accurate

- [ ] **Add references to landing page for advanced examples**
  - In template documentation, guide users to landing page HOWEVER, just send them to https://templates.manta.digital,
    as that is where we actually deploy the landing page.  A user using the nextjs template to create an app starter will not (and should not) need to know about manta-templates/landing (the landing page folder in the monorepo).
  - If we have additional monorepo documentation, *that* is the place to explain in context of templates/nextjs vs   
    landing/, as these users are actually working in the monorepo.
  - Success: Users are guided to the landing page for more examples

- [ ] **Update documentation to reflect curated examples**
  - Revise any docs listing example pages to match the new set
  - Remove references to deleted/migrated examples
  - Ensure code samples use V2 cards and current examples
  - Success: Documentation is accurate and up-to-date

#### 3.5 Testing & Validation
- [ ] **Test all preserved example pages**
  - Verify `/examples/blog`, `/examples/portfolio`, and `/examples/bentogrid` render correctly and use V2 cards
  - Check for responsive design, accessibility, and theme switching
  - Success: All preserved examples work as intended

- [ ] **Test landing page advanced examples**
  - Verify migrated examples render and function in the landing workspace
  - Check for styling, responsiveness, and correct imports
  - Success: Advanced examples are fully functional in landing

### Success Criteria
- ✅ Only essential examples remain in the template (blog, portfolio, bentogrid)
- ✅ All template examples use V2 cards exclusively
- ✅ Advanced/experimental examples are migrated to the landing page and work correctly
- ✅ Navigation and documentation are updated and accurate
- ✅ No broken links or references to removed examples
- ✅ All preserved examples are tested for functionality, responsiveness, and accessibility
