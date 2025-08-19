import { ContentProcessor } from '../content/processor';
import { MockContentProvider } from '../content/MockContentProvider';
import { ContentLoadError, ContentNotFoundError } from '../content/types';

/**
 * Content System Tests
 * 
 * Basic tests for content processing functionality using Node.js assertions.
 * Tests cover markdown processing, frontmatter parsing, error scenarios,
 * and the complete content pipeline.
 */

// Simple assertion helper
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message}. Expected: ${expected}, Actual: ${actual}`);
  }
}

function assertContains(text: string, substring: string, message: string): void {
  if (!text.includes(substring)) {
    throw new Error(`Assertion failed: ${message}. Text does not contain: ${substring}`);
  }
}

async function assertThrows(fn: () => Promise<any>, errorType: any, message: string): Promise<void> {
  try {
    await fn();
    throw new Error(`Assertion failed: ${message}. Expected error to be thrown.`);
  } catch (error) {
    if (!(error instanceof errorType)) {
      throw new Error(`Assertion failed: ${message}. Expected ${errorType.name}, got ${(error as any).constructor.name}`);
    }
  }
}

/**
 * Test ContentProcessor basic markdown processing
 */
async function testBasicMarkdownProcessing(): Promise<void> {
  console.log('Testing basic markdown processing...');
  
  const processor = new ContentProcessor();
  const input = '# Hello\n\nThis is **bold** text with *italic* text.';
  const output = await processor.processMarkdown(input);
  
  // Verify HTML tags are present
  assertContains(output, '<h1>', 'Should contain h1 tag');
  assertContains(output, '<p>', 'Should contain p tag');
  assertContains(output, '<strong>', 'Should contain strong tag for bold text');
  assertContains(output, '<em>', 'Should contain em tag for italic text');
  
  console.log('✓ Basic markdown processing test passed');
}

/**
 * Test ContentProcessor frontmatter parsing
 */
async function testFrontmatterParsing(): Promise<void> {
  console.log('Testing frontmatter parsing...');
  
  const processor = new ContentProcessor();
  const withFrontmatter = `---
title: Test Post
author: Test Author
tags:
  - test
  - content
---
# Content

This is the main content.`;

  const { frontmatter, content } = processor.parseFrontmatter(withFrontmatter);
  
  assertEqual(frontmatter.title, 'Test Post', 'Should parse title correctly');
  assertEqual(frontmatter.author, 'Test Author', 'Should parse author correctly');
  assert(Array.isArray(frontmatter.tags), 'Tags should be an array');
  assertEqual(frontmatter.tags[0], 'test', 'Should parse first tag correctly');
  assertContains(content, '# Content', 'Should extract content body correctly');
  assert(!content.includes('---'), 'Content should not contain frontmatter delimiters');
  
  console.log('✓ Frontmatter parsing test passed');
}

/**
 * Test ContentProcessor code blocks with syntax highlighting
 */
async function testCodeBlockProcessing(): Promise<void> {
  console.log('Testing code block processing...');
  
  const processor = new ContentProcessor();
  const codeContent = `Here's some JavaScript:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

And some inline \`code\`.`;

  const output = await processor.processMarkdown(codeContent);
  
  assertContains(output, '<pre', 'Should contain pre tag for code blocks');
  assertContains(output, '<code', 'Should contain code tag');
  assertContains(output, 'greet', 'Should preserve function name in code content');
  
  console.log('✓ Code block processing test passed');
}

/**
 * Test ContentProcessor with different themes
 */
async function testThemeConfiguration(): Promise<void> {
  console.log('Testing theme configuration...');
  
  const darkProcessor = new ContentProcessor({ theme: 'github-dark' });
  const lightProcessor = new ContentProcessor({ theme: 'github-light' });
  
  const codeContent = '```javascript\nconst x = 1;\n```';
  
  const darkOutput = await darkProcessor.processMarkdown(codeContent);
  const lightOutput = await lightProcessor.processMarkdown(codeContent);
  
  // Both should process successfully (exact output comparison would be fragile)
  // The content gets styled, so we just check for key elements
  assertContains(darkOutput, 'const', 'Dark theme should preserve code keywords');
  assertContains(lightOutput, 'const', 'Light theme should preserve code keywords');
  assertContains(darkOutput, '<pre', 'Dark theme should create code blocks');
  assertContains(lightOutput, '<pre', 'Light theme should create code blocks');
  
  console.log('✓ Theme configuration test passed');
}

