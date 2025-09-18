import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuLinkProps } from '../../types/navigation';
import { cn } from '../../utils/cn';

/**
 * Navigation Menu Link Component
 * Handles navigation links with framework integration and active states
 */
export function NavigationMenuLink({
  item,
  LinkComponent,
  active = false,
  onClick,
  className
}: NavigationMenuLinkProps) {
  const Link = LinkComponent || 'a';
  
  return (
    <NavigationMenu.Link asChild active={active}>
      <Link
        href={item.href}
        className={cn(
          'text-accent-11 hover:text-accent-12 transition-colors',
          active && 'text-accent-12',
          className
        )}
        onClick={onClick}
        data-testid="navigation-menu-link"
        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-2 px-2 py-1 text-xs bg-accent-9 text-accent-12 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}