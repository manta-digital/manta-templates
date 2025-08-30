---
layer: task-breakdown
slice: theme-aware-gradients
project: manta-templates
lld-reference: project-artifacts/nextjs-template/slices/14-slice.theme-aware-gradients.md
dependencies: 
  - Slice 12 (Colors and Themes) - Core theme system infrastructure
  - UI-Core Components - Base Card and styling system
  - Tailwind Configuration - Gradient utility classes
current-state: slice-design-complete
phase: 6-task-expansion
created: 2025-08-29
lastUpdated: 2025-08-29
status: active
---

# Tasks: Theme-Aware Gradients (Slice 14)

## Context Summary

This slice enhances the GradientCard component to create theme-aware gradients that adapt to current theme's background and accent colors. The implementation replaces confusing named presets (teal, blue, purple, etc.) with a clean dual-control system:

1. **Simple Range-Based**: Background → accent gradients controlled by 0-100 range
2. **Advanced Accent-to-Accent**: Direct accent level specification for precise control

The migration preserves exact visual appearance while providing cleaner APIs and eliminating duplicate gradient definitions.

## Phase 1: Core Enhancement (Priority)

### Task 1: Analyze Current GradientCard Implementation ✓ (Completed)

#### Read and Document Current Component Structure
- [x] Read current GradientCard component file
  - [x] Open `packages/ui-core/src/components/cards/GradientCard.tsx`
  - [x] Document component interface and all current props
  - [x] Document current gradient preset constants and their values
  - [x] Note current TypeScript types (GradientPreset, etc.)
  - [x] Success: Component structure documented with all existing props and constants

#### Analyze Current Gradient System
- [x] Document gradient preset mappings
  - [x] Map each named preset (teal, blue, purple, sunset, ocean) to their CSS values
  - [x] Identify duplicate gradients (blue === ocean, etc.)
  - [x] Document which accent levels each preset uses
    ```typescript
    // Example mapping analysis:
    teal: 'from-[var(--color-accent-7)] to-[var(--color-accent-10)]'
    blue: 'from-[var(--color-accent-6)] to-[var(--color-accent-10)]'
    // etc.
    ```
  - [x] Success: Complete mapping of all presets with identified duplicates

#### Search for Current Usage Patterns
- [x] Find all GradientCard usage in codebase
  - [x] Search for `<GradientCard` across all files using grep or IDE search
  - [x] Document each usage location and props used
  - [x] Identify which gradient presets are actively used
  - [x] Note any `customGradient` usage patterns
  - [x] Success: Complete inventory of GradientCard usage with prop patterns documented

#### Create Analysis Document
- [x] Create analysis document
  - [x] Create directory: `project-artifacts/nextjs-template/analysis/`
  - [x] Create file: `gradientcard-current-state.md`
  - [x] Include YAML front matter with analysis metadata
  - [x] Document current interface, presets, and usage patterns
  - [x] Include migration mapping from legacy presets to new system
  - [x] Success: Comprehensive analysis document created with all findings

### Task 2: Update GradientCard TypeScript Interface

#### Remove Legacy Type Definitions
- [ ] Remove deprecated gradient types
  - [ ] Delete `GradientPreset` type definition (likely enum or union type)
  - [ ] Remove `gradient?: GradientPreset` prop from `GradientCardProps` interface
  - [ ] Remove any gradient preset constants or related types
  - [ ] Verify TypeScript compiles without errors after removal
  - [ ] Success: All legacy gradient types removed and TypeScript compiles

#### Add New Range-Based Gradient Props
- [ ] Add simple gradient control prop
  - [ ] Add `range?: number` prop to interface
  - [ ] Include comprehensive JSDoc documentation:
    ```typescript
    /**
     * Simple gradient range from background to accent (0-100)
     * 0 = barely visible (background → accent-1)
     * 25 = soft (background → accent-4)
     * 50 = moderate (background → accent-8) 
     * 75 = strong (background → accent-10)
     * 100 = maximum (background → accent-12)
     */
    range?: number;
    ```
  - [ ] Success: Range prop added with clear documentation

#### Add Advanced Accent-to-Accent Props
- [ ] Add precise gradient control props
  - [ ] Add `fromAccent?: number` prop with documentation:
    ```typescript
    /**
     * Advanced gradient: accent level to start from (1-12)
     * Must be used with toAccent
     */
    fromAccent?: number;
    ```
  - [ ] Add `toAccent?: number` prop with documentation:
    ```typescript
    /**
     * Advanced gradient: accent level to end at (1-12)
     * Must be used with fromAccent
     */
    toAccent?: number;
    ```
  - [ ] Success: Advanced gradient props added with clear usage documentation

