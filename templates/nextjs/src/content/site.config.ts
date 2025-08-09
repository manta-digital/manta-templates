export type PresetKey = 'placeholder' | 'mit';

export const siteConfig = {
  site: {
    name: 'manta-templates',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://templates.manta.digital',
    domain: 'example.com',
  },
  author: {
    name: 'Your Name',
  },
  contacts: {
    primaryEmail: '',
    businessEmail: '',
    supportEmail: '',
  },
  presets: {
    legal: 'default' as PresetKey,
    footer: 'default' as PresetKey,
  },
  // Optional UI variants; can be expanded later (e.g., header variants)
  variants: {
    footer: 'default' as 'default' | 'compact',
  },
};

export function deriveContacts(cfg = siteConfig) {
  const domain = cfg.site.domain || 'example.com';
  const primary = cfg.contacts.primaryEmail || `info@${domain}`;
  const business = cfg.contacts.businessEmail || `business@${domain}`;
  const support = cfg.contacts.supportEmail || `support@${domain}`;
  return { primary, business, support };
}


