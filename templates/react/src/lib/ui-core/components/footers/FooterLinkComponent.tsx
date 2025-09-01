import React from 'react';
import { FooterLinkComponentProps } from '../../types/footer';

export function FooterLinkComponent({ 
  link, 
  LinkComponent, 
  className = 'text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1' 
}: FooterLinkComponentProps) {
  // Default components
  const AnchorComponent = LinkComponent || 'a';
  
  return link.external ? (
    <AnchorComponent 
      href={link.href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
    >
      {link.label}
      {/* External link icon will be handled by the parent component */}
    </AnchorComponent>
  ) : (
    <AnchorComponent href={link.href} className={className}>
      {link.label}
    </AnchorComponent>
  );
}