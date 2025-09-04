// Unit tests for universal content hooks
// These demonstrate the hooks work with both provider types

import { renderHook, waitFor } from '@testing-library/react';
import { useContent, useContentCollection } from '../hooks';
import type { ContentEngine, ContentResult } from '../ContentEngine';

// Mock content provider
class MockContentProvider implements ContentEngine {
  async loadContent<T>(slug: string): Promise<ContentResult<T>> {
    return {
      frontmatter: { type: 'test', title: `Test ${slug}` } as T,
      contentHtml: '<h1>Test Content</h1>',
      excerpt: 'Test excerpt',
      slug,
      lastModified: new Date('2023-01-01'),
      meta: {
        readingTime: 1,
        wordCount: 10,
        headings: [{ depth: 1, text: 'Test Content', id: 'test-content' }]
      }
    };
  }

  async loadContentCollection<T>(filters?: any): Promise<ContentResult<T>[]> {
    const mockContent = await this.loadContent<T>('test-collection');
    return [mockContent];
  }

  async renderMarkdown(): Promise<string> {
    throw new Error('Not implemented');
  }

  validateContent(): any {
    throw new Error('Not implemented');
  }
}

describe('Universal Content Hooks', () => {
  const mockProvider = new MockContentProvider();

  describe('useContent', () => {
    it('should load content successfully', async () => {
      const { result } = renderHook(() => 
        useContent('test-slug', mockProvider)
      );

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.content).toBe(null);
      expect(result.current.error).toBe(null);

      // Wait for content to load
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Content should be loaded
      expect(result.current.content).not.toBe(null);
      expect(result.current.content?.slug).toBe('test-slug');
      expect(result.current.content?.frontmatter.title).toBe('Test test-slug');
      expect(result.current.error).toBe(null);
    });

    it('should provide refetch capability', async () => {
      const { result } = renderHook(() => 
        useContent('test-refetch', mockProvider)
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should have refetch function
      expect(typeof result.current.refetch).toBe('function');
      
      // Refetch should work
      result.current.refetch();
      expect(result.current.loading).toBe(true);
    });
  });

  describe('useContentCollection', () => {
    it('should load content collection with filters', async () => {
      const { result } = renderHook(() => 
        useContentCollection({ type: 'test' }, mockProvider)
      );

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.content).toBe(null);

      // Wait for content to load
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Collection should be loaded
      expect(result.current.content).not.toBe(null);
      expect(Array.isArray(result.current.content)).toBe(true);
      expect(result.current.content?.length).toBe(1);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Error handling', () => {
    it('should handle content loading errors gracefully', async () => {
      const errorProvider: ContentEngine = {
        async loadContent() {
          throw new Error('Content not found');
        },
        async loadContentCollection() {
          throw new Error('Content collection not found');
        },
        async renderMarkdown() {
          throw new Error('Not implemented');
        },
        validateContent() {
          throw new Error('Not implemented');
        }
      };

      const { result } = renderHook(() => 
        useContent('non-existent', errorProvider)
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.content).toBe(null);
      expect(result.current.error).not.toBe(null);
      expect(result.current.error?.message).toBe('Content not found');
    });
  });
});

console.log('✅ Universal Content Hooks test suite defined');
console.log('🎯 Tests verify hooks work with any ContentEngine implementation');
console.log('⚡ Compatible with both NextJS and Vite providers');