---
item: navigation-menu
project: manta-templates
type: slice
github: https://github.com/manta-digital/manta-templates/issues/72
dependencies: []
projectState: React template with existing header components and ui-core framework-agnostic architecture
status: not-started
lastUpdated: 2025-09-17
---

# Slice Design: Navigation Menu Component

## Overview

Create a comprehensive navigation menu component suitable for business/marketing websites that **replaces the existing DefaultHeader** with enhanced capabilities including multi-level dropdowns, mobile responsiveness, and advanced navigation patterns. This component maintains all current header functionality (logo, branding, theme controls) while adding sophisticated navigation features for complex site architectures.

**Relationship to Existing Header:**
- **Replaces**: DefaultHeader for business/marketing sites needing complex navigation
- **Maintains**: All existing header features (logo, branding, theme controls, content-driven config)
- **Enhances**: Adds multi-level dropdowns, mobile menus, multiple layout variants
- **Backwards Compatible**: Provides migration path from existing HeaderContent structure

**Effort Level**: 4/5 (High complexity due to multi-level dropdowns, mobile interactions, and accessibility requirements)

## Technical Decisions

### 1. Implementation Approach

**Option A: Extend Existing DefaultHeader** (❌ Rejected)
- Would make the component monolithic and hard to customize
- Doesn't support the variety of layouts needed for business sites
- Limited flexibility for different navigation patterns

**Option B: Pure Custom Implementation** (❌ Rejected)
- Too much accessibility implementation required
- Reinventing well-tested navigation patterns
- High maintenance overhead

**Option C: Radix UI Navigation Menu + Custom Architecture** (✅ Selected)
- Use `@radix-ui/react-navigation-menu` for accessibility and keyboard navigation
- Build framework-agnostic wrapper following ui-core patterns
- Support multiple layout variants (horizontal, sidebar, mobile)
- Leverage existing CVA variants system for consistent styling
- Maintain full control over structure and styling

### 2. Dependencies

**New Dependencies:**
- `@radix-ui/react-navigation-menu` - Navigation primitives with accessibility
- `@radix-ui/react-dialog` - Mobile menu modal (if not already present)

**Existing Dependencies:**
- `class-variance-authority` - Variant styling system
- `lucide-react` - Icons (Menu, ChevronDown, X)
- Existing ui-core components (Container, BrandMark, ThemeToggle, etc.)

### 3. Component Architecture

```
NavigationMenu (main wrapper)
├── NavigationMenuProvider (context for state management)
├── NavigationMenuRoot (Radix root with configuration)
├── NavigationMenuList (menu items container)
├── NavigationMenuItem (individual menu item)
├── NavigationMenuTrigger (dropdown trigger)
├── NavigationMenuContent (dropdown content)
├── NavigationMenuLink (navigation link)
├── NavigationMenuIndicator (active item indicator)
├── NavigationMenuViewport (dropdown positioning)
├── MobileMenuTrigger (hamburger button)
├── MobileMenuContent (mobile drawer/modal)
└── NavigationMenuCTA (call-to-action button)
```

## Implementation Pattern

### Framework-Agnostic Architecture

Following the established ui-core pattern, the navigation menu will be built as a framework-agnostic component with dependency injection for framework-specific elements.

**Core Component Pattern:**
- Framework-agnostic navigation logic and styling
- Dependency injection for `LinkComponent` and `ImageComponent`
- Content-driven configuration (similar to existing header pattern)
- CVA variants for layout and styling options

**Mobile Responsiveness Strategy:**
- Responsive design with Tailwind breakpoints
- Mobile: Hamburger menu with slide-out drawer
- Tablet/Desktop: Horizontal menu with dropdowns
- Configurable breakpoint for mobile/desktop switch

## Component Specifications

### 1. Core API Design

```typescript
interface NavigationMenuItem {
  label: string
  href?: string
  external?: boolean
  children?: NavigationMenuItem[]
  icon?: string
  badge?: string
  disabled?: boolean
}

interface NavigationMenuContent {
  // Brand section (maintains HeaderContent compatibility)
  brand: {
    logo?: string
    logoDark?: string
    title?: string
    href?: string
  }
  
  // Navigation items (enhanced from simple HeaderLink[])
  items: NavigationMenuItem[]
  
  // Call-to-action button (new feature)
  cta?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  
  // Header controls (maintains existing functionality)
  showThemeToggle?: boolean
  showColorSelector?: boolean
  
  mobileBreakpoint?: 'sm' | 'md' | 'lg'
}

// Migration compatibility - existing HeaderContent can be converted
interface HeaderContentToNavigationContent {
  (headerContent: HeaderContent): NavigationMenuContent
}

interface NavigationMenuProps {
  // Content
  content: NavigationMenuContent
  
  // Framework Integration
  LinkComponent?: React.ComponentType<any>
  ImageComponent?: React.ComponentType<any>
  
  // Layout Variants
  variant?: 'horizontal' | 'sidebar' | 'compact'
  orientation?: 'horizontal' | 'vertical'
  
  // Styling
  uiVariant?: 'default' | 'glass' | 'solid' | 'minimal'
  sticky?: boolean
  bordered?: boolean
  
  // Behavior
  closeOnSelect?: boolean
  indicatorVisible?: boolean
  
  // Mobile
  mobileVariant?: 'drawer' | 'dropdown' | 'fullscreen'
  
  className?: string
}
```

