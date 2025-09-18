// Navigation components
export * from './tabs';

// Enhanced Header Navigation Components
export { EnhancedHeader } from './EnhancedHeader';
export { NavigationMenuItem } from './NavigationMenuItem';
export { NavigationMenuTrigger } from './NavigationMenuTrigger';
export { NavigationMenuContent } from './NavigationMenuContent';
export { NavigationMenuLink } from './NavigationMenuLink';
export { MobileMenu } from './MobileMenu';

// Re-export types and utilities for convenience (avoid NavigationMenuItem conflict)
export type {
  EnhancedHeaderContent,
  EnhancedHeaderProps,
  NavigationContext,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  MobileMenuProps
} from '../../types/navigation';

export { convertHeaderContent } from '../../types/navigation';