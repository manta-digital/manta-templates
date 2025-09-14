---
slice: combo-box
project: manta-templates
lld: project-artifacts/react-template/slices/025-slice.combo-box.md
dependencies: []
projectState: React template with existing form components (Input, Select, Textarea) using Radix UI + CVA + Tailwind 4
lastUpdated: 2025-09-14
---

## Context Summary
- Working on combo-box slice for manta-templates project
- Current project state: Established UI component library with Input, Select, Textarea using Radix patterns
- Development approach: Build and test in templates/react first, then promote to packages and propagate
- Key dependencies: Will add @downshift-js/downshift for useCombobox hook
- What this slice delivers: Full-featured, accessible combo box component with filtering and theme integration
- Next planned slice: TBD by Project Manager

## Task 1: Project Setup and Dependencies  
**Owner**: Junior AI  
**Dependencies**: None  
**Objective**: Add required dependencies to templates/react for initial development and testing.
**Effort**: 1/5

### Setup Tasks:
- [x] **Add Downshift dependency to React template**:
  - Navigate to `templates/react/` directory
  - Add `@downshift-js/downshift` to templates/react/package.json
  - Run `pnpm install` from templates/react directory
  - Verify installation succeeded without conflicts

- [x] **Update AI support scripts**:
  - Ensure `snippets/npm-scripts.ai-support.json` scripts are present in package.json
  - Add any combo box specific build or test scripts if needed

- [x] **Verify existing dependencies**:
  - Confirm `class-variance-authority` is available for CVA patterns
  - Confirm `lucide-react` is available for icons
  - Confirm Radix UI packages are available for styling consistency

**Success Criteria**:
- [x] `@downshift-js/downshift` successfully installed in templates/react
- [x] React template builds without errors after dependency addition
- [x] All existing form components still function correctly

## Task 2: Create Core ComboBox Component Structure
**Owner**: Junior AI  
**Dependencies**: Task 1  
**Objective**: Create the main ComboBox component in templates/react for development and testing.
**Effort**: 3/5

### Component Structure Tasks:
- [x] **Create main component file in React template**:
  - File: `templates/react/src/lib/ui-core/components/form/combobox.tsx`
  - Import required dependencies (`useCombobox`, React, CVA, icons)
  - Set up basic TypeScript interfaces following existing form component patterns

- [x] **Define TypeScript interfaces**:
  - `ComboBoxProps` interface with all required props from design
  - `ComboBoxOption` interface for option data structure
  - Export interfaces for external usage

- [x] **Create CVA variants**:
  - `comboBoxTriggerVariants` following existing Input/Select patterns
  - `comboBoxContentVariants` for dropdown styling
  - `comboBoxItemVariants` for option styling
  - Support uiVariant, uiSize, uiState props

- [x] **Component architecture setup**:
  - Main ComboBox component using forwardRef pattern
  - Filter out React Hook Form props (isDirty, isTouched)
  - Set up useCombobox hook integration structure

**Success Criteria**:
- [x] Component file created in templates/react with proper TypeScript types
- [x] CVA variants defined following existing patterns
- [x] File imports and exports without TypeScript errors
- [x] Component structure ready for hook integration

## Task 3: Implement useCombobox Hook Integration
**Owner**: Junior AI  
**Dependencies**: Task 2  
**Objective**: Integrate Downshift's useCombobox hook with our component architecture.
**Effort**: 4/5

### Hook Integration Tasks:
- [ ] **Set up useCombobox hook**:
  - Configure hook with proper items, filtering, and state management
  - Handle `onSelectedItemChange` to trigger `onValueChange` prop
  - Set up input value filtering logic with default filter function

- [ ] **Connect hook props to components**:
  - Apply `getInputProps()` to input element
  - Apply `getToggleButtonProps()` to toggle button
  - Apply `getMenuProps()` to dropdown container
  - Apply `getItemProps()` to each option item

- [ ] **Implement filtering logic**:
  - Default filter function (case-insensitive startsWith)
  - Support for custom `filterFunction` prop
  - Handle empty states when no options match

- [ ] **State management**:
  - Handle controlled vs uncontrolled component patterns
  - Properly sync internal state with external value prop
  - Clear functionality integration

**Success Criteria**:
- [ ] useCombobox hook properly integrated with component
- [ ] Filtering works correctly with typed input
- [ ] Keyboard navigation functions (arrow keys, Enter, Escape)
- [ ] State synchronization works for controlled/uncontrolled usage

## Task 4: Implement ComboBox Trigger Component
**Owner**: Junior AI  
**Dependencies**: Task 3  
**Objective**: Create the trigger component containing input field and toggle button.
**Effort**: 2/5

