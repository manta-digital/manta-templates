---
item: cosine-theming
project: manta-templates
type: feature
github: https://github.com/manta-digital/manta-templates/issues/55
dependencies: [theme-system, ui-core]
projectState: v0.8.0 - Framework-agnostic UI architecture with theme-aware gradient system established
status: not started
lastUpdated: 2025-08-30
---

# Feature: Cosine Terrain Card Theme-Awareness

## Overview

Enhance the CosineTerrainCard component to be theme-aware, automatically adapting background and wireframe colors to match the active theme while preserving the ability to override with custom colors.

## Problem Statement

The CosineTerrainCard is currently highly configurable but doesn't respond to theme changes. It uses fixed/hardcoded colors that don't adapt when users switch between light/dark themes or different color palettes, creating visual inconsistency with the theme-aware design system.

## Solution Approach

### Theme Integration Defaults
- **Background**: Use `var(--color-background)` by default
- **Foreground (wireframe)**: Use `var(--color-foreground)` by default
- **Intensity adjustments**: Apply if needed for wireframe visibility

### Custom Override Support  
- Preserve existing configurability through props
- Allow `backgroundColor` and `foregroundColor` props to override theme defaults
- Custom colors take precedence over theme colors

## Technical Design

### API Changes
```typescript
interface CosineTerrainCardProps {
  // Existing props...
  
  // New theme-aware color props (optional)
  backgroundColor?: string;  // Overrides theme background
  foregroundColor?: string;  // Overrides theme foreground
}
```

### Implementation Strategy

**Development Workflow: Prototype → Promote**
- Work in `templates/nextjs/` for rapid iteration with Next.js hot reload
- Test theme integration in real application context
- Promote working solution to canonical `packages/ui-core/` source
- Verify propagation with `pnpm build-ui`

**Implementation Steps:**
1. **Locate component** - Find CosineTerrainCard in both `packages/ui-core/` and `templates/nextjs/`
2. **Analyze current API** - Understand existing color configuration and props
3. **Prototype in template** - Add theme defaults using CSS custom properties in `templates/nextjs/`
4. **Implement overrides** - Add prop-based color customization with fallbacks
5. **Test across themes** - Verify visual consistency, accessibility, and theme switching behavior
6. **Promote to ui-core** - Copy working implementation to canonical `packages/ui-core/` location
7. **Verify propagation** - Test that `pnpm build-ui` correctly updates template copies

## Success Criteria

- [ ] Terrain card background uses theme background by default
- [ ] Wireframe uses theme foreground with proper visibility
- [ ] Custom color override props work correctly  
- [ ] Card looks good across all theme variants (light/dark, different palettes)
- [ ] No breaking changes to existing usage
- [ ] Maintains existing configurability
- [ ] Documentation updated with new theme-aware behavior

## Dependencies

- **Theme system**: Requires existing semantic color variables (`--color-background`, `--color-foreground`)
- **UI-core package**: Component location and build system
- **No new dependencies**: Builds on established theme infrastructure

## Context

This enhancement extends the theme-aware improvements made to GradientCard in v0.8.0, providing consistent theme integration across visual components while maintaining the flexibility that makes CosineTerrainCard valuable for customization.