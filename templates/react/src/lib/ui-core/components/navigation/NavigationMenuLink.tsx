import React from 'react';
import { NavigationMenuLinkProps } from '../../types/navigation';

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
  
  // Placeholder implementation
  return (
    <Link
      href={item.href}
      className={className}
      onClick={onClick}
      data-testid="navigation-menu-link"
      data-active={active}
      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {item.icon && <span className="icon">{item.icon}</span>}
      <span>{item.label}</span>
      {item.badge && <span className="badge">{item.badge}</span>}
    </Link>
  );
}