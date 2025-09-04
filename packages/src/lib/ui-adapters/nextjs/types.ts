// Header content interface for Next.js specific header structures
export interface NextjsHeaderContent {
  logo?: string;
  logoDark?: string;
  title?: string;
  links: Array<{
    href: string;
    label: string;
    external?: boolean;
  }>;
}

// Footer content interface for Next.js specific footer structures  
// Matches FooterSections interface exactly for seamless ui-adapters integration
export interface NextjsFooterContent {
  quickLinks: Array<{ label: string; href: string; external?: boolean }>;
  resources: Array<{ label: string; href: string; external?: boolean }>;
  legal: Array<{ label: string; href: string; external?: boolean }>;
  socialProfessional: Array<{ label: string; href: string; external?: boolean }>;
  socialCommunity: Array<{ label: string; href: string; external?: boolean }>;
  primaryContact: {
    email?: string;
    location?: string;
    business?: string;
    support?: string;
  };
  professionalContact: {
    email?: string;
    location?: string;
    business?: string;
    support?: string;
  };
  professionalLinks?: Array<{ label: string; href: string; external?: boolean }>;
  copyright: {
    notice: string;
    attribution: string;
    lastUpdated: string;
  };
}