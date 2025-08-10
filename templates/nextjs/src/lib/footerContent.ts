import { getPresetContent } from './presetContent';
import { siteConfig } from '@/content/site.config';

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

function parseFooterContent(contentHtml: string): FooterSections {
  const section = (name: string) => new RegExp(`<h3[^>]*>${name}</h3>([\\s\\S]*?)(?=<h[23]|$)`, 'i');
  const linksFrom = (html: string): FooterLink[] => {
    const out: FooterLink[] = [];
    const linkRe = /<a href="([^"]*)"[^>]*>([^<]*)</g;
    let m;
    while ((m = linkRe.exec(html)) !== null) out.push({ href: m[1], label: m[2], external: m[1].startsWith('http') });
    return out;
  };

  const contactFrom = (html: string): ContactInfo => {
    const get = (re: RegExp) => html.match(re)?.[2]?.trim();
    return {
      email: get(/<strong>Email<\/strong>(.*?)<a href="mailto:([^"]+)"/i),
      location: html.match(/<strong>Location<\/strong>:([^<\n]*)/i)?.[1]?.trim(),
      business: get(/<strong>Business Inquiries<\/strong>(.*?)<a href="mailto:([^"]+)"/i),
      support: get(/<strong>Technical Support<\/strong>(.*?)<a href="mailto:([^"]+)"/i),
    };
  };

  const copyrightFrom = (html: string): CopyrightInfo => {
    const notice = html.match(/<strong>Copyright Notice<\/strong>:([^<\n]*)/i)?.[1]?.trim();
    const attribution = html.match(/<strong>Attribution<\/strong>:\s*([\s\S]*?)<\/p>/i)?.[1]?.trim();
    const updated = html.match(/<strong>Last Updated<\/strong>:([^<\n]*)/i)?.[1]?.trim();
    const currentYear = new Date().getFullYear().toString();
    const configuredYear = siteConfig.copyright?.year?.trim();
    const yearToUse = configuredYear || currentYear;

    return {
      notice: notice || `© ${yearToUse} ${siteConfig.author.name}.`,
      attribution: attribution || '',
      lastUpdated: updated || yearToUse,
    };
  };

  const s = (name: string) => (contentHtml.match(section(name))?.[1] ?? '');

  return {
    quickLinks: linksFrom(s('Quick Links')),
    resources: linksFrom(s('Resources')),
    legal: linksFrom(s('Legal')),
    socialProfessional: linksFrom(s('Professional Networks')),
    socialCommunity: linksFrom(s('Development Communities')),
    primaryContact: contactFrom(s('Primary Contact')),
    professionalContact: contactFrom(s('Professional')),
    professionalLinks: linksFrom(s('Professional')),
    copyright: copyrightFrom(contentHtml),
  };
}

export async function getFooterContent() {
  try {
    // Load footer content from default path, or MIT preset only if explicitly available later
    const content = await getPresetContent<Record<string, unknown>>('footer', 'footer-content', 'default');
    const sections = parseFooterContent(content.contentHtml);
    // If legal preset is MIT, force single-page legal link regardless of footer content pack
    if (siteConfig.presets.legal === 'mit') {
      sections.legal = [{ label: 'Legal', href: '/legal' }];
    }
    return { sections };
  } catch {
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


