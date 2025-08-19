// Next.js content system exports
export * from './content';

// Next.js component exports
export * from './components';

// Re-export ui-core types for convenience
export type { 
  ContentProvider, 
  ContentData, 
  ContentMeta,
  ContentError 
} from '@manta-templates/ui-core';

export { 
  ContentLoadError,
  ContentProcessError,
  ContentNotFoundError 
} from '@manta-templates/ui-core';