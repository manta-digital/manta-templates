// Framework-agnostic UI components for manta-templates
export const version = "0.1.0";

// Components
export * from './components/cards';
export * from './components/layouts';
export * from './components/ui';
export * from './components/primitives';
export * from './components/headers';
export * from './components/footers';
export * from './components/overlays';

// Utilities
export * from './utils';
export * from './hooks';
export * from './types';
export * from './providers';

// Content system exports
export type {
  ContentProvider,
  ContentData,
  ContentMeta,
  ContentError,
  TokenProvider,
  TokenConfig
} from './content';
export {
  ContentLoadError,
  ContentProcessError,
  ContentNotFoundError
} from './content';
export { ContentProcessor } from './content/processor';
export type { ProcessorConfig } from './content/processor';
export { BaseContentProvider } from './content/BaseContentProvider';
export { MockContentProvider } from './content/MockContentProvider';

// Content schemas and types
export type {
  ProjectContent,
  QuoteContent,
  VideoContent,
  ArticleContent,
  TechnologyContent
} from './content/schemas';
export {
  ProjectContentSchema,
  QuoteContentSchema,
  VideoContentSchema,
  ArticleContentSchema,
  TechnologyContentSchema
} from './content/schemas';