#### Verify Interface Completeness
- [ ] Ensure backward compatibility
  - [ ] Confirm `customGradient?: string` prop remains unchanged
  - [ ] Verify all existing props (shimmer, overlayOpacity, etc.) are preserved
  - [ ] Run TypeScript compilation to verify no errors
  - [ ] Success: Interface is complete and compiles without errors

### Task 3: Implement Gradient Class Generation Logic

#### Remove Legacy Gradient Code
- [ ] Clean up legacy gradient implementation
  - [ ] Remove `gradientPresets` constant object from component file
  - [ ] Remove any helper functions related to legacy gradient handling
  - [ ] Remove legacy gradient selection logic from component body
  - [ ] Verify component still compiles after legacy code removal
  - [ ] Success: All legacy gradient code removed cleanly

#### Implement Range-to-Accent Level Mapping
- [ ] Create range mapping utility function
  - [ ] Implement `rangeToAccentLevel` function:
    ```typescript
    const rangeToAccentLevel = (range: number): number => {
      // Clamp range to 0-100
      const clampedRange = Math.max(0, Math.min(100, range));
      // Map 0-100 to accent levels 1-12
      return Math.round(1 + (clampedRange / 100) * 11);
    };
    ```
  - [ ] Add input validation for range parameter
  - [ ] Test function with edge cases (0, 100, negative values)
  - [ ] Success: Range mapping function works correctly with all inputs

#### Implement Range-Based Gradient Generation
- [ ] Create simple gradient class generator
  - [ ] Implement function to generate background-to-accent gradient classes:
    ```typescript
    const getSimpleGradientClass = (range: number): string => {
      const accentLevel = rangeToAccentLevel(range);
      return `bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-${accentLevel})]`;
    };
    ```
  - [ ] Verify gradient class format matches Tailwind CSS expectations
  - [ ] Success: Simple gradients generate proper Tailwind classes

#### Implement Accent-to-Accent Gradient Generation
- [ ] Create advanced gradient class generator
  - [ ] Implement function for accent-to-accent gradients:
    ```typescript
    const getAdvancedGradientClass = (fromAccent: number, toAccent: number): string => {
      // Validate accent levels are 1-12
      const clampedFrom = Math.max(1, Math.min(12, fromAccent));
      const clampedTo = Math.max(1, Math.min(12, toAccent));
      return `bg-gradient-to-br from-[var(--color-accent-${clampedFrom})] to-[var(--color-accent-${clampedTo})]`;
    };
    ```
  - [ ] Add validation for accent level parameters (1-12 range)
  - [ ] Success: Advanced gradients generate proper Tailwind classes

#### Implement Main Gradient Logic with Memoization
- [ ] Create memoized gradient class computation
  - [ ] Implement main gradient selection logic using `useMemo`:
    ```typescript
    const gradientClasses = useMemo(() => {
      if (customGradient) return '';
      
      if (fromAccent !== undefined && toAccent !== undefined) {
        return getAdvancedGradientClass(fromAccent, toAccent);
      } else if (range !== undefined) {
        return getSimpleGradientClass(range);
      }
      
      // Default fallback
      return 'bg-gradient-to-br from-[var(--background)] to-[var(--color-accent-8)]';
    }, [customGradient, range, fromAccent, toAccent]);
    ```
  - [ ] Verify memoization dependencies are correct
  - [ ] Test that gradient classes update when props change
  - [ ] Success: Gradient computation is properly memoized

#### Add Prop Validation
- [ ] Implement gradient prop validation
  - [ ] Add validation to ensure only one gradient system is used
  - [ ] Add console warnings for invalid prop combinations:
    ```typescript
    // Warn if both systems used simultaneously
    if (range !== undefined && (fromAccent !== undefined || toAccent !== undefined)) {
      console.warn('GradientCard: Cannot use both range and fromAccent/toAccent props');
    }
    ```
  - [ ] Add validation for incomplete advanced gradient props
  - [ ] Success: Proper validation prevents prop conflicts

