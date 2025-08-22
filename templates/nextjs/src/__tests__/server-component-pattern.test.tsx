/**
 * Server Component Pattern Tests
 * 
 * Tests for the Server Page + Client Cards pattern used in test-example-2.
 * Validates that ui-core components work correctly with server-loaded content
 * via object spreading and that server/client boundaries are handled properly.
 * 
 * Pattern tested:
 * - Server components load content via async functions
 * - UI components receive props via object spreading: {...content}
 * - Client components (like BlogCardImage) work with server-loaded props
 * - Server components (like ProjectCard) work with direct props
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProjectCard, QuoteCard, BlogCardImage } from '@manta-templates/ui-core';

// Mock Next.js Image and Link for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; fill?: boolean; [key: string]: unknown }) => {
    const { src, alt, fill, ...rest } = props;
    return <img src={src} alt={alt} data-fill={fill} {...rest} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock framer-motion for BlogCardImage
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

describe('Server Component Pattern - Object Spreading', () => {
  describe('ProjectCard with Server-loaded Content', () => {
    test('should render ProjectCard with object spread content', () => {
      // Simulate server-loaded content (like from loadExampleContent)
      const serverContent = {
        title: 'Semantic Colors',
        description: 'Cards using accent and foreground tokens with comprehensive theming support',
        techStack: ['Next.js', 'Tailwind v4', 'Radix'],
        image: '/image/blog-sample-image.png',
        repoUrl: 'https://github.com/manta-templates/semantic-colors',
        displayVariant: 'showcase' as const,
      };

      render(<ProjectCard {...serverContent} />);
      
      expect(screen.getByText('Semantic Colors')).toBeInTheDocument();
      expect(screen.getByText(/Cards using accent and foreground tokens/)).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind v4')).toBeInTheDocument();
      expect(screen.getByText('Radix')).toBeInTheDocument();
    });

    test('should handle ProjectCard with content prop pattern', () => {
      // Test the content prop pattern used in test-example-2
      const contentProp = {
        title: 'Project Title',
        description: 'Project Description',
        techStack: ['React', 'TypeScript'],
        repoUrl: 'https://github.com/example',
        displayVariant: 'showcase' as const,
      };

      render(<ProjectCard content={contentProp} className="h-full" />);
      
      expect(screen.getByText('Project Title')).toBeInTheDocument();
      expect(screen.getByText('Project Description')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    test('should render ProjectCard with mixed props and content', () => {
      // Test override behavior: direct props should override content props
      const content = {
        title: 'Content Title',
        description: 'Content Description',
        techStack: ['React'],
      };

      render(
        <ProjectCard 
          content={content}
          title="Override Title"
          description="Override Description"
        />
      );
      
      expect(screen.getByText('Override Title')).toBeInTheDocument();
      expect(screen.getByText('Override Description')).toBeInTheDocument();
      expect(screen.queryByText('Content Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Content Description')).not.toBeInTheDocument();
    });
  });

  describe('QuoteCard with Server-loaded Content', () => {
    test('should render QuoteCard with object spread content', () => {
      // Simulate server-loaded quote content
      const serverContent = {
        quote: 'Make the easy path the right path—semantic tokens everywhere.',
        author: 'Manta Templates',
        role: 'Design Philosophy',
      };

      render(<QuoteCard {...serverContent} />);
      
      expect(screen.getByText(/Make the easy path the right path/)).toBeInTheDocument();
      expect(screen.getByText('Manta Templates')).toBeInTheDocument();
    });

    test('should handle QuoteCard with individual props', () => {
      render(
        <QuoteCard
          quote="Individual quote text"
          author="Individual Author"
        />
      );
      
      expect(screen.getByText('Individual quote text')).toBeInTheDocument();
      expect(screen.getByText('Individual Author')).toBeInTheDocument();
    });
  });

  describe('BlogCardImage with Server-loaded Content', () => {
    test('should render BlogCardImage with object spread content', () => {
      // Simulate server-loaded article content
      const serverContent = {
        title: 'Semantic Design System',
        excerpt: 'Building consistent user experiences with design tokens and systematic approach to component architecture.',
        coverImageUrl: '/image/blog-sample-image.png',
        category: 'Design System',
        author: 'Manta Templates',
        date: '2024-01-15',
        slug: '/content/example-2/carousel-hero',
        textColorClassName: 'text-white',
      };

      render(<BlogCardImage {...serverContent} />);
      
      expect(screen.getByText('Semantic Design System')).toBeInTheDocument();
      expect(screen.getByText(/Building consistent user experiences/)).toBeInTheDocument();
      expect(screen.getByText('Design System')).toBeInTheDocument();
      expect(screen.getByText('By Manta Templates')).toBeInTheDocument();
    });

    test('should handle BlogCardImage with individual props from test-example-2', () => {
      // Test the exact pattern used in test-example-2/page.tsx
      const carouselHero = {
        title: 'Test Article Title',
        excerpt: 'Test article excerpt for validation',
        coverImageUrl: '/image/blog-sample-image.png',
        category: 'Test Category',
        author: 'Test Author',
        date: '2024-01-15',
      };

      render(
        <BlogCardImage
          className="h-full"
          title={carouselHero.title}
          excerpt={carouselHero.excerpt}
          coverImageUrl={carouselHero.coverImageUrl}
          category={carouselHero.category}
          author={carouselHero.author}
          date={carouselHero.date}
          slug="/content/example-2/carousel-hero"
          textColorClassName="text-white"
        />
      );
      
      expect(screen.getByText('Test Article Title')).toBeInTheDocument();
      expect(screen.getByText('Test article excerpt for validation')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('By Test Author')).toBeInTheDocument();
    });

    test('should handle missing required props gracefully', () => {
      // BlogCardImage should return null if no title or coverImageUrl
      const { container } = render(
        <BlogCardImage
          excerpt="Has excerpt but missing title"
          category="Has category"
        />
      );
      
      expect(container.firstChild).toBeNull();
    });
  });
});

describe('Server Component Pattern - Type Safety', () => {
  test('should accept server-loaded content with proper TypeScript types', () => {
    // This test validates that the TypeScript interfaces work correctly
    // with server-loaded content (compilation test)
    
    const serverLoadedArticle = {
      title: 'Server Article',
      excerpt: 'Server excerpt',
      coverImageUrl: '/image.png',
      category: 'Server Category',
      author: 'Server Author',
      date: '2024-01-01' as string | Date, // Test both string and Date types
    };

    const serverLoadedProject = {
      title: 'Server Project',
      description: 'Server description',
      techStack: ['React', 'Next.js'] as string[],
      repoUrl: 'https://github.com/test',
    };

    const serverLoadedQuote = {
      quote: 'Server quote text',
      author: 'Server quote author',
    };

    // These should compile without TypeScript errors
    expect(() => {
      render(<BlogCardImage {...serverLoadedArticle} />);
      render(<ProjectCard {...serverLoadedProject} />);
      render(<QuoteCard {...serverLoadedQuote} />);
    }).not.toThrow();
  });

  test('should handle partial content objects safely', () => {
    // Test that components handle partial content objects properly
    const partialArticle = {
      title: 'Partial Article',
      coverImageUrl: '/image.png',
      // Missing optional fields like excerpt, category, etc.
    };

    render(<BlogCardImage {...partialArticle} />);
    expect(screen.getByText('Partial Article')).toBeInTheDocument();
    // Should render without errors even with missing optional fields
  });
});

describe('Server Component Pattern - Integration with Next.js', () => {
  test('should work with Next.js Image component props', () => {
    const contentWithImage = {
      title: 'Image Test Article',
      coverImageUrl: '/test-image.jpg',
      excerpt: 'Testing Next.js Image integration',
    };

    render(<BlogCardImage {...contentWithImage} ImageComponent={undefined} />);
    
    const img = screen.getByAltText('Background for Image Test Article');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  test('should work with Next.js Link component props', () => {
    const contentWithLink = {
      title: 'Link Test Article',
      coverImageUrl: '/test-image.jpg',
      slug: '/articles/test-article',
    };

    render(<BlogCardImage {...contentWithLink} LinkComponent={undefined} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/articles/test-article');
  });
});

describe('Server Component Pattern - Error Boundaries', () => {
  test('should handle component errors gracefully', () => {
    // Test error boundary behavior with invalid props
    const invalidContent = {
      // Intentionally missing required props to test error handling
    };

    // BlogCardImage should return null for missing required props
    const { container } = render(<BlogCardImage {...(invalidContent as { title?: string; coverImageUrl?: string })} />);
    expect(container.firstChild).toBeNull();
  });

  test('should handle null/undefined content objects', () => {
    // Test that components handle null/undefined gracefully
    expect(() => {
      render(<ProjectCard content={undefined} title="Fallback Title" />);
      render(<QuoteCard quote={undefined as unknown as string} author="Fallback Author" />);
    }).not.toThrow();
  });
});