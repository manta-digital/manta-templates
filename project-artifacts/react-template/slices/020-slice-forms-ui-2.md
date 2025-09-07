---
item: forms-ui-tier2
project: manta-templates
type: slice
github: 
dependencies: [forms-ui-tier1]
projectState: Tier 1 form controls complete and deployed across templates. Framework-agnostic component system established with packages/ copy workflow.
status: not started
lastUpdated: 2025-09-06
---

# Tier 2 Navigation & Layout Components - Low Level Design

## Overview

This slice implements the second tier of UI components for the manta-templates form system, focusing on navigation and layout components that complement the existing Tier 1 form controls. We're building upon the established framework-agnostic architecture using **Radix primitives as the foundation**, CVA variants for styling, and our semantic theming system.

**Design Philosophy**: Following the proven Tier 1 approach of Radix primitives + CVA + semantic colors, providing maximum customization while reducing maintenance overhead and ensuring accessibility standards.

## Component Specifications

### 1. Tabs Component

**Purpose**: Organize content into multiple panels with tab-based navigation

**Technical Approach**:
- Base: `@radix-ui/react-tabs`
- Theme Integration: Semantic accent colors for active states
- Responsive: Mobile-first with overflow handling

**Component Structure**:
```
components/navigation/tabs/
├── Tabs.tsx           # Root container
├── TabsList.tsx       # Tab navigation list
├── TabsTrigger.tsx    # Individual tab button
├── TabsContent.tsx    # Tab panel content
└── index.ts           # Exports
```

**Props Interface**:
```typescript
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}
```

**Styling Strategy**:
- Active tab: `bg-accent-9` with `text-accent-12`
- Inactive tab: `text-neutral-11` with hover `text-neutral-12`
- Underline indicator using `border-accent-9`
- Focus states with `ring-accent-7`

### 2. List Component

**Purpose**: Display structured lists with consistent styling and optional interactive elements

**Technical Approach**:
- **No direct Radix primitive** - Uses semantic HTML `<ul>`, `<ol>`, `<li>` structure
- CVA variants for different list styles and density
- Optional interactive states for selectable lists (following Radix interaction patterns)

**Component Structure**:
```
components/data/list/
├── List.tsx           # Root list container
├── ListItem.tsx       # Individual list item
├── ListHeader.tsx     # Optional section header
└── index.ts           # Exports
```

**Variants**:
- `variant`: `'default' | 'ordered' | 'disc' | 'none'`
- `interactive`: `boolean` - adds hover/selection states
- `density`: `'compact' | 'default' | 'comfortable'`

**Props Interface**:
```typescript
interface ListProps {
  variant?: 'default' | 'ordered' | 'disc' | 'none'
  interactive?: boolean
  density?: 'compact' | 'default' | 'comfortable'
  className?: string
  children: React.ReactNode
}

interface ListItemProps {
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
}
```

### 3. Table Component

**Purpose**: Display tabular data with consistent styling and basic sorting

**Technical Approach**:
- **No direct Radix primitive** - Uses semantic HTML `<table>` structure
- CVA variants for styling consistency with other components
- Built-in accessibility with ARIA labels following Radix patterns
- Optional sorting states using Radix interaction principles

**Component Structure**:
```
components/data/table/
├── Table.tsx          # Root table container
├── TableHeader.tsx    # Table header
├── TableBody.tsx      # Table body
├── TableRow.tsx       # Table row
├── TableHead.tsx      # Header cell
├── TableCell.tsx      # Data cell
└── index.ts           # Exports
```

**Props Interface**:
```typescript
interface TableProps {
  className?: string
  children: React.ReactNode
}

interface TableHeadProps {
  sortable?: boolean
  sorted?: 'asc' | 'desc' | null
  onSort?: () => void
  className?: string
  children: React.ReactNode
}
```

**Styling Strategy**:
- Header: `bg-neutral-2` with `text-neutral-12`
- Rows: Alternating `bg-transparent` and `bg-neutral-1`
- Hover: `bg-neutral-2`
- Borders: `border-neutral-6`

### 4. DataTable Component

**Purpose**: Enhanced table with built-in pagination, sorting, and filtering

**Technical Approach**:
- Builds on base Table component
- Integration with React Hook Form for filters
- Pagination component integration
- Virtualization support for large datasets

**Component Structure**:
```
components/data/data-table/
├── DataTable.tsx      # Main component with state
├── DataTableHeader.tsx # Enhanced header with sort/filter
├── DataTablePagination.tsx # Built-in pagination
├── DataTableToolbar.tsx # Action toolbar
└── index.ts           # Exports
```

**Props Interface**:
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: {
    pageSize?: number
    showSizeSelector?: boolean
  }
  sorting?: {
    enabled?: boolean
    defaultSort?: SortingState
  }
  filtering?: {
    enabled?: boolean
    globalFilter?: boolean
  }
  className?: string
}

