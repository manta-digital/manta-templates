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
- [ ] **Audit all V1 card imports in template**
  - Scan `src/components/blog/BlogPageClient.tsx` for V1 card imports
  - Check all files in `src/app/examples/` for V1 card usage
  - Identify all files importing from `@/components/cards/BlogCard`, `BlogCardWide`, `BlogCardImage`
  - Document current import patterns and file locations
  - Success: Complete list of files using V1 cards with specific import statements

- [ ] **Verify V2 card functionality**
  - Test V2 cards in dev environment at `/dev/cards`
  - Compare visual rendering between V1 and V2 cards
  - Verify responsive behavior across mobile, tablet, desktop
  - Test theme switching (light/dark mode) with V2 cards
  - Success: V2 cards render correctly with no visual regressions

#### 1.2: Update Template Imports to V2 Cards
- [ ] **Update BlogPageClient component**
  - Change `src/components/blog/BlogPageClient.tsx` imports:
    - `import BlogCard from '@/components/cards/BlogCard'` → `import BlogCardV2 from '@/components/cards/BlogCardV2'`
    - `import { BlogCardWide } from '@/components/cards/BlogCardWide'` → `import BlogCardWideV2 from '@/components/cards/BlogCardWideV2'`
    - `import { BlogCardImage } from '@/components/cards/BlogCardImage'` → `import BlogCardImageV2 from '@/components/cards/BlogCardImageV2'`
  - Update component usage in CardComponent assignment logic
  - Success: BlogPageClient imports and uses V2 cards without errors

- [ ] **Update example pages to use V2 cards**
  - Update `/examples/blog` page to import V2 cards
  - Update `/examples/portfolio` page if using blog cards
  - Update any other example pages using blog cards
  - Verify all import statements point to V2 versions
  - Success: All example pages use V2 cards and render correctly

- [ ] **Update components/cards/index.ts exports**
  - Change exports from V1 to V2 cards:
    - `export { default as BlogCard } from './BlogCard'` → `export { default as BlogCard } from './BlogCardV2'`
    - Add exports for BlogCardWide and BlogCardImage pointing to V2 versions
  - Ensure no V1 cards are exported from index.ts
  - Success: Index file exports V2 cards, no V1 references remain

#### 1.3: Replace BaseCard Usage with BaseCardV2
- [ ] **Audit BaseCard usage**
  - Search for all imports of `BaseCard` in template files
  - Identify components that extend or use BaseCard
  - Check if any custom cards inherit from BaseCard
  - Document all BaseCard usage patterns
  - Success: Complete inventory of BaseCard usage

- [ ] **Update BaseCard imports to BaseCardV2**
  - Replace `import BaseCard from './BaseCard'` with `import BaseCardV2 from './BaseCardV2'`
  - Update component props and interfaces to use BaseCardV2Props
  - Verify ShadCN Card component compatibility
  - Test component rendering with BaseCardV2
  - Success: All components use BaseCardV2 without errors

#### 1.4: Remove V1 Card Files
- [ ] **Delete V1 card component files**
  - Delete `src/components/cards/BlogCard.tsx`
  - Delete `src/components/cards/BlogCardWide.tsx`
  - Delete `src/components/cards/BlogCardImage.tsx`
  - Delete `src/components/cards/BaseCard.tsx`
  - Success: V1 card files removed from filesystem

- [ ] **Clean up V1-specific references**
  - Remove any V1-specific styling or CSS classes
  - Clean up any V1 card references in documentation
  - Remove V1 card imports from any remaining files
  - Check for any hardcoded references to V1 card names
  - Success: No V1 card references remain in codebase

#### 1.5: Optional V2 File Renaming
- [ ] **Rename V2 files to remove suffix (Optional)**
  - Rename `BlogCardV2.tsx` → `BlogCard.tsx`
  - Rename `BlogCardWideV2.tsx` → `BlogCardWide.tsx`
  - Rename `BlogCardImageV2.tsx` → `BlogCardImage.tsx`
  - Rename `BaseCardV2.tsx` → `BaseCard.tsx`
  - Update all import statements to use new filenames
  - Success: Clean naming convention without V2 suffix

#### 1.6: Migration Testing and Validation
- [ ] **Test blog functionality**
  - Verify `/blog` page renders correctly with V2 cards
  - Test all blog layout variants (default, wide, image)
  - Check blog card responsiveness across devices
  - Verify blog card interactions and hover states
  - Success: Blog functionality works perfectly with V2 cards

- [ ] **Test example pages**
  - Verify `/examples/blog` renders correctly
  - Test `/examples/portfolio` if using blog cards
  - Check all example page layouts and styling
  - Verify no console errors or warnings
  - Success: All example pages work correctly with V2 cards

- [ ] **Cross-browser compatibility testing**
  - Test in Chrome, Firefox, Safari
  - Verify responsive design on mobile devices
  - Check accessibility features work correctly
  - Test theme switching functionality
  - Success: V2 cards work consistently across all browsers

- [ ] **Performance validation**
  - Verify build time remains fast
  - Check bundle size impact of V2 cards
  - Test development server startup time
  - Monitor runtime performance
  - Success: No performance regressions from V2 migration

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
