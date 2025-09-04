import { describe, it, expect } from 'vitest';
import { processMarkdownContent, type RenderOptions } from '../ContentEngine.js';
import { ProjectContentSchema, QuoteContentSchema, VideoContentSchema } from '../schemas.js';

describe('Content Processing', () => {
  describe('processMarkdownContent', () => {
    const sampleProjectMarkdown = `---
type: project
title: Test Project
description: A test project for validation
techStack: ["React", "TypeScript"]
image: "/test-image.jpg"
repoUrl: "https://github.com/test/project"
features:
  - label: "Feature 1"
    icon: "star"
actions:
  - label: "View"
    href: "https://example.com"
---

# Test Content

This is **bold** text with [a link](https://example.com).

## Subheading

- List item 1
- List item 2

Some more content here.`;

    it('should process markdown with proper frontmatter parsing', async () => {
      const result = await processMarkdownContent(sampleProjectMarkdown, 'test-project');
      
      expect(result.slug).toBe('test-project');
      expect(result.frontmatter.type).toBe('project');
      expect(result.frontmatter.title).toBe('Test Project');
      expect(result.contentHtml).toContain('<h1>Test Content</h1>');
      expect(result.contentHtml).toContain('<strong>bold</strong>');
      expect(result.contentHtml).toContain('<a href="https://example.com">a link</a>');
    });

    it('should calculate metadata correctly', async () => {
      const result = await processMarkdownContent(sampleProjectMarkdown, 'test-project');
      
      expect(result.meta.wordCount).toBeGreaterThan(0);
      expect(result.meta.readingTime).toBeGreaterThan(0);
      expect(result.lastModified).toBeInstanceOf(Date);
    });

    it('should collect headings when generateHeadingIds is enabled', async () => {
      const options: RenderOptions = { generateHeadingIds: true };
      const result = await processMarkdownContent(sampleProjectMarkdown, 'test-project', options);
      
      expect(result.meta.headings).toHaveLength(2);
      expect(result.meta.headings[0]).toEqual({
        depth: 1,
        text: 'Test Content',
        id: expect.any(String)
      });
      expect(result.meta.headings[1]).toEqual({
        depth: 2,
        text: 'Subheading', 
        id: expect.any(String)
      });
    });

    it('should handle external links with security settings', async () => {
      const options: RenderOptions = { externalLinkTarget: '_blank' };
      const result = await processMarkdownContent(sampleProjectMarkdown, 'test-project', options);
      
      expect(result.contentHtml).toContain('target="_blank"');
      expect(result.contentHtml).toContain('rel="noopener noreferrer"');
    });

    it('should sanitize HTML when sanitize option is enabled', async () => {
      const maliciousMarkdown = `---
type: project
title: Test
description: Test
techStack: []
image: "/test.jpg"
repoUrl: "https://example.com"
features: []
actions: []
---

<script>alert('xss')</script>
<div onclick="alert('click')">Clickable</div>`;

      const options: RenderOptions = { allowHtml: true, sanitize: true };
      const result = await processMarkdownContent(maliciousMarkdown, 'test', options);
      
      expect(result.contentHtml).not.toContain('<script>');
      expect(result.contentHtml).not.toContain('onclick');
    });

    it('should preserve safe HTML when allowHtml is true and sanitize is false', async () => {
      const htmlMarkdown = `---
type: project  
title: Test
description: Test
techStack: []
image: "/test.jpg"
repoUrl: "https://example.com" 
features: []
actions: []
---

<div class="custom">Custom HTML</div>
<em>Emphasis</em>`;

      const options: RenderOptions = { allowHtml: true, sanitize: false };
      const result = await processMarkdownContent(htmlMarkdown, 'test', options);
      
      expect(result.contentHtml).toContain('<div class="custom">Custom HTML</div>');
      expect(result.contentHtml).toContain('<em>Emphasis</em>');
    });
  });

  describe('Schema Validation', () => {
    it('should validate valid project content', () => {
      const validProject = {
        type: 'project',
        title: 'Test Project',
        description: 'A test project',
        techStack: ['React', 'TypeScript'],
        image: '/test.jpg',
        repoUrl: 'https://github.com/test/project',
        features: [{ label: 'Feature 1', icon: 'star' }],
        actions: [{ label: 'View', href: 'https://example.com' }]
      };

      const result = ProjectContentSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it('should reject invalid project content with helpful errors', () => {
      const invalidProject = {
        type: 'project',
        title: 'Test Project',
        // Missing required fields
      };

      const result = ProjectContentSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues.some(issue => issue.path.includes('description'))).toBe(true);
      }
    });

    it('should validate quote content', () => {
      const validQuote = {
        type: 'quote',
        quote: 'This is a great quote',
        author: 'John Doe',
        role: 'Developer',
        company: 'Tech Corp'
      };

      const result = QuoteContentSchema.safeParse(validQuote);
      expect(result.success).toBe(true);
    });

    it('should validate video content', () => {
      const validVideo = {
        type: 'video',
        title: 'Demo Video',
        description: 'A demonstration video',
        thumbnail: '/thumb.jpg',
        videoUrl: 'https://video.example.com/demo.mp4',
        displayMode: 'player'
      };

      const result = VideoContentSchema.safeParse(validVideo);
      expect(result.success).toBe(true);
    });
  });
});