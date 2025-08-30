---
item: cosine-theming
project: manta-templates
type: feature
featureRef: features/15-feature.cosine-theming.md
github: https://github.com/manta-digital/manta-templates/issues/55
dependencies: [theme-system, ui-core]
projectState: v0.8.0 - Framework-agnostic UI architecture with theme-aware gradient system established
status: not started
lastUpdated: 2025-08-30
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

- [ ] Find CosineTerrainCard in `packages/ui-core/src/components/`
- [ ] Locate corresponding copy in `templates/nextjs/`  
- [ ] Document current component API and props interface
- [ ] Identify how colors are currently configured (hardcoded values, props, CSS)
- [ ] Note any existing color-related props or styling patterns
- [ ] Document component usage examples in template/landing pages
- [ ] **Success**: Clear understanding of current implementation and color system

### Task 2: Current Color Configuration Audit  
**Objective**: Document existing color usage and identify integration points
**Effort**: 2/5

- [ ] Map all hardcoded color values in the component
- [ ] Identify background color implementation (canvas, container, etc.)
- [ ] Identify foreground/wireframe color implementation  
- [ ] Document any existing theming or CSS custom property usage
- [ ] Test component in current light/dark themes to see behavior
- [ ] Note any accessibility or visibility concerns with current colors
- [ ] **Success**: Complete color audit with integration plan documented

### Task 3: Theme Integration Design
**Objective**: Design the theme-aware color system and API changes
**Effort**: 3/5

- [ ] Design prop interface for theme-aware colors:
  - `backgroundColor?: string` (overrides theme default)
  - `foregroundColor?: string` (overrides theme default) 
- [ ] Plan CSS custom property integration approach
- [ ] Design fallback mechanism: custom props → theme colors → hardcoded fallback
- [ ] Consider intensity/opacity adjustments for wireframe visibility
- [ ] Plan backward compatibility approach (no breaking changes)
- [ ] Document the color resolution hierarchy
- [ ] **Success**: Clear API design with implementation approach documented

### Task 4: Prototype Implementation in Template
**Objective**: Implement theme-aware colors in templates/nextjs version for rapid testing
**Effort**: 4/5

- [ ] Modify CosineTerrainCard in `templates/nextjs/` with theme defaults
- [ ] Implement `backgroundColor` and `foregroundColor` override props
- [ ] Add CSS custom property integration (`var(--color-background)`, `var(--color-foreground)`)
- [ ] Implement color resolution hierarchy (custom → theme → fallback)
- [ ] Add prop type definitions for new color props
- [ ] Ensure existing usage continues to work without changes
- [ ] **Success**: Working theme-aware implementation in template with hot reload testing

### Task 5: Cross-Theme Testing and Refinement
**Objective**: Test implementation across all theme variants and refine for optimal appearance
**Effort**: 3/5

- [ ] Test component with light/dark theme switching
- [ ] Test across all color palettes (teal, blue, purple, orange, etc.)
- [ ] Verify wireframe visibility and contrast in all themes
- [ ] Test custom color overrides work correctly
- [ ] Check accessibility contrast ratios where applicable  
- [ ] Adjust intensity/opacity if needed for wireframe clarity
- [ ] Test component in landing/examples pages with real content
- [ ] **Success**: Component looks good and functions properly across all themes

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

- [ ] Copy implemented changes from templates/nextjs to packages/ui-core/src/components/
- [ ] Verify prop types and interfaces match
- [ ] Run `pnpm build-ui` to propagate changes to template copies
- [ ] Test that built version works identically to prototype
- [ ] Verify no build errors or type issues in ui-core package
- [ ] Confirm all template/landing usage still works correctly
- [ ] **Success**: Changes properly promoted to canonical source with verified propagation

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
- [ ] CosineTerrainCard responds to theme changes automatically
- [ ] Custom color override props work correctly
- [ ] No breaking changes to existing usage
- [ ] Component works across all theme variants
- [ ] Changes properly promoted to ui-core canonical source
- [ ] Documentation updated with new capabilities
- [ ] GitHub issue #55 can be marked resolved

## Notes

- **Theme System Dependency**: Requires existing `--color-background` and `--color-foreground` CSS custom properties
- **Hot Reload Advantage**: Template prototyping enables rapid visual iteration for color/theme work
- **Build Verification**: Important to test `pnpm build-ui` propagation to ensure template copies stay in sync
- **Backward Compatibility**: Implementation must not break existing CosineTerrainCard usage patterns