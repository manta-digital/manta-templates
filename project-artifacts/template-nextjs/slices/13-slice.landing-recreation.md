---
slice: landing-recreation
project: manta-templates
dependencies: [slice-09-component-parity, slice-11-technology-scroller, slice-12-colors-and-themes]
status: planned
lastUpdated: 2025-08-27
---

# Slice 13: Landing Recreation

## Overview
Recreate the existing landing template instance using the current ui-core component system and enhanced card library. This serves as both a validation of the ui-core architecture and a showcase for the improved component system.

## Current State Analysis

### Existing Landing (`landing/`)
- **Status**: Working Next.js 15 application
- **Architecture**: Mixed local components and some ui-core integration
- **Content**: Comprehensive showcase of card types and layouts
- **Issues**: Inconsistent component usage, hardcoded styles, not fully leveraging ui-core

### Target State
- **Fresh template instance** using latest templates/nextjs
- **Full ui-core integration** showcasing component library capabilities  
- **Enhanced visual design** demonstrating theme system
- **Comprehensive card gallery** as component documentation

## Technical Approach

### Phase 1: Foundation Setup
**Strategy**: Clean slate with content preservation

1. **Backup existing content**
   ```bash
   mv landing/ landing.old/
   ```

2. **Create fresh template instance**
   ```bash
   npx degit ./templates/nextjs landing
   cd landing
   pnpm install
   ```

3. **Content migration analysis**
   - Extract page structure from `landing.old/`
   - Identify reusable content blocks
   - Document custom components that need recreation

### Phase 2: Content Architecture

#### Page Structure (from current landing)
```
├── / (home)                    # Hero + feature cards
├── /gallery                    # Card showcase
├── /gallery/cards             # Individual card demos  
├── /gallery/composition       # Layout patterns
├── /gallery/variants          # Theme variations
├── /gallery/radix-colors      # Color system demo
├── /examples                  # Use case examples
└── /blog                      # Content demonstration
```

#### Component Migration Map
```
landing.old/                    → landing/ (ui-core)
├── ProjectFeatureCard         → Enhanced FeatureCard
├── TechnologyScroller         → ui-core TechnologyScroller
├── Custom hero sections       → BaseCard + custom content
├── Gallery grids              → CardCarousel + responsive layouts
└── Theme demonstrations       → Theme system integration
```

### Phase 3: Enhanced Card Integration

#### Priority 1: Core Showcases
- **Hero sections** using GradientCard and AnimatedCard
- **Technology displays** with fixed TechnologyScroller
- **Project features** using ContentCard and FeatureCard variants
- **Gallery grids** with CardCarousel and responsive layouts

#### Priority 2: Advanced Demonstrations
- **Theme variations** showing light/dark/custom themes
- **Animation showcases** with AnimatedCard and transitions
- **Layout patterns** demonstrating grid systems and compositions
- **Interactive elements** with hover states and micro-interactions

#### Priority 3: Edge Cases and Documentation
- **Complex card compositions** pushing component limits
- **Performance demonstrations** with large datasets
- **Accessibility showcases** demonstrating inclusive design
- **Integration examples** showing real-world usage patterns

## Design Decisions

### Component Strategy
**Decision**: Prefer ui-core components over custom implementations
**Rationale**: Validates component library completeness and identifies gaps

**Fallback Plan**: If ui-core components are insufficient:
1. Document the use case and limitation
2. Create GitHub issue for component enhancement
3. Implement temporary custom component with clear migration path

### Content Preservation
**Decision**: Maintain existing content structure where possible
**Rationale**: Preserves working demonstrations while upgrading underlying architecture

**Migration Priority**:
1. **High**: Working demonstrations (gallery, examples)
2. **Medium**: Visual enhancements (themes, animations)  
3. **Low**: Experimental features (may be redesigned)

### Visual Enhancement Strategy
**Decision**: Leverage theme system for consistent visual improvements
**Rationale**: Demonstrates theme capabilities while improving aesthetics

**Enhancement Areas**:
- Consistent spacing using theme variables
- Improved color harmony through semantic color system
- Enhanced typography using theme typography scales
- Micro-interactions using AnimatedCard capabilities

## Implementation Phases

### Phase 1: Foundation (1-2 hours)
- [x] Backup existing landing to `landing.old/`
- [x] Create fresh template instance in `landing/`
- [x] Basic setup and dependency installation
- [x] Verify build and development server functionality

