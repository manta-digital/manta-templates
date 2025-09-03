// React template content system exports
// Only includes what's needed for content consumption, not processing

// Content hooks for React components
export { useContent, useContentCollection } from './hooks';

// Content type interfaces
export type { ContentEngine, ContentResult, ContentFilters } from './contentTypes';

// Content schemas (TypeScript interfaces only)
export type { ProjectContent, QuoteContent, VideoContent } from './schemas';

// Legacy types (kept for compatibility if needed)
export type {
  ContentProvider,
  ContentData,
  ContentMeta,
  ContentError,
  TokenProvider,
  TokenConfig
} from './types';

export {
  ContentLoadError,
  ContentProcessError,
  ContentNotFoundError
} from './types';

// Legal content helper (if available)
export {
  getDefaultLegalContent,
  type LegalContentType,
  type LegalPreset,
  type LegalFrontmatter,
  type DefaultLegalContent
} from './legalContent';