### Trigger Component Tasks:
- [ ] **Create trigger wrapper**:
  - Apply `comboBoxTriggerVariants` with proper variant props
  - Handle focus states and visual feedback
  - Support all size and state variants

- [ ] **Implement input field**:
  - Apply input props from `getInputProps()`
  - Support placeholder text
  - Handle disabled state styling
  - Proper focus management

- [ ] **Implement toggle button**:
  - Apply button props from `getToggleButtonProps()`
  - Use ChevronDown/ChevronUp icons from lucide-react
  - Show appropriate icon based on `isOpen` state
  - Proper button accessibility attributes

- [ ] **Icon and layout integration**:
  - Position toggle button within trigger
  - Handle icon sizing and positioning
  - Support clearable functionality with X icon

**Success Criteria**:
- [ ] Trigger component renders with all visual variants
- [ ] Input field accepts text and triggers filtering
- [ ] Toggle button opens/closes dropdown correctly
- [ ] Icons display and animate appropriately
- [ ] Focus states work correctly

## Task 5: Implement ComboBox Content Component
**Owner**: Junior AI  
**Dependencies**: Task 4  
**Objective**: Create the dropdown content container with proper positioning and styling.
**Effort**: 3/5

### Content Component Tasks:
- [ ] **Create content container**:
  - Apply `comboBoxContentVariants` for consistent styling
  - Handle z-index and positioning relative to trigger
  - Implement shadow and border styling following design system

- [ ] **Positioning and layout**:
  - Position dropdown below trigger element
  - Handle viewport boundary collision detection
  - Implement max-height with scrolling for long option lists
  - Proper width sizing relative to trigger

- [ ] **Animation and transitions**:
  - Smooth open/close animations using Tailwind classes
  - Fade-in/fade-out effects
  - Scale animation on open/close

- [ ] **Content management**:
  - Apply menu props from `getMenuProps()`
  - Handle empty state display
  - Support for custom empty message

**Success Criteria**:
- [ ] Dropdown appears correctly positioned below trigger
- [ ] Animations work smoothly for open/close states
- [ ] Content container has proper styling and shadows
- [ ] Long lists scroll correctly within max-height bounds
- [ ] Empty states display appropriate messaging

## Task 6: Implement ComboBox Item Component
**Owner**: Junior AI  
**Dependencies**: Task 5  
**Objective**: Create individual option items with proper interaction and accessibility.
**Effort**: 2/5

### Item Component Tasks:
- [ ] **Create item component**:
  - Apply `comboBoxItemVariants` for consistent styling
  - Support hover and focus states
  - Handle disabled item styling

- [ ] **Item interaction**:
  - Apply item props from `getItemProps()`
  - Proper click and keyboard selection handling
  - Highlight active/selected items appropriately

- [ ] **Visual feedback**:
  - Highlight currently focused item during keyboard navigation
  - Show selected state for chosen item
  - Handle disabled state visual feedback

- [ ] **Content rendering**:
  - Render option label text
  - Support for future icon or description extensions
  - Proper text truncation for long option labels

**Success Criteria**:
- [ ] Items render correctly with proper styling
- [ ] Hover and focus states provide clear visual feedback
- [ ] Keyboard navigation highlights items correctly
- [ ] Item selection works via mouse and keyboard
- [ ] Disabled items are properly styled and non-interactive

## Task 7: Implement Advanced Features
**Owner**: Junior AI  
**Dependencies**: Task 6  
**Objective**: Add clearable functionality, custom filtering, and enhanced UX features.
**Effort**: 2/5

### Advanced Features Tasks:
- [ ] **Clearable functionality**:
  - Add clear button (X icon) when item is selected
  - Clear button removes selection and clears input
  - Hide clear button when no selection exists

- [ ] **Custom filtering support**:
  - Support custom `filterFunction` prop
  - Default to case-insensitive prefix matching
  - Handle edge cases with empty filter results

- [ ] **Enhanced accessibility**:
  - Proper ARIA labels and descriptions
  - Screen reader announcements for filter results
  - Keyboard shortcut documentation

- [ ] **Form integration enhancements**:
  - React Hook Form compatibility testing
  - Proper error state handling and display
  - Integration with form validation patterns

**Success Criteria**:
- [ ] Clear functionality works correctly
- [ ] Custom filter functions can be provided and work properly
- [ ] Component is fully accessible via keyboard and screen reader
- [ ] Integration with React Hook Form works seamlessly

## Task 8: Create Test Application and Validation
**Owner**: Junior AI  
**Dependencies**: Task 7  
**Objective**: Create a test application in templates/react to validate ComboBox functionality.
**Effort**: 2/5

