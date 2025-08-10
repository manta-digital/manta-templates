import React from 'react';
import { siteConfig } from '@/content/site.config';
import DefaultFooter from './footers/DefaultFooter';
import CompactFooter from './footers/CompactFooter';

// Runtime variant switch controlled by site.config.ts
// - variants.footer = 'default' | 'compact'
export default async function Footer() {
  if (siteConfig.variants.footer === 'compact') {
    return <CompactFooter />;
  }
  return <DefaultFooter />;
}
