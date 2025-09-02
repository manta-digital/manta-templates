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

// Note: Universal content engine (Slice 17) is not available in Next.js template
// Next.js template uses its own NextjsContentProvider via ui-adapters