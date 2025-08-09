import { getContentBySlug } from './content';

export interface HeaderLink {
  href: string;
  label: string;
}

export interface HeaderData {
  logo?: string;
  /** Optional alternate logo used when the site is in dark theme */
  logoDark?: string;
  title?: string;
  links: HeaderLink[];
}

export async function getHeaderContent() {
  try {
    const content = await getContentBySlug<HeaderData>('main-grid', 'header');
    return content.frontmatter;
  } catch (error) {
    console.warn('Failed to load header content:', error);
    // Fallback
    return {
      title: '',
      links: [
        { href: '/', label: 'Home' },
      ],
    } as HeaderData;
  }
}


