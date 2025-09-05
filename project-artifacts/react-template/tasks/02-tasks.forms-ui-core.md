---
slice: forms-ui-core
project: manta-templates
lld_reference: ../slices/020-slice-forms-ui-1.md
dependencies: ["@radix-ui/react-checkbox", "@radix-ui/react-radio-group", "@radix-ui/react-select", "@radix-ui/react-label", "react-hook-form", "zod"]
projectState: "Adding themed form controls to all templates with semantic color integration"
status: phase_1_completed
lastUpdated: 2025-09-05
phaseCompleted: 1
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

## Phase 2: First Vertical Slice - Input Component (Effort: 3)

### Task 2.1: Implement Basic Input Component
- [ ] Create Input component with base HTML input extension
- [ ] Add CVA variants: `default`, `ghost`, `filled`
- [ ] Add size variants: `sm`, `md`, `lg` with proper heights
- [ ] Apply semantic color variables for borders and backgrounds
- [ ] Export from `form/index.ts`
- **Success**: Basic Input renders with theme colors

### Task 2.2: Add Input State and Icon Support
- [ ] Add state prop: `default`, `error`, `success`, `warning`
- [ ] Implement leftIcon and rightIcon slots with proper spacing
- [ ] Add disabled and readonly visual states
- [ ] Add focus ring with `--color-accent-8` border
- [ ] Create TypeScript interface with proper types
- **Success**: Input shows all states and icon positions correctly

### Task 2.3: Create Input Demo Page
- [ ] Create `templates/react/src/pages/forms-demo.tsx`
- [ ] Add Input examples with all variants
- [ ] Add theme switcher to test with different accents
- [ ] Add dark/light mode toggle
- [ ] Test keyboard navigation and focus states
- **Success**: Input fully functional with theme switching

## Phase 3: Label and FormField Infrastructure (Effort: 2)

### Task 3.1: Implement Label Component
- [ ] Install `@radix-ui/react-label` if not already installed
- [ ] Create Label component wrapping Radix primitive
- [ ] Add size variants matching Input sizes
- [ ] Add required indicator (*) styling
- [ ] Add optional text suffix support
- [ ] Add disabled state styling
- **Success**: Labels properly associate with form controls

### Task 3.2: Implement FormField Wrapper
- [ ] Create FormField component for consistent layout
- [ ] Add label, description, and error message slots
- [ ] Implement automatic ARIA relationships (aria-describedby, aria-labelledby)
- [ ] Add error state propagation to child components
- [ ] Create consistent spacing using Tailwind utilities
- **Success**: FormField provides consistent form layouts

### Task 3.3: Test Input with FormField
- [ ] Update demo page with FormField-wrapped Inputs
- [ ] Test error message display
- [ ] Verify ARIA relationships with screen reader
- [ ] Test required field indicators
- [ ] Ensure proper spacing and alignment
- **Success**: Complete Input + FormField vertical slice working

## Phase 4: Textarea Component (Effort: 2)

### Task 4.1: Implement Textarea Component
- [ ] Create Textarea extending HTML textarea
- [ ] Apply same CVA variants as Input component
- [ ] Add same state variants (error, success, warning)
- [ ] Apply consistent theme integration
- [ ] Match Input component's border and focus styles
- **Success**: Textarea matches Input styling

### Task 4.2: Add Auto-Resize Functionality
- [ ] Implement autoResize prop with useEffect hook
- [ ] Add minRows and maxRows constraints
- [ ] Calculate height based on scrollHeight
- [ ] Handle content changes smoothly
- [ ] Prevent layout shift during resize
- **Success**: Textarea resizes smoothly with content

### Task 4.3: Integrate Textarea in Demo
- [ ] Add Textarea examples to forms-demo page
- [ ] Test with FormField wrapper
- [ ] Test auto-resize with various content
- [ ] Verify theme integration
- [ ] Test in both light and dark modes
- **Success**: Textarea fully integrated with consistent behavior

## Phase 5: Checkbox Component (Effort: 3)

### Task 5.1: Implement Basic Checkbox
- [ ] Install `@radix-ui/react-checkbox`
- [ ] Create Checkbox component with Radix primitive
- [ ] Add size variants: `sm`, `md`, `lg`
- [ ] Style checkbox indicator with accent color
- [ ] Add custom check icon using Lucide
- **Success**: Checkbox renders with theme colors

### Task 5.2: Add Checkbox Features
- [ ] Implement indeterminate state with minus icon
- [ ] Add label integration for clickable labels
- [ ] Add disabled state styling
- [ ] Add focus ring matching other components
- [ ] Create proper TypeScript interfaces
- **Success**: Checkbox supports all states

