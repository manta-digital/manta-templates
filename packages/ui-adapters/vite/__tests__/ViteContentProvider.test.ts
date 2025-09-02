// Unit tests for ViteContentProvider
// Can be run when vitest is available

import { ViteContentProvider, getViteContentProvider } from '../ViteContentProvider.js';

// Mock import.meta.glob for testing
const mockGlob = {
  '@manta-templates/content/projects/example.md': () => Promise.resolve({
    default: {
      frontmatter: { type: 'project', title: 'Example Project' },
      contentHtml: '<h1>Example</h1>',
      slug: 'projects/example',
      lastModified: new Date('2023-01-01'),
      meta: { readingTime: 1, wordCount: 50, headings: [] }
    }
  }),
  '@manta-templates/content/quotes/test.md': () => Promise.resolve({
    default: {
      frontmatter: { type: 'quote', author: 'Test Author' },
      contentHtml: '<p>Test quote</p>',
      slug: 'quotes/test', 
      lastModified: new Date('2023-01-01'),
      meta: { readingTime: 1, wordCount: 20, headings: [] }
    }
  })
};

// Test cases (would run with vitest)
export const testCases = {
  'should create provider instance': async () => {
    const provider = new ViteContentProvider();
    // Provider should be created successfully
    return provider instanceof ViteContentProvider;
  },

  'should return singleton from factory': async () => {
    const provider1 = getViteContentProvider();
    const provider2 = getViteContentProvider();
    // Should return same instance
    return provider1 === provider2;
  },

  'should generate correct keys': async () => {
    const provider = new ViteContentProvider();
    const key = provider['keyFor']('projects/example');
    // Should generate proper module key
    return key === '@manta-templates/content/projects/example.md';
  },

  'should filter content collection correctly': async () => {
    // Mock the modules property for testing
    const provider = new ViteContentProvider();
    (provider as any).modules = mockGlob;

    const projectResults = await provider.loadContentCollection({ type: 'project' });
    const quoteResults = await provider.loadContentCollection({ type: 'quote' });
    
    // Should filter by type correctly
    return projectResults.length === 1 && 
           quoteResults.length === 1 &&
           projectResults[0].frontmatter.type === 'project' &&
           quoteResults[0].frontmatter.type === 'quote';
  },

  'should cache loaded content': async () => {
    const provider = new ViteContentProvider();
    (provider as any).modules = mockGlob;

    const result1 = await provider.loadContent('projects/example');
    const result2 = await provider.loadContent('projects/example');
    
    // Second load should use cache (same object reference)
    return result1 === result2;
  },

  'should invalidate cache correctly': async () => {
    const provider = new ViteContentProvider();
    (provider as any).modules = mockGlob;

    await provider.loadContent('projects/example');
    provider.invalidate('projects/example');
    
    // Cache should be cleared
    return !(provider as any).contentCache.has('projects/example');
  }
};

console.log('ViteContentProvider test cases defined. Run with vitest when available.');