---
item: forms-ui-core
project: manta-templates
type: slice
github: null
dependencies: ["@radix-ui/react-checkbox", "@radix-ui/react-radio-group", "@radix-ui/react-select", "@radix-ui/react-label", "react-hook-form", "zod"]
projectState: "Adding themed form controls to all templates with semantic color integration"
status: not started
lastUpdated: 2025-09-05
---

# Forms UI Core - Low-Level Design

## Overview

This slice implements core form controls (Input, Textarea, Checkbox, Radio, Select, Label, FormField, Form) that integrate seamlessly with the existing manta-templates theme system. All components will use Radix UI primitives for accessibility, CVA for variant management, and semantic CSS variables for theming.

## Technical Decisions

### 1. Component Library Foundation
- **Base**: Shadcn/ui pattern using Radix UI primitives
- **Styling**: Class Variance Authority (CVA) for variant management
- **Theme Integration**: Semantic CSS variables (`--color-accent-*`, `--color-neutral-*`)
- **Typography**: Existing Tailwind system with semantic color mapping

### 2. Form State Management
- **Primary**: React Hook Form for complex forms
- **Validation**: Zod schemas for type-safe validation
- **Simple Forms**: Direct React state for basic use cases
- **Error Handling**: Centralized error display system

### 3. Accessibility Strategy
- **Foundation**: Radix UI primitives provide ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all components
- **Screen Readers**: Proper labeling and descriptions
- **Focus Management**: Visual focus indicators matching theme

## Component Specifications

### Input Component

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'error' | 'success' | 'warning'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```

**Features**:
- Text, email, password, number, tel, url types
- Icon support (left/right positioning)
- State-based styling (error, success, warning)
- Size variants with consistent spacing
- Disabled and readonly states

**Theme Integration**:
- Border: `--color-neutral-7` default, `--color-accent-8` focus
- Background: `--color-neutral-1` default, `--color-neutral-2` hover
- Text: `--color-neutral-12`
- Placeholder: `--color-neutral-9`
- Error state: Uses destructive color tokens

### Textarea Component

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'ghost' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  state?: 'default' | 'error' | 'success' | 'warning'
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}
```

**Features**:
- Auto-resize functionality
- Row constraints (min/max)
- Same styling variants as Input
- Character count integration capability

### Checkbox Component

```typescript
interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'destructive'
  disabled?: boolean
  required?: boolean
  children?: React.ReactNode
}
```

**Features**:
- Indeterminate state support
- Label integration
- Size variants
- Custom check icon support

**CheckboxGroup**:
```typescript
interface CheckboxGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  required?: boolean
  children: React.ReactNode
}
```

### Radio Component

```typescript
interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  children: React.ReactNode
}

interface RadioItemProps {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}
```

**Features**:
- Horizontal/vertical layouts
- Size variants
- Individual item disable capability

### Select Component

```typescript
interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'filled'
  disabled?: boolean
  required?: boolean
  searchable?: boolean
  multiple?: boolean
  children: React.ReactNode
}
```

**Features**:
- Single and multi-select modes
- Search/filter capability
- Custom trigger styling
- Keyboard navigation
- Portal-based dropdown

### Label Component

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  optional?: boolean
  disabled?: boolean
  children: React.ReactNode
}
```

**Features**:
- Required indicator (*)
- Optional text suffix
- Size variants matching form controls
- Disabled state styling

### FormField Component

```typescript
interface FormFieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
```

**Features**:
- Label, description, error message layout
- Automatic ARIA relationships
- Error state propagation to child controls
- Consistent spacing system

### Form Component

```typescript
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: any) => void | Promise<void>
  validation?: ZodSchema
  defaultValues?: Record<string, any>
  disabled?: boolean
  children: React.ReactNode
}
```

**Features**:
- React Hook Form integration
- Zod validation schema support
- Loading states during submission
- Error boundary for form errors

## Data Flows

### Form State Management Flow
```
User Input → Component State → Form State → Validation → UI Update
                                    ↓
                              Submit Handler → API Call → Success/Error
```

### Validation Lifecycle
```
Field Change → Debounced Validation → Schema Check → Error Display
                                                         ↓
                                              Field State Update
