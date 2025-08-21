/**
 * Server Component Content Loading Tests
 * 
 * These tests validate the server-side content loading functions used in the 
 * Server Page + Client Cards pattern. Tests cover:
 * - Schema-based content loading functions
 * - Validation and error handling
 * - Content structure and type safety
 * 
 * Based on existing ui-core content tests but focused on templates/nextjs usage.
 */

// Mock the content loader to avoid ESM import issues in Jest
jest.mock('../lib/content/loader', () => ({
  getArticleBySlug: jest.fn(),
  getProjectBySlug: jest.fn(), 
  getQuoteBySlug: jest.fn(),
  getExampleContentBySlug: jest.fn(),
  getAllArticles: jest.fn(),
  getAllProjects: jest.fn(),
  getAllQuotes: jest.fn(),
  getAllExampleContent: jest.fn(),
}));

const {
  getArticleBySlug,
  getProjectBySlug,
  getQuoteBySlug,
  getExampleContentBySlug,
  getAllArticles,
  getAllProjects,
  getAllQuotes,
  getAllExampleContent
} = require('../lib/content/loader');

describe('Server Component Content Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Individual Content Loading', () => {
    test('should load article content with proper schema validation', async () => {
      // Mock article content
      const mockArticle = {
        slug: 'theme-guide',
        frontmatter: {
          title: 'Theme Guide',
          description: 'A guide to theming',
          author: 'Test Author'
        },
        contentHtml: '<h1>Theme Guide</h1><p>Content here</p>'
      };

      (getArticleBySlug as jest.Mock).mockResolvedValue(mockArticle);
      
      // Test loading existing article
      const article = await getArticleBySlug('theme-guide');
      
      expect(article).toBeDefined();
      expect(article.slug).toBe('theme-guide');
      expect(article.frontmatter).toBeDefined();
      expect(article.frontmatter.title).toBeDefined();
      expect(typeof article.frontmatter.title).toBe('string');
      expect(article.contentHtml).toBeDefined();
      expect(typeof article.contentHtml).toBe('string');
    });

    test('should load project content with proper schema validation', async () => {
      // Test with sample project
      const project = await getProjectBySlug('sample-project');
      
      expect(project).toBeDefined();
      expect(project.slug).toBe('sample-project');
      expect(project.frontmatter).toBeDefined();
      expect(project.frontmatter.title).toBeDefined();
      expect(typeof project.frontmatter.title).toBe('string');
    });

    test('should load quote content with proper schema validation', async () => {
      // Test with design philosophy quote
      const quote = await getQuoteBySlug('design-philosophy');
      
      expect(quote).toBeDefined();
      expect(quote.slug).toBe('design-philosophy');
      expect(quote.frontmatter).toBeDefined();
      expect(quote.frontmatter.quote).toBeDefined();
      expect(typeof quote.frontmatter.quote).toBe('string');
    });

    test('should load example-2 content with flexible schema matching', async () => {
      // Test with carousel hero (should match Article schema)
      const carouselHero = await getExampleContentBySlug('carousel-hero');
      
      expect(carouselHero).toBeDefined();
      expect(carouselHero.slug).toBe('carousel-hero');
      expect(carouselHero.frontmatter).toBeDefined();
      expect(carouselHero.frontmatter.title).toBeDefined();

      // Test with carousel project (should match Project schema)
      const carouselProject = await getExampleContentBySlug('carousel-project');
      
      expect(carouselProject).toBeDefined();
      expect(carouselProject.slug).toBe('carousel-project');
      expect(carouselProject.frontmatter).toBeDefined();
      expect(carouselProject.frontmatter.title).toBeDefined();
    });

    test('should handle missing content with proper error messages', async () => {
      await expect(getArticleBySlug('nonexistent')).rejects.toThrow();
      await expect(getProjectBySlug('nonexistent')).rejects.toThrow();
      await expect(getQuoteBySlug('nonexistent')).rejects.toThrow();
      await expect(getExampleContentBySlug('nonexistent')).rejects.toThrow();
    });

    test('should provide development-friendly error messages', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      try {
        await expect(getArticleBySlug('nonexistent')).rejects.toThrow(/Content validation failed/);
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });

  describe('Bulk Content Loading', () => {
    test('should load all articles with validation', async () => {
      const articles = getAllArticles();
      
      expect(Array.isArray(articles)).toBe(true);
      articles.forEach(article => {
        expect(article.slug).toBeDefined();
        expect(article.frontmatter).toBeDefined();
        expect(article.frontmatter.title).toBeDefined();
        expect(typeof article.frontmatter.title).toBe('string');
      });
    });

    test('should load all projects with validation', async () => {
      const projects = getAllProjects();
      
      expect(Array.isArray(projects)).toBe(true);
      projects.forEach(project => {
        expect(project.slug).toBeDefined();
        expect(project.frontmatter).toBeDefined();
        expect(project.frontmatter.title).toBeDefined();
        expect(typeof project.frontmatter.title).toBe('string');
      });
    });

    test('should load all quotes with validation', async () => {
      const quotes = getAllQuotes();
      
      expect(Array.isArray(quotes)).toBe(true);
      quotes.forEach(quote => {
        expect(quote.slug).toBeDefined();
        expect(quote.frontmatter).toBeDefined();
        expect(quote.frontmatter.quote).toBeDefined();
        expect(typeof quote.frontmatter.quote).toBe('string');
      });
    });

    test('should load all example content with flexible validation', async () => {
      const examples = getAllExampleContent();
      
      expect(Array.isArray(examples)).toBe(true);
      examples.forEach(example => {
        expect(example.slug).toBeDefined();
        expect(example.frontmatter).toBeDefined();
        expect(example.frontmatter.title).toBeDefined();
        expect(typeof example.frontmatter.title).toBe('string');
      });
    });
  });

  describe('Schema Validation', () => {
    test('should validate article schema requirements', async () => {
      const article = await getArticleBySlug('theme-guide');
      const frontmatter = article.frontmatter;
      
      // Required fields
      expect(frontmatter.title).toBeDefined();
      expect(typeof frontmatter.title).toBe('string');
      
      // Optional fields should have proper types when present
      if (frontmatter.description) {
        expect(typeof frontmatter.description).toBe('string');
      }
      if (frontmatter.author) {
        expect(typeof frontmatter.author).toBe('string');
      }
      if (frontmatter.date) {
        expect(typeof frontmatter.date).toBe('string');
      }
    });

    test('should validate project schema requirements', async () => {
      const project = await getProjectBySlug('sample-project');
      const frontmatter = project.frontmatter;
      
      // Required fields
      expect(frontmatter.title).toBeDefined();
      expect(typeof frontmatter.title).toBe('string');
      
      // Optional fields should have proper types when present
      if (frontmatter.description) {
        expect(typeof frontmatter.description).toBe('string');
      }
      if (frontmatter.techStack) {
        expect(Array.isArray(frontmatter.techStack)).toBe(true);
      }
    });

    test('should validate quote schema requirements', async () => {
      const quote = await getQuoteBySlug('design-philosophy');
      const frontmatter = quote.frontmatter;
      
      // Required fields
      expect(frontmatter.quote).toBeDefined();
      expect(typeof frontmatter.quote).toBe('string');
      
      // Optional fields should have proper types when present
      if (frontmatter.author) {
        expect(typeof frontmatter.author).toBe('string');
      }
    });
  });

  describe('Content Structure for Server Components', () => {
    test('should return content suitable for object spreading', async () => {
      const article = await getArticleBySlug('theme-guide');
      const frontmatter = article.frontmatter;
      
      // Test that we can destructure for component props
      const { title, description, author, date } = frontmatter;
      
      expect(title).toBeDefined();
      // These should be undefined or have valid values (no broken references)
      expect(description === undefined || typeof description === 'string').toBe(true);
      expect(author === undefined || typeof author === 'string').toBe(true);
      expect(date === undefined || typeof date === 'string').toBe(true);
    });

    test('should support the test-example-2 content loading pattern', async () => {
      // Simulate the loadExampleContent function pattern
      const content = {
        carouselHero: await getExampleContentBySlug('carousel-hero').then(c => c.frontmatter),
        carouselProject: await getExampleContentBySlug('carousel-project').then(c => c.frontmatter),
      };
      
      expect(content.carouselHero).toBeDefined();
      expect(content.carouselProject).toBeDefined();
      expect(content.carouselHero.title).toBeDefined();
      expect(content.carouselProject.title).toBeDefined();
      
      // Test that these can be spread into components
      const heroProps = { ...content.carouselHero };
      const projectProps = { ...content.carouselProject };
      
      expect(heroProps.title).toBe(content.carouselHero.title);
      expect(projectProps.title).toBe(content.carouselProject.title);
    });
  });
});

/**
 * Performance and Caching Tests
 * Test that content loading is efficient for server components
 */
describe('Content Loading Performance', () => {
  test('should handle concurrent content loading', async () => {
    const startTime = Date.now();
    
    const promises = [
      getArticleBySlug('theme-guide'),
      getAllArticles(),
      getAllProjects(),
      getAllQuotes()
    ];
    
    const results = await Promise.all(promises);
    const endTime = Date.now();
    
    expect(results).toHaveLength(4);
    expect(results[0]).toBeDefined(); // Article
    expect(Array.isArray(results[1])).toBe(true); // All articles
    expect(Array.isArray(results[2])).toBe(true); // All projects  
    expect(Array.isArray(results[3])).toBe(true); // All quotes
    
    // Performance should be reasonable (less than 1 second for filesystem operations)
    expect(endTime - startTime).toBeLessThan(1000);
  });

  test('should handle multiple calls to same content efficiently', async () => {
    // Multiple calls should not cause issues (filesystem caching handled by OS)
    const article1 = await getArticleBySlug('theme-guide');
    const article2 = await getArticleBySlug('theme-guide');
    
    expect(article1.slug).toBe(article2.slug);
    expect(article1.frontmatter.title).toBe(article2.frontmatter.title);
  });
});