### Test Application Tasks:
- [ ] **Create test page or component**:
  - Create simple test page showcasing ComboBox usage
  - Test all variants (default, ghost, filled)
  - Test all sizes (sm, md, lg) and states (default, error, success, warning)

- [ ] **Integration testing**:
  - Test with form libraries (React Hook Form if available)
  - Test controlled vs uncontrolled usage
  - Test accessibility with keyboard navigation

- [ ] **Update React template exports**:
  - Add ComboBox export to `templates/react/src/lib/ui-core/components/form/index.ts`
  - Export all related interfaces and variants
  - Ensure component can be imported in React template

**Success Criteria**:
- [ ] Test application demonstrates all ComboBox features working
- [ ] Component integrates properly with React template
- [ ] All variants and states render correctly
- [ ] Keyboard navigation and accessibility function properly

## Task 9: Unit Testing Implementation
**Owner**: Junior AI  
**Dependencies**: Task 8  
**Objective**: Create comprehensive unit tests for ComboBox component functionality.
**Effort**: 3/5

### Testing Tasks:
- [ ] **Create test file in React template**:
  - File: `templates/react/src/lib/ui-core/components/form/__tests__/combobox.test.tsx`
  - Set up test environment with React Testing Library
  - Import component and required testing utilities

- [ ] **Basic functionality tests**:
  - Rendering with default props
  - Option filtering on input change
  - Selection via mouse click
  - Selection via keyboard navigation

- [ ] **Interaction tests**:
  - Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
  - Toggle button functionality
  - Clear button functionality
  - Focus management

- [ ] **Variant and state tests**:
  - All uiVariant options render correctly
  - All uiSize options render correctly
  - Error, success, warning states display properly
  - Disabled state prevents interaction

- [ ] **Integration tests**:
  - Controlled vs uncontrolled component behavior
  - Custom filter function usage
  - Form library integration scenarios

**Success Criteria**:
- [ ] Test coverage >90% for component functionality
- [ ] All interaction patterns tested and passing
- [ ] Accessibility features validated in tests
- [ ] Edge cases and error conditions covered

## Task 10: Promote to Packages and Propagate
**Owner**: Junior AI  
**Dependencies**: Task 9  
**Objective**: Copy working component from templates/react to packages, then propagate to all templates.
**Effort**: 2/5

### Promotion and Propagation Tasks:
- [ ] **Copy component to packages**:
  - Copy working component from `templates/react/src/lib/ui-core/components/form/combobox.tsx`
  - Copy to `packages/ui-core/components/form/combobox.tsx`
  - Copy test file to `packages/ui-core/components/form/__tests__/combobox.test.tsx`

- [ ] **Update packages exports**:
  - Add ComboBox export to `packages/ui-core/components/form/index.ts`
  - Export all related interfaces and variants
  - Ensure proper TypeScript declaration exports

- [ ] **Add dependency to packages**:
  - Add `@downshift-js/downshift` to packages/ui-core/package.json (if it has one)
  - Or ensure dependency is documented for templates

- [ ] **Propagate to all templates**:
  - Run copy-packages process for React template (verify it matches)
  - Propagate to NextJS template via copy-packages
  - Propagate to Electron template via copy-packages
  - Add `@downshift-js/downshift` dependency to each template's package.json

**Success Criteria**:
- [ ] Component successfully copied to packages directory
- [ ] Component successfully propagated to all templates
- [ ] All templates build without errors with new component
- [ ] Dependencies properly added to all template package.json files

## Task 11: Documentation and Cleanup
**Owner**: Junior AI  
**Dependencies**: Task 10  
**Objective**: Complete component documentation and perform final cleanup.
**Effort**: 1/5

### Documentation Tasks:
- [ ] **Code documentation review**:
  - Ensure all props have proper JSDoc comments
  - Document complex logic and accessibility features
  - Add usage examples in component comments

- [ ] **Type safety verification**:
  - Run TypeScript strict mode compilation
  - Resolve any remaining type issues
  - Ensure proper type exports

- [ ] **Performance verification**:
  - Test with large option datasets (100+ items)
  - Verify filtering performance is acceptable
  - Ensure no memory leaks in component lifecycle

- [ ] **Final cleanup**:
  - Remove any debugging code or console.logs
  - Verify consistent code formatting
  - Run linting and fix any issues

### Final Integration Testing:
- [ ] **Cross-template verification**:
  - Test component functionality in NextJS template
  - Test component functionality in Electron template
  - Verify theme integration works in all templates
  - Ensure no regressions in existing components

**Success Criteria**:
- [ ] All code properly documented with JSDoc
- [ ] TypeScript compilation passes in strict mode
- [ ] Component performs well with large datasets
- [ ] Code passes all linting and formatting checks
- [ ] Component functions correctly across all templates
- [ ] Component ready for production use