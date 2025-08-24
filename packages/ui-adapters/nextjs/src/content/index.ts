import { NextjsContentProvider } from './NextjsContentProvider';
import type { ArticleContent, ProjectContent, QuoteContent } from '@manta-templates/ui-core';

export { NextjsContentProvider };

// Single configurable Next.js content provider instance
// Use with generic typing: nextjsContentProvider.loadContent<ArticleContent>('slug', 'articles')
export const nextjsContentProvider = new NextjsContentProvider({
  enableCaching: true,
  codeTheme: 'github-dark'
});

// Types for Next.js specific content structures
export interface NextjsArticleContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  pubDate?: string;
  author?: string;
  tags?: string[];
}

export interface NextjsProjectContent {
  title?: string;
  description?: string;
  image?: string;
  pubDate?: string;
  technologies?: string[];
  link?: string;
  github?: string;
}

export interface NextjsBlogContent {
  title?: string;
  description?: string;
  image?: string;
  pubDate?: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
}

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