### Task 4: Update Component Rendering Logic
- [ ] Update component to use new gradient class generation logic
- [ ] Remove all legacy gradient preset handling code
- [ ] Ensure `customGradient` prop continues to work unchanged
- [ ] Apply gradient classes to appropriate DOM element
- [ ] Verify all other component functionality remains intact
- **Success Criteria**: Component renders correctly with new gradient system and maintains all existing functionality

### Task 5: Create Unit Tests for New Gradient System

#### Set Up Test Infrastructure
- [ ] Create test file and basic setup
  - [ ] Create test file: `packages/ui-core/src/components/cards/__tests__/GradientCard.theme-aware.test.tsx`
  - [ ] Add necessary test imports:
    ```typescript
    import { render, screen } from '@testing-library/react';
    import { GradientCard } from '../GradientCard';
    import '@testing-library/jest-dom';
    ```
  - [ ] Create test describe block for "GradientCard Theme-Aware Functionality"
  - [ ] Success: Test file created with proper imports and structure

#### Test Range-Based Gradient Generation
- [ ] Test simple gradient range functionality
  - [ ] Test range=0 generates accent-1 gradient:
    ```typescript
    test('range=0 generates background to accent-1 gradient', () => {
      render(<GradientCard range={0}>Test</GradientCard>);
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('bg-gradient-to-br', 'from-[var(--background)]', 'to-[var(--color-accent-1)]');
    });
    ```
  - [ ] Test range=25 generates accent-4 gradient
  - [ ] Test range=50 generates accent-8 gradient  
  - [ ] Test range=75 generates accent-10 gradient
  - [ ] Test range=100 generates accent-12 gradient
  - [ ] Test invalid range values are clamped (negative, >100)
  - [ ] Success: All range-based gradient tests pass

#### Test Accent-to-Accent Gradient Generation
- [ ] Test advanced gradient functionality
  - [ ] Test fromAccent=7 toAccent=10 generates correct classes:
    ```typescript
    test('fromAccent/toAccent generates correct accent-to-accent gradient', () => {
      render(<GradientCard fromAccent={7} toAccent={10}>Test</GradientCard>);
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('bg-gradient-to-br', 'from-[var(--color-accent-7)]', 'to-[var(--color-accent-10)]');
    });
    ```
  - [ ] Test various fromAccent/toAccent combinations (1-12 range)
  - [ ] Test accent values are clamped to 1-12 range
  - [ ] Test incomplete accent props (only fromAccent or only toAccent)
  - [ ] Success: All accent-to-accent gradient tests pass

#### Test CustomGradient Override
- [ ] Test customGradient prop functionality
  - [ ] Test customGradient overrides range prop:
    ```typescript
    test('customGradient overrides range prop', () => {
      const customGradient = 'linear-gradient(135deg, red, blue)';
      const { container } = render(
        <GradientCard range={50} customGradient={customGradient}>Test</GradientCard>
      );
      expect(container.firstChild).toHaveStyle(`background-image: ${customGradient}`);
    });
    ```
  - [ ] Test customGradient overrides fromAccent/toAccent props
  - [ ] Test empty customGradient string behavior
  - [ ] Success: CustomGradient override behavior works correctly

#### Test Prop Validation and Edge Cases
- [ ] Test gradient system validation
  - [ ] Test warning when both range and fromAccent/toAccent are provided
  - [ ] Test incomplete fromAccent/toAccent combinations
  - [ ] Test default fallback gradient when no gradient props provided:
    ```typescript
    test('applies default gradient when no gradient props provided', () => {
      render(<GradientCard>Test</GradientCard>);
      const card = screen.getByText('Test').closest('div');
      expect(card).toHaveClass('bg-gradient-to-br', 'from-[var(--background)]', 'to-[var(--color-accent-8)]');
    });
    ```
  - [ ] Success: All validation and edge case tests pass

#### Test Performance and Memoization
- [ ] Test gradient computation memoization
  - [ ] Create test that verifies memoization prevents unnecessary recalculation
  - [ ] Test that gradient classes update when props change
  - [ ] Test that gradient classes don't change when unrelated props change
  - [ ] Success: Memoization behavior verified through testing

#### Verify Test Coverage
- [ ] Run test coverage analysis
  - [ ] Execute tests with coverage: `npm test -- --coverage`
  - [ ] Verify >90% code coverage for gradient-related functionality
  - [ ] Identify any untested code paths and add tests if needed
  - [ ] Success: Test coverage meets >90% threshold for gradient functionality

## Phase 2: Migration and Usage Updates

### Task 6: Identify and Update Template Usage

