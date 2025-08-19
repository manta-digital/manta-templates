import { NextjsContentProvider } from './NextjsContentProvider';
import type { ArticleContent } from '@manta-templates/ui-core';

export { NextjsContentProvider };

// Default Next.js content provider instance with standard configuration
export const nextjsContentProvider = new NextjsContentProvider<ArticleContent>({
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