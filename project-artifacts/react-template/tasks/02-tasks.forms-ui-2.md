---
item: forms-ui-tier2
project: manta-templates
type: tasks
slice: forms-ui-tier2
lldReference: project-artifacts/react-template/slices/020-slice-forms-ui-2.md
dependencies: [forms-ui-tier1]
projectState: Tier 1 form controls complete and deployed across templates. Framework-agnostic component system established with packages/ copy workflow.
status: not started
lastUpdated: 2025-09-06
---

# Tier 2 Navigation & Layout Components - Tasks

## Context Summary

This task list implements the Tier 2 Navigation & Layout components as defined in the Low Level Design document. The implementation includes:
- **Tabs Component** (Radix-based): Tab navigation with full accessibility 
- **List Component** (Semantic HTML + Radix patterns): Structured lists with interactive variants
- **Table Component** (Semantic HTML + Radix patterns): Basic tabular data display with sorting
- **DataTable Component** (Builds on Table): Enhanced tables with pagination, filtering, and state management
- **Tooltip Component** (Radix-based): Contextual help with portal rendering

All components follow the established Radix primitives + CVA + semantic theming approach from Tier 1 form controls.

## Phase 1: Setup and Dependencies

### Dependency Installation
- [ ] **Task 1.1**: Install required Radix dependencies in React template
  - Install `@radix-ui/react-tabs ^1.0.4`
  - Install `@radix-ui/react-tooltip ^1.0.7`
  - Update package.json dependencies
  - **Success**: Dependencies installed and available for import
  - **Effort**: 1

### Directory Structure Setup  
- [ ] **Task 1.2**: Create component directory structure in `templates/react/src/lib/ui-core/components/`
  - Create `navigation/` directory (all nav controls go here)
  - Create `data/` directory (all data controls go here)  
  - Verify `overlay/` directory exists (tooltip will go directly here)
  - **Reference**: Simplified hierarchy to maintain consistent imports and copying
  - **Success**: Directory structure ready for component placement
  - **Effort**: 1

## Phase 2: Tabs Component Implementation (Radix-based)

### Tabs Root Component
- [ ] **Task 2.1**: Create Tabs.tsx root container component
  - Implement TabsProps interface with defaultValue, value, onValueChange, orientation, className, children
  - Build on `@radix-ui/react-tabs` Root primitive
  - Add CVA variants for orientation support
  - **Reference**: LLD Section 1 "Tabs Component" - Props Interface and Technical Approach
  - **Success**: Tabs component renders and manages state correctly
  - **Effort**: 2

### TabsList Component  
- [ ] **Task 2.2**: Create TabsList.tsx navigation list component
  - Build on `@radix-ui/react-tabs` List primitive
  - Add responsive overflow handling for mobile
  - Implement semantic theming with neutral color scale
  - **Reference**: LLD Section 1 "Tabs Component" - Component Structure
  - **Success**: TabsList renders with proper overflow behavior
  - **Effort**: 2

### TabsTrigger Component
- [ ] **Task 2.3**: Create TabsTrigger.tsx individual tab button component  
  - Implement TabsTriggerProps interface with value, disabled, className, children
  - Build on `@radix-ui/react-tabs` Trigger primitive
  - Apply styling strategy: Active `bg-accent-9` with `text-accent-12`, Inactive `text-neutral-11` with hover `text-neutral-12`
  - Add underline indicator using `border-accent-9`
  - Add focus states with `ring-accent-7`
  - **Reference**: LLD Section 1 "Tabs Component" - Props Interface and Styling Strategy
  - **Success**: TabsTrigger shows correct visual states for active/inactive/hover/focus
  - **Effort**: 3

### TabsContent Component
- [ ] **Task 2.4**: Create TabsContent.tsx panel content component
  - Build on `@radix-ui/react-tabs` Content primitive
  - Add proper ARIA labeling for accessibility
  - Implement smooth transitions between panels
  - **Reference**: LLD Section 1 "Tabs Component" - Component Structure
  - **Success**: TabsContent displays correct panel based on active tab
  - **Effort**: 2

