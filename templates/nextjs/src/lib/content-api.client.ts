// Client-safe content API without filesystem dependencies
import quotesData from '@/data/quotes.json';
import projectsData from '@/data/projects.json';

export enum ContentType {
  BLOG = 'blog',
  QUOTE = 'quotes',
  PROJECT = 'projects',
  VIDEO = 'videos',
  FEATURE = 'features',
  DEMO = 'demos'
}

export interface QuoteContent {
  slug: string;
  type: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  featured?: boolean;
  order?: number;
}

export interface ProjectContent {
  slug: string;
  type: string;
  title: string;
  description?: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  features?: { label: string }[];
  displayMode?: 'standard' | 'feature';
  featured?: boolean;
  order?: number;
}

export function getQuoteBySlug(slug: string): QuoteContent | null {
  return quotesData.find(quote => quote.slug === slug) || null;
}

export function getAllQuotes(): QuoteContent[] {
  return quotesData;
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  return (projectsData as ProjectContent[]).find(project => project.slug === slug) || null;
}

export function getAllProjects(): ProjectContent[] {
  return projectsData as ProjectContent[];
}
