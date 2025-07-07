# Manta Templates Cleanup - Low-Level Design

## Feature Overview

Transform the current feature-rich NextJS template into a production-ready v0.6.0 starter template by strategically removing development/test artifacts while preserving essential functionality and examples. This cleanup ensures the template serves as a clean, professional starting point for real projects while maintaining its comprehensive card system and Radix theming capabilities.

## Technical Requirements

### Current State Analysis
The template currently contains:
- **18 card components** with comprehensive variants and theming
- **Multiple test pages** (`/test`, `/test-cards`, `/test-composition`, `/test-variants`)
- **Development utilities** and experimental features
- **Complete Radix theming system** (85% complete from Section 3)
- **ShadCN integration** with Tailwind CSS v4
- **Content management system** with markdown-driven components
- **Advanced features** (carousel, virtual scrolling, composition)

### Integration Considerations

#### Existing Tech Stack Compatibility
- **NextJS 15.3.3**: App Router structure must be maintained
- **ShadCN + Tailwind CSS v4**: CSS variable theming system preserved
- **Radix Themes 3**: Dynamic palette switching functionality retained
- **TypeScript**: All type safety and interfaces maintained
- **Content System**: Markdown-driven content processing preserved

#### Deployment Requirements
- Build process must remain fast and error-free
- All essential dependencies properly configured
- No broken imports or missing components
- Clean development experience for new users

## Main Sections and Components

### Section 1: Card System Migration (V1 → V2)
**Scope**: Migrate template from V1 cards to V2 cards for consistency and better ShadCN integration

#### Current State Analysis
- **Template**: Uses V1 cards (BlogCard, BlogCardWide, BlogCardImage, BaseCard)
- **Landing Page**: Uses V2 cards (BlogCardV2, BlogCardWideV2, BlogCardImageV2, BaseCardV2)
- **Key Difference**: V2 cards use ShadCN foundation, V1 cards use custom BaseCard

#### Migration Tasks
1. **Update Template Imports**
   - BlogPageClient: Change to import V2 cards
   - All example pages: Update to use V2 cards
   - components/cards/index.ts: Export V2 cards instead of V1

2. **File Replacements**
   - Replace BlogCard → BlogCardV2 usage in all files
   - Replace BlogCardWide → BlogCardWideV2 usage in all files
   - Replace BlogCardImage → BlogCardImageV2 usage in all files
   - Replace BaseCard → BaseCardV2 usage in all files

3. **V1 Card Removal**
   - Delete BlogCard.tsx, BlogCardWide.tsx, BlogCardImage.tsx
   - Delete BaseCard.tsx
   - Remove any V1-specific styling or references

4. **Migration Testing**
   - Verify all blog examples render correctly
   - Test responsive behavior across devices
   - Ensure no visual regressions
   - Validate accessibility improvements

#### Benefits of V2 Cards
- **ShadCN Integration**: Built on Card, CardHeader, CardContent components
- **Better Accessibility**: Radix UI primitives provide better a11y
- **Design System Consistency**: Matches landing page implementation
- **Enhanced TypeScript**: Better interfaces and prop validation
- **Maintainability**: Single source of truth across template and landing

### Section 2: Test Infrastructure Organization
**Scope**: Reorganize test pages and components for better separation between template and showcase

#### Test Pages Migration Strategy
**Decision**: Migrate test pages to landing page showcase (Option A)
- Better separation of concerns
- Enhanced showcase capabilities
- Cleaner template for production use
- Maintains all development utilities
- Aligns with manta-templates-cli concept

#### Test Pages to Migrate
- `/test` → Landing page component showcase
- `/test-cards` → Landing page card variant gallery
- `/test-composition` → Landing page advanced layouts demo
- `/test-variants` → Landing page animation showcase
- `/test/radix-colors` → Landing page theming customizer

#### Test Components Organization
- Move test components to `/components/dev/` directory for clear separation
- Update imports and references
- Maintain functionality for development use
- Document as development utilities in template

#### Landing Page Enhancement
1. **Create Component Showcase Section**
   - Add `/examples/components` section in landing page
   - Migrate test pages with enhanced theming and customization demos
   - Create interactive component gallery
   - Add customization tools and better visual presentation

2. **Benefits**
   - Comprehensive showcase of all template capabilities
   - Interactive demos with code examples
   - Enhanced theming customization tools
   - Professional presentation for potential users

#### Template Cleanup
- Remove test page routes from template
- Clean up test-related navigation
- Ensure production-ready appearance
- Maintain development utilities in organized structure

### Section 3: Example Pages Curation
**Scope**: Maintain essential examples in template while migrating advanced examples to landing page