### 2. Variant System (CVA)

```typescript
const navigationMenuVariants = cva(
  "w-full transition-all duration-200",
  {
    variants: {
      uiVariant: {
        default: "bg-background/95 backdrop-blur-sm border-b border-border/40",
        glass: "bg-background/80 backdrop-blur-md border-b border-border/20",
        solid: "bg-background border-b border-border",
        minimal: "bg-transparent",
      },
      sticky: {
        true: "sticky top-0 z-50",
        false: "",
      },
      variant: {
        horizontal: "flex items-center",
        sidebar: "flex flex-col h-full",
        compact: "flex items-center px-2",
      }
    },
    defaultVariants: {
      uiVariant: "default",
      sticky: false,
      variant: "horizontal",
    }
  }
)

const navigationMenuListVariants = cva(
  "flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row space-x-1",
        vertical: "flex-col space-y-1",
      },
      variant: {
        horizontal: "flex-1 justify-center",
        sidebar: "flex-col w-full",
        compact: "space-x-2",
      }
    }
  }
)

const navigationMenuItemVariants = cva(
  "relative group",
  {
    variants: {
      hasChildren: {
        true: "cursor-pointer",
        false: "",
      }
    }
  }
)

const navigationMenuTriggerVariants = cva(
  "flex items-center justify-between px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      uiVariant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        glass: "hover:bg-white/10 hover:backdrop-blur-sm",
        solid: "hover:bg-accent/90 hover:text-accent-foreground",
        minimal: "hover:bg-accent/50 hover:text-accent-foreground",
      },
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      }
    }
  }
)
```

### 3. Mobile Menu Variants

```typescript
const mobileMenuVariants = cva(
  "fixed inset-0 z-50 lg:hidden",
  {
    variants: {
      mobileVariant: {
        drawer: "bg-background/95 backdrop-blur-sm",
        dropdown: "bg-background border border-border rounded-lg shadow-lg",
        fullscreen: "bg-background",
      },
      open: {
        true: "animate-in fade-in-0 duration-200",
        false: "animate-out fade-out-0 duration-200",
      }
    }
  }
)
```

## Integration Patterns

### 1. Theme Integration

- Use existing semantic color tokens for consistency
- Support automatic dark/light mode switching
- Maintain focus ring and interaction patterns
- Glass variant for modern overlay effects

### 2. Content-Driven Configuration

Following the established pattern from HeaderContent:

```typescript
// Example content configuration
const navigationContent: NavigationMenuContent = {
  brand: {
    title: "Acme Corp",
    href: "/",
  },
  items: [
    {
      label: "Products",
      children: [
        { label: "Web Apps", href: "/products/web" },
        { label: "Mobile Apps", href: "/products/mobile" },
        {
          label: "Enterprise",
          children: [
            { label: "Security", href: "/enterprise/security" },
            { label: "Analytics", href: "/enterprise/analytics" },
          ]
        }
      ]
    },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  cta: {
    label: "Get Started",
    href: "/signup",
    variant: "primary"
  }
}
```

### 3. Framework Integration

```typescript
// Next.js integration
<NavigationMenu
  content={navigationContent}
  LinkComponent={NextLink}
  ImageComponent={NextImage}
  variant="horizontal"
  uiVariant="glass"
  sticky
/>

// React Router integration
<NavigationMenu
  content={navigationContent}
  LinkComponent={RouterLink}
  variant="horizontal"
  uiVariant="default"
/>
```

## Accessibility Features

Leveraging Radix UI Navigation Menu primitives:

- **Keyboard Navigation**: Full arrow key navigation, Enter/Space activation, Escape to close
- **Screen Reader Support**: Proper ARIA labels, roles, and expanded states
- **Focus Management**: Logical focus flow through menu hierarchy
- **Mobile Accessibility**: Touch-friendly targets, swipe gestures
- **High Contrast**: Supports system high contrast modes

## Data Flow and State Management