#### Search for Legacy Gradient Usage
- [ ] Perform comprehensive search for legacy gradient props
  - [ ] Search for `gradient="teal"` across all template files:
    ```bash
    grep -r 'gradient="teal"' templates/
    ```
  - [ ] Search for other legacy gradient presets:
    ```bash
    grep -r 'gradient="' templates/ | grep -E '(blue|purple|sunset|ocean)'
    ```
  - [ ] Search for any GradientCard usage with legacy props
  - [ ] Document all found instances with file paths and line numbers
  - [ ] Success: Complete inventory of legacy gradient usage created

#### Create Migration Plan
- [ ] Plan specific migrations for each found instance
  - [ ] Map `gradient="teal"` to `fromAccent={7} toAccent={10}`
  - [ ] Map `gradient="blue"` to `fromAccent={6} toAccent={10}`
  - [ ] Map `gradient="purple"` to `fromAccent={7} toAccent={11}`
  - [ ] Map `gradient="sunset"` to `fromAccent={5} toAccent={9}`
  - [ ] Map `gradient="ocean"` to `fromAccent={6} toAccent={10}`
  - [ ] Create before/after examples for each migration
  - [ ] Success: Migration plan created with exact prop mappings

#### Execute Template Migrations
- [ ] Update template files with new gradient props
  - [ ] Update each identified file using the migration mappings
  - [ ] Replace legacy gradient props with equivalent new props:
    ```typescript
    // Before:
    <GradientCard gradient="teal">
    
    // After:
    <GradientCard fromAccent={7} toAccent={10}>
    ```
  - [ ] Verify syntax is correct after each change
  - [ ] Success: All template files updated with new gradient props

#### Verify Migration Completeness
- [ ] Confirm no legacy props remain
  - [ ] Re-run search for legacy gradient props to ensure none remain
  - [ ] Check TypeScript compilation works with all changes
  - [ ] Build templates to ensure no runtime errors
  - [ ] Success: No legacy gradient props found, templates build successfully

#### Visual Verification
- [ ] Verify visual equivalence after migration
  - [ ] Start template development server: `npm run dev`
  - [ ] Navigate to pages with migrated GradientCard components
  - [ ] Compare visual appearance before/after migration (should be identical)
  - [ ] Test theme switching to ensure gradients adapt correctly
  - [ ] Success: Visual appearance identical and theme adaptation works

### Task 7: Update Landing Page Usage
- [ ] Locate current GradientCard usage in landing page with `customGradient`
- [ ] Replace `customGradient="linear-gradient(135deg, var(--color-accent-9), var(--color-accent-11))"` with `fromAccent={9} toAccent={11}`
- [ ] Verify visual appearance remains identical
- [ ] Test that gradient adapts to theme changes correctly
- **Success Criteria**: Landing page uses new gradient API with identical visual appearance and proper theme adaptation

### Task 8: Create Migration Validation Tests
- [ ] Create integration tests that verify visual equivalence of migrated gradients
- [ ] Test each legacy gradient mapping (teal → fromAccent=7,toAccent=10, etc.)
- [ ] Test that migrated gradients adapt correctly to theme changes
- [ ] Test both light and dark themes with migrated gradients
- **Success Criteria**: All migration tests pass confirming visual equivalence and proper theme adaptation

## Phase 3: Testing and Validation

### Task 9: Create Comprehensive Theme Integration Tests

#### Set Up Theme Testing Environment
- [ ] Create theme integration test suite
  - [ ] Create test file: `packages/ui-core/src/components/cards/__tests__/GradientCard.theme-integration.test.tsx`
  - [ ] Set up theme provider wrapper for tests:
    ```typescript
    import { ThemeProvider } from '@/components/theme-provider';
    
    const renderWithTheme = (component: React.ReactElement, theme: 'light' | 'dark') => {
      return render(
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      );
    };
    ```
  - [ ] Success: Theme testing infrastructure ready

#### Test Range-Based Gradients in Different Themes
- [ ] Test simple gradients adapt to theme backgrounds
  - [ ] Test range=50 in light theme generates proper background → accent-8 gradient
  - [ ] Test range=50 in dark theme generates proper background → accent-8 gradient
  - [ ] Verify background color variable changes between themes
  - [ ] Test multiple range values (25, 50, 75) in both themes
  - [ ] Success: Range-based gradients adapt correctly to theme backgrounds