#### Template Examples (Minimal Essential)
**Keep in Template**:
- `/examples/blog` - Essential blog layout demonstration
- `/examples/portfolio` - Essential portfolio layout example
- `/examples/bentogrid` - Single grid example (most versatile)

**Requirements**:
- Ensure all examples use updated cards after migration
- Test functionality and styling
- Maintain clean, professional appearance
- Provide clear documentation

#### Landing Page Examples (Comprehensive Showcase)
**Migrate to Landing Page**:
- `/examples/masonrygrid` → Landing page grid showcase
- `/examples/gridlayout` → Landing page grid showcase
- Advanced layout implementations → Landing page demos
- Any experimental or development-only examples

#### Grid Example Strategy
**BentoGrid Selection Rationale**:
- Most versatile and modern grid layout
- Good for dashboards and varied content
- Demonstrates advanced CSS Grid capabilities
- Provides best starting point for most projects

#### Migration Implementation
1. **Landing Page Grid Showcase**
   - Create comprehensive grid comparison section
   - Add interactive demos with code examples
   - Document different use cases for each grid type
   - Link from template documentation

2. **Template Cleanup**
   - Remove redundant grid examples from template
   - Update navigation and routing
   - Ensure remaining examples are polished
   - Add references to landing page for advanced examples

#### Benefits
- **Template**: Clean, focused examples for immediate use
- **Landing Page**: Comprehensive showcase of all capabilities
- **User Experience**: Clear progression from starter to advanced
- **Maintenance**: Easier to maintain focused template examples

#### Card Preservation Strategy
**Blog Cards (V1 → V2 Migration)**:
- Migrate to V2 versions: `BlogCardV2.tsx`, `BlogCardWideV2.tsx`, `BlogCardImageV2.tsx`
- Optionally rename V2 files to remove "V2" suffix after V1 deletion
- Delete V1 versions: `BlogCard.tsx`, `BlogCardWide.tsx`, `BlogCardImage.tsx`
- Update all imports and references

**Other Cards (Preserve As-Is)**:
- `ProjectCard.tsx` - Portfolio/project showcase
- `FeatureCard.tsx` variants - Product feature display
- `QuoteCard.tsx` - Testimonial/quote display
- `VideoCard.tsx` - Media content example
- `ThreeJSCard.tsx` - Advanced 3D demonstrations
- These cards don't have V1/V2 versions, so no migration needed

**Container System**:
- Preserve `*Container.tsx` components for markdown integration
- Maintain content-driven rendering capabilities
- Keep type definitions and interfaces
- Ensure compatibility with V2 card system

### Section 4: Documentation Organization
**Scope**: Clean up and organize documentation structure

#### Documentation to Preserve
- `docs/radix-theming-guide.md` - Comprehensive theming guide
- `docs/radix-colors-quick-reference.md` - Developer reference
- Core README files with setup instructions

#### Documentation to Update
- Remove references to deleted test pages
- Update component lists to reflect cleanup
- Ensure all code examples reference preserved components
- Clean up internal development notes

### Section 5: Build and Deployment Optimization
**Scope**: Ensure clean build process and deployment readiness

#### Build System
- Verify all imports resolve correctly after cleanup
- Ensure no unused dependencies remain
- Optimize bundle size by removing test-only code
- Maintain fast development server startup

#### Configuration Files
- Update TypeScript paths if needed
- Clean up ESLint/Prettier configurations
- Ensure all build scripts work correctly
- Verify deployment configurations

### Section 6: Content and Asset Management
**Scope**: Organize content and static assets

#### Content Structure
- Preserve markdown content system
- Keep sample content for demonstrations
- Remove test-only content files
- Maintain content type definitions

#### Static Assets
- Keep essential images and media
- Remove test-only assets
- Optimize asset organization
- Ensure all referenced assets exist

### Section 7: Final Validation and Polish
**Scope**: Comprehensive testing and quality assurance

#### Functionality Testing
- All preserved components render correctly
- Theme switching works properly
- Responsive design maintained
- No console errors or warnings
- Card version consolidation successful
- Landing page showcase fully functional

#### Developer Experience
- Clean development server startup
- Fast build times
- Clear documentation
- Intuitive project structure
- Easy template instance setup
- Clear separation between core and showcase

#### Showcase Validation
- All migrated test pages functional
- Enhanced theming demos working
- Grid examples properly showcased
- Interactive components responsive
- Code examples accurate and up-to-date

## Technical Implementation Strategy

### Reorganization Approach
1. **Audit & Analyze**: Catalog all components, pages, and their usage
2. **Version Comparison**: Compare V1 vs V2 cards for feature completeness
3. **Migration Planning**: Plan test page migration to landing page
4. **Template Streamlining**: Keep minimal but complete examples in template
5. **Landing Enhancement**: Create comprehensive showcase in landing page
6. **Cleanup Scripts**: Provide easy template instance cleanup tools

