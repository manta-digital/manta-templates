---
item: combo-box
project: manta-templates
type: slice
github: https://github.com/manta-digital/manta-templates/issues/70
dependencies: []
projectState: React template with existing form components (Input, Select, Textarea) using Radix UI + CVA + Tailwind
status: not-started
lastUpdated: 2025-09-14
---

# Slice Design: Combo Box Component

## Overview

Create a fully-featured, accessible combo box component that integrates seamlessly with the existing UI component library. The combo box will support both basic selection and filtering functionality, following the established patterns of Input and Select components.

**Effort Level**: 3/5 (Medium complexity due to accessibility requirements and integration patterns)

## Technical Decisions

### 1. Implementation Approach

**Option A: Pure Radix UI Composition** (❌ Not viable)
- Radix UI doesn't provide a dedicated Combobox primitive
- Would require combining Select + Command which creates complexity

**Option B: Downshift Hooks + Radix Styling** (✅ Selected)
- Use `useCombobox` hook from `@downshift-js/downshift` for state management and accessibility
- Apply existing Radix-style component patterns for consistency  
- Full control over JSX structure while getting accessibility props
- Leverage existing CVA variants system
- Maintain design system coherence

**Option C: Custom Implementation** (❌ Rejected)
- Too much accessibility implementation required
- Reinventing well-tested patterns

### 2. Dependencies

- `@downshift-js/downshift` - `useCombobox` hook for state management and ARIA compliance
- Existing: `class-variance-authority`, `lucide-react`, `@radix-ui/react-*` (for icons)

### 3. Component Architecture

```
ComboBox (main component)
├── ComboBoxTrigger (input + button wrapper)
├── ComboBoxInput (filtered input field) 
├── ComboBoxButton (toggle dropdown button)
├── ComboBoxContent (dropdown container)
├── ComboBoxItem (individual option)
├── ComboBoxEmpty (no results state)
└── ComboBoxSeparator (optional grouping)
```

## Implementation Pattern

### Hook-Based Architecture

Following Downshift's current best practices, we'll use the `useCombobox` hook pattern rather than the legacy component-based API.

**Architecture Pattern:**
- `useCombobox` hook provides state management and accessibility props
- We control the complete JSX structure and styling
- Props from the hook are spread onto our styled components
- CVA variants applied to our custom elements

**Benefits of this approach:**
- Complete control over styling and structure
- Accessibility props provided by `useCombobox` hook
- Tree-shakeable (only import the hook we need)
- Better TypeScript integration
- Easier to customize and extend
- Matches our existing form component patterns

## Component Specifications

### 1. Core API Design

```typescript
interface ComboBoxProps {
  // Data
  options: Array<{
    value: string
    label: string
    disabled?: boolean
    group?: string
  }>
  
  // State
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  
  // Behavior
  placeholder?: string
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  
  // UI Variants (following existing patterns)
  uiVariant?: 'default' | 'ghost' | 'filled'
  uiSize?: 'sm' | 'md' | 'lg'
  uiState?: 'default' | 'error' | 'success' | 'warning'
  
  // Advanced
  emptyMessage?: string
  filterFunction?: (inputValue: string, option: ComboBoxOption) => boolean
  className?: string
}
```

### 2. Variant System (CVA)

Following the established pattern from Input and Select components:

```typescript
const comboBoxTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-md border transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      uiVariant: {
        default: "border-border bg-background hover:bg-accent/5",
        ghost: "border-transparent bg-transparent hover:bg-accent/50 focus-within:bg-background focus-within:border-border",
        filled: "border-transparent bg-muted hover:bg-muted/80 focus-within:bg-background focus-within:border-border",
      },
      uiSize: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-4 text-lg",
      },
      uiState: {
        default: "",
        error: "border-destructive ring-destructive/20 focus-within:ring-destructive",
        success: "border-green-500 ring-green-500/20 focus-within:ring-green-500",
        warning: "border-yellow-500 ring-yellow-500/20 focus-within:ring-yellow-500",
      }
    }
  }
)
```

### 3. Content and Item Variants

```typescript
const comboBoxContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-background text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
)

const comboBoxItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 px-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
)
```

## Integration Patterns

### 1. Theme Integration

- Use existing semantic color tokens (`--background`, `--foreground`, `--accent`, etc.)
- Respect dark/light mode automatically through CSS custom properties
- Maintain focus ring consistency with other form components

### 2. Form Integration

- Support React Hook Form integration (similar to Input component)
- Filter out non-DOM props (`isDirty`, `isTouched`)
- Forward refs properly for form library compatibility

### 3. Icon Integration

- Use Lucide React icons consistently (ChevronDown, Search, X)
- Follow existing icon sizing patterns (h-4 w-4)
- Proper icon positioning within trigger

## Accessibility Features

Downshift provides ARIA compliance out of the box:

- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Screen Reader Support**: Proper ARIA labels, roles, and states
- **Focus Management**: Logical focus flow between input and options
- **Live Regions**: Announces filtering results and selections

## Data Flow

```
User Types → Input Change → Filter Options → Update Dropdown
User Clicks Option → onValueChange → Close Dropdown → Update Input
User Clicks Toggle → Toggle Dropdown State
User Presses Escape → Close Dropdown → Focus Input
```

## Cross-slice Dependencies

### Current Dependencies
- **None** - This is a foundational component

### Provides Interfaces For
- Form components that need searchable selection
- Admin panels with large option sets
- Any UI requiring filtered selection

### Potential Conflicts
- **None identified** - ComboBox is additive and follows existing patterns

## Implementation Considerations

### 1. Performance
- Virtualization not needed initially (defer until 100+ options)
- Debounced filtering for large datasets
- Memoized option filtering function

### 2. Bundle Size
- Downshift adds ~15KB minified
- Tree-shakeable imports
- No additional runtime dependencies

### 3. Testing Strategy
- Unit tests: option filtering, selection, keyboard navigation
- Integration tests: form library compatibility
- Accessibility tests: screen reader, keyboard-only navigation

### 4. Migration Path
- Non-breaking addition to component library
- Can replace existing Select usage incrementally
- Clear upgrade documentation for enhanced search functionality

## Files to Create

### Core Component Files
- `packages/ui-core/components/form/combobox.tsx` - Main component
- `packages/ui-core/components/form/combobox.stories.tsx` - Storybook stories (if enabled)

### Test Files  
- `packages/ui-core/components/form/__tests__/combobox.test.tsx` - Unit tests

### Template Integration Files
- `templates/react/src/lib/ui-core/components/form/combobox.tsx` - Template copy
- `templates/nextjs/src/lib/ui-core/components/form/combobox.tsx` - Template copy  
- `templates/electron/src/lib/ui-core/components/form/combobox.tsx` - Template copy

### Documentation Files
- Update `packages/ui-core/components/form/index.ts` exports
- Add usage examples to project documentation

## Success Criteria

- [ ] ComboBox component renders with all variant combinations
- [ ] Filtering works correctly with default and custom filter functions
- [ ] Keyboard navigation follows ARIA patterns (verified with screen reader)
- [ ] Integration with React Hook Form works seamlessly
- [ ] Theme variants (light/dark) apply correctly
- [ ] Component builds without TypeScript errors
- [ ] Unit tests achieve >90% coverage
- [ ] Storybook stories demonstrate all features (if enabled)
- [ ] All template targets receive updated component via copy process

## Future Enhancements (Post-Slice)

- Multi-select capability (using `useMultipleSelection`)
- Async option loading
- Option grouping with headers
- Custom option rendering (avatars, descriptions)
- Virtualization for very large datasets
- Command palette styling variant