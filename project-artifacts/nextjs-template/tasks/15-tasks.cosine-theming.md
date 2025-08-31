---
item: cosine-theming
project: manta-templates
type: feature
featureRef: features/15-feature.cosine-theming.md
github: https://github.com/manta-digital/manta-templates/issues/55
dependencies: [theme-system, ui-core]
projectState: v0.8.0 - Framework-agnostic UI architecture with theme-aware gradient system established
status: mostly-complete
lastUpdated: 2025-08-31
---

# Tasks: Cosine Terrain Card Theme-Awareness

## Context Summary

Making the CosineTerrainCard component theme-aware by integrating it with the established theme system. The component currently uses hardcoded colors and doesn't respond to theme changes. This feature will add automatic theme color defaults while preserving custom color override capabilities.

**Development Approach**: Prototype → Promote workflow using templates/nextjs for rapid iteration, then promoting working solution to packages/ui-core canonical source.

**Key Requirements**:
- Background defaults to `var(--color-background)`  
- Foreground (wireframe) defaults to `var(--color-foreground)`
- Custom color override props for flexibility
- No breaking changes to existing usage
- Works across all theme variants

## Tasks

### Task 1: Component Location and Analysis
**Objective**: Locate CosineTerrainCard component and understand current implementation
**Effort**: 2/5

- [x] Find CosineTerrainCard in `packages/ui-core/src/components/`
- [x] Locate corresponding copy in `templates/nextjs/`  
- [x] Document current component API and props interface
- [x] Identify how colors are currently configured (hardcoded values, props, CSS)
- [x] Note any existing color-related props or styling patterns
- [x] Document component usage examples in template/landing pages
- [x] **Success**: Clear understanding of current implementation and color system

### Task 2: Current Color Configuration Audit  
**Objective**: Document existing color usage and identify integration points
**Effort**: 2/5

- [x] Map all hardcoded color values in the component
- [x] Identify background color implementation (canvas, container, etc.)
- [x] Identify foreground/wireframe color implementation  
- [x] Document any existing theming or CSS custom property usage
- [x] Test component in current light/dark themes to see behavior
- [x] Note any accessibility or visibility concerns with current colors
- [x] **Success**: Complete color audit with integration plan documented

### Task 3: Theme Integration Design
**Objective**: Design the theme-aware color system and API changes
**Effort**: 3/5

- [x] Design prop interface for theme-aware colors:
  - `backgroundColor?: string` (overrides theme default)
  - `foregroundColor?: string` (overrides theme default) 
- [x] Plan CSS custom property integration approach
- [x] Design fallback mechanism: custom props → theme colors → hardcoded fallback
- [x] Consider intensity/opacity adjustments for wireframe visibility
- [x] Plan backward compatibility approach (no breaking changes)
- [x] Document the color resolution hierarchy
- [x] **Success**: Clear API design with implementation approach documented

### Task 4: Prototype Implementation in Template
**Objective**: Implement theme-aware colors in templates/nextjs version for rapid testing
**Effort**: 4/5

- [x] Modify CosineTerrainCard in `templates/nextjs/` with theme defaults
- [x] Implement `backgroundColor` and `foregroundColor` override props
- [x] Add CSS custom property integration (`var(--color-background)`, `var(--color-foreground)`)
- [x] Implement color resolution hierarchy (custom → theme → fallback)
- [x] Add prop type definitions for new color props
- [x] Ensure existing usage continues to work without changes
- [x] **Success**: Working theme-aware implementation in template with hot reload testing

### Task 5: Cross-Theme Testing and Refinement
**Objective**: Test implementation across all theme variants and refine for optimal appearance
**Effort**: 3/5

- [x] Test component with light/dark theme switching
- [x] Test across all color palettes (teal, blue, purple, orange, etc.)
- [x] Verify wireframe visibility and contrast in all themes
- [x] Test custom color overrides work correctly
- [x] Check accessibility contrast ratios where applicable  
- [x] Adjust intensity/opacity if needed for wireframe clarity
- [x] Test component in landing/examples pages with real content
- [x] **Success**: Component looks good and functions properly across all themes

### Task 6: Documentation and Examples Update
**Objective**: Update component documentation with new theme-aware behavior  
**Effort**: 2/5

- [ ] Update component JSDoc with new prop descriptions
- [ ] Add usage examples showing theme-aware behavior
- [ ] Add examples showing custom color overrides
- [ ] Update any existing documentation mentioning CosineTerrainCard
- [ ] Add migration notes if needed (though should be backward compatible)
- [ ] Include theme integration explanation in component docs
- [ ] **Success**: Complete documentation reflecting new theme-aware capabilities

### Task 7: Promote to UI-Core Canonical Source
**Objective**: Copy working implementation to packages/ui-core and verify propagation
**Effort**: 2/5

- [x] Copy implemented changes from templates/nextjs to packages/ui-core/src/components/
- [x] Verify prop types and interfaces match
- [x] Run `pnpm build-ui` to propagate changes to template copies
- [x] Test that built version works identically to prototype
- [x] Verify no build errors or type issues in ui-core package
- [x] Confirm all template/landing usage still works correctly
- [x] **Success**: Changes properly promoted to canonical source with verified propagation

### Task 8: Final Integration Testing
**Objective**: Comprehensive testing of the complete implementation
**Effort**: 2/5

- [ ] Test component in both landing and templates/nextjs contexts
- [ ] Verify theme switching works in real application usage
- [ ] Test custom color prop overrides in various scenarios  
- [ ] Verify backward compatibility - existing usage unchanged
- [ ] Test build process works correctly with new implementation
- [ ] Quick visual regression check across major theme combinations
- [ ] **Success**: Feature fully integrated and working across all contexts

## Completion Criteria

All tasks completed with:
- [x] CosineTerrainCard responds to theme changes automatically
- [x] Custom color override props work correctly
- [x] No breaking changes to existing usage
- [x] Component works across all theme variants
- [x] Changes properly promoted to ui-core canonical source
- [ ] Documentation updated with new capabilities
- [ ] GitHub issue #55 can be marked resolved

## Notes

- **Theme System Dependency**: Requires existing `--color-background` and `--color-foreground` CSS custom properties
- **Hot Reload Advantage**: Template prototyping enables rapid visual iteration for color/theme work
- **Build Verification**: Important to test `pnpm build-ui` propagation to ensure template copies stay in sync
- **Backward Compatibility**: Implementation must not break existing CosineTerrainCard usage patterns