### Tabs Index and Integration
- [ ] **Task 2.5**: Create navigation/tabs.tsx file (all tabs components in single file)
  - Export all Tabs components (Tabs, TabsList, TabsTrigger, TabsContent)
  - Export TabsProps and TabsTriggerProps interfaces
  - **Reference**: Simplified structure - all tabs functionality in navigation/tabs.tsx
  - **Success**: All tabs components importable from navigation/tabs
  - **Effort**: 1

## Phase 3: List Component Implementation (Semantic HTML + Radix Patterns)

### List Root Component
- [ ] **Task 3.1**: Create List.tsx root container component
  - Implement ListProps interface with variant, interactive, density, className, children
  - Support variants: 'default' | 'ordered' | 'disc' | 'none'
  - Support density: 'compact' | 'default' | 'comfortable'
  - Use semantic HTML `<ul>` and `<ol>` structure based on variant
  - Add CVA variants for styling consistency
  - **Reference**: LLD Section 2 "List Component" - Props Interface, Variants, Technical Approach
  - **Success**: List renders with correct HTML structure and styling for all variants/densities
  - **Effort**: 3

### ListItem Component
- [ ] **Task 3.2**: Create ListItem.tsx individual list item component
  - Implement ListItemProps interface with selected, disabled, onClick, className, children
  - Use semantic HTML `<li>` structure
  - Add interactive states following Radix interaction patterns
  - Apply semantic theming for selection and hover states
  - **Reference**: LLD Section 2 "List Component" - Props Interface, Technical Approach
  - **Success**: ListItem handles selection, disabled states, and click events correctly
  - **Effort**: 2

### ListHeader Component
- [ ] **Task 3.3**: Create ListHeader.tsx optional section header component
  - Create semantic HTML structure for section grouping
  - Apply consistent typography using semantic color system
  - Add proper ARIA labeling for accessibility
  - **Reference**: LLD Section 2 "List Component" - Component Structure
  - **Success**: ListHeader provides proper semantic grouping for list sections
  - **Effort**: 2

### List Index and Integration
- [ ] **Task 3.4**: Create data/list.tsx file (all list components in single file)
  - Export all List components (List, ListItem, ListHeader)
  - Export ListProps and ListItemProps interfaces
  - **Reference**: Simplified structure - all list functionality in data/list.tsx
  - **Success**: All list components importable from data/list
  - **Effort**: 1

## Phase 4: Table Component Implementation (Semantic HTML + Radix Patterns)

### Table Root Component
- [ ] **Task 4.1**: Create Table.tsx root container component
  - Implement TableProps interface with className, children
  - Use semantic HTML `<table>` structure
  - Add CVA variants for styling consistency with other components
  - Apply responsive design patterns
  - **Reference**: LLD Section 3 "Table Component" - Props Interface, Technical Approach
  - **Success**: Table renders with proper semantic structure and responsive behavior
  - **Effort**: 2

### TableHeader Component
- [ ] **Task 4.2**: Create TableHeader.tsx table header component
  - Use semantic HTML `<thead>` structure
  - Apply styling strategy: `bg-neutral-2` with `text-neutral-12`
  - Add proper ARIA labeling following Radix patterns
  - **Reference**: LLD Section 3 "Table Component" - Component Structure, Styling Strategy
  - **Success**: TableHeader renders with correct styling and accessibility
  - **Effort**: 2

### TableBody Component  
- [ ] **Task 4.3**: Create TableBody.tsx table body component
  - Use semantic HTML `<tbody>` structure
  - Apply alternating row styling: `bg-transparent` and `bg-neutral-1`
  - Add hover states: `bg-neutral-2`
  - **Reference**: LLD Section 3 "Table Component" - Component Structure, Styling Strategy
  - **Success**: TableBody shows proper row styling and hover effects
  - **Effort**: 2

### TableRow Component
- [ ] **Task 4.4**: Create TableRow.tsx table row component
  - Use semantic HTML `<tr>` structure
  - Support interactive row selection states
  - Apply border styling using `border-neutral-6`
  - **Reference**: LLD Section 3 "Table Component" - Component Structure, Styling Strategy
  - **Success**: TableRow handles selection and styling correctly
  - **Effort**: 2

