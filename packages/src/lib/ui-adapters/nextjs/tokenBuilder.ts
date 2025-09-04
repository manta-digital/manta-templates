import type { TokenProvider } from '../../ui-core';

/**
 * Site configuration interface for token building
 * Framework-agnostic version of site config structure
 */
interface SiteConfig {
  site: {
    url: string;
    name: string;
    domain?: string;
  };
  author: {
    name: string;
  };
  contacts?: {
    primaryEmail?: string;
    businessEmail?: string;
    supportEmail?: string;
  };
  copyright?: {
    year?: string;
  };
}

/**
 * Derive contact information with fallback to domain-based defaults
 * Framework-agnostic version of the deriveContacts helper
 */
function deriveContacts(config: SiteConfig) {
  const domain = config.site.domain || 'example.com';
  const primary = config.contacts?.primaryEmail || `info@${domain}`;
  const business = config.contacts?.businessEmail || `business@${domain}`;
  const support = config.contacts?.supportEmail || `support@${domain}`;
  return { primary, business, support };
}

/**
 * Build tokens for content interpolation from site configuration
 * Framework-agnostic version that accepts config as parameter
 * 
 * @param siteConfig - Site configuration object
 * @returns Record of token names to replacement values
 */
export function buildTokens(siteConfig: SiteConfig): Record<string, string> {
  const contacts = deriveContacts(siteConfig);
  const resolvedAuthorName = (siteConfig.author.name && siteConfig.author.name.trim()) || siteConfig.site.name;
  
  const tokens: Record<string, string> = {
    'site.name': siteConfig.site.name || '',
    'site.url': siteConfig.site.url || '',
    'author.name': resolvedAuthorName || '',
    'contacts.primaryEmail': contacts.primary || '',
    'contacts.businessEmail': contacts.business || '',
    'contacts.supportEmail': contacts.support || '',
  };

  // Handle copyright year with fallback logic
  const currentYear = new Date().getFullYear().toString();
  const configuredYear = siteConfig.copyright?.year?.trim();
  const yearToUse = configuredYear || currentYear;
  
  tokens['copyright.year'] = yearToUse;
  tokens['copyright.lastUpdated'] = yearToUse;
  tokens['copyright.holder'] = resolvedAuthorName || '';

  return tokens;
}

/**
 * NextJS Token Provider implementation
 * Implements the TokenProvider interface for NextJS sites
 */
export class NextjsTokenProvider implements TokenProvider {
  private siteConfig: SiteConfig;

  constructor(siteConfig: SiteConfig) {
    this.siteConfig = siteConfig;
  }

  /**
   * Build tokens using the provided site configuration
   * @returns Record of token names to replacement values
   */
  buildTokens(): Record<string, string> {
    return buildTokens(this.siteConfig);
  }
}