interface ColumnDef<T> {
  id: string
  header: string | React.ReactNode
  accessor: keyof T | ((row: T) => any)
  sortable?: boolean
  filterable?: boolean
  width?: number | string
  cell?: (value: any, row: T) => React.ReactNode
}
```

### 5. Tooltip Component

**Purpose**: Contextual help and additional information display

**Technical Approach**:
- Base: `@radix-ui/react-tooltip`
- Portal-based rendering for z-index management
- Collision detection and repositioning

**Component Structure**:
```
components/overlay/tooltip/
├── Tooltip.tsx        # Root provider
├── TooltipTrigger.tsx # Trigger element
├── TooltipContent.tsx # Tooltip content
└── index.ts           # Exports
```

**Props Interface**:
```typescript
interface TooltipProps {
  children: React.ReactNode
  delayDuration?: number
  skipDelayDuration?: number
}

interface TooltipContentProps {
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  className?: string
  children: React.ReactNode
}
```

## Implementation Strategy

### Phase 1: Foundation Components (Effort: 3)
1. **Tabs Component**
   - Implement basic tab functionality
   - Add keyboard navigation
   - Theme integration testing

2. **List Component**
   - Create base list variants
   - Add interactive states
   - Accessibility audit

### Phase 2: Data Components (Effort: 4)
3. **Table Component**
   - Basic table structure
   - Responsive design
   - Sorting integration

4. **DataTable Component**
   - Enhanced table with state management
   - Pagination component
   - Filter integration

### Phase 3: Overlay Components (Effort: 2)
5. **Tooltip Component**
   - Radix integration
   - Portal positioning
   - Theme styling

## Technical Architecture

### Directory Structure
```
packages/src/lib/ui-core/components/
├── navigation/
│   └── tabs/
├── data/
│   ├── list/
│   ├── table/
│   └── data-table/
└── overlay/
    └── tooltip/
```

### Theme Integration
All components will use the established semantic color system:
- Primary actions: `accent-*` scale (9, 11, 12)
- Neutral elements: `neutral-*` scale (1-12)
- Interactive states: `accent-7` for focus rings
- Borders: `neutral-6` for default, `accent-9` for active

### Radix Primitive Strategy

**Components with Radix Primitives:**
- **Tabs**: Built on `@radix-ui/react-tabs` - provides complete state management, keyboard navigation, and accessibility
- **Tooltip**: Built on `@radix-ui/react-tooltip` - handles positioning, collision detection, and portal rendering

**Components using Semantic HTML + Radix Patterns:**
- **List**: Uses native `<ul>/<ol>` structure but follows Radix interaction and accessibility patterns
- **Table/DataTable**: Uses native `<table>` structure with Radix-inspired state management and ARIA patterns

**Benefits of this approach:**
- Maximum accessibility compliance with minimal effort
- Consistent behavior patterns across all components
- Reduced maintenance overhead through battle-tested primitives
- Full styling control while preserving functionality

### Dependency Management
Required new dependencies:
```json
{
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-tooltip": "^1.0.7"
}
```

### Cross-Component Integration
- **Tabs + Table**: Tab panels containing data tables
- **Tooltip + Form Controls**: Help text integration
- **List + Interactive States**: Selection patterns
- **DataTable + Pagination**: Built-in navigation

## Development Workflow

1. **Template Development**: Work in `templates/react/src/lib/ui-core`
2. **Theme Testing**: Verify with all accent color variants
3. **Accessibility Testing**: Screen reader and keyboard navigation
4. **Copy to Packages**: Move stable components to `packages/src/lib/ui-core`
5. **Template Propagation**: Run `pnmp copy-packages react` (and other types)
6. **Cross-Template Testing**: Verify in NextJS and Electron contexts

## Design Decisions

### Tabs Architecture
- **Decision**: Use Radix Tabs primitive as base
- **Rationale**: Maintains accessibility standards and keyboard navigation
- **Trade-off**: Slightly larger bundle vs. manual implementation

### Table vs DataTable Separation
- **Decision**: Separate simple Table from enhanced DataTable
- **Rationale**: Different use cases - simple display vs. data management
- **Implementation**: DataTable composes Table component

### Tooltip Portal Strategy
- **Decision**: Always use portal rendering
- **Rationale**: Prevents z-index stacking issues
- **Consideration**: Works across all template types (including Electron)

## Testing Strategy

### Component Testing
- Unit tests for each component's core functionality
- Integration tests for composed components (DataTable)
- Accessibility testing with axe-core

### Theme Testing
- Visual regression testing across all accent colors
- Dark/light mode verification
- Cross-template consistency validation

### Browser Testing
- Modern browser support (Chrome 90+, Firefox 90+, Safari 14+)
- Electron compatibility verification
- Mobile responsive behavior

## Migration Considerations

### Existing Component Updates
- Update existing forms to use new Tabs for multi-step workflows
- Enhance current data displays with Table/DataTable
- Add contextual help with Tooltip integration

### Breaking Changes
- None expected - these are net-new components
- Existing components remain unchanged

### Documentation Updates
- Component library documentation
- Integration examples for each template type
- Theme customization guides

## Success Criteria

1. **Functional**: All five components work across React, NextJS, and Electron
2. **Thematic**: Components respect semantic color system and theme switching
3. **Accessible**: WCAG 2.1 AA compliance for all components
4. **Consistent**: Visual and behavioral consistency across templates
5. **Performant**: No noticeable performance impact in large datasets (DataTable)

## Next Steps

1. Create component scaffolding in `templates/react`
2. Install required Radix dependencies
3. Implement Tabs component first (foundation for others)
4. Iterate through remaining components
5. Copy to packages and propagate to all templates
6. Update component library documentation