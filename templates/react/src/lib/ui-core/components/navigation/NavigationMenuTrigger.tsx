import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuTriggerProps } from '../../types/navigation';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

/**
 * Navigation Menu Trigger Component
 * Handles dropdown triggers with proper accessibility and interaction
 */
export function NavigationMenuTrigger({
  item,
  active = false,
  onClick,
  children,
  className
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenu.Trigger
      className={cn(
        'flex items-center gap-1 px-3 py-2 text-accent-11 hover:text-accent-12 transition-colors rounded-md hover:bg-accent-3',
        'data-[state=open]:text-accent-12 data-[state=open]:bg-accent-3',
        className
      )}
      onClick={onClick}
      data-testid="navigation-menu-trigger"
    >
      <span>{item.label}</span>
      <ChevronDown size={16} className="transition-transform data-[state=open]:rotate-180" aria-hidden="true" />
      {children}
    </NavigationMenu.Trigger>
  );
}