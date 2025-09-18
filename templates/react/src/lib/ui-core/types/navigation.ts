// Enhanced header with navigation menu capabilities
// This extends the existing header types to support complex navigation

import { ComponentType, ReactNode } from 'react'

/**
 * Enhanced navigation link that supports dropdowns
 * Backward compatible with existing HeaderLink
 */
export interface NavigationMenuItem {
  /** Display label for the menu item */
  label: string
  /** URL/path for the menu item (optional for items with children) */
  href?: string
  /** Whether the link opens in a new tab/window */
  external?: boolean
  /** Child menu items for dropdowns (enhancement over HeaderLink) */
  children?: NavigationMenuItem[]
  /** Icon name from lucide-react (optional) */
  icon?: string
  /** Badge text to display next to the item (optional) */
  badge?: string
  /** Whether the menu item is disabled */
  disabled?: boolean
}

/**
 * Enhanced header content that supports complex navigation
 * Extends existing HeaderContent with dropdown and mobile menu capabilities
 */
export interface EnhancedHeaderContent {
  /** Logo image URL */
  logo?: string
  /** Alternative logo for dark theme */
  logoDark?: string
  /** Brand title text */
  title?: string
  /** Navigation links (enhanced to support dropdowns) */
  links: NavigationMenuItem[]
  
  /** Optional enhancements */
  /** Call-to-action button */
  cta?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  /** Show theme controls (defaults to true) */
  showThemeToggle?: boolean
  showColorSelector?: boolean
  /** Mobile menu breakpoint */
  mobileBreakpoint?: 'sm' | 'md' | 'lg'
}

/**
 * Enhanced header component props (replaces/extends HeaderProps)
 */
export interface EnhancedHeaderProps {
  /** Content configuration */
  content: EnhancedHeaderContent
  
  /** Framework Integration (same as existing HeaderProps) */
  /** Link component for framework-specific routing */
  LinkComponent?: ComponentType<any>
  /** Image component for framework-specific optimization */
  ImageComponent?: ComponentType<any>
  
  /** Layout Variants (enhancements over basic header) */
  /** Header layout variant */
  variant?: 'default' | 'minimal' | 'business'
  /** Navigation style */
  navStyle?: 'simple' | 'dropdown' | 'mega'
  
  /** Styling */
  /** Visual style variant */
  uiVariant?: 'default' | 'glass' | 'solid' | 'minimal'
  /** Whether header sticks to top on scroll */
  sticky?: boolean
  
  /** Mobile */
  /** Mobile menu style variant */
  mobileVariant?: 'drawer' | 'dropdown' | 'fullscreen'
  
  /** Additional CSS classes */
  className?: string
}

/**
 * Simple utility to convert existing HeaderContent to EnhancedHeaderContent
 */
export function convertHeaderContent(headerContent: any): EnhancedHeaderContent {
  return {
    ...headerContent,
    showThemeToggle: true,
    showColorSelector: true,
  }
}

/**
 * Navigation context for dropdown and mobile menu state
 */
export interface NavigationContext {
  /** Currently open dropdown item value */
  openItem?: string
  /** Set open dropdown item */
  setOpenItem: (value?: string) => void
  /** Mobile menu open state */
  mobileMenuOpen: boolean
  /** Set mobile menu open state */
  setMobileMenuOpen: (open: boolean) => void
}

/**
 * Navigation menu item component props
 */
export interface NavigationMenuItemProps {
  /** Menu item data */
  item: NavigationMenuItem
  /** Link component for routing */
  LinkComponent?: ComponentType<any>
  /** Whether this item is currently active */
  active?: boolean
  /** Current nesting level (for styling) */
  level?: number
  /** Click handler */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Navigation menu trigger component props (for dropdown items)
 */
export interface NavigationMenuTriggerProps {
  /** Menu item data */
  item: NavigationMenuItem
  /** Whether this trigger is currently active/open */
  active?: boolean
  /** Click handler */
  onClick?: () => void
  /** Children to render inside trigger */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Navigation menu content component props (for dropdown content)
 */
export interface NavigationMenuContentProps {
  /** Child menu items to display */
  items: NavigationMenuItem[]
  /** Link component for routing */
  LinkComponent?: ComponentType<any>
  /** Current nesting level */
  level?: number
  /** Close handler */
  onClose?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Navigation menu link component props
 */
export interface NavigationMenuLinkProps {
  /** Menu item data */
  item: NavigationMenuItem
  /** Link component for routing */
  LinkComponent?: ComponentType<any>
  /** Whether this link is currently active */
  active?: boolean
  /** Click handler */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Mobile menu component props
 */
export interface MobileMenuProps {
  /** Navigation content */
  content: EnhancedHeaderContent
  /** Whether mobile menu is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Mobile menu variant */
  variant?: 'drawer' | 'dropdown' | 'fullscreen'
  /** Link component for routing */
  LinkComponent?: ComponentType<any>
  /** Image component for brand */
  ImageComponent?: ComponentType<any>
}

// Note: HeaderContent remains in header.ts for backward compatibility
// EnhancedHeaderContent extends it with navigation capabilities