### Phase 2: Core Content Migration (3-4 hours)
- [ ] Migrate home page hero section
- [ ] Recreate gallery structure using ui-core components
- [ ] Migrate core card demonstrations
- [ ] Implement responsive layouts with CardCarousel
- [ ] Integrate fixed TechnologyScroller component

### Phase 3: Enhanced Demonstrations (4-6 hours)
- [ ] Implement theme variation showcases
- [ ] Create animation demonstrations
- [ ] Build complex card compositions
- [ ] Add interactive elements and micro-interactions
- [ ] Performance optimization and testing

### Phase 4: Polish and Documentation (2-3 hours)  
- [ ] Visual polish and consistency pass
- [ ] Accessibility audit and improvements
- [ ] Performance validation
- [ ] Documentation updates
- [ ] Component usage examples

## Risk Assessment

### High Risk: Component Limitations
**Issue**: ui-core components may lack features needed for existing demonstrations
**Mitigation**: 
- Create component gap analysis early in Phase 2
- Prioritize component enhancements in ui-core
- Document limitations and workarounds

### Medium Risk: Content Migration Complexity
**Issue**: Complex custom components may be difficult to recreate
**Mitigation**:
- Start with simple components and build complexity
- Accept some feature reduction for better architecture
- Document migration decisions and rationale

### Low Risk: Theme Integration Challenges  
**Issue**: Theme system may not support all desired visual enhancements
**Mitigation**:
- Work within theme constraints where possible
- Extend theme system as needed
- Create GitHub issues for theme enhancements

## Success Criteria

### Functional Requirements
- [ ] All existing pages rebuild successfully
- [ ] Core functionality (navigation, responsive design) works
- [ ] Card demonstrations showcase ui-core capabilities
- [ ] Theme switching works across all components
- [ ] Performance matches or exceeds original

### Quality Requirements
- [ ] Visual consistency improved over original
- [ ] Component usage patterns are exemplary
- [ ] Code quality and maintainability enhanced
- [ ] Accessibility standards met or exceeded
- [ ] Documentation is comprehensive and accurate

### Validation Requirements
- [ ] ui-core component coverage analysis complete
- [ ] Component limitation documentation created
- [ ] Enhancement roadmap established
- [ ] Stakeholder approval on visual improvements

## Component Gap Analysis

### Expected Gaps (to validate)
1. **Complex hero compositions** - may need BaseCard extensions
2. **Advanced animation sequences** - AnimatedCard limitations
3. **Custom layout patterns** - CardCarousel flexibility
4. **Theme-specific styling** - theme system coverage
5. **Performance-critical sections** - component optimization

### Gap Resolution Strategy
1. **Document gap** with specific use case
2. **Create GitHub issue** with enhancement request  
3. **Implement temporary workaround** if needed
4. **Plan component enhancement** for future slice
5. **Update component roadmap** with priority

## Dependencies and Integration

### Slice Dependencies
- **Slice 09 (Component Parity)**: Core ui-core components must be stable
- **Slice 11 (Technology Scroller)**: Fixed animation and dark mode issues
- **Slice 12 (Colors and Themes)**: Theme system for visual enhancements

### External Dependencies
- **Next.js 15**: Template foundation
- **ui-core package**: Primary component source
- **ui-adapters-nextjs**: Next.js-specific integrations
- **Theme system**: Color and styling consistency

### Output Dependencies
- **Component enhancement backlog**: Issues for ui-core improvements
- **Design system documentation**: Usage patterns and examples
- **Performance benchmarks**: Component optimization targets
- **Migration documentation**: Patterns for future template updates

## Deliverables

### Primary Deliverables
1. **New landing application** in `landing/` directory
2. **Component gap analysis** documenting ui-core limitations
3. **Enhancement roadmap** for ui-core improvements
4. **Migration documentation** for future template updates

### Secondary Deliverables
1. **Visual design showcase** demonstrating theme capabilities
2. **Performance benchmarks** for component optimization
3. **Accessibility compliance** documentation
4. **Best practices guide** for ui-core component usage

## Timeline Estimate

**Total: 10-15 hours over 3-5 days**

- **Day 1**: Foundation setup and core migration (4-5 hours)
- **Day 2**: Enhanced demonstrations and polish (4-5 hours)  
- **Day 3**: Documentation and validation (2-3 hours)
- **Buffer**: Issue resolution and refinements (2-2 hours)

## Next Steps

1. **Review and approve** slice design
2. **Create task breakdown** in `nn-tasks.landing-recreation.md`
3. **Begin Phase 1** foundation setup
4. **Establish communication plan** for component gaps discovered
5. **Set validation criteria** with project stakeholders