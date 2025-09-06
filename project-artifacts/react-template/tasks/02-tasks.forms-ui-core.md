---
slice: forms-ui-core
project: manta-templates
lld_reference: ../slices/020-slice-forms-ui-1.md
dependencies: ["@radix-ui/react-checkbox", "@radix-ui/react-radio-group", "@radix-ui/react-select", "@radix-ui/react-label", "react-hook-form", "zod"]
projectState: "Completed Radio, Select, and Form Provider Infrastructure"
status: phase_2_completed

lastUpdated: 2025-09-06T16:45:00Z
phase2_completedAt: 2025-09-05
phaseCompleted: 8
---

# Task Breakdown: Forms UI Core Slice

## Context Summary

Implementing core form controls (Input, Textarea, Checkbox, Radio, Select, Label, FormField, Form) for manta-templates. All components will integrate with the existing theme system using semantic CSS variables, Radix UI primitives for accessibility, and CVA for variant management. Development will follow the workflow: implement in `templates/react/src/lib/ui-core`, then copy to `packages/src/lib/ui-core` for propagation.

## Phase 1: Foundation Setup (Effort: 2)

### Task 1.1: Project Setup and Dependencies
- [x] Navigate to `{monorepo-root}/templates/react` directory
- [x] Install Radix UI form primitives: `@radix-ui/react-label`
- [x] Install React Hook Form: `react-hook-form`
- [x] Install Zod: `zod` and `@hookform/resolvers`
- [x] Verify existing CVA and cn utility availability
- **Success**: All dependencies installed, no version conflicts

### Task 1.2: Create Form Component Directory Structure
- [x] Create `templates/react/src/lib/ui-core/components/form/` directory
- [x] Create placeholder files: `input.tsx`, `textarea.tsx`, `checkbox.tsx`
- [x] Create placeholder files: `radio.tsx`, `select.tsx`, `label.tsx`
- [x] Create placeholder files: `form-field.tsx`, `form.tsx`, `index.ts`
- [x] Add barrel export in `form/index.ts`
- **Success**: Directory structure ready, all files created

### Task 1.3: Create Form-Specific Styles
- [x] Create `templates/react/src/lib/ui-core/styles/forms.css`
- [x] Add form-specific CSS variable mappings for semantic colors
- [x] Define focus ring styles using `--color-accent-a4`
- [x] Define error state colors using destructive tokens
- [x] Import forms.css in main style index
- **Success**: Form styles integrated with theme system

## Phase 2: First Vertical Slice - Input Component (Effort: 3) [COMPLETED]

### Task 2.1: Implement Basic Input Component
- [x] Create Input component with base HTML input extension
- [x] Add CVA variants: `default`, `ghost`, `filled`
- [x] Add size variants: `sm`, `md`, `lg` with proper heights
- [x] Apply semantic color variables for borders and backgrounds
- [x] Export from `form/index.ts`
- **Success**: Basic Input renders with theme colors

### Task 2.2: Add Input State and Icon Support
- [x] Add state prop: `default`, `error`, `success`, `warning`
- [x] Implement leftIcon and rightIcon slots with proper spacing
- [x] Add disabled and readonly visual states
- [x] Add focus ring with `--color-accent-8` border
- [x] Create TypeScript interface with proper types
- **Success**: Input shows all states and icon positions correctly

### Task 2.3: Create Input Demo Page
- [x] Create `templates/react/src/pages/forms-demo.tsx`
- [x] Add Input examples with all variants
- [x] Add theme switcher to test with different accents
- [x] Add dark/light mode toggle
- [x] Test keyboard navigation and focus states
- **Success**: Input fully functional with theme switching

### Phase 2 Summary
- **Status**: ✓ COMPLETED
- **Build**: Succeeded
- **Commit**: Made successfully

## Phase 3: Label and FormField Infrastructure (Effort: 2)

### Task 3.1: Implement Label Component
- [x] Install `@radix-ui/react-label` if not already installed
- [x] Create Label component wrapping Radix primitive
- [x] Add size variants matching Input sizes
- [x] Add required indicator (*) styling
- [x] Add optional text suffix support
- [x] Add disabled state styling
- **Success**: Labels properly associate with form controls

### Task 3.2: Implement FormField Wrapper
- [x] Create FormField component for consistent layout
- [x] Add label, description, and error message slots
- [x] Implement automatic ARIA relationships (aria-describedby, aria-labelledby)
- [x] Add error state propagation to child components
- [x] Create consistent spacing using Tailwind utilities
- **Success**: FormField provides consistent form layouts

### Task 3.3: Test Input with FormField
- [x] Update demo page with FormField-wrapped Inputs
- [x] Test error message display
- [x] Verify ARIA relationships with screen reader
- [x] Test required field indicators
- [x] Ensure proper spacing and alignment
- **Success**: Complete Input + FormField vertical slice working

## Phase 4: Textarea Component (Effort: 2)

