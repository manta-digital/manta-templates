// Simple test file - can be run when vitest is available
// For now, this documents expected behavior
import { viteContentPlugin } from '../vite-plugin-content.js';
import fs from 'node:fs/promises';

// Mock fs.stat
vi.mock('node:fs/promises', () => ({
  stat: vi.fn()
}));

const mockFs = vi.mocked(fs);

describe('viteContentPlugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock file stats
    mockFs.stat.mockResolvedValue({
      mtime: new Date('2023-01-01T00:00:00Z')
    } as any);
  });

  it('should create plugin with correct name', () => {
    const plugin = viteContentPlugin();
    expect(plugin.name).toBe('vite-plugin-content');
  });

  it('should return null for non-markdown files', async () => {
    const plugin = viteContentPlugin();
    const result = await plugin.transform!('content', 'test.js');
    expect(result).toBe(null);
  });

  it('should transform simple markdown to ESM module', async () => {
    const plugin = viteContentPlugin();
    
    const markdownContent = `---
type: test
title: Test Content
---
# Hello World

This is **bold** text.`;

    const result = await plugin.transform!(markdownContent, '/test/content.md');
    
    expect(result).not.toBe(null);
    expect(result?.code).toContain('const compiled = {');
    expect(result?.code).toContain('frontmatter: {"type":"test","title":"Test Content"}');
    expect(result?.code).toContain('contentHtml:');
    expect(result?.code).toContain('export default compiled');
  });

  it('should sanitize HTML content by default', async () => {
    const plugin = viteContentPlugin({ sanitize: true });
    
    const markdownContent = `---
type: test
---
<script>alert('xss')</script>
# Safe Content`;

    const result = await plugin.transform!(markdownContent, '/test/content.md');
    
    // The HTML should be sanitized (script tags removed)
    expect(result?.code).not.toContain('<script>');
  });

  it('should handle external links with security attributes', async () => {
    const plugin = viteContentPlugin();
    
    const markdownContent = `---
type: test
---
[External Link](https://example.com)`;

    const result = await plugin.transform!(markdownContent, '/test/content.md');
    
    // Should add target="_blank" and rel attributes for security
    expect(result?.code).toContain('target="_blank"');
    expect(result?.code).toContain('noopener');
    expect(result?.code).toContain('noreferrer');
  });

  it('should generate correct slug from file path', async () => {
    const plugin = viteContentPlugin();
    
    // Mock config resolution
    const mockConfig = {
      resolve: {
        alias: [{
          find: '@manta-templates/content',
          replacement: '/Users/test/packages/content/src'
        }]
      }
    };
    
    plugin.configResolved!(mockConfig as any);
    
    const markdownContent = `---
type: test
---
# Test`;

    const result = await plugin.transform!(markdownContent, '/Users/test/packages/content/src/projects/example.md');
    
    expect(result?.code).toContain('"slug":"projects/example"');
  });

  it('should collect headings metadata', async () => {
    const plugin = viteContentPlugin();
    
    const markdownContent = `---
type: test
---
# Main Title
## Subtitle
### Sub-subtitle`;

    const result = await plugin.transform!(markdownContent, '/test/content.md');
    
    expect(result?.code).toContain('headings:');
    expect(result?.code).toContain('"depth":1');
    expect(result?.code).toContain('"depth":2');
    expect(result?.code).toContain('"depth":3');
  });

  it('should calculate reading time and word count', async () => {
    const plugin = viteContentPlugin();
    
    const markdownContent = `---
type: test
---
# Test

This is a test with exactly ten words in it.`;

    const result = await plugin.transform!(markdownContent, '/test/content.md');
    
    expect(result?.code).toContain('wordCount:10');
    expect(result?.code).toContain('readingTime:1'); // Math.ceil(10/200) = 1
  });

  it('should handle HMR for markdown files', () => {
    const plugin = viteContentPlugin();
    
    const mockCtx = {
      file: '/test/content.md',
      modules: ['module1', 'module2']
    };

    const result = plugin.handleHotUpdate!(mockCtx as any);
    expect(result).toEqual(['module1', 'module2']);
  });

  it('should not handle HMR for non-markdown files', () => {
    const plugin = viteContentPlugin();
    
    const mockCtx = {
      file: '/test/script.js',
      modules: ['module1']
    };

    const result = plugin.handleHotUpdate!(mockCtx as any);
    expect(result).toBeUndefined();
  });
});