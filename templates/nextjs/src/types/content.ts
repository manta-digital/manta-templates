// Defines the structure of a feature item for cards like ProjectFeatureCard
export interface Feature {
  icon: string;
  label: string;
  color: string; // Tailwind CSS color class
}

// Defines the structure of the project frontmatter
export interface ProjectContent {
  title: string;
  description?: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  features?: Feature[];
  displayMode?: 'standard' | 'feature';
  /** Optional image to support showcase-style layouts */
  image?: string;
  /** Prefer 'showcase' for image-top promo layout */
  displayVariant?: 'showcase';
}

// Defines the structure of the feature frontmatter
export interface FeatureContent {
  title: string;
  description?: string;
  category: 'guides' | 'coming-soon' | 'project';
  techStack?: string[];
  repoUrl?: string;
  demoUrl?: string;
  features?: { label: string; icon?: string }[];
  status?: 'available' | 'coming-soon' | 'beta';
  quickStart?: string;
  waitlistUrl?: string;
  links?: {
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
  };
}

// Defines the structure of the quote frontmatter
export interface QuoteContent {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  featured?: boolean;
  order?: number;
}

// Defines the structure of the video frontmatter
export interface VideoContent {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  displayMode?: 'background' | 'player' | 'thumbnail';
  autoplay?: boolean;
  controls?: boolean;
  poster?: string;
}

// Defines the structure for blog post frontmatter
export interface PostContent {
  title: string;
  description: string;
  pubDate: string;
  author?: string;
  heroImage?: string;
  image?: string;
  thumbnail?: string;
  tags?: string[];
}

// Article promo content (formerly FeaturedArticleContent)
export interface ArticleContent {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  href: string;
  variant?: string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'twitter' | 'mail';
  url: string;
}

export interface AboutContent {
  title: string;
  description?: string;
  avatar?: string;
  socials?: SocialLink[];
}

// Technologies scroller content
export interface TechnologiesContent {
  title: string;
  description: string;
  techs: {
    name: string;
    svg: string;
    color?: string;
    colorDark?: string;
    invertOnDark?: boolean;
  }[];
}
