export type PresetKey = 'default' | 'mit';

export const siteConfig = {
  site: {
    name: 'Manta Templates',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://templates.manta.digital',
    domain: 'manta.digital',
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
    footer: 'default', // 'default' | 'compact'
  },
  // Theme configuration
  theme: {
    primary: 'teal', // 'teal' | 'forest' | 'banana' | 'sunset' | 'purple' | 'blue'
  },
  // Optional copyright settings (e.g., "2022–2025"). If omitted, current year is used.
  copyright: {
    year: '',
  },
};

export function deriveContacts(cfg = siteConfig) {
  const domain = cfg.site.domain || 'manta.digital';
  const primary = cfg.contacts.primaryEmail || `info@${domain}`;
  const business = cfg.contacts.businessEmail || `business@${domain}`;
  const support = cfg.contacts.supportEmail || `support@${domain}`;
  return { primary, business, support };
}