### Three-Tier Strategy
1. **Template Core**: Essential components and minimal examples
2. **Landing Showcase**: Full feature demonstrations and test pages
3. **Dev Utilities**: Development-only components clearly separated

### Preservation Criteria
- **Essential Functionality**: Core features needed for real projects
- **Example Value**: Demonstrates key capabilities to new users
- **Documentation**: Well-documented and maintainable
- **Performance**: Contributes to fast, efficient template

### Risk Mitigation
- **Backup Strategy**: Ensure all changes are reversible
- **Incremental Approach**: Remove items in small batches
- **Testing**: Verify build and functionality after each change
- **Documentation**: Track what was removed and why

## Success Criteria

### Technical Success
- ✅ Clean build with no errors or warnings
- ✅ Fast development server startup (<5 seconds)
- ✅ All preserved components function correctly
- ✅ Theme switching and Radix colors work properly
- ✅ Responsive design maintained across all examples
- ✅ Card version consolidation completed without feature loss
- ✅ Landing page showcase fully functional

### User Experience Success
- ✅ Clear, intuitive project structure
- ✅ Comprehensive but not overwhelming examples in template
- ✅ Rich showcase experience in landing page
- ✅ Professional appearance suitable for client projects
- ✅ Easy to understand and extend
- ✅ Well-organized documentation
- ✅ Clear separation between template core and showcase

### Production Readiness
- ✅ Template ready for immediate project use
- ✅ Optimized bundle size in template
- ✅ Clean deployment process
- ✅ Professional starter template quality
- ✅ All advanced features preserved in landing showcase
- ✅ Easy template instance cleanup process

### Showcase Enhancement
- ✅ Landing page demonstrates all capabilities
- ✅ Interactive component gallery functional
- ✅ Enhanced theming customization tools
- ✅ All grid examples preserved and enhanced
- ✅ Test utilities available for development

## Implementation Notes

### Dependencies
- Maintain all essential dependencies for core functionality
- Remove development-only dependencies if safe
- Ensure package.json reflects actual usage
- Verify all peer dependencies are satisfied

### Backward Compatibility
- Preserve public APIs for essential components
- Maintain existing prop interfaces where possible
- Keep content system structure intact
- Ensure migration path for existing users

### Future Considerations
- Template should serve as foundation for future enhancements
- Cleanup approach should be documented for future versions
- **manta-templates-cli revival**: CLI to handle template customization
  - Landing page gets everything (full showcase)
  - Default deployment gets minimal (blog/portfolio examples)
  - CLI allows users to specify what to include in their instance
- Consider creating migration guide for users of previous versions

## Detailed Analysis & Decisions

### Card Version Comparison Analysis

#### Current Usage Patterns
**Template (NextJS)**: Uses V1 cards (BlogCard, BlogCardWide, BlogCardImage)
**Landing Page**: Uses V2 cards (BlogCardV2, BlogCardWideV2, BlogCardImageV2)
**Dev Page**: Compares both versions side-by-side

#### Key Architectural Differences

**V1 Cards (BaseCard foundation)**:
- Custom BaseCard with manual styling
- Hardcoded teal-500 borders and styling
- Simple prop interfaces
- Manual padding/variant management
- Direct HTML structure

**V2 Cards (ShadCN foundation)**:
- Built on ShadCN Card components (Card, CardHeader, CardContent, etc.)
- Proper design system integration
- Enhanced TypeScript interfaces
- Better accessibility via Radix UI primitives
- Semantic HTML structure
- Consistent with design system

#### Detailed Component Analysis

**BlogCard vs BlogCardV2**:
- **V1**: Uses BaseCard with manual styling
- **V2**: Uses BaseCardV2 (ShadCN wrapper) with CardContent, CardHeader structure
- **Key Difference**: V2 has proper semantic structure and design system integration
- **Decision**: V2 is superior - better structure, accessibility, maintainability

**BlogCardWide vs BlogCardWideV2**:
- **V1**: Horizontal layout, extends BaseCardProps
- **V2**: Enhanced responsive design, better prop validation
- **Key Difference**: V2 has improved responsive behavior and configuration
- **Decision**: V2 is superior - essential for blog layouts with better UX

**BlogCardImage vs BlogCardImageV2**:
- **V1**: Basic image overlay with text
- **V2**: Enhanced overlay system with better contrast handling
- **Key Difference**: V2 has better text readability and customization
- **Decision**: V2 is superior - essential for hero/featured content

