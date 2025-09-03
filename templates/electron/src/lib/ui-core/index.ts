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
export * from './components/video';

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
  TokenConfig,
  LegalContentType,
  LegalPreset,
  LegalFrontmatter,
  DefaultLegalContent
} from './content';
export {
  ContentLoadError,
  ContentProcessError,
  ContentNotFoundError,
  getDefaultLegalContent
} from './content';
// Content hooks and types for React template
export { useContent, useContentCollection } from './content/hooks';
export type { ContentEngine, ContentResult, ContentFilters } from './content/contentTypes';
export type { ProjectContent, QuoteContent, VideoContent } from './content/schemas';