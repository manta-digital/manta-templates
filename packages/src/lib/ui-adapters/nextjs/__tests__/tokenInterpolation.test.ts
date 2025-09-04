import { buildTokens, NextjsTokenProvider } from '../content/tokenBuilder';
import { NextjsContentProvider } from '../content/NextjsContentProvider';

/**
 * Mock site config for testing
 */
const mockSiteConfig = {
  site: {
    url: 'https://example.com',
    name: 'Test Site',
    domain: 'example.com'
  },
  author: {
    name: 'John Doe'
  },
  contacts: {
    primaryEmail: 'contact@example.com',
    businessEmail: 'business@example.com',
    supportEmail: 'support@example.com'
  },
  copyright: {
    year: '2025'
  }
};

describe('buildTokens', () => {
  test('should build all standard tokens with complete config', () => {
    const tokens = buildTokens(mockSiteConfig);
    
    expect(tokens['site.url']).toBe('https://example.com');
    expect(tokens['site.name']).toBe('Test Site');
    expect(tokens['author.name']).toBe('John Doe');
    expect(tokens['contacts.primaryEmail']).toBe('contact@example.com');
    expect(tokens['contacts.businessEmail']).toBe('business@example.com');
    expect(tokens['contacts.supportEmail']).toBe('support@example.com');
    expect(tokens['copyright.year']).toBe('2025');
    expect(tokens['copyright.lastUpdated']).toBe('2025');
    expect(tokens['copyright.holder']).toBe('John Doe');
  });

  test('should handle missing config properties gracefully', () => {
    const minimalConfig = {
      site: { url: 'https://test.com', name: 'Test', domain: 'test.com' },
      author: { name: '' }
    };
    
    const tokens = buildTokens(minimalConfig);
    
    expect(tokens['site.url']).toBe('https://test.com');
    expect(tokens['site.name']).toBe('Test');
    expect(tokens['author.name']).toBe('Test'); // Falls back to site name when author name is empty
    expect(tokens['contacts.primaryEmail']).toBe('info@test.com'); // Domain-based fallback
    expect(tokens['copyright.holder']).toBe('Test');
  });

  test('should handle null/undefined values', () => {
    const incompleteConfig = {
      site: { url: '', name: 'Test Site', domain: 'test.com' },
      author: { name: 'Test Author' }
    };
    
    const tokens = buildTokens(incompleteConfig);
    
    expect(tokens['site.url']).toBe('');
    expect(tokens['site.name']).toBe('Test Site');
    expect(tokens['author.name']).toBe('Test Author');
  });

  test('should use current year when copyright year is not provided', () => {
    const configWithoutYear = {
      site: { url: 'https://test.com', name: 'Test', domain: 'test.com' },
      author: { name: 'Test Author' }
    };
    
    const tokens = buildTokens(configWithoutYear);
    const currentYear = new Date().getFullYear().toString();
    
    expect(tokens['copyright.year']).toBe(currentYear);
    expect(tokens['copyright.lastUpdated']).toBe(currentYear);
  });
});

describe('NextjsTokenProvider', () => {
  test('should implement TokenProvider interface correctly', () => {
    const provider = new NextjsTokenProvider(mockSiteConfig);
    const tokens = provider.buildTokens();
    
    expect(typeof tokens).toBe('object');
    expect(tokens['site.url']).toBe('https://example.com');
    expect(tokens['author.name']).toBe('John Doe');
    expect(Object.keys(tokens).length).toBeGreaterThan(0);
  });

  test('should produce identical results to standalone buildTokens function', () => {
    const provider = new NextjsTokenProvider(mockSiteConfig);
    const providerTokens = provider.buildTokens();
    const standaloneTokens = buildTokens(mockSiteConfig);
    
    expect(providerTokens).toEqual(standaloneTokens);
  });

  test('should handle different site config variations', () => {
    const minimalConfig = {
      site: { url: 'https://minimal.com', name: 'Minimal', domain: 'minimal.com' },
      author: { name: 'Minimal Author' }
    };
    
    const provider = new NextjsTokenProvider(minimalConfig);
    const tokens = provider.buildTokens();
    
    expect(tokens['site.url']).toBe('https://minimal.com');
    expect(tokens['author.name']).toBe('Minimal Author');
    expect(tokens['contacts.primaryEmail']).toBe('info@minimal.com');
  });
});

