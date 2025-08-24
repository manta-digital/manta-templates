import { siteConfig } from '@/content/site.config';
import { nextjsContentProvider, NextjsFooterContent } from '@manta-templates/ui-adapters-nextjs';

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

// ui-adapters approach for footer content loading
export async function getFooterContent() {
  try {
    // Load footer content using ui-adapters pattern
    const content = await nextjsContentProvider.loadContent<NextjsFooterContent>('footer-content', 'footer');
    const sections = content.frontmatter;
    
    // Apply MIT preset override if configured
    if (siteConfig.presets.legal === 'mit') {
      sections.legal = [{ label: 'Legal', href: '/legal' }];
    }
    
    return { sections };
  } catch (error: unknown) {
    console.error('Error loading footer content with ui-adapters:', error);
    
    // Fallback content if loading fails
    const fallback: FooterSections = {
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
    if (siteConfig.presets.legal === 'mit') {
      fallback.legal = [{ label: 'Legal', href: '/legal' }];
    }
    return { sections: fallback };
  }
}