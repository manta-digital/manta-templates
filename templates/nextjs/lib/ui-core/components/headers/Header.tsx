import React from 'react';
import { HeaderWrapperProps } from '../../types/header';
import { DefaultHeader } from './DefaultHeader';

export function Header({ 
  variant = 'default',
  ...props 
}: HeaderWrapperProps) {
  switch (variant) {
    case 'default':
    default:
      return <DefaultHeader {...props} />;
  }
}