```
User Interaction → Navigation State → UI Updates
├── Desktop: Hover/Click → Dropdown State → Content Display
├── Mobile: Touch Menu Button → Drawer State → Full Menu Display
├── Keyboard: Arrow Keys → Focus State → Highlight Items
└── Route Change → Active State → Update Indicators
```

**State Management Pattern:**
- Local component state for dropdown open/close
- Context for mobile menu state across components
- Active route detection via framework integration
- Accessibility state managed by Radix primitives

## Cross-slice Dependencies

### Current Dependencies
- **Existing Header Components**: Will extend/replace current header patterns
- **ui-core Architecture**: Follows established framework-agnostic patterns
- **Theme System**: Integrates with existing theme tokens and variants

### Provides Interfaces For
- Business landing pages with complex navigation
- Marketing sites with product catalogs
- Corporate websites with deep information architecture
- Any application requiring hierarchical navigation

### Potential Conflicts
- **Header Component Migration**: Existing sites using DefaultHeader will need clear migration path and compatibility helpers
- **Breaking Changes**: New component may require content structure updates for complex navigation
- **Z-index Management**: Dropdown menus need proper layering with modals/overlays
- **Bundle Size**: Additional navigation functionality increases component size vs simple header

## Implementation Considerations

### 1. Performance

- **Lazy Loading**: Dropdown content loaded on demand
- **Virtualization**: For extremely deep menu hierarchies (100+ items)
- **Bundle Splitting**: Mobile menu code can be code-split
- **Animation Performance**: CSS transforms for smooth animations

### 2. Mobile UX Patterns

**Drawer Variant** (Recommended):
- Slide-in from left/right
- Overlay background
- Hierarchical back navigation
- Touch-friendly sizing

**Fullscreen Variant**:
- Full viewport takeover
- Large touch targets
- Search functionality integration
- Brand prominence

### 3. SEO and Crawlability

- Server-side rendering friendly
- Semantic HTML structure
- Proper heading hierarchy in mobile menus
- Link accessibility for crawlers

### 4. Testing Strategy

- **Unit Tests**: Menu state management, item rendering, accessibility props
- **Integration Tests**: Framework router integration, theme switching
- **E2E Tests**: Multi-level navigation flows, mobile interactions
- **Accessibility Tests**: Screen reader compatibility, keyboard navigation

## Files to Create

### Core Component Files
- `packages/ui-core/components/navigation/NavigationMenu.tsx` - Main component
- `packages/ui-core/components/navigation/NavigationMenuItem.tsx` - Individual items
- `packages/ui-core/components/navigation/MobileMenu.tsx` - Mobile-specific components
- `packages/ui-core/components/navigation/index.ts` - Exports

### Type Definitions
- `packages/ui-core/types/navigation.ts` - Navigation interfaces
- Update `packages/ui-core/types/index.ts` - Export navigation types

### Template Integration Files
- `templates/react/src/lib/ui-core/components/navigation/` - Template copies
- `templates/nextjs/src/lib/ui-core/components/navigation/` - Template copies
- `templates/electron/src/lib/ui-core/components/navigation/` - Template copies

### Documentation and Examples
- `templates/react/src/app/examples/navigation/` - Example usage
- Update component exports in main index files

### Migration Helpers
- Migration guide from DefaultHeader to NavigationMenu
- Content transformation utilities (`convertHeaderContentToNavigationContent`)
- Compatibility wrapper: `<NavigationMenu variant="simple" />` that mimics DefaultHeader
- Side-by-side comparison examples

## Success Criteria

- [ ] NavigationMenu renders with all layout variants (horizontal, sidebar, compact)
- [ ] Multi-level dropdown navigation works correctly (3+ levels deep)
- [ ] Mobile menu functions across all variants (drawer, dropdown, fullscreen)
- [ ] Keyboard navigation follows ARIA patterns (verified with screen reader)
- [ ] Framework integration works with Next.js and React Router
- [ ] Active route highlighting works correctly
- [ ] Theme variants apply correctly in light/dark modes
- [ ] Responsive breakpoints function properly
- [ ] CTA button integration works with different variants
- [ ] Component builds without TypeScript errors
- [ ] Performance benchmarks meet targets (<100ms interaction response)
- [ ] Accessibility audit passes (WAVE, axe-core)
- [ ] All template targets receive updated component via copy process

## Future Enhancements (Post-Slice)

- **Search Integration**: Global search within navigation
- **Mega Menu Layouts**: Grid-based content areas for large menus
- **Progressive Enhancement**: Enhanced animations and interactions
- **Analytics Integration**: Navigation interaction tracking
- **A/B Testing**: Multiple navigation patterns
- **Breadcrumb Integration**: Automatic breadcrumb generation
- **Admin Panel**: Visual navigation builder interface