### Task 4.1: Implement Textarea Component
- [x] Create Textarea extending HTML textarea
- [x] Apply same CVA variants as Input component
- [x] Add same state variants (error, success, warning)
- [x] Apply consistent theme integration
- [x] Match Input component's border and focus styles
- **Success**: Textarea matches Input styling

### Task 4.2: Add Auto-Resize Functionality
- [x] Implement autoResize prop with useEffect hook
- [x] Add minRows and maxRows constraints
- [x] Calculate height based on scrollHeight
- [x] Handle content changes smoothly
- [x] Prevent layout shift during resize
- **Success**: Textarea resizes smoothly with content

### Task 4.3: Integrate Textarea in Demo
- [x] Add Textarea examples to forms-demo page
- [x] Test with FormField wrapper
- [x] Test auto-resize with various content
- [x] Verify theme integration
- [x] Test in both light and dark modes
- **Success**: Textarea fully integrated with consistent behavior

## Phase 5: Checkbox Component (Effort: 3)

### Task 5.1: Implement Basic Checkbox
- [x] Install `@radix-ui/react-checkbox`
- [x] Create Checkbox component with Radix primitive
- [x] Add size variants: `sm`, `md`, `lg`
- [x] Style checkbox indicator with accent color
- [x] Add custom check icon using Lucide
- **Success**: Checkbox renders with theme colors

### Task 5.2: Add Checkbox Features
- [x] Implement indeterminate state with minus icon
- [x] Add label integration for clickable labels
- [x] Add description support with proper ARIA relationships
- [x] Add disabled state styling
- [x] Add focus ring matching other components
- [x] Create proper TypeScript interfaces
- **Success**: Checkbox supports all states

### Task 5.3: Create CheckboxGroup Component
- [x] Create CheckboxGroup wrapper component
- [x] Add value array management (controlled and uncontrolled)
- [x] Implement horizontal/vertical orientation options
- [x] Add group-level disabled state support
- [x] Handle onChange for multiple selections properly
- [x] Options-based configuration with labels and descriptions
- **Success**: CheckboxGroup manages multiple checkboxes

### Task 5.4: Test Checkbox Components
- [x] Add comprehensive Checkbox examples to demo page
- [x] Tested single and group configurations extensively
- [x] Tested indeterminate state with minus icons
- [x] Verified keyboard navigation (Space key functionality)
- [x] Tested with different themes, sizes, and variants
- [x] Added real-world examples (account settings, privacy cookies)
- **Success**: Checkboxes fully functional

## Phase 6: Radio Component (Effort: 3)

### Task 6.1: Implement RadioGroup Component
- [x] Install `@radix-ui/react-radio-group`
- [x] Create RadioGroup with Radix primitive
- [x] Add orientation prop: horizontal/vertical
- [x] Add size variants matching other components
- [x] Apply theme colors to radio indicators
- **Success**: RadioGroup renders with proper layout

### Task 6.2: Implement RadioItem Component
- [x] Create RadioItem component for group children
- [x] Style radio indicator with accent color
- [x] Add disabled state for individual items
- [x] Add focus ring for keyboard navigation
- [x] Ensure proper label association
- **Success**: Radio items selectable with theme integration

### Task 6.3: Test Radio Components
- [x] Add RadioGroup examples to demo page
- [x] Test horizontal and vertical layouts
- [x] Test keyboard navigation (arrows)
- [x] Verify single selection behavior
- [x] Test with FormField wrapper
- **Success**: Radio groups fully functional

## Phase 7: Select Component (Effort: 4)

### Task 7.1: Implement Basic Select
- [x] Install `@radix-ui/react-select`
- [x] Create Select component with trigger and content
- [x] Style trigger to match Input component
- [x] Add placeholder support
- [x] Implement portal-based dropdown
- **Success**: Select opens and closes properly

### Task 7.2: Style Select Content
- [x] Style dropdown content with theme colors
- [x] Add proper shadows and borders
- [x] Style select items with hover states
- [x] Add check icon for selected items
- [x] Ensure proper z-index layering
- **Success**: Dropdown styled consistently

### Task 7.3: Add Select Features
- [x] Add size variants: `sm`, `md`, `lg`
- [x] Add variant styles: `default`, `ghost`, `filled`
- [x] Implement keyboard navigation
- [x] Add disabled state for select and items
- [x] Add scroll area for long lists
- **Success**: Select fully featured

### Task 7.4: Add Search/Filter Capability
- [x] Add searchable prop to enable filtering
- [x] Create search input within dropdown
- [x] Implement filter logic for items
- [x] Handle keyboard input in search mode
- [x] Maintain focus management
- **Success**: Searchable select works smoothly

### Task 7.5: Test Select Component
- [x] Add Select examples to demo page
- [x] Test with many items (scrolling)
- [x] Test search functionality
- [x] Verify keyboard navigation
- [x] Test with different themes
- **Success**: Select component production-ready

## Phase 8: Form Provider Infrastructure (Effort: 3)

### Task 8.1: Create Form Component
- [x] Create Form component wrapping form element
- [x] Integrate React Hook Form's useForm
- [x] Add validation prop for Zod schemas
- [x] Add defaultValues support
- [x] Handle form submission
- **Success**: Form manages state properly

