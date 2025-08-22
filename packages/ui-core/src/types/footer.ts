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
  ThemeToggleComponent?: React.ComponentType<any>;
  className?: string;
}

export interface DefaultFooterProps {
  sections: FooterSections;
  legalPreset?: 'mit' | 'full';
  LinkComponent?: React.ComponentType<any>;
  ThemeToggleComponent?: React.ComponentType<any>;
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