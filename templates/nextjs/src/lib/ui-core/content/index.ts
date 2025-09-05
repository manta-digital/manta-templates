// Content system exports
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

export { ContentProcessor } from './processor';
export type { ProcessorConfig } from './processor';

export { BaseContentProvider } from './BaseContentProvider';
export { MockContentProvider } from './MockContentProvider';

// Legal content helper
export {
  getDefaultLegalContent,
  type LegalContentType,
  type LegalPreset,
  type LegalFrontmatter,
  type DefaultLegalContent
} from './legalContent';

// New universal content engine (Slice 17)
export type {
  ContentEngine,
  ContentFilters,
  ContentResult,
  RenderOptions,
  ValidationResult
} from './ContentEngine';

export { processMarkdownContent } from './ContentEngine';

export {
  ProjectContentSchema,
  QuoteContentSchema,
  VideoContentSchema,
  ArticleContentSchema,
  TechnologyContentSchema,
  AboutContentSchema,
  type ProjectContent,
  type QuoteContent,
  type VideoContent,
  type ArticleContent,
  type TechnologyContent,
  type AboutContent
} from './schemas';

export { useContent, useContentCollection } from './hooks';