/**
 * Test MockContentProvider basic functionality
 */
async function testMockContentProvider(): Promise<void> {
  console.log('Testing MockContentProvider...');
  
  const provider = new MockContentProvider();
  
  // Test loading a single blog post
  const blogPost = await provider.loadContent('sample-post', 'blog');
  assertEqual(blogPost.slug, 'sample-post', 'Should return correct slug');
  assertEqual((blogPost.frontmatter as any).title, 'My Sample Blog Post', 'Should parse frontmatter correctly');
  assertContains(blogPost.contentHtml || '', '<h2>', 'Should contain processed HTML');
  
  console.log('✓ MockContentProvider basic functionality test passed');
}

/**
 * Test MockContentProvider loading all content
 */
async function testMockContentProviderLoadAll(): Promise<void> {
  console.log('Testing MockContentProvider loadAll...');
  
  const provider = new MockContentProvider();
  
  // Test loading all blog posts
  const allBlogs = await provider.loadAllContent('blog');
  assert(allBlogs.length >= 2, 'Should return multiple blog posts');
  
  const samplePost = allBlogs.find(post => post.slug === 'sample-post');
  assert(samplePost !== undefined, 'Should include sample-post');
  assertEqual((samplePost!.frontmatter as any).title, 'My Sample Blog Post', 'Should parse frontmatter in list');
  
  console.log('✓ MockContentProvider loadAll test passed');
}

/**
 * Test MockContentProvider caching
 */
async function testMockContentProviderCaching(): Promise<void> {
  console.log('Testing MockContentProvider caching...');
  
  const provider = new MockContentProvider({ delay: 100 }); // Add delay to make timing visible
  
  // First load should take time
  const start1 = Date.now();
  const content1 = await provider.loadContent('sample-post', 'blog');
  const time1 = Date.now() - start1;
  
  // Second load should be much faster (cached)
  const start2 = Date.now();
  const content2 = await provider.loadContent('sample-post', 'blog');
  const time2 = Date.now() - start2;
  
  // Verify same content
  assertEqual(content1.slug, content2.slug, 'Cached content should be identical');
  assertEqual((content1.frontmatter as any).title, (content2.frontmatter as any).title, 'Cached frontmatter should be identical');
  
  // Second load should be significantly faster (allowing for some variance)
  assert(time2 < time1 / 2, `Cached load should be faster. First: ${time1}ms, Second: ${time2}ms`);
  
  console.log('✓ MockContentProvider caching test passed');
}

/**
 * Test error scenarios
 */
async function testErrorScenarios(): Promise<void> {
  console.log('Testing error scenarios...');
  
  const provider = new MockContentProvider();
  
  // Test ContentNotFoundError
  await assertThrows(
    () => provider.loadContent('nonexistent', 'blog'),
    ContentNotFoundError,
    'Should throw ContentNotFoundError for missing content'
  );
  
  // Test simulated load error
  await assertThrows(
    () => provider.loadContent('error-test', 'blog'),
    ContentLoadError,
    'Should throw ContentLoadError for error-test slug'
  );
  
  // Test simulated not found error
  await assertThrows(
    () => provider.loadContent('not-found-test', 'blog'),
    ContentNotFoundError,
    'Should throw ContentNotFoundError for not-found-test slug'
  );
  
  console.log('✓ Error scenarios test passed');
}

/**
 * Run all tests
 */
async function runAllTests(): Promise<void> {
  console.log('Running content system tests...\n');
  
  try {
    await testBasicMarkdownProcessing();
    await testFrontmatterParsing();
    await testCodeBlockProcessing();
    await testThemeConfiguration();
    await testMockContentProvider();
    await testMockContentProviderLoadAll();
    await testMockContentProviderCaching();
    await testErrorScenarios();
    
    console.log('\n✅ All content system tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Export test functions for potential external usage
export {
  runAllTests,
  testBasicMarkdownProcessing,
  testFrontmatterParsing,
  testCodeBlockProcessing,
  testThemeConfiguration,
  testMockContentProvider,
  testMockContentProviderLoadAll,
  testMockContentProviderCaching,
  testErrorScenarios
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}