```

### Theme Integration Flow
```
ThemeProvider → Semantic CSS Variables → Component Styles → User Interaction
      ↓
Accent/Theme Switch → CSS Variable Update → Automatic Re-render
```

## UI Specifications

### Color Mapping
- **Default State**: 
  - Border: `--color-neutral-7`
  - Background: `--color-neutral-1`
  - Text: `--color-neutral-12`
- **Focus State**:
  - Border: `--color-accent-8`
  - Ring: `--color-accent-a4`
- **Error State**:
  - Border: `--color-destructive`
  - Background: `--color-destructive-a1`
- **Disabled State**:
  - Background: `--color-neutral-2`
  - Text: `--color-neutral-8`
  - Border: `--color-neutral-6`

### Size System
- **Small**: `h-8`, `px-2`, `text-sm`
- **Medium**: `h-10`, `px-3`, `text-base`
- **Large**: `h-12`, `px-4`, `text-lg`

### Focus Ring System
- Ring width: `3px`
- Ring color: `--color-accent-a4`
- Ring offset: `2px`

## Component Interactions

### Form Validation Integration
```typescript
// Example usage pattern
<Form validation={loginSchema} onSubmit={handleLogin}>
  <FormField label="Email" required error={errors.email}>
    <Input type="email" name="email" />
  </FormField>
  <FormField label="Password" required error={errors.password}>
    <Input type="password" name="password" />
  </FormField>
  <Button type="submit">Login</Button>
</Form>
```

### Theme Context Integration
All components automatically inherit theme context:
```typescript
// Components respect current theme without props
const { theme, accent } = useTheme()
// CSS variables update automatically
```

## Cross-Slice Dependencies

### Dependencies on Existing Components
- **Button**: Form submit buttons, select triggers
- **Card**: Form container patterns
- **ThemeProvider**: Theme context and CSS variables

### Future Slice Interfaces
- **Navigation Slice**: Form components in nav menus
- **Data Display Slice**: Forms within tables/modals
- **Electron Slice**: Native menu bar form controls

## Implementation Considerations

### Performance
- **Memoization**: Use React.memo for form components
- **Event Handling**: Debounced validation (300ms)
- **Bundle Size**: Tree-shakable exports

### Accessibility
- **ARIA Labels**: All form controls properly labeled
- **Keyboard Navigation**: Tab order and focus management
- **Screen Readers**: Form structure and error announcements
- **Color Contrast**: WCAG AA compliance with all themes

### Testing Strategy
- **Unit Tests**: Component rendering and prop handling
- **Integration Tests**: Form submission workflows
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Visual Tests**: Theme variations and states

## Development Phases

### Phase 1: Foundation (Effort: 3)
- Set up directory structure
- Install dependencies
- Create base style system
- Implement Input component

### Phase 2: Core Controls (Effort: 4)
- Implement Textarea
- Implement Checkbox/CheckboxGroup
- Implement RadioGroup
- Basic theme integration

### Phase 3: Advanced Controls (Effort: 4)
- Implement Select component
- Add search/filter capability
- Multi-select support
- Advanced styling variants

### Phase 4: Form Infrastructure (Effort: 3)
- Implement FormField wrapper
- Implement Form provider
- React Hook Form integration
- Zod validation integration

### Phase 5: Polish & Integration (Effort: 2)
- Demo page creation
- Cross-template testing
- Documentation
- Package propagation

## Potential Conflicts

### Styling Conflicts
- **Tailwind Reset**: Ensure form elements don't conflict with base styles
- **Focus Rings**: Coordinate with existing button focus styles
- **Z-Index**: Select dropdown layering with navigation

### Package Dependencies
- **Radix Versions**: Ensure compatibility across all primitives
- **React Hook Form**: Version compatibility with existing React
- **Zod**: Schema sharing with potential backend validation

### Template Integration
- **Next.js**: SSR compatibility for form state
- **Electron**: Native input behaviors vs web components
- **React**: Ensure compatibility with React 19+

## Success Criteria

1. **Functional**: All form components work across templates
2. **Accessible**: WCAG AA compliance achieved
3. **Themed**: Seamless integration with accent switching
4. **Performant**: No noticeable lag during form interactions
5. **Developer Experience**: Clear APIs and TypeScript support
6. **Tested**: 90%+ test coverage for all components