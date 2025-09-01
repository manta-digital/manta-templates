import React from 'react';
import { Header } from '../lib/ui-core';
import { HeaderProps } from '../lib/ui-core/types/header';

/**
 * React-specific wrapper for Header component that adapts React Router Link
 * to work with ui-core Header component which expects href prop.
 */
export function ReactHeader({ LinkComponent, ...props }: HeaderProps) {
  // If no LinkComponent provided, use the Header as-is
  if (!LinkComponent) {
    return <Header {...props} />;
  }

  // Create adapter that converts href prop to React Router's to prop
  const ReactRouterLinkAdapter = ({ href, children, ...linkProps }: any) => (
    <LinkComponent to={href} {...linkProps}>
      {children}
    </LinkComponent>
  );

  return <Header LinkComponent={ReactRouterLinkAdapter} {...props} />;
}