describe('Token Replacement Patterns', () => {
  let provider: NextjsContentProvider;

  beforeEach(() => {
    provider = new NextjsContentProvider({
      contentRoot: 'test-content',
      enableCaching: false
    });
  });

  test('should replace standard token format {{site.url}}', () => {
    const content = 'Visit us at {{site.url}} for more information.';
    const tokens = { 'site.url': 'https://example.com' };
    
    // Access private method for testing
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Visit us at https://example.com for more information.');
  });

  test('should replace tokens with whitespace {{ site.url }}', () => {
    const content = 'Visit us at {{ site.url }} for more information.';
    const tokens = { 'site.url': 'https://example.com' };
    
    const result = (provider as any).applyTokens(content, tokens);
    // Note: Current implementation doesn't handle whitespace in tokens
    // This test documents current behavior
    expect(result).toBe('Visit us at {{ site.url }} for more information.');
  });

  test('should replace multiple tokens in same content', () => {
    const content = 'Contact {{author.name}} at {{contacts.primaryEmail}}';
    const tokens = { 
      'author.name': 'John Doe', 
      'contacts.primaryEmail': 'john@example.com' 
    };
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Contact John Doe at john@example.com');
  });

  test('should leave content unchanged when no tokens present', () => {
    const content = 'This content has no tokens.';
    const tokens = { 'site.url': 'https://example.com' };
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('This content has no tokens.');
  });

  test('should leave malformed tokens unchanged', () => {
    const content = 'Malformed: {site.url} or {{site.url';
    const tokens = { 'site.url': 'https://example.com' };
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Malformed: {site.url} or {{site.url');
  });

  test('should handle special characters in token values', () => {
    const content = 'Email us at {{contacts.primaryEmail}}';
    const tokens = { 'contacts.primaryEmail': 'test@example.com' };
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Email us at test@example.com');
  });

  test('should handle null/undefined token values gracefully', () => {
    const content = 'Contact {{author.name}} at {{missing.token}}';
    const tokens = { 
      'author.name': 'John Doe',
      'missing.token': undefined as any
    };
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Contact John Doe at {{missing.token}}');
    expect(consoleSpy).toHaveBeenCalledWith(
      "Token 'missing.token' has null/undefined value, skipping replacement"
    );
    
    consoleSpy.mockRestore();
  });

  test('should handle errors gracefully and return original content', () => {
    const content = 'Test content';
    const tokens = null as any; // This will cause an error in Object.entries
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const result = (provider as any).applyTokens(content, tokens);
    expect(result).toBe('Test content'); // Should return original content
    expect(consoleSpy).toHaveBeenCalledWith('Error applying tokens to content:', expect.any(TypeError));
    
    consoleSpy.mockRestore();
  });
});

describe('Token Caching', () => {
  let provider: NextjsContentProvider;
  let tokenProvider: NextjsTokenProvider;

  beforeEach(() => {
    provider = new NextjsContentProvider({
      contentRoot: 'test-content',
      enableCaching: true
    });
    tokenProvider = new NextjsTokenProvider(mockSiteConfig);
  });

  test('should cache tokens between calls', async () => {
    const buildTokensSpy = jest.spyOn(tokenProvider, 'buildTokens');
    
    // First call should build tokens
    const tokens1 = await (provider as any).getTokensForInterpolation(tokenProvider);
    expect(buildTokensSpy).toHaveBeenCalledTimes(1);
    
    // Second call should use cache
    const tokens2 = await (provider as any).getTokensForInterpolation(tokenProvider);
    expect(buildTokensSpy).toHaveBeenCalledTimes(1); // Still only called once
    
    expect(tokens1).toEqual(tokens2);
    
    buildTokensSpy.mockRestore();
  });

  test('should clear token cache when clearTokenCache is called', async () => {
    const buildTokensSpy = jest.spyOn(tokenProvider, 'buildTokens');
    
    // First call
    await (provider as any).getTokensForInterpolation(tokenProvider);
    expect(buildTokensSpy).toHaveBeenCalledTimes(1);
    
    // Clear cache
    provider.clearTokenCache();
    
    // Second call should rebuild tokens
    await (provider as any).getTokensForInterpolation(tokenProvider);
    expect(buildTokensSpy).toHaveBeenCalledTimes(2);
    
    buildTokensSpy.mockRestore();
  });

  test('should handle missing tokenProvider gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const result = await (provider as any).getTokensForInterpolation(undefined);
    
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Token interpolation requested but no tokenProvider provided'
    );
    
    consoleSpy.mockRestore();
  });

  test('should handle token building errors gracefully', async () => {
    const errorProvider = {
      buildTokens: jest.fn(() => { throw new Error('Token build error'); })
    };
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const result = await (provider as any).getTokensForInterpolation(errorProvider);
    
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error building tokens for interpolation:', 
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });
});

describe('Cache Statistics', () => {
  test('should include token cache size in cache statistics', () => {
    const provider = new NextjsContentProvider({
      enableCaching: true
    });
    
    const stats = provider.getCacheStats();
    
    expect(stats).toHaveProperty('tokenCacheSize');
    expect(typeof stats.tokenCacheSize).toBe('number');
    expect(stats.tokenCacheSize).toBe(0); // Initially empty
  });
});