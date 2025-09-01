// Home page content
export * from './homeContent';

// Project and showcase content
export * from './projectContent';

// Quote and testimonial content  
export * from './quoteContent';

// Article and blog content
export * from './articleContent';

// Technology stack and build tool content
export * from './technologyContent';

// Re-export common content collections for easy usage
export { 
  homeContent,
  pageMetadata 
} from './homeContent';

export { 
  reactProjectContent,
  showcaseProjects 
} from './projectContent';

export { 
  sampleQuote,
  testimonialQuotes,
  philosophyQuote 
} from './quoteContent';

export { 
  featuredArticle,
  relatedArticles,
  draftArticles 
} from './articleContent';

export { 
  techStack,
  buildTools,
  categories,
  performanceStats 
} from './technologyContent';

// Layout content
export { headerContent } from './headerContent';
export { footerContent } from './footerContent';