### TableHead Component
- [ ] **Task 4.5**: Create TableHead.tsx header cell component
  - Implement TableHeadProps interface with sortable, sorted, onSort, className, children
  - Use semantic HTML `<th>` structure
  - Add sorting states using Radix interaction principles: 'asc' | 'desc' | null
  - Implement click handlers for sorting functionality
  - **Reference**: LLD Section 3 "Table Component" - Props Interface, Technical Approach
  - **Success**: TableHead supports sorting with proper visual indicators
  - **Effort**: 3

### TableCell Component
- [ ] **Task 4.6**: Create TableCell.tsx data cell component
  - Use semantic HTML `<td>` structure
  - Apply consistent typography and padding
  - Support text alignment and content overflow handling
  - **Reference**: LLD Section 3 "Table Component" - Component Structure
  - **Success**: TableCell displays content with proper formatting
  - **Effort**: 2

### Table Index and Integration
- [ ] **Task 4.7**: Create data/table.tsx file (all table components in single file)
  - Export all Table components (Table, TableHeader, TableBody, TableRow, TableHead, TableCell)
  - Export TableProps and TableHeadProps interfaces
  - **Reference**: Simplified structure - all table functionality in data/table.tsx
  - **Success**: All table components importable from data/table
  - **Effort**: 1

## Phase 5: DataTable Component Implementation (Enhanced Table)

### DataTable Root Component
- [ ] **Task 5.1**: Create DataTable.tsx main component with state management
  - Implement DataTableProps interface with data, columns, pagination, sorting, filtering, className
  - Implement ColumnDef interface with id, header, accessor, sortable, filterable, width, cell
  - Build on base Table component from Phase 4
  - Add state management for sorting, filtering, and pagination
  - **Reference**: LLD Section 4 "DataTable Component" - Props Interface, Technical Approach
  - **Success**: DataTable manages complex data state and renders correctly
  - **Effort**: 4

### DataTableHeader Component
- [ ] **Task 5.2**: Create DataTableHeader.tsx enhanced header with sort/filter
  - Build on TableHead component
  - Add sorting controls with visual indicators
  - Add filtering input integration with React Hook Form
  - Implement column-specific filtering based on ColumnDef.filterable
  - **Reference**: LLD Section 4 "DataTable Component" - Component Structure, Technical Approach
  - **Success**: DataTableHeader supports both sorting and filtering per column
  - **Effort**: 4

### DataTablePagination Component
- [ ] **Task 5.3**: Create DataTablePagination.tsx built-in pagination component
  - Implement pagination controls (prev, next, page numbers)
  - Add page size selector when showSizeSelector is enabled
  - Apply semantic theming for interactive elements
  - Handle edge cases (first page, last page, single page)
  - **Reference**: LLD Section 4 "DataTable Component" - Component Structure, Props Interface
  - **Success**: DataTablePagination navigates data pages correctly
  - **Effort**: 3

### DataTableToolbar Component
- [ ] **Task 5.4**: Create DataTableToolbar.tsx action toolbar component
  - Add global filtering input when globalFilter is enabled
  - Add bulk action controls (select all, clear selection)
  - Add export/import functionality hooks
  - Apply consistent styling with other components
  - **Reference**: LLD Section 4 "DataTable Component" - Component Structure, Props Interface
  - **Success**: DataTableToolbar provides comprehensive table actions
  - **Effort**: 3

### DataTable Index and Integration
- [ ] **Task 5.5**: Create data/data-table.tsx file (all data table components in single file)
  - Export all DataTable components (DataTable, DataTableHeader, DataTablePagination, DataTableToolbar)
  - Export DataTableProps and ColumnDef interfaces
  - Export SortingState type definitions
  - **Reference**: Simplified structure - all data table functionality in data/data-table.tsx
  - **Success**: All data table components importable from data/data-table
  - **Effort**: 1

## Phase 6: Tooltip Component Implementation (Radix-based)

