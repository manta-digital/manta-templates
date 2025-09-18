import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import * as Icons from 'lucide-react';
import { NavigationMenuItemProps } from '../../types/navigation';
import { NavigationMenuLink } from './NavigationMenuLink';
import { NavigationMenuTrigger } from './NavigationMenuTrigger';
import { NavigationMenuContent } from './NavigationMenuContent';
import { cn } from '../../utils/cn';

/**
 * CVA variants for navigation menu items
 */
const navigationMenuItemVariants = cva(
  'relative group',
  {
    variants: {
      hasChildren: {
        true: 'cursor-pointer',
        false: ''
      },
      level: {
        0: '',
        1: 'pl-4',
        2: 'pl-8', 
        3: 'pl-12'
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: ''
      },
      active: {
        true: 'bg-accent-3 text-accent-12',
        false: ''
      }
    },
    defaultVariants: {
      hasChildren: false,
      level: 0,
      disabled: false,
      active: false
    }
  }
);

export interface NavigationMenuItemVariants 
  extends VariantProps<typeof navigationMenuItemVariants> {}

/**
 * Navigation Menu Item Component
 * Handles individual navigation items with support for dropdowns and nested menus
 * Includes icon support, badge display, disabled states, and proper accessibility
 */
export function NavigationMenuItem({
  item,
  LinkComponent,
  active = false,
  level = 0,
  onClick,
  className
}: NavigationMenuItemProps) {
  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Allow default Radix behavior for arrow keys, Enter, Space, Escape
    // This is automatically handled by Radix NavigationMenu primitives
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };
  // Handle disabled items
  if (item.disabled) {
    return (
      <div 
        className={cn(
          navigationMenuItemVariants({ 
            hasChildren: Boolean(item.children), 
            level: Math.min(level, 3) as 0 | 1 | 2 | 3,
            disabled: true,
            active: false
          }),
          'px-3 py-2 text-muted-foreground',
          className
        )}
        aria-disabled="true"
        data-testid="navigation-menu-item-disabled"
      >
        <div className="flex items-center gap-2">
          {/* Icon rendering */}
          {item.icon && (() => {
            const IconComponent = (Icons as any)[item.icon];
            return IconComponent ? <IconComponent size={16} aria-hidden="true" /> : null;
          })()}
          
          <span>{item.label}</span>
          
          {/* Badge rendering */}
          {item.badge && (
            <span 
              className="ml-auto px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
              aria-label={`Badge: ${item.badge}`}
            >
              {item.badge}
            </span>
          )}
        </div>
      </div>
    );
  }

  // If item has children, render as trigger with dropdown
  if (item.children && item.children.length > 0) {
    return (
      <NavigationMenu.Item 
        className={cn(
          navigationMenuItemVariants({ 
            hasChildren: true,
            level: Math.min(level, 3) as 0 | 1 | 2 | 3,
            disabled: false,
            active
          }),
          className
        )}
        onKeyDown={handleKeyDown}
        data-testid="navigation-menu-item-dropdown"
      >
        <NavigationMenuTrigger
          item={item}
          active={active}
          onClick={onClick}
        />
        <NavigationMenuContent
          items={item.children}
          LinkComponent={LinkComponent}
          level={level + 1}
          onClose={onClick}
        />
      </NavigationMenu.Item>
    );
  }

  // Simple link item
  return (
    <NavigationMenu.Item 
      className={cn(
        navigationMenuItemVariants({ 
          hasChildren: false,
          level: Math.min(level, 3) as 0 | 1 | 2 | 3,
          disabled: false,
          active
        }),
        className
      )}
      onKeyDown={handleKeyDown}
      data-testid="navigation-menu-item-link"
    >
      <NavigationMenuLink
        item={item}
        LinkComponent={LinkComponent}
        active={active}
        onClick={onClick}
      />
    </NavigationMenu.Item>
  );
}