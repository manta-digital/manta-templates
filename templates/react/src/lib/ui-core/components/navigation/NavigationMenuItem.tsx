import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuItemProps } from '../../types/navigation';
import { NavigationMenuLink } from './NavigationMenuLink';
import { NavigationMenuTrigger } from './NavigationMenuTrigger';
import { NavigationMenuContent } from './NavigationMenuContent';

/**
 * Navigation Menu Item Component
 * Handles individual navigation items with support for dropdowns and nested menus
 */
export function NavigationMenuItem({
  item,
  LinkComponent,
  active = false,
  level = 0,
  onClick,
  className
}: NavigationMenuItemProps) {
  // If item has children, render as trigger with dropdown
  if (item.children && item.children.length > 0) {
    return (
      <>
        <NavigationMenuTrigger
          item={item}
          active={active}
          onClick={onClick}
          className={className}
        />
        <NavigationMenuContent
          items={item.children}
          LinkComponent={LinkComponent}
          level={level + 1}
          onClose={onClick}
        />
      </>
    );
  }

  // Simple link item
  return (
    <NavigationMenuLink
      item={item}
      LinkComponent={LinkComponent}
      active={active}
      onClick={onClick}
      className={className}
    />
  );
}