#### Test Accent-to-Accent Gradients in Different Themes  
- [ ] Test advanced gradients adapt to theme accent colors
  - [ ] Test fromAccent=7 toAccent=10 in light theme
  - [ ] Test fromAccent=7 toAccent=10 in dark theme
  - [ ] Verify accent color variables change appropriately between themes
  - [ ] Test various accent combinations across both themes
  - [ ] Success: Accent gradients adapt correctly to theme color palettes

#### Test Dynamic Theme Switching
- [ ] Test gradient updates during theme changes
  - [ ] Render GradientCard in light theme
  - [ ] Switch to dark theme programmatically
  - [ ] Verify gradient classes update to use new theme variables
  - [ ] Test switching back to light theme
  - [ ] Test rapid theme switching doesn't cause errors
  - [ ] Success: Gradients update seamlessly during theme transitions

#### Test Multiple GradientCards
- [ ] Test multiple gradients on single page
  - [ ] Render page with 5+ GradientCards using different gradient configurations
  - [ ] Test mix of range-based and accent-to-accent gradients
  - [ ] Verify all gradients render correctly in light theme
  - [ ] Switch to dark theme and verify all gradients adapt
  - [ ] Test performance with many gradient cards
  - [ ] Success: Multiple gradients work correctly together across theme changes

### Task 10: Performance Testing and Optimization
- [ ] Measure rendering performance of GradientCard with new gradient system
- [ ] Verify memoization prevents unnecessary gradient class recomputation
- [ ] Test performance with rapid theme switching
- [ ] Test performance with multiple GradientCards (10+) on single page
- [ ] Profile memory usage and identify any performance regressions
- **Success Criteria**: No measurable performance degradation compared to legacy system, proper memoization confirmed

### Task 11: Create Visual Regression Tests

#### Set Up Visual Testing Infrastructure
- [ ] Install and configure visual testing tools
  - [ ] Install Playwright or similar visual testing framework
  - [ ] Configure visual testing setup in test environment
  - [ ] Create visual test directory: `packages/ui-core/src/components/cards/__tests__/visual/`
  - [ ] Set up test page component for consistent gradient testing
  - [ ] Success: Visual testing infrastructure ready

#### Create Reference Screenshots for Light Theme
- [ ] Generate light theme reference images
  - [ ] Create test page with range-based gradients (0, 25, 50, 75, 100):
    ```typescript
    const RangeTestPage = () => (
      <div style={{ padding: '20px', display: 'grid', gap: '10px' }}>
        <GradientCard range={0}>Range 0</GradientCard>
        <GradientCard range={25}>Range 25</GradientCard>
        <GradientCard range={50}>Range 50</GradientCard>
        <GradientCard range={75}>Range 75</GradientCard>
        <GradientCard range={100}>Range 100</GradientCard>
      </div>
    );
    ```
  - [ ] Capture screenshots for all range values in light theme
  - [ ] Create test page with accent-to-accent gradients (various combinations)
  - [ ] Capture screenshots for accent gradients in light theme
  - [ ] Success: Light theme reference images captured

#### Create Reference Screenshots for Dark Theme  
- [ ] Generate dark theme reference images
  - [ ] Switch to dark theme and capture same range-based gradients
  - [ ] Capture accent-to-accent gradients in dark theme
  - [ ] Ensure consistent lighting and display conditions
  - [ ] Verify screenshots show proper theme adaptation
  - [ ] Success: Dark theme reference images captured

#### Create Automated Visual Regression Tests
- [ ] Implement visual comparison tests
  - [ ] Create visual test for range-based gradients:
    ```typescript
    test('range-based gradients visual regression - light theme', async ({ page }) => {
      await page.goto('/test-gradients-range');
      await expect(page).toHaveScreenshot('gradients-range-light.png');
    });
    ```
  - [ ] Create visual test for accent-to-accent gradients
  - [ ] Create tests for both light and dark themes
  - [ ] Configure image comparison thresholds for consistency
  - [ ] Success: Automated visual tests created and passing

#### Test Gradient Rendering Across Full Accent Range
- [ ] Create comprehensive accent level tests
  - [ ] Create test matrix for all accent levels (1-12) in various combinations
  - [ ] Test edge cases: accent-1 to accent-12, accent-12 to accent-1
  - [ ] Test same-accent combinations (accent-5 to accent-5)
  - [ ] Capture reference images for accent level variations
  - [ ] Success: Full accent range visually tested and documented