### Tooltip Root Component
- [ ] **Task 6.1**: Create Tooltip.tsx root provider component
  - Implement TooltipProps interface with children, delayDuration, skipDelayDuration
  - Build on `@radix-ui/react-tooltip` Provider primitive
  - Configure default timing and behavior settings
  - **Reference**: LLD Section 5 "Tooltip Component" - Props Interface, Technical Approach
  - **Success**: Tooltip provider manages state and timing correctly
  - **Effort**: 2

### TooltipTrigger Component
- [ ] **Task 6.2**: Create TooltipTrigger.tsx trigger element component
  - Build on `@radix-ui/react-tooltip` Trigger primitive
  - Support both hover and focus activation
  - Add proper ARIA attributes for accessibility
  - **Reference**: LLD Section 5 "Tooltip Component" - Component Structure, Technical Approach
  - **Success**: TooltipTrigger activates tooltip on appropriate events
  - **Effort**: 2

### TooltipContent Component
- [ ] **Task 6.3**: Create TooltipContent.tsx tooltip content component
  - Implement TooltipContentProps interface with side, align, sideOffset, className, children
  - Build on `@radix-ui/react-tooltip` Content primitive
  - Implement portal-based rendering for z-index management
  - Add collision detection and repositioning
  - Apply semantic theming consistent with other overlay components
  - **Reference**: LLD Section 5 "Tooltip Component" - Props Interface, Technical Approach
  - **Success**: TooltipContent positions correctly and handles collisions
  - **Effort**: 3

### Tooltip Index and Integration
- [ ] **Task 6.4**: Create overlay/tooltip.tsx file (all tooltip components in single file)
  - Export all Tooltip components (Tooltip, TooltipTrigger, TooltipContent)
  - Export TooltipProps and TooltipContentProps interfaces
  - **Reference**: Simplified structure - all tooltip functionality in overlay/tooltip.tsx
  - **Success**: All tooltip components importable from overlay/tooltip
  - **Effort**: 1

## Phase 7: Integration and Testing

### Component Library Integration
- [ ] **Task 7.1**: Update main ui-core index.ts to export all Tier 2 components
  - Add exports for navigation components (tabs)
  - Add exports for data components (list, table, data-table)
  - Add exports for overlay components (tooltip)
  - Maintain alphabetical organization
  - **Reference**: LLD "Directory Structure" and existing Tier 1 pattern
  - **Success**: All Tier 2 components accessible from main ui-core export
  - **Effort**: 1

### Theme Integration Testing
- [ ] **Task 7.2**: Test all components with semantic color system
  - Verify accent color variants work correctly (teal, blue, purple, etc.)
  - Test dark/light mode switching
  - Validate focus states use `ring-accent-7`
  - Ensure interactive states use proper accent scales
  - **Reference**: LLD "Theme Integration" section
  - **Success**: All components respect theme switching and semantic colors
  - **Effort**: 2

### Accessibility Testing
- [ ] **Task 7.3**: Conduct comprehensive accessibility audit
  - Test keyboard navigation for all interactive components
  - Verify screen reader compatibility with ARIA labels
  - Test focus management and tab order
  - Validate color contrast ratios meet WCAG 2.1 AA
  - **Reference**: LLD "Testing Strategy" - Component Testing
  - **Success**: All components pass accessibility audit
  - **Effort**: 3

### Cross-Component Integration Testing
- [ ] **Task 7.4**: Test component combinations per LLD specifications
  - Test Tabs + Table integration in tab panels
  - Test Tooltip + Form Controls integration for help text
  - Test List + Interactive States selection patterns
  - Test DataTable + Pagination navigation
  - **Reference**: LLD "Cross-Component Integration" section
  - **Success**: Component combinations work seamlessly together
  - **Effort**: 2

## Phase 8: Package Distribution

### Dependency Sync to Other Templates
- [ ] **Task 8.1**: Install Radix dependencies in NextJS and Electron templates
  - Install `@radix-ui/react-tabs ^1.0.4` in templates/nextjs
  - Install `@radix-ui/react-tooltip ^1.0.7` in templates/nextjs
  - Install `@radix-ui/react-tabs ^1.0.4` in templates/electron
  - Install `@radix-ui/react-tooltip ^1.0.7` in templates/electron
  - **Reference**: Required before copy-packages propagation to avoid dependency errors
  - **Success**: All templates have required Radix dependencies
  - **Effort**: 1

