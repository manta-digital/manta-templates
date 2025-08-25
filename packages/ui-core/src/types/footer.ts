// Framework-agnostic footer types and interfaces

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ContactInfo {
  email?: string;
  location?: string;
  business?: string;
  support?: string;
}

export interface CopyrightInfo {
  notice: string;
  attribution: string;
  lastUpdated: string;
}

export interface FooterSections {
  quickLinks: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
  socialProfessional: FooterLink[];
  socialCommunity: FooterLink[];
  primaryContact: ContactInfo;
  professionalContact: ContactInfo;
  professionalLinks?: FooterLink[];
  copyright: CopyrightInfo;
}

export interface FooterProps {
  sections: FooterSections;
  variant?: 'default' | 'compact';
  legalPreset?: 'mit' | 'full';
  LinkComponent?: React.ComponentType<any>;
  className?: string;
}

export interface DefaultFooterProps {
  sections: FooterSections;
  legalPreset?: 'mit' | 'full';
  LinkComponent?: React.ComponentType<any>;
  className?: string;
}

export interface CompactFooterProps {
  sections: FooterSections;
  legalPreset?: 'mit' | 'full';
  LinkComponent?: React.ComponentType<any>;
  version?: string;
  className?: string;
}

export interface FooterLinkComponentProps {
  link: FooterLink;
  LinkComponent?: React.ComponentType<any>;
  className?: string;
}

/**
 * Get default footer sections for fallback content
 * Framework-agnostic fallback content that works across all templates
 */
export function getDefaultFooterSections(): FooterSections {
  return {
    quickLinks: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Examples', href: '/examples' },
    ],
    resources: [
      { label: 'Guides', href: '/guides' },
      { label: 'Docs', href: '/docs' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
    socialProfessional: [],
    socialCommunity: [],
    primaryContact: { email: '', location: '' },
    professionalContact: { business: '', support: '' },
    copyright: {
      notice: '© 2025 manta.digital. MIT licensed.',
      attribution: 'Built with Next.js, Tailwind CSS, and Manta Templates.',
      lastUpdated: '2025',
    },
  };
}