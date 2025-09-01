import React from 'react';
import { Footer } from '../lib/ui-core';
import { FooterProps } from '../lib/ui-core/types/footer';

/**
 * React-specific wrapper for Footer component that adapts React Router Link
 * to work with ui-core Footer components (both compact and default variants)
 * which expect href prop.
 */
export function ReactFooter({ LinkComponent, ...props }: FooterProps) {
  // If no LinkComponent provided, use the Footer as-is
  if (!LinkComponent) {
    return <Footer {...props} />;
  }

  // Create adapter that converts href prop to React Router's to prop
  const ReactRouterLinkAdapter = ({ href, children, ...linkProps }: any) => (
    <LinkComponent to={href} {...linkProps}>
      {children}
    </LinkComponent>
  );

  return <Footer LinkComponent={ReactRouterLinkAdapter} {...props} />;
}