/**
 * HeroSection component tests
 *
 * Comprehensive tests for the main HeroSection component functionality,
 * variants, and integration points.
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';
import { createTestHeroContent, mockFrameworkComponents, testHeroVariants, testUtils } from './test-setup';

describe('HeroSection', () => {
  beforeEach(() => {
    // Setup common test environment
    testUtils.mockIntersectionObserver();
    testUtils.mockMatchMedia();
  });

  describe('Component Structure', () => {
    it('should render with default content when no content provided', () => {
      render(<HeroSection />);

      expect(screen.getByText('Hero Section Placeholder')).toBeInTheDocument();
      expect(screen.getByText('This is a placeholder hero section')).toBeInTheDocument();
      expect(screen.getByText('A simple hero section with gradient background')).toBeInTheDocument();
    });

    it('should render with provided hero content', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} />);

      expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
      expect(screen.getByText('Test Hero Subtitle')).toBeInTheDocument();
      expect(screen.getByText('This is a test hero description with some content.')).toBeInTheDocument();
    });

    it('should render as a section element with proper structure', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} />);

      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
      expect(section).toHaveClass('relative', 'overflow-hidden');
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} size="sm" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('h-64');
    });

    it('should apply md size classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} size="md" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('h-96');
    });

    it('should apply lg size classes (default)', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} size="lg" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('h-[32rem]');
    });

    it('should apply xl size classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} size="xl" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('h-screen');
    });
  });

  describe('Content Position Variants', () => {
    it('should apply left content positioning', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} contentPosition="left" />);

      const contentWrapper = screen.getByText('Test Hero Title').closest('div');
      expect(contentWrapper?.parentElement).toHaveClass('justify-start');
    });

    it('should apply center content positioning (default)', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} contentPosition="center" />);

      const contentWrapper = screen.getByText('Test Hero Title').closest('div');
      expect(contentWrapper?.parentElement).toHaveClass('justify-center');
    });

    it('should apply right content positioning', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} contentPosition="right" />);

      const contentWrapper = screen.getByText('Test Hero Title').closest('div');
      expect(contentWrapper?.parentElement).toHaveClass('justify-end');
    });
  });

  describe('Layout Variants', () => {
    it('should apply default variant classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} variant="default" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('relative', 'overflow-hidden');
    });

    it('should apply fullscreen variant classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} variant="fullscreen" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('h-screen');
    });
  });

  describe('Background Integration', () => {
    it('should render HeroBackground component', () => {
      const testContent = testHeroVariants.gradient;
      render(<HeroSection content={testContent} />);

      // HeroBackground should be rendered (test by looking for gradient structure)
      const section = screen.getByRole('region');
      expect(section.querySelector('[class*="absolute"][class*="inset-0"]')).toBeInTheDocument();
    });

    it('should pass background config to HeroBackground', () => {
      const testContent = createTestHeroContent({
        background: {
          type: 'gradient',
          gradient: { from: 'accent-9', to: 'accent-10' }
        }
      });
      render(<HeroSection content={testContent} />);

      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Custom Content', () => {
    it('should render custom children instead of default content', () => {
      const testContent = createTestHeroContent();
      render(
        <HeroSection content={testContent}>
          <div>Custom Hero Content</div>
        </HeroSection>
      );

      expect(screen.getByText('Custom Hero Content')).toBeInTheDocument();
      expect(screen.queryByText('Test Hero Title')).not.toBeInTheDocument();
    });
  });

  describe('Framework Component Integration', () => {
    it('should accept framework components prop', () => {
      const testContent = createTestHeroContent();
      render(
        <HeroSection
          content={testContent}
          components={mockFrameworkComponents}
        />
      );

      // Component should render without error
      expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing title gracefully', () => {
      const testContent = createTestHeroContent({ title: '' });
      render(<HeroSection content={testContent} />);

      // Should still render other content
      expect(screen.getByText('Test Hero Subtitle')).toBeInTheDocument();
    });

    it('should handle missing background gracefully', () => {
      const testContent = createTestHeroContent();
      delete (testContent.background as any);

      // Should not throw an error
      expect(() => {
        render(<HeroSection content={testContent} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should use proper heading hierarchy', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Test Hero Title');
    });

    it('should have proper semantic structure', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} />);

      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should accept and apply custom className', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} className="custom-hero-class" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('custom-hero-class');
    });

    it('should combine default and custom classes', () => {
      const testContent = createTestHeroContent();
      render(<HeroSection content={testContent} className="custom-class" />);

      const section = screen.getByRole('region');
      expect(section).toHaveClass('relative', 'overflow-hidden', 'custom-class');
    });
  });
});