### Copy to Packages  
- [ ] **Task 8.2**: Copy stable components from React template to packages/src/lib/ui-core
  - Copy navigation/tabs.tsx to packages/src/lib/ui-core/components/navigation/
  - Copy data/list.tsx to packages/src/lib/ui-core/components/data/
  - Copy data/table.tsx to packages/src/lib/ui-core/components/data/
  - Copy data/data-table.tsx to packages/src/lib/ui-core/components/data/
  - Copy overlay/tooltip.tsx to packages/src/lib/ui-core/components/overlay/
  - Update packages/src/lib/ui-core/index.ts with new exports
  - **Reference**: LLD "Development Workflow" step 4, copy back up to packages workflow
  - **Success**: All component files available in packages directory
  - **Effort**: 2

### Template Propagation
- [ ] **Task 8.3**: Propagate components from packages to all templates
  - Run `pnpm copy-packages react` to update React template
  - Run `pnpm copy-packages nextjs` to update NextJS template  
  - Run `pnpm copy-packages electron` to update Electron template
  - Verify components work in all template contexts
  - **Reference**: LLD "Development Workflow" step 5
  - **Success**: All templates have Tier 2 components available
  - **Effort**: 2

### Cross-Template Verification
- [ ] **Task 8.4**: Verify components work across React, NextJS, and Electron
  - Test component rendering in React template
  - Test component rendering in NextJS template with App Router
  - Test component rendering in Electron template
  - Verify no framework-specific issues
  - **Reference**: LLD "Development Workflow" step 6, Success Criteria
  - **Success**: Components function identically across all templates
  - **Effort**: 3

## Phase 9: Documentation and Examples

### Component Documentation
- [ ] **Task 9.1**: Create component library documentation
  - Document all component APIs with prop interfaces
  - Include usage examples for each component
  - Add theme customization guides
  - Document accessibility features
  - **Reference**: LLD "Documentation Updates" - Component library documentation
  - **Success**: Complete documentation available for all Tier 2 components
  - **Effort**: 3

### Integration Examples
- [ ] **Task 9.2**: Create integration examples for each template type
  - Create React template examples showing component usage
  - Create NextJS template examples with App Router patterns
  - Create Electron template examples with desktop-specific considerations
  - **Reference**: LLD "Documentation Updates" - Integration examples
  - **Success**: Working examples available in each template
  - **Effort**: 2

## Phase 10: Final Validation

### Success Criteria Validation
- [ ] **Task 10.1**: Validate all success criteria from LLD
  - Verify functional: All five components work across React, NextJS, and Electron
  - Verify thematic: Components respect semantic color system and theme switching
  - Verify accessible: WCAG 2.1 AA compliance for all components
  - Verify consistent: Visual and behavioral consistency across templates
  - Verify performant: No noticeable performance impact in large datasets (DataTable)
  - **Reference**: LLD "Success Criteria" section
  - **Success**: All success criteria met and documented
  - **Effort**: 2

### Component Library Update
- [ ] **Task 10.2**: Update existing components to leverage new Tier 2 components
  - Update existing forms to use new Tabs for multi-step workflows
  - Enhance current data displays with Table/DataTable where appropriate
  - Add contextual help with Tooltip integration
  - **Reference**: LLD "Migration Considerations" - Existing Component Updates
  - **Success**: Existing components enhanced with Tier 2 functionality
  - **Effort**: 3

## Task Summary

**Total Tasks**: 41 tasks across 10 phases
**Estimated Total Effort**: 79 effort points
**Critical Dependencies**: 
- Radix UI dependencies installation (Task 1.1)
- Directory structure setup (Task 1.2)
- Sequential component implementation per design specifications

**Key Milestones**:
- Phase 2 completion: Tabs component fully functional
- Phase 4 completion: Table component ready for DataTable composition
- Phase 5 completion: DataTable provides advanced data management
- Phase 8 completion: All templates have Tier 2 components
- Phase 10 completion: Full integration and documentation complete