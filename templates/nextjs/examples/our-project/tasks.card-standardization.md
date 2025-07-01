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

- [ ] **Implement accessibility enhancements**
  - Add proper ARIA labels to EnhancedBaseCard
  - Ensure keyboard navigation works correctly
  - Add focus indicators that match teal-500 design
  - Test with screen reader compatibility
  - Success: EnhancedBaseCard passes accessibility audit and keyboard navigation tests

- [x] **Create visual comparison test**
  - Create side-by-side comparison page showing BaseCard vs EnhancedBaseCard
  - Implement identical content in both card types
  - Verify visual parity between old and new implementations
  - Success: Both cards appear visually identical with same spacing, colors, and typography

## Section 99: Enhancements (keep this section last)
- [ ] **Create migration utility functions**
  - Create `src/lib/cardMigration.ts` with helper functions
  - Implement prop mapping utilities for BaseCard → EnhancedBaseCard
  - Add TypeScript type guards for enhanced card props
  - Success: Migration utilities support seamless prop conversion
