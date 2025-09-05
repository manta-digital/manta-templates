export type PresetKey = 'default' | 'mit';
export type FooterVariant = 'default' | 'compact';

export const siteConfig = {
  site: {
    name: 'Manta Next.js Template',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    domain: 'example.com',
  },
  author: {
    name: '',
  },
  contacts: {
    primaryEmail: '',
    businessEmail: '',
    supportEmail: '',
  },
  presets: {
    legal: 'mit' as PresetKey,
  },
  // Optional UI variants; can be expanded later (e.g., header variants)
  variants: {
    footer: 'compact' as FooterVariant, // 'default' | 'compact'
  },
  // Optional copyright settings (e.g., "2022–2025"). If omitted, current year is used.
  copyright: {
    year: '',
  },
};

export function deriveContacts(cfg = siteConfig) {
  const domain = cfg.site.domain || 'example.com';
  const primary = cfg.contacts.primaryEmail || `info@${domain}`;
  const business = cfg.contacts.businessEmail || `business@${domain}`;
  const support = cfg.contacts.supportEmail || `support@${domain}`;
  return { primary, business, support };
}