#### Validate Visual Test Suite
- [ ] Run complete visual regression test suite
  - [ ] Execute all visual tests in both light and dark themes
  - [ ] Verify all tests pass with current implementation
  - [ ] Test suite catches visual regressions when gradient logic changes
  - [ ] Document how to update reference images when intentional changes occur
  - [ ] Success: Complete visual regression test suite operational

## Phase 4: Documentation and Cleanup

### Task 12: Update Component Documentation  
- [ ] Update GradientCard component JSDoc with new gradient system explanation
- [ ] Document both simple range-based and advanced accent-to-accent usage patterns
- [ ] Provide code examples for common gradient configurations
- [ ] Document migration path from legacy gradient presets
- [ ] Update any existing component documentation files
- **Success Criteria**: Comprehensive documentation available explaining new gradient system with clear usage examples

### Task 13: Remove Legacy Code and Cleanup
- [ ] Remove all unused gradient preset constants
- [ ] Remove legacy gradient handling functions
- [ ] Remove deprecated TypeScript types
- [ ] Clean up any dead code related to old gradient system
- [ ] Update imports and dependencies if needed
- **Success Criteria**: All legacy gradient code removed, no unused imports or dead code remains

### Task 14: Build and Validation

#### TypeScript Compilation Validation
- [ ] Verify TypeScript compilation across all packages
  - [ ] Run `pnpm type-check` in ui-core package and ensure no errors
  - [ ] Run `pnpm type-check` in template packages and ensure no errors
  - [ ] Verify no TypeScript errors in GradientCard component
  - [ ] Check that new gradient prop types are properly recognized
  - [ ] Success: TypeScript compilation passes for all packages

#### ESLint and Code Quality Checks  
- [ ] Run linting checks on modified files
  - [ ] Run ESLint on GradientCard component: `npx eslint packages/ui-core/src/components/cards/GradientCard.tsx`
  - [ ] Run ESLint on all test files created
  - [ ] Fix any linting errors or warnings
  - [ ] Verify code follows project style guidelines
  - [ ] Success: All linting checks pass with no errors or warnings

#### Test Suite Execution
- [ ] Execute comprehensive test suite
  - [ ] Run unit tests: `npm test -- --testPathPattern=GradientCard`
  - [ ] Run theme integration tests
  - [ ] Run visual regression tests
  - [ ] Run migration validation tests
  - [ ] Verify all test suites achieve 100% pass rate
  - [ ] Check test coverage meets requirements (>90%)
  - [ ] Success: All tests pass with adequate coverage

#### Build Process Validation
- [ ] Execute build process for all packages
  - [ ] Build ui-core package: `pnpm build` in packages/ui-core
  - [ ] Build template packages: `pnpm build` in templates/nextjs
  - [ ] Verify no build errors or warnings
  - [ ] Check that built assets include new gradient functionality
  - [ ] Success: All packages build successfully without errors

#### Template Integration Testing
- [ ] Test updated templates with new GradientCard
  - [ ] Start template development server: `npm run dev` 
  - [ ] Navigate to pages using GradientCard components
  - [ ] Verify gradients render correctly in browser
  - [ ] Test theme switching functionality
  - [ ] Test gradient interactivity and responsiveness
  - [ ] Success: Templates work correctly with updated GradientCard

#### Final Validation Checklist
- [ ] Complete slice requirements validation
  - [ ] Verify dual gradient control system works (range + accent-to-accent)
  - [ ] Confirm zero visual impact migration completed
  - [ ] Test theme-aware gradient adaptation
  - [ ] Verify clean API with no confusing named presets
  - [ ] Confirm performance meets requirements
  - [ ] Success: All slice objectives achieved and validated

## Success Validation Checklist

- [ ] **Functional**: GradientCard adapts seamlessly to theme changes
- [ ] **Dual Control**: Both simple range and advanced accent-to-accent systems work correctly
- [ ] **Zero Visual Impact**: Migration preserves exact appearance of existing gradients
- [ ] **Performance**: No measurable rendering performance degradation
- [ ] **Clean API**: Named presets eliminated, clear numeric control provided
- [ ] **Developer Experience**: Intuitive gradient specification for both simple and advanced cases
- [ ] **Type Safety**: Full TypeScript support with proper prop validation
- [ ] **Test Coverage**: Comprehensive test coverage for all gradient functionality

---

*Each task must be completed in order and marked as complete before proceeding to the next task. Tasks should be granular enough for a junior AI to execute with clear success criteria.*