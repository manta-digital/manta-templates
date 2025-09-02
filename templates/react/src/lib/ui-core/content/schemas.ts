// Simple TypeScript interfaces for content types (React template)
// No runtime validation - that happens at build time via Vite plugin

export interface ProjectContent {
  type: 'project';
  title: string;
  description: string;
  techStack: string[];
  image: string;
  repoUrl: string;
  liveUrl?: string;
  features: Array<{
    label: string;
    icon: string;
    color?: string;
  }>;
  actions: Array<{
    label: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary';
  }>;
}

export interface QuoteContent {
  type: 'quote';
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  theme?: 'default' | 'minimal' | 'emphasis';
}

export interface VideoContent {
  type: 'video';
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  displayMode: 'thumbnail' | 'background' | 'player';
  autoplay?: boolean;
  loop?: boolean;
}