### Task 5.3: Create CheckboxGroup Component
- [ ] Create CheckboxGroup wrapper component
- [ ] Add value array management
- [ ] Implement horizontal/vertical orientation
- [ ] Add group-level disabled state
- [ ] Handle onChange for multiple selections
- **Success**: CheckboxGroup manages multiple checkboxes

### Task 5.4: Test Checkbox Components
- [ ] Add Checkbox examples to demo page
- [ ] Test single and group configurations
- [ ] Test indeterminate state
- [ ] Verify keyboard navigation (Space key)
- [ ] Test with different themes and modes
- **Success**: Checkboxes fully functional

## Phase 6: Radio Component (Effort: 3)

### Task 6.1: Implement RadioGroup Component
- [ ] Install `@radix-ui/react-radio-group`
- [ ] Create RadioGroup with Radix primitive
- [ ] Add orientation prop: horizontal/vertical
- [ ] Add size variants matching other components
- [ ] Apply theme colors to radio indicators
- **Success**: RadioGroup renders with proper layout

### Task 6.2: Implement RadioItem Component
- [ ] Create RadioItem component for group children
- [ ] Style radio indicator with accent color
- [ ] Add disabled state for individual items
- [ ] Add focus ring for keyboard navigation
- [ ] Ensure proper label association
- **Success**: Radio items selectable with theme integration

### Task 6.3: Test Radio Components
- [ ] Add RadioGroup examples to demo page
- [ ] Test horizontal and vertical layouts
- [ ] Test keyboard navigation (arrows)
- [ ] Verify single selection behavior
- [ ] Test with FormField wrapper
- **Success**: Radio groups fully functional

## Phase 7: Select Component (Effort: 4)

### Task 7.1: Implement Basic Select
- [ ] Install `@radix-ui/react-select`
- [ ] Create Select component with trigger and content
- [ ] Style trigger to match Input component
- [ ] Add placeholder support
- [ ] Implement portal-based dropdown
- **Success**: Select opens and closes properly

### Task 7.2: Style Select Content
- [ ] Style dropdown content with theme colors
- [ ] Add proper shadows and borders
- [ ] Style select items with hover states
- [ ] Add check icon for selected items
- [ ] Ensure proper z-index layering
- **Success**: Dropdown styled consistently

### Task 7.3: Add Select Features
- [ ] Add size variants: `sm`, `md`, `lg`
- [ ] Add variant styles: `default`, `ghost`, `filled`
- [ ] Implement keyboard navigation
- [ ] Add disabled state for select and items
- [ ] Add scroll area for long lists
- **Success**: Select fully featured

### Task 7.4: Add Search/Filter Capability
- [ ] Add searchable prop to enable filtering
- [ ] Create search input within dropdown
- [ ] Implement filter logic for items
- [ ] Handle keyboard input in search mode
- [ ] Maintain focus management
- **Success**: Searchable select works smoothly

### Task 7.5: Test Select Component
- [ ] Add Select examples to demo page
- [ ] Test with many items (scrolling)
- [ ] Test search functionality
- [ ] Verify keyboard navigation
- [ ] Test with different themes
- **Success**: Select component production-ready

## Phase 8: Form Provider Infrastructure (Effort: 3)

### Task 8.1: Create Form Component
- [ ] Create Form component wrapping form element
- [ ] Integrate React Hook Form's useForm
- [ ] Add validation prop for Zod schemas
- [ ] Add defaultValues support
- [ ] Handle form submission
- **Success**: Form manages state properly

### Task 8.2: Add Validation Integration
- [ ] Install `@hookform/resolvers/zod`
- [ ] Create validation integration with Zod
- [ ] Add error handling and display
- [ ] Implement field-level validation
- [ ] Add form-level validation
- **Success**: Validation works with error display

### Task 8.3: Connect FormField to Form Context
- [ ] Update FormField to use React Hook Form context
- [ ] Auto-connect form controls to form state
- [ ] Display validation errors automatically
- [ ] Handle touched/dirty states
- [ ] Add loading state during submission
- **Success**: Form controls auto-register with form

### Task 8.4: Create Complete Form Example
- [ ] Create login form example with validation
- [ ] Add registration form with complex validation
- [ ] Test error display and clearing
- [ ] Test form submission handling
- [ ] Verify accessibility with screen reader
- **Success**: Complete forms work end-to-end

## Phase 9: Cross-Template Testing (Effort: 2)

### Task 9.1: Copy to Packages Directory
- [ ] Copy all form components to `packages/src/lib/ui-core/components/ui/form/`
- [ ] Copy form styles to `packages/src/lib/ui-core/styles/`
- [ ] Update package exports
- [ ] Run `pnpm copy-packages:react` to propagate
- [ ] Verify files copied correctly
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
- [ ] All 8 form components implemented
- [ ] Theme integration working across all components
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