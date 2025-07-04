# Card Standardization Implementation Tasks

## Section 1: ShadCN Integration

### Overview
Install and configure ShadCN Card components as the foundation for card standardization while maintaining existing teal-500 design system.

### Tasks

- [x] **Install ShadCN Card component via CLI**
  - Run `npx shadcn@latest add card` in the project root
  - Verify installation creates `src/components/ui/card.tsx` with all sub-components
  - Confirm TypeScript compilation succeeds without errors
  - Success: Card component files exist and project builds successfully

- [x] **Verify ShadCN Card component structure**
  - Examine generated `card.tsx` to understand component exports
  - Document available sub-components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - Verify Radix UI dependencies are properly installed
  - Success: All ShadCN Card sub-components are available and properly typed

- [x] **Create ShadCN Card integration test**
  - Create `src/components/cards/test/ShadCnCardTest.tsx` component
  - Implement basic card using all ShadCN sub-components
  - Add component to a test page to verify rendering
  - Success: Test card displays correctly with all sub-components visible

- [x] **Analyze current Tailwind CSS v4 theme configuration**
  - Review `src/app/globals.css` @theme blocks for existing card-related variables
  - Document current theme variables (--color-card, --color-card-foreground, etc.)
  - Identify teal-500 usage patterns in existing cards (--color-teal-500: #14b8a6)
  - Verify existing CSS custom properties structure and naming conventions
  - Success: Complete documentation of current Tailwind v4 styling configuration

- [x] **Extend Tailwind CSS v4 theme for ShadCN Card integration**
  - Add card-specific CSS custom properties to `src/app/globals.css` @theme block
  - Integrate teal-500 accent colors with ShadCN card border and accent variables
  - Ensure proper CSS variable inheritance for card components
  - Test that new variables generate correct utility classes (bg-card-accent, border-card-accent)
  - Success: ShadCN cards display with teal-500 borders matching existing design through CSS variables

- [x] **Create enhanced BaseCard using ShadCN structure**
  - Create `src/components/cards/EnhancedBaseCard.tsx`
  - Implement polymorphic component pattern with ShadCN Card as foundation
  - Support size variants (sm, md, lg) and visual variants (default, outlined)
  - Include proper TypeScript interfaces for all props
  - Success: EnhancedBaseCard renders with same visual appearance as current BaseCard

- [x] **Create visual comparison test**
  - Create side-by-side comparison page showing BaseCard vs EnhancedBaseCard
  - Implement identical content in both card types
  - Verify visual parity between old and new implementations
  - Success: Both cards appear visually identical with same spacing, colors, and typography

## Section 2: Enhanced Card Variants

### Overview
Create enhanced card variants that combine ShadCN structure with advanced features from existing card components, establishing the foundation for specialized card migration.

### Tasks

- [x] **Create enhanced card variant system**
  - [x] Design variant architecture with base + enhancement pattern
    1. Create `src/types/cardVariants.ts` with variant definitions
    2. Define variant types: `base`, `elevated`, `bordered`, `gradient`, `interactive`
    3. Add size variants: `sm`, `md`, `lg`, `xl` with responsive breakpoints
    4. Include state variants: `default`, `hover`, `active`, `disabled`
  - [x] Implement variant composition utilities
    1. Create `src/lib/cardVariants.ts` with variant class builders
    2. Use class-variance-authority (cva) for variant management
    3. Support compound variants (size + visual style combinations)
    4. Add runtime variant validation with proper TypeScript types
  - [x] Success: Variant system supports flexible card customization with type safety

- [x] **Implement elevated card variant**
  - [x] Create enhanced elevation system
    1. Create `src/components/cards/variants/ElevatedCard.tsx`
    2. Extend ShadCN Card with enhanced shadow and hover effects
    3. Add elevation levels: `none`, `sm`, `md`, `lg`, `xl` using CSS custom properties
    4. Include smooth elevation transitions on hover and focus states
  - [x] Add interactive elevation behaviors
    1. Implement hover elevation increase for better user feedback
    2. Add focus-visible elevation for keyboard navigation accessibility
    3. Include pressed/active state with reduced elevation
    4. Support reduced-motion preference for accessibility
  - [x] Success: ElevatedCard provides sophisticated depth effects while maintaining accessibility

- [x] **Create bordered card variant**
  - [x] Implement advanced border styling
    1. Create `src/components/cards/variants/BorderedCard.tsx`
    2. Extend ShadCN Card with customizable border patterns
    3. Support border styles: `solid`, `dashed`, `dotted`, `gradient`
    4. Add border width variants: `thin`, `medium`, `thick` with responsive adjustments
  - [x] Add teal-500 accent integration
    1. Implement teal-500 border accents for primary actions/states
    2. Add border color animation on hover and focus
    3. Support theme-aware border colors (light/dark mode compatibility)
    4. Include high contrast mode support for accessibility
  - [x] Success: BorderedCard maintains teal-500 design system while adding versatile border options

- [x] **Develop gradient card variant**
  - [x] Create sophisticated gradient system
    1. Create `src/components/cards/variants/GradientCard.tsx`
    2. Implement gradient background with ShadCN Card structure
    3. Add gradient presets: `teal`, `blue`, `purple`, `sunset`, `ocean`
    4. Support custom gradient definitions via CSS custom properties
  - [x] Success: GradientCard provides visually appealing backgrounds without compromising accessibility

- [x] **Create card composition system**
  - [x] Design flexible card layout patterns
    1. Create `src/components/cards/layouts/CardComposition.tsx`
    2. Support nested card layouts (card-in-card patterns)
    3. Include responsive card sizing and spacing utilities
  - [x] Implement advanced layout features
    1. Add card stacking and overlapping layout patterns
    2. Include card carousel and slider components
    3. Add virtual scrolling for large card collections
  - [x] Success: CardComposition enables complex card layouts with optimal performance

- [x] **Develop card animation system**
  - [x] Create smooth card animations
    1. [x] Create `src/components/cards/animations/CardAnimations.tsx`
    2. [x] Implement entrance animations: `fade-in`, `slide-up`, `scale-in`
    3. [x] Add exit animations with proper cleanup for React transitions
    4. [x] Support staggered animations for card collections
  - [x] Add micro-interactions
    1. [x] Implement card hover micro-interactions (subtle scale, glow effects)
    2. [x] Add loading state animations with skeleton patterns
    3. [x] Support success/error state animations for form cards
    4. [x] Include accessibility controls for motion preferences
  - [x] Success: Card animations enhance UX while respecting accessibility and performance

- [x] **Centralize Test Page**
  - [x] Create root /test or /dev/test page with links to the other test pages that we now.
  - [x] Success: Test page displays all card variants and layouts
  
- [x] **Build card theming system**
  - [x] Create comprehensive theme support
    - [x] Create `src/styles/cardThemes.css` with theme-specific variables
    - [x] Extend existing teal-500 theme with card-specific color schemes
    - [x] Add light/dark mode automatic switching for all card variants
    - [x] Support high contrast and reduced color themes for accessibility
  - [x] Implement dynamic theme switching
    - [x] Add runtime theme switching capabilities for card collections
    - [x] Support user preference persistence for theme choices
    - [x] Include theme preview system for development and testing
  - [x] Success: Card theming system maintains design consistency across all variants and modes

- [x] **Build card variant documentation**
  - [x] Create comprehensive documentation
    - [x] Create `src/components/cards/variants/README.md` with usage examples
    - [x] Document all variant props and their effects
    - [x] Add migration guide from existing cards to enhanced variants
    - [x] Include accessibility guidelines and best practices
  - [x] Add interactive documentation
    - [x] Create Storybook stories for all card variants
    - [x] Add interactive playground for testing variant combinations
    - [x] Include code examples and copy-paste snippets
    - [x] Add performance notes and optimization recommendations
  - [x] Success: Documentation enables easy adoption and understanding of card variant system

## Section 3: Support Radix Theming

### Overview
Implement comprehensive Radix color palette theming system to support custom color schemes beyond the current teal-500 system. Enable dynamic color palette switching with proper accessibility, contrast ratios, and semantic color mapping.

### Tasks
- [ ] **Research and analyze Radix Colors system**
  - [ ] Study Radix Colors documentation and color scale methodology
    - [ ] Review Radix Colors 1-12 scale system and semantic meanings
    - [ ] Understand P3 wide-gamut color support and alpha variants
    - [ ] Document color naming conventions (gray, mauve, slate, sage, olive, sand, tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, cyan, teal, jade, green, grass, bronze, gold, brown, orange, amber, yellow, lime, mint, sky)
    - [ ] Analyze light/dark mode color relationships and automatic pairing
  - [ ] Examine current teal-500 usage patterns in existing card system
    - [ ] Audit all card components for hardcoded teal references
    - [ ] Map current color usage to semantic color roles (accent, border, background, text)
    - [ ] Document accessibility requirements and contrast ratios
  - [ ] Success: Complete understanding of Radix Colors system and current color usage patterns

- [ ] **Install and configure Radix Colors dependencies**
  - [ ] Install Radix Colors packages
    - [ ] Run `npm install @radix-ui/colors` to install color definitions
    - [ ] Verify installation and available color exports
    - [ ] Test import of color scales in TypeScript environment
  - [ ] Set up color scale utilities
    - [ ] Create `src/lib/colors/radixColors.ts` utility file
    - [ ] Import and re-export commonly used color scales (gray, teal, purple, etc.)
    - [ ] Create TypeScript types for color scale names and values
    - [ ] Add helper functions for color scale manipulation
  - [ ] Success: Radix Colors properly installed and accessible via utility functions

- [ ] **Create Radix color palette integration with Tailwind CSS v4**
  - [ ] Extend Tailwind theme with Radix color scales
    - [ ] Update `src/app/globals.css` @theme block to include Radix color variables
    - [ ] Map Radix color scales to CSS custom properties following Tailwind v4 conventions
    - [ ] Ensure proper naming: `--color-{scale}-{step}` (e.g., `--color-teal-1`, `--color-teal-12`)
    - [ ] Include both light and dark variants for each color scale
  - [ ] Create semantic color mapping system
    - [ ] Define semantic color roles: `--color-accent`, `--color-accent-subtle`, `--color-accent-emphasis`
    - [ ] Map semantic roles to specific Radix color steps (e.g., accent = step 9, subtle = step 3)
    - [ ] Create CSS custom properties for card-specific semantic colors
    - [ ] Ensure automatic light/dark mode switching via CSS custom properties
  - [ ] Success: Radix colors available as Tailwind utilities and semantic color system established

- [ ] **Implement dynamic color palette switching**
  - [ ] Create color palette context and provider
    - [ ] Create `src/contexts/ColorPaletteContext.tsx` with React context
    - [ ] Define ColorPalette type with available color scales and current selection
    - [ ] Implement useColorPalette hook for consuming components
    - [ ] Add palette switching functionality with persistence (localStorage)
  - [ ] Build color palette selector component
    - [ ] Create `src/components/ui/ColorPaletteSelector.tsx` component
    - [ ] Display available color palettes with preview swatches
    - [ ] Implement palette selection with immediate visual feedback
    - [ ] Include accessibility features (keyboard navigation, screen reader support)
  - [ ] Integrate palette switching with CSS custom properties
    - [ ] Update CSS custom properties dynamically based on selected palette
    - [ ] Ensure smooth transitions between color palettes
    - [ ] Maintain semantic color relationships across palette changes
  - [ ] Success: Users can dynamically switch between different Radix color palettes

- [ ] **Update card theming system for Radix integration**
  - [ ] Refactor cardThemes.css for Radix compatibility
    - [ ] Replace hardcoded teal references with semantic color variables
    - [ ] Update `src/styles/cardThemes.css` to use Radix color steps
    - [ ] Maintain existing card variants while adding Radix color support
    - [ ] Ensure proper contrast ratios and accessibility compliance
  - [ ] Enhance card variant system with color palette support
    - [ ] Update `src/lib/cardVariants.ts` to accept color palette parameter
    - [ ] Add color variant options (accent, neutral, success, warning, error)
    - [ ] Implement color-aware hover and focus states
    - [ ] Maintain backward compatibility with existing card implementations
  - [ ] Create card color variant test component
    - [ ] Build `src/components/cards/test/CardColorVariantTest.tsx`
    - [ ] Display all card variants with different color palettes
    - [ ] Include interactive palette switching demonstration
    - [ ] Test accessibility and contrast ratios across all combinations
  - [ ] Success: Card system fully integrated with Radix color palettes and semantic color roles

- [ ] **Implement accessibility and contrast validation**
  - [ ] Create color contrast validation utilities
    - [ ] Create `src/lib/colors/contrastUtils.ts` with WCAG compliance functions
    - [ ] Implement contrast ratio calculation for color combinations
    - [ ] Add validation for AA and AAA accessibility standards
    - [ ] Create warnings for insufficient contrast ratios
  - [ ] Add accessibility testing for color combinations
    - [ ] Test all card variants with different color palettes for contrast compliance
    - [ ] Validate text readability on colored backgrounds
    - [ ] Ensure proper focus indicators with sufficient contrast
    - [ ] Test with color blindness simulation tools
  - [ ] Implement high contrast mode support
    - [ ] Add `@media (prefers-contrast: high)` CSS rules
    - [ ] Override color selections with high contrast alternatives
    - [ ] Ensure all interactive elements remain visible and usable
  - [ ] Success: All color combinations meet WCAG accessibility standards

- [ ] **Create comprehensive color palette documentation**
  - [ ] Document Radix color integration
    - [ ] Create `src/components/cards/theming/README.md` with color system guide
    - [ ] Document available color palettes and their use cases
    - [ ] Provide examples of semantic color usage in cards
    - [ ] Include accessibility guidelines and contrast requirements
  - [ ] Build interactive color palette showcase
    - [ ] Create `/test-color-palettes` page for comprehensive color testing
    - [ ] Display all available Radix color scales with previews
    - [ ] Show card variants with each color palette applied
    - [ ] Include accessibility information and contrast ratios
  - [ ] Create migration guide for existing implementations
    - [ ] Document how to migrate from hardcoded teal-500 to semantic colors
    - [ ] Provide code examples for common color usage patterns
    - [ ] Include troubleshooting guide for color-related issues
  - [ ] Success: Complete documentation enables easy adoption of Radix color system

- [ ] **Performance optimization and testing**
  - [ ] Optimize color palette switching performance
    - [ ] Implement efficient CSS custom property updates
    - [ ] Add debouncing for rapid palette changes
    - [ ] Minimize layout shifts during color transitions
    - [ ] Test performance with large numbers of card components
  - [ ] Create automated testing for color system
    - [ ] Add unit tests for color utility functions
    - [ ] Test color palette context and provider functionality
    - [ ] Validate CSS custom property generation and updates
    - [ ] Include visual regression tests for color consistency
  - [ ] Browser compatibility testing
    - [ ] Test CSS custom property support across target browsers
    - [ ] Validate P3 wide-gamut color display where supported
    - [ ] Ensure graceful fallbacks for unsupported features
  - [ ] Success: Color system performs efficiently and works across all target browsers

## Section 98: Persistent Bug Fixes
- [ ] **Fix card height issues**
  - [x] Card heights are not consistent in container (infinite mode).

## Section 99: Enhancements (keep this section last)
- [ ] **Create card variant testing suite**
  - [ ] Implement comprehensive testing
    - [ ] Create `src/components/cards/__tests__/CardVariants.test.tsx`
    - [ ] Add unit tests for all variant combinations and props
    - [ ] Include accessibility testing with jest-axe
    - [ ] Test responsive behavior at different viewport sizes
  - [ ] Add visual regression testing
    - [ ] Set up Playwright tests for card variant visual consistency
    - [ ] Test all variants in both light and dark themes
    - [ ] Include interaction state testing (hover, focus, active)
    - [ ] Add cross-browser compatibility tests
  - [ ] Add theme validation to ensure proper contrast ratios
  - [ ] Success: All card variants pass comprehensive testing suite with 100% coverage

- [ ] **Implement accessibility enhancements**
  - [ ] Add proper ARIA labels to EnhancedBaseCard
  - [ ] Ensure keyboard navigation works correctly
  - [ ] Add focus indicators that match teal-500 design
  - [ ] Test with screen reader compatibility
  - [ ] Optimize gradient accessibility
    1. Ensure sufficient contrast ratios for text readability
    2. Add overlay system for content readability on gradients
    3. Support reduced-motion preference for animated gradients
    4. Include high contrast mode alternatives
  - [ ] Success: EnhancedBaseCard passes accessibility audit and keyboard navigation tests

- [ ] **Create migration utility functions**
  - [ ] Create `src/lib/cardMigration.ts` with helper functions
  - [ ] Implement prop mapping utilities for BaseCard → EnhancedBaseCard
  - [ ] Add TypeScript type guards for enhanced card props
  - [ ] Success: Migration utilities support seamless prop conversion

- [ ] **Build interactive card variant**
  - [ ] Implement advanced interaction patterns
    - [ ] Create `src/components/cards/variants/InteractiveCard.tsx`
    - [ ] Add click, hover, and focus interaction states
    - [ ] Support keyboard navigation with proper ARIA attributes
    - [ ] Include ripple effect animations for touch interactions
  - [ ] Add gesture support for enhanced UX
    - [ ] Implement swipe gestures for mobile card interactions
    - [ ] Add long-press actions for contextual menus
    - [ ] Support drag and drop capabilities for reorderable cards
    - [ ] Include haptic feedback integration for supported devices
  - [ ] Success: InteractiveCard provides rich user interactions while maintaining web standards




