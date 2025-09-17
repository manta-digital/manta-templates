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