**BaseCard vs BaseCardV2**:
- **V1**: Custom implementation with manual variants
- **V2**: ShadCN Card wrapper with proper design system integration
- **Key Difference**: V2 provides ShadCN compatibility and better maintainability
- **Decision**: V2 is superior - foundation for all other cards

#### Usage Impact Analysis

**Template Currently Uses V1**:
- Main blog component imports V1 cards
- All example pages use V1 cards
- Exported in index.ts are V1 cards

**Landing Page Uses V2**:
- BlogPageClient imports V2 cards
- Better visual consistency
- Proper design system integration

**Migration Impact**:
- Template needs to migrate to V2 for consistency
- All imports need updating
- Better design system integration
- Improved accessibility and maintainability

### Implementation Strategy Refinement

#### Phase 1: Card System Migration (V1 → V2)
1. **Template V2 Migration**
   - Update BlogPageClient to import V2 cards
   - Replace BlogCard → BlogCardV2 in all template files
   - Replace BlogCardWide → BlogCardWideV2 in all template files
   - Replace BlogCardImage → BlogCardImageV2 in all template files
   - Update BaseCard → BaseCardV2 usage
   - Update components/cards/index.ts exports

2. **V1 Card Removal**
   - Delete BlogCard.tsx, BlogCardWide.tsx, BlogCardImage.tsx
   - Delete BaseCard.tsx
   - Remove V1 imports from all files
   - Clean up any V1-specific styling or references

3. **Migration Testing**
   - Verify all blog examples render correctly
   - Test responsive behavior across devices
   - Ensure no visual regressions
   - Validate accessibility improvements

#### Phase 2: Test Infrastructure Organization
1. **Test Page Strategy Decision**
   - **Option A**: Migrate to landing page showcase (recommended)
   - **Option B**: Keep in template with dev flag
   - Create migration plan based on chosen option

2. **Test Component Organization**
   - Move test components to `/components/dev/` directory
   - Update imports and references
   - Maintain functionality for development use

#### Phase 3: Example Pages Curation
1. **Grid Example Selection**
   - **Keep in Template**: BentoGrid (most versatile)
   - **Migrate to Landing**: MasonryGrid, GridLayout
   - Update navigation and routing

2. **Essential Example Preservation**
   - Keep `/examples/blog` and `/examples/portfolio`
   - Ensure both use V2 cards
   - Test functionality and styling

#### Phase 4: Landing Page Enhancement
1. **Test Page Migration** (if Option A chosen)
   - Create `/examples/components` section in landing
   - Migrate test pages with enhanced theming
   - Add interactive customization tools
   - Improve visual presentation

2. **Grid Showcase Creation**
   - Create comprehensive grid comparison
   - Add interactive demos with code examples
   - Document different use cases
   - Link from template documentation

### Specific Recommendations

#### Card Version Decisions (Analysis Complete)
1. **BlogCard**: **Choose V2** - Better ShadCN integration, semantic structure
2. **BlogCardWide**: **Choose V2** - Essential with improved responsive design
3. **BlogCardImage**: **Choose V2** - Essential with better contrast handling
4. **BaseCard**: **Choose V2** - ShadCN foundation, better design system integration

#### Migration Strategy
1. **Update Template to V2**: Migrate template to use V2 cards for consistency
2. **Remove V1 Cards**: Delete V1 implementations after migration
3. **Update Imports**: Fix all import statements and references
4. **Test Functionality**: Ensure no feature loss during migration
5. **Update Documentation**: Reflect V2 usage in all examples

#### Grid Example Decision
**Options for single template grid**:
- **BentoGrid**: Most versatile, good for dashboards
- **MasonryGrid**: Best for content-heavy layouts
- **GridLayout**: Most traditional, easiest to understand

**Recommendation**: Keep BentoGrid as it's most versatile and modern

#### Test Page Strategy
**Confirmed**: Option A (Landing Page Showcase)
- Better separation of concerns
- Enhanced showcase capabilities  
- Cleaner template for production use
- Maintains all development utilities
- Aligns with manta-templates-cli concept

#### Card Migration Priority
**High Priority** (Phase 1):
- Template consistency with landing page
- Better ShadCN integration
- Improved accessibility
- Simplified maintenance

#### CLI Integration Future
**manta-templates-cli** will handle:
- Template customization options
- Component selection (minimal vs full)
- Example page inclusion choices
- Grid layout preferences

### Risk Mitigation

#### Backup Strategy
- Create feature branch for all changes
- Document all removed components and rationale
- Maintain ability to restore any removed functionality
- Test thoroughly at each phase

#### Validation Approach
- Compare before/after functionality
- Ensure all essential features preserved
- Verify landing page showcase completeness
- Test template usability for new projects