### Task 8.2: Add Validation Integration
- [x] Install `@hookform/resolvers/zod`
- [x] Create validation integration with Zod
- [x] Add error handling and display
- [x] Implement field-level validation
- [x] Add form-level validation
- **Success**: Validation works with error display

### Task 8.3: Connect FormField to Form Context
- [x] Update FormField to use React Hook Form context
- [x] Auto-connect form controls to form state
- [x] Display validation errors automatically
- [x] Handle touched/dirty states
- [x] Add loading state during submission
- **Success**: Form controls auto-register with form

### Task 8.4: Create Complete Form Example
- [x] Create login form example with validation
- [x] Add registration form with complex validation
- [x] Test error display and clearing
- [x] Test form submission handling
- [x] Verify accessibility with screen reader
- **Success**: Complete forms work end-to-end

## Phase 9: Cross-Template Testing (Effort: 2)

### Task 9.0: Refactor CVA Variants to Use UI Prefixes (Effort: 2)
Replace all CVA variant prop names with "ui" prefixes to avoid HTML/Radix conflicts
- [x] Update Input: `size` → `uiSize`, `variant` → `uiVariant`, `state` → `uiState`
- [x] Update Label: `size` → `uiSize`, `state` → `uiState`
- [x] Update Textarea: `size` → `uiSize`, `variant` → `uiVariant`, `state` → `uiState`  
- [x] Update Checkbox: `size` → `uiSize`, `variant` → `uiVariant` (including CheckboxGroup orientation → `uiOrientation`)
- [x] Update RadioGroup: `orientation` → `uiOrientation`, `size` → `uiSize`
- [x] Update Select: `position` → `uiPosition`, `size` → `uiSize`, `variant` → `uiVariant`
- [x] Update FormField: `spacing` → `uiSpacing`
- [x] Remove all `Omit<>` type exclusions from interfaces
- [x] Update FormsDemo page to use new prop names
- **Success**: All form components use ui-prefixed variants with no type conflicts

### Task 9.1: Copy to Packages Directory
- [x] Copy all form components to `packages/src/lib/ui-core/components/form/`
- [x] Copy form styles to `packages/src/lib/ui-core/styles/`
- [x] Update package exports
- [x] Run `pnpm copy-packages:react` to propagate
- [x] Verify files copied correctly
- **Success**: Components in packages directory

### Task 9.2: Test in Next.js Template
- [ ] Run `pnpm copy-packages:nextjs`
- [ ] Create test page in Next.js template
- [ ] Test SSR compatibility
- [ ] Verify theme integration works
- [ ] Test all components render correctly
- **Success**: Forms work in Next.js

### Task 9.3: Test in Electron Template
- [ ] Run `pnpm copy-packages:electron`
- [ ] Create test window with forms
- [ ] Test native input behaviors
- [ ] Verify theme switching works
- [ ] Test keyboard navigation
- **Success**: Forms work in Electron

## Phase 10: Documentation and Polish (Effort: 2)

### Task 10.1: Create Component Documentation
- [ ] Document Input component API and examples
- [ ] Document Textarea with auto-resize examples
- [ ] Document Checkbox and CheckboxGroup usage
- [ ] Document RadioGroup patterns
- [ ] Document Select with search examples
- [ ] Document Form and validation patterns
- **Success**: Complete API documentation

### Task 10.2: Create Storybook Stories (if enabled)
- [ ] Create Input stories with all variants
- [ ] Create Textarea stories
- [ ] Create Checkbox stories
- [ ] Create Radio stories  
- [ ] Create Select stories
- [ ] Create Form composition stories
- **Success**: Interactive documentation available

### Task 10.3: Performance Optimization
- [ ] Add React.memo to form components
- [ ] Implement debounced validation (300ms)
- [ ] Optimize re-renders with useCallback
- [ ] Test bundle size impact
- [ ] Ensure tree-shaking works
- **Success**: Components performant and optimized

### Task 10.4: Final Testing and Cleanup
- [ ] Run linting and fix any issues
- [ ] Run TypeScript check, fix any errors
- [ ] Test all components with all theme accents
- [ ] Verify WCAG AA compliance
- [ ] Remove any console.logs or debug code
- [ ] Update main component exports
- **Success**: Production-ready form components

## Completion Checklist

### Deliverables
- [x] All 8 form components implemented
- [x] Theme integration working across all components
- [x] TypeScript errors in Phase 8 form components resolved
- [x] React DOM prop warnings fixed
- [x] Form system working with React Hook Form integration
- [x] All components build successfully
- [x] Components copied to the packages directory
- [ ] Components working in all three templates
- [ ] Comprehensive demo page created
- [ ] Documentation complete
- [ ] All tests passing
- [ ] TypeScript types exported
- [ ] Accessibility verified

### Quality Gates
- [ ] No TypeScript errors
- [ ] No linting errors  
- [ ] Theme switching works perfectly
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Bundle size acceptable
- [ ] Performance metrics met
- [ ] 90%+ test coverage achieved