import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuContentProps } from '../../types/navigation';
import { NavigationMenuLink } from './NavigationMenuLink';
import { cn } from '../../utils/cn';

/**
 * Navigation Menu Content Component
 * Renders dropdown content with support for multi-level navigation
 */
export function NavigationMenuContent({
  items,
  LinkComponent,
  level = 0,
  onClose,
  className
}: NavigationMenuContentProps) {
  return (
    <NavigationMenu.Content 
      className={cn(
        'absolute top-full left-0 w-auto min-w-[200px] bg-background border border-border rounded-md shadow-lg p-2 mt-1',
        'data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-1/2',
        'data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-1/2',
        'data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-1/2',
        'data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-1/2',
        className
      )}
      data-testid="navigation-menu-content"
    >
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={item.href || index}>
            <NavigationMenuLink
              item={item}
              LinkComponent={LinkComponent}
              onClick={onClose}
              className="block px-3 py-2 text-sm hover:bg-accent-3 rounded-sm transition-colors"
            />
            {item.children && item.children.length > 0 && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-border/40 pl-3">
                {item.children.map((child, childIndex) => (
                  <li key={child.href || childIndex}>
                    <NavigationMenuLink
                      item={child}
                      LinkComponent={LinkComponent}
                      onClick={onClose}
                      className="block px-2 py-1 text-sm text-accent-11 hover:text-accent-12 hover:bg-accent-3 rounded-sm transition-colors"
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </NavigationMenu.Content>
  );
}