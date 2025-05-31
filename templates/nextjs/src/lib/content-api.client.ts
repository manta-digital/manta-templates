// Client-safe content API without filesystem dependencies
import quotesData from '@/data/quotes.json';
import projectsData from '@/data/projects.json';
import videosData from '@/data/videos.json';
import featuresData from '@/data/features.json';

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

export interface VideoContent {
  slug: string;
  type: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  displayMode?: 'background' | 'player' | 'thumbnail';
  autoplay?: boolean;
  controls?: boolean;
  poster?: string;
  featured?: boolean;
  order?: number;
}

export interface FeatureContent {
  slug: string;
  type: string;
  title: string;
  description?: string;
  category: 'guides' | 'coming-soon' | 'project';
  features?: { icon?: string; label: string }[];
  links?: { label: string; url: string; type?: 'primary' | 'secondary' }[];
  status?: 'available' | 'coming-soon' | 'beta';
  techStack?: string[];
  quickStart?: string;
  repoUrl?: string;
  demoUrl?: string;
  waitlistUrl?: string;
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

// Video content functions
export function getVideoBySlug(slug: string): VideoContent | null {
  return (videosData as VideoContent[]).find(video => video.slug === slug) || null;
}

export function getAllVideos(): VideoContent[] {
  return videosData as VideoContent[];
}

// Feature content functions
export function getFeatureBySlug(slug: string): FeatureContent | null {
  return (featuresData as FeatureContent[]).find(feature => feature.slug === slug) || null;
}

export function getAllFeatures(): FeatureContent[] {
  return featuresData as FeatureContent[];
}

export function getFeaturesByCategory(category: 'guides' | 'coming-soon' | 'project'): FeatureContent[] {
  return (featuresData as FeatureContent[]).filter(feature => feature.category === category);
}
