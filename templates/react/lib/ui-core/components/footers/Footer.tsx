import React from 'react';
import { FooterProps } from '../../types/footer';
import { DefaultFooter } from './DefaultFooter';
import { CompactFooter } from './CompactFooter';

interface FooterWrapperProps extends FooterProps {
  version?: string;
}

export function Footer({ 
  variant = 'default',
  legalPreset = 'full',
  sections,
  LinkComponent,
  className,
  ...props 
}: FooterWrapperProps) {
  switch (variant) {
    case 'compact':
      return (
        <CompactFooter 
          sections={sections}
          legalPreset={legalPreset}
          LinkComponent={LinkComponent}
          className={className}
          {...props}
        />
      );
    case 'default':
    default:
      return (
        <DefaultFooter 
          sections={sections}
          legalPreset={legalPreset}
          LinkComponent={LinkComponent}
          className={className}
        />
      );
  }
}