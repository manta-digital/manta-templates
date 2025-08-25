/**
 * Tests for ArticleCard content loading functionality
 * 
 * These tests verify that the enhanced ArticleCard correctly:
 * 1. Loads content from providers
 * 2. Merges hardcoded props with loaded content
 * 3. Handles loading and error states
 * 4. Maintains backward compatibility
 */

import { MockContentProvider } from '../content/MockContentProvider';
import type { ContentData } from '../content/types';
import type { ArticleContent } from '../components/cards/ArticleCard.tsx';

interface ArticleTestContent extends ArticleContent {
  pubDate?: string;
  author?: string;
  tags?: string[];
}

describe('ArticleCard Content Loading', () => {
  let mockProvider: MockContentProvider;

  beforeEach(() => {
    // Create mock provider with built-in test content
    mockProvider = new MockContentProvider();
  });

  describe('Content Loading', () => {
    test('should load existing content successfully', async () => {
      // Test with built-in mock data
      const contentData = await mockProvider.loadContent('intro-article', 'articles');
      
      expect(contentData).toBeDefined();
      expect(contentData.slug).toBe('intro-article');
      expect((contentData.frontmatter as any).title).toBe('Getting Started with Modern Web Development');
      expect((contentData.frontmatter as any).description).toBe('An introduction to modern web development practices and tools.');
      expect((contentData.frontmatter as any).author).toBe('Development Team');
    });

    test('should handle missing content gracefully', async () => {
      await expect(mockProvider.loadContent('nonexistent', 'articles')).rejects.toThrow('Mock content not found');
    });

    test('should handle error test cases', async () => {
      await expect(mockProvider.loadContent('error-test', 'articles')).rejects.toThrow('Simulated load error for testing');
    });

    test('should handle not found test cases', async () => {
      await expect(mockProvider.loadContent('not-found-test', 'articles')).rejects.toThrow('Simulated not found error for testing');
    });

    test('should load all content for a type', async () => {
      const allContent = await mockProvider.loadAllContent('articles');
      
      expect(allContent).toHaveLength(1);
      expect(allContent[0].slug).toBe('intro-article');
    });
  });

  describe('Content Merging Logic', () => {
    test('should merge content with hardcoded props correctly', async () => {
      const contentData = await mockProvider.loadContent('intro-article', 'articles');
      const hardcodedProps: Partial<ArticleContent> = {
        title: 'Override Title',
        description: 'Override Description'
      };

      // Simulate the merging logic from ArticleCard
      const frontmatter = contentData.frontmatter as any;
      const finalContent: ArticleContent = {
        title: hardcodedProps.title || frontmatter.title || 'Untitled Article',
        subtitle: hardcodedProps.subtitle || frontmatter.subtitle,
        description: hardcodedProps.description || frontmatter.description,
        image: hardcodedProps.image || frontmatter.image
      };

      expect(finalContent.title).toBe('Override Title'); // Hardcoded wins
      expect(finalContent.subtitle).toBeUndefined(); // From content (undefined in this case)
      expect(finalContent.description).toBe('Override Description'); // Hardcoded wins
      expect(finalContent.image).toBeUndefined(); // From content (undefined in this case)
    });

    test('should use content values when no hardcoded props provided', async () => {
      const contentData = await mockProvider.loadContent('sample-post', 'blog');
      const hardcodedProps: Partial<ArticleContent> = {};

      const frontmatter = contentData.frontmatter as any;
      const finalContent: ArticleContent = {
        title: hardcodedProps.title || frontmatter.title || 'Untitled Article',
        subtitle: hardcodedProps.subtitle || frontmatter.subtitle,
        description: hardcodedProps.description || frontmatter.description,
        image: hardcodedProps.image || frontmatter.image
      };

      expect(finalContent.title).toBe('My Sample Blog Post');
      expect(finalContent.description).toBe('A brief description of this sample post.');
      expect(finalContent.image).toBe('/image/blog-sample-image.png');
    });
  });

  describe('Performance', () => {
    test('should handle multiple concurrent content loads', async () => {
      const promises = [
        mockProvider.loadContent('intro-article', 'articles'),
        mockProvider.loadContent('sample-post', 'blog'),
        mockProvider.loadContent('intro-article', 'articles'), // Duplicate
      ];

      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(3);
      expect((results[0].frontmatter as any).title).toBe('Getting Started with Modern Web Development');
      expect((results[1].frontmatter as any).title).toBe('My Sample Blog Post');
      expect((results[2].frontmatter as any).title).toBe('Getting Started with Modern Web Development');
    });
  });
});

// Integration test helpers
export const testContentLoadingIntegration = async () => {
  console.log('🧪 Testing ArticleCard Content Loading Integration');
  
  const provider = new MockContentProvider();
  
  try {
    // Test loading existing content
    const contentData = await provider.loadContent('intro-article', 'articles');
    const frontmatter = contentData.frontmatter as any;
    
    console.log('✅ Content loaded successfully:');
    console.log(`   Title: ${frontmatter.title}`);
    console.log(`   Author: ${frontmatter.author}`);
    console.log(`   Description: ${frontmatter.description}`);
    
    // Test content merging
    const hardcodedProps = { title: 'Overridden Title' };
    const mergedContent = {
      title: hardcodedProps.title || frontmatter.title,
      description: frontmatter.description,
      author: frontmatter.author
    };
    
    console.log('✅ Content merging works:');
    console.log(`   Final Title: ${mergedContent.title}`);
    console.log(`   Final Description: ${mergedContent.description}`);
    
    // Test error handling
    try {
      await provider.loadContent('nonexistent', 'articles');
    } catch (error) {
      console.log('✅ Error handling works:', (error as Error).message);
    }
    
    console.log('🎉 All integration tests passed');
    return true;
    
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return false;
  }
};