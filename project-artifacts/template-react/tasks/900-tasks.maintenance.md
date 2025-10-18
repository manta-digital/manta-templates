---
project: manta-templates
taskType: maintenance
created: 2025-09-16
lastUpdated: 2025-09-16
status: complete
---

# Maintenance Tasks

## Task M001: Form Border Consistency (GitHub Issue #77)
**Category**: Code Quality/UI Consistency  
**Priority**: Medium  
**GitHub Issue**: https://github.com/manta-digital/manta-templates/issues/77

### Problem
Form elements use inconsistent border tokens across components:
- Input/Textarea/ComboBox: `border-border`
- Select trigger: `border-input` 
- Select dropdown: `border-neutral-3`
- Checkbox/Radio: `border-primary`

This creates visual inconsistency and makes global form styling difficult.

### Solution Tasks
- [x] **Audit all form component border usage**
  - Document current border token usage across all form components
  - Identify all inconsistencies in packages and templates
  - **Success**: Complete inventory of border usage patterns

- [x] **Standardize border tokens**
  - Choose primary form border token (likely `border-border`)
  - Update all form components to use consistent token
  - Update in packages first, then propagate via copy-packages
  - **Success**: All form elements use same border token

- [x] **Add CSS variables for form styling**
  - Create `--form-border-color` CSS variable
  - Create focus, error, success state variables
  - Map Tailwind tokens to CSS variables
  - **Success**: Easy global form border customization available

- [x] **Test across templates**
  - Verify consistency in React, NextJS, and Electron templates
  - Test form components in light/dark themes
  - Validate visual consistency across all form elements
  - **Success**: All templates show consistent form styling

- [x] **Update documentation**
  - Document new CSS variables in project guides
  - Add form styling customization examples
  - **Success**: Clear guidance for customizing form appearance

### Impact
- Improved visual consistency
- Easier theme customization
- Better developer experience
- Professional UI appearance

### Files Affected
- `packages/src/lib/ui-core/components/form/*.tsx`
- CSS/theme files
- All template instances after propagation

## Task M002: ComboBox Simplification and Cleanup
**Category**: Code Quality/Complexity Reduction  
**Priority**: Medium  
**Created**: 2025-09-19

### Problem
The ComboBox component has accumulated advanced features (editing, tagging, custom values) that don't work properly and add unnecessary complexity. The code is overly complex for basic dropdown selection needs.

### Solution Tasks
- [x] **Remove non-working advanced features**
  - Remove `allowCustomValues` and related logic
  - Remove tagging/editing functionality 
  - Remove overly complex state management
  - **Success**: ComboBox focused on core dropdown selection only

- [x] **Simplify component structure**
  - Reduce prop complexity and remove unused props
  - Simplify internal state management
  - Remove unnecessary accessibility overengineering
  - **Success**: Cleaner, more maintainable component code

- [x] **Evaluate Radix DropdownMenu alternative**
  - Assess if Radix DropdownMenu primitives could replace ComboBox
  - Compare complexity vs functionality trade-offs
  - Document findings for future reference
  - **Success**: Clear decision on ComboBox vs DropdownMenu approach
  - **Findings**: DropdownMenu is for actions/menus, ComboBox is for searchable form inputs. Our Select component (already using Radix Select) is well-implemented. ComboBox needs simplification, not replacement. Consider separate DropdownMenu component for action menus in future.

- [x] **Restore working functionality**
  - Ensure basic dropdown selection works reliably
  - Test searchable/filterable options
  - Verify form integration works properly
  - **Success**: ComboBox works consistently for intended use cases

### Impact
- Reduced code complexity and maintenance burden
- More reliable dropdown functionality
- Clearer component purpose and scope
- Better developer experience

### Files Affected
- `packages/src/lib/ui-core/components/form/